import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { finalize, timeout } from 'rxjs';
import { API_BASE_URL } from './app.tokens';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  errorMessage = '';
  loading = false;

  protected readonly form;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly httpClient: HttpClient,
    @Inject(API_BASE_URL) private readonly apiBaseUrl: string
  ) {
    this.form = this.formBuilder.nonNullable.group({
      username: ['admin', [Validators.required]],
      password: ['admin123', [Validators.required]]
    });
  }

  login(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    const { username, password } = this.form.getRawValue();
    const rawCredentials = `${username}:${password}`;
    const authHeader = `Basic ${btoa(rawCredentials)}`;

    this.httpClient
      .get(`${this.apiBaseUrl}/empleados`, {
        params: { page: 0, size: 1 },
        headers: { Authorization: authHeader }
      })
      .pipe(
        timeout(8000),
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe({
        next: () => {
          this.authService.setCredentials(username, password);
          const redirectTo = this.route.snapshot.queryParamMap.get('redirectTo') || '/empleados';
          this.router.navigateByUrl(redirectTo);
        },
        error: (error) => {
          const status = error?.status;
          if (status === 401 || status === 403) {
            this.errorMessage = 'Usuario o contraseña inválidos';
            return;
          }

          this.errorMessage = 'No se pudo validar el acceso. Intenta de nuevo.';
        }
      });
  }
}

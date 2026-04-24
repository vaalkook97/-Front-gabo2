import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize, timeout } from 'rxjs';
import { AuthService } from './auth.service';
import { Empleado, EmpleadosService } from './empleados.service';

@Component({
  selector: 'app-empleados-page',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './empleados-page.component.html',
  styleUrl: './empleados-page.component.scss'
})
export class EmpleadosPageComponent implements OnInit {
  empleados: Empleado[] = [];
  cargando = false;
  guardando = false;
  mensajeError = '';

  protected readonly form;

  constructor(
    private readonly empleadosService: EmpleadosService,
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {
    this.form = this.formBuilder.nonNullable.group({
      nombre: ['', [Validators.required, Validators.maxLength(100)]],
      direccion: ['', [Validators.required, Validators.maxLength(100)]],
      telefono: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
      correo: ['', [Validators.required, Validators.email, Validators.maxLength(100)]]
    });
  }

  ngOnInit(): void {
    this.cargarEmpleados();
  }

  crearEmpleado(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (this.guardando) {
      return;
    }

    this.guardando = true;
    this.mensajeError = '';
    this.empleadosService
      .crear(this.form.getRawValue())
      .pipe(
        timeout(10000),
        finalize(() => {
          this.guardando = false;
        })
      )
      .subscribe({
        next: () => {
          this.form.reset({ nombre: '', direccion: '', telefono: '', correo: '' });
          this.cargarEmpleados();
        },
        error: (error) => {
          const apiMessage = error?.error?.message;
          this.mensajeError = apiMessage ?? 'No se pudo crear el empleado';
        }
      });
  }

  cargarEmpleados(): void {
    if (this.cargando) {
      return;
    }

    this.cargando = true;
    this.mensajeError = '';
    this.empleadosService
      .listar()
      .pipe(
        timeout(10000),
        finalize(() => {
          this.cargando = false;
        })
      )
      .subscribe({
        next: (response) => {
          this.empleados = response.content;
        },
        error: (error) => {
          const status = error?.status;
          if (status === 401 || status === 403) {
            this.logout();
            return;
          }

          const apiMessage = error?.error?.message;
          this.mensajeError = apiMessage ?? 'No se pudieron cargar los empleados';
        }
      });
  }

  logout(): void {
    this.authService.clearCredentials();
    this.router.navigate(['/login']);
  }
}

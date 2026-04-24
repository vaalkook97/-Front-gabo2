import { Routes } from '@angular/router';
import { authGuard, loginGuard } from './auth.guard';
import { EmpleadosPageComponent } from './empleados-page.component';
import { LoginComponent } from './login.component';

export const routes: Routes = [
	{
		path: 'login',
		component: LoginComponent,
		canActivate: [loginGuard]
	},
	{
		path: 'empleados',
		component: EmpleadosPageComponent,
		canActivate: [authGuard]
	},
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'login'
	},
	{
		path: '**',
		redirectTo: 'login'
	}
];

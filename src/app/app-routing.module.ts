import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth.guard';
import { UnauthGuard } from './unauth.guard';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotComponent } from './forgot/forgot.component';

import { UsersComponent } from './users/users.component';
import { UserDetailsComponent } from './user-details/user-details.component';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'login',
		pathMatch: 'full'
	},
	
	{
		path: 'login',
		canActivate: [UnauthGuard],
		component: LoginComponent
	},
	{
		path: 'register',
		canActivate: [UnauthGuard],
		component: RegisterComponent
	},
	{
		path: 'forgot',
		canActivate: [UnauthGuard],
		component: ForgotComponent
	},

	{
		path: 'users',
		canActivate: [AuthGuard],
		component: UsersComponent
	},
	{
		path: 'details/:id',
		canActivate: [AuthGuard],
		component: UserDetailsComponent
	},

	{
		path: '**',
		redirectTo: 'login'
	}
]

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		RouterModule.forRoot(routes)
	],
	exports: [
		RouterModule
	]
})
export class AppRoutingModule { }

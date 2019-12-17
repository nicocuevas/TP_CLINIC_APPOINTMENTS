import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { AppointmentsComponent } from './appointments/appointments.component';

import { AuthService } from './auth.service';
import { AuthGuardService } from './auth-guard.service';

console.log("routing")
const routes: Routes = [
	{ path: '',      component: LoginComponent },
	{ path: 'signup',      component: SignupComponent },
    { path: 'dashboard', component: HomeComponent, canActivate: [AuthGuardService],
    	data: {
            permission: ['patient', 'employee', 'specialist', 'admin']
        } 
    },
    { path: 'appoinments', component: AppointmentsComponent, canActivate: [AuthGuardService],
		data: {
            permission: ['patient', 'employee', 'specialist', 'admin']
        } 
	},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

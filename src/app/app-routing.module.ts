import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { LoginComponent } from './login/login.component';
import { createAccountComponent } from './createAccount/createAccount.component'
import { AuthGuard } from './auth-guard.service';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'Dashboard',
    component: NavMenuComponent,
    data: {
      title: 'Dashboard Page'
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'createAccount',
    component: createAccountComponent,
    data: {
      title: 'Create Account Page'
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteAuthGuard } from '../guards/route-auth.guard';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
        canActivate: [RouteAuthGuard],
      },
      {
        path: 'register',
        component: RegisterComponent,
        canActivate: [RouteAuthGuard],
      },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: '**', redirectTo: 'login' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}

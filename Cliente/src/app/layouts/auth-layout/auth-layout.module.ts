import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthLayoutRoutes } from './auth-layout.routing';
import { LoginModule } from '../../pages/login/login.module';

@NgModule({
  imports: [
    RouterModule.forChild(AuthLayoutRoutes),
    LoginModule,
  ]
})
export class AuthLayoutModule { }

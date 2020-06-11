import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthLayoutRoutes } from './auth-layout.routing';
import { LoginModule } from '../../pages/login/login.module';
import { RegisterModule } from 'src/app/pages/register/register.module';

@NgModule({
  imports: [
    RouterModule.forChild(AuthLayoutRoutes),
    LoginModule,
    RegisterModule
  ]
})
export class AuthLayoutModule { }

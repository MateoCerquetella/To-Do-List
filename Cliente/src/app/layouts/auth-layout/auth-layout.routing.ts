import { Routes } from '@angular/router';
import { LoginComponent } from '../../pages/login/login.component';
import { RegisterComponent } from 'src/app/pages/register/register.component';

export const AuthLayoutRoutes: Routes = [
    {
        path: 'login', component: LoginComponent,
        loadChildren: () => import('../../pages/login/login.module').then(m => m.LoginModule)
    },
    {
        path: 'register', component: RegisterComponent,
        loadChildren: () => import('../../pages/register/register.module').then(m => m.RegisterModule)
    }
];

import { Routes } from '@angular/router';
import { LoginComponent } from '../../pages/login/login.component';

export const AuthLayoutRoutes: Routes = [
    {
        path: 'login', component: LoginComponent,
        loadChildren: () => import('../../pages/login/login.module').then(m => m.LoginModule)
    }
];

import { Routes } from '@angular/router';
import { DashboardComponent } from 'src/app/pages/dashboard/dashboard.component';


export const LayoutRoutes: Routes = [
    {
        path: 'dashboard', component: DashboardComponent,
        loadChildren: () => import('../../pages/dashboard/dashboard.module').then(m => m.DashboardModule)
    }
];

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LayoutRoutes } from './layout.routing';
import { DashboardModule } from 'src/app/pages/dashboard/dashboard.module';

@NgModule({
  imports: [
    RouterModule.forChild(LayoutRoutes),
    DashboardModule
  ]
})

export class LayoutModule { }

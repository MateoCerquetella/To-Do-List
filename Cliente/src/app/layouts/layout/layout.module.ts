import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LayoutRoutes } from './layout.routing';
import { DashboardModule } from 'src/app/pages/dashboard/dashboard.module';
import { ToDoModule } from 'src/app/pages/todo/todo.module';

@NgModule({
  imports: [
    RouterModule.forChild(LayoutRoutes),
    DashboardModule,
    ToDoModule
  ]
})

export class LayoutModule { }

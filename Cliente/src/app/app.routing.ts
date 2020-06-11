import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layouts/layout/layout.component';
import { AuthGuardService } from './services/auth/auth.guard.service';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full',
  },
  {
    path: 'inicio',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: './layouts/auth-layout/auth-layout.module#AuthLayoutModule'
      }
    ]
  },
  {
    path: 'layout',
    component: LayoutComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: '',
        loadChildren: './layouts/layout/layout.module#LayoutModule'
      }]
  },
  {
    path: '**',
    redirectTo: 'inicio'
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }

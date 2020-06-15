import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { ToDoComponent } from './todo.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';

@NgModule({
  declarations: [
    ToDoComponent
  ],
  imports: [
    SharedModule,
    RouterModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-AR' }
  ]
})
export class ToDoModule { }

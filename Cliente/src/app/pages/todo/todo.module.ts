import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { ToDoComponent } from './todo.component';

@NgModule({
  declarations: [
    ToDoComponent
  ],
  imports: [
    SharedModule,
    RouterModule
  ],
  providers: [
  ]
})
export class ToDoModule { }

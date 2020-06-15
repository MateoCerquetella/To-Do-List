import { Component, OnInit, Inject, Optional, ViewChild, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ToDoI } from 'src/app/models/todo';
import { ToDoService } from 'src/app/services/todo/todo.service';
import { take } from 'rxjs/operators';
import swal from 'sweetalert2';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  providers: [FormBuilder, ToDoService]
})
export class ToDoComponent implements OnInit {
  frmTarea: FormGroup;
  tareaModel: ToDoI;
  localData: any;

  constructor(
    public dialogRef: MatDialogRef<ToDoComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: ToDoI,
    private todoService: ToDoService,
    private formBuilder: FormBuilder) {

    this.localData = { ...data };
  }

  ngOnInit() {
    this.frmTarea = this.formBuilder.group({
      Tarea: ['', [Validators.required]],
      Descripcion: ['']
    });
    this.frmTarea.get('Tarea').setValue(this.localData.nombre);
    this.frmTarea.get('Descripcion').setValue(this.localData.descripcion);

  }

  // Accede el form más facil en el todo.component.html
  get f() { return this.frmTarea.controls; }

  doEdit() {
    // Si el formulario es invalido lo retorno
    if (this.frmTarea.invalid) {
      return;
    }
    this.tareaModel = {
      _id: this.localData._id,
      nombre: this.frmTarea.get('Tarea').value,
      descripcion: this.frmTarea.get('Descripcion').value,
      completado: this.localData.completado
    };
    this.todoService
      .updateToDo(this.tareaModel)
      .pipe(take(1))
      .subscribe(
        (res: ToDoI) => {
        },
        (err) => {
          if (err) {
            swal.fire({
              title: 'Error',
              text: 'Se ha producido un error al querer guardar la tarea',
              icon: 'error',
              confirmButtonText: 'Ok',
            });
          }
        }
      );
    this.dialogRef.close({ data: this.tareaModel });
  }

}

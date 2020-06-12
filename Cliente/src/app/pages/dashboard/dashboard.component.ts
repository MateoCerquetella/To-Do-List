import { Component, OnInit } from '@angular/core';
import { ToDoService } from 'src/app/services/todo/todo.service';
import swal from 'sweetalert2';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToDoI } from 'src/app/models/todo';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [FormBuilder, ToDoService]
})
export class DashboardComponent implements OnInit {
  frmTarea: FormGroup;
  tareaModel: ToDoI;

  constructor(private todoService: ToDoService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.frmTarea = this.formBuilder.group({
      Tarea: ['', [Validators.required]]
    });
  }

  get f() {
    return this.frmTarea.controls;
  }

  onSubmit() {
    console.log(this.frmTarea);
    // Si el formulario es invalido lo retorno
    if (this.frmTarea.invalid) {
      return;
    }

    this.tareaModel = {
      nombre: this.frmTarea.get('Tarea').value,
      estado: 'no completado'
    };

    this.todoService
    .createToDo(this.tareaModel)
    .pipe(take(1))
    .subscribe(
      (res) => {
        console.log(res);
        // Pongo el formulario en 0
        this.frmTarea.reset();
      },
      (err) => {
        if (err) {
          swal.fire({
            title: 'Error',
            text:
              'Se ha producido un error al querer guardar la tarea',
            icon: 'error',
            confirmButtonText: 'Ok',
          });
        }
      }
    );
  }
}


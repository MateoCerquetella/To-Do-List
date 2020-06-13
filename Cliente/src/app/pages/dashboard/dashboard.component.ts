import { Component, OnInit } from '@angular/core';
import { ToDoService } from 'src/app/services/todo/todo.service';
import { FormGroup, FormBuilder, Validators, Form } from '@angular/forms';
import { ToDoI } from 'src/app/models/todo';
import { take } from 'rxjs/operators';
import swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [FormBuilder, ToDoService]
})
export class DashboardComponent implements OnInit {
  frmTarea: FormGroup;
  tareaModel: ToDoI;
  noCompletadasTareas: ToDoI[] = [];
  completadasTareas: ToDoI[] = [];
  dataSource = new MatTableDataSource();

  constructor(private todoService: ToDoService, private formBuilder: FormBuilder) {
    this.getToDo();
  }

  getToDo() {
    this.todoService
      .getAllToDo()
      .pipe(take(1))
      .subscribe(
        (res: ToDoI[]) => {
          res.forEach(tarea => {
            if (tarea.completado) {
              this.completadasTareas.push(tarea);
            } else {
              this.noCompletadasTareas.push(tarea);
            }
          });
        },
        (err) => {
          if (err) {
            swal.fire({
              title: 'Error',
              text: 'Se ha producido un error al querer traer las tareas',
              icon: 'error',
              confirmButtonText: 'Ok',
            });
          }
        }
      );
  }

  ngOnInit() {
    this.frmTarea = this.formBuilder.group({
      Tarea: ['', [Validators.required]]
    });
  }

  get f() {
    return this.frmTarea.controls;
  }

  onComplete(item: ToDoI) {
    this.tareaModel = {
      _id: item._id,
      nombre: item.nombre,
      descripcion: item.descripcion,
      completado: !item.completado // Lo niego ya que en HTML me lo trae con el valor antes de darle click.
    };

    this.todoService
      .updateToDo(this.tareaModel)
      .pipe(take(1))
      .subscribe(
        (res: ToDoI) => {
          if (!this.tareaModel.completado) {
            this.completadasTareas.forEach((tarea, index) => {
              if (tarea._id === res._id) {
                this.completadasTareas.splice(index, 1);
                res.completado = false;
                this.noCompletadasTareas.push(res);

              }
            });
          } else {
            this.noCompletadasTareas.forEach((tarea, index) => {
              if (tarea._id === res._id) {
                this.noCompletadasTareas.splice(index, 1);
                res.completado = true;
                this.completadasTareas.push(res);
              }
            });
          }
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
  }

  onSubmit() {
    // Si el formulario es invalido lo retorno
    if (this.frmTarea.invalid) {
      return;
    }

    this.tareaModel = {
      nombre: this.frmTarea.get('Tarea').value,
      completado: false
    };

    this.todoService
      .createToDo(this.tareaModel)
      .pipe(take(1))
      .subscribe(
        (res) => {
          this.noCompletadasTareas.push(res);
          // Pongo el formulario en 0
          this.frmTarea.reset();
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
  }
}


import { Component, OnInit } from '@angular/core';
import { ToDoService } from 'src/app/services/todo/todo.service';
import { FormGroup, FormBuilder, Validators, Form } from '@angular/forms';
import { ToDoI } from 'src/app/models/todo';
import { take } from 'rxjs/operators';
import swal from 'sweetalert2';
import { ToDoComponent } from '../todo/todo.component';
import { MatDialog } from '@angular/material/dialog';


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
  tareasTotales: number;
  tareasPorHacer: number;
  tareasCompletadas: number;
  proximaTarea: Date;

  constructor(private todoService: ToDoService, private formBuilder: FormBuilder, public dialog: MatDialog) {
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
          this.contarTodasLasTareas();
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

  contarTodasLasTareas() {
    this.tareasPorHacer = this.noCompletadasTareas.length; // Contador de tareas NO completadas
    this.tareasCompletadas = this.completadasTareas.length; // Contador de tareas COMPLETADAS
    this.tareasTotales = this.tareasCompletadas + this.tareasPorHacer; // Contador de TODAS las tareas
  }

  ngOnInit() {
    this.frmTarea = this.formBuilder.group({
      Tarea: ['', [Validators.required]]
    });
  }

  onEdit(item: ToDoI) {
    const dialogRef = this.dialog.open(ToDoComponent, {
      width: '700px',
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === undefined) {
        return;
      } else {
        if (!result.data.completado) { // Tarea no completada
          this.noCompletadasTareas.forEach((tarea, index) => {
            if (tarea._id === result.data._id) {
              this.noCompletadasTareas.splice(index, 1);
              this.noCompletadasTareas.unshift(result.data); // Lo mando como primer array
            }
          });
        } else {
          this.completadasTareas.forEach((tarea, index) => {
            if (tarea._id === result.data._id) {
              this.completadasTareas.splice(index, 1);
              this.completadasTareas.unshift(result.data);
            }
          });
        }
        this.contarTodasLasTareas();
        swal.fire({
          title: 'Actualizacion exitosa',
          text: 'Se ha cambiado la tarea con exito',
          icon: 'success',
          confirmButtonText: 'Ok',
        });
      }

    });
  }

  onDelete(item: ToDoI) {

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
          this.contarTodasLasTareas();
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
          this.tareasTotales++;
          this.tareasPorHacer++;
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


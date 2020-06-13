import { Component, OnInit } from '@angular/core';
import { ToDoService } from 'src/app/services/todo/todo.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToDoI } from 'src/app/models/todo';
import { take } from 'rxjs/operators';
import swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';

export interface Element {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  fav: string;
}

const ELEMENT_DATA: Element[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H', fav: "Yes" },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He', fav: "" },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li', fav: "" },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be', fav: "" },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B', fav: "Yes" },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C', fav: "" },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N', fav: "" },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O', fav: "" },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F', fav: "" },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne', fav: "" },
  { position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na', fav: "" },
  { position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg', fav: "" },
  { position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al', fav: "" },
  { position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si', fav: "" },
  { position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P', fav: "" },
  { position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S', fav: "" },
  { position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl', fav: "" },
  { position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar', fav: "" },
  { position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K', fav: "" },
  { position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca', fav: "" },
];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [FormBuilder, ToDoService]
})
export class DashboardComponent implements OnInit {
  frmTarea: FormGroup;
  tareaModel: ToDoI;
  porHacerTareas: ToDoI[] = [];
  completadasTareas: ToDoI[] = [];
  displayedColumns = ['nombre'];

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
            this.porHacerTareas.push(tarea);
          }
        });
        console.log(this.porHacerTareas);
        this.dataSource = new MatTableDataSource(this.porHacerTareas);
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

  onComplete() {
    console.log(this.frmTarea);
    // this.tareaModel = {
    //   nombre: this.frmTarea.get('Tarea').value,
    //   estado: 'completado'
    // };

    // this.todoService
    // .createToDo(this.tareaModel)
    // .pipe(take(1))
    // .subscribe(
    //   (res) => {
    //     console.log(res);
    //     // Pongo el formulario en 0
    //     this.frmTarea.reset();
    //   },
    //   (err) => {
    //     if (err) {
    //       swal.fire({
    //         title: 'Error',
    //         text: 'Se ha producido un error al querer guardar la tarea',
    //         icon: 'error',
    //         confirmButtonText: 'Ok',
    //       });
    //     }
    //   }
    // );
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
        console.log(res);
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


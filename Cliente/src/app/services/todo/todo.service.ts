import { Injectable, isDevMode, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserI } from '../../models/user';
import { JwtResponseI } from '../../models/jwt-response';
import { tap, catchError, map, retry } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HandlerService } from '../handler/handler.service';
import { ToDoI } from 'src/app/models/todo';

@Injectable()
export class ToDoService {
  isProduction: boolean = environment.production;
  SERVER = 'http://localhost:3000';
  constructor(
    private httpClient: HttpClient,
    public jwtHelper: JwtHelperService,
    public errorHandler: HandlerService) {
    if (!isDevMode()) { this.SERVER = 'ponerURL'; }
  }

  // ************************************************ */
  // ToDo Services

  // [HttpGet]
  getAllToDo(): Observable<any> {
    return this.httpClient.get<ToDoI>(`${this.SERVER}/todo/`)
      .pipe(
        retry(3),
        catchError(this.errorHandler.handleError),
        map(res => res)
      );
  }

  // [HttpPost]
  createToDo(ToDo: ToDoI): Observable<any> {
    return this.httpClient.post<ToDoI>(`${this.SERVER}/todo/`,
      ToDo)
      .pipe(
        retry(3),
        catchError(this.errorHandler.handleError)
      );
  }

  // [HttpPut]
  updateToDo(ToDo: ToDoI): Observable<any> {
    return this.httpClient.put<ToDoI>(`${this.SERVER}/todo/${ToDo._id}`,
      ToDo)
      .pipe(
        retry(3),
        catchError(this.errorHandler.handleError)
      );
  }

  // [HttpDelete]
  deleteToDo(ToDo: ToDoI): Observable<any> {
    return this.httpClient.delete<ToDoI>(`${this.SERVER}/todo/${ToDo._id}`)
      .pipe(
        retry(3),
        catchError(this.errorHandler.handleError)
      );
  }

}

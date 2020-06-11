import { Injectable, isDevMode } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable()
export class HandlerService {
  constructor() {}

  public handleError(error: HttpErrorResponse) {
    if (!isDevMode) {
    return throwError('Se ha producido un error');
    } else {
      console.error(error);
      return throwError('Se ha producido un error');
    }
  }
}

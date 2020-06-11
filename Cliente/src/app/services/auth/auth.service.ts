import { Injectable, isDevMode, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserI } from '../../models/user';
import { JwtResponseI } from '../../models/jwt-response';
import { tap, catchError, map, retry } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HandlerService } from '../handler/handler.service';

@Injectable()
export class AuthService {
  isProduction: boolean = environment.production;
  SERVER = 'http://localhost:3000';
  authSubject = new BehaviorSubject(false);
  private token: string;
  constructor(
    private httpClient: HttpClient,
    public jwtHelper: JwtHelperService,
    public errorHandler: HandlerService) {
    if (!isDevMode()) { this.SERVER = 'http://www.mis-pedidos.com.ar'; }
   }

  // ************************************************ */
  // Auth Services

  // [HttpPost]

  register(user: UserI): Observable<JwtResponseI> {
    return this.httpClient.post<JwtResponseI>(`${this.SERVER}/auth`,
      user)
      .pipe(
        catchError(this.errorHandler.handleError),
        tap(
        (res: JwtResponseI) => {
          if (res) {
            // Guardo el token
            this.saveToken(res.accessToken, res.expiresIn);
          }
        })
      );
  }

  // [HttpPost]
  login(user: UserI): Observable<JwtResponseI> {
    return this.httpClient.post<JwtResponseI>(`${this.SERVER}/auth/login`,
      user)
      .pipe(
        retry(3),
        catchError(this.errorHandler.handleError),
        tap(
        (res: JwtResponseI) => {
          if (res) {
            // Guardo el token
            this.saveToken(res.accessToken, res.expiresIn);
          }
        })
      );
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('ACCESS_TOKEN');
    return !this.jwtHelper.isTokenExpired(token);
  }

  // ************************************************ */

  logout(): void {
    this.token = '';
    localStorage.removeItem('ACCESS_TOKEN');
    localStorage.removeItem('EXPIRES_IN');
  }

  public saveToken(token: string, expiresIn: string): void {
    localStorage.setItem('ACCESS_TOKEN', token);
    localStorage.setItem('EXPIRES_IN', expiresIn);
    this.token = token;
  }

  public getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('ACCESS_TOKEN');
    }
    return this.token;
  }

}

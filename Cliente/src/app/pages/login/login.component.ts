import { Component, OnInit, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserI } from '../../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthService, FormBuilder],
})
@Injectable({
  providedIn: 'root',
})
export class LoginComponent implements OnInit {
  frmLogin: FormGroup;
  // frmLoginRegister: FormGroup;
  frmLoginComplete: UserI;
  errorMessage: String;
  error = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.frmLogin = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      recordame: [false],
    });
  }

  onLogin(): void {
    // Si el formulario es invalido lo retorno
    if (this.frmLogin.invalid) {
      return;
    }

    this.frmLoginComplete = {
      username: this.frmLogin.get('username').value,
      email: null,
      password: this.frmLogin.get('password').value
    };
    this.authService.login(this.frmLoginComplete).subscribe(
      (res) => {
        // Si elige la opcion Recordame
        /*if (this.frmLogin.get('recordame').value) {
            localStorage.removeItem('EXPIRES_IN');
        }*/
        // TODO: Pasarlo por servicio
        sessionStorage.setItem('Nombre', res.nombre);
        sessionStorage.setItem('Apellido', res.apellido);
        this.error = false;
        this.router.navigateByUrl('layout/dashboard');
      },
      (err) => {
        console.log(err);
        this.error = true;
        this.errorMessage = 'Usuario y/o contraseña incorrecto';
        this.frmLogin.setValue({
          username: this.frmLogin.get('username').value,
          password: '', // Pongo la password vacia
          recordame: this.frmLogin.get('recordame').value,
        });
      }
    );
  }
}

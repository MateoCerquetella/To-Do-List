import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserI } from 'src/app/models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [AuthService, FormBuilder],
})
export class RegisterComponent implements OnInit {
  frmRegister: FormGroup;
  userModel: UserI;
  errorMessage = '';
  error = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.frmRegister = this.formBuilder.group(
      {
        username: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
        confirmPassword: ['', Validators.required],
      },
      {
        validator: this.MustMatch('password', 'confirmPassword'),
      }
    );
  }

  onRegister(): void {
    this.errorMessage = '';
    // Si el formulario es invalido lo retorno
    if (this.frmRegister.invalid) {
      this.error = true;
      if (this.frmRegister.get('email').status === 'INVALID') {
        this.errorMessage += `El email está mal escrito \n`;
      }
      if (this.frmRegister.get('username').status  === 'INVALID') {
        this.errorMessage += `El username está mal escrito \n`;
      }
      if (this.frmRegister.get('confirmPassword').status  === 'INVALID') {
        this.errorMessage += `Las contraseñas deben ser iguales \n`;
      }
      return;
    }

    this.userModel = {
      username: this.frmRegister.get('username').value,
      email: this.frmRegister.get('email').value,
      password: this.frmRegister.get('password').value
    };
    this.authService.register(this.userModel).subscribe(
      (res) => {
        this.router.navigateByUrl('layout/dashboard');
      },
      (err) => {
        this.error = true;
        this.errorMessage = 'Usuario y/o email en uso';
        this.frmRegister.setValue({
          username: this.frmRegister.get('username').value,
          email: this.frmRegister.get('email').value,
          password: '', // Pongo la password vacia
        });
      }
    );
  }

  // Para que las contraseñas sean iguales en el cliente
  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

}

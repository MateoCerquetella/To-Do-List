import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [AuthService]
})
export class NavbarComponent implements OnInit {
  listTitles: any[];
  location: Location;
  nombreApellido: String;
  focus: any;

  constructor(location: Location, private router: Router, private auth: AuthService) {
    this.location = location;
    const nombre = sessionStorage.getItem('Nombre') || '';
    const apellido = sessionStorage.getItem('Apellido') || '';
    this.nombreApellido = nombre + ' ' + apellido;
  }

  ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);
  }

  getTitle() {
    const titlee = this.location.prepareExternalUrl(this.location.path()).slice(8); // saco /layout/ con el slice
    for (let item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].path === titlee) {
        return this.listTitles[item].title;
      }
    }
    return 'Dashboard';
  }

  logout() {
    this.auth.logout();
    this.router.navigateByUrl('/inicio/login');
  }

}

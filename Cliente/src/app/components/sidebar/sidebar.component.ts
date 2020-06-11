import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouteInfo } from 'src/app/models/routeinfo';
import { AuthService } from 'src/app/services/auth/auth.service';

export const ROUTES: RouteInfo[] = [
  { path: 'dashboard', title: 'Inicio', action: '', icon: 'ni-tv-2 text-primary', class: '' },
  { path: 'tablapedidos', title: 'Pedidos', action: '', icon: 'ni-bullet-list-67 text-red', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  providers: [AuthService]
})
export class SidebarComponent {
  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router, private auth: AuthService) {

    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
    });
  }

  logout() {
    this.auth.logout();
    this.router.navigateByUrl('/inicio/login');
  }

}

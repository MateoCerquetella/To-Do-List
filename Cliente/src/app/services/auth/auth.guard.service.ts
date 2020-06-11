import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {
    isAdmin: boolean;
    isActivated: boolean;
    constructor(
        public authService: AuthService,
        public router: Router) {
        this.isAdmin = false;
        this.isActivated = false;
    }

    canActivate(): boolean {
        if (!this.authService.isAuthenticated()) {
            this.authService.logout();
            this.router.navigate(['inicio/login']);
        }
        this.isActivated = true;
        return this.isActivated;
    }
}

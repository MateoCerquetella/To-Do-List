import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, isDevMode } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layouts/layout/layout.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AuthService } from './services/auth/auth.service';
import { AuthGuardService } from './services/auth/auth.guard.service';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { HandlerService } from './services/handler/handler.service';
import { AuthInterceptor } from './services/auth/auth.interceptor.service';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    LayoutComponent,
    AuthLayoutComponent
  ],
  providers: [
    AuthService,
    AuthGuardService,
    JwtHelperService,
    HandlerService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

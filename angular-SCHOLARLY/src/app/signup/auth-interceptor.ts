import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    constructor(public authService: AuthService){}
    intercept(reg: HttpRequest<any>, next: HttpHandler) {
        const authToken = this.authService.getToken();
        const authRequest = reg.clone({
            headers: reg.headers.set('authorization', 'Bearer ' + authToken)
        });
        return next.handle(authRequest);
    }
}

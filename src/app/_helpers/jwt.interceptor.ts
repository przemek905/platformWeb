import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {NGXLogger} from "ngx-logger";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(private logger: NGXLogger) {}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.logger.info("In JwtInterceptor. Add authorization header to the request.")
        // add authorization header with jwt token if available
        let currentUser = this.getCurrentUser();
        if (currentUser && currentUser.token) {
            request = request.clone({
                setHeaders: { 
                    Authorization: `Bearer ${currentUser.token}`
                }
            });
        }

        return next.handle(request);
    }

    getCurrentUser() {
        let rememberMe = JSON.parse(localStorage.getItem('rememberMe'));
        return rememberMe ? JSON.parse(localStorage.getItem('currentUser')) : JSON.parse(sessionStorage.getItem('currentUser'));
    }
}
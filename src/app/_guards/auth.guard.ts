import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {NGXLogger} from "ngx-logger";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private logger: NGXLogger) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.logger.info("In AuthGuard. Check access to site.")
        if (localStorage.getItem('currentUser') && !localStorage.getItem('passwordReset')) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/pplatform/login']);
        return false;
    }
}
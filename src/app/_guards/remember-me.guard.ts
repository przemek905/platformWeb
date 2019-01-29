import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {NGXLogger} from "ngx-logger";

@Injectable()
export class RememberMeGuard implements CanActivate {

    constructor(private router: Router, private logger: NGXLogger) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.logger.info("In AuthGuard. Check access to site.");

        if (localStorage.getItem('currentUser') || sessionStorage.getItem('currentUser')) {
            // logged in so no login page needed
            this.router.navigate(['/pplatform']);
            return false;
        }

        return true;
    }
}
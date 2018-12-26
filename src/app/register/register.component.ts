import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {AlertService, AuthenticationService, UserService} from '../_services/index';
import {NGXLogger} from "ngx-logger";

@Component({
    templateUrl: 'register.component.html'
})

export class RegisterComponent {
    model: any = {};
    loading = false;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private logger: NGXLogger) {
    }

    register() {
        this.loading = true;
        this.logger.info("Call api for signup method");
        this.authenticationService.signup(this.model)
            .subscribe(
                data => {
                    // set success message and pass true paramater to persist the message after redirecting to the login page
                    this.alertService.success('Registration successful. Please check your email box', true);
                    this.router.navigate(['/pplatform/login']);
                },
                error => {
                    this.alertService.error(error);
                    this.logger.error(error);
                    this.loading = false;
                });
    }
}

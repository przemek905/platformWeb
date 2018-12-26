import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import {AlertService, AuthenticationService, UserService} from '../_services/index';
import {User} from "../_models";
import {NGXLogger} from "ngx-logger";

@Component({
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private logger: NGXLogger) { }

    ngOnInit() {
        this.authenticationService.logout();
    }

    login() {
        this.loading = true;
        this.logger.info("Login to the platform");
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(
                data => {
                    this.router.navigate(["/pplatform"]);
                },
                error => {
                    let message;
                    if (error.status === 403) {
                        message = "Invalid credentials";
                    }
                    else {
                        message = "Server error";
                    }
                    this.alertService.error(message);
                    this.logger.error(error);
                    this.loading = false;
                });
    }
}

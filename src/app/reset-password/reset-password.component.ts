import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AlertService, AuthenticationService, UserService} from "../_services";
import {NGXLogger} from "ngx-logger";

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

    model: any = {};
    loading = false;

    constructor(private router: Router,
                private userService: UserService,
                private alertService: AlertService,
                private logger: NGXLogger) {
    }

    ngOnInit() {
    }

    resetPassword() {
        this.loading = true;
        this.logger.info("Call api for reset password method");
        this.userService.resetPassword(this.model.email)
            .subscribe(
                resetSuccess => {
                    this.alertService.success('Reset password completed. Please check your email box for new password.', true);
                    this.router.navigate(['/pplatform/login']);
                },
                error => {
                    this.alertService.error("Server error");
                    this.logger.error(error);
                    this.loading = false;
                });
    }

}

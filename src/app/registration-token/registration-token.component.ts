import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AlertService, AuthenticationService} from "../_services";
import {NGXLogger} from "ngx-logger";
import {logger} from "codelyzer/util/logger";

@Component({
    selector: 'app-registration-token',
    templateUrl: './registration-token.component.html',
    styleUrls: ['./registration-token.component.css']
})
export class RegistrationTokenComponent implements OnInit {

    loading = false;

    constructor(private router: Router,
                private route: ActivatedRoute,
                private authenticationService: AuthenticationService,
                private alertService: AlertService,
                private logger: NGXLogger) {
    }

    ngOnInit() {
        const token: string = this.route.snapshot.queryParamMap.get('token');

        this.loading = true;
        this.logger.info("Calling api for register token method");
        this.authenticationService.registerToken(token)
            .subscribe(
                data => {
                    // set success message and pass true paramater to persist the message after redirecting to the login page
                    this.alertService.success('Your account is now active. Please try login.', true);
                    this.router.navigate(['/pplatform/login']);
                },
                error => {
                    this.logger.error(error);
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

}

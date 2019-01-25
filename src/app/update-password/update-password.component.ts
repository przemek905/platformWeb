import {AfterViewChecked, AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AlertService, UserService} from "../_services";
import {NGXLogger} from "ngx-logger";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit, AfterViewChecked, OnDestroy {

  model: any = {};
  loading = false;
  wasReset: boolean;
  subscription: Subscription;


  constructor(private router: Router,
              private userService: UserService,
              private alertService: AlertService,
              private logger: NGXLogger) {
  }

  ngOnInit(): void {
    this.wasReset = false;

    this.subscription = this.userService.getResetFlag().subscribe(flag => {
      this.wasReset = flag;
    });
  }

  ngAfterViewChecked(): void {
    if (this.wasReset === true) {
      this.alertService.success("Please update your password after reset.", false);
    }
  }

  updatePassword() {
    this.loading = true;
    if (this.model.newPassword != this.model.newPasswordRepeat) {
      this.alertService.error("Password and confirm password must be the same.");
      this.loading = false;
    } else {
      this.logger.info("Call api for update password method");
      this.userService.updatePassword(this.model.newPassword, this.model.oldPassword)
          .subscribe(
              resetSuccess => {
                this.alertService.success('Update password completed. Please try login with new credentials.', true);
                this.router.navigate(['/pplatform/login']);
                this.userService.setResetFlag(false);
                localStorage.removeItem('passwordReset');
              },
              error => {
                if (error.status === 404) {
                  this.alertService.error(error.error.message);
                } else {
                  this.alertService.error("Server error");
                }
                this.logger.error(error);
                this.loading = false;
              });
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }



}

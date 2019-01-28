import { Component, OnInit } from '@angular/core';

import { User } from '../_models/index';
import {AuthenticationService, UserService} from '../_services/index';
import {NGXLogger} from "ngx-logger";
import {HomeService} from "../_services/home.service";

@Component({
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
    currentUser: User;
    message: string;
    adminMessage: string;

    constructor(private userService: UserService, private logger: NGXLogger, private homeService: HomeService, private authService: AuthenticationService) {
        let rememberMe = JSON.parse(localStorage.getItem('rememberMe'));
        this.currentUser = rememberMe ?
            JSON.parse(localStorage.getItem('currentUser'))
            : JSON.parse(sessionStorage.getItem('currentUser'));
    }

    ngOnInit(): void {
        this.homeService.getMessage().subscribe(response => {
            this.message = response;
        });

        this.homeService.getAdminMessage().subscribe(response => {
            this.adminMessage = response;
        });
    }

    logout() {
        this.authService.logout();
    }

}
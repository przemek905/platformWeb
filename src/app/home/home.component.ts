import { Component, OnInit } from '@angular/core';

import { User } from '../_models/index';
import { UserService } from '../_services/index';
import {NGXLogger} from "ngx-logger";
import {HomeService} from "../_services/home.service";

@Component({
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
    currentUser: User;
    message: string;

    constructor(private userService: UserService, private logger: NGXLogger, private homeService: HomeService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit(): void {
        this.homeService.getMessage().subscribe(response => {
            this.message = response;
        })
    }


}
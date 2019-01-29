import {Component, OnInit} from '@angular/core';
import {User} from "./_models";
import {AuthenticationService, UserService} from "./_services";

@Component({
    selector: 'app',
    templateUrl: 'app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
    currentUser: User = null;

    constructor(private userService: UserService, private authService: AuthenticationService) {
        let rememberMe = JSON.parse(localStorage.getItem('rememberMe'));
        this.currentUser = rememberMe ?
            JSON.parse(localStorage.getItem('currentUser'))
            : JSON.parse(sessionStorage.getItem('currentUser'));
    }

    ngOnInit(): void {
        this.userService.getCurrentLoggedUser().subscribe(response => {
            this.currentUser = response;
        });
    }

    logout() {
        this.authService.logout();
    }
}
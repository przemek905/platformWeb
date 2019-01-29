import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

import {BehaviorSubject, Observable, Subject} from "rxjs";
import {User} from "../_models";

@Injectable()
export class UserService {

    private wasResetPassword: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private currentLoggedUser: Subject<User> = new Subject<User>();

    private host = "http://localhost:8981";
    private appPrefix = "/pplatform";
    private resetUrl = this.host + this.appPrefix + "/user/resetPassword";
    private updateUrl = this.host + this.appPrefix + "/user/updatePassword";

    constructor(private http: HttpClient) { }

    resetPassword(email: string): Observable<boolean> {
        let params = new HttpParams().set('email', email);
        return this.http.get<any>(this.resetUrl, { params: params })
            .map((response) => {
                return true;
            });
    }

    updatePassword(oldPassword: string, newPassword: string): Observable<boolean> {
        let params = new HttpParams().set('password', oldPassword)
            .set('oldPassword', newPassword);
        return this.http.get<any>(this.updateUrl, { params: params })
            .map((response) => {
                return true;
            });
    }

    setResetFlag(reset: boolean ) {
        this.wasResetPassword.next(reset);
    }

    getResetFlag(): Observable<boolean> {
        return this.wasResetPassword.asObservable();
    }

    setCurrentLoggedUser(currentUser) {
        this.currentLoggedUser.next(currentUser);
    }

    getCurrentLoggedUser(): Observable<User> {
        return this.currentLoggedUser.asObservable();
    }

}
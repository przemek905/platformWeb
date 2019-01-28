import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import {User} from "../_models";
import {NGXLogger} from "ngx-logger";
import {UserService} from "./user.service";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable()
export class AuthenticationService {
    private host = "http://localhost:8981";
    private appPrefix = "/pplatform";
    private authUrl = this.host + this.appPrefix + "/login";
    private signUrl = this.host + this.appPrefix + "/signup";
    private registerTokenUrl = this.host + this.appPrefix + "/registrationConfirm";
    private httpOptions = {
        headers : new HttpHeaders().set('Content-Type', 'application/json'),
        responseType: 'text' as 'json',
        observe: 'response' as 'body'
    };

    constructor(private http: HttpClient, private logger: NGXLogger, private userService: UserService) {
    }

    login(username: string, password: string, rememberMe: boolean): Observable<boolean> {
        return this.http.post<any>(this.authUrl, {username: username, password: password}, this.httpOptions)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let token = response.headers.get("Authorization");
                if (token) {
                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    if (rememberMe) {
                        localStorage.setItem('rememberMe', 'true');
                        localStorage.setItem('currentUser', JSON.stringify({username: username, token: token}));
                        localStorage.setItem('userRoles', JSON.stringify(this.getUserRoles(token)));}
                    else {
                        sessionStorage.setItem('currentUser', JSON.stringify({username: username, token: token}));
                        sessionStorage.setItem('userRoles', JSON.stringify(this.getUserRoles(token)));
                    }
                    this.checkResetPasswordFlag(response, rememberMe);

                    // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }
            });
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        localStorage.clear();
        sessionStorage.clear();
    }

    signup(user: User): Observable<User> {
        return this.http.post(this.signUrl, user)
            .map((response: Response) => {
                return new User(response);
            });
    }

    registerToken(token: string): Observable<User> {
        let params = new HttpParams().set('token', token);
        return this.http.get<User>(this.registerTokenUrl, { params: params })
        .map((response) => {
            return new User(response);
        });
    }

    getUserRoles(token) {
        const helper = new JwtHelperService();
        const decodedToken = helper.decodeToken(token);
        const roles: string[] = decodedToken.roles;
        return roles;
    }

    checkResetPasswordFlag(response, rememberMe) {
        let isReset = response.headers.get("PasswordReset");
        if (isReset) {
            rememberMe ?
                localStorage.setItem('passwordReset', JSON.stringify({passwordReset: true}))
                : sessionStorage.setItem('passwordReset', JSON.stringify({passwordReset: true}));
            this.userService.setResetFlag(true);
        }
    }
}
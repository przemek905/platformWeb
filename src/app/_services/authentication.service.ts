import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import {User} from "../_models";
import {NGXLogger} from "ngx-logger";

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

    constructor(private http: HttpClient, private logger: NGXLogger) {
    }

    login(username: string, password: string): Observable<boolean> {
        return this.http.post<any>(this.authUrl, {username: username, password: password}, this.httpOptions)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let token = response.headers.get("Authorization");
                if (token) {
                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({username: username, token: token}));

                    // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }
            });
    }

    // getToken(): String {
    //     const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    //     const token = currentUser && currentUser.token;
    //     return token ? token : "";
    // }
    //
    // isLoggedIn(): boolean {
    //     var token: String = this.getToken();
    //     return token && token.length > 0;
    // }

    logout(): void {
        // clear token remove user from local storage to log user out
        localStorage.removeItem('currentUser');
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
}
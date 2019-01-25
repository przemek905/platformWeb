import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export class HomeService {

  private host = "http://localhost:8981";
  private appPrefix = "/pplatform";
  private homeUrl = this.host + this.appPrefix + "/";
  private adminHomeUrl = this.host + this.appPrefix + "/adminMessage";

    private httpOptions = {
        headers : new HttpHeaders().set('Content-Type', 'application/json'),
        responseType: 'text' as 'json',
        observe: 'response' as 'body'
    };

  constructor(private http: HttpClient) { }

  getMessage(): Observable<string> {
    return this.http.get<any>(this.homeUrl, this.httpOptions)
        .map((response) => {
          return response.body;
        });
  }

    getAdminMessage(): Observable<string> {
      if(localStorage.getItem('userRoles').includes("ROLE_ADMIN")) {
        return this.http.get<any>(this.adminHomeUrl, this.httpOptions)
            .map((response) => {
                return response.body;
            });
      }
    }

}

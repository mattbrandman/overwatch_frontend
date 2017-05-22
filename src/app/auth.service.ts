// auth.service.ts

import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { User } from './user';
import { Router } from '@angular/router';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthService {

  constructor(private http: Http, private router: Router, private authHttp: AuthHttp) {}

  signup(username: string, password: string) {
    return this.http.post('http://localhost:8080/api/register/', {username, password})
                    .map(res => res.json());
  }

  login(username: string, password: string) {
    return this.http.post('http://localhost:8080/api/login/', {username, password})
    				.map(res => res.json());
  }

  get_profile(): Observable<User> {
    return this.authHttp.get('http://localhost:8080/api/profile/')
    					.map(this.extractData)
    					.catch(this.handleError); 
  }

  private extractData(res: Response) {
  	let body = res.json().user;
  	delete body['_id'];
  	delete body['__v'];
  	body.password = "nopeeking";
  	return body;
  }

  private handleError (error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
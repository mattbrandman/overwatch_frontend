
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Match } from './match';
import { Router } from '@angular/router';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import { Player } from './player';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class MatchService {

  constructor(private http: Http, private router: Router, private authHttp: AuthHttp) {}

  //we need to pass in this to map in order
  //for it to allow for nested calls 
  //fat arrow functions bind the scope lexically automatically
  get_match(): Observable<Match> {
    return this.authHttp.get('http://localhost:8080/api/match/')
    					.map(val => this.extractData(val))
    					.catch(this.handleError); 
  }
 
  extractData(res: Response): Match {
  	let body = res.json();
    let players = body.players;
    var team1 = this.filterByTeam(players, 1);
    var team2 = this.filterByTeam(players, 2);
    var match = new Match(team1, team2);
  	return match;
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

  filterByTeam(players: any[], teamNumber: number) {
    return players.filter(function(el){return teamNumber == el.team})
  }

  vote_for_team(winners: number): Observable<string> {
    let body = { winning_team: winners };
    return this.authHttp.post('http://localhost:8080/api/match/vote', body)
              .map(val => val)
              .catch(this.handleError); 
  }
}




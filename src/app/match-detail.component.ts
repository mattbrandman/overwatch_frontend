import { Component, Input, OnInit } from '@angular/core';
import { User } from './user';
import { Match } from './match';
import { MatchService } from './match.service';
import { OwSocket } from './socket.service';
import { Router } from '@angular/router';
@Component({
  selector: 'match-detail',
  templateUrl: './match-detail.component.html',
  providers: [ MatchService ]
})
export class MatchDetailComponent implements OnInit {
  public match: Match;
  public voted_on: number;
  public teamVote: number = 0;
  mode = 'Observable'
  constructor(private matchService: MatchService, private socketService: OwSocket, private router: Router){}
  ngOnInit(){
    this.matchService.get_match()
                      .subscribe(data => this.match = data);
    this.socketService.connect();
    this.socketService.getSocket().on('gameOver', (data: any) => {this.router.navigate(['/profile'])}); 
  }

  clicker(winner: number) {
    this.teamVote = winner;
    this.matchService.vote_for_team(winner).subscribe(answer => console.log(answer));
    this.voted_on = winner;
  }
}

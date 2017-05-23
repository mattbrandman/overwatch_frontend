import { Component, Input, OnInit } from '@angular/core';
import { User } from './user';
import { MatchService } from './match.service';
@Component({
  selector: 'match-detail',
  template: `

  `,
  providers: [MatchService]
})
export class MatchDetailComponent implements OnInit {
  
  constructor(private matchService: MatchService){}
  ngOnInit(){
    this.matchService.get_match()
                      .subscribe(data => console.log(data));
  }
}

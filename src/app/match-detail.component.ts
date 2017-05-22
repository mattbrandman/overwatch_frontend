import { Component, Input } from '@angular/core';
import { User } from './user';
@Component({
  selector: 'match-detail',
  template: `
  	<div class="col-md-6">
  		<team-detail [team] = "team1"></team-detail>
  	</div>
  	<div class="col-md-6">
  		<team-detail [team] = "team2"></team-detail>
  	</div>
  `
})
export class MatchDetailComponent {
  @Input() team1: User[];
  @Input() team2: User[];
  @Input() map: number;
}

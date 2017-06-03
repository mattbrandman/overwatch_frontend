import { Component, Input } from '@angular/core';
import { Player } from './player';
@Component({
  selector: 'team-detail',
  template: `
    <div class="list-group">
      <a *ngFor="let user of team"
        class="list-group-item">{{user.username}}
        </a>
    </div>
  `
})
export class TeamDetailComponent {
  @Input() team: Player[];
}

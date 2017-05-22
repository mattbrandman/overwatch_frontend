import { Component } from '@angular/core';

import { User } from './user';


@Component({
  selector: 'my-app',
  template: `
  <h1>Overwatch Pugger</h1>
  <router-outlet></router-outlet>
  	`,
})
export class AppComponent  {
 }

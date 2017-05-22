import { Component, Input, OnInit } from '@angular/core';
import { User } from './user';
import { AuthService } from './auth.service'
import * as io from 'socket.io-client';

@Component({
  selector: 'user-detail',
  templateUrl: './user-detail.component.html',
  providers: [ AuthService ],
})
export class UserDetailComponent implements OnInit{
  public user: User;
  mode = 'Observable';
  public in_queue: boolean = false
  constructor(
    private authService: AuthService) {}

  ngOnInit(){
    this.authService.get_profile()
                     .subscribe(
                       new_user => this.user = new_user);
  }

  websocketTest() {
    var jwt = localStorage.getItem('token');
    var socket = io('http://localhost:8080');
    socket.on('connect', function() {
      socket.emit('authenticate', {token: jwt})
            .on('authenticated', function() {
              console.log('success')
            })
    });
    socket.on('message', (function(message: any) {
      if (message.data === "in queue") {
        console.log('yes');
        this.in_queue = true;
      } else {
        console.log(message.data);
      }}).bind(this));
  }

}

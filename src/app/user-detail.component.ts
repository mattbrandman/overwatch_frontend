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
  public in_queue: boolean = false;
  private socket: any;
  constructor(
    private authService: AuthService) {}

  ngOnInit(){
    this.authService.get_profile()
                     .subscribe(
                       new_user => this.user = new_user);

    var jwt = localStorage.getItem('token');
    
    this.socket = io('http://localhost:8080');

    this.socket.on('connect', (function() {
      this.socket.emit('authenticate', {token: jwt})
            .on('authenticated', function() {
              console.log('success')
            })
    }).bind(this));
    this.socket.on('message', 
                 (function(data:any){
                   if (data.data == 'in queue') {
                   console.log(data);
                   this.in_queue = true;
                 } else if (data.data == 'found game') {
                   console.log(data)
                 }
                 }).bind(this));
  }

  websocketTest() {
    this.socket.emit('message');
  }

}

import { Component, Input, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { User } from './user';
import { AuthService } from './auth.service'
import * as io from 'socket.io-client';
import { NgbdModalComponent } from './readycheck-modal.component'

@Component({
  selector: 'user-detail',
  templateUrl: './user-detail.component.html',
  providers: [ AuthService],
})
export class UserDetailComponent implements OnInit, AfterViewInit {
  public user: User;
  mode = 'Observable';
  public in_queue: boolean = false;
  private socket: any;
  @ViewChild(NgbdModalComponent) readyModal: NgbdModalComponent;
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

    this.socket.on('inQueue', function() {
      console.log('answered');
    });

  }

  ngAfterViewInit() {
    var socket = this.socket
    var readyModal = this.readyModal
    socket.on('readyCheck', 
      function() {
        var readyPromise = readyModal.open();
        readyPromise.then(
          function(result:any) {
            if(result == 'Ready') {
              socket.emit('Ready')
            }
          });
        });
  }

  joinQueue() {
    var socket = this.socket;
    socket.emit('joinQueue');

  }

}

import { Component, Input, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { User } from './user';
import { AuthService } from './auth.service';
import { NgbdModalComponent } from './readycheck-modal.component';
import { OwSocket } from './socket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'user-detail',
  templateUrl: './user-detail.component.html',
  providers: [ AuthService ],
})
export class UserDetailComponent implements OnInit, AfterViewInit, onDestroy {
  public user: User;
  mode = 'Observable';
  public in_queue: boolean = false;
  private socket: any;
  private readyCheckSub: any;
  @ViewChild(NgbdModalComponent) readyModal: NgbdModalComponent;
  constructor(
    private authService: AuthService, private socketService: OwSocket, private router: Router) {}

  ngOnInit(){
    this.authService.get_profile()
                     .subscribe(
                       new_user => this.user = new_user);

    this.socketService.connect();
    this.socket = this.socketService.getSocket();
    this.socket.on('inQueue', function() {
      console.log('answered');
    });
  }

  ngOnDestroy() {
    this.readyCheckSub.unsubscribe();
  }

  ngAfterViewInit() {
    var socket = this.socket
    var readyModal = this.readyModal
    this.readyCheckSub = this.socketService.getReadyCheck().subscribe(message => {
      var readyPromise = readyModal.open();
      readyPromise.then(
        function(result:any) {
          if(result == 'Ready') {
            socket.emit('Ready')
          }
        });
    });
    socket.once('gameStarted', (data: any) => this.router.navigate(['/match']));
    socket.once('inGame', (data: any) => this.router.navigate(['/match']));
  }


  joinQueue() {
    var socket = this.socket;
    socket.emit('joinQueue');

  }

  clickey() {
    console.log('heard')
    this.router.navigate(['/match']);
  }

}

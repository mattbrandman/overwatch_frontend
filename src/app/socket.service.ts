
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Match } from './match';
import { Router } from '@angular/router';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Player } from './player';
import * as io from 'socket.io-client';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class OwSocket {
  private url = 'http://localhost:8080';  
  public socket: any;
  public connected: boolean = false;

  connect() {

    if (!this.connected) {
      console.log('here');
      var jwt = localStorage.getItem('token');
      this.socket = io(this.url);
      this.socket.on('connect', (function() {
        this.socket.emit('authenticate', {token: jwt})
        this.socket.on('authenticated', function() {
                console.log('success')
        })
      }).bind(this));
      this.connected = true;
      console.log(this.connected);
    }
  }

  getSocket() {
    return this.socket;
  }

  sendMessage(event: String, message: any){
    this.socket.emit(event, message);    
  }  

  getReadyCheck() {
    let observable = new Observable((observer: Observer<any>) => {
      this.socket.on('readyCheck', () => {
        observer.next('');   
      });
    });    
    return observable;
  }
}
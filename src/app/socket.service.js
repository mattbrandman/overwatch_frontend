"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var io = require("socket.io-client");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
var OwSocket = (function () {
    function OwSocket() {
        this.url = 'http://localhost:8080';
        this.connected = false;
    }
    OwSocket.prototype.connect = function () {
        if (!this.connected) {
            var jwt = localStorage.getItem('token');
            this.socket = io(this.url);
            this.socket.on('connect', (function () {
                this.socket.emit('authenticate', { token: jwt });
                this.socket.on('authenticated', function () {
                    console.log('success');
                });
            }).bind(this));
            this.connected = true;
            console.log(this.connected);
        }
    };
    OwSocket.prototype.getSocket = function () {
        return this.socket;
    };
    OwSocket.prototype.sendMessage = function (event, message) {
        this.socket.emit(event, message);
    };
    return OwSocket;
}());
OwSocket = __decorate([
    core_1.Injectable()
], OwSocket);
exports.OwSocket = OwSocket;
//# sourceMappingURL=socket.service.js.map
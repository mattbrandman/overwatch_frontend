"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var auth_service_1 = require("./auth.service");
var io = require("socket.io-client");
var UserDetailComponent = (function () {
    function UserDetailComponent(authService) {
        this.authService = authService;
        this.mode = 'Observable';
        this.in_queue = false;
    }
    UserDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.authService.get_profile()
            .subscribe(function (new_user) { return _this.user = new_user; });
    };
    UserDetailComponent.prototype.websocketTest = function () {
        var jwt = localStorage.getItem('token');
        var socket = io('http://localhost:8080');
        socket.on('connect', function () {
            socket.emit('authenticate', { token: jwt })
                .on('authenticated', function () {
                console.log('success');
            });
        });
        socket.on('message', (function (message) {
            if (message.data === "in queue") {
                console.log('yes');
                this.in_queue = true;
            }
            else {
                console.log(message.data);
            }
        }).bind(this));
    };
    return UserDetailComponent;
}());
UserDetailComponent = __decorate([
    core_1.Component({
        selector: 'user-detail',
        templateUrl: './user-detail.component.html',
        providers: [auth_service_1.AuthService],
    }),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], UserDetailComponent);
exports.UserDetailComponent = UserDetailComponent;
//# sourceMappingURL=user-detail.component.js.map
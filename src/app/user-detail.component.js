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
var readycheck_modal_component_1 = require("./readycheck-modal.component");
var socket_service_1 = require("./socket.service");
var router_1 = require("@angular/router");
var UserDetailComponent = (function () {
    function UserDetailComponent(authService, socketService, router) {
        this.authService = authService;
        this.socketService = socketService;
        this.router = router;
        this.mode = 'Observable';
        this.in_queue = false;
    }
    UserDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.authService.get_profile()
            .subscribe(function (new_user) { return _this.user = new_user; });
        this.socketService.connect();
        this.socket = this.socketService.getSocket();
        this.socket.on('inQueue', function () {
            console.log('answered');
        });
    };
    UserDetailComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        var socket = this.socket;
        var readyModal = this.readyModal;
        socket.on('readyCheck', function () {
            var readyPromise = readyModal.open();
            readyPromise.then(function (result) {
                if (result == 'Ready') {
                    socket.emit('Ready');
                }
            });
        });
        socket.on('gameStarted', function (data) { return _this.router.navigate(['/match']); });
        socket.on('inGame', function (data) { return _this.router.navigate(['/match']); });
    };
    UserDetailComponent.prototype.joinQueue = function () {
        var socket = this.socket;
        socket.emit('joinQueue');
    };
    UserDetailComponent.prototype.clickey = function () {
        console.log('heard');
        this.router.navigate(['/match']);
    };
    return UserDetailComponent;
}());
__decorate([
    core_1.ViewChild(readycheck_modal_component_1.NgbdModalComponent),
    __metadata("design:type", readycheck_modal_component_1.NgbdModalComponent)
], UserDetailComponent.prototype, "readyModal", void 0);
UserDetailComponent = __decorate([
    core_1.Component({
        selector: 'user-detail',
        templateUrl: './user-detail.component.html',
        providers: [auth_service_1.AuthService],
    }),
    __metadata("design:paramtypes", [auth_service_1.AuthService, socket_service_1.OwSocket, router_1.Router])
], UserDetailComponent);
exports.UserDetailComponent = UserDetailComponent;
//# sourceMappingURL=user-detail.component.js.map
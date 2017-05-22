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
var user_1 = require("./user");
var auth_service_1 = require("./auth.service");
var router_1 = require("@angular/router");
var UserAuthFormComponent = (function () {
    function UserAuthFormComponent(authService, router) {
        this.authService = authService;
        this.router = router;
        this.creating_new = false;
        this.model = new user_1.User('', '', '', 0, 0, 0);
    }
    UserAuthFormComponent.prototype.loginUser = function (name, password) {
        var _this = this;
        this.authService.login(name, password)
            .subscribe(function (user) {
            console.log(user.token);
            console.log('hi');
            localStorage.setItem('token', user.token);
            localStorage.setItem('hi', 'noe');
            _this.router.navigate(['/profile']);
        });
    };
    UserAuthFormComponent.prototype.signupUser = function (name, password) {
        this.authService.signup(this.model.username, this.model.password)
            .subscribe(function (user) { return console.log(user); });
    };
    UserAuthFormComponent.prototype.onC = function () {
        this.authService.get_profile()
            .subscribe(function (data) { return console.log(data); });
    };
    UserAuthFormComponent.prototype.onSubmit = function () {
        if (this.creating_new == true) {
            this.signupUser(this.model.username, this.model.password);
        }
        else {
            this.loginUser(this.model.username, this.model.password);
        }
    };
    return UserAuthFormComponent;
}());
UserAuthFormComponent = __decorate([
    core_1.Component({
        selector: 'user-auth-form',
        templateUrl: './user-auth-form.component.html',
        providers: [auth_service_1.AuthService],
    }),
    __metadata("design:paramtypes", [auth_service_1.AuthService, router_1.Router])
], UserAuthFormComponent);
exports.UserAuthFormComponent = UserAuthFormComponent;
//# sourceMappingURL=user-auth-form.component.js.map
// auth.service.ts
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
var http_1 = require("@angular/http");
var router_1 = require("@angular/router");
var angular2_jwt_1 = require("angular2-jwt");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
var AuthService = (function () {
    function AuthService(http, router, authHttp) {
        this.http = http;
        this.router = router;
        this.authHttp = authHttp;
    }
    AuthService.prototype.signup = function (username, password) {
        return this.http.post('http://localhost:8080/api/register/', { username: username, password: password })
            .map(function (res) { return res.json(); });
    };
    AuthService.prototype.login = function (username, password) {
        return this.http.post('http://localhost:8080/api/login/', { username: username, password: password })
            .map(function (res) { return res.json(); });
    };
    AuthService.prototype.get_profile = function () {
        return this.authHttp.get('http://localhost:8080/api/profile/')
            .map(this.extractData)
            .catch(this.handleError);
    };
    AuthService.prototype.extractData = function (res) {
        var body = res.json().user;
        delete body['_id'];
        delete body['__v'];
        body.password = "nopeeking";
        return body;
    };
    AuthService.prototype.handleError = function (error) {
        // In a real world app, you might use a remote logging infrastructure
        var errMsg;
        if (error instanceof http_1.Response) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable_1.Observable.throw(errMsg);
    };
    return AuthService;
}());
AuthService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, router_1.Router, angular2_jwt_1.AuthHttp])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map
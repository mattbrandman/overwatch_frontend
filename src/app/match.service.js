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
var match_1 = require("./match");
var router_1 = require("@angular/router");
var angular2_jwt_1 = require("angular2-jwt");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
var MatchService = (function () {
    function MatchService(http, router, authHttp) {
        this.http = http;
        this.router = router;
        this.authHttp = authHttp;
    }
    //we need to pass in this to map in order
    //for it to allow for nested calls 
    //fat arrow functions bind the scope lexically automatically
    MatchService.prototype.get_match = function () {
        var _this = this;
        return this.authHttp.get('http://localhost:8080/api/match/')
            .map(function (val) { return _this.extractData(val); })
            .catch(this.handleError);
    };
    MatchService.prototype.extractData = function (res) {
        var body = res.json();
        var players = body.players;
        var team1 = this.filterByTeam(players, 1);
        var team2 = this.filterByTeam(players, 2);
        var match = new match_1.Match(team1, team2);
        return match;
    };
    MatchService.prototype.handleError = function (error) {
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
    MatchService.prototype.filterByTeam = function (players, teamNumber) {
        return players.filter(function (el) { return teamNumber == el.team; });
    };
    MatchService.prototype.vote_for_team = function (winners) {
        var body = { winning_team: winners };
        return this.authHttp.post('http://localhost:8080/api/match/vote', body)
            .map(function (val) { return val; })
            .catch(this.handleError);
    };
    return MatchService;
}());
MatchService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, router_1.Router, angular2_jwt_1.AuthHttp])
], MatchService);
exports.MatchService = MatchService;
//# sourceMappingURL=match.service.js.map
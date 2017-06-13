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
var match_service_1 = require("./match.service");
var socket_service_1 = require("./socket.service");
var router_1 = require("@angular/router");
var MatchDetailComponent = (function () {
    function MatchDetailComponent(matchService, socketService, router) {
        this.matchService = matchService;
        this.socketService = socketService;
        this.router = router;
        this.teamVote = 0;
        this.mode = 'Observable';
    }
    MatchDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.matchService.get_match()
            .subscribe(function (data) { return _this.match = data; });
        this.socketService.connect();
        this.socketService.getSocket().on('gameOver', function (data) { _this.router.navigate(['/profile']); });
    };
    MatchDetailComponent.prototype.clicker = function (winner) {
        this.teamVote = winner;
        this.matchService.vote_for_team(winner).subscribe(function (answer) { return console.log(answer); });
        this.voted_on = winner;
    };
    return MatchDetailComponent;
}());
MatchDetailComponent = __decorate([
    core_1.Component({
        selector: 'match-detail',
        templateUrl: './match-detail.component.html',
        providers: [match_service_1.MatchService]
    }),
    __metadata("design:paramtypes", [match_service_1.MatchService, socket_service_1.OwSocket, router_1.Router])
], MatchDetailComponent);
exports.MatchDetailComponent = MatchDetailComponent;
//# sourceMappingURL=match-detail.component.js.map
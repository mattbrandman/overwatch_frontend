"use strict";
var User = (function () {
    function User(username, password, rank, wins, losses, draws) {
        this.username = username;
        this.password = password;
        this.rank = rank;
        this.wins = wins;
        this.losses = losses;
        this.draws = draws;
    }
    return User;
}());
exports.User = User;
//# sourceMappingURL=user.js.map
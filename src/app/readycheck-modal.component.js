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
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var Rx_1 = require("rxjs/Rx");
var NgbdModalContent = (function () {
    function NgbdModalContent(activeModal) {
        this.activeModal = activeModal;
        this.seconds = 30;
        this.start = 30;
    }
    NgbdModalContent.prototype.ngOnInit = function () {
        var _this = this;
        var timer = Rx_1.Observable.timer(0, 1000);
        timer
            .map(function (t) { return _this.start - t; })
            .subscribe(function (t) { return _this.seconds = t; });
    };
    return NgbdModalContent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], NgbdModalContent.prototype, "name", void 0);
NgbdModalContent = __decorate([
    core_1.Component({
        selector: 'ngbd-modal-content',
        template: "\n    <div class=\"modal-header\">\n      <h4 class=\"modal-title\">Hi there!</h4>\n      <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"activeModal.dismiss('Cross click')\">\n        <span aria-hidden=\"true\">&times;</span>\n      </button>\n    </div>\n    <div class=\"modal-body\">\n      <p>Ready to play?</p>\n      <p>{{seconds}} seconds left</p>\n    </div>\n    <div class=\"modal-footer\">\n    <button type=\"button\" class=\"btn btn-secondary mr-auto\" (click)=\"activeModal.close('Ready')\">Ready</button>\n      <button type=\"button\" class=\"btn btn-secondary\" (click)=\"activeModal.close('Close click')\">Close</button>\n    </div>\n  "
    }),
    __metadata("design:paramtypes", [ng_bootstrap_1.NgbActiveModal])
], NgbdModalContent);
exports.NgbdModalContent = NgbdModalContent;
var NgbdModalComponent = (function () {
    function NgbdModalComponent(modalService) {
        this.modalService = modalService;
    }
    NgbdModalComponent.prototype.open = function () {
        var modalRef = this.modalService.open(NgbdModalContent);
        return modalRef.result;
    };
    return NgbdModalComponent;
}());
NgbdModalComponent = __decorate([
    core_1.Component({
        selector: 'ngbd-modal-component',
        templateUrl: './readycheck-modal.component.html'
    }),
    __metadata("design:paramtypes", [ng_bootstrap_1.NgbModal])
], NgbdModalComponent);
exports.NgbdModalComponent = NgbdModalComponent;
//# sourceMappingURL=readycheck-modal.component.js.map
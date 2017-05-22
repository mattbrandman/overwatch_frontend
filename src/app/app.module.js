"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var app_component_1 = require("./app.component");
var team_detail_component_1 = require("./team-detail.component");
var match_detail_component_1 = require("./match-detail.component");
var user_auth_form_component_1 = require("./user-auth-form.component");
var user_detail_component_1 = require("./user-detail.component");
var http_1 = require("@angular/http");
var router_1 = require("@angular/router");
var auth_module_1 = require("./auth.module");
var appRoutes = [
    { path: 'signup', component: user_auth_form_component_1.UserAuthFormComponent },
    { path: 'profile', component: user_detail_component_1.UserDetailComponent },
    {
        path: '',
        redirectTo: '/signup',
        pathMatch: 'full'
    }
];
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule,
            http_1.HttpModule,
            forms_1.FormsModule,
            router_1.RouterModule.forRoot(appRoutes),
            auth_module_1.AuthModule],
        declarations: [
            app_component_1.AppComponent,
            team_detail_component_1.TeamDetailComponent,
            match_detail_component_1.MatchDetailComponent,
            user_auth_form_component_1.UserAuthFormComponent,
            user_detail_component_1.UserDetailComponent,
        ],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map
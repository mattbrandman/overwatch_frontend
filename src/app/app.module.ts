import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'
import { AppComponent }  from './app.component';

import { TeamDetailComponent } from './team-detail.component';
import { MatchDetailComponent } from './match-detail.component';
import { UserAuthFormComponent} from './user-auth-form.component';
import { UserDetailComponent } from './user-detail.component';

import { HttpModule, JsonpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router'; 
import { AuthModule } from './auth.module'
const appRoutes: Routes = [
	{path: 'signup', component: UserAuthFormComponent},
  {path: 'profile', component: UserDetailComponent},
  {
    path: '', 
    redirectTo: '/signup',
    pathMatch: 'full'
  }
	];

@NgModule({
  imports:      [ BrowserModule, 
                  HttpModule, 
                  FormsModule, 
                  RouterModule.forRoot(appRoutes), 
                  AuthModule],
  declarations: [ 
  	AppComponent,
  	TeamDetailComponent,
  	MatchDetailComponent,
  	UserAuthFormComponent,
    UserDetailComponent,
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }

import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'
import { AppComponent }  from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbdModalComponent, NgbdModalContent } from './readycheck-modal.component';
import { TeamDetailComponent } from './team-detail.component';
import { MatchDetailComponent } from './match-detail.component';
import { UserAuthFormComponent} from './user-auth-form.component';
import { UserDetailComponent } from './user-detail.component';
import { HttpModule, JsonpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router'; 
import { AuthModule } from './auth.module';
import { OwSocket } from './socket.service';



const appRoutes: Routes = [
	{path: 'signup', component: UserAuthFormComponent},
  {path: 'profile', component: UserDetailComponent},
  {path: 'match', component: MatchDetailComponent},
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
                  AuthModule,
                  NgbModule.forRoot(),],

  declarations: [ 
  	AppComponent,
  	TeamDetailComponent,
  	MatchDetailComponent,
  	UserAuthFormComponent,
    UserDetailComponent,
    NgbdModalComponent,
    NgbdModalContent,
  ],
  bootstrap:    [ AppComponent ],
  entryComponents: [ NgbdModalContent ],
  providers: [ OwSocket ]
})
export class AppModule { }

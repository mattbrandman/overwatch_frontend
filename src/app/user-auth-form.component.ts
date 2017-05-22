import { Component, Input } from '@angular/core';
import { User } from './user';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'user-auth-form',
  templateUrl: './user-auth-form.component.html',
  providers: [ AuthService ],
})
export class UserAuthFormComponent {
  creating_new = false;
  model = new User('', '', '', 0, 0, 0)
  constructor( private authService: AuthService, private router: Router ){}

  loginUser(name: string, password: string) {
    this.authService.login(name, password)
                      .subscribe(
                        user => { 
                          console.log(user.token);
                          console.log('hi');
                          localStorage.setItem('token', user.token);
                          localStorage.setItem('hi', 'noe');
                          this.router.navigate(['/profile'])
                        });
  }

  signupUser(name: string, password: string){
    this.authService.signup(this.model.username, this.model.password)
                    .subscribe(
                      user => console.log(user))
  }

  onC(){
    this.authService.get_profile()
                    .subscribe(
                      data => console.log(data))
  }

  onSubmit() {
    if(this.creating_new == true) {
      this.signupUser(this.model.username, this.model.password);
    } else {
      this.loginUser(this.model.username, this.model.password);
    }
  }
}

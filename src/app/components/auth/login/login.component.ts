import { Component } from '@angular/core';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../../../shared/models/user';


@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html'
})
export class LoginComponent {

  credentials = {'email': '', 'password': ''};

  constructor(
    private authService: AuthService,
  	private router: Router) {
  }

  login()
  {
  	this.authService.login(this.credentials.email, this.credentials.password)
  		.subscribe(
  			() => {
  				this.router.navigateByUrl('/');
  			},
		    (err: HttpErrorResponse) => {
		    	alert(`${err.error.message}`);
		    }
  		);
  }

}

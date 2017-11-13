import { Component } from '@angular/core';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../../../shared/models/user';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent{

	newUser = new User();

  constructor(
    private authService: AuthService,
  	private router: Router) {
  }

  register() {
  	this.authService.register(
  		this.newUser.firstName, 
  		this.newUser.lastName, 
  		this.newUser.email, 
  		this.newUser.password
  	).subscribe(
  		() => {
  				this.router.navigateByUrl('/');
  			},
		    (err: HttpErrorResponse) => {
		    	alert(`${err.error.message}`);
		    }
  	);
  }
}

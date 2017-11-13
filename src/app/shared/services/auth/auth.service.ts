import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { User } from '../../models/user';

@Injectable()
export class AuthService implements OnInit {

  public isAuthenticated: boolean;
  private user: User;
  public userChange = new BehaviorSubject(this.user);

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
  	this.isAuthenticated = !!window.localStorage.getItem('loginToken');
    let temp = JSON.parse(window.localStorage.getItem('user'));
    if (temp != null) this.user = new User(temp['id'], temp['first_name'], temp['last_name'], temp['email']);
  }

  ngOnInit() {
    this.userChange.next(this.user);
  }

  login(email: string, password: string)
  {
  	return new Observable((o: Observer<any>) => {
    	this.http.post('http://localhost:8000/api/login', {
  			'email': email,
  			'password': password
  	  	})
	        .subscribe(
	          (data: {token: string, user: Object}) => {
	          	window.localStorage.setItem('loginToken', data.token);
              window.localStorage.setItem('user', JSON.stringify(data.user));
              this.user = new User(data.user['id'], data.user['first_name'], data.user['last_name'], data.user['email']);
              this.userChange.next(this.user);
	          	this.isAuthenticated = true;
	            o.next(data.token);
	            return o.complete();
	          },
	          (err) => {
	          	return o.error(err);
	          }
	        );
    });
  }


  register(firstName: string, lastName: string, email: string, password: string) {
    return new Observable((o: Observer<any>) => {
      this.http.post('http://localhost:8000/api/register', {
        'first_name': firstName,
        'last_name': lastName,
        'email': email,
        'password': password
      })
        .subscribe(
            (data: {token: string, user: Object}) => {
              window.localStorage.setItem('loginToken', data.token);
              this.isAuthenticated = true;
              window.localStorage.setItem('user', JSON.stringify(data.user));
              this.user = new User(data.user['id'], data.user['first_name'], data.user['last_name'], data.user['email']);
              this.userChange.next(this.user);
              o.next(data.token);
              return o.complete();
            },
            (err) => {
              return o.error(err);
            }
          );
    });
  }

  getUser() {
    return this.user;
  }

  getUserChange() {
    return this.userChange;
  }


  public getRequestHeaders()
  {
  	return new HttpHeaders().set('Authorization', 'Bearer ' + window.localStorage.getItem('loginToken'));
  }

  public logout()
  {
  	window.localStorage.removeItem('loginToken');
    window.localStorage.removeItem('user');
  	this.isAuthenticated = false;
    this.user = null;
    this.userChange.next(this.user);
    this.router.navigateByUrl('/login');
  }

}
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth/auth.service';
import { User } from '../../shared/models/user';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  user: User;
  userChangeStream;

  constructor(private auth: AuthService) { }

  ngOnInit() {

    this.userChangeStream = this.auth.getUserChange().subscribe(
      (newUser) => {
        this.user = newUser;
      }
    );

    this.user = this.auth.getUser();
  }  

}

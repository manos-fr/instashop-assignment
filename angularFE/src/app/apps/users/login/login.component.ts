import { Component, OnDestroy, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  username: string = '';
  password: string = '';
  loginError: boolean = false;
  usersServiceSubscription!: Subscription;

  constructor(
    private usersService: UsersService,
    public router: Router,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.usersServiceSubscription?.unsubscribe();
  }

  logIn() {
    this.spinner.show();
    let username = this.username;
    let password = this.password;

    let user = {
      username,
      password
    };

    this.usersServiceSubscription = this.usersService.logIn(user).subscribe(
      response => {
        this.usersService.setCookieUser(response);
        console.log('response: ', response);
        setTimeout(() => {
          location.assign('/');
        }, 1500);
      },
      error => {
        this.loginError = true;
        setTimeout(() => {
          this.loginError = false;
        }, 3500);
        console.log('error: ', error);
      }
    );
  }
}

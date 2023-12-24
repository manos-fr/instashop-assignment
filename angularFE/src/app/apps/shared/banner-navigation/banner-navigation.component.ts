import { Component, OnDestroy, OnInit } from '@angular/core';
import { SightsService } from '../../blog/blog-service.service';
import { UsersService } from '../../users/users.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { User } from '../types';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-banner-navigation',
  templateUrl: './banner-navigation.component.html',
  styleUrls: ['./banner-navigation.component.css']
})
export class BannerNavigationComponent implements OnInit, OnDestroy {
  user: User;
  usersServiceSubscription!: Subscription;
  constructor(
    public sightsService: SightsService,
    public router: Router,
    public httpClient: HttpClient,
    public usersService: UsersService
  ) {}

  ngOnInit(): void {
    const cookieUser = this.usersService.getUserFromCookies('user');
    console.log('cookieUser: ', cookieUser);

    if (cookieUser !== undefined) {
      this.user = JSON.parse(cookieUser).username;
      console.log('cookieUserAfter: ', cookieUser);
    }
  }

  ngOnDestroy(): void {
    this.usersServiceSubscription?.unsubscribe();
  }

  loginClick() {
    this.router.navigate(['/login']);
  }

  logOut() {
    this.usersServiceSubscription = this.usersService.logOut().subscribe(() => {
      location.assign('/login');
    });
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Blog } from '../shared/types';
import { SightsService } from './blog-service.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { UsersService } from '../users/users.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit, OnDestroy {
  blogsDetail: Blog[] = [];

  page = 1;
  pageSize = 6;
  sightsServiceSubscription!: Subscription;

  constructor(
    public sightsService: SightsService,
    public router: Router,
    public httpClient: HttpClient,
    public usersService: UsersService
  ) {
    this.sightsService.showEdit = false;
  }

  ngOnInit(): void {
    if (!this.usersService.getUserFromCookies('user')) {
      this.router.navigate(['/login']);
    }
    if (this.sightsService.Blogs.length === 0)
      this.sightsServiceSubscription = this.sightsService
        .getBlog()
        .subscribe((d: Blog[]) => {
          console.log({ d });
          this.sightsService.Blogs = d;
        });
  }

  ngOnDestroy(): void {
    this.sightsServiceSubscription?.unsubscribe();
  }

  loginClick() {
    this.router.navigate(['/login']);
  }

  viewDetail(id: string) {
    this.sightsService.detailId = id;
    if (this.sightsService.loginStatusService)
      this.sightsService.showEdit = true;

    this.router.navigate(['/blogDetail', id]);
    window.scrollTo(0, 0);
  }
}

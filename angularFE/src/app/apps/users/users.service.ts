import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { User } from '../shared/types';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService
  ) {}

  public logIn(user: { username: string; password: string }) {
    return this.httpClient.post(
      `${environment.BASE_URL}/api/users/login`,
      user
    ) as Observable<User>;
  }

  public logOut(): Observable<any> {
    this.cookieService.delete('user');
    this.cookieService.delete('name');
    return this.httpClient.get(`${environment.BASE_URL}/api/users/logout`);
  }

  public getUserFromCookies(user: string) {
    if (this.cookieService.get(user) === '') {
      return undefined;
    }
    return this.cookieService.get(user);
  }

  public setCookieUser(user: User) {
    this.cookieService.set('user', JSON.stringify(user));
    this.cookieService.set('permissions', JSON.stringify(user?.permissions));
    console.log('setCookieUser: ', user);
    this.cookieService.set('name', JSON.stringify(user?.username));
  }

  public isAdmin() {
    let cookieUser = this.getUserFromCookies('user');
    if (cookieUser === undefined) {
      return false;
    } else if (!JSON.parse(cookieUser).permissions.write) {
      return false;
    } else {
      return true;
    }
  }
}

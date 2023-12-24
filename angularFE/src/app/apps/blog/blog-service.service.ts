import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Blog, SightDetails } from '../shared/types';
@Injectable({
  providedIn: 'root'
})
export class SightsService {
  constructor(private httpClient: HttpClient) {}

  Blogs: Blog[] = [];
  loginStatusService = false;

  detailId: string = '';
  showEdit = false;

  public getBlog() {
    return this.httpClient.get(
      `${environment.BASE_URL}/api/sights`
    ) as Observable<Blog[]>;
  }

  public updatePost(sightDetails: SightDetails) {
    return this.httpClient.put(
      `${environment.BASE_URL}/api/sights/:id`,
      sightDetails
    );
  }
}

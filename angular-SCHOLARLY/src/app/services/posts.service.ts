import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

export interface UserNames {
  _id: string;
  username: string;
  major: string;
  name: string;
  Creator: string;
}

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private http: HttpClient) {}

  searchUsers(query: string) {
    return this.http
      .post<{ payload: Array<UserNames> }>(
        '/api/user/getusers',
        { payload: query },
        {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        }
      )
      .pipe(map((data) => data.payload));
  }
}

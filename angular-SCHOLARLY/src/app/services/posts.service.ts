import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
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
  private notifUpdated = new Subject();
  private infos = '';
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

  checkNotification(id: string): any {
    this.http
      .get<{ infos: any }>('https://www.skalarly.com/api/posts/checkNotif', {
        params: { id },
      })
      .pipe(
        map((infosData) => {
          return infosData.infos;
        })
      )
      .subscribe((transformedInfos) => {
        this.infos = transformedInfos;
        this.notifUpdated.next(this.infos);
      });
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}
  private notifUpdated = new ReplaySubject();
  private notifId: string;
  getNotifId(): any {
    return this.notifUpdated.asObservable();
  }
  searchUsers(query: string): any {
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

  // Hashtag search
  searchHashs(query: string): any {
    return this.http
      .post<{ payload: Array<UserNames> }>(
        '/api/user/gethashs',
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
          console.log('months', infosData);
          return infosData.infos;
        })
      )
      .subscribe({
        next: (response) => {
          console.log('chlor', response);
          this.notifId = response;
          this.notifUpdated.next(this.notifId);
        },
        // console.log('trans', transformedInfos.Creator);

        // this.notifId = transformedInfos.Creator;
        // console.log('hello', this.notifId);
        // this.notifUpdated.next(this.notifId);
      });
  }
  deleteNotif(id: string): any {
    console.log('right here', id);
    this.http
      .delete<{ message: string; infos: any }>(
        'https://www.skalarly.com/api/posts/deleteNotif/' + id
      )
      .subscribe((transformedInfos) => {
        this.snackBar.open('Notifications Off', '🔕', {
          duration: 3000,
        });
      });
  }
}

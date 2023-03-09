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
export interface Hashtags {
  _id: string;
  Hashtag1: string;
  Hashtag2: string;
  Hashtag3: string;
  Hashtag4: string;
  Hashtag5: string;
}
@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}
  private notifUpdated = new ReplaySubject();
  private notifId: string;

  private userUpdated = new ReplaySubject();
  private userId: string;

  private hashUpdated = new ReplaySubject();
  private hashId: string;
  getNotifId(): any {
    return this.notifUpdated.asObservable();
  }

  getUserId(): any {
    return this.userUpdated.asObservable();
  }
  getHashs(): any {
    return this.hashUpdated.asObservable();
  }
  searchUsers(query: string, userId: string): any {
    const sub = this.http
      .get<{ messages: string; payload: string }>(
        'https://www.skalarly.com/api/user/getusers',
        {
          params: { query, userId },
        }
      )
      .pipe(map((data) => data.payload))
      .subscribe({
        next: (response) => {
          console.log('chlor', response);
          this.userId = response;
          this.userUpdated.next(this.userId);
          sub.unsubscribe();
          console.log('eazy 1');
        },
        // console.log('trans', transformedInfos.Creator);

        // this.notifId = transformedInfos.Creator;
        // console.log('hello', this.notifId);
        // this.notifUpdated.next(this.notifId);
      });
  }

  // Hashtag search
  searchHashs(queryHash: string): any {
    console.log('my girl', queryHash);
    const sub = this.http
      .get<{ messages: string; payload: string }>(
        'https://www.skalarly.com/api/user/gethashs',
        { params: { queryHash } }
      )
      .pipe(map((data) => data.payload))
      .subscribe({
        next: (response) => {
          console.log('chlor 2', response);
          this.hashId = response;
          this.hashUpdated.next(this.hashId);
          sub.unsubscribe();
          console.log('eazy 2');
        },
        // console.log('trans', transformedInfos.Creator);

        // this.notifId = transformedInfos.Creator;
        // console.log('hello', this.notifId);
        // this.notifUpdated.next(this.notifId);
      });
  }

  checkNotification(id: string): any {
    const sub = this.http
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
          sub.unsubscribe();
          console.log('eazy 3');
        },
        // console.log('trans', transformedInfos.Creator);

        // this.notifId = transformedInfos.Creator;
        // console.log('hello', this.notifId);
        // this.notifUpdated.next(this.notifId);
      });
  }
  deleteNotif(id: string): any {
    console.log('right here', id);
    const sub = this.http
      .delete<{ message: string; infos: any }>(
        'https://www.skalarly.com/api/posts/deleteNotif/' + id
      )
      .subscribe((transformedInfos) => {
        this.snackBar.open('Notifications Off', '🔕', {
          duration: 3000,
        });
        sub.unsubscribe();
        console.log('eazy 4');
      });
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
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
  private notifUpdated = new Subject();
  private notifId: string;
  getNotifId(): any {
    return this.notifId;
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

  checkNotification(id: string): any {
    console.log('right here', id);
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
        console.log('trans', transformedInfos);

        this.notifId = transformedInfos;
        console.log('hello', this.notifId);
        this.notifUpdated.next(this.notifId);
      });
  }
  deleteNotif(id: string): any {
    console.log('right here', id);
    this.http
      .delete('https://www.skalarly.com/api/posts/deleteNotif/' + id)
      .subscribe((transformedInfos) => {
        this.snackBar.open('Notifications Off', '', {
          duration: 3000,
        });
      });
  }
}

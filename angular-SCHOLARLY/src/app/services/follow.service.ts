import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthData, AuthDataInfo } from '../signup/auth-data.model';
import { Subject, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppRoutingModule } from '../app-routing.module';

export interface Follow {
  id: string;
  Follower: string;
  Following: string;
  name: string;
  username: string;
  ProfilePicPath: string;
}
@Injectable({ providedIn: 'root' })
export class FollowService {
  private follow: Follow[] = [];
  private followPostUpdated = new ReplaySubject<Follow[]>();

  private userId: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}
  getInfoUpdateListener(): any {
    return this.followPostUpdated.asObservable();
  }
  postInfoFollow(userId: string, username: string): any {
    console.log('chazzz', username);
    this.http
      .get<{ message: string; infos: any }>(
        'http://localhost:3000/api/follow/infoFollow',
        { params: { userId, username } }
      )
      .pipe(
        map((infosData) => {
          return infosData.infos.map((info) => {
            return {
              Follower: info.Follower,
              Following: info.Following,
              name: info.name,
              username: info.username,
              ProfilePicPath: info.ProfilePicPath,
            };
          });
        })
      )
      .subscribe((transformedInfos) => {
        this.follow = transformedInfos;
        this.followPostUpdated.next([...this.follow]);
      });
  }

  getMessageNotification(userId: string): any {
    this.http
      .get<{ message: string; messages: any }>(
        'http://localhost:3000/api/follow/followInfo',
        {
          params: { userId },
        }
      )
      .pipe(
        map((messageData) => {
          return messageData.messages.map((data) => {
            return {
              id: data._id,
              Follower: data.Follower,
              Following: data.Following,
              name: data.name,
              username: data.username,
              ProfilePicPath: data.ProfilePicPath,
            };
          });
        })
      )
      .subscribe((transformedMessage) => {
        this.follow = transformedMessage;
        this.followPostUpdated.next([...this.follow]);
      });
  }
  deleteFollow(followId: string): any {
    // console.log('hey chase postId', postId);
    this.http
      .delete('http://localhost:3000/api/follow/unFollow/' + followId)
      .subscribe(() => {
        const updatedPosts = this.follow.filter((post) => post.id !== followId);
        this.follow = updatedPosts;
        this.followPostUpdated.next([...this.follow]);
      });
  }
}

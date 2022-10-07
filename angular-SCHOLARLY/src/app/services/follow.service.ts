import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {  ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppRoutingModule } from '../app-routing.module';

export interface Follow {
  id: string;
  Follower: string;
  nameFollower: string;
  usernameFollower: string;
  ProfilePicPathFollower: string;

  Following: string;
  nameFollowing: string;
  ProfilePicPathFollowing: string;
}
@Injectable({ providedIn: 'root' })
export class FollowService {
  private follow: Follow[] = [];
  private followPostUpdated = new ReplaySubject<Follow[]>();

  private follower: Follow[] = [];
  private followerPostUpdated = new ReplaySubject<Follow[]>();

  private following: Follow[] = [];
  private followingPostUpdated = new ReplaySubject<Follow[]>();

  private followingInfo: Follow[] = [];
  private followingInfoPostUpdated = new ReplaySubject<Follow[]>();

  private mutualInfo: Follow[] = [];
  private mutualInfoPostUpdated = new ReplaySubject<Follow[]>();

  private mutualsInfo: Follow[] = [];
  private mutualsInfoPostUpdated = new ReplaySubject<Follow[]>();

  private userId: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}
  getInfoUpdateListener(): any {
    return this.followPostUpdated.asObservable();
  }
  getInfoFollowingUpdateListener(): any {
    return this.followingInfoPostUpdated.asObservable();
  }
  getInfoFollowUpdateListener(): any {
    return this.followerPostUpdated.asObservable();
  }
  getFollowingUpdateListener(): any {
    return this.followingPostUpdated.asObservable();
  }
  getInfoMutualUpdateListener(): any {
    return this.mutualInfoPostUpdated.asObservable();
  }
  getInfoMutualsUpdateListener(): any {
    return this.mutualsInfoPostUpdated.asObservable();
  }
  postInfoFollow(userId: string, username: string): any {
    this.http
      .get<{ message: string; infos: any }>(
        'https://skalarly.herokuapp.com/api/follow/infoFollow',
        { params: { userId, username } }
      )
      .pipe(
        map((infosData) => {
          return infosData.infos.map((info) => {
            return {
              id: info._id,
              Follower: info.Follower,
              nameFollower: info.nameFollower,
              usernameFollower: info.usernameFollower,
              ProfilePicPathFollower: info.ProfilePicPathFollower,

              Following: info.Following,
              nameFollowing: info.nameFollowing,
              ProfilePicPathFollowing: info.ProfilePicPathFollowing,
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
        'https://skalarly.herokuapp.com/api/follow/followInfo',
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
              nameFollower: data.nameFollower,
              usernameFollower: data.usernameFollower,
              ProfilePicPathFollower: data.ProfilePicPathFollower,

              Following: data.Following,
              nameFollowing: data.nameFollowing,
              ProfilePicPathFollowing: data.ProfilePicPathFollowing,
            };
          });
        })
      )
      .subscribe((transformedMessage) => {
        this.follow = transformedMessage;
        this.followPostUpdated.next([...this.follow]);
      });
  }
  getMessageNotificationFollowed(userId: string): any {
    this.http
      .get<{ message: string; messages: any }>(
        'https://skalarly.herokuapp.com/api/follow/followerInfo',
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
              nameFollower: data.nameFollower,
              usernameFollower: data.usernameFollower,
              ProfilePicPathFollower: data.ProfilePicPathFollower,

              Following: data.Following,
              nameFollowing: data.nameFollowing,
              ProfilePicPathFollowing: data.ProfilePicPathFollowing,
            };
          });
        })
      )
      .subscribe((transformedMessage) => {
        this.follower = transformedMessage;
        this.followerPostUpdated.next([...this.follower]);
      });
  }
  getMessageNotificationFollowedOther(id: string): any {
    this.http
      .get<{ message: string; messages: any }>(
        'https://skalarly.herokuapp.com/api/follow/followerInfoOther',
        {
          params: { id },
        }
      )
      .pipe(
        map((messageData) => {
          return messageData.messages.map((data) => {
            return {
              id: data._id,
              Follower: data.Follower,
              nameFollower: data.nameFollower,
              usernameFollower: data.usernameFollower,
              ProfilePicPathFollower: data.ProfilePicPathFollower,

              Following: data.Following,
              nameFollowing: data.nameFollowing,
              ProfilePicPathFollowing: data.ProfilePicPathFollowing,
            };
          });
        })
      )
      .subscribe((transformedMessage) => {
        this.follower = transformedMessage;
        this.followerPostUpdated.next([...this.follower]);
      });
  }
  getMessageNotificationOther(id: string): any {
    this.http
      .get<{ message: string; messages: any }>(
        'https://skalarly.herokuapp.com/api/follow/followInfoOther',
        {
          params: { id },
        }
      )
      .pipe(
        map((messageData) => {
          return messageData.messages.map((data) => {
            return {
              id: data._id,
              Follower: data.Follower,
              nameFollower: data.nameFollower,
              usernameFollower: data.usernameFollower,
              ProfilePicPathFollower: data.ProfilePicPathFollower,

              Following: data.Following,
              nameFollowing: data.nameFollowing,
              ProfilePicPathFollowing: data.ProfilePicPathFollowing,
            };
          });
        })
      )
      .subscribe((transformedMessage) => {
        this.following = transformedMessage;
        this.followingInfoPostUpdated.next([...this.following]);
      });
  }
  // and maybe add userId
  getFollowingNotification(id: string, userId: string): any {
    console.log('sleepy', id);
    console.log('night', userId);

    this.http
      .get<{ message: string; messages: any }>(
        'https://skalarly.herokuapp.com/api/follow/followingInfo',
        {
          params: { id, userId },
        }
      )
      .pipe(
        map((messageData) => {
          return messageData.messages.map((data: any) => {
            return {
              id: data._id,
              Follower: data.Follower,
              nameFollower: data.nameFollower,
              usernameFollower: data.usernameFollower,
              ProfilePicPathFollower: data.ProfilePicPathFollower,

              Following: data.Following,
              nameFollowing: data.nameFollowing,
              ProfilePicPathFollowing: data.ProfilePicPathFollowing,
            };
          });
        })
      )
      .subscribe((transformedMessage) => {
        this.followingInfo = transformedMessage;
        this.followingInfoPostUpdated.next([...this.followingInfo]);
      });
  }
  // skalars following
  mutualFollow(username: string, userId: string): any {
    this.http
      .get<{ message: string; messages: any }>(
        'https://skalarly.herokuapp.com/api/follow/mutualFollow',
        {
          params: { username, userId },
        }
      )
      .pipe(
        map((messageData) => {
          return messageData.messages.map((data: any) => {
            return {
              id: data._id,
              Follower: data.Follower,
              nameFollower: data.nameFollower,
              usernameFollower: data.usernameFollower,
              ProfilePicPathFollower: data.ProfilePicPathFollower,

              Following: data.Following,
              nameFollowing: data.nameFollowing,
              ProfilePicPathFollowing: data.ProfilePicPathFollowing,
            };
          });
        })
      )
      .subscribe((transformedMessage) => {
        this.mutualInfo = transformedMessage;
        this.mutualInfoPostUpdated.next([...this.mutualInfo]);
      });
  }
  // skalars followers
  mutualsFollow(username: string, userId: string): any {
    this.http
      .get<{ message: string; messages: any }>(
        'https://skalarly.herokuapp.com/api/follow/mutualsFollow',
        {
          params: { username, userId },
        }
      )
      .pipe(
        map((messageData) => {
          return messageData.messages.map((data: any) => {
            return {
              id: data._id,
              Follower: data.Follower,
              nameFollower: data.nameFollower,
              usernameFollower: data.usernameFollower,
              ProfilePicPathFollower: data.ProfilePicPathFollower,

              Following: data.Following,
              nameFollowing: data.nameFollowing,
              ProfilePicPathFollowing: data.ProfilePicPathFollowing,
            };
          });
        })
      )
      .subscribe((transformedMessage) => {
        this.mutualsInfo = transformedMessage;
        this.mutualsInfoPostUpdated.next([...this.mutualsInfo]);
      });
  }
  deleteFollow(followId: string): any {
    // console.log('hey chase postId', postId);
    this.http
      .delete('https://skalarly.herokuapp.com/api/follow/unFollow/' + followId)
      .subscribe(() => {
        const updatedPosts = this.follow.filter((post) => post.id !== followId);
        this.follow = updatedPosts;
        this.followPostUpdated.next([...this.follow]);
      });
  }
  deleteFollowers(followId: string): any {
    // console.log('hey chase postId', postId);
    this.http
      .delete('https://skalarly.herokuapp.com/api/follow/unFollower/' + followId)
      .subscribe(() => {
        const updatedPosts = this.follower.filter(
          (post) => post.id !== followId
        );
        this.follower = updatedPosts;
        this.followerPostUpdated.next([...this.follower]);
      });
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ReplaySubject } from 'rxjs';
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
  FollowingId: string;
  Following: string;
  nameFollowing: string;
  ProfilePicPathFollowing: string;
}
@Injectable({ providedIn: 'root' })
export class FollowService {
  private follow: Follow[] = [];
  private followPostUpdated = new ReplaySubject<Follow[]>();
  private followPostUpdatedHistory = new ReplaySubject<Follow[]>();

  private follower: Follow[] = [];
  private followerPostUpdated = new ReplaySubject<Follow[]>();
  private followerPostUpdatedHistory = new ReplaySubject<Follow[]>();

  private following: Follow[] = [];
  private followingPostUpdated = new ReplaySubject<Follow[]>();

  private followingInfo: Follow[] = [];
  private followingInfoPostUpdated = new ReplaySubject<Follow[]>();

  private mutualInfo: Follow[] = [];
  private mutualInfoPostUpdated = new ReplaySubject<Follow[]>();

  private mutualsInfo: Follow[] = [];
  private mutualsInfoPostUpdated = new ReplaySubject<Follow[]>();

  private SetNameUpdated = new ReplaySubject();

  private userId: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}
  getInfoUpdateListener(): any {
    return this.followPostUpdated.asObservable();
  }
  getsetUserNameUpdateListener(): any {
    return this.SetNameUpdated.asObservable();
  }
  getInfoFollowingUpdateListener(): any {
    return this.followingInfoPostUpdated.asObservable();
  }
  getInfoFollowUpdateListener(): any {
    return this.followerPostUpdated.asObservable();
  }
  getInfoFollowUpdateListenerHistory(): any {
    return this.followerPostUpdatedHistory.asObservable();
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
  postInfoFollow(userId: string, username: string, FollowingId: string): any {
    this.http
      .get<{ message: string; messages: any }>(
        'https://www.skalarly.com/api/follow/infoFollow',
        { params: { userId, username, FollowingId } }
      )
      .pipe(
        map((infosData) => {
          return infosData.messages;
        })
      )
      .subscribe((transformedInfos) => {
        this.follow = transformedInfos;
        this.followPostUpdated.next(this.follow);
        // this.snackBar.open('Yay you made a new friend', 'Congrats!', {
        //   duration: 3000,
        // });
      });
  }
  // Followed history
  postInfoFollowHistory(
    userId: string,
    username: string,
    FollowingId: string,
    time: string
  ): any {
    this.http
      .get<{ message: string; messages: any }>(
        'https://www.skalarly.com/api/follow/infoFollowHistory',
        { params: { userId, username, FollowingId, time } }
      )
      .pipe(
        map((infosData) => {
          return infosData.messages;
        })
      )
      .subscribe((transformedInfos) => {
        this.follow = transformedInfos;
        this.followerPostUpdatedHistory.next(this.follow);
        // this.snackBar.open('Yay you made a new friend', 'Congrats!', {
        //   duration: 3000,
        // });
      });
  }

  getMessageNotification(userId: string): any {
    this.http
      .get<{ message: string; messages: any }>(
        'https://www.skalarly.com/api/follow/followInfo',
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
              FollowingId: data.FollowingId,
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
        'https://www.skalarly.com/api/follow/followerInfo',
        {
          params: { userId },
        }
      )
      .pipe(
        map((messageData) => {
          return messageData.messages;
        })
      )
      .subscribe((transformedMessage) => {
        this.follower = transformedMessage;
        this.followerPostUpdated.next([...this.follower]);
      });
  }
  // Followed history
  getMessageNotificationFollowedHistory(userId: string, counter: number): any {
    this.http
      .get<{ message: string; messages: any }>(
        'https://www.skalarly.com/api/follow/followerInfoHistory',
        {
          params: { userId, counter },
        }
      )
      .pipe(
        map((messageData) => {
          return messageData.messages;
        })
      )
      .subscribe((transformedMessage) => {
        this.follower = transformedMessage;
        this.followerPostUpdatedHistory.next([...this.follower]);
      });
  }
  getMessageNotificationFollowedOther(id: string): any {
    this.http
      .get<{ message: string; messages: any }>(
        'https://www.skalarly.com/api/follow/followerInfoOther',
        {
          params: { id },
        }
      )
      .pipe(
        map((messageData) => {
          return messageData.messages;
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
        'https://www.skalarly.com/api/follow/followInfoOther',
        {
          params: { id },
        }
      )
      .pipe(
        map((messageData) => {
          return messageData.messages;
        })
      )
      .subscribe((transformedMessage) => {
        this.following = transformedMessage;
        this.followPostUpdated.next([...this.following]);
      });
  }
  // and maybe add userId
  getFollowingNotification(id: string, userId: string): any {
    this.http
      .get<{ message: string; messages: any }>(
        'https://www.skalarly.com/api/follow/followingInfo',
        {
          params: { id, userId },
        }
      )
      .pipe(
        map((messageData) => {
          return messageData.messages;
        })
      )
      .subscribe((transformedMessage) => {
        this.followingInfo = transformedMessage;
        console.log('small feet', this.followingInfo);

        this.followingInfoPostUpdated.next([...this.followingInfo]);
      });
  }
  // setting name for friends activities
  setUsername(username: string): any {
    this.SetNameUpdated.next(username);
  }
  // skalars following
  mutualFollow(username: string, userId: string): any {
    this.http
      .get<{ message: string; messages: any }>(
        'https://www.skalarly.com/api/follow/mutualFollow',
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
              FollowingId: data.FollowingId,

              Following: data.Following,
              nameFollowing: data.nameFollowing,
              ProfilePicPathFollowing: data.ProfilePicPathFollowing,
            };
          });
        })
      )
      .subscribe((transformedMessage) => {
        this.mutualInfo = transformedMessage;
        console.log('big feet', this.mutualInfo);
        this.mutualInfoPostUpdated.next([...this.mutualInfo]);
      });
  }
  // skalars followers
  mutualsFollow(username: string, userId: string): any {
    this.http
      .get<{ message: string; messages: any }>(
        'https://www.skalarly.com/api/follow/mutualsFollow',
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
              FollowingId: data.FollowingId,

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
    console.log('hey chase followId', followId);
    this.http
      .delete('https://www.skalarly.com/api/follow/unFollow/' + followId)
      .subscribe(() => {
        const updatedPosts = this.follow.filter((post) => post.id !== followId);
        this.follow = updatedPosts;
        this.followPostUpdated.next([...this.follow]);
      });
  }
  deleteFollowers(followId: string): any {
    // console.log('hey chase postId', postId);
    this.http
      .delete('https://www.skalarly.com/api/follow/unFollower/' + followId)
      .subscribe(() => {
        const updatedPosts = this.follower.filter(
          (post) => post.id !== followId
        );
        this.follower = updatedPosts;
        this.followerPostUpdated.next([...this.follower]);
      });
  }
}

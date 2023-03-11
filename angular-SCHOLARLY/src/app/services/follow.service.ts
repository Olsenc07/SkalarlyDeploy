import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ReplaySubject, Subject, Subscription } from 'rxjs';
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
  viewed: boolean;
}
export interface BlockUser {
  blockedName: string;
  blockedUsername: string;
}
@Injectable({ providedIn: 'root' })
export class FollowService {
  private follow: Follow[] = [];
  private followPostUpdated = new Subject<Follow[]>();
  private followPostUpdatedHistory = new Subject<Follow[]>();

  private follower: Follow[] = [];
  private followerPostUpdated = new Subject<Follow[]>();
  private followerPostUpdatedHistory = new Subject<Follow[]>();

  private following: Follow[] = [];
  private followingPostUpdated = new Subject<Follow[]>();

  private followingInfo: Follow[] = [];
  private followingInfoPostUpdated = new Subject<Follow[]>();

  private followingInfoPostUpdatedBtn = new Subject<Follow[]>();

  private followersInfoPostUpdated = new Subject<Follow[]>();

  private mutualInfo: Follow[] = [];
  private mutualInfoPostUpdated = new Subject<Follow[]>();

  private mutualsInfo: Follow[] = [];
  private mutualsInfoPostUpdated = new Subject<Follow[]>();

  private acceptFollowCheck: boolean;

  private blockedUser: BlockUser[] = [];
  private blockedUserUpdated = new Subject<BlockUser[]>();

  private blockedUser2: BlockUser[] = [];
  private blockedUserUpdated2 = new Subject<BlockUser[]>();

  private blockedUserListOneUpdated = new ReplaySubject();
  private blockedUserListOne: boolean;

  private SetNameUpdated = new ReplaySubject();

  private userId: string;

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  // unsubscribe
  // ngOnDestroy(): any {
  //   this.followerPostUpdated.unsubscribe();
  //   console.log('destroyed u have been');
  // }

  getInfoUpdateListener(): any {
    return this.followPostUpdated.asObservable();
  }
  getblockListOneListener(): any {
    return this.blockedUserListOneUpdated.asObservable();
  }
  getsetUserNameUpdateListener(): any {
    return this.SetNameUpdated.asObservable();
  }
  getInfoFollowingUpdateListener(): any {
    return this.followingInfoPostUpdated.asObservable();
  }
  getInfoFollowingBtnUpdateListener(): any {
    return this.followingInfoPostUpdatedBtn.asObservable();
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
  getBlockedSkalarsUpdateListener(): any {
    return this.blockedUserUpdated.asObservable();
  }
  getBlockedSkalarsUpdateListener2(): any {
    return this.blockedUserUpdated2.asObservable();
  }
  getInfoMutualsUpdateListener(): any {
    return this.mutualsInfoPostUpdated.asObservable();
  }
  getInfoAcceptFollowUpdateListener(): any {
    return this.acceptFollowCheck;
  }
  getfilterFollowers(): any {
    return this.followersInfoPostUpdated.asObservable();
  }
  postInfoFollow(userId: string, username: string, FollowingId: string): any {
    const sub = this.http
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
        sub.unsubscribe();
        console.log('rich and famous baby 7');
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
    const sub = this.http
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
        sub.unsubscribe();
        console.log('rich and famous baby 6');
        // this.snackBar.open('Yay you made a new friend', 'Congrats!', {
        //   duration: 3000,
        // });
      });
  }
  // Blocked listone
  getBlockedListOne(id: string, userId: string): any {
    const sub = this.http
      .get<{ message: string; messages: boolean }>(
        'https://www.skalarly.com/api/follow/getblockedListOne',
        {
          params: { id, userId },
        }
      )
      .pipe(map((messageData) => messageData.messages))
      .subscribe((transformedMessage) => {
        console.log('where we at?');
        this.blockedUserListOne = transformedMessage;
        this.blockedUserListOneUpdated.next(this.blockedUserListOne);
        sub.unsubscribe();
        console.log('rich and famous baby 5');
      });
  }
  // Blocked list all
  getBlockedList(userId: string): any {
    const sub = this.http
      .get<{ message: string; messages: any }>(
        'https://www.skalarly.com/api/follow/getblockedList',
        {
          params: { userId },
        }
      )
      .pipe(map((messageData) => messageData.messages))
      .subscribe((transformedMessage) => {
        console.log('where we at yo?');
        this.blockedUser = transformedMessage;
        this.blockedUserUpdated.next([...this.blockedUser]);
        sub.unsubscribe();
        console.log('rich and famous baby 4');
      });
  }
  getMessageNotification(userId: string): any {
    const sub = this.http
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
              viewed: data.viewed,
            };
          });
        })
      )
      .subscribe((transformedMessage) => {
        console.log('ganja', transformedMessage);
        this.follow = transformedMessage;
        this.followingInfoPostUpdated.next([...this.follow]);
        sub.unsubscribe();
        console.log('rich and famous baby 3');
      });
  }
  getMessageNotificationFollowed(userId: string): any {
    const sub = this.http
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
        sub.unsubscribe();
        console.log('rich and famous baby 2');
      });
  }
  // Followed history
  getMessageNotificationFollowedHistory(userId: string, counter: number): any {
    const sub = this.http
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
        sub.unsubscribe();
        console.log('rich and famous baby 1');
      });
  }
  getMessageNotificationFollowedOther(id: string): any {
    const notifFollowedOther = this.http
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
        // this one
        notifFollowedOther.unsubscribe();
        console.log('rich and famous baby');
      });
  }
  getMessageNotificationOther(id: string): any {
    const msgNotifOtherSub = this.http
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
        msgNotifOtherSub.unsubscribe();
        console.log('rich and famous');
      });
  }
  // and maybe add userId
  getFollowingNotification(id: string, userId: string): any {
    const sub = this.http
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

        this.followingInfoPostUpdatedBtn.next(this.followingInfo);
        sub.unsubscribe();
        console.log('rich and famous baby 8');
      });
  }
  // setting name for friends activities
  setUsername(username: string): any {
    this.SetNameUpdated.next(username);
  }
  // filter following
  filterFollowing(userId: string, queryFollowing: string): any {
    console.log('my girl', queryFollowing);
    console.log('mine', userId);

    const sub = this.http
      .get<{ message: string; messages: any }>(
        'https://www.skalarly.com/api/follow/filterFollowing',
        { params: { userId, queryFollowing } }
      )
      .pipe(
        map((messageData) => {
          return messageData.messages;
        })
      )
      .subscribe((transformedMessage) => {
        this.followingInfo = transformedMessage;
        console.log('deep end yo', this.followingInfo);
        this.followingInfoPostUpdated.next([...this.followingInfo]);
        sub.unsubscribe();
        console.log('rich and famous baby 9');
      });
  }

  //  // filter followers
  filterFollowers(userId: string, queryFollowing: string): any {
    console.log('my girl', queryFollowing);
    console.log('mine', userId);

    const sub = this.http
      .get<{ message: string; messages: any }>(
        'https://www.skalarly.com/api/follow/filterFollowers',
        { params: { userId, queryFollowing } }
      )
      .pipe(
        map((messageData) => {
          return messageData.messages;
        })
      )
      .subscribe((transformedMessage) => {
        this.followingInfo = transformedMessage;
        console.log('deep end yo', this.followingInfo);
        this.followerPostUpdated.next([...this.followingInfo]);
        sub.unsubscribe();
        console.log('rich and famous baby 2');
      });
  }
  // skalars following
  mutualFollow(username: string, userId: string): any {
    const sub = this.http
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
              viewed: data.viewed,
            };
          });
        })
      )
      .subscribe((transformedMessage) => {
        this.mutualInfo = transformedMessage;
        console.log('big feet', this.mutualInfo);
        this.mutualInfoPostUpdated.next([...this.mutualInfo]);
        sub.unsubscribe();
        console.log('rich and famous baby 10');
      });
  }

  // accept follower
  acceptFollow(followId: string): any {
    const sub = this.http
      .get<{ message: string; update: boolean }>(
        'https://www.skalarly.com/api/follow/acceptFollow',
        {
          params: { followId },
        }
      )
      .pipe(
        map((messageData) => {
          return messageData.update;
        })
      )
      .subscribe((transformedMessage) => {
        console.log('boolean check', transformedMessage);
        this.acceptFollowCheck = transformedMessage;
        // this.mutualsInfoPostUpdated.next([...this.mutualsInfo]);
        sub.unsubscribe();
        console.log('rich and famous baby 11');
      });
  }

  // skalars followers
  mutualsFollow(username: string, userId: string): any {
    const sub = this.http
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
              viewed: data.viewed,
            };
          });
        })
      )
      .subscribe((transformedMessage) => {
        this.mutualsInfo = transformedMessage;
        this.mutualsInfoPostUpdated.next([...this.mutualsInfo]);
        sub.unsubscribe();
        console.log('rich and famous baby 11');
      });
  }
  // deleting from friends activity pg
  deleteFollow(followId: string): any {
    console.log('hey chase followId', followId);
    const sub = this.http
      .delete('https://www.skalarly.com/api/follow/unFollow/' + followId)
      .subscribe(() => {
        const updatedPosts = this.follow.filter((post) => post.id !== followId);
        this.follow = updatedPosts;
        this.followPostUpdated.next([...this.follow]);
        sub.unsubscribe();
        console.log('rich and famous baby 12');
      });
  }
  // deleting from user profile
  deleteFollowUserPg(userName: string, userId: string): any {
    console.log('hey chase followId', userName);
    console.log('hey chase followId', userId);
    const sub = this.http
      .get('https://www.skalarly.com/api/follow/unFollowUserPg/', {
        params: { userName, userId },
      })
      .subscribe(() => {
        console.log('rog;er cleared here');
        // const updatedPosts = this.follow.filter((post) => post.id !== userId);
        // this.follow = updatedPosts;
        // this.followPostUpdated.next([...this.follow]);
        sub.unsubscribe();
        console.log('rich and famous baby 2');
      });
  }
  deleteFollowers(followId: string): any {
    // console.log('hey chase postId', postId);
    const sub = this.http
      .delete('https://www.skalarly.com/api/follow/unFollower/' + followId)
      .subscribe(() => {
        const updatedPosts = this.follower.filter(
          (post) => post.id !== followId
        );
        this.follower = updatedPosts;
        this.followerPostUpdated.next([...this.follower]);
        sub.unsubscribe();
        console.log('rich and famous baby 13');
      });
  }
  // block skalar
  blockSkalar(username: string, userId): any {
    const sub = this.http
      .get<{ message: string; messages: any }>(
        'https://www.skalarly.com/api/follow/blockSkalar',
        {
          params: { username, userId },
        }
      )
      .pipe(
        map((messageData) => {
          return messageData.messages;
        })
      )
      .subscribe((transformedMessage) => {
        console.log('made it to subscribe 1', transformedMessage);
        this.blockedUser = transformedMessage;
        this.blockedUserUpdated.next(this.blockedUser);
        this.snackBar.open('Skalar has been blocked', '🚫', {
          duration: 3000,
        });
        sub.unsubscribe();
        console.log('rich and famous baby 14');
      });
  }
  // unblock skalar
  unblockSkalar(username: string, userId): any {
    const sub = this.http
      .delete<{ message: string; messages: any }>(
        'https://www.skalarly.com/api/follow/unblockSkalar',
        {
          params: { username, userId },
        }
      )
      .pipe(
        map((messageData) => {
          return messageData.messages;
        })
      )
      .subscribe((transformedMessage) => {
        console.log('made it to subscribe', transformedMessage);
        this.blockedUser = transformedMessage;
        this.blockedUserUpdated.next(this.blockedUser);
        this.snackBar.open('Skalar has been unblocked', '✅', {
          duration: 3000,
        });
        sub.unsubscribe();
        console.log('rich and famous baby 15');
      });
  }
  // unblock skalar from activity pg
  unblockSkalarActivityPg(username: string, userId): any {
    const sub = this.http
      .delete<{ message: string; messages: any }>(
        'https://www.skalarly.com/api/follow/unblockSkalarActivity',
        {
          params: { username, userId },
        }
      )
      .pipe(
        map((messageData) => {
          return messageData.messages;
        })
      )
      .subscribe((transformedMessage) => {
        console.log('made it to subscribe', transformedMessage);
        this.blockedUser2 = transformedMessage;
        this.blockedUserUpdated2.next([...this.blockedUser2]);
        this.snackBar.open('Skalar has been unblocked', '✅', {
          duration: 3000,
        });
        sub.unsubscribe();
        console.log('rich and famous baby 16');
      });
  }
}

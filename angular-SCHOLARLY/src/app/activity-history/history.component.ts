import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { CommentsService } from '../services/comments.service';
import { Router } from '@angular/router';
import { Post, PostService } from '../services/post.service';
import { FollowService } from '../services/follow.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PostsService } from '../services/posts.service';
import { AppComponent } from '../app.component';
import { formatDistance } from 'date-fns';

export interface FollowHistory {
  Follower: string;
  usernameFollower: string;
  ProfilePicPathFollower: string;
  Following: string;
  Time: Date;
}
export interface BlockUser {
  userName: string;
  userid: string;
}
export interface MissedNotif {
  username: string;
  message: string;
  time: string;
  body: string;
  Follower: string;
  postId: string;
  Creator: string;
}
export interface CommentInterface {
  id: string;
  body: string;
  time: string;
  postId: string;
  ProfilePicPath: string;
  viewed: boolean;
  Creator: string;
}
@Component({
  selector: 'activity-history',
  templateUrl: './history.component.html',
  styleUrls: ['../friends-activity/friends-activity.component.scss'],
})
export class ActivityHistoryComponent implements OnInit, OnDestroy {
  comments: CommentInterface[] = [];
  userId: string;
  followers: FollowHistory[] = [];
  followersAccepted = [];
  newShared = [];
  newComment = [];

  newAccepted = [];

  private postsSub: Subscription;
  private commentSub: Subscription;
  private followSubHistory: Subscription;
  private followSubAccepted: Subscription;
  private missedNotifsSub: Subscription;
  private followSub: Subscription;
  private followSubFollowers: Subscription;
  shared: Post[] = [];
  notif: MissedNotif[] = [];
  blocked: BlockUser[] = [];

  constructor(
    private commentsService: CommentsService,
    public postService: PostService,
    private authService: AuthService,
    private followService: FollowService,
    private snackBar: MatSnackBar,
    private postsService: PostsService,
    private router: Router,
    private appComponent: AppComponent
  ) {}
  ngOnInit(): any {
    this.userId = this.authService.getUserId();
    this.snackBar.dismiss();
    // comments
    this.commentsService.getCommentsHistory(this.userId, 0);
    this.commentSub = this.commentsService
      .getMessagesUpdateListener()
      .subscribe((comments: any) => {
        if (comments.length >= 1) {
          this.comments = comments;
          const NEW2 = [];
          this.comments.forEach((e) => {
            if (e.viewed === false) {
              NEW2.push(e.viewed);
            } else {
              console.log('no unread comments');
            }
          });
          this.newComment = NEW2;
          console.log('new Gold', this.newComment);
        }
      });
    // history of followers
    this.followService.getMessageNotificationFollowedHistory(this.userId, 0);
    this.followSubHistory = this.followService
      .getInfoFollowUpdateListenerHistory()
      .subscribe((followers: FollowHistory[]) => {
        if (followers.length >= 1) {
          this.followers = followers;
        }
      });
    // accepted follow requests
    this.followService.getMessageNotificationFollowedAccepted(this.userId, 0);
    this.followSubAccepted = this.followService
      .getInfoFollowUpdateListenerAccepted()
      .subscribe((accepted: any) => {
        if (accepted.length >= 1) {
          this.followersAccepted = accepted;
          const NEW2 = [];
          this.followersAccepted.forEach((e) => {
            if (e.viewed === false) {
              NEW2.push(e.viewed);
            } else {
              console.log('no new following history');
            }
          });
          this.newAccepted = NEW2;
        }
      });
    // following info
    // this.followService.getMessageNotificationFollowed(this.userId);
    // this.followSubFollowers = this.followService
    //   .getInfoFollowUpdateListener()
    //   .subscribe((followers: FollowHistory[]) => {
    //     this.followers = followers;
    //     const NEW2 = [];
    //     this.followers.forEach((e) => {
    //       if (e.viewed === false) {
    //         NEW2.push(e.viewed);
    //       } else {
    //         console.log('no unread comments');
    //       }
    //     });
    //     this.newFollower = NEW2;
    //   });

    // shared
    this.postService.getSharedPosts(this.userId, 0);
    this.postsSub = this.postService
      .getPostSharedUpdateListener()
      .subscribe((shared: Post[]) => {
        if (shared.length > 0) {
          this.shared = shared;
          const NEW = [];
          this.shared.forEach((e) => {
            if (e.viewed === false) {
              NEW.push(e.viewed);
            } else {
              console.log('no unread messages');
            }
          });
          this.newShared = NEW;
          console.log('new Gold', this.newShared);
        } else {
          console.log('no unread messages 2.0');
        }
      });

    // missed notifs
    this.commentsService.getMissedNotif(this.userId, 0);
    this.missedNotifsSub = this.commentsService
      .getMissedNotifUpdateListener()
      .subscribe((missedNotifs: MissedNotif[]) => {
        if (missedNotifs.length >= 1) {
          this.notif = missedNotifs;
        }
      });

    this.followService.getBlockedList(this.userId);
    this.followSub = this.followService
      .getBlockedSkalarsUpdateListener()
      .subscribe((blocked: BlockUser[]) => {
        if (blocked.length >= 1) {
          this.blocked = blocked;
        }
      });
  }

  ngOnDestroy(): any {
    this.commentSub.unsubscribe();
    this.followSubHistory.unsubscribe();
    this.followSubFollowers.unsubscribe();
    this.postsSub.unsubscribe();
    this.missedNotifsSub.unsubscribe();
    this.followSub.unsubscribe();
    this.followSubAccepted.unsubscribe();
    this.appComponent.updateSettingsIcon();
    if (this.newComment.length !== 0) {
      this.commentsService.updateCommentsPosts(this.userId);
    }
    if (this.newAccepted.length !== 0) {
      this.followService.updateFollowAccepted(this.userId);
    }
    if (this.newShared.length !== 0) {
      this.postService.updateSharedPosts(this.userId);
    }
  }

  // Turn off notifications
  offNotifs(): void {
    this.postsService.deleteNotif(this.userId);
    this.commentsService.clearMissedNotif(this.userId);
    const subNotif = this.commentsService
      .getMissedNotifUpdateListener()
      .subscribe((missedNotifs: MissedNotif[]) => {
        if (missedNotifs.length >= 1) {
          this.notif = missedNotifs;
        }
      });
    subNotif.unsubscribe();
    // nav to profile
    this.router.navigate(['/profile']);
  }
}

@Component({
  selector: 'comment-history',
  templateUrl: './comment-history.component.html',
  styleUrls: ['../reusable-card/reusable-card.component.scss'],
})
export class CommentHistoryComponent implements OnInit, OnDestroy {
  private commentsSub: Subscription;
  comments: string[] = [];
  userId: string;
  recomCounter = 0;
  countVisibility = 0;

  constructor(
    private authService: AuthService,
    private commentsService: CommentsService,
    public postService: PostService,
    private router: Router
  ) {}

  ngOnInit(): any {
    // console.log('hey logic fade away', postId);
    // this.commentsService.getComments(postId);
    this.userId = this.authService.getUserId();
    // Then track all posts under this Creator get _id then get Comments postId

    this.commentsService.getCommentsHistory(this.userId, this.recomCounter);
    this.commentsSub = this.commentsService
      .getMessagesUpdateListener()
      .subscribe((comments: any) => {
        if (comments.length >= 1) {
          comments.forEach((e) => {
            if (e.time) {
              e.time = formatDistance(new Date(e.time), new Date(), {
                addSuffix: true,
              });
            }
          });
          console.log('comments yo', comments);
        }
        this.comments = comments;
      });
  }

  ngOnDestroy(): any {
    this.commentsSub.unsubscribe();
  }
  // Forward
  onClickFeed(): any {
    const count = 1;
    this.countVisibility += count;
    const counting = 6;
    this.recomCounter += counting;

    this.commentsService.getCommentsHistory(this.userId, this.recomCounter);
    const sub1 = this.commentsService
      .getMessagesUpdateListener()
      .subscribe((comments: any) => {
        if (comments.length >= 1) {
          comments.forEach((e) => {
            if (e.time) {
              e.time = formatDistance(new Date(e.time), new Date(), {
                addSuffix: true,
              });
            }
          });
        }
        this.comments = comments;
        sub1.unsubscribe();
      });
  }
  // Back
  onClickFeedBack(): any {
    const count = 1;
    this.countVisibility -= count;
    const counting = 6;
    this.recomCounter -= counting;

    this.commentsService.getCommentsHistory(this.userId, this.recomCounter);
    const sub2 = this.commentsService
      .getMessagesUpdateListener()
      .subscribe((comments: any) => {
        if (comments.length >= 1) {
          comments.forEach((e) => {
            if (e.time) {
              e.time = formatDistance(new Date(e.time), new Date(), {
                addSuffix: true,
              });
            }
          });
        }
        this.comments = comments;
        sub2.unsubscribe();
      });
  }
  onDeleteComment(commentId: string): any {
    this.commentsService.deleteComment(commentId);
    console.log('chaz whats up', commentId);
    this.commentsService.getCommentsHistory(this.userId, this.recomCounter);
    this.commentsSub = this.commentsService
      .getMessagesUpdateListener()
      .subscribe((comments: any) => {
        if (comments.length >= 1) {
          comments.forEach((e) => {
            if (e.time) {
              e.time = formatDistance(new Date(e.time), new Date(), {
                addSuffix: true,
              });
            }
          });
        }
        this.comments = comments;
        this.commentsSub.unsubscribe();
      });
    console.log('begging to have her kneck fucked');
  }
  navToPost(postId: string): any {
    this.router.navigate(['/single/:'], { queryParams: { postId } });
  }
  navigateToPage(infoUser: string): any {
    // const ID = (document.getElementById('userName') as HTMLInputElement).value;
    this.router.navigate(['/skalars/:'], { queryParams: { id: infoUser } });
  }
}

@Component({
  selector: 'followed-history-template',
  templateUrl: './followed-template-history.component.html',
  styleUrls: ['../reusable-card-user/reusable-card-user.component.scss'],
})
export class FollowedTemplateComponent implements OnInit, OnDestroy {
  userId: string;
  history: FollowHistory[] = [];
  recomCounter = 0;
  countVisibility = 0;
  private followSub: Subscription;
  private sub1: Subscription;
  private sub2: Subscription;

  constructor(
    private authService: AuthService,
    private followService: FollowService,
    private router: Router
  ) {}
  ngOnInit(): any {
    this.userId = this.authService.getUserId();
    // following info
    this.followService.getMessageNotificationFollowedHistory(
      this.userId,
      this.recomCounter
    );
    this.followSub = this.followService
      .getInfoFollowUpdateListenerHistory()
      .subscribe((followers: any) => {
        if (followers.length >= 1) {
          followers.forEach((e) => {
            if (e.Time) {
              e.Time = formatDistance(new Date(e.Time), new Date(), {
                addSuffix: true,
              });
            }
          });
        }
        this.history = followers;
      });
  }

  ngOnDestroy(): any {
    this.followSub.unsubscribe();
  }
  // Forward
  onClickFeed(): any {
    const count = 1;
    this.countVisibility += count;
    const counting = 6;
    this.recomCounter += counting;

    this.followService.getMessageNotificationFollowedHistory(
      this.userId,
      this.recomCounter
    );
    this.sub1 = this.followService
      .getInfoFollowUpdateListenerHistory()
      .subscribe((followers: any) => {
        if (followers.length >= 1) {
          followers.forEach((e) => {
            if (e.Time) {
              e.Time = formatDistance(new Date(e.Time), new Date(), {
                addSuffix: true,
              });
            }
          });
        }
        this.history = followers;
        this.sub1.unsubscribe();
      });
  }
  // Back
  onClickFeedBack(): any {
    const count = 1;
    this.countVisibility -= count;
    const counting = 6;
    this.recomCounter -= counting;

    this.followService.getMessageNotificationFollowedHistory(
      this.userId,
      this.recomCounter
    );
    this.sub2 = this.followService
      .getInfoFollowUpdateListenerHistory()
      .subscribe((followers: any) => {
        if (followers.length >= 1) {
          followers.forEach((e) => {
            if (e.Time) {
              e.Time = formatDistance(new Date(e.Time), new Date(), {
                addSuffix: true,
              });
            }
          });
        }
        this.history = followers;
        this.sub2.unsubscribe();
      });
  }
  navigateToPage(infoUser: string): any {
    // const ID = (document.getElementById('userName') as HTMLInputElement).value;
    this.router.navigate(['/skalars/:'], { queryParams: { id: infoUser } });
  }
}
@Component({
  selector: 'followed-accepted-history',
  templateUrl: './followed-accepted-history.component.html',
  styleUrls: ['../reusable-card-user/reusable-card-user.component.scss'],
})
export class FollowedAcceptedComponent implements OnInit, OnDestroy {
  userId: string;
  accepted = [];
  recomCounter = 0;
  countVisibility = 0;
  private followAccepted: Subscription;
  private sub1: Subscription;
  private sub2: Subscription;

  constructor(
    private authService: AuthService,
    private followService: FollowService,
    private router: Router
  ) {}
  ngOnInit(): any {
    this.userId = this.authService.getUserId();
    // accepted info
    this.followService.getMessageNotificationFollowedAccepted(this.userId, 0);
    this.followAccepted = this.followService
      .getInfoFollowUpdateListenerAccepted()
      .subscribe((accept: any) => {
        if (accept.length >= 1) {
          const NEW2 = [];
          accept.forEach((e) => {
            if (e.Time) {
              e.Time = formatDistance(new Date(e.Time), new Date(), {
                addSuffix: true,
              });
            }
          });
        }
        this.accepted = accept;
      });
  }

  ngOnDestroy(): any {
    this.followAccepted.unsubscribe();
  }
  // Forward
  onClickFeed(): any {
    const count = 1;
    this.countVisibility += count;
    const counting = 6;
    this.recomCounter += counting;

    this.followService.getMessageNotificationFollowedAccepted(
      this.userId,
      this.recomCounter
    );
    this.sub1 = this.followService
      .getInfoFollowUpdateListenerAccepted()
      .subscribe((accept: any) => {
        if (accept.length >= 1) {
          accept.forEach((e) => {
            if (e.Time) {
              e.Time = formatDistance(new Date(e.Time), new Date(), {
                addSuffix: true,
              });
            }
          });
        }
        this.accepted = accept;
        this.sub1.unsubscribe();
      });
  }
  // Back
  onClickFeedBack(): any {
    const count = 1;
    this.countVisibility -= count;
    const counting = 6;
    this.recomCounter -= counting;

    this.followService.getMessageNotificationFollowedAccepted(
      this.userId,
      this.recomCounter
    );
    this.sub2 = this.followService
      .getInfoFollowUpdateListenerAccepted()
      .subscribe((accept: any) => {
        if (accept.length >= 1) {
          accept.forEach((e) => {
            if (e.Time) {
              e.Time = formatDistance(new Date(e.Time), new Date(), {
                addSuffix: true,
              });
            }
          });
        }
        this.accepted = accept;
        this.sub2.unsubscribe();
      });
  }
  navigateToPage(infoUser: string): any {
    // const ID = (document.getElementById('userName') as HTMLInputElement).value;
    this.router.navigate(['/skalars/:'], { queryParams: { id: infoUser } });
  }
}
@Component({
  selector: 'shared-history-template',
  templateUrl: './shared-history.component.html',
  styleUrls: ['../reusable-card-user/reusable-card-user.component.scss'],
})
export class SharedHistoryComponent implements OnInit, OnDestroy {
  userId: string;
  countVisibility = 0;
  recomCounter = 0;

  shared: Post[] = [];

  private postsSub: Subscription;
  private sub1: Subscription;
  private sub2: Subscription;
  constructor(
    private router: Router,
    private authService: AuthService,
    public postService: PostService
  ) {}
  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    // Posts
    this.postService.getSharedPosts(this.userId, 0);
    this.postsSub = this.postService
      .getPostSharedUpdateListener()
      .subscribe((shared: Post[]) => {
        console.log('whats going on', shared);
        // if time added then change to the nice way of looking with foreach like others
        this.shared = shared;
      });
  }

  ngOnDestroy(): any {
    this.postsSub.unsubscribe();
  }
  navigateToPage(infoUser: string): any {
    // const ID = (document.getElementById('userName') as HTMLInputElement).value;
    this.router.navigate(['/skalars/:'], { queryParams: { id: infoUser } });
  }
  navToPost(postId: string): any {
    this.router.navigate(['/single/:'], { queryParams: { postId } });
  }

  delRePost(id: string): any {
    console.log('baby g', id);
    this.postService.deletePost(id);
  }
  // Forward
  onClickFeed(): any {
    const count = 1;
    this.countVisibility += count;
    const counting = 6;
    this.recomCounter += counting;

    this.postService.getSharedPosts(this.userId, this.recomCounter);
    this.sub1 = this.postService
      .getPostSharedUpdateListener()
      .subscribe((shared: Post[]) => {
        this.shared = shared;
        this.sub1.unsubscribe();
      });
  }
  // Back
  onClickFeedBack(): any {
    const count = 1;
    this.countVisibility -= count;
    const counting = 6;
    this.recomCounter -= counting;

    this.postService.getSharedPosts(this.userId, this.recomCounter);
    this.sub2 = this.postService
      .getPostSharedUpdateListener()
      .subscribe((shared: Post[]) => {
        this.shared = shared;
        this.sub2.unsubscribe();

        console.log('shared', this.shared);
      });
  }
}
@Component({
  selector: 'missed-notifications',
  templateUrl: './missed-notifications.component.html',
  styleUrls: ['../reusable-card-user/reusable-card-user.component.scss'],
})
export class MissedNotificationsComponent implements OnInit, OnDestroy {
  userId: string;
  notif: MissedNotif[] = [];
  recomCounter = 0;
  countVisibility = 0;
  private commentsSub: Subscription;
  constructor(
    private router: Router,
    private authService: AuthService,
    private commentsService: CommentsService,
    public postService: PostService
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.getUserId();

    // missed notifs
    this.commentsService.getMissedNotif(this.userId, 0);
    this.commentsSub = this.commentsService
      .getMissedNotifUpdateListener()
      .subscribe((missedNotifs: MissedNotif[]) => {
        if (missedNotifs.length >= 1) {
          missedNotifs.forEach((e) => {
            if (e.time !== '') {
              e.time = formatDistance(new Date(e.time), new Date(), {
                addSuffix: true,
              });
            }
          });
        }
        this.notif = missedNotifs;
      });
  }

  ngOnDestroy(): any {
    this.commentsSub.unsubscribe();
  }
  navigateToPage(infoUser: string): any {
    // const ID = (document.getElementById('userName') as HTMLInputElement).value;
    this.router.navigate(['/skalars/:'], { queryParams: { id: infoUser } });
  }
  // Forward
  // onClickFeed(): any {
  //   const count = 1;
  //   this.countVisibility += count;
  //   const counting = 6;
  //   this.recomCounter += counting;
  //   console.log('hey', this.recomCounter);
  //   console.log('howdy', this.countVisibility);

  //   this.commentsService.getMissedNotif(this.userId, this.recomCounter);
  //   this.commentsService
  //     .getMissedNotifUpdateListener()
  //     .subscribe((missedNotifs: MissedNotif[]) => {
  //       this.notif = missedNotifs;
  //     });
  // }
  // Back
  // onClickFeedBack(): any {
  //   const count = 1;
  //   this.countVisibility -= count;
  //   const counting = 6;
  //   this.recomCounter -= counting;
  //   console.log('hey back', this.recomCounter);
  //   console.log('howdy', this.countVisibility);

  //   this.commentsService.getMissedNotif(this.userId, this.recomCounter);
  //   this.commentsService
  //     .getMissedNotifUpdateListener()
  //     .subscribe((missedNotifs: MissedNotif[]) => {
  //       this.notif = missedNotifs;
  //     });
  // }
  navToPost(postId: string): any {
    console.log('Hey babe I miss you', postId);
    this.router.navigate(['/single/:'], { queryParams: { postId } });
  }
  navigateToChat(username: string): any {
    // const ID = (document.getElementById('userName') as HTMLInputElement).value;
    this.router.navigate(['/messages/:'], { queryParams: { username } });
  }
  navigateToFriends(): void {
    this.router.navigate(['/friends-activity']);
  }
}

@Component({
  selector: 'blocked-skalars',
  templateUrl: './blockedSkalar-list.component.html',
  styleUrls: ['../reusable-card-user/reusable-card-user.component.scss'],
})
export class BlockedSkalarsComponent implements OnInit, OnDestroy {
  userId: string;
  blocked: BlockUser[] = [];
  recomCounter = 0;
  countVisibility = 0;
  private followSub: Subscription;
  constructor(
    private router: Router,
    private authService: AuthService,
    private followService: FollowService
  ) {}
  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.followService.getBlockedList(this.userId);
    this.followSub = this.followService
      .getBlockedSkalarsUpdateListener()
      .subscribe((blocked: BlockUser[]) => {
        this.blocked = blocked;
        console.log('notif lost', this.blocked);
      });
  }
  ngOnDestroy(): any {
    this.followSub.unsubscribe();
  }
  unblockSkalar(userName: string): void {
    console.log('greatful', userName);
    this.followService.unblockSkalarActivityPg(userName, this.userId);
    const blockSub = this.followService
      .getBlockedSkalarsUpdateListener2()
      .subscribe((blocked: BlockUser[]) => {
        console.log('big blocked', blocked);
        this.blocked = blocked;
        if (blocked.length === 0) {
          console.log('blocks gone', this.blocked);
          // redirect user off pg or not?
          // this.router.navigate(['/search']);
        }
      });
    blockSub.unsubscribe();
  }
  navigateToPage(infoUser: string): any {
    // const ID = (document.getElementById('userName') as HTMLInputElement).value;
    this.router.navigate(['/skalars/:'], { queryParams: { id: infoUser } });
  }
}

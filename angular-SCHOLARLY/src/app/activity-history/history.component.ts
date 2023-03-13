import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { CommentsService } from '../services/comments.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Post, PostService } from '../services/post.service';
import { FollowService } from '../services/follow.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PostsService } from '../services/posts.service';

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
  followers: Follow[] = [];
  newShared = [];
  newComment = [];
  private postsSub: Subscription;
  private commentSub: Subscription;
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
    private router: Router
  ) {}
  ngOnInit(): any {
    this.userId = this.authService.getUserId();
    this.snackBar.dismiss();
    // comments
    this.commentSub = this.commentsService
      .getMessagesUpdateListenerHistory()
      .subscribe((comments: any) => {
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
      });
    // following info
    this.followService.getMessageNotificationFollowed(this.userId);
    this.followSubFollowers = this.followService
      .getInfoFollowUpdateListener()
      .subscribe((followers: Follow[]) => {
        this.followers = followers;
      });

    // shared
    this.postService.getSharedPosts(this.userId, 0);
    this.postsSub = this.postService
      .getPostUpdateListener()
      .subscribe((shared: Post[]) => {
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
      });

    // missed notifs
    this.commentsService.getMissedNotif(this.userId, 0);
    this.missedNotifsSub = this.commentsService
      .getMissedNotifUpdateListener()
      .subscribe((missedNotifs: MissedNotif[]) => {
        this.notif = missedNotifs;
      });

    this.followService.getBlockedList(this.userId);
    this.followSub = this.followService
      .getBlockedSkalarsUpdateListener()
      .subscribe((blocked: BlockUser[]) => {
        this.blocked = blocked;
      });
  }

  ngOnDestroy(): any {
    this.commentSub.unsubscribe();
    this.followSubFollowers.unsubscribe();
    this.postsSub.unsubscribe();
    this.missedNotifsSub.unsubscribe();
    this.followSub.unsubscribe();
  }

  // Turn off notifications
  offNotifs(): void {
    this.postsService.deleteNotif(this.userId);
    this.commentsService.clearMissedNotif(this.userId);
    const subNotif = this.commentsService
      .getMissedNotifUpdateListener()
      .subscribe((missedNotifs: MissedNotif[]) => {
        this.notif = missedNotifs;
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
      .getMessagesUpdateListenerHistory()
      .subscribe((comments: string[]) => {
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
      .getMessagesUpdateListenerHistory()
      .subscribe((comments: string[]) => {
        this.comments = comments.reverse();
      });
    sub1.unsubscribe();
  }
  // Back
  onClickFeedBack(): any {
    const count = 1;
    this.countVisibility -= count;
    const counting = 6;
    this.recomCounter -= counting;

    this.commentsService.getCommentsHistory(this.userId, this.recomCounter);
    const sub2 = this.commentsService
      .getMessagesUpdateListenerHistory()
      .subscribe((comments: string[]) => {
        this.comments = comments.reverse();
      });
    sub2.unsubscribe();
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
  mutuals: Follow[] = [];
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
      .subscribe((followers: Follow[]) => {
        this.mutuals = followers;
      });
  }

  ngOnDestroy(): any {
    this.followSub.unsubscribe();
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
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
      .subscribe((followers: Follow[]) => {
        this.mutuals = followers;
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
      .subscribe((followers: Follow[]) => {
        this.mutuals = followers;
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
      .getPostUpdateListener()
      .subscribe((shared: Post[]) => {
        this.shared = shared;
      });
  }

  ngOnDestroy(): any {
    this.postsSub.unsubscribe();
    this.postService.updateSharedPosts(this.userId);
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
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
      .getPostUpdateListener()
      .subscribe((shared: Post[]) => {
        this.shared = shared;
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
      .getPostUpdateListener()
      .subscribe((shared: Post[]) => {
        this.shared = shared;
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

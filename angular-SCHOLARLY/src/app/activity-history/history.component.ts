import { Component, OnInit } from '@angular/core';
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
@Component({
  selector: 'activity-history',
  templateUrl: './history.component.html',
  styleUrls: ['../friends-activity/friends-activity.component.scss'],
})
export class ActivityHistoryComponent implements OnInit {
  comments: string[] = [];
  userId: string;
  followers: Follow[] = [];
  private postsSub: Subscription;
  shared: Post[] = [];
  notif: MissedNotif[] = [];
  blocked: BlockUser[] = [];
  private followSubFollowers: Subscription;

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
    this.commentsService
      .getMessagesUpdateListenerHistory()
      .subscribe((comments: string[]) => {
        this.comments = comments;
        console.log('kristina 1', this.comments);
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
        console.log('shared', this.shared);
      });

    // missed notifs
    this.commentsService.getMissedNotif(this.userId, 0);
    this.commentsService
      .getMissedNotifUpdateListener()
      .subscribe((missedNotifs: MissedNotif[]) => {
        this.notif = missedNotifs;
        console.log('notif lost', this.notif);
      });

    this.followService.getBlockedList(this.userId);
    this.followService
      .getBlockedSkalarsUpdateListener()
      .subscribe((blocked: BlockUser[]) => {
        this.blocked = blocked;
        console.log('notif lost', this.blocked);
      });
  }

  // Turn off notifications
  offNotifs(): void {
    console.log('working 2', this.userId);
    this.postsService.deleteNotif(this.userId);
    this.commentsService.clearMissedNotif(this.userId);
    this.commentsService
      .getMissedNotifUpdateListener()
      .subscribe((missedNotifs: MissedNotif[]) => {
        this.notif = missedNotifs;
        console.log('notif lost', this.notif);
      });
    // nav to profile
    this.router.navigate(['/profile']);
  }
}

@Component({
  selector: 'comment-history',
  templateUrl: './comment-history.component.html',
  styleUrls: ['../reusable-card/reusable-card.component.scss'],
})
export class CommentHistoryComponent implements OnInit {
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
    console.log('chaz', this.userId);
    this.commentsService.getCommentsHistory(this.userId, this.recomCounter);
    this.commentsSub = this.commentsService
      .getMessagesUpdateListenerHistory()
      .subscribe((comments: string[]) => {
        this.comments = comments;
        console.log('kristina', this.comments);
      });
  }
  // Forward
  onClickFeed(): any {
    const count = 1;
    this.countVisibility += count;
    const counting = 6;
    this.recomCounter += counting;
    console.log('hey', this.recomCounter);
    console.log('howdy', this.countVisibility);

    this.commentsService.getCommentsHistory(this.userId, this.recomCounter);
    this.commentsService
      .getMessagesUpdateListenerHistory()
      .subscribe((comments: string[]) => {
        this.comments = comments.reverse();
        console.log('posts personal', this.comments);
      });
  }
  // Back
  onClickFeedBack(): any {
    const count = 1;
    this.countVisibility -= count;
    const counting = 6;
    this.recomCounter -= counting;
    console.log('hey back', this.recomCounter);
    console.log('howdy', this.countVisibility);

    this.commentsService.getCommentsHistory(this.userId, this.recomCounter);
    this.commentsService
      .getMessagesUpdateListenerHistory()
      .subscribe((comments: string[]) => {
        this.comments = comments.reverse();

        console.log('comments', this.comments);
      });
  }
  navToPost(postId: string): any {
    console.log('Hey babe I miss you', postId);
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
export class FollowedTemplateComponent implements OnInit {
  userId: string;
  mutuals: Follow[] = [];
  recomCounter = 0;
  countVisibility = 0;

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
    this.followService
      .getInfoFollowUpdateListenerHistory()
      .subscribe((followers: Follow[]) => {
        this.mutuals = followers;
        console.log('my secret', this.mutuals);
      });
  }
  // Forward
  onClickFeed(): any {
    const count = 1;
    this.countVisibility += count;
    const counting = 6;
    this.recomCounter += counting;
    console.log('hey', this.recomCounter);
    console.log('howdy', this.countVisibility);

    this.followService.getMessageNotificationFollowedHistory(
      this.userId,
      this.recomCounter
    );
    this.followService
      .getInfoFollowUpdateListenerHistory()
      .subscribe((followers: Follow[]) => {
        this.mutuals = followers;
        console.log('posts personal', this.mutuals);
      });
  }
  // Back
  onClickFeedBack(): any {
    const count = 1;
    this.countVisibility -= count;
    const counting = 6;
    this.recomCounter -= counting;
    console.log('hey back', this.recomCounter);
    console.log('howdy', this.countVisibility);

    this.followService.getMessageNotificationFollowedHistory(
      this.userId,
      this.recomCounter
    );
    this.followService
      .getInfoFollowUpdateListenerHistory()
      .subscribe((followers: Follow[]) => {
        this.mutuals = followers;

        console.log('comments', this.mutuals);
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
export class SharedHistoryComponent implements OnInit {
  userId: string;
  countVisibility = 0;
  recomCounter = 0;

  shared: Post[] = [];
  private postsSub: Subscription;

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
        console.log('shared', this.shared);
      });
  }
  navigateToPage(infoUser: string): any {
    // const ID = (document.getElementById('userName') as HTMLInputElement).value;
    this.router.navigate(['/skalars/:'], { queryParams: { id: infoUser } });
  }
  navToPost(postId: string): any {
    console.log('Hey babe I miss you', postId);
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
    console.log('hey', this.recomCounter);
    console.log('howdy', this.countVisibility);

    this.postService.getSharedPosts(this.userId, this.recomCounter);
    this.postService.getPostUpdateListener().subscribe((shared: Post[]) => {
      this.shared = shared;
      console.log('shared', this.shared);
    });
  }
  // Back
  onClickFeedBack(): any {
    const count = 1;
    this.countVisibility -= count;
    const counting = 6;
    this.recomCounter -= counting;
    console.log('hey back', this.recomCounter);
    console.log('howdy', this.countVisibility);

    this.postService.getSharedPosts(this.userId, this.recomCounter);
    this.postService.getPostUpdateListener().subscribe((shared: Post[]) => {
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
export class MissedNotificationsComponent implements OnInit {
  userId: string;
  notif: MissedNotif[] = [];
  recomCounter = 0;
  countVisibility = 0;

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
    this.commentsService
      .getMissedNotifUpdateListener()
      .subscribe((missedNotifs: MissedNotif[]) => {
        this.notif = missedNotifs;
        console.log('jeez wiz', this.notif);
      });
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
export class BlockedSkalarsComponent implements OnInit {
  userId: string;
  blocked: BlockUser[] = [];
  recomCounter = 0;
  countVisibility = 0;

  constructor(
    private router: Router,
    private authService: AuthService,
    private followService: FollowService
  ) {}
  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.followService.getBlockedList(this.userId);
    this.followService
      .getBlockedSkalarsUpdateListener()
      .subscribe((blocked: BlockUser[]) => {
        this.blocked = blocked;
        console.log('notif lost', this.blocked);
      });
  }
  unblockSkalar(userName: string): void {
    console.log('greatful', userName);
    this.followService.unblockSkalar(userName, this.userId);
    this.followService
      .getBlockedSkalarsUpdateListener()
      .subscribe((blocked) => {
        this.blocked = blocked;
        console.log('notif lost', this.blocked);
      });
  }
  navigateToPage(infoUser: string): any {
    // const ID = (document.getElementById('userName') as HTMLInputElement).value;
    this.router.navigate(['/skalars/:'], { queryParams: { id: infoUser } });
  }
}

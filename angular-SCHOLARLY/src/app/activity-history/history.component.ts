import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { CommentsService } from '../services/comments.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Post, PostService } from '../services/post.service';
import { FollowService } from '../services/follow.service';

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
@Component({
  selector: 'activity-history',
  templateUrl: './history.component.html',
  styleUrls: ['../friends-activity/friends-activity.component.scss'],
})
export class ActivityHistoryComponent implements OnInit {
  comments: string[] = [];
  userId: string;
  followers: Follow[] = [];
  private followSubFollowers: Subscription;

  constructor(
    private commentsService: CommentsService,
    public postService: PostService,
    private authService: AuthService,
    private followService: FollowService
  ) {}
  ngOnInit(): any {
    this.userId = this.authService.getUserId();

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
    this.commentsService.getCommentsHistory(this.userId);
    this.commentsSub = this.commentsService
      .getMessagesUpdateListenerHistory()
      .subscribe((comments: string[]) => {
        this.comments = comments.reverse();
        console.log('kristina', this.comments);
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
  private followSubFollowers: Subscription;

  constructor(
    private authService: AuthService,
    private followService: FollowService
  ) {}
  ngOnInit(): any {
    this.userId = this.authService.getUserId();
    // following info
    this.followService.getMessageNotificationFollowed(this.userId);
    this.followSubFollowers = this.followService
      .getInfoFollowUpdateListener()
      .subscribe((followers: Follow[]) => {
        this.mutuals = followers;
      });
  }
}

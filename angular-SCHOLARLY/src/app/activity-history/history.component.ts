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

  constructor(
    private commentsService: CommentsService,
    public postService: PostService
  ) {}
  ngOnInit(): any {
    this.commentsService
      .getMessagesUpdateListenerHistory()
      .subscribe((comments: string[]) => {
        this.comments = comments;
        console.log('kristina 1', this.comments);
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
}

@Component({
  selector: 'followed-history',
  templateUrl: './followed-history.component.html',
  styleUrls: ['../friends-activity/friends-activity.component.scss'],
})
export class FollowedHistoryComponent implements OnInit {
  userId: string;
  followers: Follow[] = [];
  private followSubFollowers: Subscription;
  // Have it the same as followers or
  // Create new data model for when user clicks follow or unfollow and save that
  // Just have username, followed/unfollowed you in the model
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
        this.followers = followers;
      });
  }
}

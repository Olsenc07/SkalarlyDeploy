import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { CommentsService } from '../services/comments.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Post, PostService } from '../services/post.service';

@Component({
  selector: 'activity-history',
  templateUrl: './history.component.html',
  styleUrls: ['../friends-activity/friends-activity.component.scss'],
})
export class ActivityHistoryComponent implements OnInit {
  ngOnInit(): any {}
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
        this.comments = comments;
        console.log('kristina', this.comments);
      });
  }
}

@Component({
  selector: 'followed-history',
  templateUrl: './comment-history.component.html',
  styleUrls: ['../friends-activity/friends-activity.component.scss'],
})
export class FollowedHistoryComponent implements OnInit {
  ngOnInit(): any {}
}

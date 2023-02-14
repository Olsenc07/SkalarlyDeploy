import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Subject, ReplaySubject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MissedNotif } from '../activity-history/history.component';
import { CommentInterface } from '../reusable-card/reusable-card.component';

@Injectable()
export class CommentsService {
  private messages: CommentInterface[] = [];
  private missedNotifs: MissedNotif[] = [];

  private commentsUpdated = new ReplaySubject<CommentInterface[]>();
  private commentsUpdatedHistory = new ReplaySubject<CommentInterface[]>();

  private missedNotifsUpdated = new ReplaySubject<MissedNotif[]>();

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  private authStatusListener = new Subject<boolean>();
  getAuthStatusListener(): any {
    return this.authStatusListener.asObservable();
  }
  getMessagesUpdateListener(): any {
    return this.commentsUpdated.asObservable();
  }
  getMissedNotifUpdateListener(): any {
    return this.missedNotifsUpdated.asObservable();
  }
  getMessagesUpdateListenerHistory(): any {
    return this.commentsUpdatedHistory.asObservable();
  }
  getComments(postId: string): any {
    this.http
      .get<{ message: string; messages: any }>(
        'https://www.skalarly.com/api/posts/comments',
        { params: { postId } }
      )
      .pipe(
        map((messageData) => {
          return messageData.messages.map((comment) => {
            return {
              id: comment._id,
              body: comment.body,
              username: comment.username,
              time: comment.time,
              postId: comment.postId,
              ProfilePicPath: comment.ProfilePicPath,
              Creator: comment.Creator,
            };
          });
        })
      )
      .subscribe((transformedComment) => {
        this.messages = transformedComment;
        this.commentsUpdated.next([...this.messages]);
      });
  }
  // Get all comments history
  getCommentsHistory(userId: string, counter: number): any {
    this.http
      .get<{ message: string; messages: any }>(
        'https://www.skalarly.com/api/posts/commentsHistory',
        { params: { userId, counter } }
      )
      .pipe(
        map((messageData) => {
          return messageData.messages.map((comment) => {
            return {
              id: comment._id,
              body: comment.body,
              username: comment.username,
              time: comment.time,
              postId: comment.postId,
              ProfilePicPath: comment.ProfilePicPath,
              Creator: comment.Creator,
            };
          });
        })
      )
      .subscribe((transformedComment) => {
        this.messages = transformedComment;
        this.commentsUpdatedHistory.next([...this.messages]);
      });
  }
  createComment(
    body: string,
    userId: string,
    time: string,
    postId: string

    // parentId: null | string
  ): any {
    const messageOrg = {
      body,
      userId,
      time,
      postId,
    };
    this.http
      .post<{ message: string; messages: CommentInterface }>(
        'https://www.skalarly.com/api/posts/comments',
        messageOrg
      )
      .subscribe({
        next: (responseData) => {
          const message: CommentInterface = {
            id: responseData.messages.id,
            body,
            time,
            // userId
          };
          this.messages.push(message);
          this.commentsUpdated.next([...this.messages]);
          this.snackBar.open('Your comment added!', 'Yay!', {
            duration: 3000,
          });
        },
      });
  }

  // Delete comment
  deleteComment(commentId: string): any {
    // console.log('hey chase postId', postId);
    this.http
      .delete('https://www.skalarly.com/api/posts/comments/' + commentId)
      .subscribe(() => {
        const updatedPosts = this.messages.filter(
          (post) => post.id !== commentId
        );
        this.messages = updatedPosts;
        this.commentsUpdated.next([...this.messages]);
      });
  }

  getMissedNotif(userId: string, counter: number): any {
    this.http
      .get<{ message: string; messages: any }>(
        'https://www.skalarly.com/api/messages/missedNotifs',
        { params: { userId, counter } }
      )
      .pipe(
        map((messageData) => {
          return messageData.messages.map((comment) => {
            return {
              id: comment._id,
              username: comment.username,
              message: comment.message,
              time: comment.time,
              body: comment.body,
              Follower: comment.Follower,
              postId: comment.postId,
              Creator: comment.Creator,
            };
          });
        })
      )
      .subscribe((transformedComment) => {
        this.missedNotifs = transformedComment;
        this.missedNotifsUpdated.next([...this.missedNotifs]);
      });
  }
}

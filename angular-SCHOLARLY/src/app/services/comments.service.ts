import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MissedNotif } from '../activity-history/history.component';
import { CommentInterface } from '../reusable-card/reusable-card.component';

@Injectable()
export class CommentsService {
  private messages: CommentInterface[] = [];
  private missedNotifs: MissedNotif[] = [];

  private commentsUpdated = new Subject<CommentInterface[]>();
  private commentsUpdatedHistory = new Subject<CommentInterface[]>();

  private missedNotifsUpdated = new Subject<MissedNotif[]>();

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  private authStatusListener = new Subject<boolean>();
  getAuthStatusListener(): any {
    console.log('kayzo', this.authStatusListener.asObservable());
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
    const sub = this.http
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
              viewed: comment.viewed,
              Creator: comment.Creator,
            };
          });
        })
      )
      .subscribe((transformedComment) => {
        this.messages = transformedComment;
        this.commentsUpdated.next([...this.messages]);
        sub.unsubscribe();
        console.log('love you 1');
      });
  }
  // Get all comments history
  getCommentsHistory(userId: string, counter: number): any {
    const sub = this.http
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
              viewed: comment.viewed,
              Creator: comment.Creator,
            };
          });
        })
      )
      .subscribe((transformedComment) => {
        this.messages = transformedComment;
        this.commentsUpdatedHistory.next([...this.messages]);
        sub.unsubscribe();
        console.log('love you 2');
      });
  }
  // viewed comments on posts
  updateCommentsPosts(userId: string): any {
    console.log('view me baby by the sky with diamonds', userId);
    const sub = this.http
      .get<{ message: string }>(
        'https://www.skalarly.com/api/posts/viewedCommentsPost',
        {
          params: { userId },
        }
      )
      .pipe(
        map((messageData) => {
          return messageData.message;
          // .map((data) => {
          // return {
          //   id: data._id,
          //   username: data.username,
          //   message: data.message,
          //   time: data.time,
          //   otherUser: data.otherUser,
          //   you: data.you,
          // };
          // });
        })
      )
      .subscribe((transformedMessage) => {
        console.log('shark tank', transformedMessage);

        sub.unsubscribe();
        console.log('eazy 27 g eazy');
      });
  }
  createComment(
    body: string,
    userId: string,
    time: string,
    postId: string
  ): any {
    const messageOrg = {
      body,
      userId,
      time,
      postId,
    };
    const sub = this.http
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
            postId,
            ProfilePicPath: '',
            viewed: false,
            Creator: '',
          };
          this.messages.push(message);
          this.commentsUpdated.next([...this.messages]);
          this.snackBar.open('Your comment added!', 'Yay!', {
            duration: 3000,
          });
          sub.unsubscribe();
          console.log('love you 3');
        },
      });
  }

  // Delete comment
  deleteComment(commentId: string): any {
    console.log('hey chase commentId', commentId);
    const sub = this.http
      .delete('https://www.skalarly.com/api/posts/comments/' + commentId)
      .subscribe(() => {
        const updatedPosts = this.messages.filter(
          (post) => post.id !== commentId
        );
        this.messages = updatedPosts;
        this.commentsUpdated.next([...this.messages]);
        sub.unsubscribe();
        console.log('love you 4');
      });
  }

  getMissedNotif(userId: string, counter: number): any {
    const sub = this.http
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
              viewed: comment.viewed,
              Creator: comment.Creator,
            };
          });
        })
      )
      .subscribe((transformedComment) => {
        this.missedNotifs = transformedComment;
        this.missedNotifsUpdated.next([...this.missedNotifs]);
        sub.unsubscribe();
        console.log('love you 5');
      });
  }
  clearMissedNotif(userId: string): any {
    console.log('right here', userId);
    const sub = this.http
      .delete<{ message: string; infos: MissedNotif }>(
        'https://www.skalarly.com/api/posts/clearMissedNotif/' + userId
      )
      .subscribe({
        next: (transformedComment) => {
          const clearMissedNotif: MissedNotif = {
            username: transformedComment.infos.username,
            message: transformedComment.infos.message,
            time: transformedComment.infos.time,
            body: transformedComment.infos.body,
            Follower: transformedComment.infos.Follower,
            postId: transformedComment.infos.postId,
            Creator: transformedComment.infos.Creator,
          };
          console.log('Missed notifications Cleared');
          const updatedNotifs = this.missedNotifs.filter(
            (post) => post.Creator !== userId
          );
          this.missedNotifs = updatedNotifs;
          this.missedNotifsUpdated.next([...this.missedNotifs]);
          sub.unsubscribe();
          console.log('love you 6');
        },
      });
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Subject, ReplaySubject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CommentInterface } from '../reusable-card/reusable-card.component';

@Injectable()
export class CommentsService {
  private messages: CommentInterface[] = [];
  private commentsUpdated = new ReplaySubject<CommentInterface[]>();

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  private authStatusListener = new Subject<boolean>();
  getAuthStatusListener(): any {
    return this.authStatusListener.asObservable();
  }
  getMessagesUpdateListener(): any {
    return this.commentsUpdated.asObservable();
  }
  getComments(postId): any {
    this.http
      .get<{ message: string; messages: any }>(
        'http://localhost:3000/api/posts/comments',
        { params: { postId } }
      )
      .pipe(
        map((messageData) => {
          return messageData.messages.map((comment) => {
            return {
              id: comment._id,
              body: comment.body,
              username: comment.username,
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

  createComment(
    body: string,
    userId: string,
    postId: string

    // parentId: null | string
  ): any {
    const message = {
      body,
      userId,
      postId,
    };
    this.http
      .post<{ message: string; messages: CommentInterface }>(
        'http://localhost:3000/api/posts/comments',
        message
      )
      .subscribe({
        next: (responseData) => {
          const message: CommentInterface = {
            id: responseData.messages.id,
            body,
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
      .delete('http://localhost:3000/api/posts/comments/' + commentId)
      .subscribe(() => {
        const updatedPosts = this.messages.filter(
          (post) => post.id !== commentId
        );
        this.messages = updatedPosts;
        this.commentsUpdated.next([...this.messages]);
      });
  }
}

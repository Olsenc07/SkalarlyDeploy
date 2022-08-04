import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject, ReplaySubject } from 'rxjs';

import { CommentInterface } from '../reusable-card/reusable-card.component';

@Injectable()
export class CommentsService {
  private comments: CommentInterface[] = [];
  private commentsUpdated = new ReplaySubject<CommentInterface[]>();

  constructor(private http: HttpClient) {}

  private authStatusListener = new Subject<boolean>();
  getAuthStatusListener(): any {
    return this.authStatusListener.asObservable();
  }
  getComments(): Observable<CommentInterface[]> {
    return this.http.get<CommentInterface[]>(
      'http://localhost:3000/api/posts/comments'
    );
  }

  createComment(
    body: string
    // username: string,
    // userId: string
    // parentId: null | string
  ): any {
    const message = {
      body,
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
            // username,
            // userId
          };
          this.comments.push(message);
          this.commentsUpdated.next([...this.comments]);
        },
      });
  }
}

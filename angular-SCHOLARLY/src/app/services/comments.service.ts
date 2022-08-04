import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommentInterface } from '../reusable-card/reusable-card.component';

@Injectable()
export class CommentsService {
  constructor(private httpClient: HttpClient) {}

  getComments(): Observable<CommentInterface[]> {
    return this.httpClient.get<CommentInterface[]>(
      'http://localhost:3000/api/posts/comments'
    );
  }

  createComment(
    text: string,
    parentId: null | string
  ): Observable<CommentInterface> {
    return this.httpClient.post<CommentInterface>(
      'http://localhost:3000/api/posts/comments',
      {
        body: text,
        parentId,
        // Should not be set here
        createdAt: new Date().toISOString(),
      }
    );
  }
}

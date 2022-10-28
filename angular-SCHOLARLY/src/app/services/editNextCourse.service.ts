import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthDataInfo } from '../signup/auth-data.model';
import { ReplaySubject } from 'rxjs';

import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class AuthServiceEditNext {
  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  private infosUpdated = new ReplaySubject<AuthDataInfo[]>();
  private authStatusListener = new ReplaySubject<boolean>();
  private infos: AuthDataInfo[] = [];

  // Next
  editUserNext(userId: string, CodePursuing: string): any {
    this.http
      .patch<{ message: string; post: AuthDataInfo }>(
        'http://www.skalarly.com/api/user/infoNext',
        { userId, CodePursuing }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            CodePursuing,
          };

          this.infos.push(post);
          this.infosUpdated.next([...this.infos]);
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  // Next
  editUserNext2(userId: string, CodePursuing2: string): any {
    this.http
      .patch<{ message: string; post: AuthDataInfo }>(
        'http://www.skalarly.com/api/user/infoNext2',
        { userId, CodePursuing2 }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            CodePursuing2,
          };

          this.infos.push(post);
          this.infosUpdated.next([...this.infos]);
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  // Next
  editUserNext3(userId: string, CodePursuing3: string): any {
    this.http
      .patch<{ message: string; post: AuthDataInfo }>(
        'http://www.skalarly.com/api/user/infoNext3',
        { userId, CodePursuing3 }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            CodePursuing3,
          };

          this.infos.push(post);
          this.infosUpdated.next([...this.infos]);
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  // Next
  editUserNext4(userId: string, CodePursuing4: string): any {
    this.http
      .patch<{ message: string; post: AuthDataInfo }>(
        'http://www.skalarly.com/api/user/infoNext4',
        { userId, CodePursuing4 }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            CodePursuing4,
          };

          this.infos.push(post);
          this.infosUpdated.next([...this.infos]);
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  // Next
  editUserNext5(userId: string, CodePursuing5: string): any {
    this.http
      .patch<{ message: string; post: AuthDataInfo }>(
        'http://www.skalarly.com/api/user/infoNext5',
        { userId, CodePursuing5 }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            CodePursuing5,
          };

          this.infos.push(post);
          this.infosUpdated.next([...this.infos]);
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  // Next
  editUserNext6(userId: string, CodePursuing6: string): any {
    this.http
      .patch<{ message: string; post: AuthDataInfo }>(
        'http://www.skalarly.com/api/user/infoNext6',
        { userId, CodePursuing6 }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            CodePursuing6,
          };

          this.infos.push(post);
          this.infosUpdated.next([...this.infos]);
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  // Next
  editUserNext7(userId: string, CodePursuing7: string): any {
    this.http
      .patch<{ message: string; post: AuthDataInfo }>(
        'http://www.skalarly.com/api/user/infoNext7',
        { userId, CodePursuing7 }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            CodePursuing7,
          };

          this.infos.push(post);
          this.infosUpdated.next([...this.infos]);
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  // Next
  editUserNext8(userId: string, CodePursuing8: string): any {
    this.http
      .patch<{ message: string; post: AuthDataInfo }>(
        'http://www.skalarly.com/api/user/infoNext8',
        { userId, CodePursuing8 }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            CodePursuing8,
          };

          this.infos.push(post);
          this.infosUpdated.next([...this.infos]);
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  // Next
  editUserNext9(userId: string, CodePursuing9: string): any {
    this.http
      .patch<{ message: string; post: AuthDataInfo }>(
        'http://www.skalarly.com/api/user/infoNext9',
        { userId, CodePursuing9 }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            CodePursuing9,
          };

          this.infos.push(post);
          this.infosUpdated.next([...this.infos]);
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  // Next
  editUserNext10(userId: string, CodePursuing10: string): any {
    this.http
      .patch<{ message: string; post: AuthDataInfo }>(
        'http://www.skalarly.com/api/user/infoNext10',
        { userId, CodePursuing10 }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            CodePursuing10,
          };

          this.infos.push(post);
          this.infosUpdated.next([...this.infos]);
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  // Next
  editUserNext11(userId: string, CodePursuing11: string): any {
    this.http
      .patch<{ message: string; post: AuthDataInfo }>(
        'http://www.skalarly.com/api/user/infoNext11',
        { userId, CodePursuing11 }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            CodePursuing11,
          };

          this.infos.push(post);
          this.infosUpdated.next([...this.infos]);
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  // Next
  editUserNext12(userId: string, CodePursuing12: string): any {
    this.http
      .patch<{ message: string; post: AuthDataInfo }>(
        'http://www.skalarly.com/api/user/infoNext12',
        { userId, CodePursuing12 }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            CodePursuing12,
          };

          this.infos.push(post);
          this.infosUpdated.next([...this.infos]);
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  // Next
  editUserNext13(userId: string, CodePursuing13: string): any {
    this.http
      .patch<{ message: string; post: AuthDataInfo }>(
        'http://www.skalarly.com/api/user/infoNext13',
        { userId, CodePursuing13 }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            CodePursuing13,
          };

          this.infos.push(post);
          this.infosUpdated.next([...this.infos]);
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  // Next
  editUserNext14(userId: string, CodePursuing14: string): any {
    this.http
      .patch<{ message: string; post: AuthDataInfo }>(
        'http://www.skalarly.com/api/user/infoNext14',
        { userId, CodePursuing14 }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            CodePursuing14,
          };

          this.infos.push(post);
          this.infosUpdated.next([...this.infos]);
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
}

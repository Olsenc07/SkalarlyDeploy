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
    const userData = new FormData();
    userData.append('CodePursuing', CodePursuing);
    this.http
      .post<{ message: string; post: AuthDataInfo }>(
        'http://www.skalarly.com/api/user/infoNext',
        userData,
        { params: { userId } }
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
    const userData = new FormData();
    userData.append('CodePursuing2', CodePursuing2);
    this.http
      .post<{ message: string; post: AuthDataInfo }>(
        'http://www.skalarly.com/api/user/infoNext2',
        userData,
        { params: { userId } }
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
    const userData = new FormData();
    userData.append('CodePursuing3', CodePursuing3);
    this.http
      .post<{ message: string; post: AuthDataInfo }>(
        'http://www.skalarly.com/api/user/infoNext3',
        userData,
        { params: { userId } }
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
    const userData = new FormData();
    userData.append('CodePursuing4', CodePursuing4);
    this.http
      .post<{ message: string; post: AuthDataInfo }>(
        'http://www.skalarly.com/api/user/infoNext4',
        userData,
        { params: { userId } }
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
    const userData = new FormData();
    userData.append('CodePursuing5', CodePursuing5);
    this.http
      .post<{ message: string; post: AuthDataInfo }>(
        'http://www.skalarly.com/api/user/infoNext5',
        userData,
        { params: { userId } }
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
    const userData = new FormData();
    userData.append('CodePursuing6', CodePursuing6);
    this.http
      .post<{ message: string; post: AuthDataInfo }>(
        'http://www.skalarly.com/api/user/infoNext6',
        userData,
        { params: { userId } }
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
    const userData = new FormData();
    userData.append('CodePursuing7', CodePursuing7);
    this.http
      .post<{ message: string; post: AuthDataInfo }>(
        'http://www.skalarly.com/api/user/infoNext7',
        userData,
        { params: { userId } }
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
    const userData = new FormData();
    userData.append('CodePursuing8', CodePursuing8);
    this.http
      .post<{ message: string; post: AuthDataInfo }>(
        'http://www.skalarly.com/api/user/infoNext8',
        userData,
        { params: { userId } }
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
    const userData = new FormData();
    userData.append('CodePursuing9', CodePursuing9);
    this.http
      .post<{ message: string; post: AuthDataInfo }>(
        'http://www.skalarly.com/api/user/infoNext9',
        userData,
        { params: { userId } }
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
    const userData = new FormData();
    userData.append('CodePursuing10', CodePursuing10);
    this.http
      .post<{ message: string; post: AuthDataInfo }>(
        'http://www.skalarly.com/api/user/infoNext10',
        userData,
        { params: { userId } }
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
    const userData = new FormData();
    userData.append('CodePursuing11', CodePursuing11);
    this.http
      .post<{ message: string; post: AuthDataInfo }>(
        'http://www.skalarly.com/api/user/infoNext11',
        userData,
        { params: { userId } }
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
    const userData = new FormData();
    userData.append('CodePursuing12', CodePursuing12);
    this.http
      .post<{ message: string; post: AuthDataInfo }>(
        'http://www.skalarly.com/api/user/infoNext12',
        userData,
        { params: { userId } }
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
    const userData = new FormData();
    userData.append('CodePursuing13', CodePursuing13);
    this.http
      .post<{ message: string; post: AuthDataInfo }>(
        'http://www.skalarly.com/api/user/infoNext13',
        userData,
        { params: { userId } }
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
    const userData = new FormData();
    userData.append('CodePursuing14', CodePursuing14);
    this.http
      .post<{ message: string; post: AuthDataInfo }>(
        'http://www.skalarly.com/api/user/infoNext14',
        userData,
        { params: { userId } }
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

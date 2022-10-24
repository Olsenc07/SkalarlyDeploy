import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthDataInfo } from '../signup/auth-data.model';
import { ReplaySubject } from 'rxjs';

import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class AuthServiceEditCourse {
  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  private infosUpdated = new ReplaySubject<AuthDataInfo[]>();
  private authStatusListener = new ReplaySubject<boolean>();
  private infos: AuthDataInfo[] = [];

  // Completed
  editUserCourse(userId: string, CodeCompleted: string): any {
    const userData = new FormData();
    userData.append('CodeCompleted', CodeCompleted);
    this.http
      .post<{ message: string; post: AuthDataInfo }>(
        'http://www.skalarly.com/api/user/infoCourse',
        userData,
        { params: { userId } }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            CodeCompleted,
          };

          this.infos.push(post);
          this.infosUpdated.next([...this.infos]);
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  // Completed2
  editUserCourse2(userId: string, CodeCompleted2: string): any {
    const userData = new FormData();
    userData.append('CodeCompleted2', CodeCompleted2);
    this.http
      .post<{ message: string; post: AuthDataInfo }>(
        'http://www.skalarly.com/api/user/infoCourse2',
        userData,
        { params: { userId } }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            CodeCompleted2,
          };

          this.infos.push(post);
          this.infosUpdated.next([...this.infos]);
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  // Completed3
  editUserCourse3(userId: string, CodeCompleted3: string): any {
    const userData = new FormData();
    userData.append('CodeCompleted3', CodeCompleted3);
    this.http
      .post<{ message: string; post: AuthDataInfo }>(
        'http://www.skalarly.com/api/user/infoCourse3',
        userData,
        { params: { userId } }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            CodeCompleted3,
          };

          this.infos.push(post);
          this.infosUpdated.next([...this.infos]);
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  // Completed4
  editUserCourse4(userId: string, CodeCompleted4: string): any {
    const userData = new FormData();
    userData.append('CodeCompleted4', CodeCompleted4);
    this.http
      .post<{ message: string; post: AuthDataInfo }>(
        'http://www.skalarly.com/api/user/infoCourse4',
        userData,
        { params: { userId } }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            CodeCompleted4,
          };

          this.infos.push(post);
          this.infosUpdated.next([...this.infos]);
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  // Completed 5
  editUserCourse5(userId: string, CodeCompleted5: string): any {
    const userData = new FormData();
    userData.append('CodeCompleted5', CodeCompleted5);
    this.http
      .post<{ message: string; post: AuthDataInfo }>(
        'http://www.skalarly.com/api/user/infoCourse5',
        userData,
        { params: { userId } }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            CodeCompleted5,
          };

          this.infos.push(post);
          this.infosUpdated.next([...this.infos]);
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  } // Completed6
  editUserCourse6(userId: string, CodeCompleted6: string): any {
    const userData = new FormData();
    userData.append('CodeCompleted6', CodeCompleted6);
    this.http
      .post<{ message: string; post: AuthDataInfo }>(
        'http://www.skalarly.com/api/user/infoCourse6',
        userData,
        { params: { userId } }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            CodeCompleted6,
          };

          this.infos.push(post);
          this.infosUpdated.next([...this.infos]);
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  } // Completed7
  editUserCourse7(userId: string, CodeCompleted7: string): any {
    const userData = new FormData();
    userData.append('CodeCompleted7', CodeCompleted7);
    this.http
      .post<{ message: string; post: AuthDataInfo }>(
        'http://www.skalarly.com/api/user/infoCourse7',
        userData,
        { params: { userId } }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            CodeCompleted7,
          };

          this.infos.push(post);
          this.infosUpdated.next([...this.infos]);
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  // Completed8
  editUserCourse8(userId: string, CodeCompleted8: string): any {
    const userData = new FormData();
    userData.append('CodeCompleted8', CodeCompleted8);
    this.http
      .post<{ message: string; post: AuthDataInfo }>(
        'http://www.skalarly.com/api/user/infoCourse8',
        userData,
        { params: { userId } }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            CodeCompleted8,
          };

          this.infos.push(post);
          this.infosUpdated.next([...this.infos]);
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  // Completed9
  editUserCourse9(userId: string, CodeCompleted9: string): any {
    const userData = new FormData();
    userData.append('CodeCompleted9', CodeCompleted9);
    this.http
      .post<{ message: string; post: AuthDataInfo }>(
        'http://www.skalarly.com/api/user/infoCourse9',
        userData,
        { params: { userId } }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            CodeCompleted9,
          };

          this.infos.push(post);
          this.infosUpdated.next([...this.infos]);
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  // Completed10
  editUserCourse10(userId: string, CodeCompleted10: string): any {
    const userData = new FormData();
    userData.append('CodeCompleted10', CodeCompleted10);
    this.http
      .post<{ message: string; post: AuthDataInfo }>(
        'http://www.skalarly.com/api/user/infoCourse10',
        userData,
        { params: { userId } }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            CodeCompleted10,
          };

          this.infos.push(post);
          this.infosUpdated.next([...this.infos]);
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  // Completed11
  editUserCourse11(userId: string, CodeCompleted11: string): any {
    const userData = new FormData();
    userData.append('CodeCompleted11', CodeCompleted11);
    this.http
      .post<{ message: string; post: AuthDataInfo }>(
        'http://www.skalarly.com/api/user/infoCourse11',
        userData,
        { params: { userId } }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            CodeCompleted11,
          };

          this.infos.push(post);
          this.infosUpdated.next([...this.infos]);
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  // Completed12
  editUserCourse12(userId: string, CodeCompleted12: string): any {
    const userData = new FormData();
    userData.append('CodeCompleted12', CodeCompleted12);
    this.http
      .post<{ message: string; post: AuthDataInfo }>(
        'http://www.skalarly.com/api/user/infoCourse12',
        userData,
        { params: { userId } }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            CodeCompleted12,
          };

          this.infos.push(post);
          this.infosUpdated.next([...this.infos]);
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  // Completed13
  editUserCourse13(userId: string, CodeCompleted13: string): any {
    const userData = new FormData();
    userData.append('CodeCompleted13', CodeCompleted13);
    this.http
      .post<{ message: string; post: AuthDataInfo }>(
        'http://www.skalarly.com/api/user/infoCourse13',
        userData,
        { params: { userId } }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            CodeCompleted13,
          };

          this.infos.push(post);
          this.infosUpdated.next([...this.infos]);
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  // Completed14
  editUserCourse14(userId: string, CodeCompleted14: string): any {
    const userData = new FormData();
    userData.append('CodeCompleted14', CodeCompleted14);
    this.http
      .post<{ message: string; post: AuthDataInfo }>(
        'http://www.skalarly.com/api/user/infoCourse14',
        userData,
        { params: { userId } }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            CodeCompleted14,
          };

          this.infos.push(post);
          this.infosUpdated.next([...this.infos]);
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  // Completed15
  editUserCourse15(userId: string, CodeCompleted15: string): any {
    const userData = new FormData();
    userData.append('CodeCompleted15', CodeCompleted15);
    this.http
      .post<{ message: string; post: AuthDataInfo }>(
        'http://www.skalarly.com/api/user/infoCourse15',
        userData,
        { params: { userId } }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            CodeCompleted15,
          };

          this.infos.push(post);
          this.infosUpdated.next([...this.infos]);
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  // Completed16
  editUserCourse16(userId: string, CodeCompleted16: string): any {
    const userData = new FormData();
    userData.append('CodeCompleted16', CodeCompleted16);
    this.http
      .post<{ message: string; post: AuthDataInfo }>(
        'http://www.skalarly.com/api/user/infoCourse16',
        userData,
        { params: { userId } }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            CodeCompleted16,
          };

          this.infos.push(post);
          this.infosUpdated.next([...this.infos]);
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  // Completed17
  editUserCourse17(userId: string, CodeCompleted17: string): any {
    const userData = new FormData();
    userData.append('CodeCompleted17', CodeCompleted17);
    this.http
      .post<{ message: string; post: AuthDataInfo }>(
        'http://www.skalarly.com/api/user/infoCourse17',
        userData,
        { params: { userId } }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            CodeCompleted17,
          };

          this.infos.push(post);
          this.infosUpdated.next([...this.infos]);
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  // Completed18
  editUserCourse18(userId: string, CodeCompleted18: string): any {
    const userData = new FormData();
    userData.append('CodeCompleted18', CodeCompleted18);
    this.http
      .post<{ message: string; post: AuthDataInfo }>(
        'http://www.skalarly.com/api/user/infoCourse18',
        userData,
        { params: { userId } }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            CodeCompleted18,
          };

          this.infos.push(post);
          this.infosUpdated.next([...this.infos]);
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  // Completed19
  editUserCourse19(userId: string, CodeCompleted19: string): any {
    const userData = new FormData();
    userData.append('CodeCompleted19', CodeCompleted19);
    this.http
      .post<{ message: string; post: AuthDataInfo }>(
        'http://www.skalarly.com/api/user/infoCourse19',
        userData,
        { params: { userId } }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            CodeCompleted19,
          };

          this.infos.push(post);
          this.infosUpdated.next([...this.infos]);
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  // Completed20
  editUserCourse20(userId: string, CodeCompleted20: string): any {
    const userData = new FormData();
    userData.append('CodeCompleted20', CodeCompleted20);
    this.http
      .post<{ message: string; post: AuthDataInfo }>(
        'http://www.skalarly.com/api/user/infoCourse20',
        userData,
        { params: { userId } }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            CodeCompleted20,
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

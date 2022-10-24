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
  // Completed21
  editUserCourse21(userId: string, CodeCompleted21: string): any {
    const userData = new FormData();
    userData.append('CodeCompleted21', CodeCompleted21);
    this.http
      .post<{ message: string; post: AuthDataInfo }>(
        'http://www.skalarly.com/api/user/infoCourse21',
        userData,
        { params: { userId } }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            CodeCompleted21,
          };

          this.infos.push(post);
          this.infosUpdated.next([...this.infos]);
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  // Completed22
  editUserCourse22(userId: string, CodeCompleted22: string): any {
    const userData = new FormData();
    userData.append('CodeCompleted22', CodeCompleted22);
    this.http
      .post<{ message: string; post: AuthDataInfo }>(
        'http://www.skalarly.com/api/user/infoCourse22',
        userData,
        { params: { userId } }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            CodeCompleted22,
          };

          this.infos.push(post);
          this.infosUpdated.next([...this.infos]);
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  // Completed23
  editUserCourse23(userId: string, CodeCompleted23: string): any {
    const userData = new FormData();
    userData.append('CodeCompleted23', CodeCompleted23);
    this.http
      .post<{ message: string; post: AuthDataInfo }>(
        'http://www.skalarly.com/api/user/infoCourse23',
        userData,
        { params: { userId } }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            CodeCompleted23,
          };

          this.infos.push(post);
          this.infosUpdated.next([...this.infos]);
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  // Completed24
  editUserCourse24(userId: string, CodeCompleted24: string): any {
    const userData = new FormData();
    userData.append('CodeCompleted24', CodeCompleted24);
    this.http
      .post<{ message: string; post: AuthDataInfo }>(
        'http://www.skalarly.com/api/user/infoCourse24',
        userData,
        { params: { userId } }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            CodeCompleted24,
          };

          this.infos.push(post);
          this.infosUpdated.next([...this.infos]);
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  // Completed 25
  editUserCourse25(userId: string, CodeCompleted25: string): any {
    const userData = new FormData();
    userData.append('CodeCompleted25', CodeCompleted25);
    this.http
      .post<{ message: string; post: AuthDataInfo }>(
        'http://www.skalarly.com/api/user/infoCourse25',
        userData,
        { params: { userId } }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            CodeCompleted25,
          };

          this.infos.push(post);
          this.infosUpdated.next([...this.infos]);
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  } // Completed26
  editUserCourse26(userId: string, CodeCompleted26: string): any {
    const userData = new FormData();
    userData.append('CodeCompleted26', CodeCompleted26);
    this.http
      .post<{ message: string; post: AuthDataInfo }>(
        'http://www.skalarly.com/api/user/infoCourse26',
        userData,
        { params: { userId } }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            CodeCompleted26,
          };

          this.infos.push(post);
          this.infosUpdated.next([...this.infos]);
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  } // Completed27
  editUserCourse27(userId: string, CodeCompleted27: string): any {
    const userData = new FormData();
    userData.append('CodeCompleted27', CodeCompleted27);
    this.http
      .post<{ message: string; post: AuthDataInfo }>(
        'http://www.skalarly.com/api/user/infoCourse27',
        userData,
        { params: { userId } }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            CodeCompleted27,
          };

          this.infos.push(post);
          this.infosUpdated.next([...this.infos]);
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  // Completed28
  editUserCourse28(userId: string, CodeCompleted28: string): any {
    const userData = new FormData();
    userData.append('CodeCompleted28', CodeCompleted28);
    this.http
      .post<{ message: string; post: AuthDataInfo }>(
        'http://www.skalarly.com/api/user/infoCourse28',
        userData,
        { params: { userId } }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            CodeCompleted28,
          };

          this.infos.push(post);
          this.infosUpdated.next([...this.infos]);
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  // Completed29
  editUserCourse29(userId: string, CodeCompleted29: string): any {
    const userData = new FormData();
    userData.append('CodeCompleted29', CodeCompleted29);
    this.http
      .post<{ message: string; post: AuthDataInfo }>(
        'http://www.skalarly.com/api/user/infoCourse29',
        userData,
        { params: { userId } }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            CodeCompleted29,
          };

          this.infos.push(post);
          this.infosUpdated.next([...this.infos]);
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  // Completed30
  editUserCourse30(userId: string, CodeCompleted30: string): any {
    const userData = new FormData();
    userData.append('CodeCompleted30', CodeCompleted30);
    this.http
      .post<{ message: string; post: AuthDataInfo }>(
        'http://www.skalarly.com/api/user/infoCourse30',
        userData,
        { params: { userId } }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            CodeCompleted30,
          };

          this.infos.push(post);
          this.infosUpdated.next([...this.infos]);
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  // Completed31
  editUserCourse31(userId: string, CodeCompleted31: string): any {
    const userData = new FormData();
    userData.append('CodeCompleted31', CodeCompleted31);
    this.http
      .post<{ message: string; post: AuthDataInfo }>(
        'http://www.skalarly.com/api/user/infoCourse31',
        userData,
        { params: { userId } }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            CodeCompleted31,
          };

          this.infos.push(post);
          this.infosUpdated.next([...this.infos]);
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  // Completed32
  editUserCourse32(userId: string, CodeCompleted32: string): any {
    const userData = new FormData();
    userData.append('CodeCompleted32', CodeCompleted32);
    this.http
      .post<{ message: string; post: AuthDataInfo }>(
        'http://www.skalarly.com/api/user/infoCourse32',
        userData,
        { params: { userId } }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            CodeCompleted32,
          };

          this.infos.push(post);
          this.infosUpdated.next([...this.infos]);
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  // Completed33
  editUserCourse33(userId: string, CodeCompleted33: string): any {
    const userData = new FormData();
    userData.append('CodeCompleted33', CodeCompleted33);
    this.http
      .post<{ message: string; post: AuthDataInfo }>(
        'http://www.skalarly.com/api/user/infoCourse33',
        userData,
        { params: { userId } }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            CodeCompleted33,
          };

          this.infos.push(post);
          this.infosUpdated.next([...this.infos]);
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  // Completed34
  editUserCourse34(userId: string, CodeCompleted34: string): any {
    const userData = new FormData();
    userData.append('CodeCompleted34', CodeCompleted34);
    this.http
      .post<{ message: string; post: AuthDataInfo }>(
        'http://www.skalarly.com/api/user/infoCourse34',
        userData,
        { params: { userId } }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            CodeCompleted34,
          };

          this.infos.push(post);
          this.infosUpdated.next([...this.infos]);
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  // Completed35
  editUserCourse35(userId: string, CodeCompleted35: string): any {
    const userData = new FormData();
    userData.append('CodeCompleted35', CodeCompleted35);
    this.http
      .post<{ message: string; post: AuthDataInfo }>(
        'http://www.skalarly.com/api/user/infoCourse35',
        userData,
        { params: { userId } }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            CodeCompleted35,
          };

          this.infos.push(post);
          this.infosUpdated.next([...this.infos]);
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  // Completed36
  editUserCourse36(userId: string, CodeCompleted36: string): any {
    const userData = new FormData();
    userData.append('CodeCompleted36', CodeCompleted36);
    this.http
      .post<{ message: string; post: AuthDataInfo }>(
        'http://www.skalarly.com/api/user/infoCourse36',
        userData,
        { params: { userId } }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            CodeCompleted36,
          };

          this.infos.push(post);
          this.infosUpdated.next([...this.infos]);
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  // Completed37
  editUserCourse37(userId: string, CodeCompleted37: string): any {
    const userData = new FormData();
    userData.append('CodeCompleted37', CodeCompleted37);
    this.http
      .post<{ message: string; post: AuthDataInfo }>(
        'http://www.skalarly.com/api/user/infoCourse37',
        userData,
        { params: { userId } }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            CodeCompleted37,
          };

          this.infos.push(post);
          this.infosUpdated.next([...this.infos]);
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  // Completed38
  editUserCourse38(userId: string, CodeCompleted38: string): any {
    const userData = new FormData();
    userData.append('CodeCompleted38', CodeCompleted38);
    this.http
      .post<{ message: string; post: AuthDataInfo }>(
        'http://www.skalarly.com/api/user/infoCourse38',
        userData,
        { params: { userId } }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            CodeCompleted38,
          };

          this.infos.push(post);
          this.infosUpdated.next([...this.infos]);
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  // Completed39
  editUserCourse39(userId: string, CodeCompleted39: string): any {
    const userData = new FormData();
    userData.append('CodeCompleted39', CodeCompleted39);
    this.http
      .post<{ message: string; post: AuthDataInfo }>(
        'http://www.skalarly.com/api/user/infoCourse39',
        userData,
        { params: { userId } }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            CodeCompleted39,
          };

          this.infos.push(post);
          this.infosUpdated.next([...this.infos]);
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  // Completed40
  editUserCourse40(userId: string, CodeCompleted40: string): any {
    const userData = new FormData();
    userData.append('CodeCompleted40', CodeCompleted40);
    this.http
      .post<{ message: string; post: AuthDataInfo }>(
        'http://www.skalarly.com/api/user/infoCourse40',
        userData,
        { params: { userId } }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            CodeCompleted40,
          };

          this.infos.push(post);
          this.infosUpdated.next([...this.infos]);
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  // CompletedX
  editUserCourseX(userId: string, CodeCompletedX: string): any {
    const userData = new FormData();
    userData.append('CodeCompletedX', CodeCompletedX);
    this.http
      .post<{ message: string; post: AuthDataInfo }>(
        'http://www.skalarly.com/api/user/infoCourseX',
        userData,
        { params: { userId } }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            CodeCompletedX,
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

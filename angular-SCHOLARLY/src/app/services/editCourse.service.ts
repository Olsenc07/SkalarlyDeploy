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
    const sub = this.http
      .patch<{ message: string; post: AuthDataInfo }>(
        'https://www.skalarly.com/api/user/infoCourse',
        { userId, CodeCompleted }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            CodeCompleted,
          };

          this.infos.push(post);
          this.infosUpdated.next([...this.infos]);
          sub.unsubscribe();
          console.log('love you 1');
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  // Completed2
  editUserCourse2(userId: string, CodeCompleted2: string): any {
    const sub = this.http
      .patch<{ message: string; post: AuthDataInfo }>(
        'https://www.skalarly.com/api/user/infoCourse2',
        { userId, CodeCompleted2 }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            CodeCompleted2,
          };

          this.infos.push(post);
          this.infosUpdated.next([...this.infos]);
          sub.unsubscribe();
          console.log('love you 2');
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  // Completed3
  editUserCourse3(userId: string, CodeCompleted3: string): any {
    const sub = this.http
      .patch<{ message: string; post: AuthDataInfo }>(
        'https://www.skalarly.com/api/user/infoCourse3',
        { userId, CodeCompleted3 }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            CodeCompleted3,
          };

          this.infos.push(post);
          this.infosUpdated.next([...this.infos]);
          sub.unsubscribe();
          console.log('love you 3');
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  // Completed4
  editUserCourse4(userId: string, CodeCompleted4: string): any {
    const sub = this.http
      .patch<{ message: string; post: AuthDataInfo }>(
        'https://www.skalarly.com/api/user/infoCourse4',
        { userId, CodeCompleted4 }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            CodeCompleted4,
          };

          this.infos.push(post);
          this.infosUpdated.next([...this.infos]);
          sub.unsubscribe();
          console.log('love you 4');
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  // Completed 5
  editUserCourse5(userId: string, CodeCompleted5: string): any {
    const sub = this.http
      .patch<{ message: string; post: AuthDataInfo }>(
        'https://www.skalarly.com/api/user/infoCourse5',
        { userId, CodeCompleted5 }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            CodeCompleted5,
          };

          this.infos.push(post);
          this.infosUpdated.next([...this.infos]);
          sub.unsubscribe();
          console.log('love you 5');
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  } // Completed6
  editUserCourse6(userId: string, CodeCompleted6: string): any {
    const sub = this.http
      .patch<{ message: string; post: AuthDataInfo }>(
        'https://www.skalarly.com/api/user/infoCourse6',
        { userId, CodeCompleted6 }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            CodeCompleted6,
          };

          this.infos.push(post);
          this.infosUpdated.next([...this.infos]);
          sub.unsubscribe();
          console.log('love you 6');
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  } // Completed7
  editUserCourse7(userId: string, CodeCompleted7: string): any {
    const sub = this.http
      .patch<{ message: string; post: AuthDataInfo }>(
        'https://www.skalarly.com/api/user/infoCourse7',
        { userId, CodeCompleted7 }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            CodeCompleted7,
          };

          this.infos.push(post);
          this.infosUpdated.next([...this.infos]);
          sub.unsubscribe();
          console.log('love you 7');
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  // Completed8
  editUserCourse8(userId: string, CodeCompleted8: string): any {
    const sub = this.http
      .patch<{ message: string; post: AuthDataInfo }>(
        'https://www.skalarly.com/api/user/infoCourse8',
        { userId, CodeCompleted8 }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            CodeCompleted8,
          };

          this.infos.push(post);
          this.infosUpdated.next([...this.infos]);
          sub.unsubscribe();
          console.log('love you 8');
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  // Completed9
  editUserCourse9(userId: string, CodeCompleted9: string): any {
    const sub = this.http
      .patch<{ message: string; post: AuthDataInfo }>(
        'https://www.skalarly.com/api/user/infoCourse9',
        { userId, CodeCompleted9 }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            CodeCompleted9,
          };

          this.infos.push(post);
          this.infosUpdated.next([...this.infos]);
          sub.unsubscribe();
          console.log('love you 9');
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  // Completed10
  editUserCourse10(userId: string, CodeCompleted10: string): any {
    const sub = this.http
      .patch<{ message: string; post: AuthDataInfo }>(
        'https://www.skalarly.com/api/user/infoCourse10',
        { userId, CodeCompleted10 }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            CodeCompleted10,
          };

          this.infos.push(post);
          this.infosUpdated.next([...this.infos]);
          sub.unsubscribe();
          console.log('love you 10');
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  // Completed11
  editUserCourse11(userId: string, CodeCompleted11: string): any {
    const sub = this.http
      .patch<{ message: string; post: AuthDataInfo }>(
        'https://www.skalarly.com/api/user/infoCourse11',
        { userId, CodeCompleted11 }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            CodeCompleted11,
          };

          this.infos.push(post);
          this.infosUpdated.next([...this.infos]);
          sub.unsubscribe();
          console.log('love you 11');
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  // Completed12
  editUserCourse12(userId: string, CodeCompleted12: string): any {
    const sub = this.http
      .patch<{ message: string; post: AuthDataInfo }>(
        'https://www.skalarly.com/api/user/infoCourse12',
        { userId, CodeCompleted12 }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            CodeCompleted12,
          };

          this.infos.push(post);
          this.infosUpdated.next([...this.infos]);
          sub.unsubscribe();
          console.log('love you 12');
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  // Completed13
  editUserCourse13(userId: string, CodeCompleted13: string): any {
    const sub = this.http
      .patch<{ message: string; post: AuthDataInfo }>(
        'https://www.skalarly.com/api/user/infoCourse13',
        { userId, CodeCompleted13 }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            CodeCompleted13,
          };

          this.infos.push(post);
          this.infosUpdated.next([...this.infos]);
          sub.unsubscribe();
          console.log('love you 13');
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  // Completed14
  editUserCourse14(userId: string, CodeCompleted14: string): any {
    const sub = this.http
      .patch<{ message: string; post: AuthDataInfo }>(
        'https://www.skalarly.com/api/user/infoCourse14',
        { userId, CodeCompleted14 }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            CodeCompleted14,
          };

          this.infos.push(post);
          this.infosUpdated.next([...this.infos]);
          sub.unsubscribe();
          console.log('love you 14');
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  // Completed15
  editUserCourse15(userId: string, CodeCompleted15: string): any {
    const sub = this.http
      .patch<{ message: string; post: AuthDataInfo }>(
        'https://www.skalarly.com/api/user/infoCourse15',
        { userId, CodeCompleted15 }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            CodeCompleted15,
          };

          this.infos.push(post);
          this.infosUpdated.next([...this.infos]);
          sub.unsubscribe();
          console.log('love you 15');
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  // Completed16
  editUserCourse16(userId: string, CodeCompleted16: string): any {
    const sub = this.http
      .patch<{ message: string; post: AuthDataInfo }>(
        'https://www.skalarly.com/api/user/infoCourse16',
        { userId, CodeCompleted16 }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            CodeCompleted16,
          };

          this.infos.push(post);
          this.infosUpdated.next([...this.infos]);
          sub.unsubscribe();
          console.log('love you 16');
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  // Completed17
  editUserCourse17(userId: string, CodeCompleted17: string): any {
    const sub = this.http
      .patch<{ message: string; post: AuthDataInfo }>(
        'https://www.skalarly.com/api/user/infoCourse17',
        { userId, CodeCompleted17 }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            CodeCompleted17,
          };

          this.infos.push(post);
          this.infosUpdated.next([...this.infos]);
          sub.unsubscribe();
          console.log('love you 18');
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  // Completed18
  editUserCourse18(userId: string, CodeCompleted18: string): any {
    const sub = this.http
      .patch<{ message: string; post: AuthDataInfo }>(
        'https://www.skalarly.com/api/user/infoCourse18',
        { userId, CodeCompleted18 }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            CodeCompleted18,
          };

          this.infos.push(post);
          this.infosUpdated.next([...this.infos]);
          sub.unsubscribe();
          console.log('love you 19');
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  // Completed19
  editUserCourse19(userId: string, CodeCompleted19: string): any {
    const sub = this.http
      .patch<{ message: string; post: AuthDataInfo }>(
        'https://www.skalarly.com/api/user/infoCourse19',
        { userId, CodeCompleted19 }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            CodeCompleted19,
          };

          this.infos.push(post);
          this.infosUpdated.next([...this.infos]);
          sub.unsubscribe();
          console.log('love you 20');
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  // Completed20
  editUserCourse20(userId: string, CodeCompleted20: string): any {
    const sub = this.http
      .patch<{ message: string; post: AuthDataInfo }>(
        'https://www.skalarly.com/api/user/infoCourse20',
        { userId, CodeCompleted20 }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            CodeCompleted20,
          };

          this.infos.push(post);
          this.infosUpdated.next([...this.infos]);
          sub.unsubscribe();
          console.log('love you 21');
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  // Completed21
  editUserCourse21(userId: string, CodeCompleted21: string): any {
    const sub = this.http
      .patch<{ message: string; post: AuthDataInfo }>(
        'https://www.skalarly.com/api/user/infoCourse21',
        { userId, CodeCompleted21 }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            CodeCompleted21,
          };

          this.infos.push(post);
          this.infosUpdated.next([...this.infos]);
          sub.unsubscribe();
          console.log('love you 22');
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  // Completed22
  editUserCourse22(userId: string, CodeCompleted22: string): any {
    const sub = this.http
      .patch<{ message: string; post: AuthDataInfo }>(
        'https://www.skalarly.com/api/user/infoCourse22',
        { userId, CodeCompleted22 }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            CodeCompleted22,
          };

          this.infos.push(post);
          this.infosUpdated.next([...this.infos]);
          sub.unsubscribe();
          console.log('love you 23');
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  // Completed23
  editUserCourse23(userId: string, CodeCompleted23: string): any {
    const sub = this.http
      .patch<{ message: string; post: AuthDataInfo }>(
        'https://www.skalarly.com/api/user/infoCourse23',
        { userId, CodeCompleted23 }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            CodeCompleted23,
          };

          this.infos.push(post);
          this.infosUpdated.next([...this.infos]);
          sub.unsubscribe();
          console.log('love you 24');
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  // Completed24
  editUserCourse24(userId: string, CodeCompleted24: string): any {
    const sub = this.http
      .patch<{ message: string; post: AuthDataInfo }>(
        'https://www.skalarly.com/api/user/infoCourse24',
        { userId, CodeCompleted24 }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            CodeCompleted24,
          };

          this.infos.push(post);
          this.infosUpdated.next([...this.infos]);
          sub.unsubscribe();
          console.log('love you 25');
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
    const sub = this.http
      .patch<{ message: string; post: AuthDataInfo }>(
        'https://www.skalarly.com/api/user/infoCourse25',
        { userId, CodeCompleted25 }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            CodeCompleted25,
          };

          this.infos.push(post);
          this.infosUpdated.next([...this.infos]);
          sub.unsubscribe();
          console.log('love you 26');
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  } // Completed26
  editUserCourse26(userId: string, CodeCompleted26: string): any {
    const sub = this.http
      .patch<{ message: string; post: AuthDataInfo }>(
        'https://www.skalarly.com/api/user/infoCourse26',
        { userId, CodeCompleted26 }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            CodeCompleted26,
          };

          this.infos.push(post);
          this.infosUpdated.next([...this.infos]);
          sub.unsubscribe();
          console.log('love you 27');
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  } // Completed27
  editUserCourse27(userId: string, CodeCompleted27: string): any {
    const sub = this.http
      .patch<{ message: string; post: AuthDataInfo }>(
        'https://www.skalarly.com/api/user/infoCourse27',
        { userId, CodeCompleted27 }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            CodeCompleted27,
          };

          this.infos.push(post);
          this.infosUpdated.next([...this.infos]);
          sub.unsubscribe();
          console.log('love you 28');
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  // Completed28
  editUserCourse28(userId: string, CodeCompleted28: string): any {
    const sub = this.http
      .patch<{ message: string; post: AuthDataInfo }>(
        'https://www.skalarly.com/api/user/infoCourse28',
        { userId, CodeCompleted28 }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            CodeCompleted28,
          };

          this.infos.push(post);
          this.infosUpdated.next([...this.infos]);
          sub.unsubscribe();
          console.log('love you 29');
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  // Completed29
  editUserCourse29(userId: string, CodeCompleted29: string): any {
    const sub = this.http
      .patch<{ message: string; post: AuthDataInfo }>(
        'https://www.skalarly.com/api/user/infoCourse29',
        { userId, CodeCompleted29 }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            CodeCompleted29,
          };

          this.infos.push(post);
          this.infosUpdated.next([...this.infos]);
          sub.unsubscribe();
          console.log('love you 30');
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  // Completed30
  editUserCourse30(userId: string, CodeCompleted30: string): any {
    const sub = this.http
      .patch<{ message: string; post: AuthDataInfo }>(
        'https://www.skalarly.com/api/user/infoCourse30',
        { userId, CodeCompleted30 }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            CodeCompleted30,
          };

          this.infos.push(post);
          this.infosUpdated.next([...this.infos]);
          sub.unsubscribe();
          console.log('love you 31');
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  // Completed31
  editUserCourse31(userId: string, CodeCompleted31: string): any {
    const sub = this.http
      .patch<{ message: string; post: AuthDataInfo }>(
        'https://www.skalarly.com/api/user/infoCourse31',
        { userId, CodeCompleted31 }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            CodeCompleted31,
          };

          this.infos.push(post);
          this.infosUpdated.next([...this.infos]);
          sub.unsubscribe();
          console.log('love you 32');
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  // Completed32
  editUserCourse32(userId: string, CodeCompleted32: string): any {
    const sub = this.http
      .patch<{ message: string; post: AuthDataInfo }>(
        'https://www.skalarly.com/api/user/infoCourse32',
        { userId, CodeCompleted32 }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            CodeCompleted32,
          };

          this.infos.push(post);
          this.infosUpdated.next([...this.infos]);
          sub.unsubscribe();
          console.log('love you 33');
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  // Completed33
  editUserCourse33(userId: string, CodeCompleted33: string): any {
    const sub = this.http
      .patch<{ message: string; post: AuthDataInfo }>(
        'https://www.skalarly.com/api/user/infoCourse33',
        { userId, CodeCompleted33 }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            CodeCompleted33,
          };

          this.infos.push(post);
          this.infosUpdated.next([...this.infos]);
          sub.unsubscribe();
          console.log('love you 34');
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  // Completed34
  editUserCourse34(userId: string, CodeCompleted34: string): any {
    const sub = this.http
      .patch<{ message: string; post: AuthDataInfo }>(
        'https://www.skalarly.com/api/user/infoCourse34',
        { userId, CodeCompleted34 }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            CodeCompleted34,
          };

          this.infos.push(post);
          this.infosUpdated.next([...this.infos]);
          sub.unsubscribe();
          console.log('love you 35');
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  // Completed35
  editUserCourse35(userId: string, CodeCompleted35: string): any {
    const sub = this.http
      .patch<{ message: string; post: AuthDataInfo }>(
        'https://www.skalarly.com/api/user/infoCourse35',
        { userId, CodeCompleted35 }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            CodeCompleted35,
          };

          this.infos.push(post);
          this.infosUpdated.next([...this.infos]);
          sub.unsubscribe();
          console.log('love you 36');
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  // Completed36
  editUserCourse36(userId: string, CodeCompleted36: string): any {
    const sub = this.http
      .patch<{ message: string; post: AuthDataInfo }>(
        'https://www.skalarly.com/api/user/infoCourse36',
        { userId, CodeCompleted36 }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            CodeCompleted36,
          };

          this.infos.push(post);
          this.infosUpdated.next([...this.infos]);
          sub.unsubscribe();
          console.log('love you 37');
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  // Completed37
  editUserCourse37(userId: string, CodeCompleted37: string): any {
    const sub = this.http
      .patch<{ message: string; post: AuthDataInfo }>(
        'https://www.skalarly.com/api/user/infoCourse37',
        { userId, CodeCompleted37 }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            CodeCompleted37,
          };

          this.infos.push(post);
          this.infosUpdated.next([...this.infos]);
          sub.unsubscribe();
          console.log('love you 38');
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });

  }
  // Completed38
  editUserCourse38(userId: string, CodeCompleted38: string): any {
    const sub = this.http
      .patch<{ message: string; post: AuthDataInfo }>(
        'https://www.skalarly.com/api/user/infoCourse38',
        { userId, CodeCompleted38 }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            CodeCompleted38,
          };

          this.infos.push(post);
          this.infosUpdated.next([...this.infos]);
          sub.unsubscribe();
          console.log('love you 39');
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });

  }
  // Completed39
  editUserCourse39(userId: string, CodeCompleted39: string): any {
    const sub = this.http
      .patch<{ message: string; post: AuthDataInfo }>(
        'https://www.skalarly.com/api/user/infoCourse39',
        { userId, CodeCompleted39 }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            CodeCompleted39,
          };

          this.infos.push(post);
          this.infosUpdated.next([...this.infos]);
          sub.unsubscribe();
          console.log('love you 40');
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });

  }
  // Completed40
  editUserCourse40(userId: string, CodeCompleted40: string): any {
    const sub = this.http
      .patch<{ message: string; post: AuthDataInfo }>(
        'https://www.skalarly.com/api/user/infoCourse40',
        { userId, CodeCompleted40 }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            CodeCompleted40,
          };

          this.infos.push(post);
          this.infosUpdated.next([...this.infos]);
          sub.unsubscribe();
          console.log('love you 41');
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });

  }
  // CompletedX
  editUserCourseX(userId: string, CodeCompletedX: string): any {
    const sub = this.http
      .patch<{ message: string; post: AuthDataInfo }>(
        'https://www.skalarly.com/api/user/infoCourseX',
        { userId, CodeCompletedX }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            CodeCompletedX,
          };

          this.infos.push(post);
          this.infosUpdated.next([...this.infos]);
          sub.unsubscribe();
          console.log('love you 42');
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });

  }
}

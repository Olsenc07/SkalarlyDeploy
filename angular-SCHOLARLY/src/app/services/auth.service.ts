import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData, AuthDataInfo } from '../signup/auth-data.model';
import { Subject, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}
  private isAuthenticated = false;
  private token: string;
  private tokenTimer: any;
  private userId: string;
  private postId: string;

  private authStatusListener = new ReplaySubject<boolean>();

  private infos: AuthDataInfo[] = [];
  private infosUpdated = new ReplaySubject<AuthDataInfo[]>();

  getToken(): string {
    return this.token;
  }

  getIsAuth(): boolean {
    return this.isAuthenticated;
  }
  getUserId(): string {
    return this.userId;
  }
  getPostId(): string {
    return this.postId;
  }

  getAuthStatusListener(): any {
    return this.authStatusListener.asObservable();
  }
  getInfoUpdateListener(): any {
    return this.infosUpdated.asObservable();
  }
  // User and their info
  createUser(email: string, username: string, password: string): any {
    const authData: AuthData = { email, username, password };
    this.http
      .post<{ message: string; result: AuthDataInfo }>(
        'http://www.skalarly.com/api/user/signup',
        authData
      )
      .subscribe({
        next: () => {
          this.snackBar.open(
            'Check your email and junk mail to verify your account before logining in. This may take a minute.',
            'Will do!'
          );
        },
        error: (error) => {
          this.authStatusListener.next(false);
          const snackBarRef = this.snackBar.open(
            'Email or Username is already taken',
            'Retry!!',
            {
              duration: 3000,
            }
          );
        },
      });
  }

  // Create userinfo
  createUserInfo(
    username: string,
    name: string,
    bio: string,
    gender: string,
    birthday: string,
    major: string,
    minor: string,
    sport: string,
    club: string,
    pronoun: string,
    CodeCompleted: string,
    CodeCompleted2: string,
    CodeCompleted3: string,
    CodeCompleted4: string,
    CodeCompleted5: string,
    CodeCompleted6: string,
    CodeCompleted7: string,
    CodeCompleted8: string,
    CodeCompleted9: string,
    CodeCompleted10: string,
    CodeCompleted11: string,
    CodeCompleted12: string,
    CodeCompleted13: string,
    CodeCompleted14: string,
    CodeCompleted15: string,
    CodeCompleted16: string,
    CodeCompleted17: string,
    CodeCompleted18: string,
    CodeCompleted19: string,
    CodeCompleted20: string,
    CodeCompleted21: string,
    CodeCompleted22: string,
    CodeCompleted23: string,
    CodeCompleted24: string,
    CodeCompleted25: string,
    CodeCompleted26: string,
    CodeCompleted27: string,
    CodeCompleted28: string,
    CodeCompleted29: string,
    CodeCompleted30: string,
    CodeCompleted31: string,
    CodeCompleted32: string,
    CodeCompleted33: string,
    CodeCompleted34: string,
    CodeCompleted35: string,
    CodeCompleted36: string,
    CodeCompleted37: string,
    CodeCompleted38: string,
    CodeCompleted39: string,
    CodeCompleted40: string,
    CodeCompletedX: string,

    CodePursuing: string,
    CodePursuing2: string,
    CodePursuing3: string,
    CodePursuing4: string,
    CodePursuing5: string,
    CodePursuing6: string,
    CodePursuing7: string,
    CodePursuing8: string,
    CodePursuing9: string,
    CodePursuing10: string,
    CodePursuing11: string,
    CodePursuing12: string,
    CodePursuing13: string,
    CodePursuing14: string,
    profilePic: File,
    Creator?: string
  ): any {
    console.log('unicorns exist 2');
    const userData = new FormData();
    userData.append('username', username);
    userData.append('name', name);
    userData.append('bio', bio);
    userData.append('gender', gender);
    userData.append('birthday', birthday);
    userData.append('major', major);
    userData.append('minor', minor);
    userData.append('sport', sport);
    userData.append('club', club);
    userData.append('pronoun', pronoun);
    userData.append('CodeCompleted', CodeCompleted);
    userData.append('CodeCompleted2', CodeCompleted2);
    userData.append('CodeCompleted3', CodeCompleted3);
    userData.append('CodeCompleted4', CodeCompleted4);
    userData.append('CodeCompleted5', CodeCompleted5);
    userData.append('CodeCompleted6', CodeCompleted6);
    userData.append('CodeCompleted7', CodeCompleted7);
    userData.append('CodeCompleted8', CodeCompleted8);
    userData.append('CodeCompleted9', CodeCompleted9);
    userData.append('CodeCompleted10', CodeCompleted10);
    userData.append('CodeCompleted11', CodeCompleted11);
    userData.append('CodeCompleted12', CodeCompleted12);
    userData.append('CodeCompleted13', CodeCompleted13);
    userData.append('CodeCompleted14', CodeCompleted14);
    userData.append('CodeCompleted15', CodeCompleted15);
    userData.append('CodeCompleted16', CodeCompleted16);
    userData.append('CodeCompleted17', CodeCompleted17);
    userData.append('CodeCompleted18', CodeCompleted18);
    userData.append('CodeCompleted19', CodeCompleted19);
    userData.append('CodeCompleted20', CodeCompleted20);
    userData.append('CodeCompleted21', CodeCompleted21);
    userData.append('CodeCompleted22', CodeCompleted22);
    userData.append('CodeCompleted23', CodeCompleted23);
    userData.append('CodeCompleted24', CodeCompleted24);
    userData.append('CodeCompleted25', CodeCompleted25);
    userData.append('CodeCompleted26', CodeCompleted26);
    userData.append('CodeCompleted27', CodeCompleted27);
    userData.append('CodeCompleted28', CodeCompleted28);
    userData.append('CodeCompleted29', CodeCompleted29);
    userData.append('CodeCompleted30', CodeCompleted30);
    userData.append('CodeCompleted31', CodeCompleted31);
    userData.append('CodeCompleted32', CodeCompleted32);
    userData.append('CodeCompleted33', CodeCompleted33);
    userData.append('CodeCompleted34', CodeCompleted34);
    userData.append('CodeCompleted35', CodeCompleted35);
    userData.append('CodeCompleted36', CodeCompleted36);
    userData.append('CodeCompleted37', CodeCompleted37);
    userData.append('CodeCompleted38', CodeCompleted38);
    userData.append('CodeCompleted39', CodeCompleted39);
    userData.append('CodeCompleted40', CodeCompleted40);
    userData.append('CodeCompletedX', CodeCompleted40);

    userData.append('CodePursuing', CodePursuing);
    userData.append('CodePursuing2', CodePursuing2);
    userData.append('CodePursuing3', CodePursuing3);
    userData.append('CodePursuing4', CodePursuing4);
    userData.append('CodePursuing5', CodePursuing5);
    userData.append('CodePursuing6', CodePursuing6);
    userData.append('CodePursuing7', CodePursuing7);
    userData.append('CodePursuing8', CodePursuing8);
    userData.append('CodePursuing9', CodePursuing9);
    userData.append('CodePursuing10', CodePursuing10);
    userData.append('CodePursuing11', CodePursuing11);
    userData.append('CodePursuing12', CodePursuing12);
    userData.append('CodePursuing13', CodePursuing13);
    userData.append('CodePursuing14', CodePursuing14);
    userData.append('profilePic', profilePic);
    userData.append('Creator', Creator);
    this.http
      .post<{ message: string; post: AuthDataInfo }>(
        'http://www.skalarly.com/api/user/info',
        userData
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            username,
            name,
            bio,
            gender,
            birthday,
            major,
            minor,
            sport,
            club,
            pronoun,
            CodeCompleted,
            CodeCompleted2,
            CodeCompleted3,
            CodeCompleted4,
            CodeCompleted5,
            CodeCompleted6,
            CodeCompleted7,
            CodeCompleted8,
            CodeCompleted9,
            CodeCompleted10,
            CodeCompleted11,
            CodeCompleted12,
            CodeCompleted13,
            CodeCompleted14,
            CodeCompleted15,
            CodeCompleted16,
            CodeCompleted17,
            CodeCompleted18,
            CodeCompleted19,
            CodeCompleted20,
            CodeCompleted21,
            CodeCompleted22,
            CodeCompleted23,
            CodeCompleted24,
            CodeCompleted25,
            CodeCompleted26,
            CodeCompleted27,
            CodeCompleted28,
            CodeCompleted29,
            CodeCompleted30,
            CodeCompleted31,
            CodeCompleted32,
            CodeCompleted33,
            CodeCompleted34,
            CodeCompleted35,
            CodeCompleted36,
            CodeCompleted37,
            CodeCompleted38,
            CodeCompleted39,
            CodeCompleted40,
            CodeCompletedX,

            CodePursuing,
            CodePursuing2,
            CodePursuing3,
            CodePursuing4,
            CodePursuing5,
            CodePursuing6,
            CodePursuing7,
            CodePursuing8,
            CodePursuing9,
            CodePursuing10,
            CodePursuing11,
            CodePursuing12,
            CodePursuing13,
            CodePursuing14,
            profilePic,
            ProfilePicPath: responseData.post.ProfilePicPath,
            Creator,
          };
          this.router.navigate(['/search']);
          this.infos.push(post);
          this.infosUpdated.next([...this.infos]);
          // this.snackBar.open('Sign in with your new account', 'Will do!!');
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }

  // edit userinfo
  editUserInfo(
    userId: string,
    name: string,
    bio: string,
    gender: string,
    birthday: string,
    major: string,
    minor: string,
    sport: string,
    club: string,
    pronoun: string,
    profilePic: File
  ): any {
    const userData = new FormData();
    userData.append('name', name);
    userData.append('bio', bio);
    userData.append('gender', gender);
    userData.append('birthday', birthday);
    userData.append('major', major);
    userData.append('minor', minor);
    userData.append('sport', sport);
    userData.append('club', club);
    userData.append('pronoun', pronoun);
    userData.append('profilePic', profilePic);
    this.http
      .post<{ post: any }>(
        'http://www.skalarly.com/api/user/infoEd',
        userData,
        { params: { userId } }
      )
      .subscribe({
        next: (responseData) => {
          const post: any = {
            id: responseData.post.id,
            name,
            bio,
            gender,
            birthday,
            major,
            minor,
            sport,
            club,
            pronoun,
            ProfilePicPath: responseData.post.ProfilePicPath,
          };
          this.router.navigate(['/profile']).then(() => {
            this.snackBar.open('Profile edited!', 'Nice!', {
              duration: 3000,
            });
          });

          this.infos.push(post);
          this.infosUpdated.next([...this.infos]);
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }

  editUserInfoComp(
    userId: string,
    CodeCompleted: string,
    CodeCompleted2: string,
    CodeCompleted3: string,
    CodeCompleted4: string,
    CodeCompleted5: string
  ): any {
    console.log('she loves me', CodeCompleted);
    console.log('she loves me not ', userId);

    const userData = new FormData();
    userData.append('CodeCompleted', CodeCompleted);
    userData.append('CodeCompleted2', CodeCompleted2);
    userData.append('CodeCompleted3', CodeCompleted3);
    userData.append('CodeCompleted4', CodeCompleted4);
    userData.append('CodeCompleted5', CodeCompleted5);
    this.http
      .post<{ post: any }>(
        'http://www.skalarly.com/api/user/infoEdComp1',
        userData,
        { params: { userId } }
      )
      .subscribe({
        next: (responseData) => {
          const post: any = {
            id: responseData.post.id,
            CodeCompleted,
            CodeCompleted2,
            CodeCompleted3,
            CodeCompleted4,
            CodeCompleted5,
          };
          this.router.navigate(['/profile']);
          this.snackBar.open('Profile edited!', 'Nice!', {
            duration: 3000,
          });
          this.infos.push(post);
          this.infosUpdated.next([...this.infos]);
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  editUserInfoCompW(
    userId: string,
    CodeCompleted6: string,
    CodeCompleted7: string,
    CodeCompleted8: string,
    CodeCompleted9: string,
    CodeCompleted10: string
  ): any {
    const authDataInfo = {
      CodeCompleted6,
      CodeCompleted7,
      CodeCompleted8,
      CodeCompleted9,
      CodeCompleted10,
    };
    const userData = new FormData();
    userData.append('CodeCompleted6', CodeCompleted6);
    userData.append('CodeCompleted7', CodeCompleted7);
    userData.append('CodeCompleted8', CodeCompleted8);
    userData.append('CodeCompleted9', CodeCompleted9);
    userData.append('CodeCompleted10', CodeCompleted10);
    this.http
      .post<{ message: string; post: AuthDataInfo }>(
        'http://www.skalarly.com/api/user/infoEdComp1W',
        userData,
        { params: { userId } }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            CodeCompleted6,
            CodeCompleted7,
            CodeCompleted8,
            CodeCompleted9,
            CodeCompleted10,
          };
          this.router.navigate(['/profile']);
          this.snackBar.open('Profile edited!', 'Nice!', {
            duration: 3000,
          });
          this.infos.push(post);
          this.infosUpdated.next([...this.infos]);
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  // Edit comp 2
  editUserInfoComp2(
    userId: string,
    CodeCompleted11: string,
    CodeCompleted12: string,
    CodeCompleted13: string,
    CodeCompleted14: string,
    CodeCompleted15: string
  ): any {
    const userData = new FormData();
    userData.append('CodeCompleted11', CodeCompleted11);
    userData.append('CodeCompleted12', CodeCompleted12);
    userData.append('CodeCompleted13', CodeCompleted13);
    userData.append('CodeCompleted14', CodeCompleted14);
    userData.append('CodeCompleted15', CodeCompleted15);

    this.http
      .post<{ message: string; post: AuthDataInfo }>(
        'http://www.skalarly.com/api/user/infoEdComp2',
        userData,
        { params: { userId } }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            CodeCompleted11,
            CodeCompleted12,
            CodeCompleted13,
            CodeCompleted14,
            CodeCompleted15,
          };
          this.router.navigate(['/profile']);
          this.snackBar.open('Profile edited!', 'Nice!', {
            duration: 3000,
          });
          this.infos.push(post);
          this.infosUpdated.next([...this.infos]);
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  // Edit comp 2W
  editUserInfoComp2W(
    userId: string,
    CodeCompleted16: string,
    CodeCompleted17: string,
    CodeCompleted18: string,
    CodeCompleted19: string,
    CodeCompleted20: string
  ): any {
    const userData = new FormData();
    userData.append('CodeCompleted16', CodeCompleted16);
    userData.append('CodeCompleted17', CodeCompleted17);
    userData.append('CodeCompleted18', CodeCompleted18);
    userData.append('CodeCompleted19', CodeCompleted19);
    userData.append('CodeCompleted20', CodeCompleted20);
    this.http
      .post<{ message: string; post: AuthDataInfo }>(
        'http://www.skalarly.com/api/user/infoEdComp2W',
        userData,
        { params: { userId } }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            CodeCompleted16,
            CodeCompleted17,
            CodeCompleted18,
            CodeCompleted19,
            CodeCompleted20,
          };
          this.router.navigate(['/profile']);
          this.snackBar.open('Profile edited!', 'Nice!', {
            duration: 3000,
          });
          this.infos.push(post);
          this.infosUpdated.next([...this.infos]);
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  // Edit comp 3
  editUserInfoComp3(
    userId: string,
    CodeCompleted21: string,
    CodeCompleted22: string,
    CodeCompleted23: string,
    CodeCompleted24: string,
    CodeCompleted25: string
  ): any {
    const authDataInfo = {
      CodeCompleted21,
      CodeCompleted22,
      CodeCompleted23,
      CodeCompleted24,
      CodeCompleted25,
    };
    const userData = new FormData();
    userData.append('CodeCompleted21', CodeCompleted21);
    userData.append('CodeCompleted22', CodeCompleted22);
    userData.append('CodeCompleted23', CodeCompleted23);
    userData.append('CodeCompleted24', CodeCompleted24);
    userData.append('CodeCompleted25', CodeCompleted25);

    this.http
      .post<{ message: string; post: AuthDataInfo }>(
        'http://www.skalarly.com/api/user/infoEdComp3',
        userData,
        { params: { userId } }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            CodeCompleted21,
            CodeCompleted22,
            CodeCompleted23,
            CodeCompleted24,
            CodeCompleted25,
          };
          this.router.navigate(['/profile']);
          this.snackBar.open('Profile edited!', 'Nice!', {
            duration: 3000,
          });
          this.infos.push(post);
          this.infosUpdated.next([...this.infos]);
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  // Edit comp 3
  editUserInfoComp3W(
    userId: string,
    CodeCompleted26: string,
    CodeCompleted27: string,
    CodeCompleted28: string,
    CodeCompleted29: string,
    CodeCompleted30: string
  ): any {
    const authDataInfo = {
      CodeCompleted26,
      CodeCompleted27,
      CodeCompleted28,
      CodeCompleted29,
      CodeCompleted30,
    };
    const userData = new FormData();
    userData.append('CodeCompleted26', CodeCompleted26);
    userData.append('CodeCompleted27', CodeCompleted27);
    userData.append('CodeCompleted28', CodeCompleted28);
    userData.append('CodeCompleted29', CodeCompleted29);
    userData.append('CodeCompleted30', CodeCompleted30);
    this.http
      .post<{ message: string; post: AuthDataInfo }>(
        'http://www.skalarly.com/api/user/infoEdComp3W',
        userData,
        { params: { userId } }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            CodeCompleted26,
            CodeCompleted27,
            CodeCompleted28,
            CodeCompleted29,
            CodeCompleted30,
          };
          this.router.navigate(['/profile']);
          this.snackBar.open('Profile edited!', 'Nice!', {
            duration: 3000,
          });
          this.infos.push(post);
          this.infosUpdated.next([...this.infos]);
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  // Edit comp 4
  editUserInfoComp4(
    userId: string,
    CodeCompleted31: string,
    CodeCompleted32: string,
    CodeCompleted33: string,
    CodeCompleted34: string,
    CodeCompleted35: string
  ): any {
    const authDataInfo = {
      CodeCompleted31,
      CodeCompleted32,
      CodeCompleted33,
      CodeCompleted34,
      CodeCompleted35,
    };
    const userData = new FormData();
    userData.append('CodeCompleted31', CodeCompleted31);
    userData.append('CodeCompleted32', CodeCompleted32);
    userData.append('CodeCompleted33', CodeCompleted33);
    userData.append('CodeCompleted34', CodeCompleted34);
    userData.append('CodeCompleted35', CodeCompleted35);

    this.http
      .post<{ message: string; post: AuthDataInfo }>(
        'http://www.skalarly.com/api/user/infoEdComp4',
        userData,
        { params: { userId } }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            CodeCompleted31,
            CodeCompleted32,
            CodeCompleted33,
            CodeCompleted34,
            CodeCompleted35,
          };
          this.router.navigate(['/profile']);
          this.snackBar.open('Profile edited!', 'Nice!', {
            duration: 3000,
          });
          this.infos.push(post);
          this.infosUpdated.next([...this.infos]);
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  // Edit comp 4W
  editUserInfoComp4W(
    userId: string,
    CodeCompleted36: string,
    CodeCompleted37: string,
    CodeCompleted38: string,
    CodeCompleted39: string,
    CodeCompleted40: string,
    CodeCompletedX: string
  ): any {
    const authDataInfo = {
      CodeCompleted36,
      CodeCompleted37,
      CodeCompleted38,
      CodeCompleted39,
      CodeCompleted40,
      CodeCompletedX,
    };
    const userData = new FormData();
    userData.append('CodeCompleted36', CodeCompleted36);
    userData.append('CodeCompleted37', CodeCompleted37);
    userData.append('CodeCompleted38', CodeCompleted38);
    userData.append('CodeCompleted39', CodeCompleted39);
    userData.append('CodeCompleted40', CodeCompleted40);
    userData.append('CodeCompletedX', CodeCompletedX);

    this.http
      .post<{ message: string; post: AuthDataInfo }>(
        'http://www.skalarly.com/api/user/infoEdComp4W',
        userData,
        { params: { userId } }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            CodeCompleted36,
            CodeCompleted37,
            CodeCompleted38,
            CodeCompleted39,
            CodeCompleted40,
            CodeCompletedX,
          };
          this.router.navigate(['/profile']);
          this.snackBar.open('Profile edited!', 'Nice!', {
            duration: 3000,
          });
          this.infos.push(post);
          this.infosUpdated.next([...this.infos]);
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  // Edit Pursuing
  editUserInfoPur(
    userId: string,
    CodePursuing: string,
    CodePursuing2: string,
    CodePursuing3: string,
    CodePursuing4: string,
    CodePursuing5: string
  ): any {
    const authDataInfo = {
      userId,
      CodePursuing,
      CodePursuing2,
      CodePursuing3,
      CodePursuing4,
      CodePursuing5,
    };
    const userData = new FormData();
    userData.append('CodePursuing', CodePursuing);
    userData.append('CodePursuing2', CodePursuing2);
    userData.append('CodePursuing3', CodePursuing3);
    userData.append('CodePursuing4', CodePursuing4);
    userData.append('CodePursuing5', CodePursuing5);
    this.http
      .post<{ message: string; post: AuthDataInfo }>(
        'http://www.skalarly.com/api/user/infoEdPur',
        userData,
        { params: { userId } }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            CodePursuing,
            CodePursuing2,
            CodePursuing3,
            CodePursuing4,
            CodePursuing5,
          };
          this.router.navigate(['/profile']);
          this.snackBar.open('Profile edited!', 'Nice!', {
            duration: 3000,
          });
          this.infos.push(post);
          this.infosUpdated.next([...this.infos]);
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  // Edit Pursuing winter
  editUserInfoPurW(
    userId: string,
    CodePursuing6: string,
    CodePursuing7: string,
    CodePursuing8: string,
    CodePursuing9: string,
    CodePursuing10: string
  ): any {
    const authDataInfo = {
      userId,
      CodePursuing6,
      CodePursuing7,
      CodePursuing8,
      CodePursuing9,
      CodePursuing10,
    };
    const userData = new FormData();

    userData.append('CodePursuing6', CodePursuing6);
    userData.append('CodePursuing7', CodePursuing7);
    userData.append('CodePursuing8', CodePursuing8);
    userData.append('CodePursuing9', CodePursuing9);
    userData.append('CodePursuing10', CodePursuing10);

    this.http
      .post<{ message: string; post: AuthDataInfo }>(
        'http://www.skalarly.com/api/user/infoEdPurW',
        userData,
        { params: { userId } }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            CodePursuing6,
            CodePursuing7,
            CodePursuing8,
            CodePursuing9,
            CodePursuing10,
          };
          this.router.navigate(['/profile']);
          this.snackBar.open('Profile edited!', 'Nice!', {
            duration: 3000,
          });
          this.infos.push(post);
          this.infosUpdated.next([...this.infos]);
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  // Edit Pursuing
  editUserInfoPurSp(
    userId: string,
    CodePursuing11: string,
    CodePursuing12: string
  ): any {
    const authDataInfo = {
      userId,
      CodePursuing11,
      CodePursuing12,
    };
    const userData = new FormData();
    userData.append('CodePursuing11', CodePursuing11);
    userData.append('CodePursuing12', CodePursuing12);
    this.http
      .post<{ message: string; post: AuthDataInfo }>(
        'http://www.skalarly.com/api/user/infoEdPurSpring',
        userData,
        { params: { userId } }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            CodePursuing11,
            CodePursuing12,
          };
          this.router.navigate(['/profile']);
          this.snackBar.open('Profile edited!', 'Nice!', {
            duration: 3000,
          });
          this.infos.push(post);
          this.infosUpdated.next([...this.infos]);
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  // Edit Pursuing
  editUserInfoPurSu(
    userId: string,
    CodePursuing13: string,
    CodePursuing14: string
  ): any {
    const authDataInfo = {
      userId,
      CodePursuing13,
      CodePursuing14,
    };
    const userData = new FormData();
    userData.append('CodePursuing13', CodePursuing13);
    userData.append('CodePursuing14', CodePursuing14);
    this.http
      .post<{ message: string; post: AuthDataInfo }>(
        'http://www.skalarly.com/api/user/infoEdPurSummer',
        userData,
        { params: { userId } }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            CodePursuing13,
            CodePursuing14,
          };
          this.router.navigate(['/profile']);
          this.snackBar.open('Profile edited!', 'Nice!', {
            duration: 3000,
          });
          this.infos.push(post);
          this.infosUpdated.next([...this.infos]);
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }

  // Your info
  getInfo(counter: number): any {
    this.http
      .get<{ message: string; infos: any }>(
        'http://www.skalarly.com/api/user/info',
        { params: { counter } }
      )
      .pipe(
        map((infosData) => {
          return infosData.infos.map((info) => {
            return {
              id: info._id,
              username: info.username,
              name: info.name,
              bio: info.bio,
              gender: info.gender,
              birthday: info.birthday,
              major: info.major,
              minor: info.minor,
              sport: info.sport,
              club: info.club,
              pronouns: info.pronouns,
              CodeCompleted: info.CodeCompleted,
              CodeCompleted2: info.CodeCompleted2,
              CodeCompleted3: info.CodeCompleted3,
              CodeCompleted4: info.CodeCompleted4,
              CodeCompleted5: info.CodeCompleted5,
              CodeCompleted6: info.CodeCompleted6,
              CodeCompleted7: info.CodeCompleted7,
              CodeCompleted8: info.CodeCompleted8,
              CodeCompleted9: info.CodeCompleted9,
              CodeCompleted10: info.CodeCompleted10,
              CodeCompleted11: info.CodeCompleted11,
              CodeCompleted12: info.CodeCompleted12,
              CodeCompleted13: info.CodeCompleted13,
              CodeCompleted14: info.CodeCompleted14,
              CodeCompleted15: info.CodeCompleted15,
              CodeCompleted16: info.CodeCompleted16,
              CodeCompleted17: info.CodeCompleted17,
              CodeCompleted18: info.CodeCompleted18,
              CodeCompleted19: info.CodeCompleted19,
              CodeCompleted20: info.CodeCompleted20,
              CodeCompleted21: info.CodeCompleted21,
              CodeCompleted22: info.CodeCompleted22,
              CodeCompleted23: info.CodeCompleted23,
              CodeCompleted24: info.CodeCompleted24,
              CodeCompleted25: info.CodeCompleted25,
              CodeCompleted26: info.CodeCompleted26,
              CodeCompleted27: info.CodeCompleted27,
              CodeCompleted28: info.CodeCompleted28,
              CodeCompleted29: info.CodeCompleted29,
              CodeCompleted30: info.CodeCompleted30,
              CodeCompleted31: info.CodeCompleted31,
              CodeCompleted32: info.CodeCompleted32,
              CodeCompleted33: info.CodeCompleted33,
              CodeCompleted34: info.CodeCompleted34,
              CodeCompleted35: info.CodeCompleted35,
              CodeCompleted36: info.CodeCompleted36,
              CodeCompleted37: info.CodeCompleted37,
              CodeCompleted38: info.CodeCompleted38,
              CodeCompleted39: info.CodeCompleted39,
              CodeCompleted40: info.CodeCompleted40,
              CodeCompletedX: info.CodeCompletedX,

              CodePursuing: info.CodePursuing,
              CodePursuing2: info.CodePursuing2,
              CodePursuing3: info.CodePursuing3,
              CodePursuing4: info.CodePursuing4,
              CodePursuing5: info.CodePursuing5,
              CodePursuing6: info.CodePursuing6,
              CodePursuing7: info.CodePursuing7,
              CodePursuing8: info.CodePursuing8,
              CodePursuing9: info.CodePursuing9,
              CodePursuing10: info.CodePursuing10,
              CodePursuing11: info.CodePursuing11,
              CodePursuing12: info.CodePursuing12,
              CodePursuing13: info.CodePursuing13,
              CodePursuing14: info.CodePursuing14,
              ProfilePicPath: info.ProfilePicPath,
              // ShowCasePath: info.ShowCasePath,
              Creator: info.Creator,
            };
          });
        })
      )
      .subscribe((transformedInfos) => {
        this.infos = transformedInfos;
        this.infosUpdated.next([...this.infos]);
      });
  }
  // Your info profile
  getInfoProfile(userId: string): any {
    this.http
      .get<{ message: string; infos: any }>(
        'http://www.skalarly.com/api/user/infoProfile',
        { params: { userId } }
      )
      .pipe(
        map((infosData) => {
          return infosData.infos.map((info) => {
            return {
              id: info._id,
              username: info.username,
              name: info.name,
              bio: info.bio,
              gender: info.gender,
              birthday: info.birthday,
              major: info.major,
              minor: info.minor,
              sport: info.sport,
              club: info.club,
              pronouns: info.pronouns,
              CodeCompleted: info.CodeCompleted,
              CodeCompleted2: info.CodeCompleted2,
              CodeCompleted3: info.CodeCompleted3,
              CodeCompleted4: info.CodeCompleted4,
              CodeCompleted5: info.CodeCompleted5,
              CodeCompleted6: info.CodeCompleted6,
              CodeCompleted7: info.CodeCompleted7,
              CodeCompleted8: info.CodeCompleted8,
              CodeCompleted9: info.CodeCompleted9,
              CodeCompleted10: info.CodeCompleted10,
              CodeCompleted11: info.CodeCompleted11,
              CodeCompleted12: info.CodeCompleted12,
              CodeCompleted13: info.CodeCompleted13,
              CodeCompleted14: info.CodeCompleted14,
              CodeCompleted15: info.CodeCompleted15,
              CodeCompleted16: info.CodeCompleted16,
              CodeCompleted17: info.CodeCompleted17,
              CodeCompleted18: info.CodeCompleted18,
              CodeCompleted19: info.CodeCompleted19,
              CodeCompleted20: info.CodeCompleted20,
              CodeCompleted21: info.CodeCompleted21,
              CodeCompleted22: info.CodeCompleted22,
              CodeCompleted23: info.CodeCompleted23,
              CodeCompleted24: info.CodeCompleted24,
              CodeCompleted25: info.CodeCompleted25,
              CodeCompleted26: info.CodeCompleted26,
              CodeCompleted27: info.CodeCompleted27,
              CodeCompleted28: info.CodeCompleted28,
              CodeCompleted29: info.CodeCompleted29,
              CodeCompleted30: info.CodeCompleted30,
              CodeCompleted31: info.CodeCompleted31,
              CodeCompleted32: info.CodeCompleted32,
              CodeCompleted33: info.CodeCompleted33,
              CodeCompleted34: info.CodeCompleted34,
              CodeCompleted35: info.CodeCompleted35,
              CodeCompleted36: info.CodeCompleted36,
              CodeCompleted37: info.CodeCompleted37,
              CodeCompleted38: info.CodeCompleted38,
              CodeCompleted39: info.CodeCompleted39,
              CodeCompleted40: info.CodeCompleted40,
              CodeCompletedX: info.CodeCompletedX,

              CodePursuing: info.CodePursuing,
              CodePursuing2: info.CodePursuing2,
              CodePursuing3: info.CodePursuing3,
              CodePursuing4: info.CodePursuing4,
              CodePursuing5: info.CodePursuing5,
              CodePursuing6: info.CodePursuing6,
              CodePursuing7: info.CodePursuing7,
              CodePursuing8: info.CodePursuing8,
              CodePursuing9: info.CodePursuing9,
              CodePursuing10: info.CodePursuing10,
              CodePursuing11: info.CodePursuing11,
              CodePursuing12: info.CodePursuing12,
              CodePursuing13: info.CodePursuing13,
              CodePursuing14: info.CodePursuing14,
              ProfilePicPath: info.ProfilePicPath,
              // ShowCasePath: info.ShowCasePath,
              Creator: info.Creator,
            };
          });
        })
      )
      .subscribe((transformedInfos) => {
        this.infos = transformedInfos;
        this.infosUpdated.next([...this.infos]);
      });
  }
  // Your info
  getInfoMessage(userId): any {
    this.http
      .get<{ message: string; infos: any }>(
        'http://www.skalarly.com/api/user/infoMessage',
        {
          params: { userId },
        }
      )
      .pipe(
        map((infosData) => {
          return infosData.infos.map((info) => {
            return {
              id: info._id,
              username: info.username,
              name: info.name,
              bio: info.bio,
              gender: info.gender,
              birthday: info.birthday,
              major: info.major,
              minor: info.minor,
              sport: info.sport,
              club: info.club,
              pronouns: info.pronouns,
              CodeCompleted: info.CodeCompleted,
              CodeCompleted2: info.CodeCompleted2,
              CodeCompleted3: info.CodeCompleted3,
              CodeCompleted4: info.CodeCompleted4,
              CodeCompleted5: info.CodeCompleted5,
              CodeCompleted6: info.CodeCompleted6,
              CodeCompleted7: info.CodeCompleted7,
              CodeCompleted8: info.CodeCompleted8,
              CodeCompleted9: info.CodeCompleted9,
              CodeCompleted10: info.CodeCompleted10,
              CodeCompleted11: info.CodeCompleted11,
              CodeCompleted12: info.CodeCompleted12,
              CodeCompleted13: info.CodeCompleted13,
              CodeCompleted14: info.CodeCompleted14,
              CodeCompleted15: info.CodeCompleted15,
              CodeCompleted16: info.CodeCompleted16,
              CodeCompleted17: info.CodeCompleted17,
              CodeCompleted18: info.CodeCompleted18,
              CodeCompleted19: info.CodeCompleted19,
              CodeCompleted20: info.CodeCompleted20,
              CodeCompleted21: info.CodeCompleted21,
              CodeCompleted22: info.CodeCompleted22,
              CodeCompleted23: info.CodeCompleted23,
              CodeCompleted24: info.CodeCompleted24,
              CodeCompleted25: info.CodeCompleted25,
              CodeCompleted26: info.CodeCompleted26,
              CodeCompleted27: info.CodeCompleted27,
              CodeCompleted28: info.CodeCompleted28,
              CodeCompleted29: info.CodeCompleted29,
              CodeCompleted30: info.CodeCompleted30,
              CodeCompleted31: info.CodeCompleted31,
              CodeCompleted32: info.CodeCompleted32,
              CodeCompleted33: info.CodeCompleted33,
              CodeCompleted34: info.CodeCompleted34,
              CodeCompleted35: info.CodeCompleted35,
              CodeCompleted36: info.CodeCompleted36,
              CodeCompleted37: info.CodeCompleted37,
              CodeCompleted38: info.CodeCompleted38,
              CodeCompleted39: info.CodeCompleted39,
              CodeCompleted40: info.CodeCompleted40,
              CodeCompletedX: info.CodeCompletedX,

              CodePursuing: info.CodePursuing,
              CodePursuing2: info.CodePursuing2,
              CodePursuing3: info.CodePursuing3,
              CodePursuing4: info.CodePursuing4,
              CodePursuing5: info.CodePursuing5,
              CodePursuing6: info.CodePursuing6,
              CodePursuing7: info.CodePursuing7,
              CodePursuing8: info.CodePursuing8,
              CodePursuing9: info.CodePursuing9,
              CodePursuing10: info.CodePursuing10,
              CodePursuing11: info.CodePursuing11,
              CodePursuing12: info.CodePursuing12,

              ProfilePicPath: info.ProfilePicPath,
              // ShowCasePath: info.ShowCasePath,
              Creator: info.Creator,
            };
          });
        })
      )
      .subscribe((transformedInfos) => {
        this.infos = transformedInfos;
        this.infosUpdated.next([...this.infos]);
      });
  }

  // Your info
  getInfoPersonal(userId: string): any {
    this.http
      .get<{ message: string; infos: any }>(
        'http://www.skalarly.com/api/user/infoPersonal',
        { params: { userId } }
      )
      .pipe(
        map((infosData) => {
          return infosData.infos.map((info) => {
            return {
              id: info._id,
              username: info.username,
              name: info.name,
              bio: info.bio,
              gender: info.gender,
              birthday: info.birthday,
              major: info.major,
              minor: info.minor,
              sport: info.sport,
              club: info.club,
              pronouns: info.pronouns,
              CodeCompleted: info.CodeCompleted,
              CodeCompleted2: info.CodeCompleted2,
              CodeCompleted3: info.CodeCompleted3,
              CodeCompleted4: info.CodeCompleted4,
              CodeCompleted5: info.CodeCompleted5,
              CodeCompleted6: info.CodeCompleted6,
              CodeCompleted7: info.CodeCompleted7,
              CodeCompleted8: info.CodeCompleted8,
              CodeCompleted9: info.CodeCompleted9,
              CodeCompleted10: info.CodeCompleted10,
              CodeCompleted11: info.CodeCompleted11,
              CodeCompleted12: info.CodeCompleted12,
              CodeCompleted13: info.CodeCompleted13,
              CodeCompleted14: info.CodeCompleted14,
              CodeCompleted15: info.CodeCompleted15,
              CodeCompleted16: info.CodeCompleted16,
              CodeCompleted17: info.CodeCompleted17,
              CodeCompleted18: info.CodeCompleted18,
              CodeCompleted19: info.CodeCompleted19,
              CodeCompleted20: info.CodeCompleted20,
              CodeCompleted21: info.CodeCompleted21,
              CodeCompleted22: info.CodeCompleted22,
              CodeCompleted23: info.CodeCompleted23,
              CodeCompleted24: info.CodeCompleted24,
              CodeCompleted25: info.CodeCompleted25,
              CodeCompleted26: info.CodeCompleted26,
              CodeCompleted27: info.CodeCompleted27,
              CodeCompleted28: info.CodeCompleted28,
              CodeCompleted29: info.CodeCompleted29,
              CodeCompleted30: info.CodeCompleted30,
              CodeCompleted31: info.CodeCompleted31,
              CodeCompleted32: info.CodeCompleted32,
              CodeCompleted33: info.CodeCompleted33,
              CodeCompleted34: info.CodeCompleted34,
              CodeCompleted35: info.CodeCompleted35,
              CodeCompleted36: info.CodeCompleted36,
              CodeCompleted37: info.CodeCompleted37,
              CodeCompleted38: info.CodeCompleted38,
              CodeCompleted39: info.CodeCompleted39,
              CodeCompleted40: info.CodeCompleted40,
              CodeCompletedX: info.CodeCompletedX,

              CodePursuing: info.CodePursuing,
              CodePursuing2: info.CodePursuing2,
              CodePursuing3: info.CodePursuing3,
              CodePursuing4: info.CodePursuing4,
              CodePursuing5: info.CodePursuing5,
              CodePursuing6: info.CodePursuing6,
              CodePursuing7: info.CodePursuing7,
              CodePursuing8: info.CodePursuing8,
              CodePursuing9: info.CodePursuing9,
              CodePursuing10: info.CodePursuing10,
              CodePursuing11: info.CodePursuing11,
              CodePursuing12: info.CodePursuing12,
              CodePursuing13: info.CodePursuing13,
              CodePursuing14: info.CodePursuing14,

              ProfilePicPath: info.ProfilePicPath,
              // ShowCasePath: info.ShowCasePath,
              Creator: info.Creator,
            };
          });
        })
      )
      .subscribe((transformedInfos) => {
        this.infos = transformedInfos;
        this.infosUpdated.next([...this.infos]);
      });
  }
  getOtherInfo(id: string): any {
    this.http
      .get<{ message: string; infos: any }>(
        'http://www.skalarly.com/api/user/id',
        { params: { id } }
      )
      .pipe(
        map((infosData) => {
          return infosData.infos.map((info) => {
            return {
              id: info._id,
              username: info.username,
              name: info.name,
              bio: info.bio,
              gender: info.gender,
              birthday: info.birthday,
              major: info.major,
              minor: info.minor,
              sport: info.sport,
              club: info.club,
              pronouns: info.pronouns,
              CodeCompleted: info.CodeCompleted,
              CodeCompleted2: info.CodeCompleted2,
              CodeCompleted3: info.CodeCompleted3,
              CodeCompleted4: info.CodeCompleted4,
              CodeCompleted5: info.CodeCompleted5,
              CodeCompleted6: info.CodeCompleted6,
              CodeCompleted7: info.CodeCompleted7,
              CodeCompleted8: info.CodeCompleted8,
              CodeCompleted9: info.CodeCompleted9,
              CodeCompleted10: info.CodeCompleted10,
              CodeCompleted11: info.CodeCompleted11,
              CodeCompleted12: info.CodeCompleted12,
              CodeCompleted13: info.CodeCompleted13,
              CodeCompleted14: info.CodeCompleted14,
              CodeCompleted15: info.CodeCompleted15,
              CodeCompleted16: info.CodeCompleted16,
              CodeCompleted17: info.CodeCompleted17,
              CodeCompleted18: info.CodeCompleted18,
              CodeCompleted19: info.CodeCompleted19,
              CodeCompleted20: info.CodeCompleted20,
              CodeCompleted21: info.CodeCompleted21,
              CodeCompleted22: info.CodeCompleted22,
              CodeCompleted23: info.CodeCompleted23,
              CodeCompleted24: info.CodeCompleted24,
              CodeCompleted25: info.CodeCompleted25,
              CodeCompleted26: info.CodeCompleted26,
              CodeCompleted27: info.CodeCompleted27,
              CodeCompleted28: info.CodeCompleted28,
              CodeCompleted29: info.CodeCompleted29,
              CodeCompleted30: info.CodeCompleted30,
              CodeCompleted31: info.CodeCompleted31,
              CodeCompleted32: info.CodeCompleted32,
              CodeCompleted33: info.CodeCompleted33,
              CodeCompleted34: info.CodeCompleted34,
              CodeCompleted35: info.CodeCompleted35,
              CodeCompleted36: info.CodeCompleted36,
              CodeCompleted37: info.CodeCompleted37,
              CodeCompleted38: info.CodeCompleted38,
              CodeCompleted39: info.CodeCompleted39,
              CodeCompleted40: info.CodeCompleted40,
              CodeCompletedX: info.CodeCompletedX,

              CodePursuing: info.CodePursuing,
              CodePursuing2: info.CodePursuing2,
              CodePursuing3: info.CodePursuing3,
              CodePursuing4: info.CodePursuing4,
              CodePursuing5: info.CodePursuing5,
              CodePursuing6: info.CodePursuing6,
              CodePursuing7: info.CodePursuing7,
              CodePursuing8: info.CodePursuing8,
              CodePursuing9: info.CodePursuing9,
              CodePursuing10: info.CodePursuing10,
              CodePursuing11: info.CodePursuing11,
              CodePursuing12: info.CodePursuing12,
              CodePursuing13: info.CodePursuing13,
              CodePursuing14: info.CodePursuing14,
              ProfilePicPath: info.ProfilePicPath,
              Creator: info.Creator,
            };
          });
        })
      )
      .subscribe((transformedInfos) => {
        this.infos = transformedInfos;
        this.infosUpdated.next([...this.infos]);
      });
  }

  // Login
  login(email: string, password: string): any {
    const authData: AuthData = { email, password };
    this.http
      .post<{ token: string; expiresIn: number; userId: string }>(
        'http://www.skalarly.com/api/user/login',
        authData
      )
      .subscribe({
        next: (response) => {
          const token = response.token;
          this.token = token;
          if (token) {
            this.router.navigate(['/search']);
            this.snackBar.open('Welcome Fellow Skalar!', 'Thanks! ', {
              duration: 3000,
            });
            const expiresInDuration = response.expiresIn;
            this.setAuthTimer(expiresInDuration);
            this.isAuthenticated = true;
            this.userId = response.userId;
            this.authStatusListener.next(true);
            const now = new Date();
            const expirationDate = new Date(
              now.getTime() + expiresInDuration * 1000
            );

            this.saveAuthData(token, expirationDate, this.userId);
          }
        },
        error: (error) => {
          this.authStatusListener.next(false);
          // this.snackBar.open('Failed to login, please try again', 'Will do!!', {
          //     duration: 4000
          // });
        },
      });
  }

  // Login first time
  loginFirst(emailV: string, passwordV: string): any {
    const authData = { emailV, passwordV };
    this.http
      // expiresIn: number;
      .post<{ token: string; expiresIn: number; userId: string }>(
        'http://www.skalarly.com/api/user/login1',
        authData
      )
      .subscribe({
        next: (response) => {
          this.token = response.token;
          this.isAuthenticated = true;
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.userId = response.userId;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(
            now.getTime() + expiresInDuration * 1000
          );

          this.saveAuthData(this.token, expirationDate, this.userId);
        },
        error: (error) => {
          this.authStatusListener.next(false);
          this.snackBar.open(
            'Failed to login, make sure you verified yor email!',
            'Will do!',
            {
              duration: 4000,
            }
          );
        },
      });
  }

  autoAuthUser(): any {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.userId = authInformation.userId;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  logout(): any {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.userId = null;
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/login']);
  }

  private setAuthTimer(duration: number): any {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(
    token: string,
    expirationDate: Date,
    userId: string
  ): any {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
  }

  private clearAuthData(): any {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
  }

  public getAuthData(): any {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');
    // if (expirationDate === '0') {
    //   this.logout().then(() => {
    //     this.snackBar.open('Validation expired', 'Please relogin!', {
    //       duration: 3000,
    //     });
    //   });
    // }
    // else {
    if (!token || !expirationDate) {
      this.logout().then(() => {
        this.snackBar.open('Welcome', 'Please Login!', {
          duration: 3000,
        });
      });

      return;
    }
    return {
      token,
      expirationDate: new Date(expirationDate),
      userId,
    };
    // }
  }

  // Reset Password
  resetPassword(email: string): any {
    this.snackBar.open('Check your email to reset your password.', 'Will do!');
    const authData: AuthData = { email };
    this.http
      .post('http://www.skalarly.com/api/user/forgot', authData)
      .subscribe({
        next: () => {},
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }

  // Update Password
  updatePassword(password: string, secretCode: string): any {
    const authData: AuthData = { password, secretCode };
    this.http
      .post('http://www.skalarly.com/api/user/reset-password', authData)
      .subscribe({
        next: () => {
          const snackBarRef = this.snackBar.open(
            'Password has been changed',
            'Login!!',
            {
              duration: 2000,
            }
          );
          snackBarRef.afterDismissed().subscribe(() => {
            this.router.navigate(['/login']);
          });
        },
        error: (error) => {
          this.snackBar.open('Invalid reset code.', 'Check your email', {
            duration: 3000,
          });
          this.authStatusListener.next(false);
        },
      });
  }

  // Delete account
  deleteAccount(emailDel: string, passwordDel: string): any {
    const del = { emailDel, passwordDel };
    this.http.post('http://www.skalarly.com/api/user/delete', del).subscribe({
      next: () => {
        const snackBarRef = this.snackBar.open(
          'We wish you all the best',
          'Skal friend!',
          {
            duration: 3000,
          }
        );
        snackBarRef.afterDismissed().subscribe(() => {
          this.router.navigate(['/login']);
        });
      },
      error: (error) => {
        this.snackBar.open('Invalid username', 'Try again!', {
          duration: 3000,
        });
        // this.authStatusListener.next(false);
      },
    });
  }
}

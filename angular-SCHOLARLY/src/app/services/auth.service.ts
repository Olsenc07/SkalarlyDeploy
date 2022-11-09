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
        'https://www.skalarly.com/api/user/signup',
        authData
      )
      .subscribe({
        next: () => {
          this.snackBar.open(
            'Check your email and junk mail to verify your account before logining in. This may take a minute. Do not refresh this page.',
            'Will do!'
          );
        },
        error: (error) => {
          this.authStatusListener.next(false);
          this.snackBar
            .open('Click Here', 'Retry')
            .afterDismissed()
            .subscribe(() => {
              // window.location.reload();
              // Could make this a bit better but belllow just goes to homepage anyways
              location.replace('https://www.skalarly.com/sign-up');
            });
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
        'https://www.skalarly.com/api/user/info',
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
  editUserInfoPic(userId: string, profilePic: File): any {
    const userData = new FormData();
    userData.append('userId', userId);
    userData.append('profilePic', profilePic);
    console.log('up stairs', userData);
    this.http
      .put<{ message: string; post: any }>(
        'https://www.skalarly.com/api/user/infoEdPic',
        userData
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            ProfilePicPath: responseData.post.ProfilePicPath,
          };
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  // edit userinfo
  editUserInfoMajor(userId: string, major: string): any {
    this.http
      .put<{ message: string; post: AuthDataInfo }>(
        'https://www.skalarly.com/api/user/infoEdMajor',
        {
          major,
          userId,
        }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            major,
          };
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  // edit userinfo
  editUserInfoMinor(userId: string, minor: string): any {
    this.http
      .put<{ message: string; post: AuthDataInfo }>(
        'https://www.skalarly.com/api/user/infoEdMinor',
        {
          minor,
          userId,
        }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            minor,
          };
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  // edit userinfo
  editUserInfoSport(userId: string, sport: string): any {
    this.http
      .put<{ message: string; post: AuthDataInfo }>(
        'https://www.skalarly.com/api/user/infoEdSport',
        {
          sport,
          userId,
        }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            sport,
          };
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  // edit userinfo
  editUserInfoClub(userId: string, club: string): any {
    this.http
      .put<{ message: string; post: AuthDataInfo }>(
        'https://www.skalarly.com/api/user/infoEdClub',
        {
          userId,
          club,
        }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            club,
          };
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  // edit userinfo
  editUserInfoName(userId: string, name: string): any {
    this.http
      .put<{ message: string; post: AuthDataInfo }>(
        'https://www.skalarly.com/api/user/infoEdName',
        {
          name,
          userId,
        }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            name,
          };
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  editUserInfoBirthday(userId: string, birthday: string): any {
    this.http
      .put<{ message: string; post: AuthDataInfo }>(
        'https://www.skalarly.com/api/user/infoEdBirthday',
        {
          birthday,
          userId,
        }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            birthday,
          };
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  editUserInfoPronoun(userId: string, pronoun: string): any {
    this.http
      .put<{ message: string; post: any }>(
        'https://www.skalarly.com/api/user/infoEdPronoun',
        {
          pronoun,
          userId,
        }
      )
      .subscribe({
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  editUserInfoGender(userId: string, gender: string): any {
    this.http
      .put<{ message: string; post: AuthDataInfo }>(
        'https://www.skalarly.com/api/user/infoEdGender',
        {
          gender,
          userId,
        }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            gender,
          };
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  editUserInfoBio(userId: string, bio: string): any {
    this.http
      .put<{ message: string; post: AuthDataInfo }>(
        'https://www.skalarly.com/api/user/infoEdBio',
        {
          bio,
          userId,
        }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            bio,
          };
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  editUserInfoComp(userId: string, CodeCompleted: string): any {
    this.http
      .put<{ message: string; post: any }>(
        'https://www.skalarly.com/api/user/infoEdComp1',
        {
          userId,
          CodeCompleted,
        }
      )
      .subscribe({
        next: (responseData) => {
          const post: any = {
            id: responseData.post.id,
            CodeCompleted,
          };
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  editUserInfoComp2(userId: string, CodeCompleted2: string): any {
    this.http
      .put<{ message: string; post: any }>(
        'https://www.skalarly.com/api/user/infoEdComp2',
        {
          userId,
          CodeCompleted2,
        }
      )
      .subscribe({
        next: (responseData) => {
          const post: any = {
            id: responseData.post.id,
            CodeCompleted2,
          };
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  editUserInfoComp3(userId: string, CodeCompleted3: string): any {
    this.http
      .put<{ message: string; post: any }>(
        'https://www.skalarly.com/api/user/infoEdComp3',
        {
          userId,
          CodeCompleted3,
        }
      )
      .subscribe({
        next: (responseData) => {
          const post: any = {
            id: responseData.post.id,
            CodeCompleted3,
          };
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  editUserInfoComp4(userId: string, CodeCompleted4: string): any {
    this.http
      .put<{ message: string; post: any }>(
        'https://www.skalarly.com/api/user/infoEdComp4',
        {
          userId,
          CodeCompleted4,
        }
      )
      .subscribe({
        next: (responseData) => {
          const post: any = {
            id: responseData.post.id,
            CodeCompleted4,
          };
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  editUserInfoComp5(userId: string, CodeCompleted5: string): any {
    this.http
      .put<{ message: string; post: any }>(
        'https://www.skalarly.com/api/user/infoEdComp5',
        {
          userId,
          CodeCompleted5,
        }
      )
      .subscribe({
        next: (responseData) => {
          const post: any = {
            id: responseData.post.id,
            CodeCompleted5,
          };
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  editUserInfoComp6(userId: string, CodeCompleted6: string): any {
    this.http
      .put<{ message: string; post: any }>(
        'https://www.skalarly.com/api/user/infoEdComp6',
        {
          userId,
          CodeCompleted6,
        }
      )
      .subscribe({
        next: (responseData) => {
          const post: any = {
            id: responseData.post.id,
            CodeCompleted6,
          };
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  editUserInfoComp7(userId: string, CodeCompleted7: string): any {
    this.http
      .put<{ message: string; post: any }>(
        'https://www.skalarly.com/api/user/infoEdComp7',
        {
          userId,
          CodeCompleted7,
        }
      )
      .subscribe({
        next: (responseData) => {
          const post: any = {
            id: responseData.post.id,
            CodeCompleted7,
          };
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  editUserInfoComp8(userId: string, CodeCompleted8: string): any {
    this.http
      .put<{ message: string; post: any }>(
        'https://www.skalarly.com/api/user/infoEdComp8',
        {
          userId,
          CodeCompleted8,
        }
      )
      .subscribe({
        next: (responseData) => {
          const post: any = {
            id: responseData.post.id,
            CodeCompleted8,
          };
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  editUserInfoComp9(userId: string, CodeCompleted9: string): any {
    this.http
      .put<{ message: string; post: any }>(
        'https://www.skalarly.com/api/user/infoEdComp9',
        {
          userId,
          CodeCompleted9,
        }
      )
      .subscribe({
        next: (responseData) => {
          const post: any = {
            id: responseData.post.id,
            CodeCompleted9,
          };
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  editUserInfoComp10(userId: string, CodeCompleted10: string): any {
    this.http
      .put<{ message: string; post: any }>(
        'https://www.skalarly.com/api/user/infoEdComp10',
        {
          userId,
          CodeCompleted10,
        }
      )
      .subscribe({
        next: (responseData) => {
          const post: any = {
            id: responseData.post.id,
            CodeCompleted10,
          };
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  // Edit comp 2
  editUserInfoComp11(userId: string, CodeCompleted11: string): any {
    this.http
      .put<{ message: string; post: any }>(
        'https://www.skalarly.com/api/user/infoEdComp11',
        {
          userId,
          CodeCompleted11,
        }
      )
      .subscribe({
        next: (responseData) => {
          const post: any = {
            id: responseData.post.id,
            CodeCompleted11,
          };
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  editUserInfoComp12(userId: string, CodeCompleted12: string): any {
    this.http
      .put<{ message: string; post: any }>(
        'https://www.skalarly.com/api/user/infoEdComp12',
        {
          userId,
          CodeCompleted12,
        }
      )
      .subscribe({
        next: (responseData) => {
          const post: any = {
            id: responseData.post.id,
            CodeCompleted12,
          };
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  editUserInfoComp13(userId: string, CodeCompleted13: string): any {
    this.http
      .put<{ message: string; post: any }>(
        'https://www.skalarly.com/api/user/infoEdComp13',
        {
          userId,
          CodeCompleted13,
        }
      )
      .subscribe({
        next: (responseData) => {
          const post: any = {
            id: responseData.post.id,
            CodeCompleted13,
          };
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  editUserInfoComp14(userId: string, CodeCompleted14: string): any {
    this.http
      .put<{ message: string; post: any }>(
        'https://www.skalarly.com/api/user/infoEdComp14',
        {
          userId,
          CodeCompleted14,
        }
      )
      .subscribe({
        next: (responseData) => {
          const post: any = {
            id: responseData.post.id,
            CodeCompleted14,
          };
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  editUserInfoComp15(userId: string, CodeCompleted15: string): any {
    this.http
      .put<{ message: string; post: any }>(
        'https://www.skalarly.com/api/user/infoEdComp15',
        {
          userId,
          CodeCompleted15,
        }
      )
      .subscribe({
        next: (responseData) => {
          const post: any = {
            id: responseData.post.id,
            CodeCompleted15,
          };
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  // Edit comp 2W
  editUserInfoComp16(userId: string, CodeCompleted16: string): any {
    this.http
      .put<{ message: string; post: any }>(
        'https://www.skalarly.com/api/user/infoEdComp16',
        {
          userId,
          CodeCompleted16,
        }
      )
      .subscribe({
        next: (responseData) => {
          const post: any = {
            id: responseData.post.id,
            CodeCompleted16,
          };
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  editUserInfoComp17(userId: string, CodeCompleted17: string): any {
    this.http
      .put<{ message: string; post: any }>(
        'https://www.skalarly.com/api/user/infoEdComp17',
        {
          userId,
          CodeCompleted17,
        }
      )
      .subscribe({
        next: (responseData) => {
          const post: any = {
            id: responseData.post.id,
            CodeCompleted17,
          };
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  editUserInfoComp18(userId: string, CodeCompleted18: string): any {
    this.http
      .put<{ message: string; post: any }>(
        'https://www.skalarly.com/api/user/infoEdComp18',
        {
          userId,
          CodeCompleted18,
        }
      )
      .subscribe({
        next: (responseData) => {
          const post: any = {
            id: responseData.post.id,
            CodeCompleted18,
          };
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  editUserInfoComp19(userId: string, CodeCompleted19: string): any {
    this.http
      .put<{ message: string; post: any }>(
        'https://www.skalarly.com/api/user/infoEdComp19',
        {
          userId,
          CodeCompleted19,
        }
      )
      .subscribe({
        next: (responseData) => {
          const post: any = {
            id: responseData.post.id,
            CodeCompleted19,
          };
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  editUserInfoComp20(userId: string, CodeCompleted20: string): any {
    this.http
      .put<{ message: string; post: any }>(
        'https://www.skalarly.com/api/user/infoEdComp20',
        {
          userId,
          CodeCompleted20,
        }
      )
      .subscribe({
        next: (responseData) => {
          const post: any = {
            id: responseData.post.id,
            CodeCompleted20,
          };
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  // Edit comp 3
  editUserInfoComp21(userId: string, CodeCompleted21: string): any {
    this.http
      .put<{ message: string; post: any }>(
        'https://www.skalarly.com/api/user/infoEdComp21',
        {
          userId,
          CodeCompleted21,
        }
      )
      .subscribe({
        next: (responseData) => {
          const post: any = {
            id: responseData.post.id,
            CodeCompleted21,
          };
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  editUserInfoComp22(userId: string, CodeCompleted22: string): any {
    this.http
      .put<{ message: string; post: any }>(
        'https://www.skalarly.com/api/user/infoEdComp22',
        {
          userId,
          CodeCompleted22,
        }
      )
      .subscribe({
        next: (responseData) => {
          const post: any = {
            id: responseData.post.id,
            CodeCompleted22,
          };
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  editUserInfoComp23(userId: string, CodeCompleted23: string): any {
    this.http
      .put<{ message: string; post: any }>(
        'https://www.skalarly.com/api/user/infoEdComp23',
        {
          userId,
          CodeCompleted23,
        }
      )
      .subscribe({
        next: (responseData) => {
          const post: any = {
            id: responseData.post.id,
            CodeCompleted23,
          };
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  editUserInfoComp24(userId: string, CodeCompleted24: string): any {
    this.http
      .put<{ message: string; post: any }>(
        'https://www.skalarly.com/api/user/infoEdComp24',
        {
          userId,
          CodeCompleted24,
        }
      )
      .subscribe({
        next: (responseData) => {
          const post: any = {
            id: responseData.post.id,
            CodeCompleted24,
          };
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  editUserInfoComp25(userId: string, CodeCompleted25: string): any {
    this.http
      .put<{ message: string; post: any }>(
        'https://www.skalarly.com/api/user/infoEdComp25',
        {
          userId,
          CodeCompleted25,
        }
      )
      .subscribe({
        next: (responseData) => {
          const post: any = {
            id: responseData.post.id,
            CodeCompleted25,
          };
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  // Edit comp 3
  editUserInfoComp26(userId: string, CodeCompleted26: string): any {
    this.http
      .put<{ message: string; post: any }>(
        'https://www.skalarly.com/api/user/infoEdComp26',
        {
          userId,
          CodeCompleted26,
        }
      )
      .subscribe({
        next: (responseData) => {
          const post: any = {
            id: responseData.post.id,
            CodeCompleted26,
          };
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  editUserInfoComp27(userId: string, CodeCompleted27: string): any {
    this.http
      .put<{ message: string; post: any }>(
        'https://www.skalarly.com/api/user/infoEdComp27',
        {
          userId,
          CodeCompleted27,
        }
      )
      .subscribe({
        next: (responseData) => {
          const post: any = {
            id: responseData.post.id,
            CodeCompleted27,
          };
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  editUserInfoComp28(userId: string, CodeCompleted28: string): any {
    this.http
      .put<{ message: string; post: any }>(
        'https://www.skalarly.com/api/user/infoEdComp28',
        {
          userId,
          CodeCompleted28,
        }
      )
      .subscribe({
        next: (responseData) => {
          const post: any = {
            id: responseData.post.id,
            CodeCompleted28,
          };
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  editUserInfoComp29(userId: string, CodeCompleted29: string): any {
    this.http
      .put<{ message: string; post: any }>(
        'https://www.skalarly.com/api/user/infoEdComp29',
        {
          userId,
          CodeCompleted29,
        }
      )
      .subscribe({
        next: (responseData) => {
          const post: any = {
            id: responseData.post.id,
            CodeCompleted29,
          };
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  editUserInfoComp30(userId: string, CodeCompleted30: string): any {
    this.http
      .put<{ message: string; post: any }>(
        'https://www.skalarly.com/api/user/infoEdComp30',
        {
          userId,
          CodeCompleted30,
        }
      )
      .subscribe({
        next: (responseData) => {
          const post: any = {
            id: responseData.post.id,
            CodeCompleted30,
          };
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  // Edit comp 4
  editUserInfoComp31(userId: string, CodeCompleted31: string): any {
    this.http
      .put<{ message: string; post: any }>(
        'https://www.skalarly.com/api/user/infoEdComp31',
        {
          userId,
          CodeCompleted31,
        }
      )
      .subscribe({
        next: (responseData) => {
          const post: any = {
            id: responseData.post.id,
            CodeCompleted31,
          };
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  editUserInfoComp32(userId: string, CodeCompleted32: string): any {
    this.http
      .put<{ message: string; post: any }>(
        'https://www.skalarly.com/api/user/infoEdComp32',
        {
          userId,
          CodeCompleted32,
        }
      )
      .subscribe({
        next: (responseData) => {
          const post: any = {
            id: responseData.post.id,
            CodeCompleted32,
          };
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  editUserInfoComp33(userId: string, CodeCompleted33: string): any {
    this.http
      .put<{ message: string; post: any }>(
        'https://www.skalarly.com/api/user/infoEdComp33',
        {
          userId,
          CodeCompleted33,
        }
      )
      .subscribe({
        next: (responseData) => {
          const post: any = {
            id: responseData.post.id,
            CodeCompleted33,
          };
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  editUserInfoComp34(userId: string, CodeCompleted34: string): any {
    this.http
      .put<{ message: string; post: any }>(
        'https://www.skalarly.com/api/user/infoEdComp34',
        {
          userId,
          CodeCompleted34,
        }
      )
      .subscribe({
        next: (responseData) => {
          const post: any = {
            id: responseData.post.id,
            CodeCompleted34,
          };
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  editUserInfoComp35(userId: string, CodeCompleted35: string): any {
    this.http
      .put<{ message: string; post: any }>(
        'https://www.skalarly.com/api/user/infoEdComp35',
        {
          userId,
          CodeCompleted35,
        }
      )
      .subscribe({
        next: (responseData) => {
          const post: any = {
            id: responseData.post.id,
            CodeCompleted35,
          };
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  // Edit comp 4W
  editUserInfoComp36(userId: string, CodeCompleted36: string): any {
    this.http
      .put<{ message: string; post: any }>(
        'https://www.skalarly.com/api/user/infoEdComp36',
        {
          userId,
          CodeCompleted36,
        }
      )
      .subscribe({
        next: (responseData) => {
          const post: any = {
            id: responseData.post.id,
            CodeCompleted36,
          };
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  editUserInfoComp37(userId: string, CodeCompleted37: string): any {
    this.http
      .put<{ message: string; post: any }>(
        'https://www.skalarly.com/api/user/infoEdComp37',
        {
          userId,
          CodeCompleted37,
        }
      )
      .subscribe({
        next: (responseData) => {
          const post: any = {
            id: responseData.post.id,
            CodeCompleted37,
          };
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  editUserInfoComp38(userId: string, CodeCompleted38: string): any {
    this.http
      .put<{ message: string; post: any }>(
        'https://www.skalarly.com/api/user/infoEdComp38',
        {
          userId,
          CodeCompleted38,
        }
      )
      .subscribe({
        next: (responseData) => {
          const post: any = {
            id: responseData.post.id,
            CodeCompleted38,
          };
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  editUserInfoComp39(userId: string, CodeCompleted39: string): any {
    this.http
      .put<{ message: string; post: any }>(
        'https://www.skalarly.com/api/user/infoEdComp39',
        {
          userId,
          CodeCompleted39,
        }
      )
      .subscribe({
        next: (responseData) => {
          const post: any = {
            id: responseData.post.id,
            CodeCompleted39,
          };
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  editUserInfoComp40(userId: string, CodeCompleted40: string): any {
    this.http
      .put<{ message: string; post: any }>(
        'https://www.skalarly.com/api/user/infoEdComp40',
        {
          userId,
          CodeCompleted40,
        }
      )
      .subscribe({
        next: (responseData) => {
          const post: any = {
            id: responseData.post.id,
            CodeCompleted40,
          };
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  editUserInfoCompX(userId: string, CodeCompletedX: string): any {
    this.http
      .put<{ message: string; post: any }>(
        'https://www.skalarly.com/api/user/infoEdCompX',
        {
          userId,
          CodeCompletedX,
        }
      )
      .subscribe({
        next: (responseData) => {
          const post: any = {
            id: responseData.post.id,
            CodeCompletedX,
          };
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  // Edit Pursuing
  editUserInfoPur(userId: string, CodePursuing: string): any {
    this.http
      .put<{ message: string; post: AuthDataInfo }>(
        'https://www.skalarly.com/api/user/infoEdPur',
        {
          userId,
          CodePursuing,
        }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            CodePursuing,
          };
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  // Edit Pursuing
  editUserInfoPur2(userId: string, CodePursuing2: string): any {
    this.http
      .put<{ message: string; post: AuthDataInfo }>(
        'https://www.skalarly.com/api/user/infoEdPur2',
        {
          userId,
          CodePursuing2,
        }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            CodePursuing2,
          };
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  // Edit Pursuing
  editUserInfoPur3(userId: string, CodePursuing3: string): any {
    this.http
      .put<{ message: string; post: AuthDataInfo }>(
        'https://www.skalarly.com/api/user/infoEdPur3',
        {
          userId,
          CodePursuing3,
        }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            CodePursuing3,
          };
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  // Edit Pursuing
  editUserInfoPur4(userId: string, CodePursuing4: string): any {
    this.http
      .put<{ message: string; post: AuthDataInfo }>(
        'https://www.skalarly.com/api/user/infoEdPur4',
        {
          userId,
          CodePursuing4,
        }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            CodePursuing4,
          };
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  // Edit Pursuing
  editUserInfoPur5(userId: string, CodePursuing5: string): any {
    this.http
      .put<{ message: string; post: AuthDataInfo }>(
        'https://www.skalarly.com/api/user/infoEdPur5',
        {
          userId,
          CodePursuing5,
        }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            CodePursuing5,
          };
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  // Edit Pursuing winter
  editUserInfoPurW6(userId: string, CodePursuing6: string): any {
    this.http
      .put<{ message: string; post: AuthDataInfo }>(
        'https://www.skalarly.com/api/user/infoEdPurW6',
        {
          userId,
          CodePursuing6,
        }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            CodePursuing6,
          };
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  // Edit Pursuing winter
  editUserInfoPurW7(userId: string, CodePursuing7: string): any {
    this.http
      .put<{ message: string; post: AuthDataInfo }>(
        'https://www.skalarly.com/api/user/infoEdPurW7',
        {
          userId,
          CodePursuing7,
        }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            CodePursuing7,
          };
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  // Edit Pursuing winter
  editUserInfoPurW8(userId: string, CodePursuing8: string): any {
    this.http
      .put<{ message: string; post: AuthDataInfo }>(
        'https://www.skalarly.com/api/user/infoEdPurW8',
        {
          userId,
          CodePursuing8,
        }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            CodePursuing8,
          };
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  // Edit Pursuing winter
  editUserInfoPurW9(userId: string, CodePursuing9: string): any {
    this.http
      .put<{ message: string; post: AuthDataInfo }>(
        'https://www.skalarly.com/api/user/infoEdPurW9',
        {
          userId,
          CodePursuing9,
        }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            CodePursuing9,
          };
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  // Edit Pursuing winter
  editUserInfoPurW10(userId: string, CodePursuing10: string): any {
    this.http
      .put<{ message: string; post: AuthDataInfo }>(
        'https://www.skalarly.com/api/user/infoEdPurW10',
        {
          userId,
          CodePursuing10,
        }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            CodePursuing10,
          };
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }

  // Edit Pursuing
  editUserInfoPurSp11(userId: string, CodePursuing11: string): any {
    this.http
      .put<{ message: string; post: AuthDataInfo }>(
        'https://www.skalarly.com/api/user/infoEdPurSpring11',
        { userId, CodePursuing11 }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            CodePursuing11,
          };
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  // Edit Pursuing
  editUserInfoPurSp12(userId: string, CodePursuing12: string): any {
    this.http
      .put<{ message: string; post: AuthDataInfo }>(
        'https://www.skalarly.com/api/user/infoEdPurSpring12',
        { userId, CodePursuing12 }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            CodePursuing12,
          };
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  // Edit Pursuing
  editUserInfoPurSu13(userId: string, CodePursuing13: string): any {
    this.http
      .put<{ message: string; post: AuthDataInfo }>(
        'https://www.skalarly.com/api/user/infoEdPurSummer13',
        { userId, CodePursuing13 }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            CodePursuing13,
          };
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
  // Edit Pursuing
  editUserInfoPurSu14(userId: string, CodePursuing14: string): any {
    this.http
      .put<{ message: string; post: AuthDataInfo }>(
        'https://www.skalarly.com/api/user/infoEdPurSummer14',
        { userId, CodePursuing14 }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            CodePursuing14,
          };
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
        'https://www.skalarly.com/api/user/info',
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
        'https://www.skalarly.com/api/user/infoProfile',
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
        'https://www.skalarly.com/api/user/infoMessage',
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
        'https://www.skalarly.com/api/user/infoPersonal',
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
        'https://www.skalarly.com/api/user/id',
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
        'https://www.skalarly.com/api/user/login',
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
        'https://www.skalarly.com/api/user/login1',
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
    if (expirationDate === '0') {
      this.logout();
      this.snackBar.open('Validation Expired', 'Please Relogin', {
        duration: 3000,
      });
    } else {
      if (!token || !expirationDate) {
        this.logout();
        this.snackBar.open('Welcome To Skalarly', '😃', {
          duration: 3000,
        });
      }
      return {
        token,
        expirationDate: new Date(expirationDate),
        userId,
      };
    }
  }

  // Reset Password
  resetPassword(email: string): any {
    this.snackBar.open('Check your email to reset your password.', 'Will do');
    const authData: AuthData = { email };
    this.http
      .post('https://www.skalarly.com/api/user/forgot', authData)
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
      .post('https://www.skalarly.com/api/user/reset-password', authData)
      .subscribe({
        next: () => {
          const snackBarRef = this.snackBar.open(
            'Password has been changed',
            'Login',
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
    this.http.post('https://www.skalarly.com/api/user/delete', del).subscribe({
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

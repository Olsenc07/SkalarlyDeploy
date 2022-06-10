import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthData, AuthDataInfo } from '../signup/auth-data.model';
import { Subject, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppRoutingModule } from '../app-routing.module';

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
  private authStatusListener = new Subject<boolean>();

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

  getAuthStatusListener(): any {
    return this.authStatusListener.asObservable();
  }

  // User and their info
  createUser(email: string, username: string, password: string): any {
    const authData: AuthData = { email, username, password };
    this.http
      .post('http://localhost:3000/api/user/signup', authData)
      .subscribe({
        next: () => {
          this.snackBar.open(
            'Check your email and junk mail to verify your account before logining in',
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
          snackBarRef.afterDismissed().subscribe(() => {
            window.location.reload();
          });
        },
      });
  }

  // Create userinfo
  createUserInfo(
    username: string,
    name: string,
    gender: string,
    birthday: string,
    major: string,
    minor: string,
    sport: string,
    club: string,
    pronouns: string,
    CodeCompleted: string,
    CodePursuing: string,
    profilePic: File,
    showCase: File,
    followers: string,
    followings: string,
    Creator?: string
  ): any {
    const authDataInfo: AuthDataInfo = {
      Creator,
      username,
      name,
      gender,
      birthday,
      major,
      minor,
      sport,
      club,
      pronouns,
      CodeCompleted,
      CodePursuing,
      profilePic,
      showCase,
      followers,
      followings,
    };
    const userData = new FormData();
    userData.append('username', username);
    userData.append('name', name);
    userData.append('gender', gender);
    userData.append('birthday', birthday);
    userData.append('major', major);
    userData.append('minor', minor);
    userData.append('sport', sport);
    userData.append('club', club);
    userData.append('pronouns', pronouns);
    userData.append('CodeCompleted', CodeCompleted);
    userData.append('CodePursuing', CodePursuing);
    userData.append('profilePic', profilePic);
    userData.append('showCase', showCase);
    userData.append('followers', followers);
    userData.append('followings', followings);

    this.http
      .post<{ message: string; post: AuthDataInfo }>(
        'http://localhost:3000/api/user/info',
        userData
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            username,
            name,
            gender,
            birthday,
            major,
            minor,
            sport,
            club,
            pronouns,
            CodeCompleted,
            CodePursuing,
            followers,
            followings,
            ProfilePicPath: responseData.post.ProfilePicPath,
            ShowCasePath: responseData.post.ShowCasePath,
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

  getInfoUpdateListener(): any {
    return this.infosUpdated.asObservable();
  }
  // Your info
  getInfo(): any {
    this.http
      .get<{ message: string; infos: any }>(
        'http://localhost:3000/api/user/info'
      )
      .pipe(
        map((infosData) => {
          return infosData.infos.map((info) => {
            return {
              id: info._id,
              username: info.username,
              name: info.name,
              gender: info.gender,
              birthday: info.birthday,
              major: info.major,
              minor: info.minor,
              sport: info.sport,
              club: info.club,
              pronouns: info.pronouns,
              CodeCompleted: info.CodeCompleted,
              CodePursuing: info.CodePursuing,
              ProfilePicPath: info.ProfilePicPath,
              ShowCasePath: info.ShowCasePath,
              Followers: info.followers,
              Followings: info.followings,
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

  getOtherInfo(id): any {
    this.http
      .get<{ message: string; infos: any }>(
        'http://localhost:3000/api/user/id',
        { params: { id: id } }
      )
      .pipe(
        map((infosData) => {
          return infosData.infos.map((info) => {
            return {
              id: info._id,
              username: info.username,
              name: info.name,
              gender: info.gender,
              birthday: info.birthday,
              major: info.major,
              minor: info.minor,
              sport: info.sport,
              club: info.club,
              pronouns: info.pronouns,
              CodeCompleted: info.CodeCompleted,
              CodePursuing: info.CodePursuing,
              ProfilePicPath: info.ProfilePicPath,
              ShowCasePath: info.ShowCasePath,
              Followers: info.followers,
              Followings: info.followings,
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
        'http://localhost:3000/api/user/login',
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
            console.log(expirationDate);
            console.log(this.token);
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
  loginFirst(email: string, password: string): any {
    const authData: AuthData = { email, password };
    this.http
      .post<{ token: string; expiresIn: number; userId: string }>(
        'http://localhost:3000/api/user/login1',
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
    console.log(this.token);
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

  private getAuthData(): any {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');
    if (!token || !expirationDate) {
      return;
    }
    return {
      token,
      expirationDate: new Date(expirationDate),
      userId,
    };
  }

  // Reset Password
  resetPassword(email: string): any {
    this.snackBar.open('Check your email to reset your password', 'Will do!');
    const authData: AuthData = { email };
    this.http
      .post('http://localhost:3000/api/user/forgot', authData)
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
      .post('http://localhost:3000/api/user/reset-password', authData)
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
          this.snackBar.open('Invalid reset code', 'Check your email', {
            duration: 3000,
          });
          this.authStatusListener.next(false);
        },
      });
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData, AuthDataInfo } from '../signup/auth-data.model';
import { Subject, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class AuthServiceEdit {
  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  private infosUpdated = new ReplaySubject<AuthDataInfo[]>();
  private authStatusListener = new ReplaySubject<boolean>();
  private infos: AuthDataInfo[] = [];
  editUserMajor(userId: string, major: string): any {
    const userData = new FormData();
    userData.append('major', major);
    this.http
      .post<{ message: string; post: AuthDataInfo }>(
        'http://www.skalarly.com/api/user/infoMajor',
        userData,
        { params: { userId } }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            major,
          };
          this.snackBar.open('Major cleared!', 'Nice!', {
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
  editUserMinor(userId: string, minor: string): any {
    const userData = new FormData();
    userData.append('minor', minor);
    this.http
      .post<{ message: string; post: AuthDataInfo }>(
        'http://www.skalarly.com/api/user/infoMinor',
        userData,
        { params: { userId } }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            minor,
          };
          this.snackBar.open('Minor cleared!', 'Nice!', {
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
  editUserClub(userId: string, club: string): any {
    const userData = new FormData();
    userData.append('club', club);
    this.http
      .post<{ message: string; post: AuthDataInfo }>(
        'http://www.skalarly.com/api/user/infoClub',
        userData,
        { params: { userId } }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            club,
          };
          this.snackBar.open('Club cleared!', 'Nice!', {
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
  editUserSport(userId: string, sport: string): any {
    const userData = new FormData();
    userData.append('sport', sport);
    this.http
      .post<{ message: string; post: AuthDataInfo }>(
        'http://www.skalarly.com/api/user/infoSport',
        userData,
        { params: { userId } }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            sport,
          };
          this.snackBar.open('Sport cleared!', 'Nice!', {
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
}

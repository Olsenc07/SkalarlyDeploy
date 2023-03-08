import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthDataInfo } from '../signup/auth-data.model';
import { ReplaySubject } from 'rxjs';

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
    const sub = this.http
      .patch<{ message: string; post: AuthDataInfo }>(
        'https://www.skalarly.com/api/user/infoMajor',
        { userId, major }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            major,
          };

          this.infos.push(post);
          this.infosUpdated.next([...this.infos]);
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
    sub.unsubscribe();
    console.log('love you 1');
  }
  editUserMinor(userId: string, minor: string): any {
    const sub = this.http
      .patch<{ message: string; post: AuthDataInfo }>(
        'https://www.skalarly.com/api/user/infoMinor',
        { userId, minor }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            minor,
          };
          this.infos.push(post);
          this.infosUpdated.next([...this.infos]);
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
    sub.unsubscribe();
    console.log('love you 2');
  }
  editUserClub(userId: string, club: string): any {
    const sub = this.http
      .patch<{ message: string; post: AuthDataInfo }>(
        'https://www.skalarly.com/api/user/infoClub',
        { userId, club }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            club,
          };
          this.infos.push(post);
          this.infosUpdated.next([...this.infos]);
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
    sub.unsubscribe();
    console.log('love you 3');
  }
  editUserSport(userId: string, sport: string): any {
    const sub = this.http
      .patch<{ message: string; post: AuthDataInfo }>(
        'https://www.skalarly.com/api/user/infoSport',
        { userId, sport }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            sport,
          };
          this.infos.push(post);
          this.infosUpdated.next([...this.infos]);
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
    sub.unsubscribe();
    console.log('love you 4');
  }
  editUserBio(userId: string, bio: string): any {
    const sub = this.http
      .patch<{ message: string; post: AuthDataInfo }>(
        'https://www.skalarly.com/api/user/infoBio',
        { userId, bio }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            bio,
          };
          this.infos.push(post);
          this.infosUpdated.next([...this.infos]);
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
    sub.unsubscribe();
    console.log('love you 5');
  }
  editUserName(userId: string, name: string): any {
    const sub = this.http
      .patch<{ message: string; post: AuthDataInfo }>(
        'https://www.skalarly.com/api/user/infoName',
        { userId, name }
      )
      .subscribe({
        next: (responseData) => {
          const post: AuthDataInfo = {
            id: responseData.post.id,
            name,
          };
          this.infos.push(post);
          this.infosUpdated.next([...this.infos]);
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
    sub.unsubscribe();
    console.log('love you 6');
  }
}

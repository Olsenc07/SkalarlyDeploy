import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthData, AuthDataInfo } from '../signup/auth-data.model';
import { Subject, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppRoutingModule } from '../app-routing.module';

@Injectable({ providedIn: 'root' })
export class FollowService {
  private followNotif: AuthDataInfo[] = [];
  private followUpdated = new ReplaySubject<AuthDataInfo[]>();

  private userId: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  getInfoFollow(userId: string, username: string): any {
    console.log('chazzz', username);
    this.http
      .get<{ message: string; infos: any }>(
        'http://localhost:3000/api/follow/infoFollow',
        { params: { userId, username } }
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
              Followers: info.followers,
              Followings: info.followings,
              Creator: info.Creator,
            };
          });
        })
      )
      .subscribe((transformedInfos) => {
        this.followNotif = transformedInfos;
        this.followUpdated.next([...this.followNotif]);
      });
  }
}

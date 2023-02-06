import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData, AuthDataInfo } from '../signup/auth-data.model';
import { Subject, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class FilterSearchService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  private infos: AuthDataInfo[] = [];
  private infosUpdated = new ReplaySubject<AuthDataInfo[]>();

  getInfoUpdateListener(): any {
    return this.infosUpdated.asObservable();
  }

  filterSearchName(searchName: string): any {
    this.http
      .get<{ message: string; infos: any }>(
        'https://www.skalarly.com/api/filter/filterSearchName',
        {
          params: { searchName },
        }
      )
      .pipe(
        map((infosData) => {
          return infosData.infos.map((info) => {
            return {
              id: info._id,
              username: info.username,
              name: info.name,
              major: info.major,
              minor: info.minor,
              sport: info.sport,
              club: info.club,
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
  //   Major
  filterSearchMajor(searchMajor: string): any {
    this.http
      .get<{ message: string; infos: any }>(
        'https://www.skalarly.com/api/filter/filterSearchMajor',
        {
          params: { searchMajor },
        }
      )
      .pipe(
        map((infosData) => {
          return infosData.infos.map((info) => {
            return {
              id: info._id,
              username: info.username,
              name: info.name,
              major: info.major,
              minor: info.minor,
              sport: info.sport,
              club: info.club,
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
  //   Minor
  filterSearchMinor(searchMinor: string): any {
    this.http
      .get<{ message: string; infos: any }>(
        'https://www.skalarly.com/api/filter/filterSearchMinor',
        {
          params: { searchMinor },
        }
      )
      .pipe(
        map((infosData) => {
          return infosData.infos.map((info) => {
            return {
              id: info._id,
              username: info.username,
              name: info.name,
              major: info.major,
              minor: info.minor,
              sport: info.sport,
              club: info.club,
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
  //   Major
  filterSearchSport(searchSport: string): any {
    this.http
      .get<{ message: string; infos: any }>(
        'https://www.skalarly.com/api/filter/filterSearchSport',
        {
          params: { searchSport },
        }
      )
      .pipe(
        map((infosData) => {
          return infosData.infos.map((info) => {
            return {
              id: info._id,
              username: info.username,
              name: info.name,
              major: info.major,
              minor: info.minor,
              sport: info.sport,
              club: info.club,
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
  //   Club
  filterSearchClub(searchClub: string): any {
    this.http
      .get<{ message: string; infos: any }>(
        'https://www.skalarly.com/api/filter/filterSearchClub',
        {
          params: { searchClub },
        }
      )
      .pipe(
        map((infosData) => {
          return infosData.infos.map((info) => {
            return {
              id: info._id,
              username: info.username,
              name: info.name,
              major: info.major,
              minor: info.minor,
              sport: info.sport,
              club: info.club,
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
}

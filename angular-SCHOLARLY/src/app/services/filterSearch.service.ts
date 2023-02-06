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

  filterSearchName(name: string): any {
    this.http
      .get<{ message: string; infos: any }>(
        'https://www.skalarly.com/api/filter/filterSearchName',
        {
          params: { name },
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
  filterSearchMajor(major: string): any {
    this.http
      .get<{ message: string; infos: any }>(
        'https://www.skalarly.com/api/filter/filterSearchMajor',
        {
          params: { major },
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
  filterSearchMinor(minor: string): any {
    this.http
      .get<{ message: string; infos: any }>(
        'https://www.skalarly.com/api/filter/filterSearchMinor',
        {
          params: { minor },
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
  filterSearchSport(sport: string): any {
    this.http
      .get<{ message: string; infos: any }>(
        'https://www.skalarly.com/api/filter/filterSearchSport',
        {
          params: { sport },
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
  filterSearchClub(club: string): any {
    this.http
      .get<{ message: string; infos: any }>(
        'https://www.skalarly.com/api/filter/filterSearchClub',
        {
          params: { club },
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
  //   name and major
  filterSearchNameMajor(name: string, major: string): any {
    this.http
      .get<{ message: string; infos: any }>(
        'https://www.skalarly.com/api/filter/filterSearchNameMajor',
        {
          params: { name, major },
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
  //   name and minor
  filterSearchNameMinor(name: string, minor: string): any {
    this.http
      .get<{ message: string; infos: any }>(
        'https://www.skalarly.com/api/filter/filterSearchNameMinor',
        {
          params: { name, minor },
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
  //   name and minor
  filterSearchNameSport(name: string, sport: string): any {
    this.http
      .get<{ message: string; infos: any }>(
        'https://www.skalarly.com/api/filter/filterSearchNameSport',
        {
          params: { name, sport },
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
  //   name and minor
  filterSearchNameClub(name: string, club: string): any {
    this.http
      .get<{ message: string; infos: any }>(
        'https://www.skalarly.com/api/filter/filterSearchNameClub',
        {
          params: { name, club },
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
  //   major and sport
  filterSearchMajorSport(major: string, sport: string): any {
    this.http
      .get<{ message: string; infos: any }>(
        'https://www.skalarly.com/api/filter/filterSearchMajorSport',
        {
          params: { major, sport },
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
  //   major and club
  filterSearchMajorClub(major: string, club: string): any {
    this.http
      .get<{ message: string; infos: any }>(
        'https://www.skalarly.com/api/filter/filterSearchMajorClub',
        {
          params: { major, club },
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
  //   minor and club
  filterSearchMinorClub(minor: string, club: string): any {
    this.http
      .get<{ message: string; infos: any }>(
        'https://www.skalarly.com/api/filter/filterSearchMinorClub',
        {
          params: { minor, club },
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
  //   sport and club
  filterSearchSportClub(sport: string, club: string): any {
    this.http
      .get<{ message: string; infos: any }>(
        'https://www.skalarly.com/api/filter/filterSearchSportClub',
        {
          params: { sport, club },
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
  //   sport and club
  filterSearchSportMinor(sport: string, minor: string): any {
    this.http
      .get<{ message: string; infos: any }>(
        'https://www.skalarly.com/api/filter/filterSearchSportMinor',
        {
          params: { sport, minor },
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

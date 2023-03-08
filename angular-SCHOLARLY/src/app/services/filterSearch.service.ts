import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthDataInfo } from '../signup/auth-data.model';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class FilterSearchService {
  constructor(private http: HttpClient) {}

  private infos: AuthDataInfo[] = [];
  private infosUpdated = new ReplaySubject<AuthDataInfo[]>();

  getInfoUpdateListener(): any {
    return this.infosUpdated.asObservable();
  }

  filterSearchName(name: string): any {
    const sub = this.http
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
    sub.unsubscribe();
    console.log('love you 1');
  }
  //   Major
  filterSearchMajor(major: string): any {
    const sub = this.http
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
    sub.unsubscribe();
    console.log('love you 2');
  }
  //   Minor
  filterSearchMinor(minor: string): any {
    const sub = this.http
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
    sub.unsubscribe();
    console.log('love you 3');
  }
  //   Major
  filterSearchSport(sport: string): any {
    const sub = this.http
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
    sub.unsubscribe();
    console.log('love you 4');
  }
  //   Club
  filterSearchClub(club: string): any {
    const sub = this.http
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
    sub.unsubscribe();
    console.log('love you 5');
  }
  //   name and major
  filterSearchNameMajor(name: string, major: string): any {
    const sub = this.http
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
    sub.unsubscribe();
    console.log('love you 6');
  }
  //   name and minor
  filterSearchNameMinor(name: string, minor: string): any {
    const sub = this.http
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
    sub.unsubscribe();
    console.log('love you 7');
  }
  //   name and minor
  filterSearchNameSport(name: string, sport: string): any {
    const sub = this.http
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
    sub.unsubscribe();
    console.log('love you 8');
  }
  //   name and minor
  filterSearchNameClub(name: string, club: string): any {
    const sub = this.http
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
    sub.unsubscribe();
    console.log('love you 9');
  }
  //   major and sport
  filterSearchMajorSport(major: string, sport: string): any {
    const sub = this.http
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
    sub.unsubscribe();
    console.log('love you 10');
  }
  //   major and club
  filterSearchMajorClub(major: string, club: string): any {
    const sub = this.http
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
    sub.unsubscribe();
    console.log('love you 11');
  }
  //   minor and club
  filterSearchMinorClub(minor: string, club: string): any {
    const sub = this.http
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
    sub.unsubscribe();
    console.log('love you 12');
  }
  //   sport and club
  filterSearchSportClub(sport: string, club: string): any {
    const sub = this.http
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
    sub.unsubscribe();
    console.log('love you 13');
  }
  //   sport and minor
  filterSearchSportMinor(sport: string, minor: string): any {
    const sub = this.http
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
    sub.unsubscribe();
    console.log('love you 14');
  }
  //   sport and club
  filterSearchMajorMinor(major: string, minor: string): any {
    const sub = this.http
      .get<{ message: string; infos: any }>(
        'https://www.skalarly.com/api/filter/filterSearchMajorMinor',
        {
          params: { major, minor },
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
    sub.unsubscribe();
    console.log('love you 15');
  }
  //  name,major,minor
  filterSearchNameMajorMinor(name: string, major: string, minor: string): any {
    const sub = this.http
      .get<{ message: string; infos: any }>(
        'https://www.skalarly.com/api/filter/filterSearchNameMajorMinor',
        {
          params: { name, major, minor },
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
    sub.unsubscribe();
    console.log('love you 16');
  }
  //  sport,major,minor
  filterSearchSportMajorMinor(
    sport: string,
    major: string,
    minor: string
  ): any {
    const sub = this.http
      .get<{ message: string; infos: any }>(
        'https://www.skalarly.com/api/filter/filterSearchSportMajorMinor',
        {
          params: { sport, major, minor },
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
    sub.unsubscribe();
    console.log('love you 17');
  }
  //  sport,club,minor
  filterSearchSportClubMinor(sport: string, club: string, minor: string): any {
    const sub = this.http
      .get<{ message: string; infos: any }>(
        'https://www.skalarly.com/api/filter/filterSearchSportClubMinor',
        {
          params: { sport, club, minor },
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
    sub.unsubscribe();
    console.log('love you 18');
  }
  //  sport,club,major
  filterSearchMajorClubName(major: string, club: string, name: string): any {
    const sub = this.http
      .get<{ message: string; infos: any }>(
        'https://www.skalarly.com/api/filter/filterSearchMajorClubName',
        {
          params: { major, club, name },
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
    sub.unsubscribe();
    console.log('love you 19');
  }
  //  sport,club,name
  filterSearchSportClubName(sport: string, club: string, name: string): any {
    const sub = this.http
      .get<{ message: string; infos: any }>(
        'https://www.skalarly.com/api/filter/filterSearchSportClubName',
        {
          params: { sport, club, name },
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
    sub.unsubscribe();
    console.log('love you 20');
  }
  //  sport,club,major
  filterSearchSportMajorName(sport: string, major: string, name: string): any {
    const sub = this.http
      .get<{ message: string; infos: any }>(
        'https://www.skalarly.com/api/filter/filterSearchSportMajorName',
        {
          params: { sport, major, name },
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
    sub.unsubscribe();
    console.log('love you 21');
  }
  //  sport,club,minor
  filterSearchSportMinorName(sport: string, minor: string, name: string): any {
    const sub = this.http
      .get<{ message: string; infos: any }>(
        'https://www.skalarly.com/api/filter/filterSearchSportMinorName',
        {
          params: { sport, minor, name },
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
    sub.unsubscribe();
    console.log('love you 22');
  }
  //  name,club,minor
  filterSearchClubMinorName(club: string, minor: string, name: string): any {
    const sub = this.http
      .get<{ message: string; infos: any }>(
        'https://www.skalarly.com/api/filter/filterSearchClubMinorName',
        {
          params: { club, minor, name },
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
    sub.unsubscribe();
    console.log('love you 23');
  }
  //  major,sport,club
  filterSearchMajorSportClub(major: string, sport: string, club: string): any {
    const sub = this.http
      .get<{ message: string; infos: any }>(
        'https://www.skalarly.com/api/filter/filterSearchMajorSportClub',
        {
          params: { major, sport, club },
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
    sub.unsubscribe();
    console.log('love you 24');
  }
  //  major,minor,club
  filterSearchMajorMinorClub(major: string, minor: string, club: string): any {
    const sub = this.http
      .get<{ message: string; infos: any }>(
        'https://www.skalarly.com/api/filter/filterSearchMajorMinorClub',
        {
          params: { major, minor, club },
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
    sub.unsubscribe();
    console.log('love you 25');
  }
  //  name,major,minor,sport
  filterSearchNameMajorMinorSport(
    name: string,
    major: string,
    minor: string,
    sport: string
  ): any {
    const sub = this.http
      .get<{ message: string; infos: any }>(
        'https://www.skalarly.com/api/filter/filterSearchNameMajorMinorSport',
        {
          params: { name, major, minor, sport },
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
    sub.unsubscribe();
    console.log('love you 26');
  }
  //  major,minor,sport,club
  filterSearchMajorMinorSportClub(
    major: string,
    minor: string,
    sport: string,
    club: string
  ): any {
    const sub = this.http
      .get<{ message: string; infos: any }>(
        'https://www.skalarly.com/api/filter/filterSearchMajorMinorSportClub',
        {
          params: { major, minor, sport, club },
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
    sub.unsubscribe();
    console.log('love you 27');
  }
  //  major,minor,sport,club
  filterSearchNameMinorSportClub(
    name: string,
    minor: string,
    sport: string,
    club: string
  ): any {
    const sub = this.http
      .get<{ message: string; infos: any }>(
        'https://www.skalarly.com/api/filter/filterSearchNameMinorSportClub',
        {
          params: { name, minor, sport, club },
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
    sub.unsubscribe();
    console.log('love you 28');
  }
  //   name, major,minor, club
  filterSearchNameMajorMinorClub(
    club: string,
    name: string,
    minor: string,
    major: string
  ): any {
    const sub = this.http
      .get<{ message: string; infos: any }>(
        'https://www.skalarly.com/api/filter/filterSearchNameMajorMinorClub',
        {
          params: { club, name, minor, major },
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
    sub.unsubscribe();
    console.log('love you 29');
  }
  //   name, major,sport, club
  filterSearchNameMajorSportClub(
    club: string,
    name: string,
    sport: string,
    major: string
  ): any {
    const sub = this.http
      .get<{ message: string; infos: any }>(
        'https://www.skalarly.com/api/filter/filterSearchNameMajorSportClub',
        {
          params: { club, name, sport, major },
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
    sub.unsubscribe();
    console.log('love you 30');
  }
  //   name, major,minor,sport, club
  filterSearchNameMajorMinorSportClub(
    club: string,
    name: string,
    sport: string,
    major: string,
    minor: string
  ): any {
    const sub = this.http
      .get<{ message: string; infos: any }>(
        'https://www.skalarly.com/api/filter/filterSearchNameMajorMinorSportClub',
        {
          params: { club, name, sport, major, minor },
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
    sub.unsubscribe();
    console.log('love you 31');
  }
}

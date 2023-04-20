import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { ReplaySubject, Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
export interface UserNames {
  _id: string;
  username: string;
  major: string;
  name: string;
  following: boolean;
  Creator: string;
}
export interface Hashtags {
  _id: string;
  Hashtag1: string;
  Hashtag2: string;
  Hashtag3: string;
  Hashtag4: string;
  Hashtag5: string;
}

export interface Fav {
  userId?: string;
  category?: string;
  hashtag?: string;
}
@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}
  private notifUpdated = new ReplaySubject();
  private notifId: string;
  private meanRanking: number;
  private meanGraders: number;
  private meanProfessionalismGraders: number;
  private meanKnowlegdeGraders: number;

  private instructorsPrograms: Array<string>;
  private instructorsCourse: boolean;

  private rankingUpdated = new Subject();
  private rankingGraders = new Subject();
  private instructorsProgs = new Subject();
  private instructorsCourses = new Subject();
  private rankingKnowlegdeGraders = new Subject();
  private rankingProfGraders = new Subject();

  private instructorProgramsSearch: Array<string>;
  private rankingUpdatedSearch = new Subject();

  private instructorProgramsSearchNumber: Number;
  private rankingUpdatedSearchNumber = new Subject();

  private favsListener = new Subject<Fav[]>();
  private favs: Fav[] = [];
  private favsListenerSingle = new Subject<Fav>();

  private favsSingle: Fav = {};

  private userUpdated = new ReplaySubject();
  private userId: string;

  private userFollowing = new Subject<Array<boolean>>();
  private following: boolean;

  private hashUpdated = new ReplaySubject();
  private hashId: string;
  getNotifId(): any {
    return this.notifUpdated.asObservable();
  }
  getFavsListener(): any {
    return this.favsListener.asObservable();
  }
  getFavsListenerSingle(): any {
    return this.favsListenerSingle.asObservable();
  }
  getUserId(): any {
    return this.userUpdated.asObservable();
  }
  getUserFollowing(): any {
    return this.userFollowing.asObservable();
  }
  getHashs(): any {
    return this.hashUpdated.asObservable();
  }
  getMeanRanking(): any {
    return this.rankingUpdated.asObservable();
  }
  getMeanGraders(): any {
    return this.rankingGraders.asObservable();
  }
  getKnowledgeGraders(): any {
    return this.rankingKnowlegdeGraders.asObservable();
  }
  getProfGraders(): any {
    return this.rankingProfGraders.asObservable();
  }
  getInstructorsPrograms(): any {
    return this.instructorsProgs.asObservable();
  }
  getInstructorsCourse(): any {
    return this.instructorsCourses.asObservable();
  }

  getInstructorsProgramsSearch(): any {
    return this.rankingUpdatedSearch.asObservable();
  }
  getInstructorsProgramsSearchNumber(): any {
    return this.rankingUpdatedSearchNumber.asObservable();
  }
  searchUsers(query: string, userId: string): any {
    const sub = this.http
      .get<{ messages: string; payload: string }>(
        'https://www.skalarly.com/api/user/getusers',
        {
          params: { query, userId },
        }
      )
      .pipe(map((data) => data.payload))
      .subscribe({
        next: (response) => {
          console.log('chlor', response);
          this.userId = response;
          this.userUpdated.next(this.userId);
          sub.unsubscribe();
          console.log('eazy 1');
        },
        // console.log('trans', transformedInfos.Creator);

        // this.notifId = transformedInfos.Creator;
        // console.log('hello', this.notifId);
        // this.notifUpdated.next(this.notifId);
      });
  }
  checkFollowing(userId: string, othersUsername: string): any {
    const sub = this.http
      .get<{ messages: string; following: boolean }>(
        'https://www.skalarly.com/api/user/checkFollowing',
        {
          params: { userId, othersUsername },
        }
      )
      .pipe(map((data) => data.following))
      .subscribe({
        next: (response) => {
          console.log('chlor', response);
          this.following = response;
          this.userFollowing.pipe(
            tap((currentList) => {
              currentList.push(this.following);
            })
          );
          console.log('gooosbeumps', this.userFollowing);
          sub.unsubscribe();
          console.log('eazy 1');
        },
        // console.log('trans', transformedInfos.Creator);

        // this.notifId = transformedInfos.Creator;
        // console.log('hello', this.notifId);
        // this.notifUpdated.next(this.notifId);
      });
  }
  // Hashtag search
  searchHashs(queryHash: string): any {
    console.log('my girl', queryHash);
    const sub = this.http
      .get<{ messages: string; payload: string }>(
        'https://www.skalarly.com/api/user/gethashs',
        { params: { queryHash } }
      )
      .pipe(map((data) => data.payload))
      .subscribe({
        next: (response) => {
          console.log('chlor 2', response);
          this.hashId = response;
          this.hashUpdated.next(this.hashId);
          sub.unsubscribe();
          console.log('eazy 2');
        },
        // console.log('trans', transformedInfos.Creator);

        // this.notifId = transformedInfos.Creator;
        // console.log('hello', this.notifId);
        // this.notifUpdated.next(this.notifId);
      });
  }

  checkNotification(id: string): any {
    const sub = this.http
      .get<{ infos: any }>('https://www.skalarly.com/api/posts/checkNotif', {
        params: { id },
      })
      .pipe(
        map((infosData) => {
          console.log('months', infosData);
          return infosData.infos;
        })
      )
      .subscribe({
        next: (response) => {
          console.log('chlor', response);
          this.notifId = response;
          this.notifUpdated.next(this.notifId);
          sub.unsubscribe();
          console.log('eazy 3');
        },
        // console.log('trans', transformedInfos.Creator);

        // this.notifId = transformedInfos.Creator;
        // console.log('hello', this.notifId);
        // this.notifUpdated.next(this.notifId);
      });
  }
  deleteNotif(id: string): any {
    console.log('right here', id);
    const sub = this.http
      .delete<{ message: string; infos: any }>(
        'https://www.skalarly.com/api/posts/deleteNotif/' + id
      )
      .subscribe((transformedInfos) => {
        this.snackBar.open('Notifications Off', '🔕', {
          duration: 3000,
        });
        sub.unsubscribe();
        console.log('eazy 4');
      });
  }

  // Adding subscription to get notifcations
  addFavsNew(userId: string, category: string, hashtag: string): any {
    console.log('1', userId);
    console.log('2', category);
    console.log('3', hashtag);
    const authData = { userId, category, hashtag };
    const sub = this.http
      .post<{ message: string; favs: any }>(
        'https://www.skalarly.com/api/subscribe/favsNew',
        authData
      )
      .subscribe({
        next: (response) => {
          console.log('never miss', response);
          this.favsListenerSingle.next(response.favs);
          sub.unsubscribe();
          console.log('love you 97');
        },
        error: (err) => {
          console.log('Unable to add fav!');
        },
      });
  }
  // delete fav main and hash
  unSaveFavs(id: string): any {
    const sub = this.http
      .delete<{ message: string; favs: any }>(
        'https://www.skalarly.com/api/subscribe/deleteFavs/' + id
      )
      .pipe(
        map((data) => {
          return data.favs;
        })
      )
      .subscribe((response) => {
        console.log('hey ya', response);
        this.favs = response;
        this.favsListener.next([...this.favs]);
        sub.unsubscribe();
        console.log('eazy 420');
      });
  }
  // for search screen
  getFavsList(userId: string): any {
    const sub = this.http
      .get<{ message: string; favs: any }>(
        'https://www.skalarly.com/api/subscribe/favsList',
        {
          params: { userId },
        }
      )
      .pipe(
        map((data) => {
          return data.favs;
        })
      )
      .subscribe({
        next: (response) => {
          console.log('chlor 1234567', response);
          this.favs = response;
          this.favsListener.next([...this.favs]);
          sub.unsubscribe();
          console.log('eazy 100');
        },
      });
  }
  // for main pgs
  getFavsListMain(userId: string, category: string): any {
    console.log('cold as ice', userId);
    console.log('cold as hot', category);

    const sub = this.http
      .get<{ message: string; favs: any }>(
        'https://www.skalarly.com/api/subscribe/favsListMain',
        {
          params: { userId, category },
        }
      )
      .pipe(
        map((data) => {
          return data.favs;
        })
      )
      .subscribe({
        next: (response) => {
          console.log('chlor 54', response);
          this.favsSingle = response;
          this.favsListenerSingle.next(this.favsSingle);
          sub.unsubscribe();
          console.log('eazy 1001');
        },
      });
  }
  // for main pgs
  getFavsListHashtag(userId: string, hashtag: string): any {
    const sub = this.http
      .get<{ message: string; favs: any }>(
        'https://www.skalarly.com/api/subscribe/favsListHashtag',
        {
          params: { userId, hashtag },
        }
      )
      .pipe(
        map((data) => {
          return data.favs;
        })
      )
      .subscribe({
        next: (response) => {
          console.log('chlor 76', response);
          this.favsSingle = response;
          this.favsListenerSingle.next(this.favsSingle);
          sub.unsubscribe();
          console.log('eazy 1010');
        },
      });
  }
  // Instrctors mean ranking
  // getting main page posts non instructro review
  rankingMean(category: string): any {
    const sub = this.http
      .get<{
        message: string;
        mean: number;
        graders: number;
        // knowledge and quality
        knowledge: number;
        // professionalism and difficulty
        professionalism: number;
        programs: Array<string>;
        course: boolean;
      }>('https://www.skalarly.com/api/posts/instructorRanking', {
        params: { category },
      })
      .pipe(
        map((postData) => {
          // .mean;
          return postData;
        })
      )
      .subscribe((transformedPosts) => {
        console.log('all my sheep dead', transformedPosts);
        this.meanGraders = transformedPosts.graders;
        this.rankingGraders.next(this.meanGraders);
        // knowlegde and quality
        this.meanKnowlegdeGraders = transformedPosts.knowledge;
        this.rankingKnowlegdeGraders.next(this.meanKnowlegdeGraders);
        //  professionalism and difficulty
        this.meanProfessionalismGraders = transformedPosts.professionalism;
        this.rankingProfGraders.next(this.meanProfessionalismGraders);
        // programs
        this.instructorsPrograms = transformedPosts.programs;
        this.instructorsProgs.next(this.instructorsPrograms);
        // Course
        this.instructorsCourse = transformedPosts.course;
        this.instructorsCourses.next(this.instructorsCourse);
        // overall grade
        this.meanRanking = transformedPosts.mean;
        this.rankingUpdated.next(this.meanRanking);
        sub.unsubscribe();
        console.log('eazy 8');
      });
  }

  // Instructors program rating search
  // Instrctors mean ranking
  // getting main page posts non instructro review
  searchInstructorsProg(payload: string, program: string): any {
    const sub = this.http
      .get<{
        message: string;
        options: Array<string>;
        backup: number;
      }>('https://www.skalarly.com/api/posts/instructorProgramSearch', {
        params: { payload, program },
      })
      .pipe(
        map((postData) => {
          return postData;
        })
      )
      .subscribe((transformedPosts) => {
        console.log('all my sheep dead except sally', transformedPosts.options);

        this.instructorProgramsSearch = transformedPosts.options;
        this.rankingUpdatedSearch.next(this.instructorProgramsSearch);

        this.instructorProgramsSearchNumber = transformedPosts.backup;
        this.rankingUpdatedSearchNumber.next(
          this.instructorProgramsSearchNumber
        );
        sub.unsubscribe();
        console.log('eazy 8');
      });
  }
}

import { Injectable, OnDestroy } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface ShowCase {
  id?: string;
  Creator?: string;
  showCase?: File;
  video?: File;
  ShowCasePath?: string;
  VideoPath?: string;

  // ShowCasePath?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ShowCaseService implements OnDestroy {
  private showCases: ShowCase[] = [];
  private postsUpdated = new ReplaySubject<ShowCase[]>();
  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  // unsubscribe
  ngOnDestroy(): any {
    this.postsUpdated.unsubscribe();
    console.log('wallys calling');
  }

  getshowCaseUpdateListener(): any {
    return this.postsUpdated.asObservable();
  }
  getShowCasePersonal(userId: string, counter: number): any {
    const sub = this.http
      .get<{ message: string; showCases: any }>(
        'https://www.skalarly.com/api/posts/showCasesPersonal',
        { params: { userId, counter } }
      )
      .pipe(
        map((showCaseData) => {
          return showCaseData.showCases.map((showCase) => {
            return {
              id: showCase._id,
              ShowCasePath: showCase.ShowCasePath,
              VideoPath: showCase.VideoPath,
              Creator: showCase.Creator,
            };
          });
        })
      )
      .subscribe((transformedshowCases) => {
        this.showCases = transformedshowCases;
        this.postsUpdated.next([...this.showCases]);
        sub.unsubscribe();
        console.log('eazy 1');
      });
  }
  getShowCase(id: string, counter: number): any {
    const sub = this.http
      .get<{ message: string; showCases: any }>(
        'https://www.skalarly.com/api/posts/showCases',
        { params: { id, counter } }
      )
      .pipe(
        map((showCaseData) => {
          return showCaseData.showCases.map((showCase) => {
            return {
              id: showCase._id,
              ShowCasePath: showCase.ShowCasePath,
              VideoPath: showCase.VideoPath,
              Creator: showCase.Creator,
            };
          });
        })
      )
      .subscribe((transformedshowCases) => {
        this.showCases = transformedshowCases;
        this.postsUpdated.next([...this.showCases]);
        sub.unsubscribe();
        console.log('eazy 2');
      });
  }

  // Adding image
  addShowCase(showCase?: File, video?: File, Creator?: string): any {
    const postData = new FormData();
    postData.append('showCase', showCase);
    postData.append('video', video);
    postData.append('Creator', Creator);
    const sub = this.http
      .post<{ message: string; postId: ShowCase }>(
        'https://www.skalarly.com/api/posts/showCases',
        postData
      )
      .subscribe({
        next: (responseData) => {
          const postId: ShowCase = {
            id: responseData.postId.id,
            showCase,
            video,
            ShowCasePath: responseData.postId.ShowCasePath,
            VideoPath: responseData.postId.VideoPath,

            // ShowCasePath,
            Creator,
          };
          // const id_ = responseData.postId;
          // postData.id = id_;
          this.showCases.push(postId);
          this.postsUpdated.next([...this.showCases]);
          this.snackBar.open('Showcase Added', 'Yay!', {
            duration: 3000,
          });
          sub.unsubscribe();
          console.log('eazy 3');
        },
      });
  }
  // Adding video
  addShowCaseVideo(showCase?: File, video?: File, Creator?: string): any {
    const postData = new FormData();
    postData.append('showCase', showCase);
    postData.append('video', video);
    postData.append('Creator', Creator);
    const sub = this.http
      .post<{ message: string; postId: ShowCase }>(
        'https://www.skalarly.com/api/posts/showCases/video',
        postData
      )
      .subscribe({
        next: (responseData) => {
          const postId: ShowCase = {
            id: responseData.postId.id,
            showCase,
            video,
            ShowCasePath: responseData.postId.ShowCasePath,
            VideoPath: responseData.postId.VideoPath,

            // ShowCasePath,
            Creator,
          };
          // const id_ = responseData.postId;
          // postData.id = id_;
          this.showCases.push(postId);
          this.postsUpdated.next([...this.showCases]);
          this.snackBar.open('Showcase added', 'Yay!', {
            duration: 3000,
          });
          sub.unsubscribe();
          console.log('eazy 4');
          location.reload();
        },
      });
  }
  deleteShowCase(postId: string): any {
    console.log('hey chase postId', postId);
    const sub = this.http
      .delete<{ message: string }>(
        'https://www.skalarly.com/api/posts/showCases/' + postId
      )
      .subscribe(() => {
        const updatedPosts = this.showCases.filter(
          (post) => post.id !== postId
        );
        this.showCases = updatedPosts;
        this.postsUpdated.next([...this.showCases]);
        this.snackBar.open('Showcase Deleted', '🗑', {
          duration: 3000,
        });
        sub.unsubscribe();
        console.log('eazy 5');
      });
  }
}

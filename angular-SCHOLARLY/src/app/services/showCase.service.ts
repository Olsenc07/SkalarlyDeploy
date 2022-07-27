import { Injectable } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

export interface ShowCase {
  id?: string;
  Creator?: string;
  showCase?: File;
  ShowCasePath?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ShowCaseService {
  private showCases: ShowCase[] = [];
  private postsUpdated = new ReplaySubject<ShowCase[]>();
  constructor(private http: HttpClient) {}

  getShowCase(): any {
    this.http
      .get<{ message: string; showCases: any }>(
        'http://localhost:3000/api/posts/showCases'
      )
      .pipe(
        map((showCaseData) => {
          return showCaseData.showCases.map((showCase) => {
            return {
              id: showCase._id,
              ShowCasePath: showCase.ShowCasePath,
              Creator: showCase.Creator,
            };
          });
        })
      )
      .subscribe((transformedshowCases) => {
        this.showCases = transformedshowCases;
        this.postsUpdated.next([...this.showCases]);
      });
  }

  getshowCaseUpdateListener(): any {
    return this.postsUpdated.asObservable();
  }
  // Adding post
  addShowCase(showCase?: File, Creator?: string): any {
    console.log('unicorns exist', showCase);
    const ShowCaseS: ShowCase = { Creator, showCase };
    const postData = new FormData();
    postData.append('showCase', showCase);
    this.http
      .post<{ message: string; postId: ShowCase }>(
        'http://localhost:3000/api/posts/showCases',
        postData
      )
      .subscribe({
        next: (responseData) => {
          const postId: ShowCase = {
            id: responseData.postId.id,
            ShowCasePath: responseData.postId.ShowCasePath,
            Creator,
          };
          // const id_ = responseData.postId;
          // postData.id = id_;
          this.showCases.push(postId);
          this.postsUpdated.next([...this.showCases]);
        },
      });
  }

  deleteShowCase(postId: string): any {
    // console.log('hey chase postId', postId);
    this.http
      .delete('http://localhost:3000/api/posts/showCases/' + postId)
      .subscribe(() => {
        const updatedPosts = this.showCases.filter(
          (post) => post.id !== postId
        );
        this.showCases = updatedPosts;
        this.postsUpdated.next([...this.showCases]);
      });
  }
}

import { Injectable } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

export interface Post {
  Creator: string;
  _id: string;
  postDescription: string;
  postLocation?: string;
  FriendCtrl?: string[];
  Title?: string;
  date?: string;
  time?: string;
  LocationEvent?: string;
  Gender?: string;
  Driver?: string;
  PaymentService?: string;
  Virtual?: string;
  Event?: string;
  upload?: File;
  ImagePath?: string;

  // SecondFormGroup?: string;
  // ThirdFormGroup?: string;
  // FourthFormGroup?: string;
}

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private posts: Post[] = [];
  private postsUpdated = new ReplaySubject<Post[]>();
  constructor(private http: HttpClient) {}

  getPosts(): any {
    this.http
      .get<{ message: string; posts: any }>('http://localhost:3000/api/posts')
      .pipe(
        map((postData) => {
          return postData.posts.map((post) => {
            return {
              id: post._id,
              Title: post.Title,
              PostDescription: post.postDescription,
              PostLocation: post.postLocation,
              LocationEvent: post.LocationEvent,
              Time: post.time,
              Date: post.date,
              Gender: post.Gender,
              Driver: post.Driver,
              PaymentService: post.PaymentService,
              Virtual: post.Virtual,
              Event: post.Event,
              ImagePath: post.ImagePath,
              Creator: post.Creator,
            };
          });
        })
      )
      .subscribe((transformedPosts) => {
        this.posts = transformedPosts;
        this.postsUpdated.next([...this.posts]);
      });
    // console.log(this.posts);
  }

  getPostUpdateListener(): any {
    return this.postsUpdated.asObservable();
  }
  addPost(
    id: string,
    Creator: string,
    postLocation: string,
    postDescription?: string,
    upload?: File,
    LocationEvent?: string,
    Title?: string,
    date?: string,
    time?: string,
    Gender?: string,
    Driver?: string,
    PaymentService?: string,
    Virtual?: string,
    Event?: string
  ): any {
    const postData = new FormData();
    postData.append('Creator', Creator);
    postData.append('id', id);
    postData.append('Title', Title);
    postData.append('postDescription', postDescription);
    postData.append('postLocation', postLocation);
    postData.append('LocationEvent', LocationEvent);
    postData.append('time', time);
    postData.append('date', date);
    postData.append('Gender', Gender);
    postData.append('Driver', Driver);
    postData.append('PaymentService', PaymentService);
    postData.append('Virtual', Virtual);
    postData.append('Event', Event);
    postData.append('upload', upload);
    this.http
      .post<{ message: string; postId: Post }>(
        'http://localhost:3000/api/posts',
        postData
      )
      .subscribe((responseData) => {
        const postId: Post = {
          _id: responseData.postId._id,
          Title,
          postDescription,
          postLocation,
          LocationEvent,
          time,
          date,
          Gender,
          Driver,
          PaymentService,
          Virtual,
          Event,
          ImagePath: responseData.postId.ImagePath,
          Creator,
        };
        // const id_ = responseData.postId;
        // postData.id = id_;
        this.posts.push(postId);
        this.postsUpdated.next([...this.posts]);
      });
  }

  deletePost(postId: string): any {
    this.http
      .delete('http://localhost:3000/api/posts/' + postId)
      .subscribe(() => {
        const updatedPosts = this.posts.filter((post) => post._id !== postId);
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }
}

import { Injectable } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

export interface Post {
  Creator: string;
  _id: string;
  postDescription: string;
  postLocation?: string;
  // FriendCtrl?: string[];
  Title?: string;
  date?: string;
  time?: string;
  locationEvent?: string;
  gender?: string;
  driver?: string;
  paymentService?: string;
  virtual?: string;
  event?: string;
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
              LocationEvent: post.locationEvent,
              Time: post.time,
              Date: post.date,
              Gender: post.gender,
              Driver: post.driver,
              PaymentService: post.paymentService,
              Virtual: post.virtual,
              Event: post.event,
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
  // Adding post
  addPost(
    Creator: string,
    postLocation: string,
    postDescription?: string,
    upload?: File,
    locationEvent?: string,
    Title?: string,
    date?: string,
    time?: string,
    gender?: string,
    driver?: string,
    paymentService?: string,
    virtual?: string,
    event?: string
  ): any {
    const postData = new FormData();
    postData.append('Title', Title);
    postData.append('postDescription', postDescription);
    postData.append('postLocation', postLocation);
    postData.append('locationEvent', locationEvent);
    postData.append('time', time);
    postData.append('date', date);
    postData.append('gender', gender);
    postData.append('driver', driver);
    postData.append('paymentService', paymentService);
    postData.append('virtual', virtual);
    postData.append('event', event);
    postData.append('upload', upload);
    postData.append('Creator', Creator);
    this.http
      .post<{ message: string; postId: Post }>(
        'http://localhost:3000/api/posts',
        postData
      )
      .subscribe({
        next: (responseData) => {
          const postId: Post = {
            _id: responseData.postId._id,
            Title,
            postDescription,
            postLocation,
            locationEvent,
            time,
            date,
            gender,
            driver,
            paymentService,
            virtual,
            event,
            ImagePath: responseData.postId.ImagePath,
            Creator,
          };
          // const id_ = responseData.postId;
          // postData.id = id_;
          this.posts.push(postId);
          this.postsUpdated.next([...this.posts]);
        },
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

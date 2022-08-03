import { Injectable } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';
import { AuthData, AuthDataInfo } from '../signup/auth-data.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

export interface Post {
  id: string;
  Title: string;
  postDescription: string;
  postLocation: string;
  LocationEvent: string;
  time: string;
  date: string;
  gender: string;
  driver: string;
  paymentService: string;
  virtual: string;
  event: string;
  upload: File;
  ImagePath: string;
  Creator: string;

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

  private infos: AuthDataInfo[] = [];
  private infosUpdated = new ReplaySubject<AuthDataInfo[]>();

  getPosts(): any {
    this.http
      .get<{ message: string; posts: any }>('http://localhost:3000/api/posts')
      .pipe(
        map((postData) => {
          return postData.posts.map((post) => {
            return {
              id: post._id,
              Username: post.Username,
              Name: post.Name,
              ProfilePicPath: post.ProfilePicPath,
              Title: post.Title,
              postDescription: post.postDescription,
              postLocation: post.postLocation,
              LocationEvent: post.LocationEvent,
              time: post.time,
              date: post.date,
              gender: post.gender,
              driver: post.driver,
              paymentService: post.paymentService,
              virtual: post.virtual,
              event: post.event,
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
  }
  getPostsFeed(): any {
    this.http
      .get<{ message: string; posts: any }>(
        'http://localhost:3000/api/posts/feed'
      )
      .pipe(
        map((postData) => {
          return postData.posts.map((post) => {
            return {
              id: post._id,
              Username: post.Username,
              Name: post.Name,
              ProfilePicPath: post.ProfilePicPath,
              Title: post.Title,
              postDescription: post.postDescription,
              postLocation: post.postLocation,
              LocationEvent: post.LocationEvent,
              time: post.time,
              date: post.date,
              gender: post.gender,
              driver: post.driver,
              paymentService: post.paymentService,
              virtual: post.virtual,
              event: post.event,
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
  }
  getPostsPersonal(userId: string): any {
    this.http
      .get<{ message: string; posts: any }>(
        'http://localhost:3000/api/posts/personal',
        { params: { userId } }
      )
      .pipe(
        map((postData) => {
          return postData.posts.map((post) => {
            return {
              id: post._id,
              Username: post.Username,
              Name: post.Name,
              ProfilePicPath: post.ProfilePicPath,
              Title: post.Title,
              postDescription: post.postDescription,
              postLocation: post.postLocation,
              LocationEvent: post.LocationEvent,
              time: post.time,
              date: post.date,
              gender: post.gender,
              driver: post.driver,
              paymentService: post.paymentService,
              virtual: post.virtual,
              event: post.event,
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
  }
  // getting others posts for their profiles display
  getOthersPosts(id: string): any {
    this.http
      .get<{ message: string; posts: any }>(
        'http://localhost:3000/api/posts/otherUsers',
        { params: { id } }
      )
      .pipe(
        map((postData) => {
          return postData.posts.map((post) => {
            return {
              id: post._id,
              Username: post.Username,
              Name: post.Name,
              ProfilePicPath: post.ProfilePicPath,
              Title: post.Title,
              postDescription: post.postDescription,
              postLocation: post.postLocation,
              LocationEvent: post.LocationEvent,
              time: post.time,
              date: post.date,
              gender: post.gender,
              driver: post.driver,
              paymentService: post.paymentService,
              virtual: post.virtual,
              event: post.event,
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
  }
  // getting main page posts
  getPostsMainPage(category: string): any {
    this.http
      .get<{ message: string; posts: any }>(
        'http://localhost:3000/api/posts/mainPage',
        { params: { category } }
      )
      .pipe(
        map((postData) => {
          return postData.posts.map((post) => {
            return {
              id: post._id,
              Username: post.Username,
              Name: post.Name,
              ProfilePicPath: post.ProfilePicPath,
              Title: post.Title,
              postDescription: post.postDescription,
              postLocation: post.postLocation,
              LocationEvent: post.LocationEvent,
              time: post.time,
              date: post.date,
              gender: post.gender,
              driver: post.driver,
              paymentService: post.paymentService,
              virtual: post.virtual,
              event: post.event,
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
  }
  getOtherInfo(id: string): any {
    this.http
      .get<{ message: string; infos: any }>(
        'http://localhost:3000/api/posts/otherUsersInfos',
        { params: { id } }
      )
      .pipe(
        map((infosData) => {
          return infosData.infos.map((info) => {
            return {
              id: info._id,
              username: info.username,
              name: info.name,
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
  getPostUpdateListener(): any {
    return this.postsUpdated.asObservable();
  }

  // Adding post
  addPost(
    userId: string,
    Title?: string,
    postDescription?: string,
    postLocation?: string,
    LocationEvent?: string,
    time?: string,
    date?: string,
    gender?: string,
    driver?: string,
    paymentService?: string,
    virtual?: string,
    event?: string,
    upload?: File,
    Creator?: string
  ): any {
    const post: Post = {
      Title,
      postDescription,
      postLocation,
      LocationEvent,
      time,
      date,
      gender,
      driver,
      paymentService,
      virtual,
      event,
      upload,
      id: '',
      ImagePath: '',
      Creator: '',
    };
    const postData = new FormData();
    postData.append('Title', Title);
    postData.append('postDescription', postDescription);
    postData.append('postLocation', postLocation);
    postData.append('LocationEvent', LocationEvent);
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
        postData,
        { params: { userId } }
      )
      .subscribe({
        next: (responseData) => {
          const postId: Post = {
            id: responseData.postId.id,
            Title,
            postDescription,
            postLocation,
            LocationEvent,
            time,
            date,
            gender,
            driver,
            paymentService,
            virtual,
            event,
            upload,
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
    // console.log('hey chase postId', postId);
    this.http
      .delete('http://localhost:3000/api/posts/' + postId)
      .subscribe(() => {
        const updatedPosts = this.posts.filter((post) => post.id !== postId);
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }
}

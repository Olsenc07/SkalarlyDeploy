import { Injectable } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';
import { AuthDataInfo } from '../signup/auth-data.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface Post {
  Reposts: number;
  id: string;
  OriginalCreatorId: string;
  OriginalPostId: string;
  SharerUsername: string;
  SharerName: string;
  SharerProfilePicPath: string;
  Title: string;
  postDescription: string;
  postLocation: string;
  LocationEvent: string;
  time: string;
  timeE: string;

  // date: string;
  // dateE: string;
  gender: string;
  live: string;
  paymentService: string;
  nopaymentService: string;
  virtual: string;
  event: string;
  Hashtag1: string;
  Hashtag2: string;
  Hashtag3: string;
  Hashtag4: string;
  Hashtag5: string;
  upload: File;
  video: File;
  ImagePath: string;
  VideoPath: string;
  Creator: string;
  // User info
  Username: string;
  Name: string;
  ProfilePicPath: string;
}

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();
  private trendNumber: number;
  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  private infos: AuthDataInfo[] = [];
  private infosUpdated = new Subject<AuthDataInfo[]>();
  private countUpdated = new Subject();

  getTrendNumber(): number {
    return this.trendNumber;
  }
  getPosts(): any {
    const sub = this.http
      .get<{ message: string; posts: any }>(
        'https://www.skalarly.com/api/posts'
      )
      .pipe(
        map((postData) => {
          return postData.posts.map((post) => {
            return {
              id: post._id,
              Reposts: post.Reposts,
              OriginalCreatorId: post.OriginalCreatorId,
              OriginalPostId: post.OriginalPostId,
              SharerUsername: post.SharerUsername,
              SharerName: post.SharerName,
              SharerProfilePicPath: post.SharerProfilePicPath,
              Username: post.Username,
              Name: post.Name,
              ProfilePicPath: post.ProfilePicPath,
              Title: post.Title,
              postDescription: post.postDescription,
              postLocation: post.postLocation,
              LocationEvent: post.LocationEvent,
              time: post.time,
              timeE: post.timeE,
              // date: post.date,
              // dateE: post.dateE,
              gender: post.gender,
              live: post.live,
              paymentService: post.paymentService,
              nopaymentService: post.nopaymentService,
              virtual: post.virtual,
              event: post.event,
              Hashtag1: post.Hashtag1,
              Hashtag2: post.Hashtag2,
              Hashtag3: post.Hashtag3,
              Hashtag4: post.Hashtag4,
              Hashtag5: post.Hashtag5,
              ImagePath: post.ImagePath,
              VideoPath: post.VideoPath,
              Creator: post.Creator,
            };
          });
        })
      )
      .subscribe((transformedPosts) => {
        this.posts = transformedPosts;
        this.postsUpdated.next([...this.posts]);
      });
    sub.unsubscribe();
    console.log('eazy 16');
  }
  //  Shared posts
  getSharedPosts(userId: string, counter: number): any {
    const sub = this.http
      .get<{ message: string; posts: any }>(
        'https://www.skalarly.com/api/posts/sharedPosts',
        { params: { userId, counter } }
      )
      .pipe(
        map((postData) => {
          return postData.posts.map((post) => {
            return {
              id: post._id,
              Reposts: post.Reposts,
              OriginalCreatorId: post.OriginalCreatorId,
              OriginalPostId: post.OriginalPostId,
              SharerUsername: post.SharerUsername,
              SharerName: post.SharerName,
              SharerProfilePicPath: post.SharerProfilePicPath,
              Username: post.Username,
              Name: post.Name,
              ProfilePicPath: post.ProfilePicPath,
              Title: post.Title,
              postDescription: post.postDescription,
              postLocation: post.postLocation,
              LocationEvent: post.LocationEvent,
              time: post.time,
              timeE: post.timeE,
              // date: post.date,
              // dateE: post.dateE,
              gender: post.gender,
              live: post.live,
              paymentService: post.paymentService,
              nopaymentService: post.nopaymentService,
              virtual: post.virtual,
              event: post.event,
              Hashtag1: post.Hashtag1,
              Hashtag2: post.Hashtag2,
              Hashtag3: post.Hashtag3,
              Hashtag4: post.Hashtag4,
              Hashtag5: post.Hashtag5,
              ImagePath: post.ImagePath,
              VideoPath: post.VideoPath,
              Creator: post.Creator,
            };
          });
        })
      )
      .subscribe((transformedPosts) => {
        this.posts = transformedPosts;
        this.postsUpdated.next([...this.posts]);
      });
    sub.unsubscribe();
    console.log('eazy 15');
  }

  // Feed
  getPostsFeed(counter: number, userId: string): any {
    const sub = this.http
      .get<{ message: string; posts: any }>(
        'https://www.skalarly.com/api/posts/feed',
        { params: { counter, userId } }
      )
      .pipe(
        map((postData) => {
          return postData.posts.map((post) => {
            return {
              id: post._id,
              Reposts: post.Reposts,
              OriginalCreatorId: post.OriginalCreatorId,
              OriginalPostId: post.OriginalPostId,
              SharerUsername: post.SharerUsername,
              SharerName: post.SharerName,
              SharerProfilePicPath: post.SharerProfilePicPath,
              Username: post.Username,
              Name: post.Name,
              ProfilePicPath: post.ProfilePicPath,
              Title: post.Title,
              postDescription: post.postDescription,
              postLocation: post.postLocation,
              LocationEvent: post.LocationEvent,
              time: post.time,
              timeE: post.timeE,
              // date: post.date,
              // dateE: post.dateE,
              gender: post.gender,
              live: post.live,
              paymentService: post.paymentService,
              nopaymentService: post.nopaymentService,
              virtual: post.virtual,
              event: post.event,
              Hashtag1: post.Hashtag1,
              Hashtag2: post.Hashtag2,
              Hashtag3: post.Hashtag3,
              Hashtag4: post.Hashtag4,
              Hashtag5: post.Hashtag5,
              ImagePath: post.ImagePath,
              VideoPath: post.VideoPath,
              Creator: post.Creator,
            };
          });
        })
      )
      .subscribe((transformedPosts) => {
        this.posts = transformedPosts;
        this.postsUpdated.next([...this.posts]);
      });
    sub.unsubscribe();
    console.log('eazy 14');
  }
  // Friends
  getPostsFriends(userId: string, counter: number): any {
    const sub = this.http
      .get<{ message: string; posts: any }>(
        'https://www.skalarly.com/api/posts/friends',
        { params: { userId, counter } }
      )
      .pipe(
        map((postData) => {
          return postData.posts.map((post) => {
            return {
              id: post._id,
              Reposts: post.Reposts,
              OriginalCreatorId: post.OriginalCreatorId,
              OriginalPostId: post.OriginalPostId,
              SharerUsername: post.SharerUsername,
              SharerName: post.SharerName,
              SharerProfilePicPath: post.SharerProfilePicPath,
              Username: post.Username,
              Name: post.Name,
              ProfilePicPath: post.ProfilePicPath,
              Title: post.Title,
              postDescription: post.postDescription,
              postLocation: post.postLocation,
              LocationEvent: post.LocationEvent,
              time: post.time,
              timeE: post.timeE,
              // date: post.date,
              // dateE: post.dateE,
              gender: post.gender,
              live: post.live,
              paymentService: post.paymentService,
              nopaymentService: post.nopaymentService,
              virtual: post.virtual,
              event: post.event,
              Hashtag1: post.Hashtag1,
              Hashtag2: post.Hashtag2,
              Hashtag3: post.Hashtag3,
              Hashtag4: post.Hashtag4,
              Hashtag5: post.Hashtag5,
              ImagePath: post.ImagePath,
              VideoPath: post.VideoPath,
              Creator: post.Creator,
            };
          });
        })
      )
      .subscribe((transformedPosts) => {
        this.posts = transformedPosts;
        this.postsUpdated.next([...this.posts]);
      });
    sub.unsubscribe();
    console.log('eazy 13');
  }
  getPostsPersonal(userId: string, counter: number): any {
    const sub = this.http
      .get<{ message: string; posts: any }>(
        'https://www.skalarly.com/api/posts/personal',
        { params: { userId, counter } }
      )
      .pipe(
        map((postData) => {
          return postData.posts.map((post) => {
            return {
              id: post._id,
              Reposts: post.Reposts,
              OriginalCreatorId: post.OriginalCreatorId,
              OriginalPostId: post.OriginalPostId,
              SharerUsername: post.SharerUsername,
              SharerName: post.SharerName,
              SharerProfilePicPath: post.SharerProfilePicPath,
              Username: post.Username,
              Name: post.Name,
              ProfilePicPath: post.ProfilePicPath,
              Title: post.Title,
              postDescription: post.postDescription,
              postLocation: post.postLocation,
              LocationEvent: post.LocationEvent,
              time: post.time,
              timeE: post.timeE,
              // date: post.date,
              // dateE: post.dateE,
              gender: post.gender,
              live: post.live,
              paymentService: post.paymentService,
              nopaymentService: post.nopaymentService,
              virtual: post.virtual,
              event: post.event,
              Hashtag1: post.Hashtag1,
              Hashtag2: post.Hashtag2,
              Hashtag3: post.Hashtag3,
              Hashtag4: post.Hashtag4,
              Hashtag5: post.Hashtag5,
              ImagePath: post.ImagePath,
              VideoPath: post.VideoPath,
              Creator: post.Creator,
            };
          });
        })
      )
      .subscribe((transformedPosts) => {
        this.posts = transformedPosts;
        this.postsUpdated.next([...this.posts]);
      });
    sub.unsubscribe();
    console.log('eazy 12');
  }
  // getting others posts for their profiles display
  getOthersPosts(id: string, counter: number): any {
    const sub = this.http
      .get<{ message: string; posts: any }>(
        'https://www.skalarly.com/api/posts/otherUsers',
        { params: { id, counter } }
      )
      .pipe(
        map((postData) => {
          return postData.posts.map((post) => {
            return {
              id: post._id,
              Reposts: post.Reposts,
              OriginalCreatorId: post.OriginalCreatorId,
              OriginalPostId: post.OriginalPostId,
              SharerUsername: post.SharerUsername,
              SharerName: post.SharerName,
              SharerProfilePicPath: post.SharerProfilePicPath,
              Username: post.Username,
              Name: post.Name,
              ProfilePicPath: post.ProfilePicPath,
              Title: post.Title,
              postDescription: post.postDescription,
              postLocation: post.postLocation,
              LocationEvent: post.LocationEvent,
              time: post.time,
              timeE: post.timeE,
              // date: post.date,
              // dateE: post.dateE,
              gender: post.gender,
              live: post.live,
              paymentService: post.paymentService,
              nopaymentService: post.nopaymentService,
              virtual: post.virtual,
              event: post.event,
              Hashtag1: post.Hashtag1,
              Hashtag2: post.Hashtag2,
              Hashtag3: post.Hashtag3,
              Hashtag4: post.Hashtag4,
              Hashtag5: post.Hashtag5,
              ImagePath: post.ImagePath,
              VideoPath: post.VideoPath,
              Creator: post.Creator,
            };
          });
        })
      )
      .subscribe((transformedPosts) => {
        this.posts = transformedPosts;
        this.postsUpdated.next([...this.posts]);
      });
    sub.unsubscribe();
    console.log('eazy 11');
  }
  // Trending

  getPostsTrending(userId: string): any {
    const sub = this.http
      .get<{ message: string; posts: any }>(
        'https://www.skalarly.com/api/posts/Trending',
        { params: { userId } }
      )
      .pipe(
        map((postData) => {
          return postData.posts.map((post) => {
            return {
              id: post._id,
              Reposts: post.Reposts,
              OriginalCreatorId: post.OriginalCreatorId,
              OriginalPostId: post.OriginalPostId,
              SharerUsername: post.SharerUsername,
              SharerName: post.SharerName,
              SharerProfilePicPath: post.SharerProfilePicPath,
              Username: post.Username,
              Name: post.Name,
              ProfilePicPath: post.ProfilePicPath,
              Title: post.Title,
              postDescription: post.postDescription,
              postLocation: post.postLocation,
              LocationEvent: post.LocationEvent,
              time: post.time,
              timeE: post.timeE,
              // date: post.date,
              // dateE: post.dateE,
              gender: post.gender,
              live: post.live,
              paymentService: post.paymentService,
              nopaymentService: post.nopaymentService,
              virtual: post.virtual,
              event: post.event,
              Hashtag1: post.Hashtag1,
              Hashtag2: post.Hashtag2,
              Hashtag3: post.Hashtag3,
              Hashtag4: post.Hashtag4,
              Hashtag5: post.Hashtag5,
              ImagePath: post.ImagePath,
              VideoPath: post.VideoPath,
              Creator: post.Creator,
            };
          });
        })
      )
      .subscribe((transformedPosts) => {
        this.posts = transformedPosts;
        this.postsUpdated.next([...this.posts]);
      });
    sub.unsubscribe();
    console.log('eazy 10');
  }
  // Trending
  // getting others posts for their profiles display
  getPostsTrendingNumber(postId: string): any {
    const sub = this.http
      .get<{ message: string; posts: number }>(
        'https://www.skalarly.com/api/posts/TrendingNumber',
        { params: { postId } }
      )
      .subscribe((transformedPosts) => {
        this.trendNumber = transformedPosts.posts;
        console.log('rope around my ...', transformedPosts);
        this.countUpdated.next(this.trendNumber);
        console.log('hello', this.countUpdated);
      });
  }
  // Trending own
  // getting others posts for their profiles display
  getPostsTrendingNumberOwn(postId: string): any {
    console.log('remember', postId);
    const sub = this.http
      .get<{ message: string; posts: number }>(
        'https://www.skalarly.com/api/posts/TrendingNumberOwn',
        { params: { postId } }
      )
      .subscribe((transformedPosts) => {
        this.trendNumber = transformedPosts.posts;
        console.log('rope around my ..', transformedPosts);
        this.countUpdated.next(this.trendNumber);
        console.log('hello', this.countUpdated);
      });
    sub.unsubscribe();
    console.log('eazy 9');
  }
  // getting main page posts
  getPostsMainPage(category: string, counter: number, userId: string): any {
    const sub = this.http
      .get<{ message: string; posts: any }>(
        'https://www.skalarly.com/api/posts/mainPage',
        { params: { category, counter, userId } }
      )
      .pipe(
        map((postData) => {
          return postData.posts.map((post) => {
            return {
              id: post._id,
              Reposts: post.Reposts,
              OriginalCreatorId: post.OriginalCreatorId,
              OriginalPostId: post.OriginalPostId,
              SharerUsername: post.SharerUsername,
              SharerName: post.SharerName,
              SharerProfilePicPath: post.SharerProfilePicPath,
              Username: post.Username,
              Name: post.Name,
              ProfilePicPath: post.ProfilePicPath,
              Title: post.Title,
              postDescription: post.postDescription,
              postLocation: post.postLocation,
              LocationEvent: post.LocationEvent,
              time: post.time,
              timeE: post.timeE,
              // date: post.date,
              // dateE: post.dateE,
              gender: post.gender,
              live: post.live,
              paymentService: post.paymentService,
              nopaymentService: post.nopaymentService,
              virtual: post.virtual,
              event: post.event,
              Hashtag1: post.Hashtag1,
              Hashtag2: post.Hashtag2,
              Hashtag3: post.Hashtag3,
              Hashtag4: post.Hashtag4,
              Hashtag5: post.Hashtag5,
              ImagePath: post.ImagePath,
              VideoPath: post.VideoPath,
              Creator: post.Creator,
            };
          });
        })
      )
      .subscribe((transformedPosts) => {
        this.posts = transformedPosts;
        this.postsUpdated.next([...this.posts]);
      });
    sub.unsubscribe();
    console.log('eazy 8');
  }

  // getting main page posts
  getPostsHashtagPage(hashtag: string, counter: number): any {
    const sub = this.http
      .get<{ message: string; posts: any }>(
        'https://www.skalarly.com/api/posts/hashtagPage',
        { params: { hashtag, counter } }
      )
      .pipe(
        map((postData) => {
          return postData.posts.map((post) => {
            return {
              id: post._id,
              Reposts: post.Reposts,
              OriginalCreatorId: post.OriginalCreatorId,
              OriginalPostId: post.OriginalPostId,
              SharerUsername: post.SharerUsername,
              SharerName: post.SharerName,
              SharerProfilePicPath: post.SharerProfilePicPath,
              Username: post.Username,
              Name: post.Name,
              ProfilePicPath: post.ProfilePicPath,
              Title: post.Title,
              postDescription: post.postDescription,
              postLocation: post.postLocation,
              LocationEvent: post.LocationEvent,
              time: post.time,
              timeE: post.timeE,
              // date: post.date,
              // dateE: post.dateE,
              gender: post.gender,
              live: post.live,
              paymentService: post.paymentService,
              nopaymentService: post.nopaymentService,
              virtual: post.virtual,
              event: post.event,
              Hashtag1: post.Hashtag1,
              Hashtag2: post.Hashtag2,
              Hashtag3: post.Hashtag3,
              Hashtag4: post.Hashtag4,
              Hashtag5: post.Hashtag5,
              ImagePath: post.ImagePath,
              VideoPath: post.VideoPath,
              Creator: post.Creator,
            };
          });
        })
      )
      .subscribe((transformedPosts) => {
        this.posts = transformedPosts;
        this.postsUpdated.next([...this.posts]);
      });
    sub.unsubscribe();
    console.log('eazy 7');
  }

  // getting single page post
  getPostSinglePage(postId: string, userId: string): any {
    const sub = this.http
      .get<{ message: string; posts: any }>(
        'https://www.skalarly.com/api/posts/singlePage',
        { params: { postId, userId } }
      )
      .pipe(
        map((postData) => {
          return postData.posts;
          // .posts.map((post) => {
          //   return {
          //     id: post._id,
          //     Username: post.Username,
          //     Name: post.Name,
          //     ProfilePicPath: post.ProfilePicPath,
          //     Title: post.Title,
          //     postDescription: post.postDescription,
          //     postLocation: post.postLocation,
          //     LocationEvent: post.LocationEvent,
          //     time: post.time,
          //     timeE: post.timeE,
          //     date: post.date,
          //     dateE: post.dateE,
          //     gender: post.gender,
          //     live: post.live,
          //     paymentService: post.paymentService,
          //     nopaymentService: post.nopaymentService,
          //     virtual: post.virtual,
          //     event: post.event,
          //     ImagePath: post.ImagePath,
          //     Creator: post.Creator,
          //   };
          // });
        })
      )
      .subscribe((transformedPosts) => {
        this.posts = transformedPosts;
        this.postsUpdated.next(this.posts);
      });
    sub.unsubscribe();
    console.log('eazy 6');
  }
  getOtherInfo(id: string): any {
    const sub = this.http
      .get<{ message: string; infos: any }>(
        'https://www.skalarly.com/api/posts/otherUsersInfos',
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
    sub.unsubscribe();
    console.log('eazy 5');
  }
  getPostUpdateListener(): any {
    return this.postsUpdated.asObservable();
  }
  getCountUpdateListener(): any {
    return this.countUpdated.asObservable();
  }
  // Adding post
  addPost(
    userId: string,
    Title?: string,
    postDescription?: string,
    postLocation?: string,
    LocationEvent?: string,
    time?: string,
    timeE?: string,
    // date?: string,
    // dateE?: string,
    gender?: string,
    live?: string,
    paymentService?: string,
    nopaymentService?: string,
    virtual?: string,
    event?: string,
    Hashtag1?: string,
    Hashtag2?: string,
    Hashtag3?: string,
    Hashtag4?: string,
    Hashtag5?: string,
    upload?: File,
    video?: File,
    Creator?: string
  ): any {
    const postData = new FormData();
    postData.append('Title', Title);
    postData.append('postDescription', postDescription);
    postData.append('postLocation', postLocation);
    postData.append('LocationEvent', LocationEvent);
    postData.append('time', time);
    postData.append('timeE', timeE);
    // postData.append('date', date);
    // postData.append('dateE', dateE);
    postData.append('gender', gender);
    postData.append('live', live);
    postData.append('paymentService', paymentService);
    postData.append('nopaymentService', nopaymentService);
    postData.append('virtual', virtual);
    postData.append('event', event);
    postData.append('Hashtag1', Hashtag1);
    postData.append('Hashtag2', Hashtag2);
    postData.append('Hashtag3', Hashtag3);
    postData.append('Hashtag4', Hashtag4);
    postData.append('Hashtag5', Hashtag5);

    postData.append('upload', upload);
    postData.append('video', video);
    postData.append('Creator', Creator);
    const sub = this.http
      .post<{ message: string; postId: Post }>(
        'https://www.skalarly.com/api/posts',
        postData,
        { params: { userId } }
      )
      .subscribe({
        next: (responseData) => {
          const postId: Post = {
            id: responseData.postId.id,
            // Test with these three
            Username: responseData.postId.Username,
            Name: responseData.postId.Name,
            ProfilePicPath: responseData.postId.ProfilePicPath,
            //
            Title,
            postDescription,
            postLocation,
            LocationEvent,
            time,
            timeE,
            // date,
            // dateE,
            gender,
            live,
            paymentService,
            nopaymentService,
            virtual,
            event,
            Hashtag1,
            Hashtag2,
            Hashtag3,
            Hashtag4,
            Hashtag5,
            upload,
            video,
            ImagePath: responseData.postId.ImagePath,
            VideoPath: responseData.postId.VideoPath,
            Creator,
            SharerUsername: '',
            SharerName: '',
            SharerProfilePicPath: '',
            OriginalPostId: '',
            OriginalCreatorId: '',
            Reposts: 0,
          };
          // const id_ = responseData.postId;
          // postData.id = id_;

          this.posts.push(postId);
          this.postsUpdated.next([...this.posts]);
          location.reload();
        },
        error: (err) => {
          this.snackBar.open('Post failed to add!', 'Try again', {
            duration: 3000,
          });
        },
      });
    sub.unsubscribe();
    console.log('eazy 4');
  }
  // Adding post
  addPostVideo(
    userId: string,
    Title?: string,
    postDescription?: string,
    postLocation?: string,
    LocationEvent?: string,
    time?: string,
    timeE?: string,
    // date?: string,
    // dateE?: string,
    gender?: string,
    live?: string,
    paymentService?: string,
    nopaymentService?: string,
    virtual?: string,
    event?: string,
    Hashtag1?: string,
    Hashtag2?: string,
    Hashtag3?: string,
    Hashtag4?: string,
    Hashtag5?: string,
    upload?: File,
    video?: File,
    Creator?: string
  ): any {
    const postData = new FormData();
    postData.append('Title', Title);
    postData.append('postDescription', postDescription);
    postData.append('postLocation', postLocation);
    postData.append('LocationEvent', LocationEvent);
    postData.append('time', time);
    postData.append('timeE', timeE);
    // postData.append('date', date);
    // postData.append('dateE', dateE);
    postData.append('gender', gender);
    postData.append('live', live);
    postData.append('paymentService', paymentService);
    postData.append('nopaymentService', nopaymentService);
    postData.append('virtual', virtual);
    postData.append('event', event);
    postData.append('Hashtag1', Hashtag1);
    postData.append('Hashtag2', Hashtag2);
    postData.append('Hashtag3', Hashtag3);
    postData.append('Hashtag4', Hashtag4);
    postData.append('Hashtag5', Hashtag5);
    postData.append('upload', upload);
    postData.append('video', video);
    postData.append('Creator', Creator);
    const sub = this.http
      .post<{ message: string; postId: Post }>(
        'https://www.skalarly.com/api/posts/videos',
        postData,
        { params: { userId } }
      )
      .subscribe({
        next: (responseData) => {
          const postId: Post = {
            id: responseData.postId.id,
            // Test with these three
            Username: responseData.postId.Username,
            Name: responseData.postId.Name,
            ProfilePicPath: responseData.postId.ProfilePicPath,
            //
            Title,
            postDescription,
            postLocation,
            LocationEvent,
            time,
            timeE,
            // date,
            // dateE,
            gender,
            live,
            paymentService,
            nopaymentService,
            virtual,
            event,
            Hashtag1,
            Hashtag2,
            Hashtag3,
            Hashtag4,
            Hashtag5,
            upload,
            video,
            ImagePath: responseData.postId.ImagePath,
            VideoPath: responseData.postId.VideoPath,
            Creator,
            SharerUsername: '',
            SharerName: '',
            SharerProfilePicPath: '',
            OriginalPostId: '',
            OriginalCreatorId: '',
            Reposts: 0,
          };
          // const id_ = responseData.postId;
          // postData.id = id_;

          this.posts.push(postId);
          // this.posts.unshift(postId);
          this.postsUpdated.next([...this.posts]);
          location.reload();
        },
        error: (err) => {
          this.snackBar.open('Post failed to add!', 'Try again', {
            duration: 3000,
          });
        },
      });
    sub.unsubscribe();
    console.log('eazy 3');
  }
  // Adding shared
  addPostShared(postId: string, userId: string): any {
    console.log('some funner', postId);

    const postData = new FormData();
    postData.append('postId', postId);

    postData.append('userId', userId);

    const sub = this.http
      .post<{ message: string; post: Post }>(
        'https://www.skalarly.com/api/posts/Shared',
        postData,
        { params: { postId, userId } }
      )
      .subscribe({
        next: (responseData) => {
          // const postId: Post = {
          //   id: responseData.postId.id,
          //   // Test with these three
          //   Username: responseData.postId.Username,
          //   Name: responseData.postId.Name,
          //   ProfilePicPath: responseData.postId.ProfilePicPath,
          //   //
          //   Title,
          //   postDescription,
          //   postLocation,
          //   LocationEvent,
          //   time,
          //   timeE,
          //   // date,
          //   // dateE,
          //   gender,
          //   live,
          //   paymentService,
          //   nopaymentService,
          //   virtual,
          //   event,
          //   upload,
          //   video,
          //   ImagePath: responseData.postId.ImagePath,
          //   VideoPath: responseData.postId.VideoPath,
          //   Creator,
          // };

          // this.posts.push(postId);
          this.postsUpdated.next([...this.posts]);
          this.snackBar.open('Post has been shared', '✅', {
            duration: 3000,
          });
          // location.reload();
        },
        error: (err) => {
          this.snackBar.open('Post failed to add!', 'Try again', {
            duration: 3000,
          });
        },
      });
    sub.unsubscribe();
    console.log('eazy 2');
  }
  deletePost(postId: string): any {
    // console.log('hey chase postId', postId);
    const sub = this.http
      .delete('https://www.skalarly.com/api/posts/' + postId)
      .subscribe(() => {
        const updatedPosts = this.posts.filter((post) => post.id !== postId);
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
        this.snackBar.open('Post Deleted', '🗑', {
          duration: 3000,
        });
      });
    sub.unsubscribe();
    console.log('eazy 1');
  }
}

import { Injectable } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

export interface Post {
    id: string;
    PostDescription: string;
    Upload?: string;
    PostLocation?: string;
    FriendCtrl?: string[];
    Title?: string;
    Date?: string;
    Time?: string;
    LocationEvent?: string;
    Gender?: string;
    Driver?: boolean;
    PaymentService?: boolean;
    Virtual?: boolean;
    Event?: string;
    // SecondFormGroup?: string;
    // ThirdFormGroup?: string;
    // FourthFormGroup?: string;
}


@Injectable({
    providedIn: 'root',
})
export class PostService {
// static post$$: ReplaySubject<Post> = new ReplaySubject<Post>(1);


private posts: Post[] = [];
private postsUpdated = new ReplaySubject<Post[]>();
constructor(private http: HttpClient) {}

getPosts(): any {
    this.http.get<{message: string, posts: any}>('http://localhost:3000/api/posts')
        .pipe(map((postData) => {
            return postData.posts.map( post => {
                return {
                    Title: post.Title,
                    PostDescription: post.PostDescription,
                    PostLocation: post.PostLocation,
                    LocationEvent: post.LocationEvent,
                    Time: post.Time,
                    Date: post.Date,
                    Gender: post.Gender,
                    Driver: post.Driver,
                    PaymentService: post.PaymentService,
                    Virtual: post.Virtual,
                    Event: post.Event,
                    id: post._id
                 };
        });
    }))
        .subscribe((transformedPosts) => {
            this.posts = transformedPosts;
            this.postsUpdated.next([...this.posts]);
});
    // console.log(this.posts);
    }

    getPostUpdateListener(): any {
        return this.postsUpdated.asObservable();
    }
    addPost( PostLocation: string, PostDescription?: string, LocationEvent?: string, Title?: string, Date?: string,
             Time?: string, Gender?: string, Driver?: boolean, PaymentService?: boolean, Virtual?: boolean, Event?: string
        ): any {
        const post: Post = {id: null, Title, PostDescription, PostLocation, LocationEvent,
             Time, Date, Gender, Driver, PaymentService, Virtual, Event };
        this.http.post<{ message: string, postId: string}>('http://localhost:3000/api/posts', post)
        .subscribe(responseData => {
            const id = responseData.postId;
            post.id = id;
            this.posts.push(post);
            this.postsUpdated.next([...this.posts]);
        });
    }

    deletePost(postId: string): any {
        this.http.delete('http://localhost:3000/api/posts/' + postId)
            .subscribe(() => {
                const updatedPosts = this.posts.filter(post => post.id !== postId );
                this.posts = updatedPosts;
                this.postsUpdated.next([...this.posts]);
            });
    }
    // setPost(post: Post): void {
    //     PostService.post$$.next(post);
    // }

}


import { Injectable } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

export interface Post {
    id?: string;
    PostDescription?: string;
    Upload?: string;
    PostLocation?: string;
    FriendCtrl?: string[];
    Date?: string;
    Time?: string;
    LocationEvent?: string;
    Gender?: string;
    Driver?: boolean;
    PaymentService?: boolean;
    Virtual?: boolean;
    Event?: string;
    Title?: string;
    // SecondFormGroup?: string;
    // ThirdFormGroup?: string;
    // FourthFormGroup?: string;
}


@Injectable({
    providedIn: 'root',
})
export class PostService {
static post$$: ReplaySubject<Post> = new ReplaySubject<Post>(1);


private posts: Post[] = [];
private postsUpdated = new ReplaySubject<Post[]>();
constructor(private http: HttpClient) {}

getPosts(): void{
    this.http.get<{message: string, posts: any}>('http://localhost:3000/api/posts')
        .pipe(map((postData) => {
            return postData.posts.map( post => {
                return {
                    id: post._id,
                    PostDescription: post.postDescription,
                    PostLocation: post.postLocation,
                    Title: post.title,
                    Date: post.date,
                    Time: post.time,
                    Gender: post.gender,
                    Driver: post.driver,
                    PaymentService: post.paymentService,
                    Virtual: post.virtual,
                    Event: post.event,
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
    addPost(id: string, PostDescription: string, LocationEvent: string): any {
        const post: Post = {id, PostDescription, LocationEvent };
        this.http.post<{ message: string}>('http://localhost:3000/api/posts', post)
        .subscribe(responseData => {
            console.log(responseData.message);
            this.posts.push(post);
            this.postsUpdated.next([...this.posts]);
        });
    }


    // setPost(post: Post): void {
    //     PostService.post$$.next(post);
    // }

}


import { Injectable } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface Post {
    // id: string;
    PostDescription: string;
    Upload?: string;
    PostLocation?: string;
    FriendCtrl?: string[];
    // Date: String;
    // Time: String;
    // LocationEvent: String;
    // Gender: String;
    // Driver: Boolean;
    // PaymentService: Boolean;
    // Event: String;
    FirstFormGroup?: string;
    SecondFormGroup?: string;
    ThirdFormGroup?: string;
    FourthFormGroup?: string;
}


@Injectable({
    providedIn: 'root',
})
export class PostService {
static post$$: ReplaySubject<Post> = new ReplaySubject<Post>(1);


private posts: Post[] = [];
private postsUpdated = new Subject<Post[]>();
constructor(private http: HttpClient) {}

    getPosts(): void{
    this.http.get<{message: string, posts: Post[]}>('http://localhost:3000/api/posts')
        .subscribe((postData) => {
            this.posts = postData.posts;
            this.postsUpdated.next([...this.posts]);
});
    }

    getPostUpdateListener(): any {
        return this.postsUpdated.asObservable();
    }
    addPost(PostDescription: string, PostLocation: string): any {
        const post: Post = { PostDescription, PostLocation };
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


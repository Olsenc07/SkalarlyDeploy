import { Injectable } from '@angular/core';
import { ReplaySubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


export interface Post {
    Title?: string;
    PostDescription?: string;
    Upload?: string;
    PostLocation: string;
    FriendCtrl?: string[];
    // Date: String;
    // Time: String;
    // LocationEvent: String;
    // Gender: String;
    // Driver: Boolean;
    // PaymentService: Boolean;
    // Event: String;
    FirstFormGroup: string;
    SecondFormGroup: string;
    ThirdFormGroup: string;
    FourthFormGroup: string;
}

@Injectable({
    providedIn: 'root',
})
export class PostService {


    // gender$: Observable<Post> = new Observable;
    // static gender$: string[];

    // booleans$: Observable<Post> = new Observable;
    // static booleans$: boolean;

    // event$: Observable<Post> = new Observable;
    // static event$: string[];

    static post$$: ReplaySubject<Post> = new ReplaySubject<Post>(1);

    constructor() {
    }

    setPost(post: Post): void {
        PostService.post$$.next(post);
    }

}


import { Component, OnInit } from '@angular/core';
import { StoreService} from '../services/store.service';
import { Post, PostService } from '../services/post.service';
import { Subscription, Subject } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AuthDataInfo } from '../signup/auth-data.model';

@Component({
    selector: 'app-card-brief',
    templateUrl: './reusable-card-brief.component.html',
    styleUrls: ['./reusable-card-brief.component.scss'],
})

export class ReusableCardBriefComponent implements OnInit {
    posts: Post[] = [];
    private postsSub: Subscription;

    isLoading = false;

    userId: string;
    userIsAuthenticated = false;
    private authListenerSubs: Subscription;

    infos: AuthDataInfo[] = [];
    private infosSub: Subscription;
    

    constructor(public postService: PostService, private authService: AuthService) { }

    ngOnInit(): void {
        this.isLoading = false;
        this.postService.getPosts();
        this.postsSub = this.postService.getPostUpdateListener()
         .subscribe((posts: Post[]) => {
         this.posts = posts;
         this.isLoading = false;
         console.log(this.posts);
       });
        this.authService.getInfo();
        this.infosSub = this.authService.getInfoUpdateListener()
   .subscribe((infos: AuthDataInfo[]) => {
   this.infos = infos;
   this.isLoading = false;
 });
        this.userId = this.authService.getUserId();
        this.userIsAuthenticated = this.authService.getIsAuth();
        this.authListenerSubs = this.authService
           .getAuthStatusListener()
           .subscribe(isAuthenticated => {
             this.userIsAuthenticated = isAuthenticated;
             this.userId = this.authService.getUserId();
           });
     }
}

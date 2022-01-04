import { Component, OnInit } from '@angular/core';
import { StoreService} from '../services/store.service';
import { Post, PostService } from '../services/post.service';
import { Subscription, Subject } from 'rxjs';

@Component({
    selector: 'app-card-brief',
    templateUrl: './reusable-card-brief.component.html',
    styleUrls: ['./reusable-card-brief.component.scss'],
})

export class ReusableCardBriefComponent implements OnInit {
    posts: Post[] = [];
    private postsSub: Subscription;

    profile = StoreService.profile$$;
    post = PostService.post$$;
    id = StoreService.userId$$;

    constructor(public postService: PostService) { }

    ngOnInit(): void {
        this.postService.getPosts();
        this.postsSub = this.postService.getPostUpdateListener()
         .subscribe((posts: Post[]) => {
         this.posts = posts;
         console.log(this.posts);
       });
     }
}

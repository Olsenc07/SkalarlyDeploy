import { Component, OnDestroy } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { OnInit } from '@angular/core';
import { AttendanceComponent } from '../main-pages/main-pages.component';
import { TaggedComponent } from '../main-pages/main-pages.component';
import { StoreService } from '../services/store.service';
import { Post, PostService } from '../services/post.service';
import { AuthService } from '../services/auth.service';
import { Subscription, Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-card',
    templateUrl: './reusable-card.component.html',
    styleUrls: ['./reusable-card.component.scss'],
})
export class ReusableCardComponent implements OnInit{
    // Filling with Post info from post.service
    posts: Post[] = [];
    private postsSub: Subscription;
    userId: string;

    isLoading = false;

    // post = PostService.post$$;
    profile = StoreService.profile$$;
    ids = StoreService.userId$$;


    // gender$ = PostService.gender$;
    // booleans$ = PostService.booleans$;
    // event$ = PostService.event$;

    selectedAttend = '';
    attendances: any = [
        'Attending', 'Maybe', 'Not Attending'
    ];
    panelOpenState = false;
    showCases = [
        // '../../assets/Pics/IMG-8413.PNG',
        // '../../assets/Pics/IMG-8619.PNG',
        '../../assets/Pics/WhiteSquareInAppLogo.jpg',
        // '../../assets/Pics/IMG-8413.PNG',
        // '../../assets/Pics/IMG-8619.PNG',
        // '../../assets/Pics/ProperInAppLogo.jpeg ',
        // '../../assets/Pics/IMG-8413.PNG'
    ];

    radioChange(event: any): any {
        this.selectedAttend = event.target.value;
    }

    openAttendanceSheet(): void {
        this.bottomSheet.open(AttendanceComponent);
    }
    openTaggedSheet(): void {
        this.bottomSheet.open(TaggedComponent);
    }

    openDialog(): void {
      this.dialog.open(DeleteWarningComponent);
    }

    constructor(private bottomSheet: MatBottomSheet, private authService: AuthService,
                public postService: PostService, public dialog: MatDialog) { }

    ngOnInit(): void {
        this.userId = this.authService.getUserId();
        this.isLoading = true;
        this.postService.getPosts();
        this.postsSub = this.postService.getPostUpdateListener()
          .subscribe((posts: Post[]) => {
          this.posts = posts;
          this.isLoading = false;
          console.log(this.posts);
        });
      }


    //   ngOnDestroy(): void{
    //     this.postsSub.unsubscribe();
    //   }

}
@Component({
  selector: 'app-deletewarning-page',
  templateUrl: './delete-warning.component.html',
  styleUrls: ['./reusable-card.component.scss'],
})
export class DeleteWarningComponent implements OnInit {
  storedPosts: Post[] = [];
  posts: Post[] = [];
  private postsSub: Subscription;

  constructor(public postService: PostService){}

  ngOnInit(): void{
    this.postService.getPosts();
    this.postsSub = this.postService.getPostUpdateListener()
      .subscribe((posts: Post[]) => {
      this.posts = posts;
  });
  }

  onDelete(postId: string): any {
    this.postService.deletePost(postId);
  }
 }

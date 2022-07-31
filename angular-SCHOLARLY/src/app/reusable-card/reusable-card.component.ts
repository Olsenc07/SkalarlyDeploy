import { Component, OnDestroy, Input } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { OnInit } from '@angular/core';
import { AttendanceComponent } from '../main-pages/main-pages.component';
import { TaggedComponent } from '../main-pages/main-pages.component';
import { StoreService } from '../services/store.service';
import { Post, PostService } from '../services/post.service';
import { ShowCase } from '../services/showcase.service';

import { AuthService } from '../services/auth.service';
import { AuthDataInfo } from '../signup/auth-data.model';
import { Subscription, Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CommentsService } from '../services/comments.service';
import { ShowCaseService } from '../services/showCase.service';
import { ActivatedRoute } from '@angular/router';

export interface CommentInterface {
  id: string;
  body: string;
  username: string;
  userID: string;
  parentId: string | null;
  createdAt: string;
}

@Component({
  selector: 'app-card',
  templateUrl: './reusable-card.component.html',
  styleUrls: ['./reusable-card.component.scss'],
})
export class ReusableCardComponent implements OnInit {
  isLoading = false;
  user: string;

  // Filling with Post info from post.service
  posts: Post[] = [];
  private postsSub: Subscription;
  userId: string;

  infos: AuthDataInfo[] = [];
  private infosSub: Subscription;

  // selectedAttend = '';
  // attendances: any = ['Attending', 'Maybe', 'Not Attending'];
  // panelOpenState = false;
  // showCases = [
  //   // '../../assets/Pics/IMG-8413.PNG',
  //   // '../../assets/Pics/IMG-8619.PNG',
  //   '../../assets/Pics/WhiteSquareInAppLogo.jpg',
  //   // '../../assets/Pics/IMG-8413.PNG',
  //   // '../../assets/Pics/IMG-8619.PNG',
  //   // '../../assets/Pics/ProperInAppLogo.jpeg ',
  //   // '../../assets/Pics/IMG-8413.PNG'
  // ];

  // radioChange(event: any): any {
  //   this.selectedAttend = event.target.value;
  // }

  openAttendanceSheet(): void {
    this.bottomSheet.open(AttendanceComponent);
  }
  openTaggedSheet(): void {
    this.bottomSheet.open(TaggedComponent);
  }

  openDialog(): void {
    this.dialog.open(DeleteWarningComponent);
  }
  onDelete(postId: string): any {
    this.postService.deletePost(postId);
    console.log('chaz whats up', postId);
  }
  constructor(
    private bottomSheet: MatBottomSheet,
    private authService: AuthService,
    public postService: PostService,
    public dialog: MatDialog,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.isLoading = true;
    this.route.queryParams.subscribe((params) => {
      this.user = params.id;
      const id = this.user;

      // Posts
      this.postService.getOthersPosts(id);
      this.postsSub = this.postService
        .getPostUpdateListener()
        .subscribe((posts: Post[]) => {
          this.posts = posts;
          this.isLoading = false;
          console.log('posts yo homie', this.posts);
        });
      // Info
      this.authService.getInfo();
      this.infosSub = this.authService
        .getInfoUpdateListener()
        .subscribe((infos: AuthDataInfo[]) => {
          this.infos = infos;
          this.isLoading = false;
        });
    });
  }

  //   ngOnDestroy(): void{
  //     this.postsSub.unsubscribe();
  //   }
}
@Component({
  selector: 'app-card-personal',
  templateUrl: './reusable-cardPersonal.component.html',
  styleUrls: ['./reusable-card.component.scss'],
})
export class ReusableCardPersonalComponent implements OnInit {
  isLoading = false;

  // Filling with Post info from post.service
  posts: Post[] = [];
  private postsSub: Subscription;
  userId: string;

  infos: AuthDataInfo[] = [];
  private infosSub: Subscription;

  // selectedAttend = '';
  // attendances: any = ['Attending', 'Maybe', 'Not Attending'];
  // panelOpenState = false;
  // showCases = [
  //   // '../../assets/Pics/IMG-8413.PNG',
  //   // '../../assets/Pics/IMG-8619.PNG',
  //   '../../assets/Pics/WhiteSquareInAppLogo.jpg',
  //   // '../../assets/Pics/IMG-8413.PNG',
  //   // '../../assets/Pics/IMG-8619.PNG',
  //   // '../../assets/Pics/ProperInAppLogo.jpeg ',
  //   // '../../assets/Pics/IMG-8413.PNG'
  // ];

  // radioChange(event: any): any {
  //   this.selectedAttend = event.target.value;
  // }

  openAttendanceSheet(): void {
    this.bottomSheet.open(AttendanceComponent);
  }
  openTaggedSheet(): void {
    this.bottomSheet.open(TaggedComponent);
  }

  // openDialog(postId): void {
  //   this.dialog.open(DeleteWarningComponent);
  // }
  onDelete(postId: string): any {
    this.postService.deletePost(postId);
    // console.log('chaz whats up', postId);
  }
  constructor(
    private bottomSheet: MatBottomSheet,
    private authService: AuthService,
    public postService: PostService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.isLoading = true;
    // Posts
    this.postService.getPosts();
    this.postsSub = this.postService
      .getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
        this.isLoading = false;
        console.log('posts', this.posts);
      });
    // Info
    this.authService.getInfo();
    this.infosSub = this.authService
      .getInfoUpdateListener()
      .subscribe((infos: AuthDataInfo[]) => {
        this.infos = infos;
        this.isLoading = false;
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

  constructor(public postService: PostService) {}

  ngOnInit(): void {
    this.postService.getPosts();
    this.postsSub = this.postService
      .getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
      });
  }

  onDelete(postId: string): any {
    this.postService.deletePost(postId);
  }
}

@Component({
  selector: 'app-card-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./reusable-card.component.scss'],
})
export class ReusableCommentsComponent implements OnInit {
  @Input() currentUserId!: string;

  comments: CommentInterface[] = [];

  constructor(private commentsService: CommentsService) {}

  ngOnInit(): void {
    // this.commentsService.getComments().subscribe((comments) => {
    //   console.log('comments', comments);
    //   this.comments = comments;
    // });
  }
}
@Component({
  selector: 'app-showcase',
  templateUrl: './showCase.component.html',
  styleUrls: ['./reusable-card.component.scss'],
})
export class ShowCaseComponent implements OnInit {
  userId: string;
  showCases: ShowCase[] = [];
  private postsSub: Subscription;

  constructor(
    public showCase: ShowCaseService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.showCase.getShowCase();
    this.postsSub = this.showCase
      .getshowCaseUpdateListener()
      .subscribe((showcases: ShowCase[]) => {
        this.showCases = showcases;
      });
  }

  onDelete(postId: string): any {
    this.showCase.deleteShowCase(postId);
    console.log('chaz whats up homie g', postId);
  }
}

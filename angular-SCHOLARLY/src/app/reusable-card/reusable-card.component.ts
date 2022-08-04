import {
  Component,
  OnDestroy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
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
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface CommentInterface {
  id: string;
  body: string;
  username: string;
  userID: string;
  parentId: string | null;
  createdAt: string;
}

export interface ActiveCommentInterface {
  id: string;
  type: ActiveCommentTypeEnum;
}
export enum ActiveCommentTypeEnum {
  replying = 'replying',
  editing = 'editing',
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
          console.log('posts yo', this.posts);
        });
      // Info
      this.postService.getOtherInfo(id);
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
    this.postService.getPostsPersonal(this.userId);
    this.postsSub = this.postService
      .getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
        this.isLoading = false;
        console.log('posts', this.posts);
      });
    // Info
    // this.authService.getInfoPersonal(this.userId);
    // this.infosSub = this.authService
    //   .getInfoUpdateListener()
    //   .subscribe((infos: AuthDataInfo[]) => {
    //     this.infos = infos;
    //     this.isLoading = false;
    //   });
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
// Comments on posts
@Component({
  selector: 'app-card-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./reusable-card.component.scss'],
})
export class ReusableCommentsComponent implements OnInit {
  @Input() currentUserId!: string;

  comments: CommentInterface[] = [];
  activeComment: ActiveCommentInterface | null = null;
  constructor(private commentsService: CommentsService) {}

  ngOnInit(): void {
    this.commentsService.getComments().subscribe((comments) => {
      console.log('comments', comments);
      this.comments = comments;
    });
  }
  addComment({
    text,
    parentId,
  }: {
    text: string;
    parentId: null | string;
  }): void {
    console.log('addComment', text, parentId);
    this.commentsService
      .createComment(text, parentId)
      .subscribe((createdComment) => {
        this.comments = [...this.comments, createdComment];
        this.activeComment = null;
      });
  }

  getReplies(commentId: string): CommentInterface[] {
    return this.comments
      .filter((comment) => comment.parentId === commentId)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getMilliseconds() -
          new Date(b.createdAt).getMilliseconds()
      );
  }

  setActiveComment(activeComment: ActiveCommentInterface | null): void {
    this.activeComment = activeComment;
  }
}

// Comment on posts
@Component({
  selector: 'app-card-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./reusable-card.component.scss'],
})
export class ReusableCommentComponent implements OnInit {
  @Input() currentUserId!: string;
  @Input() replies!: CommentInterface[];
  @Input() activeComment: ActiveCommentInterface | null = null;
  canReply: boolean = false;
  activeCommentType = ActiveCommentTypeEnum;
  replyId: string | null = null;

  @Input() comment!: CommentInterface;
  @Input() parentId: string | null = null;

  @Output() setActiveComment =
    new EventEmitter<ActiveCommentInterface | null>();
  @Output() addComment = new EventEmitter<{
    text: string;
    parentId: string | null;
  }>();
  constructor(
    private commentsService: CommentsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.canReply = Boolean(this.currentUserId);
    this.replyId = this.parentId ? this.parentId : this.comment.id;
  }

  isReplying(): boolean {
    if (!this.activeComment) {
      return false;
    }
    return (
      this.activeComment.id === this.comment.id &&
      this.activeComment.type === this.activeCommentType.replying
    );
  }
}

// Comment on posts form
@Component({
  selector: 'app-card-comment-form',
  templateUrl: './commentForm.component.html',
  styleUrls: ['./reusable-card.component.scss'],
})
export class ReusableCommentFormComponent implements OnInit {
  @Input() submitLabel!: string;
  @Input() hasCancelButton = false;
  @Input() initialText = '';

  @Output() handleSubmit = new EventEmitter<string>();
  @Output() handleCancel = new EventEmitter<void>();

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      title: [this.initialText, Validators.required],
    });
  }

  onSubmit(): void {
    console.log('onSubmit', this.form.value);
    this.handleSubmit.emit(this.form.value.title);
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
  user: string;

  constructor(
    public showCaseService: ShowCaseService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.showCaseService.getShowCasePersonal(this.userId);
    this.postsSub = this.showCaseService
      .getshowCaseUpdateListener()
      .subscribe((showcases: ShowCase[]) => {
        this.showCases = showcases;
      });
  }

  onDelete(postId: string): any {
    this.showCaseService.deleteShowCase(postId);
    console.log('chaz whats up homie g', postId);
  }
}
@Component({
  selector: 'app-card-feed',
  templateUrl: './reusable-cardFeed.component.html',
  styleUrls: ['./reusable-card.component.scss'],
})
export class CardFeedComponent implements OnInit {
  isLoading = false;

  userId: string;
  posts: Post[] = [];
  private postsSub: Subscription;

  infos: AuthDataInfo[] = [];
  private infosSub: Subscription;

  constructor(
    public showCaseService: ShowCaseService,
    private authService: AuthService,
    public postService: PostService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    // Posts
    this.postService.getPostsFeed();
    this.postsSub = this.postService
      .getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
        this.isLoading = false;
        console.log('posts personal', this.posts);
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
  navigateToPage(infoUser: string): any {
    // const ID = (document.getElementById('userName') as HTMLInputElement).value;
    this.router.navigate(['/skalars/:'], { queryParams: { id: infoUser } });
  }
}

@Component({
  selector: 'app-post-info-feed',
  templateUrl: './reusable-cardFeed.component.html',
  styleUrls: ['./reusable-card.component.scss'],
})
export class CardInfoFeedComponent implements OnInit {
  isLoading = false;

  posts: Post[] = [];
  private postsSub: Subscription;

  infos: AuthDataInfo[] = [];
  private infosSub: Subscription;

  constructor(
    private authService: AuthService,
    public postService: PostService
  ) {}
  ngOnInit(): void {
    // Posts
    this.postService.getPostsFeed();
    this.postsSub = this.postService
      .getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
        this.isLoading = false;
        console.log('posts personal', this.posts);
      });
    // Info
    // this.authService.getInfo();
    // this.infosSub = this.authService
    //   .getInfoUpdateListener()
    //   .subscribe((infos: AuthDataInfo[]) => {
    //     this.infos = infos;
    //     this.isLoading = false;
    //   });
  }
}

@Component({
  selector: 'app-card-main-page',
  templateUrl: './reusable-cardMainPage.component.html',
  styleUrls: ['./reusable-card.component.scss'],
})
export class CardInfoMainPageComponent implements OnInit {
  category: string;
  userId: string;
  isLoading = false;
  posts: Post[] = [];
  private postsSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    public postService: PostService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.getUserId();

    this.route.queryParams.subscribe((params) => {
      console.log('params main page', params);
      this.category = params?.category;

      this.postService.getPostsMainPage(this.category);
      this.postsSub = this.postService
        .getPostUpdateListener()
        .subscribe((posts: Post[]) => {
          this.posts = posts;
          this.isLoading = false;
        });
    });
  }
  navigateToPage(infoUser: string): any {
    // const ID = (document.getElementById('userName') as HTMLInputElement).value;
    this.router.navigate(['/skalars/:'], { queryParams: { id: infoUser } });
  }
}

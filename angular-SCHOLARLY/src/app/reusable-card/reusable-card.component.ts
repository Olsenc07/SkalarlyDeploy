import {
  Component,
  OnDestroy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
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
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { Picker } from 'emoji-picker-element';

export interface CommentInterface {
  id: string;
  body: string;
  // userId: string;
  // parentId: string | null;
  // createdAt: string;
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
  userId: string;
  picker = new Picker();

  user: string;
  open = true;

  // Filling with Post info from post.service
  posts: Post[] = [];
  private postsSub: Subscription;
  comments: string[] = [];
  private commentsSub: Subscription;
  comment: FormControl = new FormControl('');
  // number of comments that load

  infos: AuthDataInfo[] = [];
  private infosSub: Subscription;

  // selectedAttend = '';
  // attendances: any = ['Attending', 'Maybe', 'Not Attending'];
  // panelOpenState = false;

  // radioChange(event: any): any {
  //   this.selectedAttend = event.target.value;
  // }
  // Where the post was posted
  // Adding emojis
  addEmoji(event: any): any {
    const msgs = event?.detail?.unicode;
    const msg = this.comment.value + msgs;
    this.comment.setValue(msg);
  }
  emojiPreventClose($event: any): any {
    $event.stopPropagation();
  }
  navigateToMainPage(value: string): void {
    this.route.navigate(['/main/:'], { queryParams: { category: value } });
    console.log('hey chaz mataz', value);
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
  onDelete(postId: string): any {
    this.postService.deletePost(postId);
  }
  onDeleteComment(commentId: string): any {
    this.commentsService.deleteComment(commentId);
  }
  constructor(
    private bottomSheet: MatBottomSheet,
    private authService: AuthService,
    public postService: PostService,
    private commentsService: CommentsService,
    public dialog: MatDialog,
    private router: ActivatedRoute,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.isLoading = true;
    this.router.queryParams.subscribe((params) => {
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
    });
  }
  // Where the post was posted
  navigateToPage(value: string): void {
    this.route.navigate(['/main/:'], { queryParams: { category: value } });
    console.log('hey chaz mataz', value);
  }
  CommentTrigger(postId: string): void {
    if (this.comment.value) {
      this.commentsService.createComment(
        this.comment.value,
        this.userId,
        postId
      );
      console.log('searching for', this.comment.value);
      this.comment.setValue('');
      console.log('onComment', postId);
    }
  }
  loadComments(postId: string): void {
    console.log('hey logic fade away', postId);
    this.commentsService.getComments(postId);
    this.commentsSub = this.commentsService
      .getMessagesUpdateListener()
      .subscribe((comments: string[]) => {
        this.comments = comments;
      });
  }
  // ngOnDestroy(): void {
  //   this.postsSub.unsubscribe();
  // }
}
@Component({
  selector: 'app-card-personal',
  templateUrl: './reusable-cardPersonal.component.html',
  styleUrls: ['./reusable-card.component.scss'],
})
export class ReusableCardPersonalComponent implements OnInit {
  isLoading = false;
  userId: string;
  picker = new Picker();
  // Filling with Post info from post.service
  posts: Post[] = [];
  private postsSub: Subscription;
  comments: CommentInterface[] = [];
  private commentsSub: Subscription;
  comment: FormControl = new FormControl('');

  infos: AuthDataInfo[] = [];
  private infosSub: Subscription;

  // selectedAttend = '';
  // attendances: any = ['Attending', 'Maybe', 'Not Attending'];
  // panelOpenState = false;

  // radioChange(event: any): any {
  //   this.selectedAttend = event.target.value;
  // }
  // Where the post was posted
  // Adding emojis
  addEmoji(event: any): any {
    const msgs = event?.detail?.unicode;
    const msg = this.comment.value + msgs;
    this.comment.setValue(msg);
  }
  emojiPreventClose($event: any): any {
    $event.stopPropagation();
  }
  navigateToMainPage(value: string): void {
    this.route.navigate(['/main/:'], { queryParams: { category: value } });
    console.log('hey chaz mataz', value);
  }
  openAttendanceSheet(): void {
    this.bottomSheet.open(AttendanceComponent);
  }
  openTaggedSheet(): void {
    this.bottomSheet.open(TaggedComponent);
  }
  onDeleteComment(commentId: string): any {
    this.commentsService.deleteComment(commentId);
    console.log('chaz whats up', commentId);
  }
  onDelete(postId: string): any {
    this.postService.deletePost(postId);
    // console.log('chaz whats up', postId);
  }
  constructor(
    private bottomSheet: MatBottomSheet,
    private authService: AuthService,
    public postService: PostService,
    private commentsService: CommentsService,
    public dialog: MatDialog,
    private route: Router
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
  }
  CommentTrigger(postId: string): void {
    if (this.comment.value) {
      this.commentsService.createComment(
        this.comment.value,
        this.userId,
        postId
      );
      this.comment.setValue('');
      console.log('onComment', postId);
    }
  }
  loadComments(postId: string): void {
    console.log('hey logic fade away', postId);
    this.commentsService.getComments(postId);
    this.commentsSub = this.commentsService
      .getMessagesUpdateListener()
      .subscribe((comments: CommentInterface[]) => {
        this.comments = comments;
      });
  }
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
  posts: Post[] = [];
  private postsSub: Subscription;
  comments: CommentInterface[] = [];
  activeComment: ActiveCommentInterface | null = null;
  constructor(
    private commentsService: CommentsService,
    public postService: PostService
  ) {}

  ngOnInit(): void {
    this.postService.getPostsFeed();
    this.postsSub = this.postService
      .getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;

        console.log('posts personal', this.posts);
      });
  }
  addComment({
    body,
    userId,
    postId,
  }: // parentId,
  {
    body: string;
    userId: string;
    postId: string;
    // parentId: null | string;
  }): void {
    console.log('addComment', postId);
    this.commentsService
      .createComment(body, userId, postId)
      .subscribe((createdComment) => {
        this.comments = [...this.comments, createdComment];
        this.activeComment = null;
      });
  }

  // getReplies(commentId: string): CommentInterface[] {
  //   return this.comments
  //     .filter((comment) => comment.parentId === commentId)
  //     .sort(
  //       (a, b) =>
  //         new Date(a.createdAt).getMilliseconds() -
  //         new Date(b.createdAt).getMilliseconds()
  //     );
  // }

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
  canReply = false;
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
    // this.replyId = this.parentId ? this.parentId : this.comment.id;
  }

  // isReplying(): boolean {
  //   if (!this.activeComment) {
  //     return false;
  //   }
  //   return (
  //     this.activeComment.id === this.comment.id &&
  //     this.activeComment.type === this.activeCommentType.replying
  //   );
  // }
}

// Comment on posts form
@Component({
  selector: 'app-card-comment-form',
  templateUrl: './commentForm.component.html',
  styleUrls: ['./reusable-card.component.scss'],
})
export class ReusableCommentFormComponent implements OnInit {
  open = false;
  closed = true;

  userId: string;
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;

  postId: string;

  @Input() submitLabel!: string;
  @Input() hasCancelButton = false;
  @Input() initialText = '';

  @Output() handleSubmit = new EventEmitter<string>();
  @Output() handleCancel = new EventEmitter<void>();

  comment: FormControl = new FormControl('');

  form: FormGroup;

  Comments = new FormGroup({
    comment: this.comment,
  });

  constructor(
    private fb: FormBuilder,
    private commentsService: CommentsService,
    private authService: AuthService,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.getUserId();

    // Post
  }

  // onSubmit(): void {
  //   console.log('onSubmit', this.form.value);
  //   this.handleSubmit.emit(this.form.value.title);
  // }
  CommentTrigger(postId: string): void {
    if (this.comment.value) {
      this.commentsService.createComment(
        this.comment.value,
        this.userId,
        postId
      );
      this.comment.setValue('');
      console.log('onComment', this.postId);
    }
  }
  clearComments(): void {
    this.comment.setValue('');
    this.closed = true;
    this.open = false;
  }
  toggleComments(): void {
    this.closed = false;
    this.open = true;
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
  open = true;
  closed = true;
  picker = new Picker();
  userId: string;
  posts: Post[] = [];
  private postsSub: Subscription;

  infos: AuthDataInfo[] = [];
  private infosSub: Subscription;

  comments: string[] = [];
  // number of comments that load
  sum = 5;
  direction = '';
  private commentsSub: Subscription;
  comment: FormControl = new FormControl('');

  constructor(
    public showCaseService: ShowCaseService,
    private authService: AuthService,
    private commentsService: CommentsService,
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
  // Adding emojis
  addEmoji(event: any): any {
    const msgs = event?.detail?.unicode;
    const msg = this.comment.value + msgs;
    this.comment.setValue(msg);
  }
  emojiPreventClose($event: any): any {
    $event.stopPropagation();
  }
  //
  onDeleteComment(commentId: string): any {
    this.commentsService.deleteComment(commentId);
    console.log('chaz whats up', commentId);
  }
  // Where the post was posted
  navigateToMainPage(value: string): void {
    this.router.navigate(['/main/:'], { queryParams: { category: value } });
    console.log('hey chaz mataz', value);
  }
  navigateToPage(infoUser: string): any {
    // const ID = (document.getElementById('userName') as HTMLInputElement).value;
    this.router.navigate(['/skalars/:'], { queryParams: { id: infoUser } });
  }

  CommentTrigger(postId): void {
    if (this.comment.value) {
      this.commentsService.createComment(
        this.comment.value,
        this.userId,
        postId
      );
      this.comment.setValue('');
      console.log('onComment', postId);
    }
  }

  loadComments(postId: string): void {
    console.log('hey logic fade away', postId);
    this.commentsService.getComments(postId);
    this.commentsSub = this.commentsService
      .getMessagesUpdateListener()
      .subscribe((comments: string[]) => {
        this.comments = comments;
      });
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
    private commentsService: CommentsService,
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
  onDeleteComment(commentId: string): any {
    this.commentsService.deleteComment(commentId);
    console.log('chaz whats up', commentId);
  }
}

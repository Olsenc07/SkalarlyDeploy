import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { OnInit } from '@angular/core';
import { Post, PostService } from '../services/post.service';
import { AuthService } from '../services/auth.service';
import { AuthDataInfo } from '../signup/auth-data.model';
import { Subscription, Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CommentsService } from '../services/comments.service';
import { ShowCaseService, ShowCase } from '../services/showCase.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Picker } from 'emoji-picker-element';

export interface CommentInterface {
  id: string;
  body: string;
  time: string;
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

  timeHour = new Date().getHours();
  timeMinute = new Date().getMinutes();
  text = this.timeHour >= 12 ? 'pm' : 'am';
  timeMinuteText = this.timeMinute < 10 ? '0' : '';
  dateDay = new Date().getDate();
  dateMonth = new Date().getMonth() + 1;

  time =
    this.timeHour +
    ':' +
    this.timeMinuteText +
    this.timeMinute +
    this.text +
    '\xa0' +
    this.dateDay +
    '/' +
    this.dateMonth;

  // img popup
  img = document.getElementById('myImg');
  modalImg = document.getElementById('img01');
  captionText = document.getElementById('caption');
  // Get the <span> element that closes the modal
  span = document.getElementsByClassName('close')[0];
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
  imgClick(): any {
    document.getElementById('myModal').style.display = 'block';
    console.log('hey good lookin');
  }
  close(): any {
    document.getElementById('myModal').style.display = 'none';
    console.log('bye good lookin');
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
        this.time,
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
  comments: string[] = [];
  private commentsSub: Subscription;
  comment: FormControl = new FormControl('');

  infos: AuthDataInfo[] = [];
  private infosSub: Subscription;
  timeHour = new Date().getHours();
  timeMinute = new Date().getMinutes();
  text = this.timeHour >= 12 ? 'pm' : 'am';
  timeMinuteText = this.timeMinute < 10 ? '0' : '';
  dateDay = new Date().getDate();
  dateMonth = new Date().getMonth() + 1;

  time =
    this.timeHour +
    ':' +
    this.timeMinuteText +
    this.timeMinute +
    this.text +
    '\xa0' +
    this.dateDay +
    '/' +
    this.dateMonth;

  // img popup
  img = document.getElementById('myImg');
  modalImg = document.getElementById('img01');
  captionText = document.getElementById('caption');
  // Get the <span> element that closes the modal
  span = document.getElementsByClassName('close')[0];
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
  navigateToPost(): any {
    // const ID = (document.getElementById('userName') as HTMLInputElement).value;
    this.route.navigate(['/post-page/:'], {
      queryParams: { userId: this.userId },
    });
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
  imgClick(): any {
    document.getElementById('myModal').style.display = 'block';
    console.log('hey good lookin');
  }
  close(): any {
    document.getElementById('myModal').style.display = 'none';
    console.log('bye good lookin');
  }
  CommentTrigger(postId: string): void {
    if (this.comment.value) {
      this.commentsService.createComment(
        this.comment.value,
        this.userId,
        this.time,
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
  timeHour = new Date().getHours();
  timeMinute = new Date().getMinutes();
  text = this.timeHour >= 12 ? 'pm' : 'am';
  timeMinuteText = this.timeMinute < 10 ? '0' : '';
  dateDay = new Date().getDate();
  dateMonth = new Date().getMonth() + 1;

  time =
    this.timeHour +
    ':' +
    this.timeMinuteText +
    this.timeMinute +
    this.text +
    '\xa0' +
    this.dateDay +
    '/' +
    this.dateMonth;
  ngOnInit(): void {
    this.postService.getPostsFeed(6);
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
    time,
    postId,
  }: // parentId,
  {
    body: string;
    userId: string;
    time: string;
    postId: string;
    // parentId: null | string;
  }): void {
    console.log('addComment', postId);
    this.commentsService
      .createComment(body, userId, time, postId)
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
  timeHour = new Date().getHours();
  timeMinute = new Date().getMinutes();
  text = this.timeHour >= 12 ? 'pm' : 'am';
  timeMinuteText = this.timeMinute < 10 ? '0' : '';
  dateDay = new Date().getDate();
  dateMonth = new Date().getMonth() + 1;

  time =
    this.timeHour +
    ':' +
    this.timeMinuteText +
    this.timeMinute +
    this.text +
    '\xa0' +
    this.dateDay +
    '/' +
    this.dateMonth;

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
        this.time,
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
  recomCounter = 0;
  countVisibility = 0;
  posts: Post[] = [];

  // img popup
  img = document.getElementById('myImg');
  modalImg = document.getElementById('img01');
  captionText = document.getElementById('caption');
  // Get the <span> element that closes the modal
  span = document.getElementsByClassName('close')[0];

  private postsSub: Subscription;

  infos: AuthDataInfo[] = [];
  private infosSub: Subscription;

  comments: string[] = [];
  // number of comments that load
  private commentsSub: Subscription;
  comment: FormControl = new FormControl('');

  timeHour = new Date().getHours();
  timeMinute = new Date().getMinutes();
  text = this.timeHour >= 12 ? 'pm' : 'am';
  timeMinuteText = this.timeMinute < 10 ? '0' : '';
  dateDay = new Date().getDate();
  dateMonth = new Date().getMonth() + 1;

  time =
    this.timeHour +
    ':' +
    this.timeMinuteText +
    this.timeMinute +
    this.text +
    '\xa0' +
    this.dateDay +
    '/' +
    this.dateMonth;

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
    this.postService.getPostsFeed(0);
    this.postsSub = this.postService
      .getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
        this.isLoading = false;
        console.log('posts personal', this.posts);
      });
    // Info
    this.authService.getInfo(this.recomCounter);
    this.infosSub = this.authService
      .getInfoUpdateListener()
      .subscribe((infos: AuthDataInfo[]) => {
        this.infos = infos;
        this.isLoading = false;
      });
  }
  imgClick(imgPath): any {
    document.getElementById('myModal').style.display = 'block';
    document.getElementById('img01').src = imgPath;
    console.log('hey good lookin');
  }
  close(): any {
    document.getElementById('myModal').style.display = 'none';
    console.log('bye good lookin');
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
  // Forward
  onClickFeed(): any {
    const count = 1;
    this.countVisibility += count;
    const counting = 6;
    this.recomCounter += counting;
    console.log('hey', this.recomCounter);
    console.log('howdy', this.countVisibility);
    const NextBtn = document.getElementById('topScroll');
    NextBtn.scrollIntoView();
    this.postService.getPostsFeed(this.recomCounter);
    this.postsSub = this.postService
      .getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
        this.isLoading = false;
        console.log('posts personal', this.posts);
      });
  }
  // Back
  onClickFeedBack(): any {
    const count = 1;
    this.countVisibility -= count;
    const counting = 6;
    this.recomCounter -= counting;
    console.log('hey back', this.recomCounter);
    console.log('howdy', this.countVisibility);

    this.postService.getPostsFeed(this.recomCounter);
    this.postsSub = this.postService
      .getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
        this.isLoading = false;
        console.log('posts personal', this.posts);
      });
  }
  onClickComments(postId: string): any {
    const count = 1;
    this.countVisibility += count;
    const counting = 6;
    this.recomCounter += counting;
    console.log('hey', this.recomCounter);
    console.log('howdy', this.countVisibility);
    const NextBtn = document.getElementById('topScroll');
    NextBtn.scrollIntoView();
    this.commentsService.getComments(postId);
    this.commentsSub = this.commentsService
      .getMessagesUpdateListener()
      .subscribe((comments: string[]) => {
        this.comments = comments;
      });
  }
  CommentTrigger(postId: string): void {
    if (this.comment.value) {
      this.commentsService.createComment(
        this.comment.value,
        this.userId,
        this.time,
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
  open = true;
  closed = true;
  picker = new Picker();
  userId: string;
  recomCounter = 0;
  countVisibility = 0;
  posts: Post[] = [];

  private postsSub: Subscription;

  infos: AuthDataInfo[] = [];
  private infosSub: Subscription;

  comments: string[] = [];
  // number of comments that load
  private commentsSub: Subscription;
  comment: FormControl = new FormControl('');

  timeHour = new Date().getHours();
  timeMinute = new Date().getMinutes();
  text = this.timeHour >= 12 ? 'pm' : 'am';
  timeMinuteText = this.timeMinute < 10 ? '0' : '';
  dateDay = new Date().getDate();
  dateMonth = new Date().getMonth() + 1;

  time =
    this.timeHour +
    ':' +
    this.timeMinuteText +
    this.timeMinute +
    this.text +
    '\xa0' +
    this.dateDay +
    '/' +
    this.dateMonth;

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
    this.postService.getPostsFeed(0);
    this.postsSub = this.postService
      .getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
        this.isLoading = false;
        console.log('posts personal', this.posts);
      });
    // Info
    this.authService.getInfo(this.recomCounter);
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
  // Forward
  onClickFeed(): any {
    const count = 1;
    this.countVisibility += count;
    const counting = 6;
    this.recomCounter += counting;
    console.log('hey', this.recomCounter);
    console.log('howdy', this.countVisibility);

    this.postService.getPostsFeed(this.recomCounter);
    this.postsSub = this.postService
      .getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
        this.isLoading = false;
        console.log('posts personal', this.posts);
      });
  }
  // Back
  onClickFeedBack(): any {
    const count = 1;
    this.countVisibility -= count;
    const counting = 6;
    this.recomCounter -= counting;
    console.log('hey back', this.recomCounter);
    console.log('howdy', this.countVisibility);

    this.postService.getPostsFeed(this.recomCounter);
    this.postsSub = this.postService
      .getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
        this.isLoading = false;
        console.log('posts personal', this.posts);
      });
  }
  CommentTrigger(postId: string): void {
    if (this.comment.value) {
      this.commentsService.createComment(
        this.comment.value,
        this.userId,
        this.time,
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
  selector: 'app-card-main-page',
  templateUrl: './reusable-cardMainPage.component.html',
  styleUrls: ['./reusable-card.component.scss'],
})
export class CardInfoMainPageComponent implements OnInit {
  category: string;
  userId: string;
  isLoading = false;
  recomCounter = 0;
  picker = new Picker();
  countVisibility = 0;
  posts: Post[] = [];
  private postsSub: Subscription;
  comments: string[] = [];
  // number of comments that load
  private commentsSub: Subscription;
  comment: FormControl = new FormControl('');

  timeHour = new Date().getHours();
  timeMinute = new Date().getMinutes();
  text = this.timeHour >= 12 ? 'pm' : 'am';
  timeMinuteText = this.timeMinute < 10 ? '0' : '';
  dateDay = new Date().getDate();
  dateMonth = new Date().getMonth() + 1;

  time =
    this.timeHour +
    ':' +
    this.timeMinuteText +
    this.timeMinute +
    this.text +
    '\xa0' +
    this.dateDay +
    '/' +
    this.dateMonth;

  // img popup
  img = document.getElementById('myImg');
  modalImg = document.getElementById('img01');
  captionText = document.getElementById('caption');
  // Get the <span> element that closes the modal
  span = document.getElementsByClassName('close')[0];
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

      this.postService.getPostsMainPage(this.category, 0);
      this.postsSub = this.postService
        .getPostUpdateListener()
        .subscribe((posts: Post[]) => {
          this.posts = posts;
          this.isLoading = false;
        });
    });
  }
  imgClick(): any {
    document.getElementById('myModal').style.display = 'block';
    console.log('hey good lookin');
  }
  close(): any {
    document.getElementById('myModal').style.display = 'none';
    console.log('bye good lookin');
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
  // Forward
  onClickFeed(): any {
    const count = 1;
    this.countVisibility += count;
    const counting = 6;
    this.recomCounter += counting;
    console.log('hey', this.recomCounter);
    console.log('howdy', this.countVisibility);
    const NextBtn = document.getElementById('topScroll');
    NextBtn.scrollIntoView();
    this.postService.getPostsMainPage(this.category, this.recomCounter);
    this.postsSub = this.postService
      .getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
        this.isLoading = false;
      });
  }
  // Back
  onClickFeedBack(): any {
    const count = 1;
    this.countVisibility -= count;
    const counting = 6;
    this.recomCounter -= counting;
    console.log('hey back', this.recomCounter);
    console.log('howdy', this.countVisibility);

    this.postService.getPostsMainPage(this.category, this.recomCounter);
    this.postsSub = this.postService
      .getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
        this.isLoading = false;
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
  CommentTrigger(postId): void {
    if (this.comment.value) {
      this.commentsService.createComment(
        this.comment.value,
        this.userId,
        this.time,
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

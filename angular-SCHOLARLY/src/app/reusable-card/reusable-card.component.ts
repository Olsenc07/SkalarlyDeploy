import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { OnInit } from '@angular/core';
import { Post, PostService } from '../services/post.service';
import { AuthService } from '../services/auth.service';
import { AuthDataInfo } from '../signup/auth-data.model';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CommentsService } from '../services/comments.service';
import { ShowCaseService, ShowCase } from '../services/showCase.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { createPopup } from '@picmo/popup-picker';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface CommentInterface {
  id: string;
  body: string;
  time: string;
  postId: string;
  ProfilePicPath: string;
  viewed: boolean;
  Creator: string;
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
export class ReusableCardComponent implements OnInit, OnDestroy {
  isLoading = false;
  hide = true;
  reposts = '';
  commentsValidator = '';
  valueChosen = '7';
  userId: string;
  user: string;
  open = true;

  // Filling with Post info from post.service
  posts: Post[] = [];
  private postsSub: Subscription;
  private countSub: Subscription;
  comments: string[] = [];
  private commentsSub: Subscription;
  comment: FormControl = new FormControl('');
  // number of comments that load
  recomCounter = 0;
  countVisibility = 0;
  infos: AuthDataInfo[] = [];
  private infosSub: Subscription;
  timeHourInitial = new Date().getHours();
  timeHour = this.testNum(this.timeHourInitial);
  timeMinute = new Date().getMinutes();
  text = this.timeHourInitial >= 12 ? 'pm' : 'am';
  timeMinuteText = this.timeMinute < 10 ? '0' : '';
  dateDay = new Date().getDate();
  dateMonth = new Date().getMonth();
  dateMonthName = this.testMonth(this.dateMonth);
  private subscriptionDude: Subscription;
  time =
    this.dateMonthName +
    '\xa0' +
    this.dateDay +
    '\xa0' +
    this.timeHour +
    ':' +
    this.timeMinuteText +
    this.timeMinute +
    '\xa0' +
    this.text;

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
  // Forward
  onClickFeed(): any {
    const count = 1;
    this.countVisibility += count;
    const counting = 6;
    this.recomCounter += counting;
    console.log('hey back', this.recomCounter);
    console.log('howdy', this.countVisibility);
    this.router.queryParams.subscribe((params) => {
      this.user = params.id;
      const id = this.user;
      this.postService.getOthersPosts(id, this.recomCounter);
      this.postsSub = this.postService
        .getPostUpdateListener()
        .subscribe((posts: Post[]) => {
          this.posts = posts;
          this.isLoading = false;
          console.log('posts personal forward', this.posts);
          this.postsSub.unsubscribe();
        });
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
    this.router.queryParams.subscribe((params) => {
      this.user = params.id;
      const id = this.user;
      this.postService.getOthersPosts(id, this.recomCounter);
      this.postsSub = this.postService
        .getPostUpdateListener()
        .subscribe((posts: Post[]) => {
          this.posts = posts;
          this.isLoading = false;
          console.log('posts personal back', this.posts);
          this.postsSub.unsubscribe();
        });
    });
  }
  // Adding emojis
  openEmoji(): void {
    const selectionContainer = document.getElementById('showEmojis');
    const triggerEmoji = document.getElementById('triggerEmo');
    console.log('star through');
    const picker = createPopup(
      {},
      {
        referenceElement: selectionContainer,
        triggerElement: triggerEmoji,
        position: 'top',
      }
    );

    picker.toggle();
    picker.addEventListener('emoji:select', (selection) => {
      console.log('Selected emoji: ', selection.emoji);
      const msgs = selection.emoji;
      const msg = this.comment.value + msgs;
      this.comment.setValue(msg);
    });
  }
  emojiPreventClose($event: any): any {
    $event.stopPropagation();
  }
  spreadWord(postId: string): void {
    console.log('for me baby', postId);
    console.log('for me baby 2', this.userId);
    this.postService.addPostShared(postId, this.userId);
  }
  getPostsTrendingNumber(OriginalPostId: string, postId: string): any {
    console.log('Hey babe I miss you more', postId.length);
    console.log('Hey babe I miss you ', OriginalPostId.length);
    if (OriginalPostId.length === 0) {
      this.postService.getPostsTrendingNumberOwn(postId);
      this.valueChosen = postId;
      console.log('logic1', this.valueChosen);
    } else {
      this.postService.getPostsTrendingNumber(OriginalPostId);
      this.valueChosen = OriginalPostId;
      console.log('logic', this.valueChosen);
    }
    this.countSub = this.postService
      .getCountUpdateListener()
      .subscribe((value: string) => {
        this.reposts = value;
        console.log(' reposts', this.reposts);
        this.countSub.unsubscribe();
      });
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
  navToPost(postId: string): any {
    console.log('Hey babe I miss you', postId);
    this.route.navigate(['/single/:'], { queryParams: { postId } });
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
    this.subscriptionDude = this.router.queryParams.subscribe((params) => {
      this.user = params.id;
      const id = this.user;
      // posts
      this.postService.getOthersPosts(id, 0);
      this.postsSub = this.postService
        .getPostUpdateListener()
        .subscribe((posts: Post[]) => {
          this.posts = posts;
          this.isLoading = false;
        });
    });
    console.log('user', this.user);
  }
  ngOnDestroy(): any {
    this.postsSub.unsubscribe();
    this.subscriptionDude.unsubscribe();
  }
  navToHashTag(HashTag: string): any {
    console.log('HashTag', HashTag);
    // Where the post was posted
    this.route.navigate(['/hashtag/:'], {
      queryParams: { hashtag: HashTag },
    });
  }

  commentsValidatorFunc(postId: string): void {
    console.log('validator', this.commentsValidator);
    console.log('postId', postId);

    if (this.commentsValidator !== postId) {
      this.comment.setValue('');
    }
    this.commentsValidator = postId;

    console.log('commentsValidator', this.commentsValidator);
  }
  // Am Pm instead of 24hr clock
  testNum(timeHourInitial: any): number {
    if (timeHourInitial > 12) {
      if (timeHourInitial === 13) {
        return 1;
      }
      if (timeHourInitial === 14) {
        return 2;
      }
      if (timeHourInitial === 15) {
        return 3;
      }
      if (timeHourInitial === 16) {
        return 4;
      }
      if (timeHourInitial === 17) {
        return 5;
      }
      if (timeHourInitial === 18) {
        return 6;
      }
      if (timeHourInitial === 19) {
        return 7;
      }
      if (timeHourInitial === 20) {
        return 8;
      }
      if (timeHourInitial === 21) {
        return 9;
      }
      if (timeHourInitial === 22) {
        return 10;
      }
      if (timeHourInitial === 23) {
        return 11;
      }
      if (timeHourInitial === 24) {
        return 12;
      }
    } else {
      return timeHourInitial;
    }
  }
  testMonth(dateMonth: any): string {
    if (dateMonth === 0) {
      return 'Jan';
    }
    if (dateMonth === 1) {
      return 'Feb';
    }
    if (dateMonth === 2) {
      return 'Mar';
    }
    if (dateMonth === 3) {
      return 'Apr';
    }
    if (dateMonth === 4) {
      return 'May';
    }
    if (dateMonth === 5) {
      return 'June';
    }
    if (dateMonth === 6) {
      return 'July';
    }
    if (dateMonth === 7) {
      return 'Aug';
    }
    if (dateMonth === 8) {
      return 'Sept';
    }
    if (dateMonth === 9) {
      return 'Oct';
    }
    if (dateMonth === 10) {
      return 'Nov';
    }
    if (dateMonth === 11) {
      return 'Dec';
    }
  }
  imgClick(imgPath): any {
    document.getElementById('myModal').style.display = 'block';
    (document.getElementById('img01') as HTMLImageElement).src = imgPath;
    this.hide = false;

    console.log('hey good lookin');
  }
  close(): any {
    document.getElementById('myModal').style.display = 'none';
    this.hide = true;

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
        this.comments = comments.reverse();
        this.commentsSub.unsubscribe();
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
export class ReusableCardPersonalComponent implements OnInit, OnDestroy {
  isLoading = false;
  hide = true;
  userId: string;
  reposts = '';
  commentsValidator = '';
  valueChosen = '7';
  // Filling with Post info from post.service
  posts: Post[] = [];
  recomCounter = 0;
  countVisibility = 0;
  private postsSub: Subscription;
  private countSub: Subscription;
  comments: string[] = [];
  private commentsSub: Subscription;
  comment: FormControl = new FormControl('');
  infos: AuthDataInfo[] = [];
  private infosSub: Subscription;
  timeHourInitial = new Date().getHours();
  timeHour = this.testNum(this.timeHourInitial);
  timeMinute = new Date().getMinutes();
  text = this.timeHour >= 12 ? 'pm' : 'am';
  timeMinuteText = this.timeMinute < 10 ? '0' : '';
  dateDay = new Date().getDate();
  dateMonth = new Date().getMonth();
  dateMonthName = this.testMonth(this.dateMonth);

  time =
    this.dateMonthName +
    '\xa0' +
    this.dateDay +
    '\xa0' +
    this.timeHour +
    ':' +
    this.timeMinuteText +
    this.timeMinute +
    '\xa0' +
    this.text;

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
  // Forward
  onClickFeed(): any {
    const count = 1;
    this.countVisibility += count;
    const counting = 6;
    this.recomCounter += counting;

    this.postService.getPostsPersonal(this.userId, this.recomCounter);
    this.postsSub = this.postService
      .getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
        this.isLoading = false;
        console.log('posts personal', this.posts);
        this.postsSub.unsubscribe();
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

    this.postService.getPostsPersonal(this.userId, this.recomCounter);
    this.postsSub = this.postService
      .getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
        this.isLoading = false;
        console.log('posts personal', this.posts);
        this.postsSub.unsubscribe();
      });
  }
  // Adding emojis
  openEmoji(): void {
    const selectionContainer = document.getElementById('showEmojis');
    const triggerEmoji = document.getElementById('triggerEmo');
    console.log('star through');
    const picker = createPopup(
      {},
      {
        referenceElement: selectionContainer,
        triggerElement: triggerEmoji,
        position: 'top',
      }
    );

    picker.toggle();
    picker.addEventListener('emoji:select', (selection) => {
      console.log('Selected emoji: ', selection.emoji);
      const msgs = selection.emoji;
      const msg = this.comment.value + msgs;
      this.comment.setValue(msg);
    });
  }
  getPostsTrendingNumber(OriginalPostId: string, postId: string): any {
    console.log('Hey babe I miss you more', postId.length);

    if (OriginalPostId.length === 0) {
      this.postService.getPostsTrendingNumberOwn(postId);
      this.valueChosen = postId;
      console.log('logic1', this.valueChosen);
    } else {
      this.postService.getPostsTrendingNumber(OriginalPostId);
      this.valueChosen = OriginalPostId;
      console.log('logic', this.valueChosen);
    }
    this.countSub = this.postService
      .getCountUpdateListener()
      .subscribe((value: string) => {
        this.reposts = value;
        console.log(' reposts', this.reposts);
        this.countSub.unsubscribe();
      });
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
  navToPost(postId: string): any {
    console.log('Hey babe I miss you', postId);
    this.router.navigate(['/single/:'], { queryParams: { postId } });
  }
  constructor(
    private router: Router,
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
    this.postService.getPostsPersonal(this.userId, 0);
    this.postsSub = this.postService
      .getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
        this.isLoading = false;
        console.log('posts', this.posts);
      });
  }
  ngOnDestroy(): any {
    this.postsSub.unsubscribe();
  }
  navToHashTag(HashTag: string): any {
    console.log('HashTag', HashTag);
    // Where the post was posted
    this.router.navigate(['/hashtag/:'], {
      queryParams: { hashtag: HashTag },
    });
  }

  commentsValidatorFunc(postId: string): void {
    if (this.commentsValidator !== postId) {
      this.comment.setValue('');
    }
    this.commentsValidator = postId;
  }
  // Am Pm instead of 24hr clock
  testNum(timeHourInitial: any): number {
    if (timeHourInitial > 12) {
      if (timeHourInitial === 13) {
        return 1;
      }
      if (timeHourInitial === 14) {
        return 2;
      }
      if (timeHourInitial === 15) {
        return 3;
      }
      if (timeHourInitial === 16) {
        return 4;
      }
      if (timeHourInitial === 17) {
        return 5;
      }
      if (timeHourInitial === 18) {
        return 6;
      }
      if (timeHourInitial === 19) {
        return 7;
      }
      if (timeHourInitial === 20) {
        return 8;
      }
      if (timeHourInitial === 21) {
        return 9;
      }
      if (timeHourInitial === 22) {
        return 10;
      }
      if (timeHourInitial === 23) {
        return 11;
      }
      if (timeHourInitial === 24) {
        return 12;
      }
    } else {
      return timeHourInitial;
    }
  }
  testMonth(dateMonth: any): string {
    if (dateMonth === 0) {
      return 'Jan';
    }
    if (dateMonth === 1) {
      return 'Feb';
    }
    if (dateMonth === 2) {
      return 'Mar';
    }
    if (dateMonth === 3) {
      return 'Apr';
    }
    if (dateMonth === 4) {
      return 'May';
    }
    if (dateMonth === 5) {
      return 'June';
    }
    if (dateMonth === 6) {
      return 'July';
    }
    if (dateMonth === 7) {
      return 'Aug';
    }
    if (dateMonth === 8) {
      return 'Sept';
    }
    if (dateMonth === 9) {
      return 'Oct';
    }
    if (dateMonth === 10) {
      return 'Nov';
    }
    if (dateMonth === 11) {
      return 'Dec';
    }
  }
  imgClick(imgPath): any {
    document.getElementById('myModal').style.display = 'block';
    (document.getElementById('img01') as HTMLImageElement).src = imgPath;
    this.hide = false;
    console.log('hey good lookin');
  }
  close(): any {
    document.getElementById('myModal').style.display = 'none';
    this.hide = true;

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
        this.comments = comments.reverse();
        this.commentsSub.unsubscribe();
      });
  }
}

// Comments on posts
@Component({
  selector: 'app-card-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./reusable-card.component.scss'],
})
export class ReusableCommentsComponent implements OnInit, OnDestroy {
  @Input() currentUserId!: string;
  posts: Post[] = [];
  userId: string;
  private postsSub: Subscription;
  private commentSubYo: Subscription;
  comments: CommentInterface[] = [];
  activeComment: ActiveCommentInterface | null = null;
  constructor(
    private commentsService: CommentsService,
    public postService: PostService,
    public authService: AuthService
  ) {}

  timeHourInitial = new Date().getHours();
  timeHour = this.testNum(this.timeHourInitial);
  timeMinute = new Date().getMinutes();
  text = this.timeHourInitial >= 12 ? 'pm' : 'am';
  timeMinuteText = this.timeMinute < 10 ? '0' : '';
  dateDay = new Date().getDate();
  dateMonth = new Date().getMonth();
  dateMonthName = this.testMonth(this.dateMonth);

  time =
    this.dateMonthName +
    '\xa0' +
    this.dateDay +
    '\xa0' +
    this.timeHour +
    ':' +
    this.timeMinuteText +
    this.timeMinute +
    '\xa0' +
    this.text;

  ngOnInit(): void {
    this.userId = this.authService.getUserId();

    this.postService.getPostsFeed(6, this.userId);
    this.postsSub = this.postService
      .getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;

        console.log('posts personal', this.posts);
      });
  }
  ngOnDestroy(): any {
    this.postsSub.unsubscribe();
  }
  // Am Pm instead of 24hr clock
  testNum(timeHourInitial: any): number {
    if (timeHourInitial > 12) {
      if (timeHourInitial === 13) {
        return 1;
      }
      if (timeHourInitial === 14) {
        return 2;
      }
      if (timeHourInitial === 15) {
        return 3;
      }
      if (timeHourInitial === 16) {
        return 4;
      }
      if (timeHourInitial === 17) {
        return 5;
      }
      if (timeHourInitial === 18) {
        return 6;
      }
      if (timeHourInitial === 19) {
        return 7;
      }
      if (timeHourInitial === 20) {
        return 8;
      }
      if (timeHourInitial === 21) {
        return 9;
      }
      if (timeHourInitial === 22) {
        return 10;
      }
      if (timeHourInitial === 23) {
        return 11;
      }
      if (timeHourInitial === 24) {
        return 12;
      }
    } else {
      return timeHourInitial;
    }
  }
  testMonth(dateMonth: any): string {
    if (dateMonth === 0) {
      return 'Jan';
    }
    if (dateMonth === 1) {
      return 'Feb';
    }
    if (dateMonth === 2) {
      return 'Mar';
    }
    if (dateMonth === 3) {
      return 'Apr';
    }
    if (dateMonth === 4) {
      return 'May';
    }
    if (dateMonth === 5) {
      return 'June';
    }
    if (dateMonth === 6) {
      return 'July';
    }
    if (dateMonth === 7) {
      return 'Aug';
    }
    if (dateMonth === 8) {
      return 'Sept';
    }
    if (dateMonth === 9) {
      return 'Oct';
    }
    if (dateMonth === 10) {
      return 'Nov';
    }
    if (dateMonth === 11) {
      return 'Dec';
    }
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
    this.commentSubYo = this.commentsService
      .createComment(body, userId, time, postId)
      .subscribe((createdComment) => {
        this.comments = [...this.comments, createdComment];
        this.activeComment = null;
        this.commentSubYo.unsubscribe();
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
  timeHourInitial = new Date().getHours();
  timeHour = this.testNum(this.timeHourInitial);
  timeMinute = new Date().getMinutes();
  text = this.timeHourInitial >= 12 ? 'pm' : 'am';
  timeMinuteText = this.timeMinute < 10 ? '0' : '';
  dateDay = new Date().getDate();
  dateMonth = new Date().getMonth();
  dateMonthName = this.testMonth(this.dateMonth);

  time =
    this.dateMonthName +
    '\xa0' +
    this.dateDay +
    '\xa0' +
    this.timeHour +
    ':' +
    this.timeMinuteText +
    this.timeMinute +
    '\xa0' +
    this.text;

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
  // Am Pm instead of 24hr clock
  testNum(timeHourInitial: any): number {
    if (timeHourInitial > 12) {
      if (timeHourInitial === 13) {
        return 1;
      }
      if (timeHourInitial === 14) {
        return 2;
      }
      if (timeHourInitial === 15) {
        return 3;
      }
      if (timeHourInitial === 16) {
        return 4;
      }
      if (timeHourInitial === 17) {
        return 5;
      }
      if (timeHourInitial === 18) {
        return 6;
      }
      if (timeHourInitial === 19) {
        return 7;
      }
      if (timeHourInitial === 20) {
        return 8;
      }
      if (timeHourInitial === 21) {
        return 9;
      }
      if (timeHourInitial === 22) {
        return 10;
      }
      if (timeHourInitial === 23) {
        return 11;
      }
      if (timeHourInitial === 24) {
        return 12;
      }
    } else {
      return timeHourInitial;
    }
  }
  testMonth(dateMonth: any): string {
    if (dateMonth === 0) {
      return 'Jan';
    }
    if (dateMonth === 1) {
      return 'Feb';
    }
    if (dateMonth === 2) {
      return 'Mar';
    }
    if (dateMonth === 3) {
      return 'Apr';
    }
    if (dateMonth === 4) {
      return 'May';
    }
    if (dateMonth === 5) {
      return 'June';
    }
    if (dateMonth === 6) {
      return 'July';
    }
    if (dateMonth === 7) {
      return 'Aug';
    }
    if (dateMonth === 8) {
      return 'Sept';
    }
    if (dateMonth === 9) {
      return 'Oct';
    }
    if (dateMonth === 10) {
      return 'Nov';
    }
    if (dateMonth === 11) {
      return 'Dec';
    }
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
export class ShowCaseComponent implements OnInit, OnDestroy {
  userId: string;
  hide = true;
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
    this.showCaseService.getShowCasePersonal(this.userId, 0);
    this.postsSub = this.showCaseService
      .getshowCaseUpdateListener()
      .subscribe((showcases: ShowCase[]) => {
        this.showCases = showcases;
      });
  }
  ngOnDestroy(): any {
    this.postsSub.unsubscribe();
  }
  imgClick(imgPath: any): any {
    document.getElementById('myModal').style.display = 'block';
    (document.getElementById('img01') as HTMLImageElement).src = imgPath;
    this.hide = false;

    console.log('hey good lookin');
  }
  close(): any {
    document.getElementById('myModal').style.display = 'none';
    this.hide = true;

    console.log('bye good lookin');
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
export class CardFeedComponent implements OnInit, OnDestroy {
  isLoading = false;
  open = true;
  reposts = '';
  commentsValidator = '';
  closed = true;
  hide = true;
  userId: string;
  recomCounter = 0;
  valueChosen = '7';
  countVisibility = 0;
  posts: Post[] = [];

  // img popup
  img = document.getElementById('myImg');
  modalImg = document.getElementById('img01');
  captionText = document.getElementById('caption');
  // Get the <span> element that closes the modal
  span = document.getElementsByClassName('close')[0];

  private postsSub: Subscription;

  // infos: AuthDataInfo[] = [];
  private countSub: Subscription;

  comments: string[] = [];
  // number of comments that load
  private commentsSub: Subscription;
  comment: FormControl = new FormControl('');

  timeHourInitial = new Date().getHours();
  timeHour = this.testNum(this.timeHourInitial);
  timeMinute = new Date().getMinutes();
  text = this.timeHourInitial >= 12 ? 'pm' : 'am';
  timeMinuteText = this.timeMinute < 10 ? '0' : '';
  dateDay = new Date().getDate();
  dateMonth = new Date().getMonth();
  dateMonthName = this.testMonth(this.dateMonth);

  time =
    this.dateMonthName +
    '\xa0' +
    this.dateDay +
    '\xa0' +
    this.timeHour +
    ':' +
    this.timeMinuteText +
    this.timeMinute +
    '\xa0' +
    this.text;

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
    this.postService.getPostsFeed(0, this.userId);
    this.postsSub = this.postService
      .getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
        this.isLoading = false;
        console.log('posts personal', this.posts);
      });
    // Info
    // this.authService.getInfo(this.recomCounter);
    // this.infosSub = this.authService
    //   .getInfoUpdateListener()
    //   .subscribe((infos: AuthDataInfo[]) => {
    //     this.infos = infos.reverse();
    //     this.isLoading = false;
    //   });
  }
  ngOnDestroy(): any {
    this.postsSub.unsubscribe();
  }
  navToHashTag(HashTag: string): any {
    console.log('HashTag', HashTag);
    // Where the post was posted
    this.router.navigate(['/hashtag/:'], {
      queryParams: { hashtag: HashTag },
    });
  }

  navigateToPost(): any {
    // const ID = (document.getElementById('userName') as HTMLInputElement).value;
    this.router.navigate(['/post-page/:'], {
      queryParams: { userId: this.userId },
    });
  }
  commentsValidatorFunc(postId: string): void {
    if (this.commentsValidator !== postId) {
      this.comment.setValue('');
    }
    this.commentsValidator = postId;
  }
  // Am Pm instead of 24hr clock
  testNum(timeHourInitial: any): number {
    if (timeHourInitial > 12) {
      if (timeHourInitial === 13) {
        return 1;
      }
      if (timeHourInitial === 14) {
        return 2;
      }
      if (timeHourInitial === 15) {
        return 3;
      }
      if (timeHourInitial === 16) {
        return 4;
      }
      if (timeHourInitial === 17) {
        return 5;
      }
      if (timeHourInitial === 18) {
        return 6;
      }
      if (timeHourInitial === 19) {
        return 7;
      }
      if (timeHourInitial === 20) {
        return 8;
      }
      if (timeHourInitial === 21) {
        return 9;
      }
      if (timeHourInitial === 22) {
        return 10;
      }
      if (timeHourInitial === 23) {
        return 11;
      }
      if (timeHourInitial === 24) {
        return 12;
      }
    } else {
      return timeHourInitial;
    }
  }
  testMonth(dateMonth: any): string {
    if (dateMonth === 0) {
      return 'Jan';
    }
    if (dateMonth === 1) {
      return 'Feb';
    }
    if (dateMonth === 2) {
      return 'Mar';
    }
    if (dateMonth === 3) {
      return 'Apr';
    }
    if (dateMonth === 4) {
      return 'May';
    }
    if (dateMonth === 5) {
      return 'June';
    }
    if (dateMonth === 6) {
      return 'July';
    }
    if (dateMonth === 7) {
      return 'Aug';
    }
    if (dateMonth === 8) {
      return 'Sept';
    }
    if (dateMonth === 9) {
      return 'Oct';
    }
    if (dateMonth === 10) {
      return 'Nov';
    }
    if (dateMonth === 11) {
      return 'Dec';
    }
  }
  getPostsTrendingNumber(OriginalPostId: string, postId: string): any {
    console.log('Hey babe I miss you more', postId);
    console.log('Hey babe I miss you ', OriginalPostId);
    if (OriginalPostId.length === 0) {
      this.postService.getPostsTrendingNumberOwn(postId);
      this.valueChosen = postId;
      console.log('logic1', this.valueChosen);
    } else {
      this.postService.getPostsTrendingNumber(OriginalPostId);
      this.valueChosen = OriginalPostId;
      console.log('logic', this.valueChosen);
    }
    this.countSub = this.postService
      .getCountUpdateListener()
      .subscribe((value) => {
        this.reposts = value;
        console.log(' reposts', this.reposts);
        this.countSub.unsubscribe();
      });
  }
  navToPost(postId: string): any {
    console.log('Hey babe I miss you', postId);
    this.router.navigate(['/single/:'], { queryParams: { postId } });
  }
  spreadWord(postId: string): void {
    this.postService.addPostShared(postId, this.userId);
  }
  openEmoji(): void {
    const selectionContainer = document.getElementById('showEmojis');
    const triggerEmoji = document.getElementById('triggerEmo');
    const picker = createPopup(
      {},
      {
        referenceElement: selectionContainer,
        triggerElement: triggerEmoji,
        position: 'top',
      }
    );

    picker.toggle();
    picker.addEventListener('emoji:select', (selection) => {
      console.log('Selected emoji: ', selection.emoji);
      const msgs = selection.emoji;

      const msg = this.comment.value + msgs;
      this.comment.setValue(msg);
    });
  }
  imgClick(imgPath): any {
    document.getElementById('myModal').style.display = 'block';
    (document.getElementById('img01') as HTMLImageElement).src = imgPath;
    this.hide = false;

    console.log('hey good lookin');
  }
  close(): any {
    document.getElementById('myModal').style.display = 'none';
    this.hide = true;

    console.log('bye good lookin');
  }
  // Adding emojis
  addEmoji(event: any): any {
    const msgs = event?.detail?.unicode;
    const msg = this.comment.value + msgs;
    this.comment.setValue(msg);
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
    this.postService.getPostsFeed(this.recomCounter, this.userId);
    this.postsSub = this.postService
      .getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
        this.isLoading = false;
        console.log('posts personal', this.posts);
        this.postsSub.unsubscribe();
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

    this.postService.getPostsFeed(this.recomCounter, this.userId);
    this.postsSub = this.postService
      .getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
        this.isLoading = false;
        console.log('posts personal', this.posts);
        this.postsSub.unsubscribe();
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
        this.commentsSub.unsubscribe();
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
        this.comments = comments.reverse();
        this.commentsSub.unsubscribe();
      });
  }
}
// Trending
@Component({
  selector: 'app-card-trending',
  templateUrl: './reusable-cardTrending.component.html',
  styleUrls: ['./reusable-card.component.scss'],
})
export class TrendingFeedComponent implements OnInit, OnDestroy {
  isLoading = false;
  reposts = '';
  commentsValidator = '';
  open = true;
  closed = true;
  hide = true;
  valueChosen = '7';
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
  private trendingSub: Subscription;
  // infos: AuthDataInfo[] = [];
  private infosSub: Subscription;

  comments: string[] = [];
  // number of comments that load
  private commentsSub: Subscription;
  comment: FormControl = new FormControl('');

  timeHourInitial = new Date().getHours();
  timeHour = this.testNum(this.timeHourInitial);
  timeMinute = new Date().getMinutes();
  text = this.timeHourInitial >= 12 ? 'pm' : 'am';
  timeMinuteText = this.timeMinute < 10 ? '0' : '';
  dateDay = new Date().getDate();
  dateMonth = new Date().getMonth();
  dateMonthName = this.testMonth(this.dateMonth);

  time =
    this.dateMonthName +
    '\xa0' +
    this.dateDay +
    '\xa0' +
    this.timeHour +
    ':' +
    this.timeMinuteText +
    this.timeMinute +
    '\xa0' +
    this.text;

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
    this.postService.getPostsTrending(this.userId);
    this.postsSub = this.postService
      .getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
        this.isLoading = false;
        console.log('posts personal', this.posts);
      });
    // Info
    // this.authService.getInfo(this.recomCounter);
    // this.infosSub = this.authService
    //   .getInfoUpdateListener()
    //   .subscribe((infos: AuthDataInfo[]) => {
    //     this.infos = infos.reverse();
    //     this.isLoading = false;
    //   });
  }
  ngOnDestroy(): any {
    this.postsSub.unsubscribe();
  }
  navToHashTag(HashTag: string): any {
    console.log('HashTag', HashTag);
    // Where the post was posted
    this.router.navigate(['/hashtag/:'], {
      queryParams: { hashtag: HashTag },
    });
  }
  commentsValidatorFunc(postId: string): void {
    if (this.commentsValidator !== postId) {
      this.comment.setValue('');
    }
    this.commentsValidator = postId;
  }
  // Am Pm instead of 24hr clock
  testNum(timeHourInitial: any): number {
    if (timeHourInitial > 12) {
      if (timeHourInitial === 13) {
        return 1;
      }
      if (timeHourInitial === 14) {
        return 2;
      }
      if (timeHourInitial === 15) {
        return 3;
      }
      if (timeHourInitial === 16) {
        return 4;
      }
      if (timeHourInitial === 17) {
        return 5;
      }
      if (timeHourInitial === 18) {
        return 6;
      }
      if (timeHourInitial === 19) {
        return 7;
      }
      if (timeHourInitial === 20) {
        return 8;
      }
      if (timeHourInitial === 21) {
        return 9;
      }
      if (timeHourInitial === 22) {
        return 10;
      }
      if (timeHourInitial === 23) {
        return 11;
      }
      if (timeHourInitial === 24) {
        return 12;
      }
    } else {
      return timeHourInitial;
    }
  }
  testMonth(dateMonth: any): string {
    if (dateMonth === 0) {
      return 'Jan';
    }
    if (dateMonth === 1) {
      return 'Feb';
    }
    if (dateMonth === 2) {
      return 'Mar';
    }
    if (dateMonth === 3) {
      return 'Apr';
    }
    if (dateMonth === 4) {
      return 'May';
    }
    if (dateMonth === 5) {
      return 'June';
    }
    if (dateMonth === 6) {
      return 'July';
    }
    if (dateMonth === 7) {
      return 'Aug';
    }
    if (dateMonth === 8) {
      return 'Sept';
    }
    if (dateMonth === 9) {
      return 'Oct';
    }
    if (dateMonth === 10) {
      return 'Nov';
    }
    if (dateMonth === 11) {
      return 'Dec';
    }
  }
  getPostsTrendingNumber(OriginalPostId: string, postId: string): any {
    console.log('Hey babe I miss you more', postId.length);
    console.log('Hey babe I miss you ', OriginalPostId.length);
    if (OriginalPostId.length === 0) {
      this.postService.getPostsTrendingNumberOwn(postId);
      this.valueChosen = postId;
      console.log('logic1', this.valueChosen);
    } else {
      this.postService.getPostsTrendingNumber(OriginalPostId);
      this.valueChosen = OriginalPostId;
      console.log('logic', this.valueChosen);
    }
    this.trendingSub = this.postService
      .getCountUpdateListener()
      .subscribe((value) => {
        this.reposts = value;
        console.log(' reposts', this.reposts);
        this.trendingSub.unsubscribe();
      });
  }
  spreadWord(postId: string): void {
    console.log('mint', postId);
    this.postService.addPostShared(postId, this.userId);
  }
  navToPost(postId: string): any {
    console.log('Hey babe I miss you', postId);
    this.router.navigate(['/single/:'], { queryParams: { postId } });
  }
  openEmoji(): void {
    const selectionContainer = document.getElementById('showEmojis');
    const triggerEmoji = document.getElementById('triggerEmo');
    console.log('star through');
    const picker = createPopup(
      {},
      {
        referenceElement: selectionContainer,
        triggerElement: triggerEmoji,
        position: 'top',
      }
    );

    picker.toggle();
    picker.addEventListener('emoji:select', (selection) => {
      console.log('Selected emoji: ', selection.emoji);
      const msgs = selection.emoji;
      const msg = this.comment.value + msgs;
      this.comment.setValue(msg);
    });
  }
  imgClick(imgPath): any {
    document.getElementById('myModal').style.display = 'block';
    (document.getElementById('img01') as HTMLImageElement).src = imgPath;
    this.hide = false;

    console.log('hey good lookin');
  }
  close(): any {
    document.getElementById('myModal').style.display = 'none';
    this.hide = true;

    console.log('bye good lookin');
  }
  // Adding emojis
  addEmoji(event: any): any {
    const msgs = event?.detail?.unicode;
    const msg = this.comment.value + msgs;
    this.comment.setValue(msg);
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
    this.postService.getPostsFeed(this.recomCounter, this.userId);
    this.postsSub = this.postService
      .getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
        this.isLoading = false;
        console.log('posts personal', this.posts);
        this.postsSub.unsubscribe();
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

    this.postService.getPostsFeed(this.recomCounter, this.userId);
    this.postsSub = this.postService
      .getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
        this.isLoading = false;
        console.log('posts personal', this.posts);
        this.postsSub.unsubscribe();
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
        this.commentsSub.unsubscribe();
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
        this.comments = comments.reverse();
        this.commentsSub.unsubscribe();
      });
  }
}

// Friends
@Component({
  selector: 'app-card-friends',
  templateUrl: './reusable-cardFriends.component.html',
  styleUrls: ['./reusable-card.component.scss'],
})
export class CardFriendsComponent implements OnInit, OnDestroy {
  isLoading = false;
  open = true;
  reposts = '';
  commentCount: number;
  commentsValidator = '';
  commentsCountValidator = '';
  closed = true;
  hide = true;
  valueChosen = '7';
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
  private trendingSub: Subscription;
  private blockedSub: Subscription;
  infos: AuthDataInfo[] = [];
  private infosSub: Subscription;

  comments: string[] = [];
  // number of comments that load
  private commentsSub: Subscription;
  comment: FormControl = new FormControl('');

  timeHourInitial = new Date().getHours();
  timeHour = this.testNum(this.timeHourInitial);
  timeMinute = new Date().getMinutes();
  text = this.timeHourInitial >= 12 ? 'pm' : 'am';
  timeMinuteText = this.timeMinute < 10 ? '0' : '';
  dateDay = new Date().getDate();
  dateMonth = new Date().getMonth();
  dateMonthName = this.testMonth(this.dateMonth);

  time =
    this.dateMonthName +
    '\xa0' +
    this.dateDay +
    '\xa0' +
    this.timeHour +
    ':' +
    this.timeMinuteText +
    this.timeMinute +
    '\xa0' +
    this.text;

  constructor(
    public showCaseService: ShowCaseService,
    private authService: AuthService,
    private commentsService: CommentsService,
    public postService: PostService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    // Posts
    this.postService.getPostsFriends(this.userId, 0);
    this.postsSub = this.postService
      .getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
        this.isLoading = false;
        console.log('posts personal', this.posts);
      });
    // Info
    // this.authService.getInfo(this.recomCounter);
    // this.infosSub = this.authService
    //   .getInfoUpdateListener()
    //   .subscribe((infos: AuthDataInfo[]) => {
    //     this.infos = infos.reverse();
    //     this.isLoading = false;
    //   });
  }
  ngOnDestroy(): any {
    this.postsSub.unsubscribe();
  }
  navToHashTag(HashTag: string): any {
    console.log('HashTag', HashTag);
    // Where the post was posted
    this.router.navigate(['/hashtag/:'], {
      queryParams: { hashtag: HashTag },
    });
  }

  commentsValidatorFunc(postId: string): void {
    if (this.commentsValidator !== postId) {
      this.comment.setValue('');
    }
    this.commentsValidator = postId;
  }
  // Am Pm instead of 24hr clock
  testNum(timeHourInitial: any): number {
    if (timeHourInitial > 12) {
      if (timeHourInitial === 13) {
        return 1;
      }
      if (timeHourInitial === 14) {
        return 2;
      }
      if (timeHourInitial === 15) {
        return 3;
      }
      if (timeHourInitial === 16) {
        return 4;
      }
      if (timeHourInitial === 17) {
        return 5;
      }
      if (timeHourInitial === 18) {
        return 6;
      }
      if (timeHourInitial === 19) {
        return 7;
      }
      if (timeHourInitial === 20) {
        return 8;
      }
      if (timeHourInitial === 21) {
        return 9;
      }
      if (timeHourInitial === 22) {
        return 10;
      }
      if (timeHourInitial === 23) {
        return 11;
      }
      if (timeHourInitial === 24) {
        return 12;
      }
    } else {
      return timeHourInitial;
    }
  }
  testMonth(dateMonth: any): string {
    if (dateMonth === 0) {
      return 'Jan';
    }
    if (dateMonth === 1) {
      return 'Feb';
    }
    if (dateMonth === 2) {
      return 'Mar';
    }
    if (dateMonth === 3) {
      return 'Apr';
    }
    if (dateMonth === 4) {
      return 'May';
    }
    if (dateMonth === 5) {
      return 'June';
    }
    if (dateMonth === 6) {
      return 'July';
    }
    if (dateMonth === 7) {
      return 'Aug';
    }
    if (dateMonth === 8) {
      return 'Sept';
    }
    if (dateMonth === 9) {
      return 'Oct';
    }
    if (dateMonth === 10) {
      return 'Nov';
    }
    if (dateMonth === 11) {
      return 'Dec';
    }
  }

  getPostsTrendingNumber(OriginalPostId: string, postId: string): any {
    console.log('Hey babe I miss you more', postId);
    console.log('Hey babe I miss you ', OriginalPostId);
    if (OriginalPostId.length === 0) {
      this.postService.getPostsTrendingNumberOwn(postId);
      this.valueChosen = postId;
      console.log('logic1', this.valueChosen);
    } else {
      this.postService.getPostsTrendingNumber(OriginalPostId);
      this.valueChosen = OriginalPostId;
      console.log('logic', this.valueChosen);
    }
    this.trendingSub = this.postService
      .getCountUpdateListener()
      .subscribe((value) => {
        this.reposts = value;
        console.log(' reposts', this.reposts);
        this.trendingSub.unsubscribe();
      });
  }
  navToPost(postId: string, OriginalCreator: string): any {
    console.log('Hey babe I miss you', postId);
    // check if user should be redirected here or if they are blocked
    this.authService.checkBlocked(this.userId, OriginalCreator);
    this.blockedSub = this.authService
      .getBlocked()
      .subscribe((BLOCKED: string) => {
        if (BLOCKED === 'true') {
          this.snackBar.open('This Skalar has blocked you', '🚫', {
            duration: 3000,
          });
        } else {
          this.router.navigate(['/single/:'], { queryParams: { postId } });
        }
        this.blockedSub.unsubscribe();
      });
  }
  openEmoji(): void {
    const selectionContainer = document.getElementById('showEmojis');
    const triggerEmoji = document.getElementById('triggerEmo');
    console.log('star through');
    const picker = createPopup(
      {},
      {
        referenceElement: selectionContainer,
        triggerElement: triggerEmoji,
        position: 'top',
      }
    );

    picker.toggle();
    picker.addEventListener('emoji:select', (selection) => {
      console.log('Selected emoji: ', selection.emoji);
      const msgs = selection.emoji;
      const msg = this.comment.value + msgs;
      this.comment.setValue(msg);
    });
  }
  imgClick(imgPath): any {
    document.getElementById('myModal').style.display = 'block';
    (document.getElementById('img01') as HTMLImageElement).src = imgPath;
    this.hide = false;

    console.log('hey good lookin');
  }
  close(): any {
    document.getElementById('myModal').style.display = 'none';
    this.hide = true;

    console.log('bye good lookin');
  }
  // Adding emojis
  addEmoji(event: any): any {
    const msgs = event?.detail?.unicode;
    const msg = this.comment.value + msgs;
    this.comment.setValue(msg);
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
    this.postService.getPostsFriends(this.userId, this.recomCounter);
    this.postsSub = this.postService
      .getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
        this.isLoading = false;
        console.log('posts friends', this.posts);
        this.postsSub.unsubscribe();
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

    this.postService.getPostsFriends(this.userId, this.recomCounter);
    this.postsSub = this.postService
      .getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
        this.isLoading = false;
        console.log('posts friends', this.posts);
        this.postsSub.unsubscribe();
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
        this.commentsSub.unsubscribe();
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
        console.log('i got more shit to say', comments.length);
        this.commentsCountValidator = postId;
        this.commentCount = comments.length;
        this.comments = comments.reverse();

        console.log('we win', this.commentsCountValidator);
        this.commentsSub.unsubscribe();
      });
  }
  spreadWord(postId: string): void {
    this.postService.addPostShared(postId, this.userId);
  }
}
@Component({
  selector: 'app-post-info-feed',
  templateUrl: './reusable-cardFeed.component.html',
  styleUrls: ['./reusable-card.component.scss'],
})
export class CardInfoFeedComponent implements OnInit, OnDestroy {
  isLoading = false;
  open = true;
  closed = true;
  userId: string;
  valueChosen = '7';
  commentsValidator = '';
  reposts = '';
  recomCounter = 0;
  countVisibility = 0;
  posts: Post[] = [];

  private postsSub: Subscription;

  infos: AuthDataInfo[] = [];
  private infosSub: Subscription;

  comments: string[] = [];
  // number of comments that load
  private commentsSub: Subscription;
  private countSub: Subscription;
  comment: FormControl = new FormControl('');

  timeHourInitial = new Date().getHours();
  timeHour = this.testNum(this.timeHourInitial);
  timeMinute = new Date().getMinutes();
  text = this.timeHourInitial >= 12 ? 'pm' : 'am';
  timeMinuteText = this.timeMinute < 10 ? '0' : '';
  dateDay = new Date().getDate();
  dateMonth = new Date().getMonth();
  dateMonthName = this.testMonth(this.dateMonth);

  time =
    this.dateMonthName +
    '\xa0' +
    this.dateDay +
    '\xa0' +
    this.timeHour +
    ':' +
    this.timeMinuteText +
    this.timeMinute +
    '\xa0' +
    this.text;

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
    this.postService.getPostsFeed(0, this.userId);
    this.postsSub = this.postService
      .getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
        this.isLoading = false;
        console.log('posts personal', this.posts);
      });
    // Info
    this.authService.getInfo(this.userId, this.recomCounter);
    this.infosSub = this.authService
      .getInfoUpdateListener()
      .subscribe((infos: AuthDataInfo[]) => {
        this.infos = infos;
        this.isLoading = false;
      });
  }
  ngOnDestroy(): any {
    this.postsSub.unsubscribe();
    this.infosSub.unsubscribe();
  }
  commentsValidatorFunc(postId: string): void {
    this.commentsValidator = postId;
    this.comment.setValue('');
    console.log('commentsValidator', this.commentsValidator);
  }
  // Am Pm instead of 24hr clock
  testNum(timeHourInitial: any): number {
    if (timeHourInitial > 12) {
      if (timeHourInitial === 13) {
        return 1;
      }
      if (timeHourInitial === 14) {
        return 2;
      }
      if (timeHourInitial === 15) {
        return 3;
      }
      if (timeHourInitial === 16) {
        return 4;
      }
      if (timeHourInitial === 17) {
        return 5;
      }
      if (timeHourInitial === 18) {
        return 6;
      }
      if (timeHourInitial === 19) {
        return 7;
      }
      if (timeHourInitial === 20) {
        return 8;
      }
      if (timeHourInitial === 21) {
        return 9;
      }
      if (timeHourInitial === 22) {
        return 10;
      }
      if (timeHourInitial === 23) {
        return 11;
      }
      if (timeHourInitial === 24) {
        return 12;
      }
    } else {
      return timeHourInitial;
    }
  }
  testMonth(dateMonth: any): string {
    if (dateMonth === 0) {
      return 'Jan';
    }
    if (dateMonth === 1) {
      return 'Feb';
    }
    if (dateMonth === 2) {
      return 'Mar';
    }
    if (dateMonth === 3) {
      return 'Apr';
    }
    if (dateMonth === 4) {
      return 'May';
    }
    if (dateMonth === 5) {
      return 'June';
    }
    if (dateMonth === 6) {
      return 'July';
    }
    if (dateMonth === 7) {
      return 'Aug';
    }
    if (dateMonth === 8) {
      return 'Sept';
    }
    if (dateMonth === 9) {
      return 'Oct';
    }
    if (dateMonth === 10) {
      return 'Nov';
    }
    if (dateMonth === 11) {
      return 'Dec';
    }
  }

  // Adding emojis
  openEmoji(): void {
    const selectionContainer = document.getElementById('showEmojis');
    const triggerEmoji = document.getElementById('triggerEmo');
    console.log('star through');
    const picker = createPopup(
      {},
      {
        referenceElement: selectionContainer,
        triggerElement: triggerEmoji,
        position: 'top',
      }
    );

    picker.toggle();
    picker.addEventListener('emoji:select', (selection) => {
      console.log('Selected emoji: ', selection.emoji);
      const msgs = selection.emoji;
      const msg = this.comment.value + msgs;
      this.comment.setValue(msg);
    });
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

    this.postService.getPostsFeed(this.recomCounter, this.userId);
    this.postsSub = this.postService
      .getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
        this.isLoading = false;
        console.log('posts personal', this.posts);
        this.postsSub.unsubscribe();
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

    this.postService.getPostsFeed(this.recomCounter, this.userId);
    this.postsSub = this.postService
      .getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
        this.isLoading = false;
        console.log('posts personal', this.posts);
        this.postsSub.unsubscribe();
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
  getPostsTrendingNumber(OriginalPostId: string, postId: string): any {
    console.log('Hey babe I miss you more', postId.length);
    console.log('Hey babe I miss you ', OriginalPostId.length);
    if (OriginalPostId.length === 0) {
      this.postService.getPostsTrendingNumberOwn(postId);
      this.valueChosen = postId;
      console.log('logic1', this.valueChosen);
    } else {
      this.postService.getPostsTrendingNumber(OriginalPostId);
      this.valueChosen = OriginalPostId;
      console.log('logic', this.valueChosen);
    }
    this.countSub = this.postService
      .getCountUpdateListener()
      .subscribe((value) => {
        this.reposts = value;
        console.log(' reposts', this.reposts);
        this.countSub.unsubscribe();
      });
  }
  navToPost(postId: string): any {
    console.log('Hey babe I miss you', postId);
    this.router.navigate(['/single/:'], { queryParams: { postId } });
  }
  spreadWord(postId: string): void {
    console.log('for me baby', postId);
    console.log('for me baby 2', this.userId);
    this.postService.addPostShared(postId, this.userId);
  }
  loadComments(postId: string): void {
    console.log('hey logic fade away', postId);
    this.commentsService.getComments(postId);
    this.commentsSub = this.commentsService
      .getMessagesUpdateListener()
      .subscribe((comments: string[]) => {
        this.comments = comments.reverse();
        this.commentsSub.unsubscribe();
      });
  }
}

@Component({
  selector: 'app-card-main-page',
  templateUrl: './reusable-cardMainPage.component.html',
  styleUrls: ['./reusable-card.component.scss'],
})
export class CardInfoMainPageComponent implements OnInit, OnDestroy {
  category: string;
  userId: string;
  hide = true;
  isLoading = false;
  recomCounter = 0;
  countVisibility = 0;
  valueChosen = '7';
  reposts = '';
  commentsValidator = '';
  posts: Post[] = [];
  private postsSub: Subscription;
  private routeSub: Subscription;
  private trendingSub: Subscription;
  comments: string[] = [];
  // number of comments that load
  private commentsSub: Subscription;
  comment: FormControl = new FormControl('');

  timeHourInitial = new Date().getHours();
  timeHour = this.testNum(this.timeHourInitial);
  timeMinute = new Date().getMinutes();
  text = this.timeHourInitial >= 12 ? 'pm' : 'am';
  timeMinuteText = this.timeMinute < 10 ? '0' : '';
  dateDay = new Date().getDate();
  dateMonth = new Date().getMonth();
  dateMonthName = this.testMonth(this.dateMonth);

  time =
    this.dateMonthName +
    '\xa0' +
    this.dateDay +
    '\xa0' +
    this.timeHour +
    ':' +
    this.timeMinuteText +
    this.timeMinute +
    '\xa0' +
    this.text;

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

    this.routeSub = this.route.queryParams.subscribe((params) => {
      console.log('params main page', params);
      this.category = params?.category;

      this.postService.getPostsMainPage(this.category, 0, this.userId);
      this.postsSub = this.postService
        .getPostUpdateListener()
        .subscribe((posts: Post[]) => {
          this.posts = posts;
          this.isLoading = false;
        });
    });
  }
  ngOnDestroy(): any {
    this.routeSub.unsubscribe();
    this.postsSub.unsubscribe();
  }
  navToHashTag(HashTag: string): any {
    console.log('HashTag', HashTag);
    // Where the post was posted
    this.router.navigate(['/hashtag/:'], {
      queryParams: { hashtag: HashTag },
    });
  }
  navToPost(postId: string): any {
    console.log('Hey babe I miss you', postId);
    this.router.navigate(['/single/:'], { queryParams: { postId } });
  }
  commentsValidatorFunc(postId: string): void {
    if (this.commentsValidator !== postId) {
      this.comment.setValue('');
    }
    this.commentsValidator = postId;
  }
  // Am Pm instead of 24hr clock
  testNum(timeHourInitial: any): number {
    if (timeHourInitial > 12) {
      if (timeHourInitial === 13) {
        return 1;
      }
      if (timeHourInitial === 14) {
        return 2;
      }
      if (timeHourInitial === 15) {
        return 3;
      }
      if (timeHourInitial === 16) {
        return 4;
      }
      if (timeHourInitial === 17) {
        return 5;
      }
      if (timeHourInitial === 18) {
        return 6;
      }
      if (timeHourInitial === 19) {
        return 7;
      }
      if (timeHourInitial === 20) {
        return 8;
      }
      if (timeHourInitial === 21) {
        return 9;
      }
      if (timeHourInitial === 22) {
        return 10;
      }
      if (timeHourInitial === 23) {
        return 11;
      }
      if (timeHourInitial === 24) {
        return 12;
      }
    } else {
      return timeHourInitial;
    }
  }
  testMonth(dateMonth: any): string {
    if (dateMonth === 0) {
      return 'Jan';
    }
    if (dateMonth === 1) {
      return 'Feb';
    }
    if (dateMonth === 2) {
      return 'Mar';
    }
    if (dateMonth === 3) {
      return 'Apr';
    }
    if (dateMonth === 4) {
      return 'May';
    }
    if (dateMonth === 5) {
      return 'June';
    }
    if (dateMonth === 6) {
      return 'July';
    }
    if (dateMonth === 7) {
      return 'Aug';
    }
    if (dateMonth === 8) {
      return 'Sept';
    }
    if (dateMonth === 9) {
      return 'Oct';
    }
    if (dateMonth === 10) {
      return 'Nov';
    }
    if (dateMonth === 11) {
      return 'Dec';
    }
  }

  imgClick(imgPath): any {
    document.getElementById('myModal').style.display = 'block';
    (document.getElementById('img01') as HTMLImageElement).src = imgPath;
    this.hide = false;
    console.log('hey good lookin');
  }
  close(): any {
    document.getElementById('myModal').style.display = 'none';
    this.hide = true;
    console.log('bye good lookin');
  }
  // Adding emojis
  openEmoji(): void {
    const selectionContainer = document.getElementById('showEmojis');
    const triggerEmoji = document.getElementById('triggerEmo');
    console.log('star through');
    const picker = createPopup(
      {},
      {
        referenceElement: selectionContainer,
        triggerElement: triggerEmoji,
        position: 'top',
      }
    );

    picker.toggle();
    picker.addEventListener('emoji:select', (selection) => {
      console.log('Selected emoji: ', selection.emoji);
      const msgs = selection.emoji;
      const msg = this.comment.value + msgs;
      this.comment.setValue(msg);
    });
  }
  getPostsTrendingNumber(OriginalPostId: string, postId: string): any {
    console.log('Hey babe I miss you more', postId.length);
    console.log('Hey babe I miss you ', OriginalPostId.length);
    if (OriginalPostId.length === 0) {
      this.postService.getPostsTrendingNumberOwn(postId);
      this.valueChosen = postId;
      console.log('logic1', this.valueChosen);
    } else {
      this.postService.getPostsTrendingNumber(OriginalPostId);
      this.valueChosen = OriginalPostId;
      console.log('logic', this.valueChosen);
    }
    this.trendingSub = this.postService
      .getCountUpdateListener()
      .subscribe((value) => {
        this.reposts = value;
        console.log(' reposts', this.reposts);
        this.trendingSub.unsubscribe();
      });
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
    this.postService.getPostsMainPage(
      this.category,
      this.recomCounter,
      this.userId
    );
    this.postsSub = this.postService
      .getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
        this.isLoading = false;
        this.postsSub.unsubscribe();
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

    this.postService.getPostsMainPage(
      this.category,
      this.recomCounter,
      this.userId
    );
    this.postsSub = this.postService
      .getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
        this.isLoading = false;
        this.postsSub.unsubscribe();
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
        this.comments = comments.reverse();
        this.commentsSub.unsubscribe();
      });
  }
}

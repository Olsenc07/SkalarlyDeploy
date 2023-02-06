import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Post, PostService } from '../services/post.service';
import { AuthService } from '../services/auth.service';
import {
  MatBottomSheet,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommentsService } from '../services/comments.service';
import { createPopup } from '@picmo/popup-picker';
import { ShowCaseService } from '../services/showCase.service';

@Component({
  selector: 'app-main-pages',
  templateUrl: './main-pages.component.html',
  styleUrls: ['./main-pages.component.scss'],
})
export class MainPagesComponent implements OnInit {
  userId: string;
  reposts = '';
  valueChosen = '7';
  category: string;
  specific: string;
  specificOptions: string;

  isLoading = false;
  posts: Post[] = [];
  private postsSub: Subscription;

  constructor(
    private bottomSheet: MatBottomSheet,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    public postService: PostService
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
  // To post page with users id
  navigateToPost(): any {
    // const ID = (document.getElementById('userName') as HTMLInputElement).value;
    this.router.navigate(['/post-page/:'], {
      queryParams: { userId: this.userId },
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
    this.postService.getCountUpdateListener().subscribe((value) => {
      this.reposts = value;
      console.log(' reposts', this.reposts);
    });
  }

  spreadWord(postId: string): void {
    console.log('for me baby', postId);
    console.log('for me baby 2', this.userId);
    this.postService.addPostShared(postId, this.userId);
  }
  // Fills same way just for different reasons
  // Each button opens this page by there should be 4 different functions with each
  // sharin the open attendence comp, but each sends diff values/reasoning
}

@Component({
  selector: 'app-single-page',
  templateUrl: './single-page.component.html',
  styleUrls: ['./main-pages.component.scss'],
})
export class SinglePageComponent implements OnInit {
  isLoading = false;

  ngOnInit(): void {}
}

@Component({
  selector: 'app-card-single-page ',
  templateUrl: './template-single-post.component.html',
  styleUrls: ['../reusable-card/reusable-card.component.scss'],
})
export class SinglePageTemplateComponent implements OnInit {
  isLoading = false;
  hide = true;
  reposts = '';
  valueChosen = '7';
  userId: string;
  posts: Post[] = [];
  postId: string;
  comment: FormControl = new FormControl('');
  comments: string[] = [];
  // number of comments that load
  private commentsSub: Subscription;
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
  private postsSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    public postService: PostService,
    private authService: AuthService,
    private router: Router,
    private commentsService: CommentsService
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.getUserId();

    this.route.queryParams.subscribe((params) => {
      console.log('params single page', params);
      this.postId = params?.postId;

      this.postService.getPostSinglePage(this.postId);
      this.postsSub = this.postService
        .getPostUpdateListener()
        .subscribe((posts: Post[]) => {
          this.posts = posts;
          console.log('pats', this.posts);
          this.isLoading = false;
        });
    });
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
  navigateToPage(infoUser: string): any {
    // const ID = (document.getElementById('userName') as HTMLInputElement).value;
    this.router.navigate(['/skalars/:'], { queryParams: { id: infoUser } });
  }
  // Where the post was posted
  navigateToMainPage(value: string): void {
    this.router.navigate(['/main/:'], { queryParams: { category: value } });
    console.log('hey chaz mataz', value);
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
  onDeleteComment(commentId: string): any {
    this.commentsService.deleteComment(commentId);
    console.log('chaz whats up', commentId);
  }
  CommentTrigger(): void {
    if (this.comment.value) {
      this.commentsService.createComment(
        this.comment.value,
        this.userId,
        this.time,
        this.postId
      );
      this.comment.setValue('');
      console.log('onComment', this.postId);
    }
  }

  getPostsTrendingNumber(postId: string): any {
    console.log('Hey babe I miss you more', this.postId);
    // this.postService.getPostsTrendingNumberOwn(this.postId);

    this.postService.getPostsTrendingNumberOwn(this.postId);
    this.valueChosen = this.postId;
    console.log('logic1', this.valueChosen);

    // this.valueChosen = this.postId;

    this.postService.getCountUpdateListener().subscribe((value) => {
      this.reposts = value;
      console.log(' reposts', this.reposts);
    });
  }
  loadComments(): void {
    this.commentsService.getComments(this.postId);
    this.commentsSub = this.commentsService
      .getMessagesUpdateListener()
      .subscribe((comments: string[]) => {
        this.comments = comments.reverse();
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
}

@Component({
  selector: 'app-card-recent-feed ',
  templateUrl: './recent-feed.component.html',
  styleUrls: ['./main-pages.component.scss'],
})
export class RecentComponent implements OnInit {
  isLoading = false;
  reposts = '';

  valueChosen = '7';
  recomCounter = 0;
  countVisibility = 0;
  posts: Post[] = [];
  userId: string;
  private postsSub: Subscription;
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
    // this.postService.getPostsFeed(0);
    // this.postsSub = this.postService
    //   .getPostUpdateListener()
    //   .subscribe((posts: Post[]) => {
    //     this.posts = posts;
    //     this.isLoading = false;
    //     console.log('posts personal', this.posts);
    //   });
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
    this.postService.getCountUpdateListener().subscribe((value) => {
      this.reposts = value;
      console.log(' reposts', this.reposts);
    });
  }
  loadComments(postId: string): void {
    console.log('hey logic fade away', postId);
    this.commentsService.getComments(postId);
    this.commentsSub = this.commentsService
      .getMessagesUpdateListener()
      .subscribe((comments: string[]) => {
        this.comments = comments.reverse();
      });
  }
}

// Trending
@Component({
  selector: 'app-card-feed-trending ',
  templateUrl: './trending-feed.component.html',
  styleUrls: ['./main-pages.component.scss'],
})
export class TrendingComponent implements OnInit {
  isLoading = false;
  reposts = '';
  valueChosen = '7';

  recomCounter = 0;
  countVisibility = 0;
  posts: Post[] = [];
  userId: string;
  private postsSub: Subscription;
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
    // this.postService.getPostsTrending();
    // this.postsSub = this.postService
    //   .getPostUpdateListener()
    //   .subscribe((posts: Post[]) => {
    //     this.posts = posts;
    //     this.isLoading = false;
    //     console.log('posts personal', this.posts);
    //   });
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
    this.postService.getCountUpdateListener().subscribe((value) => {
      this.reposts = value;
      console.log(' reposts', this.reposts);
    });
  }
  loadComments(postId: string): void {
    console.log('hey logic fade away', postId);
    this.commentsService.getComments(postId);
    this.commentsSub = this.commentsService
      .getMessagesUpdateListener()
      .subscribe((comments: string[]) => {
        this.comments = comments.reverse();
      });
  }
}

// Filter friends
@Component({
  selector: 'app-card-filter ',
  templateUrl: './filter_skalars.component.html',
  styleUrls: ['./main-pages.component.scss'],
})
export class SkalarsComponent implements OnInit {
  userId: string;

  isLoading = false;
  recomCounter = 0;
  countVisibility = 0;
  infos: string[] = [];

  searchMaj: FormControl = new FormControl('');
  searchMin: FormControl = new FormControl('');
  searchClub: FormControl = new FormControl('');
  searchSport: FormControl = new FormControl('');
  searchName: FormControl = new FormControl('');

  categories: string[] = [
    'Major',
    'Minor',
    'Sport',
    'Club',
    'Year Of Graduation',
  ];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
  }

  submitFilter(searchMaj, searchMin, searchClub, searchSport, searchName): any {
    console.log('Major', searchMaj.value);
    console.log('Minor', searchMin.value);
    console.log('Sport', searchSport.value);
    console.log('Club', searchClub.value);
    console.log('Name', searchName.value);
    this.authService.filterSearch(
      searchMaj.value,
      searchMin.value,
      searchClub.value,
      searchSport.value,
      searchName.value
    );
  }

  navigateToPage(infoUser: string): any {
    // const ID = (document.getElementById('userName') as HTMLInputElement).value;
    this.router.navigate(['/skalars/:'], { queryParams: { id: infoUser } });
  }
}

// Filter friends
@Component({
  selector: 'app-card-filter-reusable ',
  templateUrl: './reusable-filter_skalars.component.html',
  styleUrls: ['./main-pages.component.scss'],
})
export class SkalarsFilterComponent implements OnInit {
  ngOnInit(): void {}
}

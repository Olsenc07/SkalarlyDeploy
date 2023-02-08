import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Post, PostService } from '../services/post.service';
import { AuthService } from '../services/auth.service';
import { FilterSearchService } from '../services/filterSearch.service';

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
  styleUrls: ['../reusable-card-request/reusable-card-request.component.scss'],
})
export class SkalarsComponent implements OnInit {
  userId: string;
  private filtersSub: Subscription;

  infos: string[] = [];

  isLoading = false;
  recomCounter = 0;
  countVisibility = 0;

  searchMaj: FormControl = new FormControl('');
  searchMin: FormControl = new FormControl('');
  searchClub: FormControl = new FormControl('');
  searchSport: FormControl = new FormControl('');
  searchName: FormControl = new FormControl('');

  constructor(
    private authService: AuthService,
    private filterSearchService: FilterSearchService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
  }

  clearName(): any {
    this.searchName.setValue('');
  }
  clearMaj(): any {
    this.searchMaj.setValue('');
  }
  clearMin(): any {
    this.searchMin.setValue('');
  }
  clearSport(): any {
    this.searchSport.setValue('');
  }
  clearClub(): any {
    this.searchClub.setValue('');
  }
  submitFilter(searchMaj, searchMin, searchClub, searchSport, searchName): any {
    const name = searchName.value;
    const major = searchMaj.value;
    const minor = searchMin.value;
    const sport = searchSport.value;
    const club = searchClub.value;

    console.log('Major', searchMaj.value.length);
    console.log('Minor', searchMin.value);
    console.log('Sport', searchSport.value);
    console.log('Club', searchClub.value);
    console.log('Name', searchName.value);
    // nothing
    if (
      name.length === 0 &&
      major.length === 0 &&
      minor.length === 0 &&
      sport.length === 0 &&
      club.length === 0
    ) {
      console.log('0');
    }
    // Name
    if (!major && !minor && !sport && !club && name.length !== 0) {
      this.filterSearchService.filterSearchName(name);

      console.log('1');
    }
    // Major
    if (!name && !minor && !sport && !club && major.length !== 0) {
      this.filterSearchService.filterSearchMajor(major);
      console.log('2');
    }
    // Minor
    if (!major && !name && !sport && !club && minor.length !== 0) {
      this.filterSearchService.filterSearchMinor(minor);
      console.log('3');
    }
    // Sport
    if (!major && !minor && !name && !club && sport.length !== 0) {
      this.filterSearchService.filterSearchSport(sport);
      console.log('4');
    }
    // Club
    if (!major && !minor && !sport && !name && club.length !== 0) {
      this.filterSearchService.filterSearchClub(club);
      console.log('5');
    }
    // name and major
    if (!minor && !sport && !club && name.length !== 0 && major.length !== 0) {
      this.filterSearchService.filterSearchNameMajor(name, major);
      console.log('6');
    }
    // name and minor
    if (!major && !sport && !club && name.length !== 0 && minor.length !== 0) {
      this.filterSearchService.filterSearchNameMinor(name, minor);
      console.log('7');
    }

    // name and sport
    if (!major && !minor && !club && name.length !== 0 && sport.length !== 0) {
      this.filterSearchService.filterSearchNameSport(name, sport);
      console.log('8');
    }
    // name and club
    if (!major && !sport && !minor && name.length !== 0 && club.length !== 0) {
      this.filterSearchService.filterSearchNameClub(name, club);
      console.log('9');
    }
    // major and sport
    if (!name && !club && !minor && major.length !== 0 && sport.length !== 0) {
      this.filterSearchService.filterSearchMajorSport(major, sport);
      console.log('10');
    }
    // major and club
    if (!name && !sport && !minor && major.length !== 0 && club.length !== 0) {
      this.filterSearchService.filterSearchMajorClub(major, club);
      console.log('11');
    }
    // minor and club
    if (!name && !sport && !major && minor.length !== 0 && club.length !== 0) {
      this.filterSearchService.filterSearchMinorClub(minor, club);
      console.log('12');
    }
    // sport and club
    if (!name && !minor && !major && sport.length !== 0 && club.length !== 0) {
      this.filterSearchService.filterSearchSportClub(sport, club);
      console.log('13');
    }
    // sport and minor
    if (!name && !club && !major && sport.length !== 0 && minor.length !== 0) {
      this.filterSearchService.filterSearchSportMinor(sport, minor);
      console.log('14');
    }
    // major and minor
    if (!name && !club && !sport && major.length !== 0 && minor.length !== 0) {
      this.filterSearchService.filterSearchMajorMinor(major, minor);
      console.log('15');
    }
    // name and major and minor
    if (
      !club &&
      !sport &&
      name.length !== 0 &&
      major.length !== 0 &&
      minor.length !== 0
    ) {
      this.filterSearchService.filterSearchNameMajorMinor(name, major, minor);
      console.log('16');
    }
    // name and major and minor
    if (
      !club &&
      !name &&
      sport.length !== 0 &&
      major.length !== 0 &&
      minor.length !== 0
    ) {
      this.filterSearchService.filterSearchSportMajorMinor(sport, major, minor);
      console.log('17');
    }
    // name and major and minor
    if (
      !major &&
      !name &&
      sport.length !== 0 &&
      club.length !== 0 &&
      minor.length !== 0
    ) {
      this.filterSearchService.filterSearchSportClubMinor(sport, club, minor);
      console.log('18');
    }
    // club and major and name
    if (
      !minor &&
      !sport &&
      name.length !== 0 &&
      major.length !== 0 &&
      club.length !== 0
    ) {
      this.filterSearchService.filterSearchMajorClubName(major, club, name);
      console.log('19');
    }
    // name,sport,club
    if (
      !minor &&
      !major &&
      sport.length !== 0 &&
      club.length !== 0 &&
      name.length !== 0
    ) {
      this.filterSearchService.filterSearchSportClubName(sport, club, name);
      console.log('20');
    }
    // name,sport,major
    if (
      !minor &&
      !club &&
      sport.length !== 0 &&
      major.length !== 0 &&
      name.length !== 0
    ) {
      this.filterSearchService.filterSearchSportMajorName(sport, major, name);
      console.log('21');
    }
    // name,sport,minor
    if (
      !major &&
      !club &&
      name.length !== 0 &&
      minor.length !== 0 &&
      sport.length !== 0
    ) {
      this.filterSearchService.filterSearchSportMinorName(sport, minor, name);
      console.log('22');
    }
    // name,club,major
    if (
      !major &&
      !sport &&
      name.length !== 0 &&
      club.length !== 0 &&
      minor.length !== 0
    ) {
      this.filterSearchService.filterSearchClubMinorName(club, minor, name);
      console.log('23');
    }
    // major,club,sport
    if (
      !minor &&
      !name &&
      major.length !== 0 &&
      sport.length !== 0 &&
      club.length !== 0
    ) {
      this.filterSearchService.filterSearchMajorSportClub(major, sport, club);
      console.log('24');
    }
    // major,club,sport
    if (
      !sport &&
      !name &&
      major.length !== 0 &&
      minor.length !== 0 &&
      club.length !== 0
    ) {
      this.filterSearchService.filterSearchMajorMinorClub(major, minor, club);
      console.log('25');
    }
    // major,minor,club,sport
    if (
      !club &&
      name.length !== 0 &&
      major.length !== 0 &&
      minor.length !== 0 &&
      sport.length !== 0
    ) {
      this.filterSearchService.filterSearchNameMajorMinorSport(
        name,
        major,
        minor,
        sport
      );
      console.log('26');
    }
    // major,minor,club,sport
    if (
      !name &&
      club.length !== 0 &&
      major.length !== 0 &&
      minor.length !== 0 &&
      sport.length !== 0
    ) {
      this.filterSearchService.filterSearchMajorMinorSportClub(
        major,
        minor,
        sport,
        club
      );
      console.log('27');
    }
    // name,minor,club,sport
    if (
      !major &&
      name.length !== 0 &&
      club.length !== 0 &&
      minor.length !== 0 &&
      sport.length !== 0
    ) {
      this.filterSearchService.filterSearchNameMinorSportClub(
        name,
        minor,
        sport,
        club
      );
      console.log('28');
    }
    // name,minor,club,major
    if (
      !sport &&
      name.length !== 0 &&
      major.length !== 0 &&
      minor.length !== 0 &&
      club.length !== 0
    ) {
      this.filterSearchService.filterSearchNameMajorMinorClub(
        club,
        name,
        minor,
        major
      );
      console.log('29');
    }
    // name,minor,club,major
    if (
      !minor &&
      name.length !== 0 &&
      major.length !== 0 &&
      club.length !== 0 &&
      sport.length !== 0
    ) {
      this.filterSearchService.filterSearchNameMajorSportClub(
        club,
        name,
        sport,
        major
      );
      console.log('30');
    }
    if (name && major && minor && sport && club) {
      this.filterSearchService.filterSearchNameMajorMinorSportClub(
        club,
        name,
        sport,
        major,
        minor
      );
      console.log('31');
    }

    this.filtersSub = this.filterSearchService
      .getInfoUpdateListener()
      .subscribe((infos) => {
        this.infos = infos;
        console.log('way nicer', this.infos);
      });
  }

  navigateToPage(infoUser: string): any {
    // const ID = (document.getElementById('userName') as HTMLInputElement).value;
    this.router.navigate(['/skalars/:'], { queryParams: { id: infoUser } });
  }
}

@Component({
  selector: 'app-card-large-friends ',
  templateUrl: './large_friends_feed.component.html',
  styleUrls: ['./main-pages.component.scss'],
})
export class LargeFriendsFeedComponent implements OnInit {
  ngOnInit(): void {}
}
@Component({
  selector: 'app-hashtags',
  templateUrl: './hashtags.component.html',
  styleUrls: ['./main-pages.component.scss'],
})
export class HashtagComponent implements OnInit {
  userId: string;
  hashtag: string;
  posts: Post[] = [];
  private postsSub: Subscription;
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    public postService: PostService,
    private authService: AuthService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.userId = this.authService.getUserId();

    this.route.queryParams.subscribe((params) => {
      this.hashtag = params?.hashtag;
      console.log('params page', this.hashtag);
      console.log('woo hoo', params);

      this.postService.getPostsHashtagPage(this.hashtag, 0);
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
}
@Component({
  selector: 'app-card-hashtags ',
  templateUrl: './reusable_hashtags.component.html',
  styleUrls: ['../reusable-card/reusable-card.component.scss'],
})
export class HashtagCardComponent implements OnInit {
  hashtag: string;
  countVisibility = 0;
  recomCounter = 0;

  posts: Post[] = [];
  private postsSub: Subscription;
  isLoading = false;

  constructor(
    private bottomSheet: MatBottomSheet,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    public postService: PostService
  ) {}
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.hashtag = params?.hashtag;
      console.log('params hashtag page', this.hashtag);
      console.log('params ', params);

      this.postService.getPostsHashtagPage(this.hashtag, 0);
      this.postsSub = this.postService
        .getPostUpdateListener()
        .subscribe((posts: Post[]) => {
          this.posts = posts;
          this.isLoading = false;
        });
    });
    console.log('hey chaz', this.hashtag);
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
    this.postService.getPostsHashtagPage(this.hashtag, this.recomCounter);
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

    this.postService.getPostsHashtagPage(this.hashtag, this.recomCounter);
    this.postsSub = this.postService
      .getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
        this.isLoading = false;
        console.log('posts personal', this.posts);
      });
  }
}

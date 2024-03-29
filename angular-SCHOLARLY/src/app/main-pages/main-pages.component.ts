import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Post, PostService } from '../services/post.service';
import { Fav, PostsService } from '../services/posts.service';
import { AuthService } from '../services/auth.service';
import { FilterSearchService } from '../services/filterSearch.service';
import { Location } from '@angular/common';

import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommentsService } from '../services/comments.service';
import { createPopup } from '@picmo/popup-picker';
import { ShowCaseService } from '../services/showCase.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { formatDistance } from 'date-fns';

@Component({
  selector: 'app-main-pages',
  templateUrl: './main-pages.component.html',
  styleUrls: ['./main-pages.component.scss'],
})
export class MainPagesComponent implements OnInit, OnDestroy {
  userId: string;
  reposts = '';
  valueChosen = '7';
  Category: string;
  specific: string;
  specificOptions: string;
  commentsValidator = '';
  mains: Fav = {};
  isLoading = false;
  posts: Post[] = [];
  private postsSub: Subscription;
  private routeSub: Subscription;
  private favsSub: Subscription;
  private countSub: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    public postService: PostService,
    public postsService: PostsService
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.getUserId();

    this.routeSub = this.route.queryParams.subscribe((params) => {
      console.log('params main page', params);
      this.Category = params?.category;
      console.log(' erika', this.Category);

      this.postsService.getFavsListMain(this.userId, this.Category);
      this.favsSub = this.postsService
        .getFavsListenerSingle()
        .subscribe((favs) => {
          console.log(' erika 77 ', favs);
          this.mains = favs;
        });
      this.postService.getPostsMainPage(this.Category, 0, this.userId);
      this.postsSub = this.postService
        .getPostUpdateListener()
        .subscribe((posts: Post[]) => {
          console.log('anothers arms', posts);
          this.posts = posts;
          this.isLoading = false;
        });
    });
  }
  ngOnDestroy(): any {
    this.postsSub.unsubscribe();
    this.routeSub.unsubscribe();
    this.favsSub.unsubscribe();
  }
  saveFavCat(category: string): void {
    console.log('sons trust up', category);
    this.postsService.addFavsNew(this.userId, category, '');
    this.favsSub = this.postsService.getFavsListener().subscribe((favs) => {
      this.mains = favs;
      this.favsSub.unsubscribe();
    });
  }
  unsaveFavCat(id: string): void {
    console.log('id unsave', id);
    this.postsService.unSaveFavs(id);
    this.favsSub = this.postsService.getFavsListener().subscribe((favs) => {
      this.mains = favs;
      this.favsSub.unsubscribe();
    });
  }

  navToHashTag(HashTag: string): any {
    console.log('HashTag', HashTag);
    // Where the post was posted
    this.router.navigate(['/hashtag/:'], {
      queryParams: { hashtag: HashTag },
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
    this.countSub = this.postService
      .getCountUpdateListener()
      .subscribe((value) => {
        this.reposts = value;
        console.log(' reposts', this.reposts);
        this.countSub.unsubscribe();
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

// Instructor review
@Component({
  selector: 'app-instructor-reviews',
  templateUrl: './instructor-review.component.html',
  styleUrls: ['./main-pages.component.scss'],
})
export class InstructorReviewComponent implements OnInit, OnDestroy {
  userId: string;
  reposts = '';
  valueChosen = '7';
  Category: string;
  specific: string;
  specificOptions: string;
  commentsValidator = '';
  mains: Fav = {};
  course: boolean;
  instructorRatingMean: number;
  knowledgeRating: number;
  profesionalismRating: number;
  instructorRatingGraders: number;
  instructorProgs: Array<string>;
  isLoading = false;
  posts: Post[] = [];
  private postsSub: Subscription;
  private routeSub: Subscription;
  private favsSub: Subscription;
  private countSub: Subscription;
  private rankingSub: Subscription;
  private rankingGraders: Subscription;
  private instructorsPrograms: Subscription;
  private instructorsCourse: Subscription;
  private rankingKnowlede: Subscription;
  private rankingProfessionalism: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    public postService: PostService,
    public postsService: PostsService
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.getUserId();

    this.routeSub = this.route.queryParams.subscribe((params) => {
      console.log('params main page', params);
      this.Category = params?.category;
      console.log(' erika777', this.Category);

      this.postsService.getFavsListMain(this.userId, this.Category);
      this.favsSub = this.postsService
        .getFavsListenerSingle()
        .subscribe((favs) => {
          console.log(' erika 77 ', favs);
          this.mains = favs;
        });
      this.postService.getPostsMainPageInstructor(
        this.Category,
        0,
        this.userId
      );

      this.postsSub = this.postService
        .getPostUpdateListener()
        .subscribe((posts: Post[]) => {
          console.log('anothers arms', posts);
          this.posts = posts;
          this.isLoading = false;
        });
      this.postsService.rankingMean(this.Category);
      this.rankingSub = this.postsService
        .getMeanRanking()
        .subscribe((meanRanking: number) => {
          console.log(' chase 77 ', meanRanking);
          this.instructorRatingMean = meanRanking;
        });
      // Overall grading rank
      this.rankingGraders = this.postsService
        .getMeanGraders()
        .subscribe((meanGraders: number) => {
          this.instructorRatingGraders = meanGraders;
        });
      // knowledge ranking/ // for course review this is course,
      // course rating Quality
      this.rankingKnowlede = this.postsService
        .getKnowledgeGraders()
        .subscribe((meanKnowledgeGraders: number) => {
          console.log(' chase 77 ', meanKnowledgeGraders);
          this.knowledgeRating = meanKnowledgeGraders;
        });
      // proff ranking/ difficulty
      this.rankingProfessionalism = this.postsService
        .getProfGraders()
        .subscribe((meanProfGraders: number) => {
          console.log(' chase 77 ', meanProfGraders);
          this.profesionalismRating = meanProfGraders;
        });
      this.instructorsPrograms = this.postsService
        .getInstructorsPrograms()
        .subscribe((programs: Array<string>) => {
          console.log(' chase 77 ', programs);
          this.instructorProgs = programs;
        });
      this.instructorsCourse = this.postsService
        .getInstructorsCourse()
        .subscribe((courseYo: boolean) => {
          console.log(' chase 77 ', courseYo);
          this.course = courseYo;
        });
    });
  }
  ngOnDestroy(): any {
    this.postsSub.unsubscribe();
    this.routeSub.unsubscribe();
    this.favsSub.unsubscribe();
    this.rankingSub.unsubscribe();
    this.rankingGraders.unsubscribe();
    this.instructorsPrograms.unsubscribe();
    this.instructorsCourse.unsubscribe();
    this.rankingKnowlede.unsubscribe();
    this.rankingProfessionalism.unsubscribe();
  }
  saveFavCat(category: string): void {
    console.log('sons trust up', category);
    this.postsService.addFavsNew(this.userId, category, '');
    this.favsSub = this.postsService.getFavsListener().subscribe((favs) => {
      this.mains = favs;
      this.favsSub.unsubscribe();
    });
  }
  unsaveFavCat(id: string): void {
    console.log('id unsave', id);
    this.postsService.unSaveFavs(id);
    this.favsSub = this.postsService.getFavsListener().subscribe((favs) => {
      this.mains = favs;
      this.favsSub.unsubscribe();
    });
  }

  navToHashTag(HashTag: string): any {
    console.log('HashTag', HashTag);
    // Where the post was posted
    this.router.navigate(['/hashtag/:'], {
      queryParams: { hashtag: HashTag },
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
    this.countSub = this.postService
      .getCountUpdateListener()
      .subscribe((value) => {
        this.reposts = value;
        console.log(' reposts', this.reposts);
        this.countSub.unsubscribe();
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
export class SinglePageTemplateComponent implements OnInit, OnDestroy {
  isLoading = false;
  hide = true;
  reposts = '';
  commentsCountValidator = '';
  valueChosen = '7';
  userId: string;
  post = {};
  postId: string;
  comment: FormControl = new FormControl('');
  comments: string[] = [];
  // number of comments that load
  private commentsSub: Subscription;

  time = new Date();
  private postsSub: Subscription;
  private routeSub: Subscription;
  private countSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    public postService: PostService,
    private authService: AuthService,
    private router: Router,
    private commentsService: CommentsService,
    private snackBar: MatSnackBar,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.getUserId();

    this.routeSub = this.route.queryParams.subscribe((params) => {
      console.log('params single page', params);
      this.postId = params?.postId;

      this.postService.getPostSinglePage(this.postId, this.userId);
      this.postsSub = this.postService
        .getPostUpdateListener()
        .subscribe((posts: any) => {
          if (posts.length === 0) {
            // this.router.navigate(['/search']),
            this.location.back();
            this.snackBar.open(
              'This Skalar has blocked you from viewing their content',
              '🚫',
              {
                duration: 3000,
              }
            );
          } else {
            this.post = posts;
            console.log('pats', this.post);
            this.isLoading = false;
          }
        });
    });
  }

  ngOnDestroy(): any {
    this.routeSub.unsubscribe();
    this.postsSub.unsubscribe();
  }

  copyUrl() {
    const url = navigator.clipboard.writeText(window.location.href);
    alert('Copied post link: ' + url);
  }
  navToHashTag(HashTag: string): any {
    console.log('HashTag', HashTag);
    // Where the post was posted
    this.router.navigate(['/hashtag/:'], {
      queryParams: { hashtag: HashTag },
    });
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
  // Where the post was posted
  getPostsMainPageInstructor(value: string): void {
    this.router.navigate(['/instructor-review/:'], {
      queryParams: { category: value },
    });
    console.log('hey chaz mataz yo homie', value);
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
  onDeleteComment(commentId: string, postId: string): any {
    this.commentsService.deleteComment(commentId);
    console.log('chaz whats up', commentId);
    console.log('chaz whats up 2', postId);

    this.commentsSub = this.commentsService
      .getMessagesUpdateListener()
      .subscribe((comments: any) => {
        console.log('i got more shit to say g59', comments.length);
        this.commentsCountValidator = postId;
        // this.commentCount = comments.length;
        // console.log('type', this.commentCount);
        comments.forEach((e) => {
          if (e.time) {
            e.time = formatDistance(new Date(e.time), new Date(), {
              addSuffix: true,
            });
          }
        });
        this.comments = comments;

        this.commentsSub.unsubscribe();
      });
    console.log('in real time');
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
      this.commentsSub = this.commentsService
        .getMessagesUpdateListener()
        .subscribe((comments: any) => {
          console.log('i got more shit to say baby baby');
          // this.commentCount = comments.length;
          // console.log('type', this.commentCount);
          comments.forEach((e) => {
            if (e.time) {
              e.time = formatDistance(new Date(e.time), new Date(), {
                addSuffix: true,
              });
            }
          });
          this.comments = comments;
          this.commentsSub.unsubscribe();
        });
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

    this.countSub = this.postService
      .getCountUpdateListener()
      .subscribe((value) => {
        this.reposts = value;
        console.log(' reposts', this.reposts);
        this.countSub.unsubscribe();
      });
  }
  loadComments(postId: string): void {
    this.commentsService.getComments(this.postId);
    this.commentsSub = this.commentsService
      .getMessagesUpdateListener()
      .subscribe((comments: any) => {
        this.commentsCountValidator = postId;
        comments.forEach((e) => {
          if (e.time) {
            e.time = formatDistance(new Date(e.time), new Date(), {
              addSuffix: true,
            });
          }
        });
        this.comments = comments;
        this.commentsSub.unsubscribe();
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
  commentsCountValidator = '';

  valueChosen = '7';
  recomCounter = 0;
  countVisibility = 0;
  posts: Post[] = [];
  userId: string;
  private postsSub: Subscription;
  private posts2Sub: Subscription;

  comments: string[] = [];
  // number of comments that load
  private commentsSub: Subscription;
  private countSub: Subscription;
  comment: FormControl = new FormControl('');

  time = new Date();

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

  onDeleteComment(commentId: string, postId: string): any {
    this.commentsService.deleteComment(commentId);
    console.log('chaz whats up', commentId);
    this.commentsSub = this.commentsService
      .getMessagesUpdateListener()
      .subscribe((comments: any) => {
        console.log('i got more shit to say', comments.length);
        this.commentsCountValidator = postId;
        // this.commentCount = comments.length;
        // console.log('type', this.commentCount);
        comments.forEach((e) => {
          if (e.time) {
            e.time = formatDistance(new Date(e.time), new Date(), {
              addSuffix: true,
            });
          }
        });
        this.comments = comments;

        this.commentsSub.unsubscribe();
      });
  }
  // Where the post was posted
  navigateToMainPage(value: string): void {
    this.router.navigate(['/main/:'], { queryParams: { category: value } });
    console.log('hey chaz mataz', value);
  }
  navToHashTag(HashTag: string): any {
    console.log('HashTag', HashTag);
    // Where the post was posted
    this.router.navigate(['/hashtag/:'], {
      queryParams: { hashtag: HashTag },
    });
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
    this.posts2Sub = this.postService
      .getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
        this.isLoading = false;
        console.log('posts personal', this.posts);
        this.posts2Sub.unsubscribe();
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
      this.commentsSub = this.commentsService
        .getMessagesUpdateListener()
        .subscribe((comments: any) => {
          console.log('i got more shit to say baby fixing that');
          this.commentsCountValidator = postId;
          // this.commentCount = comments.length;
          // console.log('type', this.commentCount);
          comments.forEach((e) => {
            if (e.time) {
              e.time = formatDistance(new Date(e.time), new Date(), {
                addSuffix: true,
              });
            }
          });
          this.comments = comments;
          this.commentsSub.unsubscribe();
        });
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
  loadComments(postId: string): void {
    console.log('hey logic fade away', postId);
    this.commentsService.getComments(postId);
    this.commentsSub = this.commentsService
      .getMessagesUpdateListener()
      .subscribe((comments: any) => {
        comments.forEach((e) => {
          if (e.time) {
            e.time = formatDistance(new Date(e.time), new Date(), {
              addSuffix: true,
            });
          }
        });
        this.comments = comments;
        this.commentsSub.unsubscribe();
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
  constructor() {}

  ngOnInit(): void {}
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
    const name = searchName.value.trim();
    const major = searchMaj.value.trim();
    const minor = searchMin.value.trim();
    const sport = searchSport.value.trim();
    const club = searchClub.value.trim();

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
        this.filtersSub.unsubscribe();
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
  selector: 'app-card-new-skalars ',
  templateUrl: './large_newSkalars.component.html',
  styleUrls: ['./main-pages.component.scss'],
})
export class LargeNewSkalarsFeedComponent implements OnInit {
  ngOnInit(): void {}
}
@Component({
  selector: 'app-hashtags',
  templateUrl: './hashtags.component.html',
  styleUrls: ['./main-pages.component.scss'],
})
export class HashtagComponent implements OnInit, OnDestroy {
  userId: string;
  hashtag: string;
  posts: Post[] = [];
  mains: Fav = {};
  private postsSub: Subscription;
  private routeSub: Subscription;
  private favsSub: Subscription;
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    public postService: PostService,
    public postsService: PostsService,

    private authService: AuthService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.userId = this.authService.getUserId();

    this.routeSub = this.route.queryParams.subscribe((params) => {
      this.hashtag = params?.hashtag;
      console.log('params page', this.hashtag);
      console.log('woo hoo', params);
      this.postsService.getFavsListHashtag(this.userId, this.hashtag);
      this.favsSub = this.postsService
        .getFavsListenerSingle()
        .subscribe((favs) => {
          console.log('fashion', favs);
          this.mains = favs;
        });
      this.postService.getPostsHashtagPage(this.hashtag, 0);
      this.postsSub = this.postService
        .getPostUpdateListener()
        .subscribe((posts: Post[]) => {
          this.posts = posts;
          this.isLoading = false;
        });
    });
  }
  ngOnDestroy(): any {
    this.postsSub.unsubscribe();
    this.routeSub.unsubscribe();
    this.favsSub.unsubscribe();
  }

  saveFavHashTag(hashtag: string): void {
    console.log('sons trust up 2', hashtag);
    this.postsService.addFavsNew(this.userId, '', hashtag);
  }
  unsaveFavHashTag(id: string): void {
    console.log('sons trust up 7', id);
    this.postsService.unSaveFavs(id);
    this.favsSub = this.postsService.getFavsListener().subscribe((favs) => {
      this.mains = favs;
      this.favsSub.unsubscribe();
    });
  }
  navToHashTag(HashTag: string): any {
    console.log('HashTag', HashTag);
    // Where the post was posted
    this.router.navigate(['/hashtag/:'], {
      queryParams: { hashtag: HashTag },
    });
  }
  // Where the post was posted
  navigateToMainPage(value: string): void {
    this.router.navigate(['/main/:'], { queryParams: { category: value } });
    console.log('hey chaz mataz', value);
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
export class HashtagCardComponent implements OnInit, OnDestroy {
  hashtag: string;
  countVisibility = 0;
  recomCounter = 0;
  hide = true;
  userId: string;

  comment: FormControl = new FormControl('');
  comments: string[] = [];
  private commentsSub: Subscription;
  private routeSub: Subscription;
  private trendingSub: Subscription;
  commentsValidator = '';
  commentsCountValidator = '';

  valueChosen = '7';
  reposts = '';

  time = new Date();
  posts: Post[] = [];
  private postsSub: Subscription;
  private posts2Sub: Subscription;

  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    public postService: PostService,
    private commentsService: CommentsService,
    private router: Router,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.userId = this.authService.getUserId();

    this.routeSub = this.route.queryParams.subscribe((params) => {
      this.hashtag = params?.hashtag;
      console.log('params hashtag page', this.hashtag);

      this.postService.getPostsHashtagPage(this.hashtag, 0);
      this.postsSub = this.postService
        .getPostUpdateListener()
        .subscribe((posts: Post[]) => {
          this.posts = posts;
          console.log('testing 1,2,3', this.posts);
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
  CommentTrigger(postId: string): void {
    if (this.comment.value) {
      this.commentsService.createComment(
        this.comment.value,
        this.userId,
        this.time,
        postId
      );
      this.comment.setValue('');
      // this.commentsService.getComments(postId);
      this.commentsSub = this.commentsService
        .getMessagesUpdateListener()
        .subscribe((comments: any) => {
          console.log('i got more shit to say baby');
          this.commentsCountValidator = postId;
          // this.commentCount = comments.length;
          // console.log('type', this.commentCount);
          comments.forEach((e) => {
            if (e.time) {
              e.time = formatDistance(new Date(e.time), new Date(), {
                addSuffix: true,
              });
            }
          });
          this.comments = comments;
          this.commentsSub.unsubscribe();
        });

      console.log('onComment', postId);
    }
  }
  onDeleteComment(commentId: string, postId: string): any {
    this.commentsService.deleteComment(commentId);
    console.log('chaz whats up', commentId);
    console.log('chaz whats up 2', postId);

    this.commentsSub = this.commentsService
      .getMessagesUpdateListener()
      .subscribe((comments: any) => {
        this.commentsCountValidator = postId;
        // this.commentCount = comments.length;
        // console.log('type', this.commentCount);
        comments.forEach((e) => {
          if (e.time) {
            e.time = formatDistance(new Date(e.time), new Date(), {
              addSuffix: true,
            });
          }
        });
        this.comments = comments;
        this.commentsSub.unsubscribe();
      });
    console.log('in real time');
  }
  loadComments(postId: string): void {
    console.log('hey logic fade away 7', postId);
    this.commentsService.getComments(postId);
    this.commentsSub = this.commentsService
      .getMessagesUpdateListener()
      .subscribe((comments: any) => {
        this.commentsCountValidator = postId;
        comments.forEach((e) => {
          if (e.time) {
            e.time = formatDistance(new Date(e.time), new Date(), {
              addSuffix: true,
            });
          }
        });
        this.comments = comments;
        this.commentsSub.unsubscribe();
      });
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

    this.postService.getPostsHashtagPage(this.hashtag, this.recomCounter);
    this.posts2Sub = this.postService
      .getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
        this.isLoading = false;
        console.log('posts personal', this.posts);
        this.posts2Sub.unsubscribe();
      });
  }
  // Where the post was posted
  navigateToMainPage(value: string): void {
    this.router.navigate(['/main/:'], { queryParams: { category: value } });
    console.log('hey chaz mataz', value);
  }
  // Where the post was posted
  getPostsMainPageInstructor(value: string): void {
    this.router.navigate(['/instructor-review/:'], {
      queryParams: { category: value },
    });
    console.log('hey chaz mataz yo homie', value);
  }
}

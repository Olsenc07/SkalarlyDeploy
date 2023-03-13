import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { Observable, Subscription } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { AuthService } from './services/auth.service';
import { PostsService, UserNames } from './services/posts.service';
import {
  CommentInterface,
  MissedNotif,
} from './activity-history/history.component';
import { CommentsService } from './services/comments.service';
import { Message } from './services/messages.service';
import { MessageNotificationService } from './services/messagesNotifications.service';
import { FollowService } from './services/follow.service';
import { Follow } from './reusable-card-user/reusable-card-user.component';
import { Post, PostService } from './services/post.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  users: UserNames[] = [];
  public hashs = [];
  notif: MissedNotif[] = [];
  comments: CommentInterface[] = [];
  sharedNew: Post[] = [];

  newMsg = [];
  newMessageCheck = [];
  newfollowerCheck = [];
  newsharedCheck = [];
  newComment = [];
  follower: Follow[] = [];
  postClicked = false;
  commentClicked = false;
  userId: string;
  Hashtag = false;
  userIsAuthenticated = false;
  onSearcPg: boolean;
  public href = '';
  url: URL;
  rawURL: string;
  params: URLSearchParams;
  // filteredOptions: Observable<string[]>;
  hasQuery = false;
  hasQueryHash = false;
  private msgNotifSub: Subscription;
  private commentSub: Subscription;
  private searchSub: Subscription;
  private msgsSub: Subscription;
  private comment2Sub: Subscription;
  private commentSub2: Subscription;
  private authListenerSubs: Subscription;
  private followSub: Subscription;
  private followSub2: Subscription;

  private postsSub: Subscription;
  // socket.io
  public roomId: string;
  public messageText: string;
  public messageArray: { username: string; message: string }[] = [];

  public currentUser;
  public selectedUser;

  public userList = [];

  minHeight = true;
  minwidth = true;
  aspectRatio = true;

  searchPop = false;
  faCoffee = faCoffee;
  title = 'Skalarly';

  isHomeScreen$: Observable<boolean>;

  isPostScreen$: Observable<boolean>;

  isSearchScreen$: Observable<boolean>;

  isVerifiedScreen$: Observable<boolean>;

  isFriendsActScreen$: Observable<boolean>;

  isProfileScreen$: Observable<boolean>;

  isSignUpScreen$: Observable<boolean>;

  isEditProfileScreen$: Observable<boolean>;

  isRetrievePScreen$: Observable<boolean>;

  isForgotPasswordScreen$: Observable<boolean>;

  isResetPScreen$: Observable<boolean>;

  isMessagesScreen$: Observable<boolean>;

  searchBox: Element;

  // allUsers should filter through every user
  allUsers: string[] = [''];

  search: FormControl = new FormControl('');
  searchHash: FormControl = new FormControl('');
  filteredSearch: Observable<string[]>;
  searchForm = new FormGroup({
    search: this.search,
  });

  constructor(
    private postsService: PostsService,
    private router: Router,
    private authService: AuthService,
    private commentsService: CommentsService,
    private messageNotificationService: MessageNotificationService,
    private followService: FollowService,
    public postService: PostService
  ) {
    this.filteredSearch = this.search.valueChanges.pipe(
      map((user: string | null) =>
        user ? this._filter(user) : this.allUsers.slice()
      )
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allUsers.filter(
      (user) => user.toLowerCase().indexOf(filterValue) === 0
    );
  }

  ngOnInit(): void {
    const url = new URL(window.location.href);
    const notSecure = url.protocol;
    if (notSecure === 'http:') {
      // Goes to https
      const myURL = new URL(url);
      myURL.protocol = 'https:';
      location.href = myURL.href;
    }
    this.authService.autoAuthUser();
    this.userId = this.authService.getUserId();
    console.log('user Id sloth', this.userId);
    document
      .getElementsByClassName('search-box__icon')[0]
      ?.addEventListener('click', this.activateSearch);
    this.searchBox = document.getElementsByClassName('search-box')[0];

    this.isPostScreen$ = this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(
        (event: NavigationEnd) =>
          event.url === '/' || event.url === '/post-page'
      )
    );

    this.isSearchScreen$ = this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(
        (event: NavigationEnd) => event.url === '/' || event.url === '/search'
      )
    );

    this.isVerifiedScreen$ = this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(
        (event: NavigationEnd) => event.url === '/' || event.url === '/verified'
      )
    );
    this.isResetPScreen$ = this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(
        (event: NavigationEnd) =>
          event.url === '/' || event.url === '/resetPassword'
      )
    );
    this.isFriendsActScreen$ = this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(
        (event: NavigationEnd) =>
          event.url === '/' || event.url === '/friends-activity'
      )
    );

    this.isProfileScreen$ = this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(
        (event: NavigationEnd) => event.url === '/' || event.url === '/profile'
      )
    );

    this.isSignUpScreen$ = this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(
        (event: NavigationEnd) => event.url === '/' || event.url === '/sign-up'
      )
    );
    this.isEditProfileScreen$ = this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(
        (event: NavigationEnd) =>
          event.url === '/' || event.url === '/edit-profile'
      )
    );
    this.isHomeScreen$ = this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map((event: NavigationEnd) => event.url === '/' || event.url === '/login')
    );
    this.isRetrievePScreen$ = this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(
        (event: NavigationEnd) =>
          event.url === '/' || event.url === '/retrieve-password'
      )
    );

    this.isForgotPasswordScreen$ = this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(
        (event: NavigationEnd) =>
          event.url === '/' || event.url === '/forgot-password'
      )
    );
    this.isMessagesScreen$ = this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(
        (event: NavigationEnd) => event.url === '/' || event.url === '/messages'
      )
    );

    // Validation
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated: boolean) => {
        this.userIsAuthenticated = isAuthenticated;
        // this.userId = this.authService.getUserId();
        // Can add *ngIf="userIsAuthenticated" to hide items
      });

    // update badges! on pg refresh
    if (this.userId != null) {
      // broken subscription link
      this.commentsService.getMissedNotif(this.userId, 0);
      this.comment2Sub = this.commentsService
        .getMissedNotifUpdateListener()
        .subscribe((missedNotifs: MissedNotif[]) => {
          if (missedNotifs.length > 0) {
            this.notif = missedNotifs;
            console.log('notif missed 678', this.notif);
          } else {
            console.log(' no notif missed 678');
          }
        });
      // msgs
      this.messageNotificationService.getMessageNotification(this.userId);
      this.msgsSub = this.messageNotificationService
        .getListenerNotification()
        .subscribe((messagesNotif: Message[]) => {
          if (messagesNotif.length > 0) {
            this.newMsg = messagesNotif.reverse();
            const NEW = [];
            this.newMsg.forEach((e) => {
              console.log('new b', e);
              console.log('new c', e.viewed);
              if (e.viewed === false) {
                NEW.push(e.viewed);
              } else {
                console.log('no unread messages');
              }
            });
            this.newMessageCheck = NEW;
          } else {
            console.log('no unread messages 2.0');
          }
        });
      // new Comment
      this.commentsService.getCommentsHistory(this.userId, 0);
      this.commentSub = this.commentsService
        .getMessagesUpdateListenerHistory()
        .subscribe((comments: any) => {
          if (comments.length > 0) {
            this.comments = comments;
            const NEW7 = [];
            this.comments.forEach((e) => {
              if (e.viewed === false) {
                NEW7.push(e.viewed);
              } else {
                console.log('no unread comments');
              }
            });
            this.newComment = NEW7;
            console.log('new Gold', this.newComment);
          } else {
            console.log('no unread comments 2.0');
          }
        });
      // new followers
      this.followService.getMessageNotificationFollowed(this.userId);
      this.followSub = this.followService
        .getInfoFollowUpdateListener()
        .subscribe((follower: Follow[]) => {
          if (follower.length > 0) {
            this.follower = follower.reverse();
            const NEW2 = [];
            this.follower.forEach((e) => {
              if (e.viewed === false) {
                NEW2.push(e.viewed);
              } else {
                console.log('no new followers');
              }
            });
            console.log('Followers baby 76', NEW2);

            this.newfollowerCheck = NEW2;
            console.log('Followers baby 77', this.newfollowerCheck);
          } else {
            console.log('no new followers 2.0');
          }
        });
      // new Shared posts
      this.postService.getSharedPosts(this.userId, 0);
      this.postsSub = this.postService
        .getPostSharedUpdateListener()
        .subscribe((shared: Post[]) => {
          if (shared.length > 0) {
            this.sharedNew = shared;
            const NEW3 = [];
            this.sharedNew.forEach((e) => {
              if (e.viewed === false) {
                NEW3.push(e.viewed);
              } else {
                console.log('no new followers');
              }
            });
            console.log('Followers baby 77890', NEW3);

            this.newsharedCheck = NEW3;
            console.log('Followers baby 7777', this.newsharedCheck);
          } else {
            console.log('no new followers 2.0');
          }
        });
    }

    // update badges! on login!!
    this.searchSub = this.isSearchScreen$.subscribe((onSearchPg) => {
      console.log('happy boy', onSearchPg);
      if (onSearchPg === true) {
        this.userId = this.authService.getUserId();
        console.log('seemed to love it ', this.userId);
        if (this.userId != null) {
          const previousPageUrl = document.referrer;
          console.log(`Previously visited page URL: ${previousPageUrl}`);
          if (
            previousPageUrl === '' ||
            previousPageUrl === 'https://www.skalarly.com/search'
          ) {
            console.log('made it baby');
            // broken subscription link
            this.commentsService.getMissedNotif(this.userId, 0);
            this.commentSub2 = this.commentsService
              .getMissedNotifUpdateListener()
              .subscribe((missedNotifs: MissedNotif[]) => {
                if (missedNotifs.length > 0) {
                  this.notif = missedNotifs;
                  console.log('notif missed', this.notif);
                } else {
                  console.log('nope notif missed');
                }
              });

            // msgs
            this.messageNotificationService.getMessageNotification(this.userId);
            this.msgNotifSub = this.messageNotificationService
              .getListenerNotification()
              .subscribe((messagesNotif: Message[]) => {
                if (messagesNotif.length > 0) {
                  this.newMsg = messagesNotif.reverse();
                  const NEW = [];
                  this.newMsg.forEach((e) => {
                    if (e.viewed === false) {
                      NEW.push(e.viewed);
                    } else {
                      console.log('no unread messages');
                    }
                  });
                  this.newMessageCheck = NEW;
                  console.log('all the way', this.newMessageCheck);
                } else {
                  console.log('no unread messages 2.0');
                }
              });
            // new shared Posts
            this.postService.getSharedPosts(this.userId, 0);
            this.postsSub = this.postService
              .getPostSharedUpdateListener()
              .subscribe((shared: Post[]) => {
                if (shared.length > 0) {
                  console.log('if shared', shared);
                  this.sharedNew = shared;
                  const NEW3 = [];
                  this.sharedNew.forEach((e) => {
                    console.log('new f', e);
                    console.log('new g', e.viewed);
                    if (e.viewed === false) {
                      NEW3.push(e.viewed);
                    } else {
                      console.log('no new shared posts');
                    }
                  });
                  console.log('Shared posts baby backed up', NEW3);
                  this.newsharedCheck = NEW3;
                  console.log(
                    'Shared posts baby 777787325',
                    this.newsharedCheck
                  );
                } else {
                  console.log('no new shared posts 2.0');
                }
              });
            // new Comment
            this.commentsService.getCommentsHistory(this.userId, 0);
            this.commentSub = this.commentsService
              .getMessagesUpdateListenerHistory()
              .subscribe((comments: any) => {
                if (comments.length > 0) {
                  console.log('fake love', comments);
                  this.comments = comments;
                  const NEW7 = [];
                  this.comments.forEach((e) => {
                    if (e.viewed === false) {
                      NEW7.push(e.viewed);
                    } else {
                      console.log('no unread comments');
                    }
                  });
                  console.log('new Gold', NEW7);
                  this.newComment = NEW7;
                  console.log('new Gold 2.0', this.newComment);
                } else {
                  console.log('no unread comments 2.0');
                }
              });
            // new followers
            this.followService.getMessageNotificationFollowed(this.userId);
            this.followSub2 = this.followService
              .getInfoFollowUpdateListener()
              .subscribe((follower: Follow[]) => {
                if (follower.length > 0) {
                  this.follower = follower.reverse();
                  const NEW2 = [];
                  this.follower.forEach((e) => {
                    console.log('new de', e);
                    console.log('new ef', e.viewed);
                    if (e.viewed === false) {
                      NEW2.push(e.viewed);
                    } else {
                      console.log('no new followers');
                    }
                  });
                  console.log('Followers baby', NEW2);
                  this.newfollowerCheck = NEW2;
                  console.log('Followers baby 2.0', this.newfollowerCheck);
                } else {
                  console.log('no new followers 2.0');
                }
              });

            console.log('booty lucky');
          } else {
            console.log('search pg nah');
          }
        }
      }
    });

    if (window.screen.height < 768) {
      this.minHeight = false;
    }

    if (window.screen.width < 1170) {
      this.minwidth = false;
    }
    console.log('crystal meth');
  }
  ngOnDestroy(): any {
    this.authListenerSubs.unsubscribe();
    this.msgNotifSub.unsubscribe();
    this.commentSub.unsubscribe();
    this.commentSub2.unsubscribe();
    this.searchSub.unsubscribe();
    this.msgsSub.unsubscribe();
    this.comment2Sub.unsubscribe();
    this.followSub.unsubscribe();
    this.followSub2.unsubscribe();
    this.postsSub.unsubscribe();
    console.log('your touch');
  }
  hashTagSearch(): any {
    this.Hashtag = true;
  }
  skalarSearch(): any {
    this.Hashtag = false;
  }
  // Post icon css changes
  postClickedBtn(): boolean {
    return (this.postClicked = true);
  }
  postUnClickedBtn(): boolean {
    return (this.postClicked = false);
  }

  // Message icon css changes
  messagesClickedBtn(): boolean {
    return (this.commentClicked = true);
  }
  messagesUnClickedBtn(): boolean {
    return (this.commentClicked = false);
  }
  // To post page with users id
  navigateToPost(): any {
    // const ID = (document.getElementById('userName') as HTMLInputElement).value;
    this.router.navigate(['/post-page/:'], {
      queryParams: { userId: this.userId },
    });
  }
  navToHashTag(HashTag: string): any {
    console.log('HashTag', HashTag);
    // Where the post was posted
    this.router.navigate(['/hashtag/:'], {
      queryParams: { hashtag: HashTag },
    });
  }
  navigateToMessages(): any {
    // const ID = (document.getElementById('userName') as HTMLInputElement).value;
    this.router.navigate(['/messages/:']);
  }

  navigateToEditProfile(): any {
    this.router.navigate(['/edit-profile/:'], {
      queryParams: { userId: this.userId },
    });
  }
  navigateToEditComp(): any {
    this.router.navigate(['/edit-profileComp/:'], {
      queryParams: { userId: this.userId },
    });
  }
  navigateToEditCompW(): any {
    this.router.navigate(['/edit-profileCompW/:'], {
      queryParams: { userId: this.userId },
    });
  }
  navigateToEditComp2(): any {
    this.router.navigate(['/edit-profileComp2/:'], {
      queryParams: { userId: this.userId },
    });
  }
  navigateToEditComp2W(): any {
    this.router.navigate(['/edit-profileComp2W/:'], {
      queryParams: { userId: this.userId },
    });
  }
  navigateToEditComp3(): any {
    this.router.navigate(['/edit-profileComp3/:'], {
      queryParams: { userId: this.userId },
    });
  }
  navigateToEditComp3W(): any {
    this.router.navigate(['/edit-profileComp3W/:'], {
      queryParams: { userId: this.userId },
    });
  }
  navigateToEditComp4(): any {
    this.router.navigate(['/edit-profileComp4/:'], {
      queryParams: { userId: this.userId },
    });
  }
  navigateToEditComp4W(): any {
    this.router.navigate(['/edit-profileComp4W/:'], {
      queryParams: { userId: this.userId },
    });
  }
  navigateToEditPur(): any {
    this.router.navigate(['/edit-profilePur/:'], {
      queryParams: { userId: this.userId },
    });
  }
  navigateToEditPurW(): any {
    this.router.navigate(['/edit-profilePurW/:'], {
      queryParams: { userId: this.userId },
    });
  }
  navigateToEditPurSp(): any {
    this.router.navigate(['/edit-profilePurSp/:'], {
      queryParams: { userId: this.userId },
    });
  }
  navigateToEditPurSu(): any {
    this.router.navigate(['/edit-profilePurSu/:'], {
      queryParams: { userId: this.userId },
    });
  }
  // searching users
  sendData(event: any): any {
    const query: string = event.target.value;
    console.log('query ', query);
    if (query) {
      const noSpecialChars = query.replace(/[^a-zA-Z0-9 ]/g, '');
      console.log('noSpecialChars', noSpecialChars);
      this.hasQuery = true;

      // if (matches != null) {
      // if (matches.length > 0) {
      this.postsService.searchUsers(noSpecialChars.trim(), this.userId);
      this.postsService.getUserId().subscribe((results) => {
        if (results.length > 0) {
          this.users = results;
          console.log('results baby', results);
        } else {
          this.users = [];
        }
      });
    } else {
      this.hasQuery = false;
    }
  }

  // Hashtag search
  sendDataHash(event: any): any {
    const queryHash: string = event.target.value;
    console.log('query yo', queryHash);
    if (queryHash) {
      // const regex = /\w/g;
      const noSpecialChars = queryHash.replace(/[^a-zA-Z0-9 ]/g, '');
      console.log('noSpecialChars', noSpecialChars);
      this.hasQueryHash = true;
      // Will match if query is nothing or is only spaces
      // const matchSpaces: any = queryHash.match('^[a-zA-Z0-9]');
      // if (matchSpaces[0] !== queryHash) {
      this.postsService.searchHashs(noSpecialChars.trim());
      this.postsService.getHashs().subscribe((results) => {
        if (results.length > 0) {
          this.hashs = results;
          console.log('another log', this.hashs);
        } else {
          console.log('logic ');
          this.hashs = [];
        }
      });
    } else {
      this.hasQuery = false;
    }
  }

  navigateToPage(infoUser: string): any {
    // const ID = (document.getElementById('userName') as HTMLInputElement).value;
    this.router.navigate(['/skalars/:'], { queryParams: { id: infoUser } });
  }

  onLogout(): void {
    this.authService.logout();
    location.reload();
  }

  // Missing link to fix search icon movement i hope
  // searchIcon.addEventListener("click", activateSearch);
  activateSearch(): void {
    this.searchBox.classList.toggle('active');
  }

  // Search user
  search_user(): void {}

  search_(): void {
    this.searchPop = !this.searchPop;
  }

  clearSearch(): void {
    this.search.reset();
  }

  onSubmit(): void {
    console.log(this.searchForm.value);
  }
}

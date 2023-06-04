import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { NavigationEnd, Router, ActivatedRoute } from '@angular/router';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
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
  usersFinal = [];
  public hashs = [];
  notif: MissedNotif[] = [];
  comments: CommentInterface[] = [];
  sharedNew: Post[] = [];
  searched: boolean;
  searchMadeHash: boolean;
  searchMade: boolean;
  newMsg = [];
  newMessageCheck = [];
  newfollowerCheck = [];
  newAccepted = [];
  newsharedCheck = [];
  newComment = [];
  follower: Follow[] = [];

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
  private followSubAccepted: Subscription;
  private searchSub: Subscription;
  private msgSub: Subscription;
  private postSub: Subscription;
  private msgsSub: Subscription;
  private comment2Sub: Subscription;
  private commentSub2: Subscription;
  private authListenerSubs: Subscription;
  private followSub: Subscription;
  private followSub2: Subscription;
  private followSub7: Subscription;
  private searchFollowSub: Subscription;
  private searchHashSub: Subscription;
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
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private commentsService: CommentsService,
    private messageNotificationService: MessageNotificationService,
    private followService: FollowService,
    public postService: PostService,
    public dialog: MatDialog
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
    this.authService.triggerReAuth.subscribe((param) => {
      console.log('subjecy triggered', param);
      this.dialog.open(ReAuthorizeComponent, { disableClose: true });
    });
    this.authService.autoAuthUser();
    this.userId = this.authService.getUserId();
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
          if (messagesNotif.length >= 1) {
            this.newMsg = messagesNotif;
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
        .getMessagesUpdateListener()
        .subscribe((comments: any) => {
          console.log('where my comments at', comments);
          if (comments.length >= 1) {
            this.comments = comments;
            const NEW7 = [];
            this.comments.forEach((e) => {
              if (e.viewed == false) {
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
      // accepted follow
      this.followService.getMessageNotificationFollowedAccepted(this.userId, 0);
      this.followSubAccepted = this.followService
        .getInfoFollowUpdateListenerAccepted()
        .subscribe((accepted: any) => {
          if (accepted.length >= 1) {
            const NEW2 = [];
            accepted.forEach((e) => {
              if (e.viewed === false) {
                NEW2.push(e.viewed);
              } else {
                console.log('no new accepted following');
              }
            });
            this.newAccepted = NEW2;
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
          if (shared.length >= 1) {
            this.sharedNew = shared;
            const NEW3 = [];
            this.sharedNew.forEach((e) => {
              if (e.viewed == false) {
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
                if (shared.length >= 1) {
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
              .getMessagesUpdateListener()
              .subscribe((comments: any) => {
                if (comments.length >= 1) {
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
            // accepted follow
            this.followService.getMessageNotificationFollowedAccepted(
              this.userId,
              0
            );
            this.followSubAccepted = this.followService
              .getInfoFollowUpdateListenerAccepted()
              .subscribe((accepted: any) => {
                if (accepted.length >= 1) {
                  const NEW2 = [];
                  accepted.forEach((e) => {
                    if (e.viewed === false) {
                      NEW2.push(e.viewed);
                    } else {
                      console.log('no new accepted following');
                    }
                  });
                  this.newAccepted = NEW2;
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
    console.log('crystal');
  }
  ngOnDestroy(): any {
    this.authListenerSubs.unsubscribe();
    this.msgNotifSub.unsubscribe();
    this.commentSub.unsubscribe();
    this.followSubAccepted.unsubscribe();
    this.commentSub2.unsubscribe();
    this.searchSub.unsubscribe();
    this.msgsSub.unsubscribe();
    this.msgSub.unsubscribe();
    this.postSub.unsubscribe();
    this.comment2Sub.unsubscribe();
    this.followSub.unsubscribe();
    this.followSub2.unsubscribe();
    this.postsSub.unsubscribe();
  }

  // Checking for now read comments and shared posts
  // Triggered when leaving a nav bar icon is clicked
  updateSettingsIcon() {
    console.log('haha it worked wally', document.referrer);
    this.userId = this.authService.getUserId();
    console.log(' id please', this.userId);
    // this.newComment = [];
    // this.newsharedCheck = [];
    // new Comment
    this.commentsService.getCommentsHistory(this.userId, 0);
    this.commentSub = this.commentsService
      .getMessagesUpdateListener()
      .subscribe((comments: any) => {
        if (comments.length >= 1) {
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
    // accepted follow
    this.followService.getMessageNotificationFollowedAccepted(this.userId, 0);
    this.followSubAccepted = this.followService
      .getInfoFollowUpdateListenerAccepted()
      .subscribe((accepted: any) => {
        if (accepted.length >= 1) {
          const NEW2 = [];
          accepted.forEach((e) => {
            if (e.viewed === false) {
              NEW2.push(e.viewed);
            } else {
              console.log('no new accepted following');
            }
          });
          this.newAccepted = NEW2;
        }
      });
    //  // new shared Posts
    this.postService.getSharedPosts(this.userId, 0);
    this.postsSub = this.postService
      .getPostSharedUpdateListener()
      .subscribe((shared: Post[]) => {
        if (shared.length >= 1) {
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
          console.log('Shared posts baby 777787325', this.newsharedCheck);
        } else {
          console.log('no new shared posts 2.0');
        }
      });
  }

  // Follow skalar from search bar
  followClicked(username: string, id: string): any {
    this.searchCharacter = '';
    this.checkFollowingSearch(this.search.value);
    const FollowingId = id;
    this.followService.postInfoFollow(this.userId, username, FollowingId);
    this.followService.postInfoFollowHistory(this.userId, username);
    console.log('username follow', username);
    console.log('id follow', FollowingId);
    console.log('your id', this.userId);
  }
  stopPropagation($event: any) {
    $event.stopPropagation();
    console.log('samuri wizard');
  }
  // unfollow skalar from search bar
  onUnfololow(userName: string): any {
    this.searchCharacter = '';
    this.checkFollowingSearch(this.search.value);

    this.followService.deleteFollowUserPg(userName, this.userId);
    console.log('chaz whats up homie gg unfollow', userName);
    console.log('chaz whats up unfollow', this.userId);
  }
  hashTagSearch(): any {
    this.Hashtag = true;
  }
  skalarSearch(): any {
    this.Hashtag = false;
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
      this.searchFollowSub = this.postsService
        .getUserId()
        .subscribe((results) => {
          this.searchMade = true;
          if (results.length > 0) {
            // add key value pair to see if following
            this.users = results;
            this.searchCharacter = '';
          } else {
            this.users = [];
            this.searchCharacter = '';
          }
        });
    } else {
      this.hasQuery = false;
      // cleans up check following search
      if ((this.searchMade = true)) {
        this.searchFollowSub.unsubscribe();
        this.searchMade = false;
      }
      if (this.searched === true) {
        this.followSub7.unsubscribe();
        this.searched = false;

        console.log('clean check following search');
      }
    }
  }
  clearBtn() {
    console.log('search value', this.search.value);
    if (this.searchMade === true && this.search.value == '') {
      this.searchFollowSub.unsubscribe();
      this.searchMade = false;
    }
    // clear btn clicked on search
    if (this.searched === true && this.search.value == '') {
      this.followSub7.unsubscribe();
      this.searched = false;
    }
  }
  // search skalars
  searchCharacter = '';
  checkFollowingSearch(searchValue: string) {
    console.log('searchValue', searchValue);
    console.log('searchCharacter', this.searchCharacter);
    let newsearchCharacter = searchValue;
    if (this.searchCharacter !== newsearchCharacter) {
      this.searchCharacter = searchValue;
      let newList = [];
      this.users.forEach((names) => {
        newList.push(names.username);
      });
      console.log('newList', newList);
      for (let i of newList) {
        this.postsService.checkFollowing(this.userId, i);
        this.followSub7 = this.postsService
          .getfollowingList()
          .subscribe((toronto) => {
            this.searched = true;
            console.log('toronto', toronto);
            console.log('toronto0', toronto[0]);
            console.log('toronto1', toronto[1]);
            // if (followingList.length < newList.length) {
            this.users.filter((e) => {
              console.log('e', e);
              if (e.username == toronto[0]) {
                e.following = toronto[1];
              }
            });
          });
      }
      console.log('final joyner 77', this.users);
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
      this.searchHashSub = this.postsService.getHashs().subscribe((results) => {
        this.searchMadeHash = true;
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
      // cleans up check hashtag search
      if ((this.searchMadeHash = true)) {
        this.searchHashSub.unsubscribe();
        this.searchMadeHash = false;
      }
    }
  }

  navigateToPage(infoUser: string): any {
    // const ID = (document.getElementById('userName') as HTMLInputElement).value;
    this.router.navigate(['/skalars/:'], { queryParams: { id: infoUser } });
  }

  onLogout(): void {
    location.reload();
    this.authService.logout();
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
}

@Component({
  selector: 'app-reauthorize-page',
  templateUrl: './reauthorize.component.html',
  styleUrls: ['./app.component.scss'],
})
export class ReAuthorizeComponent implements OnInit {
  userId: string;
  timeLeft = 30;
  timer = true;

  constructor(
    private authService: AuthService,
    private dialogRef: MatDialogRef<ReAuthorizeComponent>
  ) {}
  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    console.log('where you at', this.userId);
    setTimeout(this.makeIteration);
  }

  makeIteration = (): void => {
    if (this.timeLeft > 1 && this.timer == true) {
      document.getElementById('Timer').innerHTML =
        this.timeLeft + '\xa0' + 'seconds remaining';
      setTimeout(this.makeIteration, 1000); // 1 second waiting
    }
    if (this.timeLeft == 1 && this.timer == true) {
      document.getElementById('Timer').innerHTML =
        this.timeLeft + '\xa0' + 'second remaining';
      setTimeout(this.makeIteration, 1000); // 1 second waiting
    }
    if (this.timeLeft == 0 && this.timer == true) {
      document.getElementById('Timer').innerHTML = '';
      this.authService.logout();
      this.dialogRef.close();
    }
    this.timeLeft -= 1;
  };

  logOut() {
    this.timer = false;
    this.authService.logout();
    this.dialogRef.close();
  }
  reAuthorize() {
    this.timer = false;
    this.authService.stayLoggedIn(this.userId);
    this.dialogRef.close();
  }
}

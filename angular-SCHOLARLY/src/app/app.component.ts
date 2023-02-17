import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { Observable, Subscription } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { AuthService } from './services/auth.service';
import { PostsService, UserNames } from './services/posts.service';
import { MissedNotif } from './activity-history/history.component';
import { CommentsService } from './services/comments.service';
import { Message } from './services/messages.service';
import { MessageNotificationService } from './services/messagesNotifications.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  users: UserNames[] = [];
  public hashs = [];
  notif: MissedNotif[] = [];
  newMsg = [];
  newMessageCheck = [];
  postClicked = false;
  commentClicked = false;
  userId: string;
  Hashtag = false;
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;
  public href = '';
  _url: URL;
  rawURL: string;
  _params: URLSearchParams;
  // filteredOptions: Observable<string[]>;
  hasQuery = false;
  hasQueryHash = false;

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
    private messageNotificationService: MessageNotificationService
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
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
        // this.userId = this.authService.getUserId();
        // Can add *ngIf="userIsAuthenticated" to hide items
      });

    // missedNotif badge
    if (this.userId != null) {
      this.commentsService.getMissedNotif(this.userId, 0);
      this.commentsService
        .getMissedNotifUpdateListener()
        .subscribe((missedNotifs: MissedNotif[]) => {
          this.notif = missedNotifs;
          console.log('notif missed', this.notif);
        });
      this.messageNotificationService.getMessageNotification(this.userId);
      this.messageNotificationService
        .getListenerNotification()
        .subscribe((messagesNotif: Message[]) => {
          this.newMsg = messagesNotif.reverse();
          console.log('newMsg', this.newMsg);
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
          console.log('NEW', NEW);
          this.newMessageCheck = NEW;
          console.log('newMessageCheck', this.newMessageCheck);
          console.log('newMessageCheck length', this.newMessageCheck.length);
        });
    }
    if (window.screen.height < 768) {
      this.minHeight = false;
    }

    if (window.screen.width < 1170) {
      this.minwidth = false;
    }
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
    if (!query) {
      if (!query.match('^[a-zA-Z0-9]')) {
        // Will match if query is nothing or is only spaces
        // const matchSpaces: any = query.match(/\s*/);
        // const matchSpaces: any = query.match('^[a-zA-Z0-9]');

        this.users = [];
        this.hasQuery = true;
        console.log('he like');
        return;
      } else {
        console.log('no pat');
        this.postsService.searchUsers(query.trim()).subscribe((results) => {
          this.users = results;
          console.log('results baby', results);
          if (results) {
            console.log('bring me home');

            this.hasQuery = true;
          } else {
            console.log('you');
            this.hasQuery = false;
          }
        });
      }
      this.hasQuery = false;
    }
  }

  // Hashtag search
  sendDataHash(event: any): any {
    const queryHash: string = event.target.value;
    console.log('query yo', queryHash);
    if (!queryHash) {
      if (!queryHash.match('^[a-zA-Z0-9]')) {
        // Will match if query is nothing or is only spaces
        // const matchSpaces: any = queryHash.match('^[a-zA-Z0-9]');
        // if (matchSpaces[0] !== queryHash) {
        this.hashs = [];
        this.hasQueryHash = true;
        console.log('he like hash');

        return;
      } else {
        console.log('logic ');
        console.log('no keaton');
        this.postsService.searchHashs(queryHash.trim()).subscribe((results) => {
          this.hashs = results;
          this.hasQueryHash = true;
          console.log('another log', this.hashs);
        });
      }
      this.hasQueryHash = false;
    }
  }

  navigateToPage(infoUser: string): any {
    // const ID = (document.getElementById('userName') as HTMLInputElement).value;
    this.router.navigate(['/skalars/:'], { queryParams: { id: infoUser } });
  }

  onLogout(): void {
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

  onSubmit(): void {
    console.log(this.searchForm.value);
  }
}

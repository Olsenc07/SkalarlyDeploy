import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  MatBottomSheet,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { Post, PostService } from '../services/post.service';
import { ShowCase } from '../services/showCase.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ShowCaseService } from '../services/showCase.service';
import { AuthDataInfo } from '../signup/auth-data.model';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FollowService } from '../services/follow.service';
import { MatDialog } from '@angular/material/dialog';
import { PostsService } from '../services/posts.service';

export interface Follow {
  id: string;
  Follower: string;
  nameFollower: string;
  usernameFollower: string;
  ProfilePicPathFollower: string;

  Following: string;
  nameFollowing: string;
  ProfilePicPathFollowing: string;
}
/** @title Sidenav open & close behavior */
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  notification = false;
  ring = false;
  show = true;
  notif = '';

  isLoading = false;
  follow: Follow[] = [];
  private followSub: Subscription;

  followers: Follow[] = [];
  private followersSub: Subscription;

  userId: string;
  userIsAuthenticated = false;

  // img popup
  img = document.getElementById('myImg');
  modalImg = document.getElementById('img01');
  captionText = document.getElementById('caption');
  // Get the <span> element that closes the modal
  span = document.getElementsByClassName('close')[0];
  // private authStatusSubs: Subscription;
  private authListenerSubs: Subscription;
  private notifsListenerSubs: Subscription;

  // storedPosts: Post[] = [];
  posts: Post[] = [];
  private postsSub: Subscription;

  infos: AuthDataInfo[] = [];
  private infosSub: Subscription;

  private showCases: ShowCase[] = [];
  private infosSubShowCase: Subscription;

  // Sign up and edit profile connections

  showFiller = false;
  // TODO: initial following value would need to be loaded from database - for now, always start with false
  following = false;

  constructor(
    private postsService: PostsService,
    private router: Router,
    public postService: PostService,
    private authService: AuthService,
    private showCaseService: ShowCaseService,
    private followService: FollowService,
    public dialog: MatDialog
  ) {
    // profile$$.profile$$.subscribe((profile) => {
    //   // this.profile$$ = profile;
    //   // return name;
    // })
  }

  imgClick(imgPath): any {
    document.getElementById('myModal').style.display = 'block';
    (document.getElementById('img01') as HTMLImageElement).src = imgPath;
    console.log('hey good lookin');
  }
  close(): any {
    document.getElementById('myModal').style.display = 'none';
    console.log('bye good lookin');
  }
  onBio(): void {
    this.dialog.open(BioComponent);
  }

  followClicked(): void {
    this.following = !this.following;
  }

  ngOnInit(): any {
    this.authService.getAuthData();
    this.isLoading = true;
    // Info
    this.userId = this.authService.getUserId();
    this.postsService.checkNotification(this.userId);
    this.notifsListenerSubs = this.postsService
      .getNotifId()
      .subscribe((value) => {
        console.log('value', value);
        if (value.Creator) {
          this.notif = value.Creator;
          console.log('During the midday', this.notif);
        }
      });
    this.authService.getInfoProfile(this.userId);
    this.infosSub = this.authService
      .getInfoUpdateListener()
      .subscribe((infos: AuthDataInfo[]) => {
        this.infos = infos;
        this.isLoading = false;
      });
    // Validation
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
        // Can add *ngIf="userIsAuthenticated" to hide items
      });
    this.showCaseService.getShowCasePersonal(this.userId);
    this.postsSub = this.showCaseService
      .getshowCaseUpdateListener()
      .subscribe((showcases: ShowCase[]) => {
        this.showCases = showcases;
      });
    // Following
    this.followService.getMessageNotification(this.userId);
    this.followSub = this.followService
      .getInfoUpdateListener()
      .subscribe((follow: Follow[]) => {
        this.follow = follow;
      });
    // Followers
    this.followService.getMessageNotificationFollowed(this.userId);
    this.followersSub = this.followService
      .getInfoFollowUpdateListener()
      .subscribe((followers: Follow[]) => {
        this.followers = followers;
      });
  }
  // Turn off notifications
  offNotifs(): void {
    console.log('working 2', this.userId);
    this.postsService.deleteNotif(this.userId);
  }
  // Trigger Notifications
  Notifications(): any {
    this.ring = true;
    this.show = false;
    // Web-Push

    // displayConfir notif
    // function displayConfirmNotification(): any {
    //   if ('serviceWorker' in navigator) {
    //     navigator.serviceWorker.ready.then((swreq) => {
    //       swreq.showNotification('Successfully subscribed dawg!');
    //     });
    //   }
    // }

    if ('Notification' in window) {
      // window.addEventListener('load', askForNotificationPermission);
      this.askForNotificationPermission();
      console.log('here I am 2');
    }
  }

  navigateToEditProfile(): any {
    this.router.navigate(['/edit-profile/:'], {
      queryParams: { userId: this.userId },
    });
  }
  onDelete(postId: string): any {
    this.showCaseService.deleteShowCase(postId);
    console.log('chaz whats up homie g', postId);
  }

  // Public base64 to Uint
  urlBase64ToUint8Array(base64String): any {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }
  configurePushSub(): any {
    // Service worker
    const Id = this.userId;
    const Authservice = this.authService;
    console.log('here I am 5');
    if (!('serviceWorker' in navigator)) {
      return;
    }
    let req;
    navigator.serviceWorker.ready
      .then((swreq) => {
        req = swreq;
        console.log('hey chazzy', swreq);
        return swreq.pushManager.getSubscription();
      })
      .then((sub) => {
        console.log('simp', sub);
        // if (sub === null) {
        // Create a new subscription
        const convertedVapidPublicKey = this.urlBase64ToUint8Array(
          'BDNe3_EmHJwCDbzfy6BgJbboqVWt2yjqCbdKCfsao7LQ9clrK8383DMRtX5_RJI-99aqPq5N2pRBRRDMvcuWsBs'
        );
        req.pushManager
          .subscribe({
            userVisibleOnly: true,
            applicationServerKey: convertedVapidPublicKey,
          })
          .then((newSub: any) => {
            Authservice.addSubscription(newSub, Id);
            // return fetch('https://www.skalarly.com/api/subscribe/follow', {
            //   method: 'POST',
            //   headers: {
            //     'Content-Type': 'application/json',
            //   },
            //   body: JSON.stringify(newSub),
            // });
          });
        // } else {
        // We have a subscription
        // console.log('We have a subscription');
        // }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // Get notifcation permission
  askForNotificationPermission(): any {
    console.log('here I am z');
    Notification.requestPermission((result) => {
      console.log('Permission', result);
      if (result === 'granted') {
        this.notification = true;
        console.log('here I am 3');
      }

      if (result !== 'granted') {
        console.log('Permission not granted');
      } else {
        this.configurePushSub();
        console.log('here I am');
      }
    });
  }
}

/** @title Sidenav open & close behavior */
@Component({
  selector: 'app-userprofile',
  templateUrl: './userProfile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class UserProfileComponent implements OnInit, OnDestroy {
  constructor(
    private bottomSheet: MatBottomSheet,
    public postService: PostService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private showCaseService: ShowCaseService,
    private followService: FollowService,
    public dialog: MatDialog
  ) {}
  isLoading = false;
  userId: string;
  follow: Follow[] = [];
  private followSub: Subscription;
  private followSubs: Subscription;

  followers: Follow[] = [];
  private followersSub: Subscription;

  user: string;
  following: Follow[] = [];

  private showCases: ShowCase[] = [];
  private infosSubShowCase: Subscription;
  // userId: string;
  // userIsAuthenticated = false;

  // private authListenerSubs: Subscription;

  posts: Post[] = [];
  private postsSub: Subscription;

  infos: AuthDataInfo[] = [];
  private infosSub: Subscription;
  // img popup
  img = document.getElementById('myImg');
  modalImg = document.getElementById('img01');
  captionText = document.getElementById('caption');
  // Get the <span> element that closes the modal
  span = document.getElementsByClassName('close')[0];

  showFiller = false;
  // TODO: initial following value would need to be loaded from database - for now, always start with false
  Following: boolean;
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
  ngOnInit(): any {
    this.userId = this.authService.getUserId();
    this.isLoading = true;
    this.route.queryParams.subscribe((params) => {
      this.user = params.id;
      const id = this.user;
      // If following
      this.followService.getFollowingNotification(id, this.userId);
      this.followSub = this.followService
        .getInfoFollowUpdateListener()
        .subscribe((following: Follow[]) => {
          this.isLoading = false;
          this.following = following;
          if (this.following.length) {
            this.Following = true;
          } else {
            this.Following = false;
          }
        });

      // Following
      this.followService.getMessageNotificationOther(id);
      this.followSubs = this.followService
        .getFollowingUpdateListener()
        .subscribe((follow: Follow[]) => {
          this.follow = follow;
          console.log('lucky you', this.follow);
        });
      // Followers
      this.followService.getMessageNotificationFollowedOther(id);
      this.followersSub = this.followService
        .getInfoFollowUpdateListener()
        .subscribe((followers: Follow[]) => {
          this.followers = followers;
          console.log('lucky lucky you', this.followers);
        });
      // Infos
      this.authService.getOtherInfo(id);
      this.infosSub = this.authService
        .getInfoUpdateListener()
        .subscribe((infos: AuthDataInfo[]) => {
          this.infos = infos;
        });
      this.showCaseService.getShowCase(id);
      this.infosSubShowCase = this.showCaseService
        .getshowCaseUpdateListener()
        .subscribe((infos: ShowCase[]) => {
          this.showCases = infos;
          this.isLoading = false;
        });
    });
  }

  ngOnDestroy(): any {
    this.infosSubShowCase.unsubscribe();
    this.followSub.unsubscribe();
    this.infosSub.unsubscribe();
    this.followersSub.unsubscribe();
  }

  imgClick(imgPath): any {
    document.getElementById('myModal').style.display = 'block';
    (document.getElementById('img01') as HTMLImageElement).src = imgPath;

    console.log('hey good lookin');
  }
  close(): any {
    document.getElementById('myModal').style.display = 'none';
    console.log('bye good lookin');
  }
  // Bio
  onBio(): void {
    this.dialog.open(BioComponent);
  }
  followClicked(username: string): any {
    this.Following = true;
    this.route.queryParams.subscribe((params) => {
      this.user = params.id;
      const FollowingId = this.user;
      this.followService.postInfoFollow(this.userId, username, FollowingId);
      this.followService.postInfoFollowHistory(
        this.userId,
        username,
        FollowingId,
        this.time
      );
    });
  }
  onUnfololow(followId: string): any {
    this.Following = false;
    this.followService.deleteFollow(followId);
    console.log('chaz whats up homie gg', followId);
  }
  skalarMsg(username: string): void {
    console.log('username', username);
    this.router.navigate(['/messages/:'], {
      queryParams: { username },
    });
  }

  // ngOnDestroy(): any {
  //   this.postsSub.unsubscribe();
  //   // this.authListenerSubs.unsubscribe();
  // }
}

@Component({
  selector: 'app-bio',
  templateUrl: './bio.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class BioComponent implements OnInit {
  userId: string;
  infos: AuthDataInfo[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit(): any {
    // Verfiy
    this.userId = this.authService.getUserId();
    // Info
    this.authService.getInfo(0);
    this.authService
      .getInfoUpdateListener()
      .subscribe((infos: AuthDataInfo[]) => {
        this.infos = infos;
      });
  }
}

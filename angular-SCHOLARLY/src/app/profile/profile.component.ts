import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Post, PostService } from '../services/post.service';
import { ShowCase } from '../services/showCase.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ShowCaseService } from '../services/showCase.service';
import {
  AuthDataInfo,
  AuthDataInfoCoursesC,
  AuthDataInfoCoursesP,
} from '../signup/auth-data.model';
import { Router, ActivatedRoute } from '@angular/router';
import { FollowService } from '../services/follow.service';
import { MatDialog } from '@angular/material/dialog';
import { PostsService } from '../services/posts.service';
import { MissedNotif } from '../activity-history/history.component';
import { CommentsService } from '../services/comments.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface Follow {
  id: string;
  Follower: string;
  nameFollower: string;
  usernameFollower: string;
  ProfilePicPathFollower: string;

  FollowingId: string;
  Following: string;
  nameFollowing: string;
  ProfilePicPathFollowing: string;
  viewed: Boolean;
}
/** @title Sidenav open & close behavior */
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  notification = false;
  ring = false;
  show = true;
  notif = '';
  Notif: MissedNotif[] = [];
  date = new Date();
  birthday = false;
  recomCounter = 0;
  countVisibility = 0;
  isLoading = false;
  // follow: Follow[] = [];
  private followSub: Subscription;

  // followers: Follow[] = [];
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
  private offNotifSub: Subscription;
  private commentSub: Subscription;
  info: AuthDataInfo = {};
  infoCoursesC: AuthDataInfoCoursesC = {};
  infoCoursesP: AuthDataInfoCoursesP = {};
  private infosSub: Subscription;
  private infosSubC: Subscription;
  private infosSubP: Subscription;

  private showCases: ShowCase[] = [];

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
    public dialog: MatDialog,
    private commentsService: CommentsService,
    private snackBar: MatSnackBar
  ) {}

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
    // Validation
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated: boolean) => {
        this.userIsAuthenticated = isAuthenticated;
        // Can add *ngIf="userIsAuthenticated" to hide items
      });
    // Info
    this.userId = this.authService.getUserId();
    this.postsService.checkNotification(this.userId);
    this.notifsListenerSubs = this.postsService
      .getNotifId()
      .subscribe((value) => {
        console.log('value', value);
        if (value != null) {
          this.notif = value.Creator;
          console.log('During the midday', this.notif);
        }
      });
    // basic info
    this.authService.getInfoProfile(this.userId);
    this.infosSub = this.authService
      .getInfoUpdateListenerProfile()
      .subscribe((infos: any) => {
        this.info = infos;
        if (this.info.birthday != '') {
          const birthday = new Date(this.info.birthday);
          const day1 = birthday.getDay();
          const month1 = birthday.getMonth();
          console.log('day of bd', day1);
          console.log('month of bd', month1);
          if (day1 == new Date().getDay() && month1 == new Date().getMonth()) {
            this.birthday == true;
          }
        }
        console.log('boobs');
        this.isLoading = false;
        // do this for them all!
      });
    // courses completed
    this.authService.getInfoProfileCoursesC(this.userId);
    this.infosSubC = this.authService
      .getInfoUpdateListenerCoursesC()
      .subscribe((infosC: any) => {
        this.infoCoursesC = infosC;
        console.log('boobs C');
        this.isLoading = false;
        // do this for them all!
      });
    // courses pursuing
    this.authService.getInfoProfileCoursesP(this.userId);
    this.infosSubP = this.authService
      .getInfoUpdateListenerCoursesP()
      .subscribe((infosP: any) => {
        this.infoCoursesP = infosP;
        console.log('boobs p');
        this.isLoading = false;
        // do this for them all!
      });

    this.showCaseService.getShowCasePersonal(this.userId, 0);
    this.postsSub = this.showCaseService
      .getshowCaseUpdateListener()
      .subscribe((showcases: ShowCase[]) => {
        console.log('extra extra');
        this.showCases = showcases;
      });
    // Following
    // this.followService.getMessageNotification(this.userId);
    // this.followSub = this.followService
    //   // .getInfoUpdateListener()
    //   .getInfoFollowingUpdateListener()
    //   .subscribe((follow: Follow[]) => {
    //     console.log('follow grub', follow);
    //     this.follow = follow;
    //   });
    // Followers
    // this.followService.getMessageNotificationFollowed(this.userId);
    // this.followersSub = this.followService
    //   .getInfoFollowUpdateListener()
    //   .subscribe((followers: Follow[]) => {
    //     this.followers = followers;
    //   });
    // missed notifs
    this.commentsService.getMissedNotif(this.userId, 0);
    this.commentSub = this.commentsService
      .getMissedNotifUpdateListener()
      .subscribe((missedNotifs: MissedNotif[]) => {
        console.log('missedNotifs', missedNotifs);
        this.Notif = missedNotifs;
        if (this.Notif.length > 0) {
          const snackBarRef = this.snackBar.open(
            'Your notification connection has been lost. Please click the red bell to reset it.',
            'To see missed notifactions, click here first',
            {
              duration: 7000,
            }
          );
          snackBarRef.onAction().subscribe(() => {
            this.router.navigate(['/activity-history']);
          });
        }
      });
  }

  ngOnDestroy(): any {
    this.notifsListenerSubs.unsubscribe();
    this.infosSub.unsubscribe();
    this.infosSubC.unsubscribe();
    this.infosSubP.unsubscribe();
    this.authListenerSubs.unsubscribe();
    this.postsSub.unsubscribe();
    // this.followSub.unsubscribe();
    // this.followersSub.unsubscribe();
    this.commentSub.unsubscribe();
  }

  // Turn off notifications
  offNotifs(): void {
    console.log('working 2', this.userId);
    this.postsService.deleteNotif(this.userId);
    this.commentsService.clearMissedNotif(this.userId);
    this.offNotifSub = this.commentsService
      .getMissedNotifUpdateListener()
      .subscribe((missedNotifs: MissedNotif[]) => {
        this.Notif = missedNotifs;
      });
    this.offNotifSub.unsubscribe();
    location.reload();
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
  // Forward
  onClickFeed(): any {
    const count = 1;
    this.countVisibility += count;
    const counting = 6;
    this.recomCounter += counting;
    console.log('hey back', this.recomCounter);
    console.log('howdy', this.countVisibility);
    this.showCaseService.getShowCasePersonal(this.userId, this.recomCounter);
    this.postsSub = this.showCaseService
      .getshowCaseUpdateListener()
      .subscribe((showcases: ShowCase[]) => {
        this.showCases = showcases;
        this.isLoading = false;
      });
    this.postsSub.unsubscribe();
  }
  // Back
  onClickFeedBack(): any {
    const count = 1;
    this.countVisibility -= count;
    const counting = 6;
    this.recomCounter -= counting;
    console.log('hey back', this.recomCounter);
    console.log('howdy', this.countVisibility);
    this.showCaseService.getShowCasePersonal(this.userId, this.recomCounter);
    this.postsSub = this.showCaseService
      .getshowCaseUpdateListener()
      .subscribe((showcases: ShowCase[]) => {
        this.showCases = showcases;
        this.isLoading = false;
      });
    this.postsSub.unsubscribe();
  }
  // Where the post was posted
  navigateToMainPage(value: string): void {
    this.router.navigate(['/main/:'], { queryParams: { category: value } });
    console.log('hey chaz mataz', value);
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
  isLoading = true;
  id: string;
  userId: string;
  blockList: boolean;
  authenticatedToView = true;
  FOLLOWingYo: string;

  recomCounter = 0;
  countVisibility = 0;
  private subscriptionDude: Subscription;
  private blockedsubscriptionDude: Subscription;

  user: string;
  following: Follow[] = [];

  private showCases: ShowCase[] = [];
  private infosSubShowCase: Subscription;

  posts: Post[] = [];
  private postsSub: Subscription;
  private postsSub2: Subscription;
  private followSubsBtn: Subscription;
  private followSubsBlocked: Subscription;
  private sub: Subscription;
  private sub2: Subscription;
  info: AuthDataInfo = {};
  infoCoursesC: AuthDataInfoCoursesC = {};
  infoCoursesP: AuthDataInfoCoursesP = {};
  private infosSub: Subscription;
  private infosSubC: Subscription;
  private infosSubP: Subscription;
  // img popup
  img = document.getElementById('myImg');
  modalImg = document.getElementById('img01');
  captionText = document.getElementById('caption');
  // Get the <span> element that closes the modal
  span = document.getElementsByClassName('close')[0];

  constructor(
    public postService: PostService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private showCaseService: ShowCaseService,
    private followService: FollowService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): any {
    this.subscriptionDude = this.route.queryParams.subscribe((params) => {
      this.user = params.id;
    });
    console.log('call me when u land', this.user);
    this.id = this.user;
    this.userId = this.authService.getUserId();
    // check if skalars viewing has been blocked
    this.authService.checkBlocked(this.userId, this.id);
    this.blockedsubscriptionDude = this.authService
      .getBlocked()
      .subscribe((BLOCKED: string) => {
        console.log('is this skalar blocked?', BLOCKED);
        if (BLOCKED === 'redirect') {
          this.router.navigate(['/search']),
            this.snackBar.open('That is not a valid account!', '🚫', {
              duration: 3000,
            });
        } else {
          if (BLOCKED === 'true') {
            this.router.navigate(['/search']),
              this.snackBar.open('This Skalar has blocked you', '🚫', {
                duration: 3000,
              });
          } else {
            // on blocked list?
            this.followService.getBlockedListOne(this.id, this.userId);
            this.followSubsBlocked = this.followService
              .getblockListOneListener()
              .subscribe((booleanYo: boolean) => {
                if (booleanYo) {
                  this.blockList = true;
                } else {
                  this.blockList = false;
                }
              });
            // Infos
            this.authService.getOtherInfo(this.id);
            this.infosSub = this.authService
              .getInfoUpdateListenerOther()
              .subscribe((infos: any) => {
                this.info = infos;
                console.log('private account?', this.info.publicAccount);
                if (this.info.publicAccount == false) {
                  // If following
                  this.followService.getFollowingNotification(
                    this.id,
                    this.userId
                  );
                  this.followSubsBtn = this.followService
                    .getInfoFollowingBtnUpdateListener()
                    .subscribe((following: string) => {
                      console.log('top off box search', following);
                      this.FOLLOWingYo = following;
                      console.log('following box search', this.FOLLOWingYo);
                      if (this.FOLLOWingYo == 'true2') {
                        this.authenticatedToView = false;
                      }
                      if (this.FOLLOWingYo == 'noMatch') {
                        this.authenticatedToView = false;
                      }
                    });
                } else {
                  this.followSubsBtn = this.followService
                    .getInfoFollowingBtnUpdateListener()
                    .subscribe((following: string) => {
                      console.log('top off box search', following);
                      this.FOLLOWingYo = following;
                    });
                }
              });
            if (this.authenticatedToView !== false) {
              this.showCaseService.getShowCase(this.id, 0);
              this.infosSubShowCase = this.showCaseService
                .getshowCaseUpdateListener()
                .subscribe((showcases: ShowCase[]) => {
                  this.showCases = showcases;
                  console.log('showcases yo 777', this.showCases);
                  this.isLoading = false;
                });

              // courses completed
              this.authService.getInfoProfileCoursesC(this.userId);
              this.infosSubC = this.authService
                .getInfoUpdateListenerCoursesC()
                .subscribe((infosC: any) => {
                  this.infoCoursesC = infosC;
                  console.log('boobs C');
                  this.isLoading = false;
                });
              // courses pursuing
              this.authService.getInfoProfileCoursesP(this.userId);
              this.infosSubP = this.authService
                .getInfoUpdateListenerCoursesP()
                .subscribe((infosP: any) => {
                  this.infoCoursesP = infosP;
                  console.log('boobs p', this.infoCoursesP);
                  this.isLoading = false;
                  // do this for them all!
                });
            }
            // Following
            // this.followService.getMessageNotificationOther(id);
            // this.followSubs = this.followService
            //   .getInfoUpdateListener()
            //   .subscribe((follow: Follow[]) => {
            //     this.follow = follow;
            //   });
            // Followers
            // this.followService.getMessageNotificationFollowedOther(id);
            // this.followersSub = this.followService
            //   .getInfoFollowUpdateListener()
            //   .subscribe((followers: Follow[]) => {
            //     this.followers = followers;
            //     // this one
            //     console.log('lucky lucky you 7', this.followers);
            //   });
          }
        }
      });
  }

  ngOnDestroy(): any {
    this.subscriptionDude.unsubscribe();
    this.blockedsubscriptionDude.unsubscribe();
    // this.followersSub.unsubscribe();
    this.infosSub.unsubscribe();
    if (this.authenticatedToView !== false) {
      this.infosSubShowCase.unsubscribe();
      this.infosSubC.unsubscribe();
      this.infosSubP.unsubscribe();
    }
    this.followSubsBtn.unsubscribe();
    this.followSubsBlocked.unsubscribe();
    console.log('u have been de stroyed');
  }

  // Where the post was posted
  navigateToMainPage(value: string): void {
    this.router.navigate(['/main/:'], { queryParams: { category: value } });
    console.log('hey chaz mataz', value);
  }
  // ngOnDestroy(): any {
  //   this.infosSubShowCase.unsubscribe();
  //   this.followSub.unsubscribe();
  //   this.infosSub.unsubscribe();
  //   this.followersSub.unsubscribe();
  // }

  blockSkalar(userName: string): void {
    console.log('greatful', userName);
    this.followService.blockSkalar(userName, this.userId);
    this.blockList = true;
  }
  unblockSkalar(userName: string): void {
    console.log('greatful', userName);
    this.followService.unblockSkalar(userName, this.userId);
    this.blockList = false;
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
    this.FOLLOWingYo = 'true';

    const FollowingId = this.id;
    this.followService.postInfoFollow(this.userId, username, FollowingId);
    this.followService.postInfoFollowHistory(this.userId, username);
  }
  onUnfololow(userName: string): any {
    this.FOLLOWingYo = 'false';
    this.followService.deleteFollowUserPg(userName, this.userId);
    console.log('chaz whats up homie gg', userName);
  }
  skalarMsg(username: string): void {
    console.log('username', username);
    this.router.navigate(['/messages/:'], {
      queryParams: { username },
    });
  }
  // Forward
  onClickFeed(): any {
    const count = 1;
    this.countVisibility += count;
    const counting = 6;
    this.recomCounter += counting;
    console.log('hey back', this.recomCounter);
    console.log('howdy', this.countVisibility);
    this.sub = this.route.queryParams.subscribe((params) => {
      this.user = params.id;
      const id = this.user;
      this.showCaseService.getShowCase(id, this.recomCounter);
      this.postsSub = this.showCaseService
        .getshowCaseUpdateListener()
        .subscribe((showcases: ShowCase[]) => {
          this.showCases = showcases;
          this.isLoading = false;
          this.postsSub.unsubscribe();
          console.log('posts personal back', this.posts);
        });
      this.sub.unsubscribe();
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
    this.sub2 = this.route.queryParams.subscribe((params) => {
      this.user = params.id;
      const id = this.user;
      this.showCaseService.getShowCase(id, this.recomCounter);
      this.postsSub2 = this.showCaseService
        .getshowCaseUpdateListener()
        .subscribe((showcases: ShowCase[]) => {
          this.showCases = showcases;
          this.isLoading = false;
          this.postsSub2.unsubscribe();
          console.log('posts personal back', this.posts);
        });
      this.sub2.unsubscribe();
    });
  }
}

@Component({
  selector: 'app-bio',
  templateUrl: './bio.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class BioComponent implements OnInit, OnDestroy {
  userId: string;
  infos: AuthDataInfo[] = [];
  private infoSub: Subscription;
  constructor(private authService: AuthService) {}

  ngOnInit(): any {
    // Verfiy
    this.userId = this.authService.getUserId();
    // Info
    this.authService.getInfo(this.userId, 0);
    this.infoSub = this.authService
      .getInfoUpdateListener()
      .subscribe((infos: AuthDataInfo[]) => {
        this.infos = infos;
      });
  }
  ngOnDestroy(): any {
    this.infoSub.unsubscribe();
  }
}

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
  isLoading = false;
  follow: Follow[] = [];
  private followSub: Subscription;

  followers: Follow[] = [];
  private followersSub: Subscription;

  userId: string;
  userIsAuthenticated = false;
  // private authStatusSubs: Subscription;
  private authListenerSubs: Subscription;

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
    private bottomSheet: MatBottomSheet,
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

  onBio(): void {
    this.dialog.open(BioComponent);
  }

  followClicked(): void {
    this.following = !this.following;
  }
  ngOnInit(): any {
    this.isLoading = true;
    // Info
    this.userId = this.authService.getUserId();
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
  navigateToEditProfile(): any {
    this.router.navigate(['/edit-profile/:'], {
      queryParams: { userId: this.userId },
    });
  }
  onDelete(postId: string): any {
    this.showCaseService.deleteShowCase(postId);
    console.log('chaz whats up homie g', postId);
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

  showFiller = false;
  // TODO: initial following value would need to be loaded from database - for now, always start with false
  Following: boolean;

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
        });
      // Followers
      this.followService.getMessageNotificationFollowedOther(id);
      this.followersSub = this.followService
        .getInfoFollowUpdateListener()
        .subscribe((followers: Follow[]) => {
          this.followers = followers;
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
  // Bio
  onBio(): void {
    this.dialog.open(BioComponent);
  }
  followClicked(username: string): any {
    this.Following = true;
    this.followService.postInfoFollow(this.userId, username);
  }
  onUnfololow(followId: string): any {
    this.Following = false;
    this.followService.deleteFollowers(followId);
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

        console.log('infos', this.infos);
      });
  }
}

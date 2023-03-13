import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { FollowService } from '../services/follow.service';
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

@Component({
  selector: 'app-friends-activity',
  templateUrl: './friends-activity.component.html',
  styleUrls: ['./friends-activity.component.scss'],
})
export class FriendsActivityComponent implements OnInit, OnDestroy {
  userId: string;
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;
  follow: Follow[] = [];
  followers: Follow[] = [];
  mutual: Follow[] = [];
  private mutualSub: Subscription;
  UserNames: string;
  mutuals: Follow[] = [];
  private mutualsSub: Subscription;
  private followSub: Subscription;
  private followSubFollowers: Subscription;

  // infos: AuthDataInfo[] = [];
  // private infosSub: Subscription;

  // Needs an observabel to adapt to changes.
  // Since this search is just filtering
  // filters members, not entirely neeeded...
  search: FormControl = new FormControl('');

  constructor(
    private authService: AuthService,
    private followService: FollowService
  ) {
    this.followService.getsetUserNameUpdateListener().subscribe((username) => {
      console.log('username yip', username);
      this.UserNames = username;
    });
  }

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    // this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated: boolean) => {
        console.log('authed hmm?', isAuthenticated);
        this.userIsAuthenticated = isAuthenticated;
        // Can add *ngIf="userIsAuthenticated" to hide items
      });

    this.followService.getMessageNotification(this.userId);
    this.followSub = this.followService
      .getInfoFollowingUpdateListener()
      .subscribe((follow: Follow[]) => {
        this.follow = follow;
      });
    // following info
    this.followService.getMessageNotificationFollowed(this.userId);
    this.followSubFollowers = this.followService
      .getInfoFollowUpdateListener()
      .subscribe((followers: Follow[]) => {
        this.followers = followers;
      });
    // mutual info following
    this.mutualSub = this.followService
      .getInfoMutualUpdateListener()
      .subscribe((mutual: Follow[]) => {
        this.mutual = mutual;
      });
    // mutual info followers
    this.mutualsSub = this.followService
      .getInfoMutualsUpdateListener()
      .subscribe((mutuals: Follow[]) => {
        this.mutuals = mutuals;
      });
  }
  ngOnDestroy(): any {
    this.authListenerSubs.unsubscribe();
    console.log('1');
    this.mutualsSub.unsubscribe();
    console.log('2');
    this.mutualSub.unsubscribe();
    console.log('3');
    this.followSubFollowers.unsubscribe();
    console.log('4');
    this.followSub.unsubscribe();
    console.log('5');
  }
}

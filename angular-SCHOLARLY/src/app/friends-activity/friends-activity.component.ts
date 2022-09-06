import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { StoreService, Profile } from '../services/store.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AuthDataInfo } from '../signup/auth-data.model';
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
export class FriendsActivityComponent implements OnInit {
  userId: string;
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;
  follow: Follow[] = [];
  followers: Follow[] = [];
  mutual: Follow[] = [];
  private mutualSub: Subscription;

  mutuals: Follow[] = [];
  private mutualsSub: Subscription;
  private followSub: Subscription;
  private followSubFollowers: Subscription;

  // infos: AuthDataInfo[] = [];
  // private infosSub: Subscription;

  // Friend requests from the card...
  accept: FormControl = new FormControl('');
  decline: FormControl = new FormControl('');

  // Needs an observabel to adapt to changes.
  // Since this search is just filtering
  // filters members, not entirely neeeded...
  search: FormControl = new FormControl('');

  constructor(
    public storeService: StoreService,
    private authService: AuthService,
    private followService: FollowService
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
        // Can add *ngIf="userIsAuthenticated" to hide items
      });

    this.followService.getMessageNotification(this.userId);
    this.followSub = this.followService
      .getInfoUpdateListener()
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
}

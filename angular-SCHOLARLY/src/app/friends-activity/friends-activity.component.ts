import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { StoreService, Profile } from '../services/store.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AuthDataInfo } from '../signup/auth-data.model';
import { FollowService } from '../services/follow.service';
export interface Follow {
  Follower: string;
  Following: string;
  name: string;
  username: string;
  ProfilePicPath: string;
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
  private followSub: Subscription;

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
  }
}

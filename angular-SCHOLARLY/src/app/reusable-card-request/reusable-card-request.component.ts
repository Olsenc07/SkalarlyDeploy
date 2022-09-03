import { Component, OnInit, ViewChild } from '@angular/core';
import { StoreService, Profile } from '../services/store.service';
import { filter, map, pairwise, Subscription, throttleTime } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { FollowService } from '../services/follow.service';

import { AuthDataInfo } from '../signup/auth-data.model';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-card-request',
  templateUrl: './reusable-card-request.component.html',
  styleUrls: ['./reusable-card-request.component.scss'],
})
export class ReusableCardRequestComponent implements OnInit {
  userId: string;
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;

  infos: string[] = [];
  private infosSub: Subscription;

  isLoading = false;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.authService.getInfo();
    this.infosSub = this.authService
      .getInfoUpdateListener()
      .subscribe((infos: string[]) => {
        this.infos = infos;
        this.isLoading = false;
      });
    this.userId = this.authService.getUserId();
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
      });
  }
}

@Component({
  selector: 'app-card-recommendation',
  templateUrl: './reusable-card-recommendation.component.html',
  styleUrls: ['./reusable-card-request.component.scss'],
})
export class ReusableCardRecommendationComponent implements OnInit {
  userId: string;
  isLoading = false;

  userIsAuthenticated = false;
  private authListenerSubs: Subscription;

  infos: string[] = [];
  // Trying to randomze the array for reco
  // infos_: number;
  // shuffle(infos: any): any {
  //   this.infos_ = Math.floor(Math.random() * infos.length);
  //   this.infos = infos[this.infos_];
  //   console.log('random', this.infos);
  // }
  // Creates a randoma array
  private infosSub: Subscription;

  // onOtherUser(info): any{
  // // this.authService.getOtherInfo();
  // this.authService.getOtherInfo(info);
  // }

  constructor(
    public storeService: StoreService,
    private authService: AuthService,
    private followService: FollowService,
    private router: Router
  ) {}

  ngOnInit(): any {
    this.isLoading = true;
    this.authService.getInfo();
    this.infosSub = this.authService
      .getInfoUpdateListener()
      .subscribe((infos: string[]) => {
        this.infos = infos;
        // this.infos = this.shuffle(infos);
        this.isLoading = false;
      });
    this.userId = this.authService.getUserId();
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
        // Can add *ngIf="userIsAuthenticated" to hide items
      });
  }

  navigateToPage(infoUser: string): any {
    // const ID = (document.getElementById('userName') as HTMLInputElement).value;
    this.router.navigate(['/skalars/:'], { queryParams: { id: infoUser } });
  }
  followClicked(username: string): any {
    console.log('follow username', this.userId);
    this.followService.postInfoFollow(this.userId, username);
  }
}

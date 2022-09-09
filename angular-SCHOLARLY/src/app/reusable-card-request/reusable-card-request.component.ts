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
  recomCounter = 0;

  infos: string[] = [];
  private infosSub: Subscription;

  isLoading = false;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.authService.getInfo(this.recomCounter);
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
  recomCounter = 0;
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
    this.authService.getInfo(this.recomCounter);
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
  onScrollRecom(): any {
    const scrollTop = document.getElementById('bigScroll').scrollTop;

    const clientHeight = document.getElementById('infoRecomend').clientHeight;

    console.log('Hey dog', scrollTop);

    console.log('Hey dog3', clientHeight);

    console.log('Hey dawgy', scrollTop - clientHeight);

    if (scrollTop < 102 && scrollTop > 100 && scrollTop != 0) {
      console.log('yng gravy');
      const counting = 6;
      this.recomCounter += counting;
      console.log(this.recomCounter);

      this.authService.getInfo(this.recomCounter);
      this.authService.getInfoUpdateListener().subscribe((infos: string[]) => {
        console.log('perfect', infos);
        console.log('original', this.infos);

        this.infos = infos.concat(this.infos);
        // this.infos = this.shuffle(infos);
        this.isLoading = false;
      });
    }
  }
  // message user
  skalarMsg(username: string): void {
    console.log('username', username);
    this.router.navigate(['/messages/:'], {
      queryParams: { username },
    });
  }
  // go to profile
  navigateToPage(infoUser: string): any {
    // const ID = (document.getElementById('userName') as HTMLInputElement).value;
    this.router.navigate(['/skalars/:'], { queryParams: { id: infoUser } });
  }
  followClicked(username: string): any {
    console.log('follow username', this.userId);
    this.followService.postInfoFollow(this.userId, username);
  }
}

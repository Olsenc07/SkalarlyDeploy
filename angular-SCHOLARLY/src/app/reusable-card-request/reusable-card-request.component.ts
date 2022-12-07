import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { FollowService } from '../services/follow.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

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

  ngOnInit(): void {
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
  countVisibility = 0;
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
    private authService: AuthService,
    private followService: FollowService,
    private router: Router
  ) {}

  ngOnInit(): any {
    this.isLoading = true;
    this.authService.getInfo(0);
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
  // Forward
  onClickRecom(): any {
    const count = 1;
    this.countVisibility += count;
    const counting = 6;
    this.recomCounter += counting;
    console.log('hey', this.recomCounter);
    console.log('howdy', this.countVisibility);
    const NextBtn = document.getElementById('bigScroll');
    NextBtn.scrollIntoView();
    this.authService.getInfo(this.recomCounter);
    this.authService.getInfoUpdateListener().subscribe((infos: string[]) => {
      this.infos = infos;
      // this.infos = this.shuffle(infos);
      this.isLoading = false;
    });
  }
  // Back
  onClickRecomBack(): any {
    const count = 1;
    this.countVisibility -= count;
    const counting = 6;
    this.recomCounter -= counting;
    console.log('hey back', this.recomCounter);
    console.log('howdy', this.countVisibility);

    this.authService.getInfo(this.recomCounter);
    this.authService.getInfoUpdateListener().subscribe((infos: string[]) => {
      this.infos = infos;
      // this.infos = this.shuffle(infos);
      this.isLoading = false;
    });
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
  // followClicked(username: string): any {
  //   console.log('follow username', this.userId);
  //   this.followService.postInfoFollow(this.userId, username);
  // }
}

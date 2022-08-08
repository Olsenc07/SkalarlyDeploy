import { Component, OnInit } from '@angular/core';
import { StoreService, Profile } from '../services/store.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AuthDataInfo } from '../signup/auth-data.model';
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
  private infosSub: Subscription;

  // number of comments that load
  sum = 2;
  direction = '';
  // onOtherUser(info): any{
  // // this.authService.getOtherInfo();
  // this.authService.getOtherInfo(info);
  // }

  constructor(
    public storeService: StoreService,
    private authService: AuthService,
    private router: Router
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
        // Can add *ngIf="userIsAuthenticated" to hide items
      });
  }
  // Loading in comments
  onScrollDown(ev: any): any {
    console.log('scrolled down!!', ev);

    this.sum += 5;
    this.appendItems();

    this.direction = 'scroll down';
  }

  onScrollUp(ev: any): any {
    console.log('scrolled up!', ev);
    this.sum += 5;
    this.prependItems();

    this.direction = 'scroll up';
  }
  appendItems(): any {
    this.addItems('push');
  }
  prependItems(): any {
    this.addItems('unshift');
  }
  addItems(Method: string): any {
    for (let i = 0; i < this.sum; ++i) {
      if (Method === 'push') {
        this.infos.push([i].join(''));
      } else if (Method === 'unshift') {
        this.infos.unshift([i].join(''));
      }
    }
  }
  navigateToPage(infoUser: string): any {
    // const ID = (document.getElementById('userName') as HTMLInputElement).value;
    this.router.navigate(['/skalars/:'], { queryParams: { id: infoUser } });
  }
}

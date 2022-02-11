import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { StoreService, Profile } from '../services/store.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AuthDataInfo } from '../signup/auth-data.model';


@Component({
  selector: 'app-friends-activity',
  templateUrl: './friends-activity.component.html',
  styleUrls: ['./friends-activity.component.scss']
})
export class FriendsActivityComponent implements OnInit {
    userId: string;
    userIsAuthenticated = false;
    private authListenerSubs: Subscription;

    infos: AuthDataInfo[] = [];
    private infosSub: Subscription;

    mutuals = [
    ];
  // Friend requests from the card...
  accept: FormControl = new FormControl('');
  deline: FormControl = new FormControl('');

  // Needs an observabel to adapt to changes.
  // Since this search is just filtering
  // filters members, not entirely neeeded...
  search: FormControl = new FormControl('');

  constructor(public storeService: StoreService, private authService: AuthService) { }

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
        .getAuthStatusListener()
        .subscribe(isAuthenticated => {
          this.userIsAuthenticated = isAuthenticated;
          this.userId = this.authService.getUserId();
          // Can add *ngIf="userIsAuthenticated" to hide items
        });

         //    Info
    this.authService.getInfo();
    this.infosSub = this.authService.getInfoUpdateListener()
     .subscribe((infos: AuthDataInfo[]) => {
     this.infos = infos;
   });

  }

}

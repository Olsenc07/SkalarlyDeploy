import { Component, OnInit } from '@angular/core';
import { StoreService, Profile } from '../services/store.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AuthDataInfo } from '../signup/auth-data.model';



@Component({
    selector: 'app-card-user',
    templateUrl: './reusable-card-user.component.html',
    styleUrls: ['./reusable-card-user.component.scss'],
})
export class ReusableCardUserComponent implements OnInit {
    userId: string;
    userIsAuthenticated = false;
    private authListenerSubs: Subscription;

    isLoading = false;


    infos: AuthDataInfo[] = [];
    private infosSub: Subscription;

    constructor(private authService: AuthService) { }

    ngOnInit() {
        this.isLoading = true;
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
    this.isLoading = false;
  });
    }



}


@Component({
    selector: 'app-card-message',
    templateUrl: './reusable-card-message.component.html',
    styleUrls: ['./reusable-card-user.component.scss'],
})
export class ReusableCardMessageComponent implements OnInit {
    userId: string;
    userIsAuthenticated = false;
    private authListenerSubs: Subscription;
 
    isLoading = false;

    infos: AuthDataInfo[] = [];
    private infosSub: Subscription;

    constructor( private authService: AuthService) { }

    ngOnInit() {
        this.isLoading = true;
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
    this.isLoading = false;
  });
    }
}


@Component({
    selector: 'app-card-mutual',
    templateUrl: './reusable-card-mutual.component.html',
    styleUrls: ['./reusable-card-user.component.scss'],
})
export class ReusableCardMutualComponent implements OnInit{
    userId: string;
    userIsAuthenticated = false;
    private authListenerSubs: Subscription;

    isLoading = false;

    infos: AuthDataInfo[] = [];
    private infosSub: Subscription;

    constructor( private authService: AuthService) { }

    ngOnInit() {
        this.isLoading = true;
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
    this.isLoading = false;
  });
    }
}

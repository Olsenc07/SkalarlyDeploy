import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  MatBottomSheet,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Post, PostService } from '../services/post.service';
import { ShowCase } from '../services/showCase.service';
import { StoreService, Profile } from '../services/store.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ShowCaseService } from '../services/showCase.service';
import { AuthDataInfo } from '../signup/auth-data.model';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

/** @title Sidenav open & close behavior */
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  isLoading = false;

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
  profile = StoreService.profile$$;
  Id = StoreService.userId$$;

  ids = StoreService.ids;

  // Course codes
  // Com_ = StoreService.CodeCompleted.length;
  // Com = StoreService.CodeCompleted
  Pur_ = StoreService.Pur.length;
  Pur = StoreService.Pur;

  // Activity
  groups = StoreService.Groups;

  // Posts
  // posts = StoreService.Posts;

  // show cases, doesnt work when connected to service
  // showCases = StoreService.ShowCases;

  showFiller = false;
  // TODO: initial following value would need to be loaded from database - for now, always start with false
  following = false;

  constructor(
    private bottomSheet: MatBottomSheet,
    public postService: PostService,
    private authService: AuthService,
    private showCaseService: ShowCaseService
  ) {
    // profile$$.profile$$.subscribe((profile) => {
    //   // this.profile$$ = profile;
    //   // return name;
    // })
  }

  openBottomSheet(): void {
    this.bottomSheet.open(BottomSheetComponent);
  }

  followClicked(): void {
    this.following = !this.following;
  }
  ngOnInit(): any {
    this.isLoading = true;
    // Info
    this.authService.getInfo();
    this.infosSub = this.authService
      .getInfoUpdateListener()
      .subscribe((infos: AuthDataInfo[]) => {
        this.infos = infos;
        this.isLoading = false;
        console.log('infos', this.infos);
      });
    // Posts
    this.postService.getPosts();
    this.postsSub = this.postService
      .getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
        this.isLoading = false;
      });
    // Validation
    this.userId = this.authService.getUserId();
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
        // Can add *ngIf="userIsAuthenticated" to hide items
      });
    // showCases
    this.showCaseService.getShowCase();
    this.infosSubShowCase = this.showCaseService
      .getshowCaseUpdateListener()
      .subscribe((infos: ShowCase[]) => {
        this.showCases = infos;
        this.isLoading = false;
        console.log('infos', this.infos);
      });
    // this.Com = this.Com.map(code => code.toUpperCase()).sort();
    // this.Pur = this.Pur.map((code) => code.toUpperCase()).sort();

    // this.showCases = this.showCases.toString();
    // return this.Pur;
  }

  // this.Com

  ngOnDestroy(): any {
    this.postsSub.unsubscribe();
    this.authListenerSubs.unsubscribe();
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
    private route: ActivatedRoute
  ) {}
  isLoading = false;
  user: string;

  userId: string;
  userIsAuthenticated = false;

  private authListenerSubs: Subscription;

  posts: Post[] = [];
  private postsSub: Subscription;

  infos: AuthDataInfo[] = [];
  private infosSub: Subscription;

  Pur_ = StoreService.Pur.length;
  Pur = StoreService.Pur;
  groups = StoreService.Groups;

  showFiller = false;
  // TODO: initial following value would need to be loaded from database - for now, always start with false
  following = false;

  ngOnInit(): any {
    this.isLoading = true;
    this.route.queryParams.subscribe((params) => {
      this.user = params.id;
      const id = this.user;
      console.log(this.user, 'bunny');
      console.log(id, 'rabbit');

      this.authService.getOtherInfo(id);
      this.infosSub = this.authService
        .getInfoUpdateListener()
        .subscribe((infos: AuthDataInfo[]) => {
          this.infos = infos;
        });
    });
    // Posts
    this.postService.getPosts();
    this.postsSub = this.postService
      .getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
        this.isLoading = false;
      });
    // this.userId = this.authService.getUserId();
    // this.userIsAuthenticated = this.authService.getIsAuth();
    // this.authListenerSubs = this.authService
    // .getAuthStatusListener()
    // .subscribe(isAuthenticated => {
    //   this.userIsAuthenticated = isAuthenticated;
    //   this.userId = this.authService.getUserId();
    // fetch(`/user/${this.userId}`);
    // console.log(this.userId);

    // Can add *ngIf="userIsAuthenticated" to hide items
    // });
    // this.Com = this.Com.map(code => code.toUpperCase()).sort();
    // this.Pur = this.Pur.map((code) => code.toUpperCase()).sort();
    // this.showCases = this.showCases.toString();
    // return this.Pur;
  }

  ngOnDestroy(): any {
    this.postsSub.unsubscribe();
    // this.authListenerSubs.unsubscribe();
  }
}

@Component({
  selector: 'app-profile',
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.scss'],
})
export class BottomSheetComponent {
  constructor(
    private bottomSheetRef: MatBottomSheetRef<BottomSheetComponent>
  ) {}

  openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }
}

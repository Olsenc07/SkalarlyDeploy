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
export class ProfileComponent implements OnInit {
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
    this.showCaseService.getShowCasePersonal(this.userId);
    this.postsSub = this.showCaseService
      .getshowCaseUpdateListener()
      .subscribe((showcases: ShowCase[]) => {
        this.showCases = showcases;
      });
  }

  // this.Com

  // ngOnDestroy(): any {
  //   this.postsSub.unsubscribe();
  //   this.authListenerSubs.unsubscribe();
  // }
}

/** @title Sidenav open & close behavior */
@Component({
  selector: 'app-userprofile',
  templateUrl: './userProfile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  constructor(
    private bottomSheet: MatBottomSheet,
    public postService: PostService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private showCaseService: ShowCaseService
  ) {}
  isLoading = false;
  user: string;

  private showCases: ShowCase[] = [];
  private infosSubShowCase: Subscription;
  // userId: string;
  // userIsAuthenticated = false;

  // private authListenerSubs: Subscription;

  posts: Post[] = [];
  private postsSub: Subscription;

  infos: AuthDataInfo[] = [];
  private infosSub: Subscription;

  showFiller = false;
  // TODO: initial following value would need to be loaded from database - for now, always start with false
  following = false;

  ngOnInit(): any {
    this.isLoading = true;
    this.route.queryParams.subscribe((params) => {
      this.user = params.id;
      const id = this.user;
      // Infos
      this.authService.getOtherInfo(id);
      this.infosSub = this.authService
        .getInfoUpdateListener()
        .subscribe((infos: AuthDataInfo[]) => {
          this.infos = infos;
        });
      this.showCaseService.getShowCase(id);
      this.infosSubShowCase = this.showCaseService
        .getshowCaseUpdateListener()
        .subscribe((infos: ShowCase[]) => {
          this.showCases = infos;
          this.isLoading = false;
        });
    });
  }

  skalarMsg(username: string) {
    console.log('username', username);
    this.router.navigate(['/messages/:'], {
      queryParams: { username: username },
    });
  }

  // ngOnDestroy(): any {
  //   this.postsSub.unsubscribe();
  //   // this.authListenerSubs.unsubscribe();
  // }
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

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
  storeProfiles: Profile[] = [];
  profiles: Profile[] = [];
  private profilesSub: Subscription;


    userId: string;
    userIsAuthenticated = false;
    private authListenerSubs: Subscription;

    infos: AuthDataInfo[] = [];
    private infosSub: Subscription;


  
  feeds = [{
    "profilePic": "", "userName": "",
    "Major": "", "Minor": "", "Sport": "", "Club": ""
  },


  ];

  mutuals = [

  ];

  following = [{
    "profilePic": "", "userName": "",
    "Major": "", "Minor": "", "Sport": "", "Club": ""
  },


  ];
  followers = [{
    "profilePic": "", "userName": "",
    "Major": "", "Minor": "", "Sport": "", "Club": ""
  },
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

    this.storeService.getProfiles();
    this.profilesSub = this.storeService.getProfileUpdateListener()
         .subscribe((profiles: Profile[]) => {
             this.profiles = profiles;
         });
  }

}

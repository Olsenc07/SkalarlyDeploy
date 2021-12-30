import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { StoreService, Profile } from '../services/store.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-friends-activity',
  templateUrl: './friends-activity.component.html',
  styleUrls: ['./friends-activity.component.scss']
})
export class FriendsActivityComponent implements OnInit {
  storeProfiles: Profile[] = [];
  profiles: Profile[] = [];
  private profilesSub: Subscription;



  
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

  constructor(public storeService: StoreService,) { }

  ngOnInit(): void {
    this.storeService.getProfiles();
    this.profilesSub = this.storeService.getProfileUpdateListener()
         .subscribe((profiles: Profile[]) => {
             this.profiles = profiles;
         });
  }

}

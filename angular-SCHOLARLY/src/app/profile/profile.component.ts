import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { StoreService } from '../services/store.service';
import { FollowingService } from '../services/following.service';
import { FollowerService } from '../services/followers.service';




@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
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
  posts = StoreService.Posts;

  // show cases, doesnt work when connected to service
  // showCases = StoreService.ShowCases;



  // Friends
  followers = FollowerService.Follower.length;
  follow = FollowingService.Following.length;



  showFiller = false;
  // TODO: initial following value would need to be loaded from database - for now, always start with false
  following = false;

  // Tempt hard code before data base
  showCases = ['../../assets/Pics/IMG-8413.PNG', '../../assets/Pics/IMG-8619.PNG',
    '../../assets/Pics/WhiteSquareInAppLogo.jpg', '../../assets/Pics/IMG-8413.PNG', '../../assets/Pics/IMG-8619.PNG',
    '../../assets/Pics/ProperInAppLogo.jpeg ', '../../assets/Pics/IMG-8413.PNG'
  ];

  constructor(private bottomSheet: MatBottomSheet) {
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
    // this.Com = this.Com.map(code => code.toUpperCase()).sort();


    this.Pur = this.Pur.map(code => code.toUpperCase()).sort();

    // this.showCases = this.showCases.toString();
    return this.Pur
    // this.Com

  }

}
@Component({
  selector: 'app-profile',
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.scss'],
})
export class BottomSheetComponent {
  constructor(private bottomSheetRef: MatBottomSheetRef<BottomSheetComponent>) { }

  openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }
}


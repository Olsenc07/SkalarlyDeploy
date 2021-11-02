import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'app-friends-activity',
  templateUrl: './friends-activity.component.html',
  styleUrls: ['./friends-activity.component.scss']
})
export class FriendsActivityComponent implements OnInit {
  requests = [''];
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

  constructor() { }

  ngOnInit(): void {
    // Creads appropriate number of cards to be displayed on
    // Their appropraite area.. mutual, following.. esc

    // this.feeds = StoreService.profile$$....
  }

}

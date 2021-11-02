import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-group-chats',
  templateUrl: './group-chats.component.html',
  styleUrls: ['./group-chats.component.scss']
})
export class GroupChatsComponent implements OnInit {
  faCoffee = faCoffee;
  MatBadgeModule;
  post = PostService.post$$;

  message: FormControl = new FormControl('');
  fileUpload: FormControl = new FormControl('');
  photoUpload: FormControl = new FormControl('');

  messageForm = new FormGroup({
  message: this.message
});
  

  // Filled by members that join the group
  members = ['']

  // filters members, not entirely neeeded...
  search: FormControl = new FormControl('');


  

   // Sends message
   sendMsg(){};

  constructor(private _bottomSheet: MatBottomSheet) { }

  uploadFile(): any {
    document.getElementById('fileInput').click();
  };
  uploadPic(): any {
    document.getElementById('picInput').click();
  };

  ngOnInit(): void {
  }



}

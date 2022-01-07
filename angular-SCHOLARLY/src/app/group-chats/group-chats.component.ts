import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Post, PostService } from '../services/post.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-group-chats',
  templateUrl: './group-chats.component.html',
  styleUrls: ['./group-chats.component.scss']
})
export class GroupChatsComponent implements OnInit {
  storedPosts: Post[] = [];
  posts: Post[] = [];
  private postsSub: Subscription;

  faCoffee = faCoffee;
  MatBadgeModule;
  // post = PostService.post$$;

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
   sendMsg(){}

  constructor(private _bottomSheet: MatBottomSheet,
              public postService: PostService) { }

  uploadFile(): any {
    document.getElementById('fileInput').click();
  };
  uploadPic(): any {
    document.getElementById('picInput').click();
  };

  ngOnInit(): void {
    this.postService.getPosts();
    this.postsSub = this.postService.getPostUpdateListener()
      .subscribe((posts: Post[]) => {
      this.posts = posts;
  });
  }


}

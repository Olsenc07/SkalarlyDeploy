import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Post, PostService } from '../services/post.service';
import { AuthService } from '../services/auth.service';
import {
  MatBottomSheet,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main-pages',
  templateUrl: './main-pages.component.html',
  styleUrls: ['./main-pages.component.scss'],
})
export class MainPagesComponent implements OnInit {
  userId: string;

  category: string;
  specific: string;
  specificOptions: string;

  isLoading = false;
  posts: Post[] = [];
  private postsSub: Subscription;

  constructor(
    private bottomSheet: MatBottomSheet,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    public postService: PostService
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.getUserId();

    this.route.queryParams.subscribe((params) => {
      console.log('params main page', params);
      this.category = params?.category;

      this.postService.getPostsMainPage(this.category, 0);
      this.postsSub = this.postService
        .getPostUpdateListener()
        .subscribe((posts: Post[]) => {
          this.posts = posts;
          this.isLoading = false;
        });
    });
  }
  // To post page with users id
  navigateToPost(): any {
    // const ID = (document.getElementById('userName') as HTMLInputElement).value;
    this.router.navigate(['/post-page/:'], {
      queryParams: { userId: this.userId },
    });
  }
  // Fills same way just for different reasons
  // Each button opens this page by there should be 4 different functions with each
  // sharin the open attendence comp, but each sends diff values/reasoning
}

@Component({
  selector: 'app-single-page',
  templateUrl: './single-page.component.html',
  styleUrls: ['./main-pages.component.scss'],
})
export class SinglePageComponent implements OnInit {
  isLoading = false;

  ngOnInit(): void {}
}

@Component({
  selector: 'app-card-single-page ',
  templateUrl: './template-single-post.component.html',
  styleUrls: ['../reusable-card/reusable-card.component.scss'],
})
export class SinglePageTemplateComponent implements OnInit {
  isLoading = false;
  posts: Post[] = [];
  postId: string;
  private postsSub: Subscription;

  constructor(private route: ActivatedRoute, public postService: PostService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      console.log('params single page', params);
      this.postId = params?.postId;

      this.postService.getPostSinglePage(this.postId);
      this.postsSub = this.postService
        .getPostUpdateListener()
        .subscribe((posts: Post[]) => {
          this.posts = posts;
          this.isLoading = false;
        });
    });
  }
}

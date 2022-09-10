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
  openAttendanceSheet(): void {
    this.bottomSheet.open(AttendanceComponent);
  }
}

@Component({
  selector: 'app-main-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss'],
})
export class AttendanceComponent {
  constructor(private bottomSheetRef: MatBottomSheetRef<AttendanceComponent>) {}

  openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }
}

@Component({
  selector: 'app-main-tagged',
  templateUrl: './tagged.component.html',
  styleUrls: ['./attendance.component.scss'],
})
export class TaggedComponent {
  constructor(private bottomSheetRef: MatBottomSheetRef<AttendanceComponent>) {}

  openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }
}

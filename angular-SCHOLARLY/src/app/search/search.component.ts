import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { SearchListService } from '../services/search.service';
import { Post, PostService } from '../services/post.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AuthDataInfo } from '../signup/auth-data.model';

interface SearchOption {
  value: string;
  name: string;
}
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  userId: string;
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;

  posts: Post[] = [];
  private postsSub: Subscription;

  post: Post;

  isLoading = false;

  postLocationMain: FormControl = new FormControl('');

  search: FormControl = new FormControl('');
  searchForm = new FormGroup({
    search: this.search,
    mainChoice: new FormControl(''),
  });

  public selectedOption: string;
  public specificOptions: string[];
  public searchOptions: SearchOption[];
  main = '';

  public opt = 0;
  displaySpecificSearch(): void {
    this.opt++;
  }

  constructor(
    public dialog: MatDialog,
    public searchListService: SearchListService,
    private router: Router,
    public route: ActivatedRoute,
    public postService: PostService,
    private authService: AuthService
  ) {}

  ngOnInit(): any {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/worker.js').then(() => {
        console.log('Service worker registered!');
      });
    }
    this.isLoading = true;
    this.searchOptions = this.searchListService.getSearchOptions();
    // posts
    this.postService.getPosts();
    this.postsSub = this.postService
      .getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
        this.isLoading = false;
      });
    // userId
    this.userId = this.authService.getUserId();
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  onSearchSelection(value: string): void {
    this.specificOptions = this.searchListService.onSearchSelection(value);
  }

  navigateToPage(value: string): void {
    this.router.navigate(['/main/:'], { queryParams: { category: value } });
    console.log(value);
  }
  // To post page with users id
  navigateToPost(): any {
    // const ID = (document.getElementById('userName') as HTMLInputElement).value;
    this.router.navigate(['/post-page/:'], {
      queryParams: { userId: this.userId },
    });
  }

  clearSearch(): void {
    this.search.setValue('');
  }
}

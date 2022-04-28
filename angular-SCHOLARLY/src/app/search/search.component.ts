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


  storedPosts: Post[] = [];
  posts: Post[] = [];
  private postsSub: Subscription;

  post: Post;

  infos: AuthDataInfo[] = [];
  private infosSub: Subscription;

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
  onPostsAdded(post): any{
    this.storedPosts.push(post);
  }

  constructor(
    public dialog: MatDialog,
    public searchListService: SearchListService,
    private router: Router,
    public route: ActivatedRoute,
    public postService: PostService,
    private authService: AuthService
  ) { }

  ngOnInit() {
        this.isLoading = true;
        this.searchOptions = this.searchListService.getSearchOptions();
        this.postService.getPosts();
        this.postsSub = this.postService.getPostUpdateListener()
      .subscribe((posts: Post[]) => {
      this.posts = posts;
      this.isLoading = false;
    });
        this.userId = this.authService.getUserId();
        this.userIsAuthenticated = this.authService.getIsAuth();
        this.authListenerSubs = this.authService
            .getAuthStatusListener()
            .subscribe(isAuthenticated => {
              this.userIsAuthenticated = isAuthenticated;
              this.userId = this.authService.getUserId();
              console.log(this.userId);
            });
                //    Info
        this.authService.getInfo();
        this.infosSub = this.authService.getInfoUpdateListener()
     .subscribe((infos: AuthDataInfo[]) => {
     this.infos = infos;
   });
  }



  onSearchSelection(value: string): void {
    this.specificOptions = this.searchListService.onSearchSelection(value);

  }


  navigateToPage(value: string): void {
    this.router.navigate(['/main'], { queryParams: { category: value } });
    console.log(value);
  }


  clearSearch(): void {
    this.search.setValue('');
  }
}

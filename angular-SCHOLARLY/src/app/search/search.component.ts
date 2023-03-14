import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchListService } from '../services/search.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { PostsService, Fav } from '../services/posts.service';

interface SearchOption {
  value: string;
  name: string;
}
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy {
  userId: string;
  FavsVisible = false;
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;
  private favsSub: Subscription;
  isLoading = false;
  mains: Fav[] = [];

  postLocationMain: FormControl = new FormControl('');

  search: FormControl = new FormControl('');
  searchForm = new FormGroup({
    search: this.search,
    mainChoice: new FormControl(''),
  });

  public selectedOption: string;
  public specificOptions: string[];
  public searchOptions: SearchOption[];

  public opt = 0;
  displaySpecificSearch(): void {
    this.opt++;
  }

  constructor(
    public dialog: MatDialog,
    public searchListService: SearchListService,
    private router: Router,
    public route: ActivatedRoute,
    private authService: AuthService,
    private postsService: PostsService
  ) {}

  ngOnInit(): any {
    this.isLoading = true;
    this.searchOptions = this.searchListService.getSearchOptions();

    // userId
    this.userId = this.authService.getUserId();
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated: boolean) => {
        this.userIsAuthenticated = isAuthenticated;
        this.isLoading = false;
      });
    this.postsService.getFavsList(this.userId);
    this.favsSub = this.postsService.getFavsListener().subscribe((favs) => {
      this.mains = favs;
    });
  }

  ngOnDestroy(): any {
    this.authListenerSubs.unsubscribe();
    this.favsSub.unsubscribe();
  }
  favsVisible(): void {
    this.FavsVisible = true;
  }
  onSearchSelection(value: string): void {
    this.specificOptions = this.searchListService.onSearchSelection(value);
    console.log('morning', this.specificOptions);
  }
  navToHashTag(HashTag: string): any {
    console.log('HashTag', HashTag);
    // Where the post was posted
    this.router.navigate(['/hashtag/:'], {
      queryParams: { hashtag: HashTag },
    });
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

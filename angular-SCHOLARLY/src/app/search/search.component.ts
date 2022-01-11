import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { SearchListService } from '../services/search.service';
import { Post, PostService } from '../services/post.service';
import { StoreService, Profile } from '../services/store.service';
import { Subscription } from 'rxjs';


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
  storedPosts: Post[] = [];
  posts: Post[] = [];
  private postsSub: Subscription;

  post: Post;

  storeProfiles: Profile[] = [];
  profiles: Profile[] = [];
  private profilesSub: Subscription;

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
    public storeService: StoreService,
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
        this.storeService.getProfiles();
        this.profilesSub = this.storeService.getProfileUpdateListener()
         .subscribe((profiles: Profile[]) => {
             this.profiles = profiles;
         });
  }



  onSearchSelection(value: string): void {
    this.specificOptions = this.searchListService.onSearchSelection(value);

  }


  navigateToPage(value: string): void {
    this.router.navigate(['/main'], { queryParams: { category: value } });
  }


  clearSearch(): void {
    this.search.setValue('');
  }
}

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
  programs: string[] = [
    'Academic Bridging Program',
    'Acturial Science',
    'American Studies',
    'Anatomy',
    'Anthropology',
    'Archaeology',
    'Architecture & Visual Studies',
    'Art History',
    'Astronomy & Astrophysics',
    'Biochemistry',
    'Biology',
    'Cell & Systems Biology',
    'Centre For Jewish Studies',
    'Cinema Studies Institute',
    'Computer Science',
    'Contemporary Asian Studies',
    'Criminology & Sociolegal Studies',
    'Diaspora & Transnational Studies',
    'Drama',
    'Earth Sciences',
    'East Asian Studies',
    'Ecology & Evolutionary Studies',
    'Economics',
    'Environmental School',
    'Estonian',
    'Ethics',
    'European Studies',
    'Finnish',
    'First-Year Foundations',
    'Forest Conservation & Forest Biomaterials Science',
    'French',
    'Geography & Planning',
    'German',
    'History',
    'History & Philosophy of Science & Technology',
    'Human Biology',
    'Hungarian',
    'Immunology',
    'Impact Culture',
    'Indigenous Studies',
    'Industrial Relations & Resources (Centre For)',
    'Innis College',
    'Italian',
    'Laboratory Medicine & Pathobiology',
    'Latin American Studies',
    'Life Sciences',
    'Linguistics',
    'Material Science',
    'Mathematics',
    'Molecular Genetics & Microbiology',
    'Munk One',
    'Music',
    'Near & Middle Eastern Civilizations',
    'New College',
    'Nutritional Sciences',
    'Peace, Conflict & Justice',
    'Pharmacology & Toxicology',
    'Philosophy',
    'Physiology',
    'Physics',
    'Planetary Science',
    'Political Science',
    'Portuguese',
    'Psychology',
    'Public Policy',
    'Religion',
    'Rotman Commerce',
    'St.Michaels College',
    'Sexual Diversity Studies',
    'Slavic Languages & Literature',
    'Sociology',
    'South Asian Studies',
    'Spanish',
    'Statistical Sciences',
    'Theatre & Performance Studies',
    'Theoretical Astrophysics',
    'Trinity College',
    'University College',
    'Victoria College',
    'Women & Gender Studies',
    'Woodsworth College',
    'Yiddish Studies',
  ];
  selectedProgram = this.programs;
  // Receive user input and send to search method**
  onKey(value) {
    this.selectedProgram = this.searchInstructor(value);
  }

  // Filter the states list and send back to populate the selectedStates**
  searchInstructor(value: string) {
    let filter = value.toLowerCase();
    return this.programs.filter((option) =>
      option.toLowerCase().includes(filter)
    );
  }

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
    this.FavsVisible = !this.FavsVisible;
  }
  onSearchSelection(value: string): void {
    this.specificOptions = this.searchListService.onSearchSelection(value);
    console.log('morning', this.specificOptions);
  }
  navigateToPage(value: string): any {
    // const ID = (document.getElementById('userName') as HTMLInputElement).value;
    this.router.navigate(['/main/:'], { queryParams: { category: value } });
  }
  navigateToFav(value: string): void {
    this.router.navigate(['/main/:'], { queryParams: { category: value } });
  }
  navigateToFavHash(HashTag: string): void {
    this.router.navigate(['/hashtag/:'], {
      queryParams: { hashtag: HashTag },
    });
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

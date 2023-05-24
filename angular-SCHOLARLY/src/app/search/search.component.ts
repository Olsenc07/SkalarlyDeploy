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
  mains: Fav[] = [];
  campus: string;
  userId: string;
  FavsVisible = false;
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;
  private favsSub: Subscription;
  private infosSub: Subscription;

  isLoading = false;

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
    // userId
    this.userId = this.authService.getUserId();
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated: boolean) => {
        this.userIsAuthenticated = isAuthenticated;
        this.isLoading = false;
      });
    // default campus
    this.authService.getInfoProfile(this.userId);
    this.infosSub = this.authService
      .getInfoUpdateListenerProfile()
      .subscribe((infos: any) => {
        this.campus = infos.campus;
        console.log('boobs', this.campus);
        this.isLoading = false;
        // do this for them all!
      });
    this.postsService.getFavsList(this.userId);
    this.favsSub = this.postsService.getFavsListener().subscribe((favs) => {
      this.mains = favs;
    });
  }

  ngOnDestroy(): any {
    this.authListenerSubs.unsubscribe();
    this.favsSub.unsubscribe();
    this.infosSub.unsubscribe();
  }

  favsVisible(): void {
    this.FavsVisible = !this.FavsVisible;
  }
  campusMiss() {
    this.campus = 'U of T Mississauga';
  }
  campusScar() {
    this.campus = 'U of T Scarborough';
  }
  campusStGeorge() {
    this.campus = 'U of T St.George';
  }

  navigateToFav(value: string): void {
    this.router.navigate(['/main/:'], { queryParams: { category: value } });
  }
  navigateToFavHash(HashTag: string): void {
    this.router.navigate(['/hashtag/:'], {
      queryParams: { hashtag: HashTag },
    });
  }
}
@Component({
  selector: 'app-search-george',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchGeorgeComponent implements OnInit {
  isLoading = false;
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
  selectedProgramSafe = this.programs;

  // Receive user input and send to search method**
  onKey(value: string) {
    this.selectedProgram = this.searchInstructor(value);
  }

  // Filter the states list and send back to populate the selectedStates**
  searchInstructor(value: string) {
    let filter = value.toLowerCase();
    let found = this.programs.filter((option) =>
      option.toLowerCase().includes(filter)
    );
    if (found.length >= 1) {
      console.log('ny wow', found);
      return found;
    } else {
      console.log('cali parties', this.selectedProgramSafe);
      return this.selectedProgramSafe;
    }
  }

  opened = false;
  openedSearch = false;
  textbooks = false;
  textbooksCheck = false;
  Course = false;
  CourseCheck = false;
  insProgOptions = [];
  insProgOptionsNumber: number;

  instructorsProgram: FormControl = new FormControl('');
  search: FormControl = new FormControl('');
  searchForm = new FormGroup({
    search: this.search,
    mainChoice: new FormControl(''),
  });

  public selectedOption: string;
  public specificOptions: string[];
  public specificOptionsSafe: string[];

  public searchOptions: SearchOption[];

  public opt = 0;
  displaySpecificSearch(): void {
    this.opt++;
  }
  constructor(
    public searchListService: SearchListService,
    private postsService: PostsService,
    private router: Router
  ) {}

  ngOnInit(): any {
    this.searchOptions = this.searchListService.getSearchOptions();
  }
  // Filter specific search
  // Receive user input and send to search method**
  onKeyThree(value: string) {
    if (value.length >= 1) {
      this.specificOptions = this.searchSpecific(value);
    } else {
      // resets to original search
      this.specificOptions = this.specificOptionsSafe;
    }
  }
  // Filter the states list and send back to populate the selectedStates**
  searchSpecific(value: string) {
    this.specificOptions = this.specificOptionsSafe;
    let filter = value.toLowerCase();
    let found = this.specificOptions.filter((option) =>
      option.toLowerCase().includes(filter)
    );
    if (found.length >= 1) {
      return found;
    } else {
      return this.specificOptionsSafe;
    }
  }
  // course review search{
  CourseReview() {
    if (this.specificOptions[0] !== 'buy_sell') {
      this.Course = true;
      this.CourseCheck = true;
    }
  }
  // Instructor program search
  instructorsProgramTrigger(program: string) {
    this.instructorsProgram.setValue(program);
  }
  // textbook specific search
  Textbooks() {
    this.textbooks = true;
    this.textbooksCheck = true;
  }

  // instructor review clicked
  closeSpecifis() {
    this.specificOptions = null;
    this.specificOptionsSafe = null;
    this.textbooks = false;
    this.textbooksCheck = false;
    this.Course = false;
    this.CourseCheck = false;
  }
  // Searching instructors in program
  onKeyTwo(event: any): any {
    const query: string = event.target.value;
    console.log('query ', query);
    if (query) {
      const noSpecialChars = query.replace(/[^a-zA-Z0-9 ]/g, '');
      console.log('noSpecialChars', noSpecialChars);

      this.postsService.searchInstructorsProg(
        noSpecialChars.trim(),
        this.instructorsProgram.value
      );
      this.postsService.getInstructorsProgramsSearch().subscribe((results) => {
        if (results.length > 0) {
          this.insProgOptions = results;
          console.log('results baby', results);
        } else {
          this.insProgOptions = [];
        }
      });
      // which kind of results
      this.postsService
        .getInstructorsProgramsSearchNumber()
        .subscribe((type: number) => {
          if (type) {
            this.insProgOptionsNumber = type;
            console.log('results baby', type);
          } else {
            this.insProgOptionsNumber = 0;
          }
        });
    } else {
      console.log('nothing');
      // this.hasQuery = false;
    }
  }
  // filter specific options
  onSearchSelection(value: string): void {
    if (value !== 'important-links') {
      this.specificOptionsSafe =
        this.searchListService.onSearchSelection(value);
      this.specificOptions = this.searchListService.onSearchSelection(value);
    } else {
      this.specificOptionsSafe = ['important-links'];
      this.specificOptions = ['important-links'];
      console.log('cinammon bun 2', this.specificOptions[0]);
      console.log('cinammon bun', this.specificOptions);
    }

    if (this.textbooksCheck == false) {
      this.textbooks = false;
    }
    if (this.CourseCheck == false) {
      this.Course = false;
    }
  }
  openInstructorOptions() {
    this.opened = true;
  }
  openInstructorSearch() {
    this.openedSearch = true;
    this.opened = false;
  }
  closeInstructorOptions() {
    this.opened = false;
    this.openedSearch = false;
    this.insProgOptions = [];
    this.insProgOptionsNumber = 0;
    this.textbooks = false;
    this.textbooksCheck = false;
    this.Course = false;
    this.CourseCheck = false;
  }
  navigateToPage(value: string): any {
    if (this.textbooks == false && this.Course == false) {
      this.router.navigate(['/main/:'], { queryParams: { category: value } });
    }
    if (this.textbooks == true) {
      console.log('value', value);
      let Book = 'Textbooks:';
      let valueTextBook = Book.concat(' ', value);
      console.log('valueTextBook', valueTextBook);
      this.router.navigate(['/main/:'], {
        queryParams: { category: valueTextBook },
      });
    }
    if (this.Course == true && this.textbooks == false) {
      console.log('value', value);
      let courseYo = 'Course Review:';
      let valueCourse = courseYo.concat(' ', value);
      console.log('valueCourse', valueCourse);
      this.router.navigate(['/main/:'], {
        queryParams: { category: valueCourse },
      });
    }
  }
  getPostsMainPageInstructor(value: string): void {
    this.router.navigate(['/instructor-review/:'], {
      queryParams: { category: value },
    });
  }
  clearSearch(): void {
    this.search.setValue('');
  }
}
@Component({
  selector: 'app-search-scarborough',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchScarboroughComponent implements OnInit, OnDestroy {
  isLoading = false;
  ngOnInit(): any {}

  ngOnDestroy(): void {}
}

@Component({
  selector: 'app-search-mississauga',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchMississaugaComponent implements OnInit, OnDestroy {
  isLoading = false;
  ngOnInit(): any {}

  ngOnDestroy(): void {}
}

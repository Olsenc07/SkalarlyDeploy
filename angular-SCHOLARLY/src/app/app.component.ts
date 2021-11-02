import { Component, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  searchPop = false;
  faCoffee = faCoffee;
  title = 'angular-SCHOLARLY';

  isHomeScreen$: Observable<boolean>;

  isPostScreen$: Observable<boolean>;

  isSearchScreen$: Observable<boolean>;

  isFriendsActScreen$: Observable<boolean>;

  isProfileScreen$: Observable<boolean>;

  isSignUpScreen$: Observable<boolean>;

  isEditProfileScreen$: Observable<boolean>;

  isRetrievePScreen$: Observable<boolean>;

  isMessagesScreen$: Observable<boolean>;

  searchBox: Element;

  // allUsers should filter through every user
  allUsers: string[] = [''];


  search: FormControl = new FormControl('');
  filteredSearch: Observable<string[]>;
  searchForm = new FormGroup({
    search: this.search,
  });

  constructor(
    private router: Router
  ) {
    this.filteredSearch = this.search.valueChanges.pipe(
      map((user: string | null) => user ? this._filter(user) : this.allUsers.slice()));
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allUsers.filter(user => user.toLowerCase().indexOf(filterValue) === 0);
  }

  ngOnInit(): void {
    document.getElementsByClassName('search-box__icon')[0]?.addEventListener('click', this.activateSearch);
    this.searchBox = document.getElementsByClassName('search-box')[0];

    this.isPostScreen$ = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map((event: NavigationEnd) => event.url === '/' || event.url === '/post-page')
    );

    this.isSearchScreen$ = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map((event: NavigationEnd) => event.url === '/' || event.url === '/search')
    );

    this.isFriendsActScreen$ = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map((event: NavigationEnd) => event.url === '/' || event.url === '/friends-activity')
    );

    this.isProfileScreen$ = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map((event: NavigationEnd) => event.url === '/' || event.url === '/profile')
    );

    this.isSignUpScreen$ = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map((event: NavigationEnd) => event.url === '/' || event.url === '/sign-up')
    );
    this.isEditProfileScreen$ = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map((event: NavigationEnd) => event.url === '/' || event.url === '/edit-profile')
    );
    this.isHomeScreen$ = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map((event: NavigationEnd) => event.url === '/' || event.url === '/login')
    );
    this.isRetrievePScreen$ = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map((event: NavigationEnd) => event.url === '/' || event.url === '/retrieve-password')
    );
    this.isMessagesScreen$ = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map((event: NavigationEnd) => event.url === '/' || event.url === '/messages')
    );

  }

  // Missing link to fix search icon movement i hope
  // searchIcon.addEventListener("click", activateSearch);
  activateSearch(): void {
    this.searchBox.classList.toggle('active');
  }

  search_(): void {
    this.searchPop = !this.searchPop;
  }

  clearSearch(): void {
    this.search.setValue('');
  }

  onSubmit(): void {
    console.log(this.searchForm.value);
  }
}

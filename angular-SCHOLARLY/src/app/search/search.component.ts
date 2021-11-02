import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SearchListService } from '../services/search.service';

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

  // Should pull in from data base(with the cards"reccomendations"), adds and reccomendations of whatever I decide
  // make sure they display nicely and one add doesnt get way more time then others
  // cards will be 'https://.../..' etc from a database
  // If needed make adds the same card format. So the same look its sidplayed
  // just filled with either recomendations "friend request card style" or add in this style
  // Check mark could take you to that adds website, x could remove it from list
  // or just not be there.. course drop down display:none. bio could be ad info or whstever and logo in profile pic
  // Larger adds get main post cards filled.
  feeds = [{
    "profilePic": "", "userName": "", "Bio": "",
    "Major": "", "Minor": "", "Sport": "", "Club": ""
  },

  ];
  posts = [{
    "profilePic": "", "Title": "",
    "Specific": "", "Location": "", "Date": "", "Upload": ""
  },


  ];
  // Mock list but these are needed to fill app-card-request in ngFor
  // Will be pulled from back end, but how does the selector know to fill???



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
  displaySpecificSearch() {
    this.opt++;
  }


  ngOnInit(): void {
    this.searchOptions = this.searchListService.getSearchOptions();
  }

  onSearchSelection(value: string): void {
    this.specificOptions = this.searchListService.onSearchSelection(value);

  }


  constructor(
    public dialog: MatDialog,
    public searchListService: SearchListService,
    private router: Router
  ) { }

  navigateToPage(value): void {
    this.router.navigate(['/main'], { queryParams: { category: value } });
  }





  clearSearch(): void {
    this.search.setValue('');
  }
}

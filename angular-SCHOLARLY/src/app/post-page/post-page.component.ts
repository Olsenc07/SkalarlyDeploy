import { Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, Form, NgForm } from '@angular/forms';

import {
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import * as _moment from 'moment';
import { default as _rollupMoment } from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { map } from 'rxjs/operators';
import { SearchListService } from '../services/search.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Post, PostService } from '../services/post.service';
import { Title } from '@angular/platform-browser';

const moment = _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

interface SearchOption {
  value: string;
  name: string;
}

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})

export class PostPageComponent implements OnInit {
  minwidth = true;
  public selectedOption: string;
  public specificOptions: string[];
  public searchOptions: SearchOption[];

  url: string[];

  selectedIndex = 0;

  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  // Desktop tag friends
  friendCtrl: FormControl = new FormControl(['']);
  filteredFriends: Observable<string[]>;
  friends: string[] = [];
  @ViewChild('friendInput') friendInput: ElementRef<HTMLInputElement>;
  // Autocomplete should really just be a filter for your friend list,
  // and displayed when user clicks on input line, rn doesn't work properly
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  // allFriends should filter through your friend list desktop
  allFriends: string[] = [''];

  selectedIndexPost = 0;
  isLinear = false;
  // Title: FormControl = new FormControl('');
  public TitleLength = new BehaviorSubject(0);
  upload: FormControl = new FormControl('');
  postLocationMain: FormControl = new FormControl('');
  postLocation: FormControl = new FormControl('');
  postDescription: FormControl = new FormControl('');
  search: FormControl = new FormControl('');
  value: FormControl = new FormControl('');
  
  

  // Temporary
  id: FormControl = new FormControl('');

validateBtn = new FormGroup({
  postLocation: this.postLocation,
});


firstFormGroup: FormGroup = new FormGroup({
  Title:  new FormControl(''),
  date: new FormControl(''),
  time: new FormControl(''),
  locationEvent:  new FormControl(''),
})

secondFormGroup: FormGroup = new FormGroup({
  gender:  new FormControl(''),
}) 

thirdFormGroup: FormGroup = new FormGroup({
  driver:  new FormControl(''),
  paymentService:  new FormControl(''),
  virtual:  new FormControl(''),
})

fourthFormGroup: FormGroup = new FormGroup({
  event: new FormControl(''),
})
  // firstFormGroup: FormGroup;
  // secondFormGroup: FormGroup;
  // thirdFormGroup: FormGroup;
  // fourthFormGroup: FormGroup;

 

  constructor(public dialog: MatDialog, public searchListService: SearchListService,
              private fb: FormBuilder, private postService: PostService) {

    // Desktop tag friends
    this.filteredFriends = this.friendCtrl.valueChanges.pipe(
      map((friend: string | null) => friend ? this._filter(friend) : this.allFriends.slice()));


    // this.firstFormGroup = this.fb.group({
    //   Title: new FormControl(''),
    //   date: new FormControl(''),
    //   time: new FormControl(''),
    //   locationEvent: new FormControl(''),
    // });

    // this.secondFormGroup = this.fb.group({
    //   gender: new FormControl(''),
    // });

    // this.thirdFormGroup = this.fb.group({
    //   driver: new FormControl(''),
    //   paymentService: new FormControl(''),
    //   virtual: new FormControl(''),
    // });

    // this.fourthFormGroup = this.fb.group({
    //   event: new FormControl(''),
    // });

  }

  uploadFile(): any {
    document.getElementById('fileInput').click();
  }
  openDialog(): void {
    this.dialog.open(DialogElementsComponent);
  }
  openOtherServices(): void {
    this.dialog.open(ServicesElementsComponent);
  }

  imagePreview(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (Event: any) => { // called once readAsDataURL is completed
        console.log(Event);
        this.url = Event.target.result;
      };
    }
  }
  clearUpload(): void {
    this.upload.setValue('');
    document.getElementById('upload').removeAttribute('src');
    document.getElementById('upload2').removeAttribute('src');
  }


  ngOnInit(): any {
    this.searchOptions = this.searchListService.getSearchOptions();
    // Doesn't keep track of value
    this.firstFormGroup.get('Title').valueChanges.subscribe((v) => this.TitleLength.next(v.length));
    // 
    if (window.screen.width < 1025){
      this.minwidth = false;
    }
  
  }
  onSearchSelection(value): void {
    console.log(value);
    this.specificOptions = this.searchListService.onSearchSelection(value);
    const NextBtn2 = document.getElementById('nextBtn2');
    NextBtn2.scrollIntoView();
  }
  adjustView(): void {
    const NextBtn = document.getElementById('nextBtn');
    NextBtn.scrollIntoView();
  }
  // Desktop tag friends
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    // Add our friend
    if (value) {
      this.friends.push(value);
    }
    // Clear the input value
    // event.chipInput!.clear();

    this.friendCtrl.setValue(null);
  }
  remove(friend: string): void {
    const index = this.friends.indexOf(friend);
    if (index >= 0) {
      this.friends.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.friends.push(event.option.viewValue);
    this.friendInput.nativeElement.value = '';
    this.friendCtrl.setValue('');
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allFriends.filter(friend => friend.toLowerCase().indexOf(filterValue) === 0);
  }


  formatLabel(value: number): any {
    if (value >= 100) {
      return Math.round(value / 1) + '+';
    }
    return value;
  }


  onFormSubmit(form: NgForm): void {
    // TODO: wire up to post request
    // console.log(this.firstFormGroup.value);
    // console.log(this.secondFormGroup.value);
    // console.log(this.thirdFormGroup.value);
    // console.log(this.fourthFormGroup.value);
    // console.log(this.postDescription.value);
    // console.log(this.postLocation.value);


    const post: Post = {
      id: this.id.value,
      PostDescription: form.value.postDescription,
      Upload: this.upload.value,
      PostLocation: form.value.postLocation,
      FriendCtrl: this.friendCtrl.value,
      Title: form.value.Title,
      LocationEvent: form.value.locationEvent,
      Date: form.value.date,
      Time: form.value.time,
      Gender: form.value.gender,
      Driver: form.value.driver,
      PaymentService: form.value.paymentService,
      Virtual: form.value.virtual,
      Event: form.value.Event,
      // SecondFormGroup: this.secondFormGroup.value,
      // ThirdFormGroup: this.thirdFormGroup.value,
      // FourthFormGroup: this.fourthFormGroup.value,
    };

    // this is old connection
    // this.postService.setPost(post);

    // New one
  // this.postService.addPost(form.value.Title)


    this.postService.addPost(this.id.value, 
      this.postDescription.value, this.postLocation.value);
    // form.resetForm();
  }


  changeTab(): void {
    this.selectedIndexPost = this.selectedIndexPost === 1 ? 0 : 1;
  }
  changeTab1(): void {
    this.selectedIndexPost = this.selectedIndexPost === 0 ? 1 : 0;
  }
}
@Component({
  selector: 'app-post-page',
  templateUrl: './dialog-elements.component.html',
  styleUrls: ['./dialog-elements.component.scss'],
})
export class DialogElementsComponent { }

@Component({
  selector: 'app-post-page',
  templateUrl: './services-elements.component.html',
  styleUrls: ['./dialog-elements.component.scss'],
})
export class ServicesElementsComponent { }





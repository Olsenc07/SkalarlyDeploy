import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import {
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Router } from '@angular/router';

import {
  MatAutocompleteSelectedEvent,
  MatAutocomplete,
} from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { map } from 'rxjs/operators';
import { SearchListService } from '../services/search.service';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { PostService } from '../services/post.service';
import { mimeType } from './mime-type.validator';
import { AuthService } from '../services/auth.service';
import { Picker } from 'emoji-picker-element';

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
export class PostPageComponent implements OnInit, OnDestroy {
  minwidth = true;
  public selectedOption: string;
  public specificOptions: string[];
  public searchOptions: SearchOption[];
  picker = new Picker();

  isLoading = false;

  private authStatusSub: Subscription;

  userId: string;

  url: string;
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
  public LocationLength = new BehaviorSubject(0);

  postLocationMain: FormControl = new FormControl('');
  postLocation: FormControl = new FormControl('');
  postDescription: FormControl = new FormControl('');
  search: FormControl = new FormControl('');
  value: FormControl = new FormControl('');

  // Temporary
  id: FormControl = new FormControl('');

  // validateBtn = new FormGroup({
  //   postLocation: this.postLocation,
  // });

  Title: FormControl = new FormControl('');
  date: FormControl = new FormControl('');
  dateE: FormControl = new FormControl('');
  time: FormControl = new FormControl('');
  timeE: FormControl = new FormControl('');
  LocationEvent: FormControl = new FormControl('');
  gender: FormControl = new FormControl('');

  // thirdFormGroup: FormGroup  = new FormGroup({
  live: FormControl = new FormControl('');
  paymentService: FormControl = new FormControl('');
  nopaymentService: FormControl = new FormControl('');

  virtual: FormControl = new FormControl('');
  // });

  // fourthFormGroup: FormGroup  = new FormGroup({
  event: FormControl = new FormControl('');
  form: FormGroup;
  // });
  // firstFormGroup: FormGroup;
  // secondFormGroup: FormGroup;
  // thirdFormGroup: FormGroup;
  // fourthFormGroup: FormGroup;

  constructor(
    public dialog: MatDialog,
    public searchListService: SearchListService,
    private fb: FormBuilder,
    private router: Router,
    private postService: PostService,
    private authService: AuthService
  ) {
    // Desktop tag friends
    this.filteredFriends = this.friendCtrl.valueChanges.pipe(
      map((friend: string | null) =>
        friend ? this._filter(friend) : this.allFriends.slice()
      )
    );
  }
  // Adding emojis
  addEmoji(event: any): any {
    const msgs = event?.detail?.unicode;
    const msg = this.postDescription.value + msgs;
    this.postDescription.setValue(msg);
  }
  emojiPreventClose($event: any): any {
    $event.stopPropagation();
  }
  uploadFile(): any {
    document.getElementById('fileInput').click();
    console.log('nice');
  }
  openDialog(): void {
    this.dialog.open(DialogElementsComponent);
  }
  openOtherServices(): void {
    this.dialog.open(ServicesElementsComponent);
  }

  onImagePicked(event: Event): any {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ upload: file });
    this.form.get('upload').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.url = reader.result as string;
      console.log(this.url);
    };
    reader.readAsDataURL(file);
    console.log(file);
  }

  clearUpload(): void {
    this.form.get('upload').setValue('');
    document.getElementById('upload').removeAttribute('src');
  }

  ngOnInit(): any {
    this.userId = this.authService.getUserId();

    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe((authStatus) => {
        this.isLoading = false;
      });
    this.form = new FormGroup({
      upload: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType],
      }),
    });

    this.searchOptions = this.searchListService.getSearchOptions();
    // Doesn't keep track of value
    this.Title.valueChanges.subscribe((v) => this.TitleLength.next(v.length));
    this.LocationEvent.valueChanges.subscribe((v) =>
      this.LocationLength.next(v.length)
    );

    //
    if (window.screen.width < 1025) {
      this.minwidth = false;
    }
  }

  ngOnDestroy(): any {
    this.authStatusSub.unsubscribe();
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
    return this.allFriends.filter(
      (friend) => friend.toLowerCase().indexOf(filterValue) === 0
    );
  }

  formatLabel(value: number): any {
    if (value >= 100) {
      return Math.round(value / 1) + '+';
    }
    return value;
  }

  onFormSubmit(): any {
    this.postService.addPost(
      this.userId,
      this.Title.value,
      this.postDescription.value,
      this.postLocation.value,
      this.LocationEvent.value,
      this.time.value,
      this.timeE.value,
      this.date.value,
      this.dateE.value,
      this.gender.value,
      this.live.value,
      this.paymentService.value,
      this.nopaymentService.value,

      this.virtual.value,
      this.event.value,
      this.form.get('upload').value
    );
    // this.router.navigate(['/main/:'], {
    //   queryParams: { category: this.postLocation.value },
    // });
    this.router.navigate(['/profile']);
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
export class DialogElementsComponent {}

@Component({
  selector: 'app-post-page',
  templateUrl: './services-elements.component.html',
  styleUrls: ['./dialog-elements.component.scss'],
})
export class ServicesElementsComponent {}

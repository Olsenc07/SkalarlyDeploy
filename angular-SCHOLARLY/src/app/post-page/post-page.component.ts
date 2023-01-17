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
import { createPopup } from '@picmo/popup-picker';
import { PickerInteractionMode } from 'igniteui-angular';
import { text } from 'stream/consumers';
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
  isLoading = false;

  private authStatusSub: Subscription;

  userId: string;

  url: string;
  urlVideo: string;

  selectedIndex = 0;
  selectedIndexPost = 0;

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
  timeEdit = this.testNum(this.time.value.split(':')[0]);
  firstNumbers = this.time.value.split(':')[0];
  secondNumbers = this.time.value.split(':')[1];
  text = this.firstNumbers >= 12 ? 'pm' : 'am';
  startTime = this.timeEdit + ':' + this.secondNumbers + '\xa0' + this.text;
  timeE: FormControl = new FormControl('');
  timeEditEnd = this.testNum(this.timeE.value.split(':')[0]);
  textEnd = this.timeE.value.split(':')[0] >= 12 ? 'pm' : 'am';
  endTime =
    this.timeEditEnd +
    ':' +
    this.timeE.value.split(':')[1] +
    '\xa0' +
    this.textEnd;

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
    // this.filteredFriends = this.friendCtrl.valueChanges.pipe(
    //   map((friend: string | null) =>
    //     friend ? this._filter(friend) : this.allFriends.slice()
    //   )
    // );
  }
  // Am Pm instead of 24hr clock
  testNum(timeHourInitial: any): number {
    if (timeHourInitial > 12) {
      if (timeHourInitial === 13) {
        return 1;
      }
      if (timeHourInitial === 14) {
        return 2;
      }
      if (timeHourInitial === 15) {
        return 3;
      }
      if (timeHourInitial === 16) {
        return 4;
      }
      if (timeHourInitial === 17) {
        return 5;
      }
      if (timeHourInitial === 18) {
        return 6;
      }
      if (timeHourInitial === 19) {
        return 7;
      }
      if (timeHourInitial === 20) {
        return 8;
      }
      if (timeHourInitial === 21) {
        return 9;
      }
      if (timeHourInitial === 22) {
        return 10;
      }
      if (timeHourInitial === 23) {
        return 11;
      }
      if (timeHourInitial === 24) {
        return 12;
      }
    } else {
      return timeHourInitial;
    }
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
  uploadFileVideo(): any {
    document.getElementById('fileInputVideo').click();
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
    };
    reader.readAsDataURL(file);
  }
  onImagePickedVideo(event: Event): any {
    const reader = new FileReader();
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ video: file });
    this.form.get('video').updateValueAndValidity();
    reader.onload = () => {
      this.urlVideo = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
  clearUpload(): void {
    this.form.get('upload').setValue('');
  }
  clearUploadVideo(): void {
    document.getElementById('video-preview').removeAttribute('video');
    (document.getElementById('fileInputVideo') as HTMLInputElement).value = '';
    this.form.get('video').reset();
    this.form.get('video').updateValueAndValidity();
    console.log('hey hot stuff');
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
      video: new FormControl(null, {
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
  // Adding emojis
  openEmoji(): void {
    const selectionContainer = document.getElementById('showEmojis');
    const triggerEmoji = document.getElementById('triggerEmo');
    console.log('star through');
    const picker = createPopup(
      {},
      {
        referenceElement: selectionContainer,
        triggerElement: triggerEmoji,
      }
    );

    picker.toggle();
    picker.addEventListener('emoji:select', (selection) => {
      console.log('Selected emoji: ', selection.emoji);
      const msgs = selection.emoji;
      const msg = this.postDescription.value + msgs;
      this.postDescription.setValue(msg);
    });
  }
  onSearchSelection(value): any {
    console.log(value);
    this.specificOptions = this.searchListService.onSearchSelection(value);
    // const NextBtn2 = document.getElementById('nextBtn2');
    // NextBtn2.scrollIntoView();
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
      this.startTime,
      this.endTime,
      // this.timeEditAfter,
      // this.timeEditAfter2,
      this.date.value,
      this.dateE.value,
      this.gender.value,
      this.live.value,
      this.paymentService.value,
      this.nopaymentService.value,

      this.virtual.value,
      this.event.value,
      this.form.get('upload').value,
      this.form.get('video').value
    );
    this.router.navigate(['/main/:'], {
      queryParams: { category: this.postLocation.value },
    });
    console.log('start', this.time.value, 'end', this.timeE.value);
    console.log('start', this.startTime);
    console.log('end', this.endTime);
    console.log('laugh', this.time.value.split(':')[0]);
    console.log('laugh2', this.time.value.split(':')[1]);
    console.log('pac', this.firstNumbers);
    console.log('biggie', this.secondNumbers);

    // this.router.navigate(['/profile']);
  }

  onFormSubmitVideo(): any {
    this.postService.addPostVideo(
      this.userId,
      this.Title.value,
      this.postDescription.value,
      this.postLocation.value,
      this.LocationEvent.value,
      this.time.value,
      this.timeE.value,
      // this.timeEditAfter,
      // this.timeEditAfter2,
      this.date.value,
      this.dateE.value,
      this.gender.value,
      this.live.value,
      this.paymentService.value,
      this.nopaymentService.value,

      this.virtual.value,
      this.event.value,
      this.form.get('upload').value,
      this.form.get('video').value
    );
    this.router.navigate(['/main/:'], {
      queryParams: { category: this.postLocation.value },
    });

    // this.router.navigate(['/profile']);
  }

  changeTab(): void {
    this.selectedIndexPost = this.selectedIndexPost === 1 ? 0 : 1;
    console.log('math class', this.selectedIndexPost);
  }
  changeTab_(): void {
    this.selectedIndexPost = this.selectedIndexPost === 0 ? 1 : 0;
  }
  changeTab1(): void {
    this.selectedIndex = this.selectedIndex === 1 ? 0 : 1;
    console.log('physics class1', this.selectedIndex);
  }
  changeTabB(): void {
    this.selectedIndex = this.selectedIndex === 0 ? 1 : 0;
    this.postLocation.setValue('');
  }
  changeTab2(): void {
    this.selectedIndex = this.selectedIndex === 1 ? 2 : 1;
    console.log('physics class', this.selectedIndex);
  }
  changeTab3(): void {
    this.selectedIndex = this.selectedIndex === 2 ? 1 : 2;
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

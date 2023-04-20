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
  AbstractControl,
  ValidationErrors,
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
import { SearchListService } from '../services/search.service';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { PostService } from '../services/post.service';
import { mimeType } from './mime-type.validator';
import { AuthService } from '../services/auth.service';
import { createPopup } from '@picmo/popup-picker';
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
  public specificOptionsSafe: string[];
  textBooks: boolean;
  courseReview: boolean;
  instructorReview: boolean;
  public searchOptions: SearchOption[];
  public searchOptionss: SearchOption[];

  isLoading = false;

  private authStatusSub: Subscription;
  private titleSub: Subscription;
  private HashSub: Subscription;
  private locationSub: Subscription;
  userId: string;

  url: string;
  urlVideo: string;
  // hiding text when picking emoji
  show = true;
  selectedIndex = 0;
  selectedIndexPost = 0;
  // Filter categories for instructor review
  opened = false;
  instructors = [];
  GradeBoolean: boolean = false;
  instructorRatingView = 0.0;
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
  onKey(value: string) {
    this.selectedProgram = this.searchInstructor(value);
  }

  // Filter the states list and send back to populate the selectedStates**
  searchInstructor(value: string) {
    let filter = value.toLowerCase();
    return this.programs.filter((option) =>
      option.toLowerCase().includes(filter)
    );
  }
  // Grading instructor
  Grade() {
    console.log('grade', this.GradeBoolean);
    this.GradeBoolean = !this.GradeBoolean;
    this.instructorRating.setValue('');
  }
  overallGrade() {
    this.knowledgeRating.valueChanges.subscribe((values) => {
      this.instructorRatingView =
        values + Number(this.profesionalismRating.value);
      console.log('dick yall', this.instructorRatingView);
      this.instructorRating.setValue(this.instructorRatingView);
      // Then add the two
    });
  }
  overallGrade2() {
    this.profesionalismRating.valueChanges.subscribe((values) => {
      this.instructorRatingView = values + Number(this.knowledgeRating.value);
      console.log('dick yall 2', this.instructorRatingView);
      this.instructorRating.setValue(this.instructorRatingView);
      // Then add the two
    });
  }
  //
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
  public HashTagLength = new BehaviorSubject(0);

  postLocationMain = '';
  postLocation: FormControl = new FormControl('');

  postLocationInstructor: FormControl = new FormControl('');
  knowledgeRating: FormControl = new FormControl('');
  profesionalismRating: FormControl = new FormControl('');
  instructorRating: FormControl = new FormControl();
  // instructorsProgram: FormControl = new FormControl();
  // this.instructorRating.setValue()
  postDescription: FormControl = new FormControl('');
  search: FormControl = new FormControl('');
  value: FormControl = new FormControl('');

  // Temporary
  id: FormControl = new FormControl('');

  // validateBtn = new FormGroup({
  //   postLocation: this.postLocation,
  // });

  Title: FormControl = new FormControl('');
  Hashtag1: FormControl = new FormControl('', [
    this.noWhiteSpace,
    this.noSpecialCharacters,
  ]);
  Hashtag2: FormControl = new FormControl('', [
    this.noWhiteSpace,
    this.noSpecialCharacters,
  ]);
  Hashtag3: FormControl = new FormControl('', [
    this.noWhiteSpace,
    this.noSpecialCharacters,
  ]);
  Hashtag4: FormControl = new FormControl('', [
    this.noWhiteSpace,
    this.noSpecialCharacters,
  ]);
  Hashtag5: FormControl = new FormControl('', [
    this.noWhiteSpace,
    this.noSpecialCharacters,
  ]);

  // date: FormControl = new FormControl('');
  // dateE: FormControl = new FormControl('');
  time: FormControl = new FormControl('');
  firstNumbers = this.time.value.split(':');
  firstNumber = Number(this.firstNumbers[0]);
  timeEdit = this.testNum(this.firstNumber);
  secondNumbers = this.firstNumbers[1];
  text = this.firstNumber >= 12 ? 'pm' : 'am';
  startTime = this.timeEdit + ':' + this.secondNumbers + '\xa0' + this.text;
  timeE: FormControl = new FormControl('');
  firstNumbersEnd = this.timeE.value.split(':');
  firstNumberEnd = Number(this.firstNumbersEnd[0]);
  timeEditEnd = this.testNum(this.firstNumberEnd);
  secondNumbersEnd = this.firstNumbersEnd[1];
  textEnd = this.firstNumberEnd >= 12 ? 'pm' : 'am';
  endTime =
    this.timeEditEnd + ':' + this.secondNumbersEnd + '\xa0' + this.textEnd;

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
  testNum(timeHourInitial: any): any {
    console.log('tities', timeHourInitial);
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

    // this.searchOptionss = this.searchListService.getSearchOptions();
    // console.log('just gotta see it', this.searchOptionss);
    // do a bunch of edits then it makes new list with drop downs

    // add quick search also
    // this.searchOptions = this.searchOptionss.filter(
    //   (e) => e.name !== 'Important Links'
    // );
    // Doesn't keep track of value
    this.titleSub = this.Title.valueChanges.subscribe((v) =>
      this.TitleLength.next(v.length)
    );
    this.HashSub = this.Hashtag1.valueChanges.subscribe((v) =>
      this.HashTagLength.next(v.length)
    );

    this.locationSub = this.LocationEvent.valueChanges.subscribe((v) =>
      this.LocationLength.next(v.length)
    );

    //
    if (window.screen.width < 1025) {
      this.minwidth = false;
    }
  }

  ngOnDestroy(): any {
    this.authStatusSub.unsubscribe();
    this.locationSub.unsubscribe();
    this.HashSub.unsubscribe();
    this.titleSub.unsubscribe();
  }
  setFormControlValue(instructor: string): void {
    this.postLocationInstructor.setValue(instructor);
    console.log('my eyes have scene', this.postLocationInstructor.value);
  }
  openInstructorOptions() {
    this.opened = true;
  }
  // Search instructors names
  instructorsName(event: any): void {
    const query: string = event.target.value;
    console.log('query ', query);
    if (query) {
      const noSpecialChars = query.replace(/[^a-zA-Z0-9 ]/g, '');
      this.authService.searchInstructorNames(noSpecialChars.trim());
      this.authService.getInstructor().subscribe((results: Array<string>) => {
        if (results.length !== 0) {
          console.log('results baby', results);
          this.instructors = results;
        } else {
          console.log('nuts');
          // this.emailMatches = false;
        }
      });
    } else {
      console.log('DeLorean');
      this.instructors = [];
    }
  }

  // Adding emojis
  openEmoji(): void {
    const selectionContainer = document.getElementById('showEmojis');
    const triggerEmoji = document.getElementById('triggerEmo');
    this.show = false;
    console.log('star through');
    const picker = createPopup(
      {},
      {
        referenceElement: selectionContainer,
        triggerElement: triggerEmoji,
        position: 'top',
      }
    );

    picker.toggle();
    picker.addEventListener('emoji:select', (selection) => {
      console.log('Selected emoji: ', selection.emoji);
      const msgs = selection.emoji;
      const msg = this.postDescription.value + msgs;
      this.postDescription.setValue(msg);
    });
    picker.addEventListener('picker:close', (event) => {
      console.log('lots of money boi');
      this.show = true;
    });
  }
  Instructors() {
    this.instructorReview = true;
  }
  Textbooks() {
    this.textBooks = true;
  }
  CourseReview() {
    this.courseReview = true;
  }
  onSearchSelection(value: string): any {
    console.log('fry', value);
    this.postLocationMain = value;
    console.log('bender', this.postLocationMain);
    // if (this.postLocationMain !== 'instructor_rev') {
    this.specificOptionsSafe = this.searchListService.onSearchSelection(value);
    this.specificOptions = this.searchListService.onSearchSelection(value);
    // }
    console.log('nibbler', this.specificOptions);
    // const NextBtn2 = document.getElementById('nextBtn2');
    // NextBtn2.scrollIntoView();
  }
  // Filter specific search
  // Receive user input and send to search method**
  onKeyThree(value: string) {
    // if nothing clicked or if no matches then don't
    // close but show all options
    // save the orignally searched array and re look at it
    // but test it now
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
      console.log('ny wow', found);
      return found;
    } else {
      console.log('cali parties', this.specificOptionsSafe);
      return this.specificOptionsSafe;
    }
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
  public noWhiteSpace(control: AbstractControl): ValidationErrors | null {
    if ((control.value as string).indexOf(' ') >= 0) {
      return { noWhiteSpace: true };
    }
    return null;
  }
  public noSpecialCharacters(
    control: AbstractControl
  ): ValidationErrors | null {
    const working = control.value as string;
    console.log('is this working 2', working);
    const normalcharacter = /^[]-~`!@+#$%^&*()_={}[|\/:;'"<>,.?]*/;
    console.log('hey', normalcharacter.test(working));
    if (normalcharacter.test(working) == null) {
      console.log('hey boo ya');
      return null;
    } else {
      console.log('easy now');
      return { noSpecialCharacters: true };
    }
  }
  onFormSubmit(): any {
    this.postService.addPost(
      this.userId,
      this.Title.value,
      this.postDescription.value,
      this.postLocation.value,
      // for course review this is course,
      // course rating Quality and difficulty
      this.postLocationInstructor.value.trim(),
      this.instructorRating.value,
      this.knowledgeRating.value,
      this.profesionalismRating.value,
      //
      this.LocationEvent.value,
      this.time.value,
      this.timeE.value,
      // this.date.value,
      // this.dateE.value,
      this.gender.value,
      this.live.value,
      this.paymentService.value,
      this.nopaymentService.value,
      this.virtual.value,
      this.event.value,
      this.Hashtag1.value,
      this.Hashtag2.value,
      this.Hashtag3.value,
      this.Hashtag4.value,
      this.Hashtag5.value,
      this.form.get('upload').value,
      this.form.get('video').value
    );
    this.router.navigate(['/main/:'], {
      queryParams: { category: this.postLocation.value },
    });
    console.log('start', this.time.value, 'end', this.timeE.value);
    console.log('start', this.startTime);
    console.log('end', this.endTime);
    console.log('laugh', typeof Number(this.time.value.split(':')[0]));
    console.log('laugh2', typeof Number(this.time.value.split(':')[1]));
    console.log('pac0', this.firstNumber);
    console.log('pac1', this.firstNumbers);

    console.log('biggie', Number(this.secondNumbers));

    // this.router.navigate(['/profile']);
  }

  onFormSubmitVideo(): any {
    this.postService.addPostVideo(
      this.userId,
      this.Title.value,
      this.postDescription.value,
      this.postLocation.value,
      this.postLocationInstructor.value.trim(),
      this.instructorRating.value,
      this.LocationEvent.value,
      this.time.value,
      this.timeE.value,

      // this.date.value,
      // this.dateE.value,
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
    console.log('hey beautiful', this.postLocationInstructor.value.trim());
    console.log('blow at high dough', this.instructorRating.value);
    console.log('invincible', this.postLocation.value);
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
    this.specificOptions = null;
    this.textBooks = false;
    this.courseReview = false;
    this.instructorReview = false;
    // this.postLocation1.setValue('');
  }
  changeTab2(opt: string): void {
    this.selectedIndex = this.selectedIndex === 1 ? 2 : 1;
    if (this.textBooks == true) {
      let Book = 'Textbooks:';
      let valueTextBook = Book.concat(' ', opt);
      this.postLocation.setValue(valueTextBook);
    }
    if (this.courseReview == true) {
      let courseYo = 'Course Review:';
      let valueCourse = courseYo.concat(' ', opt);
      this.postLocation.setValue(valueCourse);
    }
    if (this.textBooks == false && this.courseReview == false) {
      this.postLocation.setValue(opt);
    }
    console.log('physics class', this.postLocation.value);
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

import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
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
import { ImageCroppedEvent, base64ToFile } from 'ngx-image-cropper';
import { HttpClient } from '@angular/common/http';
import {
  MatAutocompleteSelectedEvent,
  MatAutocomplete,
} from '@angular/material/autocomplete';

import { MatChipInputEvent, MatChipList } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ClassListService } from '../services/class.service';
import { Profile, StoreService } from '../services/store.service';
import { AccountTextComponent } from '../signup/signup.component'


interface Gender {
  name: string;
}
const moment = _moment;
export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA12yLabel: 'LL',
    monthYearA12yLabel: 'MMMM YYYY',
  },
};
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class EditProfileComponent implements OnInit {
  // Showcase
  i = 0;
  // Groups joined
  g = 0;
  // Posts
  p = 0;
  clicked = false;
  removeShowCase = false;
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  // These show inputs in real time but arn't whats stored
  filteredCodes: Observable<string[]>;
  filteredCodesP: Observable<string[]>;

  classes: string[] = [];
  classesP: string[] = [];
  @ViewChild('codeInput') codeInput: ElementRef<HTMLInputElement>;
  @ViewChild('codeInputP') codeInputP: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  @ViewChild('autoP') matAutocompleteP: MatAutocomplete;
  url: string[];
  cropImgPreview: any = '';
  imgChangeEvent: any = '';
  // PP isn't connected properly i dont think, since image is being cropped then returned as a base 64 value
  profilePic: FormControl = new FormControl('');
  major: FormControl = new FormControl('');
  minor: FormControl = new FormControl('');
  sport: FormControl = new FormControl('');
  club: FormControl = new FormControl('');
  // bio: FormControl = new FormControl('');
  // public bioLength = new BehaviorSubject(0);
  name: FormControl = new FormControl('');
  pronouns: FormControl = new FormControl('');
  showCase: FormControl = new FormControl('');
  // removeShowCase: FormControl = new FormControl('');
  birthday: FormControl = new FormControl('');
  genderChoice: FormControl = new FormControl('');


  // I think each code input is a different form control, save into the array
  CodeCompleted: FormControl = new FormControl('');
  // Need to push form controls from the users input, into this 
  // Form Array, which gets passed 
  CodePursuing: FormControl = new FormControl('');


  // Completed = new FormArray({
  //   CodeCompleted
  // })


  editForm = new FormGroup({
    major: this.major,
    minor: this.minor,
    sport: this.sport,
    club: this.club,
    name: this.name,
    pronouns: this.pronouns,
    genderChoice: this.genderChoice,
    birthday: this.birthday,
    accountType: new FormControl(''),
    profilePic: this.profilePic,
    CodeCompleted: this.CodeCompleted,
    CodePursuing: this.CodePursuing,
    // bio: this.bio,
    showCase: this.showCase,
  });
  selectedIndex = 0;
  genders: Gender[] = [
    { name: '' },
    { name: 'Female' },
    { name: 'Male' },
    { name: 'Other' },

  ];

  // Group list;
  gList = ['', ''];

  // Post list;
  pList = ['', ''];

  // Connects to save showcases in the data base
  list = ['../../assets/Pics/IMG-8413.PNG',
    '../../assets/Pics/IMG-8619.PNG',
    '../../assets/Pics/WhiteSquareInAppLogo.jpg',
    '../../assets/Pics/ProperInAppLogo.jpeg ',
    '../../assets/Pics/IMG-8413.PNG',
    '../../assets/Pics/IMG-8619.PNG',
    '../../assets/Pics/IMG-8413.PNG',
    '../../assets/Pics/IMG-8619.PNG',
    '../../assets/Pics/IMG-8413.PNG',
  ];

  constructor(
    public dialog: MatDialog,
    public classListService: ClassListService,
    private http: HttpClient,
    private storeService: StoreService
  ) {
    // this.bio.valueChanges.subscribe((v) => this.bioLength.next(v.length));

    this.filteredCodes = this.CodeCompleted.valueChanges.pipe(
      map((code: string | null) =>
        code ? this._filter(code) : this.classListService.allClasses().slice()
      )
    );


    this.filteredCodesP = this.CodePursuing.valueChanges.pipe(
      map((codeP: string | null) =>
        codeP ? this._filter(codeP) : this.classListService.allClasses().slice()
      )
    );
  }

  deleteShowCase(): boolean {
    this.removeShowCase = !this.removeShowCase;

    return this.removeShowCase;
  };
  hideAdd(): boolean {

    this.clicked = !this.clicked;
    return this.clicked;
  };
  uploadFile(): any {
    document.getElementById('fileInput').click();

  };
  uploadFileP(): any {
    document.getElementById('fileInputP').click();
  };
  onImgChange(event: any): void {
    this.imgChangeEvent = event;
  }
  // Passes value as base64 string of cropped area!!
  //  But where does form controller come into play?
  cropImg(e: ImageCroppedEvent): any {
    this.cropImgPreview = e.base64;
    // let File = base64ToFile(this.cropImgPreview)
    // this.profilePic = this.cropImgPreview
    // return this.profilePic
    return this.cropImgPreview
  }

  imgLoad(): void {
    // display cropper tool
  }

  initCropper(): void {
    // init cropper
  }
  imgFailed(): void {
    // error msg
  }

  // SnapShot
  // After its added to the list. Click save and 
  // this becomes the updated array, sent back to the data base
  arrayAdd(event: any): any {
    this.list.unshift(this.showCase.value)
    console.log(this.list);
    return this.list
  }


  imagePreview(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (Event: any) => {
        // called once readAsDataURL is completed
        console.log(Event);
        this.url = Event.target.result;
      };
    }

  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our course code
    if (value) {
      this.classes.push(value);
    }

    // Clear the input value
    // event.chipInput!.clear();
    this.CodeCompleted.setValue(null);
  }
  // Pursuing Courses
  addP(event: MatChipInputEvent): void {
    const valueP = (event.value || '').trim();

    // Add our course code
    if (valueP) {
      this.classesP.push(valueP);
    }

    // Clear the input value
    // event.chipInput!.clear();
    this.CodePursuing.setValue(null);
  }

  remove(code: string): void {
    const index = this.classes.indexOf(code);
    if (index >= 0) {
      this.classes.splice(index, 1);
    }
  }
  removeP(codeP: string): void {
    const indexP = this.classesP.indexOf(codeP);
    if (indexP >= 0) {
      this.classesP.splice(indexP, 1);
    }
  }

  // Completed Classes
  selected(event: MatAutocompleteSelectedEvent): void {
    this.classes.push(event.option.viewValue);
    this.codeInput.nativeElement.value = '';
    // this.CodeCompleted.setValue();
  }
  // Pursuing Classes
  selectedP(event: MatAutocompleteSelectedEvent): void {
    this.classesP.push(event.option.viewValue);
    this.codeInputP.nativeElement.value = '';
    // this.CodePursuing.setValue('');
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.classListService
      .allClasses()
      .filter((code) => code.toLowerCase().indexOf(filterValue) === 0);
  }

  ngOnInit(): void {
  }

  clearMajor(): void {
    this.major.setValue('');
  }
  clearMinor(): void {
    this.minor.setValue('');
  }
  clearSport(): void {
    this.sport.setValue('');
  }
  clearClub(): void {
    this.club.setValue('');
  }

  clearName(): void {
    this.name.setValue('');
  }
  // clearBio(): void {
  //   this.bio.setValue('');
  // }

  clearProfilePic(): any {
    this.profilePic.setValue('');
    this.cropImgPreview = '';
    document.getElementById('ProfilePic').removeAttribute('src');

  }

  clearPic1(): void {
    this.showCase.setValue('');
    this.list.shift();
    document.getElementById('firstP').removeAttribute('src');
  }
  // Groups joined
  previousGroupCard(): number {
    --this.g;
    if (0 > this.g) {
      this.g = this.gList.length - 1
      return this.g
    }
    console.log(this.g);

  }
  nextGroupCard(): number {
    ++this.g;
    if (this.g >= this.gList.length) {
      this.g = 0
      return this.g
    }
    console.log(this.g);
    // go forward one card
  }
  leaveGroup(): number {
    this.gList.splice(this.g, 1)
    console.log(this.gList.length);
    if (this.g == this.gList.length) {
      this.g = this.g - 1
      return this.g
    }
  }


  // Posts made
  previousPostCard(): number {
    --this.p;
    if (0 > this.p) {
      this.p = this.pList.length - 1
      return this.p
    }
    console.log(this.p);

  }
  nextPostCard(): number {
    ++this.p;
    if (this.p >= this.pList.length) {
      this.p = 0
      return this.p
    }
    console.log(this.p);
    // go forward one card
  }
  deletePost(): number {
    this.pList.splice(this.p, 1)
    console.log(this.pList.length);
    if (this.p == this.pList.length) {
      this.p = this.p - 1
      return this.p
    }
  }


  // Showcase edit
  previousCard(): number {
    --this.i;
    if (0 > this.i) {
      this.i = this.list.length - 1
      return this.i
    }
    console.log(this.i);
  }
  nextCard(): number {
    ++this.i;
    if (this.i >= this.list.length) {
      this.i = 0
      return this.i
    }
    console.log(this.i);
    // go forward one card
  }
  deleteSnapShot(): number {
    this.list.splice(this.i, 1)
    console.log(this.list.length);
    if (this.i == this.list.length) {
      this.i = this.i - 1
      return this.i
    }
  }

  openDialogAccount(): void {
    this.dialog.open(AccountTextComponent);
  }

  onSubmit(): void {

    console.log(this.editForm.value);
    // TODO: convert form fields to Profile

    let profile: Profile = {
      CodeCompleted: this.CodeCompleted.value,
      CodePursuing: this.CodePursuing.value,
      Name: this.name.value,
      Pronouns: this.pronouns.value,
      profilePic: this.profilePic.value,
      Gender: this.genderChoice.value,
      Major: this.major.value,
      Minor: this.minor.value,
      Sport: this.sport.value,
      Club: this.club.value,
      profPic: this.cropImgPreview,
      Birthday: this.birthday.value,
      ShowCase: this.showCase.value,
      // ShowCasse: this.url,


      // cropImgPreview: this.cropImgPreview,
      // Converted base64 url to a file
      // Trying to store this chosen cropped value in service
      // cropPicChosen: File,
    };

    // TODO: replace null with Profile object
    this.storeService.setProfile(profile);

  }
}

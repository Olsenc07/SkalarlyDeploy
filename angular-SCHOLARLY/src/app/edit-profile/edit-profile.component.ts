import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
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
import {
  MatAutocompleteSelectedEvent,
  MatAutocomplete,
} from '@angular/material/autocomplete';

import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { BehaviorSubject, Observable } from 'rxjs';
import { ClassListService } from '../services/class.service';
import { Post, PostService } from '../services/post.service';
import { AuthService } from '../services/auth.service';
import { AuthServiceEdit } from '../services/edit.service';
import { AuthServiceEditCourse } from '../services/editCourse.service';
import { Subscription } from 'rxjs';
import { AuthDataInfo } from '../signup/auth-data.model';
import { ShowCaseService } from '../services/showCase.service';
import { mimeType } from '../post-page/mime-type.validator';
import { Picker } from 'emoji-picker-element';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthServiceEditNext } from '../services/editNextCourse.service';

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
  storedPosts: Post[] = [];
  posts: Post[] = [];
  private postsSub: Subscription;
  picker = new Picker();

  userId: string;

  infos: AuthDataInfo[] = [];
  private infosSub: Subscription;
  // Showcase
  showCasePreview: any = '';
  url: string;
  urlPP: string;

  clicked = false;
  removeShowCase = false;
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  // These show inputs in real time but arn't whats stored

  genders: string[] = [
    'Female',
    'Male',
    'Transgender',
    'Other',
    'Agender',
    'Bigender',
    'Intersex',
    'Gender Fluid',
    'Gender Queer',
    'Non-Binary',
    'Pangender',
    'Trans Male',
    'Trans Female',
    'Two Spirit',
  ];

  pronouns: string[] = ['She/Her', 'He/His', 'Ze/Hirs', 'Ze/Zirs', 'Xe/Xyr'];

  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  @ViewChild('autoP') matAutocompleteP: MatAutocomplete;
  cropImgPreview: any = '';
  imgChangeEvent: any = '';

  // username isn't connected to any formcontrol its just so the profile interface is happy
  username: FormControl = new FormControl('');
  // PP isn't connected properly i dont think, since image is being cropped then returned as a base 64 value
  profilePic: FormControl = new FormControl('');
  major: FormControl = new FormControl('');
  minor: FormControl = new FormControl('');
  sport: FormControl = new FormControl('');
  club: FormControl = new FormControl('');
  bio: FormControl = new FormControl('');
  // public bioLength = new BehaviorSubject(0);
  name: FormControl = new FormControl('');
  pronoun: FormControl = new FormControl('');
  showCase: FormControl = new FormControl('');
  // removeShowCase: FormControl = new FormControl('');
  birthday: FormControl = new FormControl('');
  gender: FormControl = new FormControl('');
  form: FormGroup;

  selectedIndex = 0;

  constructor(
    public dialog: MatDialog,
    public classListService: ClassListService,
    public authService: AuthService,
    public authServiceEdit: AuthServiceEdit,
    private snackBar: MatSnackBar,
    public showCaseService: ShowCaseService,
    public postService: PostService
  ) {
    // this.bio.valueChanges.subscribe((v) => this.bioLength.next(v.length));
    // this.filteredCodes = this.CodeCompleted.valueChanges.pipe(
    //   map((code: string | null) =>
    //     code ? this._filter(code) : this.classListService.allClasses().slice()
    //   )
    // );
    // this.filteredCodesP = this.CodePursuing.valueChanges.pipe(
    //   map((codeP: string | null) =>
    //     codeP ? this._filter(codeP) : this.classListService.allClasses().slice()
    //   )
    // );
  }
  // Adding emojis
  addEmojiBio(event: any): any {
    const msgs = event?.detail?.unicode;
    const msg = this.bio.value + msgs;
    this.bio.setValue(msg);
  }
  addEmojiMajor(event: any): any {
    const msgs = event?.detail?.unicode;
    const msg = this.major.value + msgs;
    this.major.setValue(msg);
  }
  addEmojiMinor(event: any): any {
    const msgs = event?.detail?.unicode;
    const msg = this.minor.value + msgs;
    this.minor.setValue(msg);
  }
  addEmojiSport(event: any): any {
    const msgs = event?.detail?.unicode;
    const msg = this.sport.value + msgs;
    this.sport.setValue(msg);
  }
  addEmojiClub(event: any): any {
    const msgs = event?.detail?.unicode;
    const msg = this.club.value + msgs;
    this.club.setValue(msg);
  }

  emojiPreventCloseBio($event: any): any {
    $event.stopPropagation();
  }
  emojiPreventCloseMajor($event: any): any {
    $event.stopPropagation();
  }
  emojiPreventCloseMinor($event: any): any {
    $event.stopPropagation();
  }
  emojiPreventCloseSport($event: any): any {
    $event.stopPropagation();
  }
  emojiPreventCloseClub($event: any): any {
    $event.stopPropagation();
  }
  deleteShowCase(): boolean {
    this.removeShowCase = !this.removeShowCase;

    return this.removeShowCase;
  }
  hideAdd(): boolean {
    this.clicked = !this.clicked;
    return this.clicked;
  }
  uploadFile(): any {
    document.getElementById('showCase').click();
  }
  uploadFileP(): any {
    document.getElementById('fileInputP').click();
  }
  onImgChange(event: any): void {
    this.imgChangeEvent = event;
  }
  // Passes value as base64 string of cropped area!!
  //  But where does form controller come into play?
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
  // arrayAdd(event: any): any {
  //   this.list.unshift(this.showCase.value);
  //   console.log(this.list);
  //   return this.list;
  // }
  // Profile Pic
  imagePreviewPP(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file = (event.target as HTMLInputElement).files[0];
      const reader = new FileReader();
      this.form.patchValue({ profilePic: file });
      this.form.get('profilePic').updateValueAndValidity();
      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (Event: any) => {
        // called once readAsDataURL is completed
        console.log(Event);
        this.urlPP = reader.result as string;
      };
    }
  }
  // SnapShot
  imagePreview(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file = (event.target as HTMLInputElement).files[0];
      const reader = new FileReader();
      this.form.patchValue({ showCase: file });
      this.form.get('showCase').updateValueAndValidity();
      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = () => {
        // called once readAsDataURL is completed

        this.url = reader.result as string;
      };
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.classListService
      .allClasses()
      .filter((code) => code.toLowerCase().indexOf(filterValue) === 0);
  }

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.authService.getInfoPersonal(this.userId);
    this.infosSub = this.authService
      .getInfoUpdateListener()
      .subscribe((infos: AuthDataInfo[]) => {
        this.infos = infos;
        console.log('infos', this.infos);
      });
    this.form = new FormGroup({
      showCase: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType],
      }),
      profilePic: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType],
      }),
    });
  }
  clearBio(): void {
    this.bio.setValue('');
    this.authServiceEdit.editUserBio(this.userId, this.bio.value);
    this.snackBar.open('Bio cleared!', 'Nice!', {
      duration: 2000,
    });
  }
  clearMajor(): void {
    this.major.setValue('');
    this.authServiceEdit.editUserMajor(this.userId, this.major.value);
    this.snackBar.open('Major cleared!', 'Nice!', {
      duration: 2000,
    });
  }
  clearMinor(): void {
    this.minor.setValue('');
    this.authServiceEdit.editUserMinor(this.userId, this.minor.value);
    this.snackBar.open('Minor cleared!', 'Nice!', {
      duration: 2000,
    });
  }
  clearSport(): void {
    this.sport.setValue('');
    this.authServiceEdit.editUserSport(this.userId, this.sport.value);
    this.snackBar.open('Sport cleared!', 'Nice!', {
      duration: 2000,
    });
  }
  clearClub(): void {
    this.club.setValue('');
    console.log('brain2', this.club.value);
    this.authServiceEdit.editUserClub(this.userId, this.club.value);
    this.snackBar.open('Club cleared!', 'Nice!', {
      duration: 2000,
    });
  }

  clearName(): void {
    this.name.setValue('');
    this.authServiceEdit.editUserName(this.userId, this.name.value);
    this.snackBar.open('Name cleared!', 'Nice!', {
      duration: 2000,
    });
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
    document.getElementById('firstP').removeAttribute('src');
  }

  onDelete(postId: string): any {
    this.postService.deletePost(postId);
  }

  onSubmit(): void {
    // console.log(this.editForm.value);
    // TODO: convert form fields to Profile
    this.authService.editUserInfo(
      this.userId,
      this.name.value,
      this.bio.value,
      this.gender.value,
      this.birthday.value,
      this.major.value,
      this.minor.value,
      this.sport.value,
      this.club.value,
      this.pronoun.value,
      this.form.get('profilePic').value
      // this.cropImgPreview,
      // this.showCase.value
    );

    console.log('uncropped image', this.form.get('profilePic').value);
    // TODO: replace null with Profile object
    // this.storeService.setProfile(profile);
  }
  onSubmitShowCase(): any {
    this.showCaseService.addShowCase(this.form.get('showCase').value);
  }
}

// Complete 1

@Component({
  selector: 'app-complete1',
  templateUrl: './edit-ProfileComp1.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComp1Component implements OnInit {
  userId: string;
  infos: AuthDataInfo[] = [];
  classes: string[] = [];
  @ViewChild('codeInput') codeInput: ElementRef<HTMLInputElement>;

  filteredCodes: Observable<string[]>;
  FilteredCodes: string[] = this.classListService.allClasses().slice();
  private infosSub: Subscription;
  // CodeCompleted 1-40X
  public CodeCompletedLength = new BehaviorSubject(0);
  CodeCompleted: FormControl = new FormControl('');
  CodeCompleted2: FormControl = new FormControl('');
  CodeCompleted3: FormControl = new FormControl('');
  CodeCompleted4: FormControl = new FormControl('');
  CodeCompleted5: FormControl = new FormControl('');

  constructor(
    private snackBar: MatSnackBar,
    public authService: AuthService,
    public authServiceEditCourse: AuthServiceEditCourse,

    public classListService: ClassListService
  ) {}
  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.authService.getInfoPersonal(this.userId);
    this.infosSub = this.authService
      .getInfoUpdateListener()
      .subscribe((infos: AuthDataInfo[]) => {
        this.infos = infos;
        console.log('infos', this.infos);
      });
    this.CodeCompleted.valueChanges.subscribe((v) =>
      this.CodeCompletedLength.next(v.length)
    );
  }
  // clear course
  clearCode1(): void {
    this.CodeCompleted.setValue('');
    this.authServiceEditCourse.editUserCourse(
      this.userId,
      this.CodeCompleted.value
    );
    this.snackBar.open('Course cleared!', 'Nice!', {
      duration: 2000,
    });
  }
  clearCode2(): void {
    this.CodeCompleted2.setValue('');
    this.authServiceEditCourse.editUserCourse2(
      this.userId,
      this.CodeCompleted2.value
    );
    this.snackBar.open('Course cleared!', 'Nice!', {
      duration: 2000,
    });
  }
  clearCode3(): void {
    this.CodeCompleted3.setValue('');
    this.authServiceEditCourse.editUserCourse3(
      this.userId,
      this.CodeCompleted3.value
    );
    this.snackBar.open('Course cleared!', 'Nice!', {
      duration: 2000,
    });
  }
  clearCode4(): void {
    this.CodeCompleted.setValue('');
    this.authServiceEditCourse.editUserCourse4(
      this.userId,
      this.CodeCompleted4.value
    );
    this.snackBar.open('Course cleared!', 'Nice!', {
      duration: 2000,
    });
  }
  clearCode5(): void {
    this.CodeCompleted.setValue('');
    this.authServiceEditCourse.editUserCourse5(
      this.userId,
      this.CodeCompleted5.value
    );
    this.snackBar.open('Course cleared!', 'Nice!', {
      duration: 2000,
    });
  }

  onSubmit(): void {
    console.log('1', this.CodeCompleted.value);
    console.log('2', this.CodeCompleted2.value);
    console.log('3', this.CodeCompleted3.value);
    console.log('4', this.CodeCompleted4.value);
    console.log('5', this.CodeCompleted5.value);

    this.authService.editUserInfoComp(
      this.userId,
      this.CodeCompleted.value,
      this.CodeCompleted2.value,
      this.CodeCompleted3.value,
      this.CodeCompleted4.value,
      this.CodeCompleted5.value
    );
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
  remove(code: string): void {
    const index = this.classes.indexOf(code);
    if (index >= 0) {
      this.classes.splice(index, 1);
    }
  }

  // Completed Classes
  selected(event: MatAutocompleteSelectedEvent): void {
    this.classes.push(event.option.viewValue);
    this.codeInput.nativeElement.value = '';
    // this.CodeCompleted.setValue();
  }
}
@Component({
  selector: 'app-complete1w',
  templateUrl: './edit-ProfileComp1W.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComp1WComponent implements OnInit {
  userId: string;
  infos: AuthDataInfo[] = [];
  classes: string[] = [];
  @ViewChild('codeInput') codeInput: ElementRef<HTMLInputElement>;

  filteredCodes: Observable<string[]>;
  FilteredCodes: string[] = this.classListService.allClasses().slice();
  private infosSub: Subscription;
  // CodeCompleted 1-40X
  public CodeCompleted6Length = new BehaviorSubject(0);
  CodeCompleted6: FormControl = new FormControl('');
  CodeCompleted7: FormControl = new FormControl('');
  CodeCompleted8: FormControl = new FormControl('');
  CodeCompleted9: FormControl = new FormControl('');
  CodeCompleted10: FormControl = new FormControl('');
  constructor(
    private snackBar: MatSnackBar,
    public authService: AuthService,
    public authServiceEditCourse: AuthServiceEditCourse,
    public classListService: ClassListService
  ) {}
  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.authService.getInfoPersonal(this.userId);
    this.infosSub = this.authService
      .getInfoUpdateListener()
      .subscribe((infos: AuthDataInfo[]) => {
        this.infos = infos;
        console.log('infos', this.infos);
      });
    this.CodeCompleted6.valueChanges.subscribe((v) =>
      this.CodeCompleted6Length.next(v.length)
    );
  }
  // clear course

  clearCode6(): void {
    this.CodeCompleted6.setValue('');
    this.authServiceEditCourse.editUserCourse6(
      this.userId,
      this.CodeCompleted6.value
    );
    this.snackBar.open('Course cleared!', 'Nice!', {
      duration: 2000,
    });
  }
  clearCode7(): void {
    this.CodeCompleted7.setValue('');
    this.authServiceEditCourse.editUserCourse7(
      this.userId,
      this.CodeCompleted7.value
    );
    this.snackBar.open('Course cleared!', 'Nice!', {
      duration: 2000,
    });
  }
  clearCode8(): void {
    this.CodeCompleted8.setValue('');
    this.authServiceEditCourse.editUserCourse8(
      this.userId,
      this.CodeCompleted8.value
    );
    this.snackBar.open('Course cleared!', 'Nice!', {
      duration: 2000,
    });
  }
  clearCode9(): void {
    this.CodeCompleted9.setValue('');
    this.authServiceEditCourse.editUserCourse9(
      this.userId,
      this.CodeCompleted9.value
    );
    this.snackBar.open('Course cleared!', 'Nice!', {
      duration: 2000,
    });
  }
  clearCode10(): void {
    this.CodeCompleted10.setValue('');
    this.authServiceEditCourse.editUserCourse10(
      this.userId,
      this.CodeCompleted10.value
    );
    this.snackBar.open('Course cleared!', 'Nice!', {
      duration: 2000,
    });
  }

  onSubmit(): void {
    // console.log(this.editForm.value);
    // TODO: convert form fields to Profile
    this.authService.editUserInfoCompW(
      this.userId,
      this.CodeCompleted6.value,
      this.CodeCompleted7.value,
      this.CodeCompleted8.value,
      this.CodeCompleted9.value,
      this.CodeCompleted10.value
    );
  }
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our course code
    if (value) {
      this.classes.push(value);
    }
  }
  remove(code: string): void {
    const index = this.classes.indexOf(code);
    if (index >= 0) {
      this.classes.splice(index, 1);
    }
  }

  // Completed Classes
  selected(event: MatAutocompleteSelectedEvent): void {
    this.classes.push(event.option.viewValue);
    this.codeInput.nativeElement.value = '';
    // this.CodeCompleted.setValue();
  }
}

// Complete 2

@Component({
  selector: 'app-complete2',
  templateUrl: './edit-ProfileComp2.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComp2Component implements OnInit {
  userId: string;
  infos: AuthDataInfo[] = [];
  filteredCodes: Observable<string[]>;
  FilteredCodes: string[] = this.classListService.allClasses().slice();
  private infosSub: Subscription;
  classes: string[] = [];
  @ViewChild('codeInput') codeInput: ElementRef<HTMLInputElement>;
  public CodeCompleted11Length = new BehaviorSubject(0);
  CodeCompleted11: FormControl = new FormControl('');
  CodeCompleted12: FormControl = new FormControl('');
  CodeCompleted13: FormControl = new FormControl('');
  CodeCompleted14: FormControl = new FormControl('');
  CodeCompleted15: FormControl = new FormControl('');

  constructor(
    private snackBar: MatSnackBar,
    public authService: AuthService,
    public authServiceEditCourse: AuthServiceEditCourse,
    public classListService: ClassListService
  ) {}
  ngOnInit(): any {
    this.userId = this.authService.getUserId();
    this.authService.getInfoPersonal(this.userId);
    this.infosSub = this.authService
      .getInfoUpdateListener()
      .subscribe((infos: AuthDataInfo[]) => {
        this.infos = infos;
        console.log('infos', this.infos);
      });
    this.CodeCompleted11.valueChanges.subscribe((v) =>
      this.CodeCompleted11Length.next(v.length)
    );
  }
  clearCode11(): void {
    this.CodeCompleted11.setValue('');
    this.authServiceEditCourse.editUserCourse11(
      this.userId,
      this.CodeCompleted11.value
    );
    this.snackBar.open('Course cleared!', 'Nice!', {
      duration: 2000,
    });
  }
  clearCode12(): void {
    this.CodeCompleted12.setValue('');
    this.authServiceEditCourse.editUserCourse12(
      this.userId,
      this.CodeCompleted12.value
    );
    this.snackBar.open('Course cleared!', 'Nice!', {
      duration: 2000,
    });
  }
  clearCode13(): void {
    this.CodeCompleted13.setValue('');
    this.authServiceEditCourse.editUserCourse13(
      this.userId,
      this.CodeCompleted13.value
    );
    this.snackBar.open('Course cleared!', 'Nice!', {
      duration: 2000,
    });
  }
  clearCode14(): void {
    this.CodeCompleted14.setValue('');
    this.authServiceEditCourse.editUserCourse14(
      this.userId,
      this.CodeCompleted14.value
    );
    this.snackBar.open('Course cleared!', 'Nice!', {
      duration: 2000,
    });
  }
  clearCode15(): void {
    this.CodeCompleted15.setValue('');
    this.authServiceEditCourse.editUserCourse15(
      this.userId,
      this.CodeCompleted15.value
    );
    this.snackBar.open('Course cleared!', 'Nice!', {
      duration: 2000,
    });
  }
  onSubmit(): void {
    this.authService.editUserInfoComp2(
      this.userId,
      this.CodeCompleted11.value,
      this.CodeCompleted12.value,
      this.CodeCompleted13.value,
      this.CodeCompleted14.value,
      this.CodeCompleted15.value
    );
  }
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our course code
    if (value) {
      this.classes.push(value);
    }

    // Clear the input value
    // event.chipInput!.clear();
  }
  remove(code: string): void {
    const index = this.classes.indexOf(code);
    if (index >= 0) {
      this.classes.splice(index, 1);
    }
  }

  // Completed Classes
  selected(event: MatAutocompleteSelectedEvent): void {
    this.classes.push(event.option.viewValue);
    this.codeInput.nativeElement.value = '';
    // this.CodeCompleted.setValue();
  }
}
// Complete 2W

@Component({
  selector: 'app-complete2w',
  templateUrl: './edit-ProfileComp2W.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComp2WComponent implements OnInit {
  userId: string;
  infos: AuthDataInfo[] = [];
  filteredCodes: Observable<string[]>;
  FilteredCodes: string[] = this.classListService.allClasses().slice();
  classes: string[] = [];
  @ViewChild('codeInput') codeInput: ElementRef<HTMLInputElement>;

  private infosSub: Subscription;
  public CodeCompleted16Length = new BehaviorSubject(0);
  CodeCompleted16: FormControl = new FormControl('');
  CodeCompleted17: FormControl = new FormControl('');
  CodeCompleted18: FormControl = new FormControl('');
  CodeCompleted19: FormControl = new FormControl('');
  CodeCompleted20: FormControl = new FormControl('');
  constructor(
    private snackBar: MatSnackBar,
    public authService: AuthService,
    public authServiceEditCourse: AuthServiceEditCourse,
    public classListService: ClassListService
  ) {}
  ngOnInit(): any {
    this.userId = this.authService.getUserId();
    this.authService.getInfoPersonal(this.userId);
    this.infosSub = this.authService
      .getInfoUpdateListener()
      .subscribe((infos: AuthDataInfo[]) => {
        this.infos = infos;
        console.log('infos', this.infos);
      });
    this.CodeCompleted16.valueChanges.subscribe((v) =>
      this.CodeCompleted16Length.next(v.length)
    );
  }
  clearCode16(): void {
    this.CodeCompleted16.setValue('');
    this.authServiceEditCourse.editUserCourse16(
      this.userId,
      this.CodeCompleted16.value
    );
    this.snackBar.open('Course cleared!', 'Nice!', {
      duration: 2000,
    });
  }
  clearCode17(): void {
    this.CodeCompleted17.setValue('');
    this.authServiceEditCourse.editUserCourse17(
      this.userId,
      this.CodeCompleted17.value
    );
    this.snackBar.open('Course cleared!', 'Nice!', {
      duration: 2000,
    });
  }
  clearCode18(): void {
    this.CodeCompleted18.setValue('');
    this.authServiceEditCourse.editUserCourse18(
      this.userId,
      this.CodeCompleted18.value
    );
    this.snackBar.open('Course cleared!', 'Nice!', {
      duration: 2000,
    });
  }
  clearCode19(): void {
    this.CodeCompleted19.setValue('');
    this.authServiceEditCourse.editUserCourse19(
      this.userId,
      this.CodeCompleted19.value
    );
    this.snackBar.open('Course cleared!', 'Nice!', {
      duration: 2000,
    });
  }
  clearCode20(): void {
    this.CodeCompleted20.setValue('');
    this.authServiceEditCourse.editUserCourse20(
      this.userId,
      this.CodeCompleted20.value
    );
    this.snackBar.open('Course cleared!', 'Nice!', {
      duration: 2000,
    });
  }
  onSubmit(): void {
    this.authService.editUserInfoComp2W(
      this.userId,
      this.CodeCompleted16.value,
      this.CodeCompleted17.value,
      this.CodeCompleted18.value,
      this.CodeCompleted19.value,
      this.CodeCompleted20.value
    );
  }
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our course code
    if (value) {
      this.classes.push(value);
    }

    // Clear the input value
    // event.chipInput!.clear();
  }
  remove(code: string): void {
    const index = this.classes.indexOf(code);
    if (index >= 0) {
      this.classes.splice(index, 1);
    }
  }

  // Completed Classes
  selected(event: MatAutocompleteSelectedEvent): void {
    this.classes.push(event.option.viewValue);
    this.codeInput.nativeElement.value = '';
    // this.CodeCompleted.setValue();
  }
}
// Complete 3
@Component({
  selector: 'app-complete3',
  templateUrl: './edit-ProfileComp3.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComp3Component implements OnInit {
  userId: string;
  infos: AuthDataInfo[] = [];
  filteredCodes: Observable<string[]>;
  FilteredCodes: string[] = this.classListService.allClasses().slice();
  private infosSub: Subscription;
  classes: string[] = [];
  @ViewChild('codeInput') codeInput: ElementRef<HTMLInputElement>;
  public CodeCompleted21Length = new BehaviorSubject(0);
  CodeCompleted21: FormControl = new FormControl('');
  CodeCompleted22: FormControl = new FormControl('');
  CodeCompleted23: FormControl = new FormControl('');
  CodeCompleted24: FormControl = new FormControl('');
  CodeCompleted25: FormControl = new FormControl('');

  constructor(
    private snackBar: MatSnackBar,
    public authService: AuthService,
    public authServiceEditCourse: AuthServiceEditCourse,
    public classListService: ClassListService
  ) {}
  ngOnInit(): any {
    this.userId = this.authService.getUserId();
    this.authService.getInfoPersonal(this.userId);
    this.infosSub = this.authService
      .getInfoUpdateListener()
      .subscribe((infos: AuthDataInfo[]) => {
        this.infos = infos;
        console.log('infos', this.infos);
      });
    this.CodeCompleted21.valueChanges.subscribe((v) =>
      this.CodeCompleted21Length.next(v.length)
    );
  }
  clearCode21(): void {
    this.CodeCompleted21.setValue('');
    this.authServiceEditCourse.editUserCourse21(
      this.userId,
      this.CodeCompleted21.value
    );
    this.snackBar.open('Course cleared!', 'Nice!', {
      duration: 2000,
    });
  }
  clearCode22(): void {
    this.CodeCompleted22.setValue('');
    this.authServiceEditCourse.editUserCourse22(
      this.userId,
      this.CodeCompleted22.value
    );
    this.snackBar.open('Course cleared!', 'Nice!', {
      duration: 2000,
    });
  }
  clearCode23(): void {
    this.CodeCompleted23.setValue('');
    this.authServiceEditCourse.editUserCourse23(
      this.userId,
      this.CodeCompleted23.value
    );
    this.snackBar.open('Course cleared!', 'Nice!', {
      duration: 2000,
    });
  }
  clearCode24(): void {
    this.CodeCompleted24.setValue('');
    this.authServiceEditCourse.editUserCourse24(
      this.userId,
      this.CodeCompleted24.value
    );
    this.snackBar.open('Course cleared!', 'Nice!', {
      duration: 2000,
    });
  }
  clearCode25(): void {
    this.CodeCompleted25.setValue('');
    this.authServiceEditCourse.editUserCourse25(
      this.userId,
      this.CodeCompleted25.value
    );
    this.snackBar.open('Course cleared!', 'Nice!', {
      duration: 2000,
    });
  }
  onSubmit(): void {
    this.authService.editUserInfoComp3(
      this.userId,
      this.CodeCompleted21.value,
      this.CodeCompleted22.value,
      this.CodeCompleted23.value,
      this.CodeCompleted24.value,
      this.CodeCompleted25.value
    );
  }
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our course code
    if (value) {
      this.classes.push(value);
    }

    // Clear the input value
    // event.chipInput!.clear();
  }
  remove(code: string): void {
    const index = this.classes.indexOf(code);
    if (index >= 0) {
      this.classes.splice(index, 1);
    }
  }

  // Completed Classes
  selected(event: MatAutocompleteSelectedEvent): void {
    this.classes.push(event.option.viewValue);
    this.codeInput.nativeElement.value = '';
    // this.CodeCompleted.setValue();
  }
}
// Complete 3W
@Component({
  selector: 'app-complete3w',
  templateUrl: './edit-ProfileComp3W.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComp3WComponent implements OnInit {
  userId: string;
  infos: AuthDataInfo[] = [];
  filteredCodes: Observable<string[]>;
  FilteredCodes: string[] = this.classListService.allClasses().slice();
  private infosSub: Subscription;
  classes: string[] = [];
  @ViewChild('codeInput') codeInput: ElementRef<HTMLInputElement>;
  public CodeCompleted26Length = new BehaviorSubject(0);
  CodeCompleted26: FormControl = new FormControl('');
  CodeCompleted27: FormControl = new FormControl('');
  CodeCompleted28: FormControl = new FormControl('');
  CodeCompleted29: FormControl = new FormControl('');
  CodeCompleted30: FormControl = new FormControl('');
  constructor(
    private snackBar: MatSnackBar,
    public authService: AuthService,
    public authServiceEditCourse: AuthServiceEditCourse,
    public classListService: ClassListService
  ) {}
  ngOnInit(): any {
    this.userId = this.authService.getUserId();
    this.authService.getInfoPersonal(this.userId);
    this.infosSub = this.authService
      .getInfoUpdateListener()
      .subscribe((infos: AuthDataInfo[]) => {
        this.infos = infos;
        console.log('infos', this.infos);
      });
    this.CodeCompleted26.valueChanges.subscribe((v) =>
      this.CodeCompleted26Length.next(v.length)
    );
  }
  clearCode26(): void {
    this.CodeCompleted26.setValue('');
    this.authServiceEditCourse.editUserCourse26(
      this.userId,
      this.CodeCompleted26.value
    );
    this.snackBar.open('Course cleared!', 'Nice!', {
      duration: 2000,
    });
  }
  clearCode27(): void {
    this.CodeCompleted27.setValue('');
    this.authServiceEditCourse.editUserCourse27(
      this.userId,
      this.CodeCompleted27.value
    );
    this.snackBar.open('Course cleared!', 'Nice!', {
      duration: 2000,
    });
  }
  clearCode28(): void {
    this.CodeCompleted28.setValue('');
    this.authServiceEditCourse.editUserCourse28(
      this.userId,
      this.CodeCompleted28.value
    );
    this.snackBar.open('Course cleared!', 'Nice!', {
      duration: 2000,
    });
  }
  clearCode29(): void {
    this.CodeCompleted29.setValue('');
    this.authServiceEditCourse.editUserCourse29(
      this.userId,
      this.CodeCompleted29.value
    );
    this.snackBar.open('Course cleared!', 'Nice!', {
      duration: 2000,
    });
  }
  clearCode30(): void {
    this.CodeCompleted30.setValue('');
    this.authServiceEditCourse.editUserCourse30(
      this.userId,
      this.CodeCompleted30.value
    );
    this.snackBar.open('Course cleared!', 'Nice!', {
      duration: 2000,
    });
  }
  onSubmit(): void {
    this.authService.editUserInfoComp3W(
      this.userId,
      this.CodeCompleted26.value,
      this.CodeCompleted27.value,
      this.CodeCompleted28.value,
      this.CodeCompleted29.value,
      this.CodeCompleted30.value
    );
  }
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our course code
    if (value) {
      this.classes.push(value);
    }

    // Clear the input value
    // event.chipInput!.clear();
  }
  remove(code: string): void {
    const index = this.classes.indexOf(code);
    if (index >= 0) {
      this.classes.splice(index, 1);
    }
  }

  // Completed Classes
  selected(event: MatAutocompleteSelectedEvent): void {
    this.classes.push(event.option.viewValue);
    this.codeInput.nativeElement.value = '';
    // this.CodeCompleted.setValue();
  }
}
// Complete 4

@Component({
  selector: 'app-complete4',
  templateUrl: './edit-ProfileComp4.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComp4Component implements OnInit {
  userId: string;
  infos: AuthDataInfo[] = [];
  filteredCodes: Observable<string[]>;
  FilteredCodes: string[] = this.classListService.allClasses().slice();
  private infosSub: Subscription;
  classes: string[] = [];
  @ViewChild('codeInput') codeInput: ElementRef<HTMLInputElement>;
  public CodeCompleted31Length = new BehaviorSubject(0);
  CodeCompleted31: FormControl = new FormControl('');
  CodeCompleted32: FormControl = new FormControl('');
  CodeCompleted33: FormControl = new FormControl('');
  CodeCompleted34: FormControl = new FormControl('');
  CodeCompleted35: FormControl = new FormControl('');

  constructor(
    private snackBar: MatSnackBar,
    public authService: AuthService,
    public authServiceEditCourse: AuthServiceEditCourse,
    public classListService: ClassListService
  ) {}
  ngOnInit(): any {
    this.userId = this.authService.getUserId();
    this.authService.getInfoPersonal(this.userId);
    this.infosSub = this.authService
      .getInfoUpdateListener()
      .subscribe((infos: AuthDataInfo[]) => {
        this.infos = infos;
        console.log('infos', this.infos);
      });
    this.CodeCompleted31.valueChanges.subscribe((v) =>
      this.CodeCompleted31Length.next(v.length)
    );
  }
  clearCode31(): void {
    this.CodeCompleted31.setValue('');
    this.authServiceEditCourse.editUserCourse31(
      this.userId,
      this.CodeCompleted31.value
    );
    this.snackBar.open('Course cleared!', 'Nice!', {
      duration: 2000,
    });
  }
  clearCode32(): void {
    this.CodeCompleted32.setValue('');
    this.authServiceEditCourse.editUserCourse32(
      this.userId,
      this.CodeCompleted32.value
    );
    this.snackBar.open('Course cleared!', 'Nice!', {
      duration: 2000,
    });
  }
  clearCode33(): void {
    this.CodeCompleted33.setValue('');
    this.authServiceEditCourse.editUserCourse33(
      this.userId,
      this.CodeCompleted33.value
    );
    this.snackBar.open('Course cleared!', 'Nice!', {
      duration: 2000,
    });
  }
  clearCode34(): void {
    this.CodeCompleted34.setValue('');
    this.authServiceEditCourse.editUserCourse34(
      this.userId,
      this.CodeCompleted34.value
    );
    this.snackBar.open('Course cleared!', 'Nice!', {
      duration: 2000,
    });
  }
  clearCode35(): void {
    this.CodeCompleted35.setValue('');
    this.authServiceEditCourse.editUserCourse35(
      this.userId,
      this.CodeCompleted35.value
    );
    this.snackBar.open('Course cleared!', 'Nice!', {
      duration: 2000,
    });
  }
  onSubmit(): void {
    this.authService.editUserInfoComp4(
      this.userId,
      this.CodeCompleted31.value,
      this.CodeCompleted32.value,
      this.CodeCompleted33.value,
      this.CodeCompleted34.value,
      this.CodeCompleted35.value
    );
  }
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our course code
    if (value) {
      this.classes.push(value);
    }

    // Clear the input value
    // event.chipInput!.clear();
  }
  remove(code: string): void {
    const index = this.classes.indexOf(code);
    if (index >= 0) {
      this.classes.splice(index, 1);
    }
  }

  // Completed Classes
  selected(event: MatAutocompleteSelectedEvent): void {
    this.classes.push(event.option.viewValue);
    this.codeInput.nativeElement.value = '';
    // this.CodeCompleted.setValue();
  }
}
@Component({
  selector: 'app-complete4w',
  templateUrl: './edit-ProfileComp4W.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComp4WComponent implements OnInit {
  userId: string;
  infos: AuthDataInfo[] = [];
  filteredCodes: Observable<string[]>;
  FilteredCodes: string[] = this.classListService.allClasses().slice();
  private infosSub: Subscription;
  classes: string[] = [];
  @ViewChild('codeInput') codeInput: ElementRef<HTMLInputElement>;
  public CodeCompleted36Length = new BehaviorSubject(0);
  CodeCompleted36: FormControl = new FormControl('');
  CodeCompleted37: FormControl = new FormControl('');
  CodeCompleted38: FormControl = new FormControl('');
  CodeCompleted39: FormControl = new FormControl('');
  CodeCompleted40: FormControl = new FormControl('');
  CodeCompletedX: FormControl = new FormControl('');
  constructor(
    private snackBar: MatSnackBar,
    public authService: AuthService,
    public authServiceEditCourse: AuthServiceEditCourse,
    public classListService: ClassListService
  ) {}
  ngOnInit(): any {
    this.userId = this.authService.getUserId();
    this.authService.getInfoPersonal(this.userId);
    this.infosSub = this.authService
      .getInfoUpdateListener()
      .subscribe((infos: AuthDataInfo[]) => {
        this.infos = infos;
        console.log('infos', this.infos);
      });
    this.CodeCompleted36.valueChanges.subscribe((v) =>
      this.CodeCompleted36Length.next(v.length)
    );
  }
  clearCode36(): void {
    this.CodeCompleted36.setValue('');
    this.authServiceEditCourse.editUserCourse36(
      this.userId,
      this.CodeCompleted36.value
    );
    this.snackBar.open('Course cleared!', 'Nice!', {
      duration: 2000,
    });
  }
  clearCode37(): void {
    this.CodeCompleted37.setValue('');
    this.authServiceEditCourse.editUserCourse37(
      this.userId,
      this.CodeCompleted37.value
    );
    this.snackBar.open('Course cleared!', 'Nice!', {
      duration: 2000,
    });
  }
  clearCode38(): void {
    this.CodeCompleted38.setValue('');
    this.authServiceEditCourse.editUserCourse38(
      this.userId,
      this.CodeCompleted38.value
    );
    this.snackBar.open('Course cleared!', 'Nice!', {
      duration: 2000,
    });
  }
  clearCode39(): void {
    this.CodeCompleted39.setValue('');
    this.authServiceEditCourse.editUserCourse39(
      this.userId,
      this.CodeCompleted39.value
    );
    this.snackBar.open('Course cleared!', 'Nice!', {
      duration: 2000,
    });
  }
  clearCode40(): void {
    this.CodeCompleted40.setValue('');
    this.authServiceEditCourse.editUserCourse40(
      this.userId,
      this.CodeCompleted40.value
    );
    this.snackBar.open('Course cleared!', 'Nice!', {
      duration: 2000,
    });
  }
  clearCodeX(): void {
    this.CodeCompletedX.setValue('');
    this.authServiceEditCourse.editUserCourseX(
      this.userId,
      this.CodeCompletedX.value
    );
    this.snackBar.open('Course cleared!', 'Nice!', {
      duration: 2000,
    });
  }
  onSubmit(): void {
    this.authService.editUserInfoComp4W(
      this.userId,

      this.CodeCompleted36.value,
      this.CodeCompleted37.value,
      this.CodeCompleted38.value,
      this.CodeCompleted39.value,
      this.CodeCompleted40.value,
      this.CodeCompletedX.value
    );
  }
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our course code
    if (value) {
      this.classes.push(value);
    }

    // Clear the input value
  }
  remove(code: string): void {
    const index = this.classes.indexOf(code);
    if (index >= 0) {
      this.classes.splice(index, 1);
    }
  }

  // Completed Classes
  selected(event: MatAutocompleteSelectedEvent): void {
    this.classes.push(event.option.viewValue);
    this.codeInput.nativeElement.value = '';
    // this.CodeCompleted.setValue();
  }
}

// Pursuing
@Component({
  selector: 'app-pursuing-winter',
  templateUrl: './edit-ProfilePurW.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfilePurWComponent implements OnInit {
  userId: string;
  infos: AuthDataInfo[] = [];
  classesP: string[] = [];
  @ViewChild('codeInputP') codeInputP: ElementRef<HTMLInputElement>;

  private infosSub: Subscription;

  filteredCodesP: Observable<string[]>;
  FilteredCodesP: string[] = this.classListService.allClasses().slice();
  public CodePursuing6Length = new BehaviorSubject(0);
  CodePursuing6: FormControl = new FormControl('');
  CodePursuing7: FormControl = new FormControl('');
  CodePursuing8: FormControl = new FormControl('');
  CodePursuing9: FormControl = new FormControl('');
  CodePursuing10: FormControl = new FormControl('');

  constructor(
    public authService: AuthService,
    public authServiceEditNext: AuthServiceEditNext,
    private snackBar: MatSnackBar,
    public classListService: ClassListService
  ) {}

  ngOnInit(): any {
    this.userId = this.authService.getUserId();
    this.authService.getInfoPersonal(this.userId);
    this.infosSub = this.authService
      .getInfoUpdateListener()
      .subscribe((infos: AuthDataInfo[]) => {
        this.infos = infos;
        console.log('infos', this.infos);
      });
    this.CodePursuing6.valueChanges.subscribe((v) =>
      this.CodePursuing6Length.next(v.length)
    );
  }
  clearNext6(): void {
    this.CodePursuing6.setValue('');
    this.authServiceEditNext.editUserNext6(
      this.userId,
      this.CodePursuing6.value
    );
    this.snackBar.open('Course cleared!', 'Nice!', {
      duration: 2000,
    });
  }
  clearNext7(): void {
    this.CodePursuing7.setValue('');
    this.authServiceEditNext.editUserNext7(
      this.userId,
      this.CodePursuing7.value
    );
    this.snackBar.open('Course cleared!', 'Nice!', {
      duration: 2000,
    });
  }
  clearNext8(): void {
    this.CodePursuing8.setValue('');
    this.authServiceEditNext.editUserNext8(
      this.userId,
      this.CodePursuing8.value
    );
    this.snackBar.open('Course cleared!', 'Nice!', {
      duration: 2000,
    });
  }
  clearNext9(): void {
    this.CodePursuing9.setValue('');
    this.authServiceEditNext.editUserNext9(
      this.userId,
      this.CodePursuing9.value
    );
    this.snackBar.open('Course cleared!', 'Nice!', {
      duration: 2000,
    });
  }
  clearNext10(): void {
    this.CodePursuing10.setValue('');
    this.authServiceEditNext.editUserNext10(
      this.userId,
      this.CodePursuing10.value
    );
    this.snackBar.open('Course cleared!', 'Nice!', {
      duration: 2000,
    });
  }
  save6(): void {
    this.authService.editUserInfoPurW6(this.userId, this.CodePursuing6.value);
    this.snackBar.open('Course Saved', 'Nice!', {
      duration: 2000,
    });
  }
  save7(): void {
    this.authService.editUserInfoPurW7(this.userId, this.CodePursuing7.value);
    this.snackBar.open('Course Saved', 'Nice!', {
      duration: 2000,
    });
  }
  save8(): void {
    this.authService.editUserInfoPurW8(this.userId, this.CodePursuing8.value);
    this.snackBar.open('Course Saved', 'Nice!', {
      duration: 2000,
    });
  }
  save9(): void {
    this.authService.editUserInfoPurW9(this.userId, this.CodePursuing9.value);
    this.snackBar.open('Course Saved', 'Nice!', {
      duration: 2000,
    });
  }
  save10(): void {
    this.authService.editUserInfoPurW10(this.userId, this.CodePursuing10.value);
    this.snackBar.open('Course Saved', 'Nice!', {
      duration: 2000,
    });
  }
  // onSubmit(): void {
  //   // console.log(this.editForm.value);
  //   // TODO: convert form fields to Profile
  //   this.authService.editUserInfoPurW(
  //     this.userId,
  //     this.CodePursuing6.value,
  //     this.CodePursuing7.value,
  //     this.CodePursuing8.value,
  //     this.CodePursuing9.value,
  //     this.CodePursuing10.value
  //   );
  // }

  removeP(codeP: string): void {
    const indexP = this.classesP.indexOf(codeP);
    if (indexP >= 0) {
      this.classesP.splice(indexP, 1);
    }
  }
  // Pursuing Classes
  selectedP(event: MatAutocompleteSelectedEvent): void {
    this.classesP.push(event.option.viewValue);
    this.codeInputP.nativeElement.value = '';
    // this.CodePursuing.setValue('');
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
  }
}

// Pursuing
@Component({
  selector: 'app-pursuing-spring',
  templateUrl: './edit-ProfilePurSpring.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfilePurSpringComponent implements OnInit {
  userId: string;
  infos: AuthDataInfo[] = [];
  classesP: string[] = [];
  @ViewChild('codeInputP') codeInputP: ElementRef<HTMLInputElement>;

  private infosSub: Subscription;

  filteredCodesP: Observable<string[]>;
  FilteredCodesP: string[] = this.classListService.allClasses().slice();
  public CodePursuing11Length = new BehaviorSubject(0);
  CodePursuing11: FormControl = new FormControl('');
  CodePursuing12: FormControl = new FormControl('');
  constructor(
    public authService: AuthService,
    public authServiceEditNext: AuthServiceEditNext,
    private snackBar: MatSnackBar,
    public classListService: ClassListService
  ) {}

  ngOnInit(): any {
    this.userId = this.authService.getUserId();
    this.authService.getInfoPersonal(this.userId);
    this.infosSub = this.authService
      .getInfoUpdateListener()
      .subscribe((infos: AuthDataInfo[]) => {
        this.infos = infos;
        console.log('infos', this.infos);
      });
    this.CodePursuing11.valueChanges.subscribe((v) =>
      this.CodePursuing11Length.next(v.length)
    );
  }
  clearNext11(): void {
    this.CodePursuing11.setValue('');
    this.authServiceEditNext.editUserNext11(
      this.userId,
      this.CodePursuing11.value
    );
    this.snackBar.open('Course cleared!', 'Nice!', {
      duration: 2000,
    });
  }
  clearNext12(): void {
    this.CodePursuing12.setValue('');
    this.authServiceEditNext.editUserNext12(
      this.userId,
      this.CodePursuing12.value
    );
    this.snackBar.open('Course cleared!', 'Nice!', {
      duration: 2000,
    });
  }
  onSubmit(): void {
    // console.log(this.editForm.value);
    // TODO: convert form fields to Profile
    this.authService.editUserInfoPurSp(
      this.userId,
      this.CodePursuing11.value,
      this.CodePursuing12.value
    );
  }

  removeP(codeP: string): void {
    const indexP = this.classesP.indexOf(codeP);
    if (indexP >= 0) {
      this.classesP.splice(indexP, 1);
    }
  }
  // Pursuing Classes
  selectedP(event: MatAutocompleteSelectedEvent): void {
    this.classesP.push(event.option.viewValue);
    this.codeInputP.nativeElement.value = '';
    // this.CodePursuing.setValue('');
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
  }
}
// Pursuing
@Component({
  selector: 'app-pursuing-summer',
  templateUrl: './edit-ProfilePurSummer.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfilePurSummerComponent implements OnInit {
  userId: string;
  infos: AuthDataInfo[] = [];
  classesP: string[] = [];
  @ViewChild('codeInputP') codeInputP: ElementRef<HTMLInputElement>;

  private infosSub: Subscription;

  filteredCodesP: Observable<string[]>;
  FilteredCodesP: string[] = this.classListService.allClasses().slice();
  public CodePursuing13Length = new BehaviorSubject(0);
  CodePursuing13: FormControl = new FormControl('');
  CodePursuing14: FormControl = new FormControl('');
  constructor(
    public authService: AuthService,
    public authServiceEditNext: AuthServiceEditNext,
    private snackBar: MatSnackBar,
    public classListService: ClassListService
  ) {}

  ngOnInit(): any {
    this.userId = this.authService.getUserId();
    this.authService.getInfoPersonal(this.userId);
    this.infosSub = this.authService
      .getInfoUpdateListener()
      .subscribe((infos: AuthDataInfo[]) => {
        this.infos = infos;
        console.log('infos', this.infos);
      });
    this.CodePursuing13.valueChanges.subscribe((v) =>
      this.CodePursuing13Length.next(v.length)
    );
  }
  clearNext13(): void {
    this.CodePursuing13.setValue('');
    this.authServiceEditNext.editUserNext13(
      this.userId,
      this.CodePursuing13.value
    );
    this.snackBar.open('Course cleared!', 'Nice!', {
      duration: 2000,
    });
  }
  clearNext14(): void {
    this.CodePursuing14.setValue('');
    this.authServiceEditNext.editUserNext14(
      this.userId,
      this.CodePursuing14.value
    );
    this.snackBar.open('Course cleared!', 'Nice!', {
      duration: 2000,
    });
  }
  onSubmit(): void {
    // console.log(this.editForm.value);
    // TODO: convert form fields to Profile
    this.authService.editUserInfoPurSu(
      this.userId,
      this.CodePursuing13.value,
      this.CodePursuing14.value
    );
  }

  removeP(codeP: string): void {
    const indexP = this.classesP.indexOf(codeP);
    if (indexP >= 0) {
      this.classesP.splice(indexP, 1);
    }
  }
  // Pursuing Classes
  selectedP(event: MatAutocompleteSelectedEvent): void {
    this.classesP.push(event.option.viewValue);
    this.codeInputP.nativeElement.value = '';
    // this.CodePursuing.setValue('');
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
  }
}
// /Pursuing
@Component({
  selector: 'app-pursuing',
  templateUrl: './edit-ProfilePur.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfilePurComponent implements OnInit {
  userId: string;
  infos: AuthDataInfo[] = [];
  classesP: string[] = [];
  @ViewChild('codeInputP') codeInputP: ElementRef<HTMLInputElement>;

  private infosSub: Subscription;

  filteredCodesP: Observable<string[]>;
  FilteredCodesP: string[] = this.classListService.allClasses().slice();
  public CodePursuingLength = new BehaviorSubject(0);
  CodePursuing: FormControl = new FormControl('');
  CodePursuing2: FormControl = new FormControl('');
  CodePursuing3: FormControl = new FormControl('');
  CodePursuing4: FormControl = new FormControl('');
  CodePursuing5: FormControl = new FormControl('');
  constructor(
    public authService: AuthService,
    public authServiceEditNext: AuthServiceEditNext,
    private snackBar: MatSnackBar,
    public classListService: ClassListService
  ) {}

  ngOnInit(): any {
    this.userId = this.authService.getUserId();
    this.authService.getInfoPersonal(this.userId);
    this.infosSub = this.authService
      .getInfoUpdateListener()
      .subscribe((infos: AuthDataInfo[]) => {
        this.infos = infos;
        console.log('infos', this.infos);
      });
    this.CodePursuing.valueChanges.subscribe((v) =>
      this.CodePursuingLength.next(v.length)
    );
  }
  clearNext(): void {
    this.CodePursuing.setValue('');
    this.authServiceEditNext.editUserNext(this.userId, this.CodePursuing.value);
    this.snackBar.open('Course cleared!', 'Nice!', {
      duration: 2000,
    });
  }
  clearNext2(): void {
    this.CodePursuing2.setValue('');
    this.authServiceEditNext.editUserNext2(
      this.userId,
      this.CodePursuing2.value
    );
    this.snackBar.open('Course cleared!', 'Nice!', {
      duration: 2000,
    });
  }
  clearNext3(): void {
    this.CodePursuing3.setValue('');
    this.authServiceEditNext.editUserNext3(
      this.userId,
      this.CodePursuing3.value
    );
    this.snackBar.open('Course cleared!', 'Nice!', {
      duration: 2000,
    });
  }
  clearNext4(): void {
    this.CodePursuing4.setValue('');
    this.authServiceEditNext.editUserNext4(
      this.userId,
      this.CodePursuing4.value
    );
    this.snackBar.open('Course cleared!', 'Nice!', {
      duration: 2000,
    });
  }
  clearNext5(): void {
    this.CodePursuing5.setValue('');
    this.authServiceEditNext.editUserNext5(
      this.userId,
      this.CodePursuing5.value
    );
    this.snackBar.open('Course cleared!', 'Nice!', {
      duration: 2000,
    });
  }
  onSubmit(): void {
    // console.log(this.editForm.value);
    // TODO: convert form fields to Profile
    this.authService.editUserInfoPur(
      this.userId,
      this.CodePursuing.value,
      this.CodePursuing2.value,
      this.CodePursuing3.value,
      this.CodePursuing4.value,
      this.CodePursuing5.value
    );
  }

  removeP(codeP: string): void {
    const indexP = this.classesP.indexOf(codeP);
    if (indexP >= 0) {
      this.classesP.splice(indexP, 1);
    }
  }
  // Pursuing Classes
  selectedP(event: MatAutocompleteSelectedEvent): void {
    this.classesP.push(event.option.viewValue);
    this.codeInputP.nativeElement.value = '';
    // this.CodePursuing.setValue('');
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
  }
}

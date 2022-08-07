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
import { Post, PostService } from '../services/post.service';
import { Profile, StoreService } from '../services/store.service';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';
import { AccountTextComponent } from '../signup/signup.component';
import { AuthDataInfo } from '../signup/auth-data.model';
import { ShowCaseService } from '../services/showCase.service';
import { mimeType } from '../post-page/mime-type.validator';

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
  storedPosts: Post[] = [];
  posts: Post[] = [];
  private postsSub: Subscription;

  userId: string;

  infos: AuthDataInfo[] = [];
  private infosSub: Subscription;
  // Showcase
  showCasePreview: any = '';
  url: string;
  urlPP: string;

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
  FilteredCodes: string[] = this.classListService.allClasses().slice();
  FilteredCodesP: string[] = this.classListService.allClasses().slice();

  genders: string[] = [
    '',
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

  pronouns: string[] = [
    '',
    'She/Her',
    'He/His',
    'Ze/Hirs',
    'Ze/Zirs',
    'Xe/Xyr',
  ];

  classes: string[] = [];
  classesP: string[] = [];
  @ViewChild('codeInput') codeInput: ElementRef<HTMLInputElement>;
  @ViewChild('codeInputP') codeInputP: ElementRef<HTMLInputElement>;
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
  // bio: FormControl = new FormControl('');
  // public bioLength = new BehaviorSubject(0);
  name: FormControl = new FormControl('');
  pronoun: FormControl = new FormControl('');
  showCase: FormControl = new FormControl('');
  // removeShowCase: FormControl = new FormControl('');
  birthday: FormControl = new FormControl('');
  gender: FormControl = new FormControl('');
  form: FormGroup;

  // CodeCompleted 1-40X
  CodeCompleted: FormControl = new FormControl('');
  CodeCompleted2: FormControl = new FormControl('');
  CodeCompleted3: FormControl = new FormControl('');
  CodeCompleted4: FormControl = new FormControl('');
  CodeCompleted5: FormControl = new FormControl('');
  CodeCompleted6: FormControl = new FormControl('');
  CodeCompleted7: FormControl = new FormControl('');
  CodeCompleted8: FormControl = new FormControl('');
  CodeCompleted9: FormControl = new FormControl('');
  CodeCompleted10: FormControl = new FormControl('');
  CodeCompleted11: FormControl = new FormControl('');
  CodeCompleted12: FormControl = new FormControl('');
  CodeCompleted13: FormControl = new FormControl('');
  CodeCompleted14: FormControl = new FormControl('');
  CodeCompleted15: FormControl = new FormControl('');
  CodeCompleted16: FormControl = new FormControl('');
  CodeCompleted17: FormControl = new FormControl('');
  CodeCompleted18: FormControl = new FormControl('');
  CodeCompleted19: FormControl = new FormControl('');
  CodeCompleted20: FormControl = new FormControl('');
  CodeCompleted21: FormControl = new FormControl('');
  CodeCompleted22: FormControl = new FormControl('');
  CodeCompleted23: FormControl = new FormControl('');
  CodeCompleted24: FormControl = new FormControl('');
  CodeCompleted25: FormControl = new FormControl('');
  CodeCompleted26: FormControl = new FormControl('');
  CodeCompleted27: FormControl = new FormControl('');
  CodeCompleted28: FormControl = new FormControl('');
  CodeCompleted29: FormControl = new FormControl('');
  CodeCompleted30: FormControl = new FormControl('');
  CodeCompleted31: FormControl = new FormControl('');
  CodeCompleted32: FormControl = new FormControl('');
  CodeCompleted33: FormControl = new FormControl('');
  CodeCompleted34: FormControl = new FormControl('');
  CodeCompleted35: FormControl = new FormControl('');
  CodeCompleted36: FormControl = new FormControl('');
  CodeCompleted37: FormControl = new FormControl('');
  CodeCompleted38: FormControl = new FormControl('');
  CodeCompleted39: FormControl = new FormControl('');
  CodeCompleted40: FormControl = new FormControl('');
  CodeCompletedX: FormControl = new FormControl('');
  // Need to push form controls from the users input, into this
  // Form Array, which gets passed
  CodePursuing: FormControl = new FormControl('');
  CodePursuing2: FormControl = new FormControl('');
  CodePursuing3: FormControl = new FormControl('');
  CodePursuing4: FormControl = new FormControl('');
  CodePursuing5: FormControl = new FormControl('');
  CodePursuing6: FormControl = new FormControl('');
  CodePursuing7: FormControl = new FormControl('');
  CodePursuing8: FormControl = new FormControl('');
  CodePursuing9: FormControl = new FormControl('');
  CodePursuing10: FormControl = new FormControl('');
  CodePursuing11: FormControl = new FormControl('');
  CodePursuing12: FormControl = new FormControl('');

  // Completed = new FormArray({
  //   CodeCompleted
  // })

  editForm = new FormGroup({
    major: this.major,
    minor: this.minor,
    sport: this.sport,
    club: this.club,
    name: this.name,
    pronoun: this.pronoun,
    gender: this.gender,
    birthday: this.birthday,
    // accountType: new FormControl(''),
    profilePic: this.profilePic,
    CodeCompleted: this.CodeCompleted,
    CodePursuing: this.CodePursuing,
    // bio: this.bio,
    // showCase: this.showCase,
  });
  selectedIndex = 0;

  constructor(
    public dialog: MatDialog,
    public classListService: ClassListService,
    private http: HttpClient,
    private storeService: StoreService,
    public authService: AuthService,
    public showCaseService: ShowCaseService,
    public postService: PostService
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
  cropImg(e: ImageCroppedEvent): any {
    this.cropImgPreview = e.base64;
    // let File = base64ToFile(this.cropImgPreview)

    return this.cropImgPreview;
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
    document.getElementById('firstP').removeAttribute('src');
  }

  onDelete(postId: string): any {
    this.postService.deletePost(postId);
  }

  openDialogAccount(): void {
    this.dialog.open(AccountTextComponent);
  }

  onSubmit(): void {
    // console.log(this.editForm.value);
    // TODO: convert form fields to Profile
    this.authService.editUserInfo(
      this.userId,
      this.name.value,
      this.gender.value,
      this.birthday.value,
      this.major.value,
      this.minor.value,
      this.sport.value,
      this.club.value,
      this.pronoun.value,
      this.CodeCompleted.value,
      this.CodeCompleted2.value,
      this.CodeCompleted3.value,
      this.CodeCompleted4.value,
      this.CodeCompleted5.value,
      this.CodeCompleted6.value,
      this.CodeCompleted7.value,
      this.CodeCompleted8.value,
      this.CodeCompleted9.value,
      this.CodeCompleted10.value,
      this.CodeCompleted11.value,
      this.CodeCompleted12.value,
      this.CodeCompleted13.value,
      this.CodeCompleted14.value,
      this.CodeCompleted15.value,
      this.CodeCompleted16.value,
      this.CodeCompleted17.value,
      this.CodeCompleted18.value,
      this.CodeCompleted19.value,
      this.CodeCompleted20.value,
      this.CodeCompleted21.value,
      this.CodeCompleted22.value,
      this.CodeCompleted23.value,
      this.CodeCompleted24.value,
      this.CodeCompleted25.value,
      this.CodeCompleted26.value,
      this.CodeCompleted27.value,
      this.CodeCompleted28.value,
      this.CodeCompleted29.value,
      this.CodeCompleted30.value,
      this.CodeCompleted31.value,
      this.CodeCompleted32.value,
      this.CodeCompleted33.value,
      this.CodeCompleted34.value,
      this.CodeCompleted35.value,
      this.CodeCompleted36.value,
      this.CodeCompleted37.value,
      this.CodeCompleted38.value,
      this.CodeCompleted39.value,
      this.CodeCompleted40.value,
      this.CodeCompletedX.value,

      this.CodePursuing.value,
      this.CodePursuing2.value,
      this.CodePursuing3.value,
      this.CodePursuing4.value,
      this.CodePursuing5.value,
      this.CodePursuing6.value,
      this.CodePursuing7.value,
      this.CodePursuing8.value,
      this.CodePursuing9.value,
      this.CodePursuing10.value,
      this.CodePursuing11.value,
      this.CodePursuing12.value,

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

import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators, AbstractControl, ValidationErrors, NgForm } from '@angular/forms';
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
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { map } from 'rxjs/operators';
import { MatDialog, MatDialogRef  } from '@angular/material/dialog';
import { ClassListService } from '../services/class.service';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
// import { base64ToFile } from '../../utils/blob.utils';
import { ImageCroppedEvent, Dimensions } from 'ngx-image-cropper';
import { Profile, NewUserId, StoreService } from '../services/store.service';
import { mimeType } from '../post-page/mime-type.validator';

import { AuthService } from '../services/auth.service';
import {Courses} from 'nikel';




const moment = _rollupMoment || _moment;
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

// Trimming white space for validators



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})



export class SignupComponent implements OnInit, OnDestroy {
  isLoading = false;
  private authStatusSub: Subscription;
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];



  classes: string[] = [];
  classesP: string[] = [];
  @ViewChild('codeInput') codeInput: ElementRef<HTMLInputElement>;
  @ViewChild('codeInputP') codeInputP: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  @ViewChild('autoP') matAutocompleteP: MatAutocomplete;

  selectedIndex = 0;
  genders: string[] = ['', 'Female', 'Male', 'Other'];

  url: string;


  MatIconModule: any;
  cropImgPreview: any = '';
  imgChangeEvent: any = '';
  // showCropper = false;
  showCasePreview: any = '';

  containWithinAspectRatio = false;
  username: FormControl = new FormControl('', [Validators.pattern('[a-zA-Z0-9_]*'), this.noWhiteSpace]);
  password: FormControl = new FormControl('', this.noWhiteSpace);
  major: FormControl = new FormControl('');
  minor: FormControl = new FormControl('');
  sport: FormControl = new FormControl('');
  club: FormControl = new FormControl('');
  name: FormControl = new FormControl('');
  pronouns: FormControl = new FormControl('');
  birthday: FormControl = new FormControl();
  gender: FormControl = new FormControl('');
  email: FormControl = new FormControl('', [Validators.email, this.noWhiteSpace]);
  termsCheck: FormControl = new FormControl('');
  // PP isn't connected properly i dont think, since image is being cropped then returned as a base 64 value
  CodePursuing: FormControl = new FormControl('');
  filteredCodesP: Observable<string[]>;

  CodeCompleted: FormControl = new FormControl('');
  filteredCodes: Observable<string[]>;


  bio: FormControl = new FormControl('');
  public bioLength = new BehaviorSubject(0);
  public showCaseList = new Subject();


  form: FormGroup;

  requiredForm = new FormGroup({
    email: this.email,
    username: this.username,
    password: this.password,
    accountType: new FormControl(''),
    termsCheck: this.termsCheck,
  });

  personalizeForm = new FormGroup({
    name: this.name,
    username: this.username,
    gender: this.gender,
    pronouns: this.pronouns,
    birthday: this.birthday,
    bio: this.bio,
  });


  signupForm = new FormGroup({
    CodePursuing: this.CodePursuing,
    CodeCompleted: this.CodeCompleted,
    sport: this.sport,
    club: this.club,
    major: this.major,
    minor: this.minor,
    requiredForm: this.requiredForm,
    personalizeForm: this.personalizeForm,
  });

  public noWhiteSpace(control: AbstractControl): ValidationErrors | null {
    if ((control.value as string).indexOf(' ') >= 0){
        return {noWhiteSpace: true};
    }
    return null;
}


  // public trimValidator: ValidatorFn = (email: FormControl) => {
  //   if (email.value.startsWith(' ')) {
  //     return {
  //       trimError: { value: 'Input has leading whitespace' }
  //     };
  //   }
  //   if (email.value.endsWith(' ')) {
  //     return {
  //       trimError: { value: 'Input has trailing whitespace' }
  //     };
  //   }
  //   return null;
  // }
  // using oninput



  // Passes value as base64 string of cropped area!! But where does form controller come into play?
  cropImg(event: ImageCroppedEvent): void {
    this.cropImgPreview = event.base64;
    // console.log(event, base64ToFile(event.base64));
  }

  imgLoad(): void {
    // this.showCropper = true;
    console.log('Image loaded');
  }

  initCropper(sourceImageDimensions: Dimensions): void {
    console.log('Cropper ready', sourceImageDimensions);
  }
  imgFailed(): void {
    console.log('Load failed');
  }
  // Profiel Pic
  imagePreviewP(event: any): void {
    this.imgChangeEvent = event;

    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({profilePic: file});
    this.form.get('profilePic').updateValueAndValidity();

    // if (event.target.files && event.target.files[0]) {
    const reader = new FileReader();
    reader.onload = () => {
        this.url = reader.result as string;
      };
    // reader.onload = (Event: any) => { // called once readAsDataURL is completed
        // console.log(Event);
        // this.cropImgPreview = Event.target.result;
        // this.url = reader.result as string;
      // };
    reader.readAsDataURL(file); // read file as data url
    // }
  }

  // SnapShot
  imagePreview(event: any): void {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({showCase: file});
    this.form.get('showCase').updateValueAndValidity();


    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]); // read file as data url
    reader.onload = (Event: any) => { // called once readAsDataURL is completed
        console.log(Event);
        this.showCasePreview = Event.target.result;
      };
    reader.readAsDataURL(file); // read file as data url

  }

  constructor(
    public dialog: MatDialog,
    public classListService: ClassListService,
    private http: HttpClient,
    private storeService: StoreService,
    public authService: AuthService) {

    // this.filteredCodesP = this.CodePursuing.valueChanges.pipe(
    //   map((code: string | null) =>
    //     code ? this._filter(code) : this.classListService.allClasses().slice()
    //   )
    // );
    // this.filteredCodes = this.CodeCompleted.valueChanges.pipe(
    //   map((codeP: string | null) =>
    //     codeP ? this._filter(codeP) : this.classListService.allClasses().slice()
    //   )
    // );
    // this.filteredCodesP.subscribe((r) => this.CodePursuing);

    // this.filteredCodes.subscribe((r) => this.CodeCompleted);
  }








  uploadFileP(): any {
    document.getElementById('fileInputP').click();
  }
  uploadFile(): any {
    document.getElementById('showCase').click();
  }

  // uploadFile3(): any {
  //   document.getElementById('fileInput3').click();
  // };

  formatLabel(value: number): string {
    if (value >= 100) {
      return Math.round(value / 1) + '+';
    }
  }
  // Pursuing Courses
  add(event: MatChipInputEvent): void {
    const valueP = (event.value || '').trim();

    // Add our course code
    if (valueP) {
      this.classesP.push(valueP);
    }

    // Clear the input value
    // event.chipInput!.clear();

    this.CodePursuing.setValue(null);
  }
  // Completeted Courses
  addP(event: MatChipInputEvent): void {
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
  removeP(codeP: string): void {
    const indexP = this.classesP.indexOf(codeP);
    if (indexP >= 0) {
      this.classesP.splice(indexP, 1);
    }
  }
  // Pursuing Courses
  selectedP(event: MatAutocompleteSelectedEvent): void {
    this.classesP.push(event.option.viewValue);
    this.codeInputP.nativeElement.value = '';
    this.CodePursuing.setValue('');
  }
  // Completed Classes
  selected(event: MatAutocompleteSelectedEvent): void {
    this.classes.push(event.option.viewValue);
    this.codeInput.nativeElement.value = '';
    this.CodeCompleted.setValue('');
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();


    return this.classListService
      .allClasses()
      .filter((code) => code.toLowerCase().indexOf(filterValue) === 0);
  }


  clearUsername(): void {
    this.username.setValue('');
  }

  clearPassword(): void {
    this.password.setValue('');
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

  clearEmail(): void {
    this.email.setValue('');
  }
  clearProfilePic(): void {
    this.form.get('profilePic').setValue('');
    document.getElementById('profilePic').removeAttribute('src');
  }
  // clearPic1(): void {
  //   this.snapShot1.setValue('');
  //   document.getElementById('firstP').removeAttribute('src');
  // }
  clearPic(): void {
    this.form.get('showCase').setValue('');
    document.getElementById('showCase').removeAttribute('src');
  }
  // clearPic3(): void {
  //   this.snapShot3.setValue('');
  //   document.getElementById('thirdP').removeAttribute('src');
  // }

  changeTab1(): void {
    this.selectedIndex = this.selectedIndex === 1 ? 2 : 1;
    this.isLoading = false;
  }
  changeTab1R(): void {
    this.selectedIndex = this.selectedIndex === 1 ? 0 : 1;
  }
  changeTab2(): void {
    this.selectedIndex = this.selectedIndex === 2 ? 3 : 2;
  }
  changeTab2R(): void {
    this.selectedIndex = this.selectedIndex === 2 ? 1 : 2;
  }
  changeTab3(): void {
    this.selectedIndex = this.selectedIndex === 3 ? 2 : 3;
  }

  openDialog(): void {
    this.dialog.open(TermsPopUpComponent);
  }
  openDialogAccount(): void {
    this.dialog.open(AccountTextComponent);
  }

  onSubmit(): any{
//  Email validation to continue
    this.isLoading = true;
    this.authService.createUser(this.email.value, this.username.value, this.password.value);
    this.selectedIndex = this.selectedIndex === 0 ? 1 : 0;
    this.dialog.open(LoginPopUpComponent, { disableClose: true });

  }


  onSubmit2(): any {
    this.isLoading = true;
    this.authService.createUserInfo( this.username.value, this.name.value, this.gender.value, this.birthday.value,
     this.major.value, this.minor.value, this.sport.value, this.club.value, this.pronouns.value,
     this.CodeCompleted.value, this.CodePursuing.value, this.form.get('profilePic').value, this.form.get('showCase').value
      );
  }

  ngOnInit(): void {
   this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
     authStatus => {
       this.isLoading = false;
     }
   );
   this.form = new FormGroup({
    profilePic: new FormControl(null, {
      validators: [Validators.required],
      asyncValidators: [mimeType]
    }),
    showCase: new FormControl(null, {
      validators: [Validators.required],
      asyncValidators: [mimeType]
    })
  });

  }

  ngOnDestroy(): void {
  this.authStatusSub.unsubscribe();
  }



}

@Component({
  selector: 'app-terms-page',
  templateUrl: './terms-popup.component.html',
  styleUrls: ['./terms-popup.component.scss'],
})
export class TermsPopUpComponent { }

@Component({
  selector: 'app-accounttextpage',
  templateUrl: './account-popup.component.html',
  styleUrls: ['./account-popup.component.scss'],
})
export class AccountTextComponent { }


@Component({
  templateUrl: './login-popup.component.html',
  styleUrls: ['../home-page/home-page.component.scss'],
})
export class LoginPopUpComponent implements OnDestroy {
  isLoading = false;

  userId: string;
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;


  email: FormControl = new FormControl('', Validators.email);
  password: FormControl = new FormControl('', Validators.minLength(8));

  loginForm = new FormGroup({
    email: this.email,
    password: this.password,
  });

    constructor(public authService: AuthService,
                public dialog: MatDialog,
                public dialogRef: MatDialogRef<LoginPopUpComponent>
    ){}

  onSubmit(): void {
    console.log(this.loginForm.value);
    this.isLoading = true;
    this.authService.login(this.email.value, this.password.value);
    this.userId = this.authService.getUserId();
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
    .getAuthStatusListener()
    .subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
      this.userId = this.authService.getUserId();
      this.dialogRef.close();
    });


    // Trigger this.failedLogin() when login fails.
    // Trigger this.successfullLogin() when login succeeds
  }
  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

}

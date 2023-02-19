import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
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
import { ClassListService } from '../services/class.service';

import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';

import { mimeType } from '../post-page/mime-type.validator';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthService } from '../services/auth.service';
import { ShowCaseService } from '../services/showCase.service';
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
export class SignupComponent implements OnInit {
  startDate = new Date(1997, 0, 1);
  isLoading = false;
  userId: string;
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;
  private authStatusSub: Subscription;
  visible = true;
  selectable = true;
  removable = true;

  // classes: string[] = [];
  // classesP: string[] = [];
  // @ViewChild('codeInput') codeInput: ElementRef<HTMLInputElement>;
  // @ViewChild('codeInputP') codeInputP: ElementRef<HTMLInputElement>;
  // @ViewChild('auto') matAutocomplete: MatAutocomplete;
  // @ViewChild('autoP') matAutocompleteP: MatAutocomplete;

  selectedIndex = 0;
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

  pronounS: string[] = [
    '',
    'She/Her',
    'He/His',
    'Ze/Hirs',
    'Ze/Zirs',
    'Xe/Xyr',
  ];

  // profile Picture preview display
  url: string;
  urlVideo: string;

  MatIconModule: any;
  cropImgPreview: any = '';
  imgChangeEvent: any = '';
  // showCropper = false;
  showCasePreview: any = '';
  pat = /\w/;
  pat2 = /^[a-zA-Z0-9]*/;
  containWithinAspectRatio = false;
  username: FormControl = new FormControl('', [
    // Validators.pattern(this.pat),
    // Validators.pattern(this.pat2),
    this.noWhiteSpace,
    this.noSpecialCharacters,
  ]);
  password: FormControl = new FormControl('', this.noWhiteSpace);
  passwordV: FormControl = new FormControl('', this.noWhiteSpace);
  public CodeCompletedLength = new BehaviorSubject(0);
  public CodePursuingLength = new BehaviorSubject(0);
  major: FormControl = new FormControl('');
  minor: FormControl = new FormControl('');
  sport: FormControl = new FormControl('');
  club: FormControl = new FormControl('');
  name: FormControl = new FormControl('');
  pronouns: FormControl = new FormControl('');
  birthday: FormControl = new FormControl();
  gender: FormControl = new FormControl('');
  //   Validators.pattern(
  //   /^[a-zA-Z0-9._%+-]+@mail.utoronto\.ca/ ||
  //   /^[a-zA-Z0-9._%+-]+@utoronto\.ca/
  // ),
  email: FormControl = new FormControl('', [
    Validators.email,
    this.pattern,
    this.noWhiteSpace,
  ]);
  emailV: FormControl = new FormControl('', [
    Validators.email,
    this.noWhiteSpace,
  ]);
  termsCheck: FormControl = new FormControl('');
  // PP isn't connected properly i dont think, since image is being cropped then returned as a base 64 value

  // Code Completed 1-40
  filteredCodes: Observable<string[]>;
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

  // Code Pursuing 1-12
  filteredCodesP: Observable<string[]>;
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
  CodePursuing13: FormControl = new FormControl('');
  CodePursuing14: FormControl = new FormControl('');

  FilteredCodes: string[] = this.classListService.allClasses().slice();
  FilteredCodesP: string[] = this.classListService.allClasses().slice();

  bio: FormControl = new FormControl('');
  public bioLength = new BehaviorSubject(0);
  public showCaseList = new Subject();

  form: FormGroup;

  requiredForm = new FormGroup({
    email: this.email,
    username: this.username,
    password: this.password,
    termsCheck: this.termsCheck,
  });

  personalizeForm = new FormGroup({
    name: this.name,
    username: this.username,
    gender: this.gender,
    pronouns: this.pronouns,
    birthday: this.birthday,
    bio: this.bio,
    // image: this.image,
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
    if ((control.value as string).indexOf(' ') >= 0) {
      return { noWhiteSpace: true };
    }
    return null;
  }
  public noSpecialCharacters(
    control: AbstractControl
  ): ValidationErrors | null {
    console.log('is this working');
    const working = control.value as string;
    console.log('is this working 2', working);
    const normalcharacter = /^[]-~`!@+#$%^&*()_={}[|\/:;'"<>,.?]*/;
    const betterNot = working.match(normalcharacter);
    if (betterNot) {
      console.log('hey boo ya');
      return null;
    }
    console.log('easy now');

    return { noSpecialCharacters: true };
  }
  public pattern(control: AbstractControl): ValidationErrors | null {
    console.log('hey chaz', control.value as string);
    const emailChazz = control.value as string;
    const regex = /^[a-zA-Z0-9._%+-]+@mail.utoronto\.ca/;
    const regex2 = /^[a-zA-Z0-9._%+-]+@utoronto\.ca/;
    const regex3 = /^[a-zA-Z0-9._%+-]+@uoftpharmacy\.com/;
    const regex4 = /^[a-zA-Z0-9._%+-]+@utsc.utoronto\.ca/;
    const regex5 = /^[a-zA-Z0-9._%+-]+@rotman.utoronto\.ca/;

    const matches = emailChazz.match(regex);
    const matches2 = emailChazz.match(regex2);
    const matches3 = emailChazz.match(regex3);
    const matches4 = emailChazz.match(regex4);
    const matches5 = emailChazz.match(regex5);
    console.log('matches1', matches);
    console.log('matches2', matches2);
    console.log('matches3', matches3);
    console.log('matches4', matches4);
    console.log('matches5', matches5);
    if ((matches || matches2 || matches3 || matches4 || matches5) != null) {
      console.log('does it work now email pattern');
      return { pattern: true };
    }
    // else{
    // return null;
    // }
  }
  // Adding emojis
  openEmojiBio(): void {
    const selectionContainer = document.getElementById('showEmojisBio');
    const triggerEmoji = document.getElementById('triggerEmoBio');
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
      const msg = this.bio.value + msgs;
      this.bio.setValue(msg);
    });
  }
  openEmojiMajor(): void {
    const selectionContainer = document.getElementById('showEmojisMajor');
    const triggerEmoji = document.getElementById('triggerEmoMajor');
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
      const msg = this.major.value + msgs;
      this.major.setValue(msg);
    });
  }
  openEmojiMinor(): void {
    const selectionContainer = document.getElementById('showEmojisMinor');
    const triggerEmoji = document.getElementById('triggerEmoMinor');
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
      const msg = this.minor.value + msgs;
      this.minor.setValue(msg);
    });
  }
  openEmojiSport(): void {
    const selectionContainer = document.getElementById('showEmojisSport');
    const triggerEmoji = document.getElementById('triggerEmoSport');
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
      const msg = this.sport.value + msgs;
      this.sport.setValue(msg);
    });
  }

  openEmojiClub(): void {
    const selectionContainer = document.getElementById('showEmojisClub');
    const triggerEmoji = document.getElementById('triggerEmoClub');
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
      const msg = this.club.value + msgs;
      this.club.setValue(msg);
    });
  }

  toggleVisibilty(): any {
    const c = document.getElementById('passwordType') as HTMLInputElement;
    c.type = 'text';
    this.visible = !this.visible;
  }

  toggleVisibilty_(): any {
    const c = document.getElementById('passwordType') as HTMLInputElement;

    c.type = 'password';
    this.visible = !this.visible;
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

  imgLoad(): void {
    // this.showCropper = true;
    console.log('Image loaded');
  }

  imgFailed(): void {
    console.log('Load failed');
  }
  // Profile Pic
  imagePreviewP(event: any): void {
    this.imgChangeEvent = event;
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ profilePic: file });
    this.form.get('profilePic').updateValueAndValidity();

    // if (event.target.files && event.target.files[0]) {
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (Event: any) => {
      // this.url = reader.result as string;
      this.url = Event.target.result;
    };
    // reader.onload = (Event: any) => { // called once readAsDataURL is completed
    // console.log(Event);
    // this.cropImgPreview = Event.target.result;
    // this.url = reader.result as string;
    // };
    reader.readAsDataURL(file); // read file as data url
    // }
  }
  // Video
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
  // SnapShot
  imagePreview(event: any): void {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ showCase: file });
    this.form.get('showCase').updateValueAndValidity();

    const reader = new FileReader();
    reader.onload = (Event: any) => {
      this.showCasePreview = Event.target.result;
    };
    reader.readAsDataURL(file); // read file as data url
  }

  constructor(
    public dialog: MatDialog,
    public classListService: ClassListService,
    public authService: AuthService,
    public showCaseService: ShowCaseService,
    private snackBar: MatSnackBar // public courses: Courses
  ) {
    // this.filteredCodesP = this.CodePursuing.valueChanges.pipe(
    //   startWith(null),
    //   map((code: string | null) =>
    //     code ? this._filter(code) : this.classListService.allClasses().slice()
    //   )
    // );
    // this.filteredCodes = this.CodeCompleted.valueChanges.pipe(
    //   startWith(null),
    //   map((codeP: string | null) =>
    //     codeP ? this._filter(codeP) : this.classListService.allClasses().slice()
    //   )
    // );
    // this.filteredCodesP.subscribe((r) => this.CodePursuing);
    // this.filteredCodes.subscribe((r) => this.CodeCompleted);
  }

  uploadFileP(): any {
    document.getElementById('profilePic').click();
  }
  uploadFile(): any {
    document.getElementById('showCase').click();
  }
  uploadFileVideo(): any {
    document.getElementById('fileInputVideo').click();
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
  // add(event: MatChipInputEvent): void {
  //   const valueP = (event.value || '').trim();

  //   // Add our course code
  //   if (valueP) {
  //     this.classesP.push(valueP);
  //   }

  //   // Clear the input value
  //   // event.chipInput!.clear();

  //   this.CodePursuing.setValue(null);
  // }
  // Completeted Courses
  // addP(event: MatChipInputEvent): void {
  //   const value = (event.value || '').trim();

  //   // Add our course code
  //   if (value) {
  //     this.classes.push(value);
  //   }

  //   // Clear the input value
  //   // event.chipInput!.clear();

  //   this.CodeCompleted.setValue(null);
  // }

  // remove(code: string): void {
  //   const index = this.classes.indexOf(code);
  //   if (index >= 0) {
  //     this.classes.splice(index, 1);
  //   }
  // }
  // removeP(codeP: string): void {
  //   const indexP = this.classesP.indexOf(codeP);
  //   if (indexP >= 0) {
  //     this.classesP.splice(indexP, 1);
  //   }
  // }
  // Pursuing Courses
  // selectedP(event: MatAutocompleteSelectedEvent): void {
  //   this.classesP.push(event.option.viewValue);
  //   this.codeInputP.nativeElement.value = '';
  //   this.CodePursuing.setValue('');
  // }
  // // Completed Classes
  // selected(event: MatAutocompleteSelectedEvent): void {
  //   this.classes.push(event.option.viewValue);
  //   this.codeInput.nativeElement.value = '';
  //   this.CodeCompleted.setValue('');
  // }

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
  clearUploadVideo(): void {
    document.getElementById('video-preview').removeAttribute('video');
    (document.getElementById('fileInputVideo') as HTMLInputElement).value = '';
    this.form.get('video').reset();
    this.form.get('video').updateValueAndValidity();
    console.log('hey hot stuff');
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
    this.selectedIndex = this.selectedIndex === 2 ? 3 : 2;
    this.isLoading = false;
  }
  changeTab1R(): void {
    this.selectedIndex = this.selectedIndex === 2 ? 1 : 2;
  }
  changeTab2(): void {
    this.selectedIndex = this.selectedIndex === 3 ? 4 : 3;
  }
  changeTab2R(): void {
    this.selectedIndex = this.selectedIndex === 3 ? 2 : 3;
  }
  changeTab3(): void {
    this.selectedIndex = this.selectedIndex === 4 ? 3 : 4;
  }

  openDialog(): void {
    this.dialog.open(TermsPopUpComponent);
  }

  onSubmit(): any {
    //  Email validation to continue
    this.isLoading = true;
    this.authService.createUser(
      this.email.value,
      this.username.value,
      this.password.value
    );
    this.selectedIndex = this.selectedIndex === 0 ? 1 : 0;
    // this.dialog.open(LoginPopUpComponent, { disableClose: true });
  }

  onSubmitValidation(): any {
    // try {
    this.isLoading = true;
    this.userId = this.authService.getUserId();
    this.authService.loginFirst(this.emailV.value, this.passwordV.value);
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated: boolean) => {
        // this.dialog.open(LoginPopUpComponent, { disableClose: true })
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
        // Added the if else
        if (isAuthenticated) {
          console.log(this.userIsAuthenticated);
          this.snackBar.open('Welcome to the community', 'Thanks!', {
            duration: 3000,
          });
          this.selectedIndex = this.selectedIndex === 2 ? 3 : 2;
        } else {
          this.snackBar.open(
            'Failed to login. Remember to authenticate your email',
            'Ok!',
            {
              duration: 3000,
            }
          );
        }
      });
    // } catch {
    //   this.snackBar.open(
    //     'Failed to login. Remember to authenticate your email',
    //     'Ok!',
    //     {
    //       duration: 3000,
    //     }
    //   );
    // }
  }

  onSubmit2(): any {
    this.isLoading = true;
    this.authService.createUserInfo(
      this.username.value,
      this.name.value,
      this.bio.value,
      this.gender.value,
      this.birthday.value,
      this.major.value,
      this.minor.value,
      this.sport.value,
      this.club.value,
      this.pronouns.value,
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
      this.CodePursuing13.value,
      this.CodePursuing14.value,
      this.form.get('profilePic').value
    );
    console.log('unicorns exist 3', this.form.get('profilePic').value);
  }

  onSubmitShowCase(): any {
    this.showCaseService.addShowCase(
      this.form.get('showCase').value,
      this.form.get('video').value
    );
  }
  onSubmitVideo(): any {
    this.showCaseService.addShowCaseVideo(
      this.form.get('showCase').value,
      this.form.get('video').value
    );
  }
  ngOnInit(): void {
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe((authStatus) => {
        this.isLoading = false;
      });
    this.form = new FormGroup({
      profilePic: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType],
      }),
      showCase: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType],
      }),
      video: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType],
      }),
    });
    this.CodeCompleted.valueChanges.subscribe((v) =>
      this.CodeCompletedLength.next(v.length)
    );
    this.CodePursuing.valueChanges.subscribe((v) =>
      this.CodePursuingLength.next(v.length)
    );
  }
}
@Component({
  selector: 'app-verified-page',
  templateUrl: './verified-popup.component.html',
  styleUrls: ['../retrieve-password/retrieve-password.component.scss'],
})
export class VerifiedPopUpComponent {}

@Component({
  selector: 'app-terms-page',
  templateUrl: './terms-popup.component.html',
  styleUrls: ['./terms-popup.component.scss'],
})
export class TermsPopUpComponent {}

import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  // patternCheck: boolean;
  emailMatches = false;
  // add <type> and '' is its initialization
  // { updateOn: 'blur' }
  email: FormControl = new FormControl('', [this.noWhiteSpace, this.pattern]);
  password: FormControl = new FormControl('', Validators.minLength(8));
  stayLoggedIn: boolean = false;
  isLoading = false;
  visible = true;
  constructor(public authService: AuthService, public dialog: MatDialog) {}

  public noWhiteSpace(control: AbstractControl): ValidationErrors | null {
    if ((control.value as string).indexOf(' ') >= 0) {
      return { noWhiteSpace: true };
    }
    return null;
  }
  public pattern(control: AbstractControl): ValidationErrors | null {
    // console.log('type', this.patternCheck);
    const emailChazz = control.value as string;

    // if checked u of t for school
    // if(){}

    const regex0 = /^[a-zA-Z0-9._%+-]+@alum.utoronto\.ca/;
    const regex1 = /^[a-zA-Z0-9._%+-]+@mail.utoronto\.ca/;
    const regex2 = /^[a-zA-Z0-9._%+-]+@utoronto\.ca/;
    const regex3 = /^[a-zA-Z0-9._%+-]+@uoftpharmacy\.com/;
    const regex4 = /^[a-zA-Z0-9._%+-]+@utsc.utoronto\.ca/;
    const regex5 = /^[a-zA-Z0-9._%+-]+@rotman.utoronto\.ca/;
    const regex6 = /^[a-zA-Z0-9._%+-]+@skalarly\.com/;
    const regex7 = /^[a-zA-Z0-9._%+-]+@outlook\.com/;
    // add outlook and skalarly.com
    // fix webscoekt error in console

    const matches0 = regex0.test(emailChazz);
    const matches1 = regex1.test(emailChazz);
    const matches2 = regex2.test(emailChazz);
    const matches3 = regex3.test(emailChazz);
    const matches4 = regex4.test(emailChazz);
    const matches5 = regex5.test(emailChazz);
    const matches6 = regex6.test(emailChazz);
    const matches7 = regex7.test(emailChazz);

    if (
      (matches0 ||
        matches1 ||
        matches2 ||
        matches3 ||
        matches4 ||
        matches5 ||
        matches6 ||
        matches7) === true
    ) {
      // this.patternCheck = false;
      return null;
    } else {
      // this.patternCheck = true;
      return { pattern: true };
    }
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

  ngOnInit(): void {
    console.log('url', document.URL);
    console.log('loading...?', new Date());
  }

  // ngDoCheck(): void {
  //   if (this.email) {
  //     console.log('getting started', this.email.value);

  //     console.log('all setup');
  //   }
  // }
  // ngOnDestroy(): void {}
  clearPassword(): void {
    this.password.setValue('');
  }

  clearEmail(): void {
    this.email.setValue('');
  }

  doesEmailExist(event: any): void {
    console.log('will hunting ');
    const query: string = event.target.value;
    console.log('query ', query);
    if (query && this.email.valid) {
      console.log('triggered when done typing.');
      const noSpecialChars = query.replace(/[^a-zA-Z0-9.@ ]/g, '');
      this.authService.searchEmails(noSpecialChars.trim());
      this.authService.getEmail().subscribe((results) => {
        if (results === true) {
          console.log('results baby', results);
          this.emailMatches = results;
        } else {
          console.log('nuts', results);
          this.emailMatches = false;
        }
      });
    } else {
      this.emailMatches = false;
    }
  }
  // matchingValidator(): ValidationErrors | null {
  //   console.log('testing 123', this.emailMatches);
  //   if (this.emailMatches) {
  //     const check = this.authService.getEmail().subscribe((results) => {
  //       if (results.length > 0) {
  //         console.log('results baby', results);
  //         this.emailMatches = results;
  //         return null;
  //       } else {
  //         console.log('nuts', results);
  //         this.emailMatches = [];
  //         return { emailCheck: true };
  //       }
  //     });
  //     console.log('interesting', check);
  //   } else {
  //     return { emailCheck: true };
  //   }
  // }
  // public noMatches(control: AbstractControl): ValidationErrors | null {
  //   const working = control.value as string;
  //   console.log('working', working);

  //   console.log('Email Matches', this.emailMatches);
  //   console.log('Email Matches Length', this.emailMatches.length);

  //   this.authService.getEmail().subscribe((results) => {
  //     if (results.length > 0) {
  //       console.log('results baby', results);
  //       this.emailMatches = results;
  //     } else {
  //       console.log('nuts', results);
  //       this.emailMatches = [];
  //     }
  //   });
  //   if (this.emailMatches.length === 0) {
  //     return { noEmailMatches: true };
  //   } else {
  //     return null;
  //   }
  // }
  stayIn() {
    this.stayLoggedIn = !this.stayLoggedIn;
    console.log('boolean', this.stayLoggedIn);
  }
  onSubmit(): void {
    this.isLoading = true;
    this.authService.login(
      this.email.value,
      this.password.value,
      this.stayLoggedIn
    );
  }

  openDialog(): void {
    this.dialog.open(ExplainedComponent);
  }
}
@Component({
  selector: 'app-explained-page',
  templateUrl: './skalarly-explained.component.html',
  styleUrls: ['./home-page.component.scss'],
  animations: [
    trigger('openClose', [
      // fade dialog in and out
      state(
        'open',
        style({
          height: '50%',
          opacity: 1,
          display: 'contents',
        })
      ),
      state(
        'closed',
        style({
          height: '0',
          opacity: 0.5,
        })
      ),
      transition('open => closed', [animate('1s')]),
      transition('closed => open', [animate('1s')]),
    ]),
  ],
})
export class ExplainedComponent implements OnDestroy {
  isOpen = true;

  ngOnDestroy(): void {
    console.log('closing page');
    this.isOpen = !this.isOpen;
  }
}

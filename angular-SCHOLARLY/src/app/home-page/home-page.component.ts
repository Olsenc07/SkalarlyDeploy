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
  query,
  stagger,
  // ...
} from '@angular/animations';
import { EmailPatternService } from '../services/emailPattern.service';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  constructor(
    public authService: AuthService,
    public dialog: MatDialog,
    public emailPatternService: EmailPatternService
  ) {}
  // patternCheck: boolean;
  emailMatches = false;
  // add <type> and '' is its initialization
  // { updateOn: 'blur' }
  email: FormControl = new FormControl('', [
    this.noWhiteSpace,
    this.emailPatternService.pattern,
  ]);
  password: FormControl = new FormControl('', Validators.minLength(8));
  stayLoggedIn: boolean = false;
  isLoading = false;
  visible = true;

  public noWhiteSpace(control: AbstractControl): ValidationErrors | null {
    if ((control.value as string).indexOf(' ') >= 0) {
      return { noWhiteSpace: true };
    }
    return null;
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

  clearPassword(): void {
    this.password.setValue('');
  }

  clearEmail(): void {
    this.email.setValue('');
  }

  doesEmailExist(event: any): void {
    console.log('will hunting ');
    const query: string = event.target.value;
    const patternPass = this.emailPatternService.pattern(event.target.value);
    console.log('patternPass ', patternPass);
    console.log('query ', query);
    if (query && patternPass) {
      setTimeout(sendData, 2000);
      function sendData() {
        this.authService.searchEmails(query.trim());
        this.authService.getEmail().subscribe((results) => {
          if (results === true) {
            console.log('results baby', results);
            this.emailMatches = results;
          } else {
            console.log('nuts', results);
            this.emailMatches = false;
          }
        });
      }
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
        })
      ),
      state(
        'closed',
        style({
          height: '0',
          opacity: 0.5,
        })
      ),
      transition('open <=> closed', [animate('1s')]),
    ]),
    trigger('fadeUp', [
      // fade bullet points in one by one
      query(
        'li',
        stagger(100, [
          animate(1000, style({ transform: 'translateY(100%)', opacity: 1 })),
        ])
      ),
    ]),
  ],
})
export class ExplainedComponent {
  isOpen = true;
  start = true;
  onClose() {
    console.log('closing page');
    this.isOpen = !this.isOpen;
  }
}

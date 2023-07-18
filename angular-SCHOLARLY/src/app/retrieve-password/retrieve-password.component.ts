import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  FormControl,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Location } from '@angular/common';
import { PostsService } from '../services/posts.service';
import { EmailPatternService } from '../services/emailPattern.service';
import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger,
} from '@angular/animations';
@Component({
  selector: 'app-retrieve-password',
  templateUrl: './retrieve-password.component.html',
  styleUrls: ['./retrieve-password.component.scss'],
})
export class RetrievePasswordComponent implements OnInit {
  constructor(
    private postsService: PostsService,
    public authService: AuthService,
    private snackBar: MatSnackBar,
    private location: Location,
    private emailPatternService: EmailPatternService
  ) {}
  userId: string;
  isLoading = false;
  visible = true;
  visible2 = true;
  emailMatches = false;
  emailMatches2 = false;

  passwordDel: FormControl = new FormControl('', Validators.minLength(8));
  emailDel: FormControl = new FormControl('');
  DelVerify: FormControl = new FormControl('');
  deleteForm = new FormGroup({
    emailDel: this.emailDel,
    passwordDel: this.passwordDel,
  });
  password: FormControl = new FormControl('', Validators.minLength(8));
  passwordNew: FormControl = new FormControl('');
  secretCode: FormControl = new FormControl('');
  // passwordRetrieval: FormControl = new FormControl('', Validators.email);
  email: FormControl = new FormControl('', [
    Validators.email,
    this.emailPatternService.pattern,
    this.emailPatternService.noWhiteSpace,
  ]);
  emailForm = new FormGroup({
    email: this.email,
    passwordNew: this.passwordNew,
  });
  passwordForm = new FormGroup({
    secretCode: this.secretCode,
  });
  loginForm = new FormGroup({
    email: this.email,
    password: this.password,
  });

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
  }
  doesEmailExist(event: any): void {
    const query: string = event.target.value;
    const patternPass = this.emailPatternService.pattern(event.target.value);
    console.log('patternPass ', patternPass);
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
      console.log('DeLorean');
    }
  }
  doesEmailExist2(event: any): void {
    const query: string = event.target.value;
    const patternPass = this.emailPatternService.pattern(event.target.value);
    console.log('patternPass ', patternPass);
    if (query && patternPass) {
      setTimeout(sendData, 2000);
      function sendData() {
        this.authService.searchEmails(query.trim());
        this.authService.getEmail().subscribe((results) => {
          if (results === true) {
            console.log('results baby', results);
            this.emailMatches2 = results;
          } else {
            console.log('nuts', results);
            this.emailMatches2 = false;
          }
        });
      }
    } else {
      console.log('DeLorean');
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

  backButton(): void {
    this.location.back();
  }

  clearPassword(): void {
    this.password.setValue('');
  }

  clearEmail1(): void {
    this.email.setValue('');
  }
  onSubmit(): void {
    console.log(this.loginForm.value);
    this.isLoading = true;
    this.authService.login(this.email.value, this.password.value, false);
  }

  onResetPassword(): void {
    this.authService.updatePassword(this.password.value, this.secretCode.value);
  }
  passwordReset(): void {
    console.log(this.email.value, this.userId);
    this.authService.resetPassword(this.email.value, this.userId);
    this.email.setValue('');
  }
  toggleVisibilty2(): any {
    const c = document.getElementById('passwordType2') as HTMLInputElement;

    c.type = 'text';
    this.visible2 = !this.visible2;
  }

  toggleVisibilty_2(): any {
    const c = document.getElementById('passwordType2') as HTMLInputElement;

    c.type = 'password';
    this.visible2 = !this.visible2;
  }

  getCode(): void {
    this.authService.getCode(this.emailDel.value, this.passwordDel.value);
  }
  DeleteAccount(): void {
    console.log(this.emailDel.value, this.passwordDel.value);
    this.authService.deleteAccount(
      this.emailDel.value,
      this.passwordDel.value,
      this.secretCode.value
    );
    // .then((value) => {
    //   this.emailDel.setValue('');
    //   this.passwordDel.setValue('');
    // });
  }
}

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./retrieve-password.component.scss'],
})
export class ForgotPasswordComponent {
  isLoading = false;
  visible = true;
  visible2 = true;
  emailMatches = false;

  password: FormControl = new FormControl('', Validators.minLength(8));
  passwordNew: FormControl = new FormControl('');
  secretCode: FormControl = new FormControl('');
  // passwordRetrieval: FormControl = new FormControl('', Validators.email);
  email: FormControl = new FormControl('', Validators.email);
  emailForm = new FormGroup({
    email: this.email,
  });
  passwordForm = new FormGroup({
    passwordNew: this.passwordNew,
    secretCode: this.secretCode,
  });
  loginForm = new FormGroup({
    email: this.email,
    password: this.password,
  });

  backButton(): void {
    this.location.back();
  }

  constructor(
    public authService: AuthService,
    private location: Location,
    public emailPatternService: EmailPatternService
  ) {}

  clearPassword(): void {
    this.password.setValue('');
  }
  doesEmailExist(event: any): void {
    const query: string = event.target.value;
    const patternPass = this.emailPatternService.pattern(event.target.value);
    console.log('patternPass ', patternPass);
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
      console.log('DeLorean');
    }
  }
  clearEmail1(): void {
    this.email.setValue('');
  }
  onSubmit(): void {
    console.log(this.loginForm.value);
    this.isLoading = true;
    this.authService.login(this.email.value, this.password.value, false);
  }

  onResetPassword(): void {
    this.authService.updatePassword(this.password.value, this.secretCode.value);
  }
  forgotReset(): void {
    console.log(this.email.value);
    this.authService.forgotPassword(this.email.value);
    this.email.setValue('');
  }
  toggleVisibilty2(): any {
    const c = document.getElementById('passwordType2') as HTMLInputElement;

    c.type = 'text';
    this.visible2 = !this.visible2;
  }

  toggleVisibilty_2(): any {
    const c = document.getElementById('passwordType2') as HTMLInputElement;

    c.type = 'password';
    this.visible2 = !this.visible2;
  }
}

@Component({
  selector: 'app-alumni-transfer',
  templateUrl: './alumni-transfer.component.html',
  styleUrls: ['./retrieve-password.component.scss'],
  animations: [
    trigger('levelup', [
      // display icons left to right fade in
      query(
        'i',
        stagger(100, [
          animate(1000, style({ transform: 'translateX(100%)', opacity: 1 })),
        ])
      ),
    ]),
  ],
})
export class AlumTransferComponent {
  levelup = true;
  emailMatches = false;
  email: FormControl = new FormControl('', Validators.email);
  emailForm = new FormGroup({
    email: this.email,
  });
  backButton(): void {
    this.location.back();
  }

  constructor(
    public authService: AuthService,
    private location: Location,
    public emailPatternService: EmailPatternService,
    private snackBar: MatSnackBar
  ) {}
  doesEmailExist(event: any): void {
    const query: string = event.target.value;
    const patternPass = this.emailPatternService.pattern(event.target.value);
    console.log('patternPass ', patternPass);
    if (query && patternPass) {
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
    } else {
      console.log('DeLorean');
    }
  }

  alumTransfer() {
    // Send email and start steps in changin email saved to the new alumni one
    this.snackBar.open('Email has been sent.', '✅', {
      duration: 3000,
    });
  }
}

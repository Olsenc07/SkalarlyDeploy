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

@Component({
  selector: 'app-retrieve-password',
  templateUrl: './retrieve-password.component.html',
  styleUrls: ['./retrieve-password.component.scss'],
})
export class RetrievePasswordComponent implements OnInit {
  userId: string;
  isLoading = false;
  visible = true;
  passwordDel: FormControl = new FormControl('', Validators.minLength(8));
  emailDel: FormControl = new FormControl('');
  DelVerify: FormControl = new FormControl('');
  deleteForm = new FormGroup({
    emailDel: this.emailDel,
    passwordDel: this.passwordDel,
  });
  password: FormControl = new FormControl('', Validators.minLength(8));
  // passwordRetrieval: FormControl = new FormControl('', Validators.email);
  email: FormControl = new FormControl('', Validators.email);
  emailForm = new FormGroup({
    email: this.email,
  });

  loginForm = new FormGroup({
    email: this.email,
    password: this.password,
  });

  constructor(
    private postsService: PostsService,
    public authService: AuthService,
    private snackBar: MatSnackBar,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
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
    this.authService.login(this.email.value, this.password.value);
  }
  passwordReset(): void {
    console.log(this.email.value, this.userId);
    this.authService.resetPassword(this.email.value, this.userId);
    this.email.setValue('');
  }
  DeleteAccount(): void {
    console.log(this.emailDel.value, this.passwordDel.value);
    this.authService.deleteAccount(this.emailDel.value, this.passwordDel.value);
    // .then((value) => {
    //   this.emailDel.setValue('');
    //   this.passwordDel.setValue('');
    // });
  }
}

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./retrieve-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  visible = true;

  password: FormControl = new FormControl('');
  secretCode: FormControl = new FormControl('');

  passwordForm = new FormGroup({
    password: this.password,
    secretCode: this.secretCode,
  });
  public noWhiteSpace(control: AbstractControl): ValidationErrors | null {
    if ((control.value as string).indexOf(' ') >= 0) {
      return { noWhiteSpace: true };
    }
    return null;
  }
  constructor(public authService: AuthService, private snackBar: MatSnackBar) {}

  onResetPassword(): void {
    this.authService.updatePassword(this.password.value, this.secretCode.value);
  }
  ngOnInit(): void {}

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
}

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

@Component({
  selector: 'app-retrieve-password',
  templateUrl: './retrieve-password.component.html',
  styleUrls: ['./retrieve-password.component.scss'],
})
export class RetrievePasswordComponent implements OnInit {
  isLoading = false;
  visible = true;
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
    public authService: AuthService,
    private snackBar: MatSnackBar,
    private location: Location
  ) {}

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

  backButton() {
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
    console.log(this.email.value);
    this.authService.resetPassword(this.email.value).then(() => {
      this.email.setValue('');
    });
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

  onResetPassword() {
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

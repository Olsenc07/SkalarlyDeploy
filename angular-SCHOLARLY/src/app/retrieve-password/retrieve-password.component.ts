import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-retrieve-password',
  templateUrl: './retrieve-password.component.html',
  styleUrls: ['./retrieve-password.component.scss'],
})
export class RetrievePasswordComponent implements OnInit {
  isLoading = false;

  password: FormControl = new FormControl('', Validators.email);
  // passwordRetrieval: FormControl = new FormControl('', Validators.email);
  email: FormControl = new FormControl('', Validators.email);

  loginForm = new FormGroup({
    email: this.email,
    password: this.password,
  });

  constructor(public authService: AuthService, private snackBar: MatSnackBar) { }

  ngOnInit(): void { }

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
    this.authService.resetPassword(this.email.value);
  }
}

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./retrieve-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {

  password: FormControl = new FormControl('');
  secretCode: FormControl = new FormControl('');

  passwordForm = new FormGroup({
    password: this.password,
    secretCode: this.secretCode,

  });

  constructor(public authService: AuthService,
     private snackBar: MatSnackBar) { }



  onResetPassword(){
    console.log('nice bush');
    this.authService.updatePassword(this.password.value, this.secretCode.value);
  }
  ngOnInit(): void { }

}

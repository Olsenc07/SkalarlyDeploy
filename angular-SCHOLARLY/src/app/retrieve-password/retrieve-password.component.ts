import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-retrieve-password',
  templateUrl: './retrieve-password.component.html',
  styleUrls: ['./retrieve-password.component.scss'],
})
export class RetrievePasswordComponent implements OnInit {
  password: FormControl = new FormControl('');
  emailRetrieval: FormControl = new FormControl('', Validators.email);
  emailLogin: FormControl = new FormControl('', Validators.email);

  loginForm = new FormGroup({
    emailLogin: this.emailLogin,
    password: this.password,
  });

  retrievalForm = new FormGroup({
    emailRetrieval: this.emailRetrieval
  });
  constructor(private _snackBar: MatSnackBar) { }

  openSnackBar() {
    this._snackBar.open('Check your email and follow steps to reset your password', 'Got It!!');
  }
  ngOnInit(): void { }

  clearPassword(): void {
    this.password.setValue('');
  }

  clearEmail(): void {
    this.emailRetrieval.setValue('');
  }
  clearEmail1(): void {
    this.emailLogin.setValue('');
  }
  onSubmit(): void {
    // TODO: wire up to login request
    console.log(this.loginForm.value);

  }
  onSubmit1(): void {
    // TODO: wire up to login request
    console.log(this.retrievalForm.value);
  }
}

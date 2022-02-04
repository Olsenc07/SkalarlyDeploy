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

  password: FormControl = new FormControl('');
  emailRetrieval: FormControl = new FormControl('', Validators.email);
  email: FormControl = new FormControl('', Validators.email);

  loginForm = new FormGroup({
    email: this.email,
    password: this.password,
  });

  retrievalForm = new FormGroup({
    emailRetrieval: this.emailRetrieval
  });
  constructor(public authService: AuthService, private snackBar: MatSnackBar) { }

  openSnackBar(): void {
    this.snackBar.open('Check your email and follow steps to reset your password', 'Got It!!');
  }
  ngOnInit(): void { }

  clearPassword(): void {
    this.password.setValue('');
  }

  clearEmail(): void {
    this.emailRetrieval.setValue('');
  }
  clearEmail1(): void {
    this.email.setValue('');
  }
  onSubmit(): void {
    console.log(this.loginForm.value);
    this.isLoading = true;
    this.authService.login(this.email.value, this.password.value);

  }
  onSubmit1(): void {
    // TODO: wire up to send reset email
    console.log(this.retrievalForm.value);
  }
}

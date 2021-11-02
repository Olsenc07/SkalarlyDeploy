import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  email: FormControl = new FormControl('', Validators.email);
  password: FormControl = new FormControl('');


  loginForm = new FormGroup({
    email: this.email,
    password: this.password,
  });

  constructor() { }

  ngOnInit(): void { }

  clearPassword(): void {
    this.password.setValue('');
  }

  clearEmail(): void {
    this.email.setValue('');
  }

  onSubmit(): void {
    // TODO: wire up to login request
    console.log(this.loginForm.value);
  }
}

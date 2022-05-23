import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';
import {Router} from '@angular/router';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit, OnDestroy {

  constructor(public authService: AuthService, private snackBar: MatSnackBar, private router: Router)
  { }
  email: FormControl = new FormControl('', Validators.email);
  password: FormControl = new FormControl('', Validators.minLength(8));

  isLoading = false;
  private authStatusSub: Subscription;

  visible = true;



  loginForm = new FormGroup({
    email: this.email,
    password: this.password,
  });



toggleVisibilty(): any {
const c = (document.getElementById('passwordType') as  HTMLInputElement);
 console.log(typeof c);
if (c.getAttribute('type') === 'password'){
  c.setAttribute('passwordType', 'text');
 }else {
  c.setAttribute('passwordType', 'password');
}
 this.visible = !this.visible;

}

  ngOnInit(): void {
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      authStatus => {
        this.isLoading = false;
      }
    );
   }

   ngOnDestroy(): void {
    this.authStatusSub.unsubscribe();
    }
  clearPassword(): void {
    this.password.setValue('');
  }

  clearEmail(): void {
    this.email.setValue('');
  }

  onSubmit(): void {
    console.log(this.loginForm.value);
    this.isLoading = true;
    this.authService.login(this.email.value, this.password.value);
  }
}

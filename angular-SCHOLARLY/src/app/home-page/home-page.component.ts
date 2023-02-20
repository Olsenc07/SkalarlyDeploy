import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit, OnDestroy {
  constructor(public authService: AuthService, public dialog: MatDialog) {}
  email: FormControl = new FormControl('', [Validators.email, this.noMatches]);
  password: FormControl = new FormControl('', Validators.minLength(8));

  emailMatches = [];
  isLoading = false;
  public authStatusSub: Subscription;

  visible = true;

  loginForm = new FormGroup({
    email: this.email,
    password: this.password,
  });

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
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe((authStatus) => {
        this.isLoading = false;
      });
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

  doesEmailExist(event: any): any {
    const query: string = event.target.value;
    console.log('query ', query);
    this.authService.searchEmails(query.trim());
  }

  public noMatches(control: AbstractControl): ValidationErrors | null {
    const working = control.value as string;
    console.log('working', working);
    this.authService.getEmail().subscribe((results) => {
      if (results.length > 0) {
        console.log('results baby', results);
        this.emailMatches = results;
        return null;
      } else {
        console.log('nuts', results);
        this.emailMatches = [];
        return { noMatches: true };
      }
    });
    if (!this.emailMatches) {
      return { noMatches: true };
    }
  }

  onSubmit(): void {
    this.isLoading = true;
    this.authService.login(this.email.value, this.password.value);
  }

  openDialog(): void {
    this.dialog.open(ExplainedComponent);
  }
}
@Component({
  selector: 'app-explained-page',
  templateUrl: './skalarly-explained.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class ExplainedComponent {}

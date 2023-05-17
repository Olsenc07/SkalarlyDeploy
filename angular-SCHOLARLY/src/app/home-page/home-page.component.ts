import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
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

  emailMatches = false;
  email: FormControl = new FormControl('');
  password: FormControl = new FormControl('', Validators.minLength(8));
  stayLoggedIn: boolean = false;

  isLoading = false;
  public authStatusSub: Subscription;

  visible = true;

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

  // ngDoCheck(): void {
  //   if (this.email) {
  //     console.log('getting started', this.email.value);

  //     console.log('all setup');
  //   }
  // }
  ngOnDestroy(): void {
    this.authStatusSub.unsubscribe();
  }
  clearPassword(): void {
    this.password.setValue('');
  }

  clearEmail(): void {
    this.email.setValue('');
  }

  doesEmailExist(event: any): void {
    const query: string = event.target.value;
    console.log('query ', query);
    if (query) {
      const noSpecialChars = query.replace(/[^a-zA-Z0-9.@ ]/g, '');
      this.authService.searchEmails(noSpecialChars.trim());
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
  check(loggedin: boolean) {
    console.log('cool switch', loggedin);
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
})
export class ExplainedComponent {}

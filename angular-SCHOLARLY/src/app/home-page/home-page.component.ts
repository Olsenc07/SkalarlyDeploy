import { Component } from '@angular/core';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  query,
  stagger,
} from '@angular/animations';
import { MatIconModule } from '@angular/material/icon';
import { pattern } from '../validators/emailPattern.validator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { map } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatButtonModule,
    NgIf,
    MatInputModule,
    MatIconModule,
  ],
})
export class HomePageComponent {
  constructor(private authService: AuthService, private dialog: MatDialog) {
    this.emailTest();
  }
  emailMatches: boolean;

  // add <type> and '' is its initialization
  // { updateOn: 'blur' }

  email: FormControl = new FormControl('', [pattern]);
  password: FormControl = new FormControl('', Validators.minLength(8));
  stayLoggedIn: boolean = false;
  isLoading = false;
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

  clearPassword(): void {
    this.password.setValue('');
  }

  clearEmail(): void {
    this.email.setValue('');
  }

  emailTest() {
    this.email.statusChanges.subscribe((Event) => {
      console.log('will hunting ', Event);
      if (Event === 'VALID') {
        const query: string = this.email.value;
        // this.patternPass = pattern(this.email.value);
        console.log('query ', query.trim());

        this.authService.searchEmails(query.trim());
        this.authService
          .getEmail()
          // .pipe(map((testing) => {}))
          // filter using operators
          // test subjects here and needing to
          .subscribe((results) => {
            if (results === true) {
              console.log('results baby', results);
              // this shou;ld be with an async pipe and not called with each function
              this.emailMatches = results;
            } else {
              console.log('nuts', results);
              this.emailMatches = false;
            }
          });
        // }
      }
    });
  }

  stayIn() {
    this.stayLoggedIn = !this.stayLoggedIn;
    console.log('boolean', this.stayLoggedIn);
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
  standalone: true,
  selector: 'app-explained-page',
  templateUrl: './skalarly-explained.component.html',
  styleUrls: ['./home-page.component.scss'],
  imports: [MatButtonModule, MatDialogModule, MatCardModule],
  animations: [
    trigger('openClose', [
      // fade dialog in and out
      state(
        'open',
        style({
          height: '50%',
          opacity: 1,
        })
      ),
      state(
        'closed',
        style({
          height: '0',
          opacity: 0.5,
        })
      ),
      transition('open <=> closed', [animate('1s')]),
    ]),
    trigger('fadeUp', [
      // fade bullet points in one by one
      query(
        'li',
        stagger(100, [
          animate(1000, style({ transform: 'translateY(100%)', opacity: 1 })),
        ])
      ),
    ]),
  ],
})
export class ExplainedComponent {
  isOpen = 'open';
  onClose() {
    console.log('closing page');
    this.isOpen = 'closed';
  }
}

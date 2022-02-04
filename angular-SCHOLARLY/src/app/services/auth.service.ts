import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import { AuthData, AuthDataInfo } from '../signup/auth-data.model';
import { Subject } from 'rxjs';
import {Router} from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppRoutingModule } from '../app-routing.module';



@Injectable({ providedIn: 'root'})
export class AuthService {
private isAuthenticated = false;
private token: string;
private tokenTimer: any;
private userId: string;
private authStatusListener = new Subject<boolean>();



    constructor(private http: HttpClient, private router: Router, private snackBar: MatSnackBar) {}

    getToken(): string  {
        return this.token;
    }

    getIsAuth(): boolean {
        return this.isAuthenticated;
    }
    getUserId(): string {
        return this.userId;
    }

    getAuthStatusListener(): any {
        return this.authStatusListener.asObservable();
    }

    createUser(email: string, username: string, password: string): any {
        const authData: AuthData = { email, username, password};
        this.http.post('http://localhost:3000/api/user/signup', authData).subscribe(() => {
            this.snackBar.open('Account is made, time to personalize it!', 'Yay!!');
         }, error => {
             this.authStatusListener.next(false);
         });
    }

    createUserInfo( name: string, gender: string, birthday: string, major: string, minor: string, sport: string,
                    club: string, pronouns: string,
        ): any {
        const authDataInfo: AuthDataInfo = { name, gender, birthday, major, minor, sport, club, pronouns };
        this.http.post('http://localhost:3000/api/user/info', authDataInfo).subscribe(() => {
            this.snackBar.open('Sign in with your new account', 'Will do!!');
    }, error => {
        this.authStatusListener.next(false);
        });
    }

    login(email: string, password: string): any  {
        const authData: AuthData = { email, password};
        this.http.post<{token: string, expiresIn: number, userId: string }>('http://localhost:3000/api/user/login', authData)
            .subscribe(response => {
                const token = response.token;
                this.token = token;
                if (token) {
                this.router.navigate(['/search']);
                this.snackBar.open('Welcome to the community', 'Thanks!!');
                const expiresInDuration = response.expiresIn;
                this.setAuthTimer(expiresInDuration);
                this.isAuthenticated = true;
                this.userId = response.userId;
                this.authStatusListener.next(true);
                const now = new Date();
                const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
                this.saveAuthData(token, expirationDate, this.userId);
                console.log(expirationDate);
                console.log(this.token);
                }
                }, error => {
                    this.authStatusListener.next(false);
                 });
            }

        autoAuthUser(): any {
            const authInformation = this.getAuthData();
            if (!authInformation) {
                return;
            }
            const now = new Date();
            const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
            if (expiresIn > 0){
                this.token = authInformation.token;
                this.isAuthenticated = true;
                this.userId = authInformation.userId;
                this.setAuthTimer(expiresIn / 1000);
                this.authStatusListener.next(true);
            }
        }

            logout(): any {
                this.token = null;
                this.isAuthenticated = false;
                this.authStatusListener.next(false);
                this.userId = null;
                clearTimeout(this.tokenTimer);
                this.clearAuthData();
                this.router.navigate(['/login']);
                console.log(this.token);
            }

            private setAuthTimer(duration: number): any {
                this.tokenTimer = setTimeout(() => {
                    this.logout();
                }, duration * 1000);
                }

            private saveAuthData(token: string, expirationDate: Date, userId: string): any {
                localStorage.setItem('token', token);
                localStorage.setItem('expiration', expirationDate.toISOString());
                localStorage.setItem('userId', userId);
            }

            private clearAuthData(): any {
                localStorage.removeItem('token');
                localStorage.removeItem('expiration');
                localStorage.removeItem('userId');
            }

            private getAuthData(): any {
                const token = localStorage.getItem('token');
                const expirationDate = localStorage.getItem('expiration');
                const userId = localStorage.getItem('userId');
                if (!token || !expirationDate){
                    return;
                }
                return {
                    token,
                    expirationDate: new Date(expirationDate),
                    userId
                };
            }

}

import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import { AuthData } from '../signup/auth-data.model';
import { Subject } from 'rxjs';
import {Router} from '@angular/router';


@Injectable({ providedIn: 'root'})
export class AuthService {
private isAuthenticated = false;
private token: string;
private tokenTimer: any;
private authStatusListener = new Subject<boolean>();



    constructor(private http: HttpClient, private router: Router) {}

    getToken(): string  {
        return this.token;
    }

    getIsAuth(): boolean {
        return this.isAuthenticated;
    }

    getAuthStatusListener(): any {
        return this.authStatusListener.asObservable();
    }

    createUser(email: string, password: string): any {
        const authData: AuthData = { email, password};
        this.http.post('http://localhost:3000/api/user/signup', authData)
            .subscribe(response => {
                console.log(response);
            });
    }

    login(email: string, password: string): any  {
        const authData: AuthData = { email, password};
        this.http.post<{token: string, expiresIn: number }>('http://localhost:3000/api/user/login', authData)
            .subscribe(response => {
                const token = response.token;
                this.token = token;
                if (token){
                const expiresInDuration = response.expiresIn;
                this.setAuthTimer(expiresInDuration);
                this.tokenTimer = setTimeout(() => {
                    this.logout();
                }, expiresInDuration * 1000);
                this.isAuthenticated = true;
                this.authStatusListener.next(true);
                const now = new Date();
                const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
                this.saveAuthData(token, expirationDate);
                }
                this.router.navigate(['/search']);
                });
            }

        autoAuthUser(): any {
            const authInformation = this.getAuthData();
            if (!authInformation){
                return;
            }
            const now = new Date();
            const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
            if (expiresIn > 0){
                this.token = authInformation.token;
                this.isAuthenticated = true;
                this.setAuthTimer(expiresIn / 1000);
                this.authStatusListener.next(true);
            }
        }

            logout(): any {
                this.token = null;
                this.isAuthenticated = false;
                this.authStatusListener.next(false);
                clearTimeout();
                clearTimeout(this.tokenTimer);
            }

            private setAuthTimer(duration: number): any {
                this.tokenTimer = setTimeout(() => {
                    this.logout();
                }, duration * 1000);
                }

            private saveAuthData(token: string, expirationDate: Date): any {
                localStorage.setItem('token', token);
                localStorage.setItem('expiration', expirationDate.toISOString());
            }

            private clearAuthData(): any {
                localStorage.removeItem('token');
                localStorage.removeItem('expiration');
            }

            private getAuthData(): any {
                const token = localStorage.getItem('token');
                const expirationDate = localStorage.getItem('expiration');
                if (!token || !expirationDate){
                    return;
                }
                return {
                    token,
                    expirationDate: new Date(expirationDate)
                };
            }

}

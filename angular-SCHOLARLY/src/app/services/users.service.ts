import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';


@Injectable({
    providedIn: 'root',
  })

  export class UserService {










    
    constructor(private http: HttpClient) { }



}
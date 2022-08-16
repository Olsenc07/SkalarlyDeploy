import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Subject, ReplaySubject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface Message {
  username: string;
  message: string;
  time: string;
}

@Injectable({
  providedIn: 'root',
})
export class MessageService {}

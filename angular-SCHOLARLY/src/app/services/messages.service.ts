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
export class MessageService {
  private messages: Message[] = [];
  private messagesUpdated = new ReplaySubject<Message[]>();

  constructor(private http: HttpClient) {}

  getMessages(username: string): any {
    this.http
      .get<{ message: string; messages: any }>('http://localhost:3000', {
        params: { username },
      })
      .pipe(
        map((messageData) => {
          return messageData.messages.map((message) => {
            return {
              username: message.username,
              message: message.message,
              time: message.time,
            };
          });
        })
      )
      .subscribe((transformedMessage) => {
        this.messages = transformedMessage;
        this.messagesUpdated.next([...this.messages]);
      });
  }
}

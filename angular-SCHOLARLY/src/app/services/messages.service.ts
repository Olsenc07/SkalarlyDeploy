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

  getMessages(userId: string, username: string): any {
    this.http
      .get<{ message: string; messages: any }>(
        'http://localhost:3000/api/messages/OnetoOne',
        {
          params: { userId, username },
        }
      )
      .pipe(
        map((messageData) => {
          return messageData.messages.map((message) => {
            return {
              username: message.username,
              message: message.message,
              time: message.time,
              otherUser: message.otherUser,
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

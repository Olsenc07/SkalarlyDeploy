import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface Message {
  id: string;
  username: string;
  message: string;
  time: string;
  otherUser: string;
  you: string;
  viewed: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private messages: Message[] = [];

  private messagesUpdated = new Subject<Message[]>();

  private messageStart: Message[] = [];
  private messageStartUpdated = new Subject<Message[]>();
  // private messagesSent = new ReplaySubject<Message[]>();

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  getMessages(userId: string, username: string): any {
    const sub = this.http
      .get<{ message: string; messages: any }>(
        'https://www.skalarly.com/api/messages/OnetoOne',
        {
          params: { userId, username },
        }
      )
      .pipe(
        map((messageData) => {
          return messageData.messages.map((message) => {
            return {
              id: message._id,
              username: message.username,
              message: message.message,
              time: message.time,
              otherUser: message.otherUser,
              you: message.you,
              viewed: message.viewed,
            };
          });
        })
      )
      .subscribe((transformedMessage) => {
        this.messages = transformedMessage;
        this.messagesUpdated.next([]);
        console.log('empty msg to clear');
        this.messagesUpdated.next([...this.messages]);
        console.log('msgs sent');
        sub.unsubscribe();
        console.log('eazy 1');
      });
  }

  getInfoUpdateListener(): any {
    return this.messagesUpdated.asObservable();
  }
}

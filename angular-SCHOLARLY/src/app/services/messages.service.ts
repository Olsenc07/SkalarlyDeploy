import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { ReplaySubject } from 'rxjs';
import { AuthDataInfo } from '../signup/auth-data.model';
export interface Message {
  username: string;
  message: string;
  time: string;
  you: string;
}

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private messages: Message[] = [];

  private messagesUpdated = new ReplaySubject<Message[]>();
  // private messagesSent = new ReplaySubject<Message[]>();

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
              you: message.you,
            };
          });
        })
      )
      .subscribe((transformedMessage) => {
        this.messages = transformedMessage;
        this.messagesUpdated.next([...this.messages]);
      });
  }

  getInfoUpdateListener(): any {
    return this.messagesUpdated.asObservable();
  }

  // getInfoUpdateListenerSent(): any {
  //   return this.messagesSent.asObservable();
  // }

  startMessages(userId: string): any {
    this.http
      .get<{ message: string; messages: any }>(
        'http://localhost:3000/api/messages/OnetoOneSend',
        {
          params: { userId },
        }
      )
      .pipe(
        map((messageData) => {
          return messageData.messages.map((data) => {
            return {
              username: data.username,
              message: data.message,
              time: data.time,
              otherUser: data.otherUser,
              you: data.you,
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

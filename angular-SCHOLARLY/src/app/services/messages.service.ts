import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Subject } from 'rxjs';

export interface Message {
  id: string;
  username: string;
  message: string;
  time: string;
  otherUser: string;
  you: string;
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

  constructor(private http: HttpClient) {}

  getMessages(userId: string, username: string): any {
    this.http
      .get<{ message: string; messages: any }>(
        'https://skalarly.herokuapp.com/api/messages/OnetoOne',
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
        'https://skalarly.herokuapp.com/api/messages/OnetoOneSend',
        {
          params: { userId },
        }
      )
      .pipe(
        map((messageData) => {
          return messageData.messages.map((data) => {
            return {
              id: data._id,
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
        this.messageStart = transformedMessage;
        // this.messageStartUpdated.next([...this.messageStart]);
      });
  }
}

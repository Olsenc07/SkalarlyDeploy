import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { ReplaySubject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

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
export class MessageNotificationService {
  private messagesNotif: Message[] = [];

  private messagesInfoUpdated = new ReplaySubject<Message[]>();

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  getInfoUpdateListenerNotification(): any {
    return this.messagesInfoUpdated.asObservable();
  }

  getMessageNotification(userId: string, username: string): any {
    this.http
      .get<{ message: string; messages: any }>(
        'http://localhost:3000/api/messages/infoMessage',
        {
          params: { userId, username },
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
        this.messagesNotif = transformedMessage;
        this.messagesInfoUpdated.next([...this.messagesNotif]);
        console.log('hey chaz man', this.messagesNotif);
      });
  }

  deleteMessage(msgId: string): any {
    console.log('hey chase msgId', msgId);
    this.http
      .delete('http://localhost:3000/api/messages/deleteMsg/' + msgId)
      .subscribe(() => {
        const updatedPosts = this.messagesNotif.filter(
          (msg) => msg.id !== msgId
        );
        this.messagesNotif = updatedPosts;
        this.messagesInfoUpdated.next([...this.messagesNotif]);
        this.snackBar.open('Message deleted', 'Ok!', {
          duration: 3000,
        });
      });
  }
}

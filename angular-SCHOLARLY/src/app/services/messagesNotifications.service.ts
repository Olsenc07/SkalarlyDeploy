import { HttpClient, HttpHeaders } from '@angular/common/http';
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
}

@Injectable({
  providedIn: 'root',
})
export class MessageNotificationService {
  private messagesNotif: Message[] = [];

  // private messagesInfoUpdated = new Subject<Message[]>();
  private messgesInfoUpdatedNotifs = new Subject<Message[]>();

  private messagesDel: Message[] = [];
  private messagesInfoDel = new Subject<Message[]>();
  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  // getInfoUpdateListenerNotification(): any {
  //   return this.messagesInfoUpdated.asObservable();
  // }

  getListenerNotification(): any {
    return this.messgesInfoUpdatedNotifs.asObservable();
  }

  getMessageNotification(userId: string): any {
    this.http
      .get<{ message: string; messages: any }>(
        'https://www.skalarly.com/api/messages/infoMessage',
        {
          params: { userId },
        }
      )
      .pipe(
        map((messageData) => {
          return messageData.messages;
          // .map((data) => {
          // return {
          //   id: data._id,
          //   username: data.username,
          //   message: data.message,
          //   time: data.time,
          //   otherUser: data.otherUser,
          //   you: data.you,
          // };
          // });
        })
      )
      .subscribe((transformedMessage) => {
        this.messagesNotif = transformedMessage;
        console.log('deep end', this.messagesNotif);
        this.messgesInfoUpdatedNotifs.next([...this.messagesNotif]);
      });
  }

  // msg notif search
  getMessageNotificationFilter(userId: string, queryHash: string): any {
    console.log('my girl', queryHash);
    console.log('my babe', userId);

    this.http
      .get<{ message: string; messages: any }>(
        'https://www.skalarly.com/api/messages/getNotifMsgs',
        { params: { userId, queryHash } }
      )
      .pipe(
        map((messageData) => {
          return messageData.messages;
        })
      )
      .subscribe((transformedMessage) => {
        this.messagesNotif = transformedMessage;
        console.log('deep end yo', this.messagesNotif);
        this.messgesInfoUpdatedNotifs.next([...this.messagesNotif]);
      });
  }

  deleteMessage(msgId: string): any {
    this.http
      .delete<{ message: any }>(
        'https://www.skalarly.com/api/messages/deleteMsg/' + msgId
      )
      .subscribe(() => {
        const updatedPosts = this.messagesDel.filter((msg) => msg.id !== msgId);
        this.messagesDel = updatedPosts;
        this.messagesInfoDel.next([...this.messagesDel]);
        // this.snackBar.open('Message Deleted', '🗑', {
        //   duration: 2000,
        // });
      });
  }
}

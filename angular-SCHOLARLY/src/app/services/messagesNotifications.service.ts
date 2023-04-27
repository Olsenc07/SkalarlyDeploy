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
  viewed: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class MessageNotificationService {
  private messagesNotif: Message[] = [];
  private messagesNotifSent: Message[] = [];

  private messages: Message[] = [];

  // private messagesInfoUpdated = new Subject<Message[]>();
  private messgesInfoUpdatedNotifs = new Subject<Message[]>();
  // no matches
  private messgesInfoUpdatedNoMatches = new Subject<string>();

  private messagesDel: Message[] = [];
  private messagesInfoDel = new Subject<Message[]>();
  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  // getInfoUpdateListenerNotification(): any {
  //   return this.messagesInfoUpdated.asObservable();
  // }

  getListenerNotification(): any {
    return this.messgesInfoUpdatedNotifs.asObservable();
  }
  getListenerNoNotification(): any {
    return this.messgesInfoUpdatedNoMatches.asObservable();
  }

  // recieved messages
  getMessageNotification(userId: string): any {
    const sub = this.http
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
        sub.unsubscribe();
        console.log('eazy 1');
      });
  }

  viewedMessage(userId: string, username: string): any {
    console.log('view me baby', userId);
    const sub = this.http
      .get<{ message: string; messages: any }>(
        'https://www.skalarly.com/api/messages/viewedMessage',
        {
          params: { userId, username },
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
        console.log('shark', transformedMessage);
        this.messagesNotif = transformedMessage;
        console.log('deep end', this.messagesNotif);
        if (this.messagesNotif.length > 0) {
          console.log('whats the length', this.messagesNotif.length);
          // this.messgesInfoUpdatedNotifs.next([...this.messagesNotif]);
        }
        sub.unsubscribe();
        console.log('eazy 2');
      });
  }

  // msg notif search
  getMessageNotificationFilter(userId: string, queryHash: string): any {
    console.log('my girl', queryHash);
    console.log('my babe', userId);

    const sub = this.http
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
        if (this.messagesNotif.length === 0) {
          this.messgesInfoUpdatedNoMatches.next('7');
        } else {
          this.messgesInfoUpdatedNotifs.next([...this.messagesNotif]);
          console.log('matches found');
        }
        sub.unsubscribe();
        console.log('eazy 3');
      });
  }

  deleteMessage(msgId: string): any {
    const sub = this.http
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
        sub.unsubscribe();
        console.log('eazy 4');
      });
  }

  delConvo(postId: string): any {
    // console.log('hey chase postId', postId);
    const sub = this.http
      .delete<{ message: string; postId: Message }>(
        'https://www.skalarly.com/api/posts/delConvo/' + postId
      )
      .subscribe({
        next: (responseData) => {
          const DelConvo: Message = {
            id: responseData.postId.id,
            username: responseData.postId.username,
            message: responseData.postId.message,
            time: responseData.postId.time,
            otherUser: responseData.postId.otherUser,
            you: responseData.postId.you,
            viewed: responseData.postId.viewed,
          };

          // console.log('pete', responseData);
          console.log('getting it', this.messagesNotif);
          // const updatedPosts = this.messagesNotif.filter(
          //   (post) => post.id !== postId
          // );
          // console.log('interesting', updatedPosts);
          // this.messagesNotif = updatedPosts;
          this.messgesInfoUpdatedNotifs.next(this.messagesNotif);
          this.snackBar.open('Conversation Deleted', '🗑', {
            duration: 3000,
          });
          sub.unsubscribe();
          console.log('eazy 5');
        },
      });
  }
}

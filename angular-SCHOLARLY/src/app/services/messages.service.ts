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
    this.http
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
  delConvo(postId: string): any {
    // console.log('hey chase postId', postId);
    this.http
      .delete('https://www.skalarly.com/api/posts/delConvo/' + postId)
      .subscribe((transformedMessage) => {
        const updatedPosts = this.messages.filter((post) => post.id !== postId);
        this.messages = updatedPosts;
        this.messagesUpdated.next([...this.messages]);
        this.snackBar.open('Conversation Deleted', '🗑', {
          duration: 3000,
        });
      });
  }
}

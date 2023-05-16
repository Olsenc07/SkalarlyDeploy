import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import axios from 'axios';
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
  private messagesAutoFill = new Subject();

  private messageStart: Message[] = [];
  private messageStartUpdated = new Subject<Message[]>();
  // private messagesSent = new ReplaySubject<Message[]>();

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  async autoFillAI(text: string): Promise<any> {
    console.log('autofill text', text);

    // Getapi key
    this.http
      .get<{ message: string; messages: any }>(
        'https://www.skalarly.com/api/messages/HiddenApiKey'
      )
      .subscribe(async (transformedMessage) => {
        console.log('gotron', transformedMessage.messages);
        const HiddenApiKey = transformedMessage.messages;
        const options = {
          method: 'POST',
          url: 'https://typewise-ai.p.rapidapi.com/completion/complete',
          headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': HiddenApiKey,
            'X-RapidAPI-Host': 'typewise-ai.p.rapidapi.com',
          },
          data: {
            text: text,
            correctTypoInPartialWord: false,
            language: 'en',
          },
        };

        try {
          const response = await axios.request(options);
          console.log('windy brains', response.data.predictions);
          console.log('windy brains', response.data.predictions[0].text);
          this.messagesAutoFill.next(response.data.predictions[0].text);
        } catch (error) {
          console.error(error);
        }

        console.log('eazy 1');
      });
  }

  getInfoAutoFill(): any {
    return this.messagesAutoFill.asObservable();
  }

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

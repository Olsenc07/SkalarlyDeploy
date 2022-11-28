import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

import { io } from 'socket.io-client';
import { Subscription } from 'rxjs';
import { Picker } from 'emoji-picker-element';
import { ActivatedRoute } from '@angular/router';
import { MessageNotificationService } from '../services/messagesNotifications.service';
import { AuthService } from '../services/auth.service';
import { MessageService } from '../services/messages.service';
import { createPopup } from '@picmo/popup-picker';

export interface Message {
  id: string;
  username: string;
  message: string;
  time: string;
  you: string;
}
@Component({
  selector: 'app-messaging',
  templateUrl: './messaging.component.html',
  styleUrls: ['./messaging.component.scss'],
})
export class MessagingComponent implements OnInit {
  isLoading = false;
  userId: string;
  timeHour = new Date().getHours();
  timeMinute = new Date().getMinutes();
  text = this.timeHour >= 12 ? 'pm' : 'am';
  timeMinuteText = this.timeMinute < 10 ? '0' : '';
  dateDay = new Date().getDate();
  dateMonth = new Date().getMonth() + 1;
  time =
    this.timeHour +
    ':' +
    this.timeMinuteText +
    this.timeMinute +
    this.text +
    '\xa0' +
    this.dateDay +
    '/' +
    this.dateMonth;

  // Chat messaging
  chatForm = document.getElementById('send-container');
  socket = io();

  // allUsers should filter through every user
  allUsers: string[] = [];
  username: string;
  showEmojiPicker = false;
  search: FormControl = new FormControl('');
  message: FormControl = new FormControl('');
  fileUploadM: FormControl = new FormControl('');
  photoUploadM: FormControl = new FormControl('');

  filteredSearch: Observable<string[]>;

  constructor(
    private authService: AuthService,
    public messagesService: MessageService,
    private route: ActivatedRoute
  ) {
    // this.socket.on('disconnect', () => {
    //   console.log('disconnected bro');
    // });
  }

  ngOnInit(): any {
    this.userId = this.authService.getUserId();
    // this.messagesService.startMessages(this.userId);
    this.route.queryParams.subscribe((params) => {
      console.log('params main page', params?.username);
      this.username = params?.username;
    });
    // emits saved message
    // this.socket.on('messageSnd', (data) => {
    //   console.log('loaded in msgs', data);
    //   if (data.length) {
    //     data.forEach((data) => {
    //       this.appendMessages(data);
    //     });
    //   }
    // });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allUsers.filter(
      (user) => user.toLowerCase().indexOf(filterValue) === 0
    );
  }

  openEmoji(): void {
    const selectionContainer = document.getElementById('showEmojis');
    const triggerEmoji = document.getElementById('triggerEmo');
    console.log('star through');
    const picker = createPopup(
      {},
      {
        referenceElement: selectionContainer,
        triggerElement: triggerEmoji,
        position: 'top',
      }
    );

    picker.toggle();
    picker.addEventListener('emoji:select', (selection) => {
      console.log('Selected emoji: ', selection.emoji);
      const msgs = selection.emoji;
      const msg = this.message.value + msgs;
      this.message.setValue(msg);
    });
  }

  // Adding emojis
  // addEmoji(event: any): any {
  //   const msgs = event?.detail?.unicode;
  //   const msg = this.message.value + msgs;
  //   this.message.setValue(msg);
  // }

  emojiPreventClose($event: any): any {
    $event.stopPropagation();
  }
  uploadFile(): any {
    document.getElementById('fileInput').click();
  }
  uploadPic(): any {
    document.getElementById('picInput').click();
  }

  clearMessage(): void {
    this.message.setValue('');
  }

  trigger(MESSAGE): void {
    if (MESSAGE) {
      this.socket.emit('chat-messageSnd', {
        message: MESSAGE,
        userId: this.userId,
        time: this.time,
        otherUser: this.username,
      });
      // msg from server
      this.socket.on('messageSnd', (data) => {
        console.log('server msg', data);
        this.outputMessage(data);
      });
      this.message.reset('');
    }
  }

  outputMessage(data): void {
    const div = document.createElement('div');
    div.classList.add('data');
    if (this.userId === data.you) {
      div.innerHTML = `
      <div style="display: flex;
      height: 100%;
      width: 100%;
">
      <div
     class="chat-messages" id="container" style="background-color: #e7e7e7; margin-bottom:2%;padding: 0% 5% 0% 2%;
     width: fit-content; border-radius:25px" >
    <div class="message_" id="message-container" style="display:flex; flex-direction:row; ">
   <div style="margin:2% 2% 0% 5%" > @${data.username} </div>
   <div style="font-size:small; color: #878581;margin-top: 2%; justify-content: space-between;">  ${data.time}  </div>
   </div>
   <div style="text-align: center; margin-bottom: 2%; ">  ${data.message}  </div>
   </div>
   </div>
    `;
    } else {
      div.innerHTML = `   <div style="display: flex;
      justify-content: flex-end;
      height: 100%;
      width: 100%;
">
      <div
      class="chat-messages" id="container" style="background-color: #0056ba;padding: 0% 2%; 
      margin-bottom:2%; border-radius:25px;
      width: fit-content;padding:0% 5% 0% 2%; display: flex; flex-direction:column" >
      <div class="message_" id="message-container" style="display:flex; flex-direction:row; ">
     <div style="margin:2% 5% 0% 2%;color:white" > @${data.username} </div>
     <div style="font-size:small; color: #878581;margin-top: 2%;">  ${data.time}  </div>
     </div>
     <div style="display: flex; color:white;margin-bottom: 2%; justify-content: space-between; align-items: center;">  ${data.message}
    <i class="far fa-times-circle" style="color:#808080" delete_"; (click)="deleteMsg(data.id)" matTooltip="Delete message for both skalars"></i>
     </div>
     </div>
     </div>
      `;
    }
    document.getElementById('message-container').appendChild(div);
    const element = document.getElementById('message-container');
    element.scrollTop = element.scrollHeight;
  }
  //   appendMessages(data): void {
  //     const div = document.createElement('div');
  //     console.log('hey chaz 2', this.userId);

  //     div.classList.add('data');
  //     if (this.userId === data.you) {
  //       div.innerHTML = `
  //       <div style="display: flex;
  //       height: 100%;
  //       width: 100%;
  // ">
  //       <div
  //      class="chat-messages" id="container" style="background-color: #e7e7e7; width: fit-content; padding: 0% 2%;
  //       margin-bottom:2%; border-radius:25px;background-color: #10173a;" >
  //     <div class="message_" id="message-container" style="display:flex; flex-direction:row; ">
  //    <div style="margin:2% 2% 0% 5%" > @${data.username} </div>
  //    <div style="font-size:small; color: #b1acac;margin-top: 2%;">  ${data.time}  </div>
  //    </div>
  //    <div style="text-align: center;margin-bottom: 2%;">  ${data.message}  </div>
  //    </div>
  //    </div>
  //     `;
  //     } else {
  //       div.innerHTML = `<div style="display: flex;
  //       justify-content: flex-end;
  //       height: 100%;
  //       width: 100%;
  // ">
  //       <div
  //       class="chat-messages" id="container" style="background-color: #0056ba; margin-bottom:2%; border-radius:25px;
  //       width: fit-content;padding:0% 5% 0% 2%; display: flex; flex-direction:column" >
  //       <div class="message_" id="message-container" style="display:flex; flex-direction:row; justify-content: end; ">
  //      <div style="margin:2% 5% 0% 2%; color:white" > @${data.username} </div>
  //      <div style="font-size:small; color: #b1acac;margin-top: 2%;">  ${data.time}  </div>
  //      </div>
  //      <div style=" display: flex; color:white; margin-bottom: 2%;
  //  justify-content: space-between; align-items: center;">  ${data.message}
  //      <i class="far fa-times-circle delete_"; style="color: #808080";
  //  (click)="deleteMsg(data.id)" matTooltip="Delete message for both skalars"></i>
  //      </div>
  //      </div>
  //      </div>
  //       `;
  //     }
  //     document.getElementById('message-container').appendChild(div);
  //     const element = document.getElementById('message-container');
  //     element.scrollTop = element.scrollHeight;
  //   }
}

@Component({
  selector: 'app-card-messaging',
  templateUrl: './message-card.component.html',
  styleUrls: ['./messaging.component.scss'],
})
export class MessageCardComponent implements OnInit {
  userId: string;
  username: string;

  messages: Message[] = [];
  private datasSub: Subscription;
  constructor(
    private authService: AuthService,
    public messagesService: MessageService,
    private route: ActivatedRoute,
    private messageNotificationService: MessageNotificationService
  ) {}
  ngOnInit(): any {
    this.userId = this.authService.getUserId();
    // Pulls one to one msgs
    this.route.queryParams.subscribe((params) => {
      this.username = params?.username;
      this.messagesService.getMessages(this.userId, this.username);
      this.datasSub = this.messagesService
        .getInfoUpdateListener()
        .subscribe((messages: Message[]) => {
          this.messages = messages;
          console.log('datas pulled', this.messages);
        });
    });
  }
  deleteMsg(msgId: string): any {
    console.log('jesse', msgId);
    this.messageNotificationService.deleteMessage(msgId);
  }
}

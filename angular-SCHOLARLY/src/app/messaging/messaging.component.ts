import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

import { io } from 'socket.io-client';
import { Subscription } from 'rxjs';
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
  timeHourInitial = new Date().getHours();
  timeHour = this.testNum(this.timeHourInitial);
  timeMinute = new Date().getMinutes();
  text = this.timeHourInitial >= 12 ? 'pm' : 'am';
  timeMinuteText = this.timeMinute < 10 ? '0' : '';
  dateDay = new Date().getDate();
  dateMonth = new Date().getMonth();
  dateMonthName = this.testMonth(this.dateMonth);
  time =
    this.dateMonthName +
    '\xa0' +
    this.dateDay +
    this.timeHour +
    ':' +
    this.timeMinuteText +
    this.timeMinute +
    '\xa0' +
    this.text;

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
  ) {}

  ngOnInit(): any {
    this.userId = this.authService.getUserId();
    // this.messagesService.startMessages(this.userId);
    this.route.queryParams.subscribe((params) => {
      console.log('params main page', params?.username);
      this.username = params?.username;
    });
  }
  // Am Pm instead of 24hr clock
  testNum(timeHourInitial: any): number {
    if (timeHourInitial > 12) {
      if (timeHourInitial === 13) {
        return 1;
      }
      if (timeHourInitial === 14) {
        return 2;
      }
      if (timeHourInitial === 15) {
        return 3;
      }
      if (timeHourInitial === 16) {
        return 4;
      }
      if (timeHourInitial === 17) {
        return 5;
      }
      if (timeHourInitial === 18) {
        return 6;
      }
      if (timeHourInitial === 19) {
        return 7;
      }
      if (timeHourInitial === 20) {
        return 8;
      }
      if (timeHourInitial === 21) {
        return 9;
      }
      if (timeHourInitial === 22) {
        return 10;
      }
      if (timeHourInitial === 23) {
        return 11;
      }
      if (timeHourInitial === 24) {
        return 12;
      }
    } else {
      return timeHourInitial;
    }
  }
  testMonth(dateMonth: any): string {
    if (dateMonth === 0) {
      return 'Jan';
    }
    if (dateMonth === 1) {
      return 'Feb';
    }
    if (dateMonth === 2) {
      return 'Mar';
    }
    if (dateMonth === 3) {
      return 'Apr';
    }
    if (dateMonth === 4) {
      return 'May';
    }
    if (dateMonth === 5) {
      return 'June';
    }
    if (dateMonth === 6) {
      return 'July';
    }
    if (dateMonth === 7) {
      return 'Aug';
    }
    if (dateMonth === 8) {
      return 'Sept';
    }
    if (dateMonth === 9) {
      return 'Oct';
    }
    if (dateMonth === 10) {
      return 'Nov';
    }
    if (dateMonth === 11) {
      return 'Dec';
    }
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
    const picker = createPopup(
      {},
      {
        referenceElement: selectionContainer,
        triggerElement: triggerEmoji,
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
      this.socket.once('messageSnd', (data) => {
        console.log('server msg', data);
        this.outputMessage(data);
      });
      this.message.reset('');
      this.messagesService.sentNotif();
    }
    // Show green check mark
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
   <div style="margin:2% 2% 0% 5%;font-size: small;color:#878581;" > @${data.username} </div>
   <div style="font-size:small; color: #878581;margin-top: 2%; justify-content: space-between;">  ${data.time}  </div>
   </div>
   <div style=" margin-bottom: 2%;font-size: smaller; ">  ${data.message}  </div>
   </div>
   </div>
    `;
    } else {
      div.innerHTML = `  <div style="display: flex;
      justify-content: flex-end;
      height: 100%;
      width: 100%;
">
      <div
      class="chat-messages" id="container" style="background-color: #0056ba;padding: 0% 2%; 
      margin-bottom:2%; border-radius:25px;
      width: fit-content;padding:0% 5% 0% 2%; display: flex; flex-direction:column" >
      <div class="message_" id="message-container" style="display:flex; flex-direction:row; ">
     <div style="margin:2% 5% 0% 2%;color: #b1acac;font-size: small;" > @${data.username} </div>
     <div style="font-size:small; color: #878581;margin-top: 2%;">  ${data.time}  </div>
     </div>
     <div style="display: flex; color:white;margin-bottom: 2%; justify-content: space-between; align-items: center; font-size: smaller;">  ${data.message}
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
    this.messageNotificationService.deleteMessage(msgId);
    location.reload();
  }
}

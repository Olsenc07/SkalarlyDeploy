import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

import { io } from 'socket.io-client';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageNotificationService } from '../services/messagesNotifications.service';
import { AuthService } from '../services/auth.service';
import { MessageService } from '../services/messages.service';
import { createPopup } from '@picmo/popup-picker';
import { formatDistance } from 'date-fns';

export interface Message {
  id: string;
  username: string;
  message: string;
  time: Date;
  you: string;
  sent: string;
}
@Component({
  selector: 'app-messaging',
  templateUrl: './messaging.component.html',
  styleUrls: ['./messaging.component.scss'],
})
export class MessagingComponent implements OnInit, OnDestroy {
  isLoading = false;
  userId: string;
  autofill: string;
  msgFilter: FormControl = new FormControl('');
  time = new Date();
  // Chat messaging
  chatForm = document.getElementById('send-container');
  socket = io();
  public notifs = [];
  messagesNotif: Message[] = [];
  messagesNotifSent: Message[] = [];
  messagesNoNotif = '';
  matches = [];
  // allUsers should filter through every user
  allUsers: string[] = [];
  // username: string;
  username = '';
  showEmojiPicker = false;
  search: FormControl = new FormControl('');
  message: FormControl = new FormControl('');
  fileUploadM: FormControl = new FormControl('');
  photoUploadM: FormControl = new FormControl('');

  filteredSearch: Observable<string[]>;
  private routeSub: Subscription;
  private msgNotifSub: Subscription;
  private msgNotifSubSent: Subscription;
  private msgNotifNoSub: Subscription;
  private chatSub: Subscription;
  private delSub: Subscription;
  private clearSub: Subscription;
  private msgNotif2Sub: Subscription;

  constructor(
    private authService: AuthService,
    public messagesService: MessageService,
    private messageNotificationService: MessageNotificationService,

    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): any {
    this.userId = this.authService.getUserId();
    // this.messagesService.startMessages(this.userId);

    // recieving messages
    this.messageNotificationService.getMessageNotification(this.userId);
    this.msgNotifSub = this.messageNotificationService
      .getListenerNotification()
      .subscribe((messagesNotifYo: any) => {
        this.isLoading = false;
        console.log('killa', messagesNotifYo);
        messagesNotifYo.forEach((e) => {
          if (e.time) {
            console.log('time', e.time);
            console.log('type of time', typeof e.time);
            console.log('type of time22', typeof new Date(e.time));

            e.time = formatDistance(new Date(e.time), new Date(), {
              addSuffix: true,
            });
          }
        });
        this.messagesNotif = messagesNotifYo;

        // moment().fromNow()
        // compare these times with sent message times
        // and then add send value or not
        console.log('should be viewed now 777', this.messagesNotif);
      });
    this.routeSub = this.route.queryParams.subscribe((params) => {
      console.log('params main page', params?.username);
      this.username = params?.username;
      console.log('username', this.username);
    });
  }

  ngOnDestroy(): any {
    this.routeSub.unsubscribe();
    this.msgNotifSub.unsubscribe();
    // this.msgNotifSubSent.unsubscribe();
  }
  enedMessaged(username: string): void {}
  navigateToPage(infoUser: string): any {
    this.router.navigate(['/skalars/:'], { queryParams: { id: infoUser } });
  }
  delConvo(postId: string): any {
    console.log('pI', postId);
    this.messageNotificationService.delConvo(postId);
    this.delSub = this.messageNotificationService
      .getListenerNotification()
      .subscribe((messagesNotif: Message[]) => {
        this.isLoading = false;
        this.messagesNotif = messagesNotif;
        this.messagesNoNotif = '';
        this.delSub.unsubscribe();
      });
  }
  // resets search
  clear(): void {
    this.msgFilter.setValue('');
    console.log('coffee time');
    this.messageNotificationService.getMessageNotification(this.userId);
    this.clearSub = this.messageNotificationService
      .getListenerNotification()
      .subscribe((messagesNotif: Message[]) => {
        this.messagesNotif = messagesNotif;
        this.messagesNoNotif = '';
        console.log('cleared now', this.messagesNotif);
        this.clearSub.unsubscribe();
      });
  }
  // Search notifs
  sendDataNotif(event: any): any {
    const queryHash: string = event.target.value;
    if (queryHash) {
      this.messagesNoNotif = '';
      console.log('empties', queryHash);
      const regex = /\w/g;
      const noSpecialChars = queryHash.replace(/[^a-zA-Z0-9 ]/g, '');
      console.log('noSpecialChars', noSpecialChars);
      if (!queryHash.match(regex)) {
        console.log('we have an empty input');
        this.messageNotificationService.getMessageNotification(this.userId);
        this.clearSub = this.messageNotificationService
          .getListenerNotification()
          .subscribe((messagesNotif: Message[]) => {
            this.messagesNotif = messagesNotif;
            this.messagesNoNotif = '';
            console.log('cleared now from empty box', this.messagesNotif);
            this.clearSub.unsubscribe();
          });
        // Will match if query is nothing or is only spaces
        // const matchSpaces: any = queryHash.match('[a-zA-Z0-9]');
        // if (matchSpaces[0] !== queryHash) {

        // this.messageNotificationService.getMessageNotification(this.userId);
        // this.messageNotificationService
        //   .getListenerNotification()
        //   .subscribe((messagesNotif: Message[]) => {
        //     console.log('g eazy', messagesNotif);
        //     this.isLoading = false;
        //     this.messagesNotif = messagesNotif.reverse();
        //   });

        // } else {
        //   this.messageNotificationService.getMessageNotificationFilter(
        //     this.userId,
        //     queryHash.trim()
        //   );

        // this.messageNotificationService
        //     .getListenerNotification()
        //     .subscribe((messagesNotif: Message[]) => {
        //       console.log('eminem', messagesNotif);
        //       this.isLoading = false;
        //       this.messagesNotif = messagesNotif.reverse();
        //     });

        // }
      } else {
        this.messageNotificationService.getMessageNotificationFilter(
          this.userId,
          noSpecialChars.trim()
        );
        this.msgNotif2Sub = this.messageNotificationService
          .getListenerNotification()
          .subscribe((messagesNotif: Message[]) => {
            console.log('g eazy', messagesNotif);
            this.isLoading = false;
            this.messagesNotif = messagesNotif;
            this.msgNotif2Sub.unsubscribe();
          });
        this.msgNotifNoSub = this.messageNotificationService
          .getListenerNoNotification()
          .subscribe((messagesNoNotif: string) => {
            console.log('50 cent', messagesNoNotif);
            this.messagesNoNotif = messagesNoNotif;
            this.msgNotifNoSub.unsubscribe();
          });
        // console.log('tumblr girls');
        // this.messageNotificationService.getMessageNotification(this.userId);
        // this.messageNotificationService
        //   .getListenerNotification()
        //   .subscribe((messagesNotif: Message[]) => {
        //     this.messagesNotif = messagesNotif.reverse();
        //     console.log(' be viewed now', this.messagesNotif);
        //   });
      }
    } else {
      this.messageNotificationService.getMessageNotification(this.userId);
      this.clearSub = this.messageNotificationService
        .getListenerNotification()
        .subscribe((messagesNotif: Message[]) => {
          this.messagesNotif = messagesNotif;
          this.messagesNoNotif = '';
          console.log(' empty box', this.messagesNotif);
          this.clearSub.unsubscribe();
        });
    }
  }
  navigateToChat(username: string): any {
    // view messages
    this.messageNotificationService.viewedMessage(this.userId, username);
    // sets the new pulled data to display envelop opening
    this.messageNotificationService.getMessageNotification(this.userId);
    this.chatSub = this.messageNotificationService
      .getListenerNotification()
      .subscribe((messagesNotifYo: Message[]) => {
        // this.messagesNotif = messagesNotif.reverse();
        this.messagesNotif = messagesNotifYo;

        this.router.navigate(['/messages/:'], { queryParams: { username } });
        this.chatSub.unsubscribe();
      });
    // const ID = (document.getElementById('userName') as HTMLInputElement).value;
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

  // AI typewise
  autoFill(text): void {
    console.log('text', text.value);
    this.messagesService.autoFillAI(text.value);

    this.messagesService.getInfoAutoFill().subscribe((AutoFill) => {
      console.log('autofill', AutoFill);
      // Last character i text to match first character in autofill
      // remove first character in autofill if it matches
      // unless empty space
      const space = text.value.at(-1).match(/\s/);
      console.log('space', space);
      if (space === null) {
        this.autofill = AutoFill.slice(1);
        console.log('auto bots2', this.autofill);
      } else {
        this.autofill = AutoFill;
        console.log('auto bots1', this.autofill);
      }
    });
  }
  fillInAutoFill(): void {
    this.message.setValue(this.message.value + this.autofill);
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
      // this.messagesService.sentNotif();
    }
    // Show green check mark
  }

  outputMessage(data): void {
    const Time = formatDistance(new Date(data.time), new Date(), {
      addSuffix: true,
    });
    const div = document.createElement('div');
    div.classList.add('data');
    if (this.userId === data.you) {
      div.innerHTML = `
      <div style="display: flex;
      height: 100%;
      width: 100%;
">
      <div
     class="chat-messages" id="container" style="background-color: #e7e7e7; margin-bottom:2%;padding: 0% 5% 0% 3%;
     width: fit-content; border-radius:25px" >
    <div class="message_" id="message-container" style="display:flex; flex-direction:row; ">
   <div style="margin:2% 2% 0% 5%;font-size: small;color:#878581;" > @${data.username} </div>
   <div style="font-size:small; color: #878581;margin-top: 2%; justify-content: space-between; white-space: nowrap;">  ${Time}  </div>
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
      width: fit-content;padding:0% 5% 0% 3%; display: flex; flex-direction:column" >
      <div class="message_" id="message-container" style="display:flex; flex-direction:row; ">
     <div style="margin:2% 5% 0% 2%;color: #b1acac;font-size: small;" > @${data.username} </div>
     <div style="font-size:small; color: #878581;margin-top: 2%; white-space: nowrap;">  ${Time}  </div>
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
export class MessageCardComponent implements OnInit, OnDestroy {
  userId: string;
  username: string;
  messagesYoSent = [];
  messagesYoRecieved = [];
  messagesYoCombined = [];
  messages: Message[] = [];
  private datasSub: Subscription;
  private routeSub: Subscription;
  constructor(
    private authService: AuthService,
    public messagesService: MessageService,
    private route: ActivatedRoute,
    private messageNotificationService: MessageNotificationService
  ) {}
  ngOnInit(): any {
    // this.messages = []
    this.userId = this.authService.getUserId();
    // Pulls one to one msgs
    this.routeSub = this.route.queryParams.subscribe((params) => {
      this.username = params?.username;
      this.messagesService.getMessages(this.userId, this.username);
      console.log('new pulls', this.username);
    });

    this.datasSub = this.messagesService
      .getInfoUpdateListener()
      .subscribe((messagesYo: any) => {
        console.log('length of original', messagesYo.length);
        console.log('original', messagesYo);
        this.messagesYoRecieved = [];
        this.messagesYoSent = [];
        messagesYo.forEach((e) => {
          // recieved
          if (e.you !== this.userId) {
            this.messagesYoRecieved.push(e);
            console.log('top it up recieved');
          } else {
            // sent
            this.messagesYoSent.push(e);
            console.log('top it up');
          }
        });
        // recieved
        if (this.messagesYoRecieved.length > 0) {
          const maxTime = this.messagesYoRecieved.reduce((prev, current) =>
            prev.time > current.time ? prev : current
          );
          console.log('max time', maxTime.time);
          this.messagesYoRecieved.forEach((newestMsg) => {
            if (newestMsg.time == maxTime.time) {
              newestMsg.newestRecieved = 'true';
              console.log('top it up we inside 2 recieved', newestMsg);
            }
          });
        }
        // sent
        if (this.messagesYoSent.length > 0) {
          const maxTime2 = this.messagesYoSent.reduce((prev, current) =>
            prev.time > current.time ? prev : current
          );
          this.messagesYoSent.forEach((newestMsg) => {
            console.log('max time sent', maxTime2.time);
            if (newestMsg.time == maxTime2.time) {
              newestMsg.newestSent = 'true';
              console.log('top it up we inside 2', newestMsg);
            }
          });
        }
        // combine
        this.messagesYoCombined = this.messagesYoSent.concat(
          this.messagesYoRecieved
        );
        console.log('whats up cus', this.messagesYoCombined);
        if (messagesYo.length == this.messagesYoCombined.length) {
          this.messagesYoCombined.sort((a, b) => {
            let newest = new Date(a.time).valueOf(),
              older = new Date(b.time).valueOf();
            return newest - older;
          });
          console.log('whats up cus sorted', this.messagesYoCombined);
          this.messagesYoCombined.forEach((e) => {
            console.log('time 2', e.time);
            console.log('type of time 2', typeof e.time);
            e.time = formatDistance(new Date(e.time), new Date(), {
              addSuffix: true,
            });
          });

          this.messages = this.messagesYoCombined;
          console.log('datas pulled', this.messages);
        }
      });
  }
  ngOnDestroy(): any {
    this.routeSub.unsubscribe();
    this.datasSub.unsubscribe();
    console.log('clear');
  }
  deleteMsg(msgId: string): any {
    this.messageNotificationService.deleteMessage(msgId);
    location.reload();
  }
}

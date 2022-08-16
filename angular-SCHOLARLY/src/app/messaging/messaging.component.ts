import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { io } from 'socket.io-client';
import { Subscription } from 'rxjs';

import { AuthDataInfo } from '../signup/auth-data.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-card-messaging',
  templateUrl: './messaging.component.html',
  styleUrls: ['./messaging.component.scss'],
})
export class MessagingComponent implements OnInit {
  userId: string;

  timeHour = new Date().getHours();
  timeMinute = new Date().getMinutes();
  text = this.timeHour >= 12 ? 'pm' : 'am';

  time = this.timeHour + ':' + this.timeMinute + this.text;
  infos: AuthDataInfo[] = [];
  private infosSub: Subscription;
  // Chat messaging
  chatForm = document.getElementById('send-container');
  socket = io();

  // allUsers should filter through every user
  allUsers: string[] = [];
  //  List of people you are talking to
  //  chats = [''];

  search: FormControl = new FormControl('');
  message: FormControl = new FormControl('');
  fileUploadM: FormControl = new FormControl('');
  photoUploadM: FormControl = new FormControl('');

  filteredSearch: Observable<string[]>;

  constructor(private authService: AuthService) {
    this.authService.getInfo();
    this.infosSub = this.authService
      .getInfoUpdateListener()
      .subscribe((infos: AuthDataInfo[]) => {
        this.infos = infos;
      });
    // msg from server
    this.socket.on('chat-messageSnd', (message) => {
      console.log('server msg', message);
      this.outputMessage(message);
    });
  }

  ngOnInit(): any {
    this.userId = this.authService.getUserId();

    // Pulls all messages
    this.socket.on('output-messages', (data) => {
      console.log('loaded in msgs', data);
      if (data.length) {
        data.forEach((data) => {
          this.appendMessages(data);
        });
      }
    });

    // Pulls specific convos msgs
    this.socket.on('One-One', (data) => {
      console.log('loaded in msgs', data);
      if (data.length) {
        data.forEach((data) => {
          this.appendMessages(data);
        });
      }
    });
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allUsers.filter(
      (user) => user.toLowerCase().indexOf(filterValue) === 0
    );
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

  trigger(): void {
    if (this.message.value) {
      this.socket.emit('chat-messageSnd', {
        message: this.message.value,
        userId: this.userId,
        time: this.time,
      });
      this.message.reset('');
      console.log('time', this.time);
    }
  }

  outputMessage(message): void {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<div
     class="chat-messages" id="container" style="background-color: #e7e7e7; margin-bottom:2%; border-radius:25px" >
    <div class="message_ id="message-container" style="display:flex; flex-direction:row; ">
   <div style="margin:0% 2% 0% 2%" > @${message.username} </div>
   <div style="font-size:small; color: #878581">  ${message.time}  </div>
   </div>
   <div style="margin-left:4%">  ${message.message}  </div>
   </div>
    `;
    document.getElementById('message-container').appendChild(div);
    const element = document.getElementById('message-container');
    element.scrollTop = element.scrollHeight;
  }
  appendMessages(data) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<div
     class="chat-messages" id="container" style="background-color: #e7e7e7; margin-bottom:2%; border-radius:25px" >
    <div class="message_ id="message-container" style="display:flex; flex-direction:row; ">
   <div style="margin:0% 2% 0% 2%" > @${data.username} </div>
   <div style="font-size:small; color: #878581">  ${data.time}  </div>
   </div>
   <div style="margin-left:4%">  ${data.message}  </div>
   </div>
    `;
    document.getElementById('message-container').appendChild(div);
  }
}

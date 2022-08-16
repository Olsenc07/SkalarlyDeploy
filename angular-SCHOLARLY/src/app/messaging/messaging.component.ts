import { Component } from '@angular/core';
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
export class MessagingComponent {
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

      // scroll down
    });
    // this.chatForm.addEventListener('submit', (e) => {
    //   e.preventDefault();
    //   const msg = this.message.value;
    //   console.log('lucky 7', msg);
    // });
    // this.filteredSearch = this.search.valueChanges.pipe(
    //   map((user: string | null) =>
    //     user ? this._filter(user) : this.allUsers.slice()
    //   )
    // );
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
    this.socket.emit('chat-messageSnd', this.message.value);
    this.message.reset('');
  }

  outputMessage(message): void {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<div
     class="chat-messages" id="container" style="background-color: #c1c0c0; margin-bottom:2%; border-radius:25px" >
    <div class="message_ id="message-container" style="display:flex; flex-direction:row; ">
   <div style="margin:0% 2% 0% 2%" > ${message.username} </div>
   <div style="font-size:smaller">  ${message.time}  </div>
   </div>
   <div style="margin-left:4%">  ${message.text}  </div>
   </div>
    `;
    document.getElementById('message-container').appendChild(div);
    const element = document.getElementById('message-container');
    element.scrollTop = element.scrollHeight;
  }
}

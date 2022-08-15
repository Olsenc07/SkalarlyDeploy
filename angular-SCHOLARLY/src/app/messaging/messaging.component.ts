import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { io } from 'socket.io-client';
import { Socket } from 'ngx-socket-io';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-card-messaging',
  templateUrl: './messaging.component.html',
  styleUrls: ['./messaging.component.scss'],
})
export class MessagingComponent {
  // Chat messaging
  messageContainer = document.getElementById('message-container');
  messageForm = document.getElementById('send-container');
  messageInput = document.getElementById('message-input') as HTMLInputElement;
  messageSent = this.messageInput;
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

  // joinRoomButton.addEventListener('click', () => {
  //   const room = roomInput.value
  // })

  constructor() {
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
    console.log('message', this.message.value);
    this.socket.emit('chat-messageSnd', this.message.value);
    this.message.reset('');
  }
}

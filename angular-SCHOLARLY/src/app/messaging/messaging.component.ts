import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-card-messaging',
  templateUrl: './messaging.component.html',
  styleUrls: ['./messaging.component.scss'],
})
export class MessagingComponent {
  // const joinRoomButton = document.getElementByID("room-button")
  // const messageInput = document.getElementById('message-input');
  // const roomInput = document.getElementById('room-input')
  // const form = document.getElementById('form');
  // const socket = io('http://localhost:3000');

  // allUsers should filter through every user
  allUsers: string[] = [''];
  //  List of people you are talking to
  //  chats = [''];

  search: FormControl = new FormControl('');
  message: FormControl = new FormControl('');
  fileUploadM: FormControl = new FormControl('');
  photoUploadM: FormControl = new FormControl('');

  filteredSearch: Observable<string[]>;

  // Sends message
  sendMsg(): any {}

  // joinRoomButton.addEventListener('click', () => {
  //   const room = roomInput.value
  // })

  constructor() {
    this.filteredSearch = this.search.valueChanges.pipe(
      map((user: string | null) =>
        user ? this._filter(user) : this.allUsers.slice()
      )
    );
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

  //   socket.io('connect', () => {
  //     displayMessage('You connected with id: ${socket.id}');
  // })

  // form.addEventListener('submit', e => {
  //     e.preventDefault();
  //     const message = messageInput.value;
  //     const room = roomInput.value;

  //     if (message === '') return;
  //     displayMessage(message);

  //     messageInput.value = '';

  // } );
}

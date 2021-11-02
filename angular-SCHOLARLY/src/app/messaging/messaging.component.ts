import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';


@Component({
    selector: 'messaging',
    templateUrl: './messaging.component.html',
    styleUrls: ['./messaging.component.scss'],
})
export class MessagingComponent {
 // allUsers should filter through every user
 allUsers: string[] = [''];
//  List of people you are talking to
 chats = [''];

    search: FormControl = new FormControl('');
    message: FormControl = new FormControl('');
    fileUploadM: FormControl = new FormControl('');
    photoUploadM: FormControl = new FormControl('');


    filteredSearch: Observable<string[]>;


    // Sends message
    sendMsg(){};

    constructor( )
        {
        this.filteredSearch = this.search.valueChanges.pipe(
            map((user: string | null) => user ? this._filter(user) : this.allUsers.slice()));
        }
        private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();
        return this.allUsers.filter(user => user.toLowerCase().indexOf(filterValue) === 0);
              }
           
              
              uploadFile(): any {
                document.getElementById('fileInput').click();
              };
              uploadPic(): any {
                document.getElementById('picInput').click();
              };

};
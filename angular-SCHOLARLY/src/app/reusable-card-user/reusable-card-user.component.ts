import { Component, OnInit } from '@angular/core';
import { StoreService } from '../services/store.service';


@Component({
    selector: 'app-card-user',
    templateUrl: './reusable-card-user.component.html',
    styleUrls: ['./reusable-card-user.component.scss'],
})
export class ReusableCardUserComponent {
    // sends request to data base to get mutual friends list, by clicking on shaking hands emoji
    profile = StoreService.profile$$;
    id = StoreService.userId$$;


    constructor() { }

}


@Component({
    selector: 'app-card-message',
    templateUrl: './reusable-card-message.component.html',
    styleUrls: ['./reusable-card-user.component.scss'],
})
export class ReusableCardMessageComponent {
    // Gets the id == id to fill mutual friends list from data base
    profile = StoreService.profile$$;
    constructor() { }
}


@Component({
    selector: 'app-card-mutual',
    templateUrl: './reusable-card-mutual.component.html',
    styleUrls: ['./reusable-card-user.component.scss'],
})
export class ReusableCardMutualComponent {
    // Gets the id == id to fill mutual friends list from data base
    profile = StoreService.profile$$;
    constructor() { }
}
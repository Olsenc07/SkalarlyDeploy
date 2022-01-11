import { Component, OnInit } from '@angular/core';
import { StoreService, Profile } from '../services/store.service';
import { Subscription } from 'rxjs';


@Component({
    selector: 'app-card-user',
    templateUrl: './reusable-card-user.component.html',
    styleUrls: ['./reusable-card-user.component.scss'],
})
export class ReusableCardUserComponent implements OnInit {
    storeProfiles: Profile[] = [];
    profiles: Profile[] = [];
    private profilesSub: Subscription;
    // sends request to data base to get mutual friends list, by clicking on shaking hands emoji
    profile = StoreService.profile$$;
    id = StoreService.userId$$;

    isLoading = false;
    constructor(public storeService: StoreService) { }

    ngOnInit() {
        this.isLoading = true;
        this.storeService.getProfiles();
        this.profilesSub = this.storeService.getProfileUpdateListener()
         .subscribe((profiles: Profile[]) => {
            this.isLoading = false;
            this.profiles = profiles;
         });
    }

}


@Component({
    selector: 'app-card-message',
    templateUrl: './reusable-card-message.component.html',
    styleUrls: ['./reusable-card-user.component.scss'],
})
export class ReusableCardMessageComponent implements OnInit {
    storeProfiles: Profile[] = [];
    profiles: Profile[] = [];
    private profilesSub: Subscription;

    isLoading = false;
    // Gets the id == id to fill mutual friends list from data base
    profile = StoreService.profile$$;
    constructor(public storeService: StoreService) { }

    ngOnInit() {
        this.isLoading = true;
        this.storeService.getProfiles();
        this.profilesSub = this.storeService.getProfileUpdateListener()
         .subscribe((profiles: Profile[]) => {
             this.isLoading = false;
             this.profiles = profiles;
         });
    }
}


@Component({
    selector: 'app-card-mutual',
    templateUrl: './reusable-card-mutual.component.html',
    styleUrls: ['./reusable-card-user.component.scss'],
})
export class ReusableCardMutualComponent implements OnInit{
    storeProfiles: Profile[] = [];
    profiles: Profile[] = [];
    private profilesSub: Subscription;

    isLoading = false;
    // Gets the id == id to fill mutual friends list from data base
    profile = StoreService.profile$$;
    constructor(public storeService: StoreService) { }

    ngOnInit() {
        this.isLoading = true;
        this.storeService.getProfiles();
        this.profilesSub = this.storeService.getProfileUpdateListener()
         .subscribe((profiles: Profile[]) => {
             this.isLoading = false;
             this.profiles = profiles;
         });
    }
}
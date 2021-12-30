import { Component, OnInit } from '@angular/core';
import { StoreService, Profile } from '../services/store.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-card-request',
    templateUrl: './reusable-card-request.component.html',
    styleUrls: ['./reusable-card-request.component.scss'],
})

export class ReusableCardRequestComponent implements OnInit {
    storeProfiles: Profile[] = [];
    profiles: Profile[] = [];
    private profilesSub: Subscription;


   
    ids = StoreService.ids;


    constructor(public storeService: StoreService) { }

    ngOnInit() {
        this.storeService.getProfiles();
        this.profilesSub = this.storeService.getProfileUpdateListener()
         .subscribe((profiles: Profile[]) => {
             this.profiles = profiles;
         });
    }
}



@Component({
    selector: 'app-card-recommendation',
    templateUrl: './reusable-card-recommendation.component.html',
    styleUrls: ['./reusable-card-request.component.scss'],
})
export class ReusableCardRecommendationComponent implements OnInit {
    storeProfiles: Profile[] = [];
    profiles: Profile[] = [];
    private profilesSub: Subscription;




    ids = StoreService.ids;


    constructor(public storeService: StoreService) { }

    ngOnInit() {
        this.storeService.getProfiles();
        this.profilesSub = this.storeService.getProfileUpdateListener()
         .subscribe((profiles: Profile[]) => {
             this.profiles = profiles;
         });
    }
}

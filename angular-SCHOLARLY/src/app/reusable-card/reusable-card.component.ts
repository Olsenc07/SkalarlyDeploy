import { Component } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { AttendanceComponent } from '../main-pages/main-pages.component';
import { TaggedComponent } from '../main-pages/main-pages.component';
import { PostService } from '../services/post.service';
import { StoreService } from '../services/store.service';

@Component({
    selector: 'app-card',
    templateUrl: './reusable-card.component.html',
    styleUrls: ['./reusable-card.component.scss'],
})
export class ReusableCardComponent {

    post = PostService.post$$;
    profile = StoreService.profile$$;
    id = StoreService.userId$$;


    // gender$ = PostService.gender$;
    // booleans$ = PostService.booleans$;
    // event$ = PostService.event$;

    selectedAttend = '';
    attendances: any = [
        'Attending', 'Maybe', 'Not Attending'
    ];
    panelOpenState = false;
    showCases = [
        // '../../assets/Pics/IMG-8413.PNG',
        // '../../assets/Pics/IMG-8619.PNG',
        '../../assets/Pics/WhiteSquareInAppLogo.jpg',
        // '../../assets/Pics/IMG-8413.PNG', 
        // '../../assets/Pics/IMG-8619.PNG',
        // '../../assets/Pics/ProperInAppLogo.jpeg ',
        // '../../assets/Pics/IMG-8413.PNG'
    ];

    radioChange(event: any): any {
        this.selectedAttend = event.target.value;
    }

    openAttendanceSheet(): void {
        this.bottomSheet.open(AttendanceComponent);
    }
    openTaggedSheet(): void {
        this.bottomSheet.open(TaggedComponent);
    }

    constructor(private bottomSheet: MatBottomSheet) { }
}


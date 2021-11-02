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


    showCases = [
        // '../../assets/Pics/IMG-8413.PNG',
        // '../../assets/Pics/IMG-8619.PNG',
        '../../assets/Pics/WhiteSquareInAppLogo.jpg',
        // '../../assets/Pics/IMG-8413.PNG', 
        // '../../assets/Pics/IMG-8619.PNG',
        // '../../assets/Pics/ProperInAppLogo.jpeg ',
        // '../../assets/Pics/IMG-8413.PNG'
    ];


    openAttendanceSheet(): void {
        this.bottomSheet.open(AttendanceComponent);
    }
    openTaggedSheet(): void {
        this.bottomSheet.open(TaggedComponent);
    }
    selectedAttend: string = '';
    attendances: any = [
        'Attending', 'Maybe', 'Not Attending'
    ];
    radioChange(event: any) {
        this.selectedAttend = event.target.value;
    }


    panelOpenState = false;
    constructor(private bottomSheet: MatBottomSheet) { }
}


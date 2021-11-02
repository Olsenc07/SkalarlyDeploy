import { Component } from '@angular/core';
import { StoreService } from '../services/store.service';
import { PostService } from '../services/post.service';

@Component({
    selector: 'app-card-brief',
    templateUrl: './reusable-card-brief.component.html',
    styleUrls: ['./reusable-card-brief.component.scss'],
})

export class ReusableCardBriefComponent {
    profile = StoreService.profile$$;
    post = PostService.post$$;
    id = StoreService.userId$$;

    constructor() { }
}
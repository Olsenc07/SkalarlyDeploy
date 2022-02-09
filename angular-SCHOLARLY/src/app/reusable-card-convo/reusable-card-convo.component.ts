import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AuthDataInfo } from '../signup/auth-data.model';

@Component({
    selector: 'app-card-convo',
    templateUrl: './reusable-card-convo.component.html',
    styleUrls: ['./reusable-card-convo.component.scss'],
})

export class ReusableCardConvoComponent implements OnInit {
    userId: string;
    userIsAuthenticated = false;
    private authListenerSubs: Subscription;

    isLoading = false;

    infos: AuthDataInfo[] = [];
    private infosSub: Subscription;

    constructor(private authService: AuthService) { }

    ngOnInit() {
        this.isLoading = true;
        this.authService.getInfo();
        this.infosSub = this.authService.getInfoUpdateListener()
    .subscribe((infos: AuthDataInfo[]) => {
    this.infos = infos;
    this.isLoading = false;
  });
        this.userId = this.authService.getUserId();
        this.userIsAuthenticated = this.authService.getIsAuth();
        this.authListenerSubs = this.authService
            .getAuthStatusListener()
            .subscribe(isAuthenticated => {
              this.userIsAuthenticated = isAuthenticated;
              this.userId = this.authService.getUserId();
            });
    }
}

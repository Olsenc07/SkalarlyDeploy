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
  recomCounter = 0;
  isLoading = false;

  infos: AuthDataInfo[] = [];
  private infosSub: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.userId = this.authService.getUserId();

    this.authService.getInfo(this.userId, this.recomCounter);
    this.infosSub = this.authService
      .getInfoUpdateListener()
      .subscribe((infos: AuthDataInfo[]) => {
        this.infos = infos;
        this.isLoading = false;
      });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }
}

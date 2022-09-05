import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AuthDataInfo } from '../signup/auth-data.model';
import { MessageService } from '../services/messages.service';
import { MessageNotificationService } from '../services/messagesNotifications.service';
import { FollowService } from '../services/follow.service';
import { ActivatedRoute, Router } from '@angular/router';

export interface Message {
  username: string;
  message: string;
  time: string;
  you: string;
}
export interface Follow {
  id: string;
  Follower: string;
  nameFollower: string;
  usernameFollower: string;
  ProfilePicPathFollower: string;

  Following: string;
  nameFollowing: string;
  ProfilePicPathFollowing: string;
}
@Component({
  selector: 'app-card-user',
  templateUrl: './reusable-card-user.component.html',
  styleUrls: ['./reusable-card-user.component.scss'],
})
export class ReusableCardUserComponent implements OnInit {
  userId: string;
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;

  isLoading = false;

  // infos: AuthDataInfo[] = [];
  // private infosSub: Subscription;

  follow: Follow[] = [];
  private followSub: Subscription;

  constructor(
    private authService: AuthService,
    private followService: FollowService,
    private router: Router
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.userId = this.authService.getUserId();
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
        // Can add *ngIf="userIsAuthenticated" to hide items
      });
    // //    Info
    // this.authService.getInfo();
    // this.infosSub = this.authService
    //   .getInfoUpdateListener()
    //   .subscribe((infos: AuthDataInfo[]) => {
    //     this.infos = infos;
    //     this.isLoading = false;
    //   });
    // following info
    this.followService.getMessageNotification(this.userId);
    this.followSub = this.followService
      .getInfoUpdateListener()
      .subscribe((follow: Follow[]) => {
        this.follow = follow;
        this.isLoading = false;
      });
  }
  navigateToPage(Following: string): any {
    // const ID = (document.getElementById('userName') as HTMLInputElement).value;
    this.router.navigate(['/skalars/:'], { queryParams: { id: Following } });
  }

  onDelete(followId: string): any {
    this.followService.deleteFollow(followId);
    console.log('chaz whats up homie g', followId);
  }
}
@Component({
  selector: 'app-card-user-follower',
  templateUrl: './reusable-card-user-follower.component.html',
  styleUrls: ['./reusable-card-user.component.scss'],
})
export class ReusableCardUserFollowerComponent implements OnInit {
  userId: string;
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;

  isLoading = false;

  // infos: AuthDataInfo[] = [];
  // private infosSub: Subscription;

  follower: Follow[] = [];
  private followSub: Subscription;

  constructor(
    private authService: AuthService,
    private followService: FollowService,
    private router: Router
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.userId = this.authService.getUserId();
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
        // Can add *ngIf="userIsAuthenticated" to hide items
      });
    //    Info
    // this.authService.getInfo();
    // this.infosSub = this.authService
    //   .getInfoUpdateListener()
    //   .subscribe((infos: AuthDataInfo[]) => {
    //     this.infos = infos;
    //     this.isLoading = false;
    //   });
    // following info
    this.followService.getMessageNotificationFollowed(this.userId);
    this.followSub = this.followService
      .getInfoFollowUpdateListener()
      .subscribe((follower: Follow[]) => {
        this.follower = follower;
        this.isLoading = false;
      });
  }
  navigateToPage(Following: string): any {
    // const ID = (document.getElementById('userName') as HTMLInputElement).value;
    this.router.navigate(['/skalars/:'], { queryParams: { id: Following } });
  }

  onDelete(followId: string): any {
    this.followService.deleteFollowers(followId);
    console.log('chaz whats up homie g', followId);
  }
}
@Component({
  selector: 'app-card-message',
  templateUrl: './reusable-card-message.component.html',
  styleUrls: ['./reusable-card-user.component.scss'],
})
export class ReusableCardMessageComponent implements OnInit {
  userId: string;
  username: string;

  // userIsAuthenticated = false;
  // private authListenerSubs: Subscription;

  isLoading = false;

  messagesNotif: Message[] = [];
  private datasSub: Subscription;
  constructor(
    private authService: AuthService,
    private messageNotificationService: MessageNotificationService,
    private messageService: MessageService,

    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): any {
    this.isLoading = true;
    this.userId = this.authService.getUserId();
    //    Info

    this.messageNotificationService
      .getInfoUpdateListenerNotification()
      .subscribe((messagesNotif: any) => {
        this.isLoading = false;
        this.messagesNotif = messagesNotif;
      });
    this.route.queryParams.subscribe((params) => {
      this.username = params?.username;
      this.messageNotificationService.getMessageNotification(
        this.userId,
        this.username
      );
      // Suscpion here!! Shouldnt show anything but it does!!!!!
    });
  }

  navigateToPage(infoUser: string): any {
    // const ID = (document.getElementById('userName') as HTMLInputElement).value;
    this.router.navigate(['/skalars/:'], { queryParams: { id: infoUser } });
  }
  navigateToChat(username: string): any {
    // const ID = (document.getElementById('userName') as HTMLInputElement).value;
    this.router.navigate(['/messages/:'], { queryParams: { username } });
  }
}

@Component({
  selector: 'app-card-mutual',
  templateUrl: './reusable-card-mutual.component.html',
  styleUrls: ['./reusable-card-user.component.scss'],
})
export class ReusableCardMutualComponent implements OnInit {
  userId: string;
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;

  isLoading = false;

  infos: AuthDataInfo[] = [];
  private infosSub: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.isLoading = true;
    this.userId = this.authService.getUserId();
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
        // Can add *ngIf="userIsAuthenticated" to hide items
      });
    //    Info
    this.authService.getInfo();
    this.infosSub = this.authService
      .getInfoUpdateListener()
      .subscribe((infos: AuthDataInfo[]) => {
        this.infos = infos;
        this.isLoading = false;
      });
  }
}

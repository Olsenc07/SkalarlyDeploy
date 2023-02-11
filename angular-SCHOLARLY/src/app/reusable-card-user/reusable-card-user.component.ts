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

  ngOnInit(): any {
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
        this.follow = follow.reverse();
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
  onMututal(username: string): any {
    console.log('chaz whats up homie k', username);
    this.followService.mutualFollow(username, this.userId);
    this.followService.mutualsFollow(username, this.userId);
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
  private followSubFollowers: Subscription;

  constructor(
    private authService: AuthService,
    private followService: FollowService,
    private router: Router
  ) {}

  ngOnInit(): any {
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
        this.follower = follower.reverse();
        this.isLoading = false;
      });
  }
  navigateToPage(Following: string): any {
    // const ID = (document.getElementById('userName') as HTMLInputElement).value;
    this.router.navigate(['/skalars/:'], { queryParams: { id: Following } });
  }

  onDelete(followId: string): any {
    this.followService.deleteFollowers(followId);
    console.log('chaz whats up homie gunit', followId);
    this.followService.getMessageNotificationFollowed(this.userId);
  }
  onMututal(username: string): any {
    console.log('chaz whats up homie n', username);
    this.followService.mutualFollow(username, this.userId);
    this.followService.mutualsFollow(username, this.userId);
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
  recomCounter = 0;
  countVisibility = 0;
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
      .getListenerNotification()
      .subscribe((messagesNotif: Message[]) => {
        this.isLoading = false;
        this.messagesNotif = messagesNotif.reverse();
      });
    // this.route.queryParams.subscribe((params) => {
    //   this.username = params?.username;
    this.messageNotificationService.getMessageNotification(this.userId);

    // });
  }

  navigateToPage(infoUser: string): any {
    // const ID = (document.getElementById('userName') as HTMLInputElement).value;
    this.router.navigate(['/skalars/:'], { queryParams: { id: infoUser } });
  }
  navigateToChat(username: string): any {
    // const ID = (document.getElementById('userName') as HTMLInputElement).value;
    this.router.navigate(['/messages/:'], { queryParams: { username } });
  }
  deleteMsg(msgId: string): any {
    console.log('xanyx', msgId);
    this.messageNotificationService.deleteMessage(msgId);
    location.reload();
  }
  // Back
  // onClickMsgBack(): any {
  //   const count = 1;
  //   this.countVisibility += count;
  //   const counting = 5;
  //   this.recomCounter += counting;
  //   console.log('hey back', this.recomCounter);
  //   console.log('howdy', this.countVisibility);

  //   this.messageNotificationService
  //     .getInfoUpdateListenerNotification()
  //     .subscribe((messagesNotif: Message[]) => {
  //       this.isLoading = false;
  //       this.messagesNotif = messagesNotif.reverse();
  //     });
  // }
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

  mutual: Follow[] = [];
  private mutualSub: Subscription;

  constructor(
    private authService: AuthService,
    private followService: FollowService,
    private router: Router
  ) {}

  ngOnInit(): any {
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
    // following info
    this.mutualSub = this.followService
      .getInfoMutualUpdateListener()
      .subscribe((mutual: Follow[]) => {
        this.mutual = mutual;
        this.isLoading = false;
      });
  }

  sendDataMututal(event: any): any {
    const queryFollowing: string = event.target.value;
    console.log('query yo', queryFollowing);
    // Will match if query is nothing or is only spaces
    const matchSpaces: any = queryFollowing.match(/\s*/);

    if (matchSpaces[0] === queryFollowing) {
    }
  }

  navigateToPage(infoUser: string): any {
    // const ID = (document.getElementById('userName') as HTMLInputElement).value;
    this.router.navigate(['/skalars/:'], { queryParams: { id: infoUser } });
  }
}
@Component({
  selector: 'app-card-mutuals',
  templateUrl: './reusable-card-mutuals.component.html',
  styleUrls: ['./reusable-card-user.component.scss'],
})
export class ReusableCardMutualsComponent implements OnInit {
  userId: string;
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;

  isLoading = false;

  mutuals: Follow[] = [];
  private mutualsSub: Subscription;

  constructor(
    private authService: AuthService,
    private followService: FollowService,
    private router: Router
  ) {}

  ngOnInit(): any {
    this.isLoading = true;
    this.userId = this.authService.getUserId();
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
        // Can add *ngIf="userIsAuthenticated" to hide items
      });
    // following info
    this.mutualsSub = this.followService
      .getInfoMutualsUpdateListener()
      .subscribe((mutuals: Follow[]) => {
        this.mutuals = mutuals;
        this.isLoading = false;
      });
  }
  navigateToPage(infoUser: string): any {
    // const ID = (document.getElementById('userName') as HTMLInputElement).value;
    this.router.navigate(['/skalars/:'], { queryParams: { id: infoUser } });
  }
}

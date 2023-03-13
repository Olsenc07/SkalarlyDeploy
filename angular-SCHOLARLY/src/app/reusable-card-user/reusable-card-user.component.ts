import { Component, OnDestroy, OnInit } from '@angular/core';
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
  viewed: boolean;
}
@Component({
  selector: 'app-card-user',
  templateUrl: './reusable-card-user.component.html',
  styleUrls: ['./reusable-card-user.component.scss'],
})
export class ReusableCardUserComponent implements OnInit, OnDestroy {
  userId: string;
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;

  isLoading = false;

  // infos: AuthDataInfo[] = [];
  // private infosSub: Subscription;

  follow: Follow[] = [];
  private followSub: Subscription;
  private delSub: Subscription;

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
      .subscribe((isAuthenticated: boolean) => {
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
      .getInfoFollowingUpdateListener()
      .subscribe((follow: Follow[]) => {
        this.follow = follow.reverse();
        this.isLoading = false;
      });
  }
  ngOnDestroy(): any {
    console.log('breaking here?');
    // keep hashed out or error occurs
    this.authListenerSubs.unsubscribe();
    console.log('breaking here???');
  }

  sendDataFollowing(event: any): any {
    const queryFollowing: string = event.target.value;
    console.log('query yo', queryFollowing);
    // Will match if query is nothing or is only spaces
    const matchSpaces = queryFollowing.replace(/[^a-zA-Z0-9 ]/g, '');
    console.log('noSpecialChars', matchSpaces);
    // if (matchSpaces[0] === queryFollowing) {
    //   this.followService.getMessageNotification(this.userId);
    //   this.followSub = this.followService
    //     .getInfoFollowingUpdateListener()
    //     .subscribe((follow: Follow[]) => {
    //       this.follow = follow.reverse();
    //       this.isLoading = false;
    //     });
    //   this.followSub.unsubscribe();
    // } else {
    this.followService.filterFollowing(this.userId, matchSpaces.trim());
    this.followSub = this.followService
      .getInfoFollowingUpdateListener()
      .subscribe((follow: Follow[]) => {
        this.follow = follow.reverse();
        this.isLoading = false;
        this.followSub.unsubscribe();
      });
    // }
  }

  navigateToPage(Following: string): any {
    // const ID = (document.getElementById('userName') as HTMLInputElement).value;
    this.router.navigate(['/skalars/:'], { queryParams: { id: Following } });
  }

  onDelete(followId: string): any {
    this.followService.deleteFollow(followId);
    console.log('chaz whats up homie g', followId);
    this.delSub = this.followService
      .getInfoFollowingUpdateListener()
      .subscribe((follow: Follow[]) => {
        if (follow) {
          this.follow = follow.reverse();
          this.isLoading = false;
          this.delSub.unsubscribe();
        } else {
          this.follow = [];
          this.delSub.unsubscribe();
        }
      });
  }
  onMututal(username: string): any {
    console.log('chaz whats up homie k', username);
    this.followService.mutualFollow(username, this.userId);
    this.followService.mutualsFollow(username, this.userId);
    this.followService.setUsername(username);
  }
}
@Component({
  selector: 'app-card-user-follower',
  templateUrl: './reusable-card-user-follower.component.html',
  styleUrls: ['./reusable-card-user.component.scss'],
})
export class ReusableCardUserFollowerComponent implements OnInit, OnDestroy {
  userId: string;
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;
  private delSub: Subscription;

  isLoading = false;

  // infos: AuthDataInfo[] = [];
  // private infosSub: Subscription;

  follower: Follow[] = [];
  private followSub: Subscription;
  private followSub2: Subscription;
  private followSub3: Subscription;

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
  ngOnDestroy(): any {
    this.authListenerSubs.unsubscribe();
    this.followSub.unsubscribe();
  }

  sendDataFollowers(event: any): any {
    const queryFollowing: string = event.target.value;
    console.log('query yo', queryFollowing);
    // Will match if query is nothing or is only spaces
    const matchSpaces = queryFollowing.replace(/[^a-zA-Z0-9 ]/g, '');

    // if (matchSpaces[0] === queryFollowing) {
    //   this.followService.getMessageNotificationFollowed(this.userId);
    //   this.followSub = this.followService
    //     .getInfoFollowUpdateListener()
    //     .subscribe((follower: Follow[]) => {
    //       this.follower = follower.reverse();
    //       this.isLoading = false;
    //     });
    //   this.followSub.unsubscribe();
    // } else {
    this.followService.filterFollowers(this.userId, matchSpaces.trim());
    this.followSub2 = this.followService
      .getInfoFollowUpdateListener()
      .subscribe((follower: Follow[]) => {
        this.follower = follower.reverse();
        this.isLoading = false;
        this.followSub2.unsubscribe();
      });
    // }
  }

  navigateToPage(Following: string): any {
    // const ID = (document.getElementById('userName') as HTMLInputElement).value;
    this.router.navigate(['/skalars/:'], { queryParams: { id: Following } });
  }
  onAccept(followId: string): any {
    console.log('love race', followId);
    this.followService.acceptFollow(followId);
    this.followService.getMessageNotificationFollowed(this.userId);
    this.followSub3 = this.followService
      .getInfoFollowUpdateListener()
      .subscribe((follower: Follow[]) => {
        this.follower = follower.reverse();
        this.followSub3.unsubscribe();
        console.log('haha', this.follower);
      });
  }
  onDelete(followId: string): any {
    this.followService.deleteFollowers(followId);
    this.followService.getMessageNotificationFollowed(this.userId);
    this.delSub = this.followService
      .getInfoFollowUpdateListener()
      .subscribe((follower: Follow[]) => {
        this.follower = follower.reverse();
        this.delSub.unsubscribe();
        console.log('haha 2.0', this.follower);
      });
  }
  onMututal(username: string): any {
    this.followService.mutualFollow(username, this.userId);
    this.followService.mutualsFollow(username, this.userId);
    this.followService.setUsername(username);
  }
}
@Component({
  selector: 'app-card-message',
  templateUrl: './reusable-card-message.component.html',
  styleUrls: ['./reusable-card-user.component.scss'],
})
export class ReusableCardMessageComponent implements OnInit, OnDestroy {
  userId: string;
  username: string;
  recomCounter = 0;
  countVisibility = 0;
  // userIsAuthenticated = false;
  // private authListenerSubs: Subscription;

  isLoading = false;

  messagesNotif: Message[] = [];
  private msgNotifSub: Subscription;
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
    this.messageNotificationService.getMessageNotification(this.userId);
    this.msgNotifSub = this.messageNotificationService
      .getListenerNotification()
      .subscribe((messagesNotif: Message[]) => {
        this.isLoading = false;
        this.messagesNotif = messagesNotif.reverse();
        console.log('should be viewed', this.messagesNotif);
      });

    // have now viewed these messages
    // get triggered once pg is left
    // its not getting called
  }
  ngOnDestroy(): any {
    this.msgNotifSub.unsubscribe();
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
export class ReusableCardMutualComponent implements OnInit, OnDestroy {
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
  ngOnDestroy(): any {
    this.authListenerSubs.unsubscribe();
    this.mutualSub.unsubscribe();
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
export class ReusableCardMutualsComponent implements OnInit, OnDestroy {
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
  ngOnDestroy(): any {
    this.authListenerSubs.unsubscribe();
    this.mutualsSub.unsubscribe();
  }
  navigateToPage(infoUser: string): any {
    // const ID = (document.getElementById('userName') as HTMLInputElement).value;
    this.router.navigate(['/skalars/:'], { queryParams: { id: infoUser } });
  }
}

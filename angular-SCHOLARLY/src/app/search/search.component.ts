import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { SearchListService } from '../services/search.service';
import { Post, PostService } from '../services/post.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AuthDataInfo } from '../signup/auth-data.model';
import { constants } from 'perf_hooks';

interface SearchOption {
  value: string;
  name: string;
}
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  userId: string;
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;

  posts: Post[] = [];
  private postsSub: Subscription;

  post: Post;

  isLoading = false;

  postLocationMain: FormControl = new FormControl('');

  search: FormControl = new FormControl('');
  searchForm = new FormGroup({
    search: this.search,
    mainChoice: new FormControl(''),
  });

  public selectedOption: string;
  public specificOptions: string[];
  public searchOptions: SearchOption[];
  main = '';

  public opt = 0;
  displaySpecificSearch(): void {
    this.opt++;
  }

  constructor(
    public dialog: MatDialog,
    public searchListService: SearchListService,
    private router: Router,
    public route: ActivatedRoute,
    public postService: PostService,
    private authService: AuthService
  ) {
    this.userId = this.authService.getUserId();
    const Id = this.userId;
    const Authservice = this.authService;
    // Service worker
    // Register service worker
    window.addEventListener('load', () => {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/worker.js').then((registration) => {
          console.log('Service worker registered!');
        });
      }
    });

    // Web-Push
    // Public base64 to Uint
    function urlBase64ToUint8Array(base64String) {
      var padding = '='.repeat((4 - (base64String.length % 4)) % 4);
      var base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

      var rawData = window.atob(base64);
      var outputArray = new Uint8Array(rawData.length);

      for (var i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
      }
      return outputArray;
    }

    function configurePushSub() {
      if (!('serviceWorker' in navigator)) {
        return;
      }
      let req;
      navigator.serviceWorker.ready
        .then((swreq) => {
          req = swreq;
          console.log('hey chazzy', swreq);
          return swreq.pushManager.getSubscription();
        })
        .then((sub) => {
          if (sub === null) {
            // Create a new subscription
            const convertedVapidPublicKey = urlBase64ToUint8Array(
              'BDNe3_EmHJwCDbzfy6BgJbboqVWt2yjqCbdKCfsao7LQ9clrK8383DMRtX5_RJI-99aqPq5N2pRBRRDMvcuWsBs'
            );
            req.pushManager
              .subscribe({
                userVisibleOnly: true,
                applicationServerKey: convertedVapidPublicKey,
              })
              .then((newSub: any) => {
                newSub.userId = Id;
                console.log('skys the limit', newSub);
                Authservice.addSubscription(newSub);
                // return fetch('https://www.skalarly.com/api/subscribe/follow', {
                //   method: 'POST',
                //   headers: {
                //     'Content-Type': 'application/json',
                //   },
                //   body: JSON.stringify(newSub),
                // });
              });
          } else {
            // We have a subscription
            console.log('We have a subscription');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }

    // displayConfir notif
    function displayConfirmNotification(): any {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then((swreq) => {
          swreq.showNotification('Successfully subscribed dawg!');
        });
      }
    }

    // Get notifcation permission
    function askForNotificationPermission(): any {
      Notification.requestPermission((result) => {
        console.log('Permission', result);
        if (result !== 'granted') {
          console.log('Permission not granted');
        } else {
          configurePushSub();
        }
      });
    }

    if ('Notification' in window) {
      window.addEventListener('load', askForNotificationPermission);
    }
  }

  ngOnInit(): any {
    this.isLoading = true;
    this.searchOptions = this.searchListService.getSearchOptions();
    // posts
    this.postService.getPosts();
    this.postsSub = this.postService
      .getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
        this.isLoading = false;
      });
    // userId
    this.userId = this.authService.getUserId();
    var Id = this.userId;
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  onSearchSelection(value: string): void {
    this.specificOptions = this.searchListService.onSearchSelection(value);
  }

  navigateToPage(value: string): void {
    this.router.navigate(['/main/:'], { queryParams: { category: value } });
    console.log(value);
  }
  // To post page with users id
  navigateToPost(): any {
    // const ID = (document.getElementById('userName') as HTMLInputElement).value;
    this.router.navigate(['/post-page/:'], {
      queryParams: { userId: this.userId },
    });
  }

  clearSearch(): void {
    this.search.setValue('');
  }
}

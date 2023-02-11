import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { from } from 'rxjs';
import { AppComponent } from './app.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { EditProfileComp1WComponent } from './edit-profile/edit-profile.component';
import { EditProfileComp1Component } from './edit-profile/edit-profile.component';
import { EditProfileComp2Component } from './edit-profile/edit-profile.component';
import { EditProfileComp2WComponent } from './edit-profile/edit-profile.component';
import { EditProfileComp3Component } from './edit-profile/edit-profile.component';
import { EditProfileComp3WComponent } from './edit-profile/edit-profile.component';
import { EditProfileComp4Component } from './edit-profile/edit-profile.component';
import { EditProfileComp4WComponent } from './edit-profile/edit-profile.component';

import { EditProfilePurComponent } from './edit-profile/edit-profile.component';
import { EditProfilePurWComponent } from './edit-profile/edit-profile.component';
import { EditProfilePurSpringComponent } from './edit-profile/edit-profile.component';
import { EditProfilePurSummerComponent } from './edit-profile/edit-profile.component';
import { ActivityHistoryComponent } from './activity-history/history.component';
import { FriendsActivityComponent } from './friends-activity/friends-activity.component';
import { GroupChatsComponent } from './group-chats/group-chats.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PostPageComponent } from './post-page/post-page.component';
import {
  ProfileComponent,
  UserProfileComponent,
} from './profile/profile.component';
import {
  RetrievePasswordComponent,
  ForgotPasswordComponent,
} from './retrieve-password/retrieve-password.component';
import { SearchComponent } from './search/search.component';
import {
  SignupComponent,
  VerifiedPopUpComponent,
} from './signup/signup.component';
import {
  MainPagesComponent,
  SinglePageComponent,
  RecentComponent,
  LargeFriendsFeedComponent,
  TrendingComponent,
  SkalarsComponent,
  HashtagComponent,
  LargeNewSkalarsFeedComponent,
} from './main-pages/main-pages.component';
import { MessagingComponent } from './messaging/messaging.component';
import { AuthGuard } from './signup/auth.guard';

export const routingComponents = [
  HomePageComponent,
  SignupComponent,
  PostPageComponent,
  ProfileComponent,
  EditProfileComponent,
  EditProfileComp1Component,
  EditProfileComp1WComponent,
  EditProfileComp2Component,
  EditProfileComp2WComponent,
  EditProfileComp3Component,
  EditProfileComp3WComponent,
  EditProfileComp4Component,
  EditProfileComp4WComponent,
  EditProfilePurComponent,
  VerifiedPopUpComponent,
  UserProfileComponent,
];

const routes: Routes = [
  { path: 'login', component: HomePageComponent },
  { path: 'sign-up', component: SignupComponent },
  { path: 'verified', component: VerifiedPopUpComponent },
  {
    path: 'post-page/:userId',
    component: PostPageComponent,
    canActivate: [AuthGuard],
  },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  {
    path: 'skalars/:id',
    component: UserProfileComponent,
    canActivate: [AuthGuard],
  },
  { path: 'retrieve-password', component: RetrievePasswordComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },

  { path: 'search', component: SearchComponent, canActivate: [AuthGuard] },
  { path: 'recent', component: RecentComponent, canActivate: [AuthGuard] },
  {
    path: 'friends',
    component: LargeFriendsFeedComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'newSkalars',
    component: LargeNewSkalarsFeedComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'hashtag/:hashtag',
    component: HashtagComponent,
    canActivate: [AuthGuard],
  },
  { path: 'trending', component: TrendingComponent, canActivate: [AuthGuard] },
  {
    path: 'filterSkalars',
    component: SkalarsComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'edit-profile/:userId',
    component: EditProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit-profileComp/:userId',
    component: EditProfileComp1Component,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit-profileCompW/:userId',
    component: EditProfileComp1WComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit-profileComp2/:userId',
    component: EditProfileComp2Component,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit-profileComp2W/:userId',
    component: EditProfileComp2WComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit-profileComp3/:userId',
    component: EditProfileComp3Component,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit-profileComp3W/:userId',
    component: EditProfileComp3WComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit-profileComp4/:userId',
    component: EditProfileComp4Component,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit-profileComp4W/:userId',
    component: EditProfileComp4WComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit-profilePur/:userId',
    component: EditProfilePurComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit-profilePurW/:userId',
    component: EditProfilePurWComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit-profilePurSu/:userId',
    component: EditProfilePurSummerComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit-profilePurSp/:userId',
    component: EditProfilePurSpringComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit-profilePur/:userId',
    component: EditProfilePurComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'friends-activity',
    component: FriendsActivityComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'activity-history',
    component: ActivityHistoryComponent,
    canActivate: [AuthGuard],
  },
  { path: 'groups', component: GroupChatsComponent, canActivate: [AuthGuard] },
  { path: 'main/:category', component: MainPagesComponent },
  { path: 'single/:postId', component: SinglePageComponent },

  {
    path: 'messages/:username',
    component: MessagingComponent,
    canActivate: [AuthGuard],
  },
  // Directs to search page if user is logged in.
  // Directs to log in page if user isn't logged in.
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  bootstrap: [AppComponent],
  providers: [AuthGuard],
})
export class AppRoutingModule {}

import { NgModule, inject } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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
  AlumTransferComponent,
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
  InstructorReviewComponent,
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
    canActivate: [inject(AuthGuard).canActivate()],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [inject(AuthGuard).canActivate()],
  },
  {
    path: 'skalars/:id',
    component: UserProfileComponent,
    canActivate: [inject(AuthGuard).canActivate()],
  },
  { path: 'retrieve-password', component: RetrievePasswordComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'alum', component: AlumTransferComponent },

  {
    path: 'search',
    component: SearchComponent,
    canActivate: [inject(AuthGuard).canActivate()],
  },
  {
    path: 'recent',
    component: RecentComponent,
    canActivate: [inject(AuthGuard).canActivate()],
  },
  {
    path: 'friends',
    component: LargeFriendsFeedComponent,
    canActivate: [inject(AuthGuard).canActivate()],
  },
  {
    path: 'newSkalars',
    component: LargeNewSkalarsFeedComponent,
    canActivate: [inject(AuthGuard).canActivate()],
  },
  {
    path: 'hashtag/:hashtag',
    component: HashtagComponent,
    canActivate: [inject(AuthGuard).canActivate()],
  },
  {
    path: 'trending',
    component: TrendingComponent,
    canActivate: [inject(AuthGuard).canActivate()],
  },
  {
    path: 'filterSkalars',
    component: SkalarsComponent,
    canActivate: [inject(AuthGuard).canActivate()],
  },

  {
    path: 'edit-profile/:userId',
    component: EditProfileComponent,
    canActivate: [inject(AuthGuard).canActivate()],
  },
  {
    path: 'edit-profileComp/:userId',
    component: EditProfileComp1Component,
    canActivate: [inject(AuthGuard).canActivate()],
  },
  {
    path: 'edit-profileCompW/:userId',
    component: EditProfileComp1WComponent,
    canActivate: [inject(AuthGuard).canActivate()],
  },
  {
    path: 'edit-profileComp2/:userId',
    component: EditProfileComp2Component,
    canActivate: [inject(AuthGuard).canActivate()],
  },
  {
    path: 'edit-profileComp2W/:userId',
    component: EditProfileComp2WComponent,
    canActivate: [inject(AuthGuard).canActivate()],
  },
  {
    path: 'edit-profileComp3/:userId',
    component: EditProfileComp3Component,
    canActivate: [inject(AuthGuard).canActivate()],
  },
  {
    path: 'edit-profileComp3W/:userId',
    component: EditProfileComp3WComponent,
    canActivate: [inject(AuthGuard).canActivate()],
  },
  {
    path: 'edit-profileComp4/:userId',
    component: EditProfileComp4Component,
    canActivate: [inject(AuthGuard).canActivate()],
  },
  {
    path: 'edit-profileComp4W/:userId',
    component: EditProfileComp4WComponent,
    canActivate: [inject(AuthGuard).canActivate()],
  },
  {
    path: 'edit-profilePur/:userId',
    component: EditProfilePurComponent,
    canActivate: [inject(AuthGuard).canActivate()],
  },
  {
    path: 'edit-profilePurW/:userId',
    component: EditProfilePurWComponent,
    canActivate: [inject(AuthGuard).canActivate()],
  },
  {
    path: 'edit-profilePurSu/:userId',
    component: EditProfilePurSummerComponent,
    canActivate: [inject(AuthGuard).canActivate()],
  },
  {
    path: 'edit-profilePurSp/:userId',
    component: EditProfilePurSpringComponent,
    canActivate: [inject(AuthGuard).canActivate()],
  },
  {
    path: 'edit-profilePur/:userId',
    component: EditProfilePurComponent,
    canActivate: [inject(AuthGuard).canActivate()],
  },
  {
    path: 'friends-activity',
    component: FriendsActivityComponent,
    canActivate: [inject(AuthGuard).canActivate()],
  },
  {
    path: 'activity-history',
    component: ActivityHistoryComponent,
    canActivate: [inject(AuthGuard).canActivate()],
  },
  {
    path: 'groups',
    component: GroupChatsComponent,
    canActivate: [inject(AuthGuard).canActivate()],
  },
  {
    path: 'main/:category',
    component: MainPagesComponent,
    canActivate: [inject(AuthGuard).canActivate()],
  },
  {
    path: 'instructor-review/:category',
    component: InstructorReviewComponent,
    canActivate: [inject(AuthGuard).canActivate()],
  },

  { path: 'single/:postId', component: SinglePageComponent },

  {
    path: 'messages/:username',
    component: MessagingComponent,
    canActivate: [inject(AuthGuard).canActivate()],
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

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { from } from 'rxjs';
import { AppComponent } from './app.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { FriendsActivityComponent } from './friends-activity/friends-activity.component';
import { GroupChatsComponent } from './group-chats/group-chats.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PostPageComponent } from './post-page/post-page.component';
import { ProfileComponent, UserProfileComponent } from './profile/profile.component';
import { RetrievePasswordComponent, ResetPasswordComponent } from './retrieve-password/retrieve-password.component';
import { SearchComponent } from './search/search.component';
import { SignupComponent, VerifiedPopUpComponent } from './signup/signup.component';
import { MainPagesComponent } from './main-pages/main-pages.component';
import { MessagingComponent } from './messaging/messaging.component';
import {AuthGuard} from './signup/auth.guard';


export const routingComponents = [
  HomePageComponent,
  SignupComponent,
  PostPageComponent,
  ProfileComponent,
  EditProfileComponent,
  VerifiedPopUpComponent,
  UserProfileComponent
];

const routes: Routes = [
  { path: 'login', component: HomePageComponent },
  { path: 'sign-up', component: SignupComponent },
  { path: 'verified', component: VerifiedPopUpComponent},
  { path: 'resetPassword', component: ResetPasswordComponent},
  { path: 'post-page', component: PostPageComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'profile/:id', component: UserProfileComponent, canActivate: [AuthGuard] },
  { path: 'retrieve-password', component: RetrievePasswordComponent },
  { path: 'search', component: SearchComponent, canActivate: [AuthGuard] },
  { path: 'edit-profile', component: EditProfileComponent, canActivate: [AuthGuard] },
  { path: 'friends-activity', component: FriendsActivityComponent, canActivate: [AuthGuard] },
  { path: 'groups', component: GroupChatsComponent, canActivate: [AuthGuard] },
  { path: 'main', component: MainPagesComponent },
  { path: 'messages', component: MessagingComponent, canActivate: [AuthGuard] },
  // Directs to search page if user is logged in.
  // Directs to log in page if user isn't logged in.
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  bootstrap: [AppComponent],
  providers: [AuthGuard]
})
export class AppRoutingModule { }

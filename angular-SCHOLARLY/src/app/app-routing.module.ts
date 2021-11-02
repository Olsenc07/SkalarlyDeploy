import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { from } from 'rxjs';
import { AppComponent } from './app.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { FriendsActivityComponent } from './friends-activity/friends-activity.component';
import { GroupChatsComponent } from './group-chats/group-chats.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PostPageComponent } from './post-page/post-page.component';
import { ProfileComponent } from './profile/profile.component';
import { RetrievePasswordComponent } from './retrieve-password/retrieve-password.component';
import { SearchComponent } from './search/search.component';
import { SignupComponent } from './signup/signup.component';
import { MainPagesComponent } from './main-pages/main-pages.component';
import { MessagingComponent } from './messaging/messaging.component';


export const routingComponents = [
  HomePageComponent,
  SignupComponent,
  PostPageComponent,
  ProfileComponent,
  EditProfileComponent,
];

const routes: Routes = [
  { path: 'login', component: HomePageComponent },
  { path: 'sign-up', component: SignupComponent },
  { path: 'post-page', component: PostPageComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'retrieve-password', component: RetrievePasswordComponent },
  { path: 'search', component: SearchComponent },
  { path: 'edit-profile', component: EditProfileComponent },
  { path: 'friends-activity', component: FriendsActivityComponent },
  { path: 'groups', component: GroupChatsComponent },
  { path: 'main', component: MainPagesComponent },
  { path: 'messages', component: MessagingComponent },
  // Directs to search page if user is logged in.
  // Directs to log in page if user isn't logged in.
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  bootstrap: [AppComponent],
})
export class AppRoutingModule { }

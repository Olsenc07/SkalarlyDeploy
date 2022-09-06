import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AppRoutingModule } from './app-routing.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSliderModule } from '@angular/material/slider';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatStepperModule } from '@angular/material/stepper';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { MatChipsModule } from '@angular/material/chips';
import { MatTreeModule } from '@angular/material/tree';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ImageCropperModule } from 'ngx-image-cropper';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import {
  RetrievePasswordComponent,
  ResetPasswordComponent,
} from './retrieve-password/retrieve-password.component';
import {
  ProfileComponent,
  UserProfileComponent,
} from './profile/profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { EditProfileComp1Component } from './edit-profile/edit-profile.component';
import { EditProfileComp1WComponent } from './edit-profile/edit-profile.component';
import { EditProfileComp2Component } from './edit-profile/edit-profile.component';
import { EditProfileComp2WComponent } from './edit-profile/edit-profile.component';
import { EditProfileComp3Component } from './edit-profile/edit-profile.component';
import { EditProfileComp3WComponent } from './edit-profile/edit-profile.component';
import { EditProfileComp4Component } from './edit-profile/edit-profile.component';
import { EditProfileComp4WComponent } from './edit-profile/edit-profile.component';

import { EditProfilePurComponent } from './edit-profile/edit-profile.component';
import { EditProfilePurWComponent } from './edit-profile/edit-profile.component';
import { EditProfilePurSummerComponent } from './edit-profile/edit-profile.component';
import { EditProfilePurSpringComponent } from './edit-profile/edit-profile.component';

import { GroupChatsComponent } from './group-chats/group-chats.component';
import { MessagingComponent } from './messaging/messaging.component';
import { MessageCardComponent } from './messaging/messaging.component';

import { MainPagesComponent } from './main-pages/main-pages.component';
import {
  SignupComponent,
  VerifiedPopUpComponent,
} from './signup/signup.component';
import { TermsPopUpComponent } from './signup/signup.component';
import { AccountTextComponent } from './signup/signup.component';
import { LoginPopUpComponent } from './signup/signup.component';

import { AttendanceComponent } from './main-pages/main-pages.component';
import { BottomSheetComponent } from './profile/profile.component';

import { HomePageComponent } from './home-page/home-page.component';
import { FriendsActivityComponent } from './friends-activity/friends-activity.component';
import { PostPageComponent } from './post-page/post-page.component';

import { DialogElementsComponent } from './post-page/post-page.component';
import { ServicesElementsComponent } from './post-page/post-page.component';

import { ReusableCommentsComponent } from './reusable-card/reusable-card.component';
import { ReusableCommentComponent } from './reusable-card/reusable-card.component';
import { ReusableCommentFormComponent } from './reusable-card/reusable-card.component';

import { ReusableCardComponent } from './reusable-card/reusable-card.component';
import { ReusableCardPersonalComponent } from './reusable-card/reusable-card.component';
import { CardInfoMainPageComponent } from './reusable-card/reusable-card.component';

import { CardFeedComponent } from './reusable-card/reusable-card.component';

import { DeleteWarningComponent } from './reusable-card/reusable-card.component';
import { ShowCaseComponent } from './reusable-card/reusable-card.component';
import { CardInfoFeedComponent } from './reusable-card/reusable-card.component';

import { ReusableCardBriefComponent } from './reusable-card-brief/reusable-card-brief.component';
import { ReusableCardRequestComponent } from './reusable-card-request/reusable-card-request.component';
import { ReusableCardRecommendationComponent } from './reusable-card-request/reusable-card-request.component';
import { ReusableCardUserComponent } from './reusable-card-user/reusable-card-user.component';
import { ReusableCardUserFollowerComponent } from './reusable-card-user/reusable-card-user.component';

import { ReusableCardMutualComponent } from './reusable-card-user/reusable-card-user.component';
import { ReusableCardMutualsComponent } from './reusable-card-user/reusable-card-user.component';

import { ReusableCardMessageComponent } from './reusable-card-user/reusable-card-user.component';
import { ReusableCardConvoComponent } from './reusable-card-convo/reusable-card-convo.component';
import { ErrorComponent } from './error/error.component';

import { TaggedComponent } from './main-pages/main-pages.component';
import { SearchListService } from './services/search.service';
import { PostService } from './services/post.service';
import { ClassListService } from './services/class.service';
import { StoreService } from './services/store.service';
import { AuthService } from './services/auth.service';
import { FollowService } from './services/follow.service';
import { ChatService } from './services/chat.service';
import { CommentsService } from './services/comments.service';
import { MessageService } from './services/messages.service';
import { MessageNotificationService } from './services/messagesNotifications.service';

import { ShowCaseService } from './services/showCase.service';

import { AuthInterceptor } from './signup/auth-interceptor';
import { ErrorInterceptor } from './error-interceptor';

// Socekt.io
// import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
// const config: SocketIoConfig = {
//   url: 'http://localhost:3000',
//   // socket server url;
//   options: {
//     transports: ['websocket'],
//   },
// };
@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    RetrievePasswordComponent,
    ProfileComponent,
    UserProfileComponent,
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
    EditProfilePurWComponent,
    EditProfilePurSummerComponent,
    EditProfilePurSpringComponent,
    GroupChatsComponent,
    MainPagesComponent,
    SignupComponent,
    HomePageComponent,
    FriendsActivityComponent,
    PostPageComponent,
    SearchComponent,
    DialogElementsComponent,
    TermsPopUpComponent,
    AttendanceComponent,
    BottomSheetComponent,
    ReusableCardComponent,
    ReusableCardPersonalComponent,
    CardInfoMainPageComponent,
    ReusableCommentsComponent,
    ReusableCommentComponent,
    ReusableCommentFormComponent,
    CardFeedComponent,
    ReusableCardBriefComponent,
    ReusableCardRequestComponent,
    ReusableCardRecommendationComponent,
    ReusableCardUserComponent,
    ReusableCardUserFollowerComponent,
    ReusableCardMutualComponent,
    ReusableCardMutualsComponent,
    ReusableCardMessageComponent,
    ReusableCardConvoComponent,
    TaggedComponent,
    AccountTextComponent,
    MessagingComponent,
    MessageCardComponent,
    ServicesElementsComponent,
    ShowCaseComponent,
    CardInfoFeedComponent,
    DeleteWarningComponent,
    ErrorComponent,
    LoginPopUpComponent,
    VerifiedPopUpComponent,
    ResetPasswordComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatToolbarModule,
    FormsModule,
    MatInputModule,
    MatIconModule,
    MatMomentDateModule,
    MatButtonModule,
    FlexLayoutModule,
    MatDatepickerModule,
    MatTooltipModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatMenuModule,
    ReactiveFormsModule,
    MatSliderModule,
    FontAwesomeModule,
    MatListModule,
    MatBadgeModule,
    MatSidenavModule,
    MatBottomSheetModule,
    MatSelectModule,
    MatDialogModule,
    MatCheckboxModule,
    MatTabsModule,
    MatStepperModule,
    NgxMaterialTimepickerModule,
    MatChipsModule,
    MatTreeModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    ImageCropperModule,
    NgxImageZoomModule,
    MatCardModule,
    MatExpansionModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    ScrollingModule,
    InfiniteScrollModule,
    // SocketIoModule.forRoot(config),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    SearchListService,
    PostService,
    FollowService,
    ClassListService,
    StoreService,
    AuthService,
    ChatService,
    CommentsService,
    MessageService,
    MessageNotificationService,
    ShowCaseService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent],
})
export class AppModule {}

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { CloudinaryModule } from '@cloudinary/ng';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AppRoutingModule } from './app-routing.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSliderModule } from '@angular/material/slider';
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
import { MatChipsModule } from '@angular/material/chips';
import { MatTreeModule } from '@angular/material/tree';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ScrollingModule } from '@angular/cdk/scrolling';
import {
  IgxTimePickerModule,
  IgxInputGroupModule,
  IgxIconModule,
} from 'igniteui-angular';
import { routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import {
  RetrievePasswordComponent,
  ForgotPasswordComponent,
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
import {
  ActivityHistoryComponent,
  CommentHistoryComponent,
  FollowedHistoryComponent,
} from './activity-history/history.component';
import { GroupChatsComponent } from './group-chats/group-chats.component';
import { MessagingComponent } from './messaging/messaging.component';
import { MessageCardComponent } from './messaging/messaging.component';

import {
  MainPagesComponent,
  SinglePageComponent,
  SinglePageTemplateComponent,
} from './main-pages/main-pages.component';
import {
  SignupComponent,
  VerifiedPopUpComponent,
} from './signup/signup.component';
import { TermsPopUpComponent } from './signup/signup.component';
import { BioComponent } from './profile/profile.component';

import { HomePageComponent } from './home-page/home-page.component';
import { ExplainedComponent } from './home-page/home-page.component';

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
import { ShowCaseComponent } from './reusable-card/reusable-card.component';
import { CardInfoFeedComponent } from './reusable-card/reusable-card.component';

import { ReusableCardRequestComponent } from './reusable-card-request/reusable-card-request.component';
import { ReusableCardRecommendationComponent } from './reusable-card-request/reusable-card-request.component';
import { ReusableCardUserComponent } from './reusable-card-user/reusable-card-user.component';
import { ReusableCardUserFollowerComponent } from './reusable-card-user/reusable-card-user.component';

import { ReusableCardMutualComponent } from './reusable-card-user/reusable-card-user.component';
import { ReusableCardMutualsComponent } from './reusable-card-user/reusable-card-user.component';

import { ReusableCardMessageComponent } from './reusable-card-user/reusable-card-user.component';
import { ReusableCardConvoComponent } from './reusable-card-convo/reusable-card-convo.component';
import { ErrorComponent } from './error/error.component';

import { SearchListService } from './services/search.service';
import { PostService } from './services/post.service';
import { ClassListService } from './services/class.service';
import { AuthService } from './services/auth.service';
import { AuthServiceEdit } from './services/edit.service';
import { AuthServiceEditCourse } from './services/editCourse.service';
import { AuthServiceEditNext } from './services/editNextCourse.service';

import { FollowService } from './services/follow.service';

import { CommentsService } from './services/comments.service';
import { MessageService } from './services/messages.service';
import { MessageNotificationService } from './services/messagesNotifications.service';

import { ShowCaseService } from './services/showCase.service';

import { AuthInterceptor } from './signup/auth-interceptor';
import { ErrorInterceptor } from './error-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    RetrievePasswordComponent,
    ForgotPasswordComponent,
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
    ActivityHistoryComponent,
    CommentHistoryComponent,
    FollowedHistoryComponent,
    GroupChatsComponent,
    MainPagesComponent,
    SinglePageComponent,
    SinglePageTemplateComponent,
    SignupComponent,
    HomePageComponent,
    ExplainedComponent,
    FriendsActivityComponent,
    PostPageComponent,
    SearchComponent,
    DialogElementsComponent,
    TermsPopUpComponent,
    BioComponent,
    ReusableCardComponent,
    ReusableCardPersonalComponent,
    CardInfoMainPageComponent,
    ReusableCommentsComponent,
    ReusableCommentComponent,
    ReusableCommentFormComponent,
    CardFeedComponent,
    ReusableCardRequestComponent,
    ReusableCardRecommendationComponent,
    ReusableCardUserComponent,
    ReusableCardUserFollowerComponent,
    ReusableCardMutualComponent,
    ReusableCardMutualsComponent,
    ReusableCardMessageComponent,
    ReusableCardConvoComponent,
    MessagingComponent,
    MessageCardComponent,
    ServicesElementsComponent,
    ShowCaseComponent,
    CardInfoFeedComponent,
    ErrorComponent,
    VerifiedPopUpComponent,
  ],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    MatToolbarModule,
    MatInputModule,
    MatTabsModule,
    MatIconModule,
    MatButtonModule,
    MatDatepickerModule,
    // CloudinaryModule,
    MatNativeDateModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatTooltipModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSliderModule,
    FontAwesomeModule,
    MatListModule,
    MatBadgeModule,
    MatSidenavModule,
    MatBottomSheetModule,
    MatSelectModule,
    MatDialogModule,
    MatCheckboxModule,
    MatStepperModule,
    MatChipsModule,
    MatTreeModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatCardModule,
    MatExpansionModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    ScrollingModule,
    IgxTimePickerModule,
    IgxInputGroupModule,
    IgxIconModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    SearchListService,
    PostService,
    FollowService,
    ClassListService,
    AuthService,
    AuthServiceEdit,
    AuthServiceEditCourse,
    AuthServiceEditNext,
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

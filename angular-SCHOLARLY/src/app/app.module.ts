import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
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
import { ScrollingModule } from '@angular/cdk/scrolling';




import { environment } from 'src/environments/environment';





import { routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { RetrievePasswordComponent } from './retrieve-password/retrieve-password.component';
import { ProfileComponent } from './profile/profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { GroupChatsComponent } from './group-chats/group-chats.component';
import { MessagingComponent } from './messaging/messaging.component';
import { MainPagesComponent } from './main-pages/main-pages.component';
import { SignupComponent } from './signup/signup.component';
import { TermsPopUpComponent } from './signup/signup.component';
import { AccountTextComponent } from './signup/signup.component';

import { AttendanceComponent } from './main-pages/main-pages.component';
import { BottomSheetComponent } from './profile/profile.component';

import { HomePageComponent } from './home-page/home-page.component';
import { FriendsActivityComponent } from './friends-activity/friends-activity.component';
import { PostPageComponent } from './post-page/post-page.component';

import { DialogElementsComponent } from './post-page/post-page.component';


import { ReusableCardComponent } from './reusable-card/reusable-card.component';
import { ReusableCardBriefComponent } from './reusable-card-brief/reusable-card-brief.component';
import { ReusableCardRequestComponent } from './reusable-card-request/reusable-card-request.component';
import { ReusableCardRecommendationComponent } from './reusable-card-request/reusable-card-request.component';
import { ReusableCardUserComponent } from './reusable-card-user/reusable-card-user.component';
import { ReusableCardMutualComponent } from './reusable-card-user/reusable-card-user.component';
import { ReusableCardMessageComponent } from './reusable-card-user/reusable-card-user.component';
import { ReusableCardConvoComponent } from './reusable-card-convo/reusable-card-convo.component';

import { TaggedComponent } from './main-pages/main-pages.component';
import { SearchListService } from './services/search.service';
import { PostService } from './services/post.service';
import { ClassListService } from './services/class.service';
import { StoreService } from './services/store.service';







@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    RetrievePasswordComponent,
    ProfileComponent,
    EditProfileComponent,
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
    ReusableCardBriefComponent,
    ReusableCardRequestComponent,
    ReusableCardRecommendationComponent,
    ReusableCardUserComponent,
    ReusableCardMutualComponent,
    ReusableCardMessageComponent,
    ReusableCardConvoComponent,
    TaggedComponent,
    AccountTextComponent,
    MessagingComponent,
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
    ScrollingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [SearchListService, PostService, ClassListService, StoreService],
  bootstrap: [AppComponent],
})
export class AppModule { }

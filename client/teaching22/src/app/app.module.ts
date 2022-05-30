import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {OfferListComponent} from './offer-list/offer-list.component';
import {OfferListItemComponent} from './offer-list-item/offer-list-item.component';
import {OfferDetailsComponent} from './offer-details/offer-details.component';
import {OfferStoreService} from "./shared/offer-store.service";
import {HomeComponent} from './home/home.component';
import {AppRoutingModule} from "./app-routing.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {InquirieListComponent} from './inquirie-list/inquirie-list.component';
import {InquirieListItemComponent} from './inquirie-list-item/inquirie-list-item.component';
import {InquirieStoreService} from "./shared/inquirie-store.service";
import {CourseStoreService} from "./shared/course-store.service";
import {OfferFormComponent} from './offer-form/offer-form.component';
import {ReactiveFormsModule} from "@angular/forms";
import {LoginComponent} from './login/login.component';
import {AuthenticationService} from "./shared/authentication.service";
import {TokenInterceptorService} from "./shared/token-interceptor.service";
import {LoginInterceptorService} from "./shared/login-interceptor.service";
import { ErrorPageComponent } from './error-page/error-page.component';
import { InquiryFormComponent } from './inquiry-form/inquiry-form.component';
import {DatePipe} from "@angular/common";
import {UserInfoService} from "./shared/user-info.service";
import { UserProfilComponent } from './user-profil/user-profil.component';

@NgModule({
  declarations: [
    AppComponent,
    OfferListComponent,
    OfferListItemComponent,
    OfferDetailsComponent,
    HomeComponent,
    InquirieListComponent,
    InquirieListItemComponent,
    OfferFormComponent,
    LoginComponent,
    ErrorPageComponent,
    InquiryFormComponent,
    UserProfilComponent
  ],
  imports: [
    BrowserModule, AppRoutingModule, HttpClientModule, ReactiveFormsModule
  ],
  providers: [OfferStoreService, InquirieStoreService, CourseStoreService, AuthenticationService, UserInfoService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoginInterceptorService,
      multi: true
    },
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {OfferListComponent} from "./offer-list/offer-list.component";
import {OfferDetailsComponent} from "./offer-details/offer-details.component";
import {InquirieListComponent} from "./inquirie-list/inquirie-list.component";
import {OfferFormComponent} from "./offer-form/offer-form.component";
import {LoginComponent} from "./login/login.component";
import {CanNavigateToAdminGuard} from "./can-navigate-to-admin.guard";
import {ErrorPageComponent} from "./error-page/error-page.component";
import {CanNavigateToInquirieGuard} from "./can-navigate-to-inquirie.guard";
import {CanNavigateToLoginGuard} from "./can-navigate-to-login.guard";
import {UserProfilComponent} from "./user-profil/user-profil.component";


const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'offers', component: OfferListComponent},
  {path: 'offers/:id', component: OfferDetailsComponent},
  {path: 'inquiries', component: InquirieListComponent, canActivate:[CanNavigateToInquirieGuard]},
  {path: 'admin', component: OfferFormComponent, canActivate:[CanNavigateToAdminGuard]},
  {path: 'admin/:id', component: OfferFormComponent, canActivate:[CanNavigateToAdminGuard]},
  {path: 'login', component: LoginComponent, canActivate:[CanNavigateToLoginGuard]},
  {path: '**', component: ErrorPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [CanNavigateToAdminGuard, CanNavigateToInquirieGuard]
})
export class AppRoutingModule {
}

import {Component, OnInit, Output} from '@angular/core';
import {Course, Offer} from "../shared/offer";
import {OfferStoreService} from "../shared/offer-store.service";
import {CourseStoreService} from "../shared/course-store.service";
import {AuthenticationService} from "../shared/authentication.service";

declare var $: any;

@Component({
  selector: 'ts-offer-list',
  templateUrl: './offer-list.component.html',
  styles: []
})
export class OfferListComponent implements OnInit {

  offers: Offer[] | undefined;
  courses: Course[] = [];
  offersByStatus: Offer[] = [];

  constructor(private of: OfferStoreService,
              private co: CourseStoreService,
              public authService: AuthenticationService
  ) {
  }

  ngOnInit(): void {
    this.of.getAll().subscribe(res => this.offers = res);
    this.of.getAll().subscribe(res => this.offersByStatus = res);
    this.co.getAll().subscribe(res => this.courses = res);
    this.changeTab();
    if(this.authService.isLoggedOut() || !this.authService.isLector()){
      $(".ui.selection.dropdown").addClass("hiddenHelper");
    }
  }


  changeOffersArray(status: number) {
    if (status == 0 && this.offers) {
      this.offersByStatus = this.offers
    } else {
      if (this.offers) {
        this.offersByStatus = [];
        for (let offer of this.offers) {
          if (status == offer.status) {
            this.offersByStatus?.push(offer);
          }
        }
      }
    }
  }

  changeTab(): void {
    $('.ui.selection.dropdown').dropdown();
  }
}

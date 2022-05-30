import {Component, Input, OnInit} from '@angular/core';
import {Offer} from "../shared/offer";
import {DatePipe} from "@angular/common";
import {AuthenticationService} from "../shared/authentication.service";

declare var $: any;


@Component({
  selector: 'a.ts-offer-list-item',
  templateUrl: './offer-list-item.component.html',
  styles: []
})
export class OfferListItemComponent implements OnInit {

  @Input() offer: Offer | undefined;

  constructor(public datePipe: DatePipe, public authService: AuthenticationService) {
  }

  ngOnInit(): void {
  }

  getStatusString(): string {
    if (this.offer?.status == 1) {
      $("#"+this.offer.id).addClass("open");
      return "open";
    } else if (this.offer?.status == 2) {
      $("#"+this.offer.id).addClass("booked");
      return "booked";
    } else if (this.offer?.status == 3) {
      $("#"+this.offer.id).addClass("closed");
      return "closed";
    }
    return "loading status failed";
  }
}

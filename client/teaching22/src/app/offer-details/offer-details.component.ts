import {Component, OnInit} from '@angular/core';
import {Offer} from "../shared/offer";
import {OfferStoreService} from "../shared/offer-store.service";
import {ActivatedRoute, Router} from "@angular/router";
import {OfferFactory} from "../shared/offer-factory";
import {AuthenticationService} from "../shared/authentication.service";
import {DatePipe} from "@angular/common";

declare var $: any;


@Component({
  selector: 'ts-offer-details',
  templateUrl: './offer-details.component.html',
  styles: []
})
export class OfferDetailsComponent implements OnInit {

  offer: Offer = OfferFactory.empty();

  constructor(
    private of: OfferStoreService,
    private router: Router,
    private route: ActivatedRoute,
    public authService: AuthenticationService,
    public datePipe: DatePipe,
  ) {
  }

  ngOnInit(): void {
    const params = this.route.snapshot.params;
    this.of.getSingle(params['id']).subscribe(res => this.offer = res);
 }

  removeOffer() {
    if (confirm('Wollen Sie das Offer wirklich löschen?')) {
      this.of.remove(this.offer.id).subscribe(res => this.router.navigate(['../'],
        {relativeTo: this.route}))
      this.dimmer();
    }
  }

  dimmer(): void {
    let dimmer = "  <div class='content'>" +
      "<img src='assets/delete-illu.svg' class='ui image small centered'>" +
      "<h2>Offer deleted</h2>" +
      "<p>just click somewhere</p>" +
      "</div>";
    $('.ui.dimmer.log .content').remove();
    $('.ui.dimmer.log').dimmer('add content', dimmer);
    $('.ui.dimmer.log').dimmer('show');
  }

  designStatus(): string {
    if (this.offer.status == 1) {
      $('.detailview .status').addClass("open");
      return "open";
    } else if (this.offer.status == 2) {
      $('.detailview .status').addClass("booked");
      return "booked";
    }

    else if (this.offer.status == 3) {
      $('.detailview .status').addClass("closed");
      return "closed";

    }
    return "loading status failed";
  }
}

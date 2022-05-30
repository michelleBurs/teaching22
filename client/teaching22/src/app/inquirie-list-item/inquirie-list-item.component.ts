import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Inquirie, Offer} from "../shared/inquirie";
import {AuthenticationService} from "../shared/authentication.service";
import {InquirieStoreService} from "../shared/inquirie-store.service";
import {OfferStoreService} from "../shared/offer-store.service";
import {DatePipe} from "@angular/common";

declare var $: any;


@Component({
  selector: 'div.ts-inquirie-list-item',
  templateUrl: './inquirie-list-item.component.html',
  styles: []
})
export class InquirieListItemComponent implements OnInit {

  offer: Offer | undefined;
  inquiries: Inquirie[] = [];
  @Input() inquirie: Inquirie | undefined;
  @Output() changeStatus = new EventEmitter<any>();

  constructor(
    private iq: InquirieStoreService,
    private of: OfferStoreService,
    public authService: AuthenticationService,
    public datePipe: DatePipe
  ) {
  }


  ngOnInit(): void {
    if (this.inquirie) {
      this.of.getSingle(this.inquirie?.offer_id).subscribe(res => this.offer = res);
    }
    this.iq.getAll().subscribe(res => this.inquiries = res);
  }


  // 1=waiting | 2=accepted | 3=rejected
  updateStatus(num: number) {
    if (this.inquirie) {
      this.inquirie.status = num;
      this.iq.update(this.inquirie).subscribe();
      if (num == 2) {
        this.changeOfOffer(num);
        this.changeStatusOfOthers();
      }
      if (num == 4 || num == 5) {
        this.changeOfOffer(3);
        this.changeStatusOfOthers();
      }
    }
  }


  changeOfOffer(num: number) {
    if (this.offer) {
      this.offer.status = num;
      this.offer.date = this.inquirie?.date;
      this.offer.startTime = this.inquirie?.startTime;
      this.offer.endTime = this.inquirie?.endTime;
      this.of.update(this.offer).subscribe(res => this.changeStatus.emit());
    }
  }


  changeStatusOfOthers() {
    if (this.inquiries && this.offer) {
      for (let inq of this.inquiries) {
        if (inq.offer_id == this.offer.id && inq.id != this.inquirie?.id) {
          inq.status = 3;
          this.iq.update(inq).subscribe(res => this.changeStatus.emit());
        }
      }
    }
  }


  getStatusString(): string {
    if (this.inquirie?.status == 1) {
      $("#" + this.inquirie.id).addClass("waiting");
      return "waiting";
    } else if (this.inquirie?.status == 2) {
      $("#" + this.inquirie.id).addClass("accepted");
      return "accepted";
    } else if (this.inquirie?.status == 3) {
      $("#" + this.inquirie.id).addClass("rejected");
      return "rejected";
    } else if (this.inquirie?.status == 4) {
      $("#" + this.inquirie.id).addClass("closed");
      return "successfully closed";
    } else if (this.inquirie?.status == 5) {
      $("#" + this.inquirie.id).addClass("closed");
      return "not successfully closed";
    }
    return "loading status failed";
  }


  otherTimerOrDate(): boolean {
    return this.inquirie?.date != this.offer?.date || this.inquirie?.startTime != this.offer?.startTime
      || this.inquirie?.endTime != this.offer?.endTime;
  }
}

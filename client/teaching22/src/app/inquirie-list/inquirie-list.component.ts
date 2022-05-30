import {Component, OnInit} from '@angular/core';
import {Inquirie} from "../shared/inquirie";
import {InquirieStoreService} from "../shared/inquirie-store.service";
import {AuthenticationService} from "../shared/authentication.service";

declare var $: any;

@Component({
  selector: 'ts-inquirie-list',
  templateUrl: './inquirie-list.component.html',
  styles: []
})
export class InquirieListComponent implements OnInit {

  inquiries: Inquirie[] | undefined;
  inquiriesByStatus: Inquirie[] = [];


  constructor(private of: InquirieStoreService,
              public authService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.of.getAll().subscribe(res => this.inquiries = res);
    this.of.getAll().subscribe(res => this.inquiriesByStatus = res);
    this.changeTab();
  }

  changeInquiriesArray(status: number) {
    if (status == 0 && this.inquiries) {
      this.inquiriesByStatus = this.inquiries
    } else {
      if (this.inquiries) {
        this.inquiriesByStatus = [];
        for (let inquiry of this.inquiries) {
          if (status == 4) {
            if (inquiry.status == 4 || inquiry.status == 5)
              this.inquiriesByStatus?.push(inquiry);
          } else if (status == inquiry.status) {
            this.inquiriesByStatus?.push(inquiry);
          }
        }
      }
    }
  }

  changeTab(): void {
    $('.ui.selection.dropdown').dropdown();
  }

}

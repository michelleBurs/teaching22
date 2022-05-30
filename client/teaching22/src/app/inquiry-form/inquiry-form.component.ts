import {Component, Input, OnInit} from '@angular/core';
import {Offer} from "../shared/offer";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {InquirieFactory} from "../shared/inquirie-factory";
import {ActivatedRoute, Router} from "@angular/router";
import {InquirieStoreService} from "../shared/inquirie-store.service";
import {InqurieFormErrorMessages} from "./inquirie-form-error-messages";
import {Inquirie} from "../shared/inquirie";
import {AuthenticationService} from "../shared/authentication.service";
import {DatePipe} from "@angular/common";

declare var $: any;

@Component({
  selector: 'div.ts-inquiry-form',
  templateUrl: './inquiry-form.component.html',
  styles: []
})

export class InquiryFormComponent implements OnInit {

  @Input() offer: Offer | undefined;

  inquirieForm: FormGroup;
  inquirie = InquirieFactory.empty();
  errors: { [key: string]: string } = {};

  constructor(private fb: FormBuilder,
              private iq: InquirieStoreService,
              private route: ActivatedRoute,
              private router: Router,
              public authService: AuthenticationService,
              public datePipe: DatePipe
  ) {
    this.inquirieForm = this.fb.group({});
  }


  ngOnInit(): void {
    // create inquiry
    this.initInquiry();
  }

  initInquiry() {
    this.inquirieForm = this.fb.group({
      id: this.inquirie.id,
      date: [this.offer?.date, Validators.required],
      startTime: [this.offer?.startTime?.toString().substring(11, 16), Validators.required],
      endTime: [this.offer?.endTime?.toString().substring(11, 16), Validators.required],
      text: this.inquirie?.text
    });
    this.inquirieForm.statusChanges.subscribe(() => {
      this.updateErrorMessage();
    });
  }


  updateErrorMessage() {
    this.errors = {};
    for (const message of InqurieFormErrorMessages) {
      const control = this.inquirieForm.get(message.forControl);
      if (control && control.dirty && control.invalid && control.errors &&
        control.errors[message.forValidator] && !this.errors[message.forControl]) {
        this.errors[message.forControl] = message.text;
      }
    }
  }

  submitForm() {
    const inquirie: Inquirie = InquirieFactory.fromObject(this.inquirieForm.value);

    //special values
    if (this.offer)
      inquirie.offer_id = this.offer.id;

    inquirie.user_id = this.authService.getCurrentUserId();

    this.iq.create(inquirie).subscribe(res => {
      this.inquirie = InquirieFactory.empty();
      this.inquirieForm.reset(InquirieFactory.empty());
      this.router.navigate(["../offers"], {relativeTo: this.route});
    });
    this.dimmer();
  }


  dimmer(): void {
    let dimmer = "  <div class='content'>" +
      "<img src='assets/login-illu.svg' class='ui image small centered'>" +
      "<h2>Inquiry sent</h2>" +
      "<p>just click somewhere</p>" +
      "</div>";
    $('.ui.dimmer.log .content').remove();
    $('.ui.dimmer.log').dimmer('add content', dimmer);
    $('.ui.dimmer.log').dimmer('show');
  }
}

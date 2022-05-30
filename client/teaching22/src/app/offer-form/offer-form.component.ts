import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {OfferStoreService} from "../shared/offer-store.service";
import {ActivatedRoute, Router} from "@angular/router";
import {OfferFactory} from "../shared/offer-factory";
import {OfferFormErrorMessages} from "./offer-form-error-messages";
import {Course} from "../shared/course";
import {CourseStoreService} from "../shared/course-store.service";
import {Offer} from "../shared/offer";
import {AuthenticationService} from "../shared/authentication.service";

declare var $: any;


@Component({
  selector: 'ts-offer-form',
  templateUrl: './offer-form.component.html',
  styles: []
})
export class OfferFormComponent implements OnInit {

  offerForm: FormGroup;
  offer = OfferFactory.empty();
  errors: { [key: string]: string } = {};
  courses: Course[] = [];
  isUpdatingOffer = false;
  imageForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private of: OfferStoreService,
    private route: ActivatedRoute,
    private router: Router,
    private co: CourseStoreService,
    public authService: AuthenticationService) {
    this.offerForm = this.fb.group({});
    this.imageForm = this.fb.group({});
  }

  ngOnInit(): void {
    this.co.getAll().subscribe(res => this.courses = res);
    const id = this.route.snapshot.params["id"];
    if (id) {
      // update book
      this.isUpdatingOffer = true;
      this.of.getSingle(id).subscribe(offer => {
        this.offer = offer;
        this.initOffer();
      });
    }
    // create book
    this.initOffer();
  }

  initOffer() {
    this.buildImage();
    this.offerForm = this.fb.group({
      id: this.offer.id,
      title: [this.offer.title, Validators.required],
      description: [this.offer.description, Validators.required],
      date: [this.offer.date, Validators.required],
      startTime: [this.offer?.startTime?.toString().substring(11, 16), Validators.required],
      endTime: [this.offer?.endTime?.toString().substring(11, 16), Validators.required],
      course_id: [this.offer.course_id, [Validators.required, Validators.min(1)]],
      image: this.imageForm
    });
    this.offerForm.statusChanges.subscribe(() => {
      this.updateErrorMessage();
    });
  }


  buildImage() {
    if (this.offer.image) {
      if (this.offer?.image?.id == 1) {
        this.imageForm = this.fb.group({
          id: new FormControl(this.offer.image?.id),
          url: new FormControl(""),
        });
      } else {
        this.imageForm = this.fb.group({
          id: new FormControl(this.offer.image?.id),
          url: new FormControl(this.offer.image?.url),
        });
      }

    }
  }


  updateErrorMessage() {
    this.errors = {};
    for (const message of OfferFormErrorMessages) {
      const control = this.offerForm.get(message.forControl);
      if (control && control.dirty && control.invalid && control.errors &&
        control.errors[message.forValidator] && !this.errors[message.forControl]) {
        this.errors[message.forControl] = message.text;
      }
    }
  }

  submitForm() {
    const offer: Offer = OfferFactory.fromObject(this.offerForm.value);
    // special values
    offer.status = this.offer.status;
    offer.user_id = this.authService.getCurrentUserId();

    if (this.isUpdatingOffer) {
      this.of.update(offer).subscribe(res => {
        this.router.navigate(["../../offers", offer.id], {
          relativeTo: this.route
        });
      });
    } else {
      offer.user_id = 1; // just for testing
      this.of.create(offer).subscribe(res => {
        this.offer = OfferFactory.empty();
        this.offerForm.reset(OfferFactory.empty());
        this.router.navigate(["../offers"], {relativeTo: this.route});
      });
    }
    this.dimmer();
  }


  dimmer(): void {
    let dimmer;
    if (this.isUpdatingOffer) {
      dimmer = "<div class='content'>" +
        "<img src='assets/create-illu.svg' class='ui image small centered'>" +
        "<h2>Offer edited</h2>" +
        "<p>just click somewhere</p>" +
        "</div>";
      $('.ui.dimmer.log .content').remove();
      $('.ui.dimmer.log').dimmer('add content', dimmer);
      $('.ui.dimmer.log').dimmer('show');
    } else {
      dimmer = "  <div class='content'>" +
        "<img src='assets/create-illu.svg' class='ui image small centered'>" +
        "<h2>Offer added</h2>" +
        "<p>just click somewhere</p>" +
        "</div>";
      $('.ui.dimmer.log .content').remove();
      $('.ui.dimmer.log').dimmer('add content', dimmer);
      $('.ui.dimmer.log').dimmer('show');
    }


  }

}

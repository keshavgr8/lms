import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

/**
 * Generated class for the InqDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-inq-details',
  templateUrl: 'inq-details.html',
})
export class InqDetailsPage {

  private diffState: boolean;

  private personal: FormGroup;
  private address: FormGroup;
  private education: FormGroup;
  private guardian: FormGroup;
  private marketing: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder) {

    this.personal = this.formBuilder.group({
      name: ['', Validators.required],
      // lname: [''],
      gender: ['', Validators.required],
      dob: ['', Validators.required],
      // phone: [''],
      mobile: ['', Validators.required],
      email: ['', Validators.email],
      highestEducation: ['', Validators.required],
      computerKnowledge: ['', Validators.required],
      areaOfInterest: ['', Validators.required]
    });

    this.address = this.formBuilder.group({
      street: ['', Validators.required],
      area: ['', Validators.required],
      city: ['jaipur', Validators.required],
      state: ['rajasthan', Validators.required],
      pincode: ['',Validators.required],
      country: ['india', Validators.required]
    });

    this.education = this.formBuilder.group({
      qualification: ['', Validators.required],
      institute: [''],
      stream: [''],
      status: [''],
      year: [''],
      type: [''],
      aggregate: [''],
      markScheme: ['']
    });

    this.guardian = this.formBuilder.group({
      name: ['',Validators.required],
      relation: ['',Validators.required],
      phoneNumber: ['',Validators.required],
      alternatePhone: [''],
      email: [''],
      occupation: ['']
    });

    this.marketing = this.formBuilder.group({
      source: ['',Validators.required],
      isReferred: ['false'],
      referrer: ['']
    });

    this.diffState = false;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InqDetailsPage');
  }

  changeState() {
    this.diffState = !this.diffState;
  }

}

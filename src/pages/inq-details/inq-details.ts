import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'page-inq-details',
  templateUrl: 'inq-details.html',
})
export class InqDetailsPage {

  genders = [{ key: "Male", value: "Male" }, { key: "Female", value: "Female" }];
  hQualifications = [{ key: "SSC", value: "SSC" }, { key: "HSC", value: "HSC" }, { key: "Undergraduate", value: "Under Graduate" }, { key: "Graduate", value: "Graduate" }, { key: "Post Graduate", value: "Post Graduate" }, { key: "Engineer", value: "Engineer" }, { key: "Diploma", value: "Diploma" }];
  computerKnowledge = [{ key: "Basic", value: "Basic" }, { key: "Prior", value: "Prior" }, { key: "Advance", value: "Advance" }, { key: "None", value: "None" }];
  areasOfInterest = [{ key: "VFX", value: "VFX" }, { key: "Web Developement", value: "Web Developement" }, { key: "Web Design", value: "Web Design" }];
  countries = [{ key: "India", value: "India" }];
  states = [{ key: "Rajasthan", value: "Rajasthan" }];
  cities = [{ key: "Jaipur", value: "Jaipur" }, { key: "Jodhpur", value: "Jodhpur" }];
  pincodes = [{ key: "302021", value: "302021" }];
  areas = [{ key: "Vaishali Nagar", value: "Vaishali Nagar" }];
  streams = [{ key: "Science", value: "Science" },{ key: "Arts", value: "Arts" },{ key: "Commerce", value: "Commerce" }];
  eduStatus = [{ key: "Completed", value: "Completed" },{ key: "Pursuing", value: "Pursuing" }];
  eduType = [{ key: "Distance", value: "Distance" },{ key: "Regular", value: "Regular" }];
  markScheme = [{ key: "Percentage", value: "Percentage" },{ key: "GPA", value: "GPA" },{ key: "Total", value: "Total" }];
  enqSource = [{ key: "Newspaper", value: "Newspaper" },{ key: "Friends", value: "Friends" },{ key: "Internet", value: "Internet" }];
  guardianRelation = [{ key: "Father", value: "Father" },{ key: "Mother", value: "Mother" },{ key: "Uncle", value: "Uncle" }];
  guardianOccupation = [{ key: "Student", value: "Student" },{ key: "Service", value: "Service" },{ key: "Housewife", value: "Housewife" }];

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
      mobile: ['', [Validators.required,Validators.minLength(10),Validators.maxLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      hQualification: ['', Validators.required],
      computerKnowledge: ['', Validators.required],
      areaOfInterest: ['', Validators.required]
    });

    this.address = this.formBuilder.group({
      addressLine1: ['', Validators.required],
      area: ['', Validators.required],
      city: ['Jaipur', Validators.required],
      state: ['Rajasthan', Validators.required],
      pin: ['',Validators.required],
      country: ['India', Validators.required]
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
      phoneNumber: ['',[Validators.required,Validators.minLength(10),Validators.maxLength(10)]],
      alternatePhone: ['',[Validators.minLength(10),Validators.maxLength(10)]],
      email: ['', Validators.email],
      occupation: ['']
    });

    this.marketing = this.formBuilder.group({
      source: ['',Validators.required],
      isReferred: [false],
      referrer: ['']
    });

    this.diffState = false;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InqDetailsPage');
  }
  
  today : string = new Date().toISOString();

  changeState() {
    this.diffState = !this.diffState;
  }

}

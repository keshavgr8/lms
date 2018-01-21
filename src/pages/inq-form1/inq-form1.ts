import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { CompleterService, RemoteData, CompleterItem } from 'ng2-completer';

import { InqProvider } from '../../providers/inq/inq';
import { NotificationProvider } from '../../providers/notification/notification';
import { PincodeProvider } from '../../providers/pincode/pincode';
import { InqForm2Page } from '../inq-form2/inq-form2';

@Component({
  selector: 'page-inq-form1',
  templateUrl: 'inq-form1.html',
})
export class InqForm1Page {

  private diffState: boolean;
  private responseData;
  private inqForm: FormGroup;
  private pinService: RemoteData;
  private localities;
  private areas;
  private city;
  private state;
  private country;

  today : string = new Date().toISOString();

  genders = [{ key: "Male", value: "Male" }, { key: "Female", value: "Female" }];
  hQualifications = [{ key: "SSC", value: "SSC" }, { key: "HSC", value: "HSC" }, { key: "Undergraduate", value: "Under Graduate" }, { key: "Graduate", value: "Graduate" }, { key: "Post Graduate", value: "Post Graduate" }, { key: "Engineer", value: "Engineer" }, { key: "Diploma", value: "Diploma" }];
  computerKnowledge = [{ key: "Basic", value: "Basic" }, { key: "Prior", value: "Prior" }, { key: "Advance", value: "Advance" }, { key: "None", value: "None" }];
  areasOfInterest = [{ key: "VFX", value: "VFX" }, { key: "Web Developement", value: "Web Developement" }, { key: "Web Design", value: "Web Design" }];
  // countries = [{ key: "India", value: "India" }];
  // states = [{ key: "Rajasthan", value: "Rajasthan" }];
  // cities = [{ key: "Jaipur", value: "Jaipur" }, { key: "Jodhpur", value: "Jodhpur" }];
  // pincodes = [{ key: "302021", value: "302021" }];

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private loadingCtrl: LoadingController, private inqProvider: InqProvider, private notify: NotificationProvider, private pinProvider: PincodeProvider, private completerService: CompleterService) {
    this.inqForm = this.formBuilder.group({
      name: ['', Validators.required],
      // lname: [''],
      gender: ['', Validators.required],
      dob: ['', Validators.required],
      address: this.formBuilder.group({
        addressLine1: ['', Validators.required],
        area: ['', Validators.required],
        city: [''],
        state: [''],
        pin: ['', Validators.required],
        country: ['']
      }),
      // phone: [''],
      mobile: ['', [Validators.required,Validators.minLength(10),Validators.maxLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      hQualification: ['', Validators.required],
      computerKnowledge: ['', Validators.required],
      areaOfInterest: ['', Validators.required]
    });

    this.diffState = false;
    this.pinService = this.completerService.remote(null);
    this.pinService.urlFormater(term => {
      return `http://localhost:9002/pincode/beginWith?pincode=${term}`;
    });
    this.pinService.dataField("data");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InqForm1Page');
  }

  private loading;

  presentLoadingCustom() {
    this.loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: `
        <img src="../../assets/imgs/loading.svg" />
      `
    });
    this.loading.onDidDismiss(() => {
      console.log('Dismissed loading');
    });

    this.loading.present();
  }

  logForm1() {
    this.inqForm.value.address.city = this.city;
    this.inqForm.value.address.state = this.state;
    this.inqForm.value.address.country = this.country;
    if(this.inqForm.valid){
      console.log("Form to be logged", this.inqForm.value);
      this.presentLoadingCustom();
      this.inqProvider.createInq(this.inqForm.value)
        .subscribe(
        data => { 
          this.responseData = data;
          if(this.responseData.data){
            this.notify.showInfo("Inquiry Registered Successfully");
            console.log("POST successful, the response data is:", data)
          }else{
            this.notify.showError("Server retutned an error. Cannot register inquiry.")
            console.log("POST unsucessful, server responded with error", this.responseData.exception)
          }
        },
        error => { console.log("POST unsuccessful, the server returned this error:", error); this.loading.dismissAll(); },
        () => {
          console.log("complete");
          this.loading.dismissAll();
          if(this.responseData.data){
            this.navCtrl.push(InqForm2Page,{ data: this.responseData });
          }
        }
        );
    }else{
      this.notify.showError("Invalid Form! Please fill proper values");
    }
  }

  changeState() {
    this.diffState = !this.diffState;
  }

  setLocality(locality){
    this.city = locality.data.city.name;
    this.state = locality.data.state;
    this.country = locality.data.country;
    this.areas = locality.data.locality;
  }

  getLocality(pincode){
    console.log("Getting localities for: ",pincode)
    this.pinProvider.getLocality(pincode)
      .subscribe(
        data => {console.log(data), this.localities = data;},
        error => {console.log("ERROR")},
        () => {console.log("COMPLETE"), this.setLocality(this.localities);}
      )
  }

  onPincodeSelected(pincode: CompleterItem){
    if(pincode){
      console.log(pincode);
      this.getLocality(pincode.originalObject);
    }
  }

}

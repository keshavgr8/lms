import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

import { InqForm2Page } from '../inq-form2/inq-form2';

/**
 * Generated class for the InqForm1Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-inq-form1',
  templateUrl: 'inq-form1.html',
})
export class InqForm1Page {

  private diffState: boolean;

  private inqForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, public loadingCtrl: LoadingController) {
    this.inqForm = this.formBuilder.group({
      name: ['', Validators.required],
      // lname: [''],
      gender: ['', Validators.required],
      dob: ['', Validators.required],
      address: this.formBuilder.group({
        street: ['', Validators.required],
        area: ['', Validators.required],
        city: ['jaipur', Validators.required],
        state: ['rajasthan', Validators.required],
        pincode: ['',Validators.required],
        country: ['india', Validators.required]
      }),
      // phone: [''],
      mobile: ['', Validators.required],
      email: ['', Validators.email],
      highestEducation: ['', Validators.required],
      computerKnowledge: ['', Validators.required],
      areaOfInterest: ['', Validators.required]
    });

    this.diffState = false;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InqForm1Page');
  }

  presentLoadingCustom(){
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: `
        <img src="../../assets/imgs/loading.svg" />
      `,
      duration: 3000
    });
    loading.onDidDismiss(() => {
      console.log('Dismissed loading');
    });
  
    loading.present();
  }

  private logForm() {
    console.log(this.inqForm.value);
    this.presentLoadingCustom();
    setTimeout(()=>{this.navCtrl.push(InqForm2Page);},2000);
  }

  changeState() {
    this.diffState = !this.diffState;
  }

}

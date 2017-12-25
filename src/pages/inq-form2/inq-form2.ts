import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';

import { InqForm3Page } from '../inq-form3/inq-form3';

/**
 * Generated class for the InqForm2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-inq-form2',
  templateUrl: 'inq-form2.html',
})
export class InqForm2Page {

  private inqForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder) {
    this.inqForm = this.formBuilder.group({
      education: this.formBuilder.group({
        qualification: ['', Validators.required],
        institute: [''],
        stream: [''],
        status: [''],
        year: [''],
        type: [''],
        aggregate: [''],
        markScheme: ['']
      }),
      guardian: this.formBuilder.group({
        name: ['',Validators.required],
        relation: ['',Validators.required],
        phoneNumber: ['',Validators.required],
        alternatePhone: [''],
        email: [''],
        occupation: ['']
      })
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InqForm2Page');
  }

  private logForm(){
    console.log(this.inqForm.value);
    this.navCtrl.push(InqForm3Page);
  }

}

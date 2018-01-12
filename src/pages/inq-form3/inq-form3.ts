import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'page-inq-form3',
  templateUrl: 'inq-form3.html',
})
export class InqForm3Page {

  private inqForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder) {
    this.inqForm = this.formBuilder.group({
      source: ['',Validators.required],
      isReferred: ['false'],
      referrer: ['']
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InqForm3Page');
  }

  logForm3(){
    console.log(this.inqForm.value);
  }

}

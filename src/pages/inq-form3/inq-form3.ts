import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

import { InqProvider } from '../../providers/inq/inq';
import { NotificationProvider } from '../../providers/notification/notification';

@Component({
  selector: 'page-inq-form3',
  templateUrl: 'inq-form3.html',
})
export class InqForm3Page {
  
  enqSource = [{ key: "Newspaper", value: "Newspaper" },{ key: "Friend", value: "Friend" },{ key: "Internet", value: "Internet" }];

  private currentInq;
  private responseData;
  private requestData;

  private inqForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private loadingCtrl: LoadingController, private inqProvider: InqProvider, private notify: NotificationProvider) {
    this.currentInq = this.navParams.get('data');
    this.inqForm = this.formBuilder.group({
      marketing: this.formBuilder.group({
        source: ['',Validators.required],
        referred: [false],
        referant: ['']
      })
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InqForm3Page');
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

  logForm3(){
    if(this.inqForm.valid){
      this.requestData = Object.assign({},this.currentInq.data,this.inqForm.value)
      console.log("Form to be logged", this.requestData);
      this.presentLoadingCustom();
      this.inqProvider.updateInq(this.requestData)
        .subscribe(
        data => { 
          this.responseData = data;
          if(this.responseData.data){
            this.notify.showInfo("Inquiry Updated Successfully");
            console.log("POST successful, the response data is:", data)
          }else{
            this.notify.showError("Server retutned an error. Cannot update inquiry.")
            console.log("POST unsucessful, server responded with error", this.responseData.exception)
          }
        },
        error => { console.log("POST unsuccessful, the server returned this error:", error); this.loading.dismissAll(); },
        () => {
          console.log("complete");
          this.loading.dismissAll();
          if(this.responseData.data){
            this.navCtrl.push(InqForm3Page,{ data: this.responseData });
          }
        }
        );
    }else{
      this.notify.showError("Invalid Form! Please fill proper values");
    }
  }

}

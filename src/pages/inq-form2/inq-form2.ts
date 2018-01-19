import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';

import { InqProvider } from '../../providers/inq/inq';
import { NotificationProvider } from '../../providers/notification/notification';
import { InqForm3Page } from '../inq-form3/inq-form3';

@Component({
  selector: 'page-inq-form2',
  templateUrl: 'inq-form2.html',
})
export class InqForm2Page {

  hQualifications = [{ key: "SSC", value: "SSC" }, { key: "HSC", value: "HSC" }, { key: "Undergraduate", value: "Under Graduate" }, { key: "Graduate", value: "Graduate" }, { key: "Post Graduate", value: "Post Graduate" }, { key: "Engineer", value: "Engineer" }, { key: "Diploma", value: "Diploma" }];
  streams = [{ key: "Science", value: "Science" },{ key: "Arts", value: "Arts" },{ key: "Commerce", value: "Commerce" }];
  eduStatus = [{ key: "Completed", value: "Completed" },{ key: "Pursuing", value: "Pursuing" }];
  eduType = [{ key: "Distance", value: "Distance" },{ key: "Regular", value: "Regular" }];
  markScheme = [{ key: "Percentage", value: "Percentage" },{ key: "GPA", value: "GPA" },{ key: "Total", value: "Total" }];
  guardianRelation = [{ key: "Father", value: "Father" },{ key: "Mother", value: "Mother" },{ key: "Uncle", value: "Uncle" }];
  guardianOccupation = [{ key: "Student", value: "Student" },{ key: "Service", value: "Service" },{ key: "Housewife", value: "Housewife" }];

  private inqForm: FormGroup;
  private currentInq;
  private responseData;
  private requestData;
  private education;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private inqProvider: InqProvider, private notify: NotificationProvider) {
    this.currentInq = this.navParams.get('data');
    this.education = this.currentInq.data.hQualification;
    this.inqForm = this.formBuilder.group({
      education: this.formBuilder.group({
        educationQualification: [this.education, Validators.required],
        instituteName: [''],
        stream: [''],
        status: [''],
        year: [''],
        type: [''],
        aggregateMarks: [''],
        markScheme: ['']
      }),
      guardian: this.formBuilder.group({
        name: ['',Validators.required],
        relation: ['',Validators.required],
        phoneNumber: ['',[Validators.required,Validators.minLength(10),Validators.maxLength(10)]],
        // alternatePhone: ['',[Validators.minLength(10),Validators.maxLength(10)]],
        email: ['',Validators.email],
        occupation: ['']
      })
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InqForm2Page');
  }

  logForm2(){
    if(this.inqForm.valid){
      this.requestData = Object.assign({},this.currentInq.data,this.inqForm.value)
      console.log("Form to be logged", this.requestData);
      // this.presentLoadingCustom();
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
        error => { console.log("POST unsuccessful, the server returned this error:", error); /*this.loading.dismissAll();*/ },
        () => {
          console.log("complete");
          // this.loading.dismissAll();
          if(this.responseData.data){
            this.navCtrl.push(InqForm3Page,{ data: this.responseData });
          }
        }
        );
    }else{
      this.notify.showError("Invalid Form! Please fill proper values");
    }
  }

  skip(){
    this.navCtrl.push(InqForm3Page,{ data: this.currentInq });
  }

}

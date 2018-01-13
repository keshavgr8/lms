import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

@Injectable()
export class NotificationProvider {
  
  private toast;
  
  constructor(public toastCtrl: ToastController) {
    console.log('Hello NotificationProvider Provider');
  }
  
  showInfo(message) {
    this.toast = this.toastCtrl.create({
      message: message,
      position: "top",
      showCloseButton: true,
      cssClass: 'info-notification',
      duration: 3000
    });
    console.log('Info Toast Presented');
    this.toast.present();
  }

  showError(message) {
    this.toast = this.toastCtrl.create({
      message: message,
      position: "top",
      showCloseButton: true,
      cssClass: 'error-notification',
      duration: 3000
    });
    console.log('Error Toast Presented');
    this.toast.present();
  }

}

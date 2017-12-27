import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { InqForm1Page } from '../pages/inq-form1/inq-form1';
import { InqForm2Page } from '../pages/inq-form2/inq-form2';
import { InqForm3Page } from '../pages/inq-form3/inq-form3';
import { InqDetailsPage } from '../pages/inq-details/inq-details';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    InqForm1Page,
    InqForm2Page,
    InqForm3Page,
    InqDetailsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    InqForm1Page,
    InqForm2Page,
    InqForm3Page,
    InqDetailsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

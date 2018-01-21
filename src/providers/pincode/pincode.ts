import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the PincodeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PincodeProvider {

  private baseUrl: string = 'http://localhost:9002/pincode';

  constructor(public http: HttpClient) {
    console.log('Hello PincodeProvider Provider');
  }

  getLocality(pincode){
    return this.http.get(this.baseUrl+'/equalsTo', {
      params: new HttpParams().set('pincode', pincode)
    });
  }

}

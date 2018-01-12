import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class InqProvider {

  private baseUrl: string = 'http://localhost:9002/inquiry';

  constructor(public http: HttpClient,) {
    console.log('Hello InqProvider Provider');
  }

  createInq(data){
    return this.http.post(this.baseUrl+'/register',data);
  }

}

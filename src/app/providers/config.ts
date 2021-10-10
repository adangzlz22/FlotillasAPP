import { Injectable } from '@angular/core';

@Injectable()
export class ConfigProvider {


    public static APIURL:string;

// APIURL ='http://localhost:50681/Api/';
// APIURL ='http://adangonzalez-001-site4.ctempurl.com/Api/';
APIURL ='https://localhost:44348/Api/';

 constructor() {
    console.log('Hello ConfigProvider Provider');
  }
}
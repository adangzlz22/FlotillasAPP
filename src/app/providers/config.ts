import { Injectable } from '@angular/core';

@Injectable()
export class ConfigProvider {


    public static APIURL:string;

APIURL ='https://localhost:44348/Api/';

 constructor() {
    console.log('Hello ConfigProvider Provider');
  }
}
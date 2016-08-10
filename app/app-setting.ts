// gulpfile.js defines gulp tasks to preprocess app/templates/appsetting.ts into app/appsetting.ts
// app/appsetting.ts is generated from app/templates/appsetting.ts by gulp tasks, such as 'gulp dev'
// Do not edit app/appsetting.ts directly.

import {Injectable} from 'angular2/core';

declare var window: any;

@Injectable()
export class AppSetting {
  public webApiServer: string = 'http://localhost:3000';
  public UPDATE_POSIOTION_URL:string = '/api/bus/position';
  public UPDATE_POSIOTION_TEST_URL:string = '/api/bus/position_test';
  public IS_TEST_SERVER:boolean = true;
  constructor() {
    console.log('App running in production environment.');
    //this.webApiServer = 'http://buscoming.azurewebsites.net';

    console.log('webApiServer = ' + this.webApiServer);
  }
}
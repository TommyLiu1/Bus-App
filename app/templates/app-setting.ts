// gulpfile.js defines gulp tasks to preprocess app/templates/appsetting.ts into app/appsetting.ts
// app/appsetting.ts is generated from app/templates/appsetting.ts by gulp tasks, such as 'gulp dev'
// Do not edit app/appsetting.ts directly.

import {Injectable} from 'angular2/core';

declare var window: any;

@Injectable()
export class AppSetting {
  public webApiServer: string = '';
  constructor() {
    // @if APP_ENV == 'DEVELOPMENT'
    console.log('App running in development environment.');
    this.webApiServer = 'http://localhost:3000';
    // @endif
    // @if APP_ENV == 'PRODUCTION'
    console.log('App running in production environment.');
    this.webApiServer = 'http://windmill.azurewebsites.net/';
    // @endif
    console.log('webApiServer = ' + this.webApiServer);
  }
}
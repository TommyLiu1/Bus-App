import {Injectable} from 'angular2/core';
import {Http, RequestOptionsArgs, Headers} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx'; //import all the Observable operators, such as map
import {BPosition} from './bus';
import {AppSetting} from '../../app-setting';

/*
  Generated class for the BusDataService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class BusProvider {
  data: any = null;

  constructor(public http: Http, public appSetting: AppSetting) { }

  private handleError(error: any) {
    // In a real world app, we might send the error to remote logging infrastructure
    let errMsg = error.message || 'Server error';
    console.error('in handleError' + errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
  getBusPositionFromWeb() {
    console.log('in getBusLocation');
    return new Promise(resolve => {
      // We're using Angular Http provider to request the data,
      // then on the response it'll map the JSON data to a parsed JS object.
      // Next we process the data and resolve the promise with the new data.
      this.http.get('build/data/bus-location.json')
        .map(res => res.json())
        .catch(this.handleError)
        .subscribe(data => {
          // we've got back the raw data, now generate the core schedule data
          // and save the data for later reference
          this.data = data;
          console.log('get data.json!!!!!!!' + JSON.stringify(data));
          resolve(this.data);
        },

        error => {
          console.log('error in getting busLocation' + error);
        });
    });
  }

  // A bus can periodically update its position with this REST api call.
  // Or a bus can periodically update its position  with socket IO.
  // Let's use REST Api for now.
  updateBusPosition(bPosition: BPosition) {
    console.log('BusProvider: updateBusPosition ' + JSON.stringify(bPosition));
    var postOptions: RequestOptionsArgs = {
      headers: new Headers({ 'Content-Type': 'application/json' })
    };

    console.log('updateBusPosition' + this.appSetting.webApiServer);

    this.http.post(this.appSetting.webApiServer + '/api/bus/position', JSON.stringify(bPosition), postOptions)
      .map(res => res.json())
      .catch(this.handleError)
      .subscribe(data => {
        // we've got back the raw data, now generate the core schedule data
        // and save the data for later reference
        this.data = data;
        console.log('updateBusPosition http.post got back data: ' + JSON.stringify(data));
      },
      error => {
        console.log('error in updating bus position' + error);
      });
  }

  //upload a bus route for one direction
  uploadBusRoute(bRoute: string) {
    console.log('in uploadBusRoute ' + bRoute);
    var postOptions: RequestOptionsArgs = {
      headers: new Headers({'Content-Type': 'application/json'})
    };

    console.log('uploadBusRoute' + this.appSetting.webApiServer);
    this.http.post(this.appSetting.webApiServer + '/api/bus/route', bRoute, postOptions)
      .map(res => res.json())
      .catch(this.handleError)
      .subscribe(data => {
        // we've got back the raw data, now generate the core schedule data
        // and save the data for later reference
        // In fat arrow function, this refers to this in the defination context.
        this.data = data;
        console.log('uploadBusRoute: success callback!!!!!!!' + JSON.stringify(data));
      },
      error => {
        console.log('uploadBusRoute: error in http post' + JSON.stringify(error));
      });
  }
}


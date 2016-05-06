import {App, Platform} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {RecordRoutePage} from './pages/record-route/record-route';
import {BusProvider} from './providers/bus-provider/bus-provider';


@App({
  template: '<ion-nav id="rootNav" [root]="rootPage"></ion-nav>',
  config: {}, // http://ionicframework.com/docs/v2/api/config/Config/
  providers: [BusProvider]
})
export class MyApp {
  rootPage: any = RecordRoutePage;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();


      // onSuccess Callback
      // This method accepts a Position object, which contains the
      // current GPS coordinates
      //
      // var onSuccess = function(position) {
      //   alert('Latitude: ' + position.coords.latitude + '\n' +
      //     'Longitude: ' + position.coords.longitude + '\n' +
      //     'Altitude: ' + position.coords.altitude + '\n' +
      //     'Accuracy: ' + position.coords.accuracy + '\n' +
      //     'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '\n' +
      //     'Heading: ' + position.coords.heading + '\n' +
      //     'Speed: ' + position.coords.speed + '\n' +
      //     'Timestamp: ' + position.timestamp + '\n');
      // };

      // // onError Callback receives a PositionError object
      // //
      // function onError(error) {
      //   alert('code: ' + error.code + '\n' +
      //     'message: ' + error.message + '\n');
      // }

      // navigator.geolocation.getCurrentPosition(onSuccess, onError);


    });
  }
}

// import {IONIC_DIRECTIVES, ionicProviders} from 'ionic-angular';
// import {bootstrap} from 'angular2/platform/browser';
// import {Component} from 'angular2/core';
// import {TabsPage} from './pages/tabs/tabs';
// import {Platform} from 'ionic-angular';
// import {StatusBar} from 'ionic-native';
// import {BusProvider} from './providers/bus-provider/bus-provider';


// @Component({
//     //default selector, and theme.
//     template: '<ion-nav id="rootNav" [root]="rootPage"></ion-nav>',
//     //template: 'hahahha',
//     selector: 'ion-app',
//     providers: [BusProvider],
//     directives: [IONIC_DIRECTIVES]
// })
// class App { 
//   rootPage: any = TabsPage;
//   constructor(platform: Platform) {
//     console.log("App constructor !!!!!!!!!");
//     platform.ready().then(() => {
//       // Okay, so the platform is ready and our plugins are available.
//       // Here you can do any higher level native things you might need.
//       StatusBar.styleDefault();
//       console.log("platform ready !!!!!!!!!");
//       // bootstrap(App, ionicProviders());
//     });
//   }
// }


// setTimeout(function() { bootstrap(App, ionicProviders()) }, 10000 );



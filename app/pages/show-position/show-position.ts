import {Page, NavController} from 'ionic-angular';
import * as io from 'socket.io-client';
import {AppSetting} from '../../app-setting';
import {BLinePosition} from '../../providers/bus-provider/bus';

/*
  Generated class for the ShowPositionPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/show-position/show-position.html',
})
export class ShowPositionPage {
  bLinePosition = new BLinePosition();
  private socket: any;
  constructor(public nav: NavController, public appSetting: AppSetting) { 
  }

  //Connect to server with socketIO to receive position update from server
  connectServer() {
    // Socket IO has namespace and within each namespace there are rooms (channels). 
    // Users need to see real time bus locations. Users connect to passenger namespace via socket IO.
    // Drivers can either use REST Api to update bus position, or connect to driver namespace via socket IO.
    // Driver namespace is not implemented yet.
 
    // Use websocket for socket IO first, if not implmented by browser, use polling.
    this.socket = io.connect(this.appSetting.webApiServer + '/passenger', {transports: ['websocket', 'polling']});

    console.debug('socket transport' + this.socket.io.engine.transport.name);
    console.log('socket transport' + this.socket.io.engine.transport.name);
    console.dir(this.socket);
    console.log('connecting to webApiServer with socket IO' + this.socket);

    this.socket.on('broadcast position', function(data) {
      var t = new Date().getTime();
      console.log('time:' + t);
      console.log('got location from server for bus:' + JSON.stringify(data));
    });
  }

  disconnectServer() {
    console.log('socket.io disconnecting');
    this.socket.disconnect();
  }

  // TODO Need to take the city, line parameter from user input
  registerPositionUpdate() {
    console.log('register positionUpdate {city: ZH, line: 88}');
    this.socket.emit('register positionUpdate', {city: 'ZH', line: 88});
  }

  unregisterPositionUpdate() {
    this.socket.emit('unregister positionUpdate', { city: 'ZH', line: 88 });
  }
}

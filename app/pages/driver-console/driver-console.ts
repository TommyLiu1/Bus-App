import {Page, NavController} from 'ionic-angular';
import {BusProvider} from '../../providers/bus-provider/bus-provider';
import {BLinePosition} from '../../providers/bus-provider/bus';
import {logError} from '../../util/logUtil';
import Promise from "ts-promise";
import {AppSetting} from '../../app-setting';
/*
  Generated class for the DriverConsolePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/driver-console/driver-console.html',
})
export class DriverConsolePage {
   bLinePosition:BLinePosition= new BLinePosition();
   public startBtnDisabled:boolean=false;
   public stopBtnDisabled:boolean=true;
   public startInterval:any;

  constructor(public nav: NavController,public busProvider:BusProvider,public appSetting: AppSetting) {
  }

  updatePosition() {
    this.startBtnDisabled=true;
    this.stopBtnDisabled=false;
    var update = function(position) {
      this.bLinePosition.position.coords.lat = position.coords.latitude;
      this.bLinePosition.position.coords.long = position.coords.longitude;
      this.bLinePosition.position.heading = position.coords.heading;
      this.bLinePosition.position.speed = position.coords.speed;

      console.log('UpdatePositionPage:updatePosition bLinePosition =' + JSON.stringify(this.bLinePosition));
      var t = new Date().getTime();
      console.log('xxxxx time:' + t);
      this.busProvider.updateBusPosition(this.bLinePosition)
    };
    this.startInterval= setInterval(()=>
    {
      var t = new Date().getTime();
      console.log('updating position. Time=' + t);
      navigator.geolocation.getCurrentPosition(update.bind(this), logError('updatePosition: '));
    },5000);
    
  }

  stopUpdatePosition()
  {
    console.log("stop the interval")
    clearInterval(this.startInterval);
    this.startBtnDisabled=false;
    this.stopBtnDisabled=true;
  }

  updatePositionForTesting()
  {
    this.startBtnDisabled=true;
    this.stopBtnDisabled=false;
    var self = this;
    this.busProvider.getBusPositionFromWeb(this.bLinePosition.plate).then(function(data){
    for(var position in data)
    {
      console.log(data[position]);
      self.startInterval=setInterval(()=>
      {
        console.log("upload position data every 5 seconds:"+data[position]);
        self.busProvider.updateBusPosition(data[position]);
      },5000);
    }
    });
   
  }
}

import {Page, NavController} from 'ionic-angular';
import {BusProvider} from '../../providers/bus-provider/bus-provider';
import {BPosition} from '../../providers/bus-provider/bus';
import {logError} from '../../util/logUtil';

/*
  Generated class for the UpdatePositionPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/update-position/update-position.html',
})
export class UpdatePositionPage {
  constructor(public nav: NavController, private busProvider: BusProvider) {}
  updatePosition() {
    var update = function(position) {
      var bPosition = new BPosition();

      // TODO Need a better way to initialize BPosition
      bPosition.plate = 'YC12345';
      bPosition.position.coords.lat = position.coords.latitude;
      bPosition.position.coords.long = position.coords.longitude;
      bPosition.position.heading = position.coords.heading;
      bPosition.position.speed = position.coords.speed;

      console.log('UpdatePositionPage:updatePosition bPosition =' + JSON.stringify(bPosition));
      this.busProvider.updateBusPosition(bPosition)
    };
    console.log('updating position');
    navigator.geolocation.getCurrentPosition(update.bind(this), logError('updatePosition: '));
    
  }
}

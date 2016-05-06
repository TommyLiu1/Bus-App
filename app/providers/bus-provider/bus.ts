import * as _ from 'lodash';


// General classes
export class Coords {
  lat: number;
  long: number;
}

//check https://github.com/apache/cordova-plugin-geolocation for details
export class Position {
  coords: Coords = new Coords();
  heading: number; //Direction of travel, specified in degrees counting clockwise relative to the true north. 
  speed: number; //Current ground speed of the device, specified in meters per second. 
}

// Bus specific classes
export class BStop {
  coords: Coords = new Coords();
  name: string;
}

// Since TypeScript or JavaScrip passes the value of obj reference, we need to clone to make a copy.
export class BDirection {
  fStop: BStop = new BStop(); // From Stop
  tStop: BStop = new BStop(); // To Stop

  setFromStop(fStop: BStop) {
    console.log('fStop:' + JSON.stringify(fStop));
    this.fStop = _.cloneDeep(fStop);
  }

  setToStop(tStop: BStop) {
    console.log('fStop:' + JSON.stringify(tStop));
    this.tStop = _.cloneDeep(tStop);
  }
}


// BRoute is keyed on fromStop and toStop
export class BRoute {
  rtDirection: BDirection = new BDirection();
  stops: BStop[] = new Array();
  path: Coords[] = new Array();

  setFromStop(fStop: BStop) {
    this.rtDirection.setFromStop(fStop);
  }

  setToStop(tStop: BStop) {
    this.rtDirection.setToStop(tStop);
  }

  addPathCoords(coords: Coords) {
    var newCoords = _.cloneDeep(coords);
    this.path.push(newCoords);

  }

  addStop(stop: BStop) {
    var newStop = _.cloneDeep(stop);
    this.stops.push(newStop);

    // === does not do type conversion. So type must match.
    // == will do type conversion when necessary.
    if (this.stops.length == 1) {
      // first stop
      this.setFromStop(stop);
    }

    // Update toStop
    this.setToStop(stop);
  }

  resetRoute() {
    this. rtDirection = new BDirection();
    this. stops = new Array();
    this. path = new Array();
  }

}

// A bus line is keyed on city and bus line no. 

// A bus line route.
// Used to send a Bus's route (single direction route)
export class BLineRoute extends BRoute{
  city: string;
  no: number; // Bus Line Number.
}

// Bus line routes. Two directional routes for a bus line.
// Used to get a Bus's routes (two directional routes)
export class BLineRoutes {
  city: string;
  no: number; // Bus Line Number.
  routes: BRoute[] = new Array(); // two directional routes
}

export class BPosition {
  plate: string;
  rtDirection: BDirection = new BDirection();
  position: Position = new Position();

}

// Bus Route Position. A single bus's current position
// Used when one bus sends its current position
export class BLinePosition extends BPosition {
  city: string;
  no: number; // Bus Number.
}

// Bus Route Positions. All the bus current positions of a line no.
// Used when a user querys all the bus current positons of a line no.
export class BLinePositions {
  city: string;
  no: number; // Bus Number.
  bPositions: BPosition[] = new Array();

  // constructor() {
  // }
}


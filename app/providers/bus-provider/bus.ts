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
// Only use stop name to identify direction. Do not inlcude coords in the direction.
export class BDirection {
  fStop: string = ''; // From Stop Name
  tStop: string = ''; // To Stop Name

  setFromStop(sName: string) {
    this.fStop = sName;
  }

  setToStop(tName) {
    this.tStop = tName;
  }
}


// BRoute is keyed on fromStop and toStop
export class BRoute {
  rtDirection: BDirection = new BDirection();
  stops: BStop[] = new Array();
  path: Coords[] = new Array();

  setFromStop(fStop: BStop) {
    this.rtDirection.setFromStop(fStop.name);
  }

  setToStop(tStop: BStop) {
    this.rtDirection.setToStop(tStop.name);
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

// A bus line is keyed on city and bus line number. 

// A bus line route.
// Used to send a Bus's route (single direction route)
export class BLineRoute extends BRoute{
  city: string;
  line: number; // Bus Line Number.
}

// Bus line routes. Two directional routes for a bus line.
// Used to get a Bus's routes (two directional routes)
export class BLineRoutes {
  city: string;
  line: number; // Bus Line Number.
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
  line: number; // Bus Number.
}

// Bus Route Positions. All the bus current positions of a line no.
// Used when a user querys all the bus current positons of a line no.
export class BLinePositions {
  city: string;
  line: number; // Bus Number.
  bPositions: BPosition[] = new Array();

  // constructor() {
  // }
}


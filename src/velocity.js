//--------------------------------------------------------------
// Contains all of the velocity classes
//--------------------------------------------------------------
// -------------------------------------------------------------
// Base class for a velocity object
//
// This class is 
// -------------------------------------------------------------
class Velocity {
  constructor() {
    //this.ctx = ctx;
    //this.count = count;
  }

  //---------------------------------------------------------
  // Return the starting position for the game peices based on
  // the rule for the subclass.
  //---------------------------------------------------------
  getVelocity() {}
}

// -------------------------------------------------------------
// Class for the edge velocity
//
// This class is used to position all of the pieces on the 
// game board randomly 
// -------------------------------------------------------------
class RandomVelocity extends Velocity {
  constructor() {
    super();

  }

  //---------------------------------------------------------
  // Return the starting position for the game pieces
  // on the outer edge, we need 
  //---------------------------------------------------------
  getVelocity(ctx, count) {
    let v = 0;
    let xf = Math.floor(Math.random() * canvas.width);
    let yf = Math.floor(Math.random() * canvas.height);
    return [xf, yf];
  }

}

// -------------------------------------------------------------
// Class for the edge velocity
//
// This class is used to position all of the pieces on the outer 
// edge of the game board. 
// TODO - How to get avitar size best way
// -------------------------------------------------------------
class EdgeVelocity extends Velocity {
  constructor(count) {
    super();
    this.locs = [];
    this.currentAvitar = 0;
    // Split the number of avitars with 4 walls
    let perWall = Math.round(count / 4);

    // How many pixels per avitar on top/bottom left/right
    let xPixPerWall = Math.round(canvas.width / perWall);
    let yPixPerWall = Math.round(canvas.height / perWall);

    let increment = xPixPerWall;
    for (let i = 0; i < count / 2; i++) {
      if (i <= 3) {
        this.locs.push([xPixPerWall * i, 0]);
        this.locs.push([xPixPerWall * i, canvas.height - 60]);
      }
      if (i > 3 && i <= 7) {
        this.locs.push([0, yPixPerWall * (i % 4)]);
        this.locs.push([canvas.width - 60, yPixPerWall * (i % 4)]);
      }

    }
  }

  //---------------------------------------------------------
  // Return the starting position for the game pieces
  // on the outer edge, we need 
  //---------------------------------------------------------
  getVelocity() {
    this.currentAvitar++;
    return this.locs[this.currentAvitar - 1];
  }

}
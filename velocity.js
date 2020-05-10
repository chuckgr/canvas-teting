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
// This class is used to position all of the pieces on the outer 
// edge of the game board. 
// -------------------------------------------------------------
class EdgeVelocity extends Velocity {
  constructor() {

  }

  //---------------------------------------------------------
  // Return the starting position for the game pieces
  // on the outer edge, we need 
  //---------------------------------------------------------
  getVelocity() {
    let v = 0;
    let xf = Math.floor(Math.random() * canvas.width);
    let yf = Math.floor(Math.random() * canvas.height);
    /*
      if (xf > (canvas.width / 2)) {
        xf *= -1;
      }
      if (yf > (canvas.height / 2)) {
        yf *= -1;
      }
    */
    return [xf, yf];
  }

}
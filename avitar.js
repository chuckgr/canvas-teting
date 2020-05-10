//--------------------------------------------------------------
// Contains all of the avitarcreator classes
//--------------------------------------------------------------
// -------------------------------------------------------------
// Base class for a avitar object
//
// This class is 
// -------------------------------------------------------------
class AvitarCreator {
  constructor(vel, anim, count) {
    this.vel = vel; // Class to create the initial locations of the avitars
    this.anim = anim; // Class to determine the animation for the avitars
    this.NUMSHAPES = 3;
    this.AVITARSIZE = 60;
    this.COUNT = count;
  }

  //---------------------------------------------------------
  // Return the starting position for the game peices based on
  // the rule for the subclass.
  //---------------------------------------------------------
  getAvitars() {}
}


// -------------------------------------------------------------
// Class for creating avitar objects 
//
// Purpose is to position the initial avitar location randomly
// on the canvas
// -------------------------------------------------------------
class RandomAvitarCreator extends AvitarCreator {
  constructor(vel, anim, count) {
    super(vel, anim, count);
  }

  getAvitars() {
    let shape = "";
    let shapes = [];
    let shapeType = Math.round(Math.random() * this.NUMSHAPES);
    let v = [];

    for (let i = 0; i < count; i++) {
      v = this.vel.getVelocity(canvas);
      if (shapeType == 0) {
        shape = new UserImage(v[0], v[1], this.AVITARSIZE, this.AVITARSIZE, "andy-headshot1.png");
        shape.type = shapeType;
        //shapes.push(shape);
      } else if (shapeType == 1) {
        shape = new UserImage(v[0], v[1], this.AVITARSIZE, this.AVITARSIZE, "stack.png");
        shape.type = shapeType;
        //shapes.push(shape);
      } else if (shapeType == 2) {
        shape = new UserImage(v[0], v[1], this.AVITARSIZE, this.AVITARSIZE, "virginia.png");
        shape.type = shapeType;
        //shapes.push(shape);
      }
      shape.addAnimation(this.anim.createAnimation('Linear', shape));
      shapes.push(shape);
      shapeType = Math.floor(Math.random() * this.NUMSHAPES);
    }
    return shapes;
  }
}

// -------------------------------------------------------------
// Class for creating avitar objects 
//
// Purpose is to position the initial avitar location on the
// edge of the canvas
// -------------------------------------------------------------
class EdgeAvitarCreator extends AvitarCreator {
  constructor(vel, anim, count) {
    super(vel, anim, count);
  }

  getAvitars() {
    let shape = "";
    let shapes = [];
    let shapeType = Math.round(Math.random() * NUMSHAPES);
    let v = [];

    for (let i = 0; i < count; i++) {
      v = getVector(canvas);
      if (shapeType == 0) {
        shape = new UserImage(v[0], v[1], this.AVITARSIZE, this.AVITARSIZE, "andy-headshot1.png");
        shape.type = shapeType;
        shapes.push(shape);
      } else if (shapeType == 1) {
        shape = new UserImage(v[0], v[1], this.AVITARSIZE, this.AVITARSIZE, "stack.png");
        shape.type = shapeType;
        shapes.push(shape);
      } else if (shapeType == 2) {
        shape = new UserImage(v[0], v[1], this.AVITARSIZE, this.AVITARSIZE, "virginia.png");
        shape.type = shapeType;
        shapes.push(shape);
      }
      shapeType = Math.floor(Math.random() * NUMSHAPES);
    }
    return shapes;
  }
}
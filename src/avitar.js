//--------------------------------------------------------------
// Contains all of the avitarcreator classes
//--------------------------------------------------------------
// -------------------------------------------------------------
// Avitar class responsible for creating the avitars for the 
// playing board.  Setup is determinecd by the classes passed
// for velocity and animation.
//
// This class is 
// -------------------------------------------------------------
class AvitarCreator {
  constructor(vel, anim, count, ctx) {
    this.vel = vel; // Class to create the initial locations of the avitars
    this.anim = anim; // Class to determine the animation for the avitars
    this.NUMSHAPES = 3;
    this.AVITARSIZE = 60;
    this.COUNT = count;
    this.ctx = ctx;
  }

  getAvitars() {
    let shape = "";
    let shapes = [];
    let shapeType = Math.round(Math.random() * this.NUMSHAPES);
    let v = [];

    for (let i = 0; i < count; i++) {
      v = this.vel.getVelocity(this.ctx.canvas, this.COUNT, this.AVITARSIZE);
      if (shapeType == 0) {
        shape = new UserImage(v[0], v[1], this.AVITARSIZE, this.AVITARSIZE, document.getElementById("andy"));
        shape.type = shapeType;
      } else if (shapeType == 1) {
        shape = new UserImage(v[0], v[1], this.AVITARSIZE, this.AVITARSIZE, document.getElementById("stack"));
        shape.type = shapeType;
      } else if (shapeType == 2) {
        shape = new UserImage(v[0], v[1], this.AVITARSIZE, this.AVITARSIZE, document.getElementById("virginia"));
        shape.type = shapeType;
      }
      //console.log(shape);
      if (shape != "") {
        shape.addAnimation(this.anim.createAnimation('Linear', shape));
        shapes.push(shape);
      }
      shapeType = Math.floor(Math.random() * this.NUMSHAPES);
    }
    return shapes;
  }
}
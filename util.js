//--------------------------------------------------------------
// Contains all of the utility methods 
//--------------------------------------------------------------

//--------------------------------------------------------------
// Create a background for the game board
// TODO - fix hard coded values
//--------------------------------------------------------------
function createBackground(context) {
  context.beginPath();
  let image = new Image();
  image.src = "teamky-white.png";
  context.drawImage(image, 154, 166);
  context.stroke();
}

//----------------------------------------------------------
// Create all the shapes we will put on the canvas
//----------------------------------------------------------
function createImageShapesOld(count) {
  let shapes = [];
  let shape = "";
  let v = [];

  for (let i = 0; i < count; i++) {
    v = getVector(canvas);
    shape = new UserImage(v[0], v[1], 60, "andy-headshot1.png");
    shape.type = 0;
    shapes.push(shape);
  }

  return shapes;
}

//--------------------------------------------------------------
// Create the speed and direction coordinate for a new shape
// based on the location of the object
//--------------------------------------------------------------
function getVector(canvas) {
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

//----------------------------------------------------------
// Create all the shapes we will put on the canvas
//----------------------------------------------------------
function createImageShapes(count) {
  const NUMSHAPES = 3;
  let shapes = [];
  let shapeType = Math.round(Math.random() * NUMSHAPES);
  let shape = "";
  let v = [];

  for (let i = 0; i < count; i++) {
    v = getVector(canvas);
    if (shapeType == 0) {
      shape = new UserImage(v[0], v[1], 60, "andy-headshot1.png");
      shape.type = shapeType;
      shapes.push(shape);
    } else if (shapeType == 1) {
      shape = new UserImage(v[0], v[1], 60, "stack.png");
      shape.type = shapeType;
      shapes.push(shape);
    } else if (shapeType == 2) {
      shape = new UserImage(v[0], v[1], 60, "virginia.png");
      shape.type = shapeType;
      shapes.push(shape);
    }
    shapeType = Math.floor(Math.random() * NUMSHAPES);
  }
  return shapes;
}


//----------------------------------------------------------
// Create the animations for the shapes passed
//----------------------------------------------------------
function createAnimations(shapes, type) {
  let vx = 1,
    vy = 1;
  for (let i = 0; i < shapes.length; i++) {
    if (type == 'Linear') {
      if (shapes[i].x > window.canvas.width) {
        vx = -1;
      }
      if (shapes[i].y > window.canvas.height) {
        vy = -1;
      }
      shapes[i].addAnimation(new LinearAnimation(
        Math.floor((Math.random() * SPEEDMAX) + 1),
        Math.floor(((Math.random() * SPEEDMAX) + 1) * vx),
        Math.floor(((Math.random() * SPEEDMAX) + 1) * vy)
      ));

    } else if (type == 'Balloon') {
      shapes[i].addAnimation(new BallonAnimation(
        Math.floor((Math.random() * 1) + 1),
        Math.floor((Math.random() * 1) + 1),
        Math.floor((Math.random() * 1) + 1)));
    }
  }
}

//--------------------------------------------------------------
// Create object to hold the score
//--------------------------------------------------------------
class Score {
  constructor(ctx) {
    this.score = 0;
    this.multi = 1000;
    this.objects = 0;
    this.shots = 0;
    this.miss = 100;
    this.ctx = ctx;
  }

  //--------------------------------------------------------------
  // Create object to hold the score
  //--------------------------------------------------------------
  updateScore(type) {
    if (type == 1) {
      this.score = this.score + this.multi;
    } else if (type == 2) {
      this.score = this.score - Math.floor(this.multi / 2);
    } else {
      this.score = this.score - this.miss;
    }
    if (debug) {
      console.log(`Score update ${type}`);
    }
  }

  //--------------------------------------------------------------
  // Draw the score in the upper left corner
  //--------------------------------------------------------------
  drawScore() {
    this.ctx.strokeStyle = "rgb(111,022,033)";
    this.ctx.lineWidth = 2;
    this.ctx.font = '20px arial';
    this.ctx.fillText("Score: " + this.score, 10, 20);
    this.ctx.stroke();
  }
}

//--------------------------------------------------------------
// Check for collisions
//--------------------------------------------------------------
function checkCollisions(shapes, infected) {
  let nub = 0;
  let found = false;
  for (let i = 0; i < infected.length; i++) {
    for (let j = 0; j < shapes.length; j++) {
      if (shapes[infected[i]].alive && !shapes[j].infected && shapes[j].alive) {
        if (infected[i] != j) {
          if ((shapes[infected[i]].x <= shapes[j].x && shapes[infected[i]].x + 60 >= shapes[j].x) &&
            (shapes[infected[i]].y <= shapes[j].y && shapes[infected[i]].y + 60 >= shapes[j].y)) {

            shapes[j].touch();
            found = infected.find(function (s) {
              if (s == this.j) {
                return true;
              }
            }, this);
            if (!found && shapes[j].infected) {
              infected.push(j);
            }
          }
        }
      }
    }
  }
}
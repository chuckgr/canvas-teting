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
function createImageShapes(count) {
  let shapes = [];
  let shapeType = Math.round(Math.random() * 2);
  let shape = "";
  let v = [];

  for (let i = 0; i < count; i++) {
    v = getVector(canvas);
    if (shapeType == 0) {
      shape = new UserImage(v[0], v[1], Math.floor(Math.random() * 40) + 2, "andy-headshot1.png");
      shape.type = shapeType;
      shapes.push(shape);
    } else if (shapeType == 1) {
      shape = new UserImage(v[0], v[1], Math.floor(Math.random() * 40) + 2, "Coronavirus-CDC.png");
      shape.type = shapeType;
      shapes.push(shape);
    }
    shapeType = Math.floor(Math.random() * 2);
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
        Math.floor(((Math.random() * 2) + 2) * vx),
        Math.floor(((Math.random() * 2) + 2) * vy),
        Math.floor((Math.random() * 2) + 1)));

    } else if (type == 'Balloon') {
      shapes[i].addAnimation(new BallonAnimation(
        Math.floor((Math.random() * 1) + 1),
        Math.floor((Math.random() * 1) + 1),
        Math.floor((Math.random() * 1) + 1)));
    }
  }
}

//--------------------------------------------------------------
// Create the speed and direction coordinate for a new shape
// based on the location of the object
//--------------------------------------------------------------
function getVector(canvas) {
  let v = 0;
  let xf = Math.floor(Math.random() * canvas.width);
  let yf = Math.floor(Math.random() * canvas.height);
  if (xf > (canvas.width / 2)) {
    xf *= -1;
  }
  if (yf > (canvas.height / 2)) {
    yf *= -1;
  }


  return [xf, yf];
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

  updateScore(type) {
    if (type == 1) {
      this.score = this.score + this.multi;
    } else if (type == 2) {
      this.score = this.score - Math.floor(this.multi / 2);
    } else {
      this.score = this.score - this.miss;
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
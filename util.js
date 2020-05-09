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
  const IMGWIDTH = 50;
  let touchRan = 0;
  let found = false;
  for (let i = 0; i < infected.length; i++) {
    for (let j = 0; j < shapes.length; j++) {
      if (shapes[infected[i]].alive && /*!shapes[j].infected &&*/ shapes[j].alive) {
        if (infected[i] != j) {
          if ((shapes[infected[i]].x < shapes[j].x + IMGWIDTH &&
              shapes[infected[i]].x + IMGWIDTH > shapes[j].x) &&
            shapes[infected[i]].y < shapes[j].y + IMGWIDTH &&
            shapes[infected[i]].y + IMGWIDTH > shapes[j].y) {

            touchRan = Math.round(Math.random() * TOUCHESTOINFECT);
            if (touchRan === 5) {
              shapes[j].infect();
            }

            if (!sameTouch.includes(j)) {
              shapes[j].touch();
              sameTouch = [];
              sameTouch.push(j);
            }

            if (!infected.includes(j) && shapes[j].infected) {
              infected.push(j);
            }

          }
        }
      }
    }
  }
}

//--------------------------------------------------------------
// Display shape debug info in debug canvas
//--------------------------------------------------------------
function debugCanvas(shapes) {
  let canvas = document.getElementById("debug");
  let ctx = canvas.getContext("2d");
  let x = 10;
  let y = 10;
  const increment = 12;

  let newFormat = "";
  let modStr = "";

  ctx.save();
  // Clear the playing field
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "#000000";
  ctx.font = '12px monospace';
  ctx.fillText("  X     Y    Alive    Infected   Infected Days  Touches", x, y);
  const format = "xxxx  yyyy   aaaaa      iiiii         dddd        oooo";
  y += increment;
  newFormat = format;
  for (let i = 0; i < shapes.length; i++) {
    modStr = numRep(shapes[i].x);
    newFormat = newFormat.replace("xxxx", modStr);
    modStr = numRep(shapes[i].y);
    newFormat = newFormat.replace("yyyy", modStr);
    modStr = strRep(shapes[i].alive);
    newFormat = newFormat.replace("aaaaa", modStr);
    modStr = strRep(shapes[i].infected);
    newFormat = newFormat.replace("iiiii", modStr);
    modStr = numRep(shapes[i].infectedDays);
    newFormat = newFormat.replace("dddd", modStr);
    modStr = numRep(shapes[i].touches);
    newFormat = newFormat.replace("oooo", modStr);
    //ctx.fillText(shapes[i].x + "   " + shapes[i].y + "   " + shapes[i].alive + "     " + shapes[i].infected + "     " + shapes[i].infectedDays + "     " + shapes[i].touches, x, y);
    ctx.fillText(newFormat, x, y);
    y += increment;
    newFormat = format;
  }

  ctx.restore();

  // Format the number to 3 digits
  function numRep(n) {
    let newStr = "";
    let newN = parseInt(n);
    if (newN === 0) {
      newStr = "0000";
    } else if (newN < 10) {
      newStr = "000" + n;
    } else if (newN < 100) {
      newStr = "00" + n;
    } else if (newN < 1000) {
      newStr = "0" + n;
    } else {
      newStr = "" + n;
    }
    return newStr;
  }

  // Format the string to 5 chars
  function strRep(s) {
    let newStr = Boolean(s).toString();
    if (newStr.length < 5) {
      newStr = " " + s;
    }
    return newStr;
  }
}
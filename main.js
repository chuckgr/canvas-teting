//--------------------------------------------------------------
// Contains all of the methods to create the objects on the 
// canvas and to manage the event loop
//--------------------------------------------------------------

//--------------------------------------------------------------
// Create a background for the game board
//--------------------------------------------------------------
function createBackground(context) {
  context.beginPath();
  let image = new Image();
  image.src = "teamky-white.png";
  context.drawImage(image, 0, 190, 750, 190);
  context.stroke();
}

//--------------------------------------------------------------
// Create all the shapes we will put on the canvas
//--------------------------------------------------------------
function createShapes(count) {
  let shapes = [];
  let shapeType = Math.round(Math.random() * 3);

  for (let i = 0; i < count; i++) {
    if (shapeType == 0) {
      shapes.push(new Circle(Math.floor(Math.random() * canvas.width),
        Math.floor(Math.random() * canvas.height),
        Math.floor(Math.random() * 20) + 5));
    } else if (shapeType == 1) {
      shapes.push(new Square(Math.floor(Math.random() * canvas.width),
        Math.floor(Math.random() * canvas.height),
        Math.floor(Math.random() * 40) + 2));
    } else if (shapeType == 2) {
      shapes.push(new UserImage(Math.floor(Math.random() * canvas.width),
        Math.floor(Math.random() * canvas.height),
        Math.floor(Math.random() * 40) + 2, "Coronavirus-CDC.png"));
    }
    shapeType = Math.floor(Math.random() * 3);
  }

  return shapes;
}

//----------------------------------------------------------
// Create all the shapes we will put on the canvas
//----------------------------------------------------------
function createImageShapes(count) {
  let shapes = [];
  let shapeType = Math.round(Math.random() * 2);
  let shape = "";

  for (let i = 0; i < count; i++) {
    if (shapeType == 0) {
      shape = new UserImage(Math.floor(Math.random() *
        canvas.width), Math.floor(Math.random() * canvas.height), Math.floor(Math.random() *
        40) + 2, "andy-headshot1.png");
      shape.type = shapeType;
      shapes.push(shape);
    } else if (shapeType == 1) {
      shape = new UserImage(Math.floor(Math.random() * canvas.width), Math.floor(Math.random() *
          canvas.height),
        Math.floor(Math.random() * 40) + 2, "Coronavirus-CDC.png");
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
  for (let i = 0; i < shapes.length; i++) {
    if (type == 'Linear') {
      shapes[i].addAnimation(new LinearAnimation(
        Math.floor((Math.random() * 2) + 2),
        Math.floor((Math.random() * 2) + 2),
        Math.floor((Math.random() * 2) + 1)));
    } else if (type == 'Balloon') {
      shapes[i].addAnimation(new BallonAnimation(
        Math.floor((Math.random() * 1) + 1),
        Math.floor((Math.random() * 1) + 1),
        Math.floor((Math.random() * 1) + 1)));
    }
  }
}

//----------------------------------------------------------
// Grab the data from the form and update the screen
//----------------------------------------------------------
function getForm() {
  console.log("Count:" + document.getElementById("count").value);
  //alert("Count:" + document.getElementById("count").value);
  count = document.getElementById("count").value;
  console.trace(count);
  init();
}

//----------------------------------------------------------
// Draw loop for the shapes created
//----------------------------------------------------------
function draw(objects) {
  var canvas = document.getElementById("canvas");
  var context = canvas.getContext("2d");

  context.clearRect(0, 0, context.canvas.width, context.canvas.height);

  createBackground(context);

  if (debug) {
    context.font = '12px monospace';
    context.fillText("Number of shapes = " + objects.length, 5, 15);
  }

  for (let i = 0; i < objects.length; i++) {
    objects[i].draw(context);
  }

  context.restore();
  if (debug) {
    stopCount++;
  }
  if (stopCount < stopOn) {
    window.requestAnimationFrame(function (ts) {
      //console.log(objects);
      draw(objects);
    });
  }
}

//----------------------------------------------------------
// This is the routine called when the page is loaded
//----------------------------------------------------------
function init() {
  let shapes = [];
  // Get the canvas we are drawing to
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");

  //let shapes = createShapes(count);
  shapes = createImageShapes(count);

  createAnimations(shapes, 'Linear');
  //createAnimations(shapes, 'Balloon');

  // Listen for mouse events
  addListener(canvas, shapes);

  // Intro sound
  //intro.play();

  window.requestAnimationFrame(function (ts) {
    draw(shapes);
  });
}

//----------------------------------------------------------
// globals
//----------------------------------------------------------
let debug =
  true;
//false;
let count = 40;
let stopCount = 0;
const stopOn = 5000;
let reDraw = false;

// Audio files to play
const shot = new Audio("laser-shot1.mp3");
shot.load();
const explode = new Audio("explosion1.mp3");
explode.load();
const intro = new Audio("intro.mp3");
intro.load();
// This looks good and all but you are no longer allowed to play sounds
// without the user allpwing it....so loading screen needed
/*
intro.addEventListener("canplaythrough", event => {
  intro.play();
});
*/
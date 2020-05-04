//--------------------------------------------------------------
// Contains all of the methods for the main loop and setup 
//--------------------------------------------------------------

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

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
// All below is the new code for game control...
// cleanup on isle 3 after it is working
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 


//----------------------------------------------------------
// This is the routine called when the page is loaded
// TODO - switch to this function when the Controller class 
//        is finished
//----------------------------------------------------------
function initGame() {
  // This is the main controller for the game
  controller = new Controller();
  controller.state = controller.splashSetup;
  mainLoop();
}

//----------------------------------------------------------
// main animation loop
//----------------------------------------------------------
function mainLoop() {
  controller.state(); // run current game state
  requestAnimationFrame(mainLoop);
}

//----------------------------------------------------------
// globals
//----------------------------------------------------------
let debug =
  //true;
  false;
let count = 40;
let stopCount = 0;
const stopOn = 50;
let reDraw = false;

// This is the main controller for the game
let controller;

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
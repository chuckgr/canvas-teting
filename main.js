//--------------------------------------------------------------
// Contains all of the methods for the main loop and setup 
//--------------------------------------------------------------

//----------------------------------------------------------
// This is the routine called when the page is loaded
// TODO - 
//----------------------------------------------------------
function initGame() {
  // This is the main controller for the game
  controller = new Controller();
  controller.state = controller.splashSetup;
  mainLoop();
}

//----------------------------------------------------------
// Main animation loop, all state changes are in the 
// controller class
//----------------------------------------------------------
function mainLoop() {
  controller.state(); // run current game state
  requestAnimationFrame(mainLoop);
}

//----------------------------------------------------------
// globals
// TODO - Remove unneeded variables and clean up per reqs.
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
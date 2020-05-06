//--------------------------------------------------------------
// Pandemic game
// This is a game created from the test code to learn about using
// the canvas in html.
// It has grown into a fun project centered on the people, sounds,
// and images around the pandemic.
//
// Premise of the game:
//  Someone is infected witht he virus but it is not apparent
//  by looking at them (just like the real virus).  As this image
//  bunps into other images it infects them as well. As they become 
//  symtomatic the image will change and you are to 'shoot'
//  these images before they infect others. If you don't shoot them 
//  they will eventually die or recover. When the infected people are 
//  innoculated the game ends (or if everyone dies).
//
// This file Contains all of the methods for the main loop and setup 
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
  //  true;
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
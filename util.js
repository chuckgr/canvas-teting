//--------------------------------------------------------------
// Contains all of the utility methods 
//--------------------------------------------------------------

//--------------------------------------------------------------
// Create the speed and direction coordinate for a new shape
// based on the location of the object
//--------------------------------------------------------------
function getVel(shape) {
  let v = 0;

  return v;
}

//--------------------------------------------------------------------------------------//

// --------------------------------------------------
// Example code from stackOverflow
// --------------------------------------------------
function splashIO(event) { // function to start the game when IO is correct
  // check for the correct events
  if (event.type === "click" || (event.type === "keydown" && event.code === "Enter")) {
    // remove events
    canvas.removeEventListener("click", splashIO);
    canvas.removeEventListener("keydown", splashIO);
    gameStates.current = gameStates.startGame;
  }
}

// --------------------------------------------------
// holds the game state and game state functions
//
// Example code from stackOverflow
// --------------------------------------------------
const gameStates = {
  current: undefined,
  splash() { // display splash ===================================
    // display splash and wait for new state
  },
  setupSplash() { // setup splash screen ==========================
    canvas.addEventListener("click", splashIO);
    canvas.addEventListener("keydown", splashIO);
    gameStates.current = gameStates.splash();
    gameStates.current(); // call the first frame
  },
  startGame() { // setup game =====================================
    gameStates.current = gameStates.game(); //set up state function
    gameStates.current(); // call the first frame
  },
  game() { // plays the main game  ===============================
    // play game
  }
};

// main animation loop
function mainLoop() {
  gameStates.current(); // run current game state
  requestAnimationFrame(mainLoop);
}

gameStates.current = gameStates.setupSplash; // set current state to splash screen

// wait for page to load then start the animation
window.addEventListener('load', function () {
  requestAnimationFrame(mainLoop); // start the animation
});
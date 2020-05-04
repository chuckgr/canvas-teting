//--------------------------------------------------------------
// Contains the controller class to manage the game
//--------------------------------------------------------------
class Controller {
  //----------------------------------------------------------
  // This will replace the init() function in the main file
  // to allow all control to be handled by this class based 
  // on the state of the game
  //----------------------------------------------------------
  constructor() {
    if (debug) {
      console.log('Controller:constructor');
    }
    this.canvas = document.getElementById("canvas");
    this.ctx = canvas.getContext("2d");
    this.state = "";
    this.background = new Image();
    this.background.src = "teamky-white.png";
    this.splashEvents = false;
    this.shapes = [];
  }

  //----------------------------------------------------------
  // This sets up the splash screen and initial game state
  // After the user presses the play button the main game
  // is loaded and run.
  //----------------------------------------------------------
  splash() {
    if (debug) {
      console.log('Controller:splash');
    }

    // Are we already listening for events?
    if (!this.splashEvents) {
      this.canvas.addEventListener('click', splashListener);
    }
    const x = 0,
      y = 140;

    // clear out the canvas
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.beginPath();
    // Put out the background image
    //this.ctx.drawImage(this.background, x, y, 750, 190);
    // Add in the rona
    let rona = new UserImage(10, 60, 400, "Coronavirus-CDC.png");
    rona.width = 380;
    rona.height = 380;
    rona.draw(this.ctx);
    // Add in the large Andy head
    let andy = new UserImage(canvas.width / 2, 40, 400, "andy-headshot1.png");
    andy.width = 400;
    andy.height = 400;
    andy.draw(this.ctx);
    // Show the Play button
    this.ctx.strokeStyle = "rgb(" + Math.floor((Math.random() * 255)) + "," +
      Math.floor((Math.random() * 255)) + "," +
      Math.floor((Math.random() * 255)) + ")";
    this.ctx.strokeStyle = "rgb(111,022,033)";
    this.ctx.lineWidth = 2;
    this.ctx.font = '35px arial';
    this.ctx.strokeRect(330, 420, 120, 40);
    //this.ctx.fillText("Play", 350, 450);
    this.ctx.strokeText("Play", 350, 450);
    this.ctx.stroke();
  }

  //----------------------------------------------------------
  // This sets up the game 
  //----------------------------------------------------------
  playSetup() {
    if (debug) {
      console.log('Controller:playSetup');
    }
    // Create all of the shapes to be used and the animation for them
    this.shapes = createImageShapes(count);
    createAnimations(this.shapes, 'Linear');

    // Listen for mouse click event on the canvas
    addListener(this.canvas, this.shapes);

    // Intro sound
    intro.play();

    // Jump to the game
    this.state = this.play;
  }

  //----------------------------------------------------------
  // This plays the game based on the rules
  // when the user has completed the task or fails
  // the end game takes over
  //----------------------------------------------------------
  play() {
    if (debug) {
      console.log('Controller:play');
    }
    // Clear the playing field
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    createBackground(this.ctx);

    if (debug) {
      this.ctx.font = '12px monospace';
      this.ctx.fillText("Number of shapes = " + this.shapes.length, 5, 15);
    }

    for (let i = 0; i < this.shapes.length; i++) {
      this.shapes[i].draw(this.ctx);
    }

    this.ctx.restore();
    if (debug) {
      stopCount++;
      if (stopCount >= stopOn) {
        return;
      }
    }

  }

  //----------------------------------------------------------
  // End of the game has been reached
  //----------------------------------------------------------
  end() {
    if (debug) {
      console.log('Controller:end');
    }
  }

}
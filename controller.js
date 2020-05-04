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
    this.shapes = [];
    this.andy = "";
    this.rona = "";
    this.playIcon = "";
  }

  //----------------------------------------------------------
  // This sets up the splash screen and initial game state
  // After the user presses the play button the main game
  // is loaded and run.
  //----------------------------------------------------------
  splashSetup() {
    if (debug) {
      console.log('Controller:splashSetup');
    }
    // Add in the rona
    this.rona = new UserImage(10, 60, 400, "Coronavirus-CDC.png");
    this.rona.width = 380;
    this.rona.height = 380;
    this.rona.setDirection = -1;
    this.rona.addAnimation(new BobbleHeadAnimation(10, 10, 10));

    // Add in the large Andy head
    this.andy = new UserImage(canvas.width / 2, 40, 400, "andy-headshot1.png");
    this.andy.width = 400;
    this.andy.height = 400;
    this.andy.addAnimation(new BobbleHeadAnimation(10, 10, 10));

    // Show the Play button
    this.playIcon = new UserImage(350, 320, 400, "play1.png");
    this.playIcon.width = 100;
    this.playIcon.height = 100;

    this.canvas.addEventListener('click', splashListener);

    this.state = this.splash;
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

    const x = 0,
      y = 140;

    // clear out the canvas
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.beginPath();

    // Put out the background image
    //this.ctx.drawImage(this.background, x, y, 750, 190);

    // Draw the rona
    this.rona.draw(this.ctx);

    // Draw the large Andy head
    this.andy.draw(this.ctx);

    // Show the Play button
    this.playIcon.draw(this.ctx);

    /*
    this.ctx.strokeStyle = "rgb(" + Math.floor((Math.random() * 255)) + "," +
      Math.floor((Math.random() * 255)) + "," +
      Math.floor((Math.random() * 255)) + ")";
    this.ctx.strokeStyle = "rgb(111,022,033)";
    this.ctx.lineWidth = 2;
    this.ctx.font = '35px arial';
    this.ctx.strokeRect(330, 420, 120, 40);
    //this.ctx.fillText("Play", 350, 450);
    this.ctx.strokeText("Play", 350, 450);
    */
    //this.ctx.stroke();
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
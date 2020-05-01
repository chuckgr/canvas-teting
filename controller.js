//--------------------------------------------------------------
// Contains the controller class to manage the game
//--------------------------------------------------------------
class Controller {
  constructor(ctx) {
    this.ctx = ctx;
    this.state = "";
  }

  //----------------------------------------------------------
  // This sets up the splash screen and initial game state
  // After the user presses the play button the main game
  // is loaded and run.
  //----------------------------------------------------------
  splash() {
    const x = 0,
      y = 0;
    this.ctx.beginPath();
    let image = new Image();
    image.src = document.getElementById("teamky");
    this.ctx.drawImage(image.src, x, y, ctx.width, ctx.height);
    this.ctx.stroke();
  }

  //----------------------------------------------------------
  // This sets plays the game based on the rules
  // when the user has completed the task or fails
  // the end game takes over
  //----------------------------------------------------------
  play() {

  }

  //----------------------------------------------------------
  // End of the game has been reached
  //----------------------------------------------------------
  end() {

  }

}
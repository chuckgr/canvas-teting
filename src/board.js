//--------------------------------------------------------------
// Contains all of the game board parts
//--------------------------------------------------------------
// -------------------------------------------------------------
// Class for a gameboard object
//
// This class is the top class for the gameboard responsible
// for creating all of the game pieces along with the behavior
// of the pieces during game play (velocity). In addition it will
// create the Score class.
// -------------------------------------------------------------
class GameBoard {
  constructor() {
    //this.velocity = new EdgeVelocity();
    this.boardWidth = 800;
    this.boardHeight = 600;
    this.canvas = document.getElementById("canvas");
    this.ctx = canvas.getContext("2d");
    this.bkgImage = new Image();
    //this.bkgImage.board = this;
    this.bkgImage.src = "img/teamky-white.png";

  }

  //---------------------------------------------------------
  // Return the game pieces for the current run
  //---------------------------------------------------------
  getShapes() {}

  //---------------------------------------------------------
  // Create the game board
  //---------------------------------------------------------
  createBoard() {
    // Create canvas object (TODO - currently using index.html)
    // Add quarentine location on right side taking up 100 px


  }

  //---------------------------------------------------------
  // Create/display the background image
  //---------------------------------------------------------
  displayBackground() {
    this.ctx.beginPath();
    //let image = this.bkgImage;
    //image.board = this;
    //image.onload = () => {
    //  drawBackground();
    //};
    //image.src = "img/teamky-white.png";

    //function drawBackground() {
    // Center image on center of the canvas
    let x = this.ctx.canvas.width / 2 - this.bkgImage.width / 2;
    let y = this.ctx.canvas.height / 2 - this.bkgImage.height / 2;
    this.ctx.drawImage(this.bkgImage, x, y);
    //image.board.ctx.stroke();
    //}
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
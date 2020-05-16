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
    this.canvas = "";
    this.ctx = "";
    this.hahSize = 120;
    this.boardWidth = 800;
    this.boardHeight = 600;
    this.mainAreaWidth = this.boardWidth - this.hahSize;
    this.mainAreaHeight = this.boardHeight;
    this.createCanvas();
    this.bkgImage = document.getElementById("teamky");
    //this.bkgImage.board = this;

  }

  //---------------------------------------------------------
  // Return the game pieces for the current run
  //---------------------------------------------------------
  getShapes() {}

  //---------------------------------------------------------
  // Create the canvas for the game board
  //---------------------------------------------------------
  createCanvas() {
    this.canvas = document.createElement('canvas');
    this.canvas.id = "canvas";
    this.canvas.width = this.boardWidth;
    this.canvas.height = this.boardHeight;
    this.canvas.style.zIndex = 1;
    this.canvas.style.border = "solid 2pt rgb(8, 112, 248)";
    const div = document.getElementById("main-canvas");
    div.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");
  }

  //---------------------------------------------------------
  // Create the game board
  //---------------------------------------------------------
  createBoard() {
    // Canvas is created in the constructor
    // Add the background
    this.displayBackground();
    this.displayHealthyAtHome();
    // Add the score, high score
    // Add quarentine location on right side taking up n px's
    // Set the rules to end the game

  }

  //---------------------------------------------------------
  // Create/display the background image
  //---------------------------------------------------------
  displayBackground() {
    this.ctx.beginPath();
    // Center image on center of the canvas
    let x = this.ctx.canvas.width / 2 - this.bkgImage.width / 2;
    let y = this.ctx.canvas.height / 2 - this.bkgImage.height / 2;
    this.ctx.drawImage(this.bkgImage, x, y);
  }

  //---------------------------------------------------------
  // Create/display healthy at home areas
  //---------------------------------------------------------
  displayHealthyAtHome() {
    // Lets start with just a 130 px area on right side of screen
    let x = this.ctx.canvas.width - this.hahSize;
    let y = this.ctx.canvas.height;

    this.ctx.strokeStyle = 'green';
    this.ctx.lineWidth = 3.0;
    this.ctx.beginPath();
    this.ctx.moveTo(x, 0);
    this.ctx.lineTo(x, y);
    this.ctx.stroke();
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
    this.bonus = 10000;
  }

  //--------------------------------------------------------------
  // Update the score based on the object hit
  // TODO - implement
  //--------------------------------------------------------------
  hitScore(shape) {

    if (debug) {
      console.log(`Score update ${type}`);
    }
  }


  //--------------------------------------------------------------
  // Update the score based on the object hit
  // TODO - remove this when new method is complete
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
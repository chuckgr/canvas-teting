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
  constructor(score) {
    this.score = score;
    this.canvas = "";
    this.ctx = "";
    this.hahSize = 120;
    this.boardWidth = 900;
    this.boardHeight = 600;
    this.mainAreaWidth = this.boardWidth - this.hahSize;
    this.mainAreaHeight = this.boardHeight;
    this.createCanvas();
    this.bkgImage = document.getElementById("teamky");
    this.scrollImg = document.getElementById("scroll");
    this.currQuarnLoc = 0;
    this.quarnLocations = [];
    this.createQuarnLocations();
  }

  //---------------------------------------------------------
  // Return the game to it's original state
  //---------------------------------------------------------
  reset() {
    this.currQuarnLoc = 0;
    this.quarnLocations = [];
    this.createQuarnLocations();
    this.score.reset();
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
    this.canvas.style.zIndex = 0;
    this.canvas.style.border = "solid 2pt rgb(8, 112, 248)";
    const div = document.getElementById("main-canvas");
    div.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");
  }

  //---------------------------------------------------------
  // Create the loactions for the quarantine
  //---------------------------------------------------------
  createQuarnLocations() {
    let strtX = this.boardWidth - this.hahSize;
    let strtY = 10;
    for (let i = 0; i < count; i++) {
      if (i % 2 == 0) {
        this.quarnLocations.push([strtX, strtY]);
      } else {
        this.quarnLocations.push([strtX + 65, strtY]);
        strtY += 65;
      }
    }

  }

  //---------------------------------------------------------
  // Clear the entire game board
  //---------------------------------------------------------
  clearBoard() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  //---------------------------------------------------------
  // Create the game board
  //---------------------------------------------------------
  createBoard() {
    // Canvas is created in the constructor
    // Clear the board
    this.clearBoard();
    // Add the background
    this.displayBackground();
    // Add logo
    this.displayHealthyAtHome();
    // Add the score, high score
    // Add quarentine location on right side taking up n px's
    // Set the rules to end the game

  }

  //---------------------------------------------------------
  // Create the end game final score and restart options
  //---------------------------------------------------------
  createEndScore() {
    const esWidth = 400;
    const esHeight = 400;
    const goX = (this.boardWidth / 2) - (esWidth / 2);
    const goY = (this.boardHeight / 2) - (esHeight / 2);
    let textXOffset = 65;
    let textYOffset = 40;
    const goText = "Game Over";
    const hiScoreTxt = "High Score: ";
    const scoreTxt = "Score: ";
    const infectedTxt = "Infected:";
    const notInfectedTxt = "Not Infected";
    const quarnTxt = "Quarantined:";
    const aliveTxt = "Alive:";
    let currXOffset = textXOffset;
    let currYOffset = textYOffset;
    const scoresXOffset = 280;

    this.ctx.save();
    this.ctx.beginPath();
    // Clear a rectangle in the middle of the playing area
    this.ctx.clearRect(goX, goY, esWidth, esHeight);
    //this.ctx.fillStyle = "rgb(255,255,255)";
    //this.ctx.fillRect(goX, goY, esWidth, esHeight);

    // Load up a scroll image
    this.ctx.drawImage(this.scrollImg, goX, goY, esWidth, esHeight);
    // Make the top corner of new rectange 0,0
    this.ctx.translate(goX, goY);

    // Write "Game Over" in large print in center of new rect.
    this.drawText(goText, 25, 'center', (textYOffset - 5), esWidth, esHeight);

    // Write Final score
    currYOffset += textYOffset;
    this.drawText(scoreTxt, 20, textXOffset, currYOffset, esWidth, esHeight);
    this.drawText(this.score.getScore(), 20, scoresXOffset, currYOffset, esWidth, esHeight);

    // Write high score
    currYOffset += textYOffset;
    this.drawText(hiScoreTxt, 20, textXOffset, currYOffset, esWidth, esHeight);
    this.drawText(this.score.getHiScore(), 20, scoresXOffset, currYOffset, esWidth, esHeight);

    // Write stats
    let infectedCnt = 0;
    let quarnCnt = 0;
    let notInfectedCnt = 0;
    let aliveCnt = 0;
    let shapesToCnt = controller.shapes;

    for (let i = 0; i < controller.shapes.length; i++) {
      if (controller.shapes[i].infected) {
        infectedCnt++;
      } else {
        notInfectedCnt++;
      }
      if (controller.shapes[i].quarantined) {
        quarnCnt++;
      }
      if (controller.shapes[i].alive) {
        aliveCnt++;
      }
    }

    currYOffset += textYOffset;
    this.drawText(infectedTxt, 16, textXOffset, currYOffset, esWidth, esHeight);
    this.drawText(infectedCnt, 16, scoresXOffset, currYOffset, esWidth, esHeight);

    currYOffset += textYOffset;
    this.drawText(notInfectedTxt, 16, textXOffset, currYOffset, esWidth, esHeight);
    this.drawText(notInfectedCnt, 16, scoresXOffset, currYOffset, esWidth, esHeight);

    currYOffset += textYOffset;
    this.drawText(quarnTxt, 16, textXOffset, currYOffset, esWidth, esHeight);
    this.drawText(quarnCnt, 16, scoresXOffset, currYOffset, esWidth, esHeight);

    currYOffset += textYOffset;
    this.drawText(aliveTxt, 16, textXOffset, currYOffset, esWidth, esHeight);
    this.drawText(aliveCnt, 16, scoresXOffset, currYOffset, esWidth, esHeight);

    // Show restart button
    let playIcon = new UserImage(180, 320, 50, 50, document.getElementById("play"));
    playIcon.draw(this.ctx);

    // Reset the translation
    this.ctx.translate(0, 0);
    this.ctx.restore();
  }

  //--------------------------------------------------------------
  // Draw text at x,y location
  //
  // If x or y is passed with the text center the text will be 
  // centered on that axis 
  //--------------------------------------------------------------
  drawText(text, size, x, y, w, h) {
    this.ctx.save();
    this.ctx.font = size + 'px verdana';
    if (x == 'center') {
      let textSize = this.ctx.measureText(text);
      x = parseInt((w / 2) - (Math.floor(textSize.width / 2)));
    }
    if (y == 'center') {
      let textSize = this.ctx.measureText(text);
      y = parseInt((h / 2) - (Math.floor(textSize.height / 2)));
    }

    this.ctx.fillStyle = "black";
    this.ctx.lineWidth = 2;
    this.ctx.fillText(text, x, y);
    this.ctx.stroke();
    this.ctx.restore();
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

  //--------------------------------------------------------------
  // Draw the score in the upper left corner
  //--------------------------------------------------------------
  displayScore(score) {
    this.ctx.strokeStyle = "rgb(111,022,033)";
    this.ctx.lineWidth = 2;
    this.ctx.font = '20px verdana';
    this.ctx.fillText("Score: " + score, 10, 20);
    this.ctx.stroke();
  }

  //--------------------------------------------------------------
  // Clear the score in the upper left corner
  //--------------------------------------------------------------
  clearScore() {
    this.ctx.fillStyle = "rgb(255,255,255)";
    this.ctx.fillRect(10, 5, 250, 30);
    this.ctx.stroke();
  }

  //--------------------------------------------------------------
  // Get the next location in the quarantene area for an avatar
  //--------------------------------------------------------------
  getQuarnLocation() {
    console.log(`Next quarn location ${this.currQuarnLoc}`);
    let loc = this.quarnLocations[this.currQuarnLoc];
    this.currQuarnLoc++;
    if (this.currQuarnLoc >= count) {
      this.currQuarnLoc = 0;
    }
    return loc;
  }
}


//--------------------------------------------------------------
// Create object to hold the score
//--------------------------------------------------------------
class Score {
  constructor() {
    this.score = 0;
    this.hiScore = 0;
    //this.objects = 0;
    this.shots = 0;
    this.miss = 100;
    this.multi = 1000;
    this.bonus = 10000;
  }

  reset() {
    this.score = 0;
    this.shots = 0;
  }

  //--------------------------------------------------------------
  // Update the score based on the object hit
  // TODO - implement
  //--------------------------------------------------------------
  hitScore(shape) {
    if (shape.infected && shape.touches <= INCUBATIONDAYS) {
      this.score += this.multi * 2;
    } else if (shape.infected && shape.touches > INCUBATIONDAYS) {
      this.score += this.multi;
    } else if (!shape.infected) {
      cant.play();
      this.score -= Math.round(this.multi / 2);
    } else if (!shape.alive) {
      this.score -= Math.round(this.multi);
    }

    if (debug) {
      //console.log(`Score update ${type}`);
    }
  }

  //--------------------------------------------------------------
  // Update the score based on the object miss
  // TODO - implement
  //--------------------------------------------------------------
  missScore() {
    this.shots++;
    this.score -= this.miss;
    if (debug) {
      console.log(`missScore: ${this.shots}`);
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
    }

    if (debug) {
      console.log(`Score update ${type}`);
    }
  }

  //--------------------------------------------------------------
  // Return the current score
  //--------------------------------------------------------------
  getScore() {
    return this.score;
  }

  //--------------------------------------------------------------
  // Return the high score
  //--------------------------------------------------------------
  getHiScore() {
    let decodedCookie = decodeURIComponent(document.cookie);
    if (decodedCookie == "") {
      this.hiScore = this.score;
      this.setHiScore(this.score);
    } else {
      let ca = decodedCookie.split(';');
      let cookList = ca[0];
      let oldHiScore = cookList.split('=');
      if (this.score > oldHiScore[1]) {
        this.hiScore = this.score;
        this.setHiScore(this.score);
      } else {
        this.hiScore = oldHiScore[1];
      }
    }
    console.log(this.hiScore);
    return this.hiScore;
  }

  //--------------------------------------------------------------
  // Save the high score
  //--------------------------------------------------------------
  setHiScore(score) {
    let exdays = 7;
    let d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = "highscore=" + this.score + "; " + expires + ";path = /";
  }

  //--------------------------------------------------------------
  // Determine the end game score
  //
  // Scores will be added throughout by updateScore(), once it
  // has been determined that the game round is over add in
  // extra for:
  //    + Number of avatars uninfected in play area
  //    - Number dead
  //    + Recovered
  //    - Time to clear the board
  //--------------------------------------------------------------
  calcScore(shapes) {
    for (let i = 0; i < shapes.length; i++) {
      if (!shapes[i].infected && !shapes[i].quarantined) {
        this.score += this.bonus;
      }
      if (shapes[i].quarantined && shapes[i].alive) {
        this.score += this.multi;
      }
      if (shapes[i].dead) {
        this.score -= this.miss;
      }
    }
  }


  //--------------------------------------------------------------
  // Check to see if we are done with this round
  //
  // Right now we are looking to see if there are uninfected
  // avatars in the game area to end the game
  //--------------------------------------------------------------
  checkForEnd(shapes) {
    let done = true;
    for (let i = 0; i < shapes.length; i++) {
      if (shapes[i].infected && !shapes[i].quarantined) {
        done = false;
      }
    }
    return done;
  }
}
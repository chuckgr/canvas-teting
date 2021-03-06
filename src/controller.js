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
    this.debug = "";
    if (debug) {
      this.debug = new Debug();
      console.log('Controller:constructor');
    }
    this.score = new Score();
    board = new GameBoard(this.score);

    this.canvas = document.getElementById("canvas");
    this.ctx = canvas.getContext("2d");
    this.state = "";
    this.background = new Image();
    this.background.src = "img/teamky-white.png";
    this.shapes = [];
    this.andy = "";
    this.rona = "";
    this.playIcon = "";
    this.creator = "";
    this.vel = "";
    this.timerCount = 0;
    this.timer = "";
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
    this.rona = new UserImage(10, 60, 400, 400, document.getElementById("rona"));
    this.rona.setDirection = -1;
    this.rona.addAnimation(new BobbleHeadAnimation(10, 10));

    // Add in the large Andy head
    this.andy = new UserImage(canvas.width / 2, 40, 400, 400, document.getElementById("andy"));
    this.andy.addAnimation(new BobbleHeadAnimation(10, 10));

    // Show the Play button
    this.playIcon = new UserImage(350, 320, 100, 100, document.getElementById("play"));

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

    // clear out the canvas
    board.clearBoard();

    this.ctx.beginPath();

    // Draw the rona
    this.rona.draw(this.ctx);

    // Draw the large Andy head
    this.andy.draw(this.ctx);

    // Show the Play button
    this.playIcon.draw(this.ctx);

  }

  //----------------------------------------------------------
  // This sets up the game 
  //----------------------------------------------------------
  playSetup() {
    if (debug) {
      console.log('Controller:playSetup');
    }
    // Create all of the shapes to be used and the animation for the shapes
    //this.creator = new AvitarCreator(new EdgeVelocity(count), new AnimationFactory(), count, this.ctx);
    this.creator = new AvitarCreator(new HatHVelocity(count), new AnimationFactory(), count, this.ctx);
    this.shapes = [];
    this.shapes = this.creator.getAvitars();

    // Infect one or more of the shapes with the 'Rona
    this.creator.infectAvatars();

    // Create score object
    board.displayScore(this.score.getScore());

    // Listen for mouse click event on the canvas
    addRemoveListener(this.canvas, this.shapes, this.score, 'add');

    // Intro sound
    intro.play();

    // Start a 1 second timer
    this.timer = window.setInterval(function (ctl) {
      // Track the number of ticks
      ctl.timerCount++;
      let ctlCounter = ctl.timerCount;
      // Notify the board 
      board.timerTick();
    }, 1000, this);

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
    // Clear the playing field and create the board
    board.createBoard();

    if (debug) {
      this.debug.writeDebug(this, this.creator);
    }

    // Draw all of the shapes on the canvas
    for (let i = 0; i < this.shapes.length; i++) {
      this.shapes[i].draw(this.ctx);
    }

    // Check for collisions with infected head
    this.creator.checkCollisions();

    // Check to see if the game is over
    if (this.score.checkForEnd(this.shapes)) {
      this.score.calcScore(this.shapes);
      let alive = 0;
      let quart = 0;
      let dead = 0;
      for (let i = 0; i < this.shapes.length; i++) {
        if (this.shapes[i].alive) {
          alive++;
        }
        if (this.shapes[i].quarantined) {
          quart++;
        }
        if (this.shapes[i].dead) {
          dead++;
        }
      }
      console.log(`Alive=${alive}, quarantined=${quart}, Dead=${dead}`);
      this.state = this.endSetup;
    }

  }

  //----------------------------------------------------------
  // End of the game has been reached, this will setup the view
  // for the end of the game
  //----------------------------------------------------------
  endSetup() {
    // Stop the timer
    clearInterval(this.timer);

    // Remove the listener on the canvas for game play
    addRemoveListener(this.canvas, this.shapes, this.score, 'remove');

    // Create a rectangle over the main area
    board.createEndScore();

    // Add a listener to restart the game
    this.canvas.addEventListener('click', restartGameListener);
    this.canvas.addEventListener('keydown', restartGameListener);

    // Go to end state to wait for a restart
    this.state = this.end;

    if (debug) {
      console.log('Controller:endSetup');
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
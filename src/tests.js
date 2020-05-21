//-------------------------------------------------------------
// Testing ground
// 
// 
//-------------------------------------------------------------

//-------------------------------------------------------------
// This gets called when the test page is loaded, add the
// test(s) to run in the body of the function
//-------------------------------------------------------------
function test_harness() {
  //test_background();
  //test_gameover();
  //test_listeners();
  test_resetHiScore()
  //test_background();
}

//-------------------------------------------------------------
// Test new animation class
//-------------------------------------------------------------
function test_animation() {
  let debug = true;
  let canvas = document.getElementById("canvas");
  let ctx = canvas.getContext("2d");

  let shape = new UserImage(10, 20, 30, 30, "img/andy-headshot1.png");
  shape.addAnimation(new ExplosionAnimation(10, 10, 10));
  shape.type = 0;
  shape.explode();
  shape.draw(ctx);

}

//-------------------------------------------------------------
// Test creating a global background
//-------------------------------------------------------------
function test_background() {
  let board = new GameBoard();
  board.displayBackground();
}

//-------------------------------------------------------------
// Test creating a end game board
//-------------------------------------------------------------
function test_gameover() {

  let board = new GameBoard();
  let canvas = document.getElementById("canvas");
  let ctx = canvas.getContext("2d");
  let score = new Score(ctx);
  board.score = score;
  board.createEndScore();
}

//-------------------------------------------------------------
// Test creating/removing event listerners 
//-------------------------------------------------------------
function test_listeners() {
  let board = new GameBoard();
  board.canvas.addEventListener('click', clicker);

  function clicker() {
    console.log('Click event from clicker');
    board.canvas.removeEventListener('click', clicker);
  }


}

//-------------------------------------------------------------
// Test opaque game board
//-------------------------------------------------------------
function test_background() {
  let board = new GameBoard();
  board.ctx.save();
  board.ctx.fillStyle('#00ffff');
  board.ctx.fillRect(0, 0, 800, 600);
  board.ctx.stroke();
  board.ctx.restore();

}

//-------------------------------------------------------------
// reset hi score
//-------------------------------------------------------------
function test_resetHiScore() {
  let ctl = new Controller();
  let board = new GameBoard();

  ctl.score.setHiScore(0);

}
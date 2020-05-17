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
  test_gameover();
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
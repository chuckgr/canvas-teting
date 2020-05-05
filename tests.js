//-------------------------------------------------------------
// Testing ground
// 
// 
//-------------------------------------------------------------

//-------------------------------------------------------------
// Test new animation class
//-------------------------------------------------------------
function test_animation() {
  let debug = true;
  let canvas = document.getElementById("canvas");
  let ctx = canvas.getContext("2d");

  let shape = new UserImage(10, 20, 30, "andy-headshot1.png");
  shape.addAnimation(new ExplosionAnimation(10, 10, 10));
  shape.type = 0;
  shape.explode();
  shape.draw(ctx);

}
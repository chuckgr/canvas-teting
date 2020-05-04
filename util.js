//--------------------------------------------------------------
// Contains all of the utility methods 
//--------------------------------------------------------------

//--------------------------------------------------------------
// Create a background for the game board
//--------------------------------------------------------------
function createBackground(context) {
  context.beginPath();
  let image = new Image();
  image.src = "teamky-white.png";
  context.drawImage(image, 0, 160, 750, 190);
  context.stroke();
}

//--------------------------------------------------------------
// Create all the shapes we will put on the canvas
//--------------------------------------------------------------
function createShapes(count) {
  let shapes = [];
  let shapeType = Math.round(Math.random() * 3);

  for (let i = 0; i < count; i++) {
    if (shapeType == 0) {
      shapes.push(new Circle(Math.floor(Math.random() * canvas.width),
        Math.floor(Math.random() * canvas.height),
        Math.floor(Math.random() * 20) + 5));
    } else if (shapeType == 1) {
      shapes.push(new Square(Math.floor(Math.random() * canvas.width),
        Math.floor(Math.random() * canvas.height),
        Math.floor(Math.random() * 40) + 2));
    } else if (shapeType == 2) {
      shapes.push(new UserImage(Math.floor(Math.random() * canvas.width),
        Math.floor(Math.random() * canvas.height),
        Math.floor(Math.random() * 40) + 2, "Coronavirus-CDC.png"));
    }
    shapeType = Math.floor(Math.random() * 3);
  }

  return shapes;
}

//----------------------------------------------------------
// Create all the shapes we will put on the canvas
//----------------------------------------------------------
function createImageShapes(count) {
  let shapes = [];
  let shapeType = Math.round(Math.random() * 2);
  let shape = "";

  for (let i = 0; i < count; i++) {
    if (shapeType == 0) {
      shape = new UserImage(Math.floor(Math.random() *
        canvas.width), Math.floor(Math.random() * canvas.height), Math.floor(Math.random() *
        40) + 2, "andy-headshot1.png");
      shape.type = shapeType;
      shapes.push(shape);
    } else if (shapeType == 1) {
      shape = new UserImage(Math.floor(Math.random() * canvas.width), Math.floor(Math.random() *
          canvas.height),
        Math.floor(Math.random() * 40) + 2, "Coronavirus-CDC.png");
      shape.type = shapeType;
      shapes.push(shape);
    }
    shapeType = Math.floor(Math.random() * 2);
  }
  return shapes;
}


//----------------------------------------------------------
// Create the animations for the shapes passed
//----------------------------------------------------------
function createAnimations(shapes, type) {
  for (let i = 0; i < shapes.length; i++) {
    if (type == 'Linear') {
      shapes[i].addAnimation(new LinearAnimation(
        Math.floor((Math.random() * 2) + 2),
        Math.floor((Math.random() * 2) + 2),
        Math.floor((Math.random() * 2) + 1)));
    } else if (type == 'Balloon') {
      shapes[i].addAnimation(new BallonAnimation(
        Math.floor((Math.random() * 1) + 1),
        Math.floor((Math.random() * 1) + 1),
        Math.floor((Math.random() * 1) + 1)));
    }
  }
}

//--------------------------------------------------------------
// Create the speed and direction coordinate for a new shape
// based on the location of the object
//--------------------------------------------------------------
function getVel(shape) {
  let v = 0;

  return v;
}
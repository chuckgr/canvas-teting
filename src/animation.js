// -------------------------------------------------------------
// Base class for a animationfactory object
// -------------------------------------------------------------
class AnimationFactory {
    constructor() {

    }

    createAnimation(type, shape) {
        switch (type) {
            case 'Linear':
                let vx = 1,
                    vy = 1;

                if (shape.x > window.canvas.width) {
                    vx = -1;
                }
                if (shape.y > window.canvas.height) {
                    vy = -1;
                }
                return new LinearAnimation(
                    Math.floor(((Math.random() * SPEEDMAX) + 1) * vx),
                    Math.floor(((Math.random() * SPEEDMAX) + 1) * vy)
                );

            case 'BobbleHead':
                return new BobbleHeadAnimation(10, 10);
            default:
                break;
        }
    }
}

// -------------------------------------------------------------
// Base class for a animation object
// -------------------------------------------------------------
class Animation {
    constructor(xSpeed, ySpeed) {
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
    }

    //---------------------------------------------------------
    // Move the object to new x,y based on animation type
    //---------------------------------------------------------
    animate() {}
}

//-------------------------------------------------------------
// Linear animation object
// TODO - Fix step section to better represent random object
//        movement and the x,y step values
//-------------------------------------------------------------
class LinearAnimation extends Animation {
    constructor(xSpeed, ySpeed) {
        super(xSpeed, ySpeed);
    }

    //---------------------------------------------------------
    // Move the object to new x,y linearly around the canvas
    //---------------------------------------------------------
    animate(ctx, shape) {
        // Go to new x,y
        shape.x += this.xSpeed;
        shape.y += this.ySpeed;

        // Check if we hit the walls
        if (shape.x >= (board.mainAreaWidth - shape.width)) {
            this.xSpeed *= -1; // reverse direction
            shape.x = board.mainAreaWidth - shape.width;
        } else if (shape.x <= 0) {
            shape.x = 0;
            this.xSpeed *= -1;
        }

        // Check if we hit the top/bottom
        if (shape.y >= (board.mainAreaHeight - shape.height)) {
            this.ySpeed *= -1;
            shape.y = board.mainAreaHeight - shape.height;
        } else if (shape.y <= 0) {
            shape.y = 0;
            this.ySpeed *= -1;
        }
    }
}

//-------------------------------------------------------------
// Baloon animation object
// TODO - Finish the animation over several frames as needed
//-------------------------------------------------------------
class BallonAnimation extends Animation {
    constructor(xSpeed, ySpeed) {
        super(xSpeed, ySpeed);
    }

    //---------------------------------------------------------
    // Move the object to new y to the top canvas and bounce
    // off the ceiling
    //---------------------------------------------------------
    animate(ctx, x, y) {

        y += this.ySpeed;

        // Check if we hit the walls
        if (x >= ctx.canvas.width) {
            this.xSpeed = this.xSpeed * -1;
        } else if (x <= 0) {
            this.xSpeed = this.step;
        }

        // Check if we hit the top/bottom
        if (y >= ctx.canvas.height) {
            this.ySpeed = this.ySpeed * -1;
        } else if (y <= 0 + 5) {
            this.ySpeed = 0;
        }
    }
}

//-------------------------------------------------------------
// Explosion animation object
// TODO - Implement function as per the code in the shapes.js
//        for the UserImage explode() function
//-------------------------------------------------------------
class ExplosionAnimation extends Animation {
    constructor(xSpeed, ySpeed) {
        super(xSpeed, ySpeed);
        //this.img = "img/explosion.png"; // Image to explode with
        this.img = document.getElementById("exploded"); // Image to explode with
        this.expFrames = 3; // Number of frames to animate the explosion
        this.eFactor = 2; // Size to increase/reduce the image size per frame
    }

    //---------------------------------------------------------
    // Change the object to the explosion icon and animate over
    // n frames
    //---------------------------------------------------------
    animate(ctx, shape) {

        shape.img = this.img;
        if (this.expFrames == 3) {
            shape.x = shape.x - (((shape.width * this.eFactor) - shape.width) / 2);
            shape.y = shape.y - (((shape.height * this.eFactor) - shape.height) / 2);
            shape.width = shape.width * this.eFactor;
            shape.height = shape.height * this.eFactor;
        } else {
            shape.x = shape.x + ((shape.width - (shape.width / this.eFactor)) / 2);
            shape.y = shape.y + ((shape.height - (shape.height / this.eFactor)) / 2);
            shape.width = shape.width / this.eFactor;
            shape.height = shape.height / this.eFactor;
        }

        this.expFrames--;
        if (this.expFrames == 0) {
            shape.alive = false;
        }
    }
}



//-------------------------------------------------------------
// Quarantine animation object
// TODO - 
//-------------------------------------------------------------
class QuarantineAnimation extends Animation {
    constructor(xSpeed, ySpeed) {
        super(xSpeed, ySpeed);
        //this.img = "img/explosion.png"; // Image to explode with
        //this.img = document.getElementById("exploded"); // Image to explode with
        this.expFrames = 3; // Number of frames to animate the explosion
        this.eFactor = 2; // Size to increase/reduce the image size per frame
        this.locs = board.getQuarnLocation();
    }

    //---------------------------------------------------------
    // Move the shape to quarantine now
    // 
    //---------------------------------------------------------
    animate(ctx, shape) {
        //if (this.locs.length == 0) {
        //    this.locs = board.getQuarnLocation();
        shape.x = this.locs[0];
        shape.y = this.locs[1];
        //}
    }
}




//-------------------------------------------------------------
// Bobblehead animation object
// TODO - Make the heads bobble from center point at bottom
//-------------------------------------------------------------
class BobbleHeadAnimation extends Animation {
    constructor(xSpeed, ySpeed) {
        super(xSpeed, ySpeed);
        this.frames = 10;
        this.current = 1;
        this.direction = 1;
        this.count = 5;
    }

    //---------------------------------------------------------
    // Set the initial direction of the image
    //---------------------------------------------------------
    setDirection(d) {
        this.direction = d;
    }

    //---------------------------------------------------------
    // Move the object left and right to simulate bobble
    //---------------------------------------------------------
    animate(ctx, shape) {

        //console.log(`initial x=${x}`);
        this.current++;
        if (this.current % this.frames == 0) {
            this.direction *= -1;
            this.current = 0;
            shape.x = shape.x + (this.count * this.direction);
        }
    }
}

//-------------------------------------------------------------
// Bobble animation object
// TODO - Make the heads bobble from center point at bottom
//-------------------------------------------------------------
class BobbleAnimation extends Animation {
    constructor(xSpeed, ySpeed) {
        super(xSpeed, ySpeed);
        this.frames = 20;
        this.current = 1;
        this.direction = 1;
        this.count = 5;
        this.deg = 1; // Radians to rotate the object
    }

    //---------------------------------------------------------
    // Set the initial direction of the image
    //---------------------------------------------------------
    setDirection(d) {
        this.direction = d;
    }

    //---------------------------------------------------------
    // Move the object left and right to simulate bobble
    //---------------------------------------------------------
    animate(ctx, shape) {

        this.current++;
        ctx.translate(ctx.width / 2, ctx.height);
        if (this.current % this.frames == 0) {
            if (this.direction > 0) {
                ctx.rotate(this.deg * Math.PI / 180);
            } else {
                ctx.rotate(this.deg * this.direction * Math.PI / 180);
            }
            this.direction *= -1;
            this.current = 0;
            //x = x + (this.count * this.direction);
        }
    }
}

//-------------------------------------------------------------
// Quarantine animation object
//
// This animation will position all of the shapes to the
// quarentine area
//
// TODO - Implement
//-------------------------------------------------------------
class OldQuarantineAnimation extends Animation {
    constructor(xSpeed, ySpeed) {
        super(xSpeed, ySpeed);
        this.frames = 20;
        this.current = 1;
        this.direction = 1;
        this.count = 5;
        this.deg = 1; // Radians to rotate the object
    }

    //---------------------------------------------------------
    // Set the initial direction of the image
    //---------------------------------------------------------
    setDirection(d) {
        this.direction = d;
    }

    //---------------------------------------------------------
    // Move the object left and right to simulate bobble
    //---------------------------------------------------------
    animate(ctx, shape) {

    }
}
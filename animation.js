// -------------------------------------------------------------
// Base class for a animation object
// -------------------------------------------------------------
class Animation {
    constructor(step, xSpeed, ySpeed) {
        this.step = step;
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
    constructor(step, xSpeed, ySpeed) {
        super(step, xSpeed, ySpeed);
    }

    //---------------------------------------------------------
    // Move the object to new x,y linearly around the canvas
    //---------------------------------------------------------
    animate(ctx, x, y, w, h) {

        x += this.xSpeed;
        y += this.ySpeed;

        // Check if we hit the walls
        if (x >= (ctx.canvas.width - w)) {
            this.xSpeed = this.xSpeed * -1;
        } else if (x <= 0) {
            this.xSpeed = this.step;
        }

        // Check if we hit the top/bottom
        if (y >= (ctx.canvas.height - h)) {
            this.ySpeed = this.ySpeed * -1;
        } else if (y <= 0) {
            this.ySpeed = this.step;
        }
        if (debug) {
            console.log(`LinearAnimation:animate:end (${x}, ${y}, ${this.xSpeed}, ${this.ySpeed})`);
        }

        return [x, y];
    }
}

//-------------------------------------------------------------
// Baloon animation object
// TODO - Finish the animation over several frames as needed
//-------------------------------------------------------------
class BallonAnimation extends Animation {
    constructor(step, xSpeed, ySpeed) {
        super(step, xSpeed, ySpeed);
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
        if (debug) {
            console.log(`BubbleAnimation:animate:end (${x}, ${y}, ${this.xSpeed}, ${this.ySpeed})`);
        }

        return [x, y];
    }
}

//-------------------------------------------------------------
// Explosion animation object
// TODO - Implement function as per the code in the shapes.js
//        for the UserImage explode() function
//-------------------------------------------------------------
class ExplosionAnimation extends Animation {
    constructor(step, xSpeed, ySpeed) {
        super(step, xSpeed, ySpeed);
    }

    //---------------------------------------------------------
    // Change the object to the explosion icon and animate over
    // n frames
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
        if (debug) {
            console.log(`BubbleAnimation:animate:end (${x}, ${y}, ${this.xSpeed}, ${this.ySpeed})`);
        }

        return [x, y];
    }
}

//-------------------------------------------------------------
// Bobblehead animation object
// TODO - Make the heads bobble from center point at bottom
//-------------------------------------------------------------
class BobbleHeadAnimation extends Animation {
    constructor(step, xSpeed, ySpeed) {
        super(step, xSpeed, ySpeed);
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
    animate(ctx, x, y) {

        //console.log(`initial x=${x}`);
        this.current++;
        if (this.current % this.frames == 0) {
            this.direction *= -1;
            this.current = 0;
            x = x + (this.count * this.direction);
        }

        if (debug) {
            console.log(`BobbleHeadAnimation:animate:end (${x}, ${y}, ${this.xSpeed}, ${this.ySpeed})`);
        }

        return [x, y];
    }
}

//-------------------------------------------------------------
// Bobble animation object
// TODO - Make the heads bobble from center point at bottom
//-------------------------------------------------------------
class BobbleAnimation extends Animation {
    constructor(step, xSpeed, ySpeed) {
        super(step, xSpeed, ySpeed);
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
    animate(ctx, x, y) {

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

        if (debug) {
            //console.log(`BobbleAnimation:animate:end (${x}, ${y}, ${this.xSpeed}, ${this.ySpeed})`);
        }

        return [x, y];
    }
}
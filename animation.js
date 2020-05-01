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

// -------------------------------------------------------------
//  Linear animation object
// -------------------------------------------------------------
class LinearAnimation extends Animation {
    constructor(step, xSpeed, ySpeed) {
        super(step, xSpeed, ySpeed);
    }

    //---------------------------------------------------------
    // Move the object to new x,y linearly around the canvas
    //---------------------------------------------------------
    animate(ctx, x, y) {

        x += this.xSpeed;
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
        } else if (y <= 0) {
            this.ySpeed = this.step;
        }
        //console.log(`LinearAnimation:animate:end (${x}, ${y}, ${this.xSpeed}, ${this.ySpeed})`);

        return [x, y];
    }
}

// -------------------------------------------------------------
//  Baloon animation object
// -------------------------------------------------------------
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

// -------------------------------------------------------------
//  Explosion animation object
// -------------------------------------------------------------
class ExplosionAnimation extends Animation {
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
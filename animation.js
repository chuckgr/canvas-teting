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
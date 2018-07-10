// Player controlled entity
function Player(x_, y_) {
    // Inherits from Entity (random number for size right now)
    Entity.call(this, x_, y_, 10);
    this.maxVel = 3;
    this.maxForce = 0.15;
}

// Adds the Entity prototype to the Player object
Player.prototype = Object.create(Entity.prototype);

Player.prototype.update = function() {
    // this.seekMouse();
    //this.followMouse();
    this.moveUsingArrowKeys();
}

// Follows mouse by accelerating towards it
Player.prototype.followMouse = function() {
    var mousePos = createVector(mouseX, mouseY);
    var d = p5.Vector.dist(this.pos, mousePos);
    if (d > this.r * 0.5) {
        var vectorToMouse = p5.Vector.sub(mousePos, this.pos);
        vectorToMouse.normalize();
        vectorToMouse.mult(this.maxForce);
        this.acc.add(vectorToMouse);
    } else {
        this.acc.sub(this.vel);
    }
}

Player.prototype.moveUsingArrowKeys = function() {
    //Controls
    if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) this.vel.x -= this.maxForce;
    if (keyIsDown(UP_ARROW) || keyIsDown(87)) this.vel.y -= this.maxForce;
    if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) this.vel.x += this.maxForce;
    if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) this.vel.y += this.maxForce;

}

// Follows mouse using desired velocity stuff
Player.prototype.seekMouse = function() {
    var mousePos = createVector(mouseX, mouseY);
    var vectorToMouse = p5.Vector.sub(mousePos, this.pos);
    vectorToMouse.normalize();
    vectorToMouse.mult(this.maxVel);
    vectorToMouse.sub(this.vel);
    vectorToMouse.limit(this.maxForce);
    this.acc.add(vectorToMouse);
}


// Just a white circle right now
Player.prototype.draw = function() {
    fill(255);
    noStroke();
    ellipse(this.pos.x, this.pos.y, this.r * 2);
}
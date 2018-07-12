// Player controlled entity
function Player(x_, y_) {
    // Inherits from Entity (random number for size right now)
    Entity.call(this, x_, y_, 100, 10);
    this.maxVel = 3.5;
    this.maxForce = 0.1;
    this.mass = 1000;

    // this.health = 100;
}

// Adds the Entity prototype to the Player object
Player.prototype = Object.create(Entity.prototype);

Player.prototype.update = function() {
    //this.seekMouse();
    //this.followMouse();
    this.moveUsingArrowKeys();


    //Prevent Player moving out of arena
    /*if (this.pos.x < 0) this.pos.x = this.r;
    if (this.pos.y < 0) this.pos.y = this.r;
    if (this.pos.x > width) this.pos.x = width - this.r;
    if (this.pos.y > height) this.pos.x = height - this.r;*/


    //Bounce off walls
    // if (this.pos.x <= this.r || this.pos.x >= game.xBound - this.r) {
    //     this.vel = reflectVector(this.vel, createVector(1, 0));
    // }
    // if (this.pos.y <= this.r || this.pos.y >= game.yBound - this.r) {
    //     this.vel = reflectVector(this.vel, createVector(0, 1));
    // }
};

// Follows mouse by accelerating towards it
Player.prototype.followMouse = function() {
    var mousePos = createVector(mouseX, mouseY);
    var d = p5.Vector.dist(this.pos, mousePos);
    if (d > this.r * 0.5) {
        var vectorToMouse = p5.Vector.sub(mousePos, this.drawPos);
        vectorToMouse.normalize();
        vectorToMouse.mult(this.maxForce);
        this.acc.add(vectorToMouse);
    } else {
        this.acc.sub(this.vel);
    }
}

Player.prototype.moveUsingArrowKeys = function() {
    //Controls
    if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) this.acc.x -= this.maxForce;
    if (keyIsDown(UP_ARROW) || keyIsDown(87)) this.acc.y -= this.maxForce;
    if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) this.acc.x += this.maxForce;
    if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) this.acc.y += this.maxForce;

}

// Follows mouse using desired velocity stuff
Player.prototype.seekMouse = function() {
    var mousePos = createVector(mouseX, mouseY);
    var vectorToMouse = p5.Vector.sub(mousePos, this.drawPos);
    vectorToMouse.normalize();
    vectorToMouse.mult(this.maxVel);
    vectorToMouse.sub(this.vel);
    vectorToMouse.limit(this.maxForce);
    this.acc.add(vectorToMouse);
}


// Just a white circle right now
Player.prototype.draw = function() {
    // var drawPos = game.gameCam.getDrawPos(this.pos);
    fill(255);

    // if (this.collided) {
    //     fill(255, 0, 255);
    // }
    noStroke();
    ellipse(this.drawPos.x, this.drawPos.y, this.drawR * 2);
}

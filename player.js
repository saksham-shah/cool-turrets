// Player controlled entity
function Player(x_, y_) {
    // Inherits from Entity (random number for size right now)
    Entity.call(this, x_, y_, 100, 10);
    this.maxVel = 3.5;
    this.maxForce = 0.1;
    this.mass = 20;

    this.bodyDamage = 5;

    // this.health = 100;
}

// Adds the Entity prototype to the Player object
Player.prototype = Object.create(Entity.prototype);

Player.prototype.update = function() {
    this.moveUsingArrowKeys();

    game.particles.push(new TrailParticle(this.pos, createVector(0, 0)));
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
};

Player.prototype.moveUsingArrowKeys = function() {
    //Controls
    if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) this.acc.x -= this.maxForce;
    if (keyIsDown(UP_ARROW) || keyIsDown(87)) this.acc.y -= this.maxForce;
    if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) this.acc.x += this.maxForce;
    if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) this.acc.y += this.maxForce;
};

// Follows mouse using desired velocity stuff
Player.prototype.seekMouse = function() {
    var mousePos = createVector(mouseX, mouseY);
    var vectorToMouse = p5.Vector.sub(mousePos, this.drawPos);
    vectorToMouse.normalize();
    vectorToMouse.mult(this.maxVel);
    vectorToMouse.sub(this.vel);
    vectorToMouse.limit(this.maxForce);
    this.acc.add(vectorToMouse);
};

Player.prototype.respawn = function() {
    this.alive = true;
    this.health = 100;
    game.score = 0;
};

// Just a white circle right now
Player.prototype.draw = function() {
    fill(0, 0, 255);

    noStroke();
    ellipse(this.drawPos.x, this.drawPos.y, this.drawR * 2);
};

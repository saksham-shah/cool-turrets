// Player controlled entity
function Player(x_, y_, controls_) {
    // Inherits from Entity (random number for size right now)
    Entity.call(this, x_, y_, 100, 10);
    this.maxVel = 3.5;
    this.maxForce = 0.1;
    this.mass = 20;

    this.bodyDamage = 5;

    if (controls_ === undefined) {
        controls_ = [UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, 32];
    }
    this.controls = {
        up: controls_[0],
        down: controls_[1],
        left: controls_[2],
        right: controls_[3],
        shoot: controls_[4]
    }

    this.z = 0.1;
    this.zSpeed = 0.01;
    this.targetZ = 1;

    // Not needed but here for now
    this.a = 0;

    // this.health = 100;
}

// Adds the Entity prototype to the Player object
Player.prototype = Object.create(Entity.prototype);

Player.prototype.update = function() {
    if (this.z > this.targetZ + this.zSpeed) {
        this.z -= this.zSpeed;
    } else if (this.z < this.targetZ - this.zSpeed) {
        this.z += this.zSpeed;
    }
    this.targetZ = 1;

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
    if (keyIsDown(this.controls.left)) this.acc.x -= this.maxForce;
    if (keyIsDown(this.controls.up)) this.acc.y -= this.maxForce;
    if (keyIsDown(this.controls.right)) this.acc.x += this.maxForce;
    if (keyIsDown(this.controls.down)) this.acc.y += this.maxForce;
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

Player.prototype.die = function() {
    this.alive = true;
    this.health = 100;
    game.score = 0;
};

// Just a white circle right now
Player.prototype.draw = function(cam, scr) {
    var drawPos = cam.getDrawPos(this.pos.x, this.pos.y);
    var drawR = cam.getDrawSize(this.r);

    scr.fill(0, 0, 255);

    scr.noStroke();
    scr.ellipse(drawPos.x, drawPos.y, drawR * 2);
};

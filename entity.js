// Base object for game objects that have a pos, vel and acc (all vectors)
function Entity(x_, y_, friction_, r_) {
    this.pos = createVector(x_, y_);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);

    this.maxVel = 3.5;
    this.maxForce = 0.11;
    this.friction = friction_;

    // R for radius
    this.r = r_;

    this.drawPos = this.pos.copy();
}

// Moves using pos, vel and acc
Entity.prototype.move = function() {
    this.pos.add(p5.Vector.mult(this.vel, dt));
    this.vel.add(this.acc);
    this.vel.limit(this.maxVel);
    this.acc.mult(0);

    //Apply friction
    this.vel.mult(this.friction);

    this.drawPos = game.gameCam.getDrawPos(this.pos);
};

Entity.prototype.collide = function(entity_) {
    //stub
};
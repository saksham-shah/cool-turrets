// Base object for game objects that have a pos, vel and acc (all vectors)
function Entity(x_, y_, friction_, r_) {
    this.pos = createVector(x_, y_);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);

    this.maxVel = 3.5;
    this.maxForce = 0.1;
    this.friction = friction_;

    // R for radius
    this.r = r_;

    this.drawPos = this.pos.copy();

    this.collided = false;
}

// Moves using pos, vel and acc
Entity.prototype.move = function() {
    this.borders();
    this.pos.add(p5.Vector.mult(this.vel, dt));
    this.vel.add(this.acc);
    this.vel.limit(this.maxVel);
    this.acc.mult(0);

    //Apply friction
    this.vel.mult(this.friction);

    //Get Position relative to camera
    this.drawPos = game.gameCam.getDrawPos(this.pos);

    this.collided = false;

};

Entity.prototype.collide = function(entity_) {
    //stub
    console.log('COL');
    this.collided = true;
};

Entity.prototype.borders = function() {
    if (!rectContains(this.pos, 0, 0, game.xBound, game.yBound)) {
        var forceToCentre = p5.Vector.sub(createVector(game.xBound/2, game.yBound/2), this.pos);
        forceToCentre.setMag(0.3);
          this.acc.add(forceToCentre);
    }
}

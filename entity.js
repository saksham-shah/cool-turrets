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

    this.collided = false;
}

// Moves using pos, vel and acc
Entity.prototype.move = function() {
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
    this.collided = true;

    //Bounce
    //var normal = p5.Vector.sub(this.pos, entity_.pos);

    //this.vel = reflectVector(this.vel, normal);
    //console.log(this.vel);
};
// Base object for game objects that have a pos, vel and acc (all vectors)
function Entity(x_, y_, r_) {
  this.pos = createVector(x_, y_);
  this.vel = createVector(0, 0);
  this.acc = createVector(0, 0);

  // R for radius
  this.r = r_;
}

// Moves using pos, vel and acc
Entity.prototype.move = function() {
  this.pos.add(this.vel);
  this.vel.add(this.acc);
  this.acc.mult(0);
}

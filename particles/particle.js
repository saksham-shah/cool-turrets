function Particle(position_) {
    this.pos = position_.copy();
    //this.vel = createVector(0, 0);
}

Particle.prototype.move = function() {
    this.pos.add(p5.Vector.mult(this.vel, dt));
};
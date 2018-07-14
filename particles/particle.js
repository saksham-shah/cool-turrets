function Particle(position_, velocity_, dirError_, maxLife_, radius_, colour_) {
    this.pos = position_.copy();

    this.vel = velocity_;
    var randError = random(-dirError_, dirError_);
    this.vel.rotate(randError);

    this.maxLife = maxLife_;
    this.life = this.maxLife;
    this.maxRadius = radius_;
    this.radius = this.maxRadius;

    this.colour = colour_;
}

Particle.prototype.move = function() {
    this.life -= dt;
    this.pos.add(p5.Vector.mult(this.vel, dt));
};
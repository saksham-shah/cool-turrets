function Bullet(position_, direction_, speed_, colour_) {
    this.colour = colour_;
    this.vel = p5.Vector.fromAngle(direction_).mult(speed_);
    this.pos = position_;
    this.r = 5;
}

Bullet.prototype.update = function() {
    this.pos.add(p5.Vector.mult(this.vel, dt));
};

Bullet.prototype.draw = function() {
    fill(this.colour);
    ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);
};
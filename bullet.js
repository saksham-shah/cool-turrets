function Bullet(x_, y_, direction_, speed_, colour_) {
    Entity.call(this, x_, y_, 1, 5);
    this.colour = colour_;
    this.vel = p5.Vector.fromAngle(direction_).mult(speed_);
}

Bullet.prototype = Object.create(Entity.prototype);

Bullet.prototype.update = function() {
    //stub
};

Bullet.prototype.draw = function() {
    fill(this.colour);
    ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);
};
function Bullet(position_, direction_, speed_, colour_) {
    this.colour = colour_;
    this.vel = p5.Vector.fromAngle(direction_).mult(speed_);
    this.pos = position_;
    this.r = 7;
}

Bullet.prototype.update = function() {
    this.pos.add(p5.Vector.mult(this.vel, dt));
};

Bullet.prototype.draw = function() {
    fill(this.colour);
    let drawPos = game.gameCam.getDrawPos(this.pos);
    ellipse(drawPos.x, drawPos.y, this.r * 2, this.r * 2);
};
function Bullet(position_, direction_, speed_, damage_, r_, fromTurret_) {
    this.fromTurret = fromTurret_;
    this.vel = p5.Vector.fromAngle(direction_).mult(speed_);
    this.pos = position_;
    this.damage = damage_;
    this.r = r_;

    this.hit = false;
}

Bullet.prototype.update = function(entities) {
    this.pos.add(p5.Vector.mult(this.vel, dt));
    this.checkHits(entities);
};

Bullet.prototype.draw = function() {
    fill(this.fromTurret.colour);
    let drawPos = game.gameCam.getDrawPos(this.pos);
    ellipse(drawPos.x, drawPos.y, this.r * 2, this.r * 2);
};

Bullet.prototype.checkHits = function(entities) {
    for (var i = 0; i < entities.length; i++) {
        if (entities[i] !== this.fromTurret) {
            if (circleCollision(this, entities[i])) {
                entities[i].hitByBullet(this);
                this.hit = true;
            }
        }
    }
}

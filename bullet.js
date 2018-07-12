function Bullet(position_, direction_, fromTurret_) {


    this.fromTurret = fromTurret_;
    this.speed = this.fromTurret.bulletTemplate.speed;
    this.damage = this.fromTurret.bulletTemplate.damage;
    this.r = this.fromTurret.bulletTemplate.r;

    this.vel = p5.Vector.fromAngle(direction_).mult(this.speed);
    this.pos = position_;

    this.hit = false;
    this.maxDistance = 100;

    this.timeAlive = 0;
}

Bullet.prototype.update = function(entities) {
    if (this.speed * this.timeAlive > this.maxDistance) {
        this.hit = true; //Perhaps change this later
    }
    this.pos.add(p5.Vector.mult(this.vel, dt));
    this.checkHits(entities);
    this.timeAlive += dt;
};

Bullet.prototype.draw = function() {
    fill(this.fromTurret.colour);
    noStroke();
    var drawPos = game.gameCam.getDrawPos(this.pos);
    var drawR = game.gameCam.getDrawSize(this.r);
    ellipse(drawPos.x, drawPos.y, drawR * 2, drawR * 2);
};

Bullet.prototype.checkHits = function(entities) {
    for (var i = 0; i < entities.length; i++) {
        if (entities[i] !== this.fromTurret && entities[i].alive) {
            if (circleCollision(this, entities[i])) {
                entities[i].hitByBullet(this);
                this.hit = true;
            }
        }
    }
}
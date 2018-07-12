function Bullet(position_, direction_, fromTurret_) {


    this.fromTurret = fromTurret_;
    this.speed = this.fromTurret.bulletTemplate.speed;
    this.damage = this.fromTurret.bulletTemplate.damage;
    this.r = this.fromTurret.bulletTemplate.r;

    this.vel = p5.Vector.fromAngle(direction_).mult(this.speed);
    this.pos = position_;

    this.hit = false;
    this.range = 300;

    this.timeAlive = 0;
}

Bullet.prototype.update = function(entities) {
    //Destroy bullet after it's travelled for it's range
    if (this.speed * this.timeAlive > this.range) {
        this.hit = true; //Perhaps change this later
    }

    //Destroy bullet if it's out of the map
    if (!rectContains(this.pos, 0, 0, game.xBound, game.yBound)) {
        this.hit = true;
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
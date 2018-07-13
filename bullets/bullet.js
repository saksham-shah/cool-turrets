function Bullet(position_, direction_, parent_) {


    this.parent = parent_;
    this.speed = this.parent.bulletTemplate.speed;
    this.damage = this.parent.bulletTemplate.damage;
    this.r = this.parent.bulletTemplate.r;

    this.vel = p5.Vector.fromAngle(direction_).mult(this.speed);
    this.pos = position_;

    this.hit = false;
    this.range = this.parent.bulletTemplate.range;

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
    fill(this.parent.colour);
    noStroke();
    var drawPos = game.gameCam.getDrawPos(this.pos);
    var drawR = game.gameCam.getDrawSize(this.r);
    ellipse(drawPos.x, drawPos.y, drawR * 2, drawR * 2);
};

Bullet.prototype.checkHits = function(entities) {
    for (var i = 0; i < entities.length; i++) {
        if (entities[i] !== this.parent && entities[i].alive) {
            if (!(this.parent instanceof Enemy) || !(entities[i] instanceof Enemy)) {
                if (circleCollision(this, entities[i])) {
                    entities[i].hitByBullet(this);
                    this.hit = true;
                }
            }
        }
    }
}

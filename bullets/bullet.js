function Bullet(position_, direction_, parent_, onHit_, data_) {

    this.parent = parent_;
    this.speed = this.parent.bulletTemplate.speed;
    this.damage = this.parent.bulletTemplate.damage;
    this.r = this.parent.bulletTemplate.r;

    this.vel = p5.Vector.fromAngle(direction_).mult(this.speed);
    this.pos = position_;

    this.hit = false;
    this.range = this.parent.bulletTemplate.range;

    this.colour = this.parent.colour;

    if (this.parent instanceof Turret) {
        this.fromPlayer = this.parent.latestShot;
    }

    this.timeAlive = 0;

    // This function is called when the bullet hits. Used for bullets that e.g. split into three.
    this.onHit = onHit_;

    // Any data can be passed in
    this.data = data_;
}

Bullet.prototype.update = function(entities) {
    //Destroy bullet after it's travelled for it's range
    if (this.speed * this.timeAlive > this.range) {
        this.hasHit(); //Perhaps change this later
    }

    //Destroy bullet if it's out of the map
    if (!rectContains(this.pos, 0, 0, gameScreen.game.xBound, gameScreen.game.yBound)) {
        this.hasHit();
    }

    this.pos.add(p5.Vector.mult(this.vel, dt));
    this.checkHits(entities);
    this.timeAlive += dt;
};

Bullet.prototype.draw = function(cam, scr) {
    scr.fill(this.colour);
    scr.noStroke();
    var drawPos = cam.getDrawPos(this.pos.x, this.pos.y);
    var drawR = cam.getDrawSize(this.r);
    scr.ellipse(drawPos.x, drawPos.y, drawR * 2, drawR * 2);
};

Bullet.prototype.checkHits = function(entities) {
    for (var i = 0; i < entities.length; i++) {
        if (entities[i] !== this.parent && entities[i].alive) {
            if (!(this.parent instanceof Enemy) || !(entities[i] instanceof Enemy)) {
                if (circleCollision(this, entities[i])) {
                    entities[i].hitByBullet(this);
                    this.hasHit();
                }
            }
        }
    }
}

Bullet.prototype.hasHit = function() {
    this.hit = true;
    if (this.onHit !== undefined) {
        this.onHit(this);
    }
}

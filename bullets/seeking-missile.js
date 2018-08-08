function SeekingMissile(position_, damage_, parent_, target_) {
    this.pos = position_.copy();

    this.acc = createVector(0, 0);

    this.damage = damage_;

    this.target = target_;

    this.parent = parent_;

    this.vel = p5.Vector.fromAngle(this.parent.direction, 5);

    this.hit = false;

    this.r = 6;

    this.lifeTime = 60 * 4;

    this.timeAlive = 0;

    this.seekingForce = 0.1;

    this.seeking = false;

    this.friction = 0.98;

    this.accTowardsTarget();
}

SeekingMissile.prototype.update = function(entities) {
    this.vel.add(this.acc);
    this.pos.add(p5.Vector.mult(this.vel, dt));
    this.acc.mult(0);

    //Apply friction
    this.vel.mult(this.friction);

    if (this.timeAlive > this.lifeTime) {
        this.die();
    }

    this.timeAlive += dt;

    if (this.seeking) {
        //Create particles
        var particleV = p5.Vector.add(this.vel, this.vel.copy().rotate(PI).setMag(5));
        gameScreen.game.particles.push(new SmokeParticle(this.pos, particleV));

        if (!this.target.alive) {
            this.seeking = false;
            /*if (this.parent.alive) {
                var temp = this.target;
                this.target = this.parent;
                this.parent = temp;
            }*/
        } else {
            this.accTowardsTarget();
        }
    } else {
        if (this.timeAlive > 40) {
            this.seeking = true;
        }
    }
    this.checkHits(entities);
};

SeekingMissile.prototype.die = function() {
    this.hasHit();
};

SeekingMissile.prototype.seekTarget = function() {

    var targetPos = p5.Vector.add(this.target.pos, this.target.vel * dt);

    var desired = p5.Vector.sub(targetPos, this.pos);
    desired.setMag(10);

    var steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.seekingForce);

    this.acc.add(steer);
};

SeekingMissile.prototype.accTowardsTarget = function() {
    var thisToTarget = p5.Vector.sub(this.target.pos, this.pos);
    thisToTarget.setMag(this.seekingForce);
    this.acc.add(thisToTarget);
};

SeekingMissile.prototype.checkHits = function(entities) {
    for (var i = 0; i < entities.length; i++) {
        if (entities[i] !== this.parent && entities[i].alive) {
            //if (!(this.parent instanceof Enemy) || !(entities[i] instanceof Enemy)) {
            if (circleCollision(this, entities[i])) {
                this.speed = this.vel.mag();
                entities[i].hitByBullet(this);

                this.hasHit();
            }
            //}
        }
    }
};

SeekingMissile.prototype.hasHit = function() {
    gameScreen.game.areaEffects.push(new AreaEffect(this.pos.x, this.pos.y, 50,
        function(areaEffect, entity) {
            entity.loseHealth(areaEffect.data.damage, areaEffect.data.parent);
            var knockbackForce = p5.Vector.sub(entity.pos, areaEffect.pos);
            knockbackForce.setMag(100);
            entity.applyForce(knockbackForce);
            return true;
        }, {
            damage: this.damage,
            parent: this.parent
        }));
    this.hit = true;
};

SeekingMissile.prototype.draw = function(cam, scr) {
    var drawPos = cam.getDrawPos(this.pos.x, this.pos.y);
    var drawR = cam.getDrawSize(this.r);
    var mult = cam.getDrawSize(1);

    scr.push();
    scr.stroke(0);
    scr.strokeWeight(2 * mult);

    scr.translate(drawPos.x, drawPos.y);
    scr.rotate(this.vel.heading());

    scr.fill(0, 100, 47.1);
    scr.ellipse(0, 0, drawR * 2);

    scr.fill(0, 0, 43.5);
    scr.rectMode(CORNER);
    scr.rect(0, -drawR, -drawR * 2, drawR * 2);

    scr.pop();
};
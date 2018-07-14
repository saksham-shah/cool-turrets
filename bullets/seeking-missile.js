function SeekingMissile(position_, damage_, parent_, target_) {
    this.pos = position_.copy();

    this.acc = createVector(0, 0);

    this.vel = createVector(0, 0);

    this.damage = damage_;

    this.target = target_;

    this.parent = parent_;

    this.hit = false;

    this.r = 6;

    this.lifeTime = 60 * 4;

    this.timeAlive = 0;

    this.seekingForce = 0.2;

    this.friction = 0.98;

    this.accTowardsTarget();
}

SeekingMissile.prototype.update = function(entities) {
    this.vel.add(this.acc);
    this.pos.add(p5.Vector.mult(this.vel, dt));
    this.acc.mult(0);

    //Create particles
    var particleV = p5.Vector.add(this.vel, this.vel.copy().rotate(PI).setMag(5));
    game.particles.push(new CircleParticle(this.pos, particleV, PI / 4, 15, 15, color(150)));

    //Apply friction
    this.vel.mult(this.friction);

    if (this.timeAlive > this.lifeTime) {
        this.die();
    }

    this.timeAlive += dt;

    if (!this.target.alive) {
        this.timeAlive = this.lifeTime;
    } else {
        this.accTowardsTarget();
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
    game.areaEffects.push(new AreaEffect(this.pos.x, this.pos.y, 50,
        function(areaEffect, entity) {
            entity.loseHealth(areaEffect.data.damage);
            var knockbackForce = p5.Vector.sub(entity.pos, areaEffect.pos);
            knockbackForce.setMag(100);
            entity.applyForce(knockbackForce);
            return true;
        }, {
            damage: this.damage
        }));
    this.hit = true;
}

SeekingMissile.prototype.draw = function() {
    var drawPos = game.gameCam.getDrawPos(this.pos);
    var drawR = game.gameCam.getDrawSize(this.r);
    var mult = game.gameCam.getDrawSize(1);

    push();
    stroke(0);
    strokeWeight(2 * mult);

    translate(drawPos.x, drawPos.y);
    rotate(this.vel.heading());

    fill(120, 0, 0);



    ellipse(0, 0, drawR * 2);
    fill(111);
    rectMode(CORNER);
    rect(0, -drawR, -drawR * 2, drawR * 2);


    pop();
}
function Missile(position_, damage_, target_) {
    this.pos = position_.copy();

    this.damage = damage_;

    this.hit = false;

    this.r = 20;

    // 300 frames is about 5 seconds
    this.timeToHit = 360;

    this.flash = true;

    this.target = target_;
    this.targetSpeed = 0.5;
}

Missile.prototype.update = function() {
    this.timeToHit -= dt;

    if (this.timeToHit <= 0 && !this.hit) {
        this.land();
        // console.log("land");
    } else if (this.timeToHit <= 60) {
        if (this.timeToHit % 15 > 7.5) {
            this.flash = false;
        } else {
            this.flash = true;
        }
    } else if (this.timeToHit <= 180) {
        if (this.timeToHit % 30 > 15) {
            this.flash = false;
        } else {
            this.flash = true;
        }
    } else {
        if (this.timeToHit % 60 > 30) {
            this.flash = false;
        } else {
            this.flash = true;
        }
    }

    this.moveToTarget();
};

Missile.prototype.land = function() {
    game.areaEffects.push(new AreaEffect(this.pos.x, this.pos.y, 200,
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
};

Missile.prototype.moveToTarget = function() {
    var vectorToTarget = p5.Vector.sub(this.target.pos, this.pos);
    vectorToTarget.setMag(this.targetSpeed);
    this.pos.add(vectorToTarget);
};

Missile.prototype.draw = function() {
    var drawPos = game.gameCam.getDrawPos(this.pos);
    var drawR = game.gameCam.getDrawSize(this.r);

    push();

    translate(drawPos.x, drawPos.y);

    if (this.flash) {
        fill(0, 100, 100);
    } else {
        fill(60, 100, 100);
    }


    noStroke();

    ellipse(0, 0, drawR * 2);

    pop();
}
function Enemy(x_, y_, health_, parent_, parentRange_, r_) {

    if (r_ === undefined) {
        r_ = 20;
    }

    // Inherit from Entity
    Entity.call(this, x_, y_, health_, r_);

    this.state = "wander";

    // Used for bosses that spawn enemies
    this.parent = parent_;
    this.parentRange = parentRange_;

    this.wanderForce = p5.Vector.fromAngle(random(- TWO_PI, TWO_PI)).setMag(0.1);
    this.wanderTime = 0;

    this.maxVel = 1;
    this.maxForce = 0.1;

    game.enemyCount++;

};

// Adds the Entity prototype to the Enemy object
Enemy.prototype = Object.create(Entity.prototype);

Enemy.prototype.update = function() {
    if (this.parent !== undefined) {
        if (this.inRange(this.parent, this.parentRange) || !this.parent.alive) {
            this.stateUpdate();
        } else {
            this.stayWithParent();
        }
    } else {
        this.stateUpdate();
    }
    this.generalUpdate();
};

Enemy.prototype.stayWithParent = function() {
    var vectorToParent = p5.Vector.sub(this.parent.pos, this.pos);
    vectorToParent.setMag(this.maxForce);
    this.acc.add(vectorToParent);
    this.maxVel = 1;
};

Enemy.prototype.wander = function() {
    if (random() < 0.02 && this.wanderTime > 60) {
        this.wanderForce = p5.Vector.fromAngle(random(- TWO_PI, TWO_PI)).setMag(0.1);
        this.wanderTime = 0;
    }
    this.wanderTime += dt;
    this.acc.add(this.wanderForce);
};

Enemy.prototype.inRange = function(entity, range) {
    var d = p5.Vector.dist(this.pos, entity.pos);
    if (d <= range) {
        return true;
    }
    return false;
};

Enemy.prototype.die = function() {
    game.enemyCount--;
    if (this.parent !== undefined) {
        this.parent.children--;
    }
    game.score += this.scoreValue;
}
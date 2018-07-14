function Enemy(x_, y_, health_) {
    // Inherit from Entity
    Entity.call(this, x_, y_, health_, 20);

    this.state = "wander";

    this.wanderForce = p5.Vector.fromAngle(random(- TWO_PI, TWO_PI)).setMag(0.1);
    this.wanderTime = 0;

}

// Adds the Entity prototype to the Enemy object
Enemy.prototype = Object.create(Entity.prototype);

Enemy.prototype.wander = function() {
    if (random() < 0.02 && this.wanderTime > 60) {
        this.wanderForce = p5.Vector.fromAngle(random(- TWO_PI, TWO_PI)).setMag(0.1);
        this.wanderTime = 0;
    }
    this.wanderTime += dt;
    this.acc.add(this.wanderForce);
}

Enemy.prototype.playerInRange = function(range) {
    var d = p5.Vector.dist(this.pos, game.player.pos);
    if (d <= range) {
        return true;
    }
    return false;
}

function Bomb(x_, y_, initialVel_, damage_, radius_, parent_) {
    // Inherit from Entity
    Entity.call(this, x_, y_, 1, 20);

    this.acc.add(initialVel_);

    this.damage = damage_;
    this.radius = radius_;

    this.maxVel = 20;

    this.parent = parent_;

    this.countdown = false;

    this.mass = 5;
}

// Adds the Entity prototype to the Bomb object
Bomb.prototype = Object.create(Entity.prototype);

Bomb.prototype.update = function() {
    this.loseHealth(dt * 0.02);

    if (this.health <= 0) {
        this.blowUp();
    }
};

Bomb.prototype.blowUp = function() {
    game.areaEffects.push(new AreaEffect(this.pos.x, this.pos.y, this.radius,
        function(areaEffect, entity) {
            entity.loseHealth(areaEffect.data.damage, areaEffect.data.parent);
            console.log(entity);
            var knockbackForce = p5.Vector.sub(entity.pos, areaEffect.pos);
            knockbackForce.setMag(100);
            entity.applyForce(knockbackForce);
            return true;
        }, {
            damage: this.damage,
            radius: this.radius,
            parent: this.parent
        }));
};

Bomb.prototype.draw = function() {
    push();

    translate(this.drawPos.x, this.drawPos.y);

    fill(100, 0, 39.2);
    noStroke();

    ellipse(0, 0, this.drawR * 2);

    pop();
};

function Bomb(x_, y_, initialVel_, damage_) {
	// Inherit from Entity
	Entity.call(this, x_, y_, 5, 20);

	this.acc.add(initialVel_);

	this.damage = damage_;

	this.maxVel = 20;

	this.countdown = false;
}

// Adds the Entity prototype to the Bomb object
Bomb.prototype = Object.create(Entity.prototype);

Bomb.prototype.update = function() {
	this.loseHealth(dt * 0.1);

	if (this.health < 0) {
		this.blowUp();
	}
}

Bomb.prototype.blowUp = function() {
	game.areaEffects.push(new AreaEffect(this.pos.x, this.pos.y, 100,
        function(areaEffect, entity) {
            entity.loseHealth(areaEffect.data.damage);
            var knockbackForce = p5.Vector.sub(entity.pos, areaEffect.pos);
            knockbackForce.setMag(100);
            entity.applyForce(knockbackForce);
            return true;
        }, {damage: this.damage}));
}

Bomb.prototype.draw = function() {
	push();

	translate(this.drawPos.x, this.drawPos.y);

	fill(100, 0, 0);
	noStroke();

	ellipse(0, 0, this.drawR * 2);

	pop();
}
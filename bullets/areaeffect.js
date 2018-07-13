function AreaEffect(x_, y_, r_, effect_) {
	this.pos = createVector(x_, y_);
	this.r = r_;
	this.currentR = 0;

	// How fast it expands
	this.speed = 15;

	// A function applied to any entities in the area - e.g. entity.loseHealth(50);
	this.effect = effect_;

	// An array of entities that have been affected (so they only lose health once)
	this.affected = [];

	this.done = false;
}

AreaEffect.prototype.update = function(entities) {
	// It expands
	if (this.currentR < this.r) {
		this.currentR += dt * this.speed;
	} else {
		// Disappears once it reaches its maximum radius
		this.done = true;
	}

	for (var i = 0; i < entities.length; i++) {
		var d = p5.Vector.dist(this.pos, entities[i].pos);
		if (d <= this.currentR) {
			if (!this.affected.includes(entities[i])) {
				if (this.effect(this, entities[i])) {
					this.affected.push(entities[i]);
				}
			}
		}
	}
}

AreaEffect.prototype.draw = function() {
	var drawPos = game.gameCam.getDrawPos(this.pos);
	var drawR = game.gameCam.getDrawSize(this.currentR);

	push();

	translate(drawPos.x, drawPos.y);

	fill(150, 0, 0, 100);
	noStroke();

	ellipse(0, 0, drawR * 2);

	pop();
}
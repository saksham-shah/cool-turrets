function CircleParticle(position_, velocity_, dirError_, maxLife_, radius_, colour_) {
    // Inherit from Enemy
    Particle.call(this, position_);

    this.colour = color(0, 129, 255);
    this.vel = velocity_;
    var randError = random(-dirError_, dirError_);
    this.vel.rotate(randError);

    this.maxLife = maxLife_;
    this.life = this.maxLife;
    this.maxRadius = radius_;
    this.radius = this.maxRadius;

    this.colour = colour_;

}

// Adds the Enemy prototype to the Turret object
CircleParticle.prototype = Object.create(Particle.prototype);

CircleParticle.prototype.update = function() {
    this.life -= dt;
    this.radius = map(this.life, this.maxLife, 0, 0, this.maxRadius); //Get bigger as time goes past
    this.colour = color(map(this.life, this.maxLife, 0, 200, 50));
    this.move();
};

CircleParticle.prototype.draw = function() {
    var drawPos = game.gameCam.getDrawPos(this.pos);
    var drawR = game.gameCam.getDrawSize(this.radius);
    push();
    fill(this.colour);
    noStroke();
    translate(drawPos.x, drawPos.y);
    // Draw body
    ellipse(0, 0, drawR * 2);
    pop();
};
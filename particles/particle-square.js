function SquareParticle(position_, velocity_, dirError_, maxLife_, radius_, colour_) {
    // Inherit from Particle
    Particle.call(this, position_, velocity_, dirError_, maxLife_, radius_, colour_);
}

// Adds the Particle prototype to the SquareParticle object
SquareParticle.prototype = Object.create(Particle.prototype);

SquareParticle.prototype.draw = function() {
    var drawPos = game.gameCam.getDrawPos(this.pos);
    var drawR = game.gameCam.getDrawSize(this.radius);
    push();
    fill(this.colour);
    noStroke();
    translate(drawPos.x, drawPos.y);
    // Draw body
    rectMode(CENTER);
    rect(0, 0, drawR * 2, drawR * 2);
    pop();
};
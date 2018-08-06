function CircleParticle(position_, velocity_, dirError_, maxLife_, radius_, colour_) {
    // Inherit from Particle
    Particle.call(this, position_, velocity_, dirError_, maxLife_, radius_, colour_);
}

// Adds the Particle prototype to the CircleParticle object
CircleParticle.prototype = Object.create(Particle.prototype);

CircleParticle.prototype.draw = function(cam, scr) {
    var drawPos = cam.getDrawPos(this.pos.x, this.pos.y);
    var drawR = cam.getDrawSize(this.radius);
    scr.push();
    scr.fill(this.colour);
    scr.noStroke();
    scr.translate(drawPos.x, drawPos.y);
    // Draw body
    scr.ellipse(0, 0, drawR * 2);
    scr.pop();
};

function TrailParticle(position_, velocity_) {
    var dirError = QUARTER_PI;

    var radius = 3;
    var maxLife = 60;
    var positionError = 7;
    var colour = color(180, 100, 100);
    SquareParticle.call(this, p5.Vector.add(position_, p5.Vector.random2D().mult(positionError)), velocity_, dirError, maxLife, radius, colour);
}

TrailParticle.prototype = Object.create(SquareParticle.prototype);

TrailParticle.prototype.update = function() {
    this.radius = map(this.life, this.maxLife, 0, this.maxRadius, 0); //Get smaller as time goes past
    this.move();
};

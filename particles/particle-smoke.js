function SmokeParticle(position_, velocity_) {
    var dirError = QUARTER_PI;
    var radius = 15;
    var maxLife = 15;
    var colour = color(0, 0, 58.8);
    CircleParticle.call(this, position_, velocity_, dirError, maxLife, radius, colour);
}

SmokeParticle.prototype = Object.create(CircleParticle.prototype);

SmokeParticle.prototype.update = function() {
    this.radius = map(this.life, this.maxLife, 0, 0, this.maxRadius); //Get bigger as time goes past
    this.colour = color(0, 0, map(this.life, this.maxLife, 0, 100, 20)); // From whitish to greyish
    this.move();
};
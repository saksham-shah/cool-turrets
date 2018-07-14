function TurretSniper(x_, y_, colour_) {
    // Inherit from Entity
    Turret.call(this, x_, y_, 50, colour_, 20);

    // this.health = 30;

    this.playerControlRadius = 75;

    this.reloadTime = 100;

    this.bulletTemplate = {
        speed: 15,
        damage: 50,
        range: 600,
        r: 4
    };

    this.recoil = this.bulletTemplate.r * 0.1;
}
// Adds the Turret prototype to the TurretStandard object
TurretSniper.prototype = Object.create(Turret.prototype);

TurretSniper.prototype.draw = function() {
    push();
    translate(this.drawPos.x, this.drawPos.y);
    rotate(this.direction);

    // Draw control radius
    fill(0, 255, 0, 10);
    noStroke();
    ellipse(0, 0, game.gameCam.getDrawSize(this.playerControlRadius) * 2);

    // Draw turret body
    fill(this.colour);
    noStroke();
    ellipse(0, 0, this.drawR * 2);

    // Draw gun
    var barrelWidth = 8;
    var barrelLength = 40;
    var mult = game.gameCam.getDrawSize(1);
    rect(0, - barrelWidth * 0.5 * mult, barrelLength * mult, barrelWidth * mult);

    pop();
};

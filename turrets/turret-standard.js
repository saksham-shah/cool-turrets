function TurretStandard(x_, y_) {
    // Inherit from Entity
    Turret.call(this, x_, y_, 50, 20);

    // this.health = 30;

    this.playerControlRadius = 100;

    this.reloadTime = 50;

    this.bulletTemplate = {
        speed: 10,
        damage: 10,
        range: 300,
        r: 7
    };

    this.recoil = this.bulletTemplate.r * 0.1;
}
// Adds the Turret prototype to the TurretStandard object
TurretStandard.prototype = Object.create(Turret.prototype);

TurretStandard.prototype.draw = function() {
    push();
    translate(this.drawPos.x, this.drawPos.y);
    rotate(this.direction);

    // Draw control radius
    fill(120, 100, 100, 0.1);
    noStroke();
    ellipse(0, 0, game.gameCam.getDrawSize(this.playerControlRadius) * 2);

    // Draw turret body
    fill(this.colour);
    noStroke();
    ellipse(0, 0, this.drawR * 2);

    // Draw gun
    var barrelWidth = 12;
    var barrelLength = 30;
    var mult = game.gameCam.getDrawSize(1);
    rect(0, -barrelWidth * 0.5 * mult, barrelLength * mult, barrelWidth * mult);

    pop();
};
function TurretSpike(x_, y_, colour_) {
    // Inherit from Entity
    Turret.call(this, x_, y_, 100, colour_, 30);

    // this.health = 30;

    this.playerControlRadius = 100;

    this.reloadTime = 100;

    // No bullets
    // this.bulletTemplate = {
    //     speed: 10,
    //     damage: 10,
    //     range: 300,
    //     r: 7
    // };

    //this.recoil = this.bulletTemplate.r * 0.1;

    this.maxVel = 20;

    this.mass = 100;

    this.bodyDamage = 15;
}
// Adds the Turret prototype to the TurretSpike object
TurretSpike.prototype = Object.create(Turret.prototype);

TurretSpike.prototype.shoot = function() {
    var recoilForce = p5.Vector.fromAngle(this.direction);
    recoilForce.setMag(1000);
    this.applyForce(recoilForce);
}


TurretSpike.prototype.draw = function() {
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

    // Draw triangle thing
    beginShape();

    var mult = game.gameCam.getDrawSize(1);
    vertex(0, - this.drawR);
    vertex(0, this.drawR);
    vertex((this.r + 20) * mult, 0);
    vertex(0, - this.drawR);
    endShape();

    pop();
};

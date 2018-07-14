function TurretBomber(x_, y_) {
    // Inherit from Entity
    Turret.call(this, x_, y_, 50, 20);

    // this.health = 30;

    this.playerControlRadius = 150;

    this.reloadTime = 100;

    // No bullets
    // this.bulletTemplate = {
    //     speed: 10,
    //     damage: 10,
    //     range: 300,
    //     r: 7
    // };

}
// Adds the Turret prototype to the TurretBomber object
TurretBomber.prototype = Object.create(Turret.prototype);

TurretBomber.prototype.shoot = function() {
    // Throw bomb
    var vector = p5.Vector.fromAngle(this.direction);
    var offset = vector.setMag(20 + this.r);
    var shootBomb = new Bomb(this.pos.x + offset.x, this.pos.y + offset.y, vector.setMag(15), 30, 100);
    game.entities.push(shootBomb);

    var recoilForce = p5.Vector.fromAngle(shootBomb.acc.heading()).rotate(PI);
    recoilForce.setMag(shootBomb.mass * shootBomb.acc.mag());
    this.applyForce(recoilForce);
}


TurretBomber.prototype.draw = function() {
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
    var barrelWidth = 25;
    var barrelLength = 25;
    var mult = game.gameCam.getDrawSize(1);
    rect(0, - barrelWidth * 0.5 * mult, barrelLength * mult, barrelWidth * mult);

    pop();
};

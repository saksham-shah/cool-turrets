function EnemySeeker(x_, y_) {
    // Inherit from Enemy
    Enemy.call(this, x_, y_, 20);

    this.colour = color(0, 255, 0);
    this.maxVel = 10;
    this.maxForce = 0.1;

    this.bodyDamage = 10;

    // this.health = 10;
}

// Adds the Enemy prototype to the Turret object
EnemySeeker.prototype = Object.create(Enemy.prototype);

EnemySeeker.prototype.update = function() {
    //Rudimentary default behavior
    var vectorEnemytoPlayer = p5.Vector.sub(game.player.pos, this.pos);
    vectorEnemytoPlayer.setMag(this.maxForce);
    this.acc.add(vectorEnemytoPlayer);


}

EnemySeeker.prototype.draw = function() {
    push();
    fill(this.colour);
    noStroke();
    translate(this.drawPos.x, this.drawPos.y);
    ellipse(0, 0, this.drawR * 2);
    pop();
}
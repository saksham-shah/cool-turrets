function EnemySeeker(x_, y_, colour_) {
    // Inherit from Enemy
    Enemy.call(this, x_, y_);

    this.colour = colour_;
    this.maxForce = 100;
    this.maxVel = 1;
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
    translate(this.drawPos.x, this.drawPos.y);
    ellipse(0, 0, this.r * 2, this.r * 2);
    pop();
}
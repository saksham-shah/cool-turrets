function EnemySeeker(x_, y_, colour_) {
    // Inherit from Entity
    Enemy.call(this, x_, y_);

    this.colour = colour_;
    this.maxForce = 100;
    this.maxVel = 1;
}

// Adds the Entity prototype to the Turret object
EnemySeeker.prototype = Object.create(Enemy.prototype);

EnemySeeker.prototype.update = function() {
    //Rudimentary default behavior
    var vectorEnemytoPlayer = p5.Vector.sub(player.pos, this.pos);
    vectorEnemytoPlayer.setMag(this.maxForce);
    this.acc.add(vectorEnemytoPlayer);
}

EnemySeeker.prototype.draw = function() {
    push();
    fill(this.colour);
    translate(this.pos.x, this.pos.y);
    ellipse(0, 0, this.r * 2, this.r * 2);
    pop();
}
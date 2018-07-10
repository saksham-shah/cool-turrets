// Player controlled entity
function Player(x_, y_) {
  // Inherits from Entity (random number for size right now)
  Entity.call(this, x_, y_, 30);
}

// Adds the Entity prototype to the Player object
Player.prototype = Object.create(Entity.prototype);

Player.prototype.update = function() {
  // this.seekMouse();
  this.followMouse();
}

// Follows mouse by accelerating towards it
Player.prototype.followMouse = function() {
  var mousePos = createVector(mouseX, mouseY);
  var vectorToMouse = p5.Vector.sub(mousePos, this.pos);
  vectorToMouse.normalize();
  vectorToMouse.mult(this.maxVel);
  this.acc.add(vectorToMouse);
}

// Follows mouse using desired velocity stuff
Player.prototype.seekMouse = function() {
  var mousePos = createVector(mouseX, mouseY);
  var vectorToMouse = p5.Vector.sub(mousePos, this.pos);
  vectorToMouse.normalize();
  vectorToMouse.mult(this.maxVel);
  vectorToMouse.sub(this.vel);
  vectorToMouse.limit(this.maxForce);
  this.acc.add(vectorToMouse);
}


// Just a white circle right now
Player.prototype.draw = function() {
  fill(255);
  noStroke();
  ellipse(this.pos.x, this.pos.y, this.r * 2);
}

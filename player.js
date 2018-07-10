// Player controlled entity
function Player(x_, y_) {
  // Inherits from Entity (random number for size right now)
  Entity.call(this, x_, y_, 30);
}

// Adds the Entity prototype to the Player object
Player.prototype = Object.create(Entity.prototype);

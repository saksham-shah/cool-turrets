function Enemy(x_, y_, health_) {
    // Inherit from Entity
    Entity.call(this, x_, y_, health_, 20);

}

// Adds the Entity prototype to the Enemy object
Enemy.prototype = Object.create(Entity.prototype);

Enemy.prototype.update = function() {
    //stub
}

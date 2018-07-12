function GameCam(xBound_, yBound_, toFollow_) {
    // this.x = x_;
    // this.y = y_;
    this.xBound = xBound_;
    this.yBound = yBound_;

    this.buffer = 100;
    this.toFollow = toFollow_;

    this.baseZoom = 1;
    this.zoom = this.baseZoom;

}

// Updates the position of the camera
GameCam.prototype.update = function() {
    this.zoom = this.baseZoom - this.baseZoom * map(max(this.toFollow.vel.x, this.toFollow.vel.y), 0, 10, 0, 0.1);
    this.follow();
    // this.borders();
};

// Restricts the camera to the borders of the game
GameCam.prototype.borders = function() {
    if (this.x < width / 2 - this.buffer) {
        this.x = width / 2 - this.buffer;
    } else if (this.x > this.xBound - width / 2 + this.buffer) {
        this.x = this.xBound - width / 2 + this.buffer;
    }
    if (this.y < height / 2 - this.buffer) {
        this.y = height / 2 - this.buffer;
    } else if (this.y > this.yBound - height / 2 + this.buffer) {
        this.y = this.yBound - height / 2 + this.buffer;
    }
};

// Follows the player
GameCam.prototype.follow = function() {
    this.x = this.toFollow.pos.x;
    this.y = this.toFollow.pos.y;
};

// Converts a game position to a draw reposition
GameCam.prototype.getDrawPos = function(gamePos) {
    var drawX = this.zoom * (gamePos.x - this.x) + width / 2;
    var drawY = this.zoom * (gamePos.y - this.y) + height / 2;
    return createVector(drawX, drawY);
};

GameCam.prototype.getDrawSize = function(gameSize) {
    return gameSize * this.zoom;
}
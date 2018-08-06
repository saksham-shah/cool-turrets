// Creates a GameCam
function createGameCam(x, y, w, h) {
    return new GameCam(x, y, w, h);
}

// Camera object for games
function GameCam(x_, y_, w_, h_) {
    if (x_ === undefined) {
        x_ = 0;
    }
    if (y_ === undefined) {
        y_ = 0;
    }
    if (w_ === undefined) {
        w_ = width;
    }
    if (h_ === undefined) {
        h_ = height;
    }
    this.x = x_;
    this.y = y_;
    this.w = w_;
    this.h = h_;

    this.defaultDrawX = this.x;
    this.defaultDrawY = this.y;
    this.zoom = 1;

    this.rotation = 0;
    this.rotated = false;

    this.screen = createGraphics(this.w, this.h);
    this.screen.colorMode(HSB);

    this.toFollow = null;
    this.posFollow = null;
    this.zoomFollow = null;
    this.angleFollow = null;
}

// Converts the current GameCam screen into a p5 image object
GameCam.prototype.snapshot = function() {
    return this.screen.get();
}

// Follow the player, move with arrow, change zoom etc.
GameCam.prototype.update = function() {
    if (this.rotated) {
        this.screen.pop();
        this.rotated = false;
    }

    if (this.posFollow) {
        this.x = this.posFollow.x - this.w / 2;
        this.y = this.posFollow.y - this.h / 2;
    }
    if (this.zoomFollow) {
        this.zoom = this.zoomFollow.z;
    }
    if (this.angleFollow) {
        this.rotation = this.angleFollow.a;
    }

    if (this.rotation !== 0) {
        this.screen.push();
        this.rotated = true;

        this.screen.rotate(this.rotation);

        var x = this.defaultDrawX + this.w / 2;
        var y = this.defaultDrawY + this.h / 2;

        var translation = correctRotation(x, y, this.rotation);
        this.screen.translate(translation.x, translation.y);
    }
}

function correctRotation(x, y, rotation) {
    var v = createVector(x, y);
    var v2 = v.copy().rotate(rotation);
    var dv = p5.Vector.sub(v, v2)
    dv.rotate(-rotation);
    return dv;
}

GameCam.prototype.setUpdate = function(updateF) {
    this.update = updateF;
}

// Follows the position - if no pos is defined it stops following
GameCam.prototype.follow = function(object) {
    if (object) {
        for (var i = 1; i < arguments.length; i++) {
            switch (arguments[i]) {
                case POSITION:
                    if (object.x === undefined || object.y === undefined) {
                        console.log("GameCam.follow was expecting an object with an x and y value.");
                    } else {
                        this.posFollow = object;
                    }
                    break;
                case ZOOM:
                    if (object.z === undefined) {
                        console.log("GameCam.follow was expecting an object with a z value (z for zoom).");
                    }
                    else {
                        this.zoomFollow = object;
                    }
                    break;
                case ROTATION:
                    if (object.a === undefined) {
                        console.log("GameCam.follow was expecting an object with an a value (a for angle).");
                    }
                    else {
                        this.angleFollow = object;
                    }
                    break;
            }
        }

    } else {
        this.toFollow = null;
    }
}

// Draws the object/function to the screen
GameCam.prototype.draw = function(toDraw) {
    if (toDraw instanceof Function) {
        toDraw(this, this.screen);
    } else {
        toDraw.draw(this, this.screen);
    }
}

// Draws the GameCam screen to the canvas
GameCam.prototype.drawToCanvas = function(x, y) {
    if (!x) {
        x = this.defaultDrawX;
    }
    if (!y) {
        y = this.defaultDrawY;
    }
    if (this.gameclip) {
        var img = this.gameclip.next();
    } else {
        var img = this.snapshot();
    }
    if (img === false) {
        img = this.snapshot();
        this.gameclip = null;
    }
    image(img, x, y, this.w, this.h);

    //Debug rectangle representing border of camera
    noFill();
    strokeWeight(4);
    stroke(0, 0, 0);
    rect(x, y, this.w, this.h);
}

// Converts a game position to a draw position
GameCam.prototype.getDrawPos = function(gameX, gameY) {
    var drawX = this.zoom * (gameX - this.x - this.w / 2) + this.w / 2;
    var drawY = this.zoom * (gameY - this.y - this.h / 2) + this.h / 2;
    return {x: drawX, y: drawY};
};

// Converts a game size to a draw size
GameCam.prototype.getDrawSize = function(gameSize) {
    return gameSize * this.zoom;
}

// Used to convert mouse position into game position
GameCam.prototype.getGamePos = function(drawX, drawY) {
    // Just the inverse function of getDrawPos
    var gameX = (drawX - width / 2) / this.zoom + this.x;
    var gameY = (drawY - height / 2) / this.zoom + this.y;
    return {x: gameX, y: gameY};
}

// Gets the game position of the mouse
GameCam.prototype.getMousePos = function() {
    var centre = createVector(this.defaultDrawX + this.w / 2, this.defaultDrawY + this.h / 2);
    var mouseOnScreen = createVector(mouseX, mouseY);
    var offset = p5.Vector.sub(mouseOnScreen, centre).rotate(-this.rotation);
    var gameCentre = createVector(this.x + this.w / 2, this.y + this.h / 2);
    return offset.add(gameCentre);
}

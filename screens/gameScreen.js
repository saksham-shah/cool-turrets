function GameScreen() {
    this.game = null;
}

GameScreen.prototype.newGame = function(mode_) {
    this.game = new Game(mode_);
}

GameScreen.prototype.update = function() {
    this.game.update();
};

GameScreen.prototype.draw = function() {
    this.game.draw();
};

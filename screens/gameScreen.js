function GameScreen(mode_) {
    this.game = new Game(mode_);
}

GameScreen.prototype.update = function() {
    this.game.update();
};

GameScreen.prototype.draw = function() {
    this.game.draw();
};
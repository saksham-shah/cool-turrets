function GameScreen() {
    this.game = new Game("single-player");
}

GameScreen.prototype.update = function() {
    this.game.update();
};

GameScreen.prototype.draw = function() {
    this.game.draw();
};
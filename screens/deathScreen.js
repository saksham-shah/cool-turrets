function DeathScreen(mode_, score_) {
    this.buttons = [];

    this.buttons.push(new Button(400, 600, 100, 100, "Restart", 50,
        function() {
            gameScreen.newGame(mode_);
            screen = gameScreen;
        }
    ));
    this.buttons.push(new Button(900, 600, 100, 100, "Exit", 50,
        function() {
            screen = menuScreen;
        }
    ));

    this.score = score_;
}

DeathScreen.prototype.update = function() {
    for (var i = 0; i < this.buttons.length; i++) {
        this.buttons[i].update();
    }
};

DeathScreen.prototype.draw = function() {
    background(30);
    //Draw Score
    push();
    textSize(64);
    textAlign(CENTER);
    fill(100, 100, 100);

    text("You have died", 650, 200);
    fill(100, 100, 100);

    text("score:", 650, 300);
    textSize(120);
    text(this.score, 650, 400);
    pop();
    for (var i = 0; i < this.buttons.length; i++) {
        this.buttons[i].draw();
    }
};
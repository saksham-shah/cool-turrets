function MenuScreen() {
    this.buttons = [];

    this.buttons.push(new Button(400, 400, 80,
        function() {
            gameScreen.newGame("single-player");
            screen = gameScreen;
        }
    ));
    this.buttons.push(new Button(650, 400, 80,
        function() {
            gameScreen.newGame("coop");
            screen = gameScreen;
        }
    ));
    this.buttons.push(new Button(900, 400, 80,
        function() {
            gameScreen.newGame("two-player");
            screen = gameScreen;
        }
    ));
}

MenuScreen.prototype.update = function() {
    for (var i = 0; i < this.buttons.length; i++) {
        this.buttons[i].update();
    }
};

MenuScreen.prototype.draw = function() {
    background(0);
    for (var i = 0; i < this.buttons.length; i++) {
        this.buttons[i].draw();
    }
};

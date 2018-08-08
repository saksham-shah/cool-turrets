// var player;
// var entities;
var dt;
var game;
var screen;

function setup() {
    // Multiplied by sqrt(2) because the split screen halved the view area
    var canvas = createCanvas(960 * 1.4, 640 * 1.4);

    colorMode(HSB);

    lastUpdate = Date.now();


    gameScreen = new GameScreen();
    screen = gameScreen;

    // game = new Game("single-player");
    //game = new Game("two-player");

    // game = new Game("coop");

}


function draw() {
    gameScreen.update();
    gameScreen.draw();
}
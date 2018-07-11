// var player;
// var entities;
var dt;
var game;

function setup() {
    var canvas = createCanvas(960, 640);
    gameWidth = 960;
    gameHeight = 640;

    lastUpdate = Date.now();

    game = new Game();

}


function draw() {
    game.update();
    game.draw();

}
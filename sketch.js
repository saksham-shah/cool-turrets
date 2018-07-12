// var player;
// var entities;
var dt;
var game;

function setup() {
    var canvas = createCanvas(960, 640);


    lastUpdate = Date.now();

    game = new Game();

}


function draw() {
    game.update();
    game.draw();

}

function keyPressed() {
    if (keyCode == 49) { // number 1 key
        game.entities.push(new EnemySeeker(random(0, game.xBound), random(0, game.yBound), color(0, 255, 0)));
    }
    if (keyCode == 50) { // number 2 key
        game.entities.push(new TurretStandard(random(0, game.xBound), random(0, game.yBound), color(255, 0, 0)));
    }
    if (keyCode == 51) { // number 3 key
        game.entities.push(new TurretSniper(random(0, game.xBound), random(0, game.yBound), color(255, 0, 0)));
    }
}

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
        game.entities.push(new EnemySeeker(random(0, game.xBound), random(0, game.yBound)));
    }
    if (keyCode == 50) { // number 2 key
        game.entities.push(new EnemyShooter(random(0, game.xBound), random(0, game.yBound)));
    }
    if (keyCode == 54) { // number 6 key
        game.entities.push(new TurretStandard(random(0, game.xBound), random(0, game.yBound), color(255, 0, 0)));
    }
    if (keyCode == 55) { // number 7 key
        game.entities.push(new TurretSniper(random(0, game.xBound), random(0, game.yBound), color(255, 0, 0)));
    }
}

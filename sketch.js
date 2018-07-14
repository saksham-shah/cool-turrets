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
    if (keyCode == 51) { // number 3 key
        game.entities.push(new EnemyMissile(random(0, game.xBound), random(0, game.yBound)));
    }
    if (keyCode == 54) { // number 6 key
        game.entities.push(new TurretStandard(random(0, game.xBound), random(0, game.yBound), color(255, 0, 0)));
    }
    if (keyCode == 55) { // number 7 key
        game.entities.push(new TurretSniper(random(0, game.xBound), random(0, game.yBound), color(255, 0, 0)));
    }
}

function mousePressed() {
    var gamePos = game.gameCam.getGamePos(createVector(mouseX, mouseY));
    // game.entities.push(new TurretStandard(gamePos.x, gamePos.y, color(255, 0, 0)));
    // game.areaEffects.push(new AreaEffect(gamePos.x, gamePos.y, 150,
    //     function(areaEffect, entity) {
    //         entity.loseHealth(10);
    //         var knockbackForce = p5.Vector.sub(entity.pos, areaEffect.pos);
    //         knockbackForce.setMag(100);
    //         entity.applyForce(knockbackForce);
    //         return true;
    //     }));

    // Throw bomb
    var direction = p5.Vector.sub(gamePos, game.player.pos);
    direction.setMag(5);
    var offset = direction.copy().setMag(20 + game.player.r);
    game.entities.push(new Bomb(game.player.pos.x + offset.x, game.player.pos.y + offset.y, direction, 10));

    // Launch missile
    // game.bullets.push(new Missile(gamePos, 75, game.player));
}

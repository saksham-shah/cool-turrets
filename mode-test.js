var testMode = false;
var spawn = 0;

function helpMessage() {
   if (!testMode){
        return "Test mode disabled. To enable it, type test()";
    } else {
        return "Test mode enabled. Type help() for help.";
    }
}

console.log(helpMessage());

function test() {
    testMode = !testMode;
    return helpMessage();
}

function help() {
    if (testMode) {
        console.log("Welcome to test mode. To disable it, type test()");
        console.log("");
        console.log("1: EnemySeeker");
        console.log("2: EnemyShooter");
        console.log("3: EnemyMissile");
        console.log("4: Launch a Missile (not the EnemyMissile missile)");
        console.log("5: EnemyBossSeeker");
        console.log("6: TurretStandard");
        console.log("7: TurretSniper");
        console.log("8: TurretSpike");
        console.log("9: TurretBomber");
        console.log("");
        return "Press the number key of the entity you want to spawn, and click to spawn it into the arena.";
    }
    return "Test mode is currently disabled. To enable it, type test()";
}

function keyPressed() {
    if (testMode) {
        if (keyCode == 49) { // number 1 key
            spawn = 1;
            console.log("Spawn set to EnemySeeker. Click to spawn.");
        }
        if (keyCode == 50) { // number 2 key
            spawn = 2;
            console.log("Spawn set to EnemyShooter. Click to spawn.");
        }
        if (keyCode == 51) { // number 3 key
            spawn = 3;
            console.log("Spawn set to EnemyMissile. Click to spawn.");
        }
        if (keyCode == 52) { // number 4 key
            spawn = 4;
            console.log("Spawn set to LaunchMissile. Click to spawn.");
        }
        if (keyCode == 53) { // number 5 key
            spawn = 5;
            console.log("Spawn set to EnemyBossSeeker. Click to spawn.");
        }
        if (keyCode == 54) { // number 6 key
            spawn = 6;
            console.log("Spawn set to TurretStandard. Click to spawn.");
        }
        if (keyCode == 55) { // number 7 key
            spawn = 7;
            console.log("Spawn set to TurretSniper. Click to spawn.");
        }
        if (keyCode == 56) { // number 8 key
            spawn = 8;
            console.log("Spawn set to TurretSpike. Click to spawn.");
        }
        if (keyCode == 57) { // number 9 key
            spawn = 9;
            console.log("Spawn set to TurretBomber. Click to spawn.");
        }
    }
}

function mousePressed() {
    if (testMode) {
        var gamePos = game.gameCam.getGamePos(createVector(mouseX, mouseY));

        switch (spawn) {
            case 1:
                game.entities.push(new EnemySeeker(gamePos.x, gamePos.y));
                break;
            case 2:
                game.entities.push(new EnemyShooter(gamePos.x, gamePos.y));
                break;
            case 3:
                game.entities.push(new EnemyMissile(gamePos.x, gamePos.y));
                break;
            case 4:
                game.bullets.push(new Missile(gamePos, 75, game.player));
                break;
            case 5:
                game.entities.push(new EnemyBossSeeker(gamePos.x, gamePos.y));
                break;
            case 6:
                game.entities.push(new TurretStandard(gamePos.x, gamePos.y));
                break;
            case 7:
                game.entities.push(new TurretSniper(gamePos.x, gamePos.y));
                break;
            case 8:
                game.entities.push(new TurretSpike(gamePos.x, gamePos.y));
                break;
            case 9:
                game.entities.push(new TurretBomber(gamePos.x, gamePos.y));
                break;
            default:
                console.log("No spawn selected. Press a number key (1-9).")
        }
    }
}




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
    // var direction = p5.Vector.sub(gamePos, game.player.pos);
    // direction.setMag(5);
    // var offset = direction.copy().setMag(20 + game.player.r);
    // game.entities.push(new Bomb(game.player.pos.x + offset.x, game.player.pos.y + offset.y, direction, 10, 100));

    // Launch missile
    // game.bullets.push(new Missile(gamePos, 75, game.player));

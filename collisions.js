function squareCollision(obj1, obj2) {
    if (obj1.pos.x + obj1.r >= obj2.pos.x &&
        obj1.pos.x <= obj2.pos.x + obj2.r &&
        obj1.pos.y + obj1.r >= obj2.pos.y &&
        obj1.pos.y <= obj2.pos.y + obj2.r) {
        return true;
    }
    return false;
}

function circleCollision(obj1, obj2) {
    if (p5.Vector.dist(obj1.pos, obj2.pos) <= obj1.r + obj2.r) {
        return true;
    }
    return false;
}
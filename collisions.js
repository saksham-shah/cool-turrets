function rectCollision(obj1, obj2) {
    if (obj1.pos.x + obj1.r >= obj2.pos.x - obj2.r &&
        obj1.pos.x - obj1.r <= obj2.pos.x + obj2.r &&
        obj1.pos.y + obj1.r >= obj2.pos.y - obj2.r &&
        obj1.pos.y - obj1.r <= obj2.pos.y + obj2.r) {
        return true;
    }
    return false;
}

function circleCollision(obj1, obj2) {
    if (rectCollision(obj1, obj2)) {
        if (p5.Vector.dist(obj1.pos, obj2.pos) <= obj1.r + obj2.r) {
            return true;
        }
    }

    return false;
}

//Perhaps this can be moved to a different file
function reflectVector(vector, normalVector) {

    //Formula for reflecting a Vector
    // r = v - 2<v, n> n

    var a = p5.Vector.dot(vector, normalVector) * -2;
    var b = normalVector.mult(a);
    var reflectedVector = p5.Vector.add(vector, b);

    return reflectedVector;
}

function rectContains(pos, x, y, w, h) {
    if (pos.x < x || pos.y < y || pos.x > x + w || pos.y > y + h) {
        return false;
    }
    return true;
}
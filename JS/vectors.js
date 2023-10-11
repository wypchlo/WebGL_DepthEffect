class Vector2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    lerp(end, amt) {
        this.x = (1 - amt) * this.x + amt * end.x;
        this.y = (1 - amt) * this.y + amt * end.y;
    }

    set(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Vector3 {
    constructor(vector) {
        this.x = vector[0];
        this.y = vector[1];
        this.z = vector[2];
    }

    set(vector) {
        this.x = vector[0];
        this.y = vector[1];
        this.z = vector[2];
    }
}
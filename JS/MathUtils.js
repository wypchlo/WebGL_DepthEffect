class Vector2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    lerp(end, amt) {
        this.x = (1 - amt) * this.x + amt * end.x;
        this.y = (1 - amt) * this.y + amt * end.y;
    }
}
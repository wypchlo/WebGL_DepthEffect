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
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    set(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}

class File {
    static getPositionsFromTxt(txt)
    {
        let lines = txt.split("\n");
        let result = [];
        
        for (let lineIndex = 0; lineIndex <= lines.length; lineIndex++) 
        {
            let positions = lines[lineIndex];
            if(!positions) continue;
    
            positions = positions.split(", ");
            if(positions.length == 2)
                result.push(new Vector2(positions[0], positions[1])); 
            else
                result.push(new Vector3(positions[0], positions[1], positions[2])); 
        }
        return result.reverse();
    }
}
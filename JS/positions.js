//positions from positions.txt

const textPositions = 
`
-44, -69
-115, 472
76, -152
-177, -153
-277, -190
`

const getPositionsFromTxt = (txt) => {
    let a = txt.split("\n");
    let b = [];
    for (let i = 0; i <= a.length; i++){
        if(a[i]) b.push(new Vector2(a[i].split(", ")[0], a[i].split(", ")[1])); 
    }
    return b.reverse();
}

const positions = getPositionsFromTxt(textPositions);

//path to folder containing the images

const filePrefix = "sb_landscape";
const folderPath = "Assets/sb";
//positions from positions.txt

const textPositions = 
`
-108, -71
-126, -45
-57, -60
-230, -189
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

const folderPath = "Images";
const images = 
[
    "cc_landscape - 1.png",
    "cc_landscape - 2.png",
    "cc_landscape - 3.png",
    "cc_landscape - 4.png"
]
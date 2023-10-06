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
        if(a[i]) b.push(a[i].split(", ")); 
    }
    return b.reverse();
}

//path to folder containing the images

const folderPath = "Images";
const images = 
[
    "cc_landscape - 1.png",
    "cc_landscape - 2.png",
    "cc_landscape - 3.png",
    "cc_landscape - 4.png"
]
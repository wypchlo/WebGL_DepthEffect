//positions from positions.txt

const textPositions = 
`
-44, -69
-115, 472
76, -152
-177, -153
-277, -190
`

const textDepthRange = 
`
85, 91, 8
85, 91, 4
85, 91, 3
143, 81, 2
96, 39, 0.75
`

const POSITIONS = File.getPositions(textPositions);
const DEPTH_RANGE = File.getPositions(textDepthRange);

const filePrefix = "sb_landscape";
const folderPath = "Assets/sb";
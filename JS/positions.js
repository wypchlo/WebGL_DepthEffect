//positions from positions.txt

const textPositions = 
`
-44, -60
-115, 472
76, -152
-177, -153
-277, -190
`

const textDepthRange = 
`
85, 91, 12
85, 91, 10
85, 91, 8
143, 81, 4
96, 39, 0.75
`

const POSITIONS = File.getPositions(textPositions);
const DEPTH_RANGE = File.getPositions(textDepthRange);

const filePrefix = "sb_landscape";
const folderPath = "Assets/sb";
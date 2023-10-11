const RESOLUTION = new Vector2(window.innerHeight / 9 * 16, window.innerHeight);
const RESOLUTION_MULTIPLIER = new Vector2(RESOLUTION.x / 1366, RESOLUTION.y / 786);
const canvasContainer = document.querySelector("#canvasContainer");

class Depth {
    constructor(strength) {
        this.strength = strength;
        this.mousePos = new Vector2(0, 0);
        this.normalizedOffset = new Vector2(1, 1);
        this.finalOffset = new Vector2(1, 1);
        this.offset = new Vector2(1, 1);
    }

    mouseRender(){
        this.offset.lerp(this.mousePos, 0.1);
        this.normalizedOffset.x = (this.offset.x / RESOLUTION.x - .5);
        this.normalizedOffset.y = (this.offset.y / RESOLUTION.y - .5);
        this.finalOffset.x = this.normalizedOffset.x * (this.strength / 100);
        this.finalOffset.y = this.normalizedOffset.y * (this.strength / 100);
    }

    initialize() {
        document.addEventListener('mousemove', (event) => this.mousePos.set(event.clientX, event.clientY));
        setInterval (this.mouseRender.bind(this), 1000 / 60);
    }    
}

class ImageCanvas {
    constructor(imagePath, container, depth){
        this.imagePath = imagePath,
        this.container = container,
        this.depth = depth,
        this.multiplier
    }

    setPosition(x, y) {
        this.canvas.style.left = `${x / 1366 * 100}%`;
        this.canvas.style.bottom = `${y / 768 * 100}%`;
    }

    setSize() {
        const img = new Image();
        img.src = this.imagePath;
        img.addEventListener("load", () => {
            this.canvas.width = img.width * RESOLUTION_MULTIPLIER.x;
            this.canvas.height = img.height / 2 * RESOLUTION_MULTIPLIER.y;
            twgl.resizeCanvasToDisplaySize(this.gl.canvas);
            this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
        });
    }

    initialize() {
        this.canvas = document.createElement("canvas");
        this.container.appendChild(this.canvas);
        this.gl = this.canvas.getContext("webgl", {premultipliedAlpha: false});
        if (!this.gl) console.error("WEBGL NOT SUPPORTED");

        this.setSize();
    
        const gl = this.gl;
        const programInfo = twgl.createProgramInfo(gl, ["vertexShader", "fragmentShader"]);
        const bufferInfo = twgl.primitives.createXYQuadBufferInfo(gl);
        const originalTexture = twgl.createTexture(gl, { src: this.imagePath });
    
        gl.clearColor(0, 0, 0, 0);
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        gl.clear(gl.COLOR_BUFFER_BIT);
    
        gl.useProgram(programInfo.program);
    
        twgl.setUniforms(programInfo, {
            u_originalImage: originalTexture,
            u_resolution: RESOLUTION
        });
    
        
        requestAnimationFrame(render.bind(this));
        
        function render() {
            twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo);
            twgl.setUniforms(programInfo, { u_offset: [this.depth.finalOffset.x, this.depth.finalOffset.y]});
            twgl.drawBufferInfo(gl, bufferInfo);
            requestAnimationFrame(render.bind(this));
        }
    }
}

function main() {
    const depth = new Depth(1.5, new Vector2(0, 0));
    depth.initialize();

    for (let index = POSITIONS.length - 1; index >= 0; index--) {
        const imageCanvas = new ImageCanvas(`${folderPath}/${filePrefix} - ${index + 1}.png`, canvasContainer, depth);
        imageCanvas.initialize();
        console.log(`${POSITIONS[index].x} ${DEPTH_RANGE[index].x / DEPTH_RANGE[index].z}`);
        imageCanvas.setPosition(POSITIONS[index].x /*+ DEPTH_RANGE[index].x / DEPTH_RANGE[index].z*/, POSITIONS[index].y);
    }
}

main();
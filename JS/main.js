const RESOLUTION = new Vector2(window.innerHeight / 9 * 16, window.innerHeight);
const DEFAULT_RESOLUTION = new Vector2(1366, 786);

class Depth {
    constructor(strength, offset) {
        this.strength = strength;
        this.mousePos = new Vector2(0, 0);
        this.normalizedOffset = new Vector2(1, 1);
        this.offset = new Vector2(1, 1);
    }

    mouseRender(){
        this.offset.lerp(this.mousePos, 0.1);
        this.normalizedOffset.x = (this.offset.x / RESOLUTION.x - .5) * (this.strength / 100);
        this.normalizedOffset.y = (this.offset.y / RESOLUTION.y - .5) * (this.strength / 100);
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

    create(){
        this.canvas = document.createElement("canvas");
        this.container.appendChild(this.canvas);
    }

    /*getMultiplier () {
        const img = new Image();
        img.src = this.imagePath;
         const vector = new Promise ((resolve, reject) => {
            try {
                img.addEventListener("load", () => {
                    const vector = new Vector2(RESOLUTION.x / DEFAULT_RESOLUTION.x, RESOLUTION.y / DEFAULT_RESOLUTION.y);
                    resolve({
                        err: false,
                        vector: vector
                    })
                })
            } catch (err) {
                reject({
                    err: true,
                    msg: err
                })
            }
         })
        
    }*/

    setSize() {
        this.canvas.width = RESOLUTION.x;
        this.canvas.height = RESOLUTION.y;
    }

    initializeWebGL() {
        this.gl = this.canvas.getContext("webgl");
        if (!this.gl) console.error("WEBGL NOT SUPPORTED");
    }

    start() {
        this.create();
        this.initializeWebGL();
        this.setSize();
    
        const gl = this.gl;
        const programInfo = twgl.createProgramInfo(gl, ["vertexShader", "fragmentShader"]);
        const bufferInfo = twgl.primitives.createXYQuadBufferInfo(gl);
        const originalTexture = twgl.createTexture(gl, { src: this.imagePath });
    
        twgl.resizeCanvasToDisplaySize(gl.canvas);
        gl.viewport(0, 0, RESOLUTION.x, RESOLUTION.y);
    
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
    
        gl.useProgram(programInfo.program);
    
        twgl.setUniforms(programInfo, {
            u_originalImage: originalTexture,
            u_resolution: RESOLUTION
        });
    
        
        requestAnimationFrame(render.bind(this));
        
        function render() {
            twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo);
            twgl.setUniforms(programInfo, { u_offset: [this.depth.normalizedOffset.x, this.depth.normalizedOffset.y]});
            twgl.drawBufferInfo(gl, bufferInfo);
            requestAnimationFrame(render.bind(this));
        }
    }
}

function main() {
    const depth = new Depth(1.5, new Vector2(0, 0));
    depth.initialize();

    const imageCanvas = new ImageCanvas("Images/cc_landscape - 2.png", document.querySelector("#canvasContainer"), depth);
    imageCanvas.start();
}

main();
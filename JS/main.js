"use strict";

function createVector2(x, y){
    return {x: x, y: y};
}

const resolution = createVector2(window.innerHeight / 9 * 16, window.innerHeight);
let offset = createVector2(window.innerWidth / 2, window.innerHeight / 2)
let depthOffset = createVector2(window.innerWidth / 2, window.innerHeight / 2);
let mousePos = createVector2(0, 0);
const depthOffsetStrength = 1.5;

document.addEventListener('mousemove', (event) => {
    mousePos.x = event.clientX;
    mousePos.y = event.clientY;
});

function lerp(start, end, amt){
    return (1 - amt) * start + amt * end
}

function mouseRender(){
    offset.x = lerp(offset.x, mousePos.x, 0.1);
    offset.y = lerp(offset.y, mousePos.y, 0.1);
    depthOffset.x = (offset.x / resolution.x - .5) * (depthOffsetStrength / 100);
    depthOffset.y = (offset.y / resolution.y - .5) * (depthOffsetStrength / 100);
}


class imageCanvas {
    constructor(imagePath, container){
        this.imagePath = imagePath,
        this.container = container
    }

    create(){
        this.canvas = document.createElement("canvas");
        this.container.appendChild(this.canvas);
    }

    setSize() {
        this.canvas.width = resolution.x;
        this.canvas.height = resolution.y;
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
        gl.viewport(0, 0, resolution.x, resolution.y);
    
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
    
        gl.useProgram(programInfo.program);
    
        twgl.setUniforms(programInfo, {
            u_originalImage: originalTexture,
            u_resolution: resolution
        });
    
        requestAnimationFrame(render);
        
        function render() {
            twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo);
            twgl.setUniforms(programInfo, { u_offset: [depthOffset.x, depthOffset.y], });
            twgl.drawBufferInfo(gl, bufferInfo);
            requestAnimationFrame(render);
        }
    }
}

setInterval (mouseRender, 1000 / 60);

const test = new imageCanvas("Images/cc_landscape - 2.png", document.querySelector("#canvasContainer"));
test.start();
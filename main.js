"use strict";

function createVector2(x, y){
    return {x: x, y: y};
}

const resolution = createVector2(window.innerHeight / 9 * 16, window.innerHeight);
let offset = createVector2(window.innerWidth / 2, window.innerHeight / 2)
let depthOffset = createVector2(window.innerWidth / 2, window.innerHeight / 2);
let mousePos = createVector2(0, 0);
const depthOffsetStrength = 1.5;

/*
const posVisualizer = {
    el: document.querySelector("#positionVisualizer"),
    x: offset.x,
    y: offset.y,
    update:function(){
        this.el.style.left = `${this.x}px`;
        this.el.style.top = `${this.y}px`;
    }
};
*/

function lerp(start, end, amt){
    return (1 - amt) * start + amt * end
}

function setSize() {
    canvas.width = resolution.x;
    canvas.height = resolution.y;
}

function mouseRender(){
    offset.x = lerp(offset.x, mousePos.x, 0.1);
    offset.y = lerp(offset.y, mousePos.y, 0.1);
    depthOffset.x = (offset.x / resolution.x - 1) * (depthOffsetStrength / 100);
    depthOffset.y = (offset.y / resolution.y - 1) * (depthOffsetStrength / 100);
    //posVisualizer.x = offset.x;
    //posVisualizer.y = offset.y;
    //posVisualizer.update();
}

function main() {
    const canvas = document.getElementById("canvas");
    const gl = canvas.getContext("webgl");
    if (!gl)
        return;

    setSize(canvas);

    let originalImage = { width: 1, height: 1 };

    const originalTexture = twgl.createTexture(gl, {
        src: "Images/cc_landscape - 2.png", 
        crossOrigin: '',
    }, (err, texture, source) => {
        originalImage = source;
    });

    const programInfo = twgl.createProgramInfo(gl, ["vertexShader", "fragmentShader"]);
    const bufferInfo = twgl.primitives.createXYQuadBufferInfo(gl);

    document.addEventListener('mousemove', (event) => {
        mousePos.x = event.clientX;
        mousePos.y = event.clientY;
    });

    twgl.resizeCanvasToDisplaySize(gl.canvas);
    gl.viewport(0, 0, resolution.x, resolution.y);

    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.useProgram(programInfo.program);

    twgl.setUniforms(programInfo, {
        u_originalImage: originalTexture,
        u_resolution: resolution
    });

    setInterval (mouseRender, 1000 / 60);
    requestAnimationFrame(render);
    
    function render() {
        twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo);
        twgl.setUniforms(programInfo, { u_offset: [depthOffset.x, depthOffset.y], });
        twgl.drawBufferInfo(gl, bufferInfo);
        requestAnimationFrame(render);
    }
}

main();
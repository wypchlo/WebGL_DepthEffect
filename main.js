"use strict";

const obj = document.querySelector("#positionVisualizer");

const posVisualizer = {
    el: document.querySelector("#positionVisualizer"),
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
    update:function(){
        this.el.style.left = `${this.x}px`;
        this.el.style.top = `${this.y}px`;
    }
};

const resolution = {
    x: window.innerHeight / 9 * 16, 
    y: window.innerHeight
};

function lerp(start, end, amt){
    return (1 - amt) * start + amt * end
  }

let mousePos = {
    x: 0, 
    y: 0
};

function setSize() {
    canvas.width = resolution.x;
    canvas.height = resolution.y;
}

function mouseRender(){
    posVisualizer.x = lerp(posVisualizer.x, mousePos.x, 0.1);
    posVisualizer.y = lerp(posVisualizer.y, mousePos.y, 0.1);
    posVisualizer.update();
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

    const mouse = [0, 0];
    document.addEventListener('mousemove', (event) => {
        mousePos.x = event.clientX;
        mousePos.y = event.clientY;
        mouse[0] = (event.clientX / resolution.x  * 2 - 1) * -0.02;
        mouse[1] = (event.clientY / resolution.y * 2 - 1) * -0.02;
    });

    setInterval (mouseRender, 1000/60)
        
    let nMouse = [0, 0];
    let oMouse = [0, 0];

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
            nMouse[0] += (mouse[0] - nMouse[0]) * 0.02;
            nMouse[1] += (mouse[1] - nMouse[1]) * 0.02;

        twgl.setUniforms(programInfo, { u_mouse: nMouse, });
        twgl.drawBufferInfo(gl, bufferInfo);

        requestAnimationFrame(render);
    }
}

main();
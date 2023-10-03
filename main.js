"use strict";

const posVisualizer = document.querySelector("#positionVisualizer");
const resolution = [window.innerHeight / 9 * 16, window.innerHeight];

function setSize() {
    canvas.width = resolution[0];
    canvas.height = resolution[1];
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
        mouse[0] = (event.clientX / resolution[0]  * 2 - 1) * -0.02;
        mouse[1] = (event.clientY / resolution[1] * 2 - 1) * -0.02;
    });
        
    let nMouse = [0, 0];
    let oMouse = [0, 0];

    twgl.resizeCanvasToDisplaySize(gl.canvas);
    gl.viewport(0, 0, resolution[0], resolution[1]);

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
                
        posVisualizer.style.left = nMouse[0] / 0.02 * (window.innerWidth / 2) + (window.innerWidth / 2) + "px";
        posVisualizer.style.top = nMouse[1] / 0.02 * (window.innerHeight / 2) + (window.innerHeight / 2) + "px";
        twgl.setUniforms(programInfo, { u_mouse: nMouse, });
        twgl.drawBufferInfo(gl, bufferInfo);

        requestAnimationFrame(render);
    }
}

main();
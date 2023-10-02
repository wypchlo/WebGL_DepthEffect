"use strict";

const resolution = [window.innerHeight / 9 * 16, window.innerHeight];

function setSize() {
    canvas.width = resolution[0];
    canvas.height = resolution[1];
}

function main() {
  // Get A WebGL context
  /** @type {HTMLCanvasElement} */
  const canvas = document.getElementById("canvas");
  const gl = canvas.getContext("webgl");
  if (!gl) {
    return;
  }

  setSize(canvas);

  let originalImage = { width: 1, height: 1 }; // replaced after loading
  const originalTexture = twgl.createTexture(gl, {
    src: "Images/cc_landscape - 2.png", 
    crossOrigin: '',
  }, (err, texture, source) => {
    originalImage = source;
  });

  // compile shaders, link program, lookup location
  const programInfo = twgl.createProgramInfo(gl, ["vs", "fs"]);

  // calls gl.createBuffer, gl.bindBuffer, gl.bufferData for a quad
  const bufferInfo = twgl.primitives.createXYQuadBufferInfo(gl);

  const mouse = [0, 0];
  document.addEventListener('mousemove', (event) => {
    mouse[0] = (event.clientX / gl.canvas.clientWidth  * 2 - 1) * -0.02;
    mouse[1] = (event.clientY / gl.canvas.clientHeight * 2 - 1) * -0.02;
  });
	
	document.addEventListener('touchmove', (event) => {
    mouse[0] = (event.touches[0].clientX / gl.canvas.clientWidth  * 2 - 1) * -0.02;
    mouse[1] = (event.touches[0].clientY / gl.canvas.clientHeight * 2 - 1) * -0.02;
  });
	
	document.addEventListener('touchend', (event) => {
    mouse[0] = 0;
    mouse[1] = 0;
  });
	
	var nMouse = [0, 0];
	var oMouse = [0, 0];

    twgl.resizeCanvasToDisplaySize(gl.canvas);
    requestAnimationFrame(render);
  
  function render() {
    gl.viewport(0, 0, resolution[0], resolution[1]);

    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.useProgram(programInfo.program);

    // calls gl.bindBuffer, gl.enableVertexAttribArray, gl.vertexAttribPointer
    twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo);
		
		nMouse[0] += (mouse[0] - nMouse[0]) * 0.02;
		nMouse[1] += (mouse[1] - nMouse[1]) * 0.02;
			
    // calls gl.activeTexture, gl.bindTexture, gl.uniformXXX
    twgl.setUniforms(programInfo, {
      u_originalImage: originalTexture,
      u_mouse: nMouse,
      u_resolution: resolution
    });
		
    // calls gl.drawArrays or gl.drawElements
    twgl.drawBufferInfo(gl, bufferInfo);
    
    requestAnimationFrame(render);
  }
}

main();
/*
const vertexShaderText = 
[`
  precision mediump float;

  attribute vec2 vertPosition;

  void main()
  {
    gl_Position = vec4(vertPosition, 0.0, 1.0);
  }
`]

const fragmentShaderText = 
[`
  precision mediump float;

  void main()
  {
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
  }
`]

function main() 
{
    const canvas = document.querySelector("canvas");
    const gl = canvas.getContext("webgl");
  
    if (!gl) alert( "Unable to initialize WebGL. Your browser or machine may not support it." );

    gl.clearColor(0.8, 0.4, 0.5, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    let vertexShader = gl.createShader(gl.VERTEX_SHADER);
    let fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

    gl.shaderSource(vertexShader, vertexShaderText);
    gl.shaderSource(fragmentShader, fragmentShaderText);

    gl.compileShader(vertexShader);
    if(!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS))
      console.error(gl.getShaderInfoLog(vertexShader));

    gl.compileShader(fragmentShader);
    if(!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS))
    console.error(gl.getShaderInfoLog(fragmentShader));

    let program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    let trianglevertices = 
    [
      0, .5,
      -.5, -.5,
      .5, -.5
    ];

    let triangleVertexBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBufferObject);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(trianglevertices), gl.STATIC_DRAW);

    let positionAttributeLocation = gl.getAttribLocation(program, 'vertPosition');
    gl.vertexAttribPointer
    (
      positionAttributeLocation,
      2,
      gl.FLOAT,
      false,
      2 * Float32Array.BYTES_PER_ELEMENT,
      0
    )

    gl.enableVertexAttribArray(positionAttributeLocation);

    gl.useProgram(program);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
}

main();
*/

const main = () => {
  let image = new Image();
  image.src = "http://Images/";
  image.onload = () => {
    render(image);
  }
}

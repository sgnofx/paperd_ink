<script>
  import { shapes } from './shapes.js';  // Import shapes store
  
  import Circle from './Circle.svelte';
  import Draggable from './Draggable.svelte';
  import Triangle from './Triangle.svelte';

  let width = 400;
  let height = 300;

  function addShape(type) {
    const x = Math.floor(Math.random() * width);
    const y = Math.floor(Math.random() * height);
    shapes.update(currentShapes => [...currentShapes, { type, x, y }]);
  }

  function exportCoordinates() {

  const canvass = document.getElementById('myCanvas');
  const ctxx = canvass.getContext('2d');


  ctxx.fillStyle = "#FFFFFF";
  ctxx.fillRect(0, 0, width, height);
  
  $shapes.forEach(shape => {
    if (shape.type === 'circle') {
      ctxx.fillStyle = "black";
      ctxx.beginPath();
      ctxx.arc(shape.x, shape.y, 25, 0, Math.PI * 2);
      ctxx.fill();
    }
  });

  const imageData = ctxx.getImageData(0, 0, width, height); 
  // console.log(imageData);

  const pixels = imageData.data;
  const arrayLength = width * height * 3;

  // Create array for C
  let byte = 0;
  let bitPosition = 0;
  let cArray = `#define image_width (${width})\n`;
  cArray += `#define image_height (${height})\n\n`;
  cArray += `const unsigned char img_data[] = {\n `;

  for (let i = 0; i < pixels.length; i += 4) {
    const isWhite = pixels[i] === 255 && pixels[i + 1] === 255 && pixels[i + 2] === 255;
    
    if (!isWhite) {
      byte |= (1 << bitPosition);
    }
    
    bitPosition++;
    
    if (bitPosition >= 8) {
      cArray += `0x${byte.toString(16).toUpperCase().padStart(2, '0')}, `;
      byte = 0;
      bitPosition = 0;
    }
  }

  if (bitPosition !== 0) {
    cArray += `0x${byte.toString(16).toUpperCase().padStart(2, '0')}, `;
  }

  cArray += "};";

  console.log(cArray);

  // cArray += "};";


  // let bitmapArray = [];
  // for (let i = 0; i < imageData.data.length; i += 4) {
  //   const r = imageData.data[i];
  //   const g = imageData.data[i + 1];
  //   const b = imageData.data[i + 2];
    
  //   const grayscale = 0.3 * r + 0.59 * g + 0.11 * b;
  //   let byte = 0;
    
  //   if (grayscale < 128) {  // Adjust this threshold if needed
  //     byte = 255;  // Black
  //   }
  //   bitmapArray.push(`0x${byte.toString(16).padStart(2, '0').toUpperCase()}`);
  // }  

  // let count = 0;
  // for (let i = 0; i < bitmapArray.length; i++) {
  //     if (bitmapArray[i] === '0xFF') {
  //         count++;
  //     }
  // }
  // console.log("Number of black pixels:", count);

  // const bitmapArrayString = bitmapArray.join(", ");

  // let mainCCode = `
  // #define youtube_logo_width (400)
  // #define youtube_logo_height (300)

  // const unsigned char img_data[${bitmapArray.length}] = { ${bitmapArrayString} };

  // `;


  navigator.clipboard.writeText(cArray).then(function() {
    console.log('Main C code copied to clipboard');
  }).catch(function(err) {
    console.log('Could not copy text: ', err);
  });

}





</script>

<div>
  <button on:click={() => addShape('circle')}>Add Circle</button>
  <button on:click={() => addShape('triangle')}>Add Triangle</button>
</div>

<div>
  Width: <input type="number" bind:value={width} />
  Height: <input type="number" bind:value={height} />
</div>

<div style="position: relative; width: {width}px; height: {height}px; border: 1px solid black;">
  {#each $shapes as shape, index}
  <Draggable {index} x={shape.x} y={shape.y}>
      {#if shape.type === 'circle'}
        <Circle />
      {:else if shape.type === 'triangle'}
        <Triangle />
      {/if}
    </Draggable>
  {/each}
</div>


<div>
  <button on:click={exportCoordinates}>Export Coordinates</button>
</div>

<canvas id="myCanvas" width={width} height={height}></canvas>

<style>
  /* Style for canvas to make it visible with a border */
  #myCanvas {
      border: 1px solid black;
  }
</style>


<!-- <div style="position: relative; width: 300px; height: 300px; border: 1px solid black;"> -->
  <!-- {#each shapes as shape} -->
    <!-- The shape elements here, make sure you update the x and y coordinates -->
  <!-- {/each} -->
<!-- </div> -->

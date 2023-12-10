<script>

  //Import required components in the main app
  import { v4 as uuidv4 } from 'uuid';
  import Export from './GUI Editor/Export Module/Export.svelte';
  import Circle from './GUI Editor/Toolbox/Circle/Circle.svelte';
  import Image from './GUI Editor/Toolbox/Image/Image.svelte';
  import Triangle from './GUI Editor/Toolbox/Triangle/Triangle.svelte';
  import Draggable from './GUI Editor/Utils/Draggable.svelte';
  import { addShape, shapes } from './GUI Editor/Utils/shapes.js';

  //width and height of Papered ink device
  let width = 400;
  let height = 300;
  let imageFileInput; // Reference to the hidden file input

  function addImage() {
    imageFileInput.click(); // Trigger the file input
  }

  function onFileChange(event) {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const imageObject = {
        id: uuidv4(), // Generate a unique ID
        url: URL.createObjectURL(file),
        x: Math.floor(Math.random() * 300),  // Initial position, adjust as needed
        y: Math.floor(Math.random() * 200),
        type: 'image'
      };
      shapes.update(currentShapes => [...currentShapes, imageObject]);

      // addShape('image');
    }
  }



</script>

<div>
  <input type="file" accept="image/*" bind:this={imageFileInput} on:change={onFileChange} style="display: none;"/>
  <button on:click={() => addShape('circle')}>Add Circle</button>
  <button on:click={() => addShape('triangle')}>Add Triangle</button>
  <button on:click={addImage}>Add Image</button>
  <Export /> 
</div>

<div>
  Width: <input type="number" bind:value={width} />
  Height: <input type="number" bind:value={height} />
</div>

<div style="position: relative; width: {width}px; height: {height}px; border: 1px solid black;" >
  {#each $shapes as shape, index}
  <Draggable {index} x={shape.x} y={shape.y}>
      {#if shape.type === 'circle'}
        <Circle />
      {:else if shape.type === 'triangle'}
        <Triangle />
      {:else if shape.type === 'image'}
        <Image src={shape.url} id={shape.id} />
      {/if}
    </Draggable>
  {/each}
</div>

<br>

<!-- Canvas for displaying the final output -->
<canvas id="myCanvas" width={width} height={height}></canvas>

<style>
  /* Style for canvas to make it visible with a border */
  #myCanvas {
      border: 1px solid black;
  }
</style>

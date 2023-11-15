<script>

  //Import required components in the main app
  import Export from './GUI Editor/Export Module/Export.svelte';
  import Circle from './GUI Editor/Toolbox/Circle/Circle.svelte';
  import Triangle from './GUI Editor/Toolbox/Triangle/Triangle.svelte';
  import Draggable from './GUI Editor/Utils/Draggable.svelte';
  import { addShape, shapes } from './GUI Editor/Utils/shapes.js';

  //width and height of Papered ink device
  let width = 400;
  let height = 300;

</script>

<div>
  <button on:click={() => addShape('circle')}>Add Circle</button>
  <button on:click={() => addShape('triangle')}>Add Triangle</button>
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

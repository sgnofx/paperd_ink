<script>
import { shapes } from './shapes.js';  // Import shapes store

export let index;
export let x = 100;
export let y = 100;
let moving = false;

	function onMouseDown() {
	moving = true;
	}
	function onMouseMove(e) {
		if (moving) {
			x += e.movementX;
			y += e.movementY;
			shapes.update(currentShapes => {
				currentShapes[index].x = x; // Update x-coordinate in shapes array
				currentShapes[index].y = y; // Update y-coordinate in shapes array
				return currentShapes;
			});
		}
  	}	
	function onMouseUp() {
		moving = false;
	}
	
// 	$: console.log(moving);
</script>

<style>
	.draggable {
		user-select: none;
		cursor: move;
		border: solid 1px gray;
		position: absolute;
	}
</style>

<section on:mousedown={onMouseDown} style="left: {x}px; top: {y}px;" class="draggable">
	<slot></slot>
</section>

<svelte:window on:mouseup={onMouseUp} on:mousemove={onMouseMove} />
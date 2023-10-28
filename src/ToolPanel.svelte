<script>
    import { createEventDispatcher } from 'svelte';
  
    const dispatch = createEventDispatcher();
  
    function drawCircle() {
      dispatch('drawCircle');
    }
  </script>
  
  <button on:click={drawCircle}>Draw Circle</button>
  
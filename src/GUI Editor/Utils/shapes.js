// shapes.js
import { writable } from 'svelte/store';
import { v4 as uuidv4 } from 'uuid';


export const shapes = writable([]);

export function addShape(type) {
    const id = uuidv4(); // Generate a unique ID
    const x = Math.floor(Math.random() * 300);
    const y = Math.floor(Math.random() * 200);
    shapes.update(currentShapes => [...currentShapes, { type, x, y, id }]);
}

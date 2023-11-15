// shapes.js
import { writable } from 'svelte/store';

export const shapes = writable([]);

export function addShape(type) {
    const x = Math.floor(Math.random() * 300);
    const y = Math.floor(Math.random() * 200);
    shapes.update(currentShapes => [...currentShapes, { type, x, y }]);
}

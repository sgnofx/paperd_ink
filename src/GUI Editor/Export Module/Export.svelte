<script>
import { shapes } from '../Utils/shapes';

export function exportCoordinates() {

    let width = 400;
    let height = 300;
  
    const canvass = document.getElementById('myCanvas');
    const ctxx = canvass.getContext('2d');
  
    ctxx.fillStyle = "#FFFFFF";
    ctxx.fillRect(0, 0, width, height);
    $shapes.forEach(shape => {
        if (shape.type === 'circle') {
            // var img = document.getElementById('myImage');
            // ctxx.drawImage(img, shape.x, shape.y, img.width, img.height);
    
            ctxx.fillStyle = "black";
            ctxx.beginPath();
            ctxx.arc(shape.x + 25, shape.y + 25, 25, 0, Math.PI * 2);
            ctxx.fill();
        } 
        else if (shape.type === 'triangle') {
            ctxx.fillStyle = "black";
            ctxx.beginPath();
            ctxx.moveTo(shape.x, shape.y - 25); // Top corner
            ctxx.lineTo(shape.x - 21.65, shape.y + 12.5); // Bottom left corner
            ctxx.lineTo(shape.x + 21.65, shape.y + 12.5); // Bottom right corner
            ctxx.closePath();
            ctxx.fill();
        }else if (shape.type === 'image' && shape.url) {
            const asDitheredImageElement = document.getElementById(shape.id);
            if (asDitheredImageElement && asDitheredImageElement.shadowRoot) {
                const internalCanvas = asDitheredImageElement.shadowRoot.querySelector('canvas');
                if (internalCanvas) {
                    ctxx.drawImage(internalCanvas, shape.x, shape.y);
                }
            }
        }

    });
  
    const imageData = ctxx.getImageData(0, 0, width, height); 
  
    const pixels = imageData.data;
  
    // Create array for C
    let byte = 0;
    let bitPosition = 7;
    let cArray = `#define image_width (${width})\n`;
    cArray += `#define image_height (${height})\n\n`;
    cArray += `const unsigned char img_data[] = {\n `;

    for (let i = 0; i < pixels.length; i += 4) {
        let r = pixels[i];
        let g = pixels[i + 1];
        let b = pixels[i + 2];
    
        let blackOrWhite = toBlackOrWhite(r, g, b);
    
        pixels[i] = blackOrWhite; // Red channel
        pixels[i + 1] = blackOrWhite; // Green channel
        pixels[i + 2] = blackOrWhite; // Blue channel
    
        const isWhite = pixels[i] === 255 && pixels[i + 1] === 255 && pixels[i + 2] === 255;
        if (!isWhite) {
            byte |= (1 << bitPosition);
        }
        
        bitPosition--;
        
        if (bitPosition < 0) {
            cArray += `0x${byte.toString(16).toUpperCase().padStart(2, '0')}, `;
            byte = 0;
            bitPosition = 7;
        }
    }
    
    if (bitPosition !== 0) {
    cArray += `0x${byte.toString(16).toUpperCase().padStart(2, '0')}, `;
    }

    cArray += '};';
    console.log(cArray);

    navigator.clipboard.writeText(cArray).then(function() {
    console.log('Main C code copied to clipboard');
    }).catch(function(err) {
        console.log('Could not copy text: ', err);
    });
  
}


function toBlackOrWhite(r, g, b) {
    // Calculate the average value of the pixel
    var average = (r + g + b) / 3;

    // Set a threshold, 128 is the middle of 0 (Black) and 255 (White)
    var threshold = 128;

    // If the average is greater than the threshold, it's closer to white
    if (average > threshold) {
        return 255; // White
    } else {
        return 0; // Black
    }
}
</script>

<div>
    <button on:click={exportCoordinates}>Export Coordinates</button>
</div>
  
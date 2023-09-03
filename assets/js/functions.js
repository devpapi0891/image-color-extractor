// function rgbToHsl(r, g, b) {
  function rgbToHsl(rgb) {
  
  r = rgb.split(', ')[0] /= 255;
  g = rgb.split(', ')[1] /= 255;
  b = rgb.split(', ')[2] /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);

  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }

    h /= 6;
  }

  return [h * 360, s * 100, l * 100];
}

function hexToRgb(hex) {
  // Remove the hash symbol (#) if it's present
  hex = hex.replace(/^#/, '');

  // Parse the hex string into separate red, green, and blue components
  let r, g, b, a;

  if (hex.length === 3) {
    // Convert short hex (#RGB) to full hex (#RRGGBB)
    r = parseInt(hex[0] + hex[0], 16);
    g = parseInt(hex[1] + hex[1], 16);
    b = parseInt(hex[2] + hex[2], 16);
  } else if (hex.length === 6) {
    // Full hex (#RRGGBB)
    r = parseInt(hex.slice(0, 2), 16);
    g = parseInt(hex.slice(2, 4), 16);
    b = parseInt(hex.slice(4, 6), 16);
  } else if (hex.length === 8) {
    // Hex with alpha (#RRGGBBAA)
    r = parseInt(hex.slice(0, 2), 16);
    g = parseInt(hex.slice(2, 4), 16);
    b = parseInt(hex.slice(4, 6), 16);
    a = parseFloat((parseInt(hex.slice(6, 8), 16) / 255).toFixed(2));
  } else {
    throw new Error('Invalid hex color format');
  }

  // Return the RGB or RGBA values as an object
  if (typeof a === 'undefined') {
    return [r, g, b];
  } else {
    return [r, g, b, a];
  }
}

function isCloseToZero(number) {
  const diffToZero = Math.abs(number - 0);
  const diffTo100 = Math.abs(number - 100);
  if (diffToZero < diffTo100) {
    return true;
  }
  return false;
}

function copyToClipBoard(el) {
  let innerText = el.querySelector('span').innerText;

  const textarea = document.createElement('textarea');
  textarea.value = innerText;
  document.body.appendChild(textarea);

  // Select and copy the text
  textarea.select();
  document.execCommand('copy');

  // Remove the temporary textarea
  document.body.removeChild(textarea);

  // Optionally, provide feedback to the user
  alert('Copied color code');
}
{/* <i class="fa-solid fa-moon fa-2x"></i> */}
{/* <i class="fa-solid fa-sun fa-2x"></i> */}

if (!localStorage.getItem('night-mode')) {
  localStorage.setItem('night-mode', 'false')
}

const nightMode = localStorage.getItem('night-mode')
const nightModeToggler = document.querySelector('#night-mode-toggler')

document.addEventListener('DOMContentLoaded', () => {
  setNightModeTogglerIcon();
})

function setNightModeTogglerIcon() {
  let nightMode = JSON.parse(localStorage.getItem('night-mode'))

  if (nightMode == false) {
    nightModeToggler.querySelector('span').innerHTML=`<i class="fa-solid fa-moon fa-2x"></i>`;
    document.body.classList.remove('dark-mode');
  } else {
    nightModeToggler.querySelector('span').innerHTML=`<i class="fa-solid fa-sun fa-2x"></i>`;
    document.body.classList.add('dark-mode');
  }
}

function toggleNightMode() {
  let currentValue=JSON.parse(localStorage.getItem("night-mode"));
  if (currentValue == false) {
    localStorage.setItem('night-mode', 'true')
  } else {
    localStorage.setItem('night-mode','false');
  }

  setNightModeTogglerIcon();
}

// file upload event
function handleFile() {
  const imagePreviewContainer = document.querySelector('#imagePreviewContainer')
  const fileInput = document.querySelector('#uploadForm input[name=image]');
  const file = fileInput.files[0];
  if (file) {
    // console.log(file)
    if (!file.type.startsWith('image/')) {
      fileInput.value=``;
      imagePreviewContainer.innerHTML=``;
      alert('Invalid file type. Please upload .jpg, .jpeg or .png')
      return;
    }

    let img = document.createElement('img')
    img.alt=`Image preview`
    img.width=150

    const reader = new FileReader();
      reader.onload = function (e) {
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);

      imagePreviewContainer.innerHTML=``;
      imagePreviewContainer.appendChild(img)
  }
}


async function sendRequest(event) {

  event.preventDefault();

  const form = document.querySelector('#uploadForm')
  const action = form.action

  const fd = new FormData(form)
  const response = await fetch(action, {
    mode : 'cors',
    method : 'POST',
    headers: {
      // 'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body : fd
  });

  const result = await response.json()
  // console.log(result)
  if (result.error == 1) {
    alert(result.message)
    return;
  }

  displayPalette(result.palette_colors, result.color_format);
}


function displayPalette(colors, format) {

  const palettesContainer = document.querySelector('#palettesContainer')
  
  palettesContainer.innerHTML=``;
  for (let i = 0; i < colors.length; i++) {
    let dt = colors[i]
    let backgroundColor;
    let rgbColorFormat = dt;

    if (format == 'hex') {
      backgroundColor = dt;
      rgbColorFormat = hexToRgb(dt).join(', ');

    } else {

      backgroundColor = `rgb(${dt})`;

    }

    let hslColorFormat = rgbToHsl(rgbColorFormat);
    let textColor = isCloseToZero(hslColorFormat[2]) ? '#ffffff' : '#000000';

    let palette = document.createElement('div')
    palette.classList.add('palette')
    palette.setAttribute('onclick', `copyToClipBoard(this)`)
    palette.setAttribute('style', `background-color:${backgroundColor};color:${textColor};`)
    palette.innerHTML=`<span>${dt}</span>`;

    palettesContainer.appendChild(palette)
  }
}


 
   const bgColorInput = document.getElementById('bgColor');
   const textInput = document.getElementById('text');
   const fontInput = document.getElementById('font');
   const imageInput = document.getElementById('image');
   const thumbnailPreview = document.getElementById('thumbnailPreview');
   const thumbnailText = document.getElementById('thumbnailText');
   const thumbnailImage = document.getElementById('thumbnailImage');
   const imageSizeSlider = document.getElementById('imageSize');
   const textSizeSlider = document.getElementById('textSize');
   const imageSizeValue = document.getElementById('imageSizeValue');
   const textSizeValue = document.getElementById('textSizeValue');
   const borderSizeInput = document.getElementById('borderSize');
   const borderColorInput = document.getElementById('borderColor');
   const textColorInput = document.getElementById('textColor');
   const generateBtn = document.getElementById('generateBtn');
   const clearBtn = document.getElementById('clearBtn');
   const downloadBtn = document.getElementById('downloadBtn');

   let isDraggingText = false;
   let isDraggingImage = false;
   let offsetX, offsetY;

   // Size control events
   imageSizeSlider.addEventListener('input', () => {
       const size = imageSizeSlider.value;
       thumbnailImage.style.maxWidth = `${size}%`;
       thumbnailImage.style.maxHeight = `${size}%`;
       imageSizeValue.textContent = `${size}%`;
   });

   textSizeSlider.addEventListener('input', () => {
       const size = textSizeSlider.value;
       thumbnailText.style.fontSize = `${size}px`;
       textSizeValue.textContent = `${size}px`;
   });

   // Border control events
   borderSizeInput.addEventListener('input', () => {
       thumbnailPreview.style.borderWidth = `${borderSizeInput.value}px`;
   });

   borderColorInput.addEventListener('input', () => {
       thumbnailPreview.style.borderColor = borderColorInput.value;
   });

 // Text color event
  textColorInput.addEventListener('input', () => {
    thumbnailText.style.color = textColorInput.value;
});

// Generate button event
generateBtn.addEventListener('click', () => {
    thumbnailPreview.style.backgroundColor = bgColorInput.value;
    thumbnailText.textContent = textInput.value || 'Your Text Here';
    thumbnailText.style.fontFamily = fontInput.value;
    thumbnailText.style.fontSize = `${textSizeSlider.value}px`;
    thumbnailText.style.color = textColorInput.value;
    thumbnailPreview.style.borderWidth = `${borderSizeInput.value}px`;
    thumbnailPreview.style.borderColor = borderColorInput.value;

    const file = imageInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            thumbnailImage.src = e.target.result;
            thumbnailImage.style.display = 'block';
            thumbnailImage.style.maxWidth = `${imageSizeSlider.value}%`;
            thumbnailImage.style.maxHeight = `${imageSizeSlider.value}%`;
        };
        reader.readAsDataURL(file);
    }
});

// Clear button event
clearBtn.addEventListener('click', () => {
    bgColorInput.value = '#2e2e2e';
    textInput.value = '';
    fontInput.value = 'Poppins';
    imageInput.value = '';
    textSizeSlider.value = 40;
    imageSizeSlider.value = 90;
    borderSizeInput.value = 2;
    borderColorInput.value = '#444444';
    textColorInput.value = '#ffffff';
    
    thumbnailPreview.style.backgroundColor = '#2e2e2e';
    thumbnailPreview.style.borderWidth = '2px';
    thumbnailPreview.style.borderColor = '#444444';
    thumbnailImage.style.display = 'none';
    thumbnailText.textContent = 'Your Text Here';
    thumbnailText.style.fontFamily = 'Poppins';
    thumbnailText.style.fontSize = '40px';
    thumbnailText.style.color = '#ffffff';
    thumbnailText.style.left = '';
    thumbnailText.style.top = '';
    
    textSizeValue.textContent = '40px';
    imageSizeValue.textContent = '90%';
});

// Dragging functionality
thumbnailText.addEventListener('mousedown', (e) => {
    isDraggingText = true;
    offsetX = e.clientX - thumbnailText.offsetLeft;
    offsetY = e.clientY - thumbnailText.offsetTop;
});

thumbnailImage.addEventListener('mousedown', (e) => {
    isDraggingImage = true;
    offsetX = e.clientX - thumbnailImage.offsetLeft;
    offsetY = e.clientY - thumbnailImage.offsetTop;
});

document.addEventListener('mousemove', (e) => {
    if (isDraggingText) {
        const rect = thumbnailPreview.getBoundingClientRect();
        const x = e.clientX - rect.left - offsetX;
        const y = e.clientY - rect.top - offsetY;
        thumbnailText.style.left = `${x}px`;
        thumbnailText.style.top = `${y}px`;
        thumbnailText.style.position = 'absolute';
    }
    if (isDraggingImage) {
        const rect = thumbnailPreview.getBoundingClientRect();
        const x = e.clientX - rect.left - offsetX;
        const y = e.clientY - rect.top - offsetY;
        thumbnailImage.style.left = `${x}px`;
        thumbnailImage.style.top = `${y}px`;
        thumbnailImage.style.position = 'absolute';
    }
});

document.addEventListener('mouseup', () => {
    isDraggingText = false;
    isDraggingImage = false;
});

// Download functionality
downloadBtn.addEventListener('click', () => {
    html2canvas(thumbnailPreview, {
        backgroundColor: null,
        scale: 2
    }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'thumbnail.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    });
});
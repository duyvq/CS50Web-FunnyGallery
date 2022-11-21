document.addEventListener('DOMContentLoaded', () => {
  // Upload file using button
  document.querySelector('.ui-btn').addEventListener('click', () => {
    document.querySelector('#file').click()
  })

  // Preview file
  document.querySelector('#file').addEventListener('change', handleFiles)

  // Check and enable submit button
  fileNameA.oninput = () => {
    if (!checkFieldValue(fileNameA, fileA)) {
      button.removeAttribute('disabled')
    } else {
      button.setAttribute('disabled', '')
    }
  }
  fileA.oninput = () => {
    download.removeAttribute('disabled');
    // console.log(checkFieldValue(fileNameA, fileA))
    if (!checkFieldValue(fileNameA, fileA)) {
      button.removeAttribute('disabled')
    } else {
      console.log(checkFieldValue(fileNameA, fileA))
      button.setAttribute('disabled', '')
    }
  }

  // If submit when required fields are not filled, alert. Else, upload file
  button.onclick = (e) => {
    let result = checkFieldValue(fileNameA, fileA);
    if (result) {
      alert(result); 
      e.preventDefault();
    } else {
      e.preventDefault();
      uploadMeme()
    }
  };

  // Download picture to PC
  download.onclick = () => {
    if (fileA.files.length > 0) {
      var link = document.createElement('a')
      link.setAttribute('download', 'picture.jpg');
      link.setAttribute('href', imgBase64.replace("jpeg", "octet-stream"))
      link.click()
    }
  }
});


var button = document.querySelector('form[class=submit-form] > button[type=submit]');
var download = document.querySelector('.download');
var fileNameA = document.querySelector('input[name=fileName]');
var fileA = document.querySelector('#file');
var imgBase64;
var photoDescription = document.querySelector('textarea');

// Variable for adding text to
var img = new Image();
var canvas = document.createElement('canvas');
var ctx = canvas.getContext("2d");
var upperText = '';
document.querySelector('.meme-upper-text').oninput = (e) => {
  upperText = document.querySelector('.meme-upper-text').value; 
  addText();
}
var upperTextSize = 50;
document.querySelector('.upper-text-size').oninput = () => {
  upperTextSize = document.querySelector('.upper-text-size').value;
  addText()
} 
var upperTextColor = 'black';
document.querySelector('.upper-text-color').oninput = () => {
  upperTextColor = document.querySelector('.upper-text-color').value;
  addText()
} 

var lowerText = '';
document.querySelector('.meme-lower-text').oninput = (e) => {
  lowerText = document.querySelector('.meme-lower-text').value; 
  addText()
} 
var lowerTextSize = 50;
document.querySelector('.lower-text-size').oninput = () => {
  lowerTextSize = document.querySelector('.lower-text-size').value;
  addText()
} 
var lowerTextColor = 'black';
document.querySelector('.lower-text-color').oninput = () => {
  lowerTextColor = document.querySelector('.lower-text-color').value;
  addText()
} 

var canvasToInput = document.createElement('textarea');
canvasToInput


function handleFiles() {
  // Get the button "Choose file..." and smt arround
  const tempSave = document.getElementsByClassName('file-card-content meme')[0];
  const mainDiv = document.getElementsByClassName('file-card-wrapper meme')[0];

  // Create button to cancel file
  const cancelButton = document.createElement('div');
  cancelButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16"> <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/> </svg>' 
  cancelButton.className = 'cancel-button';

  // On click, remove file
  cancelButton.onclick = () => {
    console.log('Cancel');
    document.querySelector('#file').value = '';
    canvas.replaceWith(tempSave);
    mainDiv.style.top = '20%';
    cancelButton.innerHTML = '';
  };

  // Temporarily save file into variable
  const [file] = document.querySelector('#file').files

  // Render temp file
  if (file) {
    // Replace element
    tempSave.replaceWith(canvas);
    mainDiv.style.top = 0;
    mainDiv.insertBefore(cancelButton, canvas);

    // Add file url
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(img.src);
    }
    img.onload = drawImageActualSize;

    function drawImageActualSize() {
      // Use the intrinsic size of image in CSS pixels for the canvas element
      canvas.width = this.naturalWidth;
      canvas.height = this.naturalHeight;
    
      // Will draw the image
      ctx.drawImage(this, 0, 0, this.width, this.height);
      addText();
    }
  }
}


function addText() {
  ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight)
  ctx.font = `${upperTextSize}px serif`;
  ctx.fillStyle = upperTextColor;
  console.log(ctx.font)
  console.log(ctx.fillStyle)
  ctx.fillText(upperText, canvas.width/2-(ctx.measureText(upperText).width)/2, upperTextSize);
  ctx.strokeText(upperText, canvas.width/2-(ctx.measureText(upperText).width)/2, upperTextSize);

  ctx.font = `${lowerTextSize}px serif`;
  ctx.fillStyle = lowerTextColor;
  ctx.fillText(lowerText, canvas.width/2-(ctx.measureText(lowerText).width)/2, canvas.height-20);
  ctx.strokeText(lowerText, canvas.width/2-(ctx.measureText(lowerText).width)/2, canvas.height-20);

  imgBase64 = canvas.toDataURL('image/jpeg');
}


function checkFieldValue(fileName, file) {
  if (fileName.value.trim().length <= 0) {
    return 'Title required';
  } else if (file.files.length <= 0) {
    return 'File required';
  } else {
    return false
  }
}


// Get csrf token
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].trim();
          // Does this cookie string begin with the name we want?
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
          }
      }
  }
  return cookieValue;
};


function uploadMeme() {
  const csrftoken = getCookie('csrftoken');
  var filename = fileNameA.value 
  filename.replace(/[^a-zA-Z ]/g, "")
  fetch('/upload_meme', {
    method: 'POST',
    headers: {'X-CSRFToken': csrftoken},
    mode: 'same-origin',
    body: JSON.stringify({
      fileName: filename,
      picture: imgBase64.replace('data:image/jpeg;base64,', ''),
      photoDescription: photoDescription.value,
    })
  })
  .then(response => {
    window.location.href = `${window.location.origin}`;
  })
}
document.getElementById('convert-btn').addEventListener('click', convertImageToHex);
document.getElementById('hex-convert-btn').addEventListener('click', convertHexToImage);

// Function to convert image to hex
function convertImageToHex() {
  const imageInput = document.getElementById('imageInput');
  const downloadBtn = document.getElementById('download-btn');

  if (imageInput.files.length === 0) {
    alert('Please upload an image first!');
    return;
  }

  const file = imageInput.files[0];
  const reader = new FileReader();

  reader.onload = function(event) {
    const arrayBuffer = event.target.result;
    const hexString = arrayBufferToHexString(arrayBuffer);

    // Create a blob from the hex string
    const blob = new Blob([hexString], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    // Set up the download link
    downloadBtn.href = url;
    downloadBtn.style.display = 'inline-block';
  };

  reader.readAsArrayBuffer(file);
}

// Function to convert hex string back to image
function convertHexToImage() {
  const hexInput = document.getElementById('hexInput');
  const imageDownloadBtn = document.getElementById('image-download-btn');

  if (hexInput.files.length === 0) {
    alert('Please upload a hex file first!');
    return;
  }

  const file = hexInput.files[0];
  const reader = new FileReader();

  reader.onload = function(event) {
    const hexString = event.target.result.replace(/\s/g, ''); // Remove any whitespace from the hex string

    try {
      const byteArray = hexToBytes(hexString);

      // Create a blob from the byte array
      const blob = new Blob([byteArray], { type: 'image/jpeg' });
      const url = URL.createObjectURL(blob);

      // Set up the download link for the image
      imageDownloadBtn.href = url;
      imageDownloadBtn.style.display = 'inline-block';
    } catch (error) {
      alert('Invalid hex file!');
    }
  };

  reader.readAsText(file);
}

// Utility function to convert array buffer to hex string
function arrayBufferToHexString(buffer) {
  let hex = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;

  for (let i = 0; i < len; i++) {
    hex += bytes[i].toString(16).padStart(2, '0'); // Convert each byte to hexadecimal
  }

  return hex.toUpperCase(); // Return hex string in uppercase format
}

// Utility function to convert hex string to byte array
function hexToBytes(hex) {
  const bytes = [];
  for (let c = 0; c < hex.length; c += 2) {
    bytes.push(parseInt(hex.substr(c, 2), 16));
  }
  return new Uint8Array(bytes);
}
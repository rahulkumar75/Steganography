// Converts a string to a byte array of base 64 characters
function StringToByteArray(string) {
  let safeBase64String = btoa(unescape(encodeURIComponent(string)));
  let byteArray = [];
  for (let i = 0; i < safeBase64String.length; i++) {
    byteArray.push(safeBase64String.charCodeAt(i));
  }
  return byteArray;
}

// Encodes a string into an image
export function Encode(message, image) {
  // Convert the message into an encodeable format
  let messageBytes = StringToByteArray(message);

  // Add two dummy non-base64 characters at the end to define where the message ends
  messageBytes.push(0);
  messageBytes.push(0);

  // Create and canvas to work on and draw the existing image in it
  let canvas = document.createElement("canvas");
  let ctx = canvas.getContext("2d");
  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;
  ctx.drawImage(image, 0, 0);

  // Get all of the pixel data, because alpha values may make some pixel unsuitible for encoding
  let pixelData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  // Only work on pixels with this alpha value or greater (see note below)
  let alphaConvertLimit = 250;

  // Loop through the image pixels and insert the message data into them
  let pixelIndex = 0;
  let pixel;
  let byteIndex = 0;
  let bitIndex = 0;
  while (
    pixelIndex * 4 < pixelData.data.length &&
    byteIndex < messageBytes.length
  ) {
    // If the alpha channel of the pixel is above the limit, convert it to the maximum and use it.
    // The reason for this is that the lower the alpha value, the more the RGB data is truncated.
    // For example, if the alpha value is 50, setting red to be 150 might result in it being 170.
    // This is done automatically to decrease file size.
    if (pixelData.data[pixelIndex * 4 + 3] >= alphaConvertLimit) {
      // Set the alpha channel to 255
      pixelData.data[pixelIndex * 4 + 3] = 0xff;

      // Set the red, green, and blue channels
      for (let j = 0; j < 3; j++) {
        let old = pixelData.data[pixelIndex * 4 + j];
        if (messageBytes[byteIndex] & (1 << bitIndex)) {
          pixelData.data[pixelIndex * 4 + j] |= 0b00000001;
        } else {
          pixelData.data[pixelIndex * 4 + j] &= 0b11111110;
        }

        bitIndex++;
        if (bitIndex == 8) {
          byteIndex++;
          bitIndex = 0;
        }
      }
    }

    pixelIndex++;
  }

  // Put the modified data back into the image
  ctx.putImageData(pixelData, 0, 0);

  return {
    dataURL: canvas.toDataURL(),
    messageTruncated: byteIndex < messageBytes.length,
  };
}

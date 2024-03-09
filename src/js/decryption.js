// Converts a byte array of base 64 characters to a string
function ByteArrayToString(byteArray) {
  let string = "";
  for (let i = 0; i < byteArray.length; i++) {
    string += String.fromCharCode(byteArray[i]);
  }
  return decodeURIComponent(escape(atob(string)));
}

// Decodes a string hidden in an image (if there is one)
export function Decode(image) {
  // Create and canvas to work on and draw the existing image in it
  let canvas = document.createElement("canvas");
  let ctx = canvas.getContext("2d");
  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;
  ctx.drawImage(image, 0, 0);

  // Get the pixel data for the relevant parts of the image
  let pixelData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  // Any non-base 64 charcters found are not part of the message
  let base64Characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

  // Only decode pixels at or above this alpha value (see note in Encode() function)
  let alphaConvertLimit = 250;

  // Loop through the message bytes and insert the into the image
  let byteIndex = 0;
  let bitIndex = 0;
  let currentCharacter = 0;
  let decodedCharacters = [];
  for (let i = 0; i < pixelData.data.length; i += 4) {
    // If any non-base 64 characters are encountered, the message is complete
    if (
      decodedCharacters.length > 0 &&
      base64Characters.indexOf(
        String.fromCharCode(decodedCharacters[decodedCharacters.length - 1])
      ) === -1
    ) {
      decodedCharacters = decodedCharacters.slice(
        0,
        decodedCharacters.length - 1
      );
      break;
    }

    // As with encoding, only read pixels with sufficient alpha value
    if (pixelData.data[i + 3] >= alphaConvertLimit) {
      // Read the red, green, and blue channels
      for (let j = 0; j < 3; j++) {
        if (pixelData.data[i + j] & 1) {
          currentCharacter |= 1 << bitIndex;
        }

        bitIndex++;
        if (bitIndex == 8) {
          byteIndex++;
          bitIndex = 0;

          decodedCharacters.push(currentCharacter);
          currentCharacter = 0;
        }
      }
    }
  }

  return ByteArrayToString(decodedCharacters);
}

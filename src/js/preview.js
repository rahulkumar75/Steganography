import { elements } from "./dom";

//Image Preview Logic
// Reads an image from an HTML input element
export function ParseImageFromFileInput(input) {
  if (input.files && input.files[0]) {
    const fromWhereItHitted = input.name;
    LoadImage(input.files[0], fromWhereItHitted);
  }
}
// Loads an image from the given URL, so that it can be decoded or encoded
function LoadImage(imageData, hittedElem) {
  let fileReader = new FileReader();
  fileReader.onload = function (e) {
    ImageLoaded(e.target.result, hittedElem);
  };
  fileReader.readAsDataURL(imageData);
}

function ImageLoaded(imageSrc, ele) {
  // Display the loaded image, clear existing output, and enable encoding/decoding

  if (ele === "encry-preview-upload") {
    elements.encryptKeyBox.style.display = "flex";
    elements.previewImageEncry.setAttribute("src", imageSrc);
    elements.encryptBtn.disabled = false;
  }
  if (ele === "decry-preview-upload") {
    elements.decryptKeyBox.style.display = "flex";
    elements.previewImageDecry.setAttribute("src", imageSrc);
    elements.decryptBtn.disabled = false;
  }
}

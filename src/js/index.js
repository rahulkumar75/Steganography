import { elements } from "./dom";
import { toggle } from "./toggle";
import { ParseImageFromFileInput } from "./preview";
import { Encode } from "./encryption";
import { Decode } from "./decryption";
const CryptoJS = require("crypto-js");

//Toggle Function Run
toggle();

//Image Preview Events
elements.inputImageEncry.addEventListener("change", function (input) {
  ParseImageFromFileInput(input.target);
});
elements.inputImageDecry.addEventListener("change", (e) => {
  ParseImageFromFileInput(e.target);
});

// Setup encode and decode buttons
elements.encryptBtn.onclick = () => {
  //text encryption
  const encryKey = elements.inputKeyEncry.value;
  const plainText = elements.inputText.value;
  if (!plainText) {
    alert("Please Enter Your Seceret Message !");
    return;
  }
  if (!encryKey) {
    alert("Please Enter Key For Encryption !");
    return;
  }
  elements.messageBoxEncry.style.display = `flex`;
  const encryptedText = CryptoJS.AES.encrypt(plainText, encryKey).toString();
  console.log("Encrypted Text : " + encryptedText);
  //encrypted text encode in image
  let result = Encode(encryptedText, previewImageEncry);

  setTimeout(() => {
    const markup = `<p class="message-text">
    Encrypted Successfully 🚀 .... Click below 👇 to download the image.
  </p>
  <a
    href="${result.dataURL}"
    class="download-btn"
    id="download-btn"
    download="encrypted_image_${encryKey}.png"
    >Download</a
  >`;
    elements.messageBoxEncry.innerHTML = markup;
  }, 2000);

  if (result.messageTruncated) {
    alert(
      "Message was too large for the image provided and has been truncated"
    );
  }
};

//Decryption Click
elements.decryptBtn.onclick = () => {
  //text Decryption
  const decryKey = elements.inputKeyDecry.value;

  let decryptresult = Decode(elements.previewImageDecry);
  console.log("Decrypted Text : " + decryptresult);

  if (!decryptresult) {
    elements.messageBoxDecry.style.display = `flex`;
    elements.messageBoxDecry.innerHTML = `<p class="message-seceret">No message found 😐</p>`;
    return;
  }
  if (!decryKey) {
    alert("Please Enter Key For Decryption !");
    return;
  }
  const preresult = CryptoJS.AES.decrypt(decryptresult, decryKey);
  const result = preresult.toString(CryptoJS.enc.Utf8);

  //after decryptio showing mseesage

  elements.messageBoxDecry.style.display = `flex`;
  setTimeout(() => {
    if (result) {
      elements.messageBoxDecry.innerHTML = `<p class="message-text">Your Seceret message 😊 :</p>
      <p class="message-seceret">${result}</p>`;
    } else {
      elements.messageBoxDecry.innerHTML = `<p class="message-seceret">Incorrect Key 🔑</p>`;
    }
  }, 2000);
};

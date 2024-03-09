import { elements } from "./dom";

export const toggle = () => {
  elements.toggEncryBtn.addEventListener("click", () => {
    elements.toggDecryBtn.classList.remove("toggle-active");
    elements.toggEncryBtn.classList.add("toggle-active");
    elements.encryBox.classList.remove("inactive-box");
    elements.decryBox.classList.add("inactive-box");
  });

  elements.toggDecryBtn.addEventListener("click", () => {
    elements.toggEncryBtn.classList.remove("toggle-active");
    elements.toggDecryBtn.classList.add("toggle-active");
    elements.decryBox.classList.remove("inactive-box");
    elements.encryBox.classList.add("inactive-box");
  });
};

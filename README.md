# Image Encryption and Decryption Tool 
# Live URL: https://stegoimage.netlify.app/
You can access the live version of the website [Stego-image].
This project provides a web-based tool that allows users to encrypt and decrypt text messages within images. It uses the CryptoJS library for AES encryption and decryption, providing secure handling of text data. The project also includes features for previewing images, encoding encrypted messages into images, and decoding them back.

# Key Features
* Image Preview: Allows users to preview images before encoding or decoding.
* Text Encryption: Encrypts user-provided text using a key and encodes the encrypted text into an image.
* Text Decryption: Decodes the encrypted text from an image and decrypts it using a key.
* Download Encrypted Image: Provides the option to download the image with the encoded message.
* User Alerts: Alerts users if required inputs (text or key) are missing or if the message is too large for the image.

# Event Listeners and Main Functionality
* Image Preview Events:
  - Listens for changes in the image file inputs and displays the selected images for encryption and decryption.
* Encryption Setup:
  - Listens for the encryption button click.
  - Validates the presence of text and key inputs.
  - Encrypts the text using the AES algorithm from CryptoJS.
  - Encodes the encrypted text into the image.
  - Displays a success message and a download link for the encrypted image.
* Decryption Setup:
  - Listens for the decryption button click.
  - Validates the presence of the key input.
  - Decodes the encrypted text from the image.
  - Decrypts the text using the AES algorithm from CryptoJS.
  - Displays the decrypted message or an error message if the key is incorrect.
    
# Usage
* Encrypt a Message:
  - Select an image file for preview.
  - Enter the text message you want to encrypt.
  - Enter a key for encryption.
  - Click the encrypt button to encrypt the text and encode it into the image.
  - Download the encrypted image using the provided link.
    
* Decrypt a Message:

  - Select an image file containing the encrypted message for preview.
  - Enter the key used for encryption.
  - Click the decrypt button to decode and decrypt the message from the image.
  - View the decrypted message in the message box.

# How to Run
1. Clone the Repository:
git clone https://github.com/yourusername/image-encryption-tool.git

2. Install Dependencies:
  -Ensure you have npm installed, then run:
  - npm install
    
3. Run the Application:
npm start
4. Access the Application:
Open your browser and navigate to http://localhost:3000.

# Future Enhancements
* Advanced Image Processing: Improve encoding and decoding efficiency.
* Additional Encryption Algorithms: Provide more encryption options besides AES.
* Enhanced UI/UX: Improve the design and user experience with advanced styling and animations.
* Error Handling: Implement more robust error handling and user feedback mechanisms.

# Contributors
Name: Rahul Kumar



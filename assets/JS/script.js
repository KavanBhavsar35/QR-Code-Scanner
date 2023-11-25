// Function to create a ripple effect on button click
function createRipple(event) {
  const button = event.currentTarget;
  const circle = document.createElement("span");
  const diameter = Math.max(button.clientWidth, button.clientHeight);
  const radius = diameter / 2;

  // Set up styles for the ripple effect
  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
  circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
  circle.classList.add("ripple");

  // Remove existing ripples
  const ripple = button.getElementsByClassName("ripple")[0];
  if (ripple) {
      ripple.remove();
  }

  // Append the new ripple
  button.appendChild(circle);
}
function stopScanner() {
  scanner.stop().then((ignore) => {
      console.log("QR Code scanning stopped");
      scanner.clear();
  }).catch((err) => {
      console.log(`Error stopping QR Code scanning: ${err}`);
  });
}
document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.getElementsByClassName("qr");
  for (const button of buttons) {
      button.addEventListener("click", createRipple);
  }

  const html5QrCode = new Html5Qrcode(/* element id */ "reader");
  const fileInput = document.getElementById('qr-input-file');
  const uploadFileLink = document.getElementById('uploadFileLink');
  const qrContainer = document.getElementById('qrContainer');
  const reader = document.getElementById('reader');
  const resultDiv = document.getElementById('resultContent');
  const closeScannerButton = document.getElementById('closeScanner');
  const closeScannerButton2 = document.getElementById('closeScanner2');
  
  qrContainer.addEventListener('click', function () {
      let scannerOpen=true;
      const spinnerContainer = document.querySelector('.spinner-container');
      spinnerContainer.classList.remove('d-none');
      Html5Qrcode.getCameras().then(devices => {
          if (devices && devices.length) {
              cameraId = devices[0].id;
              console.log(cameraId);
              spinnerContainer.classList.add('d-none');

              const scanner = new Html5Qrcode(/* element id */ "reader2");
              const config = { fps: 60, qrbox: { width: 250, height: 250 }, aspectRatio: 1 };
              const modal = document.getElementById('scanner')
              scanner.start({facingMode:"environment"},
                  cameraId,
                  config,
                  (decodedText, decodedResult) => {
                      scanner.stop();
                      description.classList.add('d-none')
                      result.classList.remove('d-none')
                      document.getElementById('modalClose').click();
                      spinnerContainer.classList.add('d-none');

                      resultDiv.innerHTML = `
              <a href='${decodedText}' target='_blank'>${decodedText}</a>
            `;
                      // setTimeout(() => {
                      //     scanner.clear();
                      //     // document.getElementById("reader2").remove();
                      // }, 1000);
                  },
                  (errorMessage) => {
                      console.log(errorMessage);
                  }).catch((err) => {
                      console.log(err);
                  }
              );
              closeScannerButton.addEventListener('click', function () {
                  if (scannerOpen==true){
                      scanner.stop().then((ignore) => {
                          console.log("QR Code scanning stopped");
                          scannerOpen=false;
                          scanner.clear();
                      }).catch((err) => {
                          console.log(`Error stopping QR Code scanning: ${err}`);
                      });
                  }
              });
              closeScannerButton2.addEventListener('click', function () {
                  if (scannerOpen==true){
                      scanner.stop().then((ignore) => {
                          console.log("QR Code scanning stopped");
                          scannerOpen=false;
                          scanner.clear();
                      }).catch((err) => {
                          console.log(`Error stopping QR Code scanning: ${err}`);
                      });
                  }
              });
              
          }
      }).catch(err => {
          console.log(err);
      });
      

  });

  // Event listener for handling file input change
  fileInput.addEventListener('change', e => {
      if (e.target.files.length == 0) {
          return;
      }

      const imageFile = e.target.files[0];
      document.getElementById('qrContainer').style.display = 'none';
      document.getElementById('reader').style.display = 'block';
      document.getElementById('description').classList.add('d-none')
      document.getElementById('result').classList.remove('d-none')
      html5QrCode.scanFile(imageFile, true)
          .then(decodedText => {
              resultDiv.innerHTML = `
          <a href='${decodedText}' target='_blank'>${decodedText}</a>
        `;
          })
          .catch(err => {
              console.log(`Error scanning file. Reason: ${err}`);
          });
  });
});
// deleting file and clearing output
document.addEventListener('DOMContentLoaded', function () {
  const fileInput = document.getElementById('qr-input-file');
  const deleteIcon = document.getElementById('deleteIcon');
  const qrContainer = document.getElementById('qrContainer');
  const reader = document.getElementById('reader');
  // Event listener for delete icon

  deleteIcon.addEventListener('click', function () {
      // Clear the file input value
      fileInput.value = '';

      // Remove the QR code container and its contents
      if (reader) {
          reader.innerHTML = ''; // Clear the contents inside the QR container
          // qrContainer.style.display = 'none'; // Hide the QR container
          qrContainer.style.display = 'block';
          document.getElementById('reader').style.display = 'none';
          document.getElementById('description').classList.remove('d-none')
          document.getElementById('result').classList.add('d-none')
      }
  });
});
// Additional event listeners or logic as needed
// ...
document.addEventListener('DOMContentLoaded', function () {
  uploadFileLink.addEventListener('click', function () {
      fileInput.click();
  });
  // Update the "year" span to the current year
  const yearSpan = document.getElementById("year");
  let currentYear = new Date().getFullYear();
  yearSpan.textContent = currentYear;
});

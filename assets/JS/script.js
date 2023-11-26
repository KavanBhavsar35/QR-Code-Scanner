function createRipple(event) {
  const button = event.currentTarget;
  const circle = document.createElement("span");
  const diameter = Math.max(button.clientWidth, button.clientHeight);
  const radius = diameter / 2;

  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
  circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
  circle.classList.add("ripple");

  // Remove existing ripples
  const ripple = button.getElementsByClassName("ripple")[0];
  if (ripple) {
      ripple.remove();
  }

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
  const description = document.getElementById('description');
  const result = document.getElementById('result');
  const deleteIcon = document.getElementById('deleteIcon');

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
              const qrCodeSuccessCallback = (decodedText, decodedResult) => {
                    scanner.stop();
                    description.classList.add('d-none')
                    result.classList.remove('d-none')
                    document.getElementById('modalClose').click();
                    spinnerContainer.classList.add('d-none');
                    resultDiv.innerHTML = `
                        <a href='${decodedText}' target='_blank'>${decodedText}</a>
                    `;
            };
              const config = { fps: 60, qrbox: { width: 250, height: 250 }, aspectRatio: 1 };
              const modal = document.getElementById('scanner')
              scanner.start({facingMode:"environment"},
                //   cameraId,
                  config,
                  qrCodeSuccessCallback,
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

  fileInput.addEventListener('change', e => {
      if (e.target.files.length == 0) {
          return;
      }

      const imageFile = e.target.files[0];

      qrContainer.style.display='none'
      reader.style.display='block';
      description.classList.add('d-none')
      result.classList.remove('d-none')
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

  deleteIcon.addEventListener('click', function () {
      // Clear the file input value
      fileInput.value = '';

      // Remove the QR code container and its contents
      if (reader) {
          reader.innerHTML = ''; 
          qrContainer.style.display = 'block';
          reader.style.display = 'none';
          description.classList.remove('d-none')
          result.classList.add('d-none')
      }
  });
});

document.addEventListener('DOMContentLoaded', function () {
  uploadFileLink.addEventListener('click', function () {
      fileInput.click();
  });
  // Update the "year" span to the current year
  const yearSpan = document.getElementById("year");
  let currentYear = new Date().getFullYear();
  yearSpan.textContent = currentYear;
});

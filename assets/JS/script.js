
function createRipple(event) {
const button = event.currentTarget;

const circle = document.createElement("span");
const diameter = Math.max(button.clientWidth, button.clientHeight);
const radius = diameter / 2;

circle.style.width = circle.style.height = `${diameter}px`;
circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
circle.classList.add("ripple");

const ripple = button.getElementsByClassName("ripple")[0];

if (ripple) {
  ripple.remove();
}

button.appendChild(circle);
}

document.addEventListener("DOMContentLoaded", function() {
// Your JavaScript code here
const buttons = document.getElementsByClassName("qr");
for (const button of buttons) {
button.addEventListener("click", createRipple);
}
});

document.addEventListener("DOMContentLoaded", function () {
  let qr = document.getElementById("qr");
  let resultDiv = document.getElementById("result");
  let cameraId;
  let result;

  qr.addEventListener('click', function () {
    Html5Qrcode.getCameras().then(devices => {
      if (devices && devices.length) {
        cameraId = devices[0].id;
        console.log(cameraId);
        const scanner = new Html5Qrcode(/* element id */ "reader");
        const config = { fps: 10, qrbox: { width: 250, height: 250 }, facingMode: "environment" , aspectRatio:1};
        
        scanner.start(
          cameraId,
          config,
          (decodedText, decodedResult) => {
            scanner.stop();
            resultDiv.innerHTML = `
              <h2>Success</h2>
              <p><a href='${decodedText}' target='_blank'>${decodedText}</a></p> 
            `;
            setTimeout(() => {
              scanner.clear();
              document.getElementById("reader").remove();
            }, 1000);
          },
          (errorMessage) => {
            console.log(errorMessage);
          }).catch((err) => {
            console.log(err);
          });
      }
    }).catch(err => {
      console.log(err);
    });
  });

  const html5QrCode = new Html5Qrcode(/* element id */ "reader");
  const fileinput = document.getElementById('qr-input-file');
  
  fileinput.addEventListener('change', e => {
    if (e.target.files.length == 0) {
      return;
    }

    const imageFile = e.target.files[0];
    html5QrCode.scanFile(imageFile, true)
      .then(decodedText => {
        resultDiv.innerHTML = `
        <h2>Success</h2>
        <p><a href='${decodedText}' target='_blank'>${decodedText}</a></p> 
      `;
      })
      .catch(err => {
        console.log(`Error scanning file. Reason: ${err}`);
      });
  });
});
document.addEventListener('DOMContentLoaded', function () {
  const fileInput = document.getElementById('qr-input-file');
  const deleteIcon = document.getElementById('deleteIcon');
  const qrContainer = document.getElementById('reader');
  // Event listener for delete icon
  deleteIcon.addEventListener('click', function () {
    // Clear the file input value
    fileInput.value = '';

    // You can add additional logic here if needed

    console.log('File input cleared');
  });


  const yearSpan = document.getElementById("year");
  let currentYear = new Date().getFullYear();
  yearSpan.textContent = currentYear;
});


document.addEventListener('DOMContentLoaded', function() {
  const videoElement = document.getElementById('barcode-scanner');
  const textResultElement = document.getElementById('text_result');
  const ecoscoreImageDiv = document.getElementById('ecoscore_image');
  const imgResultElement = document.getElementById('img_result'); 
  let isScanning = false;
  let stream = null;

  function updateScannedCodesCount() {
      const scannedCodes = JSON.parse(localStorage.getItem('scannedCodes')) || [];
      const countElement = document.getElementById('scannedCodesCount');
      countElement.innerText = `Nombre de codes scannés : ${scannedCodes.length}`;
  }

  document.getElementById('clear-local-storage').addEventListener('click', function() {
      localStorage.clear(); 
      alert('Le stockage local a été vidé.'); 
      updateScannedCodesCount();
  });

  videoElement.setAttribute('playsinline', 'true');
  videoElement.setAttribute('webkit-playsinline', 'true');
  videoElement.setAttribute('disablePictureInPicture', 'true');
  videoElement.style.objectFit = 'cover';

  const imagePaths = {
      'a': 'public/img/icons/Picto_A.png',
      'b': 'public/img/icons/Picto_B.png',
      'c': 'public/img/icons/Picto_C.png',
      'd': 'public/img/icons/Picto_D.png',
      'e': 'public/img/icons/Picto_E.png'
  };

  function clearImages() {
      ecoscoreImageDiv.innerHTML = ''; 
      imgResultElement.innerHTML = ''; 
  }

  function initCamera() {
      navigator.mediaDevices.getUserMedia({
          video: {
              facingMode: 'environment',
              width: { ideal: 1280 },
              height: { ideal: 720 }
          }
      }).then(function(localStream) {
          stream = localStream;
          videoElement.srcObject = stream;
          videoElement.play();
          startScanner();
      }).catch(function(error) {
          console.error('Erreur lors de l\'accès à la caméra:', error);
      });
  }

  function startScanner() {
      if (!stream) {
          console.error('La caméra n\'est pas initialisée.');
          return;
      }

      if (isScanning) {
          console.log('Le scanner est déjà en cours.');
          return;
      }

      Quagga.init({
          inputStream: {
              name: "Live",
              type: "LiveStream",
              target: videoElement,
              constraints: {
                  facingMode: "environment",
                  width: { ideal: 1280 },
                  height: { ideal: 720 }
              },
          },
          decoder: {
              readers: ['ean_reader']
          }
      }, function(err) {
          if (err) {
              console.error(err);
              return;
          }
          Quagga.start();
      });

      Quagga.onDetected(function(barcodeScanner) {
          if (!isScanning) {
              isScanning = true;

              const scannedCode = barcodeScanner.codeResult.code;
              console.log("Code du produit scanné:", scannedCode); 
              textResultElement.innerText = 'Scanning...';

              const openFoodFactsApiUrl = `https://world.openfoodfacts.org/api/v0/product/${scannedCode}.json`;

              fetch(openFoodFactsApiUrl)
                  .then(response => response.json())
                  .then(data => {
                      if (data.status === 0) {
                          textResultElement.innerText = 'Produit non trouvé';
                          clearImages();
                          isScanning = false;
                          return;
                      }
                      saveScannedCode(scannedCode);

                      let productData = data.product;
                      let productName = productData.product_name || 'null';
                      let brand = productData.brands || 'null';
                      let ecoscore = productData.ecoscore_score || 'null';
                      let ecoscoreGrade = productData.ecoscore_grade || 'null';
                      let origins = productData.origins || 'null';
                      let displayText = `Code: ${scannedCode}\n${productName}\n${brand}\nOrigine: ${origins}\nEcoscore: ${ecoscore}`;
                      textResultElement.innerText = displayText;

                      if (ecoscoreGrade && imagePaths[ecoscoreGrade.toLowerCase()]) {
                          let ecoscoreImageElement = document.createElement('img');
                          ecoscoreImageElement.src = imagePaths[ecoscoreGrade.toLowerCase()];
                          ecoscoreImageElement.alt = "Eco-score image";
                          ecoscoreImageElement.style.borderRadius = '0.4em';
                          ecoscoreImageElement.style.height = '30px'; 
                          ecoscoreImageElement.style.width = 'auto'; 
                          ecoscoreImageElement.style.display = 'block';
                          ecoscoreImageElement.style.objectFit = 'scale-down';

                          ecoscoreImageDiv.appendChild(ecoscoreImageElement);
                      }

                      if (productData.image_url) {
                          let imgElement = document.createElement('img');
                          imgElement.src = productData.image_url;
                          imgElement.alt = "Image du produit";
                          imgElement.style.maxWidth = '100%';
                          imgElement.style.height = 'auto';
                          imgElement.style.display = 'block';
                          imgElement.style.objectFit = 'contain';
                          imgElement.style.borderRadius = '0.5em';

                          imgResultElement.appendChild(imgElement);
                      }
                  })
                  .catch(error => {
                      console.error('Erreur lors de la requête à Open Food Facts:', error);
                      textResultElement.innerText = 'Erreur lors de la requête à Open Food Facts';
                      clearImages(); 
                  })
                  .finally(() => {
                      setTimeout(() => { isScanning = false; }, 2000);
                  });
          }
      });
  }

  function saveScannedCode(code) {
      let scannedCodes = JSON.parse(localStorage.getItem('scannedCodes')) || [];
      if (scannedCodes.length >= 2000) {
          if (confirm('La liste des codes scannés a atteint 2000 éléments. Voulez-vous télécharger et vider la liste avant de continuer ?')) {
              downloadScannedCodes();
              scannedCodes = []; 
              updateScannedCodesCount();
          }
      }

      if (!scannedCodes.includes(code)) {
          scannedCodes.push(code);
          localStorage.setItem('scannedCodes', JSON.stringify(scannedCodes));
          updateScannedCodesCount(); 
      }
  }

  function downloadScannedCodes() {
      const scannedCodes = localStorage.getItem('scannedCodes');
      if (scannedCodes) {
          const blob = new Blob([scannedCodes], { type: 'application/json' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'scanned-codes.json';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
      }
      localStorage.clear();
      updateScannedCodesCount();
  }

  document.getElementById('download-scanned-codes').addEventListener('click', function() {
      downloadScannedCodes();
  });

  initCamera();
  updateScannedCodesCount();
});

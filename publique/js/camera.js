document.addEventListener('DOMContentLoaded', function() {
  const videoElement = document.getElementById('barcode-scanner');
  const resultElement = document.getElementById('result');
  let isScanning = false;

  // Sauvegarde des fonctions console originales
  const originalConsoleLog = console.log;
  const originalConsoleError = console.error;

  // Surcharge de console.log
  console.log = function(...messages) {
    originalConsoleLog(...messages);
    resultElement.innerText += messages.join(' ') + '\n';
    resultElement.classList.add('blink-bg'); // Ajoute un effet de clignotement
    setTimeout(() => {
      resultElement.classList.remove('blink-bg'); // Supprime le clignotement après 1 seconde
    }, 1000);
  };

  // Surcharge de console.error
  console.error = function(...messages) {
    originalConsoleError(...messages);
    resultElement.innerText += 'Erreur : ' + messages.join(' ') + '\n';
    resultElement.style.backgroundColor = 'lightcoral'; // Change la couleur de fond pour les erreurs
  };

  videoElement.setAttribute('playsinline', 'true');
  videoElement.setAttribute('webkit-playsinline', 'true');
  videoElement.setAttribute('disablePictureInPicture', 'true');
  videoElement.style.objectFit = 'cover';

  navigator.mediaDevices.getUserMedia({
    video: {
      facingMode: 'environment',
      width: { ideal: 1280 },
      height: { ideal: 720 }
    }
  })
  .then(function(stream) {
    videoElement.srcObject = stream;
    videoElement.play();
    const track = stream.getVideoTracks()[0];
    if (track && track.getCapabilities) {
      const capabilities = track.getCapabilities();
      if (capabilities.torch) {
        track.applyConstraints({
          advanced: [{ torch: true }]
        });
      }
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
      if (isScanning) return;
      isScanning = true;

      const openFoodFactsApiUrl = `https://world.openfoodfacts.org/api/v0/product/${barcodeScanner.codeResult.code}.json`;

      fetch(openFoodFactsApiUrl)
        .then(response => response.json())
        .then(data => {
          console.log('Données Open Food Facts :', data);
          let productData = data.product;
          let ecoscore = productData.ecoscore_score || 'Non disponible';
          let countryOfOrigin = productData.countries || 'Non disponible';
          let displayText = `Code-barres détecté : ${barcodeScanner.codeResult.code}\nEcoscore: ${ecoscore}\nPays de provenance: ${countryOfOrigin}`;
          document.getElementById('result').innerText = displayText;
        })
        .catch(error => {
          console.error('Erreur lors de la requête à Open Food Facts :', error);
        })
        .finally(() => {
          setTimeout(() => { isScanning = false; }, 2000);
        });
    });
  })
  .catch(function(error) {
    console.error('Erreur lors de l\'accès à la caméra :', error);
  });
});

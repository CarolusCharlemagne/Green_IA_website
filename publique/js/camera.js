document.addEventListener('DOMContentLoaded', function() {
    const videoElement = document.getElementById('barcode-scanner'); 

    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
      .then(function(stream) {
        videoElement.srcObject = stream;
        videoElement.play();

        Quagga.init({
          inputStream: {
            name: "Live",
            type: "LiveStream",
            target: videoElement, 
            constraints: {
              facingMode: "environment"
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
          Quagga.stop();
          stream.getTracks().forEach(track => track.stop());

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
          });
        
        });
      })
      .catch(function(error) {
        console.error('Erreur lors de l\'accès à la caméra :', error);
      });
});
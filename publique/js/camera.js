document.addEventListener('DOMContentLoaded', function() {
    const videoElement = document.getElementById('barcode-scanner');
    // Mise à jour pour utiliser l'élément de texte correct
    const textResultElement = document.getElementById('text_result');
    let isScanning = false;

    const originalConsoleLog = console.log;
    const originalConsoleError = console.error;

    console.log = function(...messages) {
        originalConsoleLog(...messages);
        // Utilisation de textResultElement pour le texte
        textResultElement.innerText = messages.join(' ') + '\n'; 
        textResultElement.classList.add('blink-bg');
        textResultElement.style.backgroundColor = ''; 
        setTimeout(() => {
            textResultElement.classList.remove('blink-bg');
        }, 1000);
    };

    console.error = function(...messages) {
        originalConsoleError(...messages);
        // Utilisation de textResultElement pour afficher les erreurs
        textResultElement.innerText = 'Erreur : ' + messages.join(' ') + '\n';
        textResultElement.style.backgroundColor = 'lightcoral';
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
                    let productData = data.product;
                    let ecoscore = productData.ecoscore_score || 'Non disponible';
                    let countryOfOrigin = productData.countries || 'Non disponible';
                    let displayText = `Code-barres détecté : ${barcodeScanner.codeResult.code}\nEcoscore: ${ecoscore}\nPays de provenance: ${countryOfOrigin}`;
                    // Mise à jour du textResultElement avec les données
                    textResultElement.innerText = displayText;
                })
                .catch(error => {
                    console.error('Erreur lors de la requête à Open Food Facts :', error);
                    textResultElement.classList.add('blink-bg-red'); 
                    setTimeout(() => {
                        textResultElement.classList.remove('blink-bg-red'); 
                    }, 1000);
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

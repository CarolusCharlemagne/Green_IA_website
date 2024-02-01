document.addEventListener('DOMContentLoaded', function() {
    const videoElement = document.getElementById('barcode-scanner');
    const textResultElement = document.getElementById('text_result');
    let isScanning = false;
    let stream = null;

    // Redéfinition des méthodes console.log et console.error (le reste du code reste inchangé)

    // Configuration de l'élément vidéo
    videoElement.setAttribute('playsinline', 'true');
    videoElement.setAttribute('webkit-playsinline', 'true');
    videoElement.setAttribute('disablePictureInPicture', 'true');
    videoElement.style.objectFit = 'cover';

    // Fonction pour initialiser la caméra une seule fois
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

            const track = stream.getVideoTracks()[0];
            if (track && track.getCapabilities) {
                const capabilities = track.getCapabilities();
                if (capabilities.torch) {
                    track.applyConstraints({
                        advanced: [{ torch: true }]
                    });
                }
            }
            
            // Démarrer le scanner immédiatement après avoir initialisé la caméra
            startScanner();
        }).catch(function(error) {
            console.error('Erreur lors de l\'accès à la caméra:', error);
        });
    }

    // Fonction pour démarrer le scanner avec le flux vidéo déjà initialisé
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

                const openFoodFactsApiUrl = `https://world.openfoodfacts.org/api/v0/product/${barcodeScanner.codeResult.code}.json`;

                fetch(openFoodFactsApiUrl)
                    .then(response => response.json())
                    .then(data => {
                        if (data.status === 0) {
                            textResultElement.innerText = 'Produit non trouvé';
                            isScanning = false;
                            return;
                        }
                        let productData = data.product;
                        let productName = productData.product_name || '';
                        let brand = productData.brands || '';
                        let ecoscore = productData.ecoscore_score || '';
                        let ecoscoreGrade = productData.ecoscore_grade || '';
                        let displayText = `${productName}\n${brand}\n${ecoscore}\n${ecoscoreGrade}`;
                        textResultElement.innerText = displayText;

                        if (productData.image_url) {
                            let imgElement = document.createElement('img');
                            imgElement.src = productData.image_url;
                            imgElement.alt = "Image du produit";
                            imgElement.style.maxWidth = '100%';
                            imgElement.style.height = 'auto';
                            imgElement.style.display = 'block';
                            imgElement.style.objectFit = 'contain';

                            let imgResultElement = document.getElementById('img_result');
                            imgResultElement.innerHTML = '';
                            imgResultElement.appendChild(imgElement);
                        }
                    })
                    .catch(error => {
                        console.error('Erreur lors de la requête à Open Food Facts:', error);
                        textResultElement.innerText = 'Erreur lors de la requête à Open Food Facts';
                    })
                    .finally(() => {
                        setTimeout(() => { isScanning = false; }, 2000);
                    });
            }
        });
    }

    // Initialisation de la caméra au chargement du DOM
    initCamera();
});

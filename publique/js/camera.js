document.addEventListener('DOMContentLoaded', function() {
    const videoElement = document.getElementById('barcode-scanner');
    const textResultElement = document.getElementById('text_result');
    const imgResultElement = document.getElementById('img_result');
    let isScanning = false;
    let isFlashEnabled = false;
    let track;

    const imageMapping = {
        'a': 'img/icons/Eco-score_A.svg',
        'b': 'img/icons/Eco-score_B.svg',
        'c': 'img/icons/Eco-score_C.svg',
        'd': 'img/icons/Eco-score_D.svg',
        'e': 'img/icons/Eco-score_E.svg'
    };

    const resultElement = document.querySelector('.result');

    function triggerBlinkAnimation(isError = false) {
        const animationClass = isError ? 'blink-bg-red' : 'blink-bg-blue';

        // Force reflow/repaint pour réinitialiser l'animation
        resultElement.classList.remove('blink-bg-blue', 'blink-bg-red');
        // Ceci force le navigateur à reconnaître le changement
        void resultElement.offsetWidth; 

        resultElement.classList.add(animationClass);

        // Retirer la classe après que l'animation soit terminée
        setTimeout(() => {
            resultElement.classList.remove(animationClass);
        }, 1000); // Durée de l'animation CSS
    }

    // Remplacement des fonctions console originales pour déclencher le clignotement
    const originalConsoleLog = console.log;
    const originalConsoleError = console.error;
    
    console.log = function(...messages) {
        originalConsoleLog(...messages);
        triggerBlinkAnimation(); // Clignotement bleu
    };
    
    console.error = function(...messages) {
        originalConsoleError(...messages);
        triggerBlinkAnimation(true); // Clignotement rouge
    };

    videoElement.setAttribute('playsinline', 'true');
    videoElement.setAttribute('webkit-playsinline', 'true');
    videoElement.setAttribute('disablePictureInPicture', 'true');
    videoElement.style.objectFit = 'cover';

    if (!localStorage.getItem('cameraPermissionGranted')) {
        requestCameraAccess();
    } else {
        setupCamera();
    }

    function requestCameraAccess() {
        navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: 'environment',
                width: { ideal: 1280 },
                height: { ideal: 720 }
            }
        })
        .then(function(stream) {
            localStorage.setItem('cameraPermissionGranted', 'true');
            setupCamera(stream);
        })
        .catch(function(error) {
            console.error('Erreur lors de l\'accès à la caméra :', error);
        });
    }

    function setupCamera(stream) {
        if (!stream) {
            return requestCameraAccess();
        }
        videoElement.srcObject = stream;
        videoElement.play();
        track = stream.getVideoTracks()[0];
        initiateScanner(stream);
    }

    function toggleFlash() {
        isFlashEnabled = !isFlashEnabled;
        if (track && track.applyConstraints) {
            track.applyConstraints({
                advanced: [{ torch: isFlashEnabled }]
            });
        }
    }

    function initiateScanner(stream) {
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
                    if (!data.product) {
                        console.error('Aucun produit trouvé !');
                        return;
                    }
                    let productData = data.product;

                    let displayText = [
                        productData.product_name,
                        productData.brands,
                        productData.ecoscore_grade && `Ecoscore: ${productData.ecoscore_grade.toUpperCase()}`,
                        productData.countries && `Origine: ${productData.countries}`
                    ].filter(Boolean).join('\n');

                    textResultElement.innerText = displayText;

                    let imageUrl = productData.image_url;
                    imgResultElement.innerHTML = imageUrl ? `<img src="${imageUrl}" alt="Product Image" style="max-width: 100%; height: auto; object-fit: contain;">` : '';
                })
                .catch(error => {
                    console.error('Erreur lors de la requête à Open Food Facts :', error);
                })
                .finally(() => {
                    setTimeout(() => { isScanning = false; }, 2000);
                });
        });
    }
});

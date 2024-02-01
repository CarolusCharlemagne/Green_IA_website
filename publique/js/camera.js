document.addEventListener('DOMContentLoaded', function() {
    const videoElement = document.getElementById('barcode-scanner');
    const textResultElement = document.getElementById('text_result');
    const imgResultElement = document.getElementById('img_result');
    const toggleFlashButton = document.getElementById('toggle-flash-button');
    let isScanning = false;
    let isFlashEnabled = false;
    let track;

    const imageMapping = {
        'a': 'publique/img/Eco-score_A.svg',
        'b': 'publique/img/Eco-score_B.svg',
        'c': 'publique/img/Eco-score_C.svg',
        'd': 'publique/img/Eco-score_D.svg',
        'e': 'publique/img/Eco-score_E.svg'
    };

    const originalConsoleLog = console.log;
    const originalConsoleError = console.error;

    console.log = function(...messages) {
        originalConsoleLog(...messages);
        textResultElement.innerText = messages.join(' ') + '\n'; 
        textResultElement.classList.add('blink-bg');
        setTimeout(() => {
            textResultElement.classList.remove('blink-bg');
        }, 1000);
    };

    console.error = function(...messages) {
        originalConsoleError(...messages);
        textResultElement.innerText = 'Erreur : ' + messages.join(' ') + '\n';
        textResultElement.style.backgroundColor = 'lightcoral';
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
            navigator.mediaDevices.getUserMedia({
                video: {
                    facingMode: 'environment',
                    width: { ideal: 1280 },
                    height: { ideal: 720 }
                }
            }).then(function(stream) {
                videoElement.srcObject = stream;
                videoElement.play();
                track = stream.getVideoTracks()[0];
                initiateScanner(stream);
            });
        } else {
            videoElement.srcObject = stream;
            videoElement.play();
            track = stream.getVideoTracks()[0];
            initiateScanner(stream);
        }
    }

    function toggleFlash() {
        if (isFlashEnabled) {
            isFlashEnabled = false;
            if (track && track.applyConstraints) {
                track.applyConstraints({
                    advanced: [{ torch: false }]
                });
            }
        } else {
            isFlashEnabled = true;
            if (track && track.applyConstraints) {
                track.applyConstraints({
                    advanced: [{ torch: true }]
                });
            }
        }
    }

    toggleFlashButton.addEventListener('click', () => {
        toggleFlash();
        if (isFlashEnabled) {
            toggleFlashButton.textContent = 'flash on';
        } else {
            toggleFlashButton.textContent = 'flash off';
        }
    });

    function initiateScanner(stream) {
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

                    let productName = productData.product_name || '';
                    let brandName = productData.brands || '';
                    let ecoscoreGrade = productData.ecoscore_grade || '';
                    let countryOfOrigin = productData.countries || '';
                    let imageUrl = productData.image_url || '';

                    let displayParts = [];
                    if (productName) displayParts.push(productName);
                    if (brandName) displayParts.push(brandName);
                    if (ecoscoreGrade.toLowerCase() in imageMapping) {
                        imgResultElement.style.backgroundImage = `url(${imageMapping[ecoscoreGrade.toLowerCase()]})`;
                        imgResultElement.style.display = 'block';
                    } else {
                        imgResultElement.style.display = 'none';
                    }
                    if (countryOfOrigin) displayParts.push('Origine: ' + countryOfOrigin);

                    let displayText = displayParts.join('\n');
                    textResultElement.innerText = displayText;

                    imgResultElement.innerHTML = '';
                    if (imageUrl) {
                        let imageElement = document.createElement('img');
                        imageElement.src = imageUrl;
                        imageElement.alt = 'Product Image';
                        imageElement.style.maxWidth = '100%';
                        imageElement.style.height = 'auto';
                        imageElement.style.objectFit = 'contain';
                        imgResultElement.appendChild(imageElement);
                    }
                })
                .catch(error => {
                    console.error('Erreur lors de la requête à Open Food Facts :', error);
                    textResultElement.innerText = 'Aucun produit trouvé !';
                    imgResultElement.innerHTML = '';
                })
                .finally(() => {
                    setTimeout(() => { isScanning = false; }, 2000);
                });
        });
    }
});

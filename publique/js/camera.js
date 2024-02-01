document.addEventListener('DOMContentLoaded', function() {
    const videoElement = document.getElementById('barcode-scanner');
    const textResultElement = document.getElementById('text_result');
    let isScanning = false;

    console.log = function(...messages) {
        console.originalLog(...messages);
        textResultElement.innerText += messages.join(' ') + '\n';
        textResultElement.classList.add('blink-bg');
        setTimeout(() => {
            textResultElement.classList.remove('blink-bg');
        }, 1000);
    };

    console.error = function(...messages) {
        console.originalError(...messages);
        textResultElement.innerText += 'Erreur : ' + messages.join(' ') + '\n';
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
    }).then(function(stream) {
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
        });
    }).catch(function(error) {
        console.error('Erreur lors de l\'accès à la caméra:', error);
    });
});
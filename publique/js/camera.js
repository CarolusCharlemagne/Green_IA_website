document.addEventListener('DOMContentLoaded', function() {
    const videoElement = document.getElementById('barcode-scanner');
    const textResultElement = document.getElementById('text_result');
    const originTextElement = document.getElementById('origin_text'); // Élément ajouté pour afficher l'origine
    let isScanning = false;
    let stream = null;

    const imagePaths = {
        'a': '/home/charlemagne/workspace/Green_IA_website/publique/img/icons/Eco-score_A.svg',
        'b': '/home/charlemagne/workspace/Green_IA_website/publique/img/icons/Eco-score_B.svg',
        'c': '/home/charlemagne/workspace/Green_IA_website/publique/img/icons/Eco-score_C.svg',
        'd': '/home/charlemagne/workspace/Green_IA_website/publique/img/icons/Eco-score_D.svg',
        'e': '/home/charlemagne/workspace/Green_IA_website/publique/img/icons/Eco-score_E.svg'
    };

    videoElement.setAttribute('playsinline', 'true');
    videoElement.setAttribute('webkit-playsinline', 'true');
    videoElement.setAttribute('disablePictureInPicture', 'true');
    videoElement.style.objectFit = 'cover';

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
            
            startScanner();
        }).catch(function(error) {
            console.error('Erreur lors de l\'accès à la caméra:', error);
        });
    }

    function updateImages(productImage, ecoscoreGrade) {
        const imgResultElement = document.getElementById('img_result');
        const ecoscoreImageElement = document.getElementById('ecoscore_image');
    
        if (productImage) {
            const productImgElement = document.createElement('img');
            productImgElement.src = productImage;
            productImgElement.alt = "Image du produit";
            productImgElement.style.maxWidth = '100%';
            productImgElement.style.height = 'auto';
            productImgElement.style.display = 'block';
            productImgElement.style.objectFit = 'contain';
    
            imgResultElement.innerHTML = '';
            imgResultElement.appendChild(productImgElement);
        } else {
            imgResultElement.innerHTML = 'Image du produit non trouvée';
        }
    
        if (ecoscoreGrade in imagePaths) {
            const ecoscoreImagePath = imagePaths[ecoscoreGrade];
    
            const ecoscoreImgElement = document.createElement('img');
            ecoscoreImgElement.src = ecoscoreImagePath;
            ecoscoreImgElement.alt = "Image correspondant à l'ecoscoreGrade";
            ecoscoreImgElement.style.maxWidth = '100%';
            ecoscoreImgElement.style.height = 'auto';
            ecoscoreImgElement.style.display = 'block';
            ecoscoreImgElement.style.objectFit = 'contain';
            ecoscoreImgElement.setAttribute('id', 'ecoscoreImg'); 
    
            ecoscoreImageElement.innerHTML = '';
            ecoscoreImageElement.appendChild(ecoscoreImgElement);
        } else {
            ecoscoreImageElement.innerHTML = 'Image du grade ecoscore non trouvée';
        }
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

                const openFoodFactsApiUrl = `https://world.openfoodfacts.org/api/v0/product/${barcodeScanner.codeResult.code}.json`;

                fetch(openFoodFactsApiUrl)
                    .then(response => response.json())
                    .then(data => {
                        if (data.status === 0) {
                            textResultElement.innerText = 'Produit non trouvé';
                            originTextElement.innerText = ''; // Effacer l'origine en cas de produit non trouvé
                            isScanning = false;
                            return;
                        }
                        let productData = data.product;
                        let productName = productData.product_name || '';
                        let brand = productData.brands || '';
                        let ecoscore = productData.ecoscore_score || '';
                        let ecoscoreGrade = productData.ecoscore_grade || '';
                        let productImage = productData.image_url || '';
                        let origin = productData.origins_tags || []; // Récupérer l'origine du produit

                        // Afficher l'origine dans l'élément HTML
                        originTextElement.innerText = origin.length > 0 ? origin[0] : 'Non spécifiée';

                        let displayText = `${productName}\n${brand}\n${ecoscore}`;
                        textResultElement.innerText = displayText;

                        updateImages(productImage, ecoscoreGrade);
                    })
                    .catch(error => {
                        console.error('Erreur lors de la requête à Open Food Facts:', error);
                        textResultElement.innerText = 'Erreur lors de la requête à Open Food Facts';
                        originTextElement.innerText = ''; // Effacer l'origine en cas d'erreur
                    })
                    .finally(() => {
                        setTimeout(() => { isScanning = false; }, 2000);
                    });
            }
        });
    }

    initCamera();
});

document.addEventListener('DOMContentLoaded', function() {
    // Initialisation du scanner de code-barres
    console.log('Initialisation du scanner...');

    const videoElement = document.getElementById('barcode-scanner');
    const textResultElement = document.getElementById('text_result');
    const ecoscoreImageDiv = document.getElementById('ecoscore_image');
    const imgResultElement = document.getElementById('img_result'); 
    let isScanning = false;

    // Configuration initiale de l'élément vidéo
    videoElement.setAttribute('playsinline', 'true'); // pour tous les navigateurs
    videoElement.setAttribute('webkit-playsinline', 'true'); // spécifique à iOS Safari
    videoElement.setAttribute('disablePictureInPicture', 'true');
    videoElement.style.objectFit = 'cover';

    // Chemins vers les images d'écoscore
    const imagePaths = {
        'a': 'publique/img/icons/Picto_A.png',
        'b': 'publique/img/icons/Picto_B.png',
        'c': 'publique/img/icons/Picto_C.png',
        'd': 'publique/img/icons/Picto_D.png',
        'e': 'publique/img/icons/Picto_E.png'
    };

    // Fonction pour effacer les images précédentes
    function clearImages() {
        ecoscoreImageDiv.innerHTML = ''; 
        imgResultElement.innerHTML = ''; 
    }

    // Initialisation de la caméra
    function initCamera() {
        navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: 'environment',
                width: { ideal: 1280 },
                height: { ideal: 720 }
            }
        }).then(localStream => {
            videoElement.srcObject = localStream;
            videoElement.play().catch(error => console.error('Erreur lors de la lecture vidéo:', error));

            // Vérification et activation de la torche si disponible
            const track = localStream.getVideoTracks()[0];
            if (track && track.getCapabilities) {
                let capabilities = track.getCapabilities();
                if (capabilities.torch) {
                    track.applyConstraints({ advanced: [{ torch: true }] });
                }
            }

            // Démarrage du scanner
            startScanner();
        }).catch(error => console.error('Erreur lors de l\'accès à la caméra:', error));
    }

    // Démarrage du scanner
    function startScanner() {
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
                console.error('Erreur lors de l\'initialisation de Quagga:', err);
                return;
            }
            Quagga.start();
        });

        Quagga.onDetected(function(result) {
            if (!isScanning) {
                isScanning = true;
                processDetectedBarcode(result.codeResult.code);
            }
        });
    }

    // Traitement du code-barres détecté
    function processDetectedBarcode(code) {
        const apiUrl = `https://world.openfoodfacts.org/api/v0/product/${code}.json`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => handleApiResponse(data))
            .catch(error => {
                console.error('Erreur lors de la requête à Open Food Facts:', error);
                textResultElement.innerText = 'Erreur lors de la requête à Open Food Facts';
                clearImages();
            })
            .finally(() => setTimeout(() => { isScanning = false; }, 2000));
    }

    // Gestion de la réponse de l'API
    function handleApiResponse(data) {
        if (data.status === 0) {
            textResultElement.innerText = 'Produit non trouvé';
            clearImages();
            return;
        }

        updateUIWithProductData(data.product);
    }

    // Mise à jour de l'UI avec les données du produit
    function updateUIWithProductData(productData) {
        const { product_name, brands, ecoscore_score, ecoscore_grade, origins, image_url } = productData;
        let displayText = `${product_name || ''}\n${brands || ''}\nOrigine: ${origins || ''}\nEcoscore: ${ecoscore_score || '0'}%`;
        textResultElement.innerText = displayText;

        updateEcoscoreImage(ecoscore_grade);
        updateProductImage(image_url);
    }

    // Mise à jour de l'image d'écoscore
    function updateEcoscoreImage(grade) {
        if (grade && imagePaths[grade.toLowerCase()]) {
            let img = document.createElement('img');
            img.src = imagePaths[grade.toLowerCase()];
            img.alt = "Eco-score image";
            img.style = 'border-radius: 0.4em; height: 30px; width: auto; display: block; object-fit: scale-down;';
            ecoscoreImageDiv.innerHTML = '';
            ecoscoreImageDiv.appendChild(img);
        }
    }

    // Mise à jour de l'image du produit
    function updateProductImage(url) {
        if (url) {
            let img = document.createElement('img');
            img.src = url;
            img.alt = "Image du produit";
            img.style = 'max-width: 100%; height: auto; display: block; object-fit: contain;';
            imgResultElement.innerHTML = '';
            imgResultElement.appendChild(img);
        }
    }

    initCamera();
});

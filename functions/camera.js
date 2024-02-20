const functions = require('firebase-functions');
const Quagga = require('quagga').default; 

exports.scanBarcode = functions.https.onRequest((request, response) => {
  const barcodeImage = request.body.image;

  if (!barcodeImage) {
    response.status(400).send('Aucune image fournie.');
    return;
  }

  const config = {
    src: barcodeImage,
    inputStream: {
      size: 800, 
      singleChannel: false 
    },
    decoder: {
      readers: ['ean_reader'] 
    },
    locate: true, 
    numOfWorkers: 0, 
  };

  Quagga.decodeSingle(config, (result) => {
    if (result && result.codeResult) {
      console.log('Code-barres détecté:', result.codeResult.code);
      response.send({ code: result.codeResult.code });
    } else {
      console.log('Aucun code-barres détecté');
      response.status(404).send('Aucun code-barres détecté');
    }
  });
});

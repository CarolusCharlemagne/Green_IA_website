 var map = L.map('carte_utilisateur_collecte').setView([46.52863469527167, 2.43896484375], 5); 
 L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
 }).addTo(map);

 function chercherVille(codePostal) {
     var url = `https://nominatim.openstreetmap.org/search?postalcode=${codePostal}&format=json&countrycodes=fr`;
     fetch(url)
     .then(response => response.json())
     .then(data => {
         if (data.length > 0) {
             var lat = data[0].lat;
             var lon = data[0].lon;
             var nomVille = data[0].display_name;

             map.setView([lat, lon], 13);
             L.marker([lat, lon]).addTo(map)
                 .bindPopup(nomVille)
                 .openPopup();
         } else {
             alert("Ville non trouvée, veuillez essayer un autre code postal.");
         }
     })
     .catch(error => {
         console.error('Erreur lors de la recherche de la ville:', error);
         alert("Erreur lors de la recherche de la ville. Veuillez réessayer.");
     });
 }

 document.getElementById('submitButtonCodePostal').addEventListener('click', function() {
     var codePostal = document.getElementById('inputUserCodePostal').value;
     if (codePostal) {
         chercherVille(codePostal);
     } else {
        alert("Veuillez entrer un code postal.");
    }
 });
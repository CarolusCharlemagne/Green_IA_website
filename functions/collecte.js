var map = L.map('carte_utilisateur_collecte').setView([46.52863469527167, 2.43896484375], 5); 
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// LISTE DES POINTS DE COLLECTE DEBUT
const donneesCollecte = [
    {
        nom_ville: "Pélissanne",
        code_postal: 13330,
        service_ordures_menageres: "mardi, vendredi",
        service_tri_selectif: "mercredi",
        service_dechets_verts: "null"
    },
    {
        nom_ville: "Bouc-Bel-Air",
        code_postal: 13320,
        service_ordures_menageres: "lundi, jeudi",
        service_tri_selectif: "1/2 mercredi",
        service_dechets_verts: "null"
    }
];
// LISTE DES POINTS DE COLLECTE FIN

function afficherDonneesCollecteSurCarte(lat, lon, resultat) {
    if (resultat) {
        var contenu = `<b>${resultat.nom_ville}</b><br>` +
                      `Code postal: ${resultat.code_postal}<br>` +
                      `Ordures ménagères: ${resultat.service_ordures_menageres}<br>` +
                      `Tri sélectif: ${resultat.service_tri_selectif}<br>` +
                      `Déchets verts: ${resultat.service_dechets_verts === "null" ? "Non disponible" : resultat.service_dechets_verts}`;
        
        L.marker([lat, lon]).addTo(map)
            .bindPopup(contenu)
            .openPopup();
    } else {
        L.marker([lat, lon]).addTo(map)
            .bindPopup("Aucune donnée n'est pour le moment disponible pour ce code postal.")
            .openPopup();
    }
}

function chercherVille(codePostal) {
    var url = `https://nominatim.openstreetmap.org/search?postalcode=${codePostal}&format=json&countrycodes=fr`;
    fetch(url)
    .then(response => response.json())
    .then(data => {
        if (data.length > 0) {
            var lat = data[0].lat;
            var lon = data[0].lon;

            map.setView([lat, lon], 13);
            
            const resultat = donneesCollecte.find(d => d.code_postal == codePostal);
            afficherDonneesCollecteSurCarte(lat, lon, resultat);
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
        document.getElementById('inputUserCodePostal').value = '';
    } else {
       alert("Veuillez entrer un code postal.");
   }
});

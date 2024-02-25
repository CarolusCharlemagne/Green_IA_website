var map = L.map('carte_utilisateur_collecte', {
    zoomControl: false // Désactiver les boutons de zoom
}).setView([46.52863469527167, 2.43896484375], 5); // Définir la vue initiale

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


// Ajout d'une variable pour garder une trace du dernier marqueur
var dernierMarqueur;

// DEBUT
const donneesCollecte = [
    {
        nom_ville: "COUDOUX",
        code_postal: 13111,
        service_ordures_menageres: "Mardi et Samedi",
        service_tri_selectif: "1 mercredi / 2"
    },
    {
        nom_ville: "CHATEAUNEUF LE ROUGE",
        code_postal: 13790,
        service_ordures_menageres: "Lundi et Jeudi",
        service_tri_selectif: "1 mercredi / 2"
    },
    {
        nom_ville: "EGUILLES",
        code_postal: 13510,
        service_ordures_menageres: "Lundi et vendredi",
        service_tri_selectif: "1 mercredi / 2"
    },
    {
        nom_ville: "JOUQUES",
        code_postal: 13490,
        service_ordures_menageres: "Lundi et Vendredi",
        service_tri_selectif: "1 jeudi / 2"
    },
    {
        nom_ville: "LA ROQUE D'ANTHERON",
        code_postal: 13640,
        service_ordures_menageres: "Lundi et Vendredi",
        service_tri_selectif: "1 mercredi / 2"
    },
    {
        nom_ville: "LAMBESC",
        code_postal: 13410,
        service_ordures_menageres: "Lundi et Vendredi",
        service_tri_selectif: "1 jeudi / 2"
    },
    {
        nom_ville: "LE PUY SAINTE REPARADE",
        code_postal: 13610,
        service_ordures_menageres: "Mardi et Samedi",
        service_tri_selectif: "1 mercredi / 2"
    },
    {
        nom_ville: "MEYRARGUES",
        code_postal: 13650,
        service_ordures_menageres: "Mardi et Samedi",
        service_tri_selectif: "1 mardi / 2"
    },
    {
        nom_ville: "MEYREUIL",
        code_postal: 13590,
        service_ordures_menageres: "Lundi et Vendredi",
        service_tri_selectif: "1 mercredi / 2"
    },
    {
        nom_ville: "MIMET",
        code_postal: 13105,
        service_ordures_menageres: "Mardi et Jeudi",
        service_tri_selectif: "1 mercredi / 2"
    },
    {
        nom_ville: "PERTUIS",
        code_postal: 84120,
        service_ordures_menageres: "Lundi et Jeudi",
        service_tri_selectif: "1 jeudi / 2"
    },
    {
        nom_ville: "PEYROLLES",
        code_postal: 13860,
        service_ordures_menageres: "",
        service_tri_selectif: "1 jeudi / 2"
    },
    {
        nom_ville: "ROGNES",
        code_postal: 13840,
        service_ordures_menageres: "Mardi et Samedi",
        service_tri_selectif: "1 mercredi / 2"
    },
    {
        nom_ville: "SAINT-CANNAT",
        code_postal: 13760,
        service_ordures_menageres: "Lundi et Vendredi",
        service_tri_selectif: "1 jeudi / 2"
    },
    {
        nom_ville: "SIMIANE COLLONGUE",
        code_postal: 13109,
        service_ordures_menageres: "Mercredi et Samedi",
        service_tri_selectif: "1 mercredi / 2"
    },
    {
        nom_ville: "VENELLES",
        code_postal: 13770,
        service_ordures_menageres: "Lundi et Jeudi",
        service_tri_selectif: "1 samedi / 2"
    },
    {
        nom_ville: "VENTABREN",
        code_postal: 13122,
        service_ordures_menageres: "Mardi et Vendredi",
        service_tri_selectif: "1 jeudi / 2"
    }
];
// FIN 

function afficherDonneesCollecteSurCarte(lat, lon, resultat) {
    if (dernierMarqueur) {
        map.removeLayer(dernierMarqueur); 
    }
    
    var contenu = resultat ? `<b>${resultat.nom_ville}</b><br>` +
                             `Code postal: ${resultat.code_postal}<br>` +
                             `Ordures ménagères: ${resultat.service_ordures_menageres}<br>` +
                             `Tri sélectif: ${resultat.service_tri_selectif}<br>` +
                             `Déchets verts: ${resultat.service_dechets_verts === "null" ? "Non disponible" : resultat.service_dechets_verts}` :
                             "Aucune donnée n'est pour le moment disponible pour ce code postal.";

    dernierMarqueur = L.marker([lat, lon]).addTo(map)
                      .bindPopup(contenu)
                      .openPopup();
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

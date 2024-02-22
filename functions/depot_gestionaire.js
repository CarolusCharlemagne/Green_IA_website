document.addEventListener("DOMContentLoaded", function() {
    const boutonsDechet = document.querySelectorAll(".bouton_choix_style_cat_dechet");
    const boutonPosition = document.getElementById("usr_position");
    let boutonsCliqués = [];

    function toggleButtonStyle(bouton) {
        if (boutonsCliqués.includes(bouton.id)) {
            boutonsCliqués = boutonsCliqués.filter(id => id !== bouton.id);
            bouton.style.backgroundColor = '';
            bouton.style.boxShadow = '';
            bouton.style.transform = '';
        } else {
            boutonsCliqués.push(bouton.id);
            bouton.style.backgroundColor = '#ccc';
            bouton.style.boxShadow = '0 2px 4px rgba(0,0,0,0.5)';
            bouton.style.transform = 'translateY(2px)';
        }
        console.log("Boutons cliqués:", boutonsCliqués);
    }

    boutonsDechet.forEach(function(bouton) {
        bouton.addEventListener("click", function() {
            toggleButtonStyle(bouton);
        });
    });

    boutonPosition.addEventListener("click", function() {
        boutonPosition.style.backgroundColor = '#ccc';
        boutonPosition.style.boxShadow = '0 2px 4px rgba(0,0,0,0.5)';
        boutonPosition.style.transform = 'translateY(2px)';

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                console.log("Position géographique de l'utilisateur: ", { latitude, longitude });
            }, function(error) {
                console.error("Erreur lors de l'obtention de la position: ", error.message);
            });
        } else {
            console.error("La géolocalisation n'est pas prise en charge par ce navigateur.");
        }

        setTimeout(function() {
            boutonPosition.style.backgroundColor = '';
            boutonPosition.style.boxShadow = '';
            boutonPosition.style.transform = '';
        }, 750);
    });


    function afficherCarteUtilisateur(latitude, longitude) {
        var carte = L.map('carte_utilisateur').setView([latitude, longitude], 13);
    
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>',
            maxZoom: 18,
        }).addTo(carte);
    
        var marqueur = L.marker([latitude, longitude]).addTo(carte);
        marqueur.bindPopup('Vous êtes ici').openPopup();
    }
    
    navigator.geolocation.getCurrentPosition(function(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        console.log("Position géographique de l'utilisateur: ", { latitude, longitude });
        afficherCarteUtilisateur(latitude, longitude);
    }, function(error) {
        console.error("Erreur lors de l'obtention de la position: ", error.message);
    });    



    // LISTE DES POINTS DE DEPOT
    const donneesDechetteries = [
    {
        nom: "Intermarché",
        latitude: 43.63241635317403,
        longitude: 5.138808205954166,
        ouv_lundi: "08h30",
        ouv_mardi: "08h30",
        ouv_mercredi: "08h30",
        ouv_jeudi: "08h30",
        ouv_vendredi: "08h30",
        ouv_samedi: "08h30",
        ouv_dimanche: "09h00",
        ferm_lundi: "20h00",
        ferm_mardi: "20h00",
        ferm_mercredi: "20h00",
        ferm_jeudi: "20h00",
        ferm_vendredi: "20h00",
        ferm_samedi: "20h00",
        ferm_dimanche: "13h00",
        dechets_vert: 0,
        electronique: 0,
        automobile: 0,
        carton: 0,
        papier: 0,
        verre: 0,
        piles: 1,
        ampoules: 1,
        autre: 0
    },
    {
        nom: "poubelles communes",
        latitude: 43.63245827171998,
        longitude: 5.153435340314095,
        ouv_lundi: "24h",
        ouv_mardi: "24h",
        ouv_mercredi: "24h",
        ouv_jeudi: "24h",
        ouv_vendredi: "24h",
        ouv_samedi: "24h",
        ouv_dimanche: "24h",
        ferm_lundi: "24h",
        ferm_mardi: "24h",
        ferm_mercredi: "24h",
        ferm_jeudi: "24h",
        ferm_vendredi: "24h",
        ferm_samedi: "24h",
        ferm_dimanche: "24h",
        dechets_vert: 0,
        electronique: 0,
        automobile: 0,
        carton: 1,
        papier: 1,
        verre: 0,
        piles: 0,
        ampoules: 0,
        autre: 1
    },
    {
        nom: "Leclerc",
        latitude: 43.6294124569237,
        longitude: 5.115618974257699,
        ouv_lundi: "08h45",
        ouv_mardi: "08h45",
        ouv_mercredi: "08h45",
        ouv_jeudi: "08h45",
        ouv_vendredi: "08h45",
        ouv_samedi: "08h45",
        ouv_dimanche: "08h45",
        ferm_lundi: "20h00",
        ferm_mardi: "20h00",
        ferm_mercredi: "20h00",
        ferm_jeudi: "20h00",
        ferm_vendredi: "20h00",
        ferm_samedi: "20h00",
        ferm_dimanche: "12h30",
        dechets_vert: 0,
        electronique: 1,
        automobile: 0,
        carton: 0,
        papier: 0,
        verre: 0,
        piles: 1,
        ampoules: 1,
        autre: 0
    }
];
});
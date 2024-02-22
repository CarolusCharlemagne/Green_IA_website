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



    document.addEventListener("DOMContentLoaded", function() {
        // Votre code existant pour les boutons et la géolocalisation ici
    
        let pois = []; // Pour stocker les points d'intérêt après parsing du CSV
    
        function chargerPOIs() {
            // Ici, vous chargerez et parseriez votre fichier CSV
            // Pour l'exemple, je vais simuler avec des données statiques
            pois = [
                {nom: 'Intermarché', latitude: 43.63241635317403, longitude: 5.138808205954166, dechets: ['piles', 'ampoules']},
                {nom: 'poubelles communes', latitude: 43.63245827171998, longitude: 5.153435340314095, dechets: ['carton', 'papier', 'autre']},
                {nom: 'Leclerc', latitude: 43.6294124569237, longitude: 5.115618974257699, dechets: ['electronique', 'piles', 'ampoules']}
            ];
            // Après avoir chargé les POIs, mettez à jour la carte initialement ou lorsque la position de l'utilisateur est obtenue
        }
    
        function afficherPOIsFiltrés(latitudeUtilisateur, longitudeUtilisateur) {
            // Filtrer les POIs basés sur la distance et les types de déchets sélectionnés
            const poisFiltrés = pois.filter(poi => {
                const distance = calculerDistance(latitudeUtilisateur, longitudeUtilisateur, poi.latitude, poi.longitude);
                const correspondAuDechet = boutonsCliqués.some(bouton => poi.dechets.includes(bouton));
                return distance <= 5 && correspondAuDechet;
            });
    
            // Mettre à jour la carte avec les POIs filtrés
            // Supposons que vous avez une fonction 'mettreAJourCarte(pois)' qui fait cela
            mettreAJourCarte(poisFiltrés);
        }
    
        // Calcul de la distance en utilisant la formule de Haversine
        function calculerDistance(lat1, lon1, lat2, lon2) {
            function rad(x) { return x * Math.PI / 180; }
    
            var R = 6378.137; // Rayon de la terre en km
            var dLat = rad(lat2 - lat1);
            var dLong = rad(lon2 - lon1);
            var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            return R * c; // Distance en km
        }
    
        // Ajoutez vos fonctions pour manipuler la carte ici, par exemple, 'mettreAJourCarte(pois)'
    
        chargerPOIs(); // Assurez-vous de charger les POIs quand le document est prêt
    });
    
});

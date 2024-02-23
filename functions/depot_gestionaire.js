document.addEventListener("DOMContentLoaded", function() {
    const boutonsDechet = document.querySelectorAll(".bouton_choix_style_cat_dechet");
    let boutonsCliqués = [];
    let carte; 
    let marqueurs = L.layerGroup();

    if (!carte) {
        carte = L.map('carte_utilisateur').setView([43.63241635317403, 5.138808205954166], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>',
            maxZoom: 18,
        }).addTo(carte);
    }


    function initialiserLocalisationEtMarqueur(carte) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
    
                var iconeRouge = L.icon({
                    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
                    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                    iconSize: [25, 41],
                    iconAnchor: [12, 41],
                    popupAnchor: [1, -34],
                    shadowSize: [41, 41]
                });
    
                L.marker([latitude, longitude], {icon: iconeRouge}).addTo(carte).bindPopup("Vous êtes ici").openPopup();
    
                const latLngBounds = L.latLng(latitude, longitude).toBounds(15000); // 15000 m 
                carte.fitBounds(latLngBounds);
    
                console.log("Position géographique de l'utilisateur: ", { latitude, longitude });
            }, function(error) {
                console.error("Erreur lors de l'obtention de la position: ", error.message);
            });
        } else {
            console.error("La géolocalisation n'est pas prise en charge par ce navigateur.");
        }
    }
    
    
    initialiserLocalisationEtMarqueur(carte)


 // LISTE DES POINTS DE DEPOT
 const donneesDepots = [
    {
        nom: "Intermarché",
        latitude: 43.63241635317403,
        longitude: 5.138808205954166,
        lundi: "08h30 / 20h00",
        mardi: "08h30 / 20h00",
        mercredi: "08h30 / 20h00",
        jeudi: "08h30 / 20h00",
        vendredi: "08h30 / 20h00",
        samedi: "08h30 / 20h00",
        dimanche: "09h00 / 13h00",
        composte: 0,
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
        lundi: "24h",
        mardi: "24h",
        mercredi: "24h",
        jeudi: "24h",
        vendredi: "24h",
        samedi: "24h",
        dimanche: "24h",
        composte: 0,
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
        lundi: "08h45 / 20h00",
        mardi: "08h45 / 20h00",
        mercredi: "08h45 / 20h00",
        jeudi: "08h45 / 20h00",
        vendredi: "08h45 / 20h00",
        samedi: "08h45 / 20h00",
        dimanche: "08h45 / 12h30",
        composte: 0,
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
    }


    boutonsDechet.forEach(function(bouton) {
        bouton.addEventListener("click", function() {
            toggleButtonStyle(bouton);
        });
    });

  
    let userLatitude, userLongitude;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            userLatitude = position.coords.latitude;
            userLongitude = position.coords.longitude;

            initialiserLocalisationEtMarqueur(carte)

            console.log("Position géographique de l'utilisateur: ", { userLatitude, userLongitude });
        }, function(error) {
            console.error("Erreur lors de l'obtention de la position: ", error.message);
        });
    } else {
        console.error("La géolocalisation n'est pas prise en charge par ce navigateur.");
    }

    document.getElementById("valider_type_dechets").addEventListener("click", function() {
        let enseignesFiltrées = donneesDepots.filter(enseigne => 
            boutonsCliqués.some(bouton => enseigne[bouton] === 1)
        );
    
        enseignesFiltrées = enseignesFiltrées.filter(enseigne => {
            let distance = distanceEntrePoints(userLatitude, userLongitude, enseigne.latitude, enseigne.longitude);
            return distance <= 15;
        });
    
        carte.setView([userLatitude, userLongitude], 13);
        marqueurs.clearLayers(); 
    
        enseignesFiltrées.forEach(function(enseigne) {
            let contenuPopup = `<b>${enseigne.nom}</b><br>` +
                               `Lundi: ${enseigne.lundi}<br>` +
                               `Mardi: ${enseigne.mardi}<br>` +
                               `Mercredi: ${enseigne.mercredi}<br>` +
                               `Jeudi: ${enseigne.jeudi}<br>` +
                               `Vendredi: ${enseigne.vendredi}<br>` +
                               `Samedi: ${enseigne.samedi}<br>` +
                               `Dimanche: ${enseigne.dimanche}<br><b>`;
    
            let servicesDisponibles = Object.entries(enseigne).reduce((acc, [cle, valeur]) => {
                if (valeur === 1 && ['composte', 'electronique', 'automobile', 'carton', 'papier', 'verre', 'piles', 'ampoules', 'autre'].includes(cle)) {
                    return acc + `${cle.charAt(0).toUpperCase() + cle.slice(1)} `;
                }
                return acc;
            }, "");
    
            if (servicesDisponibles === "") servicesDisponibles = "Aucun service spécifique disponible";
            contenuPopup += servicesDisponibles;
    
            var marqueur = L.marker([enseigne.latitude, enseigne.longitude]);
            marqueur.bindPopup(contenuPopup);
            marqueurs.addLayer(marqueur);
        });
    
        marqueurs.addTo(carte); 
    
        console.log("Enseignes correspondant aux critères :", enseignesFiltrées.map(e => e.nom));
    });

    function distanceEntrePoints(lat1, lon1, lat2, lon2) {
        var R = 6371;
        var dLat = (lat2 - lat1) * Math.PI / 180;
        var dLon = (lon2 - lon1) * Math.PI / 180;
        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
                Math.sin(dLon/2) * Math.sin(dLon/2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        var d = R * c;
        return d;
    }

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
});
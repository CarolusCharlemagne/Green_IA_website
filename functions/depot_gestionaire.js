document.addEventListener("DOMContentLoaded", function() {
    const boutonsDechet = document.querySelectorAll(".bouton_choix_style_cat_dechet");
    let boutonsCliqués = [];
    let carte; 
    let marqueurs = L.layerGroup();

    if (!carte) {
        carte = L.map('carte_utilisateur', {
            zoomControl: false 
        }).setView([43.63241635317403, 5.138808205954166], 13); 
    
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
    
                const latLngBounds = L.latLng(latitude, longitude).toBounds(8000); // 10000 m 
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
    // ... (les éléments précédents)
    {
        nom: "II Piccolo Mercato",
        latitude: 43.51479765634919,
        longitude: 5.442866084438863,
        lundi: "11h00",
        mardi: "11h00",
        mercredi: "11h00",
        jeudi: "11h00",
        vendredi: "11h00",
        samedi: "17h30",
        dimanche: "11h00",
        composte: 0,
        electronique: 1,
        automobile: 0,
        carton: 0,
        papier: 0,
        verre: 1,
        piles: 1,
        ampoules: 0,
        autre: 0
    },
    {
        nom: "Carrefour City",
        latitude: 43.51616292802876,
        longitude: 5.436335415870276,
        lundi: "07h00",
        mardi: "07h00",
        mercredi: "07h00",
        jeudi: "07h00",
        vendredi: "07h00",
        samedi: "07h00",
        dimanche: "07h00",
        composte: 0,
        electronique: 1,
        automobile: 0,
        carton: 0,
        papier: 0,
        verre: 1,
        piles: 1,
        ampoules: 0,
        autre: 0
    },
    {
        nom: "Déchèterie Aix en Provence",
        latitude: 43.50936017035191,
        longitude: 5.416512551388334,
        lundi: "09h00",
        mardi: "09h00",
        mercredi: "09h00",
        jeudi: "09h00",
        vendredi: "09h00",
        samedi: "09h00",
        dimanche: "09h00",
        composte: 1,
        electronique: 1,
        automobile: 1,
        carton: 1,
        papier: 1,
        verre: 1,
        piles: 1,
        ampoules: 1,
        autre: 1
    },
    {
        nom: "Supermarché Bon Marché",
        latitude: 43.628700,
        longitude: 5.127800,
        lundi: "08h00",
        mardi: "08h00",
        mercredi: "08h00",
        jeudi: "08h00",
        vendredi: "08h00",
        samedi: "09h00",
        dimanche: "20h00",
        composte: 0,
        electronique: 0,
        automobile: 1,
        carton: 0,
        papier: 0,
        verre: 1,
        piles: 0,
        ampoules: 1,
        autre: 0
    },
    {
        nom: "Boulangerie du Coin",
        latitude: 43.630200,
        longitude: 5.132400,
        lundi: "07h30",
        mardi: "07h30",
        mercredi: "07h30",
        jeudi: "07h30",
        vendredi: "07h30",
        samedi: "08h00",
        dimanche: "19h00",
        composte: 0,
        electronique: 0,
        automobile: 0,
        carton: 1,
        papier: 0,
        verre: 1,
        piles: 0,
        ampoules: 1,
        autre: 0
    },
    {
        nom: "Pharmacie des Alpes",
        latitude: 43.629000,
        longitude: 5.140000,
        lundi: "09h00",
        mardi: "09h00",
        mercredi: "09h00",
        jeudi: "09h00",
        vendredi: "09h00",
        samedi: "09h00",
        dimanche: "09h00",
        composte: 0,
        electronique: 1,
        automobile: 0,
        carton: 0,
        papier: 0,
        verre: 1,
        piles: 1,
        ampoules: 0,
        autre: 0
    },
    {
        nom: "Marché Provençal",
        latitude: 43.626800,
        longitude: 5.142300,
        lundi: "08h00",
        mardi: "08h00",
        mercredi: "08h00",
        jeudi: "08h00",
        vendredi: "08h00",
        samedi: "09h00",
        dimanche: "20h00",
        composte: 0,
        electronique: 1,
        automobile: 0,
        carton: 0,
        papier: 0,
        verre: 1,
        piles: 0,
        ampoules: 0,
        autre: 0
    },
    {
        nom: "Restaurant Le Gourmet",
        latitude: 43.625900,
        longitude: 5.130500,
        lundi: "11h00",
        mardi: "11h00",
        mercredi: "11h00",
        jeudi: "11h00",
        vendredi: "11h00",
        samedi: "11h00",
        dimanche: "11h00",
        composte: 0,
        electronique: 0,
        automobile: 1,
        carton: 0,
        papier: 1,
        verre: 1,
        piles: 0,
        ampoules: 1,
        autre: 0
    },
    {
        nom: "Station de Service Essor",
        latitude: 43.633000,
        longitude: 5.136200,
        lundi: "07h00",
        mardi: "07h00",
        mercredi: "07h00",
        jeudi: "07h00",
        vendredi: "07h00",
        samedi: "08h00",
        dimanche: "21h00",
        composte: 0,
        electronique: 1,
        automobile: 0,
        carton: 0,
        papier: 0,
        verre: 1,
        piles: 1,
        ampoules: 0,
        autre: 0
    },
    {
        nom: "École Primaire Montagne",
        latitude: 43.631500,
        longitude: 5.134800,
        lundi: "08h00",
        mardi: "08h00",
        mercredi: "08h00",
        jeudi: "08h00",
        vendredi: "08h00",
        samedi: "09h00",
        dimanche: "17h00",
        composte: 0,
        electronique: 0,
        automobile: 0,
        carton: 0,
        papier: 1,
        verre: 0,
        piles: 0,
        ampoules: 0,
        autre: 0
    },
    {
        nom: "Centre Commercial Le Soleil",
        latitude: 43.629800,
        longitude: 5.137000,
        lundi: "10h00",
        mardi: "10h00",
        mercredi: "10h00",
        jeudi: "10h00",
        vendredi: "10h00",
        samedi: "10h00",
        dimanche: "19h00",
        composte: 0,
        electronique: 1,
        automobile: 0,
        carton: 1,
        papier: 1,
        verre: 1,
        piles: 0,
        ampoules: 1,
        autre: 0
    },
    {
        nom: "Magasin Économique",
        latitude: 43.626200,
        longitude: 5.145700,
        lundi: "09h00",
        mardi: "09h00",
        mercredi: "09h00",
        jeudi: "09h00",
        vendredi: "09h00",
        samedi: "09h00",
        dimanche: "20h00",
        composte: 0,
        electronique: 0,
        automobile: 1,
        carton: 0,
        papier: 0,
        verre: 1,
        piles: 0,
        ampoules: 0,
        autre: 0
    },
    {
        nom: "Kiosque à Journaux La Presse",
        latitude: 43.628400,
        longitude: 5.141900,
        lundi: "08h30",
        mardi: "08h30",
        mercredi: "08h30",
        jeudi: "08h30",
        vendredi: "08h30",
        samedi: "09h00",
        dimanche: "18h00",
        composte: 0,
        electronique: 0,
        automobile: 0,
        carton: 0,
        papier: 1,
        verre: 0,
        piles: 1,
        ampoules: 0,
        autre: 0
    },
    {
        nom: "Supermarché Bon Marché",
        latitude: 43.620100,
        longitude: 5.076500,
        lundi: "08h00",
        mardi: "08h00",
        mercredi: "08h00",
        jeudi: "08h00",
        vendredi: "08h00",
        samedi: "09h00",
        dimanche: "20h00",
        composte: 0,
        electronique: 1,
        automobile: 0,
        carton: 0,
        papier: 0,
        verre: 1,
        piles: 0,
        ampoules: 1,
        autre: 0
    },
    {
        nom: "École Primaire du Village",
        latitude: 43.618200,
        longitude: 5.082300,
        lundi: "08h00",
        mardi: "08h00",
        mercredi: "08h00",
        jeudi: "08h00",
        vendredi: "08h00",
        samedi: "09h00",
        dimanche: "17h00",
        composte: 0,
        electronique: 0,
        automobile: 0,
        carton: 0,
        papier: 1,
        verre: 0,
        piles: 0,
        ampoules: 0,
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
        if (boutonsCliqués.length === 0) {
            alert("Veuillez sélectionner au moins un type de déchet avant de cliquer sur Valider.");
        } else {
            let enseignesFiltrées = donneesDepots.filter(enseigne => 
                boutonsCliqués.some(bouton => enseigne[bouton] === 1)
            );
        
            enseignesFiltrées = enseignesFiltrées.filter(enseigne => {
                let distance = distanceEntrePoints(userLatitude, userLongitude, enseigne.latitude, enseigne.longitude);
                return distance <= 10;
            });
        
            carte.setView([userLatitude, userLongitude], carte.getZoom());
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
        }
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
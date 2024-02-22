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
});

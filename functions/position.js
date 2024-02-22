document.addEventListener("DOMContentLoaded", function() {
    // Sélection de tous les boutons de catégorie de déchets
    const boutonsDechet = document.querySelectorAll(".bouton_choix_style_cat_dechet");
    const boutonPosition = document.getElementById("usr_position");
    // Liste pour garder une trace des boutons cliqués
    let boutonsCliqués = [];

    // Fonction pour basculer le style du bouton et mettre à jour la liste des boutons cliqués
    function toggleButtonStyle(bouton) {
        // Vérifie si le bouton est déjà cliqué
        if (boutonsCliqués.includes(bouton.id)) {
            // Si oui, annule les effets visuels et retire le bouton de la liste
            boutonsCliqués = boutonsCliqués.filter(id => id !== bouton.id);
            bouton.style.backgroundColor = '';
            bouton.style.boxShadow = '';
            bouton.style.transform = '';
        } else {
            // Sinon, applique les effets visuels et ajoute le bouton à la liste
            boutonsCliqués.push(bouton.id);
            bouton.style.backgroundColor = '#ccc';
            bouton.style.boxShadow = '0 2px 4px rgba(0,0,0,0.5)';
            bouton.style.transform = 'translateY(2px)';
        }
        // Affiche la liste des boutons cliqués dans la console
        console.log("Boutons cliqués:", boutonsCliqués);
    }

    // Ajoute un écouteur d'événements à chaque bouton de catégorie de déchets
    boutonsDechet.forEach(function(bouton) {
        bouton.addEventListener("click", function() {
            toggleButtonStyle(bouton);
        });
    });

    // Gestion du clic sur le bouton de position pour récupérer la position géographique
    boutonPosition.addEventListener("click", function() {
        boutonPosition.style.backgroundColor = '#ccc';
        boutonPosition.style.boxShadow = '0 2px 4px rgba(0,0,0,0.5)';
        boutonPosition.style.transform = 'translateY(2px)';

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                // Affiche la position géographique de l'utilisateur
                console.log("Position géographique de l'utilisateur: ", { latitude, longitude });
            }, function(error) {
                console.error("Erreur lors de l'obtention de la position: ", error.message);
            });
        } else {
            console.error("La géolocalisation n'est pas prise en charge par ce navigateur.");
        }

        // Réinitialise les styles du bouton après un délai
        setTimeout(function() {
            boutonPosition.style.backgroundColor = '';
            boutonPosition.style.boxShadow = '';
            boutonPosition.style.transform = '';
        }, 750);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    var saveButton = document.getElementById('nbr_hab_house_search_button');
    if (saveButton) {
        saveButton.addEventListener('click', function() {
            var nbrPersons = document.getElementById('nbr_hab_house_search_input').value;
            sessionStorage.setItem('nbrPersons', nbrPersons);
            console.log('Nombre de personnes sauvegardé dans sessionStorage :', nbrPersons);
        });
    } else {
        console.log('Bouton de sauvegarde introuvable.');
    }
});

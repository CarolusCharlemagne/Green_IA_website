var testButton = document.getElementById('testButton');
if (testButton) {
    testButton.addEventListener('click', function() {
        var nbrPersons = sessionStorage.getItem('nbrPersons');
        document.getElementById('displayData').textContent = "Nombre de personnes dans le foyer : " + (nbrPersons ? nbrPersons : "Aucune donnée trouvée.");
    });
} else {
    console.log('Bouton TEST introuvable.');
}
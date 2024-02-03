document.addEventListener('DOMContentLoaded', function() {
    let db;
    const request = window.indexedDB.open("UsersDatabase", 1);

    // Créez l'object store lors de la première ouverture ou d'une mise à jour de version
    request.onupgradeneeded = function(event) {
        db = event.target.result;
        if (!db.objectStoreNames.contains('households')) {
            const objStore = db.createObjectStore('households', { keyPath: 'id', autoIncrement: true });
            objStore.createIndex('nbrPersons', 'nbrPersons', { unique: false });
        }
    };

    request.onsuccess = function(event) {
        db = event.target.result;
    };

    request.onerror = function(event) {
        console.error("IndexedDB error:", event.target.error);
    };

    // Fonction pour ajouter des données
    function addData(nbrPersons) {
        const transaction = db.transaction(['households'], 'readwrite');
        const store = transaction.objectStore('households');
        const data = { nbrPersons: nbrPersons };
        const request = store.add(data);

        request.onsuccess = function() {
            console.log('Data added successfully');
        };

        request.onerror = function(event) {
            console.error('Error adding data:', event.target.error);
        };
    }

    // Gérer le clic sur le bouton
    document.getElementById('nbr_hab_house_search_button').addEventListener('click', function() {
        const nbrPersons = document.getElementById('nbr_hab_house_search_input').value;
        addData(nbrPersons);
    });
});

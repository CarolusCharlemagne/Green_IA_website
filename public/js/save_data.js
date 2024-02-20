document.addEventListener('DOMContentLoaded', function() {
    const uniquePseudoButton = document.getElementById('unique_pseudo_button');
    const uniquePseudoInput = document.getElementById('unique_pseudo_input');

    window.onload = function() {
        const storedPseudo = localStorage.getItem('uniquePseudo');
        uniquePseudoInput.value = storedPseudo ? storedPseudo : 'Votre pseudo unique...';
    };

    uniquePseudoButton.addEventListener('click', function(event) {
        event.preventDefault();
        
        const pseudo = uniquePseudoInput.value.trim();
        
        if (pseudo) {
            fetch('../serv/verifyPseudo.php', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ pseudo: pseudo })
            })
            .then(response => response.json())
            .then(data => {
                if (data.isUnique) {
                    localStorage.setItem('uniquePseudo', pseudo);
                } else {
                    alert('Ce pseudo existe déjà. Veuillez essayer un nouveau pseudo.');
                    uniquePseudoInput.value = '';
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('Une erreur est survenue lors de la vérification du pseudo.');
            });
        } else {
            alert('Veuillez entrer un pseudo.');
            uniquePseudoInput.value = 'Votre pseudo unique...';
        }
    });
});

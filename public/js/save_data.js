
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
            localStorage.setItem('uniquePseudo', pseudo);
        } else {
            localStorage.setItem('uniquePseudo', 'Votre pseudo unique...');
            uniquePseudoInput.value = 'Votre pseudo unique...';
        }
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const boutons = document.querySelectorAll('.bouton_choix_style_cat_dechet');
    const couleurs = [
        'rgba(183, 229, 205, 0.9)',
        'rgba(210, 210, 210, 0.9)',
        'rgba(203, 173, 229, 0.9)',
        'rgba(210, 180, 140, 0.9)',
        'rgba(173, 216, 230, 0.9)',
        'rgba(255, 187, 153, 0.9)',
        'rgba(255, 255, 153, 0.9)',
        'rgba(255, 153, 153, 0.9)'
    ]; 
    boutons.forEach((bouton, index) => {
        let clicked = false; 
        bouton.addEventListener('click', () => {
            if (!clicked) {
                bouton.style.backgroundColor = couleurs[index]; 
                bouton.style.boxShadow = '0 2px 4px rgba(0,0,0,0.3)'; 
                bouton.style.transform = 'translateY(2px)';
                clicked = true; 
            } else {
                bouton.style.backgroundColor = ''; 
                bouton.style.boxShadow = ''; 
                bouton.style.transform = ''; 
                clicked = false; 
            }
        });
    });
});

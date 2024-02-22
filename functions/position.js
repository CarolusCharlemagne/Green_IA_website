document.addEventListener("DOMContentLoaded", function() {
    const boutonPosition = document.getElementById("usr_position");

    boutonPosition.addEventListener("click", function() {
        boutonPosition.style.backgroundColor = '#ccc'; 
        boutonPosition.style.boxShadow = '0 2px 4px rgba(0,0,0,0.5)'; 
        boutonPosition.style.transform = 'translateY(2px)'; 

        setTimeout(function() {
            boutonPosition.style.backgroundColor = ''; 
            boutonPosition.style.boxShadow = ''; 
            boutonPosition.style.transform = ''; 
        }, 750);
    });
});

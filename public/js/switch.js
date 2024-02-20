function toggleDesign() {
    var checkBoxes = document.querySelectorAll('.toggleButton');
    var contentA = document.querySelector('.page_content_A');
    var contentB = document.querySelector('.page_content_B');
    var isChecked = Array.from(checkBoxes).some(checkbox => checkbox.checked);

    if (isChecked) {
        contentA.style.display = 'block';
        contentB.style.display = 'none';
    } else {
        contentA.style.display = 'none';
        contentB.style.display = 'block';
    }
}

// Ajout des écouteurs d'événements
document.querySelectorAll('.toggleButton').forEach(button => {
    button.addEventListener('change', toggleDesign);
});

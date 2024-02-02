function toggleDesign() {
    var checkBox = document.getElementById('toggleButton');
    var contentA = document.querySelector('.page_content_A');
    var contentB = document.querySelector('.page_content_B');

    if (checkBox.checked) {
        contentA.style.display = 'block';
        contentB.style.display = 'none';
    } else {
        contentA.style.display = 'none';
        contentB.style.display = 'block';
    }
}
document.getElementById('toggleButton').addEventListener('change', toggleDesign);

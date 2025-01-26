document.addEventListener("DOMContentLoaded", () => {
    const footerPlaceholder = document.getElementById('footer-placeholder');

    if (footerPlaceholder) {
        fetch('/componentes/footer.html')
            .then(response => response.text())
            .then(data => {
                footerPlaceholder.innerHTML = data;
                const yearElement = document.getElementById("currentYear");
                if (yearElement) {
                    yearElement.textContent = new Date().getFullYear();
                }
            })
            .catch(error => console.error('Error al cargar el pie de página:', error));
    }
});

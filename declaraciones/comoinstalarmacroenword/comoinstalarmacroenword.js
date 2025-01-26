document.addEventListener('DOMContentLoaded', function () {
    // Cargar el encabezado
    const headerPlaceholder = document.getElementById('header-placeholder');
    fetch('/componentes/header.html')
        .then(response => response.text())
        .then(data => {
            headerPlaceholder.innerHTML = data;
        })
        .catch(error => console.error('Error al cargar el encabezado:', error));

    // Cargar el pie de página
    const footerPlaceholder = document.getElementById('footer-placeholder');
    fetch('/componentes/footer.html')
        .then(response => response.text())
        .then(data => {
            footerPlaceholder.innerHTML = data;
        })
        .catch(error => console.error('Error al cargar el pie de página:', error));

    // Inicializar video en formato m3u8, evitando descarga del mismo
    const videoElement = document.getElementById('video');
    const videoSrc = 'media/comoinstalarmacroenword.m3u8';
    if (videoElement.canPlayType('application/vnd.apple.mpegmar')) {
        videoElement.src = videoSrc;
    } else if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(videoSrc);
        hls.attachMedia(videoElement);
    } else {
        console.error('HLS no está soportado en este navegador.');
    }
    videoElement.addEventListener('contextmenu', (e) => e.preventDefault());
    videoElement.addEventListener('loadedmetadata', () => {
        const videoControls = videoElement.controlsList;
        if (videoControls) {
            videoControls.add('nodownload');
        }
    });
    videoElement.setAttribute('preload', 'none');

    // Carga de tooltip
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});

// Deshabilitar teclas de desarrollo y capturas de pantalla
document.addEventListener('keydown', (e) => {
    const blockedKeys = ['PrintScreen', 'F12'];
    const blockedCombos = [
        e.ctrlKey && e.key === 'PrintScreen',
        e.altKey && e.key === 'PrintScreen',
        e.metaKey && e.shiftKey && ['3', '4'].includes(e.key),
        e.ctrlKey && e.shiftKey && ['I', 'J', 'C', 'U'].includes(e.key),
    ];

    if (blockedKeys.includes(e.key) || blockedCombos.some((combo) => combo)) {
        e.preventDefault();
        addBlackCanvas();
        return false;
    }
});

// Bloquear clic derecho
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    return false;
});
// Deshabilitar copiar y pegar
document.addEventListener('copy', (e) => {
    e.preventDefault();
    addBlackCanvas();
    return false;
});
document.addEventListener('cut', (e) => {
    e.preventDefault();
    return false;
});
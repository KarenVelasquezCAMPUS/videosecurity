document.addEventListener('DOMContentLoaded', function () {
    const videoElement = document.getElementById('video');
    const videoConfig = {
        url: 'media/vonepreview.mp4', 
        type: 'video/mp4'
    };
    const xhr = new XMLHttpRequest();
    xhr.open('GET', videoConfig.url, true);
    xhr.responseType = 'blob';
    xhr.onload = function () {
        if (xhr.status === 200) {
            const blob = xhr.response;
            const url = URL.createObjectURL(blob);
            const sourceElement = document.createElement('source');
            sourceElement.src = url;
            sourceElement.type = videoConfig.type;
            videoElement.appendChild(sourceElement);
            videoElement.load(); 
        } else {
            console.error('No se pudo cargar el video:', xhr.statusText);
        }
    };
    xhr.onerror = function () {
        console.error('Error al cargar el video.');
    };
    xhr.send();
    videoElement.addEventListener('contextmenu', (e) => e.preventDefault());
});

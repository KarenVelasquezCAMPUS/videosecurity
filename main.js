document.addEventListener('DOMContentLoaded', function() {
    const videoConfig = {
        url: 'media/vonepreview.mp4',
        type: 'video/mp4'
    };
    function loadSecureVideo(config) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', config.url);
        xhr.responseType = 'arraybuffer';
        xhr.onload = function() {
            if (xhr.status === 200) {
                const blob = new Blob([xhr.response], { type: config.type });
                const url = URL.createObjectURL(blob);
                const video = document.getElementById('video');
                video.src = url;
                video.onload = function() {
                    URL.revokeObjectURL(url);
                };
            }
        };
        xhr.onerror = function() {
            console.error('Error al cargar el video');
        };
        xhr.send();
    }
    loadSecureVideo(videoConfig);
});
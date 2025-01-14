document.addEventListener('DOMContentLoaded', function() {
    const videoConfig = {
        url: 'media/vonepreview.mp4',
        type: 'video/mp4'
    };
    let xhr = new XMLHttpRequest();
    xhr.open('GET', videoConfig);
    xhr.responseType = 'arraybuffer';
    xhr.onload = (e) => {
        let blob = new Blob([xhr.response]);
        let url = URL.createObjectURL(blob);
        let image = document.createObjectURL(blob);
        image.src = url;
    }
    xhr.send();
});
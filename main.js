document.addEventListener('DOMContentLoaded', function() {
    const videoConfig = {
        url: 'media/vonepreview.mp4',
        type: 'video/mp4'
    };
    function loadSecureVideo(config) {
        const video = document.getElementById('video');
        const mediaSource = new MediaSource();
        video.src = URL.createObjectURL(mediaSource);
        mediaSource.addEventListener('sourceopen', function() {
            const sourceBuffer = mediaSource.addSourceBuffer('video/mp4; codecs="avc1.42E01E,mp4a.40.2"');
            fetch(config.url).then(response => response.arrayBuffer()).then(data => {
                    sourceBuffer.addEventListener('updateend', function() {
                        if (!sourceBuffer.updating && mediaSource.readyState === 'open') {
                            mediaSource.endOfStream();
                        }
                    });
                    const chunkSize = 500000;
                    let offset = 0;
                    function appendNextChunk() {
                        if (offset < data.byteLength) {
                            const chunk = data.slice(offset, offset + chunkSize);
                            if (!sourceBuffer.updating) {
                                sourceBuffer.appendBuffer(chunk);
                            }
                            offset += chunkSize;
                            setTimeout(appendNextChunk, 100);
                        }
                    }
                    appendNextChunk();
                })
                .catch(error => {
                    console.error('Error loading video:', error);
                });
        });
        video.addEventListener('loadeddata', function() {
            URL.revokeObjectURL(video.src);
        });
        document.addEventListener('keydown', function(e) {
            if (e.ctrlKey || e.metaKey) {
                if (e.key === 's' || e.key === 'S') {
                    e.preventDefault();
                    return false;
                }
            }
        });
        document.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            return false;
        });
        video.addEventListener('play', function() {
            try {
                if (document.pictureInPictureEnabled) {
                    video.disablePictureInPicture = true;
                }
            } catch (e) {}
        });
        return function cleanup() {
            if (video.src) {
                URL.revokeObjectURL(video.src);
            }
        };
    }
    const cleanup = loadSecureVideo(videoConfig);
    window.addEventListener('unload', cleanup);
});
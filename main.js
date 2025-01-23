document.addEventListener('DOMContentLoaded', function () {
    // Inicializar video en formato m3u8, evitando descarga del mismo
    const videoElement = document.getElementById('video');
    const videoSrc = 'media/vonepreview.m3u8';
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

    // Dificultar toma de screenshots
    const preventScreenshot = () => {
        const interceptScreenshot = () => {
            const blackCanvas = document.createElement('canvas');
            blackCanvas.width = window.screen.width;
            blackCanvas.height = window.screen.height;
            const ctx = blackCanvas.getContext('2d');
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, blackCanvas.width, blackCanvas.height);
            if (window.navigator.clipboard) {
                window.navigator.clipboard.write = async (data) => {
                    const blackBlob = await fetch(blackCanvas.toDataURL()).then(r => r.blob());
                    return data.map(() => blackBlob);
                };
            }
            document.addEventListener('keydown', function(e) {
                const screenshotKeys = [
                    'PrintScreen',
                    (e) => e.ctrlKey && e.key === 'PrintScreen',
                    (e) => e.altKey && e.key === 'PrintScreen',
                    (e) => e.ctrlKey && e.shiftKey && e.key === 'P',
                    (e) => e.key === 'PrintScreen'
                ];
                screenshotKeys.forEach(key => {
                    if (typeof key === 'function' ? key(e) : e.key === key) {
                        e.preventDefault();
                        if (window.navigator.clipboard) {
                            navigator.clipboard.writeText('').catch(console.error);
                            navigator.clipboard.write([
                                new ClipboardItem({
                                    'image/png': blackCanvas.toBlob()
                                })
                            ]).catch(console.error);
                        }
                        return false;
                    }
                });
            });
            window.addEventListener('copy', (e) => {
                e.preventDefault();
                e.clipboardData.setData('text/plain', '');
                e.clipboardData.setData('image/png', blackCanvas.toDataURL());
            }, true);
        };
        document.addEventListener('keydown', function(e) {
            const screenshotKeys = [
                'PrintScreen', 
                'F12', 
                (e) => e.ctrlKey && e.key === 'PrintScreen',
                (e) => e.altKey && e.key === 'PrintScreen',
                (e) => e.metaKey && e.shiftKey && e.key === '3',
                (e) => e.metaKey && e.shiftKey && e.key === '4',
                (e) => e.winKey && e.shiftKey && e.key === 's'
            ];
            screenshotKeys.forEach(key => {
                if (typeof key === 'function' ? key(e) : e.key === key) {
                    e.preventDefault();
                    return false;
                }
            });
        });
        document.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            return false;
        });
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 9999;
            background: repeating-linear-gradient(
                45deg,
                rgba(255,0,0,0.05),
                rgba(255,0,0,0.05) 10px,
                rgba(0,0,0,0.05) 10px,
                rgba(0,0,0,0.05) 20px
            );
            mix-blend-mode: overlay;
        `;
        document.body.appendChild(overlay);
        ['copy', 'cut', 'paste'].forEach(event => {
            document.addEventListener(event, function(e) {
                e.preventDefault();
                return false;
            });
        });
        if (videoElement) {
            videoElement.addEventListener('contextmenu', (e) => e.preventDefault());
            videoElement.removeAttribute('download');
            videoElement.setAttribute('controlsList', 'nodownload noplaybackrate');
            videoElement.addEventListener('loadedmetadata', () => {
                videoElement.disablePictureInPicture = true;
                videoElement.controlsList.add('nodownload');
            });
        }
        document.addEventListener('keydown', function(e) {
            if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I')) {
                e.preventDefault();
                return false;
            }
        });
        interceptScreenshot();
    };
    preventScreenshot();
    const observer = new MutationObserver(() => {
        if (!document.body.contains(overlay)) {
            preventScreenshot();
        }
    });
    observer.observe(document.body, { 
        childList: true, 
        subtractList: true 
    });
});

document.addEventListener('copy', function(e) {
    e.preventDefault();
    return false;
});
document.addEventListener('cut', function(e) {
    e.preventDefault();
    return false;
});
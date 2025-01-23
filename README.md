# Video Security Project

## Descripción General
Este proyecto consiste en una implementación de una interfaz para reproducir videos en formato HLS (HTTP Live Streaming) mientras se aplican varias medidas manuales para dificultar que los usuarios descarguen el contenido. El objetivo principal es proteger los videos alojados en la carpeta `media` para evitar su descarga directa o uso no autorizado.

El sistema utiliza un archivo HTML para estructurar la página, un archivo JavaScript para manejar la reproducción del video y agregar restricciones, y un archivo de estilos CSS para la presentación visual (no incluido en este código).

---

## Estructura del Proyecto

### Archivos Principales

1. **HTML**
   - Define la estructura de la página.
   - Incluye referencias al archivo CSS (`styles.css`) y JavaScript (`main.js`).
   - Proporciona un contenedor para el reproductor de video.

2. **JavaScript** (`main.js`)
   - Configura la reproducción del video usando la librería HLS.js.
   - Aplica restricciones manuales para prevenir la descarga del video.

3. **Carpeta `media`**
   - Contiene el contenido multimedia necesario:
     - Archivos TS (segmentos de video).
     - Archivo M3U8 (lista de reproducción HLS).
     - Archivo MP4 (opcional, utilizado como referencia o respaldo).

---

## Explicación del Código

### HTML
El archivo HTML contiene la estructura base de la aplicación:
- **Etiqueta `video`**:
  - Utiliza clases y atributos para configurarse como un reproductor HLS con controles básicos (play, pause, etc.).
  - Está envuelto en un contenedor para mayor flexibilidad de diseño.

```html
<video id="video" class="video-js vjs-default-skin" controls autoplay loop></video>
```

- **Referencias a Recursos Externos**:
  - HLS.js: Una librería de JavaScript que permite la reproducción de videos HLS en navegadores que no lo soportan nativamente.
  - Archivo JavaScript `main.js`: Contiene la lógica para gestionar la reproducción y restricciones.

### JavaScript
El archivo JavaScript implementa las siguientes funcionalidades clave:

1. **Detección de Soporte para HLS**:
   - Si el navegador soporta nativamente HLS, el video se reproduce directamente.
   - Si no es compatible, se utiliza HLS.js para gestionar la reproducción.

```javascript
if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
    videoElement.src = videoSrc;
} else if (Hls.isSupported()) {
    const hls = new Hls();
    hls.loadSource(videoSrc);
    hls.attachMedia(videoElement);
} else {
    console.error('HLS no está soportado en este navegador.');
}
```

2. **Prevención de Descarga del Video**:
   - **Deshabilitar el Menú Contextual**:
     - Evita que los usuarios accedan al menú contextual (clic derecho) sobre el reproductor.

   ```javascript
   videoElement.addEventListener('contextmenu', (e) => e.preventDefault());
   ```

   - **Restricción de Controles**:
     - Intenta agregar restricciones como `nodownload` para evitar la opción de descarga desde los controles del video.

   ```javascript
   videoElement.addEventListener('loadedmetadata', () => {
       const videoControls = videoElement.controlsList;
       if (videoControls) {
           videoControls.add('nodownload');
       }
   });
   ```

3. **Configuración Adicional**:
   - Se establece el atributo `preload` en `none` para evitar la precarga innecesaria del video y dificultar la captura de datos.

   ```javascript
   videoElement.setAttribute('preload', 'none');
   ```

---

## Metodología para Proteger el Video

El código implementa las siguientes estrategias para proteger el video:

1. **Uso de HLS (HTTP Live Streaming)**
   - Divide el video en pequeños segmentos (`.ts`) que se reproducen de manera secuencial.
   - Los navegadores no pueden descargar el video completo directamente.

2. **Deshabilitación de Funciones del Navegador**
   - El menú contextual sobre el reproductor está deshabilitado.
   - Se intenta restringir la descarga mediante controles adicionales (`nodownload`).

3. **Ajustes de Reproducción**
   - La configuración de `preload` en `none` minimiza las oportunidades de descargar el video completo.

---

## Requisitos

- Navegador moderno con soporte para JavaScript.
- Librería [HLS.js](https://github.com/video-dev/hls.js) incluida en el proyecto.
- Servidor web para servir el archivo M3U8 y los segmentos TS.

---

## Instalación de HLS.js
Para instalar HLS.js en tu proyecto, utiliza el siguiente comando en la terminal:

```bash
npm install hls.js
```

Luego, puedes incluirlo en tu archivo JavaScript principal:

```javascript
import Hls from 'hls.js';
```

Si prefieres usar un CDN, puedes incluirlo directamente en el archivo HTML (asi se realizó en este proyecto):

```html
<script src="https://cdn.jsdelivr.net/npm/hls.js@latest"></script>
```

---

## Conversión de MP4 a M3U8
Para convertir un archivo MP4 a formato HLS (M3U8 y segmentos TS), sigue estos pasos en un sistema Linux con FFmpeg instalado:

1. Asegúrate de tener FFmpeg instalado:

```bash
sudo apt update
sudo apt install ffmpeg
```

2. Ejecuta el siguiente comando donde tengas ubicado tu video mp4 en el proyecto para realizar la conversión:

```bash
ffmpeg -i video.mp4 -hls_time 10 -hls_list_size 0 -f hls video.m3u8
```

- `video.mp4`: El archivo MP4 de entrada.
- `-hls_time 10`: Divide el video en segmentos de 10 segundos.
- `video.m3u8`: El archivo de lista de reproducción HLS generado.

Los segmentos `.ts` generados y el archivo `.m3u8` estarán listos en el mismo directorio donde se ejecutó el comando.

---

## Mejoras Futuras

- Implementar token de autenticación para la URL del video HLS.
- Cifrar los segmentos TS para evitar su reproducción fuera de la aplicación.
- Utilizar un servicio de CDN para proteger las rutas de los archivos.

---

## Consideraciones
Aunque estas medidas dificultan la descarga del video, no garantizan una protección absoluta contra usuarios avanzados que utilicen herramientas especializadas. La seguridad del contenido puede mejorarse combinando estas estrategias con tecnologías pagas como DRM (Digital Rights Management) .

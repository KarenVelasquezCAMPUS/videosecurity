# Video Security Tutorial System

## Descripción General
Este sistema de tutoriales en video está diseñado para proporcionar contenido educativo protegido mediante diversas medidas de seguridad. Utiliza HLS (HTTP Live Streaming) para la reproducción de videos y está construido con una arquitectura modular que facilita la adición de nuevo contenido.

## Estructura del Proyecto

```
proyecto/
├── componentes/               # Componentes reutilizables
│   ├── footer.css            # Estilos del pie de página
│   ├── footer.js             # Funcionalidad del pie de página
│   ├── footer.html           # Estructura del pie de página
│   ├── header.css            # Estilos del encabezado
│   └── header.html           # Estructura del encabezado
│
├── declaraciones/            # Módulos de contenido
│   ├── comoinstalarmacroenword/
│   │   ├── media/           # Archivos multimedia del módulo
│   │   │   ├── .m3u8       # Archivo de streaming
│   │   │   ├── .mp4        # Video original
│   │   │   └── .ts         # Segmentos de video
│   │   ├── .css            # Estilos específicos del módulo
│   │   ├── .js             # Funcionalidad del módulo
│   │   └── .html           # Estructura del módulo
│   │
│   └── comoregistrarfacturasconitemsexentos/
│       └── [misma estructura que el módulo anterior]
│
├── iconos/                   # Recursos gráficos
│   ├── animaciones/         # Elementos animados
│   │   └── robotcanva.webp
│   └── logo/                # Logotipos del sistema
│       ├── Avance.png
│       ├── LogoSigno.png
│       └── Signo.png
└── README.md                # Documentación del proyecto
```

## Componentes del Sistema

### 1. Componentes Reutilizables (`/componentes`)
Los componentes header y footer se utilizan en todas las páginas para mantener una experiencia de usuario consistente.

#### Header
- **header.html**: Define la estructura de navegación superior
- **header.css**: Establece estilos para el encabezado

#### Footer
- **footer.html**: Contiene la estructura del pie de página
- **footer.js**: Maneja la funcionalidad del pie de página
- **footer.css**: Define los estilos del footer

### 2. Módulos de Contenido (`/declaraciones`)
Cada módulo de tutorial sigue una estructura estandarizada:

#### Estructura de Módulo
- **Carpeta media/**: Contiene los archivos de video
  - **.m3u8**: Archivo de lista de reproducción HLS
  - **.mp4**: Archivo de video original
  - **.ts**: Segmentos de video para streaming
- **[nombre].html**: Página principal del tutorial
- **[nombre].css**: Estilos específicos del tutorial
- **[nombre].js**: Lógica y seguridad del tutorial

### 3. Recursos Gráficos (`/iconos`)
Organización de elementos visuales del sistema:
- **animaciones/**: Elementos gráficos animados
- **logo/**: Logotipos e identidad visual

## Características de Seguridad

### Protección de Video
El sistema implementa múltiples capas de seguridad:

1. **Streaming HLS**
   - Segmentación de video para prevenir descarga directa
   - Reproducción progresiva del contenido

2. **Medidas Anti-manipulación**
   ```javascript
   // Bloqueo de teclas de desarrollo
   document.addEventListener('keydown', (e) => {
       const blockedKeys = ['PrintScreen', 'F12'];
       // ... código de prevención
   });

   // Deshabilitación de menú contextual
   document.addEventListener('contextmenu', (e) => {
       e.preventDefault();
   });
   ```

3. **Control de Reproducción**
   - Deshabilitación de controles de descarga
   - Prevención de copiar/pegar
   - Bloqueo de capturas de pantalla

## Diseño y Estilos

### Características de Diseño
1. **Diseño Responsivo**
   - Layout flexible de dos columnas
   - Adaptación a diferentes tamaños de pantalla

2. **Interfaz Moderna**
   - Efectos de hover suaves
   - Sombras y elevaciones
   - Scroll personalizado

3. **Optimización Visual**
   - Fuentes optimizadas para lectura
   - Espaciado consistente
   - Jerarquía visual clara

## Requisitos Técnicos

### Navegador
- Soporte para JavaScript moderno
- Compatibilidad con HLS
- Navegadores modernos (Chrome, Firefox, Safari, Edge)

### Servidor
- Configuración para archivos .m3u8 y .ts
- Soporte para streaming HLS

## Mantenimiento y Actualización

### Agregar Nuevo Contenido
1. Crear nueva carpeta en `/declaraciones`
2. Seguir estructura de carpetas establecida
3. Convertir video a formato HLS
4. Implementar archivos HTML, CSS y JS

### Conversión de Videos mp4 a m3u8
Comando FFmpeg para convertir videos:
```bash
ffmpeg -i video.mp4 -hls_time 10 -hls_list_size 0 -f hls video.m3u8
```

## Mejoras Planificadas

1. **Seguridad**
   - Sistema de autenticación
   - Cifrado de segmentos HLS
   - Integración con CDN

2. **Funcionalidad**
   - Sistema de búsqueda
   - Reproductor personalizado
   - Tracking de progreso

3. **Rendimiento**
   - Optimización de carga
   - Caché inteligente
   - Compresión mejorada

## Notas Importantes
- El sistema implementa seguridad básica pero no es infalible
- Se recomienda mantener actualizadas las dependencias
- Revisar periódicamente las medidas de seguridad
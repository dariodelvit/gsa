# Grupo Scout ACRUX 518 · Mapa Estelar Global Interactivo

> **Experiencia web astronómica e interactiva conmemorativa para el Grupo Scout ACRUX 518 de Valladolid (ASDE - Exploradores de Castilla y León).**

Una interfaz de exploración espacial minimalista y fluida construida en **HTML5 Canvas 2D, JavaScript Vanilla puro y CSS moderno**, con diseño de vanguardia inspirado en estándares internacionales (*Awwwards* / *FWA*).

---

## 🌌 Visión y Concepto

La web se estructura como un **firmamento cósmico navegable**, donde cada área, unidad educativa, campamento y recuerdo del grupo está integrado en constelaciones reales y geométricas conectadas por la estrella guía **Acrux (α Crucis)**.

### Los 5 Sectores del Cosmos:
1. **Sector I · Cruz del Sur (`Crux Australis`):**
   - Reproducción astronómicamente fiel de la constelación de la Cruz del Sur: **Acrux** (base meridional), **Gacrux** (cima carmesí), **Mimosa** (brazo izquierdo), **Imai** (brazo derecho) y la **Intrometida** (ε Crucis).
   - Acceso al Drawer lateral de Identidad Scout (historia desde 1977, pañoleta carmesí y blanca, valores y método educativo).
2. **Sector II · El Camino de las Unidades:**
   - Las 5 ramas educativas representadas en una constelación de **línea recta ascendente**:
     1. **Castores** (6 a 8 años · Colonia Odisea)
     2. **Manada** (8 a 11 años · Manada Waingunga)
     3. **Tropa** (11 a 14 años · Tropa Lohengrin)
     4. **Unidad Esculta** (14 a 17 años · Unidad Esculta Trea)
     5. **Clan** (17 a 21 años · Clan Rover Ama Dablam)
   - **Super-Zoom Hiperespacial:** Al pulsar en cualquier unidad, la cámara ejecuta un salto fluido estilo *hiperespacio* que sumerge al usuario dentro de la estrella, abriendo su pestaña exclusiva con pedagogía, lema, colores de rama y el **Kraalete específico (scouters asignados a esa unidad)**.
3. **Sector III · Constelación de Campamentos:**
   - Constelación geométrica en estrellas blancas puras que representan las grandes aventuras del grupo: *Campamento de Verano*, *Campamento de Invierno*, *Acampada de Primavera* y *Senda de Vivac / Raids*.
   - Super-Zoom hacia la ficha de cada campamento con crónica, ubicación geográfica, 3 fotos destacadas y botón directo a la carpeta comunitaria de Google Drive.
4. **Sector IV · «El Baúl» (Objetos Perdidos):**
   - Constelación de aspecto astronómico natural presidida por la estrella central «El Baúl» (con fulgor carmesí Acrux).
   - Conectada a 4 mini-estrellas secundarias («Cajones»), sincronizadas con las carpetas de Google Drive donde las familias pueden localizar prendas y material extraviado.
5. **Sector V · Bases y Contacto:**
   - Información de la sede física en Carretera de Rueda 53 (Valladolid), calendario de sábados lectivos, preguntas frecuentes y canales oficiales de comunicación.

---

## 🌟 Modo 50º Aniversario (1976 – 2026)

Conmemoración del medio siglo de historia del grupo mediante una transformación estética en **Negro Obsidiana y Oro Puro**:

- **El Cometa Dorado (Easter Egg Celeste):**
  - Un bólido dorado de núcleo blanco puro y estela de partículas de polvo de oro que cruza periódicamente el firmamento (cada ~8–12 segundos).
  - Cruza la pantalla a alta velocidad (~3.6s de vuelo) con trayectoria diagonal. Al hacer clic sobre él en pleno vuelo, se desbloquea el modo conmemorativo.
- **Supernova Shockwave:**
  - Onda expansiva circular a 60 fps con 80 partículas de polvo dorado que tiñe toda la interfaz.
- **Paleta de Lujo:**
  - El espacio se vuelve Negro Obsidiana (`#030304`).
  - Líneas estelares, halos, tipografías y cursor transicionan a tonos **Oro Imperial (`#D4AF37`)**, **Champán (`#F3E5AB`)** y **Bronce Antiguo (`#AA771C`)**.
- **La Espiral del Tiempo (50 Estrellas · 1976 a 2026):**
  - Emerge una espiral logarítmica de Fibonacci con exactamente 50 estrellas doradas alrededor de la Cruz del Sur.
  - Cada estrella representa un año scout. Las estrellas con recuerdos desbloqueados palpitan en oro y abren un **Modal de Cristal Conmemorativo** con foto histórica, año en tipografía display y conector a la carpeta `05_50_ANIVERSARIO` de Google Drive.
  - **Rendimiento:** Las imágenes históricas utilizan *Lazy Loading* estricto y se descargan únicamente al abrir ese recuerdo puntual, liberando memoria de inmediato al cerrar.

---

## 📁 Estructura del Proyecto

```text
GSA/
├── index.html              # Estructura semántica, canvas de navegación, HUD y modales
├── styles.css              # Arquitectura CSS moderna (variables, temas, obsidian/gold, responsive)
├── script.js               # Motor astronómico en Canvas 2D, física de partículas, cámara y eventos
├── images/                 # Fotografías de campamentos, unidades y recuerdos históricos
│   ├── castores/
│   ├── manada/
│   ├── tropa/
│   ├── escultas/
│   ├── clan/
│   └── campamentos/
├── _archivo_legacy/        # Archivo seguro de versiones y páginas multi-página descartadas
└── README.md               # Documentación oficial del proyecto (este archivo)
```

---

## 🚀 Puesta en Marcha en Local

No requiere NodeJS, npm, Webpack ni dependencias externas. Se ejecuta directamente en cualquier navegador moderno:

1. **Abrir directamente:**
   - Haz doble clic en [`index.html`](index.html) para abrirlo en Edge, Chrome, Firefox, Safari u Opera.
2. **Servidor local (opcional / recomendado):**
   - Mediante la extensión *Live Server* de Visual Studio Code o cualquier servidor HTTP estático:
     ```bash
     # Con Python 3
     python -m http.server 8080
     
     # Con PHP
     php -S localhost:8080
     ```
   - Accede a `http://localhost:8080`.

---

## 🔗 Parámetros de Prueba y Navegación Rápida (URL / Hash)

Puedes testear estados específicos añadiendo parámetros al final de la URL:

- `#anniversary=1` → Inicia la web con el **Modo 50º Aniversario** activado.
- `#annivModal=1976` → Abre directamente el modal conmemorativo del año fundacional 1976.
- `#sector=1` → Salta de inmediato al Sector II (**El Camino de las Unidades**).
- `#sector=2` → Salta de inmediato al Sector III (**Constelación de Campamentos**).
- `#sector=3` → Salta de inmediato al Sector IV (**El Baúl · Objetos Perdidos**).
- `#testComet=1` → Fuerza la trayectoria del cometa dorado a mitad de pantalla para pruebas.

---

## 🛠️ Conexión con Google Drive

Las rutas a carpetas de Google Drive están centralizadas en constantes en la cabecera de [`script.js`](script.js):

- `DRIVE_ANNIVERSARY_FOLDER`: Nombre de la carpeta de recopilación histórica del 50º aniversario (`05_50_ANIVERSARIO`).
- `DRIVE_ANNIVERSARY_URL`: Enlace público a la carpeta Drive del 50 aniversario.
- `DRIVE_LOST_BASE_URL`: Enlace raíz para los cajones de Objetos Perdidos.
- Cada campamento en `CAMPS_DATA` cuenta con su respectivo campo `driveFolder` y `driveUrl`.

---

## 📐 Convenciones y Directrices de Estilo

1. **Lenguaje y Terminología:**
   - Eliminación total de la expresión *"Ronda Solar"*; se utiliza en su lugar *"año scout"* o *"etapa scout"*.
2. **Optimización Gráfica:**
   - El Canvas 2D se ejecuta a **60 fps estables** adaptando su resolución a `window.devicePixelRatio`.
   - Limpieza automática de búferes de partículas e interpolación suave (Lerp) en cámara y cursor magnético.
3. **Compatibilidad:**
   - Totalmente adaptable a pantallas de escritorio, portátiles, tablets y dispositivos táctiles.

---

© 1977 – 2026 **Grupo Scout ACRUX 518** · ASDE Exploradores de Castilla y León · Valladolid, España.

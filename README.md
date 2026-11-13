# Manual de la Web · Grupo Scout ACRUX 518 ⚜️

¡Buenas, gente! Si estás leyendo esto es porque te toca gestionar, meter mano o actualizar la web.

Te dejo esta guía escrita directamente de tú a tú, clara y al grano, para que no te pierdas entre código. Aquí tienes **cómo funciona todo el bicho por dentro**, qué se gestiona automáticamente desde nuestro Google Drive (el 95% del día a día) y **dónde está exactamente cada cosa que está hardcodeada** (textos fijos, fotos locales, títulos, colores, etc.) por si necesitas cambiarlas cuando empiece una nueva Ronda.

---

## 1. Estado del Proyecto (Hoja de Ruta / Checklist)

Aquí tenéis la lista de tareas del proyecto para ver de un vistazo qué está hecho y qué falta por rematar. Se puede actualizar directamente marcando `[x]` o `[ ]`:

- [x] ~~**Versión móvil**~~ *(Adaptación de Canvas con 100dvh, toques táctiles con umbral anti-drag, ocultación de textos pesados y modales a pantalla completa)*
- [x] ~~**Versión más clara (diurna)**~~ *(Modo Día estelar azul cobalto por defecto con toggle luminoso/noche en la cabecera)*
- [x] ~~**Inscripción como estrella en la página principal**~~ *(Estrella `β Inscripciones` / `mimosa` conectada a Google Forms desde Drive)*
- [x] ~~**Foto al principio para que sea más amigable**~~ *(Tarjeta de bienvenida en Sector I cargando `images/Portada.jpg` con zoom y fallback a `Tropa.jpg`)*
- [ ] **Documentos** *(Estrella `γ Documentos` en Sector I para reglamentos, circulares y autorizaciones oficiales)*
- [ ] **Estrella de Kraal** *(Estrella `δ El Kraal` en Sector I con organigrama y equipo global de scouters)*
- [x] ~~**Cambiar el tipo de letra**~~ *(Fraunces en títulos serif editoriales, Montserrat en rótulos y Plus Jakarta Sans en textos de lectura)*
- [ ] **Estrella de Calendario** *(Ronda solar, salidas trimestrales y fechas destacadas)*

---

## 2. La filosofía: ¿Cómo está montada la web?

Nuestra web no es un WordPress pesado ni una plantilla genérica que se rompe sola. Es un **mapa estelar interactivo en Canvas a 60 fps** que tiene dos motores trabajando juntos:

1. **La base local ultrarrápida (en el repositorio):**
   * El esqueleto HTML, los estilos CSS y los datos fijos de respaldo (fallback) cargan en milésimas de segundo para que las familias o chavales nunca vean una pantalla en blanco.
   * Por defecto, la web arranca en **Modo Día / Cielo Luminoso** (azul cobalto estelar) con tipografías elegantes (**Montserrat**, **Fraunces** y **Plus Jakarta Sans**), pero el usuario puede alternar al Modo Noche cuando quiera con el botón del sol/luna en la cabecera.
2. **El conector en tiempo real con Google Drive (`Código.gs` + Apps Script):**
   * Nada más abrir la página, el navegador consulta en segundo plano nuestro script conector (`DRIVE_API_URL` en `script.js`).
   * El script lee nuestro Drive oficial y nos trae en vivo las fotos de cada rama, los campamentos, los cromos del Kraal, los cajones del Baúl, los coordinadores y los formularios de Merch e Inscripciones.
   * Guarda una copia en la caché local del móvil (`localStorage`) para que, si el Drive tarda o la cobertura falla en un campamento, la web siga cargando como un tiro.

---

## 3. Mapa del Repositorio: Dónde está cada archivo

El proyecto consta de estos archivos esenciales:

```text
GSA/
├── index.html       → El DOM, los modales, las ventanas emergentes y enlaces a scripts/estilos.
├── styles.css       → Todos los estilos visuales, efectos glassmorphism, modales y versión móvil.
├── script.js        → El motor estelar Canvas 60fps, lógica de toques/clics, carga de Drive y modales.
├── Código.gs        → El script que pegamos en Google Apps Script para sincronizar con Google Drive.
├── README.md        → Este manual que estás leyendo.
└── images/          → Fotos locales fijas (de portada de unidades, bienvenida, logos, etc.).
```

---

## 4. ¿Dónde y cómo se cambian las cosas hardcodeadas? (Textos, fotos y títulos fijos)

Aunque la mayoría de datos vienen de Drive, hay elementos clave que están fijos en el código o en la carpeta `images/` para asegurar que carguen instantáneamente. Aquí tienes la chuleta exacta:

### A) Las Fotografías Locales (Carpeta `images/`)
No dependas de la nube para las fotos de apertura. Si queréis renovar las fotos de portada de la web al empezar la ronda, simplemente sustituid estos archivos en la carpeta `images/` manteniendo el mismo nombre:

* **Foto de bienvenida de la portada (Sector I):**
  * Se muestra en la tarjeta flotante de la pantalla principal bajo el título "Grupo Scout Acrux 518".
  * Guarda tu foto en `images/Portada.jpg` (con "P" mayúscula).
  * *Respaldo automático:* Si el archivo no existe o falla, la web cargará sola `images/Tropa.jpg` para no dejar el marco vacío.
* **Fotos panorámicas de cabecera de las 5 Ramas (Sector II):**
  * `images/Castores.jpg` → Portada de Colonia Ohiensis.
  * `images/Manada.jpg` → Portada de Manada Khanhiwara.
  * `images/Tropa.jpg` → Portada de Tropa Lohengrin.
  * `images/Escultas.jpg` → Portada de Unidad Esculta Trea.
  * `images/Clan.jpg` → Portada de Clan Rover Ama Dablam.
  * *Tip:* Súbelas en formato horizontal panorámico (ejemplo: 1600x900 px o similar) y bien optimizadas para web (en torno a 200-400 KB).

---

### B) Títulos y Textos Fijos de las Ramas (`script.js` → `UNITS_DATA`)
Si alguna unidad cambia de lema, de edades, de colores o de texto explicativo, abre [script.js](file:///C:/Users/dario/Documents/Scouts/GSA/script.js) y busca la constante `UNITS_DATA` (aprox. entre las líneas 440 y 720).

Cada unidad tiene su bloque con esta estructura:
```javascript
{
    id: 'castores',
    shortName: 'Castores',
    fullName: 'Colonia Ohiensis',
    ageRange: '6 a 8 años',
    lema: 'Compartir',
    color: '#3B82F6',             // Color que identifica a la rama
    heroIntro: 'La Colonia Ohiensis es el primer paso en el escultismo...',
    summary: '...',
    stages: [                     // Etapas de progresión de la rama
        { name: 'Integración', desc: '...' },
        { name: 'Participación', desc: '...' },
        { name: 'Animación', desc: '...' }
    ],
    defaultKraal: [ ... ]         // Scouters de respaldo por si Drive estuviera desconectado
}
```

---

### C) Títulos y Textos de los 4 Sectores del Universo (`script.js` → `SECTORS`)
En [script.js](file:///C:/Users/dario/Documents/Scouts/GSA/script.js) (entre líneas 730 y 850) vive el array `SECTORS`, que define lo que dice cada sector cuando navegas por el mapa estelar:

* **Sector 0 (Sector I):** Estrella Guía Acrux 518 (`headingHTML`, descripción, estrellas de la Cruz del Sur).
* **Sector 1 (Sector II):** Constelación de Unidades (`Castores`, `Manada`, `Tropa`, `Escultas`, `Clan`).
* **Sector 2 (Sector III):** Constelación de Campamentos (`Verano` y `Semana Santa`).
* **Sector 3 (Sector IV):** Constelación «El Baúl» (Objetos Perdidos).

---

### D) Equipo de Coordinación de respaldo (`script.js` → `defaultCoords`)
Si Google Drive fallase o no tuviera conexión, la web recurre al listado de emergencia `defaultCoords` en [script.js](file:///C:/Users/dario/Documents/Scouts/GSA/script.js) (alrededor de la línea 3450):
* Contiene los nombres, cargos y teléfonos fijos de respaldo (ej. Laura García, Maru, etc.).
* Para actualizarlos en vivo no hace falta tocar el código: se hace directamente en Google Drive en la carpeta `03_COORDINACION` (te explico cómo más abajo).

---

### E) Redes Sociales y Datos Oficiales de Contacto
* En [script.js](file:///C:/Users/dario/Documents/Scouts/GSA/script.js) (bloque `#acrux-redes`, líneas 3580 a 3620) están los enlaces a los perfiles oficiales:
  * Instagram Grupo: `https://www.instagram.com/gruposcoutacrux518/`
  * Instagram Escultas: `https://www.instagram.com/escultas_trea/`
  * Instagram Clan: `https://www.instagram.com/clan_amadablam/`
  * Facebook: `https://www.facebook.com/GrupoScoutAcrux518`
  * Correo oficial: `gruposcoutacrux518@gmail.com`
* Sede: **Carretera de Rueda, 53 (47008 Valladolid)**.
* Horarios de base: **Sábados de 16:30 a 19:00 h**.

---

## 5. Cómo funciona la conexión con Google Drive (El día a día)

En el Drive oficial del grupo existe una carpeta raíz dedicada a la web. Dentro de ella tenemos **7 carpetas numeradas**. **¡OJO! No cambies nunca el nombre de estas carpetas principales**, porque el conector de Google Apps Script las busca exactamente así:

```text
GOOGLE DRIVE OFICIAL
├── 01_UNIDADES/
│   ├── Castores/
│   ├── Manada/
│   ├── Tropa/
│   ├── Escultas/
│   └── Clan/
│
├── 02_CAMPAMENTOS/
│   ├── Verano/           (¡o carpetas sueltas con nombre "Verano"!)
│   └── Semana Santa/     (¡o carpetas sueltas con nombre "Semana Santa" / "Pascua"!)
│
├── 03_COORDINACION/
│   └── (Fotos de los coordinadores: Nombre | Descripción | Teléfono)
│
├── 04_OBJETOS_PERDIDOS/
│   ├── Cajón 01 · Vilviestre/
│   └── Cajón 02 · Salida Otoño/
│
├── 05_50_ANIVERSARIO/
│   └── (Fotos históricas con el año en el nombre: 1977.jpg, 1985.jpg...)
│
├── 06_INTENDENCIA/
│   └── (Google Forms de sudaderas, camisetas, merchandising + fotos de muestra)
│
└── 07_INSCRIPCIONES/
    └── (Google Form oficial de inscripciones / sábado de prueba + fotos opcionales)
```

Veamos qué hace y cómo se gestiona cada una:

---

### Carpeta `01_UNIDADES` (Cromos y Salidas)
Entra en la subcarpeta de la rama que quieras (por ejemplo, `01_UNIDADES/Tropa/`):

1. **Cromos de los Scouters (Kraaletes):**
   * Sube una foto en formato vertical del monitor (ideal proporción 3:4).
   * **Nombre del archivo:** El nombre scout o apodo selva (ejemplo: `Baloo.jpg`, `Rusty.jpg`, `Bagheera.jpg`).
   * **Nombre Real, Biografía y Descripción:**
     * En Drive, haz clic derecho sobre la foto > **Información del archivo** > **Detalles** (o pulsa la **ⓘ** arriba a la derecha).
     * En el campo **«Descripción»**, escribe:
       ```text
       Nombre Real | Biografía divertida o experiencia scout
       ```
       *Ejemplo:* `Darío | 10 años en el grupo, amante de las marchas de montaña y scouter de Tropa.`
     * En la web aparecerá el cromo interactivo 3D con su apodo, su nombre real entre comillas y al pulsar se abrirá el modal *Split-Card* con su ficha completa.
2. **Salidas y Acampadas de Unidad:**
   * Dentro de la rama, crea una subcarpeta para la salida (ejemplo: `2025-11 Acampada Pinar de Antequera`).
   * Suelta dentro las fotos. La web seleccionará automáticamente las 3 mejores para la portada y generará la tarjeta con el cajón de contraseña para que las familias abran el álbum completo en Google Drive.

---

### Carpeta `02_CAMPAMENTOS` (Clasificación 100% por estructura de carpetas)
¡Cero adivinanzas por palabras raras en los títulos! La web clasifica si un campamento es de **Verano** o de **Semana Santa / Invierno** según dónde lo coloques:

* **Opción recomendada:** Crea dentro dos carpetas: `Verano` y `Semana Santa` (o `Pascua`). Todo lo que metas dentro de una u otra se colocará automáticamente en su constelación correspondiente.
* **Opción directa:** Si prefieres carpetas sueltas, basta con que el nombre de la carpeta contenga la palabra `Verano` o `Semana Santa` / `Pascua`.
* **Regla del año:** Pon siempre el año de 4 cifras (ejemplo: `2024 - Cofiñal`, `2025 - Vilviestre`). La web los ordenará cronológicamente en el cielo y pintará automáticamente el **último campamento como una estrella roja destacada**.
* **Fotos de portada:** Si quieres que las 3 fotos de portada del campamento sean unas concretas, nómbralas con `01_grupo.jpg`, `02_fuego.jpg`, `03_marcha.jpg`.

---

### Carpeta `03_COORDINACION` (Formato Nombre | Descripción | Teléfono)
Para cambiar quién está en coordinación o sus teléfonos:
1. Sube la foto del coordinador a `03_COORDINACION/` (ejemplo: `Maru.jpg` o `Laura.jpg`).
2. En Drive, haz clic derecho > **Información** > **Detalles** > **Descripción**.
3. Sigue estrictamente este formato con dos barras verticales `|`:
   ```text
   Nombre | Cargo o pequeña descripción | Teléfono
   ```
   * *Ejemplo con teléfono:* `Darío | Coordinador de Grupo y chico genial | 698 91 46 97`
   * *Ejemplo sin teléfono:* `Laura | Coordinadora de Grupo y scouter de Clan |` (o sin poner la última barra).
4. **Comportamiento automático:**
   * La web toma el nombre escrito en la descripción (`Darío`) y lo muestra como título de la tarjeta.
   * **El número de teléfono solo se lee y muestra si la foto está en `03_COORDINACION`**. Si esa misma foto se usa como scouter de rama en Unidades, allí no saldrá ningún teléfono.
   * **Si no pones teléfono, la web oculta automáticamente los botones de Llamar y WhatsApp**, mostrando solo su ficha y foto.

---

### Carpeta `04_OBJETOS_PERDIDOS` (El Baúl)
* Cada subcarpeta dentro de `04_OBJETOS_PERDIDOS/` es un **cajón** (ejemplo: `Cajón 01 · Vilviestre 2025 | Ropa recogida tras el campamento`).
* Sube dentro las fotos de las prendas o cantimploras encontradas.
* Si el archivo contiene palabras como `sudadera`, `bota`, `cantimplora` o `saco`, la web activa filtros automáticos para que los padres encuentren las cosas en dos clics.
* Cada objeto tiene un botón directo para reclamarlo por WhatsApp a Coordinación.

---

### Carpeta `05_50_ANIVERSARIO` (Recuerdos del 50º)
* Cada foto con el año en el nombre (ejemplo: `1977.jpg`, `1992.jpg`, `2026.jpg`) enciende una de las 50 estrellas de la espiral dorada que aparece al pulsar el Cometa Dorado en el Sector I.

---

### Carpeta `06_INTENDENCIA` (Tienda de Merchandising)
* Simplemente crea o mete aquí el **Google Form** de la campaña de ropa (sudaderas, camisetas, etc.) y las fotos de la prenda.
* La estrella **`ε Merch`** del Sector I se encenderá sola.
* Si hay más de un formulario activo, se crearán estrellas satélite conectadas y un selector arriba para cambiar de camiseta/artículo sin salir de la tienda.
* Las familias seleccionan talla, color y sus datos, y la web envía el pedido directamente al formulario de Google sin abrir jamás la interfaz blanca de Drive.

---

### Carpeta `07_INSCRIPCIONES` (Estrella `β Inscripciones` / `mimosa`)
* Funciona **exactamente con la misma tecnología que el Merch**, pero dedicada a inscripciones y sábados de prueba:
  1. Suelta en `07_INSCRIPCIONES/` el Google Form oficial de inscripción del grupo.
  2. Si quieres, suelta también fotos del grupo o de actividades en esa carpeta; se usarán en el escaparate lateral.
  3. En el mapa estelar, la estrella **`β Inscripciones` (`mimosa`)** está conectada directamente a este formulario.
  4. Al hacer clic en la estrella o en el botón **`Contacto`** de arriba a la derecha, la web vuela hacia `mimosa` y abre el modal dinámico con los campos del formulario (incluyendo desplegables de ramas, textos, fechas y casillas múltiples), enviando la solicitud directamente al Google Form sin intermediarios.

---

## 6. El truco maestro de la caché (`?v=XX`)

Cuando hagas cambios en los archivos de la web (`index.html`, `styles.css` o `script.js`) y los subas a GitHub, **los navegadores y sobre todo los móviles guardan en memoria los archivos viejos**.

Para obligar a que todo el mundo vea los cambios al instante sin tener que vaciar la caché de su teléfono:
1. Abre [index.html](file:///C:/Users/dario/Documents/Scouts/GSA/index.html).
2. En la línea 15 aproximadamente verás:
   ```html
   <link rel="stylesheet" href="styles.css?v=27.0">
   ```
3. Al final del archivo (línea 676 aprox.) verás:
   ```html
   <script src="script.js?v=27.0"></script>
   ```
4. **Sube el número de versión** (por ejemplo, cámbialo a `28.0` o `29.0`). 
5. ¡Listo! En cuanto subas eso a GitHub, cualquier móvil que entre descargará los archivos nuevos sin rechistar.

---

## 7. Si tocas el Google Apps Script (`Código.gs`)

Si alguna vez añades funciones nuevas a `Código.gs`:
1. Abre el proyecto en [script.google.com](https://script.google.com).
2. Pega el código actualizado de `Código.gs`.
3. Dale a **Implementar > Nueva implementación**.
4. Tipo: **Aplicación web**.
5. Ejecutar como: **Yo** (tu cuenta).
6. Quién tiene acceso: **Cualquiera** (*Anyone*).
7. Si la URL cambia, pégala en la variable `DRIVE_API_URL` al principio de `script.js`.

---

*Manual actualizado y verificado para la Ronda 2026. ¡Buena caza y largas lunas!* ⚜️ Acrux 518

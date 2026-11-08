# Manual de la Web · Comisión de Página Web (Grupo Scout ACRUX 518)

¡Buenas, equipo de web! Si estás leyendo este documento es porque te toca gestionar, actualizar o meter mano a la web del **Grupo Scout Acrux 518**. 

Este manual está escrito de scouter a scouter, sin tecnicismos raros, para que cualquiera de la comisión pueda entender **cómo está montada la página**, cómo subir fotos, campamentos, cromos o pedidos de merch **directamente desde Google Drive sin tener que tocar una sola línea de código**, y qué editar en los archivos si al empezar la Ronda Solar hay que cambiar textos, fotos de cabecera o monitores.

---

## 1. ¿Cómo funciona la web por dentro? (La filosofía)

Nuestra web no es la típica página de WordPress pesada ni un sitio estático que se queda desfasado a los tres meses. Es un **Mapa Estelar Interactivo** que vuela a 60 fps en el navegador y que está **conectado en tiempo real con nuestro Google Drive**.

El flujo funciona así:
1. Cuando alguien entra (sea una familia, un chaval o un scouter), la web carga en décimas de segundo el diseño base y las fotos locales de portada para que la experiencia sea inmediata.
2. Por detrás, de forma transparente, hace una llamada a nuestro script conector de Google Drive (`DRIVE_API_URL` en `script.js`).
3. El script escanea nuestro Drive y devuelve las carpetas de **Campamentos**, las **Salidas de cada Rama**, los **Cromos de los Kraaletes**, los **Cajones de Objetos Perdidos**, las fotos de **Coordinación** y los formularios de **Merch**.
4. Con esa información, la web dibuja sola las constelaciones en el cielo y monta las galerías.

> **En resumen:** El 95% del mantenimiento habitual de la web consiste simplemente en crear carpetas y soltar fotos dentro del Google Drive del grupo.

---

## 2. La regla de oro: Estructura de carpetas en Google Drive

En la cuenta de Google Drive oficial del grupo hay una carpeta principal dedicada a la web. Dentro de ella tenemos estas **6 carpetas numeradas**. El conector busca estos nombres exactos, así que **nunca cambiéis ni renombréis estas carpetas raíz**:

```text
CARPETA PRINCIPAL EN GOOGLE DRIVE
│
├── 01_UNIDADES/
│   ├── Castores/
│   ├── Manada/
│   ├── Tropa/
│   ├── Escultas/
│   └── Clan/
│
├── 02_CAMPAMENTOS/
│   ├── 2023 - Cóbreces/
│   ├── 2024 - Cofiñal/
│   ├── 2024 - Valdeavellano de Tera/
│   ├── 2025 - Arija/
│   ├── 2025 - Vilviestre del Pinar/
│   └── ... (las carpetas de campamentos que vayáis sumando)
│
├── 03_COORDINACION/
│   └── (Fotos de los coordinadores: Nombre | Cargo | Teléfono)
│
├── 04_OBJETOS_PERDIDOS/
│   ├── Cajón 01 · Campamento de Verano/
│   ├── Cajón 02 · Acampada de Otoño/
│   └── ... (una subcarpeta por cada cajón que abráis)
│
├── 05_50_ANIVERSARIO/
│   └── (Fotos y recuerdos por año para el modo conmemorativo)
│
└── 06_INTENDENCIA/
    └── (Formularios de Google Forms para sudaderas, camisetas o material)
```

A continuación os explicamos cómo se gestiona cada sección en detalle.

---

## 3. Sector II · Unidades, Cromos de Kraaletes y Salidas (`01_UNIDADES`)

Cuando alguien entra en el **Sector II (Unidades)** del mapa estelar, verá la constelación en línea recta ascendente con las cinco ramas ordenadas de menor a mayor edad: `1 · Castores`, `2 · Manada`, `3 · Tropa`, `4 · Escultas` y `5 · Clan`. 

Al hacer clic en cualquiera de ellas, se hace zoom y se entra a la ficha completa de esa rama.

### A) La Foto de Portada de la Unidad (en local, carpeta `images/`)
En lo alto de la página de cada unidad se muestra una foto panorámica horizontal de la rama.
* **¿Por qué está en local y no en Drive?** Porque es lo primero que se ve al abrir la rama y queremos que cargue al milisegundo sin depender de la velocidad de los servidores de Google.
* **Ubicación y nombres exactos:**
  * Castores: `images/Castores.jpg`
  * Manada: `images/Manada.jpg`
  * Tropa: `images/Tropa.jpg`
  * Escultas: `images/Escultas.jpg`
  * Clan: `images/Clan.jpg`
* **¿Cómo actualizarla en una nueva Ronda Solar?** Guardáis la foto nueva de la rama en formato horizontal, le ponéis el mismo nombre (ej. `Castores.jpg`) y sustituís el archivo dentro de `images/`.

---

### B) Los Cromos de los Scouters (Kraaletes) y la Vista Ampliada (Split-Card)
En el bloque **«02 · Los Kraaletes de la Unidad»** se muestra una rejilla de cartas coleccionables verticales con estética holográfica 3D (se inclinan y brillan siguiendo el movimiento del cursor).

#### Cómo subir un cromo nuevo a Google Drive:
1. Entrad en `01_UNIDADES/` y abrid la carpeta de la rama correspondiente (ej. `01_UNIDADES/Castores/`).
2. Subid la fotografía vertical del scouter (proporción vertical **3:4**, por ejemplo `900 x 1200 px` en `.jpg` o `.png`).
3. **Nombre del archivo:** El apodo scout o de selva del monitor (ejemplo: `Rusty.jpg`, `Baloo.jpg`, `Kapi.jpg`). Si además queréis definir su cargo en el archivo, podéis separarlo con una barra: `Rusty | Scouter de Colonia.jpg`.
4. **Nombre Real y Biografía (Propiedad «Descripción» de Drive):**
   * Haced clic derecho sobre la foto en Google Drive > **Información del archivo** > **Detalles** (o el botón **ⓘ** que hay arriba a la derecha en Drive).
   * En el campo **«Descripción»**, escribid los datos siguiendo este formato con una barra vertical `|`:
     ```text
     Nombre Real | Biografía o descripción divertida del scouter
     ```
   * *Ejemplo real:*
     ```text
     Darío | Hola, soy Darío llevo 14 años en...
     ```

#### ¿Qué ocurre cuando alguien hace clic en un cromo?
Al hacer clic en cualquier tarjeta de la rejilla se abre el **Modal Split-Card en 2 columnas**:
* **Columna izquierda:** La fotografía vertical del cromo a gran tamaño con marco estelar limpio y brillo holográfico.
* **Columna derecha (Ficha Editorial):** 
  * Badge superior con el número y rama del Kraalete.
  * Título grande con su apodo scout (ej. **RUSTY**).
  * Subtítulo con su nombre real entre comillas y su rama (ej. *«Guillermo» · Castores · Colonia Ohiensis*).
  * Párrafo con la biografía completa que habéis escrito en Drive.
  * Botón para cerrar en la esquina o pulsando la tecla `ESC`.

> **Limpieza automática:** Si al escribir en Drive habéis copiado y pegado texto con formato rico desde WhatsApp o Docs, la web elimina automáticamente cualquier etiqueta `<div>` o código oculto para que el texto siempre quede 100% limpio en pantalla.

---

### C) Salidas y Acampadas de Rama (`01_UNIDADES/[Rama]/[Nombre_Salida]`)
En el bloque **«03 · Aventuras, Salidas y Campamentos»** se publican los álbumes de las salidas trimestrales de cada rama:
1. Dentro de la carpeta de la rama en Drive, cread una subcarpeta con el nombre de la actividad (ejemplo: `2025-11 Acampada Pinar de Antequera`).
2. Meted dentro las fotos de la salida.
3. La web generará sola una tarjeta con las **3 fotos más representativas** (que se pueden ampliar a pantalla completa en el visor) y el cajón con contraseña para que las familias abran el álbum completo en Google Drive.

---

## 4. Sector III · Campamentos de Grupo (`02_CAMPAMENTOS`)

El Sector III es totalmente dinámico: **no hay campamentos hardcodeados en el código**. Cada subcarpeta que creéis dentro de `02_CAMPAMENTOS` se convierte en una estrella del mapa estelar.

### A) Dos constelaciones: Verano y Semana Santa
La web divide el cielo de campamentos en dos hemisferios:
* Arriba: **Campamentos de Verano** (constelación en tonos dorados cálidos).
* Abajo: **Campamentos de Semana Santa** (constelación en tonos verde esmeralda).

### B) La regla del año en el nombre de la carpeta
Poned siempre el **año de 4 cifras** en el nombre de la carpeta:
* `2024 - Cofiñal`
* `2025 - Vilviestre del Pinar`
* `2026 - Alcalá de Moncayo SS`

Esto permite que:
1. La web ordene las estrellas cronológicamente de izquierda a derecha.
2. Genere etiquetas limpias en el mapa estelar (ej. `α 2024` y debajo `Cofiñal`).
3. El **último campamento realizado** se pinte automáticamente como una **Estrella Roja Destacada** más grande y brillante.

### C) Elegir las 3 fotos de portada del campamento
Al abrir un campamento se muestran 3 fotos destacadas. Si queréis asegurar cuáles son esas 3 fotos sin que Drive las ordene al azar, renombradlas con un prefijo numérico: `01_foto_grupo.jpg`, `02_fuego.jpg`, `03_marcha.jpg`.

---

## 5. El Sistema de Contraseñas de los Álbumes de Fotos

Por privacidad y protección a la infancia:
* Las fotos de muestra (las 3 portadas) son públicas para mostrar la vida scout del grupo a quien visite la web.
* El enlace a la carpeta completa de Google Drive (donde están los cientos de fotos del campamento) **nunca está visible en el código fuente**.
* Para desbloquearlo, la familia introduce la contraseña oficial del grupo en el cajetín del álbum. La web valida la clave contra el script y, solo si coincide, abre la carpeta de Drive en una pestaña nueva.

---

## 6. Sector IV · «El Baúl» de Objetos Perdidos (`04_OBJETOS_PERDIDOS`)

Para no saturar los grupos de WhatsApp de familias con fotos sueltas de ropa después de cada salida, tenemos el Sector IV.

### A) Los Cajones de Material
Cada subcarpeta creada en `04_OBJETOS_PERDIDOS` se convierte en un **cajón seleccionable**.
* Podéis usar una barra `|` en el nombre de la carpeta para poner título y descripción:
  `Cajón 01 · Vilviestre 2025 | Prendas encontradas tras el campamento de verano`
* Si el baúl está vacío porque se ha devuelto todo el material, no hay fallo: la web avisa con un mensaje limpio indicando que todo el material está en casa.

### B) Filtros automáticos por nombre de archivo
La web incluye filtros rápidos (*Todas*, *Ropa y Sudaderas*, *Cantimploras y Menaje*, *Calzado*, *Sacos y Aislantes*). Para que clasifique la foto sola en su categoría, basta con que el archivo contenga la palabra clave:
* **Ropa:** `sudadera`, `camiseta`, `polar`, `pantalon`, `gorro`, `bañador`, `chaqueta`...
* **Cantimploras y menaje:** `cantimplora`, `botella`, `poto`, `plato`, `cubierto`, `navaja`...
* **Calzado:** `bota`, `zapatilla`, `chancla`, `sandalia`...
* **Sacos:** `saco`, `aislante`, `esterilla`, `colchoneta`...

### C) Botón «Es mío · Reclamar»
Al pulsar sobre una prenda, se abre directamente WhatsApp con un mensaje pre-redactado para Coordinación con el nombre de la prenda y el cajón, recordando que se recoge los **sábados de 16:30 a 19:00 h en Carretera de Rueda, 53**.

---

## 7. Sector I · Merch Oficial de Grupo (`06_INTENDENCIA`)

Cuando el grupo lance una campaña de sudaderas, camisetas o pañoletas:

1. **Cómo activarlo:**
   * Cread un **Google Form** en la carpeta `06_INTENDENCIA` de Drive (o moved allí uno existente).
   * La estrella secundaria **`ε Intrometida`** del Sector I se encenderá automáticamente con brillo dorado y pasará a llamarse **`ε Merch · [Nombre del Formulario]`**.
2. **Cómo lo ve la gente:**
   * Al hacer clic en la estrella de Merch se abre el modal e-commerce de pantalla completa.
   * En la barra superior hay además un botón directo: **«Abrir en Google Forms»**. De este modo, si alguien prefiere responder en la interfaz nativa de Google o habéis añadido preguntas nuevas de última hora, siempre tienen acceso al formulario en vivo al 100%.
3. **Cómo cerrarlo:**
   * Cuando termine el plazo de pedidos, sacad o borrad el Google Form de la carpeta `06_INTENDENCIA`. La estrella volverá sola a su estado astronómico inactivo.

---

## 8. Sector I · Modo 50º Aniversario (`05_50_ANIVERSARIO`)

En el Sector I, un **Cometa Dorado** cruza el cielo cada pocos segundos:
* Al hacer clic sobre el cometa, se activa el modo especial conmemorativo: la paleta de colores cambia a oro y obsidiana.
* Alrededor de Acrux se despliega una **espiral áurea de 50 estrellas doradas** (1976 - 2026).
* Al pulsar en cada estrella se abre la fotografía histórica y reseña de ese año.
* Las fotos subidas a la carpeta `05_50_ANIVERSARIO` de Google Drive se encargan de iluminar y completar los recuerdos de cada año.

---

## 9. Mantenimiento del Código (Por si hay que tocar algo a mano)

Si alguna vez tenéis que modificar algo de código (por ejemplo, textos fijos de historia, cambiar los teléfonos de Coordinación o retocar estilos), el proyecto consta únicamente de 3 archivos:

1. **`index.html`**: Estructura del DOM, modales, botones y cabeceras.
2. **`script.js`**:
   * **Línea 15 (`DRIVE_API_URL`)**: La URL del conector de Google Apps Script.
   * **`UNITS_DATA` (líneas 52 a 370)**: Lemas, etapas de progresión de cada unidad, enlaces de Instagram (`@escultas_trea` y `@clan_amadablam`) y listas por defecto de Kraaletes de respaldo.
   * **`defaultCoords` (líneas 2600 a 2630)**: Nombres y teléfonos de Coordinación por defecto (**JJ, Raksha y Hugo**) por si Drive no estuviese disponible.
3. **`styles.css`**: Todo el diseño visual, tipografías (`Outfit`, `Plus Jakarta Sans`, `JetBrains Mono`), sombras de cristal (`backdrop-filter`) y comportamiento responsivo para móviles.

### El truco de la caché al publicar cambios (`?v=XX`)
Los navegadores de los móviles guardan los archivos CSS y JS en memoria para ir más rápido. Cuando hagáis cambios en `styles.css` o `script.js` y los subáis a GitHub, recordad **subir el número de versión** en `index.html` (por ejemplo, de `styles.css?v=19.0` a `styles.css?v=20.0`). Así forzaréis a que a todos los padres y monitores se les actualice la web al instante sin tener que borrar datos de navegación.

---

## 10. Datos Oficiales del Grupo (Para no meter la pata)

* **Nombre oficial del grupo:** **Grupo Scout ACRUX 518** · Valladolid *(Cuidado con esto: no mezclar jamás con nombres de otros grupos scouts de la ciudad; nuestra estrella y sector se llaman siempre única y exclusivamente **Acrux 518**)*.
* **Sede:** Carretera de Rueda, 53 (47008 Valladolid).
* **Horario de reuniones:** Sábados de 16:30 a 19:00 h.
* **Coordinación actual:** JJ, Raksha y Hugo.
* **Canales oficiales:**
  * Instagram Grupo: [@gruposcoutacrux518](https://www.instagram.com/gruposcoutacrux518/)
  * Instagram Escultas: [@escultas_trea](https://www.instagram.com/escultas_trea/)
  * Instagram Clan: [@clan_amadablam](https://www.instagram.com/clan_amadablam/)
  * Correo: `gruposcoutacrux518@gmail.com`

---

*Cualquier duda técnica que surja, revisad este manual o hablad con la Comisión de Página Web. ¡Buena caza y siempre listos!*

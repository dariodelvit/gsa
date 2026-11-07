# Manual Interno de la Web · Comisión de Redes Sociales (Grupo Scout ACRUX 518)

¡Hola! Si estás leyendo esto es porque formas parte de la **Comisión de Redes Sociales** (o del Kraal) del **Grupo Scout Acrux 518**.

Este documento es nuestro manual interno, escrito de tú a tú, para que entiendas **cómo funciona toda la web por dentro**, cómo subir fotos de campamentos, salidas, cromos de Kraaletes u objetos perdidos **directamente desde nuestro Google Drive sin tener que tocar código**, y qué tocar si algún día al empezar la Ronda Solar queréis cambiar algún texto, foto de portada o lista de monitores.

---

## 1. ¿Cómo está pensada la web? (La idea general)

La web es un **Mapa Estelar Interactivo** dividido en **4 grandes sectores** (más un modo secreto por el 50º Aniversario). En lugar de ser una página estática que se queda vieja a los dos meses, está **conectada en vivo con el Google Drive del grupo**.

Cada vez que una familia o un educando entra en la web:
1. La página carga al instante la estructura principal y las fotos de portada locales (para que vaya a 60 fotogramas por segundo y no tarde nada en abrir).
2. En segundo plano, la web llama a nuestro conector de Google Drive (`DRIVE_API_URL` en [`script.js`](script.js)) y descarga la lista actualizada de **Campamentos**, **Salidas de cada Unidad**, **Cromos de los Kraaletes**, **Objetos Perdidos de El Baúl**, **Coordinación** y **Recuerdos del 50º Aniversario**.
3. Con esos datos, la web **dibuja sola las estrellas en el cielo** y rellena las galerías de fotos.

Es decir: **para el 95% del trabajo diario de la Comisión de Redes, solo tenéis que subir o borrar carpetas y fotos en Google Drive**.

---

## 2. Estructura de carpetas en Google Drive (¡Muy importante no cambiar los nombres raíz!)

En el Google Drive oficial del grupo tenemos una carpeta principal de la web que contiene estas **6 carpetas numeradas**. El script busca exactamente estos nombres, así que **nunca cambiéis el nombre de estas 6 carpetas principales**:

```text
CARPETA RAÍZ DE LA WEB EN GOOGLE DRIVE
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
│   └── ... (todas las carpetas de campamentos que vayáis creando)
│
├── 03_COORDINACION/
│   └── (Fotos de los coordinadores actuales: Nombre | Cargo | Teléfono)
│
├── 04_OBJETOS_PERDIDOS/
│   ├── Cajón 01 · Campamento de Verano/
│   ├── Cajón 02 · Acampada de Invierno/
│   └── ... (un cajón por cada carpeta que creéis aquí dentro)
│
├── 05_50_ANIVERSARIO/
│   └── (Fotos históricas por año desde 1976 hasta 2026)
│
└── 06_INTENDENCIA/
    └── (Formularios de Google Forms de pedidos de sudaderas, camisetas, pañoletas o merchandising)
```

A continuación tienes explicado, carpeta por carpeta, cómo funciona cada una y todos los trucos que tiene programados la web.

---

## 3. Cómo gestionar las Unidades, Cromos y Salidas (`01_UNIDADES`)

Cuando entras en el **Sector II (Unidades)** y pulsas en cualquiera de las 5 estrellas (*Castores*, *Manada*, *Tropa*, *Escultas* o *Clan*), se abre la pantalla completa de esa rama. Ahí hay **tres bloques fotográficos distintos**:

### A) La Foto Grande de Portada de cada Unidad (Local en la carpeta `images/`)
Nada más entrar a una unidad, arriba a la derecha se ve una fotografía panorámica grande de toda la rama (y al hacer clic sobre ella se abre a pantalla completa en el visor Lightbox).
* **¿Por qué esta foto no viene de Drive?** Porque es la primera imagen que se ve al abrir la unidad y queremos que cargue de forma instantánea sin esperar a Google Drive.
* **¿Dónde están guardadas?** Están en la carpeta [`images/`](images/) del proyecto con estos nombres exactos:
  * Castores: `images/Castores.jpg`
  * Manada: `images/Manada.jpg`
  * Tropa: `images/Tropa.jpg`
  * Escultas: `images/Escultas.jpg`
  * Clan: `images/Clan.jpg`
* **¿Cómo se cambia al empezar una nueva Ronda Solar?** Tan fácil como coger la foto nueva de la rama en horizontal, llamarla exactamente igual (por ejemplo `Castores.jpg`) y sustituir el archivo dentro de la carpeta `images/`.

### B) Los Cromos Coleccionables de los Kraaletes (`01_UNIDADES/[Rama]`)
En el apartado **«02 · Los Kraaletes de la Unidad»** aparecen las cartas coleccionables con efecto holográfico 3D de los scouters de esa rama.
* **Formato ideal del cromo:** Proporción vertical **3:4** (por ejemplo, `900 x 1200 px` en `.jpg` o `.png`).
* **Cómo subirlos en Drive:** Sube las fotos de los cromos dentro de la carpeta de su rama en `01_UNIDADES/Castores/`, `01_UNIDADES/Manada/`, etc., poniendo como nombre del archivo el nombre del Kraalete (por ejemplo: `Kibu.jpg`, `Baloo.jpg`, `Nadia.jpg`).
* **¿Qué pasa si un scouter todavía no tiene foto de cromo subida?** No se rompe nada: la web genera automáticamente un cromo elegante con el fondo estelar de la unidad, el icono de la brújula scout, su nombre y su cargo.
* **Ampliación al hacer clic:**
  * Si el cromo **tiene foto**, al hacer clic sobre él se abre en grande en el visor fotográfico (Lightbox).
  * Si el cromo **no tiene foto todavía**, al hacer clic se abre en el centro de la pantalla como una carta holográfica 3D gigante que se inclina al mover el ratón.

### C) Salidas, Acampadas y Aventuras de Rama (`01_UNIDADES/[Rama]/[Nombre de la Salida]`)
En el apartado **«03 · Aventuras, Salidas y Campamentos»** de cada unidad aparecen los álbumes de las acampadas trimestrales o salidas de esa rama.
* **Cómo publicar una salida nueva:**
  1. Entra en `01_UNIDADES/` y abre la carpeta de la rama (ej. `Tropa`).
  2. Crea una **subcarpeta** con el nombre de la acampada (ejemplo: `2025-11 Acampada Pinar de Antequera`).
  3. Mete dentro todas las fotos de la salida.
* **¿Qué muestra la web?** La web creará sola una tarjeta para esa salida, mostrará **las 3 primeras fotografías** de la carpeta como miniatura (si haces clic en cualquiera de las 3 se amplía a pantalla completa) y debajo pondrá el cajetín de contraseña para que los padres puedan desbloquear y abrir el álbum completo en Google Drive.
* **¿Qué pasa si una rama aún no tiene subcarpetas de salidas?** Aparece un recuadro limpio avisando de que aún no hay álbumes publicados en Drive para esa unidad.

---

## 4. Cómo gestionar los Campamentos de Grupo (`02_CAMPAMENTOS`)

El **Sector III (Campamentos)** es 100% dinámico: **no hay ningún campamento metido a fuego en el código**. Cada carpeta que exista dentro de `02_CAMPAMENTOS` en Google Drive se convierte automáticamente en una estrella en el mapa.

### A) ¿Cómo sabe la web si un campamento es de Verano o de Semana Santa?
En el cielo del Sector III verás que se forman **dos constelaciones separadas**: arriba **CAMPAMENTOS DE VERANO** (en tonos cálidos dorados) y abajo **CAMPAMENTOS DE SEMANA SANTA** (en tonos verde esmeralda suave).

La web lee el nombre de la carpeta que creéis en Drive y la clasifica sola siguiendo estas reglas:
1. **Va a Campamentos de Semana Santa** si el nombre de la carpeta contiene palabras como:
   * `Semana Santa`, `SS`, `Pascua`, `Primavera`, `Acampada`
   * O nombres de nuestros pueblos de Semana Santa: `Barbadillo`, `Cofiñal`, `Arija`, `Alcalá de Moncayo`, `Moncayo`.
2. **Va a Campamentos de Verano** si contiene:
   * `Verano`, `Estival`, `Julio`, `Agosto`
   * O nombres de pueblos de verano: `Prioro`, `Cóbreces`, `Valdeavellano`, `Vilviestre`, `Priaranza`.
   * *(Si no reconoce ninguna palabra clave de Semana Santa, por defecto lo coloca en Verano).*

### B) Cómo nombrar las carpetas de Campamento (¡La regla del año!)
Pon siempre el **año de 4 cifras** en el nombre de la carpeta. Por ejemplo:
* `2024 - Cofiñal`
* `2025 - Vilviestre del Pinar`
* `2026 - Alcalá de Moncayo SS`

**¿Por qué es tan importante poner el año?**
1. Porque la web ordena las estrellas de izquierda a derecha **por orden cronológico**.
2. Porque limpia el título automáticamente para que en el mapa estelar quede súper estético en dos líneas (ej. arriba `α 2024` y debajo `Cofiñal`).
3. Porque **el último campamento cronológico** de Verano y el último de Semana Santa se pintan automáticamente como una **Estrella Roja Destacada** más grande y brillante, indicando cuál ha sido el campamento más reciente del grupo.

### C) Las 3 fotos destacadas del campamento
Cuando entras en la estrella de un campamento, la web muestra en grande **las 3 primeras fotos** que encuentre dentro de esa carpeta de Drive como *«Bitácora Gráfica · 3 Fotografías Destacadas»*.
* **Truco para Redes Sociales:** Si queréis elegir exactamente qué 3 fotos salen en la portada del campamento sin que Google Drive las desordene, ponedles delante `01_`, `02_` y `03_` en el nombre del archivo (por ejemplo: `01_foto_grupo.jpg`, `02_fuego_campamento.jpg`, `03_marcha.jpg`).

---

## 5. Cómo funcionan las Contraseñas de los Álbumes de Drive

Por privacidad y protección de datos de los chavales, **los enlaces a las carpetas completas de Google Drive nunca están escritos en el código de la web**.
* Cualquier visitante puede entrar a la web y ver las 3 fotos de muestra que habéis elegido.
* Pero para abrir la carpeta de Google Drive donde están las 300 o 500 fotos del campamento, las familias tienen que escribir la **contraseña del campamento** en el recuadro de *«Álbum completo en Google Drive»* y pulsar **«Abrir Drive»**.

**¿Qué ocurre por detrás cuando una familia mete la contraseña?**
1. La web envía el ID de la carpeta y la contraseña escrita al Google Apps Script:
   `DRIVE_API_URL?action=unlock&id=[ID_CARPETA]&pass=[CONTRASEÑA]`
2. El script de Google comprueba en privado si la contraseña es la correcta.
3. Si coincide, devuelve el enlace real de Google Drive y abre la carpeta en una pestaña nueva. Si no coincide, muestra *«Contraseña incorrecta»*.

---

## 6. Cómo gestionar «El Baúl» de Objetos Perdidos (`04_OBJETOS_PERDIDOS`)

El **Sector IV (El Baúl)** sirve para que no tengamos que mandar 80 fotos sueltas por los grupos de WhatsApp después de cada acampada.

### A) ¿Qué es un «Cajón»?
Cada **subcarpeta** que creéis dentro de `04_OBJETOS_PERDIDOS` se convierte automáticamente en:
1. Una **mini-estrella** orbitando alrededor de la estrella principal de *El Baúl* en el mapa estelar.
2. Un **Cajón seleccionable** dentro de la pantalla de El Baúl.

* **Truco pro para el nombre de la subcarpeta:** Si usáis una barra vertical `|` en el nombre de la carpeta en Drive, lo que pongáis antes de la barra será el título del cajón y lo que pongáis después será la descripción. Ejemplo:
  `Cajón 01 · Cofiñal | Prendas encontradas tras el campamento`
* **¿Qué pasa si borráis todas las subcarpetas porque ya se ha entregado toda la ropa?** La web no da error: muestra el mensaje limpio *«El Baúl está vacío · ¡Todo el material está en casa!»*.

### B) Cómo nombrar las fotos de ropa perdida para que funcionen los filtros automáticos
Dentro de El Baúl hay un buscador de texto y **5 botones de filtro rápido** (*Todas las prendas*, *Ropa y Sudaderas*, *Cantimploras y Menaje*, *Calzado y Botas*, *Sacos y Aislantes*).

La web **clasifica las fotos sola leyendo el nombre del archivo** que subáis a Drive. Así que, en lugar de subir una foto llamada `IMG_4829.JPG`, renombradla en Drive antes o después de subirla poniendo qué es:
* **Para que entre en «Ropa y Sudaderas»:** usa palabras como `sudadera`, `camiseta`, `polo`, `pantalon`, `polar`, `forro`, `calcetin`, `braga`, `guante`, `bufanda`, `gorro`, `gorra`, `bañador`, `toalla`, `chandal`, `anorak` o `chaqueta`. *(Ej: `Sudadera azul Quechua talla 12.jpg`)*.
* **Para que entre en «Cantimploras y Menaje»:** usa `cantimplora`, `botella`, `poto`, `plato`, `cubierto`, `vaso`, `fiambrera`, `termo` o `navaja`. *(Ej: `Cantimplora aluminio roja.jpg`)*.
* **Para que entre en «Calzado y Botas»:** usa `bota`, `zapatilla`, `chancla`, `calzado`, `zapato` o `sandalia`. *(Ej: `Botas Chiruca marrones talla 39.jpg`)*.
* **Para que entre en «Sacos y Aislantes»:** usa `saco`, `esterilla`, `aislante`, `colchoneta`, `manta`, `cojin` o `funda`. *(Ej: `Saco dormir negro Decathlon.jpg`)*.

### C) ¿Qué hace el botón «Es mío · Reclamar»?
Cuando un padre o un educando ve su prenda y pulsa **«Es mío · Reclamar»**, se le abre automáticamente WhatsApp con un mensaje ya redactado dirigido a Coordinación indicando el nombre exacto de la prenda y el cajón en el que está, recordándole que puede pasar a recogerla el **sábado de 16:30 a 19:00 h por la sede de Carretera de Rueda, 53**.

---

## 7. Cómo funciona el Modo Secreto del 50º Aniversario (`05_50_ANIVERSARIO`)

En el **Sector I (Acrux 518)**, cada pocos segundos cruza el cielo un **Cometa Dorado** dejando una estela de polvo de oro:
* Si pasas el ratón por encima del cometa, el cursor avisa: *«¡ATRÁPALO! (50º ANIVERSARIO)»*.
* Al hacer clic sobre el cometa, explota una onda expansiva dorada (Supernova) y toda la web cambia su estética al **Modo 50º Aniversario (Oro Imperial y Obsidiana)**.
* Alrededor de la estrella Acrux aparece una **espiral áurea de 50 estrellas doradas**, una por cada año desde **1976 hasta 2026**.
* Al pulsar en cualquiera de las 50 estrellas se abre una ventana de cristal con la fotografía histórica y la crónica de ese año.
* Las fotos que subáis a la carpeta `05_50_ANIVERSARIO` de Drive asociadas a un año desbloquean e iluminan automáticamente la estrella de ese año en la espiral.

---

## 8. Cómo gestionar el Merch de Grupo (`06_INTENDENCIA`)

Cuando el grupo quiera lanzar un pedido de **Merch** (sudaderas, camisetas, polares o material), **no hace falta tocar nada del código de la web**:

1. **¿Cómo activar un formulario de Merch en la web?**
   * Entra en la carpeta **`06_INTENDENCIA`** dentro del Google Drive de la web.
   * Crea ahí dentro un **Formulario de Google (*Google Form*)** o mueve ahí uno ya creado (por ejemplo, llamado `Sudaderas Acrux 2026`).
2. **¿Qué pasa automáticamente en la web?**
   * En el **Sector I (Acrux 518)**, la estrella secundaria **`ε Intrometida`** se activa de forma sutil y elegante con un brillo ámbar/grisáceo atenuado y pasa a llamarse **`ε Merch · [Nombre del Formulario]`**.
   * Si metéis **varios formularios a la vez** en `06_INTENDENCIA`, se crean estrellas satélite discretas adicionales conectadas a `ε Intrometida` y una barra de pestañas dentro del modal para cambiar entre un producto y otro.
   * Al hacer clic en la estrella, se abre una ventana flotante de cristal oscuro (`.merch-custom-modal`) con el **Google Form incrustado y adaptado automáticamente al modo oscuro nativo de la web** (`filter: invert(0.92) hue-rotate(180deg) contrast(1.1); background-color: #0A0D14;`), con un botón para alternar a color original si alguien quiere ver los colores reales de una foto del producto.
3. **¿Cómo cerrar un pedido de Merch cuando termine el plazo?**
   * Simplemente **saca o borra el Google Form de la carpeta `06_INTENDENCIA`** en Drive. La estrella `ε Intrometida` volverá sola a su estado normal (inactiva) y desaparecerá el acceso al formulario.

### Código para el Google Apps Script (`06_INTENDENCIA`)
Si algún día reescribís o actualizáis el script en [script.google.com](https://script.google.com), asegúrate de que dentro de `doGet(e)` esté incluido este bloque que escanea la carpeta `06_INTENDENCIA` y devuelve `merchForms`:

```javascript
// --- 6. ESCANEO AUTOMÁTICO DE 06_INTENDENCIA (GOOGLE FORMS DE MERCHANDISING) ---
var merchForms = [];
var intendenciaFolders = rootFolder.getFoldersByName('06_INTENDENCIA');
if (intendenciaFolders.hasNext()) {
  var intendenciaFolder = intendenciaFolders.next();
  var files = intendenciaFolder.getFiles();
  while (files.hasNext()) {
    var file = files.next();
    if (file.getMimeType() === MimeType.GOOGLE_FORMS) {
      var formId = file.getId();
      var publishedUrl = 'https://docs.google.com/forms/d/' + formId + '/viewform?embedded=true';
      try {
        var formObj = FormApp.openById(formId);
        var pub = formObj.getPublishedUrl();
        if (pub) {
          publishedUrl = pub + (pub.indexOf('?') > -1 ? '&' : '?') + 'embedded=true';
        }
      } catch (err) {}
      merchForms.push({
        id: formId,
        title: file.getName(),
        embedUrl: publishedUrl,
        date: Utilities.formatDate(file.getDateCreated(), Session.getScriptTimeZone(), 'yyyy-MM-dd')
      });
    }
  }
}
// Y añade "merchForms: merchForms" al objeto JSON que devuelve ContentService.
```

---

## 9. ¿Qué tocar en el código si queréis cambiar datos fijos?

Si algún día necesitáis cambiar algo que no está en Drive (por ejemplo, cambiar la lista de nombres de los Kraaletes cuando empieza una nueva Ronda Solar, o cambiar algún texto de historia), solo hay **3 archivos** en todo el proyecto:

1. **[`index.html`](index.html)**:
   * Contiene el esqueleto de las pantallas, los botones superiores y los textos fijos de la portada.
2. **[`script.js`](script.js)**:
   * **Línea 15 (`DRIVE_API_URL`)**: Aquí va la URL terminada en `/exec` de nuestro Google Apps Script.
   * **Líneas 52 a 371 (`UNITS_DATA`)**: Aquí están las 5 unidades (*Castores*, *Manada*, *Tropa*, *Escultas* y *Clan*) con sus textos de introducción, lemas, etapas de progresión, enlaces de Instagram (`@escultas_trea` y `@clan_amadablam`) y la lista por defecto de `kraaletes` de cada unidad.
   * **Líneas 2620 a 2645 (`defaultCoords`)**: Aquí están los nombres y teléfonos por defecto del Equipo de Coordinación (**JJ, Raksha y Hugo**) por si Drive no tuviera fotos cargadas en `04_COORDINACION`.
3. **[`styles.css`](styles.css)**:
   * Contiene todo el diseño visual oscuro espacial, las tarjetas flotantes de cristal (`backdrop-filter`), el tamaño de los cromos y las animaciones.

---

## 9. Solución de problemas frecuentes (Troubleshooting para la Comisión)

### «He subido una carpeta o foto a Drive pero no sale en la web»
1. Asegúrate de haberla metido dentro de la carpeta correcta (`01_UNIDADES`, `02_CAMPAMENTOS`, `03_OBJETOS_PERDIDOS`, etc.).
2. Recarga la página en el navegador con `Ctrl + F5` (en Windows) o `Cmd + Shift + R` (en Mac) para limpiar la caché.

### «En la consola del navegador sale un aviso de que Drive devolvió HTML / pantalla de login»
Eso pasa si alguien ha editado el código del **Google Apps Script** en [script.google.com](https://script.google.com) y al guardar se han cerrado los permisos públicos. Para arreglarlo en 30 segundos:
1. Entra con la cuenta de Google del grupo en [script.google.com](https://script.google.com) y abre el proyecto del conector de la web.
2. Arriba a la derecha, pulsa en **Implementar > Gestionar implementaciones**.
3. Pulsa el icono del lápiz (**Editar**) en la implementación activa.
4. Asegúrate de que esté configurado exactamente así:
   * **Ejecutar como:** *Yo (gruposcoutacrux518@gmail.com)*
   * **Quién tiene acceso:** **Cualquier persona (*Anyone*)**
5. Pulsa **Implementar**. Si te da una URL nueva terminada en `/exec`, pégala en la constante `DRIVE_API_URL` (línea 15 de [`script.js`](script.js)).

### «He cambiado una imagen en `images/` o un estilo en `styles.css` y sigo viendo la versión antigua»
En [`index.html`](index.html) verás que los archivos se cargan con un número de versión al final (`styles.css?v=9.0` y `script.js?v=9.0`). Cuando subáis un cambio de código a GitHub Pages, subid ese número (por ejemplo a `?v=10.0`) para obligar a los móviles y ordenadores de todas las familias a descargar la versión nueva al instante.

---

## 10. Resumen de datos oficiales actuales en la web

* **Nombre oficial en toda la web:** Grupo Scout ACRUX 518 · Valladolid *(Nota importante para la Comisión: nunca usar el nombre de otros grupos scouts de Valladolid en los textos ni en los subtítulos de las constelaciones; el Sector I se llama siempre única y exclusivamente **Acrux 518**)*.
* **Sede y horario:** Carretera de Rueda, 53 (CP 47008, Valladolid) · **Sábados de 16:30 a 19:00 h**.
* **Equipo de Coordinación:** JJ, Raksha y Hugo.
* **Redes Sociales conectadas:**
  * Instagram General: [@gruposcoutacrux518](https://www.instagram.com/gruposcoutacrux518/)
  * Instagram Unidad Esculta Trea: [@escultas_trea](https://www.instagram.com/escultas_trea/)
  * Instagram Clan Ama Dablam: [@clan_amadablam](https://www.instagram.com/clan_amadablam/)
  * Facebook: [Grupo Scout Acrux 518](https://www.facebook.com/GrupoScoutAcrux518)
  * Correo: `gruposcoutacrux518@gmail.com`

---

*Manual interno preparado para la Comisión de Redes Sociales · **Grupo Scout ACRUX 518** · «Siempre Listos para Servir»*

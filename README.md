# ⚜️ Grupo Scout ACRUX 518 · Web Oficial y Mapa Estelar

¡Hola! Esta es la web oficial del **Grupo Scout Acrux 518** de Valladolid (ASDE - Exploradores de Castilla y León y Scouts de España).

En lugar de hacer la típica web de texto aburrida que nadie lee, montamos un **mapa estelar interactivo en el espacio**: vas navegando por el universo scout y cada constelación representa una parte real y viva de nuestro grupo.

Y lo mejor de todo: **está conectada 100% con Google Drive** para que cualquier scouter pueda subir fotos de salidas, campamentos o ropa perdida desde su móvil o Drive sin tener que tocar ni una sola línea de código.

---

## 📁 CÓMO FUNCIONA LA SINCRONIZACIÓN CON GOOGLE DRIVE (Guía para Scouters)

Esta es la parte más importante del proyecto. La web no tiene base de datos compleja ni panel de control raro: **nuestro panel de control es simplemente el Google Drive del Grupo**.

La web se conecta en tiempo real a nuestro Google Drive mediante un **Google Apps Script** (`DRIVE_API_URL`). Cada vez que alguien entra a la página, la web le pregunta a Drive qué carpetas y fotos nuevas hay y se dibuja sola.

```
GOOGLE DRIVE DEL GRUPO (TuDrive / Carpeta Raíz)
│
├── 📁 01_UNIDADES/
│   ├── 📁 Castores/
│   ├── 📁 Manada/
│   ├── 📁 Tropa/
│   ├── 📁 Escultas/
│   └── 📁 Clan/
│
├── 📁 02_CAMPAMENTOS/
│   ├── 📁 [Carpetas de Campamentos de Verano]
│   └── 📁 [Carpetas de Campamentos de Semana Santa / Primavera]
│
├── 📁 03_OBJETOS_PERDIDOS/
│   ├── 📁 Cajon 1 · Ropa y Abrigo/
│   ├── 📁 Cajon 2 · Calzado y Botas/
│   ├── 📁 Cajon 3 · Cantimploras y Menaje/
│   └── 📁 Cajon 4 · Varios y Especiales/
│
├── 📁 04_COORDINACION/
│   └── [Fotos o cromos de JJ, Raksha y Hugo]
│
└── 📁 05_50_ANIVERSARIO/
    └── [Fotos históricas desde 1976 hasta 2026]
```

---

### 1. Salidas y Aventuras de las Unidades (`01_UNIDADES`)
Dentro de `01_UNIDADES/[Nombre_Rama]` (por ejemplo `01_UNIDADES/Tropa`):
* **Para publicar una salida nueva**: simplemente crea una subcarpeta con el nombre de la actividad (por ejemplo: `2024-11 Acampada Pinar de Antequera`).
* Mete dentro las fotos de esa salida en formato JPG o PNG. La web cogerá automáticamente **las 3 primeras fotos como vista previa** y creará la tarjeta interactiva de la aventura dentro de esa rama.
* **Cromos de los Scouters (Kraaletes)**: si subes a la carpeta de la unidad las fotos o cromos de los monitores con su nombre (ejemplo: `Kibu.jpg`), la web sustituye los avatares genéricos por los cromos coleccionables con brillo holográfico.

### 2. Campamentos del Grupo (`02_CAMPAMENTOS`)
Los campamentos aparecen en el **Sector III** y la web los separa de forma inteligente en **dos constelaciones diferentes**:
* **Constelación de Verano** (arriba): campamentos de 15 días en julio/agosto.
* **Constelación de Semana Santa / Primavera** (abajo): acampadas de pascua y primavera.

**¿Cómo sabe la web si es de verano o de primavera?**
Lo detecta sola a partir del nombre de la carpeta:
* Si la carpeta contiene palabras como *Semana Santa*, *Pascua*, *Primavera*, *Acampada* o lugares tradicionales de primavera (*Barbadillo*, *Cofiñal*, *Arija*, *Moncayo*), la coloca en la **Constelación de Semana Santa**.
* Si contiene *Verano*, *Julio*, *Agosto* o lugares clásicos de verano (*Prioro*, *Cóbreces*, *Valdeavellano*, *Vilviestre*, *Priaranza*), la coloca en la **Constelación de Verano**.
* Si la carpeta tiene el año en el nombre (ejemplo: `2024 Prioro Verano` o `2025 Barbadillo SS`), la web los ordena cronológicamente y dibuja las líneas de la constelación uniendo los años en orden.

### 3. El Baúl de Objetos Perdidos (`03_OBJETOS_PERDIDOS`)
Las familias ya no tienen que volverse locas buscando qué se les ha quedado en el campamento:
* Dentro de `03_OBJETOS_PERDIDOS` hay subcarpetas que actúan como «Cajones» (por tipo de ropa o por campamento).
* Cualquier foto que eches a una chaqueta, zapatilla o saco olvidado y la subas a esa carpeta, **aparece al instante en la estrella de El Baúl** para que los padres la reconozcan y la reclamen.

### 4. ¿Cómo funciona la seguridad y las contraseñas? (`action=unlock`)
Por privacidad de los chavales y protección de menores, **los enlaces completos a las carpetas de Google Drive nunca están abiertos a cualquiera en internet**:
1. Cuando una persona entra a la web, solo ve las fotos de miniatura públicas que devuelve el escáner.
2. Para abrir el álbum completo con todas las fotos en alta resolución de Drive, hay un campo de contraseña: `"🔑 Contraseña para ver el álbum completo..."`.
3. Al pulsar en *"Abrir Álbum en Drive"*, la web envía la clave a nuestro Apps Script:
   ```text
   GET DRIVE_API_URL?action=unlock&id=[ID_CARPETA]&pass=[CONTRASEÑA]
   ```
4. Si la contraseña coincide con la del grupo o la configurada para ese álbum, Google Apps Script devuelve el enlace directo a Google Drive y se abre en una pestaña nueva. Si la contraseña está mal, avisa de error y no deja pasar.

### 5. Configuración del Google Apps Script
El script vive en la cuenta de Google del grupo. Si alguna vez hay que volver a publicarlo o actualizar el código del script:
* Abre el proyecto en [script.google.com](https://script.google.com).
* Ve a **Implementar > Gestionar implementaciones**.
* Asegúrate de que los permisos estén configurados así:
  * **Ejecutar como**: *Yo (la cuenta de Google del grupo)*.
  * **Quién tiene acceso**: **Cualquier persona (*Anyone*)** — *(¡MUY IMPORTANTE! Si pones "Solo usuarios con cuenta Google", la web fallará porque Google intentará pedir login a las familias)*.
* Copia la URL terminada en `/exec` y pégala en la constante `DRIVE_API_URL` al principio de [`script.js`](script.js).

---

## 🌌 Los 5 Sectores del Mapa Estelar

Puedes moverte por el mapa deslizando con el dedo en el móvil, usando la rueda del ratón o con los botones de la barra inferior:

### Sector I · La Cruz del Sur (Estrella Guía Acrux)
El faro del grupo desde 1977. Al pulsar en **α Acrux** pegas un **salto hiperespacial** que abre el dossier completo:
* **Historia**: raíces desde 1977 y casi 50 años de escultismo en Valladolid.
* **5 Ramas**: resumen de las 5 etapas educativas continuas.
* **Bases del Grupo**: nuestra sede en **Carretera de Rueda, 53**, horarios de sábado (16:30 a 19:00 h) y botón a **Google Maps**.
* **Coordinación**: tarjetas directas de **JJ, Raksha y Hugo** con WhatsApp y llamada a 1 clic.
* **Sábado de prueba**: formulario rápido que redacta un WhatsApp al coordinador para venir a probar.
* **Redes oficiales**: enlaces a todos los canales del grupo.

### Sector II · El Camino de las Unidades (Nuestras 5 Ramas)
Línea ascendente que conecta las 5 etapas formativas:
1. **Castores · Colonia Ohiensis** (6 a 8 años) · Lema: *«Compartir»*
2. **Manada · Khanhiwara** (8 a 11 años) · Lema: *«Haremos lo mejor»*
3. **Tropa · Lohengrin** (11 a 14 años) · Lema: *«Siempre Listos»*
4. **Unidad Esculta · Trea** (14 a 17 años) · Lema: *«Unidad»*
5. **Clan Rover · Ama Dablam** (17 a 21 años) · Lema: *«Servir»*

Cada unidad tiene su propio zoom estelar con foto oficial, cromos de scouters, salidas de Drive y redes sociales (Instagram para Escultas `@escultas_trea` y Clan `@clan_amadablam`).

### Sector III · Campamentos (Verano y Semana Santa)
Dos constelaciones separadas para no mezclar las vivencias de verano con las acampadas de primavera. Conecta directamente con las crónicas y carpetas protegidas de Drive.

### Sector IV · El Baúl (Objetos Perdidos)
Organizado por cajones para recuperar ropa y material olvidado en campamentos.

### Sector V · Bases y Contacto
El cierre de la expedición: sede oficial, coordinación, sábado de prueba, redes y botón para regresar a la Cruz del Sur.

---

## 🌟 El Huevo de Pascua del 50º Aniversario (1976 – 2026)

De vez en cuando cruza el cielo un **Cometa Dorado**:
* Si logras hacer clic sobre el cometa en pleno vuelo, se desbloquea el **Modo 50º Aniversario**.
* El firmamento se transforma en negro obsidiana y oro, revelando una **espiral de 50 estrellas doradas** alrededor de la Cruz del Sur.
* Cada estrella representa un año de vida del grupo (1976 a 2026) y abre recuerdos históricos con fotos sincronizadas con la carpeta `05_50_ANIVERSARIO` de Drive.

---

## 👥 Equipo Actual del Grupo

### Equipo de Coordinación:
* **JJ** · Coordinador General de Grupo
* **Raksha** · Coordinadora de Grupo
* **Hugo** · Equipo de Coordinación

### Kraal de Scouters por Unidades:
* **Castores**: Kibu, Malak, Kapi, Tic-Tac, Burbuja, Rusty.
* **Manada**: Baloo, Raksa, Akela, Kotic, Rikki, Bagheera, Fao, Kaa, Hermano Gris.
* **Tropa**: Nadia, Ángel, Hugo, Jesús, Silvia, Edgar, Pablo, Ane, Darío.
* **Escultas**: Silvia, David, JJ, Lucia, Leonor.
* **Clan**: Laura, María, Marta, Victoria.

---

## 💻 Tecnología Limpia (Sin librerías pesadas)

* **HTML5 Canvas 2D + JavaScript Vanilla**: 60 fps fluidos en cualquier móvil sin necesidad de instalar NodeJS ni frameworks como React o Angular.
* **CSS Moderno**: efectos de cristal (*backdrop-filter*), tipografía responsiva y modo aniversario.
* **Google Apps Script**: backend en la nube sin coste de servidores ni bases de datos de pago.

---

## 🚀 Cómo probar la web en local

1. Haz doble clic en [`index.html`](index.html) para abrirla en cualquier navegador.
2. Si prefieres un servidor local:
   ```bash
   python -m http.server 8080
   ```
   Y abres `http://localhost:8080`.

---

## 📱 Redes Sociales Oficiales

* **Instagram General**: [@scoutsacrux518](https://www.instagram.com/gruposcoutacrux518/)
* **Unidad Esculta Trea**: [@escultas_trea](https://www.instagram.com/escultas_trea/)
* **Clan Rover Ama Dablam**: [@clan_amadablam](https://www.instagram.com/clan_amadablam/)
* **Facebook**: [Grupo Scout Acrux 518](https://www.facebook.com/GrupoScoutAcrux518)
* **Correo oficial**: `gruposcoutacrux518@gmail.com`

---

*«Siempre Listos para Servir»* · **Grupo Scout ACRUX 518** · Valladolid

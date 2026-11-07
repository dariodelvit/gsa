# Grupo Scout ACRUX 518 · Web Oficial y Mapa Estelar

Web oficial del **Grupo Scout Acrux 518** de Valladolid (ASDE - Exploradores de Castilla y León y Scouts de España).

La web funciona como un **mapa estelar interactivo** conectado en tiempo real con **Google Drive**, de modo que cualquier scouter pueda subir fotografías de salidas, campamentos u objetos perdidos directamente desde Drive sin modificar el código.

---

## CÓMO FUNCIONA LA SINCRONIZACIÓN CON GOOGLE DRIVE (Guía para Scouters)

La web se conecta en tiempo real al Google Drive del grupo mediante un **Google Apps Script** (`DRIVE_API_URL`). Cada vez que alguien entra a la página, la aplicación consulta las carpetas publicadas en Drive y actualiza las secciones automáticamente.

```text
GOOGLE DRIVE DEL GRUPO (Carpeta Raíz)
│
├── 01_UNIDADES/
│   ├── Castores/
│   ├── Manada/
│   ├── Tropa/
│   ├── Escultas/
│   └── Clan/
│
├── 02_CAMPAMENTOS/
│   ├── [Carpetas de Campamentos de Verano]
│   └── [Carpetas de Campamentos de Semana Santa]
│
├── 03_OBJETOS_PERDIDOS/
│   ├── Cajon 1 · Ropa y Abrigo/
│   ├── Cajon 2 · Calzado y Botas/
│   ├── Cajon 3 · Cantimploras y Menaje/
│   └── Cajon 4 · Varios y Especiales/
│
├── 04_COORDINACION/
│   └── [Fotos o cromos de JJ, Raksha y Hugo]
│
└── 05_50_ANIVERSARIO/
    └── [Fotos históricas desde 1976 hasta 2026]
```

---

### 1. Salidas y Aventuras de las Unidades (`01_UNIDADES`)
Dentro de `01_UNIDADES/[Nombre_Rama]` (por ejemplo `01_UNIDADES/Tropa`):
* **Para publicar una salida nueva**: crea una subcarpeta con el nombre de la actividad (por ejemplo: `2024-11 Acampada Pinar de Antequera`).
* Sube las fotos de esa salida en formato JPG o PNG. La web tomará automáticamente **las 3 primeras fotos como vista previa** y creará la tarjeta de la aventura dentro de esa rama.
* **Cromos de los Scouters (Kraaletes)**: si subes a la carpeta de la unidad las fotos o cromos de los monitores con su nombre (ejemplo: `Kibu.jpg`), la web sustituye los avatares genéricos por los cromos coleccionables.

### 2. Campamentos del Grupo (`02_CAMPAMENTOS`)
Los campamentos aparecen en el **Sector III** y se agrupan automáticamente en dos bloques:
* **Campamentos de Verano** (arriba): campamentos de verano en julio y agosto.
* **Campamentos de Semana Santa** (abajo): acampadas de Semana Santa y primavera.

**Clasificación automática por nombre de carpeta:**
* Si la carpeta contiene palabras como *Semana Santa*, *Pascua*, *Primavera*, *Acampada* o lugares tradicionales de primavera (*Barbadillo*, *Cofiñal*, *Arija*, *Moncayo*), se asigna a **Campamentos de Semana Santa**.
* Si contiene *Verano*, *Julio*, *Agosto* o lugares de verano (*Prioro*, *Cóbreces*, *Valdeavellano*, *Vilviestre*, *Priaranza*), se asigna a **Campamentos de Verano**.
* Si la carpeta incluye el año en el nombre (ejemplo: `2024 Prioro Verano` o `2025 Barbadillo SS`), la web los ordena cronológicamente.

### 3. El Baúl de Objetos Perdidos (`03_OBJETOS_PERDIDOS`)
* Dentro de `03_OBJETOS_PERDIDOS` las subcarpetas actúan como «Cajones» (por tipo de prenda o por campamento).
* Cualquier foto subida a esas subcarpetas aparece automáticamente en la sección de **El Baúl** para que las familias puedan localizarla y reclamarla por WhatsApp.

### 4. Seguridad y contraseñas de álbumes (`action=unlock`)
Por privacidad y protección de menores, los enlaces completos a las carpetas de Google Drive están protegidos por contraseña:
1. En la web solo se muestran hasta 3 fotografías de muestra.
2. Para abrir el álbum completo en Google Drive, las familias introducen la contraseña del campamento o salida.
3. Al pulsar en *"Abrir Álbum en Drive"*, la web verifica la clave contra Google Apps Script:
   ```text
   GET DRIVE_API_URL?action=unlock&id=[ID_CARPETA]&pass=[CONTRASEÑA]
   ```
4. Si la contraseña coincide, Google Apps Script devuelve la URL del álbum en Google Drive y lo abre en una pestaña nueva.

### 5. Configuración del Google Apps Script
* Abre el proyecto en [script.google.com](https://script.google.com).
* Ve a **Implementar > Gestionar implementaciones**.
* Configura los permisos así:
  * **Ejecutar como**: *Yo (la cuenta de Google del grupo)*.
  * **Quién tiene acceso**: **Cualquier persona (*Anyone*)**.
* Copia la URL terminada en `/exec` en la constante `DRIVE_API_URL` al inicio de [`script.js`](script.js).

---

## Los 4 Sectores del Mapa Estelar

### Sector I · Acrux 518 (Estrella Guía)
Al pulsar en **Acrux** se abre la vista principal del grupo:
* **Historia e Identidad**: trayectoria desde 1977 en Valladolid y pertenencia a ASDE Exploradores de Castilla y León.
* **Sede y Horarios**: sede oficial en **Carretera de Rueda, 53 · Sábados de 16:30 a 19:00 h** con acceso directo a Google Maps.
* **Equipo de Coordinación**: contacto directo con **JJ, Raksha y Hugo** por WhatsApp y teléfono.
* **Inscripciones y Contacto**: formulario rápido conectado con Coordinación por WhatsApp.
* **Redes Sociales**: accesos directos a Instagram General, Escultas Trea, Clan Ama Dablam, Facebook y Correo electrónico.

### Sector II · Unidades (5 Ramas Educativas)
Línea ascendente que conecta las 5 etapas formativas de 6 a 21 años:
1. **Castores · Colonia Ohiensis** (6 a 8 años) · Lema: *«Compartir»*
2. **Manada · Khanhiwara** (8 a 11 años) · Lema: *«Haremos lo mejor»*
3. **Tropa · Lohengrin** (11 a 14 años) · Lema: *«Siempre Listos»*
4. **Unidad Esculta · Trea** (14 a 17 años) · Lema: *«Unidad»*
5. **Clan Rover · Ama Dablam** (17 a 21 años) · Lema: *«Servir»*

### Sector III · Campamentos (Verano y Semana Santa)
Recorrido por los **Campamentos de Verano** y **Campamentos de Semana Santa** del Grupo Scout Acrux 518, con fotografías destacadas y acceso por contraseña al álbum completo en Google Drive.

### Sector IV · El Baúl (Objetos Perdidos)
Archivo visual de prendas y material encontrado en acampadas y campamentos, organizado por cajones y con reclamación rápida por WhatsApp para recoger los sábados en la sede.

---

## Modo 50º Aniversario (1976 – 2026)

* Al hacer clic sobre el **Cometa Dorado** que cruza periódicamente el mapa estelar, se activa el **Modo 50º Aniversario**.
* Se despliega una espiral de 50 estrellas doradas (1976 a 2026) conectada con la carpeta `05_50_ANIVERSARIO` de Google Drive.

---

## Equipo Actual del Grupo

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

## Redes Sociales Oficiales

* **Instagram General**: [@gruposcoutacrux518](https://www.instagram.com/gruposcoutacrux518/)
* **Escultas Trea**: [@escultas_trea](https://www.instagram.com/escultas_trea/)
* **Clan Ama Dablam**: [@clan_amadablam](https://www.instagram.com/clan_amadablam/)
* **Facebook**: [Grupo Scout Acrux 518](https://www.facebook.com/GrupoScoutAcrux518)
* **Correo**: `gruposcoutacrux518@gmail.com`

---

*«Siempre Listos para Servir»* · **Grupo Scout ACRUX 518** · Valladolid

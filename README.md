# ⚜️ Grupo Scout ACRUX 518 · Web Oficial y Mapa Estelar

¡Hola! Esta es la web oficial del **Grupo Scout Acrux 518** de Valladolid (perteneciente a ASDE - Exploradores de Castilla y León y Scouts de España).

En lugar de hacer una web clásica con bloques de texto aburridos, decidimos montar algo especial: un **mapa estelar interactivo en el espacio** donde vas navegando por el universo scout y cada constelación representa una parte real de nuestro grupo.

La web está pensada para ser súper rápida, intuitiva y fácil de usar tanto desde el móvil de una familia como desde el ordenador.

---

## 🌌 ¿Cómo está organizada la web? (Los 5 Sectores)

El mapa se divide en 5 grandes sectores por los que te puedes mover con la rueda del ratón, arrastrando con el dedo en el móvil o usando los botones de navegación:

### 1. Sector I · La Cruz del Sur (Estrella Guía Acrux)
Es la constelación que nos da nombre. En su base brilla **α Acrux**, la estrella más luminosa y el faro de los exploradores desde 1977. 
* Si haces clic en Acrux (o en el botón principal), la cámara pega un **salto al hiperespacio** y te sumerge en el dossier completo del grupo.
* Ahí tienes todo en un solo lugar: nuestra historia desde 1977, cómo educamos, nuestras bases en **Carretera de Rueda, 53**, los teléfonos de coordinación con WhatsApp directo, el formulario para venir a probar un sábado y todas nuestras redes sociales.

### 2. Sector II · El Camino de las Unidades (Nuestras 5 Ramas)
Una constelación en línea ascendente que representa el crecimiento scout de los 6 a los 21 años:
1. **Castores · Colonia Ohiensis** (6 a 8 años) · Lema: *«Compartir»*
2. **Manada · Khanhiwara** (8 a 11 años) · Lema: *«Haremos lo mejor»*
3. **Tropa · Lohengrin** (11 a 14 años) · Lema: *«Siempre Listos»*
4. **Unidad Esculta · Trea** (14 a 17 años) · Lema: *«Unidad»*
5. **Clan Rover · Ama Dablam** (17 a 21 años) · Lema: *«Servir»*

Al hacer clic en cualquier unidad, entras con hiperespacio a su propia vista interior:
* Foto oficial de la rama y lema.
* **Cromos de los Scouters (Kraaletes)** con foto o avatar y su cargo.
* **Aventuras, Salidas y Álbumes de Drive**: sincronizados con las carpetas de Google Drive de esa unidad, con miniaturas y botón para abrir el álbum completo con la contraseña de familias.
* Enlaces directos a las redes sociales de esa rama (para Escultas `@escultas_trea` y Clan `@clan_amadablam`).

### 3. Sector III · Campamentos (Verano y Semana Santa)
Para que no se mezclen las épocas del año, los campamentos están repartidos en **dos constelaciones diferentes**:
* Una constelación para los **Campamentos de Verano** (las grandes acampadas de 15 días en la montaña).
* Otra constelación para los **Campamentos de Semana Santa / Primavera**.
* Al pinchar en cada campamento puedes ver la crónica, el lugar donde fuimos, fotos destacadas y el botón para entrar a la carpeta de fotos en Drive.

### 4. Sector IV · El Baúl (Objetos Perdidos)
El rincón salva-vidas para las familias. Aquí se suben las fotos de toda la ropa, cantimploras, botas y cosas que van quedando olvidadas en salidas y campas. Está organizado por «cajones» para que sea fácil encontrar lo que se ha perdido.

### 5. Sector V · Bases y Contacto
El cierre del recorrido estelar:
* **Base Principal**: Carretera de Rueda, 53 (Valladolid) · Sábados de 16:30 a 19:00 h con botón directo a Google Maps.
* **Coordinación**: contacto directo con JJ, Raksha y Hugo con botones de WhatsApp y llamada a un clic.
* **Sábado de prueba**: explicación en 3 pasos para chavales nuevos y formulario rápido.
* **Redes oficiales**: enlaces al Instagram del grupo, Escultas, Clan y canal de YouTube.
* Botón de retorno rápido a la Cruz del Sur para volver a empezar.

---

## 🌟 El Secreto del 50º Aniversario (1976 – 2026)

Si estás explorando la web con calma, verás que cada poco tiempo cruza el cielo un **Cometa Dorado**. 
* Si eres rápido y haces clic sobre el cometa antes de que desaparezca, se activa el **Modo 50º Aniversario**.
* El universo entero se tiñe de negro y oro, y se despliega una **espiral de 50 estrellas doradas** alrededor de la Cruz del Sur (una por cada año de historia del grupo desde 1976 hasta 2026).
* Al pinchar en cada estrella puedes abrir el recuerdo con foto histórica de ese año.

---

## 👥 Equipo de Coordinación y Kraal de Scouters

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

## 💻 ¿Cómo está hecha la web por dentro?

Para que la web no pese megas y megas ni tarde en cargar en móviles con mala cobertura en campamento, está hecha en **HTML5 Canvas, CSS y JavaScript Vanilla puro**:
* **Cero dependencias pesadas**: sin React, sin frameworks raros, sin librerías de 500 KB.
* **Motor a 60 fps**: las estrellas, el polvo cósmico y las líneas se dibujan directas en canvas adaptándose a la pantalla de cualquier móvil, tablet u ordenador.
* **Conexión con Google Drive**: usamos un script de Google Apps Script (`DRIVE_API_URL`). Así el equipo de scouters puede subir fotos, álbumes de campamentos o cromos directamente a las carpetas de Drive del grupo y la web se actualiza sola sin tener que tocar una sola línea de código.

---

## 🚀 Cómo abrir y probar el proyecto

No hace falta instalar nada de NodeJS ni terminales raras:
1. Simplemente haz doble clic en el archivo [`index.html`](index.html) y se te abrirá en tu navegador favorito (Chrome, Firefox, Edge, Safari).
2. Si quieres usar un servidor local para probar cambios en vivo, con la extensión *Live Server* de Visual Studio Code o ejecutando en la carpeta:
   ```bash
   python -m http.server 8080
   ```
   Y abres en tu navegador `http://localhost:8080`.

---

## 📱 Redes Sociales Oficiales

* **Instagram General**: [@scoutsacrux518](https://www.instagram.com/gruposcoutacrux518/)
* **Unidad Esculta Trea**: [@escultas_trea](https://www.instagram.com/escultas_trea/)
* **Clan Rover Ama Dablam**: [@clan_amadablam](https://www.instagram.com/clan_amadablam/)
* **Facebook**: [Grupo Scout Acrux 518](https://www.facebook.com/GrupoScoutAcrux518)
* **Correo oficial**: `gruposcoutacrux518@gmail.com`

---

*«Siempre Listos para Servir»* · **Grupo Scout ACRUX 518** · Valladolid

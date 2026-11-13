// ============================================================================
// CONECTOR OFICIAL GOOGLE DRIVE · GRUPO SCOUT ACRUX 518
// Optimizado con Caché, Privacidad de Enlaces, Ordenación 01_02_03 y Merch Nativo
// ============================================================================

const ROOT_FOLDER_ID = "1EvSuEJGBS6zpCahsLIuz2VP_qVwi-E55";
const DRIVE_CAMP_PASSWORD = "akrux"; // Contraseña oficial para desbloquear álbumes
const CACHE_TIME_SECONDS = 60;       // Guarda los datos 60 seg en memoria para que la web vuele

// 1. Limpiador automático: si viene una URL de Drive, extrae solo el ID
function cleanFolderId(input) {
  if (!input) return "";
  var str = String(input).trim();
  var match = str.match(/folders\/([a-zA-Z0-9_-]+)/);
  if (match) return match[1];
  return str;
}

// 2. Generador de URLs de imagen optimizadas (evita descargar fotos de 10MB en el móvil)
function buildOptimizedImgUrl(fileId, width) {
  var w = width || 1000;
  return "https://lh3.googleusercontent.com/d/" + fileId + "=w" + w;
}

// 3. Selector de fotos de una carpeta en Google Drive (orden natural dentro de la carpeta)
function getTopThreePhotos(folderObj) {
  var entries = [];
  var allFiles = folderObj.getFiles();
  while (allFiles.hasNext()) {
    var f = allFiles.next();
    if (f.getMimeType().indexOf("image/") === 0) {
      entries.push({
        name: f.getName().toLowerCase(),
        url: buildOptimizedImgUrl(f.getId(), 1000)
      });
    }
  }
  entries.sort(function(a, b) {
    return a.name.localeCompare(b.name, undefined, { numeric: true });
  });
  return entries.slice(0, 12).map(function(item) { return item.url; });
}

// 4. Construye la ficha completa de un Kraalete leyendo nombre y "Descripción" de Drive
function buildKraaleteFromFile(fileObj) {
  const fullName = fileObj.getName().replace(/\.[^/.]+$/, "");
  const nameParts = fullName.split("|").map(function(s) { return s.trim(); });
  const scouterName = nameParts[0] || fullName;
  const scouterRole = nameParts[1] || "Kraalete";

  const rawDesc = (fileObj.getDescription() || "").trim();
  let realName = "";
  let bio = "";

  if (rawDesc) {
    const descParts = rawDesc.split("|").map(function(s) { return s.trim(); });
    if (descParts.length >= 3) {
      realName = descParts[0] || "";
      const lastPart = descParts[descParts.length - 1] || "";
      const looksLikePhone = /^[\d\s+()-]{7,}$/.test(lastPart);
      bio = (looksLikePhone ? descParts.slice(1, -1) : descParts.slice(1)).join(" | ").trim();
    } else if (descParts.length === 2) {
      realName = descParts[0] || "";
      const secondPart = descParts[1] || "";
      bio = /^[\d\s+()-]{7,}$/.test(secondPart) ? "" : secondPart;
    } else {
      bio = descParts[0] || "";
    }
  }

  if (!bio) {
    bio = "Scouter del Kraalete en el Grupo Scout Acrux 518. Acompaña cada sábado y acampada educando en valores, escultismo y contacto con la naturaleza.";
  }

  const imgUrl = buildOptimizedImgUrl(fileObj.getId(), 900);

  return {
    name: scouterName,
    role: scouterRole,
    realName: realName,
    bio: bio,
    desc: rawDesc,
    cromoUrl: imgUrl,
    photoUrl: imgUrl
  };
}

// 5a. Limpia un título de formulario/archivo (quita prefijos "Copia de " / "Copy of ")
function cleanFormTitle(raw) {
  return String(raw || "")
    .replace(/[\r\n]+/g, " ")
    .replace(/^\s*(copia de|copy of)\s+/i, "")
    .replace(/\s+/g, " ")
    .trim();
}

// 5b. Extrae los datos nativos de un Google Form desde el propio servidor de Google (Sin proxies externos)
//     Devuelve también "title": el título REAL y actual del formulario (no el nombre antiguo del archivo)
function fetchGoogleFormNativeData(formId) {
  var out = { fbLoadData: null, rawHtml: "", title: "" };
  try {
    var viewUrl = "https://docs.google.com/forms/d/" + formId + "/viewform";
    var response = UrlFetchApp.fetch(viewUrl, {
      muteHttpExceptions: true,
      followRedirects: true
    });
    if (response.getResponseCode() === 200) {
      var html = response.getContentText();
      out.rawHtml = html;
      var marker = "FB_PUBLIC_LOAD_DATA_";
      var idx = html.indexOf(marker);
      if (idx !== -1) {
        var startBracket = html.indexOf("[", idx);
        var endScript = html.indexOf("</script>", startBracket);
        if (startBracket !== -1 && endScript !== -1) {
          var jsonStr = html.substring(startBracket, endScript).trim();
          if (jsonStr.endsWith(";")) jsonStr = jsonStr.slice(0, -1).trim();
          out.fbLoadData = JSON.parse(jsonStr);

          // Título interno real del formulario: fbLoadData[1][8] (y respaldo fbLoadData[3])
          var fb = out.fbLoadData;
          var t1 = (fb && fb[1] && typeof fb[1][8] === "string") ? fb[1][8] : "";
          var t3 = (fb && typeof fb[3] === "string") ? fb[3] : "";
          out.title = cleanFormTitle(t1 || t3);
        }
      }
    }
  } catch (e) {}
  return out;
}

// 6. Punto de entrada principal de la API Web
function doGet(e) {
  try {
    const params = (e && e.parameter) ? e.parameter : {};
    const action = params.action || "";

    // ACCIÓN 1: Desbloquear enlace de campamento o salida con contraseña
    if (action === "unlock") {
      const folderId = cleanFolderId(params.id);
      const pass = (params.pass || "").trim().toLowerCase();

      if (!folderId) {
        return responseJSON({ success: false, message: "ID de carpeta no válido" });
      }

      if (pass === DRIVE_CAMP_PASSWORD.toLowerCase()) {
        const folder = DriveApp.getFolderById(folderId);
        return responseJSON({ success: true, url: folder.getUrl() });
      } else {
        return responseJSON({ success: false, message: "Contraseña incorrecta" });
      }
    }

    // ACCIÓN 2: Petición general de datos (con Caché inteligente)
    const cache = CacheService.getScriptCache();
    const cacheKey = "ACRUX_DRIVE_PAYLOAD_V24";

    if (!params.nocache) {
      const cachedJson = cache.get(cacheKey);
      if (cachedJson) {
        return ContentService.createTextOutput(cachedJson)
          .setMimeType(ContentService.MimeType.JSON);
      }
    }

    const rootId = cleanFolderId(ROOT_FOLDER_ID);
    const root = DriveApp.getFolderById(rootId);
    const subfolders = root.getFolders();

    const result = {
      unidades: {},
      campamentos: [],
      coordinacion: [],
      cajones: [],
      aniversario: [],
      merchForms: [],
      inscripcionForms: [],
      secretPack: syncWeeklyPackCodeTxt_(root)
    };

    while (subfolders.hasNext()) {
      const folder = subfolders.next();
      const name = folder.getName().toUpperCase();

      // 1. UNIDADES: Cromos de Kraaletes + Subcarpetas de Salidas
      if (name.includes("01_UNIDADES")) {
        const unitFolders = folder.getFolders();
        while (unitFolders.hasNext()) {
          const uf = unitFolders.next();
          const uKey = uf.getName().toLowerCase().trim();

          const kraaletes = [];
          const salidas = [];

          // A) Imágenes sueltas en la raíz de la unidad -> Cromos
          const unitFiles = uf.getFiles();
          while (unitFiles.hasNext()) {
            const f = unitFiles.next();
            if (f.getMimeType().startsWith("image/")) {
              kraaletes.push(buildKraaleteFromFile(f));
            }
          }

          // B) Subcarpetas dentro de la unidad (100% por carpeta: CROMOS/KRAAL vs FOTOS/SALIDAS)
          function pushSalidaFromFolder(salFolder) {
            const rawSalName = salFolder.getName();
            const parts = rawSalName.split("|").map(function(s) { return s.trim(); });
            const salidaPhotos = getTopThreePhotos(salFolder);
            if (salidaPhotos.length === 0) return;
            salidas.push({
              id: salFolder.getId(),
              name: parts[0] || rawSalName,
              location: parts[1] ? ("📍 " + parts[1]) : "📍 En naturaleza",
              date: parts[2] || "",
              desc: salFolder.getDescription() || "Álbum oficial de la salida sincronizado desde Google Drive.",
              photos: salidaPhotos
            });
          }

          const unitSubfolders = uf.getFolders();
          while (unitSubfolders.hasNext()) {
            const usf = unitSubfolders.next();
            const usfLower = usf.getName().toLowerCase().trim();

            if (usfLower.includes("cromo") || usfLower.includes("kraal")) {
              const cromoFiles = usf.getFiles();
              while (cromoFiles.hasNext()) {
                const cf = cromoFiles.next();
                if (cf.getMimeType().startsWith("image/")) {
                  kraaletes.push(buildKraaleteFromFile(cf));
                }
              }
            } else if (usfLower === "fotos" || usfLower === "salidas" || usfLower.includes("foto") || usfLower.includes("salida")) {
              // Si dentro de FOTOS/SALIDAS hay subcarpetas, cada subcarpeta es una salida; si hay fotos sueltas, se crea álbum directo
              const nestedSalidas = usf.getFolders();
              let hasNested = false;
              while (nestedSalidas.hasNext()) {
                hasNested = true;
                pushSalidaFromFolder(nestedSalidas.next());
              }
              if (!hasNested) {
                pushSalidaFromFolder(usf);
              }
            } else {
              pushSalidaFromFolder(usf);
            }
          }

          result.unidades[uKey] = {
            kraaletes: kraaletes,
            salidas: salidas
          };
        }
      }

      // 2. CAMPAMENTOS: 100% por carpeta padre ('Verano' vs 'Semana Santa / Invierno'), nunca por el título del campamento
      if (name.includes("02_CAMPAMENTOS")) {
        const campFolders = folder.getFolders();

        function processCampFolder(cf, forcedSeason) {
          const rawName = cf.getName();
          const parts = rawName.split("|").map(function(s) { return s.trim(); });
          const photos = getTopThreePhotos(cf);
          const seasonType = forcedSeason === "easter" ? "easter" : "summer";

          result.campamentos.push({
            id: cf.getId(),
            name: parts[0] || rawName,
            location: parts[1] ? ("📍 " + parts[1]) : "📍 Acampada Grupo Scout Acrux 518",
            season: parts[2] || (seasonType === "easter" ? "Semana Santa / Invierno" : "Campamento de Verano"),
            seasonType: seasonType,
            driveFolderName: rawName,
            desc: cf.getDescription() || "Álbum oficial sincronizado directamente desde Google Drive.",
            photos: photos
          });
        }

        while (campFolders.hasNext()) {
          const cf = campFolders.next();
          const cfName = cf.getName().toLowerCase();

          if (cfName.includes("verano") || cfName.includes("summer")) {
            const summerSub = cf.getFolders();
            while (summerSub.hasNext()) {
              processCampFolder(summerSub.next(), "summer");
            }
          } else if (cfName.includes("semana") || cfName.includes("santa") || cfName.includes("invierno") || cfName.includes("navidad") || cfName.includes("primavera") || cfName.includes("pascua")) {
            const easterSub = cf.getFolders();
            while (easterSub.hasNext()) {
              processCampFolder(easterSub.next(), "easter");
            }
          } else {
            processCampFolder(cf, "summer");
          }
        }
      }

      // 3. COORDINACIÓN:
      //    Formato recomendado en Descripción de Drive: "Nombre | Descripción | Teléfono"
      //    (si no hay número, se deja vacío y la web oculta los botones de llamar/WhatsApp)
      if (name.includes("03_COORDINACION")) {
        const files = folder.getFiles();
        while (files.hasNext()) {
          const f = files.next();
          if (f.getMimeType().startsWith("image/")) {
            const fullName = f.getName().replace(/\.[^/.]+$/, "");
            const fileParts = fullName.split("|").map(function(s) { return s.trim(); });
            const rawDesc = (f.getDescription() || "").trim();
            let descName = "";
            let descBio = "";
            let descPhone = "";

            if (rawDesc) {
              const descParts = rawDesc.split("|").map(function(s) { return s.trim(); });
              descName = descParts[0] || "";
              if (descParts.length >= 3) {
                const lastPart = descParts[descParts.length - 1] || "";
                if (/^[\d\s+()-]{6,}$/.test(lastPart)) {
                  descPhone = lastPart;
                  descBio = descParts.slice(1, -1).join(" | ").trim();
                } else {
                  descBio = descParts.slice(1).join(" | ").trim();
                }
              } else if (descParts.length === 2) {
                if (/^[\d\s+()-]{6,}$/.test(descParts[1] || "")) {
                  descPhone = descParts[1];
                } else {
                  descBio = descParts[1] || "";
                }
              }
            }

            const finalName = descName || fileParts[0] || fullName;
            const finalRole = fileParts[1] || "Equipo de Coordinación";
            const finalPhone = descPhone || fileParts[2] || "";
            const imgUrl = buildOptimizedImgUrl(f.getId(), 600);
            result.coordinacion.push({
              name: finalName,
              role: finalRole,
              cargo: finalRole,
              bio: descBio,
              phone: finalPhone,
              telefono: finalPhone,
              photoUrl: imgUrl,
              cromoUrl: imgUrl
            });
          }
        }
      }

      // 4. OBJETOS PERDIDOS: Cajones con prendas extraviadas
      if (name.includes("04_OBJETOS_PERDIDOS")) {
        const cajonFolders = folder.getFolders();
        while (cajonFolders.hasNext()) {
          const cjf = cajonFolders.next();
          const items = [];
          const files = cjf.getFiles();
          while (files.hasNext()) {
            const f = files.next();
            if (f.getMimeType().startsWith("image/")) {
              items.push({
                file: f.getName(),
                name: f.getName().replace(/\.[^/.]+$/, ""),
                desc: f.getDescription() || "Objeto recogido en actividades.",
                photoUrl: buildOptimizedImgUrl(f.getId(), 800),
                status: "En Base · Rueda 53"
              });
            }
          }
          result.cajones.push({
            id: cjf.getId(),
            folderName: cjf.getName(),
            driveUrl: cjf.getUrl(),
            items: items
          });
        }
      }

      // 5. 50 ANIVERSARIO: Recuerdos históricos por año
      if (name.includes("05_50_ANIVERSARIO")) {
        const files = folder.getFiles();
        while (files.hasNext()) {
          const f = files.next();
          const match = f.getName().match(/^(\d{4})/);
          if (match) {
            result.aniversario.push({
              year: parseInt(match[1], 10),
              title: f.getName().replace(/^\d{4}\s*[-–·]?\s*/, "").replace(/\.[^/.]+$/, ""),
              desc: f.getDescription() || "Recuerdo histórico del Grupo Scout ACRUX 518.",
              photoUrl: buildOptimizedImgUrl(f.getId(), 1200),
              driveUrl: f.getUrl()
            });
          }
        }
      }

      // 6. MERCH (Carpeta 06_INTENDENCIA): Google Forms + Lectura nativa + Fotos
      if (name.includes("06_INTENDENCIA") || name.includes("INTENDENCIA") || name.includes("MERCH")) {
        const folderPhotos = [];
        const rawForms = [];

        function scanMerchFolder(targetFolder, localPhotos, isDedicatedSubfolder) {
          const files = targetFolder.getFiles();
          while (files.hasNext()) {
            const f = files.next();
            const mime = f.getMimeType();

            if (mime.startsWith("image/")) {
              localPhotos.push({
                name: f.getName().replace(/\.[^/.]+$/, "").toLowerCase().trim(),
                url: buildOptimizedImgUrl(f.getId(), 1000)
              });
              continue;
            }

            let formId = null;

            if (mime === MimeType.GOOGLE_FORMS || mime === "application/vnd.google-apps.form") {
              formId = f.getId();
            } else if (mime === "application/vnd.google-apps.shortcut") {
              try {
                const targetMime = f.getTargetMimeType();
                if (targetMime === MimeType.GOOGLE_FORMS || targetMime === "application/vnd.google-apps.form") {
                  formId = f.getTargetId();
                }
              } catch (err) {}
            }

            if (formId) {
              const rawDesc = (f.getDescription() || "").trim();
              let price = "";
              let desc = rawDesc;
              if (rawDesc.includes("|")) {
                const dParts = rawDesc.split("|").map(function(s) { return s.trim(); });
                price = dParts[0] || "";
                desc = dParts.slice(1).join(" | ").trim();
              }

              // Extraer las preguntas del formulario directamente desde Google
              const nativeForm = fetchGoogleFormNativeData(formId);

              rawForms.push({
                id: formId,
                title: cleanFormTitle(nativeForm.title || f.getName()),
                fileName: f.getName(),
                price: price,
                desc: desc,
                embedUrl: "https://docs.google.com/forms/d/" + formId + "/viewform?embedded=true",
                date: Utilities.formatDate(f.getDateCreated(), Session.getScriptTimeZone(), "yyyy-MM-dd"),
                localPhotosRef: localPhotos,
                isDedicatedSubfolder: Boolean(isDedicatedSubfolder),
                fbLoadData: nativeForm.fbLoadData,
                rawHtml: nativeForm.rawHtml
              });
            }
          }
        }

        // Escanear raíz de 06_INTENDENCIA
        scanMerchFolder(folder, folderPhotos, false);

        // Escanear subcarpetas individuales de cada prenda
        const merchSubfolders = folder.getFolders();
        while (merchSubfolders.hasNext()) {
          const msf = merchSubfolders.next();
          const subPhotos = [];
          scanMerchFolder(msf, subPhotos, true);
        }

        // Asociar fotos sin mezclar prendas distintas
        for (let i = 0; i < rawForms.length; i++) {
          const rf = rawForms[i];
          const formCleanName = rf.fileName.replace(/\.[^/.]+$/, "").toLowerCase().trim();
          const matchedPhotos = [];

          for (let j = 0; j < rf.localPhotosRef.length; j++) {
            const ph = rf.localPhotosRef[j];
            if (rf.isDedicatedSubfolder || rawForms.length === 1 || formCleanName.includes(ph.name) || ph.name.includes(formCleanName)) {
              matchedPhotos.push(ph.url);
            }
          }

          result.merchForms.push({
            id: rf.id,
            title: rf.title,
            price: rf.price,
            desc: rf.desc,
            photos: matchedPhotos,
            embedUrl: rf.embedUrl,
            date: rf.date,
            fbLoadData: rf.fbLoadData,
            rawHtml: rf.rawHtml
          });
        }
      }

      // 7. INSCRIPCIONES (Carpeta 07_INSCRIPCIONES): Google Form conectado a Drive + fotos opcionales
      if (name.includes("07_INSCRIPCION") || name.includes("INSCRIPCIONES")) {
        const inscPhotos = [];
        const inscRawForms = [];
        const inscFiles = folder.getFiles();
        while (inscFiles.hasNext()) {
          const f = inscFiles.next();
          const mime = f.getMimeType();
          if (mime === MimeType.GOOGLE_FORMS) {
            const fid = f.getId();
            const nativeForm = fetchGoogleFormNativeData(fid);
            let realTitle = nativeForm.realTitle || "";
            if (!realTitle) {
              try {
                realTitle = FormApp.openById(fid).getTitle() || "";
              } catch (eTitle) {}
            }
            const cleanTitle = (realTitle || f.getName()).replace(/^Copia de\s+/i, "").trim();
            let updatedIso = "";
            try { updatedIso = f.getLastUpdated().toISOString().split("T")[0]; } catch (eD) {}
            inscRawForms.push({
              id: fid,
              title: cleanTitle,
              desc: (f.getDescription() || "").trim(),
              embedUrl: "https://docs.google.com/forms/d/" + fid + "/viewform?embedded=true",
              date: updatedIso,
              fbLoadData: nativeForm.fbLoadData,
              rawHtml: nativeForm.rawHtml
            });
          } else if (mime.indexOf("image/") === 0) {
            inscPhotos.push(buildOptimizedImgUrl(f.getId(), 1400));
          }
        }
        for (let ii = 0; ii < inscRawForms.length; ii++) {
          inscRawForms[ii].photos = inscPhotos;
          result.inscripcionForms.push(inscRawForms[ii]);
        }
      }
    }

    const finalJsonString = JSON.stringify(result);

    // Guardar en caché de Google (si pesa menos de 100KB, límite de CacheService)
    try {
      if (finalJsonString.length < 95000) {
        cache.put(cacheKey, finalJsonString, CACHE_TIME_SECONDS);
      }
    } catch (e) {}

    return ContentService.createTextOutput(finalJsonString)
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return responseJSON({ error: err.toString() });
  }
}

function responseJSON(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

// ============================================================================
// 6. CÓDIGOS SEMANALES DE SOBRES SECRETOS (SÁBADOS 12:00 · COMISIÓN REDES)
// ============================================================================
const SECRET_PACK_MASTER_CODE = "ACRUX518KRAAL"; // Código constante que siempre funciona
const SECRET_CODES_FILENAME = "codigos_kraal_redes.txt";
const SECRET_PACK_WORDS = [
  "ACRUX", "CASTOR", "LOBATO", "TROPA", "ESCULTA", "ROVER",
  "FOGATA", "NUDOS", "BRUJULA", "SENDA", "PROMESA", "PANOLETA",
  "TIENDA", "RUTA", "LOHENGRIN", "OHIENSIS", "KHANHIWARA",
  "TREA", "AMADABLAM", "RUEDA", "ESTRELLA", "MONTE"
];

function hashPackCode_(raw) {
  const norm = String(raw || "").trim().toUpperCase().replace(/\s+/g, "");
  const input = norm + "|ACRUX518_PACK_SALT";
  let h = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0).toString(16).padStart(8, "0");
}

function getActiveSaturdaySlotMadrid_() {
  const tz = "Europe/Madrid";
  const now = new Date();
  // 1=Lun .. 6=Sáb .. 7=Dom
  const isoDay = parseInt(Utilities.formatDate(now, tz, "u"), 10);
  const hour = parseInt(Utilities.formatDate(now, tz, "H"), 10);

  let daysBack = 0;
  if (isoDay === 6) {
    daysBack = hour >= 12 ? 0 : 7;
  } else if (isoDay === 7) {
    daysBack = 1;
  } else {
    daysBack = isoDay + 1; // Lun(1)->2, Mar(2)->3 ... Vie(5)->6
  }

  const slotDate = new Date(now.getTime() - daysBack * 24 * 60 * 60 * 1000);
  return Utilities.formatDate(slotDate, tz, "yyyy-MM-dd");
}

function generateWeeklyCodeForSlot_(slotDateStr) {
  const hHex = hashPackCode_("WEEK|" + slotDateStr);
  const num = parseInt(hHex, 16);
  const word = SECRET_PACK_WORDS[num % SECRET_PACK_WORDS.length];
  const digits = 10 + ((num >>> 5) % 90);
  return word + String(digits);
}

function syncWeeklyPackCodeTxt_(rootFolder) {
  const slotDateStr = getActiveSaturdaySlotMadrid_();
  const weeklyCode = generateWeeklyCodeForSlot_(slotDateStr);
  const payload = {
    weekKey: slotDateStr,
    codeHash: hashPackCode_(weeklyCode)
  };

  try {
    const root = rootFolder || DriveApp.getFolderById(cleanFolderId(ROOT_FOLDER_ID));
    const files = root.getFilesByName(SECRET_CODES_FILENAME);
    let file = files.hasNext() ? files.next() : null;

    const header = [
      "================================================================",
      "CÓDIGOS SEMANALES DE SOBRES · GRUPO SCOUT ACRUX 518 (COMISIÓN REDES)",
      "================================================================",
      "Se genera automáticamente cada sábado a las 12:00 (hora Madrid).",
      "Código maestro permanente (siempre funciona): " + SECRET_PACK_MASTER_CODE,
      "----------------------------------------------------------------"
    ].join("\n");

    let lines = [];
    if (file) {
      const existing = file.getBlob().getDataAsString("UTF-8") || "";
      lines = existing
        .split(/\r?\n/)
        .filter(function(l) { return /^\d{4}-\d{2}-\d{2}\b/.test(l.trim()); })
        .map(function(l) { return l.replace(/\s+\[ÚLTIMO CÓDIGO ACTIVO\]\s*$/, "").trim(); });
    }

    const alreadyHasSlot = lines.some(function(l) { return l.indexOf(slotDateStr) === 0; });
    if (!alreadyHasSlot) {
      lines.push(slotDateStr + " (Sábado 12:00)  ->  " + weeklyCode);
    }

    if (lines.length > 0) {
      lines[lines.length - 1] = lines[lines.length - 1] + "   [ÚLTIMO CÓDIGO ACTIVO]";
    }

    const finalContent = header + "\n" + lines.join("\n") + "\n";
    if (file) {
      if (!alreadyHasSlot) {
        file.setContent(finalContent);
      }
    } else {
      root.createFile(SECRET_CODES_FILENAME, finalContent, MimeType.PLAIN_TEXT);
    }
  } catch (e) {
    // No bloquea la web si hay límite temporal de escritura en Drive
  }

  return payload;
}

// Ejecutar manualmente desde Apps Script o automáticamente cada sábado a las 12:00
function generarCodigoSemanalSabado() {
  const root = DriveApp.getFolderById(cleanFolderId(ROOT_FOLDER_ID));
  const res = syncWeeklyPackCodeTxt_(root);
  try {
    CacheService.getScriptCache().remove("ACRUX_DRIVE_PAYLOAD_V24");
  } catch (e) {}
  return res;
}

// Ejecutar UNA sola vez en el editor de Apps Script para activar el reloj de sábados a las 12:00
function instalarDisparadorSabados12h() {
  const existing = ScriptApp.getProjectTriggers();
  for (let i = 0; i < existing.length; i++) {
    if (existing[i].getHandlerFunction() === "generarCodigoSemanalSabado") {
      ScriptApp.deleteTrigger(existing[i]);
    }
  }
  ScriptApp.newTrigger("generarCodigoSemanalSabado")
    .timeBased()
    .onWeekDay(ScriptApp.WeekDay.SATURDAY)
    .atHour(12)
    .create();
}
/* ==========================================================================
   GRUPO SCOUT ACRUX 518 · VALLADOLID
   Motor 3D Realista WebGL: "De la Explanada de Castores a la Cima del Clan"
   Incluye: Terreno Continuo PBR con Pradera, Río, Bosque y Cumbre Nevada,
   Camino 3D Interactivo Paso a Paso con Metodología Scout, Constelaciones
   3D en el Cielo (Cruz del Sur ★ ACRUX), Lenis Smooth Scroll y GSAP
   ========================================================================== */

(function () {
    // 1. Telón de Transición y Barra de Progreso
    const ropeBar = document.createElement('div');
    ropeBar.className = 'scroll-progress-rope';
    ropeBar.id = 'scrollProgressRope';

    const curtain = document.createElement('div');
    curtain.className = 'acrux-transition-curtain';
    curtain.id = 'acruxTransitionCurtain';

    const pageTitlesMap = {
        'index.html': 'PORTADA · SENDA 3D ACRUX',
        'nosotros.html': 'HISTORIA Y KRAAL · DESDE 1977',
        'secciones.html': 'LAS 5 SECCIONES EDUCATIVAS',
        'campamentos.html': 'CAMPAMENTOS Y TALLER SCOUT',
        'calendario.html': 'AGENDA DE LA RONDA SOLAR',
        'objetos-perdidos.html': 'BAÚL DE OBJETOS PERDIDOS',
        'contacto.html': 'CONTACTO Y SÁBADO DE PRUEBA'
    };
    const currentFile = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
    const currentLabel = pageTitlesMap[currentFile] || 'GRUPO SCOUT ACRUX 518';

    curtain.innerHTML = `
        <div class="curtain-inner">
            <div class="curtain-emblem" id="curtainEmblem">
                <img src="images/logo.svg" alt="Flor de Lis Acrux 518">
            </div>
            <div class="curtain-title" id="curtainTitle">${currentLabel}</div>
            <span class="curtain-coords">41°37'N 4°44'W · VALLADOLID · ASDE 518</span>
        </div>
    `;

    document.addEventListener('DOMContentLoaded', () => {
        // Si estamos en la arquitectura "Canvas-First" de Constelaciones (#cosmosCanvas),
        // solo inicializamos el reloj de cuenta atrás del sábado; el motor espacial gestiona el resto.
        if (document.getElementById('cosmosCanvas')) {
            initBaseScoutUI();
            return;
        }

        document.body.prepend(curtain);
        document.body.prepend(ropeBar);

        initBaseScoutUI();
        initCustomMagneticCursor();
        init3DCardTiltAndSpotlight();
        initInteractiveScoutCanvas();

        loadCreativeCodingLibraries().then(() => {
            initSmoothScrollAndGSAP();
            initThreeJSScoutWorld();
        });
    });

    function loadScript(src) {
        return new Promise((resolve) => {
            if (document.querySelector(`script[src="${src}"]`)) {
                resolve(true);
                return;
            }
            const s = document.createElement('script');
            s.src = src;
            s.async = true;
            s.onload = () => resolve(true);
            s.onerror = () => resolve(false);
            document.head.appendChild(s);
        });
    }

    async function loadCreativeCodingLibraries() {
        await Promise.all([
            loadScript('https://unpkg.com/lenis@1.1.20/dist/lenis.min.js'),
            loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js'),
            loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js')
        ]);
        if (window.gsap) {
            await loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js');
        }
    }

    /* ======================================================================
       2. TRAVESÍA 3D REALISTA: EXPLANADA DE CASTORES → CIMA DEL CLAN ROVER
       ====================================================================== */
    const orderedStageKeys = ['hoguera', 'castores', 'manada', 'tropa', 'esculta', 'clan'];
    let currentStageIdx = 1; // Inicia en Castores (inicio del camino)

    // Datos pedagógicos y metodológicos reales de cada etapa del camino en la montaña
    const zones3DData = {
        overview: {
            progress: 50,
            kmText: 'Valle Completo · 6.0 Km',
            altitude: '⛰️ 720 m — 2.250 m',
            tag: 'VISTA PANORÁMICA · LA MONTAÑA DEL ESCULTISMO',
            title: '🏔️ El Camino Educativo del Grupo Scout ACRUX 518',
            desc: 'Observa el recorrido completo desde la pradera del río hasta la alta montaña: un camino pedagógico continuo de los 6 a los 21 años donde cada joven aprende haciendo en plena naturaleza.',
            methods: [
                '🧭 <strong>Método Scout:</strong> Educación activa a través de la acción, la naturaleza y la vida en pequeño grupo',
                '🧣 <strong>Identidad:</strong> Pañoleta Roja Carmesí con borde Blanco Nieve desde 1977 en Valladolid',
                '📈 <strong>Autonomía progresiva:</strong> De la fantasía guiada en Castores al servicio libre en el Clan'
            ],
            linkHref: 'nosotros.html',
            linkText: 'Conocer el Método Scout',
            pos: { x: 0, z: 0 },
            camOffset: { dist: 34, angle: 0.55, height: 15 }
        },
        hoguera: {
            progress: 0,
            kmText: 'Km 0.0 · Pradera Base',
            altitude: '⛰️ Altitud: 720 m',
            tag: 'PUNTO DE PARTIDA · LA EXPLANADA BASE Y LA PROMESA',
            title: '🔥 Explanada Acrux 518 · El Fuego y la Ley Scout',
            desc: 'En la explanada principal se alza el mástil con nuestra bandera y el fuego de campamento. Aquí todo el grupo se reúne en círculo para las izadas, las veladas y la ceremonia de la Promesa Scout.',
            methods: [
                '⚜️ <strong>La Ley y la Promesa:</strong> Compromiso personal y voluntario con los valores del escultismo',
                '🏕️ <strong>Educación en la Naturaleza:</strong> El medio natural como aula viva lejos de las pantallas',
                '❤️ <strong>El Kraal de Scouters:</strong> Monitores voluntarios titulados (JJ, Marta, Hugo y equipo)'
            ],
            linkHref: 'nosotros.html',
            linkText: 'Ver Historia y Kraal',
            pos: { x: -16.5, z: 13.5 },
            camOffset: { dist: 10.5, angle: 0.65, height: 3.6 }
        },
        castores: {
            progress: 18,
            kmText: 'Km 0.8 · El Río',
            altitude: '⛰️ Altitud: 820 m',
            tag: 'ETAPA 1 DE 5 · INICIACIÓN (6 A 8 AÑOS · 1º Y 2º PRIMARIA)',
            title: '🦫 Colonia Ohiensis · Castores («Compartir»)',
            desc: 'El sendero arranca junto al río y el estanque de la pradera. A través del cuento «Los Amigos del Bosque», los más pequeños construyen juntos el Gran Dique, pierden el miedo a dormir fuera de casa y aprenden a compartir.',
            methods: [
                '🎯 <strong>Metodología:</strong> Socialización temprana mediante el juego cooperativo y la fantasía',
                '🪵 <strong>Vida de grupo:</strong> La Colonia trabaja unida sin competitividad; decisiones en el Estanque',
                '🧣 <strong>Scouters (Grandes Castores):</strong> Malak, Keeo, Burbuja y Tic Tac acompañan cada paso'
            ],
            linkHref: 'secciones.html',
            linkText: 'Ver Colonia Ohiensis',
            pos: { x: -10.0, z: 9.0 },
            camOffset: { dist: 10.0, angle: 0.48, height: 3.4 }
        },
        manada: {
            progress: 38,
            kmText: 'Km 1.9 · Roca del Consejo',
            altitude: '⛰️ Altitud: 1.050 m',
            tag: 'ETAPA 2 DE 5 · INFANCIA (8 A 11 AÑOS · 3º A 5º PRIMARIA)',
            title: '🐺 Manada Khanhiwara · Lobatos («Haremos lo mejor»)',
            desc: 'El camino empieza a subir hacia el claro del bosque donde está la Roca del Consejo. Ambientada en «El Libro de las Tierras Vírgenes», la Manada vive grandes cacerías y aprende a cuidar de su propio material.',
            methods: [
                '🐾 <strong>Sistema de Seisenas:</strong> Pequeños grupos de 6 lobatos donde asumen sus primeros encargos',
                '📖 <strong>Marco Simbólico:</strong> La Selva de Seeonee, las Máximas de Baloo y la Ley de la Manada',
                '🐺 <strong>Viejos Lobos:</strong> Guiados por Akela, Baloo, Bagheera, Raksha, Hathi y Hermano Gris'
            ],
            linkHref: 'secciones.html',
            linkText: 'Ver Manada Khanhiwara',
            pos: { x: -2.8, z: 4.2 },
            camOffset: { dist: 10.2, angle: 0.72, height: 3.6 }
        },
        tropa: {
            progress: 60,
            kmText: 'Km 3.2 · Bosque Pionero',
            altitude: '⛰️ Altitud: 1.380 m',
            tag: 'ETAPA 3 DE 5 · PUBERTAD (11 A 14 AÑOS · 6º PRIMARIA A 2º ESO)',
            title: '⚜️ Tropa Lohengrin · Scouts («Siempre Listos»)',
            desc: 'A media montaña, entre pinares, se levanta el campamento de la Tropa. Aquí los chicos y chicas viven la aventura en Patrullas autónomas, construyen con madera y cuerda de pita y se orientan con mapa y brújula.',
            methods: [
                '⛺ <strong>Sistema de Patrullas:</strong> Autogobierno juvenil con Guía, Subguía, Intendente, Sanitario, etc.',
                '🪢 <strong>Aprender Haciendo:</strong> Pionerismo, cabuyería, cocina de campo y marchas por etapas',
                '🧭 <strong>Progresión personal:</strong> Compromiso con la Promesa Scout y especialidades técnicas'
            ],
            linkHref: 'campamentos.html#taller',
            linkText: 'Taller de Nudos y Mochila',
            pos: { x: 4.5, z: -1.0 },
            camOffset: { dist: 10.8, angle: 0.52, height: 3.8 }
        },
        esculta: {
            progress: 80,
            kmText: 'Km 4.6 · Collado Alpino',
            altitude: '⛰️ Altitud: 1.790 m',
            tag: 'ETAPA 4 DE 5 · ADOLESCENCIA (14 A 17 AÑOS · 3º ESO A 1º BACH)',
            title: '🥾 Unidad Trea · Escultas («Unidad»)',
            desc: 'Superada la línea de bosque, el camino asciende por la cresta rocosa hacia el collado alpino. Los escultas son protagonistas absolutos: diseñan, financian y ejecutan sus grandes proyectos colectivos llamados «Empresas».',
            methods: [
                '🚀 <strong>Pedagogía de la Empresa:</strong> Proyectos reales elegidos, planificados y evaluados por ellos',
                '🏔️ <strong>Superación y Montaña:</strong> Travesías exigentes, vivacs bajo las estrellas y espíritu de equipo',
                '🌍 <strong>Conciencia crítica:</strong> Debate, participación ciudadana y voluntariado activo'
            ],
            linkHref: 'secciones.html',
            linkText: 'Ver Unidad Trea',
            pos: { x: 10.5, z: -6.8 },
            camOffset: { dist: 11.0, angle: 0.4, height: 4.0 }
        },
        clan: {
            progress: 100,
            kmText: 'Km 6.0 · Cima Ama Dablam',
            altitude: '⛰️ Altitud: 2.250 m · CUMBRE',
            tag: 'ETAPA 5 DE 5 · JUVENTUD (17 A 21 AÑOS · UNIVERSIDAD / FP)',
            title: '🏔️ Clan Ama Dablam · Rovers («Servir»)',
            desc: '¡Has coronado la cima nevada bajo la constelación de la Cruz del Sur (★ ACRUX)! En la cumbre del camino educativo, los rovers trazan su proyecto personal de vida, hacen voluntariado social y se forman como futuros Scouters.',
            methods: [
                '❤️ <strong>Horquilla y Servicio:</strong> Elegir libremente el camino del compromiso social y solidario',
                '🗺️ <strong>Campamentos Volantes:</strong> Alta montaña en autosuficiencia y encuentros internacionales',
                '🎓 <strong>Relevo en el Kraal:</strong> Titulación oficial de Monitor de Tiempo Libre para educar a las nuevas generaciones'
            ],
            linkHref: 'secciones.html',
            linkText: 'Ver Clan Ama Dablam',
            pos: { x: 15.2, z: -13.2 },
            camOffset: { dist: 11.5, angle: 0.3, height: 4.2 }
        }
    };

    let threeSceneState = null;

    // Función matemática determinista de relieve montañoso:
    // Crea una explanada verde a la izquierda/abajo (x < 0, z > 0) y una gran montaña realista hacia (x = 16, z = -14)
    function getTerrainHeight(x, z) {
        // 1. Pendiente principal desde la explanada hacia la cumbre del Clan (15.5, -13.5)
        const dxPeak = x - 15.8;
        const dzPeak = z - (-13.8);
        const distPeak = Math.hypot(dxPeak, dzPeak);
        const mainPeak = 15.2 * Math.exp(-(distPeak * distPeak) / 145);

        // 2. Cresta secundaria que acompaña el camino (Escultas / Tropa)
        const dxRidge = x - 7.5;
        const dzRidge = z - (-4.5);
        const distRidge = Math.hypot(dxRidge, dzRidge);
        const ridgeHeight = 6.2 * Math.exp(-(distRidge * distRidge) / 170);

        // 3. Cordilleras laterales de fondo para enmarcar el valle
        const backWall = z < -15 ? Math.pow(Math.abs(z + 15) * 0.32, 1.45) : 0;
        const leftHills = x < -20 ? Math.pow(Math.abs(x + 20) * 0.25, 1.3) : 0;

        // 4. Textura natural de roca/colinas (ruido trigonométrico multicapa)
        const detailNoise =
            Math.sin(x * 0.35) * Math.cos(z * 0.35) * 0.45 +
            Math.sin(x * 0.85 + z * 0.6) * 0.22 +
            Math.cos(x * 1.7 - z * 1.4) * 0.08;

        // Suavizar la explanada de Castores/Hoguera para que sea una pradera habitable
        const distMeadow = Math.hypot(x - (-12), z - 10);
        const meadowFlatten = Math.min(1, Math.max(0.15, distMeadow / 14));

        // Cauce del río en la zona de Castores
        const riverLine = Math.abs((z - 9.5) + (x + 10) * 0.45);
        const riverCarve = (x < -4 && z > 3 && riverLine < 2.4)
            ? -0.45 * Math.cos((riverLine / 2.4) * (Math.PI / 2))
            : 0;

        return Math.max(-0.35, (mainPeak + ridgeHeight) * meadowFlatten + backWall + leftHills + detailNoise * meadowFlatten + riverCarve);
    }

    // Genera una textura detallada en memoria para el terreno (micro-relieve de hierba, roca y grano natural)
    function createRealisticDetailTexture() {
        const c = document.createElement('canvas');
        c.width = 512;
        c.height = 512;
        const ctx = c.getContext('2d');
        ctx.fillStyle = '#808080';
        ctx.fillRect(0, 0, 512, 512);

        for (let i = 0; i < 24000; i++) {
            const x = Math.random() * 512;
            const y = Math.random() * 512;
            const v = 105 + Math.floor(Math.random() * 45);
            ctx.fillStyle = `rgb(${v},${v},${v})`;
            ctx.fillRect(x, y, 2, 2);
        }
        const tex = new window.THREE.CanvasTexture(c);
        tex.wrapS = window.THREE.RepeatWrapping;
        tex.wrapT = window.THREE.RepeatWrapping;
        tex.repeat.set(28, 28);
        return tex;
    }

    function initThreeJSScoutWorld() {
        const canvas = document.getElementById('acruxThreeCanvas');
        const stage = document.getElementById('world3DStage');
        const labelsLayer = document.getElementById('world3DLabelsLayer');
        if (!canvas || !stage || !window.THREE) return;

        const THREE = window.THREE;
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x060a14);
        scene.fog = new THREE.FogExp2(0x081021, 0.011);

        const camera = new THREE.PerspectiveCamera(44, stage.clientWidth / stage.clientHeight, 0.1, 260);
        const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
        renderer.setSize(stage.clientWidth, stage.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.15;

        // Iluminación Atmosférica Realista (Hemisphere + Sol/Luna con Sombras + Luz de Hoguera)
        const hemiLight = new THREE.HemisphereLight(0x93c5fd, 0x1e293b, 0.75);
        scene.add(hemiLight);

        const dirLight = new THREE.DirectionalLight(0xdbeafe, 0.95);
        dirLight.position.set(-28, 42, 26);
        dirLight.castShadow = true;
        dirLight.shadow.mapSize.width = 1024;
        dirLight.shadow.mapSize.height = 1024;
        scene.add(dirLight);

        const fireLight = new THREE.PointLight(0xff6a00, 3.8, 24);
        const hogueraY = getTerrainHeight(-16.5, 13.5);
        fireLight.position.set(-16.5, hogueraY + 1.8, 13.5);
        scene.add(fireLight);

        // 1. MALLA DE TERRENO DE ALTA DENSIDAD CON COLORACIÓN POR BIOMAS (PRADERA -> BOSQUE -> ROCA -> NIEVE)
        const terrainGeo = new THREE.PlaneGeometry(76, 76, 150, 150);
        terrainGeo.rotateX(-Math.PI / 2);

        const posAttr = terrainGeo.attributes.position;
        const colors = new Float32Array(posAttr.count * 3);
        const colorTmp = new THREE.Color();

        for (let i = 0; i < posAttr.count; i++) {
            const vx = posAttr.getX(i);
            const vz = posAttr.getZ(i);
            const vy = getTerrainHeight(vx, vz);
            posAttr.setY(i, vy);

            // Bioma según altitud y pendiente
            if (vy < 0.02) {
                // Lecho húmedo del río y orilla de cantos rodados
                colorTmp.setHex(0x2b5870);
            } else if (vy < 2.2) {
                // Explanada / Pradera verde fresca (Castores y Manada)
                const t = vy / 2.2;
                colorTmp.setHex(0x254d2b).lerp(new THREE.Color(0x365932), t);
            } else if (vy < 6.2) {
                // Ladera de bosque de pino y musgo (Tropa)
                const t = (vy - 2.2) / 4.0;
                colorTmp.setHex(0x365932).lerp(new THREE.Color(0x4b493e), t);
            } else if (vy < 10.6) {
                // Roca granítica de alta montaña (Escultas)
                const t = (vy - 6.2) / 4.4;
                colorTmp.setHex(0x4b493e).lerp(new THREE.Color(0x787c85), t);
            } else {
                // Nieve perpetua de la Cima Ama Dablam (Clan Rover)
                const t = Math.min(1, (vy - 10.6) / 2.5);
                colorTmp.setHex(0x94a3b8).lerp(new THREE.Color(0xf8fafc), t);
            }

            colors[i * 3] = colorTmp.r;
            colors[i * 3 + 1] = colorTmp.g;
            colors[i * 3 + 2] = colorTmp.b;
        }

        terrainGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        terrainGeo.computeVertexNormals();

        const detailTex = createRealisticDetailTexture();
        const terrainMat = new THREE.MeshStandardMaterial({
            vertexColors: true,
            bumpMap: detailTex,
            bumpScale: 0.18,
            roughness: 0.86,
            metalness: 0.04
        });
        const terrainMesh = new THREE.Mesh(terrainGeo, terrainMat);
        terrainMesh.receiveShadow = true;
        scene.add(terrainMesh);

        // 2. RÍO Y ESTANQUE DE LA COLONIA OHIENSIS (AGUA REFLECTANTE)
        const waterGeo = new THREE.PlaneGeometry(18, 5.2, 24, 8);
        waterGeo.rotateX(-Math.PI / 2);
        const waterMat = new THREE.MeshStandardMaterial({
            color: 0x0ea5e9,
            emissive: 0x0284c7,
            emissiveIntensity: 0.25,
            roughness: 0.12,
            metalness: 0.65,
            transparent: true,
            opacity: 0.88
        });
        const waterMesh = new THREE.Mesh(waterGeo, waterMat);
        waterMesh.rotation.y = -0.42;
        waterMesh.position.set(-10.2, getTerrainHeight(-10.0, 9.0) + 0.12, 9.2);
        scene.add(waterMesh);

        // 3. EL CAMINO SCOUT (SPLINE 3D CONTINUO DESDE LA EXPLANADA HASTA LA CIMA DEL CLAN)
        const trailControlPoints = [
            new THREE.Vector3(-16.5, getTerrainHeight(-16.5, 13.5) + 0.14, 13.5), // 0. Explanada Hoguera
            new THREE.Vector3(-13.2, getTerrainHeight(-13.2, 11.4) + 0.14, 11.4),
            new THREE.Vector3(-10.0, getTerrainHeight(-10.0, 9.0) + 0.18, 9.0),   // 1. Castores
            new THREE.Vector3(-6.2, getTerrainHeight(-6.2, 6.8) + 0.14, 6.8),
            new THREE.Vector3(-2.8, getTerrainHeight(-2.8, 4.2) + 0.14, 4.2),     // 2. Manada
            new THREE.Vector3(1.0, getTerrainHeight(1.0, 1.8) + 0.14, 1.8),
            new THREE.Vector3(4.5, getTerrainHeight(4.5, -1.0) + 0.14, -1.0),     // 3. Tropa
            new THREE.Vector3(7.6, getTerrainHeight(7.6, -4.0) + 0.16, -4.0),
            new THREE.Vector3(10.5, getTerrainHeight(10.5, -6.8) + 0.16, -6.8),   // 4. Escultas
            new THREE.Vector3(13.0, getTerrainHeight(13.0, -10.2) + 0.18, -10.2),
            new THREE.Vector3(15.2, getTerrainHeight(15.2, -13.2) + 0.2, -13.2)   // 5. Cima Clan Ama Dablam
        ];

        const trailCurve = new THREE.CatmullRomCurve3(trailControlPoints);

        // Sendero de tierra ocre sobre la montaña
        const pathTubeGeo = new THREE.TubeGeometry(trailCurve, 140, 0.42, 8, false);
        pathTubeGeo.scale(1, 0.18, 1);
        const pathTubeMat = new THREE.MeshStandardMaterial({
            color: 0xc29b61,
            roughness: 0.9,
            emissive: 0x78350f,
            emissiveIntensity: 0.15
        });
        const pathMesh = new THREE.Mesh(pathTubeGeo, pathTubeMat);
        scene.add(pathMesh);

        // Hilo luminoso guía Carmesí y Oro sobre el sendero
        const guideTubeGeo = new THREE.TubeGeometry(trailCurve, 140, 0.08, 6, false);
        const guideTubeMat = new THREE.MeshBasicMaterial({ color: 0xfbbf24 });
        const guideMesh = new THREE.Mesh(guideTubeGeo, guideTubeMat);
        guideMesh.position.y = 0.09;
        scene.add(guideMesh);

        // Hitos de piedra y balizas de sendero GR (Rojo y Blanco como la pañoleta Acrux)
        for (let t = 0.04; t <= 0.98; t += 0.045) {
            const pt = trailCurve.getPointAt(t);
            const cairn = new THREE.Group();
            const post = new THREE.Mesh(
                new THREE.CylinderGeometry(0.06, 0.07, 0.55, 6),
                new THREE.MeshStandardMaterial({ color: 0x78350f })
            );
            post.position.y = 0.25;
            cairn.add(post);

            // Marca GR Blanca y Roja Carmesí
            const stripeWhite = new THREE.Mesh(
                new THREE.CylinderGeometry(0.065, 0.065, 0.09, 6),
                new THREE.MeshBasicMaterial({ color: 0xffffff })
            );
            stripeWhite.position.y = 0.44;
            cairn.add(stripeWhite);

            const stripeRed = new THREE.Mesh(
                new THREE.CylinderGeometry(0.065, 0.065, 0.09, 6),
                new THREE.MeshBasicMaterial({ color: 0xb02324 })
            );
            stripeRed.position.y = 0.34;
            cairn.add(stripeRed);

            cairn.position.set(pt.x + 0.55, pt.y, pt.z + 0.35);
            scene.add(cairn);
        }

        // Marcador 3D del Caminante Scout (Antorcha / Pionero que avanza por el sendero)
        const hikerGroup = new THREE.Group();
        const hikerBody = new THREE.Mesh(
            new THREE.ConeGeometry(0.32, 0.95, 12),
            new THREE.MeshStandardMaterial({ color: 0xb02324, emissive: 0x7a1415, emissiveIntensity: 0.5 })
        );
        hikerBody.position.y = 0.5;
        hikerGroup.add(hikerBody);

        const hikerHead = new THREE.Mesh(
            new THREE.SphereGeometry(0.22, 12, 12),
            new THREE.MeshBasicMaterial({ color: 0xfef08a })
        );
        hikerHead.position.y = 1.15;
        hikerGroup.add(hikerHead);

        const hikerLight = new THREE.PointLight(0xfde047, 2.2, 8);
        hikerLight.position.y = 1.4;
        hikerGroup.add(hikerLight);
        scene.add(hikerGroup);

        // 4. CONSTRUCCIONES Y CAMPAMENTOS EN CADA ETAPA DEL CAMINO
        const interactiveMeshes = [];

        function addCampStageTents(cx, cz, colorHex, zoneKey, count) {
            for (let i = 0; i < count; i++) {
                const angle = (i / count) * Math.PI * 1.4 - 0.6;
                const tx = cx + Math.cos(angle) * 2.1;
                const tz = cz + Math.sin(angle) * 2.1;
                const ty = getTerrainHeight(tx, tz);

                const tentGroup = new THREE.Group();
                const tentGeo = new THREE.CylinderGeometry(0.04, 1.05, 1.65, 3);
                const tentMat = new THREE.MeshStandardMaterial({ color: colorHex, roughness: 0.55 });
                const tent = new THREE.Mesh(tentGeo, tentMat);
                tent.rotation.z = Math.PI / 2;
                tent.rotation.y = Math.PI / 2;
                tent.position.y = 0.52;
                tent.userData = { zoneKey };
                tentGroup.add(tent);
                interactiveMeshes.push(tent);

                const trim = new THREE.Mesh(
                    new THREE.BoxGeometry(1.7, 0.1, 1.35),
                    new THREE.MeshStandardMaterial({ color: 0xffffff })
                );
                trim.position.y = 0.05;
                trim.userData = { zoneKey };
                tentGroup.add(trim);
                interactiveMeshes.push(trim);

                tentGroup.position.set(tx, ty, tz);
                tentGroup.rotation.y = -angle;
                scene.add(tentGroup);
            }
        }

        // Etapa 0: Hoguera Central + Mástil con Bandera Carmesí y Blanca en la Explanada
        const hx = zones3DData.hoguera.pos.x;
        const hz = zones3DData.hoguera.pos.z;
        const hy = getTerrainHeight(hx, hz);

        const fireCore = new THREE.Mesh(
            new THREE.OctahedronGeometry(0.55, 1),
            new THREE.MeshBasicMaterial({ color: 0xff6b00 })
        );
        fireCore.position.set(hx, hy + 0.5, hz);
        fireCore.userData = { zoneKey: 'hoguera' };
        scene.add(fireCore);
        interactiveMeshes.push(fireCore);

        const pole = new THREE.Mesh(
            new THREE.CylinderGeometry(0.06, 0.09, 5.2, 8),
            new THREE.MeshStandardMaterial({ color: 0xe2e8f0 })
        );
        pole.position.set(hx - 1.8, hy + 2.6, hz - 1.2);
        pole.userData = { zoneKey: 'hoguera' };
        scene.add(pole);
        interactiveMeshes.push(pole);

        const flagGeo = new THREE.PlaneGeometry(2.1, 1.2, 12, 5);
        const flagMat = new THREE.MeshStandardMaterial({
            color: 0xb02324,
            emissive: 0x4c0b0c,
            side: THREE.DoubleSide
        });
        const flagMesh = new THREE.Mesh(flagGeo, flagMat);
        flagMesh.position.set(hx - 0.75, hy + 4.5, hz - 1.2);
        flagMesh.userData = { zoneKey: 'hoguera' };
        scene.add(flagMesh);
        interactiveMeshes.push(flagMesh);

        // Etapa 1: Castores (Colonia Ohiensis · Dique de troncos + Tiendas Azules)
        addCampStageTents(zones3DData.castores.pos.x, zones3DData.castores.pos.z, 0x0284c7, 'castores', 2);

        // Etapa 2: Manada (Manada Khanhiwara · Roca del Consejo + Tiendas Amarillas)
        addCampStageTents(zones3DData.manada.pos.x, zones3DData.manada.pos.z, 0xd97706, 'manada', 3);

        // Etapa 3: Tropa (Tropa Lohengrin · Tiendas Verdes en el bosque)
        addCampStageTents(zones3DData.tropa.pos.x, zones3DData.tropa.pos.z, 0x15803d, 'tropa', 3);

        // Etapa 4: Escultas (Unidad Trea · Vivac Rojo Carmesí en el collado)
        addCampStageTents(zones3DData.esculta.pos.x, zones3DData.esculta.pos.z, 0xb02324, 'esculta', 2);

        // Etapa 5: Cima Clan Ama Dablam (Cumbre Nevada + Bandera de Cumbre y Horquilla Rover)
        const cx = zones3DData.clan.pos.x;
        const cz = zones3DData.clan.pos.z;
        const cy = getTerrainHeight(cx, cz);
        addCampStageTents(cx, cz, 0x7c3aed, 'clan', 1);

        const summitBeacon = new THREE.Mesh(
            new THREE.OctahedronGeometry(0.45, 0),
            new THREE.MeshBasicMaterial({ color: 0xfef08a })
        );
        summitBeacon.position.set(cx, cy + 2.2, cz);
        summitBeacon.userData = { zoneKey: 'clan' };
        scene.add(summitBeacon);
        interactiveMeshes.push(summitBeacon);

        // 5. BOSQUE NATURAL DE PINOS Y ABETOS (SOLO POR DEBAJO DE COTA DE NIEVE)
        for (let i = 0; i < 68; i++) {
            const tx = (Math.random() - 0.5) * 52;
            const tz = (Math.random() - 0.5) * 48;
            const ty = getTerrainHeight(tx, tz);

            // Evitar plantar árboles encima del camino o en la cumbre nevada
            let nearTrail = false;
            for (const k of orderedStageKeys) {
                const p = zones3DData[k].pos;
                if (Math.hypot(tx - p.x, tz - p.z) < 3.6) nearTrail = true;
            }
            if (nearTrail || ty < 0.25 || ty > 8.8) continue;

            const tree = new THREE.Group();
            const trunk = new THREE.Mesh(
                new THREE.CylinderGeometry(0.12, 0.2, 0.9, 6),
                new THREE.MeshStandardMaterial({ color: 0x452715 })
            );
            trunk.position.y = 0.45;
            tree.add(trunk);

            const tier1 = new THREE.Mesh(
                new THREE.ConeGeometry(0.95, 1.9, 7),
                new THREE.MeshStandardMaterial({ color: 0x1b4332, roughness: 0.85 })
            );
            tier1.position.y = 1.5;
            tree.add(tier1);

            const tier2 = new THREE.Mesh(
                new THREE.ConeGeometry(0.7, 1.5, 7),
                new THREE.MeshStandardMaterial({ color: 0x2d6a4f, roughness: 0.85 })
            );
            tier2.position.y = 2.4;
            tree.add(tier2);

            const sc = 0.75 + Math.random() * 0.55;
            tree.scale.set(sc, sc, sc);
            tree.position.set(tx, ty, tz);
            scene.add(tree);
        }

        // 6. CONSTELACIONES 3D EN EL CIELO (CRUZ DEL SUR ★ ACRUX + OSA MENOR)
        const skyGroup = new THREE.Group();
        scene.add(skyGroup);

        // Fondo de 600 estrellas
        const starCount = 600;
        const starGeo = new THREE.BufferGeometry();
        const starPos = new Float32Array(starCount * 3);
        for (let i = 0; i < starCount; i++) {
            const r = 75 + Math.random() * 35;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.random() * Math.PI * 0.44;
            starPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            starPos[i * 3 + 1] = r * Math.cos(phi) + 12;
            starPos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
        }
        starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
        const starMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.5, transparent: true, opacity: 0.92 });
        const starField = new THREE.Points(starGeo, starMat);
        skyGroup.add(starField);

        // Constelación Oficial: LA CRUZ DEL SUR (★ ACRUX brillando sobre la Cima Ama Dablam)
        const cruxStars = [
            new THREE.Vector3(14, 28, -32),  // Acrux (Alpha Crucis · Estrella principal inferior)
            new THREE.Vector3(14, 37, -32),  // Gacrux (Superior)
            new THREE.Vector3(9.5, 33, -32), // Mimosa (Izquierda)
            new THREE.Vector3(18.5, 33.4, -32), // Imai (Derecha)
            new THREE.Vector3(16.2, 30.8, -32)  // Intrometida (Epsilon Crucis)
        ];

        cruxStars.forEach((pos, idx) => {
            const starSphere = new THREE.Mesh(
                new THREE.SphereGeometry(idx === 0 ? 0.65 : 0.42, 12, 12),
                new THREE.MeshBasicMaterial({ color: idx === 0 ? 0xff4d4f : 0xfef08a })
            );
            starSphere.position.copy(pos);
            skyGroup.add(starSphere);
        });

        // Líneas luminosas que trazan la Cruz del Sur en el cielo 3D
        const cruxLineGeo = new THREE.BufferGeometry().setFromPoints([
            cruxStars[0], cruxStars[1],
            cruxStars[2], cruxStars[3]
        ]);
        const cruxLineMat = new THREE.LineBasicMaterial({ color: 0xfde047, transparent: true, opacity: 0.75 });
        const cruxLines = new THREE.LineSegments(cruxLineGeo, cruxLineMat);
        skyGroup.add(cruxLines);

        // Chispas 3D de la Hoguera
        const sparkCount = 75;
        const sparkGeo = new THREE.BufferGeometry();
        const sparkPositions = new Float32Array(sparkCount * 3);
        const sparkSpeeds = [];
        for (let i = 0; i < sparkCount; i++) {
            sparkPositions[i * 3] = hx + (Math.random() - 0.5) * 1.1;
            sparkPositions[i * 3 + 1] = hy + Math.random() * 4.5;
            sparkPositions[i * 3 + 2] = hz + (Math.random() - 0.5) * 1.1;
            sparkSpeeds.push(0.025 + Math.random() * 0.04);
        }
        sparkGeo.setAttribute('position', new THREE.BufferAttribute(sparkPositions, 3));
        const sparkMat = new THREE.PointsMaterial({ color: 0xffaa00, size: 0.26, transparent: true, opacity: 0.9 });
        scene.add(new THREE.Points(sparkGeo, sparkMat));

        // 7. ETIQUETAS 3D PROYECTADAS SOBRE CADA ETAPA DEL CAMINO
        const pinLabelsMap = {
            hoguera: '🔥 0. Explanada Base (720m)',
            castores: '🦫 1. Castores (820m)',
            manada: '🐺 2. Manada (1.050m)',
            tropa: '⚜️ 3. Tropa (1.380m)',
            esculta: '🥾 4. Escultas (1.790m)',
            clan: '🏔️ 5. Cima Clan (2.250m)'
        };
        const pinElements = {};
        if (labelsLayer) {
            labelsLayer.innerHTML = '';
            orderedStageKeys.forEach(k => {
                const pin = document.createElement('button');
                pin.type = 'button';
                pin.className = 'world3d-floating-pin' + (k === 'castores' ? ' active' : '');
                pin.innerHTML = pinLabelsMap[k];
                pin.onclick = (e) => {
                    e.stopPropagation();
                    window.flyTo3DZone(k);
                };
                labelsLayer.appendChild(pin);
                pinElements[k] = pin;
            });
        }

        // Estado inicial de la cámara: centrada en el inicio del camino (Castores)
        const startZ = zones3DData.castores;
        const startY = getTerrainHeight(startZ.pos.x, startZ.pos.z);
        const camState = {
            trailT: 0.18,
            targetX: startZ.pos.x,
            targetY: startY + 0.8,
            targetZ: startZ.pos.z,
            dist: startZ.camOffset.dist,
            angle: startZ.camOffset.angle,
            height: startZ.camOffset.height,
            fireBoost: 1.0
        };

        // Posicionar al caminante 3D en el punto inicial
        const updateHikerPosition = (tVal) => {
            const clamped = Math.max(0, Math.min(1, tVal));
            const pt = trailCurve.getPointAt(clamped);
            hikerGroup.position.set(pt.x, pt.y, pt.z);
        };
        updateHikerPosition(camState.trailT);

        // Interacción de arrastrar para mirar alrededor 360º desde el punto actual del camino
        let isDragging = false;
        let prevX = 0;
        let prevY = 0;
        let dragDistance = 0;

        stage.addEventListener('pointerdown', (e) => {
            if (e.target.closest('button, a, input, .world3d-info-card, .trail-scrubber-bar')) return;
            isDragging = true;
            prevX = e.clientX;
            prevY = e.clientY;
            dragDistance = 0;
        });

        window.addEventListener('pointermove', (e) => {
            if (!isDragging) return;
            const dx = e.clientX - prevX;
            const dy = e.clientY - prevY;
            dragDistance += Math.hypot(dx, dy);
            prevX = e.clientX;
            prevY = e.clientY;

            camState.angle -= dx * 0.007;
            camState.height = Math.max(1.5, Math.min(18, camState.height + dy * 0.03));
        });

        window.addEventListener('pointerup', () => {
            isDragging = false;
        });

        stage.addEventListener('wheel', (e) => {
            if (e.target.closest('.world3d-info-card')) return;
            e.preventDefault();
            camState.dist = Math.max(6, Math.min(38, camState.dist + e.deltaY * 0.015));
        }, { passive: false });

        // Slider interactivo para caminar de forma continua por el sendero (0% -> 100%)
        const sliderEl = document.getElementById('trailProgressSlider');
        if (sliderEl) {
            sliderEl.addEventListener('input', (e) => {
                const pct = parseFloat(e.target.value) / 100;
                camState.trailT = pct;
                const pt = trailCurve.getPointAt(pct);
                camState.targetX = pt.x;
                camState.targetY = pt.y + 0.8;
                camState.targetZ = pt.z;
                updateHikerPosition(pct);

                // Detectar qué etapa está más cerca para actualizar la explicación metodológica en vivo
                let closestKey = 'hoguera';
                let minDiff = 999;
                orderedStageKeys.forEach((k, idx) => {
                    const diff = Math.abs((zones3DData[k].progress / 100) - pct);
                    if (diff < minDiff) {
                        minDiff = diff;
                        closestKey = k;
                        currentStageIdx = idx;
                    }
                });
                updateHUDCardOnly(closestKey);
            });
        }

        // Raycasting sobre las tiendas 3D
        const raycaster = new THREE.Raycaster();
        const mouseVec = new THREE.Vector2();
        canvas.addEventListener('click', (e) => {
            if (dragDistance > 8) return;
            const rect = canvas.getBoundingClientRect();
            mouseVec.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            mouseVec.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
            raycaster.setFromCamera(mouseVec, camera);
            const hits = raycaster.intersectObjects(interactiveMeshes, false);
            if (hits.length > 0 && hits[0].object.userData.zoneKey) {
                window.flyTo3DZone(hits[0].object.userData.zoneKey);
            }
        });

        // Bucle de animación 3D
        const flagPosAttr = flagGeo.attributes.position;
        const projVec = new THREE.Vector3();
        let clock = 0;

        function animate3D() {
            requestAnimationFrame(animate3D);
            clock += 0.035;

            const cx = camState.targetX + Math.sin(camState.angle) * camState.dist;
            const cy = camState.targetY + camState.height;
            const cz = camState.targetZ + Math.cos(camState.angle) * camState.dist;
            camera.position.set(cx, cy, cz);
            camera.lookAt(camState.targetX, camState.targetY + 0.4, camState.targetZ);

            // Bandera Acrux ondeando
            for (let i = 0; i < flagPosAttr.count; i++) {
                const vx = flagPosAttr.getX(i);
                const wave = Math.sin(vx * 2.4 + clock * 3.2) * 0.14 * ((vx + 1.05) / 2.1);
                flagPosAttr.setZ(i, wave);
            }
            flagPosAttr.needsUpdate = true;

            // Hoguera y chispas
            camState.fireBoost += (1.0 - camState.fireBoost) * 0.04;
            const sFlicker = (0.9 + Math.sin(clock * 7) * 0.14) * camState.fireBoost;
            fireCore.scale.set(sFlicker, sFlicker * 1.25, sFlicker);
            fireLight.intensity = (3.4 + Math.sin(clock * 9) * 0.5) * camState.fireBoost;

            const spArr = sparkGeo.attributes.position.array;
            for (let i = 0; i < sparkCount; i++) {
                spArr[i * 3 + 1] += sparkSpeeds[i] * camState.fireBoost;
                if (spArr[i * 3 + 1] > hy + 4.8 * camState.fireBoost) {
                    spArr[i * 3 + 1] = hy + 0.35;
                }
            }
            sparkGeo.attributes.position.needsUpdate = true;

            summitBeacon.rotation.y += 0.025;
            updateHikerPosition(camState.trailT);

            renderer.render(scene, camera);

            // Proyectar Pines 3D a coordenadas de pantalla
            const w = stage.clientWidth;
            const h = stage.clientHeight;
            orderedStageKeys.forEach(k => {
                const pinEl = pinElements[k];
                const zInfo = zones3DData[k];
                if (!pinEl || !zInfo) return;
                const pyTerrain = getTerrainHeight(zInfo.pos.x, zInfo.pos.z);
                projVec.set(zInfo.pos.x, pyTerrain + 2.1, zInfo.pos.z);
                projVec.project(camera);
                if (projVec.z > 1) {
                    pinEl.style.display = 'none';
                } else {
                    const px = (projVec.x * 0.5 + 0.5) * w;
                    const py = (-(projVec.y * 0.5) + 0.5) * h;
                    pinEl.style.display = 'flex';
                    pinEl.style.transform = `translate3d(${px}px, ${py}px, 0) translate(-50%, -100%)`;
                }
            });
        }

        animate3D();

        window.addEventListener('resize', () => {
            if (!stage) return;
            camera.aspect = stage.clientWidth / stage.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(stage.clientWidth, stage.clientHeight);
        });

        threeSceneState = {
            scene,
            hemiLight,
            dirLight,
            starMat,
            cruxLineMat,
            camState,
            pinElements,
            THREE
        };
    }

    function updateHUDCardOnly(zoneKey) {
        const z = zones3DData[zoneKey];
        if (!z) return;

        document.querySelectorAll('.waypoint-3d-pill').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.zone === zoneKey);
        });
        if (threeSceneState && threeSceneState.pinElements) {
            Object.keys(threeSceneState.pinElements).forEach(k => {
                threeSceneState.pinElements[k].classList.toggle('active', k === zoneKey);
            });
        }

        const tagEl = document.getElementById('w3dTag');
        const altEl = document.getElementById('w3dAltitude');
        const titleEl = document.getElementById('w3dTitle');
        const descEl = document.getElementById('w3dDesc');
        const methodListEl = document.getElementById('w3dMethodList');
        const linkEl = document.getElementById('w3dLink');
        const linkTextEl = document.getElementById('w3dLinkText');
        const kmBadge = document.getElementById('trailPctBadge');

        if (tagEl) tagEl.textContent = z.tag;
        if (altEl) altEl.textContent = z.altitude;
        if (titleEl) titleEl.textContent = z.title;
        if (descEl) descEl.textContent = z.desc;
        if (methodListEl && z.methods) {
            methodListEl.innerHTML = z.methods.map(m => `<li>${m}</li>`).join('');
        }
        if (linkEl) linkEl.setAttribute('href', z.linkHref);
        if (linkTextEl) linkTextEl.textContent = z.linkText;
        if (kmBadge) kmBadge.textContent = z.kmText;
    }

    window.flyTo3DZone = function (zoneKey) {
        const z = zones3DData[zoneKey];
        if (!z || !threeSceneState) return;

        const idx = orderedStageKeys.indexOf(zoneKey);
        if (idx !== -1) currentStageIdx = idx;

        updateHUDCardOnly(zoneKey);

        const sliderEl = document.getElementById('trailProgressSlider');
        if (sliderEl && z.progress !== undefined) {
            sliderEl.value = z.progress;
        }

        const targetTerrainY = zoneKey === 'overview' ? 3.5 : getTerrainHeight(z.pos.x, z.pos.z) + 0.8;
        const targetTrailT = (z.progress !== undefined ? z.progress : 50) / 100;

        if (window.gsap) {
            gsap.to(threeSceneState.camState, {
                trailT: targetTrailT,
                targetX: z.pos.x,
                targetY: targetTerrainY,
                targetZ: z.pos.z,
                dist: z.camOffset.dist,
                angle: z.camOffset.angle,
                height: z.camOffset.height,
                duration: 1.4,
                ease: 'power3.inOut'
            });
        } else {
            Object.assign(threeSceneState.camState, {
                trailT: targetTrailT,
                targetX: z.pos.x,
                targetY: targetTerrainY,
                targetZ: z.pos.z,
                dist: z.camOffset.dist,
                angle: z.camOffset.angle,
                height: z.camOffset.height
            });
        }
    };

    window.stepTrailStage = function (delta) {
        currentStageIdx = (currentStageIdx + delta + orderedStageKeys.length) % orderedStageKeys.length;
        window.flyTo3DZone(orderedStageKeys[currentStageIdx]);
    };

    window.set3DAtmosphere = function (mode, btn) {
        if (!threeSceneState) return;
        document.querySelectorAll('.world3d-hud-top .world3d-btn').forEach(b => {
            if (!b.classList.contains('world3d-btn-fire')) b.classList.remove('active');
        });
        if (btn) btn.classList.add('active');

        const { scene, hemiLight, dirLight, starMat, cruxLineMat, THREE } = threeSceneState;
        if (mode === 'night') {
            scene.background = new THREE.Color(0x060a14);
            scene.fog.color.setHex(0x081021);
            hemiLight.intensity = 0.75;
            dirLight.color.setHex(0xdbeafe);
            dirLight.intensity = 0.95;
            starMat.opacity = 0.95;
            cruxLineMat.opacity = 0.75;
        } else if (mode === 'sunset') {
            scene.background = new THREE.Color(0x28101c);
            scene.fog.color.setHex(0x361522);
            hemiLight.intensity = 1.05;
            dirLight.color.setHex(0xfb923c);
            dirLight.intensity = 1.65;
            starMat.opacity = 0.55;
            cruxLineMat.opacity = 0.5;
        } else if (mode === 'day') {
            scene.background = new THREE.Color(0x38bdf8);
            scene.fog.color.setHex(0x7dd3fc);
            hemiLight.intensity = 1.3;
            dirLight.color.setHex(0xfef9c3);
            dirLight.intensity = 1.9;
            starMat.opacity = 0.0;
            cruxLineMat.opacity = 0.0;
        }
    };

    window.stoke3DCampfire = function () {
        if (!threeSceneState) return;
        threeSceneState.camState.fireBoost = 2.6;
        window.flyTo3DZone('hoguera');

        try {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            const ctx = new AudioCtx();
            const bufferSize = ctx.sampleRate * 0.45;
            const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
            const data = buffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) {
                data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.15));
            }
            const noise = ctx.createBufferSource();
            noise.buffer = buffer;
            const filter = ctx.createBiquadFilter();
            filter.type = 'bandpass';
            filter.frequency.value = 1200;
            const gain = ctx.createGain();
            gain.gain.value = 0.25;
            noise.connect(filter);
            filter.connect(gain);
            gain.connect(ctx.destination);
            noise.start();
        } catch (err) {
            console.log(err);
        }
    };

    /* ======================================================================
       3. TRANSICIÓN DE TELÓN + LENIS SMOOTH SCROLL + GSAP SCROLLTRIGGER
       ====================================================================== */
    function initSmoothScrollAndGSAP() {
        const curtainEl = document.getElementById('acruxTransitionCurtain');
        const emblemEl = document.getElementById('curtainEmblem');

        if (window.gsap && curtainEl) {
            gsap.to(emblemEl, {
                rotation: 360,
                scale: 1.08,
                duration: 0.55,
                ease: 'power2.out'
            });
            gsap.to(curtainEl, {
                yPercent: -100,
                duration: 0.85,
                delay: 0.15,
                ease: 'expo.inOut',
                onComplete: () => {
                    curtainEl.style.display = 'none';
                }
            });
        } else if (curtainEl) {
            curtainEl.style.transition = 'transform 0.6s cubic-bezier(0.76, 0, 0.24, 1)';
            curtainEl.style.transform = 'translateY(-100%)';
        }

        document.querySelectorAll('a[href]').forEach(link => {
            const href = link.getAttribute('href');
            if (!href) return;
            const isInternalHtml =
                !href.startsWith('http') &&
                !href.startsWith('mailto:') &&
                !href.startsWith('tel:') &&
                !href.startsWith('#') &&
                !link.hasAttribute('target') &&
                href.includes('.html');

            if (isInternalHtml) {
                link.addEventListener('click', (e) => {
                    const targetFile = href.split('#')[0].split('/').pop().toLowerCase();
                    if (targetFile === currentFile && href.includes('#')) return;

                    e.preventDefault();
                    const nextTitle = pageTitlesMap[targetFile] || 'GRUPO SCOUT ACRUX 518';
                    const titleEl = document.getElementById('curtainTitle');
                    if (titleEl) titleEl.textContent = nextTitle;

                    if (window.gsap && curtainEl) {
                        curtainEl.style.display = 'flex';
                        gsap.fromTo(
                            curtainEl,
                            { yPercent: 100 },
                            {
                                yPercent: 0,
                                duration: 0.65,
                                ease: 'expo.inOut',
                                onComplete: () => {
                                    window.location.href = href;
                                }
                            }
                        );
                    } else {
                        window.location.href = href;
                    }
                });
            }
        });

        let lenis = null;
        if (window.Lenis) {
            lenis = new Lenis({
                duration: 1.15,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                smoothWheel: true,
                wheelMultiplier: 1.0
            });

            if (window.gsap && window.ScrollTrigger) {
                gsap.registerPlugin(ScrollTrigger);
                lenis.on('scroll', ScrollTrigger.update);
                gsap.ticker.add((time) => {
                    lenis.raf(time * 1000);
                });
                gsap.ticker.lagSmoothing(0);
            } else {
                function raf(time) {
                    lenis.raf(time);
                    requestAnimationFrame(raf);
                }
                requestAnimationFrame(raf);
            }
        }

        const updateRope = () => {
            const rope = document.getElementById('scrollProgressRope');
            if (!rope) return;
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            const pct = maxScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / maxScroll)) : 0;
            rope.style.transform = `scaleX(${pct})`;
        };
        window.addEventListener('scroll', updateRope, { passive: true });
        updateRope();

        if (window.gsap && window.ScrollTrigger) {
            gsap.registerPlugin(ScrollTrigger);
            initKineticTypography();
            initHorizontalPinnedExpedition();
            initScrollRevealChoreography();
        }
    }

    function initKineticTypography() {
        const headings = document.querySelectorAll('.hero-giant-title, .page-header h1, .heading-xl');
        headings.forEach((h) => {
            if (h.dataset.kineticInit) return;
            h.dataset.kineticInit = 'true';

            const wrapWords = (node) => {
                if (node.nodeType === Node.TEXT_NODE) {
                    const text = node.textContent;
                    if (!text.trim()) return;
                    const words = text.split(/(\s+)/);
                    const frag = document.createDocumentFragment();
                    words.forEach(part => {
                        if (/^\s+$/.test(part) || !part) {
                            frag.appendChild(document.createTextNode(part));
                        } else {
                            const mask = document.createElement('span');
                            mask.className = 'kinetic-word-mask';
                            const inner = document.createElement('span');
                            inner.className = 'kinetic-word-inner';
                            inner.textContent = part;
                            mask.appendChild(inner);
                            frag.appendChild(mask);
                        }
                    });
                    node.parentNode.replaceChild(frag, node);
                } else if (node.nodeType === Node.ELEMENT_NODE) {
                    Array.from(node.childNodes).forEach(wrapWords);
                }
            };

            wrapWords(h);
            const wordInners = h.querySelectorAll('.kinetic-word-inner');
            if (!wordInners.length) return;

            gsap.fromTo(
                wordInners,
                { yPercent: 115, rotateZ: 3, opacity: 0 },
                {
                    yPercent: 0,
                    rotateZ: 0,
                    opacity: 1,
                    duration: 0.9,
                    stagger: 0.04,
                    ease: 'power4.out',
                    scrollTrigger: {
                        trigger: h,
                        start: 'top 88%',
                        toggleActions: 'play none none none'
                    }
                }
            );
        });
    }

    function initHorizontalPinnedExpedition() {
        const section = document.getElementById('horizontalExpedition');
        const pinWrap = document.getElementById('horizontalPinWrap');
        const track = document.getElementById('horizontalTrack');
        const marquee = document.getElementById('kineticMarquee');
        const progressText = document.getElementById('horizontalProgressText');

        if (!section || !pinWrap || !track) return;

        const mm = gsap.matchMedia();
        mm.add('(min-width: 901px)', () => {
            const getScrollAmount = () => Math.max(0, track.scrollWidth - window.innerWidth + 80);

            const tween = gsap.to(track, {
                x: () => -getScrollAmount(),
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    pin: pinWrap,
                    start: 'top top',
                    end: () => `+=${getScrollAmount()}`,
                    scrub: 1,
                    invalidateOnRefresh: true,
                    onUpdate: (self) => {
                        if (progressText) {
                            const pct = Math.round(self.progress * 100);
                            const step = Math.min(5, Math.max(1, Math.ceil(self.progress * 5) || 1));
                            progressText.textContent = `0${step} / 05 · ${pct}%`;
                        }
                    }
                }
            });

            if (marquee) {
                gsap.to(marquee, {
                    xPercent: -35,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top bottom',
                        end: () => `+=${getScrollAmount() + window.innerHeight}`,
                        scrub: 1.2
                    }
                });
            }

            track.querySelectorAll('.expedition-slide-bg img').forEach((img) => {
                gsap.fromTo(
                    img,
                    { xPercent: -8 },
                    {
                        xPercent: 8,
                        ease: 'none',
                        scrollTrigger: {
                            trigger: section,
                            start: 'top top',
                            end: () => `+=${getScrollAmount()}`,
                            scrub: true
                        }
                    }
                );
            });

            return () => {
                if (tween.scrollTrigger) tween.scrollTrigger.kill();
            };
        });
    }

    function initScrollRevealChoreography() {
        const cardGroups = [
            '.scout-pages-grid .scout-page-card',
            '.lost-grid .lost-card',
            '.kraal-coord-row .coord-card',
            '.camp-activities-grid .camp-activity-box',
            '.values-bento-row .value-tile',
            '.section-detail-card',
            '.event-card'
        ];

        cardGroups.forEach(selector => {
            const items = document.querySelectorAll(selector);
            if (!items.length) return;
            gsap.fromTo(
                items,
                { y: 48, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.85,
                    stagger: 0.08,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: items[0].parentElement,
                        start: 'top 86%'
                    }
                }
            );
        });

        document.querySelectorAll('.photo-story-card img, .lightpainting-showcase img, .camp-duo-card img').forEach(img => {
            gsap.fromTo(
                img,
                { scale: 1.08, yPercent: -4 },
                {
                    scale: 1.08,
                    yPercent: 4,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: img.parentElement,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: true
                    }
                }
            );
        });
    }

    function initCustomMagneticCursor() {
        if (!window.matchMedia('(pointer: fine)').matches) return;

        const dot = document.createElement('div');
        dot.className = 'acrux-cursor-dot';

        const ring = document.createElement('div');
        ring.className = 'acrux-cursor-ring';
        const label = document.createElement('span');
        label.className = 'acrux-cursor-label';
        label.textContent = 'EXPLORAR ↗';
        ring.appendChild(label);

        document.body.appendChild(dot);
        document.body.appendChild(ring);

        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let ringX = mouseX;
        let ringY = mouseY;

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
        }, { passive: true });

        function renderCursor() {
            ringX += (mouseX - ringX) * 0.16;
            ringY += (mouseY - ringY) * 0.16;
            ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
            requestAnimationFrame(renderCursor);
        }
        requestAnimationFrame(renderCursor);

        const interactiveCards = document.querySelectorAll(
            '.scout-page-card, .expedition-slide-card, .photo-story-card, .lost-card, .lightpainting-showcase, .world3d-stage-wrap'
        );
        interactiveCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                const customText = card.getAttribute('data-cursor') ||
                    (card.classList.contains('world3d-stage-wrap') ? 'SENDA 3D 🏔️' :
                     card.classList.contains('lost-card') ? 'RECLAMAR 📲' :
                     card.classList.contains('photo-story-card') ? 'ACRUX 518 ⚜️' : 'EXPLORAR ↗');
                label.textContent = customText;
                document.body.classList.add('cursor-hover-card');
            });
            card.addEventListener('mouseleave', () => {
                document.body.classList.remove('cursor-hover-card');
            });
        });

        const magneticButtons = document.querySelectorAll(
            '.nav-cta, .btn-hero-primary, .btn-hero-glass, .btn-primary, .btn-secondary, .whatsapp-floating-btn'
        );
        magneticButtons.forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                document.body.classList.add('cursor-hover-link');
            });
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const relX = e.clientX - rect.left - rect.width / 2;
                const relY = e.clientY - rect.top - rect.height / 2;
                btn.style.transform = `translate3d(${relX * 0.22}px, ${relY * 0.22}px, 0)`;
            });
            btn.addEventListener('mouseleave', () => {
                document.body.classList.remove('cursor-hover-link');
                btn.style.transform = '';
            });
        });
    }

    function init3DCardTiltAndSpotlight() {
        if (!window.matchMedia('(pointer: fine)').matches) return;

        const tiltCards = document.querySelectorAll(
            '.scout-page-card, .lost-card, .value-tile, .coord-card, .expedition-slide-card, .section-detail-card'
        );

        tiltCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);

                const rotateY = ((x / rect.width) - 0.5) * 14;
                const rotateX = ((y / rect.height) - 0.5) * -14;
                card.style.transform = `perspective(850px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-6px)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    }

    function initInteractiveScoutCanvas() {
        const targetSection = document.querySelector('.hero-cinematic') || document.querySelector('.page-header');
        if (!targetSection) return;

        const canvas = document.createElement('canvas');
        canvas.className = 'hero-interactive-canvas';
        targetSection.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        let width = 0;
        let height = 0;
        let pointer = { x: -999, y: -999 };

        function resize() {
            width = targetSection.clientWidth;
            height = targetSection.clientHeight;
            canvas.width = width;
            canvas.height = height;
        }
        resize();
        window.addEventListener('resize', resize);

        targetSection.addEventListener('mousemove', (e) => {
            const rect = targetSection.getBoundingClientRect();
            pointer.x = e.clientX - rect.left;
            pointer.y = e.clientY - rect.top;
        }, { passive: true });

        targetSection.addEventListener('mouseleave', () => {
            pointer.x = -999;
            pointer.y = -999;
        });

        const count = 42;
        const particles = Array.from({ length: count }, (_, i) => ({
            x: Math.random() * (width || 1200),
            y: Math.random() * (height || 600),
            vx: (Math.random() - 0.5) * 0.45,
            vy: -Math.random() * 0.55 - 0.15,
            r: Math.random() * 2.2 + 1,
            isCrimson: i % 3 === 0
        }));

        function animateCanvas() {
            ctx.clearRect(0, 0, width, height);

            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                p.x += p.vx;
                p.y += p.vy;

                if (p.y < -10) p.y = height + 10;
                if (p.x < -10) p.x = width + 10;
                if (p.x > width + 10) p.x = -10;

                const dx = pointer.x - p.x;
                const dy = pointer.y - p.y;
                const dist = Math.hypot(dx, dy);
                if (dist < 160) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(pointer.x, pointer.y);
                    ctx.strokeStyle = `rgba(255, 255, 255, ${(1 - dist / 160) * 0.35})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }

                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const d = Math.hypot(p.x - p2.x, p.y - p2.y);
                    if (d < 110) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(255, 255, 255, ${(1 - d / 110) * 0.14})`;
                        ctx.lineWidth = 0.7;
                        ctx.stroke();
                    }
                }

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = p.isCrimson ? 'rgba(255, 90, 95, 0.85)' : 'rgba(255, 255, 255, 0.75)';
                ctx.fill();
            }

            requestAnimationFrame(animateCanvas);
        }
        requestAnimationFrame(animateCanvas);
    }

    function initBaseScoutUI() {
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
            });
            navMenu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    navMenu.classList.remove('active');
                });
            });
        }

        function updateSaturdayCountdown() {
            const el = document.getElementById('nextSaturdayCountdown');
            if (!el) return;
            const now = new Date();
            const target = new Date(now);
            const day = now.getDay();
            const daysUntilSat = (6 - day + 7) % 7;

            target.setDate(now.getDate() + daysUntilSat);
            target.setHours(16, 30, 0, 0);

            if (daysUntilSat === 0 && now > target) {
                const endMeeting = new Date(target);
                endMeeting.setHours(19, 0, 0, 0);
                if (now <= endMeeting) {
                    el.textContent = '¡AHORA MISMO EN LA SEDE!';
                    return;
                }
                target.setDate(target.getDate() + 7);
            }

            const diff = target - now;
            const d = Math.floor(diff / (1000 * 60 * 60 * 24));
            const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const m = Math.floor((diff / (1000 * 60)) % 60);
            el.textContent = `${d}d ${h}h ${m}m`;
        }
        updateSaturdayCountdown();
        setInterval(updateSaturdayCountdown, 30000);

        document.querySelectorAll('.faq-trigger').forEach(btn => {
            btn.addEventListener('click', () => {
                const box = btn.parentElement;
                const isOpen = box.classList.contains('open');
                document.querySelectorAll('.faq-item-box').forEach(item => item.classList.remove('open'));
                if (!isOpen) box.classList.add('open');
            });
        });

        const ageRange = document.getElementById('ageRange');
        const ageOutput = document.getElementById('ageOutput');
        if (ageRange && ageOutput) {
            ageRange.addEventListener('input', (e) => {
                const age = parseInt(e.target.value, 10);
                ageOutput.textContent = age + ' años';
                if (age < 8) window.selectBranch('castores');
                else if (age < 11) window.selectBranch('manada');
                else if (age < 14) window.selectBranch('tropa');
                else if (age < 17) window.selectBranch('esculta');
                else window.selectBranch('clan');
            });
        }

        if (document.getElementById('packItemsGrid')) {
            window.renderPackSimulator();
        }
        if (document.getElementById('cipherInput')) {
            window.updateCipher();
        }

        const contactForm = document.getElementById('contactForm');
        const formSuccess = document.getElementById('formSuccess');
        if (contactForm && formSuccess) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                formSuccess.style.display = 'block';
                contactForm.reset();
                setTimeout(() => {
                    formSuccess.style.display = 'none';
                }, 6000);
            });
        }
    }
})();

/* ==========================================================================
   FUNCIONES GLOBALES: 5 SECCIONES EDUCATIVAS (SECCIONES.HTML)
   ========================================================================== */
const branchesInfo = {
    castores: {
        ageText: '6 a 8 años · 1º y 2º de Primaria',
        ageBg: 'var(--castores-bg)',
        ageColor: 'var(--castores)',
        motto: 'Lema: «Compartir»',
        title: 'Colonia Ohiensis · Castores',
        desc: 'La etapa de iniciación en el escultismo. A través del cuento de «Los Amigos del Bosque», los castores construyen juntos el Gran Dique, aprenden a compartir jugando, hacen manualidades y viven sus primeras salidas y acampadas en la naturaleza con sus scouters (Malak, Keeo, Burbuja, Tic Tac).',
        pillars: [
            '🦫 Marco simbólico: El Bosque y el Estanque',
            '🎨 Juegos cooperativos y creatividad',
            '🤝 Aprender a compartir en la Colonia',
            '🌱 Primer contacto con las acampadas'
        ],
        emoji: '🦫',
        symbolTitle: 'El Estanque y la Colonia',
        shirt: 'Polo / Camisa Azul Celeste · Pañoleta Carmesí y Blanca',
        visualGrad: 'linear-gradient(135deg, #E0F2FE 0%, #BAE6FD 100%)',
        labelColor: '#0369A1',
        ctaText: 'Inscribir en Colonia Ohiensis (Castores)'
    },
    manada: {
        ageText: '8 a 11 años · 3º a 5º de Primaria',
        ageBg: 'var(--manada-bg)',
        ageColor: 'var(--manada)',
        motto: 'Lema: «Haremos lo mejor»',
        title: 'Manada Khanhiwara · Lobatos',
        desc: 'Ambientada en «El Libro de las Tierras Vírgenes» de Rudyard Kipling. Como Mowgli en la Selva de Seeonee, los lobatos viven en Seisenas, aprenden de los Viejos Lobos (Akela, Baloo, Bagheera, Raksha, Hathi y Hermano Gris), desarrollan su autonomía y viven grandes juegos de acecho y naturaleza.',
        pillars: [
            '🐾 Organización en Seisenas',
            '📖 Las Máximas de Baloo y Ley de la Manada',
            '⛺ Acampadas y campamento en tienda',
            '🎒 Cuidado autónomo de su mochila'
        ],
        emoji: '🐺',
        symbolTitle: 'La Selva de Seeonee',
        shirt: 'Camisa Amarilla · Pañoleta Carmesí y Blanca',
        visualGrad: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)',
        labelColor: '#92400E',
        ctaText: 'Inscribir en Manada Khanhiwara (Lobatos)'
    },
    tropa: {
        ageText: '11 a 14 años · 6º Primaria a 2º ESO',
        ageBg: 'var(--tropa-bg)',
        ageColor: 'var(--tropa)',
        motto: 'Lema: «Siempre Listos»',
        title: 'Tropa Lohengrin · Sección Scout',
        desc: 'El corazón de la aventura scout. Los chicos y chicas se organizan en Patrullas con identidad propia, eligen a sus guías, asumen responsabilidades reales, aprenden orientación con mapa y brújula, cabuyería, construcciones de madera y realizan marchas por etapas.',
        pillars: [
            '⚜️ Sistema de Patrullas autónomas',
            '🪢 Pionerismo, nudos y construcciones',
            '🧭 Orientación, topografía y rutas',
            '🔥 Compromiso con la Promesa y Ley Scout'
        ],
        emoji: '⚜️',
        symbolTitle: 'La Aventura en Patrulla',
        shirt: 'Camisa Verde · Pañoleta Carmesí y Blanca',
        visualGrad: 'linear-gradient(135deg, #DCFCE7 0%, #BBF7D0 100%)',
        labelColor: '#166534',
        ctaText: 'Inscribir en Tropa Lohengrin (Scouts)'
    },
    esculta: {
        ageText: '14 a 17 años · 3º-4º ESO y 1º Bachillerato',
        ageBg: 'var(--esculta-bg)',
        ageColor: 'var(--esculta)',
        motto: 'Lema: «Unidad»',
        title: 'Unidad Trea · Escultas / Pioneros',
        desc: 'Jóvenes con iniciativa que diseñan, organizan y financian sus propios proyectos llamados «Empresas». Viven travesías de montaña más exigentes, acciones de voluntariado e implicación activa en el grupo y en su entorno.',
        pillars: [
            '🥾 Creación y autogestión de «Empresas»',
            '🏔️ Rutas de montaña y vivacs',
            '🤝 Cohesión de grupo y espíritu crítico',
            '🌍 Proyectos de impacto y servicio'
        ],
        emoji: '🥾',
        symbolTitle: 'El Reto y La Empresa',
        shirt: 'Camisa Roja · Pañoleta Carmesí y Blanca',
        visualGrad: 'linear-gradient(135deg, #FEE2E2 0%, #FECACA 100%)',
        labelColor: '#991B1B',
        ctaText: 'Inscribir en Unidad Trea (Escultas)'
    },
    clan: {
        ageText: '17 a 21 años · Bachillerato, FP y Universidad',
        ageBg: 'var(--clan-bg)',
        ageColor: 'var(--clan)',
        motto: 'Lema: «Servir»',
        title: 'Clan Ama Dablam · Rovers',
        desc: 'La etapa cumbre del recorrido educativo scout. Los rovers trazan su propio proyecto personal de vida, realizan voluntariado social, rutas autónomas de montaña y se forman en la Escuela de Tiempo Libre para convertirse en futuros scouters del grupo.',
        pillars: [
            '🌿 Servicio activo a la comunidad',
            '🏔️ Grandes travesías y campamentos volantes',
            '🎓 Formación como Monitores de Tiempo Libre',
            '⚖️ Ciudadanía comprometida y libre'
        ],
        emoji: '🌿',
        symbolTitle: 'El Camino y el Servicio',
        shirt: 'Camisa Granate / Verde · Pañoleta Carmesí y Blanca',
        visualGrad: 'linear-gradient(135deg, #F3E8FF 0%, #E9D5FF 100%)',
        labelColor: '#6B21A8',
        ctaText: 'Inscribir en Clan Ama Dablam (Rovers)'
    }
};

window.selectBranch = function (key) {
    const b = branchesInfo[key];
    if (!b) return;

    document.querySelectorAll('.branch-tab-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.branch === key);
    });

    const spAge = document.getElementById('spAge');
    if (!spAge) return;

    spAge.textContent = b.ageText;
    spAge.style.background = b.ageBg;
    spAge.style.color = b.ageColor;

    document.getElementById('spMotto').textContent = b.motto;
    document.getElementById('spTitle').textContent = b.title;
    document.getElementById('spDesc').textContent = b.desc;

    const spPillars = document.getElementById('spPillars');
    spPillars.innerHTML = b.pillars.map(p => `<li>${p}</li>`).join('');

    const spCta = document.getElementById('spCta');
    if (spCta) {
        spCta.innerHTML = `<span>${b.ctaText}</span><span>→</span>`;
    }

    const spVisualBox = document.getElementById('spVisualBox');
    spVisualBox.style.background = b.visualGrad;
    document.getElementById('spBigEmoji').textContent = b.emoji;
    const spSymbolLabel = document.getElementById('spSymbolLabel');
    spSymbolLabel.style.color = b.labelColor;
    document.getElementById('spSymbolTitle').textContent = b.symbolTitle;
    document.getElementById('spShirtInfo').textContent = b.shirt;
};

/* ==========================================================================
   FUNCIONES GLOBALES: SIMULADOR DE MOCHILA + MORSE + NUDOS (CAMPAMENTOS.HTML)
   ========================================================================== */
const packData = {
    sabado: {
        tip: '💡 Consejo Scouter: Para los sábados en Carretera de Rueda basta ropa cómoda que se pueda manchar jugando y tu pañoleta al cuello.',
        items: [
            { id: 's1', title: 'Pañoleta Carmesí y Blanca', zone: 'Al cuello · Identidad' },
            { id: 's2', title: 'Cantimplora con agua', zone: 'Hidratación' },
            { id: 's3', title: 'Ropa cómoda de juego', zone: 'Vestimenta' },
            { id: 's4', title: 'Zapatillas deportivas', zone: 'Calzado' },
            { id: 's5', title: 'Cuaderno de caza / libreta y boli', zone: 'Material de rama' },
            { id: 's6', title: 'Chubasquero ligero (si llueve)', zone: 'Bolsillo exterior' }
        ]
    },
    acampada: {
        tip: '💡 Consejo Scouter: El saco de dormir va siempre abajo del todo, lo pesado pegado a la espalda, y el chubasquero y frontal arriba en la seta.',
        items: [
            { id: 'a1', title: 'Saco de dormir de montaña', zone: 'Fondo de la mochila' },
            { id: 'a2', title: 'Esterilla / Aislante térmico', zone: 'Sujeto sin colgar' },
            { id: 'a3', title: 'Botas de montaña ya domadas', zone: 'Puestas al salir' },
            { id: 'a4', title: 'Linterna frontal con pilas', zone: 'Seta superior' },
            { id: 'a5', title: 'Plato, poto y cubiertos en bolsa', zone: 'Zona media' },
            { id: 'a6', title: 'Cantimplora de 1 litro', zone: 'Bolsillo lateral' },
            { id: 'a7', title: 'Muda completa y calcetines extra', zone: 'En bolsas de tela' },
            { id: 'a8', title: 'Forro polar y chubasquero', zone: 'Acceso rápido' },
            { id: 'a9', title: 'Neceser pequeño y toalla ligera', zone: 'Zona media' },
            { id: 'a10', title: 'Camisa de rama y Pañoleta Acrux', zone: 'Puestas al salir' }
        ]
    },
    verano: {
        tip: '💡 Consejo Scouter: Para los 15 días de julio organiza la ropa por conjuntos en bolsas de tela marcadas con tu nombre y nunca lleves cosas colgando por fuera.',
        items: [
            { id: 'v1', title: 'Mochilón de 50L - 65L ajustado', zone: 'Espalda regulada' },
            { id: 'v2', title: 'Saco de dormir (confort 0ºC - 5ºC)', zone: 'Fondo de la mochila' },
            { id: 'v3', title: 'Esterilla aislante', zone: 'Interior o lateral' },
            { id: 'v4', title: 'Botas de trekking + escarpines río', zone: 'Calzado de ruta y pozas' },
            { id: 'v5', title: 'Mochila pequeña de ataque (marchas)', zone: 'Plegada dentro' },
            { id: 'v6', title: 'Vajilla scout (plato, poto, cubiertos)', zone: 'En bolsa de tela con nombre' },
            { id: 'v7', title: 'Ropa para 15 días enrollada', zone: 'Zona central' },
            { id: 'v8', title: 'Bañador, toalla, gorra y crema solar', zone: 'Días de río y montaña' },
            { id: 'v9', title: 'Neceser con jabón biodegradable', zone: 'Respeto al medio ambiente' },
            { id: 'v10', title: 'Linterna frontal + pilas de repuesto', zone: 'Seta superior' },
            { id: 'v11', title: 'Tarjeta sanitaria y autorización', zone: 'Entregar a su Scouter' },
            { id: 'v12', title: 'Uniforme completo (Camisa y Pañoleta)', zone: 'Para izadas y ceremonias' }
        ]
    }
};

let currentPackMode = 'acampada';
const checkedPackIds = new Set();

window.setPackMode = function (mode, btn) {
    currentPackMode = mode;
    checkedPackIds.clear();
    document.querySelectorAll('.pack-mode-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    window.renderPackSimulator();
};

window.togglePackItem = function (id) {
    if (checkedPackIds.has(id)) checkedPackIds.delete(id);
    else checkedPackIds.add(id);
    window.renderPackSimulator();
};

window.renderPackSimulator = function () {
    const modeObj = packData[currentPackMode];
    if (!modeObj) return;
    const grid = document.getElementById('packItemsGrid');
    const tipBox = document.getElementById('packTipBox');
    if (tipBox) tipBox.innerHTML = modeObj.tip;

    if (grid) {
        grid.innerHTML = modeObj.items.map(item => {
            const isChecked = checkedPackIds.has(item.id);
            return `
                <div class="pack-item-card ${isChecked ? 'checked' : ''}" onclick="togglePackItem('${item.id}')">
                    <div class="pack-check-box">${isChecked ? '✓' : ''}</div>
                    <div>
                        <span class="pack-item-title">${item.title}</span>
                        <span class="pack-item-zone">${item.zone}</span>
                    </div>
                </div>
            `;
        }).join('');
    }

    const total = modeObj.items.length;
    const done = checkedPackIds.size;
    const pct = total ? Math.round((done / total) * 100) : 0;

    const pctEl = document.getElementById('packPctText');
    const barEl = document.getElementById('packBarFill');
    const ring = document.getElementById('packRing');
    const title = document.getElementById('packStatusTitle');
    const sub = document.getElementById('packStatusSub');

    if (!pctEl || !barEl || !ring || !title || !sub) return;

    pctEl.textContent = pct + '%';
    barEl.style.width = pct + '%';

    if (pct === 0) {
        ring.style.borderColor = 'var(--wood-border)';
        title.textContent = 'Mochila vacía';
        sub.textContent = 'Pulsa cada objeto para meterlo en la mochila.';
    } else if (pct < 100) {
        ring.style.borderColor = '#F59E0B';
        title.textContent = `Empacando (${done}/${total})`;
        sub.textContent = '¡Sigue así, ya queda menos para estar listo!';
    } else {
        ring.style.borderColor = '#16A34A';
        title.textContent = '⚜️ ¡Siempre Listos!';
        sub.textContent = 'Mochila 100% completa y equilibrada para salir.';
    }
};

const morseMap = {
    'A': '·−', 'B': '−···', 'C': '−·−·', 'D': '−··', 'E': '·', 'F': '··−·',
    'G': '−−·', 'H': '····', 'I': '··', 'J': '·−−−', 'K': '−·−', 'L': '·−··',
    'M': '−−', 'N': '−·', 'O': '−−−', 'P': '·−−·', 'Q': '−−·−', 'R': '·−·',
    'S': '···', 'T': '−', 'U': '··−', 'V': '···−', 'W': '·−−', 'X': '−··−',
    'Y': '−·−−', 'Z': '−−··', '0': '−−−−−', '1': '·−−−−', '2': '··−−−',
    '3': '···−−', '4': '····−', '5': '·····', '6': '−····', '7': '−−···',
    '8': '−−−··', '9': '−−−−·'
};
const murcielagoMap = {
    'M': '0', 'U': '1', 'R': '2', 'C': '3', 'I': '4',
    'E': '5', 'L': '6', 'A': '7', 'G': '8', 'O': '9'
};

window.updateCipher = function () {
    const inputEl = document.getElementById('cipherInput');
    if (!inputEl) return;
    const raw = (inputEl.value || '').toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const morseArr = [];
    let murcStr = '';

    for (const ch of raw) {
        if (ch === ' ') {
            morseArr.push('/');
            murcStr += ' ';
        } else {
            if (morseMap[ch]) morseArr.push(morseMap[ch]);
            murcStr += (murcielagoMap[ch] !== undefined ? murcielagoMap[ch] : ch);
        }
    }
    const mOut = document.getElementById('morseOutput');
    const cOut = document.getElementById('murcielagoOutput');
    if (mOut) mOut.textContent = morseArr.join('  ') || '···';
    if (cOut) cOut.textContent = murcStr || '---';
};

let whistleCtx = null;
window.playMorseWhistle = function () {
    const mOut = document.getElementById('morseOutput');
    if (!mOut) return;
    const morseStr = mOut.textContent;
    try {
        if (!whistleCtx) whistleCtx = new (window.AudioContext || window.webkitAudioContext)();
        if (whistleCtx.state === 'suspended') whistleCtx.resume();

        let t = whistleCtx.currentTime + 0.05;
        const dotDur = 0.09;
        for (const sym of morseStr) {
            if (sym === '·' || sym === '−') {
                const dur = sym === '·' ? dotDur : dotDur * 3;
                const osc = whistleCtx.createOscillator();
                const gain = whistleCtx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(2650, t);
                gain.gain.setValueAtTime(0.001, t);
                gain.gain.exponentialRampToValueAtTime(0.15, t + 0.01);
                gain.gain.setValueAtTime(0.15, t + dur - 0.01);
                gain.gain.exponentialRampToValueAtTime(0.001, t + dur);
                osc.connect(gain);
                gain.connect(whistleCtx.destination);
                osc.start(t);
                osc.stop(t + dur);
                t += dur + 0.06;
            } else if (sym === ' ') {
                t += 0.08;
            } else if (sym === '/') {
                t += 0.2;
            }
        }
    } catch (e) {
        console.log(e);
    }
};

const knotsInfo = {
    rizo: {
        title: 'Nudo Rizo o Llano · El Nudo de la Hermandad',
        diff: 'Nivel: Básico',
        desc: 'Sirve para unir dos cabos del mismo grosor que no vayan a soportar gran tensión. Es el nudo más simbólico del escultismo: representa la unión mundial de los scouts y se utiliza en vendajes de primeros auxilios porque queda plano y no molesta.',
        formula: 'Regla: «Derecha sobre izquierda, e izquierda sobre derecha».'
    },
    ballestrinque: {
        title: 'Ballestrinque · El inicio de toda construcción',
        diff: 'Nivel: Pionerismo',
        desc: 'Es el nudo rey de los campamentos para iniciar y terminar amarres cuadrados y diagonales sobre troncos de madera (mesas de patrulla, portadas, mochileros y trípodes). Aguanta muy bien la tensión constante sobre el palo.',
        formula: 'Regla: «Dos vueltas cruzadas abrazando el tronco y el cabo pasa por el centro».'
    },
    asdeguia: {
        title: 'As de Guía · El nudo de rescate que no se corre',
        diff: 'Nivel: Esencial',
        desc: 'Forma una gaza fija al final de una cuerda que jamás se aprieta ni se desliza por mucho peso que soporte, y además es muy fácil de deshacer después. Imprescindible en salvamento, montaña y aseguramiento.',
        formula: 'Regla clásica: «La serpiente sale del lago, rodea el árbol y vuelve a entrar en el lago».'
    },
    ocho: {
        title: 'Nudo en Ocho (Lasca) · El nudo de tope y montaña',
        diff: 'Nivel: Montaña',
        desc: 'Se realiza en el extremo de una cuerda para evitar que se escape por una polea o anilla, y en su versión doble es el nudo estándar de encordamiento en escalada y alpinismo por su altísima resistencia.',
        formula: 'Regla: «Bucle sencillo, rodeo completo por detrás y paso por el ojo superior».'
    }
};

window.showKnot = function (key, btn) {
    const k = knotsInfo[key];
    if (!k) return;
    document.querySelectorAll('.knot-pill-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    document.getElementById('knotTitle').textContent = k.title;
    document.getElementById('knotDifficulty').textContent = k.diff;
    document.getElementById('knotDesc').textContent = k.desc;
    document.getElementById('knotFormula').textContent = k.formula;
};


/* ==========================================================================
   MOTOR DEL MAPA ESTELAR GLOBAL INTERACTIVO · GRUPO SCOUT ACRUX 518
   - Estética minimalista monocromática: Blanco puro (#FFFFFF) y Rojo sutil (#D9383A)
   - Sector I: Constelación real y exacta de la Cruz del Sur (Crux)
   - Sector II: Constelación en Línea Recta Ascendente de las 5 Unidades
                (Cada estrella es una Unidad; clic = Super-Zoom hacia la estrella
                que abre su Nueva Tab completa con información y sus Kraaletes)
   - Sector III: Constelación Conectada de Campamentos
                 (Cada estrella es un Campamento; clic = Super-Zoom hacia la estrella
                 que abre su Nueva Tab con recuerdos, hitos y galería fotográfica)
   - Sector IV: Objetos Perdidos (Agencia Espacial de Rescate de Mochilas)
   - Sector V: Bases y Contacto (Bases operativas en Valladolid y contacto directo)
   ========================================================================== */
(function initAcruxGlobalStarMapEngine() {
    const canvas = document.getElementById('cosmosCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    document.getElementById('acruxTransitionCurtain')?.remove();
    document.getElementById('scrollProgressRope')?.remove();

    const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
    const lerp = (a, b, t) => a + (b - a) * t;
    const smoothstep = (e0, e1, x) => {
        const t = clamp((x - e0) / (e1 - e0), 0, 1);
        return t * t * (3 - 2 * t);
    };

    // =========================================================================
    // 1. LAS 5 UNIDADES EN CONSTELACIÓN DE LÍNEA RECTA + SUS KRAALETES
    // =========================================================================
    const UNITS_ORIGIN_X = 1680;
    const UNITS_ORIGIN_Y = -420;

    const UNITS_DATA = [
        {
            id: 'castores',
            index: 0,
            starSymbol: 'α Castores',
            shortName: '1 · Castores',
            fullName: 'Castores · Colonia Ohiensis',
            constellationTitle: 'ESTRELLA I · «LA VIDA EN EL ESTANQUE»',
            age: '6 a 8 años (1º y 2º de Primaria)',
            motto: 'Lema: «Compartir»',
            accentColor: '#38BDF8',
            glowColor: 'rgba(56, 189, 248, 0.12)',
            ringColor: 'rgba(56, 189, 248, 0.38)',
            hoverRingColor: 'rgba(56, 189, 248, 0.68)',
            dx: -240,
            dy: 160,
            r: 7.2,
            lead: 'Nuestra Colonia Ohiensis está ambientada en el libro «La Vida en el Estanque». Junto a Kid, Moi y Piko, los pequeños castores viven en su acogedora madriguera de palitos, barro y virutas, trabajan en equipo manteniendo la Presa sobre el río «Gran Hermano» y aprenden con los Grandes Castores, el sabio búho Malak y la Familia Jones que en la Colonia todo se comparte.',
            lawQuote: '«El castor que es obediente, trabajador, limpio y ordenado, que participa en todo, que juega con todos y comparte con alegría, llega a ser un castor alegre y feliz recordando siempre las enseñanzas de la Colonia.» — La Vida en el Estanque',
            storyTitle: '«La Vida en el Estanque» · Capítulos e Imaginario de la Colonia',
            storySub: 'Del nacimiento de Kid y el rayo de Keeo el Castor Plateado hasta el Nado Hacia Arriba',
            heroSvg: `
                <svg viewBox="0 0 560 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ilustración de La Vida en el Estanque">
                    <defs>
                        <linearGradient id="skyCastores" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stop-color="#0284C7"/>
                            <stop offset="55%" stop-color="#38BDF8"/>
                            <stop offset="100%" stop-color="#BAE6FD"/>
                        </linearGradient>
                        <linearGradient id="pondWater" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stop-color="#0369A1"/>
                            <stop offset="100%" stop-color="#082F49"/>
                        </linearGradient>
                        <linearGradient id="rainbowArc" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stop-color="#EF4444" stop-opacity="0.7"/>
                            <stop offset="33%" stop-color="#FBBF24" stop-opacity="0.7"/>
                            <stop offset="66%" stop-color="#34D399" stop-opacity="0.7"/>
                            <stop offset="100%" stop-color="#38BDF8" stop-opacity="0.7"/>
                        </linearGradient>
                    </defs>
                    <!-- Cielo azul intenso y Arco Iris de Keeo -->
                    <rect width="560" height="205" fill="url(#skyCastores)"/>
                    <path d="M 40 190 Q 280 -20 520 190" fill="none" stroke="url(#rainbowArc)" stroke-width="14" stroke-linecap="round"/>
                    <!-- Sol radiante como en la portada de La Vida en el Estanque -->
                    <circle cx="95" cy="58" r="24" fill="#FDE047"/>
                    <circle cx="95" cy="58" r="34" fill="#FDE047" opacity="0.32"/>
                    <!-- Viejas montañas nevadas al fondo -->
                    <polygon points="0,185 95,88 195,185" fill="#1E3A5F"/>
                    <polygon points="95,88 68,125 122,125" fill="#F8FAFC"/>
                    <polygon points="150,185 265,72 385,185" fill="#152C4A"/>
                    <polygon points="265,72 232,116 298,116" fill="#F8FAFC"/>
                    <!-- Bosque de robles, sauces, álamos temblones y abedules -->
                    <polygon points="35,185 60,115 85,185" fill="#15803D"/>
                    <polygon points="75,185 102,105 130,185" fill="#166534"/>
                    <polygon points="390,185 422,95 455,185" fill="#166534"/>
                    <polygon points="440,185 470,108 500,185" fill="#15803D"/>
                    <!-- El Gran Roble y Malak el Búho Sabio en la rama -->
                    <rect x="488" y="95" width="22" height="92" fill="#5C3A21"/>
                    <circle cx="498" cy="78" r="46" fill="#14532D"/>
                    <ellipse cx="478" cy="96" rx="9" ry="12" fill="#78350F"/>
                    <circle cx="475" cy="93" r="2.5" fill="#F59E0B"/>
                    <circle cx="481" cy="93" r="2.5" fill="#F59E0B"/>
                    <!-- El Estanque y el Río Gran Hermano -->
                    <rect y="182" width="560" height="138" fill="url(#pondWater)"/>
                    <!-- La Madriguera de palitos, barro y virutas -->
                    <path d="M 105 225 Q 155 162 205 225 Z" fill="#78350F" stroke="#B45309" stroke-width="3"/>
                    <line x1="120" y1="215" x2="190" y2="195" stroke="#D97706" stroke-width="3"/>
                    <line x1="130" y1="195" x2="185" y2="218" stroke="#F59E0B" stroke-width="2.5"/>
                    <!-- El viejo tronco central con Keeo el Castor Plateado -->
                    <ellipse cx="295" cy="225" rx="34" ry="10" fill="#6B4423"/>
                    <ellipse cx="295" cy="208" rx="14" ry="16" fill="#E2E8F0" stroke="#94A3B8" stroke-width="2"/>
                    <circle cx="295" cy="192" r="10" fill="#F1F5F9"/>
                    <ellipse cx="314" cy="215" rx="11" ry="5" fill="#94A3B8"/>
                    <!-- Kid chapoteando en el agua: ¡Splash, Splash, Splash! -->
                    <circle cx="405" cy="252" r="11" fill="#92400E"/>
                    <ellipse cx="422" cy="257" rx="12" ry="5" fill="#78350F"/>
                    <path d="M 382 248 Q 372 232 364 242 M 436 246 Q 446 230 454 240" stroke="#E0F2FE" stroke-width="2.5" fill="none"/>
                    <!-- La Presa (Dique) de orilla a orilla -->
                    <rect x="20" y="286" width="520" height="14" rx="7" fill="#78350F" stroke="#D97706" stroke-width="2"/>
                    <text x="24" y="34" fill="#FFFFFF" font-family="JetBrains Mono, monospace" font-size="11" font-weight="600">✦ EL ESTANQUE DEL GRAN ROBLE · «SPLASH, SPLASH, SPLASH»</text>
                </svg>
            `,
            scenes: [
                {
                    tag: 'CAPÍTULOS 1º Y 3º · EL BOSQUE Y EL ESTANQUE',
                    title: 'Kid, la Madriguera, la Presa y el Río «Gran Hermano»',
                    desc: 'Kid nace sobre la alfombra de virutas de madera y descubre el estanque rodeado de robles, sauces y abedules. Con Lekes, Kibu y Rasty aprende qué es la Presa, conoce al río «Gran Hermano» y aprende con Arco Iris a partir la rama en dos para COMPARTIR.',
                    svg: `
                        <svg viewBox="0 0 360 180" xmlns="http://www.w3.org/2000/svg">
                            <rect width="360" height="180" fill="#072F49"/>
                            <rect width="360" height="105" fill="#0284C7"/>
                            <circle cx="62" cy="40" r="18" fill="#FDE047"/>
                            <polygon points="0,105 65,48 130,105" fill="#15803D"/>
                            <polygon points="230,105 295,42 360,105" fill="#166534"/>
                            <path d="M 65 138 Q 115 88 165 138 Z" fill="#78350F" stroke="#F59E0B" stroke-width="2.5"/>
                            <rect x="185" y="128" width="145" height="12" rx="6" fill="#92400E" stroke="#FBBF24" stroke-width="1.5"/>
                            <circle cx="245" cy="152" r="10" fill="#B45309"/>
                            <ellipse cx="260" cy="156" rx="10" ry="4" fill="#78350F"/>
                            <text x="14" y="168" fill="#BAE6FD" font-family="JetBrains Mono, monospace" font-size="10">Madriguera de virutas · La Presa · El Gran Hermano</text>
                        </svg>
                    `
                },
                {
                    tag: 'CAPÍTULO 2º · EL GRAN INCENDIO',
                    title: 'El Búho Malak («¡Uhú, Uhú!») y la Familia Jones',
                    desc: 'Malak, el búho sabio que habla todas las lenguas cuando salen las estrellas, avisa del Gran Incendio. Los castores abren la presa y la Familia Jones (Ojo de Halcón, Arco Iris, Burbuja y Pelirrojo) cava cortafuegos. Como recompensa por trabajar juntos, aquel día les crecieron las paletas.',
                    svg: `
                        <svg viewBox="0 0 360 180" xmlns="http://www.w3.org/2000/svg">
                            <rect width="360" height="180" fill="#090D16"/>
                            <circle cx="52" cy="36" r="14" fill="#F8FAFC" opacity="0.9"/>
                            <path d="M 190 115 Q 235 45 275 115 Q 310 55 345 115 Z" fill="#EA580C" opacity="0.75"/>
                            <path d="M 215 115 Q 250 65 285 115 Z" fill="#FDE047" opacity="0.85"/>
                            <rect x="85" y="45" width="18" height="90" fill="#451A03"/>
                            <circle cx="94" cy="42" r="32" fill="#14532D"/>
                            <ellipse cx="94" cy="56" rx="10" ry="13" fill="#92400E"/>
                            <circle cx="90" cy="53" r="3" fill="#FBBF24"/>
                            <circle cx="98" cy="53" r="3" fill="#FBBF24"/>
                            <rect y="115" width="360" height="65" fill="#0369A1"/>
                            <path d="M 25 140 Q 120 120 220 142 T 350 135" stroke="#7DD3FC" stroke-width="4" fill="none"/>
                            <text x="14" y="168" fill="#FDE047" font-family="JetBrains Mono, monospace" font-size="10">¡¡Uhú, Uhú!! · Malak y la Familia Jones salvan el bosque</text>
                        </svg>
                    `
                },
                {
                    tag: 'CAPÍTULOS 4º Y 5º · EL CASTOR PLATEADO Y NILA',
                    title: 'El Rayo de Keeo y la Salud del Gran Hermano',
                    desc: 'Bajo la lluvia mágica y el Arco Iris, un relámpago sobre el viejo tronco del Gran Roble vuelve plateado a Keeo y le otorga el don de hablar con todos los animales y humanos. Además, la valiente castora Nila y el búho Kalú enseñan a cuidar y mantener limpias las aguas del Gran Hermano.',
                    svg: `
                        <svg viewBox="0 0 360 180" xmlns="http://www.w3.org/2000/svg">
                            <rect width="360" height="180" fill="#0B192C"/>
                            <path d="M 20 140 Q 180 10 340 140" fill="none" stroke="#38BDF8" stroke-width="8" opacity="0.65"/>
                            <path d="M 30 140 Q 180 24 330 140" fill="none" stroke="#FBBF24" stroke-width="6" opacity="0.65"/>
                            <polygon points="185,8 162,62 186,62 168,112 208,52 182,52" fill="#FDE047"/>
                            <rect y="122" width="360" height="58" fill="#0284C7"/>
                            <ellipse cx="180" cy="128" rx="36" ry="9" fill="#5C3A21"/>
                            <ellipse cx="180" cy="110" rx="14" ry="17" fill="#F8FAFC" stroke="#38BDF8" stroke-width="2"/>
                            <circle cx="180" cy="92" r="10" fill="#FFFFFF"/>
                            <text x="14" y="168" fill="#FFFFFF" font-family="JetBrains Mono, monospace" font-size="10">Keeo «El Castor Plateado» · El don de todas las lenguas</text>
                        </svg>
                    `
                },
                {
                    tag: 'CAPÍTULOS 6º, 7º Y 8º · NADO HACIA ARRIBA',
                    title: 'Kapi, las Ardillas Tic y Tac y el Paso a la Manada',
                    desc: 'Kapi aprende en la tormenta por qué nunca construimos solos, las ardillas rojas Tic y Tac aprenden a compartir sus frutos, y en la ceremonia del remolino de lluvia plateada junto a Keeo, Kid, Moi y Piko nadan río arriba por el Gran Hermano hasta el Waigunga, donde Akela les recibe en la Manada.',
                    img: 'images/DSC_066412.jpg'
                }
            ],
            pillars: [
                { title: '1 · Castor sin Paletas (Llegada al Estanque)', desc: 'Como Kid al salir de la madriguera: descubre la Colonia, aprende la llamada «¡Splash, Splash, Splash!» y hace sus primeros amigos.' },
                { title: '2 · Castor con Paletas (Como en el Gran Incendio)', desc: 'Tras aprender a ayudar y compartir el trabajo en la presa junto a los Grandes Castores y la Familia Jones, al castor le crecen las paletas.' },
                { title: '3 · Castor Plateado y «Nado Hacia Arriba»', desc: 'Siguiendo el ejemplo de Keeo, comparte siempre con alegría y se prepara en el remolino del Gran Roble para nadar río arriba hacia el río Waigunga y la Manada.' }
            ],
            kraalTitle: 'Personajes y Kraaletes de la Colonia Ohiensis',
            kraalSub: 'Los Grandes Castores, el Búho Malak y la Familia Jones («La Vida en el Estanque»)',
            kraaletes: [
                { star: '★ Castor Plateado', name: 'Keeo', role: 'El Castor Plateado · Habla todas las lenguas del bosque y convoca a la Colonia con tres coletazos: «Splash, Splash, Splash»' },
                { star: '★ El Búho Sabio', name: 'Malak', role: 'Vigila de noche desde lo alto del Gran Roble con su «¡¡Uhú, Uhú!!» y cuenta las historias que enseñan La Vida en el Estanque' },
                { star: '★ Grandes Castores', name: 'Lekes, Kibu y Rasty', role: 'Guías del Estanque · Maestros en construir la presa, roer los troncos y enseñar a nadar («en boca cerrada no entran peces»)' },
                { star: '★ Familia Jones', name: 'Ojo de Halcón y Arco Iris', role: 'Los padres amigos del bosque · Aportan los leños de la presa y enseñan a partir la rama en dos para COMPARTIR siempre' },
                { star: '★ Familia Jones', name: 'Burbuja y Pelirrojo', role: 'Los hermanos amigos del agua · Juegan, chapotean y enseñan a nadar a Kid, Moi y Piko en el centro del estanque' },
                { star: '★ Amigos del Bosque', name: 'Tic, Tac, Nila y Kalú', role: 'Las dos ágiles ardillas rojas que aprendieron a compartir, la valiente castora Nila y el anciano búho sabio Kalú' }
            ]
        },
        {
            id: 'manada',
            index: 1,
            starSymbol: 'β Manada',
            shortName: '2 · Manada',
            fullName: 'Manada · Khanhiwara',
            constellationTitle: 'ESTRELLA II · SELVA DE SEEONEE Y RÍO WAIGUNGA',
            age: '8 a 11 años (3º, 4º y 5º de Primaria)',
            motto: 'Lema: «Haremos lo mejor»',
            accentColor: '#FBBF24',
            glowColor: 'rgba(251, 191, 36, 0.12)',
            ringColor: 'rgba(251, 191, 36, 0.38)',
            hoverRingColor: 'rgba(251, 191, 36, 0.68)',
            dx: -120,
            dy: 80,
            r: 7.2,
            lead: 'Al terminar el «Nado Hacia Arriba» por el Gran Hermano, los castores llegan al río Waigunga en la Selva de Seeonee («El Libro de las Tierras Vírgenes» de Rudyard Kipling). Allí Akela, Baloo, Bagheera y los Viejos Lobos los acogen con el Gran Clamor en la Manada Khanhiwara.',
            lawQuote: '«El Lobato escucha y obedece al Viejo Lobo. El Lobato se vence a sí mismo.» — Ley de la Manada de Seeonee',
            storyTitle: 'La Selva de Seeonee · El Mundo de Mowgli y los Viejos Lobos',
            storySub: 'Cacerías por la selva, la Roca del Consejo bajo la luna llena y la vida en Seisenas',
            heroSvg: `
                <svg viewBox="0 0 560 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ilustración de la Roca del Consejo en la Selva de Seeonee">
                    <defs>
                        <linearGradient id="skyManada" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stop-color="#1E1B4B"/>
                            <stop offset="55%" stop-color="#78350F"/>
                            <stop offset="100%" stop-color="#F59E0B"/>
                        </linearGradient>
                    </defs>
                    <rect width="560" height="320" fill="url(#skyManada)"/>
                    <circle cx="430" cy="82" r="46" fill="#FEF08A"/>
                    <circle cx="430" cy="82" r="64" fill="#FDE047" opacity="0.24"/>
                    <polygon points="40,320 185,128 335,320" fill="#451A03"/>
                    <polygon points="155,320 285,112 435,320" fill="#78350F"/>
                    <!-- Silueta de Akela en la Roca del Consejo -->
                    <polygon points="272,112 296,112 290,86 278,86" fill="#090D16"/>
                    <polygon points="25,320 65,175 105,320" fill="#064E3B"/>
                    <polygon points="455,320 498,165 542,320" fill="#064E3B"/>
                    <path d="M 0 285 Q 280 255 560 295 L 560 320 L 0 320 Z" fill="#022C22"/>
                    <text x="24" y="34" fill="#FEF08A" font-family="JetBrains Mono, monospace" font-size="11" font-weight="600">✦ LA ROCA DEL CONSEJO · SELVA DE SEEONEE</text>
                </svg>
            `,
            scenes: [
                {
                    tag: 'DEL ESTANQUE A LA SELVA',
                    title: 'La Llegada por el Río Waigunga y el Gran Clamor',
                    desc: 'Cuando los pequeños castores culminan su Nado Hacia Arriba llegan al río Waigunga, donde Akela, Baloo, Bagheera y Kaa les dan la bienvenida a la Manada Khanhiwara.',
                    img: 'images/DSC_058812.jpg'
                },
                {
                    tag: 'ASAMBLEA DE LUNA LLENA',
                    title: 'La Roca del Consejo y las Seisenas',
                    desc: 'Organizados en Seisenas de seis lobatos, nos reunimos en círculo en torno a la Roca del Consejo para evaluar nuestras cacerías y celebrar las Promesas.',
                    img: 'images/DSC_059812.jpg'
                },
                {
                    tag: 'SABIDURÍA DE BALOO',
                    title: 'Las Máximas de la Selva',
                    desc: 'El Lobato piensa primero en los demás, tiene siempre los ojos y los oídos bien abiertos, es alegre, limpio y dice siempre la verdad.',
                    img: 'images/DSC_064012.jpg'
                },
                {
                    tag: 'LA SENDA DE MOWGLI',
                    title: 'Las 4 Etapas del Lobato en Khanhiwara',
                    desc: 'Huella Tierna, Lobo Saltador, Lobo Rastreador y Lobo Cazador: el camino de progresión antes de cruzar hacia la Tropa.',
                    img: 'images/DSC_04051.jpg'
                }
            ],
            pillars: [
                { title: 'La Selva de Seeonee y la Roca del Consejo', desc: 'Espacio de asamblea donde la Manada valora sus cazas, celebra promesas y aprende a escucharse.' },
                { title: 'La Senda de Mowgli (Progresión)', desc: 'Cuatro etapas de crecimiento: Huella Tierna, Lobo Saltador, Lobo Rastreador y Lobo Cazador.' },
                { title: 'Vida en Seisenas', desc: 'Pequeños grupos de seis lobatos donde los mayores acompañan y enseñan con el ejemplo a los más jóvenes.' }
            ],
            kraalTitle: 'Kraal de la Manada Khanhiwara',
            kraalSub: 'Los Viejos Lobos de Seeonee (Kraaletes de Manada)',
            kraaletes: [
                { star: '★ I · Seeonee', name: 'Akela', role: 'Viejo Lobo Jefe · Guía desde la Roca del Consejo y coordinación de la Manada' },
                { star: '★ II · Seeonee', name: 'Baloo', role: 'El Oso Pardo · Maestro de la Ley de la Manada y las Máximas de la Selva' },
                { star: '★ III · Seeonee', name: 'Bagheera', role: 'La Pantera Negra · Destreza, agilidad, observación y cacerías en el bosque' },
                { star: '★ IV · Seeonee', name: 'Raksha', role: 'La Loba Madre · Acogida, ternura, cuidado y protección de cada lobezno' },
                { star: '★ V · Seeonee', name: 'Kaa y Hathi', role: 'La Pitón de Roca y el Elefante Sabio · Astucia, orden e historias de la selva' },
                { star: '★ VI · Seeonee', name: 'Hermano Gris', role: 'Compañero fiel de Mowgli · Hermandad, lealtad y juegos en equipo' }
            ]
        },
        {
            id: 'tropa',
            index: 2,
            starSymbol: 'γ Tropa (Lohengrin)',
            shortName: '3 · Tropa (Lohengrin)',
            fullName: 'Tropa · Lohengrin',
            constellationTitle: 'ESTRELLA III · TROPA LOHENGRIN',
            age: '11 a 14 años (6º Primaria, 1º y 2º de ESO)',
            motto: 'Lema: «Siempre Listos»',
            accentColor: '#34D399',
            glowColor: 'rgba(52, 211, 153, 0.12)',
            ringColor: 'rgba(52, 211, 153, 0.38)',
            hoverRingColor: 'rgba(52, 211, 153, 0.68)',
            dx: 0,
            dy: 0,
            r: 7.4,
            lead: 'El corazón de la aventura scout y la vida en patrulla. En la Tropa Lohengrin los jóvenes viven el espíritu de caballería y exploración: se organizan en Patrullas autónomas con cargos reales, levantan sus construcciones de pionerismo en madera y sisal, y diseñan sus propias aventuras (Aymaras).',
            lawQuote: '«Cifra su honor en ser digno de confianza, es leal, útil, amigo de todos y hermano de cualquier otro scout.» — Ley Scout',
            storyTitle: 'Tropa Lohengrin · Pionerismo, Patrullas y Exploración',
            storySub: 'Aventura en la naturaleza, orientación con brújula y autonomía en Patrulla',
            heroSvg: `
                <svg viewBox="0 0 560 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ilustración de la Tropa Lohengrin">
                    <defs>
                        <linearGradient id="skyTropa" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stop-color="#022C22"/>
                            <stop offset="60%" stop-color="#065F46"/>
                            <stop offset="100%" stop-color="#10B981"/>
                        </linearGradient>
                    </defs>
                    <rect width="560" height="320" fill="url(#skyTropa)"/>
                    <polygon points="0,280 140,95 290,280" fill="#064E3B"/>
                    <polygon points="240,280 410,80 560,280" fill="#047857"/>
                    <!-- Tienda de Patrulla y Trípode de Pionerismo -->
                    <polygon points="150,275 235,165 320,275" fill="#D97706" stroke="#FEF08A" stroke-width="2.5"/>
                    <polygon points="210,275 235,165 260,275" fill="#92400E"/>
                    <line x1="380" y1="275" x2="425" y2="150" stroke="#FDE68A" stroke-width="4"/>
                    <line x1="460" y1="275" x2="415" y2="150" stroke="#FDE68A" stroke-width="4"/>
                    <line x1="420" y1="275" x2="420" y2="145" stroke="#F59E0B" stroke-width="4"/>
                    <rect y="272" width="560" height="48" fill="#022C22"/>
                    <text x="24" y="34" fill="#A7F3D0" font-family="JetBrains Mono, monospace" font-size="11" font-weight="600">✦ TROPA LOHENGRIN · SISTEMA DE PATRULLAS Y PIONERISMO</text>
                </svg>
            `,
            scenes: [
                {
                    tag: 'VIDA EN PATRULLA',
                    title: 'Autonomía Real y Espíritu de Patrulla',
                    desc: 'Cada tropero asume un cargo indispensable (Guía, Subguía, Intendente, Sanitario, Guardián de Leyenda) para que la Patrulla funcione en equipo.',
                    img: 'images/DSC_064012.jpg'
                },
                {
                    tag: 'INGENIERÍA SCOUT',
                    title: 'Pionerismo en Madera y Cuerda',
                    desc: 'Amarres cuadrados y diagonales, mesas de patrulla, mochileros y portadas levantadas por los propios troperos en el campamento de verano.',
                    img: 'images/DSC_066412.jpg'
                },
                {
                    tag: 'EXPLORACIÓN Y TOPOGRAFÍA',
                    title: 'Raids con Mapa y Brújula',
                    desc: 'Marchas por etapas leyendo curvas de nivel, orientándose en montaña y cocinando por patrullas.',
                    img: 'images/DSC_3166.jpg'
                },
                {
                    tag: 'PROYECTOS DE TROPA',
                    title: 'Las Aymaras y la Corte de Honor',
                    desc: 'Aventuras trimestrales ideadas, votadas y preparadas por los propios chicos y chicas de la Tropa.',
                    img: 'images/DSC_04051.jpg'
                }
            ],
            pillars: [
                { title: 'El Sistema de Patrullas y Cargos Reales', desc: 'Autonomía auténtica en acampada, toma de decisiones en Consejo de Patrulla y responsabilidad compartida.' },
                { title: 'Las Aymaras y la Corte de Honor', desc: 'Aventuras y proyectos trimestrales ideados, votados y construidos por los propios troperos.' },
                { title: 'Técnica Scout y Pionerismo', desc: 'Orientación con brújula y mapa topográfico, nudos y amarres, cocina de campo y raids de patrulla.' }
            ],
            kraalTitle: 'Kraal de la Tropa Lohengrin',
            kraalSub: 'Scouters de Tropa (Kraaletes de Lohengrin)',
            kraaletes: [
                { star: '★ I · Lohengrin', name: 'Coordinación de Tropa', role: 'Acompañamiento de Guías de Patrulla y presidencia de la Corte de Honor' },
                { star: '★ II · Lohengrin', name: 'Scouter de Pionerismo', role: 'Construcciones en madera, amarres, intendencia y seguridad en acampada' },
                { star: '★ III · Lohengrin', name: 'Scouter de Exploración', role: 'Topografía, brújula, rutas de montaña y grandes juegos estratégicos' },
                { star: '★ IV · Lohengrin', name: 'Guardián de Leyenda', role: 'Ambientación de Lohengrin, veladas, canciones y ceremonias de promesa' }
            ]
        },
        {
            id: 'escultas',
            index: 3,
            starSymbol: 'δ Escultas (Trea)',
            shortName: '4 · Unidad Esculta (Trea)',
            fullName: 'Unidad Esculta · Trea',
            constellationTitle: 'ESTRELLA IV · UNIDAD ESCULTA TREA',
            age: '14 a 17 años (3º, 4º de ESO y 1º de Bachillerato)',
            motto: 'Lema: «Unidad»',
            accentColor: '#A67B5B',
            glowColor: 'rgba(166, 123, 91, 0.12)',
            ringColor: 'rgba(166, 123, 91, 0.38)',
            hoverRingColor: 'rgba(166, 123, 91, 0.68)',
            dx: 120,
            dy: -80,
            r: 7.2,
            lead: 'Nombrada en honor a la imponente Canal de Trea en los Picos de Europa. En la Unidad Esculta los adolescentes son los verdaderos protagonistas: trabajan mediante «Empresas Escultas» autogestionadas, afrontan travesías de alta montaña, vivacs bajo las estrellas y retos de superación.',
            lawQuote: '«No hay senda demasiado empinada cuando toda la Unidad camina al mismo paso hacia la cumbre.» — Espíritu de la Canal de Trea',
            storyTitle: 'Unidad Esculta Trea · Empresas, Cumbres y Vivac',
            storySub: 'Autogestión juvenil, travesías por cordilleras y compromiso con el grupo',
            heroSvg: `
                <svg viewBox="0 0 560 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ilustración de la Canal de Trea">
                    <defs>
                        <linearGradient id="skyEsculta" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stop-color="#1C130E"/>
                            <stop offset="55%" stop-color="#4A2E1B"/>
                            <stop offset="100%" stop-color="#8B5A2B"/>
                        </linearGradient>
                    </defs>
                    <rect width="560" height="320" fill="url(#skyEsculta)"/>
                    <polygon points="0,320 190,65 360,320" fill="#2E1B0F"/>
                    <polygon points="210,320 405,48 560,320" fill="#5C3A21"/>
                    <path d="M 190 65 L 255 180 L 295 240 L 245 320" stroke="#E6CCB2" stroke-width="3" stroke-dasharray="6 5" fill="none"/>
                    <text x="24" y="34" fill="#EDE0D4" font-family="JetBrains Mono, monospace" font-size="11" font-weight="600">✦ LA CANAL DE TREA · PICOS DE EUROPA Y EMPRESA ESCULTA</text>
                </svg>
            `,
            scenes: [
                {
                    tag: 'PROTAGONISMO JUVENIL',
                    title: 'La Empresa Esculta Autogestionada',
                    desc: 'Proyectos ambiciosos elegidos, diseñados, financiados y realizados de principio a fin por los propios escultas.',
                    img: 'images/DSC_3166.jpg'
                },
                {
                    tag: 'ALTA MONTAÑA',
                    title: 'Travesías y Vivac Bajo las Estrellas',
                    desc: 'Marchas exigentes de varios días con mochila al hombro durmiendo al raso en las cumbres.',
                    img: 'images/DSC_04051.jpg'
                },
                {
                    tag: 'ESPÍRITU DE UNIDAD',
                    title: 'Cohesión, Asamblea y Pensamiento Crítico',
                    desc: 'Debates, toma de decisiones en Asamblea de Unidad y fuerte vínculo de amistad y apoyo mutuo.',
                    img: 'images/DSC_059812.jpg'
                },
                {
                    tag: 'ACCIÓN Y SERVICIO',
                    title: 'Implicación Social y Ambiental',
                    desc: 'Colaboración con entidades sociales, cuidado del entorno natural y apoyo activo en las actividades del grupo.',
                    img: 'images/DSC_066412.jpg'
                }
            ],
            pillars: [
                { title: 'La Empresa Esculta Autogestionada', desc: 'Retos ambiciosos ideados, presupuestados, financiados y evaluados íntegramente por los jóvenes en Asamblea.' },
                { title: 'Espíritu Montañero y Superación', desc: 'Marchas de varios días por cordilleras, orientación nocturna y vivac en altura.' },
                { title: 'Cohesión y Pensamiento Crítico', desc: 'Sentido de pertenencia, debates actuales y servicio activo a la comunidad.' }
            ],
            kraalTitle: 'Kraal de la Unidad Esculta Trea',
            kraalSub: 'Scouters de Escultas (Kraaletes de Trea)',
            kraaletes: [
                { star: '★ I · Trea', name: 'Coordinación de Unidad', role: 'Acompañamiento de la Asamblea de Unidad y Consejo de Empresa' },
                { star: '★ II · Trea', name: 'Scouter de Alta Montaña', role: 'Planificación técnica de raids, vivacs y seguridad en cumbres' },
                { star: '★ III · Trea', name: 'Scouter de Proyectos', role: 'Mentoría en Empresas Escultas, autogestión y acción comunitaria' }
            ]
        },
        {
            id: 'clan',
            index: 4,
            starSymbol: 'ε Clan (Ama Dablam)',
            shortName: '5 · Clan (Ama Dablam)',
            fullName: 'Clan Rover · Ama Dablam',
            constellationTitle: 'ESTRELLA V · CLAN ROVER AMA DABLAM',
            age: '17 a 21 años (2º Bachillerato, FP y Universidad)',
            motto: 'Lema: «Servir»',
            accentColor: '#D9383A',
            glowColor: 'rgba(217, 56, 58, 0.12)',
            ringColor: 'rgba(217, 56, 58, 0.38)',
            hoverRingColor: 'rgba(217, 56, 58, 0.68)',
            dx: 240,
            dy: -160,
            r: 7.6,
            lead: 'En la cumbre de la línea ascendente, bajo el nombre de la mítica montaña del Himalaya (Ama Dablam). El Clan es una comunidad de jóvenes adultos que reman su propia canoa: caminan con la Horquilla Rover, lideran proyectos de impacto social y se preparan para dar el paso como futuros Scouters del grupo.',
            lawQuote: '«Rema tu propia canoa: elige tu rumbo con libertad y pon tu vida en servicio de los demás.» — Lema Rover «Servir»',
            storyTitle: 'Clan Rover Ama Dablam · La Cumbre y la Horquilla Rover',
            storySub: 'Servicio activo, rutas en autonomía total y el paso de Rover a Scouter',
            heroSvg: `
                <svg viewBox="0 0 560 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ilustración de la cumbre del Ama Dablam">
                    <defs>
                        <linearGradient id="skyClan" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stop-color="#090A0F"/>
                            <stop offset="55%" stop-color="#450A0A"/>
                            <stop offset="100%" stop-color="#991B1B"/>
                        </linearGradient>
                    </defs>
                    <rect width="560" height="320" fill="url(#skyClan)"/>
                    <!-- Cumbre escarpada del Ama Dablam en Rojo Rover y Cruz del Sur -->
                    <polygon points="60,320 280,42 500,320" fill="#2A0808" stroke="#D9383A" stroke-width="2"/>
                    <polygon points="280,42 225,112 280,96 335,112" fill="#F8FAFC"/>
                    <circle cx="280" cy="22" r="4" fill="#FFFFFF"/>
                    <text x="24" y="34" fill="#FECACA" font-family="JetBrains Mono, monospace" font-size="11" font-weight="600">✦ CUMBRE AMA DABLAM (6.812m) · LEMA «SERVIR»</text>
                </svg>
            `,
            scenes: [
                {
                    tag: 'SIMBOLOGÍA ROVER',
                    title: 'La Horquilla y Remar tu Propia Canoa',
                    desc: 'Cada rover es protagonista de su propio proyecto personal de vida, tomando decisiones conscientes en comunidad.',
                    img: 'images/DSC_066412.jpg'
                },
                {
                    tag: 'COMPROMISO REAL',
                    title: 'Voluntariado y Proyectos de Servicio',
                    desc: 'Acción social directa, cooperación y servicio constante dentro y fuera del Grupo Scout ACRUX 518.',
                    img: 'images/DSC_058812.jpg'
                },
                {
                    tag: 'CAMPAMENTOS VOLANTES',
                    title: 'Grandes Travesías de Alta Montaña',
                    desc: 'Expediciones rovers en autosuficiencia por las grandes cordilleras.',
                    img: 'images/DSC_3166.jpg'
                },
                {
                    tag: 'EL CIERRE DEL CICLO',
                    title: 'De Rover a Scouter (Kraalete)',
                    desc: 'Formación como Monitores de Tiempo Libre para integrarse en los Kraales de las unidades y devolver lo aprendido.',
                    img: 'images/DSC_059812.jpg'
                }
            ],
            pillars: [
                { title: 'La Horquilla Rover y el Proyecto de Vida', desc: 'Símbolo de la elección consciente entre caminos para construir un futuro comprometido.' },
                { title: 'Lema «Servir» en Acción', desc: 'Voluntariado social, cooperación, apoyo a las ramas menores y ciudadanía activa.' },
                { title: 'De Rover a Scouter (El Cierre del Ciclo)', desc: 'Formación como monitores de tiempo libre para devolver al grupo todo lo aprendido.' }
            ],
            kraalTitle: 'Kraal del Clan Ama Dablam',
            kraalSub: 'Acompañantes Rovers y Coordinación (Kraaletes de Clan)',
            kraaletes: [
                { star: '★ I · Ama Dablam', name: 'Acompañante de Clan', role: 'Mentoría de vida rover, Parlamentos de Clan y Partidas Rovers' },
                { star: '★ II · Ama Dablam', name: 'Coordinación General (JJ, Marta y Hugo)', role: 'Enlace directo con la estructura del Grupo y transición a Scouter' }
            ]
        }
    ];

    // =========================================================================
    // 2. CAMPAMENTOS CONECTADOS COMO UNA CONSTELACIÓN (3 FOTOS DE EJEMPLO + DESCRIPCIÓN + LUGAR + DRIVE)
    // =========================================================================
    const CAMPS_ORIGIN_X = 2520;
    const CAMPS_ORIGIN_Y = 980;

    const CAMPS_DATA = [
        {
            id: 'verano-cumbres',
            index: 0,
            starSymbol: 'α Campamento de Verano',
            name: 'Campamento de Verano · Cumbres del Norte',
            season: '15 Días en Julio · Alta Montaña',
            location: '📍 Picos de Europa / Pirineos / Cordillera Cantábrica',
            driveFolderName: '2025_07_Campamento_Verano_Acrux518',
            driveUrl: 'https://drive.google.com/drive/u/0/my-drive',
            dx: -210,
            dy: 45,
            r: 8.4,
            desc: 'El momento culminante del año scout: quince días de convivencia en plena naturaleza virgen donde levantamos nuestra aldea en madera y cuerda, recorremos las cumbres en los raids por unidades y celebramos el Fuego de Campamento.',
            photos: [
                { src: 'images/DSC_066412.jpg', title: 'Familia del Grupo Scout ACRUX 518 con la bandera oficial', meta: 'Muestra 01/03 · Carpeta Google Drive Verano' },
                { src: 'images/DSC_059812.jpg', title: 'Formación del círculo general en la pradera del campamento', meta: 'Muestra 02/03 · Carpeta Google Drive Verano' },
                { src: 'images/DSC_064012.jpg', title: 'Actividades y grandes juegos por ramas en el valle', meta: 'Muestra 03/03 · Carpeta Google Drive Verano' }
            ]
        },
        {
            id: 'invierno-albergue',
            index: 1,
            starSymbol: 'β Campamento de Invierno',
            name: 'Campamento de Invierno · Estrella de Diciembre',
            season: '4 Días en Diciembre · Montaña Invernal',
            location: '📍 Sierras de Castilla y León · Refugio y Pinar',
            driveFolderName: '2025_12_Campamento_Invierno_Acrux518',
            driveUrl: 'https://drive.google.com/drive/u/0/my-drive',
            dx: -75,
            dy: -95,
            r: 7.6,
            desc: 'Cuatro días de acampada invernal en refugio de montaña y bosque antes de terminar el año, con rutas entre pinares, grandes juegos nocturnos y la tradicional velada de invierno de todo el grupo.',
            photos: [
                { src: 'images/DSC_04051.jpg', title: 'Ruta y exploración invernal entre pinares', meta: 'Muestra 01/03 · Carpeta Google Drive Invierno' },
                { src: 'images/DSC_058812.jpg', title: 'Juegos de cohesión y trabajo en equipo', meta: 'Muestra 02/03 · Carpeta Google Drive Invierno' },
                { src: 'images/DSC_3166.jpg', title: 'Velada y hermandad con la pañoleta carmesí y blanca', meta: 'Muestra 03/03 · Carpeta Google Drive Invierno' }
            ]
        },
        {
            id: 'primavera-sanjorge',
            index: 2,
            starSymbol: 'γ Acampada de Primavera',
            name: 'Valle de San Jorge · Acampada de Primavera',
            season: 'Abril y Mayo · Tiendas y Encuentro Autonómico',
            location: '📍 Praderas de Castilla y León',
            driveFolderName: '2025_04_Acampada_Primavera_SanJorge',
            driveUrl: 'https://drive.google.com/drive/u/0/my-drive',
            dx: 85,
            dy: -35,
            r: 7.8,
            desc: 'Las primeras noches del año en tienda de campaña y el gran encuentro con cientos de scouts de toda Castilla y León para celebrar San Jorge y el Festival de la Canción Scout.',
            photos: [
                { src: 'images/DSC_058812.jpg', title: 'Alegría y cánticos en el Festival de la Canción Scout', meta: 'Muestra 01/03 · Carpeta Google Drive Primavera' },
                { src: 'images/DSC_064012.jpg', title: 'Acampada de primavera en plena pradera verde', meta: 'Muestra 02/03 · Carpeta Google Drive Primavera' },
                { src: 'images/DSC_066412.jpg', title: 'Unión de todas las unidades junto a nuestros colores', meta: 'Muestra 03/03 · Carpeta Google Drive Primavera' }
            ]
        },
        {
            id: 'raids-vivac',
            index: 3,
            starSymbol: 'δ Senda de Vivac y Raids',
            name: 'Senda de Vivac · Raids de Montaña',
            season: 'Travesías de Rama · Mochila al Hombro',
            location: '📍 Gredos / Urbión / Montaña Palentina',
            driveFolderName: '2025_Raids_Y_Vivacs_Acrux518',
            driveUrl: 'https://drive.google.com/drive/u/0/my-drive',
            dx: 220,
            dy: -140,
            r: 8.0,
            desc: 'Las marchas a pie por etapas donde cada unidad pone a prueba su orientación con mapa y brújula, autonomía y compañerismo, durmiendo en vivac bajo el manto de estrellas.',
            photos: [
                { src: 'images/DSC_3166.jpg', title: 'Marcha por etapas y orientación en ruta', meta: 'Muestra 01/03 · Carpeta Google Drive Raids' },
                { src: 'images/DSC_04051.jpg', title: 'Descanso de patrulla en el collado', meta: 'Muestra 02/03 · Carpeta Google Drive Raids' },
                { src: 'images/DSC_059812.jpg', title: 'Llegada conjunta a la meta tras la ruta', meta: 'Muestra 03/03 · Carpeta Google Drive Raids' }
            ]
        }
    ];

    // Conexiones geométricas que unen las estrellas de los Campamentos como una sola Constelación
    const CAMPS_CONSTELLATION_EDGES = [
        [0, 1],
        [1, 2],
        [2, 3],
        [0, 2]
    ];

    // =========================================================================
    // 2B. ESTRELLA DE OBJETOS PERDIDOS («EL BAÚL») Y SUS MINI-ESTRELLAS (CAJONES = CARPETAS DE DRIVE)
    // =========================================================================
    const LOST_CAJONES_DATA = [
        {
            id: 'cajon-verano',
            index: 0,
            starSymbol: '✦ Cajón 01 · Campa Verano',
            folderName: 'Cajón 01 · Campamento_Verano_Drive',
            drivePath: 'Google Drive / Objetos Perdidos / 01_Cajon_Campamento_Verano',
            driveUrl: 'https://drive.google.com/drive/u/0/my-drive',
            subtitle: 'Prendas, cantimploras y menaje recogidos al desmontar el Campamento de Verano',
            items: [
                {
                    file: 'IMG_Polar_Azul_T10.jpg',
                    name: 'Forro Polar Quechua Azul Marino (Talla 10)',
                    desc: 'Encontrado en la tienda de intendencia. Tiene las iniciales «M.G.» borrosas en la etiqueta interior.',
                    status: 'En Cajón 01 · Rueda 53',
                    svg: `<svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg"><rect width="320" height="200" fill="#0B1325"/><path d="M110,42 L140,32 L180,32 L210,42 L238,95 L212,108 L196,74 L196,162 L124,162 L124,74 L108,108 L82,95 Z" fill="#1E3A8A" stroke="#60A5FA" stroke-width="2.5"/><line x1="160" y1="38" x2="160" y2="162" stroke="#93C5FD" stroke-width="2"/><text x="16" y="26" fill="#93C5FD" font-family="JetBrains Mono" font-size="10">📁 01_Cajon_Campamento_Verano</text></svg>`
                },
                {
                    file: 'IMG_Cantimplora_Laken_1L.jpg',
                    name: 'Cantimplora Laken Roja de Aluminio (1L)',
                    desc: 'Con mosquetón plateado en el tapón y pegatina de un lobo. Recogida junto a la fuente de la pradera.',
                    status: 'En Cajón 01 · Rueda 53',
                    svg: `<svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg"><rect width="320" height="200" fill="#120B10"/><rect x="128" y="56" width="64" height="108" rx="18" fill="#B91C1C" stroke="#FCA5A5" stroke-width="2.5"/><rect x="146" y="34" width="28" height="22" rx="4" fill="#374151"/><circle cx="182" cy="42" r="10" fill="none" stroke="#E5E7EB" stroke-width="3"/><text x="16" y="26" fill="#FCA5A5" font-family="JetBrains Mono" font-size="10">📁 01_Cajon_Campamento_Verano</text></svg>`
                },
                {
                    file: 'IMG_Poto_Aluminio_CintaRoja.jpg',
                    name: 'Poto Metálico + Tenedor con Cinta Aislante Roja',
                    desc: 'Olvidado en la zona de fregaderos el último día de campamento. Marcado con cinta roja en el asa.',
                    status: 'En Cajón 01 · Rueda 53',
                    svg: `<svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg"><rect width="320" height="200" fill="#0B1116"/><rect x="112" y="68" width="84" height="82" rx="10" fill="#64748B" stroke="#E2E8F0" stroke-width="2.5"/><path d="M196,82 L218,82 L218,132 L196,132" fill="none" stroke="#EF4444" stroke-width="5"/><text x="16" y="26" fill="#CBD5E1" font-family="JetBrains Mono" font-size="10">📁 01_Cajon_Campamento_Verano</text></svg>`
                }
            ]
        },
        {
            id: 'cajon-invierno',
            index: 1,
            starSymbol: '✦ Cajón 02 · Campa Invierno',
            folderName: 'Cajón 02 · Campamento_Invierno_Drive',
            drivePath: 'Google Drive / Objetos Perdidos / 02_Cajon_Campamento_Invierno',
            driveUrl: 'https://drive.google.com/drive/u/0/my-drive',
            subtitle: 'Sudaderas, frontales, guantes y abrigos recogidos en el albergue de invierno',
            items: [
                {
                    file: 'IMG_Sudadera_Acrux_TallaS.jpg',
                    name: 'Sudadera Roja Oficial Acrux 518 (Talla S)',
                    desc: 'Apareció doblada sobre una litera del refugio al terminar la acampada de diciembre. Sin nombre en la etiqueta.',
                    status: 'En Cajón 02 · Rueda 53',
                    svg: `<svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg"><rect width="320" height="200" fill="#18090B"/><path d="M108,44 L142,34 L178,34 L212,44 L240,98 L214,110 L198,76 L198,162 L122,162 L122,76 L106,110 L80,98 Z" fill="#991B1B" stroke="#FFFFFF" stroke-width="2.5"/><circle cx="160" cy="92" r="14" fill="none" stroke="#FFFFFF" stroke-width="2"/><text x="16" y="26" fill="#FECACA" font-family="JetBrains Mono" font-size="10">📁 02_Cajon_Campamento_Invierno</text></svg>`
                },
                {
                    file: 'IMG_Frontal_LED_Kalenji.jpg',
                    name: 'Linterna Frontal LED Negra Kalenji',
                    desc: 'Encontrada tras el Gran Juego Nocturno del pinar. Funciona perfectamente y tiene cinta elástica gris.',
                    status: 'En Cajón 02 · Rueda 53',
                    svg: `<svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg"><rect width="320" height="200" fill="#090D16"/><ellipse cx="160" cy="110" rx="62" ry="32" fill="none" stroke="#475569" stroke-width="10"/><rect x="134" y="68" width="52" height="30" rx="8" fill="#1E293B" stroke="#F8FAFC" stroke-width="2"/><circle cx="160" cy="83" r="9" fill="#FEF08A"/><text x="16" y="26" fill="#FEF08A" font-family="JetBrains Mono" font-size="10">📁 02_Cajon_Campamento_Invierno</text></svg>`
                }
            ]
        },
        {
            id: 'cajon-primavera',
            index: 2,
            starSymbol: '✦ Cajón 03 · Acampada Primavera',
            folderName: 'Cajón 03 · Acampada_Primavera_Drive',
            drivePath: 'Google Drive / Objetos Perdidos / 03_Cajon_Acampada_Primavera',
            driveUrl: 'https://drive.google.com/drive/u/0/my-drive',
            subtitle: 'Chubasqueros, fundas y objetos hallados en el autobús y pradera de primavera',
            items: [
                {
                    file: 'IMG_Chubasquero_Amarillo_T12.jpg',
                    name: 'Chubasquero Cortavientos Amarillo (Talla 12)',
                    desc: 'Plegado en su propio bolsillo en el asiento 14 del autobús de regreso a Valladolid.',
                    status: 'En Cajón 03 · Rueda 53',
                    svg: `<svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg"><rect width="320" height="200" fill="#141107"/><path d="M112,44 L144,34 L176,34 L208,44 L236,96 L210,108 L194,76 L194,160 L126,160 L126,76 L110,108 L84,96 Z" fill="#CA8A04" stroke="#FEF08A" stroke-width="2.5"/><text x="16" y="26" fill="#FEF08A" font-family="JetBrains Mono" font-size="10">📁 03_Cajon_Acampada_Primavera</text></svg>`
                },
                {
                    file: 'IMG_Funda_Saco_Forclaz.jpg',
                    name: 'Funda Compresora Negra de Saco Forclaz',
                    desc: 'Con correas naranjas de compresión. Apareció al recoger las tiendas de campaña.',
                    status: 'En Cajón 03 · Rueda 53',
                    svg: `<svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg"><rect width="320" height="200" fill="#0B0D13"/><rect x="122" y="52" width="76" height="104" rx="22" fill="#1F2937" stroke="#F97316" stroke-width="2.5"/><line x1="122" y1="84" x2="198" y2="84" stroke="#F97316" stroke-width="3"/><line x1="122" y1="124" x2="198" y2="124" stroke="#F97316" stroke-width="3"/><text x="16" y="26" fill="#FDBA74" font-family="JetBrains Mono" font-size="10">📁 03_Cajon_Acampada_Primavera</text></svg>`
                }
            ]
        },
        {
            id: 'cajon-local',
            index: 3,
            starSymbol: '✦ Cajón 04 · Local Sábados',
            folderName: 'Cajón 04 · Local_Sabados_Rueda53_Drive',
            drivePath: 'Google Drive / Objetos Perdidos / 04_Cajon_Sabados_Local_Rueda53',
            driveUrl: 'https://drive.google.com/drive/u/0/my-drive',
            subtitle: 'Pañoletas, pasadores y prendas olvidadas en las reuniones de los sábados (16:30 – 19:00 h)',
            items: [
                {
                    file: 'IMG_Panoleta_Turco_Cuero.jpg',
                    name: 'Pañoleta Carmesí y Blanca + Turco de Cuero',
                    desc: 'Encontrada tras el círculo de despedida del sábado en nuestra Base de Carretera de Rueda, 53.',
                    status: 'Custodiada en Coordinación',
                    svg: `<svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg"><rect width="320" height="200" fill="#140809"/><polygon points="75,55 245,55 160,162" fill="#B02324" stroke="#FFFFFF" stroke-width="6"/><circle cx="160" cy="95" r="13" fill="#78350F" stroke="#FDE68A" stroke-width="2.5"/><text x="16" y="26" fill="#FFFFFF" font-family="JetBrains Mono" font-size="10">📁 04_Cajon_Sabados_Local_Rueda53</text></svg>`
                }
            ]
        }
    ];

    // =========================================================================
    // 3. DEFINICIÓN DE LOS 5 SECTORES DEL MAPA ESTELAR GLOBAL
    // =========================================================================
    const SECTORS = [
        {
            index: 0,
            roman: 'I',
            code: 'SECTOR I / V · CRUX AUSTRALIS (LA CRUZ DEL SUR)',
            subtitle: 'ESTRELLA GUÍA · VALLADOLID (DESDE 1977)',
            coords: 'RA 12h 26m · DEC -63° 05\'',
            headingHTML: 'Cruz del Sur <span class="ice-italic">Acrux 518</span>',
            desc: 'Nuestra insignia estelar reproduce fielmente la constelación de la Cruz del Sur (Crux): Acrux en la base, Gacrux en la cúspide norte, Mimosa a la izquierda, Imai a la derecha e Intrometida (ε Crucis). Haz scroll para viajar a la línea de nuestras Unidades.',
            worldX: 0,
            worldY: 0,
            baseZoom: 1.06,
            primaryBtnText: 'Ir a la Constelación de Unidades',
            modalBtnText: 'Ver Identidad y Colores',
            stars: [
                {
                    id: 'acrux',
                    symbol: 'α Acrux (Base)',
                    dx: 12,
                    dy: 172,
                    r: 8.6,
                    color: '#FFFFFF',
                    halo: 'rgba(217, 56, 58, 0.36)',
                    isMainCross: true,
                    badge: 'Estrella Principal · Base de la Cruz',
                    title: 'α Crucis (Acrux) · El Faro que Nos Da Nombre',
                    body: 'Situada en el pie meridional de la Cruz del Sur, Acrux es la estrella guía de los exploradores. Desde 1977 da nombre al Grupo Scout Nº 518 de ASDE en Valladolid.',
                    pillars: ['Fundado en Valladolid en 1977', 'ASDE Exploradores de Castilla y León', 'Pañoleta Carmesí y Blanca']
                },
                {
                    id: 'gacrux',
                    symbol: 'γ Gacrux (Cima)',
                    dx: -22,
                    dy: -192,
                    r: 7.4,
                    color: '#FFFFFF',
                    halo: 'rgba(217, 56, 58, 0.42)',
                    isMainCross: true,
                    badge: 'Gigante Roja · Extremo Superior',
                    title: 'γ Crucis (Gacrux) · El Fuego Carmesí',
                    body: 'Corona la parte superior del eje mayor de la Cruz con un sutil fulgor carmesí, símbolo del fuego de campamento y del rojo (#B02324) de nuestra pañoleta.',
                    pillars: ['Color Rojo Carmesí (#B02324)', 'Borde Blanco Nieve (#FFFFFF)', 'Calidez y Hermandad Scout']
                },
                {
                    id: 'mimosa',
                    symbol: 'β Mimosa (Izq.)',
                    dx: -152,
                    dy: -16,
                    r: 7.5,
                    color: '#FFFFFF',
                    halo: 'rgba(255, 255, 255, 0.32)',
                    isMainCross: true,
                    badge: 'Brazo Izquierdo del Travesaño',
                    title: 'β Crucis (Mimosa) · Educación en Valores',
                    body: 'El segundo astro más luminoso de la constelación marca el extremo izquierdo del brazo transversal. Representa el método scout: aprender haciendo en pequeños grupos.',
                    pillars: ['Aprender Haciendo', 'Naturaleza como Aula', '5 Unidades de 6 a 21 Años']
                },
                {
                    id: 'imai',
                    symbol: 'δ Imai (Der.)',
                    dx: 104,
                    dy: -74,
                    r: 6.4,
                    color: '#FFFFFF',
                    halo: 'rgba(255, 255, 255, 0.28)',
                    isMainCross: true,
                    badge: 'Brazo Derecho del Travesaño',
                    title: 'δ Crucis (Imai) · Rumbo y Compromiso',
                    body: 'Cierra el travesaño inclinado de la Cruz del Sur en su flanco derecho, señalando la lealtad a la Promesa y la Ley Scout en cada actividad de sábado y acampada.',
                    pillars: ['Reuniones: Sábados 16:30 – 19:00 h', 'Base en Crtra. de Rueda, 53', '100% Voluntariado Educativo']
                },
                {
                    id: 'intrometida',
                    symbol: 'ε Intrometida',
                    dx: 50,
                    dy: 30,
                    r: 5.6,
                    color: '#FFFFFF',
                    halo: 'rgba(217, 56, 58, 0.26)',
                    isMainCross: true,
                    badge: 'Quinta Estrella Interior (Ginan)',
                    title: 'ε Crucis (Intrometida) · Las Cinco Ramas',
                    body: 'Brilla en el cuadrante inferior derecho de la Cruz, completando las cinco estrellas principales que simbolizan nuestras cinco ramas educativas.',
                    pillars: ['Castores · Manada · Tropa', 'Unidad Esculta · Clan Rover', 'Progresión de 6 a 21 años']
                }
            ],
            edges: [
                [1, 0],
                [2, 3]
            ]
        },
        {
            index: 1,
            roman: 'II',
            code: 'SECTOR II / V · LÍNEA DE LAS UNIDADES',
            subtitle: 'CONSTELACIÓN EN LÍNEA RECTA · CLIC EN UNA ESTRELLA PARA SUPER-ZOOM A SU TAB',
            coords: 'RA 15h 40m · DEC -48° 15\'',
            headingHTML: 'El Camino de <span class="ice-italic">las Unidades</span>',
            desc: 'Nuestras 5 unidades trazan una constelación en línea recta ascendente desde Castores hasta el Clan. Haz clic en cualquiera de las 5 estrellas para viajar con un Super-Zoom a su interior y abrir su pestaña con toda la información y sus Kraaletes.',
            worldX: UNITS_ORIGIN_X,
            worldY: UNITS_ORIGIN_Y,
            baseZoom: 1.0,
            primaryBtnText: '✦ Entrar en la Estrella de esta Unidad (Super-Zoom)',
            modalBtnText: 'Ir a Constelación de Campamentos →'
        },
        {
            index: 2,
            roman: 'III',
            code: 'SECTOR III / V · CONSTELACIÓN DE CAMPAMENTOS',
            subtitle: 'CADA ESTRELLA ES UN CAMPAMENTO · CLIC PARA SUPER-ZOOM A SU TAB',
            coords: 'RA 19h 12m · DEC -24° 50\'',
            headingHTML: 'Constelación de <span class="ice-italic">Campamentos</span>',
            desc: 'Cada estrella conectada en esta constelación guarda un campamento del grupo. Haz clic sobre cualquier estrella para que el Super-Zoom te sumerja en su pestaña dedicada con su historia, vivencias y galería de fotos reales.',
            worldX: CAMPS_ORIGIN_X,
            worldY: CAMPS_ORIGIN_Y,
            baseZoom: 1.02,
            primaryBtnText: '✦ Entrar en la Estrella del Campamento (Super-Zoom)',
            modalBtnText: 'Ir a Objetos Perdidos →'
        },
        {
            index: 3,
            roman: 'IV',
            code: 'SECTOR IV / V · CONSTELACIÓN «EL BAÚL» (OBJETOS PERDIDOS)',
            subtitle: 'ENTRA EN LA ESTRELLA «EL BAÚL» PARA ABRIR LOS CAJONES (CARPETAS DE GOOGLE DRIVE)',
            coords: 'RA 22h 08m · DEC -12° 33\'',
            headingHTML: 'El Baúl · <span class="ice-italic">Objetos Perdidos</span>',
            desc: 'La constelación de «El Baúl» guarda en su interior las Mini-Estrellas llamadas «Cajones» (cada una sincronizada con una carpeta de Google Drive). Haz clic en la estrella «El Baúl» o en cualquier Cajón para adentrarte en ella y ver las fotos de los objetos perdidos.',
            worldX: 420,
            worldY: 1580,
            baseZoom: 1.04,
            primaryBtnText: '✦ Entrar en «El Baúl» (Super-Zoom)',
            modalBtnText: 'Ir a Bases y Contacto →',
            stars: [
                {
                    id: 'estrella-el-baul',
                    symbol: '✦ El Baúl',
                    dx: -18,
                    dy: 24,
                    r: 7.6,
                    color: '#FFFFFF',
                    halo: 'rgba(217, 56, 58, 0.20)',
                    isBaulMain: true,
                    isClusterHub: true,
                    cajonIndex: 0,
                    badge: '✦ Estrella Principal · 4 Cajones Drive',
                    title: '✦ El Baúl · Estrella de Objetos Perdidos (Google Drive)',
                    body: 'Haz clic en «El Baúl» para adentrarte en su interior y explorar sus 4 Mini-Estrellas («Cajones»), donde se muestran las fotos de cada carpeta de Google Drive.',
                    pillars: ['✦ Cajón 01: Campa Verano', '✦ Cajón 02: Campa Invierno', '✦ Cajón 03 y 04: Primavera y Sábados']
                },
                {
                    id: 'cajon-star-0',
                    symbol: '✦ Cajón 01 · Campa Verano',
                    dx: -225,
                    dy: -62,
                    r: 6.2,
                    color: '#FFFFFF',
                    halo: 'rgba(255, 255, 255, 0.24)',
                    isClusterHub: true,
                    cajonIndex: 0,
                    badge: 'Mini-Estrella · Carpeta Drive 01',
                    title: 'Cajón 01 · Carpeta Drive «01_Cajon_Campamento_Verano»',
                    body: 'Contiene las fotografías de los objetos perdidos recogidos en el Campamento de Verano (forro polar Quechua azul, cantimplora Laken roja y poto con cinta roja).',
                    pillars: ['📁 01_Cajon_Campamento_Verano', '3 Fotos en Carpeta Drive', 'Clic para entrar al Cajón 01']
                },
                {
                    id: 'cajon-star-1',
                    symbol: '✦ Cajón 02 · Campa Invierno',
                    dx: -95,
                    dy: -128,
                    r: 6.0,
                    color: '#FFFFFF',
                    halo: 'rgba(255, 255, 255, 0.24)',
                    isClusterHub: true,
                    cajonIndex: 1,
                    badge: 'Mini-Estrella · Carpeta Drive 02',
                    title: 'Cajón 02 · Carpeta Drive «02_Cajon_Campamento_Invierno»',
                    body: 'Contiene las fotografías de las prendas y materiales olvidados en el albergue de invierno (sudadera oficial Acrux 518 y linterna frontal LED).',
                    pillars: ['📁 02_Cajon_Campamento_Invierno', '2 Fotos en Carpeta Drive', 'Clic para entrar al Cajón 02']
                },
                {
                    id: 'cajon-star-2',
                    symbol: '✦ Cajón 03 · Acampada Primavera',
                    dx: 112,
                    dy: -48,
                    r: 6.2,
                    color: '#FFFFFF',
                    halo: 'rgba(255, 255, 255, 0.24)',
                    isClusterHub: true,
                    cajonIndex: 2,
                    badge: 'Mini-Estrella · Carpeta Drive 03',
                    title: 'Cajón 03 · Carpeta Drive «03_Cajon_Acampada_Primavera»',
                    body: 'Contiene las fotografías de los objetos recogidos tras la acampada de primavera (chubasquero amarillo plegable y funda compresora de saco).',
                    pillars: ['📁 03_Cajon_Acampada_Primavera', '2 Fotos en Carpeta Drive', 'Clic para entrar al Cajón 03']
                },
                {
                    id: 'cajon-star-3',
                    symbol: '✦ Cajón 04 · Local Sábados',
                    dx: 235,
                    dy: 58,
                    r: 6.0,
                    color: '#FFFFFF',
                    halo: 'rgba(255, 255, 255, 0.24)',
                    isClusterHub: true,
                    cajonIndex: 3,
                    badge: 'Mini-Estrella · Carpeta Drive 04',
                    title: 'Cajón 04 · Carpeta Drive «04_Cajon_Sabados_Local_Rueda53»',
                    body: 'Contiene las fotografías de las prendas y pañoletas encontradas los sábados en nuestra Base de Carretera de Rueda, 53.',
                    pillars: ['📁 04_Cajon_Sabados_Local_Rueda53', 'Custodia en Base Central', 'Clic para entrar al Cajón 04']
                }
            ],
            // Trazado astronómico orgánico (arco celeste natural pasando por ★ El Baúl)
            edges: [[1, 2], [2, 0], [0, 3], [3, 4]]
        },
        {
            index: 4,
            roman: 'V',
            code: 'SECTOR V / V · BASES OPERATIVAS Y CONTACTO',
            subtitle: 'COORDENADAS EN VALLADOLID · CANAL DIRECTO E INSCRIPCIÓN',
            coords: '41° 37\' N · 4° 44\' W (VALLADOLID)',
            headingHTML: 'Nuestras <span class="ice-italic">Bases y Contacto</span>',
            desc: 'Nuestras Bases de operaciones en Valladolid y en la naturaleza son el punto de encuentro de las cinco unidades cada sábado. Contacta con Coordinación o solicita venir a probar un sábado gratis.',
            worldX: -1380,
            worldY: 480,
            baseZoom: 1.05,
            primaryBtnText: '⚜️ Abrir Panel de Bases y Solicitar Sábado de Prueba',
            modalBtnText: 'Volver al Inicio (Cruz del Sur α) ↻',
            stars: [
                {
                    id: 'base-central',
                    symbol: 'α Base Central · Rueda 53',
                    dx: 0,
                    dy: -155,
                    r: 8.6,
                    color: '#FFFFFF',
                    halo: 'rgba(217, 56, 58, 0.36)',
                    badge: 'Base Principal · CP 47008',
                    title: 'Base Principal: Carretera de Rueda, 53 (Valladolid)',
                    body: 'Nuestro local y centro de intendencia en Valladolid. Aquí arrancan y terminan nuestras actividades ordinarias todos los sábados de 16:30 a 19:00 h.',
                    pillars: ['📍 Carretera de Rueda, 53 (47008)', '🕓 Sábados de 16:30 a 19:00 h', '🚌 Conexión directa Auvasa']
                },
                {
                    id: 'bases-campo',
                    symbol: 'β Bases de Campo',
                    dx: -165,
                    dy: 18,
                    r: 6.8,
                    color: '#FFFFFF',
                    halo: 'rgba(255, 255, 255, 0.28)',
                    badge: 'Entornos Naturales',
                    title: 'Bases de Campo: Pinar de Antequera, Contiendas y Montaña',
                    body: 'Además de nuestra Base en Crtra. de Rueda, desarrollamos nuestros juegos de pista, construcciones y acampadas en el Pinar de Antequera, la Ribera del Pisuerga y parajes de montaña de Castilla y León.',
                    pillars: ['🌲 Pinar de Antequera', '🏞️ Ribera y Parques de Valladolid', '🏔️ Bases de Acampada en CyL']
                },
                {
                    id: 'canal-coordinacion',
                    symbol: 'γ Coordinación Directa',
                    dx: 165,
                    dy: 18,
                    r: 6.8,
                    color: '#FFFFFF',
                    halo: 'rgba(255, 255, 255, 0.28)',
                    badge: 'Atención a Familias',
                    title: 'Contacto Directo: JJ, Marta y Hugo',
                    body: 'Habla directamente por teléfono, WhatsApp o correo electrónico con los coordinadores de grupo para consultar plazas por año de nacimiento o cualquier duda.',
                    pillars: ['📞 JJ: 616 28 91 19', '📞 Marta: 619 20 20 68 · Hugo', '✉️ gruposcoutacrux518@gmail.com']
                },
                {
                    id: 'base-inscripcion',
                    symbol: 'δ Sábado de Prueba',
                    dx: 0,
                    dy: 150,
                    r: 7.5,
                    color: '#FFFFFF',
                    halo: 'rgba(217, 56, 58, 0.32)',
                    badge: '6 a 21 Años · Sin Compromiso',
                    title: 'Ven a Probar un Sábado Gratis con tu Unidad',
                    body: 'Cualquier niño, niña o joven de 6 a 21 años puede venir a probar un sábado gratis sin compromiso para conocer a sus compañeros y a los Kraaletes de su rama.',
                    pillars: ['1. Escríbenos con su edad', '2. Ven un sábado a las 16:30 h', '3. ¡Bienvenido a Acrux 518!']
                }
            ],
            edges: [[0, 1], [0, 2], [0, 3], [1, 3], [2, 3]]
        }
    ];

    // =========================================================================
    // 4. CONSTRUCCIÓN DE NODOS Y LÍNEAS ELÁSTICAS EN COORDENADAS DEL MUNDO
    // =========================================================================
    const worldNodes = [];
    const worldEdges = [];

    function registerStarCluster(starsList, edgesList, originX, originY, meta) {
        const created = starsList.map((st, idx) => {
            const node = {
                ...st,
                ...meta,
                starIdx: idx,
                anchorX: originX + st.dx,
                anchorY: originY + st.dy,
                wx: originX + st.dx,
                wy: originY + st.dy,
                vx: 0,
                vy: 0,
                phaseX: Math.random() * Math.PI * 2,
                phaseY: Math.random() * Math.PI * 2,
                speedX: 0.45 + Math.random() * 0.35,
                speedY: 0.45 + Math.random() * 0.35,
                amp: 3.5 + Math.random() * 3.5,
                sx: 0,
                sy: 0,
                hover: 0
            };
            worldNodes.push(node);
            return node;
        });

        edgesList.forEach(([iA, iB]) => {
            if (created[iA] && created[iB]) {
                worldEdges.push({
                    ...meta,
                    nodeA: created[iA],
                    nodeB: created[iB],
                    ctrlX: 0,
                    ctrlY: 0,
                    vx: 0,
                    vy: 0,
                    glow: 0
                });
            }
        });

        return created;
    }

    // 1. Registrar Sector I (Cruz del Sur), Sector IV (Objetos Perdidos) y Sector V (Bases)
    [0, 3, 4].forEach(sIdx => {
        const sec = SECTORS[sIdx];
        sec.runtimeNodes = registerStarCluster(sec.stars, sec.edges, sec.worldX, sec.worldY, {
            sectorIndex: sIdx,
            clusterType: 'sector'
        });
    });

    // Estrellas secundarias del campo de la Cruz del Sur
    const cruxFieldExtras = [
        { dx: -215, dy: -165, r: 3.2, symbol: 'μ² Crucis' },
        { dx: -198, dy: -46, r: 3.2, symbol: 'λ Crucis' },
        { dx: -182, dy: 38, r: 3.3, symbol: 'κ Crucis (Joyero)' },
        { dx: -125, dy: 76, r: 3.3, symbol: 'ι Crucis' },
        { dx: 64, dy: 225, r: 3.3, symbol: 'ζ Crucis' },
        { dx: 138, dy: 268, r: 3.4, symbol: 'η Crucis' },
        { dx: 165, dy: 182, r: 3.0, symbol: 'θ¹ Crucis' },
        { dx: 156, dy: 168, r: 3.0, symbol: 'θ² Crucis' }
    ];
    registerStarCluster(cruxFieldExtras, [], SECTORS[0].worldX, SECTORS[0].worldY, {
        sectorIndex: 0,
        clusterType: 'crux-field'
    });

    // Estrellas secundarias del campo de «El Baúl» para darle aspecto astronómico natural
    const baulFieldExtras = [
        { dx: -275, dy: -18, r: 2.9, symbol: '' },
        { dx: -155, dy: 82, r: 3.1, symbol: '' },
        { dx: 38, dy: 118, r: 3.0, symbol: '' },
        { dx: 185, dy: -115, r: 2.8, symbol: '' },
        { dx: 288, dy: 12, r: 3.1, symbol: '' }
    ];
    registerStarCluster(baulFieldExtras, [], SECTORS[3].worldX, SECTORS[3].worldY, {
        sectorIndex: 3,
        clusterType: 'baul-field'
    });

    // 2. Registrar Sector II: LAS 5 UNIDADES EN UNA CONSTELACIÓN DE LÍNEA RECTA ASCENDENTE
    //    Cada estrella de la línea recta muestra el color de su Unidad (Escultas marrón, Clan rojo, etc.).
    const unitLineStars = UNITS_DATA.map((unit, uIdx) => ({
        id: `unit-star-${unit.id}`,
        symbol: unit.shortName,
        dx: unit.dx,
        dy: unit.dy,
        r: unit.r,
        color: unit.accentColor || '#FFFFFF',
        accentColor: unit.accentColor || '#38BDF8',
        halo: unit.glowColor || 'rgba(56, 189, 248, 0.12)',
        ringColor: unit.ringColor || 'rgba(56, 189, 248, 0.38)',
        hoverRingColor: unit.hoverRingColor || 'rgba(56, 189, 248, 0.68)',
        isClusterHub: true,
        unitIndex: uIdx
    }));
    const unitLineEdges = [
        [0, 1],
        [1, 2],
        [2, 3],
        [3, 4]
    ];
    const createdUnitNodes = registerStarCluster(unitLineStars, unitLineEdges, UNITS_ORIGIN_X, UNITS_ORIGIN_Y, {
        sectorIndex: 1,
        clusterType: 'unit'
    });
    UNITS_DATA.forEach((u, idx) => {
        u.runtimeNode = createdUnitNodes[idx];
        u.worldX = UNITS_ORIGIN_X + u.dx;
        u.worldY = UNITS_ORIGIN_Y + u.dy;
    });

    // 3. Registrar Sector III: CONSTELACIÓN DE CAMPAMENTOS CONECTADOS
    //    Estrellas en blanco puro sin color en el mapa estelar.
    const campConstellationStars = CAMPS_DATA.map((camp, cIdx) => ({
        id: `camp-star-${camp.id}`,
        symbol: camp.starSymbol,
        dx: camp.dx,
        dy: camp.dy,
        r: camp.r,
        color: '#FFFFFF',
        halo: 'rgba(255, 255, 255, 0.24)',
        isClusterHub: true,
        campIndex: cIdx
    }));
    const createdCampNodes = registerStarCluster(
        campConstellationStars,
        CAMPS_CONSTELLATION_EDGES,
        CAMPS_ORIGIN_X,
        CAMPS_ORIGIN_Y,
        {
            sectorIndex: 2,
            clusterType: 'camp'
        }
    );
    CAMPS_DATA.forEach((c, idx) => {
        c.runtimeNode = createdCampNodes[idx];
        c.worldX = CAMPS_ORIGIN_X + c.dx;
        c.worldY = CAMPS_ORIGIN_Y + c.dy;
    });

    // =========================================================================
    // 5. CAMPO PROFUNDO DE ESTRELLAS CON PARALLAX (SOLO BLANCO Y TOQUE ROJO SUTIL)
    // =========================================================================
    const bgStars = [];
    for (let i = 0; i < 420; i++) {
        const layer = i < 220 ? 0 : (i < 350 ? 1 : 2);
        bgStars.push({
            bx: (Math.random() - 0.5) * 7600,
            by: (Math.random() - 0.5) * 5200,
            ox: 0,
            oy: 0,
            vx: 0,
            vy: 0,
            size: layer === 0 ? (0.55 + Math.random() * 0.8) : (layer === 1 ? (0.95 + Math.random() * 1.2) : (1.3 + Math.random() * 1.7)),
            alpha: layer === 0 ? (0.16 + Math.random() * 0.32) : (layer === 1 ? (0.28 + Math.random() * 0.38) : (0.42 + Math.random() * 0.45)),
            parallax: layer === 0 ? 0.14 : (layer === 1 ? 0.36 : 0.72),
            layer,
            twPhase: Math.random() * Math.PI * 2,
            twSpeed: 0.65 + Math.random() * 1.5,
            // Blanco puro mayoritario y apenas un 8% con un tinte rojizo muy sutil
            tint: Math.random() > 0.92 ? 'rgba(224, 82, 84, 0.85)' : '#FFFFFF'
        });
    }

    // =========================================================================
    // 6. ESTADO DE CÁMARA, SCROLL INERCIAL Y SUPER-ZOOM A ESTRELLA
    // =========================================================================
    let vw = window.innerWidth;
    let vh = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
        vw = window.innerWidth;
        vh = window.innerHeight;
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = Math.floor(vw * dpr);
        canvas.height = Math.floor(vh * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener('resize', resize);

    const camera = {
        x: 0,
        y: 0,
        zoom: 1.06,
        targetX: 0,
        targetY: 0,
        targetZoom: 1.06,
        vx: 0,
        vy: 0
    };

    let targetSectorProgress = 0; // [0 .. SECTORS.length - 1]
    let currentSectorProgress = 0;
    let activeSectorIdx = 0;
    let selectedSubIdx = 0;
    let isOverviewMode = false;

    // Estado de Super-Zoom hacia una estrella (null | { type: 'unit'|'camp', index, wx, wy, zoom })
    let superZoomState = null;

    let freePanX = 0;
    let freePanY = 0;
    let targetFreePanX = 0;
    let targetFreePanY = 0;

    const pointer = {
        x: vw * 0.6,
        y: vh * 0.5,
        lerpX: vw * 0.6,
        lerpY: vh * 0.5,
        isDown: false,
        dragStartX: 0,
        dragStartY: 0,
        dragMoved: 0,
        hoveredNode: null
    };

    // =========================================================================
    // 7. SINCRONIZACIÓN DE INTERFAZ Y LECTURA DE CADA ESTRELLA
    // =========================================================================
    const elStagePanel = document.getElementById('constellationStagePanel');
    const elIndexTag = document.getElementById('stageIndexTag');
    const elSubtitleTag = document.getElementById('stageSubtitleTag');
    const elHeading = document.getElementById('stageHeading');
    const elDescription = document.getElementById('stageDescription');
    const elStarNodesWrap = document.getElementById('stageStarNodes');
    const elStarDesignation = document.getElementById('starDesignation');
    const elStarBadge = document.getElementById('starBadgePill');
    const elStarTitle = document.getElementById('starReadoutTitle');
    const elStarBody = document.getElementById('starReadoutBody');
    const elStarPillars = document.getElementById('starReadoutPillars');
    const elPrimaryBtn = document.getElementById('btnStagePrimaryAction');
    const elPrimaryBtnText = document.getElementById('btnStagePrimaryText');
    const elModalBtn = document.getElementById('btnStageModalAction');
    const elModalBtnText = document.getElementById('btnStageModalText');

    const elCoordsReadout = document.getElementById('hudCoordsReadout');
    const elTelSector = document.getElementById('telemetryConstellationName');
    const elTelStar = document.getElementById('telemetryStarName');
    const elTelZoom = document.getElementById('telemetryZoomValue');
    const elProgressFill = document.getElementById('hudScrollFill');
    const elProgressPercent = document.getElementById('hudProgressPercent');
    const elOverviewBtn = document.getElementById('btnToggleOverview');
    const elOverviewBtnText = document.getElementById('overviewBtnText');
    const elStarDiveFlash = document.getElementById('starDiveFlash');

    // Tabs de Super-Zoom a Pantalla Completa
    const elUnitZoomOverlay = document.getElementById('unitSuperZoomOverlay');
    const elCampZoomOverlay = document.getElementById('campSuperZoomOverlay');
    const elLostZoomOverlay = document.getElementById('lostSuperZoomOverlay');

    // Estado del salto al Hiperespacio (estilo Star Wars ligero)
    let hyperspaceJump = null;
    const hyperspaceStreaks = [];
    for (let i = 0; i < 92; i++) {
        hyperspaceStreaks.push({
            angle: (i / 92) * Math.PI * 2 + (Math.random() - 0.5) * 0.06,
            baseDist: 18 + Math.random() * 240,
            speed: 0.65 + Math.random() * 1.35,
            lenFactor: 0.6 + Math.random() * 1.1,
            width: 0.7 + Math.random() * 1.35,
            alpha: 0.22 + Math.random() * 0.52,
            tint: Math.random() > 0.85 ? 'rgba(224, 82, 84, 0.75)' : (Math.random() > 0.5 ? 'rgba(224, 242, 254, 0.85)' : '#FFFFFF')
        });
    }

    function renderSubSelection(sIdx, subIdx) {
        selectedSubIdx = subIdx;
        const sec = SECTORS[sIdx];
        if (!sec) return;

        if (sIdx === 1) {
            const u = UNITS_DATA[subIdx] || UNITS_DATA[0];
            if (elStarDesignation) elStarDesignation.textContent = u.constellationTitle;
            if (elStarBadge) elStarBadge.textContent = `${u.age} · ${u.motto}`;
            if (elStarTitle) elStarTitle.textContent = u.fullName;
            if (elStarBody) elStarBody.textContent = u.lead;
            if (elStarPillars) {
                elStarPillars.innerHTML = u.kraaletes
                    .map(k => `<span class="star-pillar-tag">★ ${k.name}</span>`)
                    .join('');
            }
            if (elTelStar) elTelStar.textContent = u.fullName;
            if (!superZoomState) {
                targetFreePanX = u.dx * 0.45;
                targetFreePanY = u.dy * 0.45;
            }
        } else if (sIdx === 2) {
            const c = CAMPS_DATA[subIdx] || CAMPS_DATA[0];
            if (elStarDesignation) elStarDesignation.textContent = `ESTRELLA 0${c.index + 1} · CONSTELACIÓN DE CAMPAMENTOS`;
            if (elStarBadge) elStarBadge.textContent = c.location;
            if (elStarTitle) elStarTitle.textContent = c.name;
            if (elStarBody) elStarBody.textContent = c.desc;
            if (elStarPillars) {
                elStarPillars.innerHTML = `
                    <span class="star-pillar-tag">📸 3 Fotos de Ejemplo</span>
                    <span class="star-pillar-tag">📁 Drive: ${c.driveFolderName}</span>
                `;
            }
            if (elTelStar) elTelStar.textContent = c.name;
            if (!superZoomState) {
                targetFreePanX = c.dx * 0.45;
                targetFreePanY = c.dy * 0.45;
            }
        } else {
            const st = sec.stars[subIdx] || sec.stars[0];
            if (elStarDesignation) elStarDesignation.textContent = st.symbol;
            if (elStarBadge) elStarBadge.textContent = st.badge;
            if (elStarTitle) elStarTitle.textContent = st.title;
            if (elStarBody) elStarBody.textContent = st.body;
            if (elStarPillars) {
                elStarPillars.innerHTML = (st.pillars || [])
                    .map(p => `<span class="star-pillar-tag">✦ ${p}</span>`)
                    .join('');
            }
            if (elTelStar) elTelStar.textContent = st.symbol;
        }

        if (elStarNodesWrap) {
            elStarNodesWrap.querySelectorAll('.star-node-chip').forEach((chip, i) => {
                chip.classList.toggle('active', i === subIdx);
            });
        }
    }

    let transitionTimer = null;
    function syncSectorUI(sIdx, subIdx = 0, immediate = false) {
        const sec = SECTORS[sIdx];
        if (!sec) return;

        const apply = () => {
            if (elIndexTag) elIndexTag.textContent = sec.code;
            if (elSubtitleTag) elSubtitleTag.textContent = sec.subtitle;
            if (elHeading) elHeading.innerHTML = sec.headingHTML;
            if (elDescription) elDescription.textContent = sec.desc;
            if (elCoordsReadout) elCoordsReadout.textContent = sec.coords;
            if (elTelSector) elTelSector.textContent = `${sec.roman} · ${sec.code.split('·')[1]?.trim() || ''}`;
            if (elPrimaryBtnText) elPrimaryBtnText.textContent = sec.primaryBtnText;
            if (elModalBtnText) elModalBtnText.textContent = sec.modalBtnText;

            if (elStarNodesWrap) {
                let items = [];
                if (sIdx === 1) {
                    items = UNITS_DATA.map((u, idx) => ({ label: u.shortName, idx }));
                } else if (sIdx === 2) {
                    items = CAMPS_DATA.map((c, idx) => ({ label: c.starSymbol, idx }));
                } else {
                    items = sec.stars.map((st, idx) => ({ label: st.symbol, idx }));
                }

                elStarNodesWrap.innerHTML = items.map(it => `
                    <button type="button" class="star-node-chip ${it.idx === subIdx ? 'active' : ''}" data-sub-idx="${it.idx}">
                        ${it.label}
                    </button>
                `).join('');

                elStarNodesWrap.querySelectorAll('.star-node-chip').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        const idx = parseInt(btn.getAttribute('data-sub-idx'), 10);
                        renderSubSelection(sIdx, idx);
                        if (sIdx === 0) openDrawerModal('identity');
                        if (sIdx === 1) openUnitSuperZoom(idx);
                        if (sIdx === 2) openCampSuperZoom(idx);
                        if (sIdx === 3) openLostSuperZoom(idx === 0 ? 0 : idx - 1);
                        if (sIdx === 4) openDrawerModal('bases');
                    });
                });
            }

            renderSubSelection(sIdx, subIdx);

            document.querySelectorAll('.hud-nav-node').forEach(btn => {
                btn.classList.toggle('active', parseInt(btn.getAttribute('data-sector'), 10) === sIdx);
            });
            document.querySelectorAll('.rail-tick').forEach(tick => {
                tick.classList.toggle('active', parseInt(tick.getAttribute('data-sector'), 10) === sIdx);
            });
        };

        if (immediate || !elStagePanel) {
            apply();
            return;
        }
        elStagePanel.classList.add('is-transitioning');
        clearTimeout(transitionTimer);
        transitionTimer = setTimeout(() => {
            apply();
            elStagePanel.classList.remove('is-transitioning');
        }, 190);
    }

    // =========================================================================
    // 8. TRANSICIÓN SUPER-ZOOM ESTILO HIPERESPACIO (STAR WARS LIGHT) -> ABRE TAB
    // =========================================================================
    let diveTabTimer = null;

    function triggerStarDiveFlash(wx, wy, durationMs = 1150) {
        hyperspaceJump = {
            start: performance.now(),
            duration: durationMs,
            wx: typeof wx === 'number' ? wx : camera.targetX,
            wy: typeof wy === 'number' ? wy : camera.targetY
        };
        if (!elStarDiveFlash) return;
        elStarDiveFlash.classList.add('is-flashing');
        setTimeout(() => {
            elStarDiveFlash.classList.remove('is-flashing');
        }, durationMs - 120);
    }

    function openUnitSuperZoom(unitIdx) {
        const unit = UNITS_DATA[unitIdx] || UNITS_DATA[0];
        const wasAlreadyOpen = elUnitZoomOverlay?.classList.contains('is-open');
        clearTimeout(diveTabTimer);
        isOverviewMode = false;
        document.body.classList.remove('is-overview-mode');

        targetSectorProgress = 1;
        activeSectorIdx = 1;
        selectedSubIdx = unitIdx;

        // 1. Iniciar el Super-Zoom Hiperespacio directo al núcleo de la estrella de la Unidad
        superZoomState = {
            type: 'unit',
            index: unitIdx,
            wx: unit.worldX,
            wy: unit.worldY,
            zoom: 24.0
        };

        document.body.classList.add('is-superzoom-open');
        const diveTime = wasAlreadyOpen ? 240 : 1080;
        triggerStarDiveFlash(unit.worldX, unit.worldY, wasAlreadyOpen ? 450 : 1180);

        // Aplicar el color e iluminación propios de la Unidad a toda la Tab
        if (elUnitZoomOverlay) {
            elUnitZoomOverlay.style.setProperty('--unit-accent', unit.accentColor || '#38BDF8');
            elUnitZoomOverlay.style.setProperty('--unit-glow', unit.glowColor || 'rgba(56, 189, 248, 0.18)');
        }

        // 2. Poblar la Nueva Tab completa de la Unidad + sus ilustraciones, escenas y Kraaletes
        const elStarCoords = document.getElementById('uzStarCoords');
        if (elStarCoords) elStarCoords.textContent = `ESTRELLA 0${unitIdx + 1} / 05 · ${unit.colorLabel || 'LÍNEA DE LAS UNIDADES'}`;
        document.getElementById('uzAgePill').textContent = unit.age;
        document.getElementById('uzConstellationName').textContent = `✦ ${unit.constellationTitle}`;
        document.getElementById('uzTitle').textContent = unit.fullName;
        document.getElementById('uzMotto').textContent = unit.motto;
        document.getElementById('uzLead').textContent = unit.lead;
        document.getElementById('uzKraalTitle').textContent = unit.kraalTitle;
        document.getElementById('uzKraalSub').textContent = unit.kraalSub;

        const quoteBanner = document.getElementById('uzQuoteBanner');
        if (quoteBanner) {
            quoteBanner.textContent = unit.lawQuote || '';
        }

        const heroVisual = document.getElementById('uzHeroVisual');
        if (heroVisual) {
            heroVisual.innerHTML = unit.heroSvg || '';
        }

        const storyTitleEl = document.getElementById('uzStoryTitle');
        if (storyTitleEl) storyTitleEl.textContent = unit.storyTitle || 'Marco Simbólico e Imágenes';
        const storySubEl = document.getElementById('uzStorySub');
        if (storySubEl) storySubEl.textContent = unit.storySub || '';

        const galleryWrap = document.getElementById('uzVisualGallery');
        if (galleryWrap) {
            galleryWrap.innerHTML = (unit.scenes || []).map(sc => `
                <article class="unit-scene-card">
                    <div class="unit-scene-art">
                        ${sc.svg ? sc.svg : `<img src="${sc.img}" alt="${sc.title}" loading="lazy">`}
                    </div>
                    <div class="unit-scene-body">
                        <span class="unit-scene-tag">${sc.tag}</span>
                        <h4>${sc.title}</h4>
                        <p>${sc.desc}</p>
                    </div>
                </article>
            `).join('');
        }

        const pillarsWrap = document.getElementById('uzPillarsList');
        if (pillarsWrap) {
            pillarsWrap.innerHTML = unit.pillars.map(p => `
                <div class="sz-pillar-item">
                    <strong>✦ ${p.title}</strong>
                    <span>${p.desc}</span>
                </div>
            `).join('');
        }

        const kraalWrap = document.getElementById('uzKraaletesGrid');
        if (kraalWrap) {
            kraalWrap.innerHTML = unit.kraaletes.map(k => `
                <div class="kraalete-card">
                    <span class="kraalete-star">${k.star}</span>
                    <strong class="kraalete-name">${k.name}</strong>
                    <span class="kraalete-role">${k.role}</span>
                </div>
            `).join('');
        }

        const switchWrap = document.getElementById('uzSwitchPills');
        if (switchWrap) {
            switchWrap.innerHTML = UNITS_DATA.map((u, i) => `
                <button type="button" class="star-node-chip ${i === unitIdx ? 'active' : ''}" data-jump-unit="${i}">
                    ${u.shortName}
                </button>
            `).join('');
            switchWrap.querySelectorAll('[data-jump-unit]').forEach(btn => {
                btn.addEventListener('click', () => {
                    openUnitSuperZoom(parseInt(btn.getAttribute('data-jump-unit'), 10));
                });
            });
        }

        elCampZoomOverlay?.classList.remove('is-open');
        elCampZoomOverlay?.setAttribute('aria-hidden', 'true');
        elLostZoomOverlay?.classList.remove('is-open');
        elLostZoomOverlay?.setAttribute('aria-hidden', 'true');

        // 3. Dejar tiempo real de inmersión hacia el corazón de la estrella antes de abrir la Tab
        diveTabTimer = setTimeout(() => {
            if (elUnitZoomOverlay) {
                elUnitZoomOverlay.classList.add('is-open');
                elUnitZoomOverlay.setAttribute('aria-hidden', 'false');
                elUnitZoomOverlay.scrollTop = 0;
            }
        }, diveTime);
    }

    function openCampSuperZoom(campIdx) {
        const camp = CAMPS_DATA[campIdx] || CAMPS_DATA[0];
        const wasAlreadyOpen = elCampZoomOverlay?.classList.contains('is-open');
        clearTimeout(diveTabTimer);
        isOverviewMode = false;
        document.body.classList.remove('is-overview-mode');

        targetSectorProgress = 2;
        activeSectorIdx = 2;
        selectedSubIdx = campIdx;

        // 1. Iniciar el Super-Zoom Hiperespacio directo al núcleo de la estrella del Campamento
        superZoomState = {
            type: 'camp',
            index: campIdx,
            wx: camp.worldX,
            wy: camp.worldY,
            zoom: 24.0
        };

        document.body.classList.add('is-superzoom-open');
        const diveTime = wasAlreadyOpen ? 240 : 1080;
        triggerStarDiveFlash(camp.worldX, camp.worldY, wasAlreadyOpen ? 450 : 1180);

        // 2. Poblar la Nueva Tab del Campamento: Lugar, Descripción, 3 Fotos de Ejemplo y Botón Drive
        document.getElementById('czSeasonPill').textContent = camp.season;
        const locPill = document.getElementById('czLocationPill');
        if (locPill) locPill.textContent = camp.location;
        const folderBadge = document.getElementById('czDriveFolderBadge');
        if (folderBadge) folderBadge.textContent = `📁 Drive: ${camp.driveFolderName}`;
        document.getElementById('czTitle').textContent = camp.name;
        document.getElementById('czDesc').textContent = camp.desc;

        const folderTitle = document.getElementById('czDriveFolderTitle');
        if (folderTitle) folderTitle.textContent = `Carpeta: ${camp.driveFolderName}`;
        const driveLinkBtn = document.getElementById('czDriveLinkBtn');
        if (driveLinkBtn) driveLinkBtn.href = camp.driveUrl || 'https://drive.google.com';

        const threePhotosGrid = document.getElementById('czThreePhotosGrid');
        if (threePhotosGrid) {
            const samplePhotos = (camp.photos || []).slice(0, 3);
            threePhotosGrid.innerHTML = samplePhotos.map((ph, i) => `
                <article class="camp-photo-card">
                    <div class="camp-photo-img-wrap">
                        <span class="camp-photo-badge">FOTO DE EJEMPLO 0${i + 1} / 03</span>
                        <img src="${ph.src}" alt="${ph.title}" loading="lazy">
                    </div>
                    <div class="camp-photo-caption">
                        <strong>${ph.title}</strong>
                        <span>${ph.meta}</span>
                    </div>
                </article>
            `).join('');
        }

        const campSw = document.getElementById('czCampSwitcher');
        if (campSw) {
            campSw.innerHTML = CAMPS_DATA.map((c, i) => `
                <button type="button" class="star-node-chip ${i === campIdx ? 'active' : ''}" data-jump-camp="${i}">
                    ${c.starSymbol}
                </button>
            `).join('');
            campSw.querySelectorAll('[data-jump-camp]').forEach(btn => {
                btn.addEventListener('click', () => {
                    openCampSuperZoom(parseInt(btn.getAttribute('data-jump-camp'), 10));
                });
            });
        }

        elUnitZoomOverlay?.classList.remove('is-open');
        elUnitZoomOverlay?.setAttribute('aria-hidden', 'true');
        elLostZoomOverlay?.classList.remove('is-open');
        elLostZoomOverlay?.setAttribute('aria-hidden', 'true');

        diveTabTimer = setTimeout(() => {
            if (elCampZoomOverlay) {
                elCampZoomOverlay.classList.add('is-open');
                elCampZoomOverlay.setAttribute('aria-hidden', 'false');
                elCampZoomOverlay.scrollTop = 0;
            }
        }, diveTime);
    }

    // =========================================================================
    // 8B. ENTRAR EN LA ESTRELLA DE OBJETOS PERDIDOS («EL BAÚL») Y SUS MINI-ESTRELLAS (CAJONES DRIVE)
    // =========================================================================
    let activeLostCajonIdx = 0;

    function renderLostCajonView(cajonIdx) {
        activeLostCajonIdx = clamp(cajonIdx, 0, LOST_CAJONES_DATA.length - 1);
        const cajon = LOST_CAJONES_DATA[activeLostCajonIdx];
        if (!cajon) return;

        const folderPill = document.getElementById('lzActiveFolderPill');
        if (folderPill) folderPill.textContent = `📁 ${cajon.drivePath}`;
        const cajonTitle = document.getElementById('lzCurrentCajonTitle');
        if (cajonTitle) cajonTitle.textContent = cajon.folderName;
        const cajonSub = document.getElementById('lzCurrentCajonSub');
        if (cajonSub) cajonSub.textContent = `${cajon.subtitle} · (${cajon.items.length} fotos en esta carpeta de Google Drive)`;
        const openDriveBtn = document.getElementById('lzOpenDriveFolderBtn');
        if (openDriveBtn) openDriveBtn.href = cajon.driveUrl || 'https://drive.google.com';

        // Actualizar selector superior de Mini-Estrellas (Cajones)
        const sw = document.getElementById('lzCajonSwitcher');
        if (sw) {
            sw.innerHTML = LOST_CAJONES_DATA.map((cj, i) => `
                <button type="button" class="star-node-chip ${i === activeLostCajonIdx ? 'active' : ''}" data-cajon-switch="${i}">
                    ${cj.starSymbol}
                </button>
            `).join('');
            sw.querySelectorAll('[data-cajon-switch]').forEach(btn => {
                btn.addEventListener('click', () => {
                    renderLostCajonView(parseInt(btn.getAttribute('data-cajon-switch'), 10));
                });
            });
        }

        // Actualizar mapa interior de Mini-Estrellas (Cajones de Google Drive)
        const miniMap = document.getElementById('lzMiniStarsMap');
        if (miniMap) {
            miniMap.innerHTML = LOST_CAJONES_DATA.map((cj, i) => `
                <button type="button" class="cajon-ministar-node ${i === activeLostCajonIdx ? 'active' : ''}" data-cajon-node="${i}">
                    <span class="cajon-star-orb">★</span>
                    <div class="cajon-ministar-meta">
                        <strong>${cj.starSymbol}</strong>
                        <span>📁 ${cj.folderName} (${cj.items.length} fotos)</span>
                    </div>
                </button>
            `).join('');
            miniMap.querySelectorAll('[data-cajon-node]').forEach(btn => {
                btn.addEventListener('click', () => {
                    renderLostCajonView(parseInt(btn.getAttribute('data-cajon-node'), 10));
                });
            });
        }

        // Renderizar galería de fotos de objetos perdidos del Cajón seleccionado
        const renderPhotos = () => {
            const q = (document.getElementById('lzPhotoSearch')?.value || '').toLowerCase().trim();
            const grid = document.getElementById('lzPhotosGrid');
            if (!grid) return;

            const filtered = cajon.items.filter(it =>
                !q ||
                it.name.toLowerCase().includes(q) ||
                it.desc.toLowerCase().includes(q) ||
                it.file.toLowerCase().includes(q)
            );

            grid.innerHTML = filtered.map(it => `
                <article class="lost-photo-card">
                    <div class="lost-photo-art">
                        ${it.svg ? it.svg : `<img src="${it.img}" alt="${it.name}" loading="lazy">`}
                        <span class="lost-drive-file-chip">📄 ${it.file}</span>
                    </div>
                    <div class="lost-photo-body">
                        <div>
                            <h4>${it.name}</h4>
                            <p>${it.desc}</p>
                        </div>
                        <div class="lost-photo-footer">
                            <span class="star-pillar-tag">📍 ${it.status}</span>
                            <button type="button" class="rescue-flare-btn" data-claim-item="${it.name}">🙋‍♂️ ¡Es mío! Reclamar</button>
                        </div>
                    </div>
                </article>
            `).join('') || `<p>No hay fotos que coincidan con esa búsqueda en este Cajón de Google Drive.</p>`;

            grid.querySelectorAll('[data-claim-item]').forEach(btn => {
                btn.addEventListener('click', () => {
                    const itemName = btn.getAttribute('data-claim-item');
                    const banner = document.getElementById('lzClaimBanner');
                    if (banner) {
                        banner.style.display = 'block';
                        banner.innerHTML = `<strong>✅ Solicitud registrada para «${itemName}» (${cajon.folderName}):</strong> Pásate cualquier sábado a las <strong>16:30 h o 19:00 h</strong> por nuestra Base de <strong>Carretera de Rueda, 53</strong> para recogerlo.`;
                    }
                });
            });
        };

        renderPhotos();
        const searchInput = document.getElementById('lzPhotoSearch');
        if (searchInput) {
            searchInput.oninput = renderPhotos;
        }
    }

    function openLostSuperZoom(cajonIdx = 0) {
        const wasAlreadyOpen = elLostZoomOverlay?.classList.contains('is-open');
        clearTimeout(diveTabTimer);
        isOverviewMode = false;
        document.body.classList.remove('is-overview-mode');

        targetSectorProgress = 3;
        activeSectorIdx = 3;
        selectedSubIdx = 0;

        const secLost = SECTORS[3];
        const baulMainStar = secLost.stars[0];
        const targetWx = secLost.worldX + (baulMainStar ? baulMainStar.dx : 0);
        const targetWy = secLost.worldY + (baulMainStar ? baulMainStar.dy : 0);

        superZoomState = {
            type: 'lost',
            index: cajonIdx,
            wx: targetWx,
            wy: targetWy,
            zoom: 24.0
        };

        document.body.classList.add('is-superzoom-open');
        const diveTime = wasAlreadyOpen ? 240 : 1080;
        triggerStarDiveFlash(targetWx, targetWy, wasAlreadyOpen ? 450 : 1180);

        renderLostCajonView(cajonIdx);

        elUnitZoomOverlay?.classList.remove('is-open');
        elUnitZoomOverlay?.setAttribute('aria-hidden', 'true');
        elCampZoomOverlay?.classList.remove('is-open');
        elCampZoomOverlay?.setAttribute('aria-hidden', 'true');

        diveTabTimer = setTimeout(() => {
            if (elLostZoomOverlay) {
                elLostZoomOverlay.classList.add('is-open');
                elLostZoomOverlay.setAttribute('aria-hidden', 'false');
                elLostZoomOverlay.scrollTop = 0;
            }
        }, diveTime);
    }

    function closeAllSuperZooms(resetPan = true) {
        clearTimeout(diveTabTimer);
        if (superZoomState) {
            hyperspaceJump = {
                start: performance.now(),
                duration: 420,
                wx: superZoomState.wx,
                wy: superZoomState.wy
            };
        }
        superZoomState = null;
        document.body.classList.remove('is-superzoom-open');
        elUnitZoomOverlay?.classList.remove('is-open');
        elUnitZoomOverlay?.setAttribute('aria-hidden', 'true');
        elCampZoomOverlay?.classList.remove('is-open');
        elCampZoomOverlay?.setAttribute('aria-hidden', 'true');
        elLostZoomOverlay?.classList.remove('is-open');
        elLostZoomOverlay?.setAttribute('aria-hidden', 'true');
        if (resetPan) {
            targetFreePanX = 0;
            targetFreePanY = 0;
        }
    }

    document.getElementById('btnCloseUnitZoom')?.addEventListener('click', () => closeAllSuperZooms(true));
    document.getElementById('btnCloseCampZoom')?.addEventListener('click', () => closeAllSuperZooms(true));
    document.getElementById('btnCloseLostZoom')?.addEventListener('click', () => closeAllSuperZooms(true));

    function goToSector(sIdx, subIdx = 0) {
        const clamped = clamp(sIdx, 0, SECTORS.length - 1);
        closeAllSuperZooms(true);
        isOverviewMode = false;
        document.body.classList.remove('is-overview-mode');
        elOverviewBtn?.classList.remove('active');
        if (elOverviewBtnText) elOverviewBtnText.textContent = 'Mapa Estelar Global';

        targetSectorProgress = clamped;
        targetFreePanX = 0;
        targetFreePanY = 0;

        if (activeSectorIdx !== clamped) {
            activeSectorIdx = clamped;
            syncSectorUI(clamped, subIdx, false);
        } else {
            renderSubSelection(clamped, subIdx);
        }
    }

    syncSectorUI(0, 0, true);

    // =========================================================================
    // 9. MODAL CREATIVO DE OBJETOS PERDIDOS + PANEL PROFESIONAL DE BASES
    // =========================================================================
    const drawerBackdrop = document.getElementById('cosmosDrawerBackdrop');
    const drawerKicker = document.getElementById('drawerModalKicker');
    const drawerTitle = document.getElementById('drawerModalTitle');
    const drawerBody = document.getElementById('drawerModalBody');

    const ORPHAN_ITEMS_DB = [
        {
            name: 'Forro Polar Quechua Azul Marino (Talla 10)',
            cat: 'abrigo',
            planet: 'Avistado en el Albergue de Invierno',
            humor: 'Iniciales «M.G.» escritas con boli casi borrado. Nivel de nostalgia: 98%. Busca desesperadamente a su dueño antes de que llegue el frío.',
            survival: 'Sobreviviendo doblado en la balda 2'
        },
        {
            name: 'Cantimplora Laken Roja de Aluminio (1 Litro)',
            cat: 'menaje',
            planet: 'Órbita del Pinar de Antequera',
            humor: 'Con mosquetón plateado de combate y pegatina de un lobo aullando. Todavía conserva medio trago de agua fresca del manantial.',
            survival: 'Intacta y lista para otra ruta'
        },
        {
            name: 'Sudadera Roja Oficial Acrux 518 (Talla S)',
            cat: 'abrigo',
            planet: 'Base Central · Crtra. de Rueda, 53',
            humor: 'Huérfana de etiqueta con nombre. Si la miras fijamente a contraluz huele a humo de hoguera de campamento y gloria scout.',
            survival: 'En perfecto estado de revista'
        },
        {
            name: 'Pañoleta Carmesí y Blanca + Pasador de Cuero',
            cat: 'reliquia',
            planet: 'Explanada tras el Círculo de Despedida',
            humor: '¡Alerta Roja! Un acruxiano anda suelto sin su pañoleta. Custodiada con honores de estado en la sala de los Kraaletes.',
            survival: 'Máxima prioridad de rescate'
        },
        {
            name: 'Poto Metálico de Acampada + Tenedor Rebelde',
            cat: 'menaje',
            planet: 'Sector Fregaderos del Campamento',
            humor: 'Marcado con cinta aislante roja en el asa. Ha sobrevivido a tres raciones de macarrones con chorizo y sigue brillando.',
            survival: 'Veterano de mil batallas'
        },
        {
            name: 'Chubasquero Cortavientos Amarillo (Talla 12)',
            cat: 'abrigo',
            planet: 'Asiento 14 del Autobús de Vuelta',
            humor: 'Plegado dentro de su propio bolsillo como un auténtico profesional del camuflaje.',
            survival: '100% impermeable'
        },
        {
            name: 'Linterna Frontal LED Negra Kalenji',
            cat: 'menaje',
            planet: 'Pradera del Juego Nocturno',
            humor: 'Con pilas aún vivas. Ideal para encontrar el baño a las 3 de la mañana sin tropezar con los vientos de la tienda.',
            survival: 'Operativa al 100%'
        }
    ];

    function openDrawerModal(mode) {
        if (!drawerBackdrop) return;

        if (mode === 'lost') {
            drawerKicker.textContent = 'AGENCIA ESPACIAL DE RESCATE DE MOCHILAS (A.E.R.M. 518)';
            drawerTitle.innerHTML = '🛸 Radar de <span class="ice-italic">Objetos Perdidos</span>';
            drawerBody.innerHTML = `
                <p>Bienvenido al centro de control del <strong>Gran Baúl de Intendencia</strong>. Si reconoces a alguno de estos exploradores extraviados, pulsa <strong>«Lanzar Bengala de Rescate»</strong> y pásate a adoptarlo de vuelta cualquier <strong>sábado a las 16:30 h o 19:00 h</strong> por nuestra Base de Carretera de Rueda, 53:</p>
                <div style="display:flex; gap:0.75rem; flex-wrap:wrap; margin: 1.1rem 0;">
                    <input type="text" id="lostRadarSearch" class="dossier-form-input" placeholder="🔎 Escanear por nombre (polar, cantimplora, poto, pañoleta...)" style="flex:1; margin-bottom:0;">
                    <select id="lostRadarCat" class="dossier-form-input" style="width:auto; margin-bottom:0;">
                        <option value="all">✦ Toda la Nebulosa (7 objetos)</option>
                        <option value="abrigo">🧥 Abrigos y Sudaderas Fugitivas</option>
                        <option value="menaje">🥣 Menaje de Combate y Luz</option>
                        <option value="reliquia">⚜️ Reliquias Scouts (Pañoletas)</option>
                    </select>
                </div>
                <div id="lostFlareBanner" style="display:none; margin-bottom:1rem; padding:0.95rem 1.2rem; border-radius:12px; background:rgba(176,35,36,0.22); border:1px solid rgba(217,56,58,0.55); color:#FFFFFF;"></div>
                <div class="dossier-grid" id="lostRadarGrid"></div>
            `;

            const renderRadar = () => {
                const grid = document.getElementById('lostRadarGrid');
                const q = (document.getElementById('lostRadarSearch')?.value || '').toLowerCase().trim();
                const cat = document.getElementById('lostRadarCat')?.value || 'all';
                if (!grid) return;

                const list = ORPHAN_ITEMS_DB.filter(item => {
                    const matchCat = cat === 'all' || item.cat === cat;
                    const matchQ = !q || item.name.toLowerCase().includes(q) || item.planet.toLowerCase().includes(q) || item.humor.toLowerCase().includes(q);
                    return matchCat && matchQ;
                });

                grid.innerHTML = list.map((item) => `
                    <div class="dossier-card">
                        <span class="dossier-tag">📡 ${item.planet}</span>
                        <h3>${item.name}</h3>
                        <p>${item.humor}</p>
                        <div style="display:flex; align-items:center; justify-content:space-between; gap:0.5rem; margin-top:0.75rem;">
                            <span class="star-pillar-tag">⚡ ${item.survival}</span>
                            <button type="button" class="rescue-flare-btn" data-flare-item="${item.name}">🚀 ¡Es Mío! Lanzar Bengala</button>
                        </div>
                    </div>
                `).join('') || `<p>¡Órbita despejada! No hay objetos con esa descripción en el baúl.</p>`;

                grid.querySelectorAll('[data-flare-item]').forEach(btn => {
                    btn.addEventListener('click', () => {
                        const itemName = btn.getAttribute('data-flare-item');
                        const banner = document.getElementById('lostFlareBanner');
                        if (banner) {
                            banner.style.display = 'block';
                            banner.innerHTML = `<strong>🎆 ¡Bengala de Rescate enviada por «${itemName}»!</strong> Los Kraaletes de Intendencia te lo guardan en primera fila. Pásate este sábado a las 16:30 h o a las 19:00 h por la <strong>Base de Crtra. de Rueda, 53</strong> para el reencuentro.`;
                        }
                    });
                });
            };
            renderRadar();
            document.getElementById('lostRadarSearch')?.addEventListener('input', renderRadar);
            document.getElementById('lostRadarCat')?.addEventListener('change', renderRadar);

        } else if (mode === 'bases') {
            drawerKicker.textContent = 'SECTOR V · COORDENADAS OPERATIVAS E INSCRIPCIÓN';
            drawerTitle.innerHTML = 'Nuestras <span class="ice-italic">Bases y Contacto</span>';
            drawerBody.innerHTML = `
                <div class="dossier-grid" style="margin-bottom:1.5rem;">
                    <div class="dossier-card">
                        <span class="dossier-tag">BASE PRINCIPAL · VALLADOLID</span>
                        <h3>Carretera de Rueda, 53 (CP 47008)</h3>
                        <p>Centro neurálgico del Grupo Scout ACRUX 518. Aquí realizamos las reuniones de los sábados de <strong>16:30 a 19:00 h</strong>, las asambleas de familias y la intendencia de acampadas.</p>
                        <span class="star-pillar-tag">🕓 Sábados de 16:30 a 19:00 h</span>
                    </div>
                    <div class="dossier-card">
                        <span class="dossier-tag">BASES DE CAMPO Y MONTAÑA</span>
                        <h3>Naturaleza en Valladolid y Castilla y León</h3>
                        <p>Salidas frecuentes al <strong>Pinar de Antequera</strong>, <strong>Parque de las Contiendas</strong>, <strong>Ribera del Pisuerga</strong> y bases de campamento en las sierras de Castilla y León y el norte de España.</p>
                        <span class="star-pillar-tag">🌲 Naturaleza 100% Real</span>
                    </div>
                    <div class="dossier-card">
                        <span class="dossier-tag">COORDINACIÓN GENERAL</span>
                        <h3>Canal Directo con el Grupo</h3>
                        <p>Atención directa a familias y jóvenes por teléfono, WhatsApp, correo electrónico o redes oficiales:</p>
                        <div style="display:flex; flex-direction:column; gap:0.3rem; margin-top:0.5rem;">
                            <span class="star-pillar-tag">📞 JJ: 616 28 91 19</span>
                            <span class="star-pillar-tag">📞 Marta: 619 20 20 68 · Hugo</span>
                            <span class="star-pillar-tag">✉️ gruposcoutacrux518@gmail.com · @gsacrux518</span>
                        </div>
                    </div>
                </div>

                <div style="background:rgba(255,255,255,0.035); border:1px solid rgba(255,255,255,0.16); border-radius:16px; padding:1.35rem;">
                    <h3 style="font-family:'Outfit',sans-serif; color:#FFF; margin:0 0 0.4rem 0;">⚜️ Solicitar Sábado de Prueba Gratis (6 a 21 años)</h3>
                    <p style="margin:0 0 1rem 0; font-size:0.85rem;">Rellena estos datos para avisar al equipo de Coordinación y a los Kraaletes de su unidad correspondiente:</p>
                    <form id="basesContactForm">
                        <div class="dossier-grid" style="margin-bottom:0.85rem; margin-top:0;">
                            <input type="text" id="bcName" class="dossier-form-input" required placeholder="Nombre de madre, padre o joven" style="margin-bottom:0;">
                            <input type="tel" id="bcPhone" class="dossier-form-input" required placeholder="Teléfono / WhatsApp de contacto" style="margin-bottom:0;">
                            <select id="bcUnit" class="dossier-form-input" style="margin-bottom:0;">
                                <option value="Castores · Colonia Ohiensis (6-8 años)">1 · Castores · Colonia Ohiensis (6 a 8 años)</option>
                                <option value="Manada · Khanhiwara (8-11 años)">2 · Manada · Khanhiwara (8 a 11 años)</option>
                                <option value="Tropa · Lohengrin (11-14 años)">3 · Tropa · Lohengrin (11 a 14 años)</option>
                                <option value="Unidad Esculta · Trea (14-17 años)">4 · Unidad Esculta · Trea (14 a 17 años)</option>
                                <option value="Clan Rover · Ama Dablam (17-21 años)">5 · Clan Rover · Ama Dablam (17 a 21 años)</option>
                            </select>
                        </div>
                        <button type="submit" class="btn-cosmos-primary">Enviar Solicitud a Coordinación →</button>
                        <div id="bcSuccessMsg" style="display:none; margin-top:0.9rem; padding:0.9rem; border-radius:10px; background:rgba(176,35,36,0.22); border:1px solid rgba(217,56,58,0.55); color:#FFF;"></div>
                    </form>
                </div>
            `;

            document.getElementById('basesContactForm')?.addEventListener('submit', (e) => {
                e.preventDefault();
                const name = document.getElementById('bcName')?.value || '';
                const unit = document.getElementById('bcUnit')?.value || '';
                const msg = document.getElementById('bcSuccessMsg');
                if (msg) {
                    msg.style.display = 'block';
                    msg.innerHTML = `<strong>⚜️ ¡Solicitud lista, ${name}!</strong> Te esperamos este sábado a las 16:30 h en nuestra <strong>Base Principal de Carretera de Rueda, 53</strong> para probar con <strong>${unit}</strong>. También puedes escribir directamente por WhatsApp a JJ (<strong>616 28 91 19</strong>) o Marta (<strong>619 20 20 68</strong>).`;
                }
            });
        } else {
            const sec = SECTORS[0];
            drawerKicker.textContent = sec.code;
            drawerTitle.innerHTML = sec.headingHTML;
            drawerBody.innerHTML = `
                <p>${sec.desc}</p>
                <div class="dossier-grid">
                    ${sec.stars.map(st => `
                        <div class="dossier-card">
                            <span class="dossier-tag">${st.badge}</span>
                            <h3>${st.symbol} — ${st.title}</h3>
                            <p>${st.body}</p>
                        </div>
                    `).join('')}
                </div>
            `;
        }

        drawerBackdrop.classList.add('is-open');
        drawerBackdrop.setAttribute('aria-hidden', 'false');
    }

    function closeDrawerModal() {
        drawerBackdrop?.classList.remove('is-open');
        drawerBackdrop?.setAttribute('aria-hidden', 'true');
    }

    document.getElementById('btnCloseDrawer')?.addEventListener('click', closeDrawerModal);
    drawerBackdrop?.addEventListener('click', (e) => {
        if (e.target === drawerBackdrop) closeDrawerModal();
    });

    document.getElementById('btnOpenLostFoundCreative')?.addEventListener('click', () => {
        openLostSuperZoom(0);
    });
    document.getElementById('btnOpenBasesCreative')?.addEventListener('click', () => {
        goToSector(4, 0);
        openDrawerModal('bases');
    });
    document.getElementById('btnTopBasesCTA')?.addEventListener('click', () => {
        goToSector(4, 0);
        openDrawerModal('bases');
    });

    if (elPrimaryBtn) {
        elPrimaryBtn.addEventListener('click', () => {
            if (activeSectorIdx === 0) {
                goToSector(1, 0);
            } else if (activeSectorIdx === 1) {
                openUnitSuperZoom(selectedSubIdx);
            } else if (activeSectorIdx === 2) {
                openCampSuperZoom(selectedSubIdx);
            } else if (activeSectorIdx === 3) {
                openLostSuperZoom(selectedSubIdx === 0 ? 0 : selectedSubIdx - 1);
            } else if (activeSectorIdx === 4) {
                openDrawerModal('bases');
            }
        });
    }

    if (elModalBtn) {
        elModalBtn.addEventListener('click', () => {
            if (activeSectorIdx === 0) {
                openDrawerModal('identity');
            } else if (activeSectorIdx === 1) {
                goToSector(2, 0);
            } else if (activeSectorIdx === 2) {
                goToSector(3, 0);
            } else if (activeSectorIdx === 3) {
                goToSector(4, 0);
            } else {
                goToSector(0, 0);
            }
        });
    }

    // =========================================================================
    // 10. EVENTOS DEL MAPA ESTELAR (SCROLL, DRAG, CLIC EN ESTRELLA)
    // =========================================================================
    window.addEventListener('wheel', (e) => {
        if (drawerBackdrop?.classList.contains('is-open')) return;
        if (superZoomState) return;

        e.preventDefault();
        if (isOverviewMode) {
            isOverviewMode = false;
            document.body.classList.remove('is-overview-mode');
            elOverviewBtn?.classList.remove('active');
            if (elOverviewBtnText) elOverviewBtnText.textContent = 'Mapa Estelar Global';
        }

        targetFreePanX *= 0.6;
        targetFreePanY *= 0.6;

        const delta = clamp(e.deltaY, -120, 120);
        targetSectorProgress = clamp(targetSectorProgress + delta * 0.0024, 0, SECTORS.length - 1);
    }, { passive: false });

    window.addEventListener('pointermove', (e) => {
        const dx = e.clientX - pointer.x;
        const dy = e.clientY - pointer.y;
        pointer.x = e.clientX;
        pointer.y = e.clientY;

        if (pointer.isDown && !superZoomState) {
            pointer.dragMoved += Math.hypot(dx, dy);
            const invZ = 1 / Math.max(0.25, camera.zoom);
            targetFreePanX = clamp(targetFreePanX - dx * invZ, -2200, 2200);
            targetFreePanY = clamp(targetFreePanY - dy * invZ, -1600, 1600);
        }
    });

    canvas.addEventListener('pointerdown', (e) => {
        pointer.isDown = true;
        pointer.dragStartX = e.clientX;
        pointer.dragStartY = e.clientY;
        pointer.dragMoved = 0;
    });

    window.addEventListener('pointerup', (e) => {
        if (!pointer.isDown) return;
        pointer.isDown = false;

        if (pointer.dragMoved < 10) {
            let hitNode = pointer.hoveredNode;
            if (!hitNode) {
                let bestD = 68;
                for (let i = 0; i < worldNodes.length; i++) {
                    const n = worldNodes[i];
                    const d = Math.hypot(e.clientX - n.sx, e.clientY - n.sy);
                    if (d < bestD) {
                        bestD = d;
                        hitNode = n;
                    }
                }
            }
            if (hitNode) {
                if (hitNode.clusterType === 'unit') {
                    openUnitSuperZoom(hitNode.unitIndex);
                } else if (hitNode.clusterType === 'camp') {
                    openCampSuperZoom(hitNode.campIndex);
                } else if (hitNode.clusterType === 'sector') {
                    if (hitNode.sectorIndex === 3) {
                        openLostSuperZoom(typeof hitNode.cajonIndex === 'number' ? hitNode.cajonIndex : 0);
                    } else {
                        goToSector(hitNode.sectorIndex, hitNode.starIdx);
                        if (hitNode.sectorIndex === 0) openDrawerModal('identity');
                        if (hitNode.sectorIndex === 4) openDrawerModal('bases');
                    }
                }
            }
        }
    });

    document.querySelectorAll('[data-sector]').forEach(btn => {
        btn.addEventListener('click', () => {
            goToSector(parseInt(btn.getAttribute('data-sector'), 10), 0);
        });
    });

    document.getElementById('btnHomeConstellation')?.addEventListener('click', () => goToSector(0, 0));
    document.getElementById('btnPrevSector')?.addEventListener('click', () => {
        goToSector((activeSectorIdx - 1 + SECTORS.length) % SECTORS.length, 0);
    });
    document.getElementById('btnNextSector')?.addEventListener('click', () => {
        goToSector((activeSectorIdx + 1) % SECTORS.length, 0);
    });

    if (elOverviewBtn) {
        elOverviewBtn.addEventListener('click', () => {
            closeAllSuperZooms(false);
            isOverviewMode = !isOverviewMode;
            document.body.classList.toggle('is-overview-mode', isOverviewMode);
            elOverviewBtn.classList.toggle('active', isOverviewMode);
            if (elOverviewBtnText) {
                elOverviewBtnText.textContent = isOverviewMode ? 'Enfocar Sector' : 'Mapa Estelar Global';
            }
        });
    }

    const scrollTrack = document.getElementById('hudScrollTrack');
    if (scrollTrack) {
        scrollTrack.addEventListener('click', (e) => {
            if (e.target.classList.contains('rail-tick')) return;
            const rect = scrollTrack.getBoundingClientRect();
            const ratio = clamp((e.clientX - rect.left) / rect.width, 0, 1);
            closeAllSuperZooms(true);
            targetSectorProgress = ratio * (SECTORS.length - 1);
        });
    }

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (superZoomState) closeAllSuperZooms(true);
            if (drawerBackdrop?.classList.contains('is-open')) closeDrawerModal();
            return;
        }
        if (superZoomState || drawerBackdrop?.classList.contains('is-open')) return;

        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            goToSector(Math.min(SECTORS.length - 1, activeSectorIdx + 1), 0);
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            goToSector(Math.max(0, activeSectorIdx - 1), 0);
        } else if (e.key === 'm' || e.key === 'M') {
            elOverviewBtn?.click();
        }
    });

    const cursorDot = document.getElementById('cosmosCursorDot');
    const cursorRing = document.getElementById('cosmosCursorRing');
    const cursorLabel = document.getElementById('cosmosCursorLabel');

    document.querySelectorAll('button, a, input, select').forEach(el => {
        el.addEventListener('mouseenter', () => cursorRing?.classList.add('is-ui-hover'));
        el.addEventListener('mouseleave', () => cursorRing?.classList.remove('is-ui-hover'));
    });

    // =========================================================================
    // 11. BUCLE DE RENDERIZADO 60FPS · BLANCO PURO, ROJO SUTIL Y SALTO HIPERESPACIO
    // =========================================================================
    function worldToScreen(wx, wy) {
        const cx = (vw > 900 && !isOverviewMode && !superZoomState) ? vw * 0.63 : vw * 0.5;
        const cy = vh * 0.5;
        return {
            x: (wx - camera.x) * camera.zoom + cx,
            y: (wy - camera.y) * camera.zoom + cy
        };
    }

    const startTime = performance.now();

    function animate(now) {
        const elapsed = (now - startTime) * 0.001;

        pointer.lerpX += (pointer.x - pointer.lerpX) * 0.14;
        pointer.lerpY += (pointer.y - pointer.lerpY) * 0.14;

        if (cursorDot) cursorDot.style.transform = `translate3d(${pointer.x}px, ${pointer.y}px, 0)`;
        if (cursorRing) cursorRing.style.transform = `translate3d(${pointer.lerpX}px, ${pointer.lerpY}px, 0)`;

        const scrollDiff = targetSectorProgress - currentSectorProgress;
        currentSectorProgress += scrollDiff * 0.062;

        const nearestSec = clamp(Math.round(currentSectorProgress), 0, SECTORS.length - 1);
        if (!superZoomState && nearestSec !== activeSectorIdx) {
            activeSectorIdx = nearestSec;
            syncSectorUI(activeSectorIdx, 0, false);
        }

        if (elProgressFill) {
            const pct = (currentSectorProgress / (SECTORS.length - 1)) * 100;
            elProgressFill.style.width = `${clamp(pct, 0, 100).toFixed(1)}%`;
        }
        if (elProgressPercent) {
            elProgressPercent.textContent = `0${activeSectorIdx + 1} / 0${SECTORS.length}`;
        }

        freePanX += (targetFreePanX - freePanX) * 0.085;
        freePanY += (targetFreePanY - freePanY) * 0.085;

        if (superZoomState) {
            camera.targetX = superZoomState.wx;
            camera.targetY = superZoomState.wy;
            camera.targetZoom = superZoomState.zoom;
        } else if (isOverviewMode) {
            camera.targetX = 820 + freePanX * 0.35;
            camera.targetY = 360 + freePanY * 0.35;
            camera.targetZoom = Math.min(vw / 5400, vh / 3500);
        } else {
            const iFloor = clamp(Math.floor(currentSectorProgress), 0, SECTORS.length - 1);
            const iCeil = clamp(Math.ceil(currentSectorProgress), 0, SECTORS.length - 1);
            const tSeg = smoothstep(0, 1, currentSectorProgress - iFloor);

            const sA = SECTORS[iFloor];
            const sB = SECTORS[iCeil];

            const ix = lerp(sA.worldX, sB.worldX, tSeg);
            const iy = lerp(sA.worldY, sB.worldY, tSeg);
            const iz = lerp(sA.baseZoom, sB.baseZoom, tSeg);

            const parX = ((pointer.lerpX / vw) - 0.5) * 42;
            const parY = ((pointer.lerpY / vh) - 0.5) * 30;

            camera.targetX = ix + freePanX + parX;
            camera.targetY = iy + freePanY + parY;

            const travelWarp = Math.min(1, Math.abs(scrollDiff) * 0.8);
            camera.targetZoom = Math.max(0.55, iz - travelWarp * 0.24);
        }

        const prevCamX = camera.x;
        const prevCamY = camera.y;
        camera.x += (camera.targetX - camera.x) * (superZoomState ? 0.14 : 0.08);
        camera.y += (camera.targetY - camera.y) * (superZoomState ? 0.14 : 0.08);
        camera.zoom += (camera.targetZoom - camera.zoom) * (superZoomState ? 0.12 : 0.075);
        camera.vx = camera.x - prevCamX;
        camera.vy = camera.y - prevCamY;

        if (elTelZoom) {
            elTelZoom.textContent = superZoomState
                ? `${camera.zoom.toFixed(1)}x · HIPERESPACIO`
                : `${camera.zoom.toFixed(2)}x · Órbita Estelar`;
        }

        // Progreso del salto al Hiperespacio (estilo Star Wars ligero)
        let hyperIntensity = 0;
        let hyperOrigin = { x: vw * 0.5, y: vh * 0.5 };
        if (hyperspaceJump) {
            const p = (now - hyperspaceJump.start) / hyperspaceJump.duration;
            if (p >= 1) {
                hyperspaceJump = null;
            } else {
                hyperIntensity = Math.sin(clamp(p, 0, 1) * Math.PI);
                hyperOrigin = worldToScreen(hyperspaceJump.wx, hyperspaceJump.wy);
                hyperOrigin.x = clamp(hyperOrigin.x, vw * 0.2, vw * 0.8);
                hyperOrigin.y = clamp(hyperOrigin.y, vh * 0.2, vh * 0.8);
            }
        }

        // ---------------------------------------------------------------------
        // A. FONDO ABISAL MONOCROMÁTICO (#040406 + #08090D) Y SACO DE CARBÓN
        // ---------------------------------------------------------------------
        ctx.fillStyle = '#040406';
        ctx.fillRect(0, 0, vw, vh);

        const gradCursor = ctx.createRadialGradient(
            pointer.lerpX,
            pointer.lerpY,
            10,
            pointer.lerpX,
            pointer.lerpY,
            Math.max(vw, vh) * 0.7
        );
        gradCursor.addColorStop(0, '#0D0F15');
        gradCursor.addColorStop(0.55, '#07080C');
        gradCursor.addColorStop(1, 'rgba(4, 4, 6, 0)');
        ctx.fillStyle = gradCursor;
        ctx.fillRect(0, 0, vw, vh);

        // Nebulosa Oscura del Saco de Carbón junto a Acrux en Sector I
        const coalScreen = worldToScreen(-155, 135);
        const coalR = 135 * Math.min(2, camera.zoom);
        if (coalScreen.x + coalR > 0 && coalScreen.x - coalR < vw && coalScreen.y + coalR > 0 && coalScreen.y - coalR < vh) {
            const coalGrad = ctx.createRadialGradient(coalScreen.x, coalScreen.y, coalR * 0.15, coalScreen.x, coalScreen.y, coalR);
            coalGrad.addColorStop(0, 'rgba(1, 1, 2, 0.92)');
            coalGrad.addColorStop(0.7, 'rgba(2, 2, 4, 0.65)');
            coalGrad.addColorStop(1, 'rgba(4, 4, 6, 0)');
            ctx.fillStyle = coalGrad;
            ctx.beginPath();
            ctx.ellipse(coalScreen.x, coalScreen.y, coalR * 0.92, coalR * 1.15, -0.22, 0, Math.PI * 2);
            ctx.fill();
        }

        // ---------------------------------------------------------------------
        // B. HILO SUTIL ENTRE SECTORES DEL MAPA ESTELAR
        // ---------------------------------------------------------------------
        ctx.save();
        ctx.beginPath();
        SECTORS.forEach((sec, idx) => {
            const sc = worldToScreen(sec.worldX, sec.worldY);
            if (idx === 0) ctx.moveTo(sc.x, sc.y);
            else ctx.lineTo(sc.x, sc.y);
        });
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 10]);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.restore();

        // ---------------------------------------------------------------------
        // C. ESTRELLAS DE CAMPO CON PARALLAX Y ESTELAS RADIALES DE HIPERESPACIO (STAR WARS LIGHT)
        // ---------------------------------------------------------------------
        const camSpeed = Math.hypot(camera.vx, camera.vy);
        const warpFactor = Math.min(22, camSpeed * 0.35);

        for (let i = 0; i < bgStars.length; i++) {
            const fs = bgStars[i];
            let sx = ((fs.bx - camera.x * fs.parallax) * (0.4 + 0.6 * Math.min(1.6, camera.zoom))) + vw * 0.5 + fs.ox;
            let sy = ((fs.by - camera.y * fs.parallax) * (0.4 + 0.6 * Math.min(1.6, camera.zoom))) + vh * 0.5 + fs.oy;

            const wrapW = vw + 200;
            const wrapH = vh + 200;
            sx = ((sx + 100) % wrapW + wrapW) % wrapW - 100;
            sy = ((sy + 100) % wrapH + wrapH) % wrapH - 100;

            const dxC = sx - pointer.lerpX;
            const dyC = sy - pointer.lerpY;
            const dC = Math.hypot(dxC, dyC);
            if (dC < 135 && dC > 0.1) {
                const push = Math.pow(1 - dC / 135, 2) * 1.2 * fs.parallax;
                fs.vx += (dxC / dC) * push;
                fs.vy += (dyC / dC) * push;
            }
            fs.vx += (-fs.ox) * 0.04;
            fs.vy += (-fs.oy) * 0.04;
            fs.vx *= 0.88;
            fs.vy *= 0.88;
            fs.ox += fs.vx;
            fs.oy += fs.vy;

            const tw = 0.68 + 0.32 * Math.sin(elapsed * fs.twSpeed + fs.twPhase);
            ctx.fillStyle = fs.tint;
            ctx.globalAlpha = fs.alpha * tw;

            if (hyperIntensity > 0.04) {
                // Estiramiento radial hacia afuera desde la estrella objetivo (efecto Star Wars ligero)
                const rx = sx - hyperOrigin.x;
                const ry = sy - hyperOrigin.y;
                const rDist = Math.max(12, Math.hypot(rx, ry));
                const streakLen = hyperIntensity * (22 + rDist * 0.22) * (0.45 + fs.parallax);
                const ux = rx / rDist;
                const uy = ry / rDist;

                ctx.beginPath();
                ctx.moveTo(sx, sy);
                ctx.lineTo(sx + ux * streakLen, sy + uy * streakLen);
                ctx.strokeStyle = fs.tint;
                ctx.lineWidth = fs.size * (1 + hyperIntensity * 0.45);
                ctx.stroke();
            } else if (warpFactor > 1.4 && fs.layer > 0) {
                ctx.beginPath();
                ctx.moveTo(sx, sy);
                ctx.lineTo(sx - camera.vx * fs.parallax * 0.28, sy - camera.vy * fs.parallax * 0.28);
                ctx.strokeStyle = fs.tint;
                ctx.lineWidth = fs.size;
                ctx.stroke();
            } else {
                ctx.beginPath();
                ctx.arc(sx, sy, fs.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // Túnel ligero de líneas de luz en el salto al Hiperespacio
        if (hyperIntensity > 0.03) {
            ctx.save();
            ctx.lineCap = 'round';
            const maxR = Math.hypot(vw, vh) * 0.65;
            for (let i = 0; i < hyperspaceStreaks.length; i++) {
                const st = hyperspaceStreaks[i];
                const travel = (1 - Math.cos(hyperIntensity * Math.PI * 0.5)) * st.speed * 180;
                const rStart = st.baseDist + travel;
                const streakL = (35 + rStart * 0.38) * hyperIntensity * st.lenFactor;
                if (rStart > maxR) continue;

                const cosA = Math.cos(st.angle);
                const sinA = Math.sin(st.angle);
                const x1 = hyperOrigin.x + cosA * rStart;
                const y1 = hyperOrigin.y + sinA * rStart;
                const x2 = hyperOrigin.x + cosA * (rStart + streakL);
                const y2 = hyperOrigin.y + sinA * (rStart + streakL);

                ctx.globalAlpha = st.alpha * hyperIntensity * 0.72;
                ctx.strokeStyle = st.tint;
                ctx.lineWidth = st.width;
                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.stroke();
            }
            ctx.restore();
        }
        ctx.globalAlpha = 1;

        // ---------------------------------------------------------------------
        // D. FÍSICA DE NODOS ESTELARES Y DETECCIÓN DE HOVER PARA SUPER-ZOOM
        // ---------------------------------------------------------------------
        let closestNode = null;
        let closestDist = 9999;

        for (let i = 0; i < worldNodes.length; i++) {
            const nd = worldNodes[i];
            const fx = Math.cos(elapsed * nd.speedX + nd.phaseX) * nd.amp;
            const fy = Math.sin(elapsed * nd.speedY + nd.phaseY) * nd.amp;

            const prelim = worldToScreen(nd.wx, nd.wy);
            const dxM = pointer.lerpX - prelim.x;
            const dyM = pointer.lerpY - prelim.y;
            const dM = Math.hypot(dxM, dyM);

            let pullX = 0;
            let pullY = 0;
            if (!superZoomState && dM < 145) {
                const f = Math.pow(1 - dM / 145, 2);
                pullX = (dxM / Math.max(0.4, camera.zoom)) * f * 0.26;
                pullY = (dyM / Math.max(0.4, camera.zoom)) * f * 0.26;
                nd.hover += (f - nd.hover) * 0.18;

                if (dM < 52 && dM < closestDist) {
                    closestDist = dM;
                    closestNode = nd;
                }
            } else {
                nd.hover += (0 - nd.hover) * 0.1;
            }

            nd.vx += (nd.anchorX + fx + pullX - nd.wx) * 0.095;
            nd.vy += (nd.anchorY + fy + pullY - nd.wy) * 0.095;
            nd.vx *= 0.82;
            nd.vy *= 0.82;
            nd.wx += nd.vx;
            nd.wy += nd.vy;

            const sc = worldToScreen(nd.wx, nd.wy);
            nd.sx = sc.x;
            nd.sy = sc.y;
        }

        pointer.hoveredNode = closestNode;
        if (cursorRing) cursorRing.classList.toggle('is-star-hover', Boolean(closestNode));
        if (cursorLabel) {
            if (closestNode) {
                cursorLabel.textContent = (closestNode.clusterType === 'unit' || closestNode.clusterType === 'camp' || closestNode.sectorIndex === 3)
                    ? `✦ HIPERESPACIO A: ${closestNode.symbol}`
                    : `✦ ${closestNode.symbol}`;
            } else {
                cursorLabel.textContent = '';
            }
        }

        // ---------------------------------------------------------------------
        // E. LÍNEAS DE CONSTELACIÓN (BLANCO PURO CON TOQUE ROJO MUY SUTIL)
        // ---------------------------------------------------------------------
        for (let i = 0; i < worldEdges.length; i++) {
            const ed = worldEdges[i];
            const ax = ed.nodeA.sx;
            const ay = ed.nodeA.sy;
            const bx = ed.nodeB.sx;
            const by = ed.nodeB.sy;

            if (Math.max(ax, bx) < -150 || Math.min(ax, bx) > vw + 150 ||
                Math.max(ay, by) < -150 || Math.min(ay, by) > vh + 150) {
                continue;
            }

            const mx = (ax + bx) * 0.5;
            const my = (ay + by) * 0.5;
            const dxC = pointer.lerpX - mx;
            const dyC = pointer.lerpY - my;
            const dMid = Math.hypot(dxC, dyC);

            let bendX = 0;
            let bendY = 0;
            if (!superZoomState && dMid < 160) {
                const inf = Math.pow(1 - dMid / 160, 1.6);
                bendX = dxC * inf * 0.28;
                bendY = dyC * inf * 0.28;
                ed.glow += (inf - ed.glow) * 0.2;
            } else {
                ed.glow += (0 - ed.glow) * 0.1;
            }

            ed.vx += (bendX - ed.ctrlX) * 0.14;
            ed.vy += (bendY - ed.ctrlY) * 0.14;
            ed.vx *= 0.78;
            ed.vy *= 0.78;
            ed.ctrlX += ed.vx;
            ed.ctrlY += ed.vy;

            const isFocusedSector = ed.sectorIndex === activeSectorIdx;
            const alpha = Math.min(0.92, (isFocusedSector ? 0.52 : 0.2) + ed.glow * 0.42);

            ctx.save();
            ctx.beginPath();
            ctx.moveTo(ax, ay);
            ctx.quadraticCurveTo(mx + ed.ctrlX, my + ed.ctrlY, bx, by);
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha.toFixed(3)})`;
            ctx.lineWidth = (isFocusedSector ? 1.35 : 0.85) + ed.glow * 1.1;
            if (ed.glow > 0.08 || isFocusedSector) {
                const isPureWhiteSector = ed.sectorIndex === 1 || ed.sectorIndex === 2 || ed.sectorIndex === 3;
                ctx.shadowColor = (!isPureWhiteSector && ed.glow > 0.2) ? 'rgba(217, 56, 58, 0.55)' : 'rgba(255, 255, 255, 0.55)';
                ctx.shadowBlur = 8 + ed.glow * 10;
            }
            ctx.stroke();
            ctx.restore();
        }

        // ---------------------------------------------------------------------
        // F. DIBUJO DE ESTRELLAS (COLORES EN UNIDADES, ROJO ACRUX EN «EL BAÚL», BLANCO EN CAMPAMENTOS Y CAJONES)
        // ---------------------------------------------------------------------
        for (let i = 0; i < worldNodes.length; i++) {
            const nd = worldNodes[i];
            const sx = nd.sx;
            const sy = nd.sy;

            if (sx < -250 || sx > vw + 250 || sy < -250 || sy > vh + 250) continue;

            const isHovered = pointer.hoveredNode === nd;
            const isSelectedInSector = (nd.sectorIndex === activeSectorIdx) && (
                (nd.clusterType === 'unit' && nd.unitIndex === selectedSubIdx) ||
                (nd.clusterType === 'camp' && nd.campIndex === selectedSubIdx) ||
                (nd.clusterType === 'sector' && nd.starIdx === selectedSubIdx)
            );

            // Campamentos (2) y las mini-estrellas de Cajones (sector 3 pero no El Baúl) van en blanco puro sin color
            const isPureWhiteStar = nd.sectorIndex === 2 || (nd.sectorIndex === 3 && !nd.isBaulMain);

            const scale = superZoomState
                ? clamp(camera.zoom * 0.72, 1.0, 22.0)
                : clamp(camera.zoom, 0.55, 2.2);
            const r = (nd.r || 5) * scale + nd.hover * 3.2;

            // Halo radial
            const glowR = r * (nd.isMainCross || nd.isClusterHub || isHovered ? 4.8 : 3.2);
            const g = ctx.createRadialGradient(sx, sy, 0, sx, sy, glowR);
            g.addColorStop(0, '#FFFFFF');
            g.addColorStop(
                0.35,
                nd.isBaulMain
                    ? (isHovered || isSelectedInSector ? 'rgba(217, 56, 58, 0.30)' : 'rgba(217, 56, 58, 0.16)')
                    : (nd.clusterType === 'unit'
                        ? (isHovered || isSelectedInSector ? (nd.ringColor || 'rgba(255, 255, 255, 0.22)') : (nd.halo || 'rgba(255, 255, 255, 0.12)'))
                        : (isPureWhiteStar
                            ? (isHovered || isSelectedInSector ? 'rgba(255, 255, 255, 0.28)' : 'rgba(255, 255, 255, 0.16)')
                            : ((isHovered || isSelectedInSector)
                                ? 'rgba(217, 56, 58, 0.30)'
                                : (nd.halo || 'rgba(255, 255, 255, 0.18)'))))
            );
            g.addColorStop(1, 'rgba(255, 255, 255, 0)');
            ctx.fillStyle = g;
            ctx.beginPath();
            ctx.arc(sx, sy, glowR, 0, Math.PI * 2);
            ctx.fill();

            // Anillo orbital: en Unidades usa el color sutil de cada rama; en «El Baúl» usa rojo Acrux sutil; en Campamentos y Cajones blanco puro
            if ((nd.isClusterHub || isHovered) && !superZoomState) {
                const ringR = r * 1.95 + Math.sin(elapsed * 2.6 + i) * 1.2;
                let ringStroke;
                if (nd.isBaulMain) {
                    ringStroke = (isHovered || isSelectedInSector) ? 'rgba(224, 82, 84, 0.70)' : 'rgba(217, 56, 58, 0.40)';
                } else if (nd.clusterType === 'unit') {
                    // Colores sutiles y elegantes para las ramas
                    ringStroke = (isHovered || isSelectedInSector)
                        ? (nd.hoverRingColor || 'rgba(255, 255, 255, 0.65)')
                        : (nd.ringColor || 'rgba(255, 255, 255, 0.35)');
                } else if (isPureWhiteStar) {
                    ringStroke = (isHovered || isSelectedInSector) ? 'rgba(255, 255, 255, 0.75)' : 'rgba(255, 255, 255, 0.26)';
                } else {
                    ringStroke = (isHovered || isSelectedInSector) ? 'rgba(224, 82, 84, 0.65)' : 'rgba(255, 255, 255, 0.26)';
                }
                ctx.strokeStyle = ringStroke;
                ctx.lineWidth = isHovered ? 1.25 : 0.95;
                ctx.beginPath();
                ctx.arc(sx, sy, ringR, 0, Math.PI * 2);
                ctx.stroke();
            }

            // Núcleo blanco puro
            ctx.fillStyle = '#FFFFFF';
            ctx.beginPath();
            ctx.arc(sx, sy, r * 0.5, 0, Math.PI * 2);
            ctx.fill();

            // Etiqueta astronómica
            if (!superZoomState && nd.symbol && (nd.sectorIndex === activeSectorIdx || isHovered || isOverviewMode)) {
                if (isOverviewMode && !nd.isClusterHub && !nd.isMainCross) continue;
                ctx.save();
                ctx.font = (nd.isBaulMain || nd.isClusterHub || nd.isMainCross || isHovered)
                    ? '600 12px "JetBrains Mono", monospace'
                    : '400 10.5px "JetBrains Mono", monospace';
                ctx.fillStyle = (isHovered || isSelectedInSector)
                    ? '#FFFFFF'
                    : 'rgba(255, 255, 255, 0.74)';
                ctx.fillText(nd.symbol, sx + r * 1.35 + 7, sy + 4);
                ctx.restore();
            }
        }

        requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
})();

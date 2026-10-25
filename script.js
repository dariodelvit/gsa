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
   - Sector IV: «El Baúl» de Objetos Perdidos (Cajones = carpetas de Google Drive)
   - Sector V: Bases y Contacto (Bases operativas en Valladolid y contacto directo)
   - Modo 50 Aniversario (1976–2026): cometa dorado + espiral áurea de 50 estrellas
   ========================================================================== */
(function initAcruxGlobalStarMapEngine() {
    const canvas = document.getElementById('cosmosCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const DRIVE_API_URL = "https://script.google.com/macros/s/AKfycbwqriYYi3qdBRlNFXwYTpcCTeNn6WJUF5P8Mkwyy1YEPMCM57SVZoYin1GHbvi2A18H/exec";

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
    // 2. CAMPAMENTOS CONECTADOS COMO UNA CONSTELACIÓN (100% DINÁMICOS DESDE GOOGLE DRIVE)
    // =========================================================================
    const CAMPS_ORIGIN_X = 2520;
    const CAMPS_ORIGIN_Y = 980;

    // Inicialmente vacío: cero campamentos hardcodeados; solo se puebla con carpetas reales de Drive
    let CAMPS_DATA = [];
    let CAMPS_CONSTELLATION_EDGES = [];

    // =========================================================================
    // 2B. ESTRELLA DE OBJETOS PERDIDOS («EL BAÚL») Y SUS MINI-ESTRELLAS (CAJONES DRIVE 100% DINÁMICOS)
    // =========================================================================
    // Inicialmente vacío: cero cajones inventados; solo se puebla con carpetas reales de Drive
    let LOST_CAJONES_DATA = [];

    // =========================================================================
    // 2C. MODO 50 ANIVERSARIO (1976 - 2026) · ESPIRAL ÁUREA Y CONECTOR GOOGLE DRIVE
    // =========================================================================
    const DRIVE_ANNIVERSARY_FOLDER = '05_50_ANIVERSARIO';
    const DRIVE_ANNIVERSARY_URL = 'https://drive.google.com/drive/u/0/my-drive';

    // Archivo de recuerdos históricos representativos (con fotos reales y mock data lista para Drive)
    const ANNIVERSARY_HIGHLIGHTS = {
        1976: {
            title: 'Los Primeros Pasos · La Semilla de Acrux',
            desc: 'Primeros encuentros y campamento experimental en Valladolid para fundar un nuevo grupo scout basado en la autonomía de patrullas, el voluntariado juvenil y el contacto vivo con la naturaleza.',
            photoUrl: 'images/DSC_066412.jpg'
        },
        1977: {
            title: 'Fundación Oficial del Grupo Scout ACRUX 518',
            desc: 'Constitución oficial del grupo e inscripción en ASDE Exploradores de Castilla y León. Nace nuestra insignia estelar inspirada en la Cruz del Sur y la pañoleta carmesí (#B02324) con borde blanco nieve.',
            photoUrl: 'images/DSC_059812.jpg'
        },
        1980: {
            title: 'I Gran Campamento de Verano en Alta Montaña',
            desc: 'Quince días de vida comunitaria en tiendas cónicas en la Cordillera Cantábrica. Primeras construcciones de pionerismo en troncos de madera y sisal levantadas por los troperos.',
            photoUrl: 'images/DSC_064012.jpg'
        },
        1983: {
            title: 'La Travesía del Espigüete y Raids de Patrulla',
            desc: 'Primer gran ascenso alpino del grupo en la Montaña Palentina. Se instaura la tradición de los cuadernos de caza de patrulla y las veladas de estrellas.',
            photoUrl: 'images/DSC_3166.jpg'
        },
        1987: {
            title: 'Bautismo del Refugio de Montaña e Invierno Blanco',
            desc: 'Se consolida la base de campamentos de invierno en refugios forestales de Castilla y León, con juegos de rastreo en nieve y canciones tradicionales.',
            photoUrl: 'images/DSC_04051.jpg'
        },
        1991: {
            title: 'Expansión de la Manada Khanhiwara',
            desc: 'La rama de lobatos (8 a 11 años) alcanza las cuatro seisenas completas en torno a la Roca del Consejo bajo el marco del Libro de las Tierras Vírgenes.',
            photoUrl: 'images/DSC_058812.jpg'
        },
        1995: {
            title: 'Nacimiento de la Colonia de Castores Ohiensis',
            desc: 'Apertura de la rama menor (6 a 8 años) ambientada en «La Vida en el Estanque». Se construye la primera Presa simbólica sobre el río Gran Hermano.',
            photoUrl: 'images/DSC_066412.jpg'
        },
        1999: {
            title: 'Gran Campamento Fin de Siglo en Pirineos',
            desc: 'Convivencia histórica de todo el grupo a los pies del Aneto y Monte Perdido, combinando marchas volantes de pionerismo con talleres ambientales.',
            photoUrl: 'images/DSC_3166.jpg'
        },
        2003: {
            title: 'Apertura de la Ruta Esculta por la Canal de Trea',
            desc: 'Bautismo oficial de la Unidad Esculta Trea tras completar la exigente ascensión de la Canal de Trea en los Picos de Europa.',
            photoUrl: 'images/DSC_059812.jpg'
        },
        2007: {
            title: 'Centenario Mundial del Escultismo',
            desc: 'Amanecer Scout simultáneo en la Plaza Mayor de Valladolid para renovar la Promesa Scout junto a miles de scouts de todo el planeta.',
            photoUrl: 'images/DSC_064012.jpg'
        },
        2011: {
            title: 'Pionerismo y Puentes Levadizos de Tropa',
            desc: 'Construcción récord de una torre de vigía de 6 metros y puente basculante en madera sin un solo clavo, solo cuerdas y amarres de técnica scout.',
            photoUrl: 'images/DSC_04051.jpg'
        },
        2016: {
            title: 'Inauguración de la Base Central · Crtra. de Rueda, 53',
            desc: 'Apertura de nuestro centro neurálgico definitivo en Valladolid, con almacén de intendencia, salas de ramas y patio de actividades.',
            photoUrl: 'images/DSC_058812.jpg'
        },
        2020: {
            title: 'El Gran Fuego Virtual y Resiliencia Acruxiana',
            desc: 'Durante los meses de confinamiento, el Kraalete mantuvo actividades scouts online cada sábado, demostrando que el escultismo vive en las personas.',
            photoUrl: 'images/DSC_066412.jpg'
        },
        2024: {
            title: 'Campamento Cumbres del Norte · Familia Acrux',
            desc: 'Más de 130 acruxianos acampados en pradera alpina con el círculo general de pañoletas carmesí y la gran fiesta comunitaria de familias.',
            photoUrl: 'images/DSC_059812.jpg'
        },
        2026: {
            title: '50º Aniversario de Oro (1976 - 2026) · Medio Siglo de Vida',
            desc: 'Medio siglo educando en valores, construyendo hermandad y dejando el mundo en mejores condiciones de cómo lo encontramos. ¡Siempre Listos!',
            photoUrl: 'images/DSC_066412.jpg'
        }
    };

    // Estructura de Datos de exactamente 50 Estrellas (1976 a 2026)
    // Conector preparado para leer de la carpeta Google Drive 05_50_ANIVERSARIO
    const aniversarioFotos = [];
    const ANNIVERSARY_TOTAL_STARS = 50;

    for (let i = 0; i < ANNIVERSARY_TOTAL_STARS; i++) {
        const year = Math.round(1976 + (i * 50 / (ANNIVERSARY_TOTAL_STARS - 1)));
        const highlight = ANNIVERSARY_HIGHLIGHTS[year];
        const isUnlocked = Boolean(highlight && highlight.photoUrl);

        // Geometría de espiral áurea armónica y compacta alrededor de la Cruz del Sur (Sector I)
        const spiralProgress = i / (ANNIVERSARY_TOTAL_STARS - 1);
        const theta = -1.25 + spiralProgress * (3.15 * Math.PI);
        const radius = 155 * Math.pow(420 / 155, spiralProgress);
        const wx = Math.round(Math.cos(theta) * radius);
        const wy = Math.round(Math.sin(theta) * radius);

        aniversarioFotos.push({
            index: i,
            year,
            title: highlight ? highlight.title : `Crónica Scout del Año ${year}`,
            desc: highlight ? highlight.desc : `Recuerdo histórico del Grupo Scout ACRUX 518 correspondiente al año scout ${year}. Archivo fotográfico y testimonios en fase de catalogación comunitaria en Google Drive.`,
            photoUrl: highlight ? highlight.photoUrl : null,
            driveFolder: DRIVE_ANNIVERSARY_FOLDER,
            driveUrl: DRIVE_ANNIVERSARY_URL,
            isUnlocked,
            wx,
            wy,
            sx: 0,
            sy: 0,
            r: isUnlocked ? 5.6 : 4.2,
            hover: 0
        });
    }

    // =========================================================================
    // 2D. MOTOR DEL COMETA DORADO Y ESTADO DEL 50º ANIVERSARIO (ORO Y OBSIDIANA)
    // =========================================================================
    let anniversaryMode = false;
    let anniversaryLerp = 0.0;
    let targetAnniversaryLerp = 0.0;

    const COMET_TRAJECTORIES = [
        { x0: 680, y0: -420, x1: -620, y1: 380 },   // Superior-Derecha a Inferior-Izquierda
        { x0: -640, y0: -360, x1: 650, y1: 390 },   // Superior-Izquierda a Inferior-Derecha
        { x0: 550, y0: 380, x1: -580, y1: -360 },   // Inferior-Derecha a Superior-Izquierda
        { x0: -560, y0: 400, x1: 620, y1: -320 }    // Inferior-Izquierda a Superior-Derecha
    ];

    const goldenComet = {
        state: 'waiting',          // 'waiting' | 'flying'
        waitTimer: 2.2,            // Primer pase a los 2.2s de cargar
        flightDuration: 3.6,       // Duración del cruce: 3.6s (fluido, majestuoso y accesible como easter egg)
        flightProgress: 0,
        currentTraj: null,
        wx: -9999,
        wy: -9999,
        sx: -9999,
        sy: -9999,
        vx: 0,
        vy: 0,
        r: 3.2,
        alpha: 0,
        hover: 0,
        isHovered: false,
        trail: [],
        sparks: []
    };

    const supernovaShockwave = {
        active: false,
        originX: 0,
        originY: 0,
        radius: 0,
        maxRadius: 1000,
        startTime: 0,
        duration: 850,
        particles: []
    };

    let hoveredAnniversaryStar = null;

    function toggleAnniversaryMode(fromClick = true, originScreenX = 0, originScreenY = 0) {
        anniversaryMode = !anniversaryMode;
        targetAnniversaryLerp = anniversaryMode ? 1.0 : 0.0;

        // Disparar onda expansiva de supernova circular de polvo de oro a 60fps
        supernovaShockwave.active = true;
        supernovaShockwave.originX = originScreenX || (vw * 0.5);
        supernovaShockwave.originY = originScreenY || (vh * 0.5);
        supernovaShockwave.radius = 0;
        supernovaShockwave.maxRadius = Math.hypot(vw, vh) * 1.25;
        supernovaShockwave.startTime = performance.now();
        supernovaShockwave.duration = 1100;
        supernovaShockwave.particles = [];

        // Generar partículas de polvo de oro que viajan con el frente de onda
        for (let p = 0; p < 80; p++) {
            const angle = (p / 80) * Math.PI * 2 + (Math.random() - 0.5) * 0.08;
            const speed = 0.85 + Math.random() * 0.45;
            supernovaShockwave.particles.push({
                angle,
                speed,
                distFactor: 0.85 + Math.random() * 0.3,
                size: 1.4 + Math.random() * 2.8,
                alpha: 0.65 + Math.random() * 0.35,
                color: Math.random() > 0.4 ? '#FFF3B0' : (Math.random() > 0.5 ? '#D4AF37' : '#F3E5AB')
            });
        }

        document.body.classList.toggle('anniversary-50-mode', anniversaryMode);
        if (elCoordsReadout) {
            elCoordsReadout.textContent = anniversaryMode
                ? 'EDICIÓN DE ORO · 50 ANIVERSARIO (1976 - 2026)'
                : 'VALLADOLID · DESDE 1977';
        }
    }
    window.toggleAnniversaryMode = toggleAnniversaryMode;
    window.aniversarioFotos = aniversarioFotos;
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
            primaryBtnText: '✦ Entrar en la Estrella de esta Unidad (Super-Zoom)'
        },
        {
            index: 2,
            roman: 'III',
            code: 'SECTOR III / V · CONSTELACIÓN DE CAMPAMENTOS',
            subtitle: 'CADA ESTRELLA ES UN CAMPAMENTO · CLIC PARA SUPER-ZOOM A SU TAB',
            coords: 'RA 19h 12m · DEC -24° 50\'',
            headingHTML: 'Constelación de <span class="ice-italic">Campamentos</span>',
            desc: 'Actualmente no hay carpetas de campamentos publicadas en el Google Drive del grupo.',
            worldX: CAMPS_ORIGIN_X,
            worldY: CAMPS_ORIGIN_Y,
            baseZoom: 1.02,
            primaryBtnText: '✦ Entrar en la Estrella del Campamento (Super-Zoom)',
            stars: [],
            edges: []
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
            stars: [
                {
                    id: 'estrella-el-baul',
                    symbol: '✦ El Baúl',
                    dx: 0,
                    dy: 0,
                    r: 7.6,
                    color: '#FFFFFF',
                    halo: 'rgba(217, 56, 58, 0.20)',
                    isBaulMain: true,
                    isClusterHub: true,
                    cajonIndex: 0,
                    starIdx: 0,
                    badge: '✦ Estrella Principal · Objetos Perdidos',
                    title: '✦ El Baúl · Estrella de Objetos Perdidos (Google Drive)',
                    body: 'Haz clic en «El Baúl» para adentrarte en su interior y explorar los cajones sincronizados con Google Drive.',
                    pillars: ['📁 Google Drive / Objetos Perdidos', 'Sincronizado en tiempo real', 'Clic para entrar a «El Baúl»']
                }
            ],
            edges: []
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

    // Estrellas secundarias del campo de Campamentos para enriquecer la constelación
    const campFieldExtras = [
        { dx: -540, dy: -95, r: 2.6, symbol: '' },
        { dx: -340, dy: 125, r: 2.9, symbol: '' },
        { dx: -110, dy: -145, r: 2.7, symbol: '' },
        { dx: 140, dy: 135, r: 2.8, symbol: '' },
        { dx: 390, dy: -155, r: 3.0, symbol: '' },
        { dx: 580, dy: 75, r: 2.7, symbol: '' }
    ];
    registerStarCluster(campFieldExtras, [], CAMPS_ORIGIN_X, CAMPS_ORIGIN_Y, {
        sectorIndex: 2,
        clusterType: 'camp-field'
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

    // 3. Registrar Sector III: CONSTELACIÓN DE CAMPAMENTOS CONECTADOS (100% DINÁMICO DESDE GOOGLE DRIVE)
    const GREEK_ALPHABET = ['α', 'β', 'γ', 'δ', 'ε', 'ζ', 'η', 'θ', 'ι', 'κ', 'λ', 'μ', 'ν', 'ξ', 'ο', 'π', 'ρ', 'σ', 'τ', 'υ', 'φ', 'χ', 'ψ', 'ω'];
    let hasBothCampsConstellations = false;

    // Clasificador inteligente para diferenciar Campamentos de Verano vs Semana Santa / Primavera
    function detectCampSeason(camp) {
        const raw = `${camp.name || ''} ${camp.driveFolderName || ''} ${camp.desc || ''} ${camp.location || ''} ${camp.season || ''}`.toLowerCase();

        // 1. Detección explícita por palabras clave de Semana Santa / Primavera
        if (/(semana\s*santa|\bss\b|pascua|primavera|acampada)/i.test(raw)) {
            return 'easter';
        }
        // 2. Detección explícita por palabras clave de Verano
        if (/(verano|estival|julio|agosto|campamento\s*de\s*verano)/i.test(raw)) {
            return 'summer';
        }

        // 3. Lugares icónicos conocidos del Grupo Scout Acrux 518
        const easterPlaces = ['barbadillo', 'cofiñal', 'cofial', 'arija', 'alcalá de moncayo', 'alcala de moncayo', 'moncayo'];
        const summerPlaces = ['prioro', 'cóbreces', 'cobreces', 'valdeavellano', 'vilviestre', 'vilvuestre', 'priaranza'];

        for (const p of easterPlaces) {
            if (raw.includes(p)) return 'easter';
        }
        for (const p of summerPlaces) {
            if (raw.includes(p)) return 'summer';
        }

        // 4. Por defecto, campamento de verano
        return 'summer';
    }

    function rebuildCampsConstellation(campsFromDrive) {
        // 1. Elimina de worldNodes y worldEdges todos los elementos que tengan clusterType === 'camp'
        for (let i = worldNodes.length - 1; i >= 0; i--) {
            if (worldNodes[i].clusterType === 'camp') {
                worldNodes.splice(i, 1);
            }
        }
        for (let i = worldEdges.length - 1; i >= 0; i--) {
            if (worldEdges[i].clusterType === 'camp') {
                worldEdges.splice(i, 1);
            }
        }

        // Estado vacío limpio si no hay campamentos en Drive
        if (!campsFromDrive || !Array.isArray(campsFromDrive) || campsFromDrive.length === 0) {
            CAMPS_DATA = [];
            CAMPS_CONSTELLATION_EDGES = [];
            hasBothCampsConstellations = false;
            SECTORS[2].desc = 'Actualmente no hay carpetas de campamentos publicadas en el Google Drive del grupo.';
            SECTORS[2].stars = [];
            SECTORS[2].edges = [];
            SECTORS[2].runtimeNodes = [];
            if (typeof activeSectorIdx !== 'undefined' && activeSectorIdx === 2 && typeof syncSectorUI === 'function') {
                syncSectorUI(2, 0, true);
            }
            return;
        }

        // 2. Ordenar campamentos estrictamente por orden cronológico de años
        const getYear = (str) => {
            const m = (str || '').match(/\b(19\d\d|20\d\d)\b/);
            return m ? parseInt(m[1], 10) : 0;
        };
        const sortedCamps = [...campsFromDrive].sort((a, b) => {
            const yA = getYear(a.name || a.driveFolderName || '');
            const yB = getYear(b.name || b.driveFolderName || '');
            if (yA !== yB) return yA - yB;
            return (a.name || '').localeCompare(b.name || '');
        });

        // 3. Separar en dos constelaciones distintas: Verano y Semana Santa
        const rawSummer = [];
        const rawEaster = [];

        sortedCamps.forEach(c => {
            const sType = detectCampSeason(c);
            if (sType === 'easter') {
                rawEaster.push(c);
            } else {
                rawSummer.push(c);
            }
        });

        const N_s = rawSummer.length;
        const N_e = rawEaster.length;
        hasBothCampsConstellations = (N_s > 0 && N_e > 0);

        // Ajuste dinámico del encuadre astronómico del Sector III
        if (hasBothCampsConstellations) {
            SECTORS[2].baseZoom = 0.94;
            SECTORS[2].desc = 'En este sector brillan dos constelaciones independientes: arriba, la Constelación Estival (campamentos de verano); abajo, la Constelación Equinoccial (campamentos de Semana Santa y primavera). Haz clic en cualquier estrella para entrar en ella.';
        } else {
            SECTORS[2].baseZoom = 1.02;
            SECTORS[2].desc = 'Constelación oficial de campamentos del Grupo Scout ACRUX 518 sincronizada con Google Drive.';
        }

        // 4. Construcción geométrica de la Constelación de Verano (Hemisferio Superior)
        const baseY_s = hasBothCampsConstellations ? -115 : 0;
        const spanX_s = Math.min(1240, Math.max(420, (N_s - 1) * 175));

        const summerCamps = rawSummer.map((c, idx) => {
            const letter = GREEK_ALPHABET[idx] || `★${idx + 1}`;
            const isLast = (idx === N_s - 1);
            let dx = 0;
            let dy = baseY_s;

            if (N_s === 1) {
                dx = 0;
                dy = baseY_s - 15;
            } else {
                const t = idx / (N_s - 1);
                const baseX = -spanX_s * 0.5 + t * spanX_s;
                const jitterX = Math.cos(idx * 2.3 + 1.2) * 14;
                dx = Math.round(baseX + jitterX);

                const arcY = -Math.sin(t * Math.PI) * 45;
                const waveY = Math.sin(t * Math.PI * 2.2) * 18;
                dy = Math.round(baseY_s + arcY + waveY);
            }

            const r = isLast ? 9.4 : (idx === 0 ? 8.2 : 6.6 + ((idx * 3 + 1) % 4) * 0.3);

            return {
                id: c.id || `camp-summer-${idx}`,
                seasonType: 'summer',
                seasonBadge: '☀️ Campamento de Verano',
                starSymbol: `☀️ ${letter} ${c.name || 'Verano'}`,
                name: c.name || `Campamento de Verano ${idx + 1}`,
                season: c.season || 'Campamento de Verano',
                location: c.location || '📍 Ubicación estival',
                driveFolderName: c.driveFolderName || c.name || 'Carpeta Drive',
                driveUrl: c.driveUrl || '',
                dx,
                dy,
                r,
                labelPos: 'top',
                isRedStar: isLast,
                isLastCamp: isLast,
                desc: c.desc || 'Campamento oficial de verano del Grupo Scout ACRUX 518 sincronizado con Google Drive.',
                photos: (c.photos || []).map(p => typeof p === 'string' ? { src: p, title: c.name, meta: 'Carpeta Google Drive' } : p)
            };
        });

        // 5. Construcción geométrica de la Constelación de Semana Santa (Hemisferio Inferior)
        const baseY_e = hasBothCampsConstellations ? +115 : 0;
        const spanX_e = Math.min(1160, Math.max(400, (N_e - 1) * 180));

        const easterCamps = rawEaster.map((c, idx) => {
            const letter = GREEK_ALPHABET[idx] || `✦${idx + 1}`;
            const isLast = (idx === N_e - 1);
            let dx = 0;
            let dy = baseY_e;

            if (N_e === 1) {
                dx = 0;
                dy = baseY_e + 15;
            } else {
                const t = idx / (N_e - 1);
                const baseX = -spanX_e * 0.5 + t * spanX_e;
                const jitterX = Math.sin(idx * 2.1 + 0.8) * 14;
                dx = Math.round(baseX + jitterX);

                const arcY = Math.sin(t * Math.PI) * 35;
                const waveY = Math.cos(t * Math.PI * 2.0) * 16;
                dy = Math.round(baseY_e + arcY + waveY);
            }

            const r = isLast ? 9.2 : (idx === 0 ? 8.0 : 6.5 + ((idx * 2 + 1) % 4) * 0.3);

            return {
                id: c.id || `camp-easter-${idx}`,
                seasonType: 'easter',
                seasonBadge: '🌸 Semana Santa y Primavera',
                starSymbol: `🌸 ${letter} ${c.name || 'Semana Santa'}`,
                name: c.name || `Campamento de Semana Santa ${idx + 1}`,
                season: c.season || 'Campamento de Semana Santa',
                location: c.location || '📍 Ubicación de acampada',
                driveFolderName: c.driveFolderName || c.name || 'Carpeta Drive',
                driveUrl: c.driveUrl || '',
                dx,
                dy,
                r,
                labelPos: 'bottom',
                isRedStar: isLast,
                isLastCamp: isLast,
                desc: c.desc || 'Acampada o campamento oficial de Semana Santa del Grupo Scout ACRUX 518 sincronizado con Google Drive.',
                photos: (c.photos || []).map(p => typeof p === 'string' ? { src: p, title: c.name, meta: 'Carpeta Google Drive' } : p)
            };
        });

        // 6. Unificar CAMPS_DATA ordenado e indexado
        CAMPS_DATA = [...summerCamps, ...easterCamps];
        CAMPS_DATA.forEach((c, i) => {
            c.index = i;
        });

        // 7. Aristas independientes: CADA CONSTELACIÓN TIENE SUS PROPIAS LÍNEAS (CERO CRUCES ENTRE ELLAS)
        CAMPS_CONSTELLATION_EDGES = [];
        // Aristas de Verano (índices 0 a N_s - 1)
        for (let i = 0; i < N_s - 1; i++) {
            CAMPS_CONSTELLATION_EDGES.push([i, i + 1]);
        }
        // Aristas de Semana Santa (índices N_s a N_s + N_e - 1)
        for (let j = 0; j < N_e - 1; j++) {
            CAMPS_CONSTELLATION_EDGES.push([N_s + j, N_s + j + 1]);
        }

        // 8. Registrar estrellas con registerStarCluster
        const campConstellationStars = CAMPS_DATA.map((camp, cIdx) => ({
            id: `camp-star-${camp.id}`,
            symbol: camp.starSymbol,
            dx: camp.dx,
            dy: camp.dy,
            r: camp.r,
            seasonType: camp.seasonType,
            color: camp.isRedStar ? '#EF4444' : '#FFFFFF',
            halo: camp.isRedStar ? 'rgba(217, 56, 58, 0.45)' : (camp.seasonType === 'easter' ? 'rgba(167, 243, 208, 0.30)' : 'rgba(255, 235, 180, 0.30)'),
            ringColor: camp.isRedStar ? 'rgba(217, 56, 58, 0.65)' : (camp.seasonType === 'easter' ? 'rgba(167, 243, 208, 0.45)' : 'rgba(255, 235, 180, 0.45)'),
            hoverRingColor: camp.isRedStar ? 'rgba(239, 68, 68, 0.95)' : (camp.seasonType === 'easter' ? 'rgba(110, 231, 183, 0.90)' : 'rgba(255, 255, 255, 0.85)'),
            isClusterHub: true,
            campIndex: cIdx,
            isRedStar: camp.isRedStar,
            isLastCamp: camp.isLastCamp,
            labelPos: camp.labelPos
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

        SECTORS[2].runtimeNodes = createdCampNodes;
        SECTORS[2].stars = campConstellationStars;
        SECTORS[2].edges = CAMPS_CONSTELLATION_EDGES;

        // 9. Refrescar UI si el usuario está en Sector III
        if (typeof activeSectorIdx !== 'undefined' && activeSectorIdx === 2 && typeof syncSectorUI === 'function') {
            syncSectorUI(2, 0, true);
        }
    }
    window.rebuildCampsConstellation = rebuildCampsConstellation;

    // =========================================================================
    // 4C. RECONSTRUCCIÓN DINÁMICA DE LA CONSTELACIÓN «EL BAÚL» (OBJETOS PERDIDOS DRIVE)
    // =========================================================================
    function rebuildLostConstellation(cajonesFromDrive) {
        // 1. Limpiar de worldNodes y worldEdges los nodos y aristas de sectorIndex === 3 y clusterType === 'sector'
        for (let i = worldNodes.length - 1; i >= 0; i--) {
            if (worldNodes[i].sectorIndex === 3 && worldNodes[i].clusterType === 'sector') {
                worldNodes.splice(i, 1);
            }
        }
        for (let i = worldEdges.length - 1; i >= 0; i--) {
            if (worldEdges[i].sectorIndex === 3 && worldEdges[i].clusterType === 'sector') {
                worldEdges.splice(i, 1);
            }
        }

        const baulMainStar = {
            id: 'estrella-el-baul',
            symbol: '✦ El Baúl',
            dx: 0,
            dy: 0,
            r: 8.2,
            color: '#FFFFFF',
            halo: 'rgba(56, 189, 248, 0.30)',
            ringColor: 'rgba(56, 189, 248, 0.45)',
            hoverRingColor: 'rgba(56, 189, 248, 0.90)',
            isBaulMain: true,
            isClusterHub: true,
            cajonIndex: 0,
            starIdx: 0,
            labelPos: 'bottom',
            badge: '✦ Estrella Principal · Objetos Perdidos',
            title: '✦ El Baúl · Estrella de Objetos Perdidos (Google Drive)',
            body: 'Haz clic en «El Baúl» para adentrarte en su interior y explorar los cajones sincronizados con Google Drive.',
            pillars: ['📁 Google Drive / Objetos Perdidos', 'Sincronizado en tiempo real', 'Clic para entrar a «El Baúl»']
        };

        // Estado vacío limpio si no hay cajones en Drive
        if (!cajonesFromDrive || !Array.isArray(cajonesFromDrive) || cajonesFromDrive.length === 0) {
            LOST_CAJONES_DATA = [];
            SECTORS[3].stars = [baulMainStar];
            SECTORS[3].edges = [];
            SECTORS[3].runtimeNodes = registerStarCluster(
                SECTORS[3].stars,
                SECTORS[3].edges,
                SECTORS[3].worldX,
                SECTORS[3].worldY,
                {
                    sectorIndex: 3,
                    clusterType: 'sector'
                }
            );
            if (typeof activeSectorIdx !== 'undefined' && activeSectorIdx === 3 && typeof syncSectorUI === 'function') {
                syncSectorUI(3, 0, true);
            }
            return;
        }

        // 2. Reconstruir LOST_CAJONES_DATA exclusivamente con los elementos recibidos
        LOST_CAJONES_DATA = cajonesFromDrive.map((cajon, idx) => {
            const rawName = cajon.folderName || cajon.name || `Cajón ${idx + 1}`;
            const parts = rawName.split('|').map(s => s.trim());
            const folderTitle = parts[0];
            const subtitle = parts.length > 1 ? parts[1] : (cajon.subtitle || 'Objetos perdidos sincronizados desde Google Drive');
            const starSymbol = parts[0].startsWith('✦') ? parts[0] : `✦ ${parts[0]}`;

            return {
                id: cajon.id || `cajon-${idx}`,
                index: idx,
                starSymbol,
                folderName: folderTitle,
                drivePath: cajon.drivePath || `Google Drive / 04_OBJETOS_PERDIDOS / ${rawName}`,
                driveUrl: cajon.driveUrl || 'https://drive.google.com',
                subtitle,
                items: (cajon.items || []).map((it, itIdx) => ({
                    file: it.file || `item_${itIdx + 1}.jpg`,
                    name: it.name || 'Prenda u objeto',
                    desc: it.desc || 'Recogido en actividades del grupo.',
                    status: it.status || 'En Base · Rueda 53',
                    photoUrl: it.photoUrl || it.src || it.img || null,
                    img: it.photoUrl || it.src || it.img || null
                }))
            };
        });

        // 3. Generar dinámicamente SECTORS[3].stars y SECTORS[3].edges formando un asterismo celestial armónico
        const N = LOST_CAJONES_DATA.length;
        const miniStars = [];
        const edges = [];

        if (N === 1) {
            // Par binario elegante con El Baúl abajo y Cajón 01 en ascenso luminoso
            const cj = LOST_CAJONES_DATA[0];
            miniStars.push({
                id: `cajon-star-${cj.id}`,
                symbol: cj.starSymbol,
                dx: 110,
                dy: -80,
                r: 5.6,
                labelPos: 'top',
                color: '#38BDF8',
                halo: 'rgba(56, 189, 248, 0.35)',
                ringColor: 'rgba(56, 189, 248, 0.48)',
                hoverRingColor: 'rgba(56, 189, 248, 0.95)',
                cajonIndex: 0,
                starIdx: 1,
                badge: `✦ Mini-Estrella · ${cj.folderName}`,
                title: `${cj.starSymbol} · ${cj.folderName}`,
                body: `${cj.subtitle}. Contiene ${cj.items.length} fotos de objetos en Google Drive. Clic para explorar este cajón.`,
                pillars: [
                    `📁 ${cj.folderName}`,
                    `${cj.items.length} objetos registrados`,
                    'Clic para abrir cajón'
                ]
            });
            edges.push([0, 1]);
        } else if (N === 2) {
            // Triángulo áureo celeste (Delta asterism)
            const pos = [
                { dx: -130, dy: -70, lp: 'top' },
                { dx: 130, dy: -70, lp: 'top' }
            ];
            for (let i = 0; i < N; i++) {
                const cj = LOST_CAJONES_DATA[i];
                miniStars.push({
                    id: `cajon-star-${cj.id}`,
                    symbol: cj.starSymbol,
                    dx: pos[i].dx,
                    dy: pos[i].dy,
                    r: 5.2,
                    labelPos: pos[i].lp,
                    color: '#38BDF8',
                    halo: 'rgba(56, 189, 248, 0.32)',
                    ringColor: 'rgba(56, 189, 248, 0.45)',
                    hoverRingColor: 'rgba(56, 189, 248, 0.90)',
                    cajonIndex: i,
                    starIdx: i + 1,
                    badge: `✦ Mini-Estrella · Cajón 0${i + 1}`,
                    title: `${cj.starSymbol} · ${cj.folderName}`,
                    body: `${cj.subtitle}. Contiene ${cj.items.length} fotos de objetos en Google Drive. Clic para explorar este cajón.`,
                    pillars: [`📁 ${cj.folderName}`, `${cj.items.length} objetos registrados`, 'Clic para abrir cajón']
                });
            }
            edges.push([0, 1], [0, 2], [1, 2]);
        } else if (N === 3) {
            // Diamante / Rombo celeste envolvente
            const pos = [
                { dx: -145, dy: -25, lp: 'left' },
                { dx: 0, dy: -110, lp: 'top' },
                { dx: 145, dy: -25, lp: 'right' }
            ];
            for (let i = 0; i < N; i++) {
                const cj = LOST_CAJONES_DATA[i];
                miniStars.push({
                    id: `cajon-star-${cj.id}`,
                    symbol: cj.starSymbol,
                    dx: pos[i].dx,
                    dy: pos[i].dy,
                    r: 5.0,
                    labelPos: pos[i].lp,
                    color: '#38BDF8',
                    halo: 'rgba(56, 189, 248, 0.32)',
                    ringColor: 'rgba(56, 189, 248, 0.45)',
                    hoverRingColor: 'rgba(56, 189, 248, 0.90)',
                    cajonIndex: i,
                    starIdx: i + 1,
                    badge: `✦ Mini-Estrella · Cajón 0${i + 1}`,
                    title: `${cj.starSymbol} · ${cj.folderName}`,
                    body: `${cj.subtitle}. Contiene ${cj.items.length} fotos de objetos en Google Drive. Clic para explorar este cajón.`,
                    pillars: [`📁 ${cj.folderName}`, `${cj.items.length} objetos registrados`, 'Clic para abrir cajón']
                });
            }
            edges.push([0, 1], [1, 2], [2, 3], [3, 0], [0, 2]);
        } else if (N === 4) {
            // El Cofre de las Estrellas (cuadrilátero celeste con estrella joya El Baúl en el centro)
            const pos = [
                { dx: -140, dy: -85, lp: 'top' },
                { dx: 140, dy: -85, lp: 'top' },
                { dx: 120, dy: 85, lp: 'bottom' },
                { dx: -120, dy: 85, lp: 'bottom' }
            ];
            for (let i = 0; i < N; i++) {
                const cj = LOST_CAJONES_DATA[i];
                miniStars.push({
                    id: `cajon-star-${cj.id}`,
                    symbol: cj.starSymbol,
                    dx: pos[i].dx,
                    dy: pos[i].dy,
                    r: 5.0,
                    labelPos: pos[i].lp,
                    color: '#38BDF8',
                    halo: 'rgba(56, 189, 248, 0.32)',
                    ringColor: 'rgba(56, 189, 248, 0.45)',
                    hoverRingColor: 'rgba(56, 189, 248, 0.90)',
                    cajonIndex: i,
                    starIdx: i + 1,
                    badge: `✦ Mini-Estrella · Cajón 0${i + 1}`,
                    title: `${cj.starSymbol} · ${cj.folderName}`,
                    body: `${cj.subtitle}. Contiene ${cj.items.length} fotos de objetos en Google Drive. Clic para explorar este cajón.`,
                    pillars: [`📁 ${cj.folderName}`, `${cj.items.length} objetos registrados`, 'Clic para abrir cajón']
                });
            }
            edges.push([1, 2], [2, 3], [3, 4], [4, 1], [0, 1], [0, 2], [0, 3], [0, 4]);
        } else {
            // Bóveda / Corona celeste para N >= 5
            for (let i = 0; i < N; i++) {
                const cj = LOST_CAJONES_DATA[i];
                const angle = -Math.PI * 0.90 + (i / (N - 1)) * (Math.PI * 1.80);
                const rx = 195 + Math.sin(i * 1.8) * 16;
                const ry = 125 + Math.cos(i * 2.2) * 14;
                const tilt = -0.16;
                const rawX = Math.cos(angle) * rx;
                const rawY = Math.sin(angle) * ry;
                const dx = Math.round(rawX * Math.cos(tilt) - rawY * Math.sin(tilt));
                const dy = Math.round(rawX * Math.sin(tilt) + rawY * Math.cos(tilt));

                let labelPos = 'bottom';
                if (dy < -35) labelPos = 'top';
                else if (dx < -60) labelPos = 'left';
                else if (dx > 60) labelPos = 'right';

                miniStars.push({
                    id: `cajon-star-${cj.id}`,
                    symbol: cj.starSymbol,
                    dx,
                    dy,
                    r: 4.8,
                    labelPos,
                    color: '#38BDF8',
                    halo: 'rgba(56, 189, 248, 0.28)',
                    ringColor: 'rgba(56, 189, 248, 0.40)',
                    hoverRingColor: 'rgba(56, 189, 248, 0.85)',
                    cajonIndex: i,
                    starIdx: i + 1,
                    badge: `✦ Mini-Estrella · Cajón 0${i + 1}`,
                    title: `${cj.starSymbol} · ${cj.folderName}`,
                    body: `${cj.subtitle}. Contiene ${cj.items.length} fotos de objetos en Google Drive. Clic para explorar este cajón.`,
                    pillars: [`📁 ${cj.folderName}`, `${cj.items.length} objetos registrados`, 'Clic para abrir cajón']
                });
            }
            // Cinta perimetral de la bóveda
            for (let i = 0; i < N - 1; i++) {
                edges.push([i + 1, i + 2]);
            }
            // Tirantes estructurales hacia El Baúl (nodo 0)
            edges.push([0, 1]);
            edges.push([0, N]);
            edges.push([0, Math.ceil(N / 2)]);
        }

        SECTORS[3].stars = [baulMainStar, ...miniStars];
        SECTORS[3].edges = edges;

        // 4. Vuelva a registrar el clúster en el Canvas
        const createdNodes = registerStarCluster(
            SECTORS[3].stars,
            SECTORS[3].edges,
            SECTORS[3].worldX,
            SECTORS[3].worldY,
            {
                sectorIndex: 3,
                clusterType: 'sector'
            }
        );
        SECTORS[3].runtimeNodes = createdNodes;

        // 5. Si el usuario está en el Sector IV (activeSectorIdx === 3), refresque la interfaz
        if (typeof activeSectorIdx !== 'undefined' && activeSectorIdx === 3 && typeof syncSectorUI === 'function') {
            syncSectorUI(3, 0, true);
        }
    }
    window.rebuildLostConstellation = rebuildLostConstellation;

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
    const elPrimaryBtn = document.getElementById('btnStagePrimaryAction');
    const elPrimaryBtnText = document.getElementById('btnStagePrimaryText');

    const elCoordsReadout = document.getElementById('hudCoordsReadout');
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

    // Selecciona una estrella del sector: resalta su chip y desplaza suavemente la cámara hacia ella
    function renderSubSelection(sIdx, subIdx) {
        selectedSubIdx = subIdx;
        if (!SECTORS[sIdx]) return;

        const focus = sIdx === 1 ? UNITS_DATA[subIdx] : (sIdx === 2 ? CAMPS_DATA[subIdx] : null);
        if (focus && !superZoomState) {
            targetFreePanX = focus.dx * 0.45;
            targetFreePanY = focus.dy * 0.45;
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
            if (elPrimaryBtnText) elPrimaryBtnText.textContent = sec.primaryBtnText;

            // Ocultar botón primario en Sector III si no hay campamentos en Drive
            if (sIdx === 2 && CAMPS_DATA.length === 0) {
                if (elPrimaryBtn) elPrimaryBtn.style.display = 'none';
            } else {
                if (elPrimaryBtn) elPrimaryBtn.style.display = '';
            }

            if (elStarNodesWrap) {
                let items = [];
                if (sIdx === 1) {
                    items = UNITS_DATA.map((u, idx) => ({ label: u.shortName, idx }));
                } else if (sIdx === 2) {
                    items = CAMPS_DATA.map((c, idx) => ({
                        label: c.starSymbol,
                        idx,
                        isRed: c.isRedStar,
                        seasonType: c.seasonType
                    }));
                } else {
                    items = sec.stars.map((st, idx) => ({ label: st.symbol, idx }));
                }

                if (sIdx === 2 && hasBothCampsConstellations) {
                    const summerItems = items.filter(it => it.seasonType === 'summer');
                    const easterItems = items.filter(it => it.seasonType === 'easter');

                    elStarNodesWrap.innerHTML = `
                        <div class="camps-constellation-group">
                            <span class="camps-group-title">☀️ Constelación Estival · Verano</span>
                            <div class="camps-group-chips">
                                ${summerItems.map(it => `
                                    <button type="button" class="star-node-chip ${it.isRed ? 'is-red-chip' : ''} ${it.idx === subIdx ? 'active' : ''}" data-sub-idx="${it.idx}">
                                        ${it.label}
                                    </button>
                                `).join('')}
                            </div>
                        </div>
                        <div class="camps-constellation-group" style="margin-top: 0.6rem;">
                            <span class="camps-group-title">🌸 Constelación Equinoccial · Semana Santa</span>
                            <div class="camps-group-chips">
                                ${easterItems.map(it => `
                                    <button type="button" class="star-node-chip ${it.isRed ? 'is-red-chip' : ''} ${it.idx === subIdx ? 'active' : ''}" data-sub-idx="${it.idx}">
                                        ${it.label}
                                    </button>
                                `).join('')}
                            </div>
                        </div>
                    `;
                } else {
                    elStarNodesWrap.innerHTML = items.map(it => `
                        <button type="button" class="star-node-chip ${it.isRed ? 'is-red-chip' : ''} ${it.idx === subIdx ? 'active' : ''}" data-sub-idx="${it.idx}">
                            ${it.label}
                        </button>
                    `).join('');
                }

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
                <div class="kraalete-card ${k.cromoUrl ? 'has-cromo' : ''}">
                    ${k.cromoUrl ? `
                        <div class="kraalete-cromo-wrap">
                            <img src="${k.cromoUrl}" alt="${k.name}" loading="lazy" referrerpolicy="no-referrer">
                        </div>
                    ` : ''}
                    <span class="kraalete-star">${k.star || '✦ KRAALETE'}</span>
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

    let currentCampForUnlock = null;

    async function handleUnlockDrive() {
        if (!currentCampForUnlock) return;
        const passInput = document.getElementById('czDrivePassInput');
        const feedback = document.getElementById('czUnlockFeedback');
        const unlockBtn = document.getElementById('czUnlockDriveBtn');
        const pass = passInput ? passInput.value.trim() : '';

        if (!pass) {
            if (feedback) {
                feedback.textContent = 'Introduce la contraseña del campamento.';
                feedback.className = 'camp-unlock-feedback is-error';
            }
            return;
        }

        if (feedback) {
            feedback.textContent = 'Verificando con Google Drive...';
            feedback.className = 'camp-unlock-feedback is-loading';
        }
        if (unlockBtn) unlockBtn.disabled = true;

        try {
            const endpoint = `${DRIVE_API_URL}?action=unlock&id=${encodeURIComponent(currentCampForUnlock.id)}&pass=${encodeURIComponent(pass)}`;
            const res = await fetch(endpoint);
            const data = await res.json();
            if (data && data.success && data.url) {
                if (feedback) {
                    feedback.textContent = '¡Contraseña correcta! Abriendo Google Drive...';
                    feedback.className = 'camp-unlock-feedback is-success';
                }
                if (passInput) passInput.value = '';
                window.open(data.url, '_blank', 'noopener');
            } else {
                if (feedback) {
                    feedback.textContent = 'Contraseña incorrecta';
                    feedback.className = 'camp-unlock-feedback is-error';
                }
            }
        } catch (err) {
            console.error('Error al desbloquear Drive:', err);
            if (feedback) {
                feedback.textContent = 'Error al conectar con el servidor. Inténtalo de nuevo.';
                feedback.className = 'camp-unlock-feedback is-error';
            }
        } finally {
            if (unlockBtn) unlockBtn.disabled = false;
        }
    }

    document.getElementById('czUnlockDriveBtn')?.addEventListener('click', handleUnlockDrive);
    document.getElementById('czDrivePassInput')?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleUnlockDrive();
        }
    });

    function openCampSuperZoom(campIdx) {
        if (!CAMPS_DATA || CAMPS_DATA.length === 0) return;
        const camp = CAMPS_DATA[campIdx] || CAMPS_DATA[0];
        if (!camp) return;

        currentCampForUnlock = camp;
        const passInput = document.getElementById('czDrivePassInput');
        const feedback = document.getElementById('czUnlockFeedback');
        if (passInput) passInput.value = '';
        if (feedback) {
            feedback.textContent = '';
            feedback.className = 'camp-unlock-feedback';
        }

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

        // 2. Poblar la Nueva Tab del Campamento: Lugar, Descripción, 3 Fotos de Muestra y Formulario Drive
        const kicker = document.getElementById('czKicker');
        if (kicker) {
            const seasonName = camp.seasonType === 'easter' ? 'SEMANA SANTA Y PRIMAVERA' : 'CAMPAMENTO DE VERANO';
            kicker.textContent = camp.isRedStar
                ? `✦ ÚLTIMO ${seasonName} · ESTRELLA ROJA`
                : `✦ ${seasonName}`;
        }

        const seasonPill = document.getElementById('czSeasonPill');
        if (seasonPill) {
            seasonPill.textContent = camp.seasonType === 'easter'
                ? '🌸 CONSTELACIÓN EQUINOCCIAL (SEMANA SANTA)'
                : '☀️ CONSTELACIÓN ESTIVAL (VERANO)';
        }
        const locPill = document.getElementById('czLocationPill');
        if (locPill) locPill.textContent = camp.location || '📍 Ubicación en naturaleza';
        const folderBadge = document.getElementById('czDriveFolderBadge');
        if (folderBadge) folderBadge.textContent = `📁 Drive: ${camp.driveFolderName || camp.name}`;
        document.getElementById('czTitle').textContent = camp.name;
        document.getElementById('czDesc').textContent = camp.desc;

        const folderTitle = document.getElementById('czDriveFolderTitle');
        if (folderTitle) folderTitle.textContent = `Carpeta: ${camp.driveFolderName || camp.name}`;

        const threePhotosGrid = document.getElementById('czThreePhotosGrid');
        if (threePhotosGrid) {
            const photos = camp.photos || [];
            if (photos.length === 0) {
                threePhotosGrid.innerHTML = `
                    <div class="camp-photos-empty-card">
                        <div class="camp-photos-empty-icon">📁</div>
                        <h4>Carpeta sincronizada desde Drive</h4>
                        <p>Aún sin fotos de muestra en esta carpeta de Google Drive.</p>
                    </div>
                `;
            } else {
                const samplePhotos = photos.slice(0, 3);
                threePhotosGrid.innerHTML = samplePhotos.map((ph, i) => `
                    <article class="camp-photo-card">
                        <div class="camp-photo-img-wrap">
                            <span class="camp-photo-badge">FOTO DE EJEMPLO 0${i + 1} / 03</span>
                            <img src="${ph.src}" alt="${ph.title || 'Foto de campamento'}" loading="lazy" referrerpolicy="no-referrer">
                        </div>
                        <div class="camp-photo-caption">
                            <strong>${ph.title || 'Foto de campamento'}</strong>
                            <span>${ph.meta || `Muestra 0${i + 1}/03 · Carpeta Google Drive`}</span>
                        </div>
                    </article>
                `).join('');
            }
        }

        const campSw = document.getElementById('czCampSwitcher');
        if (campSw) {
            campSw.innerHTML = CAMPS_DATA.map((c, i) => `
                <button type="button" class="star-node-chip ${c.isRedStar ? 'is-red-chip' : ''} ${i === campIdx ? 'active' : ''}" data-jump-camp="${i}">
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
        const folderPill = document.getElementById('lzActiveFolderPill');
        const cajonTitle = document.getElementById('lzCurrentCajonTitle');
        const cajonSub = document.getElementById('lzCurrentCajonSub');
        const openDriveBtn = document.getElementById('lzOpenDriveFolderBtn');
        const sw = document.getElementById('lzCajonSwitcher');
        const miniMap = document.getElementById('lzMiniStarsMap');
        const grid = document.getElementById('lzPhotosGrid');

        // Estado vacío limpio si no hay cajones en Drive
        if (!LOST_CAJONES_DATA || LOST_CAJONES_DATA.length === 0) {
            if (folderPill) folderPill.textContent = '📁 Google Drive / 04_OBJETOS_PERDIDOS';
            if (cajonTitle) cajonTitle.textContent = 'El Baúl está vacío';
            if (cajonSub) cajonSub.textContent = 'Actualmente no hay ningún cajón ni objeto perdido registrado.';
            if (openDriveBtn) openDriveBtn.style.display = 'none';
            if (sw) sw.innerHTML = '';
            const emptyText = 'Actualmente no hay ningún cajón ni objeto perdido registrado en el Google Drive del grupo. ¡Todo el material está en casa!';
            if (miniMap) miniMap.innerHTML = `<p class="empty-cajones-msg" style="padding: 24px; color: rgba(255,255,255,0.72); font-size: 0.95rem; text-align: center;">${emptyText}</p>`;
            if (grid) grid.innerHTML = `<div class="empty-cajones-msg" style="grid-column: 1 / -1; padding: 50px 20px; text-align: center; color: rgba(255,255,255,0.75); font-size: 1.05rem;">${emptyText}</div>`;
            return;
        }

        activeLostCajonIdx = clamp(cajonIdx, 0, LOST_CAJONES_DATA.length - 1);
        const cajon = LOST_CAJONES_DATA[activeLostCajonIdx];
        if (!cajon) return;

        if (folderPill) folderPill.textContent = `📁 ${cajon.drivePath}`;
        if (cajonTitle) cajonTitle.textContent = cajon.folderName;
        if (cajonSub) cajonSub.textContent = `${cajon.subtitle} · (${cajon.items.length} fotos en esta carpeta de Google Drive)`;
        if (openDriveBtn) {
            openDriveBtn.style.display = '';
            openDriveBtn.href = cajon.driveUrl || 'https://drive.google.com';
        }

        // Actualizar selector superior de Mini-Estrellas (Cajones)
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
            if (!grid) return;

            if (!cajon.items || cajon.items.length === 0) {
                grid.innerHTML = `<p style="grid-column: 1 / -1; padding: 40px 20px; text-align: center; color: rgba(255,255,255,0.7); font-size: 1rem;">Este cajón está vacío actualmente en Google Drive.</p>`;
                return;
            }

            const filtered = cajon.items.filter(it =>
                !q ||
                (it.name && it.name.toLowerCase().includes(q)) ||
                (it.desc && it.desc.toLowerCase().includes(q)) ||
                (it.file && it.file.toLowerCase().includes(q))
            );

            if (filtered.length === 0) {
                grid.innerHTML = `<p style="grid-column: 1 / -1; padding: 40px 20px; text-align: center; color: rgba(255,255,255,0.7); font-size: 1rem;">No hay fotos que coincidan con esa búsqueda en este Cajón de Google Drive.</p>`;
                return;
            }

            grid.innerHTML = filtered.map(it => {
                const imgSrc = it.img || it.photoUrl || '';
                return `
                <article class="lost-photo-card">
                    <div class="lost-photo-art">
                        ${it.svg ? it.svg : `<img src="${imgSrc}" alt="${it.name}" loading="lazy" referrerpolicy="no-referrer">`}
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
            `;
            }).join('');

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
        const baulMainStar = secLost && secLost.stars ? secLost.stars[0] : null;
        let targetWx = secLost.worldX + (baulMainStar ? baulMainStar.dx : 0);
        let targetWy = secLost.worldY + (baulMainStar ? baulMainStar.dy : 0);

        if (LOST_CAJONES_DATA.length > 0 && typeof cajonIdx === 'number' && cajonIdx >= 0 && cajonIdx < LOST_CAJONES_DATA.length) {
            const star = secLost.stars[cajonIdx + 1];
            if (star) {
                targetWx = secLost.worldX + star.dx;
                targetWy = secLost.worldY + star.dy;
            }
        }

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

    function goToSector(sIdx, subIdx = 0, immediate = false) {
        const clamped = clamp(sIdx, 0, SECTORS.length - 1);
        closeAllSuperZooms(true);
        isOverviewMode = false;
        document.body.classList.remove('is-overview-mode');
        elOverviewBtn?.classList.remove('active');
        if (elOverviewBtnText) elOverviewBtnText.textContent = 'Mapa Estelar Global';

        targetSectorProgress = clamped;
        targetFreePanX = 0;
        targetFreePanY = 0;

        if (immediate) {
            currentSectorProgress = clamped;
            camera.x = SECTORS[clamped].worldX;
            camera.y = SECTORS[clamped].worldY;
            camera.targetX = camera.x;
            camera.targetY = camera.y;
            camera.zoom = SECTORS[clamped].baseZoom;
            camera.targetZoom = camera.zoom;
        }

        if (activeSectorIdx !== clamped) {
            activeSectorIdx = clamped;
            syncSectorUI(clamped, subIdx, immediate);
        } else {
            renderSubSelection(clamped, subIdx);
        }
    }

    syncSectorUI(0, 0, true);

    // =========================================================================
    // 9. MODAL DE IDENTIDAD (CRUZ DEL SUR) Y PANEL DE BASES Y CONTACTO
    // =========================================================================
    const drawerBackdrop = document.getElementById('cosmosDrawerBackdrop');
    const drawerKicker = document.getElementById('drawerModalKicker');
    const drawerTitle = document.getElementById('drawerModalTitle');
    const drawerBody = document.getElementById('drawerModalBody');

    function openDrawerModal(mode) {
        if (!drawerBackdrop) return;

        if (mode === 'bases') {
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
                        ${(coordinadoresDrive && coordinadoresDrive.length > 0) ? `
                            <div class="coordinators-grid" style="display:grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 0.65rem; margin-top: 0.75rem; margin-bottom: 0.5rem;">
                                ${coordinadoresDrive.map(c => `
                                    <div class="coordinator-card" style="background: rgba(8,9,13,0.7); border:1px solid rgba(255,255,255,0.12); border-radius:10px; padding:0.65rem; text-align:center;">
                                        ${(c.fotoUrl || c.cromoUrl) ? `
                                            <div style="width:60px; height:60px; margin:0 auto 0.45rem auto; border-radius:50%; overflow:hidden; border:2px solid var(--accent-red, #D9383A);">
                                                <img src="${c.fotoUrl || c.cromoUrl}" alt="${c.name}" referrerpolicy="no-referrer" style="width:100%; height:100%; object-fit:cover;">
                                            </div>
                                        ` : ''}
                                        <strong style="display:block; color:#FFF; font-size:0.88rem;">${c.name}</strong>
                                        <span style="display:block; font-size:0.72rem; color:var(--ice-muted);">${c.cargo || c.role || 'Coordinación'}</span>
                                        ${(c.telefono || c.phone) ? `<a href="tel:${(c.telefono || c.phone).replace(/\s+/g, '')}" style="display:inline-block; margin-top:0.3rem; font-family:'JetBrains Mono',monospace; font-size:0.74rem; color:#F3E5AB; text-decoration:none;">📞 ${c.telefono || c.phone}</a>` : ''}
                                    </div>
                                `).join('')}
                            </div>
                        ` : `
                            <div style="display:flex; flex-direction:column; gap:0.3rem; margin-top:0.5rem;">
                                <span class="star-pillar-tag">📞 JJ: 616 28 91 19</span>
                                <span class="star-pillar-tag">📞 Marta: 619 20 20 68 · Hugo</span>
                            </div>
                        `}
                        <span class="star-pillar-tag" style="margin-top:0.5rem;">✉️ gruposcoutacrux518@gmail.com · @gsacrux518</span>
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

    // =========================================================================
    // 9B. VISOR MODAL DE CRISTAL · RECUERDO DEL 50º ANIVERSARIO (LAZY LOADING)
    // =========================================================================
    const elAnniversaryModal = document.getElementById('anniversaryModal');
    const elAnYearTag = document.getElementById('anYearTag');
    const elAnYearNumber = document.getElementById('anYearNumber');
    const elAnYearTitle = document.getElementById('anYearTitle');
    const elAnYearDesc = document.getElementById('anYearDesc');
    const elAnPhotoFrame = document.getElementById('anPhotoFrame');
    const elAnDriveBadge = document.getElementById('anDriveBadge');
    const elAnDriveBtn = document.getElementById('anDriveBtn');

    function openAnniversaryModal(starData) {
        if (!elAnniversaryModal || !starData) return;

        // Soporte si se invoca con el año (número o string)
        if (typeof starData === 'number' || typeof starData === 'string') {
            const yr = parseInt(starData, 10);
            const found = aniversarioFotos.find(s => s.year === yr);
            if (found) starData = found;
            else return;
        }

        if (elAnYearTag) {
            elAnYearTag.textContent = starData.isUnlocked
                ? `✦ 50º ANIVERSARIO · RECUERDO HISTÓRICO (${starData.year})`
                : `✦ 50º ANIVERSARIO · ARCHIVO EN DIGITALIZACIÓN (${starData.year})`;
        }
        if (elAnYearNumber) elAnYearNumber.textContent = starData.year;
        if (elAnYearTitle) elAnYearTitle.textContent = starData.title;
        if (elAnYearDesc) elAnYearDesc.textContent = starData.desc;
        if (elAnDriveBadge) elAnDriveBadge.textContent = `📁 Google Drive: ${starData.driveFolder}`;
        if (elAnDriveBtn) elAnDriveBtn.href = starData.driveUrl || DRIVE_ANNIVERSARY_URL;

        // RENDIMIENTO: Lazy Loading estricto (la imagen se descarga e inyecta única y exclusivamente en este instante)
        if (elAnPhotoFrame) {
            if (starData.isUnlocked && starData.photoUrl) {
                elAnPhotoFrame.innerHTML = `
                    <img src="${starData.photoUrl}" alt="${starData.title}" loading="lazy">
                `;
            } else {
                elAnPhotoFrame.innerHTML = `
                    <div class="anniversary-photo-locked">
                        <span class="locked-icon">📜</span>
                        <strong style="font-family:'Outfit',sans-serif; font-size:1.15rem; color:#F3E5AB; margin-bottom:0.4rem;">
                            Archivo Histórico del Año ${starData.year}
                        </strong>
                        <p style="margin:0; font-size:0.85rem; max-width:400px; line-height:1.5;">
                            Este recuerdo está en fase de catalogación comunitaria. Si conservas fotografías o testimonios de este año, puedes aportarlos a la carpeta de Google Drive <strong>${starData.driveFolder}</strong>.
                        </p>
                    </div>
                `;
            }
        }

        elAnniversaryModal.classList.add('is-open');
        elAnniversaryModal.setAttribute('aria-hidden', 'false');
    }

    function closeAnniversaryModal() {
        if (!elAnniversaryModal) return;
        elAnniversaryModal.classList.remove('is-open');
        elAnniversaryModal.setAttribute('aria-hidden', 'true');
        // Liberar la imagen de memoria inmediatamente
        if (elAnPhotoFrame) elAnPhotoFrame.innerHTML = '';
    }

    document.getElementById('btnCloseAnniversaryModal')?.addEventListener('click', closeAnniversaryModal);
    elAnniversaryModal?.addEventListener('click', (e) => {
        if (e.target === elAnniversaryModal) closeAnniversaryModal();
    });

    window.openAnniversaryModal = openAnniversaryModal;
    window.closeAnniversaryModal = closeAnniversaryModal;

    if (elPrimaryBtn) {
        elPrimaryBtn.addEventListener('click', () => {
            if (activeSectorIdx === 0) {
                goToSector(1, 0);
            } else if (activeSectorIdx === 1) {
                openUnitSuperZoom(selectedSubIdx);
            } else if (activeSectorIdx === 2) {
                if (CAMPS_DATA && CAMPS_DATA.length > 0) {
                    openCampSuperZoom(selectedSubIdx);
                }
            } else if (activeSectorIdx === 3) {
                openLostSuperZoom(selectedSubIdx === 0 ? 0 : selectedSubIdx - 1);
            } else if (activeSectorIdx === 4) {
                openDrawerModal('bases');
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

    canvas.addEventListener('pointerdown', () => {
        pointer.isDown = true;
        pointer.dragMoved = 0;
    });

    window.addEventListener('pointerup', (e) => {
        if (!pointer.isDown) return;
        pointer.isDown = false;

        if (pointer.dragMoved < 10) {
            // 1. Detección de clic en el Cometa Dorado (Easter Egg 50º Aniversario)
            if (goldenComet.state === 'flying' && goldenComet.alpha > 0.15) {
                const dComet = Math.hypot(e.clientX - goldenComet.sx, e.clientY - goldenComet.sy);
                if (dComet < 44) {
                    toggleAnniversaryMode(true, goldenComet.sx, goldenComet.sy);
                    return;
                }
            }

            // 2. Detección de clic en una de las 50 estrellas de la Espiral del 50º Aniversario
            if (anniversaryLerp > 0.08) {
                let hitAnniv = hoveredAnniversaryStar;
                if (!hitAnniv) {
                    let bestAnnivD = 28;
                    for (let a = 0; a < aniversarioFotos.length; a++) {
                        const st = aniversarioFotos[a];
                        const d = Math.hypot(e.clientX - st.sx, e.clientY - st.sy);
                        if (d < bestAnnivD) {
                            bestAnnivD = d;
                            hitAnniv = st;
                        }
                    }
                }
                if (hitAnniv) {
                    openAnniversaryModal(hitAnniv);
                    return;
                }
            }

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
            if (elAnniversaryModal?.classList.contains('is-open')) {
                closeAnniversaryModal();
                return;
            }
            if (superZoomState) closeAllSuperZooms(true);
            if (drawerBackdrop?.classList.contains('is-open')) closeDrawerModal();
            return;
        }
        if (superZoomState || drawerBackdrop?.classList.contains('is-open') || elAnniversaryModal?.classList.contains('is-open')) return;

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

    // Delegación única: cubre también los chips y botones que se generan dinámicamente
    document.addEventListener('pointerover', (e) => {
        cursorRing?.classList.toggle('is-ui-hover', Boolean(e.target.closest?.('button, a, input, select')));
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
    let lastFrameTime = performance.now();

    function animate(now) {
        const dt = clamp((now - lastFrameTime) * 0.001, 0.001, 0.05);
        lastFrameTime = now;
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
        // A. FONDO ABISAL MONOCROMÁTICO (#040406 / #030304 OBSIDIANA)
        // ---------------------------------------------------------------------
        anniversaryLerp += (targetAnniversaryLerp - anniversaryLerp) * 0.055;

        // En Modo 50 Aniversario: Negro Obsidiana ultra sobrio y profundo (#030304)
        ctx.fillStyle = anniversaryLerp > 0.4 ? '#030304' : '#040406';
        ctx.fillRect(0, 0, vw, vh);

        // Halo del cursor: sutil, compacto y contenido (cero resplandor desbordante)
        const cursorGlowRadius = 140;
        const gradCursor = ctx.createRadialGradient(
            pointer.lerpX,
            pointer.lerpY,
            0,
            pointer.lerpX,
            pointer.lerpY,
            cursorGlowRadius
        );
        if (anniversaryLerp > 0.4) {
            gradCursor.addColorStop(0, 'rgba(212, 175, 55, 0.045)');
            gradCursor.addColorStop(0.5, 'rgba(212, 175, 55, 0.012)');
            gradCursor.addColorStop(1, 'rgba(3, 3, 4, 0)');
        } else {
            gradCursor.addColorStop(0, 'rgba(255, 255, 255, 0.03)');
            gradCursor.addColorStop(0.5, 'rgba(255, 255, 255, 0.008)');
            gradCursor.addColorStop(1, 'rgba(4, 4, 6, 0)');
        }
        ctx.fillStyle = gradCursor;
        ctx.beginPath();
        ctx.arc(pointer.lerpX, pointer.lerpY, cursorGlowRadius, 0, Math.PI * 2);
        ctx.fill();

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

            let edgeStroke = `rgba(255, 255, 255, ${alpha.toFixed(3)})`;
            let edgeShadow = 'rgba(255, 255, 255, 0.55)';

            if (anniversaryLerp > 0.2) {
                edgeStroke = `rgba(212, 175, 55, ${alpha.toFixed(3)})`;
                edgeShadow = 'rgba(212, 175, 55, 0.65)';
            } else if (ed.sectorIndex === 3) {
                // Brillo cian estelar para «El Baúl» y sus cajones
                edgeStroke = `rgba(186, 230, 253, ${alpha.toFixed(3)})`;
                edgeShadow = 'rgba(56, 189, 248, 0.55)';
            } else if (ed.sectorIndex === 2 || ed.clusterType === 'camp') {
                const isEasterEdge = (ed.nodeA && ed.nodeA.seasonType === 'easter') || (ed.nodeB && ed.nodeB.seasonType === 'easter');
                if (isEasterEdge) {
                    // Resplandor primaveral / Pascua (jade estelar fresco / aguamarina)
                    edgeStroke = `rgba(167, 243, 208, ${alpha.toFixed(3)})`;
                    edgeShadow = 'rgba(110, 231, 183, 0.65)';
                } else {
                    // Resplandor estival de verano (dorado estelar / blanco puro)
                    edgeStroke = `rgba(255, 246, 230, ${alpha.toFixed(3)})`;
                    edgeShadow = 'rgba(255, 215, 140, 0.60)';
                }
            } else if (ed.sectorIndex === 0) {
                edgeShadow = 'rgba(217, 56, 58, 0.45)';
            }

            ctx.strokeStyle = edgeStroke;
            ctx.lineWidth = (isFocusedSector ? 1.45 : 0.85) + ed.glow * 1.1;
            if (ed.glow > 0.08 || isFocusedSector) {
                ctx.shadowColor = edgeShadow;
                ctx.shadowBlur = 8 + ed.glow * 10;
            }
            ctx.stroke();
            ctx.restore();
        }

        // ---------------------------------------------------------------------
        // E2. TÍTULOS EN EL CIELO PARA LAS DOS CONSTELACIONES DEL SECTOR III
        // ---------------------------------------------------------------------
        if (activeSectorIdx === 2 && !superZoomState && hasBothCampsConstellations) {
            ctx.save();
            ctx.font = '600 11px "JetBrains Mono", monospace';
            ctx.textAlign = 'center';

            // Título de la Constelación Estival (arriba)
            const scSummerTitle = worldToScreen(CAMPS_ORIGIN_X, CAMPS_ORIGIN_Y - 200);
            ctx.fillStyle = 'rgba(255, 235, 180, 0.52)';
            ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
            ctx.shadowBlur = 6;
            ctx.fillText('☀️ CONSTELACIÓN ESTIVAL · CAMPAMENTOS DE VERANO', scSummerTitle.x, scSummerTitle.y);

            // Título de la Constelación de Semana Santa (abajo)
            const scEasterTitle = worldToScreen(CAMPS_ORIGIN_X, CAMPS_ORIGIN_Y + 215);
            ctx.fillStyle = 'rgba(167, 243, 208, 0.52)';
            ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
            ctx.shadowBlur = 6;
            ctx.fillText('🌸 CONSTELACIÓN EQUINOCCIAL · SEMANA SANTA Y PRIMAVERA', scEasterTitle.x, scEasterTitle.y);

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

            // Campamentos (2) y las mini-estrellas de Cajones (sector 3 pero no El Baúl) van en blanco puro sin color, salvo la última estrella que es roja
            const isPureWhiteStar = (nd.sectorIndex === 2 && !nd.isRedStar) || (nd.sectorIndex === 3 && !nd.isBaulMain);

            const scale = superZoomState
                ? clamp(camera.zoom * 0.72, 1.0, 22.0)
                : clamp(camera.zoom, 0.55, 2.2);
            const r = (nd.r || 5) * scale + nd.hover * 3.2;

            // Halo radial
            const glowR = r * (nd.isMainCross || nd.isClusterHub || isHovered ? 4.8 : 3.2);
            const g = ctx.createRadialGradient(sx, sy, 0, sx, sy, glowR);
            g.addColorStop(0, anniversaryLerp > 0.3 ? '#FFF3B0' : (nd.isRedStar ? '#FFA39E' : '#FFFFFF'));
            g.addColorStop(
                0.35,
                anniversaryLerp > 0.35
                    ? (isHovered || isSelectedInSector ? 'rgba(212, 175, 55, 0.42)' : 'rgba(212, 175, 55, 0.22)')
                    : (nd.isRedStar
                        ? (isHovered || isSelectedInSector ? 'rgba(239, 68, 68, 0.55)' : 'rgba(217, 56, 58, 0.38)')
                        : (nd.isBaulMain
                            ? (isHovered || isSelectedInSector ? 'rgba(217, 56, 58, 0.30)' : 'rgba(217, 56, 58, 0.16)')
                            : (nd.clusterType === 'unit'
                                ? (isHovered || isSelectedInSector ? (nd.ringColor || 'rgba(255, 255, 255, 0.22)') : (nd.halo || 'rgba(255, 255, 255, 0.12)'))
                                : (isPureWhiteStar
                                    ? (isHovered || isSelectedInSector ? 'rgba(255, 255, 255, 0.28)' : 'rgba(255, 255, 255, 0.16)')
                                    : ((isHovered || isSelectedInSector)
                                        ? 'rgba(217, 56, 58, 0.30)'
                                        : (nd.halo || 'rgba(255, 255, 255, 0.18)'))))))
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
                if (anniversaryLerp > 0.35) {
                    ringStroke = (isHovered || isSelectedInSector) ? 'rgba(243, 229, 171, 0.85)' : 'rgba(212, 175, 55, 0.45)';
                } else if (nd.isRedStar) {
                    ringStroke = (isHovered || isSelectedInSector) ? 'rgba(239, 68, 68, 0.95)' : 'rgba(217, 56, 58, 0.65)';
                } else if (nd.isBaulMain) {
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

            // Núcleo
            ctx.fillStyle = nd.isRedStar ? '#EF4444' : '#FFFFFF';
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

                // Sombra suave que garantiza legibilidad cinematográfica sin importar el fondo
                ctx.shadowColor = 'rgba(0, 0, 0, 0.90)';
                ctx.shadowBlur = 5;

                if (nd.isRedStar) {
                    ctx.fillStyle = (isHovered || isSelectedInSector) ? '#FFA39E' : '#FF6B6B';
                } else {
                    ctx.fillStyle = (isHovered || isSelectedInSector)
                        ? (anniversaryLerp > 0.35 ? '#FFF3B0' : '#FFFFFF')
                        : (anniversaryLerp > 0.35 ? 'rgba(243, 229, 171, 0.75)' : 'rgba(255, 255, 255, 0.74)');
                }

                if (nd.labelPos === 'top') {
                    ctx.textAlign = 'center';
                    ctx.fillText(nd.symbol, sx, sy - r * 1.35 - 9);
                } else if (nd.labelPos === 'bottom') {
                    ctx.textAlign = 'center';
                    ctx.fillText(nd.symbol, sx, sy + r * 1.35 + 17);
                } else if (nd.labelPos === 'left') {
                    ctx.textAlign = 'right';
                    ctx.fillText(nd.symbol, sx - r * 1.35 - 9, sy + 4);
                } else {
                    ctx.textAlign = 'left';
                    ctx.fillText(nd.symbol, sx + r * 1.35 + 8, sy + 4);
                }
                ctx.restore();
            }
        }

        // ---------------------------------------------------------------------
        // G. LA ESPIRAL DEL TIEMPO: 50 ESTRELLAS DORADAS (1976 - 2026)
        // ---------------------------------------------------------------------
        if (anniversaryLerp > 0.005) {
            hoveredAnniversaryStar = null;

            // 1. Proyectar coordenadas y verificar hover magnético de las 50 estrellas
            for (let a = 0; a < aniversarioFotos.length; a++) {
                const st = aniversarioFotos[a];
                const sc = worldToScreen(st.wx, st.wy);
                st.sx = sc.x;
                st.sy = sc.y;

                if (!superZoomState) {
                    const d = Math.hypot(pointer.lerpX - sc.x, pointer.lerpY - sc.y);
                    if (d < 26 && !hoveredAnniversaryStar) {
                        hoveredAnniversaryStar = st;
                        st.hover += (1.0 - st.hover) * 0.22;
                    } else {
                        st.hover += (0.0 - st.hover) * 0.14;
                    }
                } else {
                    st.hover = 0;
                }
            }

            // 2. Filamento áureo de la espiral logarítmica (conecta los 50 años)
            ctx.save();
            ctx.beginPath();
            let firstDrawn = false;
            for (let a = 0; a < aniversarioFotos.length; a++) {
                const st = aniversarioFotos[a];
                if (!firstDrawn) {
                    ctx.moveTo(st.sx, st.sy);
                    firstDrawn = true;
                } else {
                    ctx.lineTo(st.sx, st.sy);
                }
            }
            ctx.strokeStyle = `rgba(212, 175, 55, ${(0.22 * anniversaryLerp).toFixed(3)})`;
            ctx.lineWidth = 1.0;
            ctx.setLineDash([3, 6]);
            ctx.stroke();
            ctx.setLineDash([]);
            ctx.restore();

            // 3. Renderizar cada una de las 50 estrellas doradas
            for (let a = 0; a < aniversarioFotos.length; a++) {
                const st = aniversarioFotos[a];
                if (st.sx < -120 || st.sx > vw + 120 || st.sy < -120 || st.sy > vh + 120) continue;

                const starScale = clamp(camera.zoom, 0.55, 2.2);
                const r = (st.r * starScale) + st.hover * 3.2;

                if (st.isUnlocked) {
                    // Estrellas con fotografía asignada: brillo intenso, pulso dorado y halo
                    const pulse = 1.0 + Math.sin(elapsed * 2.8 + a * 0.38) * 0.22;
                    const glowR = r * 3.8 * pulse;
                    const g = ctx.createRadialGradient(st.sx, st.sy, 0, st.sx, st.sy, glowR);
                    g.addColorStop(0, '#FFFFFF');
                    g.addColorStop(0.25, `rgba(255, 243, 176, ${(0.72 * anniversaryLerp).toFixed(3)})`);
                    g.addColorStop(0.65, `rgba(212, 175, 55, ${(0.32 * anniversaryLerp).toFixed(3)})`);
                    g.addColorStop(1, 'rgba(212, 175, 55, 0)');
                    ctx.fillStyle = g;
                    ctx.beginPath();
                    ctx.arc(st.sx, st.sy, glowR, 0, Math.PI * 2);
                    ctx.fill();

                    // Núcleo blanco brillante
                    ctx.fillStyle = '#FFFFFF';
                    ctx.beginPath();
                    ctx.arc(st.sx, st.sy, r * 0.52, 0, Math.PI * 2);
                    ctx.fill();

                    // Anillo orbital sutil al hacer hover
                    if (st.hover > 0.05) {
                        ctx.strokeStyle = 'rgba(255, 243, 176, 0.88)';
                        ctx.lineWidth = 1.25;
                        ctx.beginPath();
                        ctx.arc(st.sx, st.sy, r * 1.95, 0, Math.PI * 2);
                        ctx.stroke();
                    }

                    // Tipografía del año cronológico
                    ctx.save();
                    ctx.font = '600 9.5px "JetBrains Mono", monospace';
                    ctx.fillStyle = `rgba(243, 229, 171, ${(0.88 * anniversaryLerp).toFixed(3)})`;
                    ctx.fillText(st.year.toString(), st.sx + r * 1.2 + 5, st.sy + 3.5);
                    ctx.restore();
                } else {
                    // Estrellas sin foto todavía: menor opacidad (0.35) manteniendo la geometría perfecta
                    ctx.save();
                    ctx.globalAlpha = 0.35 * anniversaryLerp;
                    ctx.fillStyle = '#D4AF37';
                    ctx.beginPath();
                    ctx.arc(st.sx, st.sy, r * 0.45, 0, Math.PI * 2);
                    ctx.fill();

                    ctx.font = '400 8.5px "JetBrains Mono", monospace';
                    ctx.fillStyle = '#AA771C';
                    ctx.fillText(st.year.toString(), st.sx + r * 1.1 + 4, st.sy + 3);
                    ctx.restore();
                }
            }
        }

        // ---------------------------------------------------------------------
        // H. EL COMETA DORADO · EASTER EGG DE PASO RÁPIDO Y CELESTIAL
        // ---------------------------------------------------------------------
        if (goldenComet.state === 'waiting') {
            goldenComet.waitTimer -= dt;
            if (goldenComet.waitTimer <= 0 && activeSectorIdx === 0 && !superZoomState) {
                goldenComet.state = 'flying';
                goldenComet.flightProgress = 0;
                goldenComet.flightDuration = 3.4 + Math.random() * 0.8; // 3.4s a 4.2s (ritmo majestuoso y alcanzable)
                const traj = COMET_TRAJECTORIES[Math.floor(Math.random() * COMET_TRAJECTORIES.length)];
                goldenComet.currentTraj = {
                    x0: traj.x0 + (Math.random() - 0.5) * 60,
                    y0: traj.y0 + (Math.random() - 0.5) * 50,
                    x1: traj.x1 + (Math.random() - 0.5) * 60,
                    y1: traj.y1 + (Math.random() - 0.5) * 50
                };
            }
        } else if (goldenComet.state === 'flying') {
            goldenComet.flightProgress += dt / goldenComet.flightDuration;
            if (goldenComet.flightProgress >= 1.0) {
                // Termina su cruce y desaparece en el cosmos profundo
                goldenComet.state = 'waiting';
                goldenComet.waitTimer = 7.5 + Math.random() * 4.5; // Próximo paso en 7-12 segundos
                goldenComet.wx = -9999;
                goldenComet.wy = -9999;
                goldenComet.sx = -9999;
                goldenComet.sy = -9999;
                goldenComet.alpha = 0;
                goldenComet.hover = 0;
                goldenComet.isHovered = false;
            } else {
                const tr = goldenComet.currentTraj;
                const p = goldenComet.flightProgress;
                goldenComet.wx = tr.x0 + (tr.x1 - tr.x0) * p;
                goldenComet.wy = tr.y0 + (tr.y1 - tr.y0) * p;

                const scComet = worldToScreen(goldenComet.wx, goldenComet.wy);
                goldenComet.sx = scComet.x;
                goldenComet.sy = scComet.y;

                // Transición sutil de visibilidad (fade in / fade out fluido)
                let cAlpha = 1.0;
                if (p < 0.12) cAlpha = p / 0.12;
                else if (p > 0.85) cAlpha = (1.0 - p) / 0.15;
                goldenComet.alpha = clamp(cAlpha, 0, 1);

                // Vector direccional del cometa
                const dxV = tr.x1 - tr.x0;
                const dyV = tr.y1 - tr.y0;
                const vLen = Math.hypot(dxV, dyV) || 1;
                const normVx = dxV / vLen;
                const normVy = dyV / vLen;
                const tailX = -normVx;
                const tailY = -normVy;

                // Reto Easter Egg: detección de proximidad
                const distToComet = Math.hypot(pointer.lerpX - scComet.x, pointer.lerpY - scComet.y);
                if (distToComet < 42 && !superZoomState) {
                    goldenComet.hover += (1.0 - goldenComet.hover) * 0.28;
                    goldenComet.isHovered = true;
                } else {
                    goldenComet.hover += (0.0 - goldenComet.hover) * 0.22;
                    goldenComet.isHovered = false;
                }

                // Generación de micro-polvo de oro en la estela
                if (goldenComet.alpha > 0.08) {
                    for (let sp = 0; sp < 2; sp++) {
                        const pSpd = 1.6 + Math.random() * 2.2;
                        goldenComet.trail.push({
                            x: goldenComet.sx + (Math.random() - 0.5) * 3,
                            y: goldenComet.sy + (Math.random() - 0.5) * 3,
                            vx: tailX * pSpd + (Math.random() - 0.5) * 0.8,
                            vy: tailY * pSpd + (Math.random() - 0.5) * 0.8,
                            life: 1.0,
                            decay: 0.024 + Math.random() * 0.024, // Desvanecimiento fluido (~0.5s)
                            size: 1.2 + Math.random() * 2.0,
                            color: Math.random() > 0.4 ? '#FFF3B0' : '#D4AF37'
                        });
                    }
                }

                // Dibujar el trazo de estela luminoso del cometa (aerodinámico, fino y elegante)
                const cometScale = clamp(camera.zoom, 0.65, 1.8);
                const tailLen = (52 + goldenComet.hover * 15) * cometScale;
                const tailEndX = goldenComet.sx + tailX * tailLen;
                const tailEndY = goldenComet.sy + tailY * tailLen;

                ctx.save();
                const tailGrad = ctx.createLinearGradient(goldenComet.sx, goldenComet.sy, tailEndX, tailEndY);
                tailGrad.addColorStop(0, `rgba(255, 255, 255, ${(0.92 * goldenComet.alpha).toFixed(3)})`);
                tailGrad.addColorStop(0.25, `rgba(255, 243, 176, ${(0.75 * goldenComet.alpha).toFixed(3)})`);
                tailGrad.addColorStop(0.7, `rgba(212, 175, 55, ${(0.25 * goldenComet.alpha).toFixed(3)})`);
                tailGrad.addColorStop(1, 'rgba(212, 175, 55, 0)');

                ctx.beginPath();
                ctx.moveTo(goldenComet.sx, goldenComet.sy);
                ctx.lineTo(tailEndX, tailEndY);
                ctx.strokeStyle = tailGrad;
                ctx.lineWidth = Math.max(1, 2.2 * cometScale);
                ctx.stroke();

                // Cabeza y núcleo compacto (Cero halo/aro sobredimensionado)
                const coreR = (goldenComet.r * cometScale);
                const miniGlowR = coreR * 2.4;

                const headGrad = ctx.createRadialGradient(goldenComet.sx, goldenComet.sy, 0, goldenComet.sx, goldenComet.sy, miniGlowR);
                headGrad.addColorStop(0, `rgba(255, 255, 255, ${(0.98 * goldenComet.alpha).toFixed(3)})`);
                headGrad.addColorStop(0.4, `rgba(255, 243, 176, ${(0.7 * goldenComet.alpha).toFixed(3)})`);
                headGrad.addColorStop(1, 'rgba(212, 175, 55, 0)');
                ctx.fillStyle = headGrad;
                ctx.beginPath();
                ctx.arc(goldenComet.sx, goldenComet.sy, miniGlowR, 0, Math.PI * 2);
                ctx.fill();

                // Punto central blanco puro brillante
                ctx.fillStyle = `rgba(255, 255, 255, ${(goldenComet.alpha).toFixed(3)})`;
                ctx.beginPath();
                ctx.arc(goldenComet.sx, goldenComet.sy, 1.8 * cometScale, 0, Math.PI * 2);
                ctx.fill();

                // Destello fino en cruz
                const sparkLen = 4.2 * cometScale;
                ctx.strokeStyle = `rgba(255, 243, 176, ${(0.8 * goldenComet.alpha).toFixed(3)})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(goldenComet.sx - sparkLen, goldenComet.sy);
                ctx.lineTo(goldenComet.sx + sparkLen, goldenComet.sy);
                ctx.moveTo(goldenComet.sx, goldenComet.sy - sparkLen);
                ctx.lineTo(goldenComet.sx, goldenComet.sy + sparkLen);
                ctx.stroke();
                ctx.restore();
            }
        }

        // Renderizar partículas vivas de la estela
        for (let t = goldenComet.trail.length - 1; t >= 0; t--) {
            const pt = goldenComet.trail[t];
            pt.x += pt.vx;
            pt.y += pt.vy;
            pt.life -= pt.decay;
            if (pt.life <= 0) {
                goldenComet.trail.splice(t, 1);
                continue;
            }
            ctx.save();
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, pt.size * pt.life, 0, Math.PI * 2);
            ctx.fillStyle = pt.color;
            ctx.globalAlpha = pt.life * 0.75;
            ctx.fill();
            ctx.restore();
        }

        // ---------------------------------------------------------------------
        // I. LA SUPERNOVA (ONDA EXPANSIVA CIRCULAR DE POLVO DORADO A 60FPS)
        // ---------------------------------------------------------------------
        if (supernovaShockwave.active) {
            const p = (now - supernovaShockwave.startTime) / supernovaShockwave.duration;
            if (p >= 1.0) {
                supernovaShockwave.active = false;
            } else {
                const waveR = smoothstep(0, 1, p) * supernovaShockwave.maxRadius;
                const alpha = (1.0 - p);

                ctx.save();
                // Anillo de choque dorado
                ctx.beginPath();
                ctx.arc(supernovaShockwave.originX, supernovaShockwave.originY, waveR, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(255, 243, 176, ${(alpha * 0.82).toFixed(3)})`;
                ctx.lineWidth = Math.max(1, 3.6 * alpha);
                ctx.shadowColor = '#D4AF37';
                ctx.shadowBlur = 18 * alpha;
                ctx.stroke();

                // Partículas de polvo de oro en la cresta de la onda
                for (let k = 0; k < supernovaShockwave.particles.length; k++) {
                    const sp = supernovaShockwave.particles[k];
                    const pr = waveR * sp.distFactor;
                    const px = supernovaShockwave.originX + Math.cos(sp.angle) * pr;
                    const py = supernovaShockwave.originY + Math.sin(sp.angle) * pr;

                    ctx.beginPath();
                    ctx.arc(px, py, sp.size * alpha, 0, Math.PI * 2);
                    ctx.fillStyle = sp.color;
                    ctx.globalAlpha = sp.alpha * alpha;
                    ctx.fill();
                }
                ctx.restore();
            }
        }

        // Contextualizar cursor en hover sobre cometa o estrella de aniversario
        if (goldenComet.isHovered && goldenComet.state === 'flying') {
            if (cursorRing) cursorRing.classList.add('is-star-hover');
            if (cursorLabel) cursorLabel.textContent = anniversaryMode
                ? '✦ ¡ATRÁPALO! (REVERTIR)'
                : '✦ ¡ATRÁPALO! (50º ANIVERSARIO)';
        } else if (hoveredAnniversaryStar) {
            if (cursorRing) cursorRing.classList.add('is-star-hover');
            if (cursorLabel) {
                cursorLabel.textContent = hoveredAnniversaryStar.isUnlocked
                    ? `★ ${hoveredAnniversaryStar.year} · ${hoveredAnniversaryStar.title}`
                    : `Año ${hoveredAnniversaryStar.year} · Recuerdo histórico por desbloquear`;
            }
        }

        requestAnimationFrame(animate);
    }

    // =========================================================================
    // 12. SINCRONIZACIÓN EN TIEMPO REAL CON GOOGLE DRIVE (GAS WEB APP API)
    // =========================================================================
    function syncUnitsFromDrive(unidadesData) {
        if (!unidadesData || typeof unidadesData !== 'object') return;
        UNITS_DATA.forEach(unit => {
            const driveKraal = unidadesData[unit.id];
            if (Array.isArray(driveKraal) && driveKraal.length > 0) {
                unit.kraaletes = driveKraal.map((k, i) => ({
                    star: k.star || `★ ${i + 1} · ${unit.shortName}`,
                    name: k.name || 'Scouter',
                    role: k.role || 'Kraalete',
                    cromoUrl: k.cromoUrl || k.fotoUrl || null
                }));
            }
        });
    }

    function syncCoordinacionFromDrive(coordData) {
        if (!Array.isArray(coordData) || coordData.length === 0) return;
        coordinadoresDrive = coordData;
        const starCoord = SECTORS[4]?.stars?.find(s => s.id === 'canal-coordinacion');
        if (starCoord) {
            const names = coordData.map(c => c.name).join(', ');
            starCoord.title = `Contacto Directo: ${names}`;
            starCoord.pillars = coordData.slice(0, 3).map(c => `📞 ${c.name}: ${c.telefono || c.phone || ''} (${c.cargo || c.role || 'Coordinación'})`);
            if (activeSectorIdx === 4) {
                syncSectorUI(4, selectedSubIdx, true);
            }
        }
    }

    function syncCajonesFromDrive(cajonesData) {
        if (typeof rebuildLostConstellation === 'function') {
            rebuildLostConstellation(cajonesData);
        }
    }

    function syncAnniversaryFromDrive(annivData) {
        if (!annivData) return;
        const items = Array.isArray(annivData)
            ? annivData
            : Object.entries(annivData).map(([year, val]) => ({ year, ...(typeof val === 'object' ? val : {}) }));

        items.forEach(item => {
            const y = parseInt(item.year, 10);
            const star = aniversarioFotos.find(s => s.year === y);
            if (star) {
                star.isUnlocked = true;
                if (item.title) star.title = item.title;
                if (item.desc) star.desc = item.desc;
                if (item.photoUrl) star.photoUrl = item.photoUrl;
                if (item.driveUrl) star.driveUrl = item.driveUrl;
                star.r = 5.6;
            }
        });
    }

    async function fetchDriveData() {
        try {
            const res = await fetch(DRIVE_API_URL);
            if (!res.ok) throw new Error(`HTTP error ${res.status}`);
            const text = await res.text();
            if (text.trim().startsWith('<')) {
                console.warn('Google Drive Sync: El endpoint devolvió HTML (pantalla de login de Google). En Google Apps Script ve a Implementar > Gestionar implementaciones > Editar > Quién tiene acceso: "Cualquier persona" (Anyone).');
                return;
            }
            const data = JSON.parse(text);
            if (data) {
                if (data.campamentos !== undefined) {
                    rebuildCampsConstellation(data.campamentos);
                }
                if (data.unidades) {
                    syncUnitsFromDrive(data.unidades);
                }
                if (data.coordinacion && data.coordinacion.length > 0) {
                    syncCoordinacionFromDrive(data.coordinacion);
                }
                if (data.cajones !== undefined) {
                    rebuildLostConstellation(data.cajones);
                }
                if (data.aniversario) {
                    syncAnniversaryFromDrive(data.aniversario);
                }
            }
        } catch (err) {
            console.warn('Google Drive Sync: operando en modo offline / fallback.', err);
        }
    }

    window.fetchDriveData = fetchDriveData;
    window.syncUnitsFromDrive = syncUnitsFromDrive;
    window.syncCoordinacionFromDrive = syncCoordinacionFromDrive;
    window.syncCajonesFromDrive = syncCajonesFromDrive;
    window.rebuildLostConstellation = rebuildLostConstellation;
    window.syncAnniversaryFromDrive = syncAnniversaryFromDrive;

    try {
        const search = window.location.search || (window.location.hash ? window.location.hash.substring(1) : '');
        const urlParams = new URLSearchParams(search.startsWith('?') ? search : '?' + search);
        if (urlParams.has('anniversary')) {
            toggleAnniversaryMode(true);
        }
        if (urlParams.has('testComet')) {
            goldenComet.state = 'flying';
            goldenComet.flightProgress = 0.45;
            goldenComet.flightDuration = 1.85;
            goldenComet.currentTraj = COMET_TRAJECTORIES[0];
            goldenComet.alpha = 1.0;
        }
        if (urlParams.has('annivModal')) {
            toggleAnniversaryMode(true);
            openAnniversaryModal(urlParams.get('annivModal'));
        }
        if (urlParams.has('sector')) {
            goToSector(parseInt(urlParams.get('sector'), 10), 0, true);
        }
        if (urlParams.has('unit')) {
            setTimeout(() => {
                openUnitModal(parseInt(urlParams.get('unit'), 10));
            }, 50);
        }
    } catch (_) {}

    // Iniciar sincronización en tiempo real con Google Drive
    fetchDriveData();

    requestAnimationFrame(animate);
})();

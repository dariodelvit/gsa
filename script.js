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
            bannerImg: 'images/Castores.jpg',
            socialUrl: null,
            socialLabel: null,
            accentColor: '#38BDF8',
            glowColor: 'rgba(56, 189, 248, 0.12)',
            ringColor: 'rgba(56, 189, 248, 0.38)',
            hoverRingColor: 'rgba(56, 189, 248, 0.68)',
            dx: -240,
            dy: 160,
            r: 7.2,
            lead: 'Nuestra Colonia Ohiensis está ambientada en el libro «La Vida en el Estanque». Junto a Kid, Moi y Piko, los pequeños castores viven en su acogedora madriguera de palitos, barro y virutas, trabajan en equipo manteniendo la Presa sobre el río «Gran Hermano» y aprenden con los Grandes Castores, el sabio búho Malak y la Familia Jones que en la Colonia todo se comparte.',
            lawQuote: '«El castor que es obediente, trabajador, limpio y ordenado, que participa en todo, que juega con todos y comparte con alegría, llega a ser un castor alegre y feliz recordando siempre las enseñanzas de la Colonia.» — La Vida en el Estanque',
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
                    <rect width="560" height="205" fill="url(#skyCastores)"/>
                    <path d="M 40 190 Q 280 -20 520 190" fill="none" stroke="url(#rainbowArc)" stroke-width="14" stroke-linecap="round"/>
                    <circle cx="95" cy="58" r="24" fill="#FDE047"/>
                    <circle cx="95" cy="58" r="34" fill="#FDE047" opacity="0.32"/>
                    <polygon points="0,185 95,88 195,185" fill="#1E3A5F"/>
                    <polygon points="95,88 68,125 122,125" fill="#F8FAFC"/>
                    <polygon points="150,185 265,72 385,185" fill="#152C4A"/>
                    <polygon points="265,72 232,116 298,116" fill="#F8FAFC"/>
                    <polygon points="35,185 60,115 85,185" fill="#15803D"/>
                    <polygon points="75,185 102,105 130,185" fill="#166534"/>
                    <polygon points="390,185 422,95 455,185" fill="#166534"/>
                    <polygon points="440,185 470,108 500,185" fill="#15803D"/>
                    <rect x="488" y="95" width="22" height="92" fill="#5C3A21"/>
                    <circle cx="498" cy="78" r="46" fill="#14532D"/>
                    <ellipse cx="478" cy="96" rx="9" ry="12" fill="#78350F"/>
                    <circle cx="475" cy="93" r="2.5" fill="#F59E0B"/>
                    <circle cx="481" cy="93" r="2.5" fill="#F59E0B"/>
                    <rect y="182" width="560" height="138" fill="url(#pondWater)"/>
                    <path d="M 105 225 Q 155 162 205 225 Z" fill="#78350F" stroke="#B45309" stroke-width="3"/>
                    <line x1="120" y1="215" x2="190" y2="195" stroke="#D97706" stroke-width="3"/>
                    <line x1="130" y1="195" x2="185" y2="218" stroke="#F59E0B" stroke-width="2.5"/>
                    <ellipse cx="295" cy="225" rx="34" ry="10" fill="#6B4423"/>
                    <ellipse cx="295" cy="208" rx="14" ry="16" fill="#E2E8F0" stroke="#94A3B8" stroke-width="2"/>
                    <circle cx="295" cy="192" r="10" fill="#F1F5F9"/>
                    <ellipse cx="314" cy="215" rx="11" ry="5" fill="#94A3B8"/>
                    <circle cx="405" cy="252" r="11" fill="#92400E"/>
                    <ellipse cx="422" cy="257" rx="12" ry="5" fill="#78350F"/>
                    <path d="M 382 248 Q 372 232 364 242 M 436 246 Q 446 230 454 240" stroke="#E0F2FE" stroke-width="2.5" fill="none"/>
                    <rect x="20" y="286" width="520" height="14" rx="7" fill="#78350F" stroke="#D97706" stroke-width="2"/>
                    <text x="24" y="34" fill="#FFFFFF" font-family="JetBrains Mono, monospace" font-size="11" font-weight="600">✦ EL ESTANQUE DEL GRAN ROBLE · «SPLASH, SPLASH, SPLASH»</text>
                </svg>
            `,
            salidas: [],
            pillars: [
                { title: '1 · Castor sin Paletas (Llegada al Estanque)', desc: 'Como Kid al salir de la madriguera: descubre la Colonia, aprende la llamada «¡Splash, Splash, Splash!» y hace sus primeros amigos.' },
                { title: '2 · Castor con Paletas (Como en el Gran Incendio)', desc: 'Tras aprender a ayudar y compartir el trabajo en la presa junto a los Grandes Castores y la Familia Jones, al castor le crecen las paletas.' },
                { title: '3 · Castor Plateado y «Nado Hacia Arriba»', desc: 'Siguiendo el ejemplo de Keeo, comparte siempre con alegría y se prepara en el remolino del Gran Roble para nadar río arriba hacia el río Waigunga y la Manada.' }
            ],
            kraalTitle: 'Kraal de la Colonia Ohiensis',
            kraalSub: 'Scouters de Castores (Kraaletes de Colonia)',
            kraaletes: [
                { star: '★ Kibu', name: 'Kibu', role: 'Scouter de Colonia' },
                { star: '★ Malak', name: 'Malak', role: 'Scouter de Colonia' },
                { star: '★ Kapi', name: 'Kapi', role: 'Scouter de Colonia' },
                { star: '★ Tic-Tac', name: 'Tic-Tac', role: 'Scouter de Colonia' },
                { star: '★ Burbuja', name: 'Burbuja', role: 'Scouter de Colonia' },
                { star: '★ Rusty', name: 'Rusty', role: 'Scouter de Colonia' }
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
            bannerImg: 'images/Manada.jpg',
            socialUrl: null,
            socialLabel: null,
            accentColor: '#FBBF24',
            glowColor: 'rgba(251, 191, 36, 0.12)',
            ringColor: 'rgba(251, 191, 36, 0.38)',
            hoverRingColor: 'rgba(251, 191, 36, 0.68)',
            dx: -120,
            dy: 80,
            r: 7.2,
            lead: 'Al terminar el «Nado Hacia Arriba» por el Gran Hermano, los castores llegan al río Waigunga en la Selva de Seeonee («El Libro de las Tierras Vírgenes» de Rudyard Kipling). Allí Akela, Baloo, Bagheera y los Viejos Lobos los acogen con el Gran Clamor en la Manada Khanhiwara.',
            lawQuote: '«El Lobato escucha y obedece al Viejo Lobo. El Lobato se vence a sí mismo.» — Ley de la Manada de Seeonee',
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
                    <polygon points="272,112 296,112 290,86 278,86" fill="#090D16"/>
                    <polygon points="25,320 65,175 105,320" fill="#064E3B"/>
                    <polygon points="455,320 498,165 542,320" fill="#064E3B"/>
                    <path d="M 0 285 Q 280 255 560 295 L 560 320 L 0 320 Z" fill="#022C22"/>
                    <text x="24" y="34" fill="#FEF08A" font-family="JetBrains Mono, monospace" font-size="11" font-weight="600">✦ LA ROCA DEL CONSEJO · SELVA DE SEEONEE</text>
                </svg>
            `,
            salidas: [],
            pillars: [
                { title: 'La Selva de Seeonee y la Roca del Consejo', desc: 'Espacio de asamblea donde la Manada valora sus cazas, celebra promesas y aprende a escucharse.' },
                { title: 'La Senda de Mowgli (Progresión)', desc: 'Cuatro etapas de crecimiento: Huella Tierna, Lobo Saltador, Lobo Rastreador y Lobo Cazador.' },
                { title: 'Vida en Seisenas', desc: 'Pequeños grupos de seis lobatos donde los mayores acompañan y enseñan con el ejemplo a los más jóvenes.' }
            ],
            kraalTitle: 'Kraal de la Manada Khanhiwara',
            kraalSub: 'Los Viejos Lobos (Kraaletes de Manada)',
            kraaletes: [
                { star: '★ Baloo', name: 'Baloo', role: 'Viejo Lobo de Manada' },
                { star: '★ Raksa', name: 'Raksa', role: 'Viejo Lobo de Manada' },
                { star: '★ Akela', name: 'Akela', role: 'Viejo Lobo de Manada' },
                { star: '★ Kotic', name: 'Kotic', role: 'Viejo Lobo de Manada' },
                { star: '★ Rikki', name: 'Rikki', role: 'Viejo Lobo de Manada' },
                { star: '★ Bagheera', name: 'Bagheera', role: 'Viejo Lobo de Manada' },
                { star: '★ Fao', name: 'Fao', role: 'Viejo Lobo de Manada' },
                { star: '★ Kaa', name: 'Kaa', role: 'Viejo Lobo de Manada' },
                { star: '★ Hermano Gris', name: 'Hermano Gris', role: 'Viejo Lobo de Manada' }
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
            bannerImg: 'images/Tropa.jpg',
            socialUrl: null,
            socialLabel: null,
            accentColor: '#34D399',
            glowColor: 'rgba(52, 211, 153, 0.12)',
            ringColor: 'rgba(52, 211, 153, 0.38)',
            hoverRingColor: 'rgba(52, 211, 153, 0.68)',
            dx: 0,
            dy: 0,
            r: 7.4,
            lead: 'Inspirada en la leyenda medieval de Lohengrin, el Caballero del Cisne: aquel misterioso guardián del Santo Grial que acudió navegando en una barca tirada por un cisne blanco para defender el honor de una joven injustamente acusada, pidiendo solo que jamás preguntasen su nombre. En la Tropa Lohengrin vivimos ese mismo ideal de honor, lealtad y aventura organizada en Patrullas autónomas, pionerismo y Aymaras.',
            lawQuote: '«Cifra su honor en ser digno de confianza, es leal, útil, amigo de todos y hermano de cualquier otro scout.» — El Honor del Caballero del Cisne (Ley Scout)',
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
                    <polygon points="150,275 235,165 320,275" fill="#D97706" stroke="#FEF08A" stroke-width="2.5"/>
                    <polygon points="210,275 235,165 260,275" fill="#92400E"/>
                    <line x1="380" y1="275" x2="425" y2="150" stroke="#FDE68A" stroke-width="4"/>
                    <line x1="460" y1="275" x2="415" y2="150" stroke="#FDE68A" stroke-width="4"/>
                    <line x1="420" y1="275" x2="420" y2="145" stroke="#F59E0B" stroke-width="4"/>
                    <rect y="272" width="560" height="48" fill="#022C22"/>
                    <text x="24" y="34" fill="#A7F3D0" font-family="JetBrains Mono, monospace" font-size="11" font-weight="600">✦ TROPA LOHENGRIN · EL CABALLERO DEL CISNE Y LAS PATRULLAS</text>
                </svg>
            `,
            salidas: [],
            pillars: [
                { title: 'La Leyenda del Caballero del Cisne (Lohengrin)', desc: 'De los poemas medievales y el Parzival de Wolfram von Eschenbach a la ópera de Wagner: el protector del Santo Grial que llega en una barca tirada por un cisne para defender el honor y la justicia sin buscar fama ni recompensa.' },
                { title: 'La Corte de Honor y el Sistema de Patrullas', desc: 'Autonomía real en acampada, cargos de responsabilidad en cada Patrulla y toma de decisiones en la Corte de Honor bajo la palabra dada.' },
                { title: 'Las Aymaras y el Pionerismo', desc: 'Aventuras trimestrales ideadas por los propios troperos, construcciones en madera y sisal, orientación topográfica y vida en la naturaleza.' }
            ],
            kraalTitle: 'Kraal de la Tropa Lohengrin',
            kraalSub: 'Scouters de Tropa (Kraaletes de Lohengrin)',
            kraaletes: [
                { star: '★ Nadia', name: 'Nadia', role: 'Scouter de Tropa' },
                { star: '★ Ángel', name: 'Ángel', role: 'Scouter de Tropa' },
                { star: '★ Hugo', name: 'Hugo', role: 'Scouter de Tropa' },
                { star: '★ Jesús', name: 'Jesús', role: 'Scouter de Tropa' },
                { star: '★ Silvia', name: 'Silvia', role: 'Scouter de Tropa' },
                { star: '★ Edgar', name: 'Edgar', role: 'Scouter de Tropa' },
                { star: '★ Pablo', name: 'Pablo', role: 'Scouter de Tropa' },
                { star: '★ Ane', name: 'Ane', role: 'Scouter de Tropa' },
                { star: '★ Darío', name: 'Darío', role: 'Scouter de Tropa' }
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
            bannerImg: 'images/Escultas.jpg',
            socialUrl: 'https://www.instagram.com/escultas_trea/',
            socialLabel: '@escultas_trea',
            accentColor: '#A67B5B',
            glowColor: 'rgba(166, 123, 91, 0.12)',
            ringColor: 'rgba(166, 123, 91, 0.38)',
            hoverRingColor: 'rgba(166, 123, 91, 0.68)',
            dx: 120,
            dy: -80,
            r: 7.2,
            lead: 'Al ascender por la montaña arbolada y cruzar el sagrado Torii de los Ninjas se abre el territorio de la Unidad Esculta Trea: ambientada en los Ninjas en el Descenso del Sena, donde los jóvenes protagonizan sus propias «Empresas Escultas» autogestionadas, surcan aguas bravas en piragua y superan travesías de montaña.',
            lawQuote: '«Tras cruzar el Torii de la montaña, toda la Unidad rema y camina al mismo paso hacia la cumbre.» — Espíritu Ninja y Descenso · Unidad Esculta Trea',
            heroSvg: `
                <svg viewBox="0 0 560 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ilustración de la Unidad Esculta Trea">
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
                    <path d="M 190 65 L 255 180 L 295 240 L 245 320" stroke="#38BDF8" stroke-width="5" fill="none"/>
                    <text x="24" y="34" fill="#EDE0D4" font-family="JetBrains Mono, monospace" font-size="11" font-weight="600">✦ ESCULTAS TREA · EL TORII DE LOS NINJAS Y EL DESCENSO DEL SENA</text>
                </svg>
            `,
            salidas: [],
            pillars: [
                { title: 'Ninjas en el Descenso del Sena y Empresas Escultas', desc: 'Retos y aventuras de acción ideados, presupuestados, financiados y vividos íntegramente por los propios escultas en Asamblea.' },
                { title: 'El Camino del Torii y Superación en Montaña', desc: 'Ascensiones por laderas boscosas, orientación, vivac bajo las estrellas y espíritu de superación colectiva.' },
                { title: 'Unidad, Cohesión y Servicio Activo', desc: 'Sentido de pertenencia en el dojo esculta, pensamiento crítico y preparación para alcanzar las cumbres del Clan.' }
            ],
            kraalTitle: 'Kraal de la Unidad Esculta Trea',
            kraalSub: 'Scouters de Escultas (Kraaletes de Trea)',
            kraaletes: [
                { star: '★ Silvia', name: 'Silvia', role: 'Scouter de Unidad' },
                { star: '★ David', name: 'David', role: 'Scouter de Unidad' },
                { star: '★ JJ', name: 'JJ', role: 'Scouter de Unidad' },
                { star: '★ Lucia', name: 'Lucia', role: 'Scouter de Unidad' },
                { star: '★ Leonor', name: 'Leonor', role: 'Scouter de Unidad' }
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
            bannerImg: 'images/Clan.jpg',
            socialUrl: 'https://www.instagram.com/clan_amadablam/',
            socialLabel: '@clan_amadablam',
            accentColor: '#D9383A',
            glowColor: 'rgba(217, 56, 58, 0.12)',
            ringColor: 'rgba(217, 56, 58, 0.38)',
            hoverRingColor: 'rgba(217, 56, 58, 0.68)',
            dx: 240,
            dy: -160,
            r: 7.6,
            lead: 'En lo más alto de la cordillera, por encima del mar de nubes y tras subir escalando la gran pared de roca, brilla la Laguna Azul del Clan Ama Dablam: el manantial sagrado del que nace todo el río que desciende por la montaña alimentando a Escultas, Tropa, Manada y hasta el Estanque de los Castores.',
            lawQuote: '«Rema tu propia canoa en la Laguna Azul sobre las nubes y deja que tu servicio fluya como el río hacia todo el Grupo.» — Lema Rover «Servir»',
            heroSvg: `
                <svg viewBox="0 0 560 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ilustración de la Laguna Azul del Clan Ama Dablam">
                    <defs>
                        <linearGradient id="skyClan" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stop-color="#082F49"/>
                            <stop offset="55%" stop-color="#0284C7"/>
                            <stop offset="100%" stop-color="#38BDF8"/>
                        </linearGradient>
                    </defs>
                    <rect width="560" height="320" fill="url(#skyClan)"/>
                    <polygon points="60,320 280,42 500,320" fill="#1E293B" stroke="#38BDF8" stroke-width="2"/>
                    <polygon points="280,42 225,112 280,96 335,112" fill="#F8FAFC"/>
                    <circle cx="280" cy="22" r="4" fill="#FFFFFF"/>
                    <text x="24" y="34" fill="#E0F2FE" font-family="JetBrains Mono, monospace" font-size="11" font-weight="600">✦ LA LAGUNA AZUL SOBRE LAS NUBES · CLAN AMA DABLAM</text>
                </svg>
            `,
            salidas: [],
            pillars: [
                { title: 'La Laguna Azul por Encima de las Nubes (Origen del Río)', desc: 'Alcanzada escalando por encima del mar de nubes: de sus aguas cristalinas nace el gran río que baja dando vida a todas las unidades hasta el Estanque de los Castores.' },
                { title: 'La Horquilla Rover y el Lema «Servir»', desc: 'Símbolo de la elección consciente del propio camino, el voluntariado social y el apoyo constante a las ramas menores.' },
                { title: 'De Rover a Scouter (El Manantial del Grupo)', desc: 'Como el agua que baja desde la Laguna Azul hasta los Castores, los Rovers se forman para devolver al grupo todo lo aprendido.' }
            ],
            kraalTitle: 'Kraal del Clan Ama Dablam',
            kraalSub: 'Acompañantes Rovers (Kraaletes de Clan)',
            kraaletes: [
                { star: '★ Laura', name: 'Laura', role: 'Acompañante de Clan' },
                { star: '★ María', name: 'María', role: 'Acompañante de Clan' },
                { star: '★ Marta', name: 'Marta', role: 'Acompañante de Clan' },
                { star: '★ Victoria', name: 'Victoria', role: 'Acompañante de Clan' }
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

    // Coordinación dinámica de Grupo (desde Drive o fallback)
    let coordinadoresDrive = null;

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
            code: 'SECTOR I / IV · CRUX AUSTRALIS (LA CRUZ DEL SUR)',
            subtitle: 'ESTRELLA GUÍA · VALLADOLID (DESDE 1977)',
            coords: 'RA 12h 26m · DEC -63° 05\'',
            headingHTML: 'Cruz del Sur <span class="ice-italic">Acrux 518</span>',
            desc: 'La Cruz del Sur preside nuestra insignia desde 1977. En su pie brilla Acrux, el faro guía de nuestro grupo en Valladolid. Entra en Acrux para descubrir nuestra historia, la Base de Carretera de Rueda 53, Coordinación y cómo venir a probar un sábado.',
            worldX: 0,
            worldY: 0,
            baseZoom: 1.06,
            primaryBtnText: '✦ Entrar en Acrux · Historia, Base y Contacto',
            stars: [
                {
                    id: 'acrux',
                    symbol: '✦ α Acrux (Faro Guía)',
                    dx: 12,
                    dy: 172,
                    r: 12.0,
                    color: '#FFFFFF',
                    halo: 'rgba(217, 56, 58, 0.48)',
                    isMainCross: true,
                    isMainAcrux: true,
                    isClickable: true,
                    badge: 'Estrella Principal · Base de la Cruz',
                    title: 'α Crucis (Acrux) · El Faro que Nos Da Nombre',
                    body: 'Situada en el pie meridional de la Cruz del Sur, Acrux es la estrella guía de los navegantes y exploradores. Desde 1977 da nombre y rumbo al Grupo Scout Nº 518 en Valladolid.',
                    pillars: ['Fundado en Valladolid en 1977', 'ASDE Exploradores de Castilla y León', 'Educación en Valores']
                },
                {
                    id: 'gacrux',
                    symbol: 'γ Gacrux',
                    dx: -22,
                    dy: -192,
                    r: 6.8,
                    color: '#FFFFFF',
                    halo: 'rgba(255, 255, 255, 0.22)',
                    isMainCross: true,
                    isClickable: false
                },
                {
                    id: 'mimosa',
                    symbol: 'β Mimosa',
                    dx: -152,
                    dy: -16,
                    r: 7.0,
                    color: '#FFFFFF',
                    halo: 'rgba(255, 255, 255, 0.22)',
                    isMainCross: true,
                    isClickable: false
                },
                {
                    id: 'imai',
                    symbol: 'δ Imai',
                    dx: 104,
                    dy: -74,
                    r: 6.0,
                    color: '#FFFFFF',
                    halo: 'rgba(255, 255, 255, 0.18)',
                    isMainCross: true,
                    isClickable: false
                },
                {
                    id: 'intrometida',
                    symbol: 'ε Intrometida',
                    dx: 50,
                    dy: 30,
                    r: 5.2,
                    color: '#FFFFFF',
                    halo: 'rgba(255, 255, 255, 0.16)',
                    isMainCross: true,
                    isClickable: false
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
            code: 'SECTOR II / IV · LÍNEA DE LAS UNIDADES',
            subtitle: 'CINCO RAMAS EDUCATIVAS · DE 6 A 21 AÑOS',
            coords: 'RA 15h 40m · DEC -48° 15\'',
            headingHTML: 'El Camino de <span class="ice-italic">las Unidades</span>',
            desc: 'Cinco estrellas trazan nuestro camino educativo desde los 6 hasta los 21 años: Colonia Ohiensis, Manada Khanhiwara, Tropa Lohengrin, Unidad Esculta Trea y Clan Rover Ama Dablam. Adéntrate en cada mundo para conocer su marco simbólico, sus Kraaletes y sus salidas.',
            worldX: UNITS_ORIGIN_X,
            worldY: UNITS_ORIGIN_Y,
            baseZoom: 1.0,
            primaryBtnText: '✦ Explorar el Mundo 3D de esta Unidad'
        },
        {
            index: 2,
            roman: 'III',
            code: 'SECTOR III / IV · CONSTELACIÓN DE CAMPAMENTOS',
            subtitle: 'EXPEDICIONES DE VERANO Y SEMANA SANTA · GOOGLE DRIVE',
            coords: 'RA 19h 12m · DEC -24° 50\'',
            headingHTML: 'Constelación de <span class="ice-italic">Campamentos</span>',
            desc: 'Cada estrella guarda la memoria viva de nuestras acampadas de verano y Semana Santa en plena naturaleza. Explora ambas constelaciones para revivir las expediciones y desbloquear los álbumes fotográficos del grupo.',
            worldX: CAMPS_ORIGIN_X,
            worldY: CAMPS_ORIGIN_Y,
            baseZoom: 1.02,
            primaryBtnText: '✦ Abrir Expediente y Álbum del Campamento',
            stars: [],
            edges: []
        },
        {
            index: 3,
            roman: 'IV',
            code: 'SECTOR IV / IV · CONSTELACIÓN «EL BAÚL» (OBJETOS PERDIDOS)',
            subtitle: 'ARCHIVO DE MATERIAL PERDIDO · CARPETAS GOOGLE DRIVE',
            coords: 'RA 22h 08m · DEC -12° 33\'',
            headingHTML: 'El Baúl · <span class="ice-italic">Objetos Perdidos</span>',
            desc: 'El archivo estelar donde reunimos las prendas y el material extraviado tras cada acampada y salida. Explora los cajones sincronizados con Google Drive para localizar tu equipo y reclamarlo antes del próximo sábado en la Base.',
            worldX: 420,
            worldY: 1580,
            baseZoom: 1.04,
            primaryBtnText: '✦ Abrir «El Baúl» de Objetos Perdidos',
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

    // 1. Registrar Sector I (Cruz del Sur) y Sector IV (Objetos Perdidos)
    [0, 3].forEach(sIdx => {
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
        // 0. Si viene directamente categorizado desde Google Drive (por subcarpeta Verano / Semana Santa)
        if (camp.seasonType === 'easter' || camp.seasonType === 'summer') {
            return camp.seasonType;
        }

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
            SECTORS[2].desc = 'Cada estrella guarda la memoria viva de nuestras acampadas: arriba brilla la Constelación Estival (verano) y abajo la Constelación Equinoccial (Semana Santa y primavera). Adéntrate en cada expedición para revivirla y abrir su álbum en Google Drive.';
        } else {
            SECTORS[2].baseZoom = 1.02;
            SECTORS[2].desc = 'Cada estrella guarda la memoria viva de nuestras acampadas del Grupo Scout ACRUX 518. Adéntrate en cada expedición para revivirla y abrir su álbum oficial en Google Drive.';
        }

        // Helper para generar etiquetas compactas de 2 líneas y evitar colisiones de texto
        function getCampDisplayLabels(rawName, greekLetter) {
            const yearMatch = (rawName || '').match(/\b(19\d\d|20\d\d)\b/);
            const year = yearMatch ? yearMatch[1] : '';

            let clean = (rawName || '')
                .replace(/\b(Campamento|Campamentos|de|del|Verano|Semana\s+Santa|Primavera|Acampada|Salida|Raid|en)\b/gi, '')
                .replace(/\b(19\d\d|20\d\d)\b/g, '')
                .replace(/[-_–·:]/g, ' ')
                .replace(/\s+/g, ' ')
                .trim();

            if (!clean) clean = (rawName || '').replace(/[-_]/g, ' ').trim();
            if (clean.length > 18) clean = clean.substring(0, 16) + '…';

            const line1 = `✦ ${greekLetter} ${year}`.trim();
            const line2 = clean;
            const starSymbol = year ? `✦ ${greekLetter} ${year} · ${clean}` : `✦ ${greekLetter} ${clean}`;

            return { line1, line2, starSymbol };
        }

        // 4. Construcción geométrica de la Constelación de Verano (Hemisferio Superior)
        const baseY_s = hasBothCampsConstellations ? -135 : 0;
        const spanX_s = Math.min(1450, Math.max(480, (N_s - 1) * 230));

        const summerCamps = rawSummer.map((c, idx) => {
            const letter = GREEK_ALPHABET[idx] || `★${idx + 1}`;
            const isLast = (idx === N_s - 1);
            const lbl = getCampDisplayLabels(c.name, letter);
            let dx = 0;
            let dy = baseY_s;

            if (N_s === 1) {
                dx = 0;
                dy = baseY_s - 15;
            } else {
                const t = idx / (N_s - 1);
                const baseX = -spanX_s * 0.5 + t * spanX_s;
                const jitterX = Math.cos(idx * 2.3 + 1.2) * 16;
                dx = Math.round(baseX + jitterX);

                const arcY = -Math.sin(t * Math.PI) * 45;
                const waveY = (idx % 2 === 0 ? -22 : 22) + Math.sin(t * Math.PI * 2.2) * 14;
                dy = Math.round(baseY_s + arcY + waveY);
            }

            const r = isLast ? 9.5 : (idx === 0 ? 8.2 : 6.8 + ((idx * 3 + 1) % 4) * 0.3);
            const labelPos = (idx % 2 === 0) ? 'top' : 'bottom';

            return {
                id: c.id || `camp-summer-${idx}`,
                seasonType: 'summer',
                seasonBadge: 'Campamento de Verano',
                starSymbol: lbl.starSymbol,
                labelLine1: lbl.line1,
                labelLine2: lbl.line2,
                name: c.name || `Campamento de Verano ${idx + 1}`,
                season: c.season || 'Campamento de Verano',
                location: c.location || '📍 Ubicación estival',
                driveFolderName: c.driveFolderName || c.name || 'Carpeta Drive',
                driveUrl: c.driveUrl || '',
                dx,
                dy,
                r,
                labelPos,
                isRedStar: isLast,
                isLastCamp: isLast,
                desc: c.desc || 'Campamento oficial de verano del Grupo Scout ACRUX 518 sincronizado con Google Drive.',
                photos: (c.photos || []).map(p => typeof p === 'string' ? { src: p, title: c.name, meta: 'Carpeta Google Drive' } : p)
            };
        });

        // 5. Construcción geométrica de la Constelación de Semana Santa (Hemisferio Inferior)
        const baseY_e = hasBothCampsConstellations ? +135 : 0;
        const spanX_e = Math.min(1400, Math.max(460, (N_e - 1) * 230));

        const easterCamps = rawEaster.map((c, idx) => {
            const letter = GREEK_ALPHABET[idx] || `✦${idx + 1}`;
            const isLast = (idx === N_e - 1);
            const lbl = getCampDisplayLabels(c.name, letter);
            let dx = 0;
            let dy = baseY_e;

            if (N_e === 1) {
                dx = 0;
                dy = baseY_e + 15;
            } else {
                const t = idx / (N_e - 1);
                const baseX = -spanX_e * 0.5 + t * spanX_e;
                const jitterX = Math.sin(idx * 2.1 + 0.8) * 16;
                dx = Math.round(baseX + jitterX);

                const arcY = Math.sin(t * Math.PI) * 35;
                const waveY = (idx % 2 === 0 ? 22 : -22) + Math.cos(t * Math.PI * 2.0) * 14;
                dy = Math.round(baseY_e + arcY + waveY);
            }

            const r = isLast ? 9.2 : (idx === 0 ? 8.0 : 6.6 + ((idx * 2 + 1) % 4) * 0.3);
            const labelPos = (idx % 2 === 0) ? 'bottom' : 'top';

            return {
                id: c.id || `camp-easter-${idx}`,
                seasonType: 'easter',
                seasonBadge: 'Semana Santa y Primavera',
                starSymbol: lbl.starSymbol,
                labelLine1: lbl.line1,
                labelLine2: lbl.line2,
                name: c.name || `Campamento de Semana Santa ${idx + 1}`,
                season: c.season || 'Campamento de Semana Santa',
                location: c.location || '📍 Ubicación de acampada',
                driveFolderName: c.driveFolderName || c.name || 'Carpeta Drive',
                driveUrl: c.driveUrl || '',
                dx,
                dy,
                r,
                labelPos,
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
            labelLine1: camp.labelLine1,
            labelLine2: camp.labelLine2,
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

            // Actualizar etiqueta del HUD inferior
            const progressEl = document.getElementById('hudProgressPercent');
            if (progressEl) {
                const sectorNames = [
                    '01 / 04 · Cruz del Sur',
                    '02 / 04 · Unidades',
                    '03 / 04 · Campamentos',
                    '04 / 04 · El Baúl'
                ];
                progressEl.textContent = sectorNames[sIdx] || `0${sIdx + 1} / 04`;
            }

            if (elStarNodesWrap) {
                let items = [];
                if (sIdx === 0) {
                    items = [{ label: '✦ α Acrux (Estrella Principal · Faro Guía)', idx: 0 }];
                } else if (sIdx === 1) {
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
                            <span class="camps-group-title">Constelación Estival · Verano</span>
                            <div class="camps-group-chips">
                                ${summerItems.map(it => `
                                    <button type="button" class="star-node-chip ${it.isRed ? 'is-red-chip' : ''} ${it.idx === subIdx ? 'active' : ''}" data-sub-idx="${it.idx}">
                                        ${it.label}
                                    </button>
                                `).join('')}
                            </div>
                        </div>
                        <div class="camps-constellation-group" style="margin-top: 0.6rem;">
                            <span class="camps-group-title">Constelación Equinoccial · Semana Santa y Primavera</span>
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
                        if (sIdx === 0) openAcruxSuperZoom();
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

    function triggerStarDiveFlash(wx, wy, durationMs = 260) {
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
        }, Math.max(80, durationMs - 50));
    }

    function populateUnitSuperZoomDOM(unitIdx) {
        const unit = UNITS_DATA[unitIdx] || UNITS_DATA[0];
        const unitId = unit.id || 'castores';
        const biome = UNIT_LAKE_BIOMES[unitId] || UNIT_LAKE_BIOMES.castores;

        selectedSubIdx = unitIdx;
        unitLakeState.unitId = unitId;
        unitLakeState.activeUnitIdx = unitIdx;

        // Aplicar el color e iluminación propios de la Unidad a toda la Tab
        if (elUnitZoomOverlay) {
            elUnitZoomOverlay.style.setProperty('--unit-accent', unit.accentColor || '#38BDF8');
            elUnitZoomOverlay.style.setProperty('--unit-glow', unit.glowColor || 'rgba(56, 189, 248, 0.18)');
            elUnitZoomOverlay.setAttribute('data-unit-world', unitId);
        }

        // Actualizar textos contextuales del bioma y nombres de paradas
        const biomeTag = document.getElementById('uzWorldBiomeTag');
        if (biomeTag) biomeTag.textContent = biome.kicker;
        const loreHeading = document.getElementById('uzLoreHeading');
        if (loreHeading) loreHeading.textContent = biome.loreHeading;

        const stepButtons = document.querySelectorAll('#uzOrbitStepsNav .uz-orbit-step-btn');
        stepButtons.forEach((btn, idx) => {
            const nameSpan = btn.querySelector('.step-name');
            if (nameSpan && biome.stepNames[idx]) {
                nameSpan.textContent = biome.stepNames[idx];
            }
        });

        const ringCaption = document.querySelector('#uzNextOrbitStepBtn .uz-progress-ring-caption');
        if (ringCaption) {
            ringCaption.textContent = unitId === 'manada' ? 'Rodear la Roca' : 'Rodear el lago';
        }

        // Poblar la Tab completa de la Unidad + sus ilustraciones, escenas y Kraaletes
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
            if (unit.bannerImg) {
                heroVisual.innerHTML = `<img src="${unit.bannerImg}" alt="Banner oficial de ${unit.fullName}" class="unit-banner-img" loading="eager">`;
            } else if (unit.heroSvg) {
                heroVisual.innerHTML = unit.heroSvg;
            } else {
                heroVisual.innerHTML = '';
            }
        }

        // Redes sociales de la unidad
        const socialBtn = document.getElementById('uzSocialBtn');
        const socialLabel = document.getElementById('uzSocialLabel');
        if (socialBtn) {
            if (unit.socialUrl) {
                socialBtn.href = unit.socialUrl;
                if (socialLabel) socialLabel.textContent = unit.socialLabel || 'Instagram de la Rama';
                socialBtn.style.display = 'inline-flex';
            } else {
                socialBtn.style.display = 'none';
            }
        }

        // 01 · AVENTURAS, SALIDAS Y CAMPAMENTOS DE LA UNIDAD (DRIVE)
        const campsGrid = document.getElementById('uzUnitCampsGrid');
        if (campsGrid) {
            if (unit.salidas && Array.isArray(unit.salidas) && unit.salidas.length > 0) {
                campsGrid.innerHTML = unit.salidas.map(s => {
                    const photosHtml = (s.photos && s.photos.length > 0)
                        ? `<div class="salida-photos-row">
                            ${s.photos.slice(0, 3).map((p, pIdx) => `
                                <div class="salida-photo-thumb">
                                    <img src="${p}" alt="${s.name} ${pIdx + 1}" referrerpolicy="no-referrer" loading="lazy">
                                </div>
                            `).join('')}
                           </div>`
                        : '';

                    return `
                        <article class="unit-salida-card" data-salida-id="${s.id}">
                            <div class="salida-card-header">
                                <div class="salida-tags-row">
                                    <span class="salida-badge">🌲 Salida / Aventura</span>
                                    ${s.location ? `<span class="salida-location-tag">${s.location}</span>` : ''}
                                    ${s.date ? `<span class="salida-date-tag">🗓️ ${s.date}</span>` : ''}
                                </div>
                                <h4 class="salida-title">${s.name}</h4>
                                <p class="salida-desc">${s.desc || 'Álbum oficial sincronizado directamente desde Google Drive.'}</p>
                            </div>
                            ${photosHtml}
                            <div class="salida-unlock-box">
                                <div class="salida-input-row">
                                    <input type="password" class="dossier-form-input salida-pass-input" placeholder="🔑 Contraseña para ver el álbum completo...">
                                    <button type="button" class="btn-cosmos-primary salida-unlock-btn" data-salida-id="${s.id}">
                                        <span>📂 Abrir Álbum en Drive</span>
                                        <span class="btn-arrow">↗</span>
                                    </button>
                                </div>
                                <small class="salida-unlock-feedback"></small>
                            </div>
                        </article>
                    `;
                }).join('');

                campsGrid.querySelectorAll('.unit-salida-card').forEach(card => {
                    const salidaId = card.getAttribute('data-salida-id');
                    const passInput = card.querySelector('.salida-pass-input');
                    const unlockBtn = card.querySelector('.salida-unlock-btn');
                    const feedback = card.querySelector('.salida-unlock-feedback');

                    const doUnlock = async () => {
                        const pass = passInput ? passInput.value.trim() : '';
                        if (!pass) {
                            if (feedback) {
                                feedback.textContent = 'Introduce la contraseña de la salida.';
                                feedback.className = 'salida-unlock-feedback is-error';
                            }
                            return;
                        }
                        if (feedback) {
                            feedback.textContent = 'Verificando con Google Drive...';
                            feedback.className = 'salida-unlock-feedback is-loading';
                        }
                        if (unlockBtn) unlockBtn.disabled = true;

                        try {
                            const res = await fetch(`${DRIVE_API_URL}?action=unlock&id=${encodeURIComponent(salidaId)}&pass=${encodeURIComponent(pass)}`);
                            const data = await res.json();
                            if (data && data.success && data.url) {
                                if (feedback) {
                                    feedback.textContent = '¡Contraseña correcta! Abriendo Google Drive...';
                                    feedback.className = 'salida-unlock-feedback is-success';
                                }
                                if (passInput) passInput.value = '';
                                window.open(data.url, '_blank', 'noopener');
                            } else {
                                if (feedback) {
                                    feedback.textContent = 'Contraseña incorrecta';
                                    feedback.className = 'salida-unlock-feedback is-error';
                                }
                            }
                        } catch (err) {
                            if (feedback) {
                                feedback.textContent = 'Error de conexión con Google Drive.';
                                feedback.className = 'salida-unlock-feedback is-error';
                            }
                        } finally {
                            if (unlockBtn) unlockBtn.disabled = false;
                        }
                    };

                    unlockBtn?.addEventListener('click', doUnlock);
                    passInput?.addEventListener('keydown', (e) => {
                        if (e.key === 'Enter') doUnlock();
                    });
                });
            } else {
                campsGrid.innerHTML = `
                    <div class="unit-camps-empty">
                        <div class="empty-icon-wrap">🌲</div>
                        <h4>Aún no hay álbumes de salidas publicados en el Google Drive de esta unidad.</h4>
                        <p>Las subcarpetas creadas en <code>01_UNIDADES / ${unit.fullName.split('·')[0].trim()}</code> con fotos se sincronizarán aquí automáticamente.</p>
                    </div>
                `;
            }
        }

        // 02 · LOS KRAALETES DE LA UNIDAD (CROMOS VERTICALES 3/4)
        const kraalWrap = document.getElementById('uzKraaletesGrid');
        if (kraalWrap) {
            kraalWrap.innerHTML = unit.kraaletes.map((k, kIdx) => {
                const hasCromo = !!k.cromoUrl;
                return `
                    <article class="kraalete-cromo-card ${hasCromo ? 'has-cromo-img' : 'no-cromo'}" data-cromo-idx="${kIdx}">
                        <div class="cromo-inner">
                            ${hasCromo ? `
                                <img src="${k.cromoUrl}" alt="${k.name}" class="kraalete-cromo-img" referrerpolicy="no-referrer" loading="lazy">
                            ` : `
                                <div class="cromo-fallback-content">
                                    <div class="cromo-scout-badge">⚜️</div>
                                    <span class="cromo-unit-tag">${unit.shortName}</span>
                                    <strong class="cromo-fallback-name">${k.name}</strong>
                                    <span class="cromo-fallback-role">${k.role}</span>
                                </div>
                            `}
                            <div class="cromo-bottom-label">
                                <strong class="cromo-label-name">${k.name}</strong>
                                <span class="cromo-label-role">${k.role}</span>
                            </div>
                            <div class="cromo-sheen" aria-hidden="true"></div>
                        </div>
                    </article>
                `;
            }).join('');

            // Brillo holográfico y tilt 3D al pasar el ratón
            kraalWrap.querySelectorAll('.kraalete-cromo-card').forEach(card => {
                card.addEventListener('mousemove', (e) => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    const rotX = ((y - centerY) / centerY) * -12;
                    const rotY = ((x - centerX) / centerX) * 12;
                    const percentX = (x / rect.width) * 100;
                    const percentY = (y / rect.height) * 100;
                    const sheen = card.querySelector('.cromo-sheen');

                    card.style.transform = `perspective(800px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) scale3d(1.03, 1.03, 1.03)`;
                    if (sheen) {
                        sheen.style.background = `radial-gradient(circle at ${percentX}% ${percentY}%, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.08) 45%, transparent 70%)`;
                        sheen.style.opacity = '1';
                    }
                });
                card.addEventListener('mouseleave', () => {
                    card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
                    const sheen = card.querySelector('.cromo-sheen');
                    if (sheen) sheen.style.opacity = '0';
                });
            });
        }

        // 03 · METODOLOGÍA Y PROGRESIÓN (FORMATO EDITORIAL EMOTION AGENCY)
        const pillarsWrap = document.getElementById('uzPillarsList');
        if (pillarsWrap) {
            pillarsWrap.innerHTML = unit.pillars.map((p, idx) => `
                <div class="sz-pillar-item">
                    <span class="pillar-num-badge">(00${idx + 1})</span>
                    <strong>✦ ${p.title}</strong>
                    <span>${p.desc}</span>
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

        superZoomState = {
            type: 'unit',
            index: unitIdx,
            wx: unit.worldX,
            wy: unit.worldY,
            zoom: 24.0
        };

        // Si ya estamos dentro del Mundo 3D de las Unidades, viajar por el río/bosque en el mismo espacio 3D
        if (wasAlreadyOpen && unitLakeState.worldBuilt) {
            clearTimeout(unitLakeState.snapTimer);
            unitLakeState.orbitTarget = unitIdx * 6;
            return;
        }

        document.body.classList.add('is-superzoom-open');
        const diveTime = wasAlreadyOpen ? 120 : 200;
        triggerStarDiveFlash(unit.worldX, unit.worldY, wasAlreadyOpen ? 180 : 280);

        populateUnitSuperZoomDOM(unitIdx);
        try {
            setupUnitLakeWorld(unitIdx);
        } catch (err) {
            console.error('Error inicializando el mundo 3D de Unidades:', err);
        }

        elCampZoomOverlay?.classList.remove('is-open');
        elCampZoomOverlay?.setAttribute('aria-hidden', 'true');
        elLostZoomOverlay?.classList.remove('is-open');
        elLostZoomOverlay?.setAttribute('aria-hidden', 'true');

        diveTabTimer = setTimeout(() => {
            if (elUnitZoomOverlay) {
                elUnitZoomOverlay.classList.add('is-open');
                elUnitZoomOverlay.setAttribute('aria-hidden', 'false');
                elUnitZoomOverlay.scrollTop = 0;
                startUnitLakeOrbitLoop();
            }
        }, diveTime);
    }

    // =========================================================================
    // 8B. MOTOR 3D ORBITAL ALREDEDOR DEL LAGO POR UNIDAD (INSPIRADO EN EMOTION-AGENCY.COM)
    // =========================================================================
    const UNIT_LAKE_BIOMES = {
        castores: {
            kicker: '(01 / 05) · MUNDO CASTORES · EL ESTANQUE DEL GRAN ROBLE Y RÍO GRAN HERMANO',
            loreHeading: 'La Vida en el Estanque · Colonia Ohiensis',
            stepNames: ['El Estanque', 'Presa y Ley', 'Etapas Castor', 'Kraaletes', 'Salidas Drive'],
            skyTop: 0x0A1929,
            skyHorizon: 0x2B4C65,
            fogColor: 0x1B3244,
            fogDensity: 0.0028,
            waterColor: 0x1F5E6B,
            waterEmissive: 0x092230,
            sunColor: 0xFFE4B5,
            sunPos: [45, 75, -35],
            hemiSky: 0x8AB4CE,
            hemiGround: 0x1E2F1D,
            shoreLightColor: 0xF59E0B,
            terrainLow: [0.16, 0.34, 0.18],
            terrainMid: [0.12, 0.26, 0.14],
            terrainHigh: [0.24, 0.38, 0.22],
            heightScale: 11.5,
            particleColor: 0xFDE68A,
            cameraStops: [
                { radius: 42, height: 11.5, lookY: 1.8 },
                { radius: 37, height: 8.5, lookY: 1.5 },
                { radius: 40, height: 13.0, lookY: 1.2 },
                { radius: 38, height: 9.5, lookY: 1.6 },
                { radius: 44, height: 14.0, lookY: 2.0 }
            ]
        },
        manada: {
            kicker: '(01 / 05) · MUNDO MANADA · LA ROCA DEL CONSEJO EN LA SELVA DE SEEONEE',
            loreHeading: 'La Roca del Consejo en el Claro de Seeonee · Manada Khanhiwara',
            stepNames: ['Roca del Consejo', 'Selva y Ley', 'Senda Mowgli', 'Viejos Lobos', 'Cazas Drive'],
            skyTop: 0x07111E,
            skyHorizon: 0x1C3144,
            fogColor: 0x11202E,
            fogDensity: 0.0032,
            waterColor: 0x194D59,
            waterEmissive: 0x081E29,
            sunColor: 0xFDE68A,
            sunPos: [-38, 72, -30],
            hemiSky: 0x7FA1B8,
            hemiGround: 0x182616,
            shoreLightColor: 0xF59E0B,
            terrainLow: [0.14, 0.30, 0.16],
            terrainMid: [0.10, 0.23, 0.13],
            terrainHigh: [0.22, 0.33, 0.20],
            heightScale: 15.5,
            particleColor: 0xFDE68A,
            cameraStops: [
                { radius: 33, height: 12.2, lookY: 7.4 },
                { radius: 29, height: 10.4, lookY: 7.8 },
                { radius: 34, height: 13.8, lookY: 6.8 },
                { radius: 30, height: 11.0, lookY: 7.5 },
                { radius: 35, height: 14.5, lookY: 7.2 }
            ]
        },
        tropa: {
            kicker: '(01 / 05) · MUNDO TROPA · EL LAGO DE LOHENGRIN (EL CABALLERO DEL CISNE) Y VALLE DE PATRULLAS',
            loreHeading: 'La Leyenda del Caballero del Cisne y Vida en Patrulla · Tropa Lohengrin',
            stepNames: ['Barca del Cisne', 'Honor y Grial', 'Patrullas', 'Kraal Tropa', 'Aymaras Drive'],
            skyTop: 0x081C24,
            skyHorizon: 0x244752,
            fogColor: 0x152E36,
            fogDensity: 0.0026,
            waterColor: 0x175956,
            waterEmissive: 0x072629,
            sunColor: 0xFFE8C2,
            sunPos: [40, 75, 35],
            hemiSky: 0x88B3BA,
            hemiGround: 0x162B1E,
            shoreLightColor: 0x34D399,
            terrainLow: [0.15, 0.33, 0.19],
            terrainMid: [0.11, 0.25, 0.15],
            terrainHigh: [0.25, 0.36, 0.25],
            heightScale: 16.0,
            particleColor: 0x99F6E4,
            cameraStops: [
                { radius: 42, height: 11.5, lookY: 1.8 },
                { radius: 36, height: 8.5, lookY: 1.6 },
                { radius: 40, height: 12.2, lookY: 1.6 },
                { radius: 38, height: 9.4, lookY: 1.8 },
                { radius: 44, height: 13.8, lookY: 2.0 }
            ]
        },
        escultas: {
            kicker: '(01 / 05) · MUNDO ESCULTAS · MONTAÑA DE LOS NINJAS Y EL DESCENSO DEL SENA (TREA)',
            loreHeading: 'Ninjas en el Descenso del Sena y Empresas Escultas · Unidad Esculta Trea',
            stepNames: ['Cañón del Río', 'Torii y Senda', 'Empresas', 'Kraal Esculta', 'Travesías Drive'],
            skyTop: 0x121624,
            skyHorizon: 0x3D3540,
            fogColor: 0x242028,
            fogDensity: 0.0025,
            waterColor: 0x234E61,
            waterEmissive: 0x0B212E,
            sunColor: 0xFFDAB9,
            sunPos: [-45, 75, 30],
            hemiSky: 0x9DA6B8,
            hemiGround: 0x242220,
            shoreLightColor: 0xF97316,
            terrainLow: [0.18, 0.31, 0.18],
            terrainMid: [0.32, 0.33, 0.35],
            terrainHigh: [0.52, 0.55, 0.58],
            heightScale: 24.0,
            particleColor: 0xFECDD3,
            cameraStops: [
                { radius: 42, height: 12.5, lookY: 2.8 },
                { radius: 37, height: 9.2, lookY: 2.4 },
                { radius: 40, height: 13.6, lookY: 2.2 },
                { radius: 38, height: 10.0, lookY: 2.4 },
                { radius: 44, height: 14.8, lookY: 3.0 }
            ]
        },
        clan: {
            kicker: '(01 / 05) · MUNDO CLAN · LA LAGUNA AZUL POR ENCIMA DE LAS NUBES (ORIGEN DEL RÍO)',
            loreHeading: 'La Laguna Azul sobre el Mar de Nubes · Clan Rover Ama Dablam',
            stepNames: ['Laguna Azul', 'Horquilla y Ley', 'Camino Rover', 'Kraal de Clan', 'Rutas Drive'],
            skyTop: 0x0F2942,
            skyHorizon: 0xFDE68A,
            fogColor: 0xE2D5B5,
            fogDensity: 0.0014,
            waterColor: 0x14B8A6,
            waterEmissive: 0x0D4F6B,
            sunColor: 0xFFE4B5,
            sunPos: [20, 80, -45],
            hemiSky: 0xFFF3C4,
            hemiGround: 0x2D4C2B,
            shoreLightColor: 0xFBBF24,
            terrainLow: [0.22, 0.46, 0.24],
            terrainMid: [0.48, 0.44, 0.38],
            terrainHigh: [0.96, 0.90, 0.82],
            heightScale: 27.5,
            particleColor: 0xFEF08A,
            cameraStops: [
                { radius: 43, height: 12.8, lookY: 3.2 },
                { radius: 38, height: 9.2, lookY: 2.6 },
                { radius: 41, height: 13.8, lookY: 2.4 },
                { radius: 39, height: 10.0, lookY: 2.5 },
                { radius: 45, height: 14.8, lookY: 3.2 }
            ]
        }
    };

    const UNIT_ZONE_SPACING = 165;
    // Alturas Y de cada mundo: Castores(0), Manada(0), Tropa(0), Escultas(+32m en la montaña tras el Torii), Clan(+78m Laguna Azul sobre las nubes)
    const UNIT_ZONE_ELEVATIONS = [0, 0, 0, 32, 78];

    const unitLakeState = {
        unitId: 'castores',
        activeUnitIdx: 0,
        worldBuilt: false,
        orbitTarget: 0,      // 0..28 (cada unidad ocupa 6 unidades: 0..4 paradas + 4..6 cruce de río al siguiente mundo)
        orbitCurrent: 0,
        activeStep: 0,       // 0..4
        snapTimer: null,
        isRunning: false,
        rafId: null,
        mouseX: 0,
        mouseY: 0,
        smoothMouseX: 0,
        smoothMouseY: 0,
        isDraggingBg: false,
        dragLastX: 0,
        touchStartY: 0,
        touchStartX: 0,
        // Three.js objects
        renderer: null,
        scene: null,
        camera: null,
        worldGroup: null,
        skyDome: null,
        skyUniforms: null,
        waterMesh: null,
        waterUniforms: null,
        waterUniformsList: [],
        terrainShaderUniformsList: [],
        rippleRings: [],
        particlesList: [],
        shoreLight: null,
        sunLight: null,
        hemiLight: null,
        animatedProps: [],
        reedClusters: [],
        glowTexture: null,
        terrainDetailTexture: null
    };

    // =========================================================================
    // GENERADOR DE RUIDO ORGÁNICO SUAVE (PERLIN / FBM C2 CONTINUO) + TEXTURAS
    // =========================================================================
    function hash2D(ix, iz) {
        const n = Math.sin(ix * 127.1 + iz * 311.7) * 43758.5453123;
        return n - Math.floor(n);
    }

    function valueNoise2D(x, z) {
        const ix = Math.floor(x);
        const iz = Math.floor(z);
        const fx = x - ix;
        const fz = z - iz;
        // Interpolación quíntica C2 para superficies 100% suaves sin aristas poligonales
        const ux = fx * fx * fx * (fx * (fx * 6 - 15) + 10);
        const uz = fz * fz * fz * (fz * (fz * 6 - 15) + 10);

        const a = hash2D(ix, iz);
        const b = hash2D(ix + 1, iz);
        const c = hash2D(ix, iz + 1);
        const d = hash2D(ix + 1, iz + 1);

        return lerp(lerp(a, b, ux), lerp(c, d, ux), uz) * 2 - 1;
    }

    function fbm2D(x, z, octaves = 5) {
        let val = 0;
        let amp = 0.5;
        let freq = 1.0;
        let norm = 0;
        for (let i = 0; i < octaves; i++) {
            val += amp * valueNoise2D(x * freq, z * freq);
            norm += amp;
            amp *= 0.5;
            freq *= 2.03;
            // Rotación ligera entre octavas para evitar patrones de cuadrícula
            const nx = x * 0.866 - z * 0.5;
            const nz = x * 0.5 + z * 0.866;
            x = nx;
            z = nz;
        }
        return val / norm;
    }

    function ridgedFbm2D(x, z, octaves = 4) {
        let val = 0;
        let amp = 0.5;
        let freq = 1.0;
        let norm = 0;
        for (let i = 0; i < octaves; i++) {
            const n = 1.0 - Math.abs(valueNoise2D(x * freq, z * freq));
            val += amp * (n * n);
            norm += amp;
            amp *= 0.5;
            freq *= 2.05;
        }
        return val / norm;
    }

    function getSoftGlowTexture(THREE) {
        if (unitLakeState.glowTexture) return unitLakeState.glowTexture;
        const c = document.createElement('canvas');
        c.width = 128;
        c.height = 128;
        const gCtx = c.getContext('2d');
        const grad = gCtx.createRadialGradient(64, 64, 0, 64, 64, 64);
        grad.addColorStop(0.0, 'rgba(255, 255, 255, 1.0)');
        grad.addColorStop(0.28, 'rgba(255, 255, 255, 0.65)');
        grad.addColorStop(0.65, 'rgba(255, 255, 255, 0.16)');
        grad.addColorStop(1.0, 'rgba(255, 255, 255, 0.0)');
        gCtx.fillStyle = grad;
        gCtx.fillRect(0, 0, 128, 128);
        const tex = new THREE.CanvasTexture(c);
        unitLakeState.glowTexture = tex;
        return tex;
    }

    function getTerrainDetailTexture(THREE) {
        if (unitLakeState.terrainDetailTexture) return unitLakeState.terrainDetailTexture;
        const c = document.createElement('canvas');
        c.width = 256;
        c.height = 256;
        const gCtx = c.getContext('2d');
        gCtx.fillStyle = '#d8d8d8';
        gCtx.fillRect(0, 0, 256, 256);
        for (let i = 0; i < 4200; i++) {
            const x = Math.random() * 256;
            const y = Math.random() * 256;
            const r = 1 + Math.random() * 2.5;
            const shade = 195 + Math.floor(Math.random() * 55);
            gCtx.fillStyle = `rgb(${shade},${shade},${shade})`;
            gCtx.beginPath();
            gCtx.arc(x, y, r, 0, Math.PI * 2);
            gCtx.fill();
        }
        const tex = new THREE.CanvasTexture(c);
        tex.wrapS = THREE.RepeatWrapping;
        tex.wrapT = THREE.RepeatWrapping;
        tex.repeat.set(28, 28);
        unitLakeState.terrainDetailTexture = tex;
        return tex;
    }

    function getBotanicalFoliageTexture(THREE) {
        if (unitLakeState.foliageTexture) return unitLakeState.foliageTexture;
        const c = document.createElement('canvas');
        c.width = 512;
        c.height = 512;
        const g = c.getContext('2d');
        g.clearRect(0, 0, 512, 512);

        // Dibujar cientos de hojas botánicas orgánicas superpuestas desde el centro hacia los bordes
        for (let i = 0; i < 420; i++) {
            const prog = i / 420;
            const dist = Math.pow(Math.random(), 0.68) * 205;
            const ang = Math.random() * Math.PI * 2;
            const lx = 256 + Math.cos(ang) * dist;
            const ly = 256 + Math.sin(ang) * dist;
            const leafLen = 22 + Math.random() * 28 * (1 - dist / 260);
            const leafWid = leafLen * (0.38 + Math.random() * 0.18);
            const rot = ang + (Math.random() - 0.5) * 1.2;

            g.save();
            g.translate(lx, ly);
            g.rotate(rot);

            // Sombra suave entre capas de hojas
            const luma = 0.35 + prog * 0.65;
            const rCol = Math.floor((18 + Math.random() * 24) * luma);
            const gCol = Math.floor((88 + Math.random() * 72) * luma);
            const bCol = Math.floor((42 + Math.random() * 34) * luma);

            g.fillStyle = `rgba(${rCol}, ${gCol}, ${bCol}, 0.92)`;
            g.beginPath();
            g.moveTo(-leafLen * 0.5, 0);
            g.quadraticCurveTo(0, -leafWid, leafLen * 0.5, 0);
            g.quadraticCurveTo(0, leafWid, -leafLen * 0.5, 0);
            g.fill();

            // Nervio central sutil de la hoja
            g.strokeStyle = `rgba(${Math.min(255, rCol + 25)}, ${Math.min(255, gCol + 38)}, ${Math.min(255, bCol + 22)}, 0.45)`;
            g.lineWidth = 1.1;
            g.beginPath();
            g.moveTo(-leafLen * 0.42, 0);
            g.lineTo(leafLen * 0.42, 0);
            g.stroke();
            g.restore();
        }

        const tex = new THREE.CanvasTexture(c);
        unitLakeState.foliageTexture = tex;
        return tex;
    }

    function getBarkTexture(THREE) {
        if (unitLakeState.barkTexture) return unitLakeState.barkTexture;
        const c = document.createElement('canvas');
        c.width = 256;
        c.height = 256;
        const g = c.getContext('2d');
        g.fillStyle = '#3E2723';
        g.fillRect(0, 0, 256, 256);
        for (let i = 0; i < 650; i++) {
            const x = Math.random() * 256;
            const y = Math.random() * 256;
            const w = 1.5 + Math.random() * 3.5;
            const h = 18 + Math.random() * 48;
            g.fillStyle = i % 2 === 0 ? 'rgba(28, 17, 13, 0.55)' : 'rgba(93, 64, 55, 0.45)';
            g.fillRect(x, y, w, h);
        }
        const tex = new THREE.CanvasTexture(c);
        tex.wrapS = THREE.RepeatWrapping;
        tex.wrapT = THREE.RepeatWrapping;
        tex.repeat.set(2, 4);
        unitLakeState.barkTexture = tex;
        return tex;
    }

    function getRealisticMoonTexture(THREE) {
        if (unitLakeState.moonTexture) return unitLakeState.moonTexture;
        const c = document.createElement('canvas');
        c.width = 512;
        c.height = 512;
        const g = c.getContext('2d');
        const baseGrad = g.createRadialGradient(230, 230, 20, 256, 256, 256);
        baseGrad.addColorStop(0.0, '#FFFDF5');
        baseGrad.addColorStop(0.65, '#FEF3C7');
        baseGrad.addColorStop(0.92, '#E2E8F0');
        baseGrad.addColorStop(1.0, '#94A3B8');
        g.fillStyle = baseGrad;
        g.fillRect(0, 0, 512, 512);

        // Mares lunares (Maria) y cráteres sutiles realistas
        const maria = [
            [180, 190, 75, 0.14],
            [290, 165, 62, 0.12],
            [320, 255, 58, 0.13],
            [155, 290, 68, 0.11],
            [235, 260, 50, 0.10]
        ];
        maria.forEach(([mx, my, mr, op]) => {
            const mg = g.createRadialGradient(mx, my, mr * 0.1, mx, my, mr);
            mg.addColorStop(0, `rgba(71, 85, 105, ${op})`);
            mg.addColorStop(1, 'rgba(71, 85, 105, 0)');
            g.fillStyle = mg;
            g.beginPath();
            g.arc(mx, my, mr, 0, Math.PI * 2);
            g.fill();
        });

        const tex = new THREE.CanvasTexture(c);
        unitLakeState.moonTexture = tex;
        return tex;
    }

    function createGlowSprite(THREE, hexColor, scaleSize = 6.0, opacity = 0.65) {
        const mat = new THREE.SpriteMaterial({
            map: getSoftGlowTexture(THREE),
            color: hexColor,
            transparent: true,
            opacity,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });
        const sprite = new THREE.Sprite(mat);
        sprite.scale.set(scaleSize, scaleSize, 1);
        return sprite;
    }

    function deformGeometrySmooth(geo, amp = 0.18, freq = 1.2, seed = 0) {
        const pos = geo.attributes.position;
        for (let i = 0; i < pos.count; i++) {
            const vx = pos.getX(i);
            const vy = pos.getY(i);
            const vz = pos.getZ(i);
            const n = fbm2D(vx * freq + seed, vz * freq + vy * 0.7 - seed, 3);
            const factor = 1 + n * amp;
            pos.setXYZ(i, vx * factor, vy * factor, vz * factor);
        }
        geo.computeVertexNormals();
        return geo;
    }

    function syncUnitOrbitDOM(progress, forceStep = null) {
        const totalClamped = clamp(progress, 0, 28);
        const uIdx = Math.min(4, Math.floor(totalClamped / 6));
        const localProg = totalClamped - uIdx * 6;
        const isCrossingRiver = localProg > 4.08 && localProg < 5.92 && uIdx < 4;

        // Cambiar automáticamente el DOM a la siguiente Unidad a mitad del cruce del río por el bosque
        const displayUnitIdx = (localProg >= 5.0 && uIdx < 4) ? (uIdx + 1) : uIdx;
        if (displayUnitIdx !== unitLakeState.activeUnitIdx) {
            populateUnitSuperZoomDOM(displayUnitIdx);
        }

        const effStepPos = localProg >= 5.0 ? (localProg - 6.0) : localProg;
        const nearestStep = forceStep !== null ? forceStep : clamp(Math.round(effStepPos), 0, 4);
        unitLakeState.activeStep = nearestStep;

        const biomeTag = document.getElementById('uzWorldBiomeTag');
        const currentUnit = UNITS_DATA[displayUnitIdx] || UNITS_DATA[0];
        const currentBiome = UNIT_LAKE_BIOMES[currentUnit.id] || UNIT_LAKE_BIOMES.castores;

        if (biomeTag) {
            if (isCrossingRiver) {
                if (uIdx === 2) {
                    biomeTag.textContent = '🏔️ SUBIENDO LA MONTAÑA DE TREA · TROPA → ESCULTAS';
                } else if (uIdx === 3) {
                    biomeTag.textContent = '🧗 ESCALANDO HACIA EL MAR DE NUBES · LA LAGUNA AZUL · ESCULTAS → CLAN';
                } else {
                    const fromName = UNITS_DATA[uIdx]?.shortName || 'Castores';
                    const toName = UNITS_DATA[uIdx + 1]?.shortName || 'Manada';
                    biomeTag.textContent = `🌊 CRUZANDO EL RÍO POR EL BOSQUE · ${fromName.toUpperCase()} → ${toName.toUpperCase()}`;
                }
            } else {
                biomeTag.textContent = currentBiome.kicker;
            }
        }

        const ringCaption = document.querySelector('#uzNextOrbitStepBtn .uz-progress-ring-caption');
        if (ringCaption) {
            if (isCrossingRiver) {
                ringCaption.textContent = uIdx === 2
                    ? 'Subiendo la montaña...'
                    : (uIdx === 3 ? 'Escalando a las nubes...' : 'Cruzando el río...');
            } else if (nearestStep === 4 && displayUnitIdx < 4) {
                if (displayUnitIdx === 2) {
                    ringCaption.textContent = 'Subir la montaña →';
                } else if (displayUnitIdx === 3) {
                    ringCaption.textContent = 'Escalar a la Laguna Azul →';
                } else {
                    ringCaption.textContent = `Cruzar río a ${UNITS_DATA[displayUnitIdx + 1].shortName} →`;
                }
            } else {
                ringCaption.textContent = currentUnit.id === 'manada' ? 'Rodear la Roca' : 'Rodear el lago';
            }
        }

        const screens = document.querySelectorAll('#unitSuperZoomOverlay .uz-orbit-screen');
        screens.forEach((scr, idx) => {
            if (isCrossingRiver) {
                scr.classList.remove('is-active');
                scr.style.opacity = '0';
                scr.style.transform = 'translate3d(0, -32px, 0) scale(0.95)';
                scr.style.pointerEvents = 'none';
                return;
            }

            const diff = idx - effStepPos;
            const absDiff = Math.abs(diff);
            const isCurrent = idx === nearestStep;
            scr.classList.toggle('is-active', isCurrent);

            if (absDiff < 0.85) {
                const alpha = Math.max(0, 1 - (absDiff / 0.68));
                const shiftY = diff * 42;
                const scale = 1 - Math.min(0.06, absDiff * 0.06);
                scr.style.opacity = alpha.toFixed(3);
                scr.style.transform = `translate3d(0, ${shiftY.toFixed(1)}px, 0) scale(${scale.toFixed(3)})`;
                scr.style.pointerEvents = isCurrent && alpha > 0.45 ? 'auto' : 'none';
            } else {
                scr.style.opacity = '0';
                scr.style.transform = `translate3d(0, ${diff > 0 ? 48 : -48}px, 0) scale(0.95)`;
                scr.style.pointerEvents = 'none';
            }
        });

        document.querySelectorAll('#uzOrbitStepsNav .uz-orbit-step-btn').forEach((btn, idx) => {
            btn.classList.toggle('active', !isCrossingRiver && idx === nearestStep);
        });

        const circumference = 276.46;
        const normOrbit = isCrossingRiver ? ((localProg - 4.0) / 2.0) : (clamp(effStepPos, 0, 4) / 4);
        const ringBar = document.getElementById('uzOrbitRingBar');
        if (ringBar) {
            const offset = circumference * (1 - clamp(normOrbit * 0.8 + 0.2, 0.2, 1.0));
            ringBar.style.strokeDashoffset = offset.toFixed(2);
        }
        const angleLabel = document.getElementById('uzOrbitAngleLabel');
        if (angleLabel) {
            if (isCrossingRiver) {
                angleLabel.textContent = 'RÍO';
            } else {
                const deg = Math.round((clamp(effStepPos, 0, 4) / 5) * 360) % 360;
                angleLabel.textContent = `${deg}°`;
            }
        }
    }

    function goToUnitOrbitStep(stepIdx) {
        clearTimeout(unitLakeState.snapTimer);
        const uIdx = unitLakeState.activeUnitIdx || 0;
        unitLakeState.orbitTarget = uIdx * 6 + clamp(stepIdx, 0, 4);
    }

    function scheduleOrbitSnap() {
        clearTimeout(unitLakeState.snapTimer);
        unitLakeState.snapTimer = setTimeout(() => {
            const tClamped = clamp(unitLakeState.orbitTarget, 0, 28);
            const uIdx = Math.min(4, Math.floor(tClamped / 6));
            const local = tClamped - uIdx * 6;
            if (local <= 4.16 || uIdx >= 4) {
                unitLakeState.orbitTarget = uIdx * 6 + Math.round(clamp(local, 0, 4));
            } else {
                // En el tramo del río entre uIdx (parada 4) y uIdx+1 (parada 0)
                if (unitLakeState.orbitTarget >= unitLakeState.orbitCurrent || local >= 5.0) {
                    unitLakeState.orbitTarget = (uIdx + 1) * 6;
                } else {
                    unitLakeState.orbitTarget = uIdx * 6 + 4;
                }
            }
        }, 160);
    }

    // =========================================================================
    // ÁRBOLES Y VEGETACIÓN ESTILIZADA 3D (ESTÉTICA LIMPIA TIPO FIREWATCH / PIXAR)
    // =========================================================================
    function createPineOrBiomeTree(THREE, unitId, scale = 1, seed = 1) {
        const tree = new THREE.Group();
        const barkMat = new THREE.MeshStandardMaterial({
            color: 0x3A2820,
            roughness: 0.92,
            metalness: 0.02,
            flatShading: false
        });

        // Tronco limpio y estilizado con ensanchamiento suave en la base
        const isBroadleafStyle = (unitId === 'manada' || unitId === 'castores') && (Math.floor(Math.abs(seed * 10)) % 2 === 0);
        const trunkH = (isBroadleafStyle ? 3.8 : 3.1) * scale;
        const trunkGeo = new THREE.CylinderGeometry(0.15 * scale, 0.40 * scale, trunkH, 24, 8);
        const tPos = trunkGeo.attributes.position;
        for (let i = 0; i < tPos.count; i++) {
            const py = tPos.getY(i);
            const hNorm = (py + trunkH * 0.5) / trunkH;
            const rootFlare = hNorm < 0.24 ? (1 + Math.pow(1 - hNorm / 0.24, 2) * 0.38) : 1.0;
            const bendX = Math.sin(hNorm * Math.PI) * 0.16 * scale * Math.sin(seed);
            const bendZ = Math.sin(hNorm * Math.PI) * 0.12 * scale * Math.cos(seed * 1.3);
            tPos.setX(i, tPos.getX(i) * rootFlare + bendX);
            tPos.setZ(i, tPos.getZ(i) * rootFlare + bendZ);
        }
        trunkGeo.computeVertexNormals();
        const trunk = new THREE.Mesh(trunkGeo, barkMat);
        trunk.position.y = trunkH * 0.48;
        tree.add(trunk);

        if (isBroadleafStyle) {
            // Árbol frondoso orgánico: ramas limpias y volúmenes de copa suaves en tonos bosque nórdico
            for (let b = 0; b < 3; b++) {
                const bAng = (b / 3) * Math.PI * 2 + seed * 0.5;
                const branch = new THREE.Mesh(
                    new THREE.CylinderGeometry(0.07 * scale, 0.14 * scale, 1.9 * scale, 16),
                    barkMat
                );
                branch.position.set(Math.cos(bAng) * 0.55 * scale, trunkH * 0.86, Math.sin(bAng) * 0.55 * scale);
                branch.rotation.z = -Math.cos(bAng) * 0.58;
                branch.rotation.x = Math.sin(bAng) * 0.58;
                tree.add(branch);
            }

            const palette = [0x1B3B24, 0x254D2E, 0x35633B];

            const crownPuffs = [
                [0, trunkH * 1.12, 0, 1.65, 2],
                [-0.95, trunkH * 0.94, 0.65, 1.32, 0],
                [1.0, trunkH * 0.96, -0.55, 1.35, 1],
                [0.25, trunkH * 0.92, -0.95, 1.25, 0],
                [-0.35, trunkH * 1.02, 0.95, 1.28, 1]
            ];

            crownPuffs.forEach(([cx, cy, cz, cr, toneIdx], idx) => {
                const puffGeo = deformGeometrySmooth(
                    new THREE.SphereGeometry(cr * scale, 36, 28),
                    0.06,
                    0.65,
                    seed + idx * 2.1
                );
                const puffMat = new THREE.MeshStandardMaterial({
                    color: palette[toneIdx],
                    roughness: 0.86,
                    metalness: 0.02,
                    flatShading: false
                });
                const puff = new THREE.Mesh(puffGeo, puffMat);
                puff.position.set(cx * scale, cy, cz * scale);
                puff.scale.set(1.18, 0.84, 1.14);
                tree.add(puff);
            });
        } else {
            // Pinos y abetos estilizados con verdes pino y bosque alpino naturales
            const tierPalette = unitId === 'clan'
                ? [0x1E3F29, 0x2A5434, 0x3D6E42]
                : [0x1B3B24, 0x254D2E, 0x35633B];

            const tiers = 6;
            for (let l = 0; l < tiers; l++) {
                const r = (1.88 - l * 0.26) * scale;
                const h = (1.80 - l * 0.17) * scale;
                const boughGeo = new THREE.ConeGeometry(r, h, 36, 8);
                const bPos = boughGeo.attributes.position;
                for (let k = 0; k < bPos.count; k++) {
                    const vx = bPos.getX(k);
                    const vy = bPos.getY(k);
                    const vz = bPos.getZ(k);
                    const ang = Math.atan2(vz, vx);
                    const rad = Math.hypot(vx, vz);
                    if (rad > 0.05) {
                        const softWave = 1 + Math.sin(ang * 6 + l * 1.5 + seed) * 0.045;
                        const droop = -Math.pow(rad / r, 1.6) * 0.22 * scale;
                        bPos.setX(k, vx * softWave);
                        bPos.setY(k, vy + droop);
                        bPos.setZ(k, vz * softWave);
                    }
                }
                boughGeo.computeVertexNormals();
                const tone = l < 2 ? tierPalette[0] : (l < 4 ? tierPalette[1] : tierPalette[2]);
                const coneMat = new THREE.MeshStandardMaterial({
                    color: tone,
                    roughness: 0.86,
                    metalness: 0.02,
                    flatShading: false
                });
                const bough = new THREE.Mesh(boughGeo, coneMat);
                bough.position.y = (1.72 + l * 0.74) * scale;
                tree.add(bough);
            }
        }
        return tree;
    }

    function createBotanicalBush(THREE, scale = 1.0, seed = 0) {
        const bush = new THREE.Group();
        const bushColors = [0x16301D, 0x1E3F26, 0x2A5231];
        const lobes = [
            [0, 0.38, 0, 0.85, 1],
            [-0.55, 0.28, 0.25, 0.65, 0],
            [0.52, 0.30, -0.22, 0.68, 2]
        ];
        lobes.forEach(([lx, ly, lz, lr, cIdx], idx) => {
            const lobeGeo = deformGeometrySmooth(
                new THREE.SphereGeometry(lr * scale, 28, 22),
                0.06,
                0.75,
                seed + idx * 1.7
            );
            const lobeMat = new THREE.MeshStandardMaterial({
                color: bushColors[cIdx],
                roughness: 0.88,
                metalness: 0.02,
                flatShading: false
            });
            const lobe = new THREE.Mesh(lobeGeo, lobeMat);
            lobe.position.set(lx * scale, ly * scale, lz * scale);
            lobe.scale.set(1.25, 0.68, 1.15);
            bush.add(lobe);
        });
        return bush;
    }

    function createShoreReedsCluster(THREE, unitId, seed = 0) {
        const cluster = new THREE.Group();
        const reedColor = unitId === 'clan' ? 0x2A5434 : (unitId === 'manada' ? 0x1E3F26 : 0x254D2E);
        const stemMat = new THREE.MeshStandardMaterial({ color: reedColor, roughness: 0.7 });
        const headMat = new THREE.MeshStandardMaterial({ color: 0x5C3A21, roughness: 0.9 });

        for (let i = 0; i < 7; i++) {
            const h = 1.1 + (i % 3) * 0.35;
            const stemGeo = new THREE.CylinderGeometry(0.022, 0.042, h, 10, 4);
            const pos = stemGeo.attributes.position;
            const tiltX = Math.cos(i * 1.4 + seed) * 0.18;
            const tiltZ = Math.sin(i * 1.4 + seed) * 0.18;
            for (let k = 0; k < pos.count; k++) {
                const yNorm = (pos.getY(k) + h * 0.5) / h;
                pos.setX(k, pos.getX(k) + yNorm * yNorm * tiltX);
                pos.setZ(k, pos.getZ(k) + yNorm * yNorm * tiltZ);
            }
            stemGeo.computeVertexNormals();
            const stem = new THREE.Mesh(stemGeo, stemMat);
            stem.position.set(Math.cos(i * 1.1) * 0.35, h * 0.45, Math.sin(i * 1.1) * 0.35);
            cluster.add(stem);

            if (i % 2 === 0 && unitId !== 'clan') {
                const head = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 0.28, 12), headMat);
                head.position.set(
                    stem.position.x + tiltX * 0.82,
                    h * 0.82,
                    stem.position.z + tiltZ * 0.82
                );
                cluster.add(head);
            }
        }
        return cluster;
    }

    function createCampfireWithGlow(THREE, scale = 1.0) {
        const fireGroup = new THREE.Group();
        const logMat = new THREE.MeshStandardMaterial({ color: 0x4E342E, roughness: 0.86 });
        for (let i = 0; i < 6; i++) {
            const ang = (i / 6) * Math.PI;
            const log = new THREE.Mesh(new THREE.CylinderGeometry(0.13 * scale, 0.16 * scale, 2.1 * scale, 16), logMat);
            log.rotation.z = Math.PI / 2 - 0.18;
            log.rotation.y = ang;
            log.position.y = 0.20 * scale;
            fireGroup.add(log);
        }

        // Resplandor volumétrico suave de brasas y fuego (sin conos rígidos)
        const coreSprite = createGlowSprite(THREE, 0xFEF08A, 2.4 * scale, 0.95);
        coreSprite.position.y = 0.75 * scale;
        fireGroup.add(coreSprite);

        const flameSprite = createGlowSprite(THREE, 0xF97316, 4.2 * scale, 0.85);
        flameSprite.position.y = 1.05 * scale;
        fireGroup.add(flameSprite);

        const halo = createGlowSprite(THREE, 0xEA580C, 8.2 * scale, 0.55);
        halo.position.y = 1.2 * scale;
        fireGroup.add(halo);

        unitLakeState.animatedProps.push({
            mesh: flameSprite,
            innerMesh: coreSprite,
            haloSprite: halo,
            baseY: 1.05 * scale,
            baseScale: 4.2 * scale,
            phase: Math.random() * 6,
            isFlame: true
        });

        return fireGroup;
    }

    // Construye un Torii Japonés / Ninja estilizado 3D (tipo Firewatch / Pixar) con farolillos colgantes
    function createJapaneseToriiGate(THREE, scale = 1.0) {
        const torii = new THREE.Group();
        const vermilionMat = new THREE.MeshStandardMaterial({
            color: 0xDC2626,
            emissive: 0x7F1D1D,
            emissiveIntensity: 0.16,
            roughness: 0.58,
            metalness: 0.06,
            flatShading: false
        });
        const charcoalMat = new THREE.MeshStandardMaterial({
            color: 0x1E293B,
            roughness: 0.50,
            metalness: 0.14,
            flatShading: false
        });
        const goldMat = new THREE.MeshStandardMaterial({
            color: 0xFBBF24,
            emissive: 0xD97706,
            emissiveIntensity: 0.35,
            roughness: 0.32,
            metalness: 0.68
        });

        // 1. Dos columnas principales (Hashira) con basas de piedra negra (Kamebara)
        [-3.4, 3.4].forEach((px) => {
            const baseStone = new THREE.Mesh(new THREE.CylinderGeometry(0.54 * scale, 0.64 * scale, 1.05 * scale, 24), charcoalMat);
            baseStone.position.set(px * scale, 0.52 * scale, 0);
            torii.add(baseStone);

            const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.36 * scale, 0.44 * scale, 7.6 * scale, 28), vermilionMat);
            pillar.position.set(px * scale, 4.15 * scale, 0);
            pillar.rotation.z = px < 0 ? -0.025 : 0.025;
            torii.add(pillar);
        });

        // 2. Travesaño inferior rojo (Nuki) con cuñas negras (Kusabi)
        const nuki = new THREE.Mesh(new THREE.BoxGeometry(9.2 * scale, 0.44 * scale, 0.36 * scale), vermilionMat);
        nuki.position.set(0, 6.05 * scale, 0);
        torii.add(nuki);

        [-3.4, 3.4].forEach((px) => {
            const wedge = new THREE.Mesh(new THREE.BoxGeometry(0.95 * scale, 0.62 * scale, 0.46 * scale), charcoalMat);
            wedge.position.set(px * scale, 6.05 * scale, 0);
            torii.add(wedge);
        });

        // 3. Dintel superior curvado (Kasagi + Shimaki)
        const kasagiCurve = new THREE.CatmullRomCurve3([
            new THREE.Vector3(-5.3 * scale, 7.95 * scale, 0),
            new THREE.Vector3(-2.6 * scale, 7.55 * scale, 0),
            new THREE.Vector3(0.0, 7.45 * scale, 0),
            new THREE.Vector3(2.6 * scale, 7.55 * scale, 0),
            new THREE.Vector3(5.3 * scale, 7.95 * scale, 0)
        ]);
        const shimakiMesh = new THREE.Mesh(new THREE.TubeGeometry(kasagiCurve, 32, 0.28 * scale, 16, false), vermilionMat);
        shimakiMesh.scale.set(1.0, 0.85, 1.15);
        torii.add(shimakiMesh);

        const kasagiTopCurve = new THREE.CatmullRomCurve3([
            new THREE.Vector3(-5.6 * scale, 8.32 * scale, 0),
            new THREE.Vector3(-2.7 * scale, 7.86 * scale, 0),
            new THREE.Vector3(0.0, 7.75 * scale, 0),
            new THREE.Vector3(2.7 * scale, 7.86 * scale, 0),
            new THREE.Vector3(5.6 * scale, 8.32 * scale, 0)
        ]);
        const kasagiMesh = new THREE.Mesh(new THREE.TubeGeometry(kasagiTopCurve, 36, 0.32 * scale, 18, false), charcoalMat);
        kasagiMesh.scale.set(1.0, 0.72, 1.35);
        torii.add(kasagiMesh);

        // 4. Puntal central (Gakuzuka) con placa dorada Ninja/Esculta
        const centerStrut = new THREE.Mesh(new THREE.BoxGeometry(0.42 * scale, 1.45 * scale, 0.32 * scale), vermilionMat);
        centerStrut.position.set(0, 6.75 * scale, 0);
        torii.add(centerStrut);

        const plaqueFrame = new THREE.Mesh(new THREE.BoxGeometry(0.88 * scale, 1.15 * scale, 0.40 * scale), charcoalMat);
        plaqueFrame.position.set(0, 6.78 * scale, 0);
        torii.add(plaqueFrame);

        const plaqueEmblem = new THREE.Mesh(new THREE.BoxGeometry(0.64 * scale, 0.88 * scale, 0.44 * scale), goldMat);
        plaqueEmblem.position.set(0, 6.78 * scale, 0);
        torii.add(plaqueEmblem);

        // 5. Dos farolillos japoneses colgantes (Chōchin) bajo el travesaño
        const lanternMat = new THREE.MeshStandardMaterial({
            color: 0xFEF08A,
            emissive: 0xF59E0B,
            emissiveIntensity: 0.85,
            roughness: 0.4
        });
        [-2.2, 2.2].forEach((lx) => {
            const lantern = new THREE.Mesh(new THREE.SphereGeometry(0.32 * scale, 18, 14), lanternMat);
            lantern.scale.set(0.85, 1.25, 0.85);
            lantern.position.set(lx * scale, 5.42 * scale, 0);
            torii.add(lantern);

            const lGlow = createGlowSprite(THREE, 0xFDE047, 2.8 * scale, 0.78);
            lGlow.position.set(lx * scale, 5.42 * scale, 0);
            torii.add(lGlow);
        });

        return torii;
    }

    // Construye un farolillo tradicional japonés de piedra (Tōrō)
    function createStoneToroLantern(THREE, scale = 1.0) {
        const toro = new THREE.Group();
        const stoneMat = new THREE.MeshStandardMaterial({ color: 0x64748B, roughness: 0.84, flatShading: false });
        const fireMat = new THREE.MeshStandardMaterial({
            color: 0xFEF08A,
            emissive: 0xF97316,
            emissiveIntensity: 0.9,
            roughness: 0.3
        });

        const base = new THREE.Mesh(new THREE.CylinderGeometry(0.45 * scale, 0.58 * scale, 0.35 * scale, 16), stoneMat);
        base.position.y = 0.17 * scale;
        toro.add(base);

        const post = new THREE.Mesh(new THREE.CylinderGeometry(0.22 * scale, 0.28 * scale, 1.25 * scale, 16), stoneMat);
        post.position.y = 0.92 * scale;
        toro.add(post);

        const platform = new THREE.Mesh(new THREE.CylinderGeometry(0.48 * scale, 0.38 * scale, 0.22 * scale, 6), stoneMat);
        platform.position.y = 1.62 * scale;
        toro.add(platform);

        const fireBox = new THREE.Mesh(new THREE.CylinderGeometry(0.30 * scale, 0.30 * scale, 0.48 * scale, 6), fireMat);
        fireBox.position.y = 1.95 * scale;
        toro.add(fireBox);

        const roof = new THREE.Mesh(new THREE.ConeGeometry(0.68 * scale, 0.48 * scale, 6), stoneMat);
        roof.position.y = 2.38 * scale;
        toro.add(roof);

        const glow = createGlowSprite(THREE, 0xFBBF24, 2.4 * scale, 0.72);
        glow.position.y = 1.95 * scale;
        toro.add(glow);

        return toro;
    }

    // Construye un banco de nubes 3D esponjosas (estilo Pixar / Firewatch) para el Mar de Nubes bajo la Laguna Azul del Clan
    function createFluffyCloudCluster(THREE, scale = 1.0, seed = 0) {
        const cloud = new THREE.Group();
        const cloudMat = new THREE.MeshStandardMaterial({
            color: 0xFFFFFF,
            emissive: 0xBAE6FD,
            emissiveIntensity: 0.28,
            roughness: 0.92,
            metalness: 0.0,
            flatShading: false
        });

        const puffs = [
            [0, 0.35, 0, 2.45],
            [-1.85, 0.12, 0.45, 1.85],
            [1.92, 0.15, -0.35, 1.95],
            [-0.75, 0.05, -1.35, 1.65],
            [0.85, 0.08, 1.42, 1.72],
            [-3.2, -0.15, -0.25, 1.45],
            [3.25, -0.12, 0.35, 1.50]
        ];
        puffs.forEach(([px, py, pz, pr], idx) => {
            const sphere = new THREE.Mesh(new THREE.SphereGeometry(pr * scale, 22, 16), cloudMat);
            const jx = Math.sin(seed + idx * 1.7) * 0.25 * scale;
            const jz = Math.cos(seed + idx * 2.3) * 0.25 * scale;
            sphere.position.set(px * scale + jx, py * scale, pz * scale + jz);
            sphere.scale.set(1.28, 0.64, 1.18);
            cloud.add(sphere);
        });
        return cloud;
    }

    // =========================================================================
    // MODELOS 3D DETALLADOS Y ORGÁNICOS DE CADA UNIDAD ALREDEDOR DEL LAGO
    // =========================================================================
    function buildUnitSpecificLandmarks(THREE, group, unitId, getTerrainHeight) {
        // 1. Juncos de ribera en el agua (y cantos rodados para Tropa y Clan; Escultas es un cañón fluvial sin estanque circular)
        if (unitId !== 'manada' && unitId !== 'escultas') {
            const pebbleColors = unitId === 'clan'
                ? [0x78716C, 0xA8A29E, 0x57534E]
                : [0x57534E, 0x78716C, 0x44403C];

            for (let i = 0; i < 36; i++) {
                const ang = (i / 36) * Math.PI * 2 + Math.sin(i * 1.9) * 0.08;
                const rad = 22.8 + (i % 5) * 1.35;
                const rx = Math.cos(ang) * rad;
                const rz = Math.sin(ang) * rad;
                const ry = getTerrainHeight(rx, rz);

                if (unitId !== 'castores' && unitId !== 'tropa') {
                    const rSize = 0.55 + (i % 4) * 0.38;
                    const boulderGeo = deformGeometrySmooth(
                        new THREE.SphereGeometry(rSize, 22, 18),
                        0.22,
                        1.35,
                        i * 1.7
                    );
                    const boulderMat = new THREE.MeshStandardMaterial({
                        color: pebbleColors[i % pebbleColors.length],
                        roughness: 0.84,
                        metalness: 0.05
                    });
                    const boulder = new THREE.Mesh(boulderGeo, boulderMat);
                    boulder.position.set(rx, ry + 0.08, rz);
                    boulder.scale.set(1.35, 0.62 + (i % 3) * 0.12, 1.15);
                    boulder.rotation.y = i * 0.9;
                    group.add(boulder);
                }

                if (unitId === 'castores' || unitId === 'tropa' || i % 2 === 0) {
                    const reeds = createShoreReedsCluster(THREE, unitId, i);
                    reeds.position.set(Math.cos(ang + 0.04) * 21.8, -0.05, Math.sin(ang + 0.04) * 21.8);
                    group.add(reeds);
                    unitLakeState.reedClusters.push({ mesh: reeds, phase: i * 0.6 });
                }
            }
        }

        if (unitId === 'castores') {
            // =================================================================
            // MUNDO CASTORES: ESTÉTICA LIMPIA Y ESTILIZADA 3D (FIREWATCH / PIXAR)
            // =================================================================
            const woodWarmMat = new THREE.MeshStandardMaterial({
                color: 0x795548,
                roughness: 0.80,
                metalness: 0.02,
                flatShading: false
            });
            const woodDarkMat = new THREE.MeshStandardMaterial({
                color: 0x5D4037,
                roughness: 0.84,
                metalness: 0.02,
                flatShading: false
            });
            const cutWoodMat = new THREE.MeshStandardMaterial({
                color: 0xE6CCB2,
                roughness: 0.65,
                flatShading: false
            });

            // 1. LA GRAN PRESA ESTILIZADA DE TRONCOS REDONDEADOS + ESPUMA SUAVE (Orilla Norte)
            const damGroup = new THREE.Group();
            for (let i = 0; i < 32; i++) {
                const len = 5.0 + (i % 4) * 1.4;
                const rad = 0.20 + (i % 3) * 0.05;
                const logGeo = new THREE.CylinderGeometry(rad, rad * 1.05, len, 22);
                const log = new THREE.Mesh(logGeo, [i % 2 === 0 ? woodWarmMat : woodDarkMat, cutWoodMat, cutWoodMat]);
                log.rotation.z = Math.PI / 2 + Math.sin(i * 1.7) * 0.12;
                log.rotation.y = Math.cos(i * 2.1) * 0.32;
                log.position.set((i - 16) * 0.56, 0.16 + (i % 4) * 0.24, Math.sin(i * 0.9) * 0.55);
                damGroup.add(log);
            }
            for (let f = -2; f <= 2; f++) {
                const foam = createGlowSprite(THREE, 0xE0F2FE, 3.6 + Math.abs(f) * 0.4, 0.28);
                foam.position.set(f * 3.0, 0.32, 0.55);
                damGroup.add(foam);
            }
            damGroup.position.set(0, 0.05, -21.8);
            group.add(damGroup);

            // 2. LA MADRIGUERA ESTILIZADA (Domo de madera suave + costillas limpias + entrada cálida)
            const lodgeGroup = new THREE.Group();
            const lodgeDomeGeo = deformGeometrySmooth(
                new THREE.SphereGeometry(3.8, 48, 32, 0, Math.PI * 2, 0, Math.PI * 0.56),
                0.06,
                0.75,
                7.7
            );
            const lodgeDome = new THREE.Mesh(lodgeDomeGeo, woodWarmMat);
            lodgeDome.scale.set(1.16, 0.86, 1.16);
            lodgeGroup.add(lodgeDome);

            // Vigas limpias y estilizadas que abrazan el domo de la Madriguera
            for (let rIdx = 0; rIdx < 14; rIdx++) {
                const rAng = (rIdx / 14) * Math.PI * 2;
                if (Math.cos(rAng) > 0.78) continue; // Dejar despejada la entrada frontal
                const rib = new THREE.Mesh(
                    new THREE.CylinderGeometry(0.12, 0.16, 3.4, 16),
                    [woodDarkMat, cutWoodMat, cutWoodMat]
                );
                rib.position.set(Math.sin(rAng) * 2.65, 1.25, Math.cos(rAng) * 2.65);
                rib.lookAt(0, 3.3, 0);
                rib.rotateX(Math.PI / 2);
                lodgeGroup.add(rib);
            }

            // Pórtico redondeado de madera e iluminación interior acogedora
            const arch = new THREE.Mesh(
                new THREE.TorusGeometry(1.02, 0.22, 20, 36, Math.PI),
                woodDarkMat
            );
            arch.position.set(0, 0.22, 3.35);
            lodgeGroup.add(arch);

            const lodgeLightGlow = createGlowSprite(THREE, 0xFDE047, 5.4, 0.75);
            lodgeLightGlow.position.set(0, 0.9, 3.5);
            lodgeGroup.add(lodgeLightGlow);

            lodgeGroup.position.set(-13.2, 0.0, -18.0);
            lodgeGroup.rotation.y = 0.52;
            group.add(lodgeGroup);

            // Embarcadero estilizado de tablones suaves
            const pierGroup = new THREE.Group();
            const plankMat = new THREE.MeshStandardMaterial({ color: 0x8D6E63, roughness: 0.78 });
            for (let p = 0; p < 10; p++) {
                const plank = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.12, 0.42), plankMat);
                plank.position.set(0, 0.44, p * 0.50);
                pierGroup.add(plank);
            }
            [[-0.95, 0.5], [0.95, 0.5], [-0.95, 4.5], [0.95, 4.5]].forEach(([px, pz]) => {
                const post = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.14, 1.65, 16), woodDarkMat);
                post.position.set(px, 0.1, pz);
                pierGroup.add(post);
            });
            pierGroup.position.set(-8.5, 0.0, -21.2);
            pierGroup.rotation.y = 0.32;
            group.add(pierGroup);

            // 3. EL GRAN ROBLE CENTENARIO DE MALAK (Escultura 3D limpia estilo Pixar / Firewatch, Orilla Este)
            const oakGroup = new THREE.Group();
            const oakTrunkH = 8.0;
            const oakTrunkGeo = new THREE.CylinderGeometry(0.95, 2.15, oakTrunkH, 32, 10);
            const oPos = oakTrunkGeo.attributes.position;
            for (let i = 0; i < oPos.count; i++) {
                const py = oPos.getY(i);
                const hNorm = (py + oakTrunkH * 0.5) / oakTrunkH;
                const rootFlare = hNorm < 0.28 ? (1.0 + Math.pow(1.0 - hNorm / 0.28, 2.0) * 0.45) : 1.0;
                oPos.setX(i, oPos.getX(i) * rootFlare);
                oPos.setZ(i, oPos.getZ(i) * rootFlare);
            }
            oakTrunkGeo.computeVertexNormals();
            const oakTrunk = new THREE.Mesh(oakTrunkGeo, woodDarkMat);
            oakTrunk.position.y = oakTrunkH * 0.46;
            oakGroup.add(oakTrunk);

            // 5 ramas madres limpias y suaves
            for (let b = 0; b < 5; b++) {
                const bAng = (b / 5) * Math.PI * 2;
                const limb = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.46, 3.8, 18), woodDarkMat);
                limb.position.set(Math.cos(bAng) * 1.25, 6.4, Math.sin(bAng) * 1.25);
                limb.rotation.z = -Math.cos(bAng) * 0.58;
                limb.rotation.x = Math.sin(bAng) * 0.58;
                oakGroup.add(limb);
            }

            // Copa escultural limpia con 7 volúmenes suaves de alta resolución y degradado de luz
            const oakPalette = [0x14532D, 0x16A34A, 0x22C55E];
            const oakCrownVolumes = [
                [0, 9.2, 0, 4.4, 2],
                [-2.8, 7.8, 1.4, 3.4, 1],
                [2.9, 8.0, -1.2, 3.5, 1],
                [0.6, 7.5, 2.6, 3.3, 0],
                [-1.8, 7.6, -2.3, 3.2, 0],
                [1.9, 9.5, 1.2, 3.1, 2],
                [-1.7, 9.3, -0.9, 3.0, 2]
            ];
            oakCrownVolumes.forEach(([cx, cy, cz, cr, toneIdx], idx) => {
                const puffGeo = deformGeometrySmooth(
                    new THREE.SphereGeometry(cr, 40, 32),
                    0.06,
                    0.65,
                    20 + idx * 1.9
                );
                const puffMat = new THREE.MeshStandardMaterial({
                    color: oakPalette[toneIdx],
                    roughness: 0.76,
                    metalness: 0.02,
                    flatShading: false
                });
                const puff = new THREE.Mesh(puffGeo, puffMat);
                puff.position.set(cx, cy, cz);
                puff.scale.set(1.22, 0.80, 1.18);
                oakGroup.add(puff);
            });

            const oakSunGlow = createGlowSprite(THREE, 0xFEF08A, 12.0, 0.38);
            oakSunGlow.position.set(0, 8.4, 0);
            oakGroup.add(oakSunGlow);

            const oakY = getTerrainHeight(25.5, 4.0);
            oakGroup.position.set(25.5, oakY - 0.35, 4.0);
            group.add(oakGroup);

            // 4. ARBUSTOS ESTILIZADOS DE RIBERA (Volúmenes suaves estilo Pixar)
            for (let b = 0; b < 34; b++) {
                const bAng = (b / 34) * Math.PI * 2 + Math.sin(b * 2.1) * 0.05;
                const bRad = 23.2 + (b % 4) * 2.2;
                const bx = Math.cos(bAng) * bRad;
                const bz = Math.sin(bAng) * bRad;
                if (Math.hypot(bx, bz + 21.8) < 6.8) continue;
                const by = getTerrainHeight(bx, bz);
                const bush = createBotanicalBush(THREE, 0.72 + (b % 3) * 0.20, b * 1.63);
                bush.position.set(bx, by - 0.08, bz);
                group.add(bush);
            }

            // 5. NENÚFARES Y FLORES DE LOTO EN EL ESTANQUE CRISTALINO
            const padMat = new THREE.MeshStandardMaterial({ color: 0x16A34A, roughness: 0.52, side: THREE.DoubleSide });
            const petalMat = new THREE.MeshStandardMaterial({
                color: 0xF9A8D4,
                emissive: 0xEC4899,
                emissiveIntensity: 0.18,
                roughness: 0.42,
                side: THREE.DoubleSide
            });

            for (let p = 0; p < 24; p++) {
                const a = (p / 24) * Math.PI * 2 + 0.3;
                const r = 7.2 + (p % 5) * 2.85;
                const padGroup = new THREE.Group();
                const padDisc = new THREE.Mesh(
                    new THREE.CircleGeometry(0.82 + (p % 3) * 0.18, 28, 0, Math.PI * 1.88),
                    padMat
                );
                padDisc.rotation.x = -Math.PI / 2;
                padGroup.add(padDisc);

                if (p % 2 === 0) {
                    // Pétalos botánicos curvados de flor de nenúfar (sin esferas)
                    for (let pet = 0; pet < 8; pet++) {
                        const pAng = (pet / 8) * Math.PI * 2;
                        const petalGeo = new THREE.PlaneGeometry(0.16, 0.34, 2, 3);
                        const pPos = petalGeo.attributes.position;
                        for (let k = 0; k < pPos.count; k++) {
                            const py = pPos.getY(k) + 0.17;
                            pPos.setZ(k, py * py * 0.55);
                        }
                        petalGeo.computeVertexNormals();
                        const petal = new THREE.Mesh(petalGeo, petalMat);
                        petal.position.set(Math.cos(pAng) * 0.12, 0.04, Math.sin(pAng) * 0.12);
                        petal.rotation.y = -pAng + Math.PI / 2;
                        petal.rotation.x = -0.95;
                        padGroup.add(petal);
                    }
                    const blossomGlow = createGlowSprite(THREE, 0xFEF08A, 0.75, 0.85);
                    blossomGlow.position.y = 0.12;
                    padGroup.add(blossomGlow);
                }

                padGroup.position.set(Math.cos(a) * r, 0.05, Math.sin(a) * r);
                padGroup.rotation.y = p * 1.3;
                group.add(padGroup);
                unitLakeState.animatedProps.push({ mesh: padGroup, baseY: 0.05, phase: p * 0.7 });
            }
        } else if (unitId === 'manada') {
            // =================================================================
            // MUNDO MANADA: LA ROCA DEL CONSEJO EN UN BOSQUE DENSO BAJO LA LUNA
            // (Topografía continua esculpida en alta resolución + Shader GLSL
            //  de estratos de roca y musgo + vegetación botánica real, sin lobos)
            // =================================================================
            const councilGroup = new THREE.Group();

            // 1. Luz lunar cenital suave bañando la cúspide de la Roca del Consejo
            const peakY = getTerrainHeight(0, -2.6);
            const summitMoonGlow = createGlowSprite(THREE, 0xFEF08A, 22.0, 0.34);
            summitMoonGlow.position.set(0, peakY + 1.8, -2.4);
            councilGroup.add(summitMoonGlow);

            // 2. Hoguera ceremonial en la explanada de la Roca del Consejo y braseros de subida
            const centralFireY = getTerrainHeight(0, 1.4);
            const mainCouncilFire = createCampfireWithGlow(THREE, 0.95);
            mainCouncilFire.position.set(0, centralFireY - 0.05, 1.4);
            councilGroup.add(mainCouncilFire);

            [[-4.8, 5.2], [4.8, 5.2]].forEach(([fx, fz]) => {
                const fy = getTerrainHeight(fx, fz);
                const sideFire = createCampfireWithGlow(THREE, 0.68);
                sideFire.position.set(fx, fy - 0.05, fz);
                councilGroup.add(sideFire);
            });

            // 3. Bruma nocturna baja flotando entre los troncos del bosque denso alrededor de la roca
            for (let m = 0; m < 14; m++) {
                const mAng = (m / 14) * Math.PI * 2;
                const mRad = 18.0 + (m % 3) * 4.5;
                const mx = Math.cos(mAng) * mRad;
                const mz = Math.sin(mAng) * mRad;
                const my = getTerrainHeight(mx, mz) + 1.6 + (m % 2) * 0.8;
                const mistSprite = createGlowSprite(THREE, 0x94A3B8, 19.0 + (m % 3) * 4.0, 0.12);
                mistSprite.position.set(mx, my, mz);
                councilGroup.add(mistSprite);
            }

            group.add(councilGroup);

            // 4. SOTOBOSQUE BOTÁNICO DENSO (Helechos y matas de hojas reales con transparencia alfa)
            // Rodeando la falda de la Roca del Consejo y adentrándose bajo la arboleda
            for (let b = 0; b < 68; b++) {
                const ang = (b / 68) * Math.PI * 2 + Math.sin(b * 2.3) * 0.04;
                const rad = (b < 16)
                    ? (11.8 + (b % 3) * 1.2) // Matas en las grietas bajas de la roca
                    : (15.4 + (b % 6) * 2.4 + Math.cos(b * 1.7) * 1.1); // Sotobosque espeso del bosque
                const bx = Math.cos(ang) * rad;
                const bz = Math.sin(ang) * rad;
                const by = getTerrainHeight(bx, bz);
                const bScale = 0.85 + (b % 4) * 0.28;
                const bush = createBotanicalBush(THREE, bScale, b * 1.91);
                bush.position.set(bx, by - 0.12, bz);
                group.add(bush);
            }

            // 5. LUNA LLENA REALISTA CON CRÁTERES Y MARES LUNARES EN EL CIELO DE SEEONEE
            const moonTex = getRealisticMoonTexture(THREE);
            const moonMesh = new THREE.Mesh(
                new THREE.SphereGeometry(8.5, 64, 64),
                new THREE.MeshBasicMaterial({ map: moonTex, color: 0xFFFBEB })
            );
            moonMesh.position.set(-18, 43, -52);
            moonMesh.rotation.y = -0.45;
            group.add(moonMesh);

            const moonCoronaInner = createGlowSprite(THREE, 0xFEF08A, 32.0, 0.55);
            moonCoronaInner.position.set(-18, 43, -51.5);
            group.add(moonCoronaInner);

            const moonCoronaOuter = createGlowSprite(THREE, 0x93C5FD, 58.0, 0.28);
            moonCoronaOuter.position.set(-18, 43, -52.5);
            group.add(moonCoronaOuter);
        } else if (unitId === 'tropa') {
            // =================================================================
            // MUNDO TROPA (LOHENGRIN): LA BARCA DEL CABALLERO DEL CISNE EN EL
            // LAGO ESMERALDA + TORRE DE PIONERISMO Y CAMPAMENTO DE PATRULLAS
            // (Estética limpia 3D estilo Firewatch / Pixar)
            // =================================================================
            const swanBoatEnsemble = new THREE.Group();

            // 1A. EL CISNE BLANCO ENCANTADO (Escultura 3D estilizada suave tirando de la barca)
            const swanGroup = new THREE.Group();
            const swanWhiteMat = new THREE.MeshStandardMaterial({
                color: 0xF8FAFC,
                emissive: 0xE2E8F0,
                emissiveIntensity: 0.16,
                roughness: 0.48,
                metalness: 0.04,
                flatShading: false
            });
            const goldEnchantMat = new THREE.MeshStandardMaterial({
                color: 0xFDE047,
                emissive: 0xF59E0B,
                emissiveIntensity: 0.45,
                roughness: 0.28,
                metalness: 0.65
            });
            const beakMat = new THREE.MeshStandardMaterial({
                color: 0xF97316,
                roughness: 0.45
            });

            // Cuerpo suave del cisne sobre el agua
            const bodyGeo = deformGeometrySmooth(new THREE.SphereGeometry(1.08, 36, 28), 0.03, 0.7, 3.1);
            const swanBody = new THREE.Mesh(bodyGeo, swanWhiteMat);
            swanBody.scale.set(0.84, 0.66, 1.58);
            swanBody.position.set(0, 0.35, 0);
            swanGroup.add(swanBody);

            // Alas plegadas arqueadas con elegancia a ambos lados
            [-1, 1].forEach(side => {
                const wingGeo = deformGeometrySmooth(new THREE.SphereGeometry(0.92, 32, 24), 0.04, 0.8, 5.2 + side);
                const wing = new THREE.Mesh(wingGeo, swanWhiteMat);
                wing.scale.set(0.28, 0.66, 1.48);
                wing.position.set(side * 0.62, 0.64, -0.15);
                wing.rotation.z = -side * 0.24;
                wing.rotation.x = 0.16;
                swanGroup.add(wing);
            });

            // Cuello curvo en "S" del Cisne de Lohengrin
            const neckCurve = new THREE.CatmullRomCurve3([
                new THREE.Vector3(0, 0.48, 1.15),
                new THREE.Vector3(0, 1.32, 1.62),
                new THREE.Vector3(0, 2.15, 1.28),
                new THREE.Vector3(0, 2.48, 1.55)
            ]);
            const neckMesh = new THREE.Mesh(
                new THREE.TubeGeometry(neckCurve, 32, 0.16, 18, false),
                swanWhiteMat
            );
            swanGroup.add(neckMesh);

            // Cabeza y pico del cisne
            const swanHead = new THREE.Mesh(new THREE.SphereGeometry(0.23, 24, 20), swanWhiteMat);
            swanHead.position.set(0, 2.48, 1.58);
            swanHead.scale.set(0.92, 0.95, 1.22);
            swanGroup.add(swanHead);

            const swanBeak = new THREE.Mesh(new THREE.ConeGeometry(0.10, 0.42, 18), beakMat);
            swanBeak.position.set(0, 2.42, 1.92);
            swanBeak.rotation.x = Math.PI * 0.46;
            swanGroup.add(swanBeak);

            // Corona / Collar dorado del joven encantado en el cuello del cisne
            const collar = new THREE.Mesh(new THREE.TorusGeometry(0.22, 0.045, 16, 32), goldEnchantMat);
            collar.position.set(0, 0.96, 1.44);
            collar.rotation.x = Math.PI * 0.42;
            swanGroup.add(collar);

            const swanAura = createGlowSprite(THREE, 0xA7F3D0, 5.2, 0.42);
            swanAura.position.set(0, 1.1, 0.4);
            swanGroup.add(swanAura);

            swanGroup.position.set(0, 0.04, 4.8);
            swanBoatEnsemble.add(swanGroup);

            // 1B. LA BARCA MEDIEVAL DE LOHENGRIN ARRASTRADA POR EL CISNE
            const boatGroup = new THREE.Group();
            const hullWoodMat = new THREE.MeshStandardMaterial({
                color: 0x6D4C41,
                roughness: 0.76,
                metalness: 0.05,
                flatShading: false
            });
            const hullInnerMat = new THREE.MeshStandardMaterial({
                color: 0x4E342E,
                roughness: 0.84
            });

            // Casco curvo estilizado de la barca medieval
            const hullOuter = new THREE.Mesh(new THREE.SphereGeometry(1.65, 36, 24, 0, Math.PI * 2, Math.PI * 0.46, Math.PI * 0.54), hullWoodMat);
            hullOuter.scale.set(0.88, 0.72, 2.35);
            hullOuter.position.set(0, 0.78, -1.6);
            boatGroup.add(hullOuter);

            // Borda dorada y roda de proa/popa arqueadas
            const gunwale = new THREE.Mesh(new THREE.TorusGeometry(1.58, 0.07, 16, 48), goldEnchantMat);
            gunwale.rotation.x = Math.PI / 2;
            gunwale.scale.set(0.86, 2.32, 1.0);
            gunwale.position.set(0, 0.76, -1.6);
            boatGroup.add(gunwale);

            const prowCurve = new THREE.CatmullRomCurve3([
                new THREE.Vector3(0, 0.45, 1.85),
                new THREE.Vector3(0, 1.25, 2.35),
                new THREE.Vector3(0, 1.85, 2.05)
            ]);
            const prowPost = new THREE.Mesh(new THREE.TubeGeometry(prowCurve, 20, 0.09, 14, false), goldEnchantMat);
            boatGroup.add(prowPost);

            // Bancos de madera de la barca
            [-0.4, -1.6, -2.8].forEach(bz => {
                const bench = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.10, 0.36), hullInnerMat);
                bench.position.set(0, 0.62, bz);
                boatGroup.add(bench);
            });

            // El Escudo Plateado y la Espada del Caballero del Cisne junto a la Luz del Santo Grial
            const silverMat = new THREE.MeshStandardMaterial({
                color: 0xE2E8F0,
                roughness: 0.25,
                metalness: 0.82
            });
            const shield = new THREE.Mesh(new THREE.CylinderGeometry(0.68, 0.68, 0.08, 28), silverMat);
            shield.scale.set(0.82, 1.0, 1.18);
            shield.position.set(0.42, 0.98, -1.2);
            shield.rotation.z = 0.45;
            shield.rotation.x = 0.25;
            boatGroup.add(shield);

            // El Cáliz / Luz protectora del Santo Grial en la proa de la barca
            const chalice = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.12, 0.42, 20), goldEnchantMat);
            chalice.position.set(0, 0.92, -0.35);
            boatGroup.add(chalice);

            const grailCoreGlow = createGlowSprite(THREE, 0xFEF08A, 4.6, 0.85);
            grailCoreGlow.position.set(0, 1.15, -0.35);
            boatGroup.add(grailCoreGlow);

            const grailEmeraldHalo = createGlowSprite(THREE, 0x34D399, 8.8, 0.42);
            grailEmeraldHalo.position.set(0, 1.25, -0.8);
            boatGroup.add(grailEmeraldHalo);

            swanBoatEnsemble.add(boatGroup);

            // Tirantes / cadenas doradas de luz que unen al Cisne con la Barca de Lohengrin
            [-0.42, 0.42].forEach(rx => {
                const reinCurve = new THREE.CatmullRomCurve3([
                    new THREE.Vector3(rx * 0.35, 0.95, 6.15),
                    new THREE.Vector3(rx * 0.85, 0.68, 3.85),
                    new THREE.Vector3(rx * 0.65, 0.85, 1.85)
                ]);
                const reinMesh = new THREE.Mesh(
                    new THREE.TubeGeometry(reinCurve, 24, 0.032, 10, false),
                    goldEnchantMat
                );
                swanBoatEnsemble.add(reinMesh);
            });

            swanBoatEnsemble.position.set(0, 0.04, 1.2);
            swanBoatEnsemble.rotation.y = 0.38;
            group.add(swanBoatEnsemble);
            unitLakeState.animatedProps.push({ mesh: swanBoatEnsemble, baseY: 0.04, phase: 0.5 });

            // 2. GRAN TORRE DE PIONERISMO EN MADERA REDONDEADA + AMARRES Y PUENTE
            const towerGroup = new THREE.Group();
            const pinePoleMat = new THREE.MeshStandardMaterial({ color: 0xA16207, roughness: 0.78 });
            const ropeMat = new THREE.MeshStandardMaterial({ color: 0xFDE68A, roughness: 0.65 });
            const deckMat = new THREE.MeshStandardMaterial({ color: 0xB45309, roughness: 0.76 });

            const corners = [[-1.9, -1.9], [1.9, -1.9], [1.9, 1.9], [-1.9, 1.9]];
            corners.forEach(([cx, cz]) => {
                const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.23, 12.8, 18), pinePoleMat);
                pole.position.set(cx * 0.78, 6.2, cz * 0.78);
                pole.rotation.z = -cx * 0.038;
                pole.rotation.x = cz * 0.038;
                towerGroup.add(pole);

                // Anillos de amarre cuadrado en sisal
                [3.2, 6.2, 9.2].forEach(ly => {
                    const lashing = new THREE.Mesh(new THREE.TorusGeometry(0.24, 0.05, 10, 20), ropeMat);
                    lashing.position.set(cx * (0.78 - ly * 0.015), ly, cz * (0.78 - ly * 0.015));
                    lashing.rotation.x = Math.PI / 2;
                    towerGroup.add(lashing);
                });
            });

            // Travesaños horizontales y plataforma de tablones
            [3.2, 6.2, 9.2].forEach(ly => {
                const span = 3.2 - ly * 0.08;
                [[-1, 0], [1, 0], [0, -1], [0, 1]].forEach(([ox, oz]) => {
                    const bar = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, span, 14), pinePoleMat);
                    bar.position.set(ox * span * 0.45, ly, oz * span * 0.45);
                    if (ox === 0) bar.rotation.z = Math.PI / 2;
                    else bar.rotation.x = Math.PI / 2;
                    towerGroup.add(bar);
                });
            });

            // Plataforma de observación con tablones individuales y barandilla
            for (let p = -4; p <= 4; p++) {
                const plank = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.14, 0.34), deckMat);
                plank.position.set(0, 9.3, p * 0.38);
                towerGroup.add(plank);
            }

            // Tejado de lona scout a cuatro aguas suavizado
            const roofGeo = new THREE.ConeGeometry(2.85, 2.4, 32);
            const roof = new THREE.Mesh(
                roofGeo,
                new THREE.MeshStandardMaterial({ color: 0x059669, roughness: 0.65 })
            );
            roof.position.y = 12.6;
            towerGroup.add(roof);

            const lanternGlow = createGlowSprite(THREE, 0xFDE047, 5.5, 0.75);
            lanternGlow.position.set(0, 10.4, 0);
            towerGroup.add(lanternGlow);

            towerGroup.position.set(-6.5, getTerrainHeight(-6.5, -25.5), -25.5);
            group.add(towerGroup);

            // 3. CAMPAMENTO DE PATRULLAS (TIENDAS CANADIENSES SUAVES CON LUZ CÁLIDA)
            const tentPositions = [[15.5, -21, 0.55], [22.5, -13.5, 1.05], [23.5, 8.5, 2.15], [-21.5, 12.5, -1.15], [-18.5, -15.5, 0.35]];
            tentPositions.forEach(([tx, tz, rot]) => {
                const tent = new THREE.Group();
                const canvasMat = new THREE.MeshStandardMaterial({
                    color: 0x059669,
                    emissive: 0xF59E0B,
                    emissiveIntensity: 0.25,
                    roughness: 0.62
                });
                const roofPrism = new THREE.Mesh(new THREE.CylinderGeometry(1.85, 1.85, 3.6, 3, 1), canvasMat);
                roofPrism.rotation.x = Math.PI / 2;
                roofPrism.rotation.z = 0;
                roofPrism.position.y = 1.05;
                tent.add(roofPrism);

                const ridgePole = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 4.0, 12), pinePoleMat);
                ridgePole.rotation.x = Math.PI / 2;
                ridgePole.position.y = 1.95;
                tent.add(ridgePole);

                const innerGlow = createGlowSprite(THREE, 0xFBBF24, 4.2, 0.62);
                innerGlow.position.set(0, 1.1, 1.6);
                tent.add(innerGlow);

                tent.position.set(tx, getTerrainHeight(tx, tz), tz);
                tent.rotation.y = rot;
                group.add(tent);
            });

            // 4. ARBUSTOS ESTILIZADOS DE RIBERA Y FUEGO DE LA CORTE DE HONOR
            for (let b = 0; b < 30; b++) {
                const bAng = (b / 30) * Math.PI * 2 + 0.15;
                const bRad = 23.4 + (b % 4) * 2.2;
                const bx = Math.cos(bAng) * bRad;
                const bz = Math.sin(bAng) * bRad;
                if (Math.hypot(bx + 6.5, bz + 25.5) < 6.0) continue;
                const by = getTerrainHeight(bx, bz);
                const bush = createBotanicalBush(THREE, 0.72 + (b % 3) * 0.18, b * 1.47);
                bush.position.set(bx, by - 0.08, bz);
                group.add(bush);
            }

            const campFire = createCampfireWithGlow(THREE, 1.15);
            campFire.position.set(4.8, getTerrainHeight(4.8, -23.0), -23.0);
            group.add(campFire);
        } else if (unitId === 'escultas') {
            // =================================================================
            // MUNDO ESCULTAS: NINJAS EN EL DESCENSO DEL SENA Y CAÑÓN DE TREA
            // (Cañón fluvial sin estanque circular, Torii de orilla a orilla,
            //  Dojo Ninja en la terraza izquierda y piraguas sorteando rápidos)
            // =================================================================
            const getEscultasRiverX = (zVal) => Math.sin(zVal * 0.095) * 6.5;
            const getEscultasRiverTangentAngle = (zVal) => Math.atan2(Math.cos(zVal * 0.095) * 6.5 * 0.095, 1.0);

            // 0. ROCAS NATURALES DE CAÑÓN EN AMBAS ORILLAS DEL RÍO BRAVO
            const bankRockColors = [0x64748B, 0x475569, 0x94A3B8];
            for (let bIdx = 0; bIdx < 28; bIdx++) {
                const bz = -22.0 + (bIdx / 27) * 44.0;
                const side = bIdx % 2 === 0 ? -1 : 1;
                const bankDist = 6.8 + (bIdx % 3) * 0.9;
                const bx = getEscultasRiverX(bz) + side * bankDist;
                const by = getTerrainHeight(bx, bz);
                const rSize = 0.65 + (bIdx % 4) * 0.35;
                const boulderGeo = deformGeometrySmooth(
                    new THREE.SphereGeometry(rSize, 20, 16),
                    0.22,
                    1.35,
                    bIdx * 1.7
                );
                const boulderMat = new THREE.MeshStandardMaterial({
                    color: bankRockColors[bIdx % bankRockColors.length],
                    roughness: 0.86,
                    metalness: 0.04
                });
                const boulder = new THREE.Mesh(boulderGeo, boulderMat);
                boulder.position.set(bx, by + 0.05, bz);
                boulder.scale.set(1.35, 0.68 + (bIdx % 3) * 0.12, 1.15);
                boulder.rotation.y = bIdx * 1.1;
                group.add(boulder);
            }

            // 1. TORII SAGRADO CRUZANDO DE ORILLA A ORILLA SOBRE EL CAUCE DEL RÍO (Z = 16.0)
            const toriiZ = 16.0;
            const toriiX = getEscultasRiverX(toriiZ);
            const waterTorii = createJapaneseToriiGate(THREE, 1.24);
            waterTorii.position.set(toriiX, -0.35, toriiZ);
            waterTorii.rotation.y = getEscultasRiverTangentAngle(toriiZ);
            group.add(waterTorii);

            // Farolillos de piedra (Tōrō) flanqueando las riberas del cañón y la subida al Dojo
            [
                [getEscultasRiverX(19.5) - 7.8, 19.5],
                [getEscultasRiverX(19.5) + 7.8, 19.5],
                [getEscultasRiverX(-18.5) - 7.8, -18.5],
                [getEscultasRiverX(-18.5) + 7.8, -18.5],
                [-11.2, -11.5],
                [-11.2, -4.5]
            ].forEach(([tx, tz]) => {
                const toro = createStoneToroLantern(THREE, 1.05);
                toro.position.set(tx, Math.max(0.1, getTerrainHeight(tx, tz)), tz);
                group.add(toro);
            });

            // 2. DOJO / PABELLÓN NINJA EN LA TERRAZA ELEVADA DE LA RIBERA IZQUIERDA (X = -15.5, Z = -8.0)
            const dojoGroup = new THREE.Group();
            const darkWoodMat = new THREE.MeshStandardMaterial({ color: 0x291D18, roughness: 0.78 });
            const redLacquerMat = new THREE.MeshStandardMaterial({ color: 0xDC2626, roughness: 0.55 });
            const roofTileMat = new THREE.MeshStandardMaterial({ color: 0x1E293B, roughness: 0.52, metalness: 0.14 });
            const shojiMat = new THREE.MeshStandardMaterial({
                color: 0xFEF3C7,
                emissive: 0xF59E0B,
                emissiveIntensity: 0.58,
                roughness: 0.45
            });

            // Plataforma de piedra y madera del Dojo
            const dojoBase = new THREE.Mesh(new THREE.BoxGeometry(9.2, 1.4, 6.4), new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.85 }));
            dojoBase.position.y = 0.45;
            dojoGroup.add(dojoBase);

            // Cuerpo principal con paneles luminosos Shōji y columnas rojas
            const shojiCore = new THREE.Mesh(new THREE.BoxGeometry(7.2, 3.2, 4.6), shojiMat);
            shojiCore.position.y = 2.65;
            dojoGroup.add(shojiCore);

            [-3.65, -1.2, 1.2, 3.65].forEach((cx) => {
                [-2.35, 2.35].forEach((cz) => {
                    const col = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.18, 3.4, 16), redLacquerMat);
                    col.position.set(cx, 2.7, cz);
                    dojoGroup.add(col);
                });
            });

            // Doble tejado japonés curvado (Irimoya / Pagoda estilizada)
            const lowerRoof = new THREE.Mesh(new THREE.ConeGeometry(6.8, 2.1, 4), roofTileMat);
            lowerRoof.rotation.y = Math.PI / 4;
            lowerRoof.scale.set(1.22, 1.0, 0.88);
            lowerRoof.position.y = 5.1;
            dojoGroup.add(lowerRoof);

            const upperCore = new THREE.Mesh(new THREE.BoxGeometry(4.6, 1.8, 3.2), darkWoodMat);
            upperCore.position.y = 6.2;
            dojoGroup.add(upperCore);

            const upperRoof = new THREE.Mesh(new THREE.ConeGeometry(4.9, 1.95, 4), roofTileMat);
            upperRoof.rotation.y = Math.PI / 4;
            upperRoof.scale.set(1.22, 1.0, 0.88);
            upperRoof.position.y = 7.85;
            dojoGroup.add(upperRoof);

            const dojoGlow = createGlowSprite(THREE, 0xFBBF24, 7.5, 0.65);
            dojoGlow.position.set(0, 3.2, 2.2);
            dojoGroup.add(dojoGlow);

            dojoGroup.position.set(-15.5, getTerrainHeight(-15.5, -8.0), -8.0);
            dojoGroup.rotation.y = Math.PI * 0.42; // Mirando hacia el cañón del río
            group.add(dojoGroup);

            // Hoguera en la terraza elevada frente al Dojo Ninja
            const campFire = createCampfireWithGlow(THREE, 1.15);
            campFire.position.set(-10.2, getTerrainHeight(-10.2, -5.5), -5.5);
            group.add(campFire);

            // 3. PIRAGUAS / KAYAKS DEL DESCENSO DEL SENA ALINEADOS CON LA CURVA Y TANGENTE DEL RÍO
            const kayakConfigs = [
                { z: -11.5, laneOffset: -1.1, color: 0xDC2626, phase: 0.4 },
                { z: -0.5, laneOffset: 1.2, color: 0x0EA5E9, phase: 1.7 },
                { z: 9.2, laneOffset: -0.9, color: 0xF59E0B, phase: 2.9 }
            ];
            const paddleShaftMat = new THREE.MeshStandardMaterial({ color: 0x1E293B, roughness: 0.4, metalness: 0.3 });
            const paddleBladeMat = new THREE.MeshStandardMaterial({ color: 0xFDE047, roughness: 0.4 });

            kayakConfigs.forEach((cfg) => {
                const kayakGroup = new THREE.Group();
                const hullCurve = new THREE.CatmullRomCurve3([
                    new THREE.Vector3(-2.3, 0.26, 0),
                    new THREE.Vector3(-1.2, 0.02, 0),
                    new THREE.Vector3(0, -0.04, 0),
                    new THREE.Vector3(1.2, 0.02, 0),
                    new THREE.Vector3(2.3, 0.26, 0)
                ]);
                const hullMat = new THREE.MeshStandardMaterial({ color: cfg.color, roughness: 0.35, metalness: 0.12 });
                const hull = new THREE.Mesh(new THREE.TubeGeometry(hullCurve, 28, 0.48, 18, false), hullMat);
                hull.scale.set(1.0, 0.48, 0.74);
                kayakGroup.add(hull);

                const cockpit = new THREE.Mesh(
                    new THREE.CylinderGeometry(0.36, 0.36, 0.18, 18),
                    new THREE.MeshStandardMaterial({ color: 0x0F172A, roughness: 0.7 })
                );
                cockpit.scale.set(1.5, 1.0, 0.85);
                cockpit.position.set(0, 0.16, 0);
                kayakGroup.add(cockpit);

                const paddle = new THREE.Group();
                const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 2.5, 10), paddleShaftMat);
                shaft.rotation.x = Math.PI / 2;
                paddle.add(shaft);
                [-1.22, 1.22].forEach((bz) => {
                    const blade = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.03, 0.48), paddleBladeMat);
                    blade.position.set(0, 0, bz);
                    paddle.add(blade);
                });
                paddle.position.set(0.1, 0.28, 0);
                paddle.rotation.y = 0.35;
                kayakGroup.add(paddle);

                const kx = getEscultasRiverX(cfg.z) + cfg.laneOffset;
                const tangentYaw = -Math.PI * 0.5 + getEscultasRiverTangentAngle(cfg.z);
                kayakGroup.position.set(kx, 0.20, cfg.z);
                kayakGroup.rotation.y = tangentYaw;
                group.add(kayakGroup);
                unitLakeState.animatedProps.push({ mesh: kayakGroup, baseY: 0.20, phase: cfg.phase });
            });

            // Rocas de rápidos emergiendo en el cauce del río que los kayaks sortean
            const rapidRockMat = new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.82 });
            [
                { z: -15.5, offset: 1.8 },
                { z: -6.2, offset: -1.9 },
                { z: 4.2, offset: 1.7 },
                { z: 12.8, offset: -2.1 }
            ].forEach((rk, idx) => {
                const rRock = new THREE.Mesh(new THREE.IcosahedronGeometry(1.05, 2), rapidRockMat);
                rRock.scale.set(1.3, 0.62, 1.1);
                rRock.position.set(getEscultasRiverX(rk.z) + rk.offset, 0.12, rk.z);
                rRock.rotation.y = idx * 1.2;
                group.add(rRock);
            });

            // Estandartes verticales Ninja (Nobori) en las riberas del cañón y la terraza del Dojo
            const bannerMat = new THREE.MeshStandardMaterial({
                color: 0xDC2626,
                emissive: 0x991B1B,
                emissiveIntensity: 0.22,
                side: THREE.DoubleSide
            });
            [
                [-11.5, -13.5],
                [-11.5, -2.5],
                [getEscultasRiverX(-12.0) + 9.2, -12.0],
                [getEscultasRiverX(8.0) + 9.2, 8.0]
            ].forEach(([bx, bz]) => {
                const nobori = new THREE.Group();
                const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.06, 4.2, 10), darkWoodMat);
                pole.position.y = 2.1;
                nobori.add(pole);
                const cloth = new THREE.Mesh(new THREE.PlaneGeometry(0.85, 2.6), bannerMat);
                cloth.position.set(0.46, 2.65, 0);
                nobori.add(cloth);
                nobori.position.set(bx, getTerrainHeight(bx, bz), bz);
                group.add(nobori);
            });
        } else if (unitId === 'clan') {
            // =================================================================
            // MUNDO CLAN: SHANGRI-LA / VALLE ALPINO IDÍLICO EN HORA DORADA SOBRE LAS NUBES
            // (Mar de nubes esponjosas 3D, cumbre del Ama Dablam con Alpenglow cálido,
            //  praderas floridas, hoguera Rover, Horquilla Rover y Canoa en aguas cristalinas)
            // =================================================================
            // 1. MAR DE NUBES 3D (360° POR DEBAJO DEL BORDE DE LA LAGUNA AZUL)
            const cloudRingCounts = [18, 22];
            cloudRingCounts.forEach((count, ringIdx) => {
                const baseRad = ringIdx === 0 ? 34.0 : 56.0;
                const baseY = ringIdx === 0 ? -5.8 : -9.2;
                for (let c = 0; c < count; c++) {
                    const ang = (c / count) * Math.PI * 2 + ringIdx * 0.25;
                    const rad = baseRad + Math.sin(c * 2.3) * 4.5;
                    const cx = Math.cos(ang) * rad;
                    const cz = Math.sin(ang) * rad;
                    const cScale = (ringIdx === 0 ? 1.85 : 2.65) + (c % 3) * 0.35;
                    const cloud = createFluffyCloudCluster(THREE, cScale, c * 1.7 + ringIdx * 7);
                    cloud.position.set(cx, baseY + Math.cos(c * 1.9) * 1.2, cz);
                    cloud.rotation.y = ang + Math.PI * 0.5;
                    group.add(cloud);
                }
            });

            // 2. MANANTIAL SAGRADO DE LA LAGUNA AZUL (SUR, Z = +21.5): NACIMIENTO DEL RÍO QUE BAJA HASTA CASTORES
            const springGroup = new THREE.Group();
            const springStoneMat = new THREE.MeshStandardMaterial({
                color: 0xD6CFC2,
                roughness: 0.65,
                metalness: 0.06
            });
            for (let s = -4; s <= 4; s++) {
                if (Math.abs(s) <= 1) continue; // canal central de salida del agua
                const boulder = new THREE.Mesh(new THREE.IcosahedronGeometry(0.95 + (Math.abs(s) % 2) * 0.35, 3), springStoneMat);
                boulder.scale.set(1.3, 0.75, 1.15);
                boulder.position.set(s * 1.45, 0.35, 21.8 + Math.abs(s) * 0.25);
                springGroup.add(boulder);
            }
            const springGlow = createGlowSprite(THREE, 0xFBBF24, 8.5, 0.68);
            springGlow.position.set(0, 0.8, 22.0);
            springGroup.add(springGlow);
            group.add(springGroup);

            // 3. LA GRAN CUMBRE ESCULPIDA DEL AMA DABLAM (6.812M) BAÑADA EN LUZ DORADA DE ATARDECER (ALPENGLOW)
            const amaGroup = new THREE.Group();
            const peakGeo = new THREE.ConeGeometry(15.5, 38, 64, 28);
            const pPos = peakGeo.attributes.position;
            for (let i = 0; i < pPos.count; i++) {
                const vx = pPos.getX(i);
                const vy = pPos.getY(i);
                const vz = pPos.getZ(i);
                const ridgeN = ridgedFbm2D(vx * 0.11 + 2.4, vz * 0.11 + vy * 0.06, 4);
                const factor = 0.78 + ridgeN * 0.42;
                pPos.setX(i, vx * factor);
                pPos.setZ(i, vz * factor);
            }
            peakGeo.computeVertexNormals();

            const mainPeak = new THREE.Mesh(
                peakGeo,
                new THREE.MeshStandardMaterial({
                    color: 0xFFF5E6,
                    emissive: 0xD97706,
                    emissiveIntensity: 0.12,
                    roughness: 0.44,
                    metalness: 0.12
                })
            );
            mainPeak.position.set(0, 17.5, -39);
            amaGroup.add(mainPeak);

            const glacierGeo = deformGeometrySmooth(new THREE.SphereGeometry(4.4, 32, 24), 0.16, 0.9, 9.2);
            const hangingGlacier = new THREE.Mesh(
                glacierGeo,
                new THREE.MeshStandardMaterial({
                    color: 0xFEF3C7,
                    emissive: 0xF59E0B,
                    emissiveIntensity: 0.16,
                    roughness: 0.32,
                    metalness: 0.14
                })
            );
            hangingGlacier.scale.set(1.25, 0.78, 0.85);
            hangingGlacier.position.set(3.2, 20.0, -31.0);
            amaGroup.add(hangingGlacier);
            group.add(amaGroup);

            // 4. LA HORQUILLA ROVER ORGÁNICA ESCULPIDA CON CURVAS SUAVES (TUBEGEOMETRY)
            const horquillaGroup = new THREE.Group();
            const staffMat = new THREE.MeshStandardMaterial({
                color: 0x991B1B,
                emissive: 0xDC2626,
                emissiveIntensity: 0.32,
                roughness: 0.42,
                metalness: 0.15
            });

            const mainCurve = new THREE.CatmullRomCurve3([
                new THREE.Vector3(0, 0, 0),
                new THREE.Vector3(0.08, 3.2, 0),
                new THREE.Vector3(-0.05, 6.8, 0)
            ]);
            horquillaGroup.add(new THREE.Mesh(new THREE.TubeGeometry(mainCurve, 28, 0.22, 18, false), staffMat));

            const leftBranch = new THREE.CatmullRomCurve3([
                new THREE.Vector3(-0.05, 6.6, 0),
                new THREE.Vector3(-0.85, 8.1, 0),
                new THREE.Vector3(-1.15, 9.8, 0)
            ]);
            horquillaGroup.add(new THREE.Mesh(new THREE.TubeGeometry(leftBranch, 20, 0.16, 16, false), staffMat));

            const rightBranch = new THREE.CatmullRomCurve3([
                new THREE.Vector3(-0.05, 6.6, 0),
                new THREE.Vector3(0.78, 8.1, 0),
                new THREE.Vector3(1.10, 9.8, 0)
            ]);
            horquillaGroup.add(new THREE.Mesh(new THREE.TubeGeometry(rightBranch, 20, 0.16, 16, false), staffMat));

            const roverGlow = createGlowSprite(THREE, 0xFBBF24, 7.5, 0.68);
            roverGlow.position.set(0, 8.4, 0);
            horquillaGroup.add(roverGlow);

            horquillaGroup.position.set(-13.5, getTerrainHeight(-13.5, -22.8), -22.8);
            group.add(horquillaGroup);

            // Hoguera Rover cálida junto al embarcadero de la canoa y la Horquilla Rover
            const roverCampfire = createCampfireWithGlow(THREE, 1.2);
            roverCampfire.position.set(-8.2, getTerrainHeight(-8.2, -22.2), -22.2);
            group.add(roverCampfire);

            // 5. CANOA ROVER ESCULPIDA EN MADERA («REMA TU PROPIA CANOA») EN LA LAGUNA AZUL SERENA
            const canoeGroup = new THREE.Group();
            const hullCurve = new THREE.CatmullRomCurve3([
                new THREE.Vector3(-2.6, 0.38, 0),
                new THREE.Vector3(-1.5, 0.0, 0),
                new THREE.Vector3(0, -0.05, 0),
                new THREE.Vector3(1.5, 0.0, 0),
                new THREE.Vector3(2.6, 0.38, 0)
            ]);
            const hullGeo = new THREE.TubeGeometry(hullCurve, 32, 0.58, 20, false);
            const hullMesh = new THREE.Mesh(
                hullGeo,
                new THREE.MeshStandardMaterial({ color: 0x991B1B, roughness: 0.45, metalness: 0.1 })
            );
            hullMesh.scale.set(1.0, 0.52, 0.82);
            canoeGroup.add(hullMesh);

            const seatMat = new THREE.MeshStandardMaterial({ color: 0xD97706, roughness: 0.6 });
            [-0.9, 0, 0.9].forEach(sx => {
                const seat = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.06, 0.78), seatMat);
                seat.position.set(sx, 0.16, 0);
                canoeGroup.add(seat);
            });

            canoeGroup.position.set(8.2, 0.16, -20.2);
            canoeGroup.rotation.y = 0.42;
            group.add(canoeGroup);
            unitLakeState.animatedProps.push({ mesh: canoeGroup, baseY: 0.16, phase: 1.2 });

            // 6. ARBUSTOS FLORIDOS ALPINOS ALREDEDOR DE LA PRADERA DE LA LAGUNA AZUL (r entre 22.5 y 28.5)
            const flowerColors = [0xFDE047, 0xFBBF24, 0xFDA4AF, 0xFEF3C7];
            for (let b = 0; b < 24; b++) {
                const ang = (b / 24) * Math.PI * 2 + Math.sin(b * 1.7) * 0.08;
                const rad = 22.8 + (b % 4) * 1.45;
                const bx = Math.cos(ang) * rad;
                const bz = Math.sin(ang) * rad;
                if (bz > 17.5) continue; // dejar despejado el manantial sur
                const by = getTerrainHeight(bx, bz);
                const bush = createBotanicalBush(THREE, 0.82 + (b % 3) * 0.22, b * 1.9);
                const blossomMat = new THREE.MeshStandardMaterial({
                    color: flowerColors[b % flowerColors.length],
                    emissive: flowerColors[b % flowerColors.length],
                    emissiveIntensity: 0.22,
                    roughness: 0.5
                });
                for (let f = 0; f < 3; f++) {
                    const blossom = new THREE.Mesh(new THREE.SphereGeometry(0.14, 10, 8), blossomMat);
                    blossom.position.set((f - 1) * 0.36, 0.62 + (f % 2) * 0.12, (f % 2 === 0 ? 0.24 : -0.22));
                    bush.add(blossom);
                }
                bush.position.set(bx, by - 0.05, bz);
                bush.rotation.y = b * 1.3;
                group.add(bush);
            }
        }
    }

    function createSkyDomeShaderMesh(THREE, biome) {
        const skyGeo = new THREE.SphereGeometry(250, 64, 32);
        const skyUniforms = {
            uSkyTop: { value: new THREE.Color(biome.skyTop) },
            uSkyHorizon: { value: new THREE.Color(biome.skyHorizon) },
            uSunColor: { value: new THREE.Color(biome.sunColor) },
            uSunDir: { value: new THREE.Vector3(biome.sunPos[0], biome.sunPos[1], biome.sunPos[2]).normalize() },
            uTime: { value: 0 }
        };
        const skyMat = new THREE.ShaderMaterial({
            side: THREE.BackSide,
            depthWrite: false,
            uniforms: skyUniforms,
            vertexShader: `
                varying vec3 vWorldPos;
                void main() {
                    vec4 wp = modelMatrix * vec4(position, 1.0);
                    vWorldPos = position;
                    gl_Position = projectionMatrix * viewMatrix * wp;
                }
            `,
            fragmentShader: `
                uniform vec3 uSkyTop;
                uniform vec3 uSkyHorizon;
                uniform vec3 uSunColor;
                uniform vec3 uSunDir;
                uniform float uTime;
                varying vec3 vWorldPos;

                float hash2(vec2 p) {
                    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
                }
                float noise2(vec2 p) {
                    vec2 i = floor(p);
                    vec2 f = fract(p);
                    f = f * f * (3.0 - 2.0 * f);
                    return mix(
                        mix(hash2(i), hash2(i + vec2(1.0, 0.0)), f.x),
                        mix(hash2(i + vec2(0.0, 1.0)), hash2(i + vec2(1.0, 1.0)), f.x),
                        f.y
                    );
                }
                float fbmCloud(vec2 p) {
                    float v = 0.0;
                    float a = 0.5;
                    for (int i = 0; i < 4; i++) {
                        v += a * noise2(p);
                        p = p * 2.03 + vec2(1.7, -1.2);
                        a *= 0.5;
                    }
                    return v;
                }

                void main() {
                    vec3 dir = normalize(vWorldPos);
                    float h = clamp(dir.y, 0.0, 1.0);

                    // Cielo atmosférico con degradado orgánico
                    vec3 col = mix(uSkyHorizon, uSkyTop, pow(h, 0.48));

                    // Nubes atmosféricas suaves integradas con la paleta del cosmos
                    if (dir.y > 0.04) {
                        vec2 cloudUv = dir.xz / (dir.y + 0.28) * 1.65 + vec2(uTime * 0.012, -uTime * 0.008);
                        float cNoise = fbmCloud(cloudUv);
                        float cloudMask = smoothstep(0.52, 0.78, cNoise) * smoothstep(0.04, 0.24, dir.y) * smoothstep(0.92, 0.45, dir.y);
                        vec3 cloudCol = mix(uSkyHorizon * 1.15, uSkyHorizon * 1.32 + uSunColor * 0.12, smoothstep(0.55, 0.82, cNoise));
                        col = mix(col, cloudCol, cloudMask * 0.28);
                    }

                    // Bruma cálida suave en el horizonte
                    float horizonGlow = exp(-abs(dir.y) * 6.5);
                    col = mix(col, uSkyHorizon * 1.04 + uSunColor * 0.10, horizonGlow * 0.35);

                    // Halo solar atmosférico contenido
                    float sunAmt = max(dot(dir, uSunDir), 0.0);
                    col += uSunColor * pow(sunAmt, 8.0) * 0.24;
                    col += uSunColor * smoothstep(0.993, 0.9992, sunAmt) * 0.55;

                    gl_FragColor = vec4(col, 1.0);
                }
            `
        });
        return { mesh: new THREE.Mesh(skyGeo, skyMat), uniforms: skyUniforms };
    }

    function createSmoothWaterShaderMesh(THREE, biome) {
        const waterGeo = new THREE.CircleGeometry(26.8, 128);
        waterGeo.rotateX(-Math.PI / 2);

        const waterUniforms = {
            uTime: { value: 0 },
            uWaterShallow: { value: new THREE.Color(biome.waterColor) },
            uWaterDeep: { value: new THREE.Color(biome.waterEmissive) },
            uSkyHorizon: { value: new THREE.Color(biome.skyHorizon) },
            uSunColor: { value: new THREE.Color(biome.sunColor) },
            uSunDir: { value: new THREE.Vector3(biome.sunPos[0], biome.sunPos[1], biome.sunPos[2]).normalize() }
        };

        const waterMat = new THREE.ShaderMaterial({
            transparent: true,
            depthWrite: false,
            uniforms: waterUniforms,
            vertexShader: `
                uniform float uTime;
                varying vec3 vWorldPos;
                varying vec3 vGlobalPos;
                varying float vDist;

                void main() {
                    vec3 pos = position;
                    float r = length(pos.xz);
                    vDist = r;
                    // Corriente continua fluida Norte (-Z) a Sur (+Z) con micro-modulaciones
                    float directionalFlow = sin(pos.z * 0.85 - uTime * 3.4 + sin(pos.x * 0.55) * 0.7) * 0.055;
                    float crossSwell = cos(pos.x * 0.75 + pos.z * 0.45 - uTime * 2.2) * 0.035;
                    float radialWave = sin(r * 0.70 - uTime * 2.6) * 0.035;
                    pos.y += (directionalFlow + crossSwell + radialWave) * smoothstep(26.4, 9.0, r);
                    vec4 wp = modelMatrix * vec4(pos, 1.0);
                    vWorldPos = pos;
                    vGlobalPos = wp.xyz;
                    gl_Position = projectionMatrix * viewMatrix * wp;
                }
            `,
            fragmentShader: `
                uniform float uTime;
                uniform vec3 uWaterShallow;
                uniform vec3 uWaterDeep;
                uniform vec3 uSkyHorizon;
                uniform vec3 uSunColor;
                uniform vec3 uSunDir;
                varying vec3 vWorldPos;
                varying vec3 vGlobalPos;
                varying float vDist;

                // Cáusticas subacuáticas dinámicas y cristalinas
                float caustics(vec2 p, float t) {
                    vec2 p1 = p * 1.55 + vec2(t * 0.42, t * 0.32);
                    vec2 p2 = p * 2.10 - vec2(t * 0.35, -t * 0.45);
                    float c1 = sin(p1.x + sin(p1.y * 1.45)) * 0.5 + 0.5;
                    float c2 = cos(p2.y + cos(p2.x * 1.45)) * 0.5 + 0.5;
                    return pow(c1 * c2, 1.5) * 2.4;
                }

                float waveHarmonic(vec2 p, float t) {
                    float d = length(p);
                    // Flujo direccional de corriente viva Norte -> Sur
                    float f1 = sin(p.y * 1.25 - t * 4.0 + sin(p.x * 0.75) * 0.85) * 0.45;
                    float f2 = cos(p.x * 1.15 + (p.y - t * 2.6) * 0.95) * 0.28;
                    float f3 = sin(d * 1.10 - t * 2.5) * 0.22;
                    float f4 = sin(p.x * 2.6 + p.y * 1.8 - t * 4.8) * 0.10;
                    return f1 + f2 + f3 + f4;
                }

                void main() {
                    vec2 p = vWorldPos.xz;
                    float eps = 0.09;
                    float hC = waveHarmonic(p, uTime);
                    float hX = waveHarmonic(p + vec2(eps, 0.0), uTime);
                    float hZ = waveHarmonic(p + vec2(0.0, eps), uTime);
                    vec3 normal = normalize(vec3(hC - hX, eps * 2.2, hC - hZ));

                    vec3 viewDir = normalize(cameraPosition - vGlobalPos);
                    
                    // Modelo Fresnel físico (F0 = 0.02 para agua pura cristalina)
                    float nDotV = clamp(dot(viewDir, normal), 0.0, 1.0);
                    float fresnel = 0.02 + 0.98 * pow(1.0 - nDotV, 4.5);

                    // Gradiente de profundidad natural
                    float depthFactor = smoothstep(23.5, 4.0, vDist);
                    vec3 baseWater = mix(uWaterShallow, uWaterDeep, depthFactor * 0.72);

                    // Red de cáusticas contenidas bajo el agua
                    float caust = caustics(p, uTime);
                    float caustMask = (1.0 - depthFactor * 0.65) * (0.35 + 0.65 * nDotV);
                    baseWater += caust * caustMask * vec3(0.70, 0.86, 0.92) * 0.16;

                    // Corriente central que une entrada norte y salida sur
                    float centerChannel = 1.0 - smoothstep(3.0, 13.5, abs(p.x));
                    float currentStreaks = smoothstep(0.62, 0.92, sin(p.x * 1.9 + sin(p.y * 0.7 - uTime * 4.4) * 1.5)) * centerChannel;
                    baseWater = mix(baseWater, vec3(0.68, 0.84, 0.90), currentStreaks * 0.18);

                    // Reflejo contenido del cielo según ángulo rasante (fresnel)
                    vec3 waterWithSky = mix(baseWater, uSkyHorizon, clamp(fresnel * 0.55, 0.0, 0.68));

                    // Destellos solares puntuales tipo diamante en crestas de micro-olas
                    vec3 halfVec = normalize(uSunDir + viewDir);
                    float nDotH = max(dot(normal, halfVec), 0.0);
                    float diamondGlint = pow(nDotH, 220.0) * 1.8;
                    float crestSparkle = pow(nDotH, 54.0) * 0.16;
                    vec3 col = waterWithSky + uSunColor * (diamondGlint + crestSparkle);

                    // Espuma orgánica contenida en la desembocadura y en la orilla
                    float inletDist = length(p - vec2(0.0, -20.5));
                    float outletDist = length(p - vec2(0.0, 20.5));
                    float mouthRipple = sin(inletDist * 2.8 - uTime * 5.5) * 0.5 + 0.5;
                    float mouthFoam = (smoothstep(7.2, 1.2, inletDist) + smoothstep(7.2, 1.2, outletDist)) * (0.42 + 0.58 * mouthRipple);

                    float shoreWave = sin(vDist * 2.8 - uTime * 3.2) * 0.5 + 0.5;
                    float shoreFoam = smoothstep(21.0, 23.6, vDist) * (0.36 + 0.64 * shoreWave);
                    vec3 foamWhite = vec3(0.82, 0.90, 0.94);
                    col = mix(col, foamWhite, clamp(shoreFoam * 0.42 + mouthFoam * 0.52, 0.0, 0.68));

                    // Transparencia cristalina en orillas
                    float edgeAlpha = smoothstep(26.8, 22.2, vDist) * 0.88 + 0.08;
                    gl_FragColor = vec4(col, edgeAlpha);
                }
            `
        });

        const mesh = new THREE.Mesh(waterGeo, waterMat);
        mesh.position.y = 0.05;
        return { mesh, uniforms: waterUniforms };
    }

    function ensureUnitLakeThreeScene() {
        const THREE = window.THREE;
        const lakeCanvas = document.getElementById('uzLakeOrbitCanvas');
        if (!THREE || !lakeCanvas) return false;
        if (unitLakeState.renderer) return true;

        const renderer = new THREE.WebGLRenderer({
            canvas: lakeCanvas,
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance'
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer.setSize(window.innerWidth, window.innerHeight);
        if (THREE.sRGBEncoding !== undefined) {
            renderer.outputEncoding = THREE.sRGBEncoding;
        }
        if (THREE.ACESFilmicToneMapping !== undefined) {
            renderer.toneMapping = THREE.ACESFilmicToneMapping;
            renderer.toneMappingExposure = 0.88;
        }

        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x0D1B24, 0.0032);

        const camera3D = new THREE.PerspectiveCamera(46, window.innerWidth / window.innerHeight, 0.5, 380);
        camera3D.position.set(0, 11.5, 42);

        const hemiLight = new THREE.HemisphereLight(0x9BB8CD, 0x1A2418, 0.65);
        scene.add(hemiLight);

        const sunLight = new THREE.DirectionalLight(0xFFE0B2, 1.05);
        sunLight.position.set(45, 75, -35);
        scene.add(sunLight);

        const fillLight = new THREE.DirectionalLight(0x6488A4, 0.38);
        fillLight.position.set(-45, 42, 45);
        scene.add(fillLight);

        const shoreLight = new THREE.PointLight(0xF59E0B, 1.1, 65);
        shoreLight.position.set(0, 8.0, -22);
        scene.add(shoreLight);

        const worldGroup = new THREE.Group();
        scene.add(worldGroup);

        unitLakeState.renderer = renderer;
        unitLakeState.scene = scene;
        unitLakeState.camera = camera3D;
        unitLakeState.hemiLight = hemiLight;
        unitLakeState.sunLight = sunLight;
        unitLakeState.fillLight = fillLight;
        unitLakeState.shoreLight = shoreLight;
        unitLakeState.worldGroup = worldGroup;

        window.addEventListener('resize', () => {
            if (!unitLakeState.renderer || !unitLakeState.camera) return;
            unitLakeState.camera.aspect = window.innerWidth / window.innerHeight;
            unitLakeState.camera.updateProjectionMatrix();
            unitLakeState.renderer.setSize(window.innerWidth, window.innerHeight);
        });

        return true;
    }

    // Curva serpenteante del río que conecta dos Unidades consecutivas a través del bosque y la montaña
    function getCorridorRiverCenterX(corridorIdx, globalZ) {
        const zStart = -corridorIdx * UNIT_ZONE_SPACING - 21.5;
        const zEnd = -(corridorIdx + 1) * UNIT_ZONE_SPACING + 21.5;
        const s = clamp((globalZ - zStart) / (zEnd - zStart), 0, 1);
        const env = Math.sin(s * Math.PI);
        const amp = corridorIdx === 3 ? 4.5 : (corridorIdx === 2 ? 7.5 : 10.5);
        return env * (Math.sin(s * Math.PI * 2.0 + corridorIdx * 1.15) * amp + Math.cos(s * Math.PI * 3.0) * 3.2);
    }

    // Altura Y continua del río/montaña entre la Unidad `corridorIdx` y la `corridorIdx + 1`
    function getCorridorRiverElevationY(corridorIdx, globalZ) {
        const zStart = -corridorIdx * UNIT_ZONE_SPACING - 21.0;
        const zEnd = -(corridorIdx + 1) * UNIT_ZONE_SPACING + 21.0;
        const yStart = UNIT_ZONE_ELEVATIONS[corridorIdx] || 0;
        const yEnd = UNIT_ZONE_ELEVATIONS[corridorIdx + 1] || 0;
        const s = clamp((globalZ - zStart) / (zEnd - zStart), 0, 1);
        if (corridorIdx === 3) {
            // Pared de escalada escarpada hacia la Laguna Azul del Clan por encima de las nubes
            return lerp(yStart, yEnd, Math.pow(smoothstep(0, 1, s), 0.92));
        }
        return lerp(yStart, yEnd, smoothstep(0, 1, s));
    }

    // Construye el tramo de río, montaña arbolada con Torii Ninja (corridorIdx=2) o escalada a las nubes (corridorIdx=3)
    function buildRiverForestCorridor(THREE, parentGroup, corridorIdx) {
        const zStart = -corridorIdx * UNIT_ZONE_SPACING - 21.0;
        const zEnd = -(corridorIdx + 1) * UNIT_ZONE_SPACING + 21.0;
        const yStart = UNIT_ZONE_ELEVATIONS[corridorIdx] || 0;
        const yEnd = UNIT_ZONE_ELEVATIONS[corridorIdx + 1] || 0;
        const corridorLen = Math.abs(zEnd - zStart); // ~123m
        const zMid = (zStart + zEnd) * 0.5;
        const yMid = getCorridorRiverElevationY(corridorIdx, zMid);

        const unitFrom = UNITS_DATA[corridorIdx] || UNITS_DATA[0];
        const unitTo = UNITS_DATA[corridorIdx + 1] || UNITS_DATA[1];
        const biomeFrom = UNIT_LAKE_BIOMES[unitFrom.id] || UNIT_LAKE_BIOMES.castores;
        const biomeTo = UNIT_LAKE_BIOMES[unitTo.id] || UNIT_LAKE_BIOMES.manada;

        const corridorGroup = new THREE.Group();

        // 0. Si el tramo sube en altura (Tropa -> Escultas por la montaña, o Escultas -> Clan escalando), construir ladera/pared 3D continua
        if (Math.abs(yEnd - yStart) > 1.0) {
            const slopeGeo = new THREE.PlaneGeometry(110, corridorLen + 14.0, 68, 104);
            slopeGeo.rotateX(-Math.PI / 2);
            const sPos = slopeGeo.attributes.position;
            const sCols = new Float32Array(sPos.count * 3);

            for (let i = 0; i < sPos.count; i++) {
                const lx = sPos.getX(i);
                const lz = sPos.getZ(i);
                const gz = zMid + lz;
                const cx = getCorridorRiverCenterX(corridorIdx, gz);
                const baseRy = getCorridorRiverElevationY(corridorIdx, gz);
                const dRiver = Math.abs(lx - cx);

                // Cauce excavado profundo bajo el río/cascada y laderas de montaña/roca a los lados
                const channelCarve = (1.0 - smoothstep(4.8, 9.2, dRiver)) * 1.55;
                const sideWall = smoothstep(7.5, 44.0, dRiver) * (corridorIdx === 3 ? 16.5 : 9.5) *
                    (0.55 + 0.45 * fbm2D(lx * 0.06, gz * 0.06, 3));
                const cragNoise = ridgedFbm2D(lx * 0.11 + corridorIdx, gz * 0.11, 3) * (corridorIdx === 3 ? 2.2 : 0.9) * smoothstep(6.2, 16.0, dRiver);

                sPos.setX(i, lx);
                sPos.setZ(i, gz);
                sPos.setY(i, baseRy - channelCarve + sideWall + cragNoise - 0.32);

                const isRock = corridorIdx === 3 || dRiver > 18.0;
                sCols[i * 3] = isRock ? 0.36 : 0.14;
                sCols[i * 3 + 1] = isRock ? 0.40 : 0.31;
                sCols[i * 3 + 2] = isRock ? 0.44 : 0.16;
            }
            slopeGeo.setAttribute('color', new THREE.BufferAttribute(sCols, 3));
            slopeGeo.computeVertexNormals();

            const slopeMat = new THREE.MeshStandardMaterial({
                vertexColors: true,
                roughness: 0.86,
                metalness: 0.02,
                flatShading: false
            });
            corridorGroup.add(new THREE.Mesh(slopeGeo, slopeMat));
        }

        // 1. Cinta de agua cristalina con flujo rápido y espuma viva (baja desde la Laguna Azul del Clan hasta el Estanque de Castores)
        const rSegsX = 32;
        const rSegsZ = 160;
        const riverGeo = new THREE.PlaneGeometry(13.2, corridorLen + 10.0, rSegsX, rSegsZ);
        riverGeo.rotateX(-Math.PI / 2);
        const rPos = riverGeo.attributes.position;
        for (let i = 0; i < rPos.count; i++) {
            const lx = rPos.getX(i);
            const lz = rPos.getZ(i);
            const gz = zMid + lz;
            const cx = getCorridorRiverCenterX(corridorIdx, gz);
            const ry = getCorridorRiverElevationY(corridorIdx, gz);
            const s = clamp((gz - zStart) / (zEnd - zStart), 0, 1);
            const widthScale = (corridorIdx === 3 ? 0.85 : 1.0) + Math.sin(s * Math.PI * 3.0) * 0.15;
            rPos.setX(i, cx + lx * widthScale);
            rPos.setZ(i, gz);
            rPos.setY(i, ry + 0.24);
        }
        riverGeo.computeVertexNormals();

        const flowSpeedVal = corridorIdx === 3 ? 9.6 : (corridorIdx === 2 ? 7.4 : 5.5);
        const cascadeFoamBoost = corridorIdx === 3 ? 0.52 : (corridorIdx === 2 ? 0.28 : 0.12);

        const riverUniforms = {
            uTime: { value: 0 },
            uFlowSpeed: { value: flowSpeedVal },
            uCascadeBoost: { value: cascadeFoamBoost },
            uWaterShallowA: { value: new THREE.Color(biomeFrom.waterColor || 0x1F5E6B) },
            uWaterShallowB: { value: new THREE.Color(biomeTo.waterColor || 0x194D59) },
            uWaterDeep: { value: new THREE.Color(0x082233) },
            uSkyHorizon: { value: new THREE.Color(0x2B4C65) },
            uSunColor: { value: new THREE.Color(0xFFE4B5) },
            uSunDir: { value: new THREE.Vector3(45, 75, -35).normalize() },
            uZStart: { value: zStart },
            uZEnd: { value: zEnd }
        };
        unitLakeState.waterUniformsList.push(riverUniforms);

        const riverMat = new THREE.ShaderMaterial({
            transparent: true,
            depthWrite: false,
            uniforms: riverUniforms,
            vertexShader: `
                uniform float uTime;
                uniform float uFlowSpeed;
                varying vec3 vGlobalPos;
                varying vec2 vUv;
                varying vec3 vNormal;
                void main() {
                    vUv = uv;
                    vec3 pos = position;
                    // Olas que descienden activamente hacia +Z (de Clan hacia Castores)
                    float flowWave = sin(pos.z * 0.75 - uTime * uFlowSpeed) * 0.075
                                   + cos(pos.x * 0.95 + pos.z * 0.45 - uTime * (uFlowSpeed * 0.8)) * 0.045;
                    pos.y += flowWave;
                    vec4 wp = modelMatrix * vec4(pos, 1.0);
                    vGlobalPos = wp.xyz;
                    vNormal = normalize(mat3(modelMatrix) * normal);
                    gl_Position = projectionMatrix * viewMatrix * wp;
                }
            `,
            fragmentShader: `
                uniform float uTime;
                uniform float uFlowSpeed;
                uniform float uCascadeBoost;
                uniform vec3 uWaterShallowA;
                uniform vec3 uWaterShallowB;
                uniform vec3 uWaterDeep;
                uniform vec3 uSkyHorizon;
                uniform vec3 uSunColor;
                uniform vec3 uSunDir;
                uniform float uZStart;
                uniform float uZEnd;
                varying vec3 vGlobalPos;
                varying vec2 vUv;
                varying vec3 vNormal;

                float riverCaustics(vec2 p, float t, float speed) {
                    vec2 p1 = p * 1.8 + vec2(sin(p.y * 0.5), -t * speed * 0.6);
                    vec2 p2 = p * 2.4 + vec2(cos(p.x * 0.5), -t * speed * 0.8);
                    float c1 = sin(p1.x + sin(p1.y * 1.6)) * 0.5 + 0.5;
                    float c2 = cos(p2.y + cos(p2.x * 1.6)) * 0.5 + 0.5;
                    return pow(c1 * c2, 1.5) * 2.2;
                }

                void main() {
                    float s = clamp((vGlobalPos.z - uZStart) / (uZEnd - uZStart), 0.0, 1.0);
                    float edgeDist = abs(vUv.x - 0.5) * 2.0;

                    // El agua fluye con fuerza hacia +Z con chevrones en V que apuntan aguas abajo
                    float chevronLag = edgeDist * 2.5;
                    float fZ1 = vGlobalPos.z * 1.65 - uTime * uFlowSpeed - chevronLag;
                    float fZ2 = vGlobalPos.z * 2.85 - uTime * (uFlowSpeed * 1.25) + sin(vUv.x * 10.0) * 0.85;

                    float wave1 = sin(fZ1 + sin(vUv.x * 14.0) * 0.8) * 0.5 + 0.5;
                    float wave2 = cos(fZ2 - cos(vUv.x * 18.0) * 0.7) * 0.5 + 0.5;
                    float ripples = wave1 * 0.58 + wave2 * 0.42;

                    vec3 norm = normalize(vNormal + vec3((wave1 - 0.5) * 0.20, 0.88, (wave2 - 0.5) * 0.25));
                    vec3 viewDir = normalize(cameraPosition - vGlobalPos);
                    float nDotV = clamp(dot(viewDir, norm), 0.0, 1.0);
                    float fresnel = 0.02 + 0.98 * pow(1.0 - nDotV, 4.5);

                    vec3 shallowCol = mix(uWaterShallowA, uWaterShallowB, s);
                    vec3 baseCol = mix(uWaterDeep, shallowCol, 0.46 + 0.54 * (1.0 - edgeDist));

                    // Cáusticas subacuáticas contenidas
                    float caust = riverCaustics(vec2(vUv.x * 8.0, vGlobalPos.z * 0.25), uTime, uFlowSpeed);
                    baseCol += caust * (1.0 - edgeDist * 0.45) * (0.35 + 0.65 * nDotV) * vec3(0.70, 0.86, 0.92) * 0.16;

                    // Reflejo contenido de cielo
                    vec3 waterWithSky = mix(baseCol, uSkyHorizon, clamp(fresnel * 0.55, 0.0, 0.68));

                    // Destello solar tipo diamante en crestas de rápidos
                    vec3 halfVec = normalize(uSunDir + viewDir);
                    float nDotH = max(dot(norm, halfVec), 0.0);
                    float sunGlint = pow(nDotH, 190.0) * 1.6 + pow(nDotH, 50.0) * 0.15;

                    // Espuma orgánica contenida en crestas y riberas
                    float fastStreaks = smoothstep(0.58, 0.90, sin(vUv.x * 26.0 + sin(fZ1 * 0.5) * 2.2)) * (0.42 + 0.58 * wave1);
                    float chevronCrests = smoothstep(0.70 - uCascadeBoost * 0.36, 0.95, ripples);
                    float bankFoam = smoothstep(0.62, 0.92, edgeDist) * (0.45 + 0.55 * ripples);

                    float totalFoam = clamp(
                        bankFoam * 0.48 +
                        fastStreaks * (0.28 + uCascadeBoost * 0.32) +
                        chevronCrests * (0.25 + uCascadeBoost * 0.45),
                        0.0, 0.72
                    );

                    vec3 foamWhite = vec3(0.82, 0.90, 0.94);
                    vec3 col = mix(waterWithSky + uSunColor * sunGlint, foamWhite, totalFoam);
                    float alpha = smoothstep(1.0, 0.76, edgeDist) * 0.92;
                    gl_FragColor = vec4(col, alpha);
                }
            `
        });
        const riverMesh = new THREE.Mesh(riverGeo, riverMat);
        corridorGroup.add(riverMesh);

        // 1B. Partículas 3D de corriente de agua y espuma que viajan físicamente por el cauce/cascada cada fotograma
        const flowParticleCount = corridorIdx === 3 ? 220 : 150;
        const flowGeo = new THREE.BufferGeometry();
        const flowPos = new Float32Array(flowParticleCount * 3);
        const flowProg = new Float32Array(flowParticleCount);
        const flowLane = new Float32Array(flowParticleCount);
        for (let fp = 0; fp < flowParticleCount; fp++) {
            const p = (fp / flowParticleCount + Math.random() * 0.02) % 1.0;
            const lane = (Math.random() - 0.5) * (corridorIdx === 3 ? 7.2 : 8.8);
            flowProg[fp] = p;
            flowLane[fp] = lane;
            const gz = lerp(zStart - 3.0, zEnd + 3.0, p);
            const cx = getCorridorRiverCenterX(corridorIdx, gz);
            const ry = getCorridorRiverElevationY(corridorIdx, gz);
            flowPos[fp * 3] = cx + lane;
            flowPos[fp * 3 + 1] = ry + 0.42 + Math.random() * 0.35;
            flowPos[fp * 3 + 2] = gz;
        }
        flowGeo.setAttribute('position', new THREE.BufferAttribute(flowPos, 3));
        const flowMat = new THREE.PointsMaterial({
            color: 0xFFFFFF,
            map: getSoftGlowTexture(THREE),
            size: corridorIdx === 3 ? 1.35 : 0.95,
            transparent: true,
            opacity: corridorIdx === 3 ? 0.92 : 0.78,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });
        const flowPoints = new THREE.Points(flowGeo, flowMat);
        corridorGroup.add(flowPoints);
        if (!unitLakeState.waterFlowStreams) unitLakeState.waterFlowStreams = [];
        unitLakeState.waterFlowStreams.push({
            points: flowPoints,
            corridorIdx,
            zStart: zStart - 3.0,
            zEnd: zEnd + 3.0,
            flowProg,
            flowLane,
            speed: corridorIdx === 3 ? 0.24 : (corridorIdx === 2 ? 0.18 : 0.13)
        });

        // 2. HITO CENTRAL DEL CORREDOR SEGÚN EL TRAMO:
        const midX = getCorridorRiverCenterX(corridorIdx, zMid);
        const nextRiverX = getCorridorRiverCenterX(corridorIdx, zMid - 2.0);
        const riverTangentAngle = Math.atan2(nextRiverX - midX, -2.0);

        if (corridorIdx === 3) {
            // =================================================================
            // CORREDOR 3 (ESCULTAS → CLAN): VÍA DE ESCALADA EN PARED DE ROCA
            // JUNTO A LA GRAN CASCADA + ATRAVESANDO EL MAR DE NUBES 3D
            // =================================================================
            // A. Cuerdas fijas de escalada rojas y doradas + pitones y presas en la roca junto a la cascada
            const ropePtsLeft = [];
            const ropePtsRight = [];
            const pitonMat = new THREE.MeshStandardMaterial({ color: 0xFBBF24, roughness: 0.3, metalness: 0.8 });
            const ledgeRockMat = new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.84 });

            const climbSteps = 16;
            for (let c = 0; c <= climbSteps; c++) {
                const s = c / climbSteps;
                const gz = lerp(zStart - 4.0, zEnd + 4.0, s);
                const cx = getCorridorRiverCenterX(corridorIdx, gz);
                const cy = getCorridorRiverElevationY(corridorIdx, gz);

                const lx = cx - 5.4 + Math.sin(c * 1.3) * 0.55;
                const rx = cx + 5.4 + Math.cos(c * 1.1) * 0.55;
                ropePtsLeft.push(new THREE.Vector3(lx, cy + 1.15, gz));
                ropePtsRight.push(new THREE.Vector3(rx, cy + 1.15, gz));

                // Repisas de roca para escalar y mosquetones/pitones brillantes
                if (c > 0 && c < climbSteps) {
                    const ledge = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.55, 1.9), ledgeRockMat);
                    ledge.position.set(lx, cy + 0.15, gz);
                    ledge.rotation.y = (c % 3 - 1) * 0.2;
                    corridorGroup.add(ledge);

                    const piton = new THREE.Mesh(new THREE.TorusGeometry(0.24, 0.055, 10, 20), pitonMat);
                    piton.position.set(lx, cy + 1.25, gz);
                    corridorGroup.add(piton);
                }
            }

            const climbRopeCurveL = new THREE.CatmullRomCurve3(ropePtsLeft);
            const climbRopeCurveR = new THREE.CatmullRomCurve3(ropePtsRight);
            const redRopeMat = new THREE.MeshStandardMaterial({
                color: 0xEF4444,
                emissive: 0x991B1B,
                emissiveIntensity: 0.35,
                roughness: 0.55
            });
            const goldRopeMat = new THREE.MeshStandardMaterial({
                color: 0xFBBF24,
                emissive: 0xD97706,
                emissiveIntensity: 0.35,
                roughness: 0.55
            });
            corridorGroup.add(new THREE.Mesh(new THREE.TubeGeometry(climbRopeCurveL, 64, 0.085, 10, false), redRopeMat));
            corridorGroup.add(new THREE.Mesh(new THREE.TubeGeometry(climbRopeCurveR, 64, 0.085, 10, false), goldRopeMat));

            // B. El Mar de Nubes 3D (Y = +52m..+68m) que la cámara atraviesa al subir escalando hacia la Laguna Azul
            for (let cl = 0; cl < 28; cl++) {
                const s = 0.38 + (cl / 28) * 0.44;
                const gz = lerp(zStart, zEnd, s);
                const cx = getCorridorRiverCenterX(corridorIdx, gz);
                const cy = getCorridorRiverElevationY(corridorIdx, gz);
                const side = cl % 2 === 0 ? 1 : -1;
                const offset = (cl % 4 === 0) ? (side * 4.5) : (side * (9.5 + (cl % 5) * 5.2));
                const cloudScale = 1.65 + (cl % 4) * 0.45;
                const cloud = createFluffyCloudCluster(THREE, cloudScale, cl * 2.1);
                cloud.position.set(cx + offset, cy + 2.8 + (cl % 3) * 1.8, gz);
                corridorGroup.add(cloud);
            }
        } else if (corridorIdx < 2) {
            // CORREDORES 0 Y 1 (CASTORES → MANADA → TROPA): Puente Scout de Madera con farolillos
            const bridgeGroup = new THREE.Group();
            const woodDarkMat = new THREE.MeshStandardMaterial({ color: 0x4E342E, roughness: 0.82 });
            const woodPlankMat = new THREE.MeshStandardMaterial({ color: 0x6D4C41, roughness: 0.78 });
            const ropeMat = new THREE.MeshStandardMaterial({ color: 0xD97706, roughness: 0.74 });

            const plankCount = 18;
            for (let p = 0; p < plankCount; p++) {
                const u = (p / (plankCount - 1)) * 2 - 1;
                const archY = 0.35 + (1 - u * u) * 1.35;
                const plank = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.12, 3.2), woodPlankMat);
                plank.position.set(u * 5.4, archY, 0);
                plank.rotation.z = -u * 0.22;
                bridgeGroup.add(plank);
            }

            [-1.42, 1.42].forEach((sideZ) => {
                [-5.2, -2.6, 0, 2.6, 5.2].forEach((postX, idx) => {
                    const u = postX / 5.4;
                    const archY = 0.35 + (1 - u * u) * 1.35;
                    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.13, 1.45, 12), woodDarkMat);
                    post.position.set(postX, archY + 0.65, sideZ);
                    bridgeGroup.add(post);

                    if (idx === 1 || idx === 3) {
                        const lanternGlow = createGlowSprite(THREE, 0xFDE047, 2.8, 0.82);
                        lanternGlow.position.set(postX, archY + 1.42, sideZ);
                        bridgeGroup.add(lanternGlow);
                    }
                });

                const railCurve = new THREE.CatmullRomCurve3([
                    new THREE.Vector3(-5.2, 1.55, sideZ),
                    new THREE.Vector3(-2.6, 2.42, sideZ),
                    new THREE.Vector3(0.0, 2.82, sideZ),
                    new THREE.Vector3(2.6, 2.42, sideZ),
                    new THREE.Vector3(5.2, 1.55, sideZ)
                ]);
                const railMesh = new THREE.Mesh(new THREE.TubeGeometry(railCurve, 28, 0.065, 10, false), ropeMat);
                bridgeGroup.add(railMesh);
            });

            bridgeGroup.position.set(midX, yMid, zMid);
            bridgeGroup.rotation.y = -riverTangentAngle;
            corridorGroup.add(bridgeGroup);
        }

        // 3. Rocas de río/montaña, juncos y piedras a lo largo de ambas orillas
        const riverRockMat = new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.82, flatShading: false });
        const mossCapMat = new THREE.MeshStandardMaterial({ color: 0x15803D, roughness: 0.88, flatShading: false });

        for (let i = 0; i < 40; i++) {
            const s = (i + 0.5) / 40;
            if (corridorIdx < 2 && Math.abs(s - 0.5) < 0.07) continue;
            const gz = lerp(zStart - 3.0, zEnd + 3.0, s);
            const cx = getCorridorRiverCenterX(corridorIdx, gz);
            const ry = getCorridorRiverElevationY(corridorIdx, gz);
            const side = i % 2 === 0 ? 1 : -1;
            const bankOffset = 5.2 + (i % 4) * 1.15;
            const rx = cx + side * bankOffset;

            const rScale = (corridorIdx === 3 ? 0.85 : 0.55) + (i % 3) * 0.28;
            const rock = new THREE.Mesh(
                new THREE.IcosahedronGeometry(rScale, 3),
                (corridorIdx < 3 && i % 3 === 0) ? mossCapMat : riverRockMat
            );
            rock.scale.set(1.35, corridorIdx === 3 ? 0.95 : 0.62, 1.15);
            rock.position.set(rx, ry + 0.18, gz);
            rock.rotation.y = i * 1.1;
            corridorGroup.add(rock);

            if (corridorIdx < 3 && i % 2 === 0) {
                const reeds = createShoreReedsCluster(THREE, unitFrom.id, i * 0.65);
                reeds.position.set(cx + side * 4.8, ry + 0.02, gz + 0.8);
                corridorGroup.add(reeds);
                unitLakeState.reedClusters.push({ mesh: reeds, phase: i * 0.65 });
            }
        }

        // 4. Bosque denso estilizado (tipo Firewatch / Pixar) flanqueando el río y subiendo por la montaña
        const corridorTreeCount = corridorIdx === 3 ? 28 : 64;
        for (let t = 0; t < corridorTreeCount; t++) {
            const s = (t + 0.5) / corridorTreeCount;
            if (corridorIdx === 3 && s > 0.62) continue; // por encima de las nubes desaparece el bosque
            const gz = lerp(zStart - 2.0, zEnd + 2.0, s);
            const cx = getCorridorRiverCenterX(corridorIdx, gz);
            const ry = getCorridorRiverElevationY(corridorIdx, gz);
            const side = t % 2 === 0 ? 1 : -1;
            const layer = Math.floor(t / 2) % 3;
            const distFromRiver = 9.6 + layer * 6.8 + (t % 5) * 1.9;
            const tx = cx + side * distFromRiver;

            const treeBiomeId = s < 0.5 ? unitFrom.id : unitTo.id;
            const sc = 0.92 + (t % 5) * 0.25 + (layer === 2 ? 0.32 : 0);
            const tree = createPineOrBiomeTree(THREE, treeBiomeId, sc, t * 1.91 + corridorIdx * 13);
            const bankElevation = ry + smoothstep(5.5, 22.0, distFromRiver) * 2.4;
            tree.position.set(tx, bankElevation, gz);
            tree.rotation.y = t * 1.37;
            corridorGroup.add(tree);

            if (t % 2 === 0 && corridorIdx < 3) {
                const bush = createBotanicalBush(THREE, 0.85 + (t % 3) * 0.22, t * 1.31);
                bush.position.set(cx + side * (7.2 + (t % 3) * 1.4), ry + 0.32, gz + 0.9);
                corridorGroup.add(bush);
            }
        }

        parentGroup.add(corridorGroup);
    }

    // Construye una de las 5 zonas de Unidad dentro del mismo espacio 3D continuo
    function buildSingleUnitZone(THREE, parentGroup, uIdx) {
        const unit = UNITS_DATA[uIdx] || UNITS_DATA[0];
        const unitId = unit.id || 'castores';
        const biome = UNIT_LAKE_BIOMES[unitId] || UNIT_LAKE_BIOMES.castores;
        const centerZ = -uIdx * UNIT_ZONE_SPACING;
        const centerY = UNIT_ZONE_ELEVATIONS[uIdx] || 0;

        const zoneGroup = new THREE.Group();
        zoneGroup.position.set(0, centerY, centerZ);

        const isAlpine = unitId === 'escultas' || unitId === 'clan';
        const getManadaBypassRiverX = (localZ) => {
            const s = clamp((localZ + 22.0) / 44.0, 0, 1);
            return Math.sin(s * Math.PI) * 19.5;
        };

        const getTerrainHeight = (x, z) => {
            const r = Math.hypot(x, z);
            const nSmooth = fbm2D(x * 0.028, z * 0.028, 5) * 0.5 + 0.5;
            const nDetail = fbm2D(x * 0.075 + 4.2, z * 0.075 - 3.1, 3) * 0.35;

            // Despejar y excavar suavemente el valle del río en el norte (z < -18.5) y sur (z > 18.5) y seguir la pendiente vertical del corredor
            let riverValleyMask = 1.0;
            let riverBedDepth = 0.0;
            let corridorYDelta = 0.0;
            const globalZ = z + centerZ;
            if (z < -18.5 && uIdx < 4) {
                const rCx = getCorridorRiverCenterX(uIdx, globalZ);
                const dRiver = Math.abs(x - rCx);
                const northBlend = smoothstep(-18.5, -24.5, z);
                riverValleyMask = lerp(1.0, smoothstep(7.0, 26.0, dRiver), northBlend);
                riverBedDepth = northBlend * (1.0 - smoothstep(4.2, 8.4, dRiver)) * 2.85;
                corridorYDelta = northBlend * (getCorridorRiverElevationY(uIdx, globalZ) - centerY);
            } else if (z > 18.5 && uIdx > 0) {
                const rCx = getCorridorRiverCenterX(uIdx - 1, globalZ);
                const dRiver = Math.abs(x - rCx);
                const southBlend = smoothstep(18.5, 24.5, z);
                riverValleyMask = lerp(1.0, smoothstep(7.0, 26.0, dRiver), southBlend);
                riverBedDepth = southBlend * (1.0 - smoothstep(4.2, 8.4, dRiver)) * 2.85;
                corridorYDelta = southBlend * (getCorridorRiverElevationY(uIdx - 1, globalZ) - centerY);
            }

            if (unitId === 'manada') {
                const ang = Math.atan2(z, x);
                const radialWarp = fbm2D(Math.cos(ang) * 1.8 + x * 0.08, Math.sin(ang) * 1.8 + z * 0.08, 3) * 1.65;
                const rWarped = Math.max(0, r + radialWarp * smoothstep(2.0, 15.0, r));

                const plateauBase = smoothstep(15.4, 7.2, rWarped) * 5.15;
                const amphitheaterRim = Math.exp(-Math.pow((rWarped - 8.2) / 2.1, 2.0)) *
                    (0.52 + 0.28 * fbm2D(x * 0.24 + 1.7, z * 0.24 - 2.3, 3));

                const cragDist = Math.hypot(x * 0.82, (z + 2.6) * 1.05);
                const cragPeak = Math.pow(clamp(1.0 - cragDist / 6.8, 0, 1), 1.48) * 4.35;

                const rockMask = smoothstep(16.2, 9.5, rWarped);
                const rockCrags = rockMask * (
                    ridgedFbm2D(x * 0.13 + 3.1, z * 0.13 - 1.4, 4) * 0.92 +
                    fbm2D(x * 0.26, z * 0.26, 3) * 0.32
                );

                // Cauce del río que bordea la Roca del Consejo por el Este (x ~ +19.5m) para no cortar el flujo entre Tropa y Castores
                let bypassCarve = 0.0;
                if (Math.abs(z) < 23.5) {
                    const bx = getManadaBypassRiverX(z);
                    const dBypass = Math.abs(x - bx);
                    const bypassEnv = 1.0 - smoothstep(19.5, 23.5, Math.abs(z));
                    bypassCarve = bypassEnv * (1.0 - smoothstep(3.8, 7.8, dBypass)) * 2.25;
                }

                const outerJungleHills = Math.pow(clamp((r - 20.5) / 66.0, 0, 1), 1.22) *
                    biome.heightScale * (nSmooth * 0.72 + 0.28) * riverValleyMask;

                return plateauBase + amphitheaterRim + cragPeak + rockCrags + 0.32 + nDetail * 0.42 + outerJungleHills - riverBedDepth - bypassCarve + corridorYDelta;
            }

            if (unitId === 'escultas') {
                const riverCenterX = Math.sin(z * 0.095) * 6.5;
                const distToRiver = Math.abs(x - riverCenterX);
                if (distToRiver < 7.5) {
                    return -2.4 + smoothstep(4.5, 7.5, distToRiver) * 2.6 + corridorYDelta;
                }
                const bankBlend = smoothstep(7.5, 14.5, distToRiver);
                // Explanada lateral en la ribera izquierda (x ~ -15.5, z ~ -8.0) para el Dojo Ninja
                const dojoDist = Math.hypot((x + 15.5) * 0.85, (z + 8.0) * 0.75);
                const dojoTerraceMask = 1.0 - smoothstep(5.5, 11.5, dojoDist);
                const canyonWall = Math.pow(clamp((distToRiver - 7.5) / 58.0, 0, 1), 1.15) *
                    biome.heightScale * (nSmooth * 0.55 + ridgedFbm2D(x * 0.035 + 1.5, z * 0.035, 4) * 0.75) * riverValleyMask;
                const naturalHeight = 0.35 + nDetail * 0.35 + canyonWall;
                const terraceHeight = 2.6 + nDetail * 0.12;
                const finalBankHeight = lerp(naturalHeight, terraceHeight, dojoTerraceMask);
                return lerp(0.2, finalBankHeight, bankBlend) - riverBedDepth + corridorYDelta;
            }

            if (r < 19.5) {
                return -3.4 + smoothstep(12.0, 19.5, r) * 1.2;
            }
            const shoreBlend = smoothstep(19.5, 25.5, r);
            const hillEnvelope = Math.pow(clamp((r - 23.5) / 72.0, 0, 1), 1.32);

            const nRidge = isAlpine
                ? ridgedFbm2D(x * 0.032 + 1.5, z * 0.032, 4) * 0.85
                : fbm2D(x * 0.042 - 2.0, z * 0.042 + 1.8, 4) * 0.45 + 0.45;

            const beachHeight = 0.28 + nDetail * 0.35;
            const mountainHeight = hillEnvelope * biome.heightScale * (nSmooth * 0.65 + nRidge * 0.65 + nDetail * 0.2) * riverValleyMask;

            return lerp(-2.2, beachHeight + mountainHeight - riverBedDepth + corridorYDelta, shoreBlend);
        };

        // 1. Terreno 3D de Alta Resolución (220m x 166m para enlazar perfectamente con el siguiente sector a 165m)
        const terrainSegsX = (unitId === 'manada' || unitId === 'castores' || unitId === 'tropa') ? 148 : 120;
        const terrainSegsZ = (unitId === 'manada' || unitId === 'castores' || unitId === 'tropa') ? 116 : 96;
        const terrainGeo = new THREE.PlaneGeometry(220, UNIT_ZONE_SPACING + 2, terrainSegsX, terrainSegsZ);
        terrainGeo.rotateX(-Math.PI / 2);
        const posAttr = terrainGeo.attributes.position;
        const colors = new Float32Array(posAttr.count * 3);

        const shoreSand = unitId === 'clan'
            ? [0.42, 0.52, 0.34]
            : (unitId === 'escultas' ? [0.58, 0.52, 0.42] : [0.48, 0.56, 0.36]);

        for (let i = 0; i < posAttr.count; i++) {
            const vx = posAttr.getX(i);
            const vz = posAttr.getZ(i);
            const vy = getTerrainHeight(vx, vz);
            posAttr.setY(i, vy);

            const r = Math.hypot(vx, vz);
            const microVar = fbm2D(vx * 0.18, vz * 0.18, 2) * 0.04;
            const hNorm = clamp((vy - 0.15) / (biome.heightScale * 0.92), 0, 1);

            let rCol, gCol, bCol;
            if (unitId === 'manada' && r < 16.2) {
                const rockMix = smoothstep(10.8, 16.2, r);
                rCol = lerp(0.62, biome.terrainLow[0], rockMix);
                gCol = lerp(0.66, biome.terrainLow[1], rockMix);
                bCol = lerp(0.70, biome.terrainLow[2], rockMix);
            } else if (unitId === 'escultas' && Math.abs(vx - Math.sin(vz * 0.095) * 6.5) < 11.0 && vy < 0.85) {
                const dRiv = Math.abs(vx - Math.sin(vz * 0.095) * 6.5);
                const st = smoothstep(6.8, 11.0, dRiv);
                rCol = lerp(shoreSand[0], biome.terrainLow[0], st);
                gCol = lerp(shoreSand[1], biome.terrainLow[1], st);
                bCol = lerp(shoreSand[2], biome.terrainLow[2], st);
            } else if (unitId !== 'manada' && unitId !== 'escultas' && r < 24.5 && vy < 0.85) {
                const st = smoothstep(20.5, 24.5, r);
                rCol = lerp(shoreSand[0], biome.terrainLow[0], st);
                gCol = lerp(shoreSand[1], biome.terrainLow[1], st);
                bCol = lerp(shoreSand[2], biome.terrainLow[2], st);
            } else if (hNorm < 0.45) {
                const t = hNorm / 0.45;
                rCol = lerp(biome.terrainLow[0], biome.terrainMid[0], t);
                gCol = lerp(biome.terrainLow[1], biome.terrainMid[1], t);
                bCol = lerp(biome.terrainLow[2], biome.terrainMid[2], t);
            } else {
                const t = (hNorm - 0.45) / 0.55;
                rCol = lerp(biome.terrainMid[0], biome.terrainHigh[0], t);
                gCol = lerp(biome.terrainMid[1], biome.terrainHigh[1], t);
                bCol = lerp(biome.terrainMid[2], biome.terrainHigh[2], t);
            }

            colors[i * 3] = clamp(rCol + microVar, 0, 1);
            colors[i * 3 + 1] = clamp(gCol + microVar, 0, 1);
            colors[i * 3 + 2] = clamp(bCol + microVar, 0, 1);
        }
        terrainGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        terrainGeo.computeVertexNormals();

        let terrainMat;
        if (unitId === 'manada') {
            const tUniforms = {
                uSunDir: { value: new THREE.Vector3(-0.35, 0.84, -0.42).normalize() },
                uFogColor: { value: new THREE.Color(biome.fogColor) },
                uFogDensity: { value: biome.fogDensity }
            };
            unitLakeState.terrainShaderUniformsList.push(tUniforms);
            terrainMat = new THREE.ShaderMaterial({
                uniforms: tUniforms,
                vertexShader: `
                    varying vec3 vWorldPos;
                    varying vec3 vGlobalPos;
                    varying vec3 vNormal;
                    void main() {
                        vec4 wp = modelMatrix * vec4(position, 1.0);
                        vWorldPos = position;
                        vGlobalPos = wp.xyz;
                        vNormal = normalize(mat3(modelMatrix) * normal);
                        gl_Position = projectionMatrix * viewMatrix * wp;
                    }
                `,
                fragmentShader: `
                    varying vec3 vWorldPos;
                    varying vec3 vGlobalPos;
                    varying vec3 vNormal;
                    uniform vec3 uSunDir;
                    uniform vec3 uFogColor;
                    uniform float uFogDensity;

                    float hash2(vec2 p) {
                        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
                    }
                    float noise2(vec2 p) {
                        vec2 i = floor(p);
                        vec2 f = fract(p);
                        f = f * f * (3.0 - 2.0 * f);
                        float a = hash2(i);
                        float b = hash2(i + vec2(1.0, 0.0));
                        float c = hash2(i + vec2(0.0, 1.0));
                        float d = hash2(i + vec2(1.0, 1.0));
                        return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
                    }
                    float fbm(vec2 p) {
                        float v = 0.0;
                        float a = 0.5;
                        mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
                        for (int i = 0; i < 5; i++) {
                            v += a * noise2(p);
                            p = rot * p * 2.04;
                            a *= 0.5;
                        }
                        return v;
                    }

                    void main() {
                        float r = length(vWorldPos.xz);
                        vec3 n = normalize(vNormal);
                        float slope = 1.0 - clamp(n.y, 0.0, 1.0);

                        float nMacro = fbm(vWorldPos.xz * 0.16);
                        float nMicro = fbm(vWorldPos.xz * 0.85 + vec2(4.2, -3.1));
                        float strataWave = sin(vWorldPos.y * 5.8 + nMacro * 4.5 + vWorldPos.x * 0.35);
                        float strata = smoothstep(-0.6, 0.7, strataWave);
                        float crevices = smoothstep(0.22, 0.55, fbm(vWorldPos.xz * 0.48 + vWorldPos.y * 0.6));

                        // Granito orgánico de la Roca del Consejo
                        vec3 darkSlate = vec3(0.31, 0.34, 0.36);
                        vec3 midGranite = vec3(0.46, 0.49, 0.51);
                        vec3 sunlitGranite = vec3(0.60, 0.61, 0.62);
                        vec3 rockCol = mix(darkSlate, midGranite, strata * 0.65 + 0.35);
                        rockCol = mix(rockCol, sunlitGranite, smoothstep(4.2, 9.2, vWorldPos.y) * 0.65 + nMicro * 0.25);
                        rockCol *= (0.86 + 0.14 * crevices);

                        // Selva orgánica de Seeonee
                        vec3 deepJungleFloor = vec3(0.13, 0.34, 0.14);
                        vec3 lushMoss = vec3(0.18, 0.47, 0.20);
                        vec3 lichenTint = vec3(0.28, 0.53, 0.25);
                        vec3 forestCol = mix(deepJungleFloor, lushMoss, nMacro * 0.7 + nMicro * 0.3);
                        forestCol = mix(forestCol, lichenTint, smoothstep(0.55, 0.82, nMicro) * 0.45);

                        float radialRock = 1.0 - smoothstep(10.8, 15.6, r);
                        float slopeRock = smoothstep(0.20, 0.46, slope);
                        float mossInCrevices = smoothstep(0.65, 0.88, n.y) * smoothstep(7.5, 2.5, vWorldPos.y) * 0.45;
                        float isRock = clamp(max(radialRock, slopeRock * 0.9) - mossInCrevices, 0.0, 1.0);

                        vec3 albedo = mix(forestCol, rockCol, isRock);

                        float diff = max(dot(n, uSunDir), 0.0);
                        vec3 sunLight = vec3(1.0, 0.96, 0.88) * (diff * 0.68);
                        vec3 fillDir = normalize(vec3(0.38, 0.65, 0.65));
                        float fillDiff = max(dot(n, fillDir), 0.0);
                        vec3 fillLight = vec3(0.54, 0.68, 0.75) * (fillDiff * 0.28);
                        vec3 ambientLight = mix(vec3(0.31, 0.45, 0.34), vec3(0.56, 0.66, 0.73), n.y * 0.5 + 0.5);

                        float rim = pow(clamp(n.y, 0.0, 1.0), 3.0) * isRock * smoothstep(3.0, 8.8, vWorldPos.y);
                        vec3 rimLight = vec3(1.0, 0.95, 0.85) * rim * 0.18;

                        vec3 litColor = albedo * (ambientLight + sunLight + fillLight) + rimLight;

                        float dist = length(cameraPosition - vGlobalPos);
                        float fogFactor = 1.0 - exp(- (uFogDensity * dist) * (uFogDensity * dist));
                        litColor = mix(litColor, uFogColor, clamp(fogFactor, 0.0, 0.90));

                        gl_FragColor = vec4(litColor, 1.0);
                    }
                `
            });
        } else if (unitId === 'castores') {
            const tUniforms = {
                uSunDir: { value: new THREE.Vector3(45, 75, -35).normalize() },
                uFogColor: { value: new THREE.Color(biome.fogColor) },
                uFogDensity: { value: biome.fogDensity }
            };
            unitLakeState.terrainShaderUniformsList.push(tUniforms);
            terrainMat = new THREE.ShaderMaterial({
                uniforms: tUniforms,
                vertexShader: `
                    varying vec3 vWorldPos;
                    varying vec3 vGlobalPos;
                    varying vec3 vNormal;
                    void main() {
                        vec4 wp = modelMatrix * vec4(position, 1.0);
                        vWorldPos = position;
                        vGlobalPos = wp.xyz;
                        vNormal = normalize(mat3(modelMatrix) * normal);
                        gl_Position = projectionMatrix * viewMatrix * wp;
                    }
                `,
                fragmentShader: `
                    varying vec3 vWorldPos;
                    varying vec3 vGlobalPos;
                    varying vec3 vNormal;
                    uniform vec3 uSunDir;
                    uniform vec3 uFogColor;
                    uniform float uFogDensity;

                    float hash2(vec2 p) {
                        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
                    }
                    float noise2(vec2 p) {
                        vec2 i = floor(p);
                        vec2 f = fract(p);
                        f = f * f * (3.0 - 2.0 * f);
                        float a = hash2(i);
                        float b = hash2(i + vec2(1.0, 0.0));
                        float c = hash2(i + vec2(0.0, 1.0));
                        float d = hash2(i + vec2(1.0, 1.0));
                        return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
                    }
                    float fbm(vec2 p) {
                        float v = 0.0;
                        float a = 0.5;
                        mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
                        for (int i = 0; i < 5; i++) {
                            v += a * noise2(p);
                            p = rot * p * 2.04;
                            a *= 0.5;
                        }
                        return v;
                    }

                    void main() {
                        float r = length(vWorldPos.xz);
                        vec3 n = normalize(vNormal);
                        float slope = 1.0 - clamp(n.y, 0.0, 1.0);

                        float nMacro = fbm(vWorldPos.xz * 0.10);
                        float nMicro = fbm(vWorldPos.xz * 0.35 + vec2(2.7, -1.9));

                        vec3 wetRiverbed = vec3(0.27, 0.31, 0.25);
                        vec3 dampSand = vec3(0.50, 0.46, 0.35);
                        vec3 shoreCol = mix(wetRiverbed, dampSand, smoothstep(-0.3, 0.48, vWorldPos.y));

                        vec3 deepForestMoss = vec3(0.15, 0.38, 0.17);
                        vec3 sunlitMeadow = vec3(0.21, 0.49, 0.21);
                        vec3 cloverHighlight = vec3(0.30, 0.56, 0.26);
                        vec3 meadowCol = mix(deepForestMoss, sunlitMeadow, nMacro * 0.72 + nMicro * 0.28);
                        meadowCol = mix(meadowCol, cloverHighlight, smoothstep(0.52, 0.84, nMicro) * 0.42);

                        float strata = smoothstep(-0.5, 0.6, sin(vWorldPos.y * 4.5 + nMacro * 3.8));
                        vec3 valleyRock = mix(vec3(0.34, 0.36, 0.36), vec3(0.49, 0.52, 0.51), strata * 0.6 + 0.4);
                        float isRockSlope = smoothstep(0.22, 0.46, slope) * smoothstep(0.8, 3.5, vWorldPos.y);

                        float shoreToMeadow = smoothstep(20.6, 24.4, r) * smoothstep(0.12, 0.78, vWorldPos.y);
                        vec3 albedo = mix(shoreCol, meadowCol, clamp(shoreToMeadow, 0.0, 1.0));
                        albedo = mix(albedo, valleyRock, isRockSlope * 0.85);

                        float diff = max(dot(n, uSunDir), 0.0);
                        vec3 sunLight = vec3(1.0, 0.96, 0.88) * (diff * 0.68);
                        vec3 fillDir = normalize(vec3(-0.45, 0.42, 0.45));
                        float fillDiff = max(dot(n, fillDir), 0.0);
                        vec3 fillLight = vec3(0.54, 0.68, 0.75) * (fillDiff * 0.28);
                        vec3 ambientLight = mix(vec3(0.33, 0.46, 0.34), vec3(0.57, 0.67, 0.73), n.y * 0.5 + 0.5);

                        vec3 viewDir = normalize(cameraPosition - vGlobalPos);
                        vec3 halfVec = normalize(uSunDir + viewDir);
                        float wetMask = (1.0 - clamp(shoreToMeadow, 0.0, 1.0)) * smoothstep(-0.2, 0.42, vWorldPos.y);
                        float wetSpec = pow(max(dot(n, halfVec), 0.0), 32.0) * wetMask * 0.22;

                        vec3 litColor = albedo * (ambientLight + sunLight + fillLight) + vec3(1.0, 0.96, 0.88) * wetSpec;

                        float dist = length(cameraPosition - vGlobalPos);
                        float fogFactor = 1.0 - exp(- (uFogDensity * dist) * (uFogDensity * dist));
                        litColor = mix(litColor, uFogColor, clamp(fogFactor, 0.0, 0.90));

                        gl_FragColor = vec4(litColor, 1.0);
                    }
                `
            });
        } else if (unitId === 'tropa') {
            const tUniforms = {
                uSunDir: { value: new THREE.Vector3(40, 75, 35).normalize() },
                uFogColor: { value: new THREE.Color(biome.fogColor) },
                uFogDensity: { value: biome.fogDensity }
            };
            unitLakeState.terrainShaderUniformsList.push(tUniforms);
            terrainMat = new THREE.ShaderMaterial({
                uniforms: tUniforms,
                vertexShader: `
                    varying vec3 vWorldPos;
                    varying vec3 vGlobalPos;
                    varying vec3 vNormal;
                    void main() {
                        vec4 wp = modelMatrix * vec4(position, 1.0);
                        vWorldPos = position;
                        vGlobalPos = wp.xyz;
                        vNormal = normalize(mat3(modelMatrix) * normal);
                        gl_Position = projectionMatrix * viewMatrix * wp;
                    }
                `,
                fragmentShader: `
                    varying vec3 vWorldPos;
                    varying vec3 vGlobalPos;
                    varying vec3 vNormal;
                    uniform vec3 uSunDir;
                    uniform vec3 uFogColor;
                    uniform float uFogDensity;

                    float hash2(vec2 p) {
                        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
                    }
                    float noise2(vec2 p) {
                        vec2 i = floor(p);
                        vec2 f = fract(p);
                        f = f * f * (3.0 - 2.0 * f);
                        float a = hash2(i);
                        float b = hash2(i + vec2(1.0, 0.0));
                        float c = hash2(i + vec2(0.0, 1.0));
                        float d = hash2(i + vec2(1.0, 1.0));
                        return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
                    }
                    float fbm(vec2 p) {
                        float v = 0.0;
                        float a = 0.5;
                        mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
                        for (int i = 0; i < 5; i++) {
                            v += a * noise2(p);
                            p = rot * p * 2.04;
                            a *= 0.5;
                        }
                        return v;
                    }

                    void main() {
                        float r = length(vWorldPos.xz);
                        vec3 n = normalize(vNormal);
                        float slope = 1.0 - clamp(n.y, 0.0, 1.0);

                        float nMacro = fbm(vWorldPos.xz * 0.11);
                        float nMicro = fbm(vWorldPos.xz * 0.36 + vec2(1.8, -2.4));

                        vec3 jadeShore = vec3(0.31, 0.40, 0.31);
                        vec3 deepEmeraldMeadow = vec3(0.14, 0.38, 0.20);
                        vec3 sunlitAlpineGrass = vec3(0.21, 0.49, 0.25);
                        vec3 meadowCol = mix(deepEmeraldMeadow, sunlitAlpineGrass, nMacro * 0.72 + nMicro * 0.28);

                        float strata = smoothstep(-0.5, 0.6, sin(vWorldPos.y * 4.2 + nMacro * 3.6));
                        vec3 alpineSlate = mix(vec3(0.32, 0.38, 0.36), vec3(0.48, 0.53, 0.52), strata * 0.6 + 0.4);
                        float isRockSlope = smoothstep(0.20, 0.44, slope) * smoothstep(0.8, 4.0, vWorldPos.y);

                        float shoreToMeadow = smoothstep(20.5, 24.2, r) * smoothstep(0.10, 0.75, vWorldPos.y);
                        vec3 albedo = mix(jadeShore, meadowCol, clamp(shoreToMeadow, 0.0, 1.0));
                        albedo = mix(albedo, alpineSlate, isRockSlope * 0.85);

                        float diff = max(dot(n, uSunDir), 0.0);
                        vec3 sunLight = vec3(1.0, 0.96, 0.88) * (diff * 0.68);
                        vec3 fillDir = normalize(vec3(-0.45, 0.42, 0.45));
                        float fillDiff = max(dot(n, fillDir), 0.0);
                        vec3 fillLight = vec3(0.54, 0.68, 0.75) * (fillDiff * 0.28);
                        vec3 ambientLight = mix(vec3(0.31, 0.46, 0.36), vec3(0.56, 0.67, 0.73), n.y * 0.5 + 0.5);

                        vec3 litColor = albedo * (ambientLight + sunLight + fillLight);

                        float dist = length(cameraPosition - vGlobalPos);
                        float fogFactor = 1.0 - exp(- (uFogDensity * dist) * (uFogDensity * dist));
                        litColor = mix(litColor, uFogColor, clamp(fogFactor, 0.0, 0.90));

                        gl_FragColor = vec4(litColor, 1.0);
                    }
                `
            });
        } else {
            const detailTex = getTerrainDetailTexture(THREE);
            terrainMat = new THREE.MeshStandardMaterial({
                vertexColors: true,
                map: detailTex,
                bumpMap: detailTex,
                bumpScale: 0.18,
                roughness: 0.86,
                metalness: 0.02,
                flatShading: false
            });
        }
        const terrainMesh = new THREE.Mesh(terrainGeo, terrainMat);
        zoneGroup.add(terrainMesh);

        // 2. El Lago Central 3D (en Castores, Tropa y Clan), el Río de Aguas Bravas del Cañón (en Escultas) o el Río de la Selva (en Manada)
        if (unitId !== 'manada' && unitId !== 'escultas') {
            const waterObj = createSmoothWaterShaderMesh(THREE, biome);
            zoneGroup.add(waterObj.mesh);
            unitLakeState.waterUniformsList.push(waterObj.uniforms);

            const rippleMat = new THREE.MeshBasicMaterial({
                color: 0xFFFFFF,
                transparent: true,
                opacity: 0.18,
                side: THREE.DoubleSide,
                depthWrite: false
            });
            for (let rIdx = 0; rIdx < 4; rIdx++) {
                const ringGeo = new THREE.RingGeometry(2.8 + rIdx * 4.2, 2.96 + rIdx * 4.2, 96);
                ringGeo.rotateX(-Math.PI / 2);
                const ringMesh = new THREE.Mesh(ringGeo, rippleMat.clone());
                ringMesh.position.y = 0.08;
                zoneGroup.add(ringMesh);
                unitLakeState.rippleRings.push({ mesh: ringMesh, phase: rIdx * 0.25 });
            }
        } else if (unitId === 'escultas') {
            // En Escultas: Río de Aguas Bravas serpenteando entre el Desfiladero de Trea (sin estanque circular)
            const rapidsGeo = new THREE.PlaneGeometry(14.5, 52.0, 32, 96);
            rapidsGeo.rotateX(-Math.PI / 2);
            const rPos = rapidsGeo.attributes.position;
            for (let i = 0; i < rPos.count; i++) {
                const lx = rPos.getX(i);
                const lz = rPos.getZ(i);
                const riverCenterX = Math.sin(lz * 0.095) * 6.5;
                rPos.setX(i, riverCenterX + lx);
                rPos.setZ(i, lz);
                rPos.setY(i, 0.15);
            }
            rapidsGeo.computeVertexNormals();

            const rapidsUniforms = {
                uTime: { value: 0 },
                uFlowSpeed: { value: 8.5 },
                uWaterShallow: { value: new THREE.Color(biome.waterColor) },
                uWaterDeep: { value: new THREE.Color(biome.waterEmissive) },
                uSkyHorizon: { value: new THREE.Color(biome.skyHorizon) },
                uSunColor: { value: new THREE.Color(biome.sunColor) },
                uSunDir: { value: new THREE.Vector3(-0.35, 0.72, 0.35).normalize() }
            };
            unitLakeState.waterUniformsList.push(rapidsUniforms);

            const rapidsMat = new THREE.ShaderMaterial({
                transparent: true,
                depthWrite: false,
                uniforms: rapidsUniforms,
                vertexShader: `
                    uniform float uTime;
                    uniform float uFlowSpeed;
                    varying vec2 vUv;
                    varying vec3 vGlobalPos;
                    varying vec3 vNormal;
                    void main() {
                        vUv = uv;
                        vec3 pos = position;
                        pos.y += sin(pos.z * 0.95 - uTime * uFlowSpeed) * 0.085 + cos(pos.x * 1.4 + uTime * 3.8) * 0.035;
                        vec4 wp = modelMatrix * vec4(pos, 1.0);
                        vGlobalPos = wp.xyz;
                        vNormal = normalize(mat3(modelMatrix) * normal);
                        gl_Position = projectionMatrix * viewMatrix * wp;
                    }
                `,
                fragmentShader: `
                    uniform float uTime;
                    uniform float uFlowSpeed;
                    uniform vec3 uWaterShallow;
                    uniform vec3 uWaterDeep;
                    uniform vec3 uSkyHorizon;
                    uniform vec3 uSunColor;
                    uniform vec3 uSunDir;
                    varying vec2 vUv;
                    varying vec3 vGlobalPos;
                    varying vec3 vNormal;

                    float rapidsCaustics(vec2 p, float t, float speed) {
                        vec2 p1 = p * 2.1 + vec2(sin(p.y * 0.6), -t * speed * 0.65);
                        vec2 p2 = p * 2.7 + vec2(cos(p.x * 0.6), -t * speed * 0.85);
                        float c1 = sin(p1.x + sin(p1.y * 1.6)) * 0.5 + 0.5;
                        float c2 = cos(p2.y + cos(p2.x * 1.6)) * 0.5 + 0.5;
                        return pow(c1 * c2, 1.45) * 2.3;
                    }

                    void main() {
                        float edgeDist = abs(vUv.x - 0.5) * 2.0;
                        float fZ = vGlobalPos.z * 1.85 - uTime * uFlowSpeed - edgeDist * 2.4;
                        float wave1 = sin(fZ + sin(vUv.x * 15.0)) * 0.5 + 0.5;
                        float wave2 = cos(fZ * 1.9 - cos(vUv.x * 20.0)) * 0.5 + 0.5;
                        float ripples = wave1 * 0.58 + wave2 * 0.42;

                        vec3 norm = normalize(vNormal + vec3((wave1 - 0.5) * 0.26, 0.84, (wave2 - 0.5) * 0.30));
                        vec3 viewDir = normalize(cameraPosition - vGlobalPos);
                        float nDotV = clamp(dot(viewDir, norm), 0.0, 1.0);
                        float fresnel = 0.02 + 0.98 * pow(1.0 - nDotV, 4.5);

                        vec3 baseCol = mix(uWaterDeep, uWaterShallow, 0.48 + 0.52 * (1.0 - edgeDist));
                        float caust = rapidsCaustics(vec2(vUv.x * 9.5, vGlobalPos.z * 0.32), uTime, uFlowSpeed);
                        baseCol += caust * (1.0 - edgeDist * 0.40) * (0.35 + 0.65 * nDotV) * vec3(0.75, 0.90, 0.96) * 0.16;

                        vec3 waterWithSky = mix(baseCol, uSkyHorizon, clamp(fresnel * 0.55, 0.0, 0.68));

                        vec3 halfVec = normalize(uSunDir + viewDir);
                        float nDotH = max(dot(norm, halfVec), 0.0);
                        float sunGlint = pow(nDotH, 180.0) * 1.65 + pow(nDotH, 48.0) * 0.18;

                        // Espuma viva de aguas bravas en rápidos y riberas rocosas
                        float rapidStreaks = smoothstep(0.48, 0.88, sin(vUv.x * 28.0 + sin(fZ * 0.55) * 2.2));
                        float boulderWake = smoothstep(0.55, 0.92, cos(vGlobalPos.z * 0.55 - uTime * 3.2) * sin(vUv.x * 18.0));
                        float bankFoam = smoothstep(0.56, 0.90, edgeDist) * (0.50 + 0.50 * ripples);
                        float totalFoam = clamp(bankFoam * 0.54 + rapidStreaks * 0.38 + boulderWake * 0.28 + pow(ripples, 3.2) * 0.32, 0.0, 0.78);

                        vec3 foamWhite = vec3(0.88, 0.93, 0.96);
                        vec3 col = mix(waterWithSky + uSunColor * sunGlint, foamWhite, totalFoam);
                        float alpha = smoothstep(1.0, 0.75, edgeDist) * 0.94;
                        gl_FragColor = vec4(col, alpha);
                    }
                `
            });
            zoneGroup.add(new THREE.Mesh(rapidsGeo, rapidsMat));
        } else {
            // En Manada: Tramo de río continuo que bordea la Roca del Consejo por el Este (uniendo el río de Tropa con el de Castores)
            const bypassGeo = new THREE.PlaneGeometry(11.6, 46.0, 24, 64);
            bypassGeo.rotateX(-Math.PI / 2);
            const bPos = bypassGeo.attributes.position;
            for (let i = 0; i < bPos.count; i++) {
                const lx = bPos.getX(i);
                const lz = bPos.getZ(i);
                const bx = getManadaBypassRiverX(lz);
                bPos.setX(i, bx + lx);
                bPos.setZ(i, lz);
                bPos.setY(i, 0.22);
            }
            bypassGeo.computeVertexNormals();

            const bypassUniforms = {
                uTime: { value: 0 },
                uFlowSpeed: { value: 5.8 },
                uWaterShallow: { value: new THREE.Color(0x194D59) },
                uWaterDeep: { value: new THREE.Color(0x081E29) },
                uSkyHorizon: { value: new THREE.Color(0x1C3144) },
                uSunColor: { value: new THREE.Color(0xFDE68A) },
                uSunDir: { value: new THREE.Vector3(-0.38, 0.72, -0.30).normalize() }
            };
            unitLakeState.waterUniformsList.push(bypassUniforms);

            const bypassMat = new THREE.ShaderMaterial({
                transparent: true,
                depthWrite: false,
                uniforms: bypassUniforms,
                vertexShader: `
                    uniform float uTime;
                    uniform float uFlowSpeed;
                    varying vec2 vUv;
                    varying vec3 vGlobalPos;
                    varying vec3 vNormal;
                    void main() {
                        vUv = uv;
                        vec3 pos = position;
                        pos.y += sin(pos.z * 0.75 - uTime * uFlowSpeed) * 0.06;
                        vec4 wp = modelMatrix * vec4(pos, 1.0);
                        vGlobalPos = wp.xyz;
                        vNormal = normalize(mat3(modelMatrix) * normal);
                        gl_Position = projectionMatrix * viewMatrix * wp;
                    }
                `,
                fragmentShader: `
                    uniform float uTime;
                    uniform float uFlowSpeed;
                    uniform vec3 uWaterShallow;
                    uniform vec3 uWaterDeep;
                    uniform vec3 uSkyHorizon;
                    uniform vec3 uSunColor;
                    uniform vec3 uSunDir;
                    varying vec2 vUv;
                    varying vec3 vGlobalPos;
                    varying vec3 vNormal;

                    float bypassCaustics(vec2 p, float t, float speed) {
                        vec2 p1 = p * 1.8 + vec2(sin(p.y * 0.5), -t * speed * 0.6);
                        vec2 p2 = p * 2.3 + vec2(cos(p.x * 0.5), -t * speed * 0.8);
                        float c1 = sin(p1.x + sin(p1.y * 1.5)) * 0.5 + 0.5;
                        float c2 = cos(p2.y + cos(p2.x * 1.5)) * 0.5 + 0.5;
                        return pow(c1 * c2, 1.5) * 2.2;
                    }

                    void main() {
                        float edgeDist = abs(vUv.x - 0.5) * 2.0;
                        float fZ = vGlobalPos.z * 1.6 - uTime * uFlowSpeed - edgeDist * 2.2;
                        float wave1 = sin(fZ + sin(vUv.x * 12.0)) * 0.5 + 0.5;
                        float wave2 = cos(fZ * 1.8 - cos(vUv.x * 16.0)) * 0.5 + 0.5;
                        float ripples = wave1 * 0.6 + wave2 * 0.4;

                        vec3 norm = normalize(vNormal + vec3((wave1 - 0.5) * 0.20, 0.88, (wave2 - 0.5) * 0.25));
                        vec3 viewDir = normalize(cameraPosition - vGlobalPos);
                        float nDotV = clamp(dot(viewDir, norm), 0.0, 1.0);
                        float fresnel = 0.02 + 0.98 * pow(1.0 - nDotV, 4.5);

                        vec3 baseCol = mix(uWaterDeep, uWaterShallow, 0.45 + 0.55 * (1.0 - edgeDist));
                        float caust = bypassCaustics(vec2(vUv.x * 8.0, vGlobalPos.z * 0.28), uTime, uFlowSpeed);
                        baseCol += caust * (1.0 - edgeDist * 0.45) * (0.35 + 0.65 * nDotV) * vec3(0.70, 0.86, 0.92) * 0.16;

                        vec3 waterWithSky = mix(baseCol, uSkyHorizon, clamp(fresnel * 0.55, 0.0, 0.68));

                        vec3 halfVec = normalize(uSunDir + viewDir);
                        float nDotH = max(dot(norm, halfVec), 0.0);
                        float sunGlint = pow(nDotH, 190.0) * 1.6 + pow(nDotH, 50.0) * 0.15;

                        float streaks = smoothstep(0.60, 0.90, sin(vUv.x * 22.0 + sin(fZ * 0.5) * 1.8));
                        float bankFoam = smoothstep(0.62, 0.92, edgeDist) * (0.45 + 0.55 * ripples);
                        float totalFoam = clamp(bankFoam * 0.48 + streaks * 0.30 + pow(ripples, 4.0) * 0.24, 0.0, 0.68);

                        vec3 foamWhite = vec3(0.82, 0.90, 0.94);
                        vec3 col = mix(waterWithSky + uSunColor * sunGlint, foamWhite, totalFoam);
                        float alpha = smoothstep(1.0, 0.76, edgeDist) * 0.92;
                        gl_FragColor = vec4(col, alpha);
                    }
                `
            });
            zoneGroup.add(new THREE.Mesh(bypassGeo, bypassMat));
        }

        // Helper para dejar despejada la desembocadura norte/sur del río (y el canal de Manada/Escultas) en el anillo de árboles
        const isInsideRiverMouth = (tx, tz) => {
            if (tz < -18.0 && uIdx < 4 && Math.abs(tx - getCorridorRiverCenterX(uIdx, tz + centerZ)) < 11.5) return true;
            if (tz > 18.0 && uIdx > 0 && Math.abs(tx - getCorridorRiverCenterX(uIdx - 1, tz + centerZ)) < 11.5) return true;
            if (unitId === 'manada' && Math.abs(tz) < 23.0 && Math.abs(tx - getManadaBypassRiverX(tz)) < 9.5) return true;
            if (unitId === 'escultas' && Math.abs(tx - Math.sin(tz * 0.095) * 6.5) < 9.5) return true;
            return false;
        };

        // 3. Bosque perimetral 360° de alta resolución
        if (unitId === 'manada') {
            const jungleTreeCount = 152;
            for (let t = 0; t < jungleTreeCount; t++) {
                const ringIdx = t % 4;
                const angle = (t / jungleTreeCount) * Math.PI * 2 + Math.sin(t * 3.1) * 0.05;
                const radius = 16.6 + ringIdx * 8.2 + (t % 5) * 2.2 + Math.cos(t * 1.9) * 1.4;
                const safeRadius = (radius > 28.2 && radius < 35.8) ? (radius < 32.0 ? 26.8 : 37.2) : radius;
                const tx = Math.cos(angle) * safeRadius;
                const tz = Math.sin(angle) * safeRadius;
                if (Math.abs(tz) > 76 || isInsideRiverMouth(tx, tz)) continue;
                const ty = getTerrainHeight(tx, tz);
                const sc = 0.96 + (t % 5) * 0.28 + (ringIdx >= 2 ? 0.38 : 0);
                const tree = createPineOrBiomeTree(THREE, 'manada', sc, t * 1.73);
                tree.position.set(tx, ty - 0.25, tz);
                tree.rotation.y = t * 1.3;
                zoneGroup.add(tree);
            }
        } else if (unitId === 'castores') {
            const forestTreeCount = 86;
            for (let t = 0; t < forestTreeCount; t++) {
                const ringIdx = t % 3;
                const angle = (t / forestTreeCount) * Math.PI * 2 + Math.sin(t * 2.7) * 0.05;
                const radius = 25.2 + ringIdx * 10.5 + (t % 5) * 2.4 + Math.cos(t * 1.7) * 1.5;
                const safeRadius = (radius > 35.5 && radius < 45.0) ? (radius < 40.2 ? 34.2 : 46.2) : radius;
                const tx = Math.cos(angle) * safeRadius;
                const tz = Math.sin(angle) * safeRadius;
                if (Math.abs(tz) > 76 || isInsideRiverMouth(tx, tz)) continue;
                if (Math.hypot(tx, tz + 22.0) < 9.0) continue;
                if (Math.hypot(tx - 25.5, tz - 4.0) < 8.5) continue;

                const ty = getTerrainHeight(tx, tz);
                if (ty < 0.20) continue;
                const sc = 0.88 + (t % 5) * 0.24 + (ringIdx >= 2 ? 0.32 : 0);
                const tree = createPineOrBiomeTree(THREE, 'castores', sc, t * 1.57);
                tree.position.set(tx, ty - 0.22, tz);
                tree.rotation.y = t * 1.25;
                zoneGroup.add(tree);
            }
        } else if (unitId === 'tropa') {
            const pineTreeCount = 82;
            for (let t = 0; t < pineTreeCount; t++) {
                const ringIdx = t % 3;
                const angle = (t / pineTreeCount) * Math.PI * 2 + Math.sin(t * 2.3) * 0.05;
                const radius = 25.5 + ringIdx * 10.2 + (t % 5) * 2.2 + Math.cos(t * 1.7) * 1.5;
                const safeRadius = (radius > 35.0 && radius < 44.5) ? (radius < 39.8 ? 33.8 : 45.8) : radius;
                const tx = Math.cos(angle) * safeRadius;
                const tz = Math.sin(angle) * safeRadius;
                if (Math.abs(tz) > 76 || isInsideRiverMouth(tx, tz)) continue;
                if (Math.hypot(tx + 1.0, tz + 24.0) < 9.5) continue;

                const ty = getTerrainHeight(tx, tz);
                if (ty < 0.22) continue;
                const sc = 0.85 + (t % 4) * 0.22 + (ringIdx === 2 ? 0.28 : 0);
                const tree = createPineOrBiomeTree(THREE, 'tropa', sc, t * 1.49);
                tree.position.set(tx, ty - 0.18, tz);
                tree.rotation.y = t * 1.15;
                zoneGroup.add(tree);
            }
        } else if (unitId === 'escultas') {
            // Laderas boscosas a ambos lados del cañón fluvial de Trea (despejando el cauce y la terraza del Dojo Ninja)
            const canyonTreeCount = 56;
            for (let t = 0; t < canyonTreeCount; t++) {
                const side = (t % 2 === 0) ? 1 : -1;
                const row = Math.floor(t / 2);
                const tz = -26.0 + (row / 27) * 52.0 + Math.sin(t * 2.1) * 1.8;
                const riverCenterX = Math.sin(tz * 0.095) * 6.5;
                const bankDist = 11.2 + (t % 4) * 6.4 + Math.cos(t * 1.7) * 2.0;
                const tx = riverCenterX + side * bankDist;
                if (Math.abs(tz) > 76 || isInsideRiverMouth(tx, tz)) continue;
                // No tapar la explanada del Dojo Ninja (x = -15.5, z = -8.0) ni el Torii (z = 16.0)
                if (Math.hypot(tx + 15.5, tz + 8.0) < 8.5) continue;
                if (Math.hypot(tx - Math.sin(16.0 * 0.095) * 6.5, tz - 16.0) < 9.0) continue;

                const ty = getTerrainHeight(tx, tz);
                if (ty < 0.25) continue;
                const sc = 0.84 + (t % 4) * 0.24;
                const tree = createPineOrBiomeTree(THREE, 'escultas', sc, t * 1.37);
                tree.position.set(tx, ty - 0.18, tz);
                tree.rotation.y = t * 1.1;
                zoneGroup.add(tree);
            }
        } else {
            const treeCount = 38;
            for (let t = 0; t < treeCount; t++) {
                const angle = (t / treeCount) * Math.PI * 2 + Math.sin(t * 2.1) * 0.07;
                const radius = 25.2 + (t % 6) * 3.8 + Math.cos(t * 1.7) * 1.8;
                const tx = Math.cos(angle) * radius;
                const tz = Math.sin(angle) * radius;
                if (Math.abs(tz) > 76 || isInsideRiverMouth(tx, tz)) continue;
                if (Math.hypot(tx, tz + 24) < 8.0) continue;
                if (Math.hypot(tx, tz - 21.5) < 6.5) continue;

                const ty = getTerrainHeight(tx, tz);
                if (ty < 0.25) continue;
                const sc = 0.82 + (t % 4) * 0.24;
                const tree = createPineOrBiomeTree(THREE, unitId, sc, t * 1.37);
                tree.position.set(tx, ty - 0.15, tz);
                tree.rotation.y = t * 1.1;
                zoneGroup.add(tree);
            }
        }

        // 4. Hitos 3D orgánicos y detallados de esta Unidad
        buildUnitSpecificLandmarks(THREE, zoneGroup, unitId, getTerrainHeight);

        // 5. Partículas atmosféricas suaves de esta zona
        const pCount = 140;
        const pGeo = new THREE.BufferGeometry();
        const pPos = new Float32Array(pCount * 3);
        for (let i = 0; i < pCount; i++) {
            const a = Math.random() * Math.PI * 2;
            const rad = 4 + Math.random() * 44;
            pPos[i * 3] = Math.cos(a) * rad;
            pPos[i * 3 + 1] = 0.8 + Math.random() * 18;
            pPos[i * 3 + 2] = Math.sin(a) * rad;
        }
        pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
        const pMat = new THREE.PointsMaterial({
            color: biome.particleColor,
            map: getSoftGlowTexture(THREE),
            size: unitId === 'clan' ? 0.85 : 0.75,
            transparent: true,
            opacity: 0.88,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });
        const particles = new THREE.Points(pGeo, pMat);
        zoneGroup.add(particles);
        unitLakeState.particlesList.push({ points: particles, isSnow: false });

        parentGroup.add(zoneGroup);
    }

    function setupUnitLakeWorld(unitOrIdx) {
        const startUnitIdx = typeof unitOrIdx === 'number'
            ? clamp(unitOrIdx, 0, 4)
            : Math.max(0, UNITS_DATA.findIndex(u => u.id === (unitOrIdx?.id || 'castores')));
        const unit = UNITS_DATA[startUnitIdx] || UNITS_DATA[0];
        const unitId = unit.id || 'castores';
        const biome = UNIT_LAKE_BIOMES[unitId] || UNIT_LAKE_BIOMES.castores;

        unitLakeState.unitId = unitId;
        unitLakeState.activeUnitIdx = startUnitIdx;
        unitLakeState.orbitTarget = startUnitIdx * 6;
        unitLakeState.orbitCurrent = startUnitIdx * 6;
        unitLakeState.activeStep = 0;

        syncUnitOrbitDOM(unitLakeState.orbitCurrent, 0);

        if (!ensureUnitLakeThreeScene()) return;

        const THREE = window.THREE;
        const { scene, worldGroup, hemiLight, sunLight, shoreLight } = unitLakeState;

        // Construir el Mundo 3D Unificado (las 5 Unidades + los 4 Ríos por el Bosque que las conectan) una sola vez
        if (!unitLakeState.worldBuilt) {
            while (worldGroup.children.length > 0) {
                worldGroup.remove(worldGroup.children[0]);
            }
            unitLakeState.rippleRings = [];
            unitLakeState.animatedProps = [];
            unitLakeState.reedClusters = [];
            unitLakeState.waterUniformsList = [];
            unitLakeState.waterFlowStreams = [];
            unitLakeState.terrainShaderUniformsList = [];
            unitLakeState.particlesList = [];

            const skyObj = createSkyDomeShaderMesh(THREE, biome);
            worldGroup.add(skyObj.mesh);
            unitLakeState.skyDome = skyObj.mesh;
            unitLakeState.skyUniforms = skyObj.uniforms;

            for (let uIdx = 0; uIdx < UNITS_DATA.length; uIdx++) {
                buildSingleUnitZone(THREE, worldGroup, uIdx);
                if (uIdx < UNITS_DATA.length - 1) {
                    buildRiverForestCorridor(THREE, worldGroup, uIdx);
                }
            }
            unitLakeState.worldBuilt = true;
        }

        // Configurar atmósfera y luces iniciales para la unidad seleccionada
        scene.fog.color.setHex(biome.fogColor);
        scene.fog.density = biome.fogDensity * 0.85;
        hemiLight.color.setHex(biome.hemiSky);
        hemiLight.groundColor.setHex(biome.hemiGround);
        sunLight.color.setHex(biome.sunColor);
        sunLight.position.set(biome.sunPos[0], biome.sunPos[1], biome.sunPos[2]);
        shoreLight.color.setHex(biome.shoreLightColor);
    }

    // Calcula la posición y punto de mira orbital exactos para la Unidad `uIdx` en `localStep` (0..4)
    function computeUnitOrbitalCameraPose(uIdx, localStep, smoothMouseX, smoothMouseY) {
        const unit = UNITS_DATA[uIdx] || UNITS_DATA[0];
        const biome = UNIT_LAKE_BIOMES[unit.id] || UNIT_LAKE_BIOMES.castores;
        const centerZ = -uIdx * UNIT_ZONE_SPACING;
        const centerY = UNIT_ZONE_ELEVATIONS[uIdx] || 0;

        const wrapped = ((localStep % 5) + 5) % 5;
        const idxA = Math.floor(wrapped) % 5;
        const idxB = (idxA + 1) % 5;
        const frac = smoothstep(0, 1, wrapped - Math.floor(wrapped));

        const stopA = biome.cameraStops[idxA];
        const stopB = biome.cameraStops[idxB];

        const camRadius = lerp(stopA.radius, stopB.radius, frac);
        const camHeight = lerp(stopA.height, stopB.height, frac) + smoothMouseY * 2.2;
        const localLookY = lerp(stopA.lookY, stopB.lookY, frac) - smoothMouseY * 1.1;

        const orbitAngle = (localStep / 5) * Math.PI * 2 + smoothMouseX * 0.16;

        const camX = Math.sin(orbitAngle) * camRadius;
        const camZ = centerZ + Math.cos(orbitAngle) * camRadius;

        const lookOffset = unit.id === 'manada' ? 0.6 : 3.2;
        const lookX = Math.cos(orbitAngle) * lookOffset;
        const lookZ = centerZ - Math.sin(orbitAngle) * lookOffset;

        return {
            camX, camY: centerY + camHeight, camZ,
            lookX, lookY: centerY + localLookY, lookZ
        };
    }

    function renderUnitLakeFrame(now) {
        if (!unitLakeState.isRunning) return;
        unitLakeState.rafId = requestAnimationFrame(renderUnitLakeFrame);

        const t = now * 0.001;
        unitLakeState.orbitTarget = clamp(unitLakeState.orbitTarget, 0, 28);

        // Velocidad cinematográfica suave cuando cruzamos el río/montaña/escalada entre dos Unidades
        const uIdxCheck = Math.min(4, Math.floor(clamp(unitLakeState.orbitCurrent, 0, 28) / 6));
        const localCheck = unitLakeState.orbitCurrent - uIdxCheck * 6;
        const isRiverFlight = (localCheck > 4.02 && localCheck < 5.98) || Math.abs(unitLakeState.orbitTarget - unitLakeState.orbitCurrent) > 1.25;
        const lerpSpeed = isRiverFlight ? 0.034 : 0.075;

        unitLakeState.orbitCurrent = lerp(unitLakeState.orbitCurrent, unitLakeState.orbitTarget, lerpSpeed);
        unitLakeState.smoothMouseX = lerp(unitLakeState.smoothMouseX, unitLakeState.mouseX, 0.08);
        unitLakeState.smoothMouseY = lerp(unitLakeState.smoothMouseY, unitLakeState.mouseY, 0.08);

        syncUnitOrbitDOM(unitLakeState.orbitCurrent);

        const THREE = window.THREE;
        if (THREE && unitLakeState.renderer && unitLakeState.scene && unitLakeState.camera) {
            const totalClamped = clamp(unitLakeState.orbitCurrent, 0, 28);
            const uIdx = Math.min(4, Math.floor(totalClamped / 6));
            const localProg = totalClamped - uIdx * 6;

            const unitA = UNITS_DATA[uIdx] || UNITS_DATA[0];
            const unitB = UNITS_DATA[Math.min(4, uIdx + 1)] || unitA;
            const biomeA = UNIT_LAKE_BIOMES[unitA.id] || UNIT_LAKE_BIOMES.castores;
            const biomeB = UNIT_LAKE_BIOMES[unitB.id] || biomeA;

            let camX, camY, camZ, lookX, lookY, lookZ;
            let biomeBlend = 0.0;

            if (localProg <= 4.0 || uIdx >= 4) {
                const pose = computeUnitOrbitalCameraPose(
                    uIdx,
                    clamp(localProg, 0, 4),
                    unitLakeState.smoothMouseX,
                    unitLakeState.smoothMouseY
                );
                camX = pose.camX;
                camY = pose.camY;
                camZ = pose.camZ;
                lookX = pose.lookX;
                lookY = pose.lookY;
                lookZ = pose.lookZ;
                biomeBlend = 0.0;
            } else {
                // Travesía 3D continua entre la Unidad `uIdx` (parada 4) y `uIdx + 1` (parada 0)
                const tCrossRaw = clamp((localProg - 4.0) / 2.0, 0, 1);
                const tCross = smoothstep(0, 1, tCrossRaw);
                biomeBlend = tCross;

                const poseStart = computeUnitOrbitalCameraPose(uIdx, 4.0, unitLakeState.smoothMouseX * (1 - tCross), unitLakeState.smoothMouseY);
                const poseEnd = computeUnitOrbitalCameraPose(uIdx + 1, 0.0, unitLakeState.smoothMouseX * tCross, unitLakeState.smoothMouseY);

                const zStart = -uIdx * UNIT_ZONE_SPACING - 21.0;
                const zEnd = -(uIdx + 1) * UNIT_ZONE_SPACING + 21.0;
                const zMid = (zStart + zEnd) * 0.5;
                const zNextCenter = -(uIdx + 1) * UNIT_ZONE_SPACING;
                const yNextCenter = UNIT_ZONE_ELEVATIONS[uIdx + 1] || 0;

                const zWp1 = lerp(zStart, zEnd, 0.22);
                const zWp2 = zMid;
                const zWp3 = lerp(zStart, zEnd, 0.78);

                const yWp1 = getCorridorRiverElevationY(uIdx, zWp1);
                const yWp2 = getCorridorRiverElevationY(uIdx, zWp2);
                const yWp3 = getCorridorRiverElevationY(uIdx, zWp3);

                let camCurve, lookCurve;

                if (uIdx === 2) {
                    // Tramo Tropa → Escultas: subida por montaña arbolada atravesando el Torii de los Ninjas a mitad de camino
                    camCurve = new THREE.CatmullRomCurve3([
                        new THREE.Vector3(poseStart.camX, poseStart.camY, poseStart.camZ),
                        new THREE.Vector3(getCorridorRiverCenterX(2, zWp1) + 2.2, yWp1 + 4.8 + unitLakeState.smoothMouseY * 1.3, zWp1),
                        new THREE.Vector3(getCorridorRiverCenterX(2, zWp2), yWp2 + 3.8 + unitLakeState.smoothMouseY * 1.1, zWp2),
                        new THREE.Vector3(getCorridorRiverCenterX(2, zWp3) - 2.6, yWp3 + 5.6 + unitLakeState.smoothMouseY * 1.4, zWp3),
                        new THREE.Vector3(poseEnd.camX, poseEnd.camY, poseEnd.camZ)
                    ]);

                    lookCurve = new THREE.CatmullRomCurve3([
                        new THREE.Vector3(poseStart.lookX, poseStart.lookY, poseStart.lookZ),
                        new THREE.Vector3(getCorridorRiverCenterX(2, zWp2), yWp2 + 4.4, zWp2),
                        new THREE.Vector3(getCorridorRiverCenterX(2, zWp3), yWp3 + 2.8, zWp3 - 12.0),
                        new THREE.Vector3(0.0, yNextCenter + 2.8, zNextCenter),
                        new THREE.Vector3(poseEnd.lookX, poseEnd.lookY, poseEnd.lookZ)
                    ]);
                } else if (uIdx === 3) {
                    // Tramo Escultas → Clan: ascenso escalando por la pared de roca junto a la cascada, atravesando el mar de nubes 3D hasta emerger en la Laguna Azul
                    camCurve = new THREE.CatmullRomCurve3([
                        new THREE.Vector3(poseStart.camX, poseStart.camY, poseStart.camZ),
                        new THREE.Vector3(getCorridorRiverCenterX(3, zWp1) - 3.4, yWp1 + 4.2 + unitLakeState.smoothMouseY * 1.3, zWp1),
                        new THREE.Vector3(getCorridorRiverCenterX(3, zWp2) - 2.6, yWp2 + 4.5 + unitLakeState.smoothMouseY * 1.2, zWp2),
                        new THREE.Vector3(getCorridorRiverCenterX(3, zWp3) - 2.0, yWp3 + 5.8 + unitLakeState.smoothMouseY * 1.4, zWp3),
                        new THREE.Vector3(poseEnd.camX, poseEnd.camY, poseEnd.camZ)
                    ]);

                    lookCurve = new THREE.CatmullRomCurve3([
                        new THREE.Vector3(poseStart.lookX, poseStart.lookY, poseStart.lookZ),
                        new THREE.Vector3(getCorridorRiverCenterX(3, zWp2) - 1.2, yWp2 + 7.5, zWp2 - 6.0),
                        new THREE.Vector3(getCorridorRiverCenterX(3, zWp3), yWp3 + 5.2, zWp3 - 12.0),
                        new THREE.Vector3(0.0, yNextCenter + 3.2, zNextCenter),
                        new THREE.Vector3(poseEnd.lookX, poseEnd.lookY, poseEnd.lookZ)
                    ]);
                } else {
                    // Tramos del valle (Castores → Manada y Manada → Tropa): cruzando el río por el bosque
                    camCurve = new THREE.CatmullRomCurve3([
                        new THREE.Vector3(poseStart.camX, poseStart.camY, poseStart.camZ),
                        new THREE.Vector3(getCorridorRiverCenterX(uIdx, zWp1) + 2.8, yWp1 + 5.4 + unitLakeState.smoothMouseY * 1.4, zWp1),
                        new THREE.Vector3(getCorridorRiverCenterX(uIdx, zWp2) - 1.4, yWp2 + 4.1 + unitLakeState.smoothMouseY * 1.2, zWp2),
                        new THREE.Vector3(getCorridorRiverCenterX(uIdx, zWp3) - 4.2, yWp3 + 6.6 + unitLakeState.smoothMouseY * 1.5, zWp3),
                        new THREE.Vector3(poseEnd.camX, poseEnd.camY, poseEnd.camZ)
                    ]);

                    lookCurve = new THREE.CatmullRomCurve3([
                        new THREE.Vector3(poseStart.lookX, poseStart.lookY, poseStart.lookZ),
                        new THREE.Vector3(getCorridorRiverCenterX(uIdx, zWp2), yWp2 + 1.6, zWp2),
                        new THREE.Vector3(getCorridorRiverCenterX(uIdx, zWp3), yWp3 + 2.1, zWp3 - 14.0),
                        new THREE.Vector3(0.0, yNextCenter + (unitB.id === 'manada' ? 4.8 : 2.5), zNextCenter),
                        new THREE.Vector3(poseEnd.lookX, poseEnd.lookY, poseEnd.lookZ)
                    ]);
                }

                const cPt = camCurve.getPoint(tCross);
                const lPt = lookCurve.getPoint(tCross);
                camX = cPt.x;
                camY = cPt.y;
                camZ = cPt.z;
                lookX = lPt.x;
                lookY = lPt.y;
                lookZ = lPt.z;
            }

            unitLakeState.camera.position.set(camX, camY, camZ);
            unitLakeState.camera.lookAt(lookX, lookY, lookZ);

            // Mantener la cúpula celeste centrada en la cámara e interpolar suavemente la atmósfera entre biomas al cruzar el río
            if (unitLakeState.skyDome) {
                unitLakeState.skyDome.position.copy(unitLakeState.camera.position);
            }
            if (unitLakeState.skyUniforms) {
                unitLakeState.skyUniforms.uTime.value = t;
                unitLakeState.skyUniforms.uSkyTop.value.setHex(biomeA.skyTop).lerp(new THREE.Color(biomeB.skyTop), biomeBlend);
                unitLakeState.skyUniforms.uSkyHorizon.value.setHex(biomeA.skyHorizon).lerp(new THREE.Color(biomeB.skyHorizon), biomeBlend);
                unitLakeState.skyUniforms.uSunColor.value.setHex(biomeA.sunColor).lerp(new THREE.Color(biomeB.sunColor), biomeBlend);
                const dirA = new THREE.Vector3(biomeA.sunPos[0], biomeA.sunPos[1], biomeA.sunPos[2]).normalize();
                const dirB = new THREE.Vector3(biomeB.sunPos[0], biomeB.sunPos[1], biomeB.sunPos[2]).normalize();
                unitLakeState.skyUniforms.uSunDir.value.copy(dirA).lerp(dirB, biomeBlend).normalize();
            }

            const blendedFogCol = new THREE.Color(biomeA.fogColor).lerp(new THREE.Color(biomeB.fogColor), biomeBlend);
            const blendedFogDens = lerp(biomeA.fogDensity, biomeB.fogDensity, biomeBlend);
            unitLakeState.scene.fog.color.copy(blendedFogCol);
            unitLakeState.scene.fog.density = blendedFogDens * 0.82;

            unitLakeState.terrainShaderUniformsList.forEach(tu => {
                tu.uFogColor.value.copy(blendedFogCol);
                tu.uFogDensity.value = blendedFogDens * 0.85;
            });

            if (unitLakeState.hemiLight) {
                unitLakeState.hemiLight.color.setHex(biomeA.hemiSky).lerp(new THREE.Color(biomeB.hemiSky), biomeBlend);
                unitLakeState.hemiLight.groundColor.setHex(biomeA.hemiGround).lerp(new THREE.Color(biomeB.hemiGround), biomeBlend);
            }
            if (unitLakeState.sunLight) {
                unitLakeState.sunLight.color.setHex(biomeA.sunColor).lerp(new THREE.Color(biomeB.sunColor), biomeBlend);
            }
            if (unitLakeState.fillLight) {
                unitLakeState.fillLight.color.setHex(biomeA.skyHorizon).lerp(new THREE.Color(biomeB.skyHorizon), biomeBlend);
            }
            if (unitLakeState.shoreLight) {
                unitLakeState.shoreLight.color.setHex(biomeA.shoreLightColor).lerp(new THREE.Color(biomeB.shoreLightColor), biomeBlend);
                const activeZ = -Math.round(uIdx + biomeBlend) * UNIT_ZONE_SPACING;
                const activeY = lerp(UNIT_ZONE_ELEVATIONS[uIdx] || 0, UNIT_ZONE_ELEVATIONS[Math.min(4, uIdx + 1)] || 0, biomeBlend);
                unitLakeState.shoreLight.position.set(0, activeY + 9.0, activeZ);
            }

            // Actualizar tiempo de todos los lagos y tramos de río
            unitLakeState.waterUniformsList.forEach(wu => {
                wu.uTime.value = t;
            });

            // Animar partículas 3D de corriente de agua descendiendo desde la Laguna Azul del Clan hacia el Estanque de Castores
            if (unitLakeState.waterFlowStreams) {
                unitLakeState.waterFlowStreams.forEach(ws => {
                    const posAttr = ws.points.geometry.attributes.position;
                    for (let i = 0; i < posAttr.count; i++) {
                        // Flujo descendente: desde s=1 (zEnd, aguas arriba / Norte) hacia s=0 (zStart, aguas abajo / Sur)
                        let p = (ws.flowProg[i] - t * ws.speed) % 1.0;
                        if (p < 0) p += 1.0;
                        const gz = lerp(ws.zStart, ws.zEnd, p);
                        const cx = getCorridorRiverCenterX(ws.corridorIdx, gz);
                        const ry = getCorridorRiverElevationY(ws.corridorIdx, gz);
                        const waveBob = Math.sin(t * 7.5 + i * 0.9) * 0.12;
                        posAttr.setXYZ(i, cx + ws.flowLane[i], ry + 0.38 + waveBob, gz);
                    }
                    posAttr.needsUpdate = true;
                });
            }

            // Animar los anillos concéntricos suaves en el agua
            unitLakeState.rippleRings.forEach((ringObj) => {
                const cycle = (t * 0.16 + ringObj.phase) % 1;
                const sc = 0.35 + cycle * 1.65;
                ringObj.mesh.scale.set(sc, 1, sc);
                ringObj.mesh.material.opacity = Math.sin(cycle * Math.PI) * 0.20;
            });

            // Animar mecida suave de juncos en la orilla y en el río
            unitLakeState.reedClusters.forEach(rc => {
                rc.mesh.rotation.z = Math.sin(t * 1.9 + rc.phase) * 0.06;
            });

            // Animar elementos flotantes y resplandor volumétrico de hogueras
            unitLakeState.animatedProps.forEach(item => {
                if (item.isFlame) {
                    const bScale = item.baseScale || 4.0;
                    const flicker = 0.92 + Math.sin(t * 9.5 + item.phase) * 0.10;
                    item.mesh.scale.set(bScale * flicker, bScale * (0.94 + Math.cos(t * 12.0) * 0.12), 1);
                    if (item.innerMesh) {
                        const coreScale = bScale * 0.57;
                        item.innerMesh.scale.set(coreScale / flicker, coreScale * (0.96 + Math.sin(t * 14.0) * 0.10), 1);
                    }
                    if (item.haloSprite) {
                        const hScale = bScale * 1.95 * (0.94 + Math.sin(t * 7.5 + item.phase) * 0.08);
                        item.haloSprite.scale.set(hScale, hScale, 1);
                    }
                } else {
                    item.mesh.position.y = item.baseY + Math.sin(t * 1.8 + item.phase) * 0.07;
                }
            });

            // Animar partículas flotantes en cada zona
            unitLakeState.particlesList.forEach(pObj => {
                pObj.points.rotation.y = t * 0.035;
                const pAttr = pObj.points.geometry.attributes.position;
                for (let i = 0; i < pAttr.count; i++) {
                    let py = pAttr.getY(i);
                    py += (pObj.isSnow ? -0.022 : 0.016);
                    if (py > 19) py = 0.8;
                    if (py < 0.6) py = 18.5;
                    pAttr.setY(i, py);
                }
                pAttr.needsUpdate = true;
            });

            unitLakeState.renderer.render(unitLakeState.scene, unitLakeState.camera);
        }
    }

    function startUnitLakeOrbitLoop() {
        if (unitLakeState.isRunning) return;
        unitLakeState.isRunning = true;
        unitLakeState.rafId = requestAnimationFrame(renderUnitLakeFrame);
    }

    function stopUnitLakeOrbitLoop() {
        unitLakeState.isRunning = false;
        if (unitLakeState.rafId) {
            cancelAnimationFrame(unitLakeState.rafId);
            unitLakeState.rafId = null;
        }
    }

    // Avanza o retrocede una parada (y si estás en la parada 5 de una unidad, cruza el río por el bosque hacia la siguiente unidad)
    function stepUnitOrbitBy(dir) {
        clearTimeout(unitLakeState.snapTimer);
        const cur = clamp(unitLakeState.orbitTarget, 0, 28);
        const uIdx = Math.min(4, Math.floor(cur / 6));
        const localStep = Math.round(clamp(cur - uIdx * 6, 0, 4));
        if (dir > 0) {
            if (localStep < 4) {
                unitLakeState.orbitTarget = uIdx * 6 + localStep + 1;
            } else if (uIdx < 4) {
                // ¡Al terminar las 5 paradas (ej. Castores), cruza el río por el bosque hacia la siguiente Unidad (ej. Manada)!
                unitLakeState.orbitTarget = (uIdx + 1) * 6;
            } else {
                unitLakeState.orbitTarget = 0;
            }
        } else {
            if (localStep > 0) {
                unitLakeState.orbitTarget = uIdx * 6 + localStep - 1;
            } else if (uIdx > 0) {
                unitLakeState.orbitTarget = (uIdx - 1) * 6 + 4;
            }
        }
    }

    // Eventos interactivos de la experiencia orbital (Rueda, Botones de Parada, ProgressRing, Teclado y Touch)
    (function bindUnitOrbitEvents() {
        const overlay = document.getElementById('unitSuperZoomOverlay');
        if (!overlay) return;

        // 1. Rueda del ratón / Trackpad: órbita suave y cruce del río por el bosque al terminar la 5ª parada
        overlay.addEventListener('wheel', (e) => {
            if (!overlay.classList.contains('is-open')) return;

            const scrollable = e.target.closest('[data-orbit-scrollable="true"]');
            if (scrollable && scrollable.scrollHeight > scrollable.clientHeight + 4) {
                const atTop = scrollable.scrollTop <= 2;
                const atBottom = scrollable.scrollTop + scrollable.clientHeight >= scrollable.scrollHeight - 2;
                if ((e.deltaY < 0 && !atTop) || (e.deltaY > 0 && !atBottom)) {
                    e.stopPropagation();
                    return;
                }
            }

            e.preventDefault();
            e.stopPropagation();
            const stepDelta = clamp(e.deltaY, -140, 140) * 0.0046;
            unitLakeState.orbitTarget = clamp(unitLakeState.orbitTarget + stepDelta, 0, 28);
            scheduleOrbitSnap();
        }, { passive: false });

        // 2. Parallax suave con el ratón + posibilidad de arrastrar el lago
        overlay.addEventListener('pointermove', (e) => {
            if (!overlay.classList.contains('is-open')) return;
            unitLakeState.mouseX = ((e.clientX / Math.max(1, window.innerWidth)) - 0.5) * 2;
            unitLakeState.mouseY = ((e.clientY / Math.max(1, window.innerHeight)) - 0.5) * 2;

            if (unitLakeState.isDraggingBg) {
                const dx = e.clientX - unitLakeState.dragLastX;
                unitLakeState.dragLastX = e.clientX;
                unitLakeState.orbitTarget = clamp(unitLakeState.orbitTarget - dx * 0.0055, 0, 28);
            }
        });

        overlay.addEventListener('pointerdown', (e) => {
            if (e.target.closest('button, a, input, .kraalete-cromo-card, .unit-salida-card, .uz-glass-photo-card')) return;
            unitLakeState.isDraggingBg = true;
            unitLakeState.dragLastX = e.clientX;
            clearTimeout(unitLakeState.snapTimer);
        });

        window.addEventListener('pointerup', () => {
            if (unitLakeState.isDraggingBg) {
                unitLakeState.isDraggingBg = false;
                scheduleOrbitSnap();
            }
        });

        // 3. Soporte táctil (Swipe vertical u horizontal para rodear el lago y cruzar el río)
        overlay.addEventListener('touchstart', (e) => {
            if (!e.touches.length) return;
            unitLakeState.touchStartY = e.touches[0].clientY;
            unitLakeState.touchStartX = e.touches[0].clientX;
        }, { passive: true });

        overlay.addEventListener('touchmove', (e) => {
            if (!overlay.classList.contains('is-open') || !e.touches.length) return;
            const scrollable = e.target.closest('[data-orbit-scrollable="true"]');
            if (scrollable && scrollable.scrollHeight > scrollable.clientHeight + 4) return;

            const dy = unitLakeState.touchStartY - e.touches[0].clientY;
            const dx = unitLakeState.touchStartX - e.touches[0].clientX;
            unitLakeState.touchStartY = e.touches[0].clientY;
            unitLakeState.touchStartX = e.touches[0].clientX;

            const primaryDelta = Math.abs(dy) > Math.abs(dx) ? dy : dx;
            unitLakeState.orbitTarget = clamp(unitLakeState.orbitTarget + primaryDelta * 0.0065, 0, 28);
            scheduleOrbitSnap();
        }, { passive: true });

        // 4. Botones de las 5 paradas inferiores
        document.querySelectorAll('#uzOrbitStepsNav [data-goto-orbit]').forEach(btn => {
            btn.addEventListener('click', () => {
                const targetIdx = parseInt(btn.getAttribute('data-goto-orbit'), 10);
                goToUnitOrbitStep(targetIdx);
            });
        });

        // 5. Anillo de Progreso (ProgressRing): avanza a la siguiente parada y al acabar cruza el río a la siguiente Unidad
        document.getElementById('uzNextOrbitStepBtn')?.addEventListener('click', () => {
            stepUnitOrbitBy(1);
        });

        // 6. Teclas de flecha cuando estás dentro de una Unidad
        window.addEventListener('keydown', (e) => {
            if (!overlay.classList.contains('is-open')) return;
            if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;
            if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
                e.preventDefault();
                stepUnitOrbitBy(1);
            } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
                e.preventDefault();
                stepUnitOrbitBy(-1);
            }
        });
    })();

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

    // =========================================================================
    // 8C. VISOR UNIVERSAL DE FOTOGRAFÍAS EN PANTALLA COMPLETA (LIGHTBOX)
    // =========================================================================
    const elLightbox = document.getElementById('cosmosLightbox');
    const elLightboxImg = document.getElementById('cosmosLightboxImg');
    const elLightboxTitle = document.getElementById('cosmosLightboxTitle');
    const elLightboxCaption = document.getElementById('cosmosLightboxCaption');
    const elBtnCloseLightbox = document.getElementById('btnCloseLightbox');

    function openLightbox(src, title = 'Fotografía', caption = 'Grupo Scout Acrux 518') {
        if (!elLightbox || !elLightboxImg) return;
        elLightboxImg.src = src;
        if (elLightboxTitle) elLightboxTitle.textContent = title;
        if (elLightboxCaption) elLightboxCaption.textContent = caption;
        elLightbox.classList.add('is-open');
        elLightbox.setAttribute('aria-hidden', 'false');
    }

    function closeLightbox() {
        if (!elLightbox) return;
        elLightbox.classList.remove('is-open');
        elLightbox.setAttribute('aria-hidden', 'true');
        if (elLightboxImg) elLightboxImg.src = '';
    }

    elBtnCloseLightbox?.addEventListener('click', closeLightbox);
    elLightbox?.addEventListener('click', (e) => {
        if (e.target === elLightbox) closeLightbox();
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

        // 1. Iniciar el Super-Zoom Hiperespacio directo al núcleo de la estrella del Campamento (ultrarrápido)
        superZoomState = {
            type: 'camp',
            index: campIdx,
            wx: camp.worldX,
            wy: camp.worldY,
            zoom: 24.0
        };

        document.body.classList.add('is-superzoom-open');
        const diveTime = wasAlreadyOpen ? 100 : 180;
        triggerStarDiveFlash(camp.worldX, camp.worldY, wasAlreadyOpen ? 160 : 260);

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
                ? 'CONSTELACIÓN EQUINOCCIAL (SEMANA SANTA)'
                : 'CONSTELACIÓN ESTIVAL (VERANO)';
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
                    <article class="camp-photo-card" data-lightbox-src="${ph.src}" data-lightbox-title="${ph.title || camp.name}" data-lightbox-meta="Foto 0${i + 1}/03 · ${camp.name}">
                        <div class="camp-photo-img-wrap">
                            <span class="camp-photo-badge">MUESTRA 0${i + 1} / 03 · DRIVE</span>
                            <img src="${ph.src}" alt="${ph.title || 'Foto de campamento'}" loading="lazy" referrerpolicy="no-referrer">
                            <span class="camp-photo-enlarge-hint">🔍 Ampliar</span>
                        </div>
                        <div class="camp-photo-caption">
                            <strong>${ph.title || camp.name}</strong>
                            <span>${ph.meta || `Muestra fotográfica sincronizada desde Google Drive`}</span>
                        </div>
                    </article>
                `).join('');

                threePhotosGrid.querySelectorAll('.camp-photo-card').forEach(card => {
                    card.addEventListener('click', () => {
                        const src = card.getAttribute('data-lightbox-src');
                        const title = card.getAttribute('data-lightbox-title');
                        const meta = card.getAttribute('data-lightbox-meta');
                        openLightbox(src, title, meta);
                    });
                });
            }
        }

        const campSw = document.getElementById('czCampSwitcher');
        if (campSw) {
            campSw.innerHTML = CAMPS_DATA.map((c, i) => {
                const seasonIcon = c.seasonType === 'easter' ? '🌸' : (c.isRedStar ? '🔴' : '☀️');
                return `
                    <button type="button" class="star-node-chip ${c.isRedStar ? 'is-red-chip' : ''} ${i === campIdx ? 'active' : ''}" data-jump-camp="${i}" title="${c.name}">
                        <span>${seasonIcon} ${c.starSymbol}</span>
                    </button>
                `;
            }).join('');
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
    let activeLostCategory = 'all';

    const checkLostCategoryMatch = (it, cat) => {
        if (!cat || cat === 'all') return true;
        const text = `${it.name || ''} ${it.desc || ''} ${it.file || ''}`.toLowerCase();
        if (cat === 'ropa') return /sudadera|camiset|polo|pantalon|pantalón|polar|forro|calcetin|calcetín|braga|guante|bufanda|gorro|gorra|bañador|banador|toalla|chandal|anorak|chaqueta/.test(text);
        if (cat === 'cantimplora') return /cantimplora|botella|poto|plato|cubierto|vaso|fiambrera|termo|navaja/.test(text);
        if (cat === 'calzado') return /bota|zapatilla|chancla|calzado|zapato|sandalia/.test(text);
        if (cat === 'saco') return /saco|esterilla|aislante|colchoneta|manta|cojin|funda/.test(text);
        return true;
    };

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
        if (cajonSub) cajonSub.textContent = `${cajon.subtitle} · (${cajon.items.length} prendas en esta carpeta de Google Drive)`;
        if (openDriveBtn) {
            openDriveBtn.style.display = '';
            openDriveBtn.href = cajon.driveUrl || 'https://drive.google.com';
        }

        // Actualizar selector superior de Mini-Estrellas (Cajones)
        if (sw) {
            sw.innerHTML = LOST_CAJONES_DATA.map((cj, i) => `
                <button type="button" class="star-node-chip ${i === activeLostCajonIdx ? 'active' : ''}" data-cajon-switch="${i}">
                    <span>📦 ${cj.starSymbol}</span>
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
                        <span>📁 ${cj.folderName} (${cj.items.length} prendas)</span>
                    </div>
                </button>
            `).join('');
            miniMap.querySelectorAll('[data-cajon-node]').forEach(btn => {
                btn.addEventListener('click', () => {
                    renderLostCajonView(parseInt(btn.getAttribute('data-cajon-node'), 10));
                });
            });
        }

        // Renderizar galería de fotos de objetos perdidos del Cajón seleccionado con búsqueda y filtros
        const renderPhotos = () => {
            const searchInput = document.getElementById('lzPhotoSearch');
            const clearBtn = document.getElementById('lzClearSearchBtn');
            const q = (searchInput?.value || '').toLowerCase().trim();

            if (clearBtn) {
                clearBtn.style.display = q ? 'flex' : 'none';
            }

            if (!grid) return;

            if (!cajon.items || cajon.items.length === 0) {
                grid.innerHTML = `<p style="grid-column: 1 / -1; padding: 40px 20px; text-align: center; color: rgba(255,255,255,0.7); font-size: 1rem;">Este cajón está vacío actualmente en Google Drive.</p>`;
                return;
            }

            const filtered = cajon.items.filter(it => {
                const matchCategory = checkLostCategoryMatch(it, activeLostCategory);
                if (!matchCategory) return false;
                if (!q) return true;
                return (it.name && it.name.toLowerCase().includes(q)) ||
                       (it.desc && it.desc.toLowerCase().includes(q)) ||
                       (it.file && it.file.toLowerCase().includes(q));
            });

            if (filtered.length === 0) {
                grid.innerHTML = `<p style="grid-column: 1 / -1; padding: 40px 20px; text-align: center; color: rgba(255,255,255,0.7); font-size: 1rem;">No hay prendas que coincidan con los filtros seleccionados.</p>`;
                return;
            }

            grid.innerHTML = filtered.map(it => {
                const imgSrc = it.img || it.photoUrl || '';
                return `
                <article class="lost-photo-card" data-item-name="${it.name}">
                    <div class="lost-photo-art" title="Clic para ampliar foto">
                        ${it.svg ? it.svg : `<img src="${imgSrc}" alt="${it.name}" loading="lazy" referrerpolicy="no-referrer">`}
                        <span class="lost-drive-file-chip">📄 ${it.file}</span>
                    </div>
                    <div class="lost-photo-body">
                        <div>
                            <h4>${it.name}</h4>
                            <p>${it.desc}</p>
                        </div>
                        <div class="lost-photo-footer">
                            <span class="star-pillar-tag">📍 Sede Rueda 53</span>
                            <button type="button" class="lost-claim-btn" data-claim-item="${it.name}">🙋‍♂️ ¡Es mío! Reclamar</button>
                        </div>
                    </div>
                </article>
            `;
            }).join('');

            grid.querySelectorAll('.lost-photo-art').forEach(art => {
                art.addEventListener('click', () => {
                    const img = art.querySelector('img');
                    if (img && img.src) {
                        const card = art.closest('.lost-photo-card');
                        const title = card?.querySelector('h4')?.textContent || 'Prenda u Objeto Perdido';
                        const file = art.querySelector('.lost-drive-file-chip')?.textContent || '';
                        openLightbox(img.src, title, `${cajon.folderName} · ${file}`);
                    }
                });
            });

            grid.querySelectorAll('[data-claim-item]').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const itemName = btn.getAttribute('data-claim-item');
                    const banner = document.getElementById('lzClaimBanner');
                    const waText = `Hola Acrux, he visto en la web en El Baúl la prenda "${itemName}" (${cajon.folderName}) y es mía. Me gustaría pasar a recogerla este sábado por la base de Carretera de Rueda 53. ¡Muchas gracias!`;
                    const waUrl = `https://wa.me/34616289119?text=${encodeURIComponent(waText)}`;
                    if (banner) {
                        banner.style.display = 'block';
                        banner.innerHTML = `<strong>✅ Solicitud registrada para «${itemName}» (${cajon.folderName}):</strong> Hemos abierto WhatsApp para avisar a Coordinación. Pásate cualquier sábado de <strong>16:30 a 19:00 h</strong> por nuestra Base de <strong>Carretera de Rueda, 53</strong> para recogerlo.`;
                    }
                    window.open(waUrl, '_blank', 'noopener');
                });
            });
        };

        // Escuchadores de filtros por categoría
        document.querySelectorAll('#lzCategoryFilters .lost-filter-chip').forEach(btn => {
            btn.onclick = () => {
                document.querySelectorAll('#lzCategoryFilters .lost-filter-chip').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                activeLostCategory = btn.getAttribute('data-cat') || 'all';
                renderPhotos();
            };
        });

        // Escuchador de buscador reactivo
        const searchInput = document.getElementById('lzPhotoSearch');
        if (searchInput) {
            searchInput.oninput = renderPhotos;
        }

        const clearBtn = document.getElementById('lzClearSearchBtn');
        if (clearBtn && searchInput) {
            clearBtn.onclick = () => {
                searchInput.value = '';
                clearBtn.style.display = 'none';
                renderPhotos();
            };
        }

        renderPhotos();
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
        const diveTime = wasAlreadyOpen ? 100 : 180;
        triggerStarDiveFlash(targetWx, targetWy, wasAlreadyOpen ? 160 : 260);

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

    function openAcruxSuperZoom() {
        const sec0 = SECTORS[0];
        const acrux = sec0.stars[0];
        const targetWx = sec0.worldX + (acrux ? acrux.dx : 12);
        const targetWy = sec0.worldY + (acrux ? acrux.dy : 172);

        clearTimeout(diveTabTimer);
        isOverviewMode = false;
        document.body.classList.remove('is-overview-mode');

        targetSectorProgress = 0;
        activeSectorIdx = 0;
        selectedSubIdx = 0;

        superZoomState = {
            type: 'acrux',
            index: 0,
            wx: targetWx,
            wy: targetWy,
            zoom: 24.0
        };

        document.body.classList.add('is-superzoom-open');
        triggerStarDiveFlash(targetWx, targetWy, 260);

        elUnitZoomOverlay?.classList.remove('is-open');
        elUnitZoomOverlay?.setAttribute('aria-hidden', 'true');
        elCampZoomOverlay?.classList.remove('is-open');
        elCampZoomOverlay?.setAttribute('aria-hidden', 'true');
        elLostZoomOverlay?.classList.remove('is-open');
        elLostZoomOverlay?.setAttribute('aria-hidden', 'true');

        diveTabTimer = setTimeout(() => {
            openDrawerModal('identity');
        }, 180);
    }

    function closeAllSuperZooms(resetPan = true) {
        clearTimeout(diveTabTimer);
        closeLightbox();
        stopUnitLakeOrbitLoop();
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

        const defaultCoords = [
            {
                name: 'JJ',
                role: 'Coordinador General de Grupo',
                phone: '616289119',
                displayPhone: '616 28 91 19',
                photoUrl: null
            },
            {
                name: 'Raksha',
                role: 'Coordinadora de Grupo',
                phone: '619202068',
                displayPhone: '619 20 20 68',
                photoUrl: null
            },
            {
                name: 'Hugo',
                role: 'Equipo de Coordinación',
                phone: '616289119',
                displayPhone: '616 28 91 19',
                photoUrl: null
            }
        ];

        const coordsList = (coordinadoresDrive && Array.isArray(coordinadoresDrive) && coordinadoresDrive.length > 0)
            ? coordinadoresDrive.map(c => {
                const rawPhone = (c.telefono || c.phone || '616289119').replace(/\s+/g, '');
                return {
                    name: c.name || 'Coordinación',
                    role: c.cargo || c.role || 'Equipo de Coordinación',
                    phone: rawPhone,
                    displayPhone: c.telefono || c.phone || '616 28 91 19',
                    photoUrl: c.fotoUrl || c.cromoUrl || c.photoUrl || null
                };
            })
            : defaultCoords;

        if (mode === 'bases') {
            drawerKicker.textContent = 'SECTOR V · COORDENADAS OPERATIVAS E INSCRIPCIÓN';
            drawerTitle.innerHTML = 'Nuestras <span class="ice-italic">Bases y Contacto</span>';

            drawerBody.innerHTML = `
                <!-- 1. BLOQUE BASES DEL GRUPO (SEDE OFICIAL RUEDA 53) -->
                <div class="bases-modal-section">
                    <div class="bases-section-title-row">
                        <span class="bases-pill-badge">📍 01 · BASES DEL GRUPO</span>
                        <h3>Sede Oficial de Acrux 518</h3>
                        <p>Punto de encuentro semanal para las 5 ramas scout, actividades ordinarias y reuniones:</p>
                    </div>

                    <div class="bases-locations-grid">
                        <article class="base-location-card" style="border-color: rgba(217, 56, 58, 0.45);">
                            <div>
                                <span class="base-type-badge">BASE PRINCIPAL · REUNIONES DE SÁBADO</span>
                                <h4>Carretera de Rueda, 53 (CP 47008, Valladolid)</h4>
                                <p class="base-schedule">🕓 <strong>Sábados de 16:30 a 19:00 h</strong> (calendario escolar lectivo)</p>
                            </div>
                            <p class="base-desc">Sede oficial del Grupo Scout ACRUX 518 en Valladolid. Aquí arrancan y terminan nuestras actividades de sábado, juegos de ciudad, asambleas de familias y almacén de intendencia.</p>
                            <div class="base-actions">
                                <a href="https://maps.google.com/?q=Carretera+de+Rueda+53+Valladolid" target="_blank" rel="noopener" class="btn-cosmos-primary" style="padding:0.5rem 1.05rem; font-size:0.8rem;">
                                    <span>🗺️ Abrir en Google Maps</span>
                                    <span class="btn-arrow">↗</span>
                                </a>
                            </div>
                        </article>
                    </div>
                </div>

                <!-- 2. BLOQUE DE COORDINACIÓN CON FOTO Y ACCIÓN EN 1 CLIC -->
                <div class="bases-modal-section" style="margin-top: 1.6rem;">
                    <div class="bases-section-title-row">
                        <span class="bases-pill-badge">👥 02 · EQUIPO DE COORDINACIÓN</span>
                        <h3>Canal Directo con Coordinación</h3>
                        <p>Atención directa para familias y nuevos jóvenes. Contacta en 1 clic:</p>
                    </div>

                    <div class="coordinators-action-grid">
                        ${coordsList.map(c => `
                            <article class="coordinator-action-card">
                                <div style="display:flex; align-items:center; gap:0.95rem;">
                                    <div class="coord-avatar-frame">
                                        ${c.photoUrl ? `
                                            <img src="${c.photoUrl}" alt="${c.name}" class="coord-avatar-img" referrerpolicy="no-referrer">
                                        ` : `
                                            <div class="coord-avatar-fallback">⚜️</div>
                                        `}
                                    </div>
                                    <div class="coord-info-col">
                                        <strong class="coord-name">${c.name}</strong>
                                        <span class="coord-role">${c.role}</span>
                                        <span class="coord-phone-text">📞 ${c.displayPhone}</span>
                                    </div>
                                </div>
                                <div class="coord-btn-row">
                                    <a href="https://wa.me/34${c.phone}?text=${encodeURIComponent('Hola ' + c.name + ', me pongo en contacto desde la web del Grupo Scout Acrux 518 para pedir información.')}" 
                                       target="_blank" rel="noopener" class="btn-coord-action btn-coord-wa">
                                        <span>💬 WhatsApp</span>
                                    </a>
                                    <a href="tel:+34${c.phone}" class="btn-coord-action btn-coord-call">
                                        <span>📞 Llamar</span>
                                    </a>
                                </div>
                            </article>
                        `).join('')}
                    </div>
                </div>

                <!-- 3. PASO A PASO: ¿QUIERES VENIR A PROBAR? + FORMULARIO RÁPIDO -->
                <div class="bases-modal-section" style="margin-top: 1.6rem;">
                    <div class="bases-section-title-row">
                        <span class="bases-pill-badge">⚜️ 03 · SÁBADO DE PRUEBA</span>
                        <h3>¿Quieres apuntarte o venir a probar un sábado?</h3>
                        <p>El primer sábado es totalmente gratuito y sin compromiso. ¡Ven a conocernos!</p>
                    </div>

                    <!-- 3 Pasos Visuales -->
                    <div class="bases-steps-grid">
                        <div class="step-card">
                            <div class="step-num">01</div>
                            <strong>Elige la Unidad</strong>
                            <p>Según la edad del joven (de 6 a 21 años: Castores, Manada, Tropa, Escultas o Clan).</p>
                        </div>
                        <div class="step-card">
                            <div class="step-num">02</div>
                            <strong>Ven a la Base</strong>
                            <p>Te esperamos un sábado a las 16:30 h en Carretera de Rueda, 53 con ropa cómoda.</p>
                        </div>
                        <div class="step-card">
                            <div class="step-num">03</div>
                            <strong>¡Vive la Aventura!</strong>
                            <p>Jugará y compartirá la tarde con sus compañeros de rama y los scouters.</p>
                        </div>
                    </div>

                    <!-- Formulario Rápido -->
                    <div class="quick-signup-box">
                        <h4>Avisar a Coordinación para este sábado</h4>
                        <p>Rellena este breve formulario y te abriremos el mensaje de WhatsApp ya redactado para coordinar tu llegada:</p>
                        <form id="basesContactForm">
                            <div class="signup-inputs-grid">
                                <input type="text" id="bcName" class="dossier-form-input" required placeholder="Nombre de madre, padre o joven" style="margin:0;">
                                <input type="tel" id="bcPhone" class="dossier-form-input" required placeholder="Teléfono de contacto" style="margin:0;">
                                <select id="bcUnit" class="dossier-form-input" style="margin:0;">
                                    <option value="Castores (6 a 8 años)">1 · Castores · Colonia Ohiensis (6 a 8 años)</option>
                                    <option value="Manada (8 a 11 años)">2 · Manada · Khanhiwara (8 a 11 años)</option>
                                    <option value="Tropa (11 a 14 años)">3 · Tropa · Lohengrin (11 a 14 años)</option>
                                    <option value="Unidad Esculta (14 a 17 años)">4 · Unidad Esculta · Trea (14 a 17 años)</option>
                                    <option value="Clan Rover (17 a 21 años)">5 · Clan Rover · Ama Dablam (17 a 21 años)</option>
                                </select>
                            </div>
                            <div class="signup-action-row" style="margin-top:0.85rem;">
                                <button type="submit" class="btn-cosmos-primary" style="padding:0.55rem 1.15rem;">
                                    <span>💬 Enviar Solicitud por WhatsApp a Coordinación</span>
                                    <span class="btn-arrow">↗</span>
                                </button>
                            </div>
                            <div id="bcSuccessMsg" class="signup-success-feedback" style="display:none;"></div>
                        </form>
                    </div>
                </div>

                <!-- 4. BLOQUE TODAS LAS REDES SOCIALES DEL GRUPO -->
                <div class="bases-modal-section" style="margin-top: 1.6rem;">
                    <div class="bases-section-title-row">
                        <span class="bases-pill-badge">📱 04 · REDES SOCIALES DEL GRUPO</span>
                        <h3>Canales Oficiales de Acrux 518</h3>
                        <p>Sigue las salidas, acampadas, fotos semanales y avisos en nuestras redes oficiales:</p>
                    </div>

                    <div class="group-socials-grid">
                        <a href="https://www.instagram.com/gruposcoutacrux518/" target="_blank" rel="noopener" class="group-social-card is-instagram">
                            <div class="group-social-header">
                                <div class="group-social-icon">📸</div>
                                <div class="group-social-info">
                                    <strong>Instagram General</strong>
                                    <span>@gruposcoutacrux518</span>
                                </div>
                            </div>
                            <p class="group-social-desc">Cuenta oficial del grupo: fotos de actividades, avisos de rondas solares y campamentos.</p>
                            <span class="group-social-link-btn">Ver Perfil Oficial ↗</span>
                        </a>

                        <a href="https://www.instagram.com/escultas_trea/" target="_blank" rel="noopener" class="group-social-card is-instagram">
                            <div class="group-social-header">
                                <div class="group-social-icon">📸</div>
                                <div class="group-social-info">
                                    <strong>Unidad Esculta Trea</strong>
                                    <span>@escultas_trea</span>
                                </div>
                            </div>
                            <p class="group-social-desc">Red oficial de la rama esculta (14 a 17 años): raids, vivacs y Empresas Escultas.</p>
                            <span class="group-social-link-btn">Ver Perfil de Trea ↗</span>
                        </a>

                        <a href="https://www.instagram.com/clan_amadablam/" target="_blank" rel="noopener" class="group-social-card is-instagram">
                            <div class="group-social-header">
                                <div class="group-social-icon">📸</div>
                                <div class="group-social-info">
                                    <strong>Clan Rover Ama Dablam</strong>
                                    <span>@clan_amadablam</span>
                                </div>
                            </div>
                            <p class="group-social-desc">Red oficial de los Rovers (17 a 21 años): proyectos de servicio, montaña y rutas.</p>
                            <span class="group-social-link-btn">Ver Perfil del Clan ↗</span>
                        </a>

                        <a href="https://www.facebook.com/GrupoScoutAcrux518" target="_blank" rel="noopener" class="group-social-card is-facebook">
                            <div class="group-social-header">
                                <div class="group-social-icon">📘</div>
                                <div class="group-social-info">
                                    <strong>Página de Facebook</strong>
                                    <span>Grupo Scout Acrux 518</span>
                                </div>
                            </div>
                            <p class="group-social-desc">Página en Facebook para familias y antiguos miembros del grupo scout en Valladolid.</p>
                            <span class="group-social-link-btn">Abrir Facebook ↗</span>
                        </a>

                        <a href="mailto:gruposcoutacrux518@gmail.com" class="group-social-card is-email">
                            <div class="group-social-header">
                                <div class="group-social-icon">✉️</div>
                                <div class="group-social-info">
                                    <strong>Correo Oficial</strong>
                                    <span>gruposcoutacrux518@gmail.com</span>
                                </div>
                            </div>
                            <p class="group-social-desc">Atención formal para trámites de inscripción, documentación y consultas institucionales.</p>
                            <span class="group-social-link-btn">Escribir Correo ↗</span>
                        </a>
                    </div>
                </div>
            `;

            document.getElementById('basesContactForm')?.addEventListener('submit', (e) => {
                e.preventDefault();
                const name = document.getElementById('bcName')?.value || '';
                const phone = document.getElementById('bcPhone')?.value || '';
                const unit = document.getElementById('bcUnit')?.value || '';
                const targetCoord = coordsList[0] || defaultCoords[0];
                const cleanTargetPhone = (targetCoord.phone || '616289119').replace(/\s+/g, '');

                const waText = `Hola ${targetCoord.name}, me pongo en contacto desde la web del Grupo Scout Acrux 518.\n\nSoy ${name} (Tel: ${phone}). Nos gustaría venir a probar un sábado a la base de Carretera de Rueda 53 con la rama: ${unit}. ¿Podríais confirmarnos el horario de este sábado? ¡Gracias!`;
                const waUrl = `https://wa.me/34${cleanTargetPhone}?text=${encodeURIComponent(waText)}`;

                const msg = document.getElementById('bcSuccessMsg');
                if (msg) {
                    msg.style.display = 'block';
                    msg.innerHTML = `
                        <strong>⚜️ ¡Solicitud preparada, ${name}!</strong><br>
                        Abriendo WhatsApp para avisar a <strong>${targetCoord.name}</strong> (${targetCoord.displayPhone}). Si la ventana no se abre automáticamente, <a href="${waUrl}" target="_blank" rel="noopener" style="color:#FFF; text-decoration:underline; font-weight:600;">pulsa aquí para enviar el mensaje</a>. ¡Te esperamos este sábado a las 16:30 h en Carretera de Rueda, 53!
                    `;
                }
                window.open(waUrl, '_blank', 'noopener');
            });
        } else {
            drawerKicker.textContent = 'SECTOR I · CRUX AUSTRALIS · α ACRUX (ESTRELLA GUÍA)';
            drawerTitle.innerHTML = 'Acrux 518 · <span class="ice-italic">Historia, Bases y Contacto</span>';
            drawerBody.innerHTML = `
                <!-- Barra de Navegación Rápida Interna -->
                <nav class="drawer-anchor-nav" aria-label="Secciones de Acrux">
                    <a href="#acrux-historia" class="drawer-anchor-pill">✦ 01 · HISTORIA Y VALORES</a>
                    <a href="#acrux-ramas" class="drawer-anchor-pill">🌲 02 · 5 RAMAS SCOUT</a>
                    <a href="#acrux-bases" class="drawer-anchor-pill">📍 03 · BASES Y HORARIOS</a>
                    <a href="#acrux-coordinacion" class="drawer-anchor-pill">👥 04 · COORDINACIÓN</a>
                    <a href="#acrux-prueba" class="drawer-anchor-pill">🎒 05 · VEN A PROBAR</a>
                    <a href="#acrux-redes" class="drawer-anchor-pill">📱 06 · REDES OFICIALES</a>
                </nav>

                <div class="identity-modal-content">
                    <!-- 1. BLOQUE IDENTIDAD E HISTORIA -->
                    <div id="acrux-historia" class="bases-modal-section">
                        <div class="identity-hero-badge">
                            <span class="bases-pill-badge">⚜️ FUNDADO EN VALLADOLID · DESDE 1977</span>
                            <h3>Grupo Scout ACRUX Nº 518</h3>
                            <p>El faro que nos da nombre y casi medio siglo de escultismo activo en Valladolid:</p>
                        </div>

                        <div class="identity-story-grid">
                            <article class="identity-story-card">
                                <div class="story-card-icon">✦</div>
                                <div class="story-card-body">
                                    <h4>¿Por qué Acrux? · El Faro de los Exploradores</h4>
                                    <p>En el firmamento brilla la constelación de la Cruz del Sur (Crux). En su base se encuentra <strong>Acrux (Alfa Crucis)</strong>, la estrella más luminosa de toda la constelación. Desde hace siglos, navegantes y exploradores han utilizado Acrux como la brújula celestial definitiva para orientarse hacia el sur verdadero cuando caía la noche.</p>
                                    <p>Por eso, en 1977, nuestro grupo adoptó el nombre de <strong>ACRUX</strong>: el símbolo de una guía firme, de luz en la noche y de rumbo compartido.</p>
                                </div>
                            </article>

                            <article class="identity-story-card">
                                <div class="story-card-icon">⛺</div>
                                <div class="story-card-body">
                                    <h4>Casi 50 Años de Escultismo en Valladolid (1977 – 2026)</h4>
                                    <p>Fundado en Valladolid en 1977, el Grupo Scout Acrux 518 lleva casi medio siglo acompañando el crecimiento de generaciones de niños, niñas y jóvenes a través del escultismo.</p>
                                    <p>Basados en el método scout ideado por Baden-Powell —aprender haciendo, vida en pequeños grupos, contacto vivo con la naturaleza y servicio a la comunidad—, educamos en valores para formar personas libres, críticas y solidarias.</p>
                                </div>
                            </article>

                            <article class="identity-story-card" id="acrux-ramas">
                                <div class="story-card-icon">🌲</div>
                                <div class="story-card-body">
                                    <h4>Cinco Ramas Educativas de 6 a 21 Años</h4>
                                    <p>Acompañamos a cada joven según su momento de desarrollo a lo largo de 5 etapas formativas continuas:</p>
                                    <ul style="margin: 0.35rem 0 0 1.2rem; padding: 0; color: var(--ice-grey); font-size: 0.84rem; line-height: 1.6;">
                                        <li><strong>Castores · Colonia Ohiensis</strong> (6 a 8 años) · Lema: <em>Compartir</em></li>
                                        <li><strong>Manada · Khanhiwara</strong> (8 a 11 años) · Lema: <em>Haremos lo mejor</em></li>
                                        <li><strong>Tropa · Lohengrin</strong> (11 a 14 años) · Lema: <em>Siempre Listos</em></li>
                                        <li><strong>Unidad Esculta · Trea</strong> (14 a 17 años) · Lema: <em>Unidad</em></li>
                                        <li><strong>Clan Rover · Ama Dablam</strong> (17 a 21 años) · Lema: <em>Servir</em></li>
                                    </ul>
                                </div>
                            </article>

                            <article class="identity-story-card">
                                <div class="story-card-icon">📍</div>
                                <div class="story-card-body">
                                    <h4>Comunidad y Pertenencia Oficial</h4>
                                    <p>Pertenecemos a <strong>ASDE Exploradores de Castilla y León</strong> y a la <strong>Federación de Scouts de España (ASDE)</strong>. Nuestras reuniones ordinarias tienen lugar todos los sábados de 16:30 a 19:00 h en nuestra base de <strong>Carretera de Rueda, 53 (Valladolid)</strong>.</p>
                                </div>
                            </article>
                        </div>
                    </div>

                    <!-- 2. BLOQUE BASES DEL GRUPO (SEDE OFICIAL RUEDA 53) -->
                    <div id="acrux-bases" class="bases-modal-section" style="margin-top: 1.8rem;">
                        <div class="bases-section-title-row">
                            <span class="bases-pill-badge">📍 03 · BASES DEL GRUPO</span>
                            <h3>Sede Oficial de Acrux 518</h3>
                            <p>Punto de encuentro semanal para las 5 ramas scout, actividades ordinarias y reuniones:</p>
                        </div>

                        <div class="bases-locations-grid">
                            <article class="base-location-card" style="border-color: rgba(217, 56, 58, 0.45);">
                                <div>
                                    <span class="base-type-badge">BASE PRINCIPAL · REUNIONES DE SÁBADO</span>
                                    <h4>Carretera de Rueda, 53 (CP 47008, Valladolid)</h4>
                                    <p class="base-schedule">🕓 <strong>Sábados de 16:30 a 19:00 h</strong> (calendario escolar lectivo)</p>
                                </div>
                                <p class="base-desc">Sede oficial del Grupo Scout ACRUX 518 en Valladolid. Aquí arrancan y terminan nuestras actividades de sábado, juegos de ciudad, asambleas de familias y almacén de intendencia.</p>
                                <div class="base-actions">
                                    <a href="https://maps.google.com/?q=Carretera+de+Rueda+53+Valladolid" target="_blank" rel="noopener" class="btn-cosmos-primary" style="padding:0.5rem 1.05rem; font-size:0.8rem;">
                                        <span>🗺️ Abrir en Google Maps</span>
                                        <span class="btn-arrow">↗</span>
                                    </a>
                                </div>
                            </article>
                        </div>
                    </div>

                    <!-- 3. BLOQUE DE COORDINACIÓN CON FOTO Y ACCIÓN EN 1 CLIC -->
                    <div id="acrux-coordinacion" class="bases-modal-section" style="margin-top: 1.8rem;">
                        <div class="bases-section-title-row">
                            <span class="bases-pill-badge">👥 04 · EQUIPO DE COORDINACIÓN</span>
                            <h3>Canal Directo con Coordinación</h3>
                            <p>Atención directa para familias y nuevos jóvenes. Contacta en 1 clic:</p>
                        </div>

                        <div class="coordinators-action-grid">
                            ${coordsList.map(c => `
                                <article class="coordinator-action-card">
                                    <div style="display:flex; align-items:center; gap:0.95rem;">
                                        <div class="coord-avatar-frame">
                                            ${c.photoUrl ? `
                                                <img src="${c.photoUrl}" alt="${c.name}" class="coord-avatar-img" referrerpolicy="no-referrer">
                                            ` : `
                                                <div class="coord-avatar-fallback">⚜️</div>
                                            `}
                                        </div>
                                        <div class="coord-info-col">
                                            <strong class="coord-name">${c.name}</strong>
                                            <span class="coord-role">${c.role}</span>
                                            <span class="coord-phone-text">📞 ${c.displayPhone}</span>
                                        </div>
                                    </div>
                                    <div class="coord-btn-row">
                                        <a href="https://wa.me/34${c.phone}?text=${encodeURIComponent('Hola ' + c.name + ', me pongo en contacto desde la web del Grupo Scout Acrux 518 para pedir información.')}" 
                                           target="_blank" rel="noopener" class="btn-coord-action btn-coord-wa">
                                            <span>💬 WhatsApp</span>
                                        </a>
                                        <a href="tel:+34${c.phone}" class="btn-coord-action btn-coord-call">
                                            <span>📞 Llamar</span>
                                        </a>
                                    </div>
                                </article>
                            `).join('')}
                        </div>
                    </div>

                    <!-- 4. PASO A PASO: ¿QUIERES VENIR A PROBAR? + FORMULARIO RÁPIDO -->
                    <div id="acrux-prueba" class="bases-modal-section" style="margin-top: 1.8rem;">
                        <div class="bases-section-title-row">
                            <span class="bases-pill-badge">⚜️ 05 · SÁBADO DE PRUEBA</span>
                            <h3>¿Quieres apuntarte o venir a probar un sábado?</h3>
                            <p>El primer sábado es totalmente gratuito y sin compromiso. ¡Ven a conocernos!</p>
                        </div>

                        <div class="bases-steps-grid">
                            <div class="step-card">
                                <div class="step-num">01</div>
                                <strong>Elige la Unidad</strong>
                                <p>Según la edad del joven (de 6 a 21 años: Castores, Manada, Tropa, Escultas o Clan).</p>
                            </div>
                            <div class="step-card">
                                <div class="step-num">02</div>
                                <strong>Ven a la Base</strong>
                                <p>Te esperamos un sábado a las 16:30 h en Carretera de Rueda, 53 con ropa cómoda.</p>
                            </div>
                            <div class="step-card">
                                <div class="step-num">03</div>
                                <strong>¡Vive la Aventura!</strong>
                                <p>Jugará y compartirá la tarde con sus compañeros de rama y los scouters.</p>
                            </div>
                        </div>

                        <div class="quick-signup-box">
                            <h4>Avisar a Coordinación para este sábado</h4>
                            <p>Rellena este breve formulario y te abriremos el mensaje de WhatsApp ya redactado para coordinar tu llegada:</p>
                            <form id="acruxContactForm">
                                <div class="signup-inputs-grid">
                                    <input type="text" id="acruxName" class="dossier-form-input" required placeholder="Nombre de madre, padre o joven" style="margin:0;">
                                    <input type="tel" id="acruxPhone" class="dossier-form-input" required placeholder="Teléfono de contacto" style="margin:0;">
                                    <select id="acruxUnit" class="dossier-form-input" style="margin:0;">
                                        <option value="Castores (6 a 8 años)">1 · Castores · Colonia Ohiensis (6 a 8 años)</option>
                                        <option value="Manada (8 a 11 años)">2 · Manada · Khanhiwara (8 a 11 años)</option>
                                        <option value="Tropa (11 a 14 años)">3 · Tropa · Lohengrin (11 a 14 años)</option>
                                        <option value="Escultas (14 a 17 años)">4 · Unidad Esculta · Trea (14 a 17 años)</option>
                                        <option value="Clan Rover (17 a 21 años)">5 · Clan Rover · Ama Dablam (17 a 21 años)</option>
                                    </select>
                                </div>
                                <div class="signup-action-row" style="margin-top:0.85rem;">
                                    <button type="submit" class="btn-cosmos-primary" style="padding:0.55rem 1.15rem;">
                                        <span>💬 Enviar Solicitud por WhatsApp a Coordinación</span>
                                        <span class="btn-arrow">↗</span>
                                    </button>
                                </div>
                                <div id="acruxSuccessMsg" class="signup-success-feedback" style="display:none;"></div>
                            </form>
                        </div>
                    </div>

                    <!-- 5. BLOQUE TODAS LAS REDES SOCIALES DEL GRUPO -->
                    <div id="acrux-redes" class="bases-modal-section" style="margin-top: 1.8rem;">
                        <div class="bases-section-title-row">
                            <span class="bases-pill-badge">📱 06 · REDES SOCIALES DEL GRUPO</span>
                            <h3>Canales Oficiales de Acrux 518</h3>
                            <p>Sigue las salidas, acampadas, fotos semanales y avisos en nuestras redes oficiales:</p>
                        </div>

                        <div class="group-socials-grid">
                            <a href="https://www.instagram.com/gruposcoutacrux518/" target="_blank" rel="noopener" class="group-social-card is-instagram">
                                <div class="group-social-header">
                                    <div class="group-social-icon">📸</div>
                                    <div class="group-social-info">
                                        <strong>Instagram General</strong>
                                        <span>@gruposcoutacrux518</span>
                                    </div>
                                </div>
                                <p class="group-social-desc">Cuenta oficial del grupo: fotos de actividades, avisos de rondas solares y campamentos.</p>
                                <span class="group-social-link-btn">Ver Perfil Oficial ↗</span>
                            </a>

                            <a href="https://www.instagram.com/escultas_trea/" target="_blank" rel="noopener" class="group-social-card is-instagram">
                                <div class="group-social-header">
                                    <div class="group-social-icon">📸</div>
                                    <div class="group-social-info">
                                        <strong>Unidad Esculta Trea</strong>
                                        <span>@escultas_trea</span>
                                    </div>
                                </div>
                                <p class="group-social-desc">Red oficial de la rama esculta (14 a 17 años): raids, vivacs y Empresas Escultas.</p>
                                <span class="group-social-link-btn">Ver Perfil de Trea ↗</span>
                            </a>

                            <a href="https://www.instagram.com/clan_amadablam/" target="_blank" rel="noopener" class="group-social-card is-instagram">
                                <div class="group-social-header">
                                    <div class="group-social-icon">📸</div>
                                    <div class="group-social-info">
                                        <strong>Clan Rover Ama Dablam</strong>
                                        <span>@clan_amadablam</span>
                                    </div>
                                </div>
                                <p class="group-social-desc">Red oficial de los Rovers (17 a 21 años): proyectos de servicio, montaña y rutas.</p>
                                <span class="group-social-link-btn">Ver Perfil del Clan ↗</span>
                            </a>

                            <a href="https://www.facebook.com/GrupoScoutAcrux518" target="_blank" rel="noopener" class="group-social-card is-facebook">
                                <div class="group-social-header">
                                    <div class="group-social-icon">📘</div>
                                    <div class="group-social-info">
                                        <strong>Página de Facebook</strong>
                                        <span>Grupo Scout Acrux 518</span>
                                    </div>
                                </div>
                                <p class="group-social-desc">Página en Facebook para familias y antiguos miembros del grupo scout en Valladolid.</p>
                                <span class="group-social-link-btn">Abrir Facebook ↗</span>
                            </a>

                            <a href="mailto:gruposcoutacrux518@gmail.com" class="group-social-card is-email">
                                <div class="group-social-header">
                                    <div class="group-social-icon">✉️</div>
                                    <div class="group-social-info">
                                        <strong>Correo Oficial</strong>
                                        <span>gruposcoutacrux518@gmail.com</span>
                                    </div>
                                </div>
                                <p class="group-social-desc">Atención formal para trámites de inscripción, documentación y consultas institucionales.</p>
                                <span class="group-social-link-btn">Escribir Correo ↗</span>
                            </a>
                        </div>
                    </div>

                    <div style="margin-top: 1.4rem; display: flex; gap: 0.75rem; flex-wrap: wrap;">
                        <button type="button" class="btn-cosmos-primary" id="btnIdentityToUnits" style="padding: 0.55rem 1.15rem;">
                            <span>Explorar las 5 Unidades</span>
                            <span class="btn-arrow">→</span>
                        </button>
                    </div>
                </div>
            `;

            document.getElementById('btnIdentityToUnits')?.addEventListener('click', () => {
                closeDrawerModal();
                goToSector(1, 0);
            });

            // Smooth scroll para los anclajes del menú de Acrux
            drawerBody.querySelectorAll('.drawer-anchor-pill').forEach(a => {
                a.addEventListener('click', (e) => {
                    e.preventDefault();
                    const targetId = a.getAttribute('href')?.replace('#', '');
                    const targetEl = document.getElementById(targetId);
                    if (targetEl) {
                        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                });
            });

            // Formulario de aviso de Acrux
            document.getElementById('acruxContactForm')?.addEventListener('submit', (e) => {
                e.preventDefault();
                const name = document.getElementById('acruxName')?.value || '';
                const phone = document.getElementById('acruxPhone')?.value || '';
                const unit = document.getElementById('acruxUnit')?.value || '';
                const targetCoord = coordsList[0] || defaultCoords[0];
                const cleanTargetPhone = (targetCoord.phone || '616289119').replace(/\s+/g, '');

                const waText = `Hola ${targetCoord.name}, me pongo en contacto desde la web del Grupo Scout Acrux 518.\n\nSoy ${name} (Tel: ${phone}). Nos gustaría venir a probar un sábado a la base de Carretera de Rueda 53 con la rama: ${unit}. ¿Podríais confirmarnos el horario de este sábado? ¡Gracias!`;
                const waUrl = `https://wa.me/34${cleanTargetPhone}?text=${encodeURIComponent(waText)}`;

                const msg = document.getElementById('acruxSuccessMsg');
                if (msg) {
                    msg.style.display = 'block';
                    msg.innerHTML = `
                        <strong>⚜️ ¡Solicitud preparada, ${name}!</strong><br>
                        Abriendo WhatsApp para avisar a <strong>${targetCoord.name}</strong> (${targetCoord.displayPhone}). Si la ventana no se abre automáticamente, <a href="${waUrl}" target="_blank" rel="noopener" style="color:#FFF; text-decoration:underline; font-weight:600;">pulsa aquí para enviar el mensaje</a>. ¡Te esperamos este sábado a las 16:30 h en Carretera de Rueda, 53!
                    `;
                }
                window.open(waUrl, '_blank', 'noopener');
            });
        }

        drawerBackdrop.classList.add('is-open');
        drawerBackdrop.setAttribute('aria-hidden', 'false');
    }

    function closeDrawerModal() {
        drawerBackdrop?.classList.remove('is-open');
        drawerBackdrop?.setAttribute('aria-hidden', 'true');
        if (superZoomState && superZoomState.type === 'acrux') {
            closeAllSuperZooms(true);
        }
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
                openAcruxSuperZoom();
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
                    } else if (hitNode.sectorIndex === 0) {
                        // En la Cruz del Sur, solo Acrux es interactiva y abre la historia
                        if (hitNode.id === 'acrux') {
                            openAcruxSuperZoom();
                        }
                    } else {
                        goToSector(hitNode.sectorIndex, hitNode.starIdx);
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
    document.getElementById('btnSectorVReturn')?.addEventListener('click', () => goToSector(0, 0));

    document.getElementById('btnPrevSector')?.addEventListener('click', () => {
        if (activeSectorIdx > 0) {
            goToSector(activeSectorIdx - 1, 0);
        } else {
            goToSector(SECTORS.length - 1, 0);
        }
    });

    document.getElementById('btnNextSector')?.addEventListener('click', () => {
        if (activeSectorIdx < SECTORS.length - 1) {
            goToSector(activeSectorIdx + 1, 0);
        } else {
            goToSector(0, 0);
        }
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
            if (elLightbox?.classList.contains('is-open')) {
                closeLightbox();
                return;
            }
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
            const sectorNames = [
                '01 / 04 · Cruz del Sur',
                '02 / 04 · Unidades',
                '03 / 04 · Campamentos',
                '04 / 04 · El Baúl'
            ];
            elProgressPercent.textContent = sectorNames[activeSectorIdx] || `0${activeSectorIdx + 1} / 0${SECTORS.length}`;
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
        // B. NEBULOSAS ATMOSFÉRICAS MULTICAPA Y RETÍCULAS DE CARTA ASTRONÓMICA POR SECTOR
        // ---------------------------------------------------------------------
        const sectorNebulaPalettes = [
            // Sector I (Cruz del Sur): carmesí imperial y azul profundo
            {
                outer: 'rgba(30, 64, 175, 0.045)',
                mid: 'rgba(176, 35, 36, 0.068)',
                inner: 'rgba(220, 38, 38, 0.042)',
                offsetX: -55,
                offsetY: 45
            },
            // Sector II (Unidades): turquesa / esmeralda estelar
            {
                outer: 'rgba(16, 185, 129, 0.038)',
                mid: 'rgba(56, 189, 248, 0.058)',
                inner: 'rgba(125, 211, 252, 0.042)',
                offsetX: 60,
                offsetY: -35
            },
            // Sector III (Campamentos): ámbar / dorado cálido
            {
                outer: 'rgba(217, 119, 6, 0.038)',
                mid: 'rgba(245, 158, 11, 0.054)',
                inner: 'rgba(253, 224, 71, 0.036)',
                offsetX: -45,
                offsetY: -40
            },
            // Sector IV (El Baúl): índigo / zafiro
            {
                outer: 'rgba(59, 130, 246, 0.040)',
                mid: 'rgba(99, 102, 241, 0.058)',
                inner: 'rgba(165, 180, 252, 0.040)',
                offsetX: 45,
                offsetY: 35
            }
        ];

        ctx.save();
        SECTORS.forEach((sec, idx) => {
            const sc = worldToScreen(sec.worldX, sec.worldY);
            const rOuter = Math.max(120, 420 * camera.zoom);
            const rInner = Math.max(70, 240 * camera.zoom);

            if (sc.x < -rOuter * 1.4 || sc.x > vw + rOuter * 1.4 ||
                sc.y < -rOuter * 1.4 || sc.y > vh + rOuter * 1.4) {
                return;
            }

            const pal = sectorNebulaPalettes[idx] || sectorNebulaPalettes[0];

            // Capa 1: Nebulosa exterior difusa (420 * camera.zoom)
            const gNeb1 = ctx.createRadialGradient(sc.x, sc.y, 0, sc.x, sc.y, rOuter);
            gNeb1.addColorStop(0, pal.mid);
            gNeb1.addColorStop(0.52, pal.outer);
            gNeb1.addColorStop(1, 'rgba(4, 4, 6, 0)');
            ctx.fillStyle = gNeb1;
            ctx.beginPath();
            ctx.arc(sc.x, sc.y, rOuter, 0, Math.PI * 2);
            ctx.fill();

            // Capa 2: Núcleo desplazado de polvo estelar (240 * camera.zoom)
            const nx = sc.x + pal.offsetX * camera.zoom;
            const ny = sc.y + pal.offsetY * camera.zoom;
            const gNeb2 = ctx.createRadialGradient(nx, ny, 0, nx, ny, rInner);
            gNeb2.addColorStop(0, pal.inner);
            gNeb2.addColorStop(0.55, pal.outer);
            gNeb2.addColorStop(1, 'rgba(4, 4, 6, 0)');
            ctx.fillStyle = gNeb2;
            ctx.beginPath();
            ctx.arc(nx, ny, rInner, 0, Math.PI * 2);
            ctx.fill();

            // Retícula astronómica sutil de carta de navegación celeste (radio 210 * camera.zoom + marcas cardinales)
            if (!superZoomState) {
                const retR = 210 * camera.zoom;
                ctx.save();
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
                ctx.lineWidth = 1;
                ctx.setLineDash([3, 7]);
                ctx.beginPath();
                ctx.arc(sc.x, sc.y, retR, 0, Math.PI * 2);
                ctx.stroke();
                ctx.setLineDash([]);

                // 4 Marcas cardinales sutiles (N, S, E, W)
                const tickLen = 9 * clamp(camera.zoom, 0.6, 1.4);
                ctx.beginPath();
                // Norte y Sur
                ctx.moveTo(sc.x, sc.y - retR - tickLen);
                ctx.lineTo(sc.x, sc.y - retR + tickLen);
                ctx.moveTo(sc.x, sc.y + retR - tickLen);
                ctx.lineTo(sc.x, sc.y + retR + tickLen);
                // Este y Oeste
                ctx.moveTo(sc.x - retR - tickLen, sc.y);
                ctx.lineTo(sc.x - retR + tickLen, sc.y);
                ctx.moveTo(sc.x + retR - tickLen, sc.y);
                ctx.lineTo(sc.x + retR + tickLen, sc.y);
                ctx.stroke();
                ctx.restore();
            }
        });

        // Hilo sutil entre los 4 sectores del Mapa Estelar
        ctx.beginPath();
        SECTORS.forEach((sec, idx) => {
            const sc = worldToScreen(sec.worldX, sec.worldY);
            if (idx === 0) ctx.moveTo(sc.x, sc.y);
            else ctx.lineTo(sc.x, sc.y);
        });
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
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
                    // En el Sector I (Cruz del Sur), solo Acrux es interactiva y cliqueable
                    if (nd.sectorIndex === 0 && nd.id !== 'acrux') {
                        // Las demás estrellas de la constelación son puramente astronómicas decorativas
                    } else {
                        closestDist = dM;
                        closestNode = nd;
                    }
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
                cursorLabel.textContent = (closestNode.clusterType === 'unit' || closestNode.clusterType === 'camp' || closestNode.sectorIndex === 3 || closestNode.id === 'acrux')
                    ? `✦ HIPERESPACIO A: ${closestNode.symbol}`
                    : `✦ ${closestNode.symbol}`;
            } else {
                cursorLabel.textContent = '';
            }
        }

        // ---------------------------------------------------------------------
        // E. LÍNEAS ASTRONÓMICAS RECTAS CON DEGRADADO LINEAL ENTRE NODOS
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

            if (!superZoomState && dMid < 160) {
                const inf = Math.pow(1 - dMid / 160, 1.6);
                ed.glow += (inf - ed.glow) * 0.2;
            } else {
                ed.glow += (0 - ed.glow) * 0.1;
            }

            const isFocusedSector = ed.sectorIndex === activeSectorIdx;
            const alphaEnd = Math.min(0.92, (isFocusedSector ? 0.58 : 0.24) + ed.glow * 0.38);
            const alphaMid = Math.min(0.75, alphaEnd * 0.42);

            ctx.save();
            ctx.beginPath();
            ctx.moveTo(ax, ay);
            ctx.lineTo(bx, by);

            let rgbBase = '255, 255, 255';
            let edgeShadow = 'rgba(255, 255, 255, 0.55)';

            if (anniversaryLerp > 0.2) {
                rgbBase = '212, 175, 55';
                edgeShadow = 'rgba(212, 175, 55, 0.65)';
            } else if (ed.sectorIndex === 3) {
                // Brillo cian estelar para «El Baúl» y sus cajones
                rgbBase = '186, 230, 253';
                edgeShadow = 'rgba(56, 189, 248, 0.55)';
            } else if (ed.sectorIndex === 2 || ed.clusterType === 'camp') {
                const isEasterEdge = (ed.nodeA && ed.nodeA.seasonType === 'easter') || (ed.nodeB && ed.nodeB.seasonType === 'easter');
                if (isEasterEdge) {
                    rgbBase = '167, 243, 208';
                    edgeShadow = 'rgba(110, 231, 183, 0.65)';
                } else {
                    rgbBase = '255, 246, 230';
                    edgeShadow = 'rgba(255, 215, 140, 0.60)';
                }
            } else if (ed.sectorIndex === 0) {
                edgeShadow = 'rgba(217, 56, 58, 0.45)';
            }

            const lineGrad = ctx.createLinearGradient(ax, ay, bx, by);
            lineGrad.addColorStop(0, `rgba(${rgbBase}, ${alphaEnd.toFixed(3)})`);
            lineGrad.addColorStop(0.5, `rgba(${rgbBase}, ${alphaMid.toFixed(3)})`);
            lineGrad.addColorStop(1, `rgba(${rgbBase}, ${alphaEnd.toFixed(3)})`);

            ctx.strokeStyle = lineGrad;
            ctx.lineWidth = (isFocusedSector ? 1.4 : 0.85) + ed.glow * 1.05;
            if (ed.glow > 0.08 || isFocusedSector) {
                ctx.shadowColor = edgeShadow;
                ctx.shadowBlur = 7 + ed.glow * 9;
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
            ctx.fillText('CONSTELACIÓN ESTIVAL · CAMPAMENTOS DE VERANO', scSummerTitle.x, scSummerTitle.y);

            // Título de la Constelación de Semana Santa (abajo)
            const scEasterTitle = worldToScreen(CAMPS_ORIGIN_X, CAMPS_ORIGIN_Y + 215);
            ctx.fillStyle = 'rgba(167, 243, 208, 0.52)';
            ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
            ctx.shadowBlur = 6;
            ctx.fillText('CONSTELACIÓN EQUINOCCIAL · SEMANA SANTA Y PRIMAVERA', scEasterTitle.x, scEasterTitle.y);

            ctx.restore();
        }

        // ---------------------------------------------------------------------
        // F. DIBUJO DE ESTRELLAS (HALO + DESTELLO ÓPTICO 4-POINT STARBURST)
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

            // Agujas de difracción óptica de 4 puntas (4-Point Starbursts) en estrellas principales
            if ((nd.isMainCross || nd.isClusterHub || nd.isBaulMain) && nd.id !== 'acrux') {
                const spikeLength = r * (4.2 + nd.hover * 1.4);
                const spikeAlpha = clamp((isHovered || isSelectedInSector ? 0.86 : 0.62) + nd.hover * 0.24, 0.35, 0.96);
                const spikeCoreRGB = anniversaryLerp > 0.35
                    ? '255, 243, 176'
                    : (nd.isRedStar ? '255, 163, 158' : '255, 255, 255');

                ctx.save();
                ctx.lineWidth = Math.max(1.1, r * 0.17);
                ctx.lineCap = 'round';

                // Aguja horizontal con gradiente lineal afilado
                const gHoriz = ctx.createLinearGradient(sx - spikeLength, sy, sx + spikeLength, sy);
                gHoriz.addColorStop(0, `rgba(${spikeCoreRGB}, 0)`);
                gHoriz.addColorStop(0.38, `rgba(${spikeCoreRGB}, ${(spikeAlpha * 0.32).toFixed(3)})`);
                gHoriz.addColorStop(0.5, `rgba(255, 255, 255, ${spikeAlpha.toFixed(3)})`);
                gHoriz.addColorStop(0.62, `rgba(${spikeCoreRGB}, ${(spikeAlpha * 0.32).toFixed(3)})`);
                gHoriz.addColorStop(1, `rgba(${spikeCoreRGB}, 0)`);
                ctx.strokeStyle = gHoriz;
                ctx.beginPath();
                ctx.moveTo(sx - spikeLength, sy);
                ctx.lineTo(sx + spikeLength, sy);
                ctx.stroke();

                // Aguja vertical con gradiente lineal afilado
                const gVert = ctx.createLinearGradient(sx, sy - spikeLength, sx, sy + spikeLength);
                gVert.addColorStop(0, `rgba(${spikeCoreRGB}, 0)`);
                gVert.addColorStop(0.38, `rgba(${spikeCoreRGB}, ${(spikeAlpha * 0.32).toFixed(3)})`);
                gVert.addColorStop(0.5, `rgba(255, 255, 255, ${spikeAlpha.toFixed(3)})`);
                gVert.addColorStop(0.62, `rgba(${spikeCoreRGB}, ${(spikeAlpha * 0.32).toFixed(3)})`);
                gVert.addColorStop(1, `rgba(${spikeCoreRGB}, 0)`);
                ctx.strokeStyle = gVert;
                ctx.beginPath();
                ctx.moveTo(sx, sy - spikeLength);
                ctx.lineTo(sx, sy + spikeLength);
                ctx.stroke();

                // Agujas diagonales suaves en hover o selección activa
                if (nd.hover > 0.05 || isSelectedInSector) {
                    const diagL = spikeLength * 0.56 * (isSelectedInSector ? Math.max(0.65, nd.hover) : nd.hover);
                    const diagAlpha = spikeAlpha * 0.55;
                    ctx.lineWidth = Math.max(0.9, r * 0.12);

                    const gDiag1 = ctx.createLinearGradient(sx - diagL, sy - diagL, sx + diagL, sy + diagL);
                    gDiag1.addColorStop(0, `rgba(${spikeCoreRGB}, 0)`);
                    gDiag1.addColorStop(0.5, `rgba(255, 255, 255, ${diagAlpha.toFixed(3)})`);
                    gDiag1.addColorStop(1, `rgba(${spikeCoreRGB}, 0)`);
                    ctx.strokeStyle = gDiag1;
                    ctx.beginPath();
                    ctx.moveTo(sx - diagL, sy - diagL);
                    ctx.lineTo(sx + diagL, sy + diagL);
                    ctx.stroke();

                    const gDiag2 = ctx.createLinearGradient(sx - diagL, sy + diagL, sx + diagL, sy - diagL);
                    gDiag2.addColorStop(0, `rgba(${spikeCoreRGB}, 0)`);
                    gDiag2.addColorStop(0.5, `rgba(255, 255, 255, ${diagAlpha.toFixed(3)})`);
                    gDiag2.addColorStop(1, `rgba(${spikeCoreRGB}, 0)`);
                    ctx.strokeStyle = gDiag2;
                    ctx.beginPath();
                    ctx.moveTo(sx - diagL, sy + diagL);
                    ctx.lineTo(sx + diagL, sy - diagL);
                    ctx.stroke();
                }

                ctx.restore();
            }

            // Resplandor monumental y destellos celestiales para α Acrux (Estrella Guía del Grupo)
            if (nd.id === 'acrux') {
                const acruxPulse = Math.sin(elapsed * 2.6) * 0.16 + 1.0;
                const acruxHaloR = r * 7.5 * acruxPulse;
                const gAcrux = ctx.createRadialGradient(sx, sy, 0, sx, sy, acruxHaloR);
                gAcrux.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
                gAcrux.addColorStop(0.18, 'rgba(255, 220, 220, 0.45)');
                gAcrux.addColorStop(0.45, 'rgba(217, 56, 58, 0.28)');
                gAcrux.addColorStop(0.75, 'rgba(217, 56, 58, 0.08)');
                gAcrux.addColorStop(1, 'rgba(217, 56, 58, 0)');
                ctx.fillStyle = gAcrux;
                ctx.beginPath();
                ctx.arc(sx, sy, acruxHaloR, 0, Math.PI * 2);
                ctx.fill();

                // Destellos celestiales en cruz de 4 puntas principales (estilo telescopio astronómico)
                const spikeLen = r * (4.2 + Math.sin(elapsed * 2.2) * 0.6);
                const spikeW = Math.max(1.3, r * 0.16);
                ctx.save();
                ctx.fillStyle = 'rgba(255, 255, 255, 0.90)';
                ctx.shadowColor = '#FFFFFF';
                ctx.shadowBlur = 14;

                // Eje horizontal
                ctx.beginPath();
                ctx.moveTo(sx - spikeLen, sy);
                ctx.lineTo(sx, sy - spikeW);
                ctx.lineTo(sx + spikeLen, sy);
                ctx.lineTo(sx, sy + spikeW);
                ctx.closePath();
                ctx.fill();

                // Eje vertical
                ctx.beginPath();
                ctx.moveTo(sx, sy - spikeLen);
                ctx.lineTo(sx + spikeW, sy);
                ctx.lineTo(sx, sy + spikeLen);
                ctx.lineTo(sx - spikeW, sy);
                ctx.closePath();
                ctx.fill();

                // 4 Puntas secundarias diagonales
                const diagLen = spikeLen * 0.52;
                const diagW = spikeW * 0.65;
                ctx.fillStyle = 'rgba(255, 225, 225, 0.60)';
                ctx.beginPath();
                ctx.moveTo(sx - diagLen * 0.707, sy - diagLen * 0.707);
                ctx.lineTo(sx + diagLen * 0.707, sy + diagLen * 0.707);
                ctx.lineTo(sx + diagLen * 0.707 + diagW, sy + diagLen * 0.707 - diagW);
                ctx.lineTo(sx - diagLen * 0.707 + diagW, sy - diagLen * 0.707 - diagW);
                ctx.closePath();
                ctx.fill();

                ctx.beginPath();
                ctx.moveTo(sx - diagLen * 0.707, sy + diagLen * 0.707);
                ctx.lineTo(sx + diagLen * 0.707, sy - diagLen * 0.707);
                ctx.lineTo(sx + diagLen * 0.707 + diagW, sy - diagLen * 0.707 + diagW);
                ctx.lineTo(sx - diagLen * 0.707 + diagW, sy + diagLen * 0.707 + diagW);
                ctx.closePath();
                ctx.fill();

                ctx.restore();
            }

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

                if (nd.clusterType === 'camp' && nd.labelLine1) {
                    ctx.textAlign = 'center';
                    const isTop = (nd.labelPos === 'top');
                    const y1 = isTop ? (sy - r * 1.35 - 20) : (sy + r * 1.35 + 13);
                    const y2 = y1 + 11.5;

                    ctx.fillText(nd.labelLine1, sx, y1);
                    if (nd.labelLine2) {
                        ctx.font = '400 9.5px "JetBrains Mono", monospace';
                        ctx.fillStyle = nd.isRedStar 
                            ? 'rgba(255, 163, 158, 0.90)' 
                            : ((isHovered || isSelectedInSector) ? '#FFFFFF' : 'rgba(255, 255, 255, 0.68)');
                        ctx.fillText(nd.labelLine2, sx, y2);
                    }
                } else if (nd.labelPos === 'top') {
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
            const uData = unidadesData[unit.id];
            if (!uData) return;

            // Kraaletes / Cromos (soporta array directo o subpropiedad .kraaletes)
            const kraalList = Array.isArray(uData) ? uData : uData.kraaletes;
            if (Array.isArray(kraalList) && kraalList.length > 0) {
                unit.kraaletes = kraalList.map((k, i) => ({
                    star: k.star || `★ ${i + 1} · ${unit.shortName}`,
                    name: k.name || 'Scouter',
                    role: k.role || 'Kraalete',
                    cromoUrl: k.cromoUrl || k.fotoUrl || k.photoUrl || null
                }));
            }

            // Salidas / Aventuras de la unidad
            if (uData && Array.isArray(uData.salidas)) {
                unit.salidas = uData.salidas;
            }

            // Redes sociales de la unidad: solo Escultas y Clan tienen redes oficiales propias
            if (unit.id === 'escultas' || unit.id === 'clan') {
                if (uData && uData.socialUrl) {
                    unit.socialUrl = uData.socialUrl;
                    if (uData.socialLabel) unit.socialLabel = uData.socialLabel;
                }
            } else {
                unit.socialUrl = null;
                unit.socialLabel = null;
            }
        });

        // Si la vista de unidad está abierta, refrescarla en vivo
        if (elUnitZoomOverlay?.classList.contains('is-open')) {
            openUnitSuperZoom(selectedSubIdx);
        }
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
                if (data.error) {
                    console.error('Google Drive Sync: Error reportado por Google Apps Script:', data.error);
                }
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

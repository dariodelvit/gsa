/* ==========================================================================
   MOTOR DEL MAPA ESTELAR GLOBAL INTERACTIVO · GRUPO SCOUT ACRUX 518
   - Estética minimalista monocromática: Blanco puro (#FFFFFF) y Rojo sutil (#D9383A)
   - Sector I: Estrella Guía Acrux 518 (Historia, Sede, Coordinación e Inscripciones)
   - Sector II: Constelación en Línea Recta Ascendente de las 5 Unidades
   - Sector III: Campamentos de Verano y Campamentos de Semana Santa
   - Sector IV: «El Baúl» de Objetos Perdidos (Cajones = carpetas de Google Drive)
   - Modo 50 Aniversario (1976–2026): cometa dorado + espiral áurea de 50 estrellas
   ========================================================================== */
(function initAcruxGlobalStarMapEngine() {
    // Red de seguridad independiente: aunque algo falle más abajo, el loader nunca bloquea la web
    setTimeout(() => {
        const bl = document.getElementById('cosmosBootLoader');
        if (bl) { bl.classList.add('is-hidden'); bl.setAttribute('aria-hidden', 'true'); }
    }, 1800);

    const canvas = document.getElementById('cosmosCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const DRIVE_API_URL = "https://script.google.com/macros/s/AKfycbwqriYYi3qdBRlNFXwYTpcCTeNn6WJUF5P8Mkwyy1YEPMCM57SVZoYin1GHbvi2A18H/exec";

    // Iconos vectoriales SVG minimalistas (estilo Lucide/Feather) y logos oficiales
    const SVG_ICONS = {
        compass: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>`,
        layers: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`,
        shield: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
        mapPin: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
        clock: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
        users: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
        phone: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
        folder: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>`,
        camera: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>`,
        calendar: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
        zoomIn: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>`,
        box: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>`,
        check: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
        arrowUpRight: `<svg class="social-arrow-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>`,
        instagram: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>`,
        facebook: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>`,
        mail: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
        whatsapp: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.85" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>`
    };

    const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
    const lerp = (a, b, t) => a + (b - a) * t;
    const smoothstep = (e0, e1, x) => {
        const t = clamp((x - e0) / (e1 - e0), 0, 1);
        return t * t * (3 - 2 * t);
    };

    // Limpiador universal de etiquetas HTML y entidades que Drive pueda introducir al copiar/pegar
    // Orden importante: primero se decodifican las entidades (Drive a veces entrega "&lt;div&gt;"),
    // y después se eliminan las etiquetas, repitiendo por si hay doble codificación.
    function stripHtmlTags(str) {
        if (str === null || str === undefined) return '';
        let out = String(str);
        for (let pass = 0; pass < 3; pass++) {
            const before = out;
            out = out
                .replace(/&nbsp;|&#160;|&#xA0;/gi, ' ')
                .replace(/&lt;/gi, '<')
                .replace(/&gt;/gi, '>')
                .replace(/&quot;|&#34;/gi, '"')
                .replace(/&#39;|&apos;|&#x27;/gi, "'")
                .replace(/&amp;/gi, '&')
                .replace(/<\s*br\s*\/?>/gi, ' ')
                .replace(/<\/(p|div|li|h[1-6]|tr)\s*>/gi, ' ')
                .replace(/<[^>]*>/g, ' ');
            if (out === before) break;
        }
        return out
            .replace(/[<>]/g, '')
            .replace(/\s+/g, ' ')
            .trim();
    }

    // Escapado seguro para atributos HTML (alt, data-*, title...). Limpia etiquetas y escapa & " ' < >
    function escapeAttr(str) {
        return stripHtmlTags(str)
            .replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    }

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
                <svg class="unit-hero-illustration-svg" viewBox="0 0 560 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ilustración de La Vida en el Estanque">
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
                    <text x="24" y="34" fill="#FFFFFF" font-family="Plus Jakarta Sans, sans-serif" font-size="11" font-weight="600">EL ESTANQUE DEL GRAN ROBLE · «SPLASH, SPLASH, SPLASH»</text>
                </svg>
            `,
            salidas: [],
            pillars: [
                { badge: 'INTEGRACIÓN', title: 'Castor sin paletas o Castorcito', desc: 'El Castor que acaba de entrar en la Colonia e inicia su progresión: acaba de nacer y tiene que empezar a aprender muchas cosas para poder vivir con el resto de la Colonia. Como no tiene paletas, éstas le irán creciendo a medida que vaya aprendiendo a estar en la Colonia.' },
                { badge: 'PARTICIPACIÓN', title: 'Castor con paletas', desc: 'Un Castor fuerte, al que le han crecido las paletas y que se vale por sí mismo para conseguir su alimento y cortar troncos para hacer su presa y su madriguera. Sus dientes deben ir siendo cada vez más fuertes para compartir su trabajo con la Colonia y ser cada vez más útil a la misma.' },
                { badge: 'ANIMACIÓN', title: 'Castor Keeo', desc: 'El castor Keeo recibe la propiedad de hablar con los humanos: es el Castor parlante, el enlace entre los adultos y la Colonia. Es el Castor más responsable de la Colonia y por ello debe aprender a ser un buen referente de los demás.' }
            ],
            kraalTitle: 'Kraal de la Colonia Ohiensis',
            kraalSub: 'Scouters de Castores (Kraaletes de Colonia)',
            kraaletes: [
                { star: 'Kapi', name: 'Kapi', role: 'Kraalete' },
                { star: 'Malak', name: 'Malak', role: 'Kraalete' },
                { star: 'Burbuja', name: 'Burbuja', role: 'Kraalete' },
                { star: 'Rusty', name: 'Rusty', role: 'Kraalete' }
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
                <svg class="unit-hero-illustration-svg" viewBox="0 0 560 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ilustración de la Roca del Consejo en la Selva de Seeonee">
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
                    <text x="24" y="34" fill="#FEF08A" font-family="Plus Jakarta Sans, sans-serif" font-size="11" font-weight="600">LA ROCA DEL CONSEJO · SELVA DE SEEONEE</text>
                </svg>
            `,
            salidas: [],
            pillars: [
                { badge: 'INTEGRACIÓN', title: 'Huella de Akela', desc: 'Etapa pensada para que el nuevo lobezno se adapte y se sienta feliz de formar parte de la Manada, descubriendo las normas que rigen su vida y los valores que aportan a la suya. Simbolismo: el lobato es joven e inexperto y no puede ir solo de cacería por la selva; debe seguir la huella del lobo más experto. Akela lo introduce en la selva enseñándole los secretos de la caza.' },
                { badge: 'PARTICIPACIÓN', title: 'Huella de Baloo', desc: 'El lobato se ha integrado en la vida de la Manada, acepta las normas de la vida en grupo y está preparado para compartir sus experiencias con los demás lobatos. Simbolismo: Baloo, con sus Máximas, le da el sentido cercano de la Ley de la Manada y le enseña el lenguaje de la selva para que pueda jugar en ella con los demás.' },
                { badge: 'ANIMACIÓN', title: 'Huella de Bagheera', desc: 'El lobato se encuentra en su recta final: es la hora de poner todo lo aprendido al servicio de los demás. Simbolismo: Bagheera, el amigo de Mowgli más cercano a los hombres, le enseña la técnica para participar en la vida de la selva y en la de la aldea: cazar, trepar… sin olvidar nunca la vida de la selva.' }
            ],
            kraalTitle: 'Kraal de la Manada Khanhiwara',
            kraalSub: 'Los Viejos Lobos (Kraaletes de Manada)',
            kraaletes: [
                { star: 'Baloo', name: 'Baloo', role: 'Viejo Lobo de Manada' },
                { star: 'Raksa', name: 'Raksa', role: 'Viejo Lobo de Manada' },
                { star: 'Akela', name: 'Akela', role: 'Viejo Lobo de Manada' },
                { star: 'Kotic', name: 'Kotic', role: 'Viejo Lobo de Manada' },
                { star: 'Rikki', name: 'Rikki', role: 'Viejo Lobo de Manada' },
                { star: 'Bagheera', name: 'Bagheera', role: 'Viejo Lobo de Manada' },
                { star: 'Fao', name: 'Fao', role: 'Viejo Lobo de Manada' },
                { star: 'Kaa', name: 'Kaa', role: 'Viejo Lobo de Manada' },
                { star: 'Hermano Gris', name: 'Hermano Gris', role: 'Viejo Lobo de Manada' }
            ]
        },
        {
            id: 'tropa',
            index: 2,
            starSymbol: 'γ Tropa (Lohengrin)',
            shortName: '3 · Tropa',
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
                <svg class="unit-hero-illustration-svg" viewBox="0 0 560 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ilustración de la Tropa Lohengrin">
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
                    <text x="24" y="34" fill="#A7F3D0" font-family="Plus Jakarta Sans, sans-serif" font-size="11" font-weight="600">TROPA LOHENGRIN · EL CABALLERO DEL CISNE Y LAS PATRULLAS</text>
                </svg>
            `,
            salidas: [],
            pillars: [
                { badge: 'INTEGRACIÓN', title: 'La Senda del Compromiso', desc: 'Se descubre la Sección, su simbología, tradiciones y forma de trabajo, y se participa activamente de su dinámica. El Scout se integra de forma comprometida colaborando con su Patrulla y con la Tropa, se adapta a la vida de la Patrulla, se convierte en un miembro más y empieza a tomar alguna responsabilidad. Símbolo: el nudo margarita en su primera fase, el educando que llega y se entrelaza con sus compañeros hasta ser parte de un mismo elemento.' },
                { badge: 'PARTICIPACIÓN', title: 'La Senda del Desafío', desc: 'La mayor implicación real del chico en el trabajo por el progreso personal y colectivo. Una vez adquiridos los conocimientos básicos, el Scout juega un papel más activo en el grupo, ha tomado su decisión voluntaria de trabajar dentro del Escultismo, adopta una actitud participativa y aprende técnicas nuevas de forma práctica. Símbolo: el nudo de trébol, que expresa el trabajo compartido de la Patrulla y el periodo de aprendizaje.' },
                { badge: 'ANIMACIÓN', title: 'La Senda de la Colaboración', desc: 'El chico tiene un papel fundamental en la Patrulla y en la Tropa: toma mayor iniciativa y, con su actitud de servicio, contribuye a la buena marcha de la Sección. Probablemente será el Guía o Subguía de su Patrulla y animará a sus compañeros a participar. Símbolo: la vuelta de escota, que une cuerdas de distinto grosor: el scout con más experiencia ayuda a progresar a quienes están en etapas anteriores.' }
            ],
            kraalTitle: 'Kraal de la Tropa Lohengrin',
            kraalSub: 'Scouters de Tropa (Kraaletes de Lohengrin)',
            kraaletes: [
                { star: 'Ane', name: 'Ane', role: 'Kraalete' },
                { star: 'Pablo', name: 'Pablo', role: 'Kraalete' },
                { star: 'Silvia', name: 'Silvia', role: 'Kraalete' },
                { star: 'Jesús', name: 'Jesús', role: 'Kraalete' },
                { star: 'Hugo', name: 'Hugo', role: 'Kraalete' },
                { star: 'Ángel', name: 'Ángel', role: 'Kraalete' },
                { star: 'Nadia', name: 'Nadia', role: 'Kraalete' }
            ]
        },
        {
            id: 'escultas',
            index: 3,
            starSymbol: 'δ Escultas (Trea)',
            shortName: '4 · Escultas',
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
                <svg class="unit-hero-illustration-svg" viewBox="0 0 560 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ilustración de la Unidad Esculta Trea">
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
                    <text x="24" y="34" fill="#EDE0D4" font-family="Plus Jakarta Sans, sans-serif" font-size="11" font-weight="600">ESCULTAS TREA · EL TORII DE LOS NINJAS Y EL DESCENSO DEL SENA</text>
                </svg>
            `,
            salidas: [],
            pillars: [
                { badge: 'INTEGRACIÓN', title: 'Etapa de Integración', desc: 'Se toma contacto con los elementos metodológicos básicos de la Sección y con sus miembros. La actitud del esculta/pionero es observar y explorar la forma de vida de la Unidad para decidir si le interesa comprometerse con los demás con unos objetivos comunes. Símbolo: manos que entrelazan sus dedos; es una etapa de encuentro, en la que los recién llegados son acogidos e integrados con sus compañeros.' },
                { badge: 'PARTICIPACIÓN', title: 'Etapa de Participación', desc: 'El esculta/pionero se marca objetivos más precisos y más exigentes, desde una actitud de participación y análisis permanente. Se implica en toda la vida de la Sección, alcanzando niveles de plena participación y un compromiso más colectivo. Símbolo: manos que se sujetan unas a otras, el compromiso colectivo y el apoyo mutuo que se traduce en esfuerzo común y unidad de acción: la fuerza de la unión.' },
                { badge: 'ANIMACIÓN', title: 'Etapa de Animación', desc: 'Toma mayor iniciativa en la Sección y dinamiza más el grupo. Pone especial cuidado en su progresión, matiza y reafirma los contenidos y objetivos asumidos hasta ahora, colabora aportando soluciones y coordina actuaciones de la Unidad, ayudando a los escultas nuevos a integrarse y a entender la vida en la Unidad. Símbolo: dos manos entrelazadas; la que está en primer término sostiene y ayuda a progresar a otro esculta más joven.' }
            ],
            kraalTitle: 'Kraal de la Unidad Esculta Trea',
            kraalSub: 'Scouters de Escultas (Kraaletes de Trea)',
            kraaletes: [
                { star: 'Silvia', name: 'Silvia', role: 'Scouter de Unidad' },
                { star: 'David', name: 'David', role: 'Scouter de Unidad' },
                { star: 'JJ', name: 'JJ', role: 'Scouter de Unidad' },
                { star: 'Lucia', name: 'Lucia', role: 'Scouter de Unidad' },
                { star: 'Leonor', name: 'Leonor', role: 'Scouter de Unidad' }
            ]
        },
        {
            id: 'clan',
            index: 4,
            starSymbol: 'ε Clan (Ama Dablam)',
            shortName: '5 · Clan',
            fullName: 'Clan Rover · Ama Dablam',
            constellationTitle: 'ESTRELLA V · CLAN ROVER AMA DABLAM',
            age: '17 a 20 años (2º Bachillerato, FP y Universidad)',
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
                <svg class="unit-hero-illustration-svg" viewBox="0 0 560 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ilustración de la Laguna Azul del Clan Ama Dablam">
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
                    <text x="24" y="34" fill="#E0F2FE" font-family="Plus Jakarta Sans, sans-serif" font-size="11" font-weight="600">LA LAGUNA AZUL SOBRE LAS NUBES · CLAN AMA DABLAM</text>
                </svg>
            `,
            salidas: [],
            pillars: [
                { badge: 'INTEGRACIÓN', title: 'Rover/Compañero Aspirante', desc: 'A su llegada al Clan, el Rover/Compañero se enfrenta a todas las decisiones y responsabilidades que supone unirse a la Hermandad Róver e iniciar la travesía por el «río de la vida», donde deberá «remar su propia canoa». Símbolo: la canoa y el remo sobre el óvalo rover.' },
                { badge: 'PARTICIPACIÓN', title: 'Rover/Compañero en Formación', desc: 'Ha comenzado su etapa de participación asumiendo los retos del Roverismo y entrando a formar parte de la Hermandad de la Ruta. En esta andadura de Comunidad, Lucha y Servicio siempre podrá apoyarse en su horquilla, símbolo de la dualidad de toda situación y de la necesidad de tomar partido e implicarse ante cada una de ellas.' },
                { badge: 'ANIMACIÓN', title: 'Rover/Compañero en Acción', desc: 'Está en permanente disposición de prestar servicio dentro y fuera de su Clan/Comunidad. Por un lado, ya ha trazado la senda por la que ha decidido plantear su proyecto de vida; por otro, se convierte en guía, animador y referente del resto del Clan. Su compromiso de crecimiento personal pasa por ayudar a crecer al resto de integrantes.' }
            ],
            kraalTitle: 'Kraal del Clan Ama Dablam',
            kraalSub: 'Acompañantes Rovers (Kraaletes de Clan)',
            kraaletes: [
                { star: 'Laura', name: 'Laura', role: 'Acompañante de Clan' },
                { star: 'María', name: 'María', role: 'Acompañante de Clan' },
                { star: 'Marta', name: 'Marta', role: 'Acompañante de Clan' },
                { star: 'Victoria', name: 'Victoria', role: 'Acompañante de Clan' }
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

    // Formularios dinámicos de Intendencia / Merchandising (carpeta 06_INTENDENCIA en Google Drive)
    let MERCH_FORMS_DATA = [];

    // Formularios dinámicos de Inscripción (carpeta 07_INSCRIPCIONES en Google Drive)
    let INSCRIPCION_FORMS_DATA = [];

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
            desc: 'Constitución oficial del grupo e inscripción en ASDE Exploradores de Castilla y León. Nace nuestra insignia estelar Acrux y la pañoleta carmesí (#B02324) con borde blanco nieve.',
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

        // Geometría de espiral áurea armónica y compacta alrededor del Sector I (Acrux 518)
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
            code: 'SECTOR I / IV · ESTRELLA GUÍA ACRUX 518',
            subtitle: 'ESTRELLA GUÍA · VALLADOLID (DESDE 1977)',
            coords: 'VALLADOLID · DESDE 1977',
            headingHTML: 'Grupo Scout <span class="ice-italic">Acrux 518</span>',
            desc: 'Desde 1977 educando en valores, escultismo y contacto con la naturaleza en Valladolid. Pulsa en nuestra estrella guía Acrux para conocer el grupo, nuestra sede, el equipo de coordinación y cómo unirte.',
            worldX: 0,
            worldY: 0,
            baseZoom: 1.06,
            primaryBtnText: 'Entrar en Acrux 518',
            stars: [
                {
                    id: 'acrux',
                    symbol: 'α Acrux (Estrella Guía)',
                    dx: 12,
                    dy: 172,
                    r: 12.0,
                    color: '#FFFFFF',
                    halo: 'rgba(217, 56, 58, 0.48)',
                    isMainCross: true,
                    isMainAcrux: true,
                    isClickable: true,
                    badge: 'Estrella Principal · Acrux 518',
                    title: 'α Acrux · La Estrella que Nos Da Nombre',
                    body: 'Acrux es la estrella guía de los navegantes y exploradores. Desde 1977 da nombre y rumbo al Grupo Scout Nº 518 en Valladolid.',
                    pillars: ['Fundado en Valladolid en 1977', 'ASDE Exploradores de Castilla y León', 'Educación en Valores']
                },
                {
                    id: 'gacrux',
                    symbol: 'γ Documentos',
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
                    symbol: 'β Inscripciones',
                    dx: -152,
                    dy: -16,
                    r: 7.0,
                    color: '#FFFFFF',
                    halo: 'rgba(255, 255, 255, 0.22)',
                    isMainCross: true,
                    isClickable: true
                },
                {
                    id: 'imai',
                    symbol: 'δ El Kraal',
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
            subtitle: 'CINCO RAMAS EDUCATIVAS · DE 6 A 20 AÑOS',
            coords: 'DE 6 A 20 AÑOS · 5 UNIDADES',
            headingHTML: 'El Camino de <span class="ice-italic">las Unidades</span>',
            desc: 'Cinco estrellas trazan nuestro camino educativo de 6 a 20 años: Castores, Manada, Tropa, Escultas y Clan. Haz clic en cualquier estrella para entrar.',
            worldX: UNITS_ORIGIN_X,
            worldY: UNITS_ORIGIN_Y,
            baseZoom: 1.0,
            primaryBtnText: 'Entrar en la Unidad'
        },
        {
            index: 2,
            roman: 'III',
            code: 'SECTOR III / IV · CONSTELACIÓN DE CAMPAMENTOS',
            subtitle: 'EXPEDICIONES DE VERANO Y SEMANA SANTA · GOOGLE DRIVE',
            coords: 'ÁLBUMES FOTOGRÁFICOS · DRIVE',
            headingHTML: 'Constelación de <span class="ice-italic">Campamentos</span>',
            desc: 'Recorrido por los campamentos de Verano y de Semana Santa del Grupo Scout Acrux 518. Selecciona cualquier campamento para ver sus fotografías destacadas y acceder al álbum completo en Google Drive.',
            worldX: CAMPS_ORIGIN_X,
            worldY: CAMPS_ORIGIN_Y,
            baseZoom: 1.02,
            primaryBtnText: 'Abrir Álbum del Campamento',
            stars: [],
            edges: []
        },
        {
            index: 3,
            roman: 'IV',
            code: 'SECTOR IV / IV · CONSTELACIÓN «EL BAÚL» (OBJETOS PERDIDOS)',
            subtitle: 'ARCHIVO DE MATERIAL PERDIDO · CARPETAS GOOGLE DRIVE',
            coords: 'SEDE RUEDA 53 · SÁBADOS',
            headingHTML: 'El Baúl · <span class="ice-italic">Objetos Perdidos</span>',
            desc: 'Prendas y material encontrado tras cada acampada. Entra en los cajones para localizar tu equipo y reclamarlo antes del sábado.',
            worldX: 420,
            worldY: 1580,
            baseZoom: 1.04,
            primaryBtnText: 'Abrir «El Baúl» de Objetos Perdidos',
            stars: [
                {
                    id: 'estrella-el-baul',
                    symbol: 'El Baúl',
                    dx: 0,
                    dy: 0,
                    r: 7.6,
                    color: '#FFFFFF',
                    halo: 'rgba(217, 56, 58, 0.20)',
                    isBaulMain: true,
                    isClusterHub: true,
                    cajonIndex: 0,
                    starIdx: 0,
                    badge: 'Objetos Perdidos',
                    title: 'El Baúl · Objetos Perdidos',
                    body: 'Haz clic en «El Baúl» para explorar las carpetas de ropa y material encontrado en los campamentos.',
                    pillars: ['Sincronizado con Google Drive', 'Recogida los sábados en la base', 'Reserva rápida por WhatsApp']
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

    // 1. Registrar Sector I (Acrux 518) y Sector IV (Objetos Perdidos)
    [0, 3].forEach(sIdx => {
        const sec = SECTORS[sIdx];
        sec.runtimeNodes = registerStarCluster(sec.stars, sec.edges, sec.worldX, sec.worldY, {
            sectorIndex: sIdx,
            clusterType: 'sector'
        });
    });

    // Estrellas secundarias del campo estelar de Acrux 518
    const acruxFieldExtras = [
        { dx: -215, dy: -165, r: 3.2, symbol: '' },
        { dx: -198, dy: -46, r: 3.2, symbol: '' },
        { dx: -182, dy: 38, r: 3.3, symbol: '' },
        { dx: -125, dy: 76, r: 3.3, symbol: '' },
        { dx: 64, dy: 225, r: 3.3, symbol: '' },
        { dx: 138, dy: 268, r: 3.4, symbol: '' },
        { dx: 165, dy: 182, r: 3.0, symbol: '' },
        { dx: 156, dy: 168, r: 3.0, symbol: '' }
    ];
    registerStarCluster(acruxFieldExtras, [], SECTORS[0].worldX, SECTORS[0].worldY, {
        sectorIndex: 0,
        clusterType: 'acrux-field'
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
        labelPos: (uIdx % 2 === 0) ? 'bottom' : 'top',
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

    // 2B. ESTRELLA SECRETA OCULTA EN EL CENTRO DEL COSMOS (solo visible al desplazarse al medio y solo interactiva al pasar por encima)
    registerStarCluster(
        [{
            id: 'secret-kraal-album',
            symbol: '✦ Sobre Secreto del Kraal',
            dx: 0,
            dy: 0,
            r: 3.4,
            color: '#FFFFFF',
            halo: 'rgba(253, 230, 138, 0.42)',
            ringColor: 'rgba(253, 230, 138, 0.72)',
            isSecretStar: true,
            isClickable: true,
            labelPos: 'top'
        }],
        [],
        1155,
        535,
        {
            sectorIndex: -1,
            clusterType: 'secret'
        }
    );

    // 3. Registrar Sector III: CONSTELACIÓN DE CAMPAMENTOS CONECTADOS (100% DINÁMICO DESDE GOOGLE DRIVE)
    const GREEK_ALPHABET = ['α', 'β', 'γ', 'δ', 'ε', 'ζ', 'η', 'θ', 'ι', 'κ', 'λ', 'μ', 'ν', 'ξ', 'ο', 'π', 'ρ', 'σ', 'τ', 'υ', 'φ', 'χ', 'ψ', 'ω'];
    let hasBothCampsConstellations = false;

    // Clasificador 100% por carpeta de Google Drive (Verano vs Semana Santa / Invierno, sin mirar títulos)
    function detectCampSeason(camp) {
        return (camp && camp.seasonType === 'easter') ? 'easter' : 'summer';
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
            if (yA !== yB) return yB - yA;
            return (b.name || '').localeCompare(a.name || '');
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
        SECTORS[2].baseZoom = hasBothCampsConstellations ? 0.94 : 1.02;
        SECTORS[2].desc = 'Recorrido por los campamentos de Verano y de Semana Santa del Grupo Scout Acrux 518. Selecciona cualquier campamento para ver sus fotografías destacadas y acceder al álbum completo en Google Drive.';

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

            const line1 = `${greekLetter} ${year}`.trim();
            const line2 = clean;
            const starSymbol = year ? `${greekLetter} ${year} · ${clean}` : `${greekLetter} ${clean}`;

            return { line1, line2, starSymbol };
        }

        // 4. Construcción geométrica de Campamentos de Verano (Hemisferio Superior)
        const baseY_s = hasBothCampsConstellations ? -135 : 0;
        const spanX_s = Math.min(1450, Math.max(480, (N_s - 1) * 230));

        const summerCamps = rawSummer.map((c, idx) => {
            const letter = GREEK_ALPHABET[idx] || `${idx + 1}`;
            const isLast = (idx === 0);
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

                const arcY = Math.sin(t * Math.PI) * 45;
                const waveY = (idx % 2 === 0 ? 22 : -22) - Math.sin(t * Math.PI * 2.2) * 14;
                dy = Math.round(baseY_s + arcY + waveY);
            }

            const r = isLast ? 9.5 : (idx === N_s - 1 ? 8.2 : 6.8 + ((idx * 3 + 1) % 4) * 0.3);
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
                location: c.location || 'Ubicación estival',
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

        // 5. Construcción geométrica de Campamentos de Semana Santa (Hemisferio Inferior)
        const baseY_e = hasBothCampsConstellations ? +135 : 0;
        const spanX_e = Math.min(1400, Math.max(460, (N_e - 1) * 230));

        const easterCamps = rawEaster.map((c, idx) => {
            const letter = GREEK_ALPHABET[idx] || `${idx + 1}`;
            const isLast = (idx === 0);
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

                const arcY = -Math.sin(t * Math.PI) * 35;
                const waveY = (idx % 2 === 0 ? -22 : 22) - Math.cos(t * Math.PI * 2.0) * 14;
                dy = Math.round(baseY_e + arcY + waveY);
            }

            const r = isLast ? 9.2 : (idx === N_e - 1 ? 8.0 : 6.6 + ((idx * 2 + 1) % 4) * 0.3);
            const labelPos = (idx % 2 === 0) ? 'bottom' : 'top';

            return {
                id: c.id || `camp-easter-${idx}`,
                seasonType: 'easter',
                seasonBadge: 'Campamento de Semana Santa',
                starSymbol: lbl.starSymbol,
                labelLine1: lbl.line1,
                labelLine2: lbl.line2,
                name: c.name || `Campamento de Semana Santa ${idx + 1}`,
                season: c.season || 'Campamento de Semana Santa',
                location: c.location || 'Ubicación de acampada',
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
            symbol: 'El Baúl',
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
            badge: 'Estrella Principal · Objetos Perdidos',
            title: 'El Baúl · Estrella de Objetos Perdidos (Google Drive)',
            body: 'Haz clic en «El Baúl» para adentrarte en su interior y explorar los cajones sincronizados con Google Drive.',
            pillars: ['Google Drive / Objetos Perdidos', 'Sincronizado en tiempo real', 'Clic para entrar a «El Baúl»']
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
            const starSymbol = parts[0];

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
                badge: `Mini-Estrella · ${cj.folderName}`,
                title: `${cj.starSymbol} · ${cj.folderName}`,
                body: `${cj.subtitle}. Contiene ${cj.items.length} fotos de objetos en Google Drive. Clic para explorar este cajón.`,
                pillars: [
                    cj.folderName,
                    `${cj.items.length} objetos registrados`,
                    'Clic para abrir cajón'
                ]
            });
            edges.push([0, 1]);
        } else if (N === 2) {
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
                    badge: `Mini-Estrella · Cajón 0${i + 1}`,
                    title: `${cj.starSymbol} · ${cj.folderName}`,
                    body: `${cj.subtitle}. Contiene ${cj.items.length} fotos de objetos en Google Drive. Clic para explorar este cajón.`,
                    pillars: [cj.folderName, `${cj.items.length} objetos registrados`, 'Clic para abrir cajón']
                });
            }
            edges.push([0, 1], [0, 2], [1, 2]);
        } else if (N === 3) {
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
                    badge: `Mini-Estrella · Cajón 0${i + 1}`,
                    title: `${cj.starSymbol} · ${cj.folderName}`,
                    body: `${cj.subtitle}. Contiene ${cj.items.length} fotos de objetos en Google Drive. Clic para explorar este cajón.`,
                    pillars: [cj.folderName, `${cj.items.length} objetos registrados`, 'Clic para abrir cajón']
                });
            }
            edges.push([0, 1], [1, 2], [2, 3], [3, 0], [0, 2]);
        } else if (N === 4) {
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
                    badge: `Mini-Estrella · Cajón 0${i + 1}`,
                    title: `${cj.starSymbol} · ${cj.folderName}`,
                    body: `${cj.subtitle}. Contiene ${cj.items.length} fotos de objetos en Google Drive. Clic para explorar este cajón.`,
                    pillars: [cj.folderName, `${cj.items.length} objetos registrados`, 'Clic para abrir cajón']
                });
            }
            edges.push([1, 2], [2, 3], [3, 4], [4, 1], [0, 1], [0, 2], [0, 3], [0, 4]);
        } else {
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
                    badge: `Mini-Estrella · Cajón 0${i + 1}`,
                    title: `${cj.starSymbol} · ${cj.folderName}`,
                    body: `${cj.subtitle}. Contiene ${cj.items.length} fotos de objetos en Google Drive. Clic para explorar este cajón.`,
                    pillars: [cj.folderName, `${cj.items.length} objetos registrados`, 'Clic para abrir cajón']
                });
            }
            for (let i = 0; i < N - 1; i++) {
                edges.push([i + 1, i + 2]);
            }
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
    // 4D. RECONSTRUCCIÓN DINÁMICA DE MERCH (CARPETA DRIVE: 06_INTENDENCIA)
    // =========================================================================
    function normalizeGoogleFormEmbedUrl(rawUrl, formId) {
        let url = (rawUrl || '').trim();
        if (!url && formId) {
            url = `https://docs.google.com/forms/d/${formId}/viewform`;
        }
        if (!url) return { embedUrl: '', externalUrl: '' };

        // Convertir enlaces de edición (/edit) a vista de formulario (/viewform)
        url = url.replace(/\/edit(\?.*)?$/i, '/viewform');
        const externalUrl = url.replace(/[?&]embedded=true/gi, '');

        let embedUrl = url;
        if (!/embedded=true/i.test(embedUrl)) {
            embedUrl += (embedUrl.includes('?') ? '&' : '?') + 'embedded=true';
        }
        return { embedUrl, externalUrl };
    }

    // Título real y actual del Google Form, tal y como lo manda el servidor dentro de FB_PUBLIC_LOAD_DATA_.
    // fbLoadData[1][8] es el título del formulario; fbLoadData[3] es el respaldo (nombre del documento).
    function extractFbFormTitle(fbLoadData) {
        if (!Array.isArray(fbLoadData)) return '';
        const candidates = [Array.isArray(fbLoadData[1]) ? fbLoadData[1][8] : '', fbLoadData[3]];
        for (let i = 0; i < candidates.length; i++) {
            const c = candidates[i];
            if (typeof c === 'string' && c.trim()) return c.trim();
        }
        return '';
    }

    // Misma limpieza de título que usa rebuildMerchConstellation, para que ambos caminos den siempre el mismo resultado
    function normalizeMerchFormTitle(raw) {
        const cleaned = String(raw || '')
            .replace(/<[^>]*>/g, ' ')
            .replace(/[\r\n]+/g, ' ')
            .replace(/^\s*(copia de|copy of)\s+/i, '')
            .replace(/intendencia/gi, 'Merch')
            .replace(/\s+/g, ' ')
            .trim();
        return (cleaned.split('|')[0] || cleaned).trim();
    }

    function parseDriveFormsList(formsFromDrive, options = {}) {
        const { fallbackPrefix = 'Merch', replaceIntendencia = true } = options;
        if (!Array.isArray(formsFromDrive)) return [];
        return formsFromDrive
            .map((item, idx) => {
                const urls = normalizeGoogleFormEmbedUrl(item.embedUrl || item.url || item.formUrl, item.id);
                if (!urls.embedUrl) return null;
                // Prioridad: título interno real del formulario (fbLoadData) y, solo como respaldo, el nombre del archivo
                const fbTitle = extractFbFormTitle(item.fbLoadData);
                let rawName = (fbTitle || item.title || item.name || `${fallbackPrefix} ${idx + 1}`)
                    .replace(/[\r\n]+/g, ' ');
                if (!fbTitle) rawName = rawName.replace(/\.[^/.]+$/, '');
                rawName = rawName.replace(/^(copia de|copy of)\s+/i, '');
                if (replaceIntendencia) {
                    rawName = rawName.replace(/intendencia/gi, 'Merch');
                }
                rawName = rawName.trim();
                const parts = rawName.split('|').map(s => s.trim());
                const cleanTitle = parts[0] || rawName;
                const priceMatch = rawName.match(/(\d+(?:[.,]\d{1,2})?\s*€)/);
                const photos = Array.isArray(item.photos)
                    ? item.photos.slice()
                    : (item.imageUrl || item.photoUrl ? [item.imageUrl || item.photoUrl] : []);

                return {
                    id: item.id || `${fallbackPrefix.toLowerCase()}-form-${idx}`,
                    title: cleanTitle,
                    price: item.price || (parts[1] && parts[1].includes('€') ? parts[1] : (priceMatch ? priceMatch[1] : '')),
                    desc: item.desc || item.description || (parts[2] || (parts[1] && !parts[1].includes('€') ? parts[1] : '')),
                    embedUrl: urls.embedUrl,
                    externalUrl: urls.externalUrl || urls.embedUrl,
                    actionUrl: item.actionUrl || '',
                    date: item.date || '',
                    photos: photos,
                    questions: Array.isArray(item.questions) ? item.questions : null,
                    fbLoadData: item.fbLoadData || null,
                    rawHtml: item.rawHtml || '',
                    _parsedSchema: null
                };
            })
            .filter(Boolean);
    }

    function rebuildMerchConstellation(merchFormsFromDrive) {
        // 1. Limpiar estrellas satélite previas de Merch (clusterType === 'merch')
        for (let i = worldNodes.length - 1; i >= 0; i--) {
            if (worldNodes[i].clusterType === 'merch') {
                worldNodes.splice(i, 1);
            }
        }
        for (let i = worldEdges.length - 1; i >= 0; i--) {
            if (worldEdges[i].clusterType === 'merch') {
                worldEdges.splice(i, 1);
            }
        }

        const intrometidaNode = worldNodes.find(nd => nd.id === 'intrometida');

        // 2. Validar y normalizar array de formularios recibidos desde Drive
        const validForms = parseDriveFormsList(merchFormsFromDrive, {
            fallbackPrefix: 'Merch',
            replaceIntendencia: true
        });

        MERCH_FORMS_DATA = validForms;

        // Pre-cargar en segundo plano el esquema de preguntas de cada Google Form
        MERCH_FORMS_DATA.forEach(form => {
            if (typeof preloadMerchFormSchema === 'function') {
                preloadMerchFormSchema(form);
            }
        });

        // 3. Si no hay formularios: la estrella ε Intrometida permanece como estrella astronómica inactiva
        if (MERCH_FORMS_DATA.length === 0) {
            if (intrometidaNode) {
                intrometidaNode.symbol = 'ε Intrometida';
                intrometidaNode.r = 5.2;
                intrometidaNode.color = '#FFFFFF';
                intrometidaNode.halo = 'rgba(255, 255, 255, 0.16)';
                intrometidaNode.ringColor = null;
                intrometidaNode.hoverRingColor = null;
                intrometidaNode.isMerchStar = false;
                intrometidaNode.isClickable = false;
                intrometidaNode.isClusterHub = false;
                intrometidaNode.merchIndex = undefined;
            }
            return;
        }

        // 4. Si hay formularios: activar ε Intrometida de forma sobria y sutil como estrella de Merch
        const firstForm = MERCH_FORMS_DATA[0];
        if (intrometidaNode) {
            const cleanLabel = /^merch\b/i.test(firstForm.title) ? firstForm.title : `Merch · ${firstForm.title}`;
            intrometidaNode.symbol = `ε ${cleanLabel}`;
            intrometidaNode.r = 5.6;
            intrometidaNode.color = '#E2D5B5';
            intrometidaNode.halo = 'rgba(212, 190, 152, 0.22)';
            intrometidaNode.ringColor = 'rgba(203, 213, 225, 0.28)';
            intrometidaNode.hoverRingColor = 'rgba(212, 190, 152, 0.68)';
            intrometidaNode.isMerchStar = true;
            intrometidaNode.isClickable = true;
            intrometidaNode.isClusterHub = false;
            intrometidaNode.merchIndex = 0;
            intrometidaNode.labelPos = 'right';
        }

        // 5. Si hay más de 1 formulario, dibujar estrellas discretas adicionales conectadas a ε Intrometida
        if (MERCH_FORMS_DATA.length > 1) {
            const extraOffsets = [
                { dx: 138, dy: 62, lp: 'right' },
                { dx: 118, dy: 122, lp: 'bottom' },
                { dx: 185, dy: 12, lp: 'right' },
                { dx: 165, dy: 95, lp: 'right' }
            ];

            const extraStars = MERCH_FORMS_DATA.slice(1).map((form, idx) => {
                const off = extraOffsets[idx % extraOffsets.length];
                const radiusMul = 1 + Math.floor(idx / extraOffsets.length) * 0.35;
                const cleanSubLabel = /^merch\b/i.test(form.title) ? form.title : `Merch · ${form.title}`;
                return {
                    id: `merch-star-${form.id}`,
                    symbol: `✦ ${cleanSubLabel}`,
                    dx: Math.round(off.dx * radiusMul),
                    dy: Math.round(off.dy * radiusMul),
                    r: 5.2,
                    color: '#CBD5E1',
                    halo: 'rgba(203, 213, 225, 0.20)',
                    ringColor: 'rgba(203, 213, 225, 0.26)',
                    hoverRingColor: 'rgba(212, 190, 152, 0.65)',
                    isMerchStar: true,
                    isClickable: true,
                    isClusterHub: false,
                    merchIndex: idx + 1,
                    labelPos: off.lp
                };
            });

            const createdExtraNodes = registerStarCluster(extraStars, [], SECTORS[0].worldX, SECTORS[0].worldY, {
                sectorIndex: 0,
                clusterType: 'merch'
            });

            if (intrometidaNode) {
                createdExtraNodes.forEach((node, idx) => {
                    const prevNode = idx === 0 ? intrometidaNode : createdExtraNodes[idx - 1];
                    worldEdges.push({
                        sectorIndex: 0,
                        clusterType: 'merch',
                        nodeA: prevNode,
                        nodeB: node,
                        ctrlX: 0,
                        ctrlY: 0,
                        vx: 0,
                        vy: 0,
                        glow: 0
                    });
                });
            }
        }
    }
    window.rebuildMerchConstellation = rebuildMerchConstellation;

    // Reconstruye dinámicamente la estrella β Inscripciones (mimosa) con los Google Forms de 07_INSCRIPCIONES
    function rebuildInscripcionConstellation(inscripcionFormsFromDrive) {
        for (let i = worldNodes.length - 1; i >= 0; i--) {
            if (worldNodes[i].clusterType === 'inscripcion') {
                worldNodes.splice(i, 1);
            }
        }
        for (let i = worldEdges.length - 1; i >= 0; i--) {
            if (worldEdges[i].clusterType === 'inscripcion') {
                worldEdges.splice(i, 1);
            }
        }

        const mimosaNode = worldNodes.find(nd => nd.id === 'mimosa');
        const validForms = parseDriveFormsList(inscripcionFormsFromDrive, {
            fallbackPrefix: 'Inscripción',
            replaceIntendencia: false
        });

        INSCRIPCION_FORMS_DATA = validForms;
        INSCRIPCION_FORMS_DATA.forEach(form => {
            if (typeof preloadMerchFormSchema === 'function') {
                preloadMerchFormSchema(form);
            }
        });

        if (mimosaNode) {
            mimosaNode.isInscripcionStar = true;
            mimosaNode.isClickable = true;
            mimosaNode.inscripcionIndex = 0;
            mimosaNode.symbol = 'β Inscripciones';
        }

        if (INSCRIPCION_FORMS_DATA.length > 1 && mimosaNode) {
            const extraOffsets = [
                { dx: -178, dy: -46, lp: 'left' },
                { dx: -168, dy: 64, lp: 'left' },
                { dx: -195, dy: 12, lp: 'left' }
            ];
            const extraStars = INSCRIPCION_FORMS_DATA.slice(1).map((form, idx) => {
                const off = extraOffsets[idx % extraOffsets.length];
                const radiusMul = 1 + Math.floor(idx / extraOffsets.length) * 0.3;
                return {
                    id: `inscripcion-star-${form.id}`,
                    symbol: `✦ ${form.title}`,
                    dx: Math.round(off.dx * radiusMul),
                    dy: Math.round(off.dy * radiusMul),
                    r: 4.8,
                    color: '#FFFFFF',
                    halo: 'rgba(255, 255, 255, 0.18)',
                    ringColor: 'rgba(255, 255, 255, 0.24)',
                    hoverRingColor: 'rgba(255, 255, 255, 0.72)',
                    isInscripcionStar: true,
                    isClickable: true,
                    isClusterHub: false,
                    inscripcionIndex: idx + 1,
                    labelPos: off.lp
                };
            });

            const createdExtraNodes = registerStarCluster(extraStars, [], SECTORS[0].worldX, SECTORS[0].worldY, {
                sectorIndex: 0,
                clusterType: 'inscripcion'
            });

            createdExtraNodes.forEach((node, idx) => {
                const prevNode = idx === 0 ? mimosaNode : createdExtraNodes[idx - 1];
                worldEdges.push({
                    sectorIndex: 0,
                    clusterType: 'inscripcion',
                    nodeA: prevNode,
                    nodeB: node,
                    ctrlX: 0,
                    ctrlY: 0,
                    vx: 0,
                    vy: 0,
                    glow: 0
                });
            });
        }
    }
    window.rebuildInscripcionConstellation = rebuildInscripcionConstellation;

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

            const welcomePhotoCard = document.getElementById('stageWelcomePhotoCard');
            if (welcomePhotoCard) {
                welcomePhotoCard.style.display = (sIdx === 0) ? '' : 'none';
            }

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
                    '01 / 04 · Acrux 518',
                    '02 / 04 · Unidades',
                    '03 / 04 · Campamentos',
                    '04 / 04 · El Baúl'
                ];
                progressEl.textContent = sectorNames[sIdx] || `0${sIdx + 1} / 04`;
            }

            if (elStarNodesWrap) {
                let items = [];
                if (sIdx === 0) {
                    items = [{ label: 'α Acrux · Estrella Guía', idx: 0 }];
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
                            <span class="camps-group-title">Campamentos de Verano</span>
                            <div class="camps-group-chips">
                                ${summerItems.map(it => `
                                    <button type="button" class="star-node-chip ${it.isRed ? 'is-red-chip' : ''} ${it.idx === subIdx ? 'active' : ''}" data-sub-idx="${it.idx}">
                                        ${it.label}
                                    </button>
                                `).join('')}
                            </div>
                        </div>
                        <div class="camps-constellation-group" style="margin-top: 0.6rem;">
                            <span class="camps-group-title">Campamentos de Semana Santa</span>
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

    const UNIT_PAGE_META = {
        castores: {
            kicker: 'Primera Etapa Educativa · De 6 a 8 años',
            loreHeading: 'La Vida en el Estanque y Etapas de la Colonia Ohiensis'
        },
        manada: {
            kicker: 'Segunda Etapa Educativa · De 8 a 11 años',
            loreHeading: 'El Libro de las Tierras Vírgenes y la Senda de Mowgli'
        },
        tropa: {
            kicker: 'Tercera Etapa Educativa · De 11 a 14 años',
            loreHeading: 'Vida en Patrullas y Aventura Scout en Tropa Lohengrin'
        },
        escultas: {
            kicker: 'Cuarta Etapa Educativa · De 14 a 17 años',
            loreHeading: 'Empresas Escultas, Montaña y Espíritu de Unidad en Trea'
        },
        clan: {
            kicker: 'Quinta Etapa Educativa · De 17 a 20 años',
            loreHeading: 'Ruta, Proyectos y Servicio Rover en el Clan Ama Dablam'
        }
    };

    function populateUnitSuperZoomDOM(unitIdx) {
        const unit = UNITS_DATA[unitIdx] || UNITS_DATA[0];
        const unitId = unit.id || 'castores';
        const pageMeta = UNIT_PAGE_META[unitId] || UNIT_PAGE_META.castores;

        selectedSubIdx = unitIdx;

        if (elUnitZoomOverlay) {
            elUnitZoomOverlay.style.setProperty('--unit-accent', unit.accentColor || '#38BDF8');
            elUnitZoomOverlay.style.setProperty('--unit-glow', unit.glowColor || 'rgba(56, 189, 248, 0.18)');
            elUnitZoomOverlay.setAttribute('data-unit-world', unitId);
        }

        const biomeTag = document.getElementById('uzWorldBiomeTag');
        if (biomeTag) biomeTag.textContent = pageMeta.kicker;
        const loreHeading = document.getElementById('uzLoreHeading');
        if (loreHeading) loreHeading.textContent = pageMeta.loreHeading;

        const elStarCoords = document.getElementById('uzStarCoords');
        if (elStarCoords) elStarCoords.textContent = `ESTRELLA 0${unitIdx + 1} / 05 · ${unit.colorLabel || 'LÍNEA DE LAS UNIDADES'}`;
        document.getElementById('uzAgePill').textContent = unit.age;
        document.getElementById('uzConstellationName').textContent = unit.constellationTitle;
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
                heroVisual.innerHTML = `
                    <img src="${unit.bannerImg}" alt="Fotografía de ${unit.fullName}" class="unit-banner-img" loading="eager">
                    <span class="unit-photo-caption">${SVG_ICONS.camera} ${unit.fullName} · Haz clic para ampliar</span>
                `;
                heroVisual.onclick = () => openLightbox(unit.bannerImg, unit.fullName, `${unit.age} · ${unit.motto}`);
            } else if (unit.heroSvg) {
                heroVisual.innerHTML = unit.heroSvg;
                heroVisual.onclick = null;
            } else {
                heroVisual.innerHTML = '';
                heroVisual.onclick = null;
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

        // 1 · METODOLOGÍA Y ETAPAS DE PROGRESIÓN (ESTÉTICA DE CRISTAL ESTELAR)
        const pillarsWrap = document.getElementById('uzPillarsList');
        if (pillarsWrap) {
            const stageItems = (unit.pillars || []).map((p, idx) => `
                <div class="sz-pillar-item">
                    <span class="pillar-num-badge">${stripHtmlTags(p.badge) || `ETAPA 0${idx + 1}`}</span>
                    <strong>${stripHtmlTags(p.title)}</strong>
                    <span>${stripHtmlTags(p.desc)}</span>
                </div>
            `);
            pillarsWrap.innerHTML = stageItems.join('');
        }

        // 2 · LOS KRAALETES DE LA UNIDAD (CROMOS 3/4 CON BRILLO HOLOGRÁFICO)
        const kraalWrap = document.getElementById('uzKraaletesGrid');
        if (kraalWrap) {
            kraalWrap.innerHTML = unit.kraaletes.map((k, kIdx) => {
                const hasCromo = !!k.cromoUrl;
                const cleanName = stripHtmlTags(k.name || 'Scouter');
                const cleanRole = stripHtmlTags(k.role || 'Kraalete');
                const cleanRealName = stripHtmlTags(k.realName || '');
                return `
                    <article class="kraalete-cromo-card ${hasCromo ? 'has-cromo-img' : 'no-cromo'}" data-cromo-idx="${kIdx}">
                        <div class="cromo-inner">
                            ${hasCromo ? `
                                <img src="${escapeAttr(k.cromoUrl)}" alt="${escapeAttr(cleanName)}" class="kraalete-cromo-img" referrerpolicy="no-referrer" loading="lazy">
                            ` : `
                                <div class="cromo-fallback-content">
                                    <div class="cromo-scout-badge">${SVG_ICONS.compass}</div>
                                    <span class="cromo-unit-tag">${unit.shortName}</span>
                                    <strong class="cromo-fallback-name">${cleanName}</strong>
                                    <span class="cromo-fallback-role">${cleanRole}</span>
                                </div>
                            `}
                            <div class="cromo-bottom-label">
                                <strong class="cromo-label-name">${cleanName}</strong>
                                <span class="cromo-label-role">${cleanRealName ? `«${cleanRealName}»` : cleanRole}</span>
                            </div>
                            <div class="cromo-sheen" aria-hidden="true"></div>
                        </div>
                    </article>
                `;
            }).join('');

            kraalWrap.querySelectorAll('.kraalete-cromo-card').forEach(card => {
                card.addEventListener('mousemove', (e) => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    const rotX = ((y - centerY) / centerY) * -10;
                    const rotY = ((x - centerX) / centerX) * 10;
                    const percentX = (x / rect.width) * 100;
                    const percentY = (y / rect.height) * 100;
                    const sheen = card.querySelector('.cromo-sheen');

                    card.style.transform = `perspective(800px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
                    if (sheen) {
                        sheen.style.background = `radial-gradient(circle at ${percentX}% ${percentY}%, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.08) 45%, transparent 70%)`;
                        sheen.style.opacity = '1';
                    }
                });
                card.addEventListener('mouseleave', () => {
                    card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
                    const sheen = card.querySelector('.cromo-sheen');
                    if (sheen) sheen.style.opacity = '0';
                });
                card.addEventListener('click', () => {
                    const idx = parseInt(card.getAttribute('data-cromo-idx'), 10);
                    const k = unit.kraaletes[idx];
                    if (!k) return;
                    openCromoZoomModal(k, unit);
                });
            });
        }

        // 3 · AVENTURAS, SALIDAS Y CAMPAMENTOS DE LA UNIDAD (DRIVE)
        const campsGrid = document.getElementById('uzUnitCampsGrid');
        if (campsGrid) {
            if (unit.salidas && Array.isArray(unit.salidas) && unit.salidas.length > 0) {
                campsGrid.innerHTML = unit.salidas.map(s => {
                    const photosHtml = (s.photos && s.photos.length > 0)
                        ? `<div class="salida-photos-row">
                            ${s.photos.slice(0, 3).map((p, pIdx) => `
                                <div class="salida-photo-thumb" data-photo-src="${escapeAttr(p)}" data-photo-title="${escapeAttr(s.name)} · Foto ${pIdx + 1}">
                                    <img src="${escapeAttr(p)}" alt="${escapeAttr(s.name)} ${pIdx + 1}" referrerpolicy="no-referrer" loading="lazy">
                                </div>
                            `).join('')}
                           </div>`
                        : '';

                    return `
                        <article class="unit-salida-card" data-salida-id="${escapeAttr(s.id)}">
                            <div class="salida-card-header">
                                <div class="salida-tags-row">
                                    <span class="salida-badge">${SVG_ICONS.compass} Salida / Acampada</span>
                                    ${s.location ? `<span class="salida-location-tag">${stripHtmlTags(s.location)}</span>` : ''}
                                    ${s.date ? `<span class="salida-date-tag">${SVG_ICONS.calendar} ${stripHtmlTags(s.date)}</span>` : ''}
                                </div>
                                <h4 class="salida-title">${stripHtmlTags(s.name)}</h4>
                                <p class="salida-desc">${stripHtmlTags(s.desc) || 'Álbum oficial sincronizado directamente desde Google Drive.'}</p>
                            </div>
                            ${photosHtml}
                            <div class="salida-unlock-box">
                                <div class="salida-input-row">
                                    <input type="password" class="dossier-form-input salida-pass-input" placeholder="Contraseña para abrir el álbum en Drive...">
                                    <button type="button" class="btn-cosmos-primary salida-unlock-btn" data-salida-id="${s.id}">
                                        <span>Abrir Álbum en Drive</span>
                                        <span class="btn-arrow">↗</span>
                                    </button>
                                </div>
                                <small class="salida-unlock-feedback"></small>
                            </div>
                        </article>
                    `;
                }).join('');

                campsGrid.querySelectorAll('.salida-photo-thumb').forEach(thumb => {
                    thumb.addEventListener('click', () => {
                        const src = thumb.getAttribute('data-photo-src');
                        const title = thumb.getAttribute('data-photo-title');
                        if (src) openLightbox(src, title, unit.fullName);
                    });
                });

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
                        <div class="empty-icon-wrap">${SVG_ICONS.folder}</div>
                        <h4>Aún no hay álbumes de salidas publicados en el Google Drive de esta unidad</h4>
                        <p>Las carpetas creadas en <code>01_UNIDADES / ${unit.fullName.split('·')[0].trim()}</code> con fotos aparecerán aquí automáticamente.</p>
                    </div>
                `;
            }
        }

        // Selector superior de Unidades
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

        // Botones inferiores de navegación entre Unidades
        const prevUnitBtn = document.getElementById('uzPrevUnitBtn');
        const nextUnitBtn = document.getElementById('uzNextUnitBtn');
        const backSkyBtn = document.getElementById('uzFooterBackToSkyBtn');

        if (prevUnitBtn) {
            const prevIdx = (unitIdx - 1 + UNITS_DATA.length) % UNITS_DATA.length;
            prevUnitBtn.textContent = `← Anterior: ${UNITS_DATA[prevIdx].shortName}`;
            prevUnitBtn.onclick = () => openUnitSuperZoom(prevIdx);
        }
        if (nextUnitBtn) {
            const nextIdx = (unitIdx + 1) % UNITS_DATA.length;
            nextUnitBtn.textContent = `Siguiente: ${UNITS_DATA[nextIdx].shortName} →`;
            nextUnitBtn.onclick = () => openUnitSuperZoom(nextIdx);
        }
        if (backSkyBtn) {
            backSkyBtn.onclick = () => closeAllSuperZooms(false);
        }
    }

    function openUnitSuperZoom(unitIdx) {
        const unit = UNITS_DATA[unitIdx] || UNITS_DATA[0];
        pushStarRoute(`unidad-${unit.id || unitIdx}`);
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

        document.body.classList.add('is-superzoom-open');
        populateUnitSuperZoomDOM(unitIdx);

        if (wasAlreadyOpen && elUnitZoomOverlay) {
            const container = elUnitZoomOverlay.querySelector('.star-tab-container') || elUnitZoomOverlay;
            container.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        const diveTime = 160;
        triggerStarDiveFlash(unit.worldX, unit.worldY, 240);

        elCampZoomOverlay?.classList.remove('is-open');
        elCampZoomOverlay?.setAttribute('aria-hidden', 'true');
        elLostZoomOverlay?.classList.remove('is-open');
        elLostZoomOverlay?.setAttribute('aria-hidden', 'true');

        diveTabTimer = setTimeout(() => {
            if (elUnitZoomOverlay) {
                elUnitZoomOverlay.classList.add('is-open');
                elUnitZoomOverlay.setAttribute('aria-hidden', 'false');
                const container = elUnitZoomOverlay.querySelector('.star-tab-container') || elUnitZoomOverlay;
                container.scrollTop = 0;
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

    // =========================================================================
    // 8D. MODAL SPLIT-CARD DE KRAALETE (2 COLUMNAS: CROMO 3:4 + FICHA EDITORIAL)
    // =========================================================================
    const elCromoZoomModal = document.getElementById('cromoZoomModal');
    const elCromoSplitDialog = document.getElementById('cromoSplitDialog');
    const elCromoZoomCard = document.getElementById('cromoZoomCard');
    const elCromoZoomInner = document.getElementById('cromoZoomInner');
    const elCromoSplitUnitBadge = document.getElementById('cromoSplitUnitBadge');
    const elCromoSplitRole = document.getElementById('cromoSplitRole');
    const elCromoSplitTitle = document.getElementById('cromoSplitTitle');
    const elCromoSplitSubtitle = document.getElementById('cromoSplitSubtitle');
    const elCromoSplitBio = document.getElementById('cromoSplitBio');
    const elBtnCloseCromoZoom = document.getElementById('btnCloseCromoZoom');

    function openCromoZoomModal(k, unit, secretOptions = null) {
        if (!elCromoZoomModal || !elCromoZoomCard || !elCromoZoomInner || !k) return;
        const accent = (unit && unit.accentColor) ? unit.accentColor : '#38BDF8';
        const glow = (unit && unit.glowColor) ? unit.glowColor : 'rgba(56, 189, 248, 0.28)';

        elCromoZoomCard.classList.remove('secret-cromo-holo', 'has-effect-holo', 'rarity-comun', 'rarity-raro', 'rarity-epico', 'rarity-legendario');
        const secretRarity = secretOptions && secretOptions.rarity ? secretOptions.rarity : null;
        if (secretRarity) {
            elCromoZoomCard.classList.add('secret-cromo-holo', `rarity-${secretRarity}`);
            elCromoZoomCard.style.setProperty('--holo-x', '50%');
            elCromoZoomCard.style.setProperty('--holo-y', '50%');
        }

        if (elCromoSplitDialog) {
            elCromoSplitDialog.style.setProperty('--unit-accent', accent);
            elCromoSplitDialog.style.setProperty('--unit-glow', glow);
        }
        elCromoZoomCard.style.setProperty('--unit-accent', accent);
        elCromoZoomCard.style.setProperty('--unit-glow', glow);
        elCromoZoomCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';

        const cleanName = stripHtmlTags(k.name || 'Scouter');
        const cleanRole = stripHtmlTags(k.role || 'Kraalete');
        const cleanRealName = stripHtmlTags(k.realName || '');
        const cleanBio = stripHtmlTags(k.bio || '');
        const zoomBadgeHtml = (secretOptions && secretOptions.rarityLabel)
            ? `<div class="secret-cromo-badge-top">
                    <span class="secret-rarity-pill rarity-${escapeAttr(secretRarity || 'comun')}">${escapeAttr(secretOptions.rarityLabel)}</span>
               </div>`
            : '';
        const zoomEffectHtml = secretRarity === 'epico' || secretRarity === 'legendario'
            ? '<div class="secret-holo-foil" aria-hidden="true"></div>'
            : (secretRarity === 'raro' ? '<div class="secret-rare-sweep" aria-hidden="true"></div>' : '');

        const hasCromo = Boolean(k.cromoUrl);
        elCromoZoomInner.innerHTML = `
            ${hasCromo ? `
                <img src="${escapeAttr(k.cromoUrl)}" alt="${escapeAttr(cleanName)}" class="kraalete-cromo-img" referrerpolicy="no-referrer">
            ` : `
                <div class="cromo-fallback-content">
                    <div class="cromo-scout-badge">${SVG_ICONS.compass}</div>
                    <span class="cromo-unit-tag">${unit ? unit.shortName : 'ACRUX 518'}</span>
                    <strong class="cromo-fallback-name" id="cromoZoomName">${cleanName}</strong>
                    <span class="cromo-fallback-role">${cleanRole}</span>
                </div>
            `}
            ${zoomBadgeHtml}
            <div class="cromo-bottom-label">
                <strong class="cromo-label-name">${cleanName}</strong>
                <span class="cromo-label-role">${cleanRealName ? `«${cleanRealName}»` : cleanRole}</span>
            </div>
            ${zoomEffectHtml}
            <div class="cromo-sheen" aria-hidden="true"></div>
        `;

        // Poblar Columna Derecha (Panel Editorial con Nombre Real y Biografía desde Drive)
        const unitFullName = unit ? unit.fullName : 'Grupo Scout Acrux 518';
        const unitShortName = unit ? unit.shortName : 'ACRUX 518';
        if (elCromoSplitUnitBadge) {
            elCromoSplitUnitBadge.textContent = `KRAALETE · ${unitShortName.toUpperCase()}`;
        }
        if (elCromoSplitRole) {
            elCromoSplitRole.textContent = `${cleanRole} · ${unitFullName}`;
        }
        if (elCromoSplitTitle) {
            elCromoSplitTitle.textContent = cleanName;
        }
        if (elCromoSplitSubtitle) {
            elCromoSplitSubtitle.textContent = cleanRealName
                ? `«${cleanRealName}» · ${unitFullName}`
                : `«${cleanName}» · ${unitFullName}`;
        }
        if (elCromoSplitBio) {
            elCromoSplitBio.textContent = cleanBio
                || `Scouter del Kraalete de ${unitFullName} en el Grupo Scout Acrux 518. Acompaña cada sábado y acampada educando en valores, escultismo y contacto directo con la naturaleza.`;
        }

        elCromoZoomModal.classList.add('is-open');
        elCromoZoomModal.setAttribute('aria-hidden', 'false');
    }

    function closeCromoZoomModal() {
        if (!elCromoZoomModal) return;
        elCromoZoomModal.classList.remove('is-open');
        elCromoZoomModal.setAttribute('aria-hidden', 'true');
        if (elCromoZoomCard) {
            elCromoZoomCard.classList.remove('secret-cromo-holo', 'has-effect-holo', 'rarity-comun', 'rarity-raro', 'rarity-epico', 'rarity-legendario');
            elCromoZoomCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        }
    }

    if (elCromoZoomCard) {
        elCromoZoomCard.addEventListener('mousemove', (e) => {
            const rect = elCromoZoomCard.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotX = ((y - centerY) / centerY) * -12;
            const rotY = ((x - centerX) / centerX) * 12;
            const percentX = (x / rect.width) * 100;
            const percentY = (y / rect.height) * 100;
            const sheen = elCromoZoomCard.querySelector('.cromo-sheen');

            elCromoZoomCard.style.setProperty('--holo-x', `${percentX.toFixed(1)}%`);
            elCromoZoomCard.style.setProperty('--holo-y', `${percentY.toFixed(1)}%`);
            elCromoZoomCard.style.transform = `perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) scale3d(1.03, 1.03, 1.03)`;
            if (sheen) {
                sheen.style.background = `radial-gradient(circle at ${percentX}% ${percentY}%, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.1) 45%, transparent 72%)`;
                sheen.style.opacity = '1';
            }
        });
        elCromoZoomCard.addEventListener('mouseleave', () => {
            elCromoZoomCard.style.setProperty('--holo-x', '50%');
            elCromoZoomCard.style.setProperty('--holo-y', '50%');
            elCromoZoomCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            const sheen = elCromoZoomCard.querySelector('.cromo-sheen');
            if (sheen) sheen.style.opacity = '0';
        });
    }

    elBtnCloseCromoZoom?.addEventListener('click', closeCromoZoomModal);
    elCromoZoomModal?.addEventListener('click', (e) => {
        if (e.target === elCromoZoomModal) closeCromoZoomModal();
    });

    function openCampSuperZoom(campIdx) {
        if (!CAMPS_DATA || CAMPS_DATA.length === 0) return;
        const camp = CAMPS_DATA[campIdx] || CAMPS_DATA[0];
        if (!camp) return;
        pushStarRoute(`campamento-${campIdx}`);

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
            const seasonName = camp.seasonType === 'easter' ? 'CAMPAMENTO DE SEMANA SANTA' : 'CAMPAMENTO DE VERANO';
            kicker.textContent = camp.isRedStar
                ? `ÚLTIMO ${seasonName}`
                : seasonName;
        }

        const seasonPill = document.getElementById('czSeasonPill');
        if (seasonPill) {
            seasonPill.textContent = camp.seasonType === 'easter'
                ? 'CAMPAMENTOS DE SEMANA SANTA'
                : 'CAMPAMENTOS DE VERANO';
        }
        const locPill = document.getElementById('czLocationPill');
        if (locPill) locPill.textContent = stripHtmlTags(camp.location) || 'Ubicación en naturaleza';
        const folderBadge = document.getElementById('czDriveFolderBadge');
        if (folderBadge) folderBadge.textContent = `Drive: ${stripHtmlTags(camp.driveFolderName || camp.name)}`;
        document.getElementById('czTitle').textContent = stripHtmlTags(camp.name);
        document.getElementById('czDesc').textContent = stripHtmlTags(camp.desc);

        const folderTitle = document.getElementById('czDriveFolderTitle');
        if (folderTitle) folderTitle.textContent = `Carpeta: ${stripHtmlTags(camp.driveFolderName || camp.name)}`;

        const threePhotosGrid = document.getElementById('czThreePhotosGrid');
        if (threePhotosGrid) {
            const photos = camp.photos || [];
            if (photos.length === 0) {
                threePhotosGrid.innerHTML = `
                    <div class="camp-photos-empty-card">
                        <div class="camp-photos-empty-icon">${SVG_ICONS.folder}</div>
                        <h4>Carpeta sincronizada desde Drive</h4>
                        <p>Aún sin fotos de muestra en esta carpeta de Google Drive.</p>
                    </div>
                `;
            } else {
                const samplePhotos = photos.slice(0, 3);
                threePhotosGrid.innerHTML = samplePhotos.map((ph, i) => `
                    <article class="camp-photo-card" data-lightbox-src="${escapeAttr(ph.src)}" data-lightbox-title="${escapeAttr(ph.title || camp.name)}" data-lightbox-meta="Foto 0${i + 1}/03 · ${escapeAttr(camp.name)}">
                        <div class="camp-photo-img-wrap">
                            <span class="camp-photo-badge">MUESTRA 0${i + 1} / 03 · DRIVE</span>
                            <img src="${escapeAttr(ph.src)}" alt="${escapeAttr(ph.title || 'Foto de campamento')}" loading="lazy" referrerpolicy="no-referrer">
                            <span class="camp-photo-enlarge-hint">${SVG_ICONS.zoomIn} Ampliar</span>
                        </div>
                        <div class="camp-photo-caption">
                            <strong>${stripHtmlTags(ph.title || camp.name)}</strong>
                            <span>${stripHtmlTags(ph.meta) || `Muestra fotográfica sincronizada desde Google Drive`}</span>
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
            campSw.innerHTML = CAMPS_DATA.map((c, i) => `
                <button type="button" class="star-node-chip ${c.isRedStar ? 'is-red-chip' : ''} ${i === campIdx ? 'active' : ''}" data-jump-camp="${i}" title="${c.name}">
                    <span>${c.starSymbol}</span>
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
            if (folderPill) folderPill.textContent = 'Google Drive / 04_OBJETOS_PERDIDOS';
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

        if (folderPill) folderPill.textContent = cajon.drivePath;
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
                    <span>${cj.starSymbol}</span>
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
                    <span class="cajon-star-orb">${SVG_ICONS.box}</span>
                    <div class="cajon-ministar-meta">
                        <strong>${cj.starSymbol}</strong>
                        <span>${cj.folderName} (${cj.items.length} prendas)</span>
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
                <article class="lost-photo-card" data-item-name="${escapeAttr(it.name)}">
                    <div class="lost-photo-art" title="Clic para ampliar foto">
                        ${it.svg ? it.svg : `<img src="${escapeAttr(imgSrc)}" alt="${escapeAttr(it.name)}" loading="lazy" referrerpolicy="no-referrer">`}
                        <span class="lost-drive-file-chip">${stripHtmlTags(it.file)}</span>
                    </div>
                    <div class="lost-photo-body">
                        <div>
                            <h4>${stripHtmlTags(it.name)}</h4>
                            <p>${stripHtmlTags(it.desc)}</p>
                        </div>
                        <div class="lost-photo-footer">
                            <span class="star-pillar-tag">Sede Rueda 53</span>
                            <button type="button" class="lost-claim-btn" data-claim-item="${escapeAttr(it.name)}">Es mío · Reclamar</button>
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
                    const itemName = stripHtmlTags(btn.getAttribute('data-claim-item'));
                    const banner = document.getElementById('lzClaimBanner');
                    const waText = `Hola Acrux, he visto en la web en El Baúl la prenda "${itemName}" (${cajon.folderName}) y es mía. Me gustaría pasar a recogerla este sábado por la base de Carretera de Rueda 53. ¡Muchas gracias!`;
                    // Teléfono del primer coordinador de Drive (sin espacios); 616289119 solo como respaldo
                    const coordWithPhone = Array.isArray(coordinadoresDrive)
                        ? coordinadoresDrive.find(c => String(c.telefono || c.phone || '').replace(/\s+/g, '').length >= 6)
                        : null;
                    const firstCoordPhone = coordWithPhone
                        ? String(coordWithPhone.telefono || coordWithPhone.phone || '').replace(/\s+/g, '')
                        : '';
                    const coordPhone = firstCoordPhone || '616289119';
                    const waPhone = (coordPhone.startsWith('+') ? coordPhone.slice(1) : (coordPhone.length === 9 ? '34' + coordPhone : coordPhone));
                    const waUrl = `https://wa.me/${waPhone}?text=${encodeURIComponent(waText)}`;
                    if (banner) {
                        banner.style.display = 'block';
                        banner.innerHTML = `<strong>Solicitud registrada para «${escapeAttr(itemName)}» (${escapeAttr(cajon.folderName)}):</strong> Hemos abierto WhatsApp para avisar a Coordinación. Pásate cualquier sábado de <strong>16:30 a 18:30 h</strong> por nuestra Base de <strong>Carretera de Rueda, 53</strong> para recogerlo.`;
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
        pushStarRoute(`baul-${cajonIdx}`);
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

    let pendingDrawerScrollTarget = null;

    function openAcruxSuperZoom(focusTargetId = null) {
        pushStarRoute('acrux');
        pendingDrawerScrollTarget = focusTargetId || null;
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
        const merchOverlay = document.getElementById('merchModal');
        merchOverlay?.classList.remove('is-open');
        merchOverlay?.setAttribute('aria-hidden', 'true');

        diveTabTimer = setTimeout(() => {
            openDrawerModal('identity');
        }, 180);
    }

    let isHandlingPopState = false;
    function pushStarRoute(slug) {
        if (isHandlingPopState) return;
        try {
            const targetHash = `#estrella=${encodeURIComponent(slug)}`;
            if (window.location.hash !== targetHash) {
                if (window.location.hash.startsWith('#estrella=')) {
                    history.replaceState({ starView: slug }, '', targetHash);
                } else {
                    history.pushState({ starView: slug }, '', targetHash);
                }
            }
        } catch (_) {}
    }

    function clearStarRoute() {
        if (isHandlingPopState) return;
        try {
            if (window.location.hash.startsWith('#estrella=')) {
                history.replaceState(null, '', window.location.pathname + window.location.search);
            }
        } catch (_) {}
    }

    window.addEventListener('popstate', () => {
        if (!window.location.hash.startsWith('#estrella=')) {
            isHandlingPopState = true;
            try {
                closeAllSuperZooms(true);
                closeDrawerModal();
            } finally {
                isHandlingPopState = false;
            }
        }
    });

    function closeAllSuperZooms(resetPan = true) {
        clearStarRoute();
        clearTimeout(diveTabTimer);
        closeLightbox();
        closeCromoZoomModal();
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
        const merchOverlay = document.getElementById('merchModal');
        merchOverlay?.classList.remove('is-open');
        merchOverlay?.setAttribute('aria-hidden', 'true');
        document.getElementById('documentosModal')?.classList.remove('is-open');
        document.getElementById('documentosModal')?.setAttribute('aria-hidden', 'true');
        document.getElementById('kraalGeneralModal')?.classList.remove('is-open');
        document.getElementById('kraalGeneralModal')?.setAttribute('aria-hidden', 'true');
        document.getElementById('calendarioModal')?.classList.remove('is-open');
        document.getElementById('calendarioModal')?.setAttribute('aria-hidden', 'true');
        if (resetPan) {
            targetFreePanX = 0;
            targetFreePanY = 0;
        }
    }

    // =========================================================================
    // 8B. ACCESOS DIRECTOS SECTOR I: DOCUMENTOS, EL KRAAL Y CALENDARIO + MODO DÍA
    // =========================================================================
    const elDocumentosModal = document.getElementById('documentosModal');
    const elDocumentosModalBody = document.getElementById('documentosModalBody');
    const elKraalGeneralModal = document.getElementById('kraalGeneralModal');
    const elKraalGeneralModalBody = document.getElementById('kraalGeneralModalBody');
    const elCalendarioModal = document.getElementById('calendarioModal');
    const elCalendarioModalBody = document.getElementById('calendarioModalBody');

    function launchSectorOneSubModal(node, modalEl) {
        if (!modalEl) return;
        const sec0 = SECTORS[0];
        const targetWx = node ? node.wx : sec0.worldX;
        const targetWy = node ? node.wy : sec0.worldY;
        clearTimeout(diveTabTimer);
        isOverviewMode = false;
        document.body.classList.remove('is-overview-mode');
        targetSectorProgress = 0;
        activeSectorIdx = 0;
        superZoomState = { type: 'sector-sub', index: 0, wx: targetWx, wy: targetWy, zoom: 20.0 };
        document.body.classList.add('is-superzoom-open');
        triggerStarDiveFlash(targetWx, targetWy, 240);
        diveTabTimer = setTimeout(() => {
            modalEl.classList.add('is-open');
            modalEl.setAttribute('aria-hidden', 'false');
        }, 160);
    }

    function openDocumentosModal(node) {
        if (!elDocumentosModal || !elDocumentosModalBody) return;
        const docArrow = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>';
        elDocumentosModalBody.innerHTML = `
            <div class="docs-hero">
                <span class="docs-hero-kicker">DOCUMENTACIÓN OFICIAL · GRUPO SCOUT ACRUX 518</span>
                <h2 class="docs-hero-title">Documentos y Guías del Grupo</h2>
                <p class="docs-hero-desc">Aquí tienes toda la documentación necesaria para inscribirte, conocer el proyecto educativo del grupo y consultar las guías metodológicas de cada rama.</p>
            </div>

            <section class="docs-block">
                <div class="docs-block-header">
                    <div>
                        <h3 class="docs-block-title">1. Inscripción</h3>
                        <p class="docs-block-subtitle">Descarga cada documento, rellénalo y envíalo a <strong>secretaria.acrux@gmail.com</strong></p>
                    </div>
                    <a href="mailto:secretaria.acrux@gmail.com?subject=Documentaci%C3%B3n%20Inscripci%C3%B3n%20Acrux%20518" class="docs-mail-btn">
                        Enviar a secretaria.acrux@gmail.com
                    </a>
                </div>
                <div class="docs-grid">
                    <a class="doc-download-card" href="https://scoutacrux.com/wp-content/uploads/2023/10/Ficha-de-pertenencia.pdf" target="_blank" rel="noopener">
                        <div class="doc-download-meta">
                            <span class="doc-download-badge">PDF · INSCRIPCIÓN</span>
                            <span class="doc-download-title">Ficha de pertenencia</span>
                        </div>
                        <span class="doc-download-icon">${docArrow}</span>
                    </a>
                    <a class="doc-download-card" href="https://scoutacrux.com/wp-content/uploads/2023/10/Permiso-medicamentos.pdf" target="_blank" rel="noopener">
                        <div class="doc-download-meta">
                            <span class="doc-download-badge">PDF · INSCRIPCIÓN</span>
                            <span class="doc-download-title">Permiso de medicamentos</span>
                        </div>
                        <span class="doc-download-icon">${docArrow}</span>
                    </a>
                    <a class="doc-download-card" href="https://scoutacrux.com/wp-content/uploads/2023/10/Permiso-de-imagen-ASDE.pdf" target="_blank" rel="noopener">
                        <div class="doc-download-meta">
                            <span class="doc-download-badge">PDF · INSCRIPCIÓN</span>
                            <span class="doc-download-title">Permiso de Imagen de ASDE</span>
                        </div>
                        <span class="doc-download-icon">${docArrow}</span>
                    </a>
                </div>
            </section>

            <section class="docs-block">
                <div class="docs-block-header">
                    <div>
                        <h3 class="docs-block-title">2. Información General</h3>
                        <p class="docs-block-subtitle">Cuotas, proyecto educativo y normas del grupo</p>
                    </div>
                </div>
                <div class="docs-grid">
                    <a class="doc-download-card" href="https://scoutacrux.com/wp-content/uploads/2023/10/Cuotas-del-Grupo.pdf" target="_blank" rel="noopener">
                        <div class="doc-download-meta">
                            <span class="doc-download-badge">PDF · INFORMACIÓN</span>
                            <span class="doc-download-title">Cuotas del Grupo</span>
                        </div>
                        <span class="doc-download-icon">${docArrow}</span>
                    </a>
                    <a class="doc-download-card" href="https://scoutacrux.com/wp-content/uploads/2023/10/PEG-Grupo-Scout-Acrux-518.pdf" target="_blank" rel="noopener">
                        <div class="doc-download-meta">
                            <span class="doc-download-badge">PDF · INFORMACIÓN</span>
                            <span class="doc-download-title">Proyecto Educativo de Grupo (PEG)</span>
                        </div>
                        <span class="doc-download-icon">${docArrow}</span>
                    </a>
                    <a class="doc-download-card" href="https://scoutacrux.com/wp-content/uploads/2023/10/Reglamento-de-Regimen-Interno.pdf" target="_blank" rel="noopener">
                        <div class="doc-download-meta">
                            <span class="doc-download-badge">PDF · INFORMACIÓN</span>
                            <span class="doc-download-title">Reglamento de Régimen Interno</span>
                        </div>
                        <span class="doc-download-icon">${docArrow}</span>
                    </a>
                </div>
            </section>

            <section class="docs-block">
                <div class="docs-block-header">
                    <div>
                        <h3 class="docs-block-title">3. Guías Metodológicas por Sección</h3>
                        <p class="docs-block-subtitle">Material educativo oficial para familias y educandos de las 5 ramas</p>
                    </div>
                </div>
                <div class="docs-grid">
                    <a class="doc-download-card" href="https://scoutacrux.com/wp-content/uploads/2023/10/Guia-Castores.pdf" target="_blank" rel="noopener">
                        <div class="doc-download-meta">
                            <span class="doc-download-badge">COLONIA · 6–8 AÑOS</span>
                            <span class="doc-download-title">Castores (6–8 años)</span>
                        </div>
                        <span class="doc-download-icon">${docArrow}</span>
                    </a>
                    <a class="doc-download-card" href="https://scoutacrux.com/wp-content/uploads/2023/10/Guia-Manada.pdf" target="_blank" rel="noopener">
                        <div class="doc-download-meta">
                            <span class="doc-download-badge">MANADA · 8–11 AÑOS</span>
                            <span class="doc-download-title">Manada (8–11 años)</span>
                        </div>
                        <span class="doc-download-icon">${docArrow}</span>
                    </a>
                    <a class="doc-download-card" href="https://scoutacrux.com/wp-content/uploads/2023/10/Guia-Tropa.pdf" target="_blank" rel="noopener">
                        <div class="doc-download-meta">
                            <span class="doc-download-badge">TROPA · 11–14 AÑOS</span>
                            <span class="doc-download-title">Sección Scout / Tropa (11–14 años)</span>
                        </div>
                        <span class="doc-download-icon">${docArrow}</span>
                    </a>
                    <a class="doc-download-card" href="https://scoutacrux.com/wp-content/uploads/2023/10/Guia-Escultas.pdf" target="_blank" rel="noopener">
                        <div class="doc-download-meta">
                            <span class="doc-download-badge">UNIDAD · 14–17 AÑOS</span>
                            <span class="doc-download-title">Escultas (14–17 años)</span>
                        </div>
                        <span class="doc-download-icon">${docArrow}</span>
                    </a>
                    <a class="doc-download-card" href="https://scoutacrux.com/wp-content/uploads/2023/10/Guia-Clan.pdf" target="_blank" rel="noopener">
                        <div class="doc-download-meta">
                            <span class="doc-download-badge">CLAN · 17–20 AÑOS</span>
                            <span class="doc-download-title">Clan (17–20 años)</span>
                        </div>
                        <span class="doc-download-icon">${docArrow}</span>
                    </a>
                </div>
            </section>
        `;
        launchSectorOneSubModal(node, elDocumentosModal);
    }

    function openKraalGeneralModal(node) {
        if (!elKraalGeneralModal || !elKraalGeneralModalBody) return;
        const coordsHtml = (Array.isArray(coordinadoresDrive) && coordinadoresDrive.length > 0)
            ? `
                <section class="kraal-unit-section">
                    <div class="kraal-unit-header">
                        <h3 class="kraal-unit-title"><span class="kraal-unit-dot" style="background:#D9383A;"></span>Coordinación de Grupo</h3>
                        <span class="kraal-unit-ages">Equipo de Coordinación · Acrux 518</span>
                    </div>
                    <div class="coords-drive-grid">
                        ${coordinadoresDrive.map(c => `
                            <article class="coord-drive-card">
                                ${c.photoUrl ? `<img src="${escapeAttr(c.photoUrl)}" alt="${escapeAttr(c.name || 'Coordinación')}" class="coord-avatar-img" referrerpolicy="no-referrer">` : ''}
                                <div class="coord-drive-info">
                                    <strong>${stripHtmlTags(c.name || 'Coordinador/a')}</strong>
                                    <span>${stripHtmlTags(c.role || 'Coordinación de Grupo')}</span>
                                    ${c.telefono ? `<a href="tel:${escapeAttr(String(c.telefono).replace(/\s+/g, ''))}">${stripHtmlTags(c.telefono)}</a>` : ''}
                                </div>
                            </article>
                        `).join('')}
                    </div>
                </section>
            `
            : '';

        const unitsHtml = UNITS_DATA.map((unit, uIdx) => {
            const list = Array.isArray(unit.kraaletes) ? unit.kraaletes : [];
            const cards = list.length > 0
                ? list.map((k, kIdx) => {
                    const cleanName = stripHtmlTags(k.name || 'Scouter');
                    const cleanRole = stripHtmlTags(k.role || 'Kraalete');
                    const hasCromo = Boolean(k.cromoUrl);
                    return `
                        <article class="kraalete-cromo-card ${hasCromo ? 'has-cromo-img' : 'no-cromo'}" data-unit-idx="${uIdx}" data-cromo-idx="${kIdx}">
                            <div class="cromo-inner">
                                ${hasCromo ? `<img src="${escapeAttr(k.cromoUrl)}" alt="${escapeAttr(cleanName)}" class="kraalete-cromo-img" referrerpolicy="no-referrer" loading="lazy">` : `
                                    <div class="cromo-fallback-content">
                                        <div class="cromo-scout-badge">${SVG_ICONS.compass}</div>
                                        <span class="cromo-unit-tag">${unit.shortName}</span>
                                        <strong class="cromo-fallback-name">${cleanName}</strong>
                                        <span class="cromo-fallback-role">${cleanRole}</span>
                                    </div>
                                `}
                                <div class="cromo-bottom-label">
                                    <strong class="cromo-label-name">${cleanName}</strong>
                                    <span class="cromo-label-role">${cleanRole}</span>
                                </div>
                                <div class="cromo-sheen" aria-hidden="true"></div>
                            </div>
                        </article>
                    `;
                }).join('')
                : '<p style="margin:0; font-size:0.9rem; color:var(--ice-muted);">Kraalete en actualización desde Google Drive.</p>';

            return `
                <section class="kraal-unit-section">
                    <div class="kraal-unit-header">
                        <h3 class="kraal-unit-title"><span class="kraal-unit-dot" style="background:${unit.accentColor || '#FFFFFF'};"></span>${unit.fullName}</h3>
                        <span class="kraal-unit-ages">${unit.ages || ''}</span>
                    </div>
                    <div class="unit-kraal-grid">${cards}</div>
                </section>
            `;
        }).join('');

        elKraalGeneralModalBody.innerHTML = `
            <div class="kraal-general-hero">
                <span class="kraal-general-kicker">EQUIPO DE SCOUTERS VOLUNTARIOS · ACRUX 518</span>
                <h2 class="kraal-general-title">El Kraal del Grupo Scout Acrux 518</h2>
                <p class="kraal-general-desc">Pulsa en cualquier cromo para conocer la historia, apodo scout y función de cada responsable educativo de nuestras cinco ramas.</p>
            </div>
            ${coordsHtml}
            ${unitsHtml}
        `;

        elKraalGeneralModalBody.querySelectorAll('.kraalete-cromo-card').forEach(card => {
            card.addEventListener('click', () => {
                const uIdx = parseInt(card.getAttribute('data-unit-idx'), 10);
                const kIdx = parseInt(card.getAttribute('data-cromo-idx'), 10);
                const unit = UNITS_DATA[uIdx];
                const k = unit && unit.kraaletes ? unit.kraaletes[kIdx] : null;
                if (k && unit) openCromoZoomModal(k, unit);
            });
        });

        launchSectorOneSubModal(node, elKraalGeneralModal);
    }

    function openCalendarioModal(node) {
        if (!elCalendarioModal || !elCalendarioModalBody) return;
        elCalendarioModalBody.innerHTML = `
            <div class="calendar-hero">
                <span class="calendar-hero-kicker">PLANIFICACIÓN ANUAL · RONDA SOLAR</span>
                <h2 class="calendar-hero-title">Calendario de Ronda Solar Acrux 518</h2>
                <p class="calendar-hero-desc">Nos reunimos todos los <strong>sábados de 16:30 a 18:30 h</strong> en nuestra base de Carretera de Rueda, 53 (Valladolid), además de salidas trimestrales y grandes campamentos.</p>
            </div>

            <div class="calendar-trimesters-grid">
                <article class="calendar-trimester-card">
                    <span class="calendar-trimester-tag">1º Trimestre · Oct – Dic</span>
                    <h3 class="calendar-trimester-title">Inauguración, Pases y Navidad</h3>
                    <p class="calendar-trimester-desc">Acogida de nuevos educandos, ceremonia de Pases de Unidad, salidas de otoño por secciones, Luz de la Paz de Belén y Campamento de Navidad.</p>
                </article>
                <article class="calendar-trimester-card">
                    <span class="calendar-trimester-tag">2º Trimestre · Ene – Mar/Abr</span>
                    <h3 class="calendar-trimester-title">Progresión, Promesas y Semana Santa</h3>
                    <p class="calendar-trimester-desc">Proyectos y aventuras de cada rama, acampadas de invierno, preparación de Promesas Scouts y Campamento de Semana Santa.</p>
                </article>
                <article class="calendar-trimester-card">
                    <span class="calendar-trimester-tag">3º Trimestre · Abr – Jul</span>
                    <h3 class="calendar-trimester-title">San Jorge y Campamento de Verano</h3>
                    <p class="calendar-trimester-desc">Celebración de San Jorge con ASDE Castilla y León, acampada de familias, cierre de curso en la base y gran Campamento de Verano (15 días en julio).</p>
                </article>
            </div>

            <section class="docs-block">
                <div class="docs-block-header">
                    <div>
                        <h3 class="docs-block-title">Hitos clave de la Ronda Solar</h3>
                        <p class="docs-block-subtitle">Fechas orientativas del curso scout (las circulares concretas se envían por sección)</p>
                    </div>
                </div>
                <div class="calendar-milestones-list">
                    <div class="calendar-milestone-row">
                        <span class="calendar-milestone-when">Octubre</span>
                        <strong class="calendar-milestone-name">Acampada de Inicio y Pases</strong>
                        <span class="calendar-milestone-note">Arranque oficial de la Ronda Solar y paso de rama.</span>
                    </div>
                    <div class="calendar-milestone-row">
                        <span class="calendar-milestone-when">Diciembre</span>
                        <strong class="calendar-milestone-name">Campamento de Navidad</strong>
                        <span class="calendar-milestone-note">Convivencia de grupo y reparto de la Luz de la Paz.</span>
                    </div>
                    <div class="calendar-milestone-row">
                        <span class="calendar-milestone-when">Marzo / Abril</span>
                        <strong class="calendar-milestone-name">Campamento de Semana Santa</strong>
                        <span class="calendar-milestone-note">Acampada de primavera y rutas por la naturaleza.</span>
                    </div>
                    <div class="calendar-milestone-row">
                        <span class="calendar-milestone-when">23 de Abril</span>
                        <strong class="calendar-milestone-name">Día de San Jorge</strong>
                        <span class="calendar-milestone-note">Encuentro scout con otros grupos de Castilla y León.</span>
                    </div>
                    <div class="calendar-milestone-row">
                        <span class="calendar-milestone-when">2ª Quincena de Julio</span>
                        <strong class="calendar-milestone-name">Campamento de Verano</strong>
                        <span class="calendar-milestone-note">La gran aventura anual de 15 días en el monte.</span>
                    </div>
                </div>
            </section>
        `;
        launchSectorOneSubModal(node, elCalendarioModal);
    }

    document.getElementById('btnCloseDocumentosModal')?.addEventListener('click', () => closeAllSuperZooms(true));
    document.getElementById('btnCloseKraalGeneralModal')?.addEventListener('click', () => closeAllSuperZooms(true));
    document.getElementById('btnCloseCalendarioModal')?.addEventListener('click', () => closeAllSuperZooms(true));

    // Toggle Modo Día / Noche (por defecto Modo Luminoso al abrir por primera vez)
    const btnToggleDayMode = document.getElementById('btnToggleDayMode');
    const storedDayMode = localStorage.getItem('acrux_day_mode');
    const savedDayMode = storedDayMode === null ? true : storedDayMode === '1';
    document.body.classList.toggle('day-mode', savedDayMode);
    btnToggleDayMode?.setAttribute('aria-pressed', savedDayMode ? 'true' : 'false');
    btnToggleDayMode?.addEventListener('click', () => {
        const isDay = document.body.classList.toggle('day-mode');
        btnToggleDayMode.setAttribute('aria-pressed', isDay ? 'true' : 'false');
        localStorage.setItem('acrux_day_mode', isDay ? '1' : '0');
    });

    // Foto de bienvenida del Sector I -> Lightbox
    const elWelcomePhotoCard = document.getElementById('stageWelcomePhotoCard');
    const triggerWelcomePhoto = () => {
        const imgEl = elWelcomePhotoCard?.querySelector('img');
        const imgSrc = (imgEl && (imgEl.currentSrc || imgEl.getAttribute('src'))) || 'images/Tropa.jpg';
        openLightbox(imgSrc, 'Familia Acrux 518', 'Sábados 16:30h en Crtra. Rueda 53 · Valladolid');
    };
    elWelcomePhotoCard?.addEventListener('click', triggerWelcomePhoto);
    elWelcomePhotoCard?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            triggerWelcomePhoto();
        }
    });

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
    // 9. MODAL DE IDENTIDAD (ACRUX 518) · HISTORIA, SEDE, COORDINACIÓN Y REDES
    // =========================================================================
    const drawerBackdrop = document.getElementById('cosmosDrawerBackdrop');
    const drawerKicker = document.getElementById('drawerModalKicker');
    const drawerTitle = document.getElementById('drawerModalTitle');
    const drawerBody = document.getElementById('drawerModalBody');

    function openDrawerModal() {
        if (!drawerBackdrop) return;
        const acruxTopNav = document.getElementById('acruxTopAnchorNav');
        if (acruxTopNav) acruxTopNav.style.display = '';

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
                const rawDisplay = String(c.telefono || c.phone || '').trim();
                const rawPhone = rawDisplay.replace(/\s+/g, '');
                const hasPhone = rawPhone.length >= 6;
                return {
                    name: stripHtmlTags(c.name || 'Coordinación'),
                    role: stripHtmlTags(c.cargo || c.role || 'Equipo de Coordinación'),
                    phone: hasPhone ? rawPhone : '',
                    displayPhone: hasPhone ? rawDisplay : '',
                    hasPhone,
                    photoUrl: c.fotoUrl || c.cromoUrl || c.photoUrl || null
                };
            })
            : defaultCoords.map(c => ({ ...c, hasPhone: true }));

        drawerKicker.textContent = 'SECTOR I · ESTRELLA GUÍA ACRUX 518';
        drawerTitle.innerHTML = 'Grupo Scout <span class="ice-italic">Acrux 518</span>';
        drawerBody.innerHTML = `
            <div class="identity-modal-content">
                <!-- CABECERA EDITORIAL DE ACRUX 518 -->
                <div class="acrux-floating-showcase" id="acrux-historia">
                    <div class="acrux-floating-title-col">
                        <div class="star-tab-meta-row">
                            <span class="bases-pill-badge" style="margin:0;">ESTRELLA GUÍA ACRUX 518</span>
                            <span class="sz-age-pill">Valladolid · Desde 1977</span>
                            <span class="sz-age-pill">ASDE Castilla y León</span>
                        </div>
                        <h2 class="acrux-giant-title">Grupo Scout <span class="ice-italic">Acrux 518</span></h2>
                        <p class="acrux-floating-lead">Desde 1977 educando en valores, escultismo y contacto directo con la naturaleza en Valladolid. Formamos parte de ASDE Exploradores de Castilla y León con cinco ramas educativas de 6 a 20 años.</p>
                    </div>

                    <div class="acrux-floating-base-dock">
                        <span class="acrux-dock-kicker">ACCESO RÁPIDO</span>
                        <h3>Cinco Ramas Educativas · De 6 a 20 años</h3>
                        <p>Castores, Manada, Tropa, Escultas y Clan. Reuniones de sábado, acampadas trimestrales y campamentos en la naturaleza.</p>
                        <div class="acrux-dock-actions">
                            <button type="button" class="btn-cosmos-primary" id="btnIdentityToInscripciones" style="padding:0.55rem 1.15rem; font-size:0.82rem;">
                                <span>Ir a β Inscripciones</span>
                                <span class="btn-arrow">→</span>
                            </button>
                            <button type="button" class="star-tab-back-btn" id="btnIdentityToUnitsTop">
                                <span>Explorar las 5 Unidades →</span>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- 1. IDENTIDAD E HISTORIA -->
                <div class="bases-modal-section">
                    <div class="identity-story-grid">
                        <article class="identity-story-card">
                            <div class="story-card-icon">${SVG_ICONS.compass}</div>
                            <div class="story-card-body">
                                <h4>Casi 50 Años en Valladolid (1977 – 2026)</h4>
                                <p>Basados en el método scout de Baden-Powell —aprender haciendo, vida en pequeños grupos, contacto vivo con la naturaleza y servicio—, educamos en valores para formar personas libres, críticas y solidarias.</p>
                            </div>
                        </article>

                        <article class="identity-story-card" id="acrux-ramas">
                            <div class="story-card-icon">${SVG_ICONS.layers}</div>
                            <div class="story-card-body">
                                <h4>Cinco Ramas Educativas de 6 a 20 Años</h4>
                                <ul style="margin: 0.25rem 0 0 1.15rem; padding: 0; color: var(--ice-grey); font-size: 0.84rem; line-height: 1.65;">
                                    <li><strong>Castores · Colonia Ohiensis</strong> (6–8 años) · <em>Compartir</em></li>
                                    <li><strong>Manada · Khanhiwara</strong> (8–11 años) · <em>Haremos lo mejor</em></li>
                                    <li><strong>Tropa · Lohengrin</strong> (11–14 años) · <em>Siempre Listos</em></li>
                                    <li><strong>Unidad Esculta · Trea</strong> (14–17 años) · <em>Unidad</em></li>
                                    <li><strong>Clan Rover · Ama Dablam</strong> (17–20 años) · <em>Servir</em></li>
                                </ul>
                            </div>
                        </article>

                        <article class="identity-story-card">
                            <div class="story-card-icon">${SVG_ICONS.shield}</div>
                            <div class="story-card-body">
                                <h4>Comunidad y Pertenencia Oficial</h4>
                                <p>Formamos parte de <strong>ASDE Exploradores de Castilla y León</strong> y de la <strong>Federación de Scouts de España (ASDE)</strong>, desarrollando proyectos educativos, salidas de rama y campamentos durante toda la ronda solar.</p>
                            </div>
                        </article>
                    </div>
                </div>

                <!-- 2. SEDE OFICIAL Y HORARIOS (BLOQUE ÚNICO Y LIMPIO) -->
                <div id="acrux-bases" class="bases-modal-section" style="margin-top: 2.4rem;">
                    <div class="bases-section-title-row">
                        <span class="bases-pill-badge">02 · SEDE Y HORARIOS</span>
                        <h3>Sede del Grupo Scout Acrux 518</h3>
                        <p>Punto de encuentro semanal para las 5 ramas scout, actividades de sábado, asambleas de familias e intendencia:</p>
                    </div>

                    <div class="bases-locations-grid bases-locations-with-map">
                        <article class="base-location-card" style="border-color: rgba(217, 56, 58, 0.45);">
                            <div>
                                <span class="base-type-badge">SEDE OFICIAL · VALLADOLID</span>
                                <h4>Carretera de Rueda, 53 · Sábados de 16:30 a 18:30 h</h4>
                                <p class="base-schedule">${SVG_ICONS.clock} <strong>Sábados de 16:30 a 18:30 h</strong> (calendario escolar lectivo · CP 47008, Valladolid)</p>
                            </div>
                            <p class="base-desc">Aquí comienzan y terminan nuestras actividades de sábado, juegos de rama, reuniones de familias y preparación de acampadas.</p>
                            <div class="base-actions">
                                <a href="https://maps.google.com/?q=Carretera+de+Rueda+53+Valladolid" target="_blank" rel="noopener" class="btn-cosmos-primary" style="padding:0.55rem 1.15rem; font-size:0.82rem; text-decoration:none;">
                                    ${SVG_ICONS.mapPin}
                                    <span>Cómo llegar en Google Maps</span>
                                    <span class="btn-arrow">↗</span>
                                </a>
                            </div>
                        </article>

                        <div class="base-map-embed-card">
                            <iframe
                                title="Ubicación Grupo Scout ACRUX 518 en Carretera de Rueda 53 Valladolid"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2982.7236511110756!2d-4.7368661!3d41.6185854!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd476d05f3e494a5%3A0x6b1ec114ad2b8ebc!2sCarretera%20de%20Rueda%2C%2053%2C%2047008%20Valladolid!5e0!3m2!1ses!2ses!4v1680000000000!5m2!1ses!2ses"
                                loading="lazy"
                                allowfullscreen=""
                                referrerpolicy="no-referrer-when-downgrade">
                            </iframe>
                        </div>
                    </div>
                </div>

                <!-- 3. EQUIPO DE COORDINACIÓN -->
                <div id="acrux-coordinacion" class="bases-modal-section" style="margin-top: 2.4rem;">
                    <div class="bases-section-title-row">
                        <span class="bases-pill-badge">03 · EQUIPO DE COORDINACIÓN</span>
                        <h3>Canal Directo con Coordinación</h3>
                        <p>Atención directa para familias y jóvenes. Escríbenos por WhatsApp o llámanos en un clic:</p>
                    </div>

                    <div class="coordinators-action-grid">
                        ${coordsList.map(c => `
                            <article class="coordinator-action-card">
                                <div style="display:flex; align-items:center; gap:0.95rem;">
                                    <div class="coord-avatar-frame">
                                        ${c.photoUrl ? `
                                            <img src="${escapeAttr(c.photoUrl)}" alt="${escapeAttr(c.name)}" class="coord-avatar-img" referrerpolicy="no-referrer">
                                        ` : `
                                            <div class="coord-avatar-fallback">${SVG_ICONS.users}</div>
                                        `}
                                    </div>
                                    <div class="coord-info-col">
                                        <strong class="coord-name">${c.name}</strong>
                                        <span class="coord-role">${c.role}</span>
                                        ${c.hasPhone ? `<span class="coord-phone-text">${SVG_ICONS.phone} ${c.displayPhone}</span>` : ''}
                                    </div>
                                </div>
                                ${c.hasPhone ? `
                                <div class="coord-btn-row">
                                    <a href="https://wa.me/34${c.phone}?text=${encodeURIComponent('Hola ' + c.name + ', me pongo en contacto desde la web del Grupo Scout Acrux 518 para pedir información.')}" 
                                       target="_blank" rel="noopener" class="btn-coord-action btn-coord-wa">
                                        ${SVG_ICONS.whatsapp}
                                        <span>WhatsApp</span>
                                    </a>
                                    <a href="tel:+34${c.phone}" class="btn-coord-action btn-coord-call">
                                        ${SVG_ICONS.phone}
                                        <span>Llamar</span>
                                    </a>
                                </div>
                                ` : ''}
                            </article>
                        `).join('')}
                    </div>
                </div>

                <!-- 4. REDES SOCIALES DEL GRUPO (BOTONES COMPACTOS HORIZONTALES CON LOGOS VECTORIALES) -->
                <div id="acrux-redes" class="bases-modal-section" style="margin-top: 2.4rem;">
                    <div class="bases-section-title-row">
                        <span class="bases-pill-badge">04 · REDES SOCIALES</span>
                        <h3>Canales Oficiales de Acrux 518</h3>
                    </div>

                    <div class="group-socials-grid">
                        <a href="https://www.instagram.com/gruposcoutacrux518/" target="_blank" rel="noopener" class="group-social-card is-instagram">
                            <div class="group-social-icon">${SVG_ICONS.instagram}</div>
                            <div class="group-social-info">
                                <strong>Instagram General</strong>
                                <span>@gruposcoutacrux518</span>
                            </div>
                            <span class="group-social-arrow">${SVG_ICONS.arrowUpRight}</span>
                        </a>

                        <a href="https://www.instagram.com/escultas_trea/" target="_blank" rel="noopener" class="group-social-card is-instagram">
                            <div class="group-social-icon">${SVG_ICONS.instagram}</div>
                            <div class="group-social-info">
                                <strong>Escultas Trea</strong>
                                <span>@escultas_trea</span>
                            </div>
                            <span class="group-social-arrow">${SVG_ICONS.arrowUpRight}</span>
                        </a>

                        <a href="https://www.instagram.com/clan_amadablam/" target="_blank" rel="noopener" class="group-social-card is-instagram">
                            <div class="group-social-icon">${SVG_ICONS.instagram}</div>
                            <div class="group-social-info">
                                <strong>Clan Ama Dablam</strong>
                                <span>@clan_amadablam</span>
                            </div>
                            <span class="group-social-arrow">${SVG_ICONS.arrowUpRight}</span>
                        </a>

                        <a href="https://www.facebook.com/GrupoScoutAcrux518" target="_blank" rel="noopener" class="group-social-card is-facebook">
                            <div class="group-social-icon">${SVG_ICONS.facebook}</div>
                            <div class="group-social-info">
                                <strong>Facebook</strong>
                                <span>Grupo Scout Acrux 518</span>
                            </div>
                            <span class="group-social-arrow">${SVG_ICONS.arrowUpRight}</span>
                        </a>

                        <a href="mailto:gruposcoutacrux518@gmail.com" class="group-social-card is-email">
                            <div class="group-social-icon">${SVG_ICONS.mail}</div>
                            <div class="group-social-info">
                                <strong>Correo</strong>
                                <span>gruposcoutacrux518@gmail.com</span>
                            </div>
                            <span class="group-social-arrow">${SVG_ICONS.arrowUpRight}</span>
                        </a>
                    </div>
                </div>
            </div>
        `;

        document.getElementById('btnIdentityToUnitsTop')?.addEventListener('click', () => {
            closeDrawerModal();
            goToSector(1, 0);
        });

        // Saltar dinámicamente desde Acrux a la estrella β Inscripciones (mimosa)
        const jumpToInscripcionStar = () => {
            drawerBackdrop?.classList.remove('is-open');
            drawerBackdrop?.setAttribute('aria-hidden', 'true');
            if (typeof openInscripcionModal === 'function') {
                openInscripcionModal(0);
            }
        };
        document.getElementById('btnIdentityToInscripciones')?.addEventListener('click', jumpToInscripcionStar);
        const btnAcruxTopInsc = document.getElementById('btnAcruxTopToInscripciones');
        if (btnAcruxTopInsc && !btnAcruxTopInsc.dataset.boundInsc) {
            btnAcruxTopInsc.dataset.boundInsc = '1';
            btnAcruxTopInsc.addEventListener('click', jumpToInscripcionStar);
        }

        // Smooth scroll para las pestañas superiores de Acrux (#acruxTopAnchorNav) y botones internos
        const allAcruxLinks = document.querySelectorAll('#acruxTopAnchorNav a, .js-acrux-scroll');
        allAcruxLinks.forEach(a => {
            a.addEventListener('click', (e) => {
                e.preventDefault();
                const href = a.getAttribute('href') || '';
                const targetId = href.replace('#', '');
                const targetEl = document.getElementById(targetId);
                if (targetEl) {
                    targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
                if (a.closest('#acruxTopAnchorNav')) {
                    document.querySelectorAll('#acruxTopAnchorNav .star-node-chip').forEach(c => c.classList.remove('active'));
                    a.classList.add('active');
                }
            });
        });

        drawerBackdrop.classList.add('is-open');
        drawerBackdrop.setAttribute('aria-hidden', 'false');

        if (pendingDrawerScrollTarget) {
            const targetId = pendingDrawerScrollTarget;
            pendingDrawerScrollTarget = null;
            requestAnimationFrame(() => {
                setTimeout(() => {
                    const targetEl = document.getElementById(targetId);
                    if (targetEl) {
                        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }, 90);
            });
        }
    }

    const SECRET_ALBUM_STORAGE_KEY = 'acrux_secret_album_v1';

    const SECRET_RARITY_META = {
        comun: { rank: 1, label: 'Común' },
        raro: { rank: 2, label: 'Rara' },
        epico: { rank: 3, label: 'Épica' }
    };

    const MASTER_PACK_CODE_HASH = '039c7c5f';
    let driveSecretPack = null;

    function hashPackCode_(raw) {
        const norm = String(raw || '').trim().toUpperCase().replace(/\s+/g, '');
        const input = norm + '|ACRUX518_PACK_SALT';
        let h = 0x811c9dc5;
        for (let i = 0; i < input.length; i++) {
            h ^= input.charCodeAt(i);
            h = Math.imul(h, 0x01000193);
        }
        return (h >>> 0).toString(16).padStart(8, '0');
    }

    function loadSecretAlbumState() {
        try {
            const raw = localStorage.getItem(SECRET_ALBUM_STORAGE_KEY);
            if (raw) {
                const parsed = JSON.parse(raw);
                const unlocked = parsed && typeof parsed.unlocked === 'object' ? parsed.unlocked : {};
                const rarities = parsed && typeof parsed.rarities === 'object' ? parsed.rarities : {};
                const redeemedWeeks = parsed && typeof parsed.redeemedWeeks === 'object' ? parsed.redeemedWeeks : {};
                const legacyHolo = parsed && typeof parsed.holo === 'object' ? parsed.holo : {};
                Object.keys(unlocked).forEach(id => {
                    if (!rarities[id]) {
                        rarities[id] = legacyHolo[id] ? 'epico' : 'comun';
                    }
                });
                return {
                    unlocked,
                    rarities,
                    redeemedWeeks,
                    packsOpened: Number(parsed?.packsOpened) || 0
                };
            }
        } catch (_) {}
        return { unlocked: {}, rarities: {}, redeemedWeeks: {}, packsOpened: 0 };
    }

    function saveSecretAlbumState(state) {
        try {
            localStorage.setItem(SECRET_ALBUM_STORAGE_KEY, JSON.stringify(state));
        } catch (_) {}
    }

    function getSecretKraalCromosPool() {
        const pool = [];
        const seen = new Set();
        UNITS_DATA.forEach(unit => {
            const list = Array.isArray(unit.kraaletes) ? unit.kraaletes : [];
            list.forEach((sc, idx) => {
                const name = (sc.name || 'Scouter Acrux').trim();
                const key = `${unit.id}_${name.toLowerCase()}`;
                if (seen.has(key)) return;
                seen.add(key);

                const role = (sc.role || `Scouter · ${unit.shortName}`).trim();
                const roleLower = role.toLowerCase();
                let rarity = 'comun';
                let rarityLabel = 'Común';
                if (roleLower.includes('coord') || roleLower.includes('jefe') || roleLower.includes('responsable')) {
                    rarity = 'legendario';
                    rarityLabel = 'Legendario';
                } else if (roleLower.includes('akela') || roleLower.includes('bagheera') || roleLower.includes('baloo') || idx === 0) {
                    rarity = 'epico';
                    rarityLabel = 'Épico';
                } else if (idx % 2 === 1) {
                    rarity = 'raro';
                    rarityLabel = 'Raro';
                }

                pool.push({
                    id: key,
                    num: pool.length + 1,
                    name,
                    realName: stripHtmlTags(sc.realName || ''),
                    role,
                    photo: sc.cromoUrl || sc.fotoUrl || sc.photoUrl || sc.photo || '',
                    bio: sc.bio || `Scouter de ${unit.fullName} en el Grupo Scout Acrux 518.`,
                    unitId: unit.id,
                    unitName: unit.shortName,
                    unitColor: unit.accentColor || unit.color || '#F59E0B',
                    glowColor: unit.glowColor || 'rgba(56, 189, 248, 0.35)',
                    rarity,
                    rarityLabel,
                    rawScouter: sc,
                    rawUnit: unit
                });
            });
        });
        return pool;
    }

    function openSecretAlbumModal(initialView = 'pack') {
        if (!drawerBackdrop || !drawerBody) return;
        const drawerModalEl = drawerBackdrop.querySelector('.cosmos-drawer-modal');
        const acruxTopNav = document.getElementById('acruxTopAnchorNav');
        if (acruxTopNav) acruxTopNav.style.display = 'none';

        const pool = getSecretKraalCromosPool();
        let activeTab = initialView === 'album' ? 'album' : 'pack';
        let activeUnitFilter = 'all';
        let lastPulled = [];

        drawerBackdrop.classList.add('is-fullscreen-star-view');
        if (drawerModalEl) drawerModalEl.classList.add('is-fullscreen-star-modal');

        function renderCromoCard(cromo, badgeRightText = '', isNewPull = false, cardRarity = 'comun') {
            const rarityKey = SECRET_RARITY_META[cardRarity] ? cardRarity : 'comun';
            const rarityLabel = SECRET_RARITY_META[rarityKey].label;
            const hasCromo = Boolean(cromo.photo);
            const cleanName = stripHtmlTags(cromo.name || 'Scouter');
            const cleanRole = stripHtmlTags(cromo.role || 'Kraalete');
            const cleanRealName = stripHtmlTags(cromo.realName || '');
            const effectHtml = rarityKey === 'epico'
                ? '<div class="secret-holo-foil" aria-hidden="true"></div>'
                : (rarityKey === 'raro' ? '<div class="secret-rare-sweep" aria-hidden="true"></div>' : '');

            return `
                <article class="kraalete-cromo-card secret-cromo-holo rarity-${rarityKey} ${hasCromo ? 'has-cromo-img' : 'no-cromo'}" data-cromo-id="${escapeAttr(cromo.id)}" data-rarity="${escapeAttr(rarityKey)}" style="--unit-accent:${escapeAttr(cromo.unitColor)}; --unit-glow:${escapeAttr(cromo.glowColor)};">
                    <div class="cromo-inner">
                        ${hasCromo ? `
                            <img src="${escapeAttr(cromo.photo)}" alt="${escapeAttr(cleanName)}" class="kraalete-cromo-img" referrerpolicy="no-referrer" loading="lazy">
                        ` : `
                            <div class="cromo-fallback-content">
                                <div class="cromo-scout-badge">${SVG_ICONS.compass}</div>
                                <span class="cromo-unit-tag">#${String(cromo.num).padStart(2, '0')} · ${escapeAttr(cromo.unitName)}</span>
                                <strong class="cromo-fallback-name">${escapeAttr(cleanName)}</strong>
                                <span class="cromo-fallback-role">${escapeAttr(cleanRole)}</span>
                            </div>
                        `}
                        <div class="secret-cromo-badge-top">
                            <span class="secret-rarity-pill rarity-${rarityKey}">${escapeAttr(rarityLabel)}${rarityKey === 'epico' ? ' ✦' : ''}</span>
                            ${badgeRightText ? `<span class="secret-state-pill ${isNewPull ? 'is-new' : ''}">${escapeAttr(badgeRightText)}</span>` : ''}
                        </div>
                        <div class="cromo-bottom-label">
                            <strong class="cromo-label-name">${escapeAttr(cleanName)}</strong>
                            <span class="cromo-label-role">${cleanRealName ? `«${escapeAttr(cleanRealName)}»` : escapeAttr(`${cromo.unitName} · ${cleanRole}`)}</span>
                        </div>
                        ${effectHtml}
                        <div class="cromo-sheen" aria-hidden="true"></div>
                    </div>
                </article>
            `;
        }

        function buildBurstSparksHtml() {
            const sparkColors = ['#FDE68A', '#F472B6', '#38BDF8', '#C084FC', '#34D399', '#FFFFFF'];
            return Array.from({ length: 16 }, (_, idx) => {
                const angle = (Math.PI * 2 * idx) / 16 + (idx % 2) * 0.15;
                const dist = 120 + (idx % 4) * 55;
                const tx = Math.round(Math.cos(angle) * dist);
                const ty = Math.round(Math.sin(angle) * dist - 30);
                const color = sparkColors[idx % sparkColors.length];
                return `<span class="secret-spark-dot" style="--tx:${tx}px; --ty:${ty}px; --spark-color:${color}; animation-delay:${(idx % 3) * 0.04}s;"></span>`;
            }).join('');
        }

        function renderSecretView() {
            const state = loadSecretAlbumState();
            const unlockedCount = pool.filter(c => (state.unlocked[c.id] || 0) > 0).length;
            const totalCount = pool.length || 1;
            const pct = Math.round((unlockedCount / totalCount) * 100);

            let mainContentHtml = '';
            if (activeTab === 'pack') {
                const pullsHtml = lastPulled.length > 0
                    ? `
                        <div class="secret-pull-grid">
                            ${lastPulled.map(p => renderCromoCard(p.cromo, p.badgeText, p.isHighlight, p.rarity)).join('')}
                        </div>
                    `
                    : '';

                const activeWeekKey = driveSecretPack?.weekKey || null;
                const alreadyRedeemedWeek = Boolean(activeWeekKey && state.redeemedWeeks && state.redeemedWeeks[activeWeekKey]);
                const defaultCodeHint = alreadyRedeemedWeek
                    ? `Ya canjeaste el sobre de esta semana (${activeWeekKey}). ¡Vuelve el sábado a las 12:00!`
                    : (activeWeekKey
                        ? `Código semanal activo (${activeWeekKey}) · Nuevo código cada sábado a las 12:00.`
                        : 'Introduce el código semanal de las bases para abrir un sobre.');

                mainContentHtml = `
                    <div class="secret-pack-stage" id="secretPackStage">
                        <div class="secret-light-pillar" id="secretLightPillar"></div>
                        <div class="secret-shockwave-ring" id="secretShockwaveRing"></div>
                        <div class="secret-burst-flare" id="secretBurstFlare"></div>
                        <div class="secret-sparks-layer" id="secretSparksLayer">${buildBurstSparksHtml()}</div>
                        <div class="secret-foil-pack" id="secretFoilPackBtn" role="button" tabindex="0" title="Introduce el código y pulsa para abrir un sobre secreto">
                            <div class="secret-pack-zip-seam"></div>
                            <div class="secret-pack-cap">
                                <span class="secret-pack-crimp-label">ACRUX 518 · KRAAL</span>
                            </div>
                            <div class="secret-pack-body">
                                <span class="secret-rarity-pill">BOOSTER SECRETO</span>
                                <div class="secret-pack-emblem">⚜</div>
                                <div>
                                    <div class="secret-pack-title">Sobre del Kraal</div>
                                    <div class="secret-pack-sub">3 cromos · Canjea tu código</div>
                                </div>
                            </div>
                        </div>
                        <div class="secret-code-gate">
                            <div class="secret-code-row">
                                <input type="text" id="secretPackCodeInput" class="secret-code-input" placeholder="Código semanal..." autocomplete="off" spellcheck="false" />
                                <button type="button" class="btn-cosmos-primary" id="btnOpenSecretPack">
                                    <span>Canjear y Abrir</span>
                                    <span class="btn-arrow">✦</span>
                                </button>
                                <button type="button" class="star-tab-back-btn" id="btnGoToSecretAlbum">
                                    <span>Ver mi Álbum (${unlockedCount}/${pool.length}) →</span>
                                </button>
                            </div>
                            <div class="secret-code-status${alreadyRedeemedWeek ? ' is-ok' : ''}" id="secretPackCodeMsg">${defaultCodeHint}</div>
                        </div>
                        ${pullsHtml}
                    </div>
                `;
            } else {
                const filteredPool = activeUnitFilter === 'all'
                    ? pool
                    : pool.filter(c => c.unitId === activeUnitFilter);

                const filterButtons = [
                    { id: 'all', label: `Todos (${pool.length})` },
                    ...UNITS_DATA.map(u => ({ id: u.id, label: u.shortName }))
                ];

                mainContentHtml = `
                    <div class="secret-album-filters">
                        ${filterButtons.map(f => `
                            <button type="button" class="star-node-chip ${activeUnitFilter === f.id ? 'active' : ''}" data-album-filter="${escapeAttr(f.id)}">${escapeAttr(f.label)}</button>
                        `).join('')}
                    </div>
                    <div class="secret-album-grid">
                        ${filteredPool.map(cromo => {
                            const count = state.unlocked[cromo.id] || 0;
                            if (count > 0) {
                                const savedRarity = (state.rarities && state.rarities[cromo.id]) || 'comun';
                                return renderCromoCard(cromo, count > 1 ? `x${count}` : 'Obtenido', false, savedRarity);
                            }
                            return `
                                <div class="secret-cromo-locked">
                                    <span class="secret-cromo-locked-q">?</span>
                                    <strong style="font-size:0.82rem; color:rgba(255,255,255,0.75);">#${String(cromo.num).padStart(2, '0')} · ${escapeAttr(cromo.unitName)}</strong>
                                    <span style="font-size:0.72rem;">Consíguelo abriendo sobres secretos</span>
                                </div>
                            `;
                        }).join('')}
                    </div>
                    <div style="display:flex; justify-content:flex-end; margin-top:0.5rem;">
                        <button type="button" class="star-tab-back-btn" id="btnResetSecretAlbum" style="opacity:0.75; font-size:0.74rem;">Reiniciar álbum</button>
                    </div>
                `;
            }

            drawerBody.innerHTML = `
                <div class="secret-album-shell">
                    <div style="display:flex; justify-content:center;">
                        <div class="star-tab-switcher" role="tablist" aria-label="Secreto del Kraal">
                            <button type="button" class="star-node-chip ${activeTab === 'pack' ? 'active' : ''}" data-secret-tab="pack">✦ Abrir Sobres</button>
                            <button type="button" class="star-node-chip ${activeTab === 'album' ? 'active' : ''}" data-secret-tab="album">Álbum Secreto (${unlockedCount}/${pool.length})</button>
                        </div>
                    </div>
                    <div class="secret-hero-banner">
                        <div>
                            <span class="secret-hero-kicker">✦ ESTRELLA OCULTA DEL COSMOS · SECRETO</span>
                            <h2 class="secret-hero-title">Sobres &amp; Álbum del <span class="ice-italic">Kraal 518</span></h2>
                            <p class="secret-hero-desc">Has encontrado la estrella escondida en mitad del espacio. Abre sobres secretos para coleccionar los cromos holográficos de todos los scouters del grupo y guarda tu progreso en este álbum.</p>
                        </div>
                        <div class="secret-progress-box">
                            <div class="secret-progress-meta">
                                <span>Colección: ${unlockedCount}/${pool.length}</span>
                                <span>${pct}%</span>
                            </div>
                            <div class="secret-progress-track">
                                <div class="secret-progress-fill" style="width:${pct}%"></div>
                            </div>
                            <span style="font-size:0.72rem; color:rgba(226,232,240,0.72);">Sobres abiertos: ${state.packsOpened}</span>
                        </div>
                    </div>
                    ${mainContentHtml}
                </div>
            `;

            let isOpeningPack = false;
            const packBtn = document.getElementById('secretFoilPackBtn');
            if (packBtn) {
                packBtn.addEventListener('mousemove', (e) => {
                    if (isOpeningPack) return;
                    const rect = packBtn.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const rotX = ((y - rect.height / 2) / (rect.height / 2)) * -10;
                    const rotY = ((x - rect.width / 2) / (rect.width / 2)) * 10;
                    packBtn.style.transform = `perspective(900px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateY(-6px) scale(1.03)`;
                });
                packBtn.addEventListener('mouseleave', () => {
                    if (isOpeningPack) return;
                    packBtn.style.transform = '';
                });
            }

            const showCodeError = (msg) => {
                const inputEl = document.getElementById('secretPackCodeInput');
                const msgEl = document.getElementById('secretPackCodeMsg');
                if (msgEl) {
                    msgEl.textContent = msg;
                    msgEl.classList.remove('is-ok');
                    msgEl.classList.add('is-error');
                }
                if (inputEl) {
                    inputEl.classList.remove('is-shake');
                    void inputEl.offsetWidth;
                    inputEl.classList.add('is-shake');
                    inputEl.focus();
                }
            };

            const triggerOpenPack = () => {
                if (pool.length === 0 || isOpeningPack) return;
                const inputEl = document.getElementById('secretPackCodeInput');
                const rawCode = inputEl ? inputEl.value : '';
                if (!rawCode.trim()) {
                    showCodeError('Introduce primero el código semanal para abrir el sobre.');
                    return;
                }

                const enteredHash = hashPackCode_(rawCode);
                const isMaster = enteredHash === MASTER_PACK_CODE_HASH;
                const isWeekly = Boolean(driveSecretPack && driveSecretPack.codeHash && enteredHash === driveSecretPack.codeHash);

                if (!isMaster && !isWeekly) {
                    showCodeError('Código incorrecto. Pídeselo a los scouters en las bases.');
                    return;
                }

                const current = loadSecretAlbumState();
                if (!current.redeemedWeeks) current.redeemedWeeks = {};
                if (isWeekly && !isMaster) {
                    if (current.redeemedWeeks[driveSecretPack.weekKey]) {
                        showCodeError('Ya canjeaste el sobre de esta semana. ¡Vuelve el sábado a las 12:00!');
                        return;
                    }
                    current.redeemedWeeks[driveSecretPack.weekKey] = true;
                }

                isOpeningPack = true;
                if (packBtn) packBtn.style.transform = '';

                current.packsOpened += 1;
                if (!current.rarities) current.rarities = {};
                const picks = [];
                let bestRarity = 'comun';
                for (let k = 0; k < 3; k++) {
                    const chosen = pool[Math.floor(Math.random() * pool.length)];
                    const prevCount = current.unlocked[chosen.id] || 0;
                    const prevRarity = current.rarities[chosen.id] || 'comun';
                    const roll = Math.random();
                    const rolledRarity = roll < 0.18 ? 'epico' : (roll < 0.50 ? 'raro' : 'comun');

                    const isUpgrade = prevCount > 0 && SECRET_RARITY_META[rolledRarity].rank > SECRET_RARITY_META[prevRarity].rank;
                    const storedRarity = SECRET_RARITY_META[rolledRarity].rank > SECRET_RARITY_META[prevRarity].rank ? rolledRarity : prevRarity;

                    current.unlocked[chosen.id] = prevCount + 1;
                    current.rarities[chosen.id] = storedRarity;

                    let badgeText = `REPE x${prevCount + 1}`;
                    let isHighlight = false;
                    if (prevCount === 0) {
                        badgeText = '¡NUEVO!';
                        isHighlight = true;
                    } else if (isUpgrade) {
                        badgeText = rolledRarity === 'epico' ? '¡MEJORA ÉPICA!' : '¡MEJORA RARA!';
                        isHighlight = true;
                    }

                    picks.push({ cromo: chosen, badgeText, isHighlight, rarity: rolledRarity });
                    if (SECRET_RARITY_META[rolledRarity].rank > SECRET_RARITY_META[bestRarity].rank) {
                        bestRarity = rolledRarity;
                    }
                }
                saveSecretAlbumState(current);

                const stageEl = document.getElementById('secretPackStage');
                const flareEl = document.getElementById('secretBurstFlare');
                const pillarEl = document.getElementById('secretLightPillar');
                const waveEl = document.getElementById('secretShockwaveRing');
                const sparksEl = document.getElementById('secretSparksLayer');
                if (stageEl) stageEl.classList.add(`rarity-${bestRarity}`);
                if (packBtn) packBtn.classList.add('is-charging');

                setTimeout(() => {
                    if (packBtn) {
                        packBtn.classList.remove('is-charging');
                        packBtn.classList.add('is-opening');
                    }
                    if (pillarEl) pillarEl.classList.add('is-active');
                    if (waveEl) waveEl.classList.add('is-active');
                    if (flareEl) flareEl.classList.add('is-active');
                    if (sparksEl) sparksEl.classList.add('is-active');

                    setTimeout(() => {
                        lastPulled = picks;
                        renderSecretView();
                    }, 520);
                }, 850);
            };

            drawerBody.querySelectorAll('[data-secret-tab]').forEach(btn => {
                btn.addEventListener('click', () => {
                    activeTab = btn.getAttribute('data-secret-tab') || 'pack';
                    renderSecretView();
                });
            });
            packBtn?.addEventListener('click', () => {
                const inputEl = document.getElementById('secretPackCodeInput');
                if (inputEl && !inputEl.value.trim()) {
                    showCodeError('Introduce el código de esta semana abajo para rasgar el sobre.');
                    return;
                }
                triggerOpenPack();
            });
            document.getElementById('secretPackCodeInput')?.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    triggerOpenPack();
                }
            });
            document.getElementById('btnOpenSecretPack')?.addEventListener('click', triggerOpenPack);
            document.getElementById('btnGoToSecretAlbum')?.addEventListener('click', () => {
                activeTab = 'album';
                renderSecretView();
            });
            drawerBody.querySelectorAll('[data-album-filter]').forEach(btn => {
                btn.addEventListener('click', () => {
                    activeUnitFilter = btn.getAttribute('data-album-filter') || 'all';
                    renderSecretView();
                });
            });

            // Efecto 3D Hover suave sin distorsión excesiva + Destello según rareza
            drawerBody.querySelectorAll('.secret-cromo-holo').forEach(card => {
                card.addEventListener('mousemove', (e) => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    const rotX = ((y - centerY) / centerY) * -6;
                    const rotY = ((x - centerX) / centerX) * 6;
                    const percentX = (x / rect.width) * 100;
                    const percentY = (y / rect.height) * 100;
                    const sheen = card.querySelector('.cromo-sheen');

                    card.style.setProperty('--holo-x', `${percentX.toFixed(1)}%`);
                    card.style.setProperty('--holo-y', `${percentY.toFixed(1)}%`);
                    card.style.transform = `perspective(900px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) scale3d(1.015, 1.015, 1.015)`;
                    if (sheen) {
                        sheen.style.background = `radial-gradient(circle at ${percentX}% ${percentY}%, rgba(255, 255, 255, 0.36) 0%, rgba(255, 255, 255, 0.08) 45%, transparent 70%)`;
                        sheen.style.opacity = '1';
                    }
                });
                card.addEventListener('mouseleave', () => {
                    card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
                    card.style.setProperty('--holo-x', '50%');
                    card.style.setProperty('--holo-y', '50%');
                    const sheen = card.querySelector('.cromo-sheen');
                    if (sheen) sheen.style.opacity = '0';
                });
                card.addEventListener('click', () => {
                    const id = card.getAttribute('data-cromo-id');
                    const found = pool.find(c => c.id === id);
                    if (!found) return;
                    const cardRarity = card.getAttribute('data-rarity') || 'comun';
                    const cardRarityLabel = (SECRET_RARITY_META[cardRarity] && SECRET_RARITY_META[cardRarity].label) || 'Común';
                    if (typeof openCromoZoomModal === 'function' && found.rawScouter && found.rawUnit) {
                        openCromoZoomModal(found.rawScouter, found.rawUnit, {
                            rarity: cardRarity,
                            rarityLabel: cardRarityLabel
                        });
                    } else if (found.photo) {
                        openLightbox(found.photo, found.name, `${found.unitName} · ${found.role}`);
                    }
                });
            });
            document.getElementById('btnResetSecretAlbum')?.addEventListener('click', () => {
                saveSecretAlbumState({ unlocked: {}, rarities: {}, redeemedWeeks: {}, packsOpened: 0 });
                lastPulled = [];
                renderSecretView();
            });
        }

        renderSecretView();
        drawerBackdrop.classList.add('is-open');
        drawerBackdrop.setAttribute('aria-hidden', 'false');
    }

    function closeDrawerModal() {
        const acruxTopNav = document.getElementById('acruxTopAnchorNav');
        if (acruxTopNav) acruxTopNav.style.display = '';
        clearStarRoute();
        drawerBackdrop?.classList.remove('is-open');
        drawerBackdrop?.setAttribute('aria-hidden', 'true');
        if (superZoomState && superZoomState.type === 'acrux') {
            closeAllSuperZooms(true);
        }
    }

    document.getElementById('btnCloseDrawer')?.addEventListener('click', closeDrawerModal);
    document.getElementById('btnQuickContactTop')?.addEventListener('click', () => {
        openAcruxSuperZoom('acrux-coordinacion');
    });
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
                ? `50º ANIVERSARIO · RECUERDO HISTÓRICO (${starData.year})`
                : `50º ANIVERSARIO · ARCHIVO EN DIGITALIZACIÓN (${starData.year})`;
        }
        if (elAnYearNumber) elAnYearNumber.textContent = starData.year;
        if (elAnYearTitle) elAnYearTitle.textContent = stripHtmlTags(starData.title);
        if (elAnYearDesc) elAnYearDesc.textContent = stripHtmlTags(starData.desc);
        if (elAnDriveBadge) elAnDriveBadge.textContent = `Google Drive: ${starData.driveFolder}`;
        if (elAnDriveBtn) elAnDriveBtn.href = starData.driveUrl || DRIVE_ANNIVERSARY_URL;

        // RENDIMIENTO: Lazy Loading estricto (la imagen se descarga e inyecta única y exclusivamente en este instante)
        if (elAnPhotoFrame) {
            if (starData.isUnlocked && starData.photoUrl) {
                elAnPhotoFrame.innerHTML = `
                    <img src="${escapeAttr(starData.photoUrl)}" alt="${escapeAttr(starData.title)}" loading="lazy">
                `;
            } else {
                elAnPhotoFrame.innerHTML = `
                    <div class="anniversary-photo-locked">
                        <span class="locked-icon">${SVG_ICONS.folder}</span>
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

    // =========================================================================
    // 9C. TIENDA MERCH FULLSCREEN E-COMMERCE CONECTADA A GOOGLE FORMS
    // =========================================================================
    const elMerchModal = document.getElementById('merchModal');
    const elMerchModalTitle = document.getElementById('merchModalTitle');
    const elMerchModalKicker = document.getElementById('merchModalKicker');
    const elMerchModalDesc = document.getElementById('merchModalDesc');
    const elMerchPriceTag = document.getElementById('merchPriceTag');
    const elMerchFormsSwitcher = document.getElementById('merchFormsSwitcher');
    const elMerchShowcaseVisual = document.getElementById('merchShowcaseVisual');
    const elMerchThumbStrip = document.getElementById('merchThumbStrip');
    const elMerchIframeLoader = document.getElementById('merchIframeLoader');
    const elMerchNativeForm = document.getElementById('merchNativeForm');
    const elMerchDynamicFields = document.getElementById('merchDynamicFields');
    const elMerchFormError = document.getElementById('merchFormError');
    const elBtnSubmitMerchOrder = document.getElementById('btnSubmitMerchOrder');
    const elMerchOrderSuccess = document.getElementById('merchOrderSuccess');
    const elMerchSuccessSummary = document.getElementById('merchSuccessSummary');
    const elBtnMerchAnotherOrder = document.getElementById('btnMerchAnotherOrder');
    const elBtnMerchFinishOrder = document.getElementById('btnMerchFinishOrder');
    const elBtnCloseMerchModal = document.getElementById('btnCloseMerchModal');
    const elMerchHiddenGoogleForm = document.getElementById('merchHiddenGoogleForm');
    const elMerchTopbarBadge = document.getElementById('merchTopbarBadge');
    const elMerchStageSeasonPill = document.getElementById('merchStageSeasonPill');
    const elMerchStageSubPill = document.getElementById('merchStageSubPill');
    const elMerchSpecLabel1 = document.getElementById('merchSpecLabel1');
    const elMerchSpecValue1 = document.getElementById('merchSpecValue1');
    const elMerchSpecLabel2 = document.getElementById('merchSpecLabel2');
    const elMerchSpecValue2 = document.getElementById('merchSpecValue2');
    const elMerchSpecLabel3 = document.getElementById('merchSpecLabel3');
    const elMerchSpecValue3 = document.getElementById('merchSpecValue3');
    const elMerchCtaSubnote = document.getElementById('merchCtaSubnote');
    const elMerchSuccessKicker = document.getElementById('merchSuccessKicker');
    const elMerchSuccessTitle = document.getElementById('merchSuccessTitle');

    let activeFormModalMode = 'merch'; // 'merch' | 'inscripcion'
    let activeMerchFormIdx = 0;
    let activeInscripcionFormIdx = 0;
    let activeMerchOrderState = {};
    let activeMerchPhotoIdx = 0;

    function applyFormModalChrome(mode) {
        const isInsc = (mode === 'inscripcion');
        const submitLabelEl = elBtnSubmitMerchOrder?.querySelector('.merch-submit-label');
        if (elMerchTopbarBadge) elMerchTopbarBadge.textContent = isInsc ? 'ACRUX 518 · INSCRIPCIONES' : 'ACRUX 518 · MERCH OFICIAL';
        if (elMerchStageSeasonPill) elMerchStageSeasonPill.textContent = isInsc ? 'INSCRIPCIÓN OFICIAL ACRUX 518' : 'COLECCIÓN OFICIAL ACRUX 518';
        if (elMerchStageSubPill) elMerchStageSubPill.textContent = isInsc ? 'SÁBADOS 16:30 – 18:30 · RUEDA 53' : 'ENTREGA EN BASE · RUEDA 53';
        if (elMerchSpecLabel1) elMerchSpecLabel1.textContent = isInsc ? 'EDADES' : 'EDICIÓN';
        if (elMerchSpecValue1) elMerchSpecValue1.textContent = isInsc ? '6 a 20 años · 5 Ramas' : 'Grupo Scout Acrux 518';
        if (elMerchSpecLabel2) elMerchSpecLabel2.textContent = isInsc ? 'REUNIONES' : 'RECOGIDA';
        if (elMerchSpecValue2) elMerchSpecValue2.textContent = 'Sábados 16:30 – 18:30 h';
        if (elMerchSpecLabel3) elMerchSpecLabel3.textContent = isInsc ? 'SEDE' : 'REGISTRO';
        if (elMerchSpecValue3) elMerchSpecValue3.textContent = isInsc ? 'Crtra. Rueda, 53 · Valladolid' : 'Directo en Hoja Oficial';
        if (submitLabelEl) submitLabelEl.textContent = isInsc ? 'Enviar Inscripción' : 'Realizar Pedido';
        if (elMerchCtaSubnote) {
            elMerchCtaSubnote.textContent = isInsc
                ? 'Tu solicitud quedará registrada al instante en el formulario oficial del grupo.'
                : 'Tu pedido quedará registrado al instante en el formulario oficial del grupo.';
        }
        if (elMerchSuccessKicker) elMerchSuccessKicker.textContent = isInsc ? 'INSCRIPCIÓN REGISTRADA CORRECTAMENTE' : 'PEDIDO REGISTRADO CORRECTAMENTE';
        if (elMerchSuccessTitle) elMerchSuccessTitle.textContent = isInsc ? '¡Solicitud enviada!' : '¡Gracias por tu pedido!';
        if (elBtnMerchAnotherOrder) elBtnMerchAnotherOrder.textContent = isInsc ? 'Enviar otra inscripción' : 'Realizar otro pedido';
    }

    // Mapa cromático para pastillas de color y vista previa de prenda en estudio
    function getColorInfoFromLabel(rawLabel) {
        const s = (rawLabel || '')
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .trim();
        if (s.includes('white') || s.includes('blanc')) return { hex: '#F8FAFC', label: rawLabel === 'White' ? 'Blanco (White)' : rawLabel };
        if (s.includes('black') || s.includes('negr')) return { hex: '#111827', label: rawLabel === 'Black' ? 'Negro (Black)' : rawLabel };
        if (s.includes('navy') || s.includes('marino')) return { hex: '#1E293B', label: rawLabel };
        if (s.includes('blue') || s.includes('azul') || s.includes('celeste')) return { hex: '#2563EB', label: rawLabel === 'Blue' ? 'Azul (Blue)' : rawLabel };
        if (s.includes('green') || s.includes('verde')) return { hex: '#15803D', label: rawLabel === 'Green' ? 'Verde (Green)' : rawLabel };
        if (s.includes('yellow') || s.includes('amarill') || s.includes('oro')) return { hex: '#EAB308', label: rawLabel === 'Yellow' ? 'Amarillo (Yellow)' : rawLabel };
        if (s.includes('grey') || s.includes('gray') || s.includes('gris')) return { hex: '#64748B', label: (rawLabel === 'Grey' || rawLabel === 'Gray') ? 'Gris (Grey)' : rawLabel };
        if (s.includes('red') || s.includes('roj') || s.includes('burdeos') || s.includes('granate')) return { hex: '#B91C1C', label: rawLabel === 'Red' ? 'Rojo (Red)' : rawLabel };
        if (s.includes('beige') || s.includes('arena') || s.includes('crudo') || s.includes('sand')) return { hex: '#D6C7B2', label: rawLabel };
        if (s.includes('pink') || s.includes('rosa')) return { hex: '#EC4899', label: rawLabel };
        if (s.includes('purple') || s.includes('morad') || s.includes('lila')) return { hex: '#7C3AED', label: rawLabel };
        if (s.includes('orange') || s.includes('naranja')) return { hex: '#EA580C', label: rawLabel };
        return null;
    }

    function translateMerchFieldTitle(rawTitle) {
        const t = (rawTitle || '').replace(/<[^>]*>/g, '').trim();
        const lower = t.toLowerCase();
        const map = {
            'favorite color': 'Color',
            'last name': 'Nombre y Apellidos',
            'first name': 'Nombre',
            'name': 'Nombre y Apellidos',
            'phone': 'Teléfono de contacto',
            'phone number': 'Teléfono de contacto',
            'email': 'Correo electrónico',
            'size and color': 'Talla y Color',
            'size': 'Talla',
            'color': 'Color',
            'quantity': 'Cantidad',
            'shipping address': 'Dirección de Entrega',
            'street address': 'Dirección (Calle y número)',
            'street address line 2': 'Piso / Puerta / Escalera (Opcional)',
            'city': 'Ciudad / Localidad',
            'state': 'Provincia',
            'postal code': 'Código Postal',
            'zip code': 'Código Postal',
            'notes': 'Observaciones / Comentarios',
            'comments': 'Observaciones / Comentarios'
        };
        return map[lower] || t;
    }

    // Extrae el array FB_PUBLIC_LOAD_DATA_ del HTML público de un Google Form
    function extractFbPublicLoadDataFromHtml(html) {
        if (!html || typeof html !== 'string') return null;
        const marker = 'FB_PUBLIC_LOAD_DATA_';
        const idx = html.indexOf(marker);
        if (idx === -1) return null;
        const startBracket = html.indexOf('[', idx);
        if (startBracket === -1) return null;
        const endScript = html.indexOf('</script>', startBracket);
        if (endScript === -1) return null;
        let jsonStr = html.substring(startBracket, endScript).trim();
        if (jsonStr.endsWith(';')) jsonStr = jsonStr.slice(0, -1).trim();
        try {
            return JSON.parse(jsonStr);
        } catch (_) {
            return null;
        }
    }

    // Transforma FB_PUBLIC_LOAD_DATA_ en tiempo real en un esquema de e-commerce 100% fiel al Google Form
    function buildSchemaFromFbLoadData(fbData, htmlText, form) {
        if (!Array.isArray(fbData) || !Array.isArray(fbData[1])) return null;
        const formMeta = fbData[1];
        const rawQuestions = Array.isArray(formMeta[1]) ? formMeta[1] : [];
        const formDesc = (formMeta[0] || '').replace(/<[^>]*>/g, '').trim();
        const isInscForm = Array.isArray(INSCRIPCION_FORMS_DATA) && INSCRIPCION_FORMS_DATA.includes(form);
        // Título real del formulario (fbData[1][8]); fbData[3] es el nombre antiguo del archivo y solo se usa de respaldo
        const rawLiveTitle = extractFbFormTitle(fbData);
        const liveTitle = isInscForm ? rawLiveTitle : normalizeMerchFormTitle(rawLiveTitle);
        const publicSlug = fbData[14] || '';
        const actionUrl = publicSlug
            ? `https://docs.google.com/forms/d/${publicSlug}/formResponse`
            : `https://docs.google.com/forms/d/${form.id}/formResponse`;

        // Solo usar liveTitle si el servidor no envió un título ya limpio, y nunca pisar el modal si el usuario está viendo otro artículo
        if (liveTitle && form) {
            if (!form.title || (!isInscForm && /^merch\b/i.test(form.title))) {
                form.title = liveTitle;
            }
            const formIdx = MERCH_FORMS_DATA.indexOf(form);
            const inscIdx = INSCRIPCION_FORMS_DATA.indexOf(form);
            if (elMerchModalTitle && elMerchModal?.classList.contains('is-open')) {
                if ((activeFormModalMode === 'merch' && formIdx === activeMerchFormIdx) ||
                    (activeFormModalMode === 'inscripcion' && inscIdx === activeInscripcionFormIdx)) {
                    elMerchModalTitle.textContent = form.title;
                }
            }
            if (formIdx === 0) {
                const intrometidaNode = worldNodes.find(nd => nd.id === 'intrometida');
                if (intrometidaNode && intrometidaNode.isMerchStar && intrometidaNode.merchIndex === 0) {
                    const cleanLabel = /^merch\b/i.test(form.title) ? form.title : `Merch · ${form.title}`;
                    intrometidaNode.symbol = `ε ${cleanLabel}`;
                }
            }
        }

        // Extraer todas las imágenes reales de preguntas incrustadas en el Google Form (<img src="https://docs.google.com/forms-images-rt/..." o lh3)
        // Nota: Google Forms envía el header `Cross-Origin-Resource-Policy: same-site` en `forms-images-rt`,
        // por lo que las servimos a través de `images.weserv.nl` (CORP: cross-origin) para que Chrome las muestre sin bloqueo.
        const extractedImages = [];
        if (htmlText) {
            const imgTagRegex = /<img[^>]+src=["'](https:\/\/(?:docs\.google\.com\/forms-images-rt|lh[0-9]\.googleusercontent\.com)\/[^"'\s<>]+)["'][^>]*>/gi;
            let match;
            while ((match = imgTagRegex.exec(htmlText)) !== null) {
                const cleanU = match[1].replace(/\\u003d/g, '=').replace(/&amp;/g, '&');
                if (cleanU.includes('=w1200-h630-p') || cleanU.includes('=w600-h315-p')) continue;
                const safeImgUrl = cleanU.startsWith('https://docs.google.com/forms-images-rt/')
                    ? `https://images.weserv.nl/?url=${encodeURIComponent(cleanU)}`
                    : cleanU;
                if (!extractedImages.includes(safeImgUrl)) {
                    extractedImages.push(safeImgUrl);
                }
            }
        }

        const pillFields = [];
        const textFields = [];
        const autoSyncColorEntries = [];
        let hasGridColorSelector = false;

        // Variables para unificar 1 o varias cuadrículas de Talla y Color (ej. una cuadrícula para "Negro" con su foto y otra para "Azúl" con su foto)
        const unifiedSizes = [];
        const unifiedColors = [];
        const gridCellMap = {}; // clave: `${size}|||${color}` -> `entry.xxxxx`
        const colorPhotoUrlMap = {}; // clave: `color` -> url de la imagen asociada a esa pregunta
        let qImgCursor = 0;

        rawQuestions.forEach(q => {
            if (Array.isArray(q) && q[3] === 7 && Array.isArray(q[4]) && q[4].length > 0) {
                hasGridColorSelector = true;
            }
        });

        rawQuestions.forEach(q => {
            if (!Array.isArray(q)) return;
            const qId = q[0];
            const rawTitle = (q[1] || '').replace(/<[^>]*>/g, '').trim();
            const title = translateMerchFieldTitle(rawTitle);
            const helpText = (q[2] || '').replace(/<[^>]*>/g, '').trim();
            const qType = q[3];
            const inputs = q[4];

            // Comprobar si esta pregunta tiene una imagen adjunta en el Google Form (q[9] o q[6])
            const hasAttachedImg = (Array.isArray(q[9]) && q[9].length > 0) || (Array.isArray(q[6]) && q[6].length > 0);
            const questionImageUrl = hasAttachedImg ? (extractedImages[qImgCursor++] || null) : null;

            // Si es un bloque de imagen suelto sin inputs (qType === 6 o 9), ya quedó registrado en extractedImages
            if (qType === 6 || !Array.isArray(inputs) || inputs.length === 0) {
                return;
            }

            // CASO A: Cuadrícula de Talla y Color (qType === 7)
            if (qType === 7) {
                const rows = inputs.map(r => ({
                    entryId: `entry.${r[0]}`,
                    rowLabel: (Array.isArray(r[3]) && r[3][0]) ? String(r[3][0]).trim() : '',
                    colOptions: Array.isArray(r[1]) ? r[1].map(c => String(c[0] || '').trim()).filter(Boolean) : [],
                    required: Boolean(r[2])
                })).filter(r => r.rowLabel && r.entryId);

                rows.forEach(r => {
                    if (!unifiedSizes.includes(r.rowLabel)) {
                        unifiedSizes.push(r.rowLabel);
                    }
                    r.colOptions.forEach(colOpt => {
                        if (!unifiedColors.includes(colOpt)) {
                            unifiedColors.push(colOpt);
                        }
                        gridCellMap[`${r.rowLabel}|||${colOpt}`] = r.entryId;
                        if (questionImageUrl && !colorPhotoUrlMap[colOpt]) {
                            colorPhotoUrlMap[colOpt] = questionImageUrl;
                        }
                    });
                });
                return;
            }

            const firstInput = inputs[0];
            if (!Array.isArray(firstInput) || !firstInput[0]) return;
            const entryId = `entry.${firstInput[0]}`;
            const isRequired = Boolean(firstInput[2]);
            const rawOpts = Array.isArray(firstInput[1])
                ? firstInput[1].map(o => (Array.isArray(o) ? String(o[0] || '').trim() : '')).filter(Boolean)
                : [];

            const lowerTitle = (rawTitle + ' ' + title).toLowerCase();
            const isColorQ = lowerTitle.includes('color') || lowerTitle.includes('colour');
            const isSizeQ = lowerTitle.includes('talla') || lowerTitle.includes('size');
            const isQtyQ = lowerTitle.includes('cantidad') || lowerTitle.includes('quantity') || lowerTitle.includes('unidades');

            if ((qType === 0 || qType === 1) && isColorQ && hasGridColorSelector && rawOpts.length === 0) {
                autoSyncColorEntries.push(entryId);
                return;
            }

            // CASO B: Pregunta con opciones (Radio, Desplegable, Casillas, Escala)
            if (rawOpts.length > 0) {
                const isMulti = (qType === 4);
                pillFields.push({
                    id: entryId,
                    entryId: entryId,
                    kind: 'pills',
                    isMulti: isMulti,
                    title: title,
                    helpText: helpText,
                    required: isRequired,
                    isColorField: isColorQ,
                    isSizeField: isSizeQ,
                    isQtyField: isQtyQ,
                    options: rawOpts,
                    defaultVal: isMulti ? (isRequired ? [rawOpts[0]] : []) : (isQtyQ ? '1' : rawOpts[0])
                });
                return;
            }

            // CASO C: Si crearon una pregunta de texto corto llamada "Talla" o "Color" sin opciones definidas
            if (qType === 0 && isSizeQ) {
                const defaultSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
                pillFields.push({
                    id: entryId,
                    entryId: entryId,
                    kind: 'pills',
                    title: title || 'Selecciona Talla',
                    helpText: helpText,
                    required: isRequired,
                    isSizeField: true,
                    options: defaultSizes,
                    defaultVal: 'M'
                });
                return;
            }

            if (qType === 0 && isColorQ && !hasGridColorSelector) {
                const defaultColors = ['Negro', 'Blanco', 'Azul Marino', 'Verde', 'Gris'];
                pillFields.push({
                    id: entryId,
                    entryId: entryId,
                    kind: 'pills',
                    title: title || 'Selecciona Color',
                    helpText: helpText,
                    required: isRequired,
                    isColorField: true,
                    options: defaultColors,
                    defaultVal: defaultColors[0]
                });
                return;
            }

            // CASO D: Campo de texto estilizado o fecha para las preguntas abiertas del formulario
            let inputType = 'text';
            if (qType === 9) inputType = 'date';
            else if (lowerTitle.includes('email') || lowerTitle.includes('correo')) inputType = 'email';
            else if (lowerTitle.includes('phone') || lowerTitle.includes('teléfono') || lowerTitle.includes('telefono') || lowerTitle.includes('móvil')) inputType = 'tel';

            textFields.push({
                id: entryId,
                entryId: entryId,
                kind: qType === 1 ? 'textarea' : (qType === 9 ? 'date' : 'text'),
                inputType: inputType,
                title: title,
                helpText: helpText,
                required: isRequired,
                placeholder: isRequired ? `Introduce ${title.toLowerCase()}...` : `${title} (opcional)...`
            });
        });

        // Si el formulario tenía cuadrículas de Talla y Color, añadir el selector unificado de Talla y de Color
        if (unifiedSizes.length > 0) {
            pillFields.push({
                id: 'grid-size-unified',
                kind: 'grid-size',
                title: 'Selecciona Talla',
                required: true,
                gridCellMap: gridCellMap,
                options: unifiedSizes,
                defaultVal: unifiedSizes.find(s => s === 'M' || s === 'L') || unifiedSizes[0]
            });

            if (unifiedColors.length > 0) {
                pillFields.push({
                    id: 'grid-color-unified',
                    kind: 'grid-color',
                    gridSizeFieldId: 'grid-size-unified',
                    title: 'Selecciona Color',
                    required: true,
                    isColorField: true,
                    colorPhotoUrlMap: colorPhotoUrlMap,
                    options: unifiedColors,
                    defaultVal: unifiedColors[0]
                });
            }
        }

        // Ordenar los selectores de pastilla: 1º Talla, 2º Color, 3º Cantidad / Resto
        pillFields.sort((a, b) => {
            const rank = f => (f.kind === 'grid-size' || f.isSizeField) ? 1 : ((f.kind === 'grid-color' || f.isColorField) ? 2 : 3);
            return rank(a) - rank(b);
        });

        return {
            liveTitle: liveTitle,
            actionUrl: actionUrl,
            description: formDesc,
            images: extractedImages,
            colorPhotoUrlMap: colorPhotoUrlMap,
            pillFields: pillFields,
            textFields: textFields,
            autoSyncColorEntries: autoSyncColorEntries
        };
    }

    async function preloadMerchFormSchema(form, forceRefresh = false) {
        if (!form) return null;
        if (form._parsedSchema && !forceRefresh) return form._parsedSchema;

        // 1. Si el backend de Google Apps Script ya envió el esquema estructurado (form.fbLoadData)
        if (form.fbLoadData) {
            const parsed = buildSchemaFromFbLoadData(form.fbLoadData, form.rawHtml || '', form);
            if (parsed) {
                form._parsedSchema = parsed;
                return parsed;
            }
        }

        // 2. Leer en tiempo real el HTML público del Google Form para extraer FB_PUBLIC_LOAD_DATA_ y las fotos actuales
        const viewUrl = `https://docs.google.com/forms/d/${form.id}/viewform`;
        const fetchCandidates = [
            {
                url: `https://r.jina.ai/${viewUrl}`,
                options: {
                    headers: { 'X-Return-Format': 'html', 'X-No-Cache': 'true' },
                    cache: 'no-store'
                }
            },
            {
                url: `https://r.jina.ai/${viewUrl}`,
                options: {
                    headers: { 'X-Return-Format': 'html' },
                    cache: 'no-store'
                }
            },
            {
                url: `https://api.allorigins.win/raw?url=${encodeURIComponent(viewUrl)}`,
                options: { cache: 'no-store' }
            }
        ];

        for (const candidate of fetchCandidates) {
            try {
                const res = await fetch(candidate.url, candidate.options);
                if (!res.ok) continue;
                const text = await res.text();
                const fbData = extractFbPublicLoadDataFromHtml(text);
                if (fbData) {
                    const schema = buildSchemaFromFbLoadData(fbData, text, form);
                    if (schema && (schema.pillFields.length > 0 || schema.textFields.length > 0)) {
                        form._parsedSchema = schema;
                        return schema;
                    }
                }
            } catch (_) {
                // Intentar siguiente endpoint en vivo
            }
        }

        return form._parsedSchema || null;
    }

    // Renderiza el escaparate fotográfico izquierdo (foto de Drive / Formulario + maniquí vectorial de estudio reactivo al color)
    function renderMerchLeftShowcase(form, schema) {
        if (!elMerchShowcaseVisual) return;

        const allPhotos = [
            ...(Array.isArray(form.photos) ? form.photos : []),
            ...(schema && Array.isArray(schema.images) ? schema.images : [])
        ].filter((v, i, a) => v && a.indexOf(v) === i);

        // Detectar color activo seleccionado para teñir la prenda de estudio
        let selectedColorLabel = 'Negro';
        if (schema && Array.isArray(schema.pillFields)) {
            const colorField = schema.pillFields.find(f => f.isColorField || f.kind === 'grid-color');
            if (colorField && activeMerchOrderState[colorField.id]) {
                selectedColorLabel = activeMerchOrderState[colorField.id];
            }
        }
        const colorInfo = getColorInfoFromLabel(selectedColorLabel) || { hex: '#1E293B', label: selectedColorLabel };
        const selectedSizeLabel = (() => {
            if (!schema || !Array.isArray(schema.pillFields)) return 'M';
            const sizeField = schema.pillFields.find(f => f.isSizeField || f.kind === 'grid-size');
            return (sizeField && activeMerchOrderState[sizeField.id]) ? activeMerchOrderState[sizeField.id] : 'M';
        })();

        // Mostrar tira de miniaturas si hay fotos + vista de estudio (o foto de grupo en Inscripciones)
        const isInscMode = (activeFormModalMode === 'inscripcion');
        const effectivePhotos = (allPhotos.length === 0 && isInscMode) ? ['images/Tropa.jpg'] : allPhotos;
        const hasPhotos = effectivePhotos.length > 0;
        const showStudioView = !hasPhotos || activeMerchPhotoIdx >= effectivePhotos.length;

        if (!showStudioView) {
            const currentPhoto = effectivePhotos[activeMerchPhotoIdx] || effectivePhotos[0];
            elMerchShowcaseVisual.innerHTML = `
                <img src="${currentPhoto}" alt="${form.title}" class="merch-showcase-img" id="merchMainShowcaseImg" referrerpolicy="no-referrer">
            `;
            const imgEl = document.getElementById('merchMainShowcaseImg');
            imgEl?.addEventListener('click', () => {
                if (typeof openLightbox === 'function') {
                    openLightbox(currentPhoto, isInscMode ? `${form.title} · Acrux 518` : `${form.title} · Merch Acrux 518`);
                }
            });
        } else {
            const isLightGarment = colorInfo.hex === '#F8FAFC' || colorInfo.hex === '#EAB308' || colorInfo.hex === '#D6C7B2';
            const strokeCol = isLightGarment ? 'rgba(15, 23, 42, 0.35)' : 'rgba(255, 255, 255, 0.24)';
            const crestCol = isLightGarment ? '#0F172A' : '#E2D5B5';

            elMerchShowcaseVisual.innerHTML = `
                <div class="merch-studio-garment-stage">
                    <svg class="merch-studio-garment-svg" viewBox="0 0 320 340" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <linearGradient id="garmentBodyGrad" x1="60" y1="30" x2="260" y2="310" gradientUnits="userSpaceOnUse">
                                <stop offset="0%" stop-color="${colorInfo.hex}" stop-opacity="0.98"/>
                                <stop offset="100%" stop-color="#070A10" stop-opacity="0.96"/>
                            </linearGradient>
                        </defs>
                        <!-- Silueta técnica editorial de prenda Acrux 518 -->
                        <path d="M108 42 L62 66 L26 138 L66 162 L86 114 L86 296 C86 302 91 306 97 306 L223 306 C229 306 234 302 234 296 L234 114 L254 162 L294 138 L258 66 L212 42 C198 62 122 62 108 42 Z"
                              fill="url(#garmentBodyGrad)" stroke="${strokeCol}" stroke-width="2.2" stroke-linejoin="round"/>
                        <!-- Cuello acanalado -->
                        <path d="M108 42 C124 72 196 72 212 42 C196 50 124 50 108 42 Z"
                              fill="rgba(0,0,0,0.35)" stroke="${strokeCol}" stroke-width="1.6"/>
                        <!-- Costuras de hombro y pecho -->
                        <line x1="86" y1="114" x2="108" y2="42" stroke="${strokeCol}" stroke-width="1.2" stroke-dasharray="3 3"/>
                        <line x1="234" y1="114" x2="212" y2="42" stroke="${strokeCol}" stroke-width="1.2" stroke-dasharray="3 3"/>
                        <!-- Bordado minimalista Acrux 518 en pecho izquierdo -->
                        <g transform="translate(184, 108)">
                            <circle cx="14" cy="14" r="14" fill="none" stroke="${crestCol}" stroke-width="1.2" stroke-opacity="0.75"/>
                            <path d="M14 4 L16.2 11.8 L24 14 L16.2 16.2 L14 24 L11.8 16.2 L4 14 L11.8 11.8 Z" fill="${crestCol}"/>
                        </g>
                        <!-- Etiqueta inferior tejida -->
                        <rect x="132" y="280" width="56" height="14" rx="3" fill="rgba(0,0,0,0.45)" stroke="${crestCol}" stroke-width="0.9" stroke-opacity="0.6"/>
                        <text x="160" y="290" text-anchor="middle" fill="${crestCol}" font-family="Plus Jakarta Sans, sans-serif" font-size="6.5" letter-spacing="1.5">ACRUX 518</text>
                    </svg>
                    <div class="merch-studio-caption">
                        <span class="merch-studio-caption-tag">VISTA DE ESTUDIO · TALLA ${selectedSizeLabel} · ${colorInfo.label.toUpperCase()}</span>
                        <span class="merch-studio-caption-sub">${form.title} · Colección Oficial Grupo Scout Acrux 518</span>
                    </div>
                </div>
            `;
        }

        if (elMerchThumbStrip) {
            if (allPhotos.length > 0) {
                elMerchThumbStrip.style.display = 'flex';
                const photoThumbs = allPhotos.map((p, idx) => `
                    <button type="button" class="merch-thumb-btn ${activeMerchPhotoIdx === idx ? 'active' : ''}" data-thumb-idx="${idx}" title="Ver fotografía ${idx + 1}">
                        <img src="${p}" alt="Miniatura ${idx + 1}" referrerpolicy="no-referrer">
                    </button>
                `).join('');
                elMerchThumbStrip.innerHTML = photoThumbs;
                elMerchThumbStrip.querySelectorAll('[data-thumb-idx]').forEach(btn => {
                    btn.addEventListener('click', () => {
                        activeMerchPhotoIdx = parseInt(btn.getAttribute('data-thumb-idx'), 10);
                        const clickedPhotoUrl = allPhotos[activeMerchPhotoIdx];
                        if (clickedPhotoUrl && schema && schema.colorPhotoUrlMap) {
                            const matchedColorEntry = Object.entries(schema.colorPhotoUrlMap).find(([, u]) => u === clickedPhotoUrl);
                            if (matchedColorEntry) {
                                const colorName = matchedColorEntry[0];
                                const colorField = (schema.pillFields || []).find(f => f.isColorField || f.kind === 'grid-color');
                                if (colorField) {
                                    activeMerchOrderState[colorField.id] = colorName;
                                    const groupEl = elMerchDynamicFields?.querySelector(`[data-field-group="${colorField.id}"]`);
                                    groupEl?.querySelectorAll('.merch-option-pill').forEach(b => {
                                        b.classList.toggle('is-selected', b.getAttribute('data-pill-value') === colorName);
                                    });
                                    const selLabelEl = document.getElementById(`selectedLabel-${colorField.id}`);
                                    if (selLabelEl) {
                                        const cInfo = getColorInfoFromLabel(colorName);
                                        selLabelEl.textContent = cInfo ? cInfo.label : colorName;
                                    }
                                }
                            }
                        }
                        renderMerchLeftShowcase(form, schema);
                    });
                });
            } else {
                elMerchThumbStrip.style.display = 'none';
                elMerchThumbStrip.innerHTML = '';
            }
        }
    }

    // Renderiza todos los selectores de pastilla (Tallas, Colores, Cantidad) y los campos de texto del comprador
    function renderMerchDynamicForm(form, schema) {
        if (!elMerchDynamicFields) return;

        if (elMerchModalTitle && (schema.liveTitle || form.title)) {
            elMerchModalTitle.textContent = schema.liveTitle || form.title;
        }

        if (elMerchModalDesc) {
            const fallbackDesc = activeFormModalMode === 'inscripcion'
                ? 'Completa tus datos en el formulario oficial para solicitar plaza o acudir a un sábado de prueba con el Grupo Scout Acrux 518.'
                : 'Selecciona tu talla y color preferido y completa tus datos para registrar tu pedido.';
            elMerchModalDesc.textContent = schema.description || form.desc || fallbackDesc;
        }

        if (elMerchPriceTag) {
            if (form.price && activeFormModalMode === 'merch') {
                elMerchPriceTag.style.display = 'inline-flex';
                elMerchPriceTag.textContent = form.price;
            } else {
                elMerchPriceTag.style.display = 'none';
            }
        }

        // Inicializar valores por defecto en activeMerchOrderState
        activeMerchOrderState = {};
        schema.pillFields.forEach(pf => {
            if (pf.isMulti) {
                activeMerchOrderState[pf.id] = Array.isArray(pf.defaultVal) ? pf.defaultVal.slice() : [];
            } else {
                activeMerchOrderState[pf.id] = pf.defaultVal || pf.options[0] || '';
            }
        });

        const pillsHtml = schema.pillFields.map(pf => {
            const currentVal = activeMerchOrderState[pf.id];
            const isSelectedFn = opt => pf.isMulti
                ? (Array.isArray(currentVal) && currentVal.includes(opt))
                : (opt === currentVal);
            const currentColorInfo = (!pf.isMulti && pf.isColorField) ? getColorInfoFromLabel(currentVal) : null;
            const displaySelected = pf.isMulti
                ? (Array.isArray(currentVal) && currentVal.length > 0 ? currentVal.join(', ') : 'Sin selección')
                : (currentColorInfo ? currentColorInfo.label : currentVal);

            const buttonsHtml = pf.options.map(opt => {
                const isSelected = isSelectedFn(opt);
                const cInfo = pf.isColorField ? getColorInfoFromLabel(opt) : null;
                const dotHtml = cInfo
                    ? `<span class="merch-color-dot" style="background-color: ${cInfo.hex};"></span>`
                    : '';
                const labelText = cInfo ? cInfo.label : opt;

                return `
                    <button type="button"
                            class="merch-option-pill ${isSelected ? 'is-selected' : ''}"
                            data-pill-field="${pf.id}"
                            data-pill-value="${opt.replace(/"/g, '&quot;')}">
                        ${dotHtml}
                        <span>${labelText}</span>
                    </button>
                `;
            }).join('');

            return `
                <div class="merch-field-group" data-field-group="${pf.id}">
                    <div class="merch-field-label-row">
                        <label class="merch-field-label">
                            ${pf.title}
                            ${pf.required ? '<span class="merch-field-required">*</span>' : ''}
                        </label>
                        <span class="merch-field-selected-val" id="selectedLabel-${pf.id}">${displaySelected}</span>
                    </div>
                    ${pf.helpText ? `<p class="merch-field-help">${pf.helpText}</p>` : ''}
                    <div class="merch-pills-grid">
                        ${buttonsHtml}
                    </div>
                </div>
            `;
        }).join('');

        const buyerDividerLabel = activeFormModalMode === 'inscripcion' ? 'Datos de Inscripción' : 'Datos del Comprador';
        const buyerDividerHtml = schema.textFields.length > 0
            ? `<div class="merch-section-divider">${buyerDividerLabel}</div>`
            : '';

        const textsHtml = schema.textFields.map(tf => {
            const inputHtml = tf.kind === 'textarea'
                ? `<textarea class="merch-textarea-input" id="input-${tf.id}" data-text-field="${tf.id}" placeholder="${tf.placeholder}" ${tf.required ? 'required' : ''}></textarea>`
                : `<input type="${tf.inputType || 'text'}" class="merch-text-input" id="input-${tf.id}" data-text-field="${tf.id}" placeholder="${tf.placeholder}" ${tf.required ? 'required' : ''}>`;

            return `
                <div class="merch-field-group">
                    <div class="merch-field-label-row">
                        <label class="merch-field-label" for="input-${tf.id}">
                            ${tf.title}
                            ${tf.required ? '<span class="merch-field-required">*</span>' : ''}
                        </label>
                    </div>
                    ${tf.helpText ? `<p class="merch-field-help">${tf.helpText}</p>` : ''}
                    ${inputHtml}
                </div>
            `;
        }).join('');

        elMerchDynamicFields.innerHTML = pillsHtml + buyerDividerHtml + textsHtml;

        // VALIDADOR EN VIVO DE COMBINACIONES TALLA + COLOR
        // Deshabilita tallas que no existan en el color elegido y salta automáticamente a una talla válida
        function syncGridAvailability() {
            const sizeField = schema.pillFields.find(f => f.kind === 'grid-size');
            const colorField = schema.pillFields.find(f => f.kind === 'grid-color');
            if (!sizeField || !colorField || !sizeField.gridCellMap) return;

            const cellMap = sizeField.gridCellMap;
            const currentColor = activeMerchOrderState[colorField.id];
            let currentSize = activeMerchOrderState[sizeField.id];

            // 1. Si la talla actual NO existe para el nuevo color elegido, cambiar sola a la primera talla válida
            if (currentColor && !cellMap[`${currentSize}|||${currentColor}`]) {
                const firstValidSize = sizeField.options.find(sz => Boolean(cellMap[`${sz}|||${currentColor}`]));
                if (firstValidSize) {
                    currentSize = firstValidSize;
                    activeMerchOrderState[sizeField.id] = firstValidSize;
                }
            }

            // 2. Activar/desactivar botones de Talla según el Color activo
            const sizeGroupEl = elMerchDynamicFields.querySelector(`[data-field-group="${sizeField.id}"]`);
            if (sizeGroupEl) {
                sizeGroupEl.querySelectorAll('.merch-option-pill').forEach(btn => {
                    const szVal = btn.getAttribute('data-pill-value');
                    const isAvailable = Boolean(cellMap[`${szVal}|||${currentColor}`]);
                    btn.disabled = !isAvailable;
                    btn.classList.toggle('is-unavailable', !isAvailable);
                    btn.classList.toggle('is-selected', isAvailable && szVal === currentSize);
                });
                const selSizeLabel = document.getElementById(`selectedLabel-${sizeField.id}`);
                if (selSizeLabel) selSizeLabel.textContent = currentSize || '';
            }

            // 3. Activar/desactivar botones de Color (por si hubiera algún color vacío sin ninguna talla)
            const colorGroupEl = elMerchDynamicFields.querySelector(`[data-field-group="${colorField.id}"]`);
            if (colorGroupEl) {
                colorGroupEl.querySelectorAll('.merch-option-pill').forEach(btn => {
                    const colVal = btn.getAttribute('data-pill-value');
                    const hasAnySize = sizeField.options.some(sz => Boolean(cellMap[`${sz}|||${colVal}`]));
                    btn.disabled = !hasAnySize;
                    btn.classList.toggle('is-unavailable', !hasAnySize);
                    btn.classList.toggle('is-selected', hasAnySize && colVal === currentColor);
                });
            }
        }

        // Eventos interactivos en las pastillas de Talla / Color / Cantidad
        elMerchDynamicFields.querySelectorAll('[data-pill-field]').forEach(btn => {
            btn.addEventListener('click', () => {
                if (btn.disabled || btn.classList.contains('is-unavailable')) return;
                const fieldId = btn.getAttribute('data-pill-field');
                const val = btn.getAttribute('data-pill-value');
                const pf = schema.pillFields.find(f => f.id === fieldId);
                const groupEl = btn.closest('.merch-field-group');

                if (pf && pf.isMulti) {
                    const arr = Array.isArray(activeMerchOrderState[fieldId]) ? activeMerchOrderState[fieldId].slice() : [];
                    const idx = arr.indexOf(val);
                    if (idx >= 0) arr.splice(idx, 1);
                    else arr.push(val);
                    activeMerchOrderState[fieldId] = arr;
                    groupEl?.querySelectorAll('.merch-option-pill').forEach(b => {
                        b.classList.toggle('is-selected', arr.includes(b.getAttribute('data-pill-value')));
                    });
                    const selLabelEl = document.getElementById(`selectedLabel-${fieldId}`);
                    if (selLabelEl) {
                        selLabelEl.textContent = arr.length > 0 ? arr.join(', ') : 'Sin selección';
                    }
                    return;
                }

                activeMerchOrderState[fieldId] = val;

                // Actualizar estado visual de las pastillas del grupo
                groupEl?.querySelectorAll('.merch-option-pill').forEach(b => {
                    b.classList.toggle('is-selected', b === btn);
                });

                const selLabelEl = document.getElementById(`selectedLabel-${fieldId}`);
                if (selLabelEl) {
                    const cInfo = pf && pf.isColorField ? getColorInfoFromLabel(val) : null;
                    selLabelEl.textContent = cInfo ? cInfo.label : val;
                }

                // Re-validar disponibilidad cruzada Talla/Color
                syncGridAvailability();

                // Actualizar foto asociada a ese color o escaparate
                if (pf && (pf.isColorField || pf.isSizeField || pf.kind === 'grid-color' || pf.kind === 'grid-size')) {
                    const allPhotos = [
                        ...(Array.isArray(form.photos) ? form.photos : []),
                        ...(schema && Array.isArray(schema.images) ? schema.images : [])
                    ].filter((v, i, a) => v && a.indexOf(v) === i);

                    if (pf.isColorField || pf.kind === 'grid-color') {
                        const mappedPhotoUrl = (pf.colorPhotoUrlMap && pf.colorPhotoUrlMap[val])
                            || (schema.colorPhotoUrlMap && schema.colorPhotoUrlMap[val])
                            || null;
                        if (mappedPhotoUrl) {
                            const matchedIdx = allPhotos.indexOf(mappedPhotoUrl);
                            if (matchedIdx !== -1) {
                                activeMerchPhotoIdx = matchedIdx;
                            }
                        } else if (allPhotos.length === 0) {
                            activeMerchPhotoIdx = 0;
                        }
                    }
                    renderMerchLeftShowcase(form, schema);
                }
            });
        });

        // Ejecutar validación nada más abrir el modal
        syncGridAvailability();
        renderMerchLeftShowcase(form, schema);
    }

    async function openFormModal(mode = 'merch', formIdx = 0) {
        const isInsc = (mode === 'inscripcion');
        const formsList = isInsc ? INSCRIPCION_FORMS_DATA : MERCH_FORMS_DATA;
        if (!elMerchModal || !formsList || formsList.length === 0) {
            if (isInsc) {
                openAcruxSuperZoom('acrux-coordinacion');
            }
            return;
        }

        activeFormModalMode = isInsc ? 'inscripcion' : 'merch';
        const clampedIdx = clamp(formIdx, 0, formsList.length - 1);
        if (isInsc) activeInscripcionFormIdx = clampedIdx;
        else activeMerchFormIdx = clampedIdx;

        const form = formsList[clampedIdx];
        if (!form) return;

        pushStarRoute(isInsc ? `inscripciones-${clampedIdx}` : `merch-${clampedIdx}`);
        activeMerchPhotoIdx = 0;
        applyFormModalChrome(activeFormModalMode);

        // Coordenadas estelares de la estrella para el Super-Zoom de Hiperespacio
        const targetStarNode = isInsc
            ? (worldNodes.find(nd => nd.isInscripcionStar && nd.inscripcionIndex === clampedIdx) || worldNodes.find(nd => nd.id === 'mimosa'))
            : (worldNodes.find(nd => nd.isMerchStar && nd.merchIndex === clampedIdx) || worldNodes.find(nd => nd.id === 'intrometida'));
        const targetWx = targetStarNode ? targetStarNode.wx : (SECTORS[0].worldX + (isInsc ? -92 : 66));
        const targetWy = targetStarNode ? targetStarNode.wy : (SECTORS[0].worldY + (isInsc ? 8 : 42));

        const wasAlreadyOpen = elMerchModal.classList.contains('is-open');
        clearTimeout(diveTabTimer);
        isOverviewMode = false;
        document.body.classList.remove('is-overview-mode');

        targetSectorProgress = 0;
        activeSectorIdx = 0;

        superZoomState = {
            type: activeFormModalMode,
            index: clampedIdx,
            wx: targetWx,
            wy: targetWy,
            zoom: 24.0
        };

        document.body.classList.add('is-superzoom-open');
        const diveTime = wasAlreadyOpen ? 80 : 180;
        triggerStarDiveFlash(targetWx, targetWy, wasAlreadyOpen ? 160 : 260);

        // Resetear vista de éxito y errores
        if (elMerchOrderSuccess) elMerchOrderSuccess.style.display = 'none';
        if (elMerchNativeForm) elMerchNativeForm.style.display = 'flex';
        if (elMerchFormError) elMerchFormError.style.display = 'none';
        if (elMerchDynamicFields) elMerchDynamicFields.innerHTML = '';

        if (elMerchModalTitle) {
            elMerchModalTitle.textContent = form.title;
        }
        if (elMerchModalKicker) {
            const kickerBase = isInsc ? 'NUEVAS INCORPORACIONES · ACRUX 518' : 'MERCHANDISING DE GRUPO · ACRUX 518';
            elMerchModalKicker.textContent = form.date ? `${kickerBase} · ${form.date}` : kickerBase;
        }
        if (elMerchModalDesc) {
            elMerchModalDesc.textContent = form.desc || (isInsc
                ? 'Completa tus datos en el formulario oficial para solicitar plaza o acudir a un sábado de prueba con el Grupo Scout Acrux 518.'
                : 'Selecciona tus opciones y completa tus datos para registrar tu pedido directamente en el listado oficial del grupo.');
        }

        const elDirectFormBtn = document.getElementById('merchDirectFormBtn');
        if (elDirectFormBtn) {
            const formUrl = form.externalUrl || form.embedUrl || (form.id ? `https://docs.google.com/forms/d/${form.id}/viewform` : '');
            if (formUrl) {
                elDirectFormBtn.href = formUrl;
                elDirectFormBtn.style.display = 'inline-flex';
            } else {
                elDirectFormBtn.style.display = 'none';
            }
        }

        if (elMerchFormsSwitcher) {
            if (formsList.length > 1) {
                elMerchFormsSwitcher.style.display = 'flex';
                elMerchFormsSwitcher.innerHTML = formsList.map((f, i) => `
                    <button type="button" class="star-node-chip ${i === clampedIdx ? 'active' : ''}" data-merch-switch="${i}">
                        <span>✦ ${f.title}</span>
                    </button>
                `).join('');
                elMerchFormsSwitcher.querySelectorAll('[data-merch-switch]').forEach(btn => {
                    btn.addEventListener('click', () => {
                        openFormModal(activeFormModalMode, parseInt(btn.getAttribute('data-merch-switch'), 10));
                    });
                });
            } else {
                elMerchFormsSwitcher.style.display = 'none';
                elMerchFormsSwitcher.innerHTML = '';
            }
        }

        diveTabTimer = setTimeout(() => {
            elMerchModal.classList.add('is-open');
            elMerchModal.setAttribute('aria-hidden', 'false');
            const detailsCol = elMerchModal.querySelector('.merch-ecom-details-col');
            if (detailsCol) detailsCol.scrollTop = 0;
            const splitWrap = elMerchModal.querySelector('.merch-ecom-split');
            if (splitWrap) splitWrap.scrollTop = 0;
        }, diveTime);

        // Si ya se había pre-cargado al iniciar la página, mostrar al instante y refrescar siempre en vivo desde Google Forms
        if (form._parsedSchema) {
            renderMerchDynamicForm(form, form._parsedSchema);
            if (elMerchIframeLoader) elMerchIframeLoader.style.display = 'none';
        } else if (elMerchIframeLoader) {
            renderMerchLeftShowcase(form, { pillFields: [], textFields: [], images: [] });
            elMerchIframeLoader.style.display = 'flex';
        }

        const freshSchema = await preloadMerchFormSchema(form, !form._parsedSchema);
        if (elMerchIframeLoader) {
            elMerchIframeLoader.style.display = 'none';
        }
        if (freshSchema) {
            renderMerchDynamicForm(form, freshSchema);
        }
    }

    function openMerchModal(formIdx = 0) {
        return openFormModal('merch', formIdx);
    }

    function openInscripcionModal(formIdx = 0) {
        return openFormModal('inscripcion', formIdx);
    }

    function closeMerchModal() {
        if (!elMerchModal) return;
        clearStarRoute();
        clearTimeout(diveTabTimer);
        if (superZoomState && (superZoomState.type === 'merch' || superZoomState.type === 'inscripcion')) {
            hyperspaceJump = {
                start: performance.now(),
                duration: 420,
                wx: superZoomState.wx,
                wy: superZoomState.wy
            };
            superZoomState = null;
            document.body.classList.remove('is-superzoom-open');
        }
        elMerchModal.classList.remove('is-open');
        elMerchModal.setAttribute('aria-hidden', 'true');
        targetFreePanX = 0;
        targetFreePanY = 0;
    }

    // Envío silencioso al Google Form (sin abrir jamás la interfaz blanca de Google)
    elMerchNativeForm?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const isInsc = (activeFormModalMode === 'inscripcion');
        const formsList = isInsc ? INSCRIPCION_FORMS_DATA : MERCH_FORMS_DATA;
        const activeIdx = isInsc ? activeInscripcionFormIdx : activeMerchFormIdx;
        const form = formsList[activeIdx];
        const schema = form?._parsedSchema;
        if (!form || !schema) return;

        if (elMerchFormError) elMerchFormError.style.display = 'none';

        // 1. Validar campos de texto obligatorios
        for (const tf of schema.textFields) {
            const inputEl = document.getElementById(`input-${tf.id}`);
            const val = (inputEl?.value || '').trim();
            activeMerchOrderState[tf.id] = val;
            if (tf.required && !val) {
                if (elMerchFormError) {
                    elMerchFormError.textContent = `Por favor, completa el campo obligatorio: «${tf.title}».`;
                    elMerchFormError.style.display = 'block';
                }
                inputEl?.focus();
                return;
            }
        }

        // Validar selectores múltiples obligatorios
        for (const pf of schema.pillFields) {
            if (pf.isMulti && pf.required) {
                const chosenArr = activeMerchOrderState[pf.id];
                if (!Array.isArray(chosenArr) || chosenArr.length === 0) {
                    if (elMerchFormError) {
                        elMerchFormError.textContent = `Por favor, selecciona al menos una opción en: «${pf.title}».`;
                        elMerchFormError.style.display = 'block';
                    }
                    return;
                }
            }
        }

        // 2. Construir el diccionario exacto de pares entry.xxxxx -> valor (incluyendo arrays y fechas) para Google Forms
        const submissionPairs = [];
        let invalidCombinationError = '';

        schema.pillFields.forEach(pf => {
            if (pf.kind === 'grid-size') {
                const chosenSize = activeMerchOrderState[pf.id];
                const colorField = schema.pillFields.find(f => f.kind === 'grid-color' && f.gridSizeFieldId === pf.id);
                const chosenColor = colorField ? activeMerchOrderState[colorField.id] : '';
                if (pf.gridCellMap && chosenSize && chosenColor) {
                    const cellEntryId = pf.gridCellMap[`${chosenSize}|||${chosenColor}`];
                    if (cellEntryId) {
                        submissionPairs.push([cellEntryId, chosenColor]);
                    } else {
                        invalidCombinationError = `La talla «${chosenSize}» no está disponible en el color «${chosenColor}». Por favor, elige otra combinación.`;
                    }
                } else if (Array.isArray(pf.rows)) {
                    const matchedRow = pf.rows.find(r => r.rowLabel === chosenSize);
                    if (matchedRow && chosenColor) {
                        submissionPairs.push([matchedRow.entryId, chosenColor]);
                    }
                }
            } else if (pf.kind === 'grid-color') {
                // Ya fue procesado junto con su celda en grid-size
            } else if (pf.entryId) {
                const v = activeMerchOrderState[pf.id];
                if (Array.isArray(v)) {
                    v.forEach(itemVal => {
                        if (itemVal) submissionPairs.push([pf.entryId, itemVal]);
                    });
                } else if (v !== undefined && v !== '') {
                    submissionPairs.push([pf.entryId, v]);
                }
            }
        });

        if (invalidCombinationError) {
            if (elMerchFormError) {
                elMerchFormError.textContent = invalidCombinationError;
                elMerchFormError.style.display = 'block';
            }
            return;
        }

        // Sincronizar campos de color auxiliares si el Google Form los tiene como obligatorios
        if (Array.isArray(schema.autoSyncColorEntries) && schema.autoSyncColorEntries.length > 0) {
            const colorField = schema.pillFields.find(f => f.isColorField || f.kind === 'grid-color');
            const chosenColor = colorField ? (activeMerchOrderState[colorField.id] || 'Black') : 'Black';
            schema.autoSyncColorEntries.forEach(entryKey => {
                submissionPairs.push([entryKey, chosenColor]);
            });
        }

        schema.textFields.forEach(tf => {
            const val = activeMerchOrderState[tf.id] || '';
            if (val !== '') {
                if (tf.kind === 'date' && /^\d{4}-\d{2}-\d{2}$/.test(val)) {
                    const [yr, mo, dy] = val.split('-');
                    submissionPairs.push([`${tf.entryId}_year`, yr]);
                    submissionPairs.push([`${tf.entryId}_month`, String(parseInt(mo, 10))]);
                    submissionPairs.push([`${tf.entryId}_day`, String(parseInt(dy, 10))]);
                } else {
                    submissionPairs.push([tf.entryId, val]);
                }
            }
        });

        // 3. Estado de carga en el botón principal
        const submitLabelEl = elBtnSubmitMerchOrder?.querySelector('.merch-submit-label');
        if (elBtnSubmitMerchOrder) elBtnSubmitMerchOrder.disabled = true;
        if (submitLabelEl) submitLabelEl.textContent = isInsc ? 'Enviando Inscripción...' : 'Registrando Pedido...';

        // 4. Envío silencioso mediante fetch (no-cors) + formulario oculto de respaldo hacia formResponse
        const urlParams = new URLSearchParams();
        submissionPairs.forEach(([k, v]) => {
            urlParams.append(k, v);
        });
        urlParams.append('submit', 'Submit');

        try {
            await fetch(schema.actionUrl, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: urlParams.toString()
            });
        } catch (_) {
            // Respaldo mediante el formulario oculto apuntando al iframe silencioso
            if (elMerchHiddenGoogleForm) {
                elMerchHiddenGoogleForm.action = schema.actionUrl;
                elMerchHiddenGoogleForm.innerHTML = '';
                submissionPairs.forEach(([k, v]) => {
                    const inp = document.createElement('input');
                    inp.type = 'hidden';
                    inp.name = k;
                    inp.value = v;
                    elMerchHiddenGoogleForm.appendChild(inp);
                });
                try {
                    elMerchHiddenGoogleForm.submit();
                } catch (_) {}
            }
        }

        if (elBtnSubmitMerchOrder) elBtnSubmitMerchOrder.disabled = false;
        if (submitLabelEl) submitLabelEl.textContent = isInsc ? 'Enviar Inscripción' : 'Realizar Pedido';

        // 5. Mostrar confirmación estilo editorial
        const summaryParts = [];
        schema.pillFields.forEach(pf => {
            const val = activeMerchOrderState[pf.id];
            const dispVal = Array.isArray(val) ? val.join(', ') : val;
            if (dispVal) summaryParts.push(`${pf.title.replace('Selecciona ', '')}: ${dispVal}`);
        });
        const firstTextVal = schema.textFields.length > 0 ? activeMerchOrderState[schema.textFields[0].id] : '';

        if (elMerchSuccessSummary) {
            if (isInsc) {
                elMerchSuccessSummary.textContent = `Hemos registrado la solicitud en «${form.title}»${summaryParts.length ? ` (${summaryParts.join(' · ')})` : ''}${firstTextVal ? ` para ${firstTextVal}` : ''} directamente en el formulario oficial de inscripciones del Grupo Scout Acrux 518.`;
            } else {
                elMerchSuccessSummary.textContent = `Hemos registrado tu pedido de «${form.title}» (${summaryParts.join(' · ')})${firstTextVal ? ` a nombre de ${firstTextVal}` : ''} directamente en el Google Sheet oficial del Grupo Scout Acrux 518.`;
            }
        }
        if (elMerchNativeForm) elMerchNativeForm.style.display = 'none';
        if (elMerchOrderSuccess) elMerchOrderSuccess.style.display = 'flex';
    });

    elBtnMerchAnotherOrder?.addEventListener('click', () => {
        const isInsc = (activeFormModalMode === 'inscripcion');
        const formsList = isInsc ? INSCRIPCION_FORMS_DATA : MERCH_FORMS_DATA;
        const form = formsList[isInsc ? activeInscripcionFormIdx : activeMerchFormIdx];
        if (elMerchOrderSuccess) elMerchOrderSuccess.style.display = 'none';
        if (elMerchNativeForm) {
            elMerchNativeForm.reset();
            elMerchNativeForm.style.display = 'flex';
        }
        if (form && form._parsedSchema) {
            renderMerchDynamicForm(form, form._parsedSchema);
        }
    });

    elBtnMerchFinishOrder?.addEventListener('click', closeMerchModal);
    elBtnCloseMerchModal?.addEventListener('click', closeMerchModal);

    window.openMerchModal = openMerchModal;
    window.openInscripcionModal = openInscripcionModal;
    window.closeMerchModal = closeMerchModal;
    window.preloadMerchFormSchema = preloadMerchFormSchema;

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
            }
        });
    }

    // =========================================================================
    // 10. EVENTOS DEL MAPA ESTELAR (SCROLL, DRAG, CLIC EN ESTRELLA)
    // =========================================================================
    const elNavHintPill = document.getElementById('cosmosNavHintPill');

    const elMerchDetailsScrollCol = document.querySelector('.merch-ecom-details-col');

    window.addEventListener('wheel', (e) => {
        // Si la tienda de Merch está abierta, permitir scroll nativo con touchpad/rueda en toda la pantalla
        if (elMerchModal?.classList.contains('is-open')) {
            if (elMerchDetailsScrollCol && window.innerWidth > 960 && !elMerchDetailsScrollCol.contains(e.target)) {
                elMerchDetailsScrollCol.scrollTop += e.deltaY;
            }
            return;
        }
        // Si cualquier otro modal o vista Super-Zoom está abierta, permitir su scroll nativo sin bloquearlo
        if (
            superZoomState ||
            drawerBackdrop?.classList.contains('is-open') ||
            elUnitZoomOverlay?.classList.contains('is-open') ||
            elCampZoomOverlay?.classList.contains('is-open') ||
            elLostZoomOverlay?.classList.contains('is-open') ||
            elAnniversaryModal?.classList.contains('is-open') ||
            elCromoZoomModal?.classList.contains('is-open')
        ) {
            return;
        }

        elNavHintPill?.classList.add('is-dimmed');
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

        if (elNavHintPill && !superZoomState) {
            elNavHintPill.classList.toggle('is-near-bottom', e.clientY > vh - 125);
        }

        if (pointer.isDown && !superZoomState) {
            pointer.dragMoved += Math.hypot(dx, dy);
            if (pointer.dragMoved > 8) {
                elNavHintPill?.classList.add('is-dimmed');
            }
            const invZ = 1 / Math.max(0.25, camera.zoom);
            targetFreePanX = clamp(targetFreePanX - dx * invZ, -2200, 2200);
            targetFreePanY = clamp(targetFreePanY - dy * invZ, -1600, 1600);
        }
    });

    canvas.addEventListener('pointerdown', (e) => {
        pointer.x = e.clientX;
        pointer.y = e.clientY;
        pointer.lerpX = e.clientX;
        pointer.lerpY = e.clientY;
        pointer.isDown = true;
        pointer.dragMoved = 0;
    });

    window.addEventListener('pointerup', (e) => {
        if (!pointer.isDown) return;
        pointer.isDown = false;

        const tapThreshold = e.pointerType === 'touch' ? 18 : 10;
        if (pointer.dragMoved < tapThreshold) {
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

            const isTouchTap = (e.pointerType === 'touch');
            const maxHitRadius = isTouchTap ? 86 : 62;
            let hitNode = null;
            let bestD = maxHitRadius;
            for (let i = 0; i < worldNodes.length; i++) {
                const n = worldNodes[i];
                if (n.sectorIndex === 0 && !n.isClickable && !n.isMerchStar && !n.isInscripcionStar) continue;
                const d = Math.hypot(e.clientX - n.sx, e.clientY - n.sy);
                if (d < bestD) {
                    bestD = d;
                    hitNode = n;
                }
            }
            if (!hitNode && pointer.hoveredNode) {
                const hn = pointer.hoveredNode;
                const dH = Math.hypot(e.clientX - hn.sx, e.clientY - hn.sy);
                if (dH < maxHitRadius) {
                    hitNode = hn;
                }
            }
            if (hitNode) {
                if (hitNode.isSecretStar) {
                    openSecretAlbumModal('pack');
                } else if (hitNode.isMerchStar) {
                    openMerchModal(typeof hitNode.merchIndex === 'number' ? hitNode.merchIndex : 0);
                } else if (hitNode.isInscripcionStar || hitNode.id === 'mimosa') {
                    openInscripcionModal(typeof hitNode.inscripcionIndex === 'number' ? hitNode.inscripcionIndex : 0);
                } else if (hitNode.clusterType === 'unit') {
                    openUnitSuperZoom(hitNode.unitIndex);
                } else if (hitNode.clusterType === 'camp') {
                    openCampSuperZoom(hitNode.campIndex);
                } else if (hitNode.clusterType === 'sector') {
                    if (hitNode.sectorIndex === 3) {
                        openLostSuperZoom(typeof hitNode.cajonIndex === 'number' ? hitNode.cajonIndex : 0);
                    } else if (hitNode.sectorIndex === 0) {
                        if (hitNode.id === 'acrux') {
                            openAcruxSuperZoom();
                        }
                    } else {
                        goToSector(hitNode.sectorIndex, hitNode.starIdx);
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
            if (elMerchModal?.classList.contains('is-open')) {
                closeMerchModal();
                return;
            }
            if (elCromoZoomModal?.classList.contains('is-open')) {
                closeCromoZoomModal();
                return;
            }
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
        const isMobile = vw <= 768;
        const cx = (vw > 900 && !isOverviewMode && !superZoomState) ? vw * 0.63 : vw * 0.5;
        const cy = (isMobile && !isOverviewMode && !superZoomState) ? vh * 0.43 : vh * 0.5;
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
                '01 / 04 · Acrux 518',
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
            camera.targetZoom = vw <= 768
                ? Math.min(vw / 4200, vh / 3600)
                : Math.min(vw / 5400, vh / 3500);
        } else {
            const iFloor = clamp(Math.floor(currentSectorProgress), 0, SECTORS.length - 1);
            const iCeil = clamp(Math.ceil(currentSectorProgress), 0, SECTORS.length - 1);
            const tSeg = smoothstep(0, 1, currentSectorProgress - iFloor);

            const sA = SECTORS[iFloor];
            const sB = SECTORS[iCeil];

            const ix = lerp(sA.worldX, sB.worldX, tSeg);
            const iy = lerp(sA.worldY, sB.worldY, tSeg);
            const iz = lerp(sA.baseZoom, sB.baseZoom, tSeg);

            const isMobile = vw <= 768;
            const parX = isMobile ? 0 : ((pointer.lerpX / vw) - 0.5) * 42;
            const parY = isMobile ? 0 : ((pointer.lerpY / vh) - 0.5) * 30;

            camera.targetX = ix + freePanX + parX;
            camera.targetY = iy + freePanY + parY;

            const travelWarp = Math.min(1, Math.abs(scrollDiff) * 0.8);
            if (isMobile) {
                const mobileScaleBySector = [
                    Math.min(0.92, (vw - 28) / 420),
                    Math.min(0.62, (vw - 24) / 1380),
                    Math.min(0.62, (vw - 24) / 1480),
                    Math.min(0.84, (vw - 28) / 700)
                ];
                const mScale = lerp(
                    mobileScaleBySector[iFloor] ?? 0.65,
                    mobileScaleBySector[iCeil] ?? 0.65,
                    tSeg
                );
                camera.targetZoom = Math.max(0.22, (iz * mScale) - travelWarp * 0.12);
            } else {
                camera.targetZoom = Math.max(0.55, iz - travelWarp * 0.24);
            }
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

        const isDayMode = document.body.classList.contains('day-mode');

        // En Modo 50 Aniversario: Negro Obsidiana (#030304); en Modo Luminoso: Cielo Azul Estelar (#1D3C6A -> #0D1E3A); en Modo Noche: #040406
        if (anniversaryLerp > 0.4) {
            ctx.fillStyle = '#030304';
        } else if (isDayMode) {
            const skyGrad = ctx.createRadialGradient(vw * 0.62, vh * 0.42, 0, vw * 0.5, vh * 0.5, Math.max(vw, vh) * 0.85);
            skyGrad.addColorStop(0, '#22477A');
            skyGrad.addColorStop(0.5, '#152F56');
            skyGrad.addColorStop(1, '#0C1D38');
            ctx.fillStyle = skyGrad;
        } else {
            ctx.fillStyle = '#040406';
        }
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
            // Sector I (Acrux 518): carmesí imperial y azul profundo
            {
                outer: 'rgba(30, 64, 175, 0.04)',
                mid: 'rgba(176, 35, 36, 0.065)',
                inner: 'rgba(176, 35, 36, 0.05)',
                offsetX: -55,
                offsetY: 45
            },
            // Sector II (Unidades): turquesa / esmeralda estelar
            {
                outer: 'rgba(16, 185, 129, 0.04)',
                mid: 'rgba(56, 189, 248, 0.055)',
                inner: 'rgba(56, 189, 248, 0.045)',
                offsetX: 60,
                offsetY: -35
            },
            // Sector III (Campamentos): ámbar / dorado cálido
            {
                outer: 'rgba(217, 119, 6, 0.04)',
                mid: 'rgba(245, 158, 11, 0.05)',
                inner: 'rgba(245, 158, 11, 0.042)',
                offsetX: -45,
                offsetY: -40
            },
            // Sector IV (El Baúl): índigo / zafiro
            {
                outer: 'rgba(59, 130, 246, 0.04)',
                mid: 'rgba(99, 102, 241, 0.055)',
                inner: 'rgba(99, 102, 241, 0.045)',
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
                ctx.strokeStyle = isDayMode ? 'rgba(186, 230, 253, 0.10)' : 'rgba(255, 255, 255, 0.04)';
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
        ctx.strokeStyle = isDayMode ? 'rgba(186, 230, 253, 0.12)' : 'rgba(255, 255, 255, 0.05)';
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
            const starTint = (isDayMode && anniversaryLerp <= 0.35) ? 'rgba(240, 249, 255, 0.92)' : fs.tint;
            ctx.fillStyle = starTint;
            ctx.globalAlpha = Math.min(1, fs.alpha * tw * (isDayMode ? 1.25 : 1));

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
                nd.hover = nd.isSecretStar ? 0 : (nd.hover + (f - nd.hover) * 0.18);

                if (dM < 52 && dM < closestDist) {
                    // En el Sector I (Acrux 518), son interactivas las estrellas marcadas como isClickable (α Acrux, β Inscripciones) y las de Intendencia (isMerchStar)
                    if (nd.sectorIndex === 0 && !nd.isClickable && !nd.isMerchStar) {
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
        const showHoverCue = Boolean(closestNode && !closestNode.isSecretStar);
        if (cursorRing) cursorRing.classList.toggle('is-star-hover', showHoverCue);
        if (cursorLabel) {
            if (showHoverCue) {
                cursorLabel.textContent = (closestNode.isMerchStar || closestNode.isClickable || closestNode.clusterType === 'unit' || closestNode.clusterType === 'camp' || closestNode.sectorIndex === 3 || closestNode.id === 'acrux')
                    ? `Abrir ${closestNode.symbol}`
                    : `${closestNode.symbol}`;
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
            } else if (ed.clusterType === 'merch') {
                rgbBase = '203, 213, 225';
                edgeShadow = 'rgba(212, 190, 152, 0.30)';
            } else if (ed.sectorIndex === 0) {
                edgeShadow = 'rgba(217, 56, 58, 0.45)';
            }

            if (isDayMode && anniversaryLerp <= 0.2) {
                rgbBase = '224, 242, 254';
                edgeShadow = 'rgba(186, 230, 253, 0.55)';
            }

            const dAlphaEnd = (isDayMode && anniversaryLerp <= 0.2) ? Math.min(0.95, alphaEnd * 1.15) : alphaEnd;
            const dAlphaMid = (isDayMode && anniversaryLerp <= 0.2) ? Math.min(0.8, alphaMid * 1.15) : alphaMid;

            const lineGrad = ctx.createLinearGradient(ax, ay, bx, by);
            lineGrad.addColorStop(0, `rgba(${rgbBase}, ${dAlphaEnd.toFixed(3)})`);
            lineGrad.addColorStop(0.5, `rgba(${rgbBase}, ${dAlphaMid.toFixed(3)})`);
            lineGrad.addColorStop(1, `rgba(${rgbBase}, ${dAlphaEnd.toFixed(3)})`);

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
        // E2. TÍTULOS EN EL CIELO PARA LOS DOS GRUPOS DE CAMPAMENTOS DEL SECTOR III
        // ---------------------------------------------------------------------
        if (activeSectorIdx === 2 && !superZoomState && hasBothCampsConstellations) {
            ctx.save();
            ctx.font = '600 11px "Plus Jakarta Sans", sans-serif';
            ctx.textAlign = 'center';

            // Título de Campamentos de Verano (arriba)
            const scSummerTitle = worldToScreen(CAMPS_ORIGIN_X, CAMPS_ORIGIN_Y - 200);
            ctx.fillStyle = isDayMode ? 'rgba(254, 243, 199, 0.90)' : 'rgba(255, 235, 180, 0.52)';
            ctx.shadowColor = isDayMode ? 'transparent' : 'rgba(0, 0, 0, 0.9)';
            ctx.shadowBlur = isDayMode ? 0 : 6;
            ctx.fillText('CAMPAMENTOS DE VERANO', scSummerTitle.x, scSummerTitle.y);

            // Título de Campamentos de Semana Santa (abajo)
            const scEasterTitle = worldToScreen(CAMPS_ORIGIN_X, CAMPS_ORIGIN_Y + 215);
            ctx.fillStyle = isDayMode ? 'rgba(209, 250, 229, 0.90)' : 'rgba(167, 243, 208, 0.52)';
            ctx.shadowColor = isDayMode ? 'transparent' : 'rgba(0, 0, 0, 0.9)';
            ctx.shadowBlur = isDayMode ? 0 : 6;
            ctx.fillText('CAMPAMENTOS DE SEMANA SANTA', scEasterTitle.x, scEasterTitle.y);

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

            // Campamentos (2), Cajones (sector 3 pero no El Baúl) y estrellas blancas de Acrux (distintas de α Acrux) van en blanco puro sin color
            const isPureWhiteStar = (nd.sectorIndex === 2 && !nd.isRedStar) || (nd.sectorIndex === 3 && !nd.isBaulMain) || (nd.sectorIndex === 0 && nd.id !== 'acrux');

            const scale = superZoomState
                ? clamp(camera.zoom * 0.72, 1.0, 22.0)
                : clamp(camera.zoom, 0.55, 2.2);
            const r = (nd.r || 5) * scale + nd.hover * 3.2;

            // Halo radial (sobrio y sutil para Merch, sin pulsos excesivos)
            const merchPulse = nd.isMerchStar ? (1.0 + Math.sin(elapsed * 1.8 + i) * 0.06) : 1.0;
            const glowR = r * (nd.isMainCross || nd.isClusterHub || isHovered ? 4.8 : 3.2) * merchPulse;
            const g = ctx.createRadialGradient(sx, sy, 0, sx, sy, glowR);
            g.addColorStop(0, anniversaryLerp > 0.3 ? '#FFF3B0' : (nd.isMerchStar ? '#F8FAFC' : (nd.isRedStar ? '#FFA39E' : '#FFFFFF')));
            g.addColorStop(
                0.35,
                anniversaryLerp > 0.35
                    ? (isHovered || isSelectedInSector ? 'rgba(212, 175, 55, 0.42)' : 'rgba(212, 175, 55, 0.22)')
                    : (nd.isMerchStar
                        ? (isHovered ? 'rgba(212, 190, 152, 0.34)' : 'rgba(203, 213, 225, 0.18)')
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
                                            : (nd.halo || 'rgba(255, 255, 255, 0.18)')))))))
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

            // Anillo orbital: en Unidades usa el color sutil de cada rama; en «El Baúl» usa rojo Acrux sutil; la estrella secreta nunca muestra anillo
            if (!nd.isSecretStar && (nd.isClusterHub || nd.isMerchStar || nd.isClickable || isHovered) && !superZoomState) {
                const ringR = r * 1.95 + Math.sin(elapsed * 2.1 + i) * 0.85;
                let ringStroke;
                if (anniversaryLerp > 0.35) {
                    ringStroke = (isHovered || isSelectedInSector) ? 'rgba(243, 229, 171, 0.85)' : 'rgba(212, 175, 55, 0.45)';
                } else if (nd.isMerchStar) {
                    ringStroke = isHovered ? 'rgba(212, 190, 152, 0.65)' : 'rgba(203, 213, 225, 0.24)';
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
                ctx.lineWidth = isHovered ? 1.2 : 0.85;
                ctx.beginPath();
                ctx.arc(sx, sy, ringR, 0, Math.PI * 2);
                ctx.stroke();
            }

            // Núcleo
            ctx.fillStyle = nd.isMerchStar ? (isHovered ? '#F3E5AB' : '#E2E8F0') : (nd.isRedStar ? '#EF4444' : '#FFFFFF');
            ctx.beginPath();
            ctx.arc(sx, sy, r * 0.5, 0, Math.PI * 2);
            ctx.fill();

            // Etiqueta astronómica (la estrella secreta nunca muestra etiqueta)
            if (!nd.isSecretStar && !superZoomState && nd.symbol && (nd.sectorIndex === activeSectorIdx || isHovered || isOverviewMode)) {
                if (isOverviewMode && !nd.isClusterHub && !nd.isMainCross) continue;
                ctx.save();
                ctx.font = (nd.isBaulMain || nd.isClusterHub || nd.isMainCross || isHovered)
                    ? '600 12px "Plus Jakarta Sans", sans-serif'
                    : '500 10.5px "Plus Jakarta Sans", sans-serif';

                // Sombra suave que garantiza legibilidad cinematográfica en modo noche; limpia en modo luminoso
                ctx.shadowColor = (isDayMode && anniversaryLerp <= 0.35) ? 'transparent' : 'rgba(0, 0, 0, 0.90)';
                ctx.shadowBlur = (isDayMode && anniversaryLerp <= 0.35) ? 0 : 5;

                if (nd.isMerchStar) {
                    ctx.fillStyle = isHovered ? '#E2D5B5' : 'rgba(226, 232, 240, 0.88)';
                } else if (nd.isRedStar) {
                    ctx.fillStyle = (isHovered || isSelectedInSector) ? '#FFA39E' : '#FF6B6B';
                } else {
                    ctx.fillStyle = (isHovered || isSelectedInSector)
                        ? (anniversaryLerp > 0.35 ? '#FFF3B0' : '#FFFFFF')
                        : (anniversaryLerp > 0.35 ? 'rgba(243, 229, 171, 0.75)' : (isDayMode ? 'rgba(255, 255, 255, 0.92)' : 'rgba(255, 255, 255, 0.74)'));
                }

                if (nd.clusterType === 'camp' && nd.labelLine1) {
                    ctx.textAlign = 'center';
                    const isTop = (nd.labelPos === 'top');
                    const y1 = isTop ? (sy - r * 1.35 - 20) : (sy + r * 1.35 + 13);
                    const y2 = y1 + 11.5;

                    ctx.fillText(nd.labelLine1, sx, y1);
                    if (nd.labelLine2) {
                        ctx.font = '500 9.5px "Plus Jakarta Sans", sans-serif';
                        ctx.fillStyle = nd.isRedStar
                            ? 'rgba(255, 163, 158, 0.95)'
                            : ((isHovered || isSelectedInSector) ? '#FFFFFF' : (isDayMode ? 'rgba(224, 242, 254, 0.86)' : 'rgba(255, 255, 255, 0.68)'));
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
                    ctx.font = '600 9.5px "Plus Jakarta Sans", sans-serif';
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

                    ctx.font = '400 8.5px "Plus Jakarta Sans", sans-serif';
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
                ? '¡ATRÁPALO! (REVERTIR)'
                : '¡ATRÁPALO! (50º ANIVERSARIO)';
        } else if (hoveredAnniversaryStar) {
            if (cursorRing) cursorRing.classList.add('is-star-hover');
            if (cursorLabel) {
                cursorLabel.textContent = hoveredAnniversaryStar.isUnlocked
                    ? `${hoveredAnniversaryStar.year} · ${hoveredAnniversaryStar.title}`
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

            // Kraaletes / Cromos (soporta array directo o subpropiedad .kraaletes + Nombre Real | Biografía desde Descripción de Drive)
            const kraalList = Array.isArray(uData) ? uData : uData.kraaletes;
            if (Array.isArray(kraalList) && kraalList.length > 0) {
                unit.kraaletes = kraalList.map((k, i) => {
                    const rawDesc = stripHtmlTags(k.desc || k.description || '');
                    const descParts = rawDesc ? rawDesc.split('|').map(s => stripHtmlTags(s)) : [];
                    const parsedRealName = stripHtmlTags(k.realName || (descParts.length > 1 ? descParts[0] : '') || '');
                    const parsedBio = stripHtmlTags(k.bio || (descParts.length > 1 ? descParts.slice(1).join(' | ') : (descParts[0] || '')) || '');

                    return {
                        star: k.star || `${i + 1} · ${unit.shortName}`,
                        name: stripHtmlTags(k.name || 'Scouter'),
                        role: stripHtmlTags(k.role || 'Kraalete'),
                        realName: parsedRealName,
                        bio: parsedBio || `Scouter del Kraalete de ${unit.fullName} en el Grupo Scout Acrux 518. Acompaña cada sábado y acampada educando en valores, escultismo y contacto con la naturaleza.`,
                        cromoUrl: k.cromoUrl || k.fotoUrl || k.photoUrl || null
                    };
                });
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
    }

    function syncCajonesFromDrive(cajonesData) {
        if (typeof rebuildLostConstellation === 'function') {
            rebuildLostConstellation(cajonesData);
        }
    }

    function syncMerchFromDrive(merchData) {
        if (typeof rebuildMerchConstellation === 'function') {
            rebuildMerchConstellation(merchData);
        }
    }

    function syncInscripcionFromDrive(inscData) {
        if (typeof rebuildInscripcionConstellation === 'function') {
            rebuildInscripcionConstellation(inscData);
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
                if (item.title) star.title = stripHtmlTags(item.title);
                if (item.desc) star.desc = stripHtmlTags(item.desc);
                if (item.photoUrl) star.photoUrl = item.photoUrl;
                if (item.driveUrl) star.driveUrl = item.driveUrl;
                star.r = 5.6;
            }
        });
    }

    // --- Boot Loader (#cosmosBootLoader) + caché instantánea en localStorage ---
    const LOCAL_STORAGE_CACHE_KEY = 'acrux_drive_cache_v24';
    const elBootLoader = document.getElementById('cosmosBootLoader');
    const elBootProgressFill = document.getElementById('bootProgressFill');
    const elBootStatusText = document.getElementById('bootStatusText');
    let bootLoaderHidden = false;

    function setBootProgress(percent, msg) {
        if (bootLoaderHidden) return;
        if (elBootProgressFill) elBootProgressFill.style.width = `${clamp(percent, 15, 100)}%`;
        if (elBootStatusText && msg) elBootStatusText.textContent = msg;
    }

    function hideBootLoader(delayMs = 0) {
        if (bootLoaderHidden) return;
        bootLoaderHidden = true;
        if (elBootProgressFill) elBootProgressFill.style.width = '100%';
        setTimeout(() => {
            if (elBootLoader) {
                elBootLoader.classList.add('is-hidden');
                elBootLoader.setAttribute('aria-hidden', 'true');
            }
        }, delayMs);
    }

    // Limpia en origen todos los textos que vienen de Drive (descripciones con <div>, <br />, &nbsp;...).
    // Se saltan URLs, ids, fotos y el esquema de formularios (fbLoadData) para no corromperlos.
    const SANITIZE_SKIP_KEYS = /url|src|photo|^id$|fbloaddata|rawhtml|embed/i;
    function sanitizeDriveValue(val, key) {
        if (typeof val === 'string') {
            if (key && SANITIZE_SKIP_KEYS.test(key)) return val;
            return /[<>]|&[a-z#0-9]+;/i.test(val) ? stripHtmlTags(val) : val;
        }
        if (Array.isArray(val)) return val.map(v => sanitizeDriveValue(v, key));
        if (val && typeof val === 'object') {
            if (key && /fbloaddata/i.test(key)) return val;
            const out = {};
            Object.keys(val).forEach(k => { out[k] = sanitizeDriveValue(val[k], k); });
            return out;
        }
        return val;
    }

    // Aplica un payload del Apps Script (de caché o de red) a todas las secciones. Cada bloque va aislado
    // para que un fallo en uno (p. ej. Merch) no impida pintar el resto.
    function applyDrivePayload(data) {
        if (!data || typeof data !== 'object') return;
        data = sanitizeDriveValue(data, '');
        const safe = (label, fn) => {
            try { fn(); } catch (err) { console.warn(`Google Drive Sync: fallo aplicando «${label}».`, err); }
        };
        if (data.error) console.error('Google Drive Sync: Error reportado por Google Apps Script:', data.error);
        if (data.campamentos !== undefined) safe('campamentos', () => rebuildCampsConstellation(data.campamentos));
        if (data.unidades) safe('unidades', () => syncUnitsFromDrive(data.unidades));
        if (data.coordinacion && data.coordinacion.length > 0) safe('coordinación', () => syncCoordinacionFromDrive(data.coordinacion));
        if (data.cajones !== undefined) safe('cajones', () => rebuildLostConstellation(data.cajones));
        if (data.merchForms !== undefined || data.intendencia !== undefined) {
            safe('merch', () => syncMerchFromDrive(data.merchForms !== undefined ? data.merchForms : data.intendencia));
        }
        if (data.inscripcionForms !== undefined) {
            safe('inscripciones', () => syncInscripcionFromDrive(data.inscripcionForms));
        }
        if (data.aniversario) safe('aniversario', () => syncAnniversaryFromDrive(data.aniversario));
        if (data.secretPack && data.secretPack.weekKey && data.secretPack.codeHash) {
            driveSecretPack = data.secretPack;
        }
    }

    async function fetchDriveData() {
        // Tope de seguridad: pase lo que pase, el loader desaparece a los 1800 ms
        setBootProgress(15, 'Trazando carta estelar · Valladolid');
        const bootStart = performance.now();
        const progressTimer = setInterval(() => {
            if (bootLoaderHidden) { clearInterval(progressTimer); return; }
            const t = clamp((performance.now() - bootStart) / 1800, 0, 1);
            setBootProgress(15 + 85 * t);
        }, 60);
        setTimeout(() => { clearInterval(progressTimer); hideBootLoader(0); }, 1800);

        let hadCache = false;
        try {
            const cachedRaw = localStorage.getItem(LOCAL_STORAGE_CACHE_KEY);
            if (cachedRaw) {
                const cachedData = JSON.parse(cachedRaw);
                applyDrivePayload(cachedData);
                hadCache = true;
                setBootProgress(70, 'Cargando desde caché local');
                setTimeout(() => hideBootLoader(0), 350);
            }
        } catch (err) {
            console.warn('Google Drive Sync: caché local inválida, se descarta.', err);
            try { localStorage.removeItem(LOCAL_STORAGE_CACHE_KEY); } catch (_) {}
        }

        try {
            const res = await fetch(DRIVE_API_URL);
            if (!res.ok) throw new Error(`HTTP error ${res.status}`);
            const text = await res.text();
            if (text.trim().startsWith('<')) {
                console.warn('Google Drive Sync: El endpoint devolvió HTML (pantalla de login de Google). En Google Apps Script ve a Implementar > Gestionar implementaciones > Editar > Quién tiene acceso: "Cualquier persona" (Anyone).');
                return;
            }
            const data = JSON.parse(text);
            if (data && !data.error) {
                try { localStorage.setItem(LOCAL_STORAGE_CACHE_KEY, JSON.stringify(data)); } catch (_) {}
            }
            applyDrivePayload(data);
            if (!hadCache) hideBootLoader(150);
        } catch (err) {
            console.warn('Google Drive Sync: operando en modo offline / fallback.', err);
        } finally {
            clearInterval(progressTimer);
            if (!hadCache) hideBootLoader(150);
        }
    }

    window.fetchDriveData = fetchDriveData;
    window.syncUnitsFromDrive = syncUnitsFromDrive;
    window.syncCoordinacionFromDrive = syncCoordinacionFromDrive;
    window.syncCajonesFromDrive = syncCajonesFromDrive;
    window.syncMerchFromDrive = syncMerchFromDrive;
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
        if (urlParams.has('demoMerch')) {
            rebuildMerchConstellation([
                {
                    id: 'demo-form-sudaderas-2026',
                    title: 'Pedido de Sudaderas Acrux 2026',
                    embedUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSfDemoAcrux518Merch/viewform?embedded=true',
                    date: '2026-11-07'
                }
            ]);
        }
        if (urlParams.has('sector')) {
            goToSector(parseInt(urlParams.get('sector'), 10), 0, true);
        }
        if (urlParams.has('unit')) {
            setTimeout(() => {
                openUnitSuperZoom(parseInt(urlParams.get('unit'), 10));
            }, 50);
        }
    } catch (_) {}

    // Iniciar sincronización en tiempo real con Google Drive
    fetchDriveData();

    requestAnimationFrame(animate);
})();

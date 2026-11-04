const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

const assetsDir = path.join(__dirname, '..', 'assets');
const publicAssetsDir = path.join(__dirname, '..', 'public', 'assets');
const rootDir = path.join(__dirname, '..');

// Load base64 encoded images
const idPngBuffer = fs.readFileSync(path.join(assetsDir, 'id.png'));
const idPngBase64 = `data:image/png;base64,${idPngBuffer.toString('base64')}`;

const pointingPngBuffer = fs.readFileSync(path.join(assetsDir, 'right_pointing.png'));
const pointingPngBase64 = `data:image/png;base64,${pointingPngBuffer.toString('base64')}`;

// Common SVG styles and defs
const commonDefs = `
  <defs>
    <!-- Dot Matrix Pattern -->
    <pattern id="dot-matrix" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1.2" fill="#1b2742" opacity="0.6"/>
    </pattern>

    <!-- Hairline Gradients -->
    <linearGradient id="cyber-border" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#247bff" stop-opacity="0.8"/>
      <stop offset="50%" stop-color="#38bdf8" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#ff354f" stop-opacity="0.8"/>
    </linearGradient>

    <linearGradient id="blue-glow-grad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#247bff"/>
      <stop offset="100%" stop-color="#38bdf8"/>
    </linearGradient>

    <linearGradient id="crimson-glow-grad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ff354f"/>
      <stop offset="100%" stop-color="#ff6b81"/>
    </linearGradient>

    <radialGradient id="halo-radial" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#247bff" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#070b16" stop-opacity="0"/>
    </radialGradient>

    <!-- Foil Light Sweep Filter -->
    <linearGradient id="foil-sweep" x1="-100%" y1="0%" x2="200%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0"/>
      <stop offset="45%" stop-color="#ffffff" stop-opacity="0"/>
      <stop offset="50%" stop-color="#ffffff" stop-opacity="0.45"/>
      <stop offset="55%" stop-color="#ffffff" stop-opacity="0.1"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
      <animate attributeName="x1" from="-100%" to="150%" dur="4s" repeatCount="indefinite"/>
      <animate attributeName="x2" from="0%" to="250%" dur="4s" repeatCount="indefinite"/>
    </linearGradient>

    <!-- Filters -->
    <filter id="soft-glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>

    <clipPath id="portrait-rounded">
      <rect x="0" y="0" width="220" height="220" rx="20"/>
    </clipPath>
  </defs>
`;

// 1. HERO.SVG
const heroSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 920 420" width="100%" height="100%">
  <style>
    @media (prefers-reduced-motion: reduce) {
      .cycle-role, .type-cursor, .halo-spin {
        animation: none !important;
      }
      .role-1 { opacity: 1 !important; transform: none !important; }
    }

    .hero-bg { fill: #070b16; }
    .hero-card { fill: #0b1122; stroke: url(#cyber-border); stroke-width: 1.2px; }
    .text-title { font-family: ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; font-weight: 800; fill: #f8fafc; }
    .text-mono { font-family: ui-monospace, SFMono-Regular, "Roboto Mono", Menlo, monospace; }
    .text-muted { fill: #94a3b8; font-family: ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
    
    /* Rising Mask Name Animation */
    @keyframes riseUp {
      0% { transform: translateY(45px); opacity: 0; }
      100% { transform: translateY(0); opacity: 1; }
    }
    .rising-name {
      animation: riseUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }

    /* Role Cycling Animation (12s total: 4 roles x 3s) */
    @keyframes cycleRoles1 {
      0%, 25% { opacity: 1; transform: translateY(0); }
      28%, 97% { opacity: 0; transform: translateY(-16px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    @keyframes cycleRoles2 {
      0%, 23% { opacity: 0; transform: translateY(16px); }
      28%, 50% { opacity: 1; transform: translateY(0); }
      53%, 100% { opacity: 0; transform: translateY(-16px); }
    }
    @keyframes cycleRoles3 {
      0%, 48% { opacity: 0; transform: translateY(16px); }
      53%, 75% { opacity: 1; transform: translateY(0); }
      78%, 100% { opacity: 0; transform: translateY(-16px); }
    }
    @keyframes cycleRoles4 {
      0%, 73% { opacity: 0; transform: translateY(16px); }
      78%, 97% { opacity: 1; transform: translateY(0); }
      100% { opacity: 0; transform: translateY(-16px); }
    }

    .role-1 { animation: cycleRoles1 12s infinite; }
    .role-2 { animation: cycleRoles2 12s infinite; }
    .role-3 { animation: cycleRoles3 12s infinite; }
    .role-4 { animation: cycleRoles4 12s infinite; }

    /* Blinking Cursor */
    @keyframes blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0; }
    }
    .type-cursor { animation: blink 1s infinite; fill: #247bff; }

    /* Rotating Halo */
    @keyframes spinHalo {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    .halo-spin {
      transform-origin: 750px 210px;
      animation: spinHalo 18s linear infinite;
    }

    /* Pulse Status */
    @keyframes pulseDot {
      0%, 100% { r: 5px; opacity: 1; }
      50% { r: 8px; opacity: 0.6; }
    }
    .status-pulse { animation: pulseDot 2s ease-in-out infinite; }
  </style>

  ${commonDefs}

  <clipPath id="name-reveal-clip">
    <rect x="48" y="115" width="560" height="70"/>
  </clipPath>

  <!-- Container Base Card -->
  <rect x="6" y="6" width="908" height="408" rx="20" class="hero-bg"/>
  <rect x="6" y="6" width="908" height="408" rx="20" fill="url(#dot-matrix)"/>
  <rect x="6" y="6" width="908" height="408" rx="20" fill="none" stroke="url(#cyber-border)" stroke-width="1.5"/>

  <!-- Top Ambient Glow -->
  <circle cx="180" cy="100" r="140" fill="#247bff" opacity="0.12" filter="url(#soft-glow)"/>
  <circle cx="750" cy="210" r="160" fill="#ff354f" opacity="0.1" filter="url(#soft-glow)"/>

  <!-- Left Column: Content -->
  <g transform="translate(48, 52)">
    <!-- Terminal Tag & Typed Greeting -->
    <rect x="0" y="0" width="220" height="28" rx="6" fill="#131e36" stroke="#247bff" stroke-width="1"/>
    <circle cx="12" cy="14" r="3.5" fill="#ff354f"/>
    <circle cx="24" cy="14" r="3.5" fill="#f59e0b"/>
    <circle cx="36" cy="14" r="3.5" fill="#10b981"/>
    <text x="50" y="19" class="text-mono" font-size="12" fill="#38bdf8" font-weight="600">HELLO, WORLD! 👋</text>
    <rect x="180" y="8" width="8" height="12" class="type-cursor"/>

    <!-- Rising Mask Name Reveal -->
    <g clip-path="url(#name-reveal-clip)">
      <g class="rising-name">
        <text x="0" y="125" class="text-title" font-size="44" letter-spacing="-0.03em">
          SUKANT <tspan fill="url(#blue-glow-grad)">BHATTACHARYA</tspan>
        </text>
      </g>
    </g>

    <!-- GitHub Handle Badge -->
    <g transform="translate(0, 142)">
      <rect x="0" y="0" width="145" height="24" rx="4" fill="#0f172a" stroke="#334155" stroke-width="1"/>
      <text x="12" y="16" class="text-mono" font-size="12" fill="#94a3b8">@sukantcodes</text>
      <circle cx="125" cy="12" r="4" fill="#10b981" class="status-pulse"/>
    </g>

    <!-- Four Cycling Roles (3s each, 12s total) -->
    <g transform="translate(0, 198)">
      <text x="0" y="0" class="text-mono" font-size="12" fill="#64748b" letter-spacing="0.1em" font-weight="700">CURRENT DOMAINS // </text>
      
      <!-- Role 1 -->
      <g class="cycle-role role-1">
        <text x="145" y="0" class="text-mono" font-size="15" fill="#38bdf8" font-weight="700">📱 Android &amp; Mobile Architect</text>
      </g>
      <!-- Role 2 -->
      <g class="cycle-role role-2" opacity="0">
        <text x="145" y="0" class="text-mono" font-size="15" fill="#ff354f" font-weight="700">🧠 Autonomous AI &amp; Voice Engineer</text>
      </g>
      <!-- Role 3 -->
      <g class="cycle-role role-3" opacity="0">
        <text x="145" y="0" class="text-mono" font-size="15" fill="#38bdf8" font-weight="700">⚡ Kotlin &amp; Jetpack Compose Lead</text>
      </g>
      <!-- Role 4 -->
      <g class="cycle-role role-4" opacity="0">
        <text x="145" y="0" class="text-mono" font-size="15" fill="#a855f7" font-weight="700">🌐 Open Source &amp; Systems Creator</text>
      </g>
    </g>

    <!-- One-Line Pitch -->
    <text x="0" y="240" class="text-muted" font-size="15" font-weight="400">
      Architecting intelligent mobile ecosystems and autonomous AI assistants
    </text>
    <text x="0" y="262" class="text-muted" font-size="15" font-weight="400">
      powered by <tspan fill="#38bdf8" font-weight="600">Kotlin</tspan>, <tspan fill="#ff6b81" font-weight="600">Android SDK</tspan>, and deep neural intelligence.
    </text>

    <!-- Location & Status Row -->
    <g transform="translate(0, 296)">
      <rect x="0" y="0" width="530" height="34" rx="8" fill="#0d1424" stroke="#1e293b" stroke-width="1"/>
      <text x="14" y="22" class="text-mono" font-size="12" fill="#cbd5e1">
        📍 <tspan fill="#f8fafc">India / Global</tspan>
      </text>
      <text x="130" y="22" class="text-mono" font-size="12" fill="#475569">|</text>
      <text x="145" y="22" class="text-mono" font-size="12" fill="#cbd5e1">
        ⚡ <tspan fill="#38bdf8">The Ultimate JARVIS</tspan>
      </text>
      <text x="320" y="22" class="text-mono" font-size="12" fill="#475569">|</text>
      <text x="335" y="22" class="text-mono" font-size="12" fill="#10b981">
        ● <tspan fill="#e2e8f0">Open for Collaborations</tspan>
      </text>
    </g>
  </g>

  <!-- Right Column: Stylized Portrait Frame with Animated Rim Glow -->
  <g transform="translate(635, 95)">
    <!-- Rotating Halo Ring -->
    <circle cx="115" cy="115" r="126" fill="none" stroke="url(#cyber-border)" stroke-width="3" stroke-dasharray="24 16" class="halo-spin"/>
    <circle cx="115" cy="115" r="138" fill="none" stroke="#247bff" stroke-width="1" opacity="0.3"/>

    <!-- Portrait Card Background -->
    <rect x="5" y="5" width="220" height="220" rx="24" fill="#0b1220" stroke="#1e293b" stroke-width="1.5"/>

    <!-- Embedded Real Stylized Portrait (id.png) -->
    <g clip-path="url(#portrait-rounded)" transform="translate(5, 5)">
      <image href="${idPngBase64}" x="-10" y="-10" width="240" height="240" preserveAspectRatio="xMidYMid slice"/>
    </g>

    <!-- Card Badge Overlay -->
    <g transform="translate(25, 205)">
      <rect x="0" y="0" width="180" height="26" rx="6" fill="#070b16" stroke="url(#cyber-border)" stroke-width="1"/>
      <circle cx="14" cy="13" r="4" fill="#10b981"/>
      <text x="26" y="17" class="text-mono" font-size="11" fill="#f8fafc" font-weight="700">SUKANT // DEV-ID</text>
      <text x="142" y="17" class="text-mono" font-size="10" fill="#38bdf8">2026</text>
    </g>
  </g>
</svg>`;

// 2. ABOUT-LIFE.SVG
const aboutLifeSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 920 420" width="100%" height="100%">
  <style>
    @media (prefers-reduced-motion: reduce) {
      .bar-progress-1, .bar-progress-2, .bar-progress-3,
      .slide-1, .slide-2, .slide-3 {
        animation: none !important;
      }
      .slide-1 { opacity: 1 !important; }
      .bar-progress-1 { width: 100% !important; }
    }

    .card-bg { fill: #070b16; }
    .inner-card { fill: #0b1122; stroke: #1e293b; stroke-width: 1px; }
    .text-head { font-family: ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; font-weight: 800; fill: #f8fafc; }
    .text-body { font-family: ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; fill: #94a3b8; }
    .text-mono { font-family: ui-monospace, SFMono-Regular, "Roboto Mono", Menlo, monospace; }

    /* Segment progress bar animation (12s cycle: 0-4s bar1, 4-8s bar2, 8-12s bar3) */
    @keyframes progress1 {
      0% { width: 0; }
      30%, 100% { width: 110px; }
    }
    @keyframes progress2 {
      0%, 33% { width: 0; }
      63%, 100% { width: 110px; }
    }
    @keyframes progress3 {
      0%, 66% { width: 0; }
      96%, 100% { width: 110px; }
    }

    .bar-progress-1 { animation: progress1 12s linear infinite; }
    .bar-progress-2 { animation: progress2 12s linear infinite; }
    .bar-progress-3 { animation: progress3 12s linear infinite; }

    /* Carousel Slides (3 slides x 4s = 12s total) */
    @keyframes slideCycle1 {
      0%, 30% { opacity: 1; transform: translateX(0); }
      33%, 97% { opacity: 0; transform: translateX(15px); }
      100% { opacity: 1; transform: translateX(0); }
    }
    @keyframes slideCycle2 {
      0%, 30% { opacity: 0; transform: translateX(-15px); }
      33%, 63% { opacity: 1; transform: translateX(0); }
      66%, 100% { opacity: 0; transform: translateX(15px); }
    }
    @keyframes slideCycle3 {
      0%, 63% { opacity: 0; transform: translateX(-15px); }
      66%, 96% { opacity: 1; transform: translateX(0); }
      99%, 100% { opacity: 0; transform: translateX(15px); }
    }

    .slide-1 { animation: slideCycle1 12s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
    .slide-2 { animation: slideCycle2 12s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
    .slide-3 { animation: slideCycle3 12s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
  </style>

  ${commonDefs}

  <!-- Main Container -->
  <rect x="6" y="6" width="908" height="408" rx="20" class="card-bg"/>
  <rect x="6" y="6" width="908" height="408" rx="20" fill="url(#dot-matrix)"/>
  <rect x="6" y="6" width="908" height="408" rx="20" fill="none" stroke="url(#cyber-border)" stroke-width="1.5"/>

  <!-- Left Side: Engineering Capabilities -->
  <g transform="translate(36, 36)">
    <rect x="0" y="0" width="410" height="348" rx="16" class="inner-card"/>
    
    <!-- Header -->
    <g transform="translate(24, 28)">
      <text x="0" y="0" class="text-mono" font-size="11" fill="#247bff" font-weight="700" letter-spacing="0.1em">SECTION 02 // CAPABILITIES</text>
      <text x="0" y="26" class="text-head" font-size="22">Core Engineering Discipline</text>
    </g>

    <!-- 4 Capability Rows -->
    <g transform="translate(24, 88)">
      <!-- Item 1 -->
      <g transform="translate(0, 0)">
        <rect x="0" y="0" width="362" height="52" rx="8" fill="#10192e" stroke="#1e293b" stroke-width="1"/>
        <circle cx="26" cy="26" r="14" fill="#247bff" opacity="0.2"/>
        <text x="20" y="31" font-size="14">📱</text>
        <text x="52" y="22" class="text-head" font-size="13">Mobile Architecture</text>
        <text x="52" y="38" class="text-body" font-size="11">Jetpack Compose, Kotlin Multiplatform, MVI/MVVM</text>
      </g>

      <!-- Item 2 -->
      <g transform="translate(0, 60)">
        <rect x="0" y="0" width="362" height="52" rx="8" fill="#10192e" stroke="#1e293b" stroke-width="1"/>
        <circle cx="26" cy="26" r="14" fill="#ff354f" opacity="0.2"/>
        <text x="20" y="31" font-size="14">🧠</text>
        <text x="52" y="22" class="text-head" font-size="13">Autonomous AI &amp; Voice</text>
        <text x="52" y="38" class="text-body" font-size="11">Voice Agents, Gemini API, On-device Neural Models</text>
      </g>

      <!-- Item 3 -->
      <g transform="translate(0, 120)">
        <rect x="0" y="0" width="362" height="52" rx="8" fill="#10192e" stroke="#1e293b" stroke-width="1"/>
        <circle cx="26" cy="26" r="14" fill="#10b981" opacity="0.2"/>
        <text x="20" y="31" font-size="14">⚡</text>
        <text x="52" y="22" class="text-head" font-size="13">Fluid Motion &amp; Performance</text>
        <text x="52" y="38" class="text-body" font-size="11">120Hz micro-interactions, Memory profiling, Cache</text>
      </g>

      <!-- Item 4 -->
      <g transform="translate(0, 180)">
        <rect x="0" y="0" width="362" height="52" rx="8" fill="#10192e" stroke="#1e293b" stroke-width="1"/>
        <circle cx="26" cy="26" r="14" fill="#a855f7" opacity="0.2"/>
        <text x="20" y="31" font-size="14">🛠️</text>
        <text x="52" y="22" class="text-head" font-size="13">Systems &amp; DevOps</text>
        <text x="52" y="38" class="text-body" font-size="11">Clean Architecture, GitHub CI/CD, Containerization</text>
      </g>
    </g>
  </g>

  <!-- Right Side: Three-Slide Interests Carousel Changing Every 4s with Segment Bars -->
  <g transform="translate(474, 36)">
    <rect x="0" y="0" width="410" height="348" rx="16" class="inner-card"/>

    <!-- Header & Segment Bars -->
    <g transform="translate(24, 28)">
      <text x="0" y="0" class="text-mono" font-size="11" fill="#38bdf8" font-weight="700" letter-spacing="0.1em">INTERESTS // THREE-SLIDE CAROUSEL</text>
      <text x="0" y="26" class="text-head" font-size="22">Passions &amp; Focus Areas</text>

      <!-- Segment Progress Bars (3 segments) -->
      <g transform="translate(0, 42)">
        <!-- Bar 1 Base -->
        <rect x="0" y="0" width="112" height="4" rx="2" fill="#1e293b"/>
        <rect x="0" y="0" width="0" height="4" rx="2" fill="#247bff" class="bar-progress-1"/>

        <!-- Bar 2 Base -->
        <rect x="124" y="0" width="112" height="4" rx="2" fill="#1e293b"/>
        <rect x="124" y="0" width="0" height="4" rx="2" fill="#ff354f" class="bar-progress-2"/>

        <!-- Bar 3 Base -->
        <rect x="248" y="0" width="112" height="4" rx="2" fill="#1e293b"/>
        <rect x="248" y="0" width="0" height="4" rx="2" fill="#38bdf8" class="bar-progress-3"/>
      </g>
    </g>

    <!-- Slide Container with Cycling Content -->
    <g transform="translate(24, 115)">
      <!-- Slide 1: Autonomous Voice Systems (0-4s) -->
      <g class="slide-1">
        <rect x="0" y="0" width="362" height="205" rx="12" fill="#10192e" stroke="#247bff" stroke-width="1"/>
        <g transform="translate(20, 24)">
          <text x="0" y="0" class="text-mono" font-size="11" fill="#247bff" font-weight="700">SLIDE 01 / 03 • AI SYSTEMS</text>
          <text x="0" y="28" class="text-head" font-size="19" fill="#f8fafc">The Ultimate JARVIS Voice AI</text>
          <text x="0" y="58" class="text-body" font-size="13">
            Building intelligent Android voice assistants with
          </text>
          <text x="0" y="78" class="text-body" font-size="13">
            sub-second speech recognition, Gemini API agent
          </text>
          <text x="0" y="98" class="text-body" font-size="13">
            orchestration, and autonomous device actions.
          </text>

          <g transform="translate(0, 125)">
            <rect x="0" y="0" width="85" height="24" rx="4" fill="#1e293b"/>
            <text x="12" y="16" class="text-mono" font-size="11" fill="#38bdf8">Kotlin</text>
            <rect x="95" y="0" width="95" height="24" rx="4" fill="#1e293b"/>
            <text x="107" y="16" class="text-mono" font-size="11" fill="#ff6b81">Gemini AI</text>
            <rect x="200" y="0" width="105" height="24" rx="4" fill="#1e293b"/>
            <text x="212" y="16" class="text-mono" font-size="11" fill="#34d399">Speech Core</text>
          </g>
        </g>
      </g>

      <!-- Slide 2: Next-Gen Mobile Media (4-8s) -->
      <g class="slide-2" opacity="0">
        <rect x="0" y="0" width="362" height="205" rx="12" fill="#10192e" stroke="#ff354f" stroke-width="1"/>
        <g transform="translate(20, 24)">
          <text x="0" y="0" class="text-mono" font-size="11" fill="#ff354f" font-weight="700">SLIDE 02 / 03 • STREAMING ARCHITECTURE</text>
          <text x="0" y="28" class="text-head" font-size="19" fill="#f8fafc">MovieBox &amp; Media Engines</text>
          <text x="0" y="58" class="text-body" font-size="13">
            Engineering high-performance video streaming with
          </text>
          <text x="0" y="78" class="text-body" font-size="13">
            ExoPlayer, dynamic chunk preloading, custom
          </text>
          <text x="0" y="98" class="text-body" font-size="13">
            Compose layouts, and silky smooth transitions.
          </text>

          <g transform="translate(0, 125)">
            <rect x="0" y="0" width="130" height="24" rx="4" fill="#1e293b"/>
            <text x="12" y="16" class="text-mono" font-size="11" fill="#38bdf8">Jetpack Compose</text>
            <rect x="140" y="0" width="90" height="24" rx="4" fill="#1e293b"/>
            <text x="152" y="16" class="text-mono" font-size="11" fill="#fbbf24">ExoPlayer</text>
            <rect x="240" y="0" width="75" height="24" rx="4" fill="#1e293b"/>
            <text x="252" y="16" class="text-mono" font-size="11" fill="#a855f7">Cache</text>
          </g>
        </g>
      </g>

      <!-- Slide 3: Exploration & Photography (8-12s) -->
      <g class="slide-3" opacity="0">
        <rect x="0" y="0" width="362" height="205" rx="12" fill="#10192e" stroke="#38bdf8" stroke-width="1"/>
        <g transform="translate(20, 24)">
          <text x="0" y="0" class="text-mono" font-size="11" fill="#38bdf8" font-weight="700">SLIDE 03 / 03 • FIELD &amp; CRAFT</text>
          <text x="0" y="28" class="text-head" font-size="19" fill="#f8fafc">Mountain Explorations &amp; Lens</text>
          <text x="0" y="58" class="text-body" font-size="13">
            Capturing sunrise peaks, misty mountain ranges,
          </text>
          <text x="0" y="78" class="text-body" font-size="13">
            and translating atmospheric patience into clean,
          </text>
          <text x="0" y="98" class="text-body" font-size="13">
            meticulously architected code and digital products.
          </text>

          <g transform="translate(0, 125)">
            <rect x="0" y="0" width="115" height="24" rx="4" fill="#1e293b"/>
            <text x="12" y="16" class="text-mono" font-size="11" fill="#38bdf8">Photography</text>
            <rect x="125" y="0" width="95" height="24" rx="4" fill="#1e293b"/>
            <text x="137" y="16" class="text-mono" font-size="11" fill="#10b981">Trekking</text>
            <rect x="230" y="0" width="90" height="24" rx="4" fill="#1e293b"/>
            <text x="242" y="16" class="text-mono" font-size="11" fill="#f43f5e">Aesthetics</text>
          </g>
        </g>
      </g>
    </g>
  </g>
</svg>`;

// 3. STACK.SVG
const stackSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 920 460" width="100%" height="100%">
  <style>
    @media (prefers-reduced-motion: reduce) {
      .orbit-spin, .node-pulse {
        animation: none !important;
      }
    }

    .bg-main { fill: #070b16; }
    .text-title { font-family: ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; font-weight: 800; fill: #f8fafc; }
    .text-mono { font-family: ui-monospace, SFMono-Regular, "Roboto Mono", Menlo, monospace; }
    .chip { fill: #0d1527; stroke: #1e293b; stroke-width: 1px; rx: 6px; }
    .chip-text { font-family: ui-monospace, SFMono-Regular, monospace; font-size: 11px; fill: #e2e8f0; font-weight: 600; }

    /* Orbital Motion Animations */
    @keyframes orbitRotate1 {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    @keyframes orbitRotate2 {
      from { transform: rotate(0deg); }
      to { transform: rotate(-360deg); }
    }
    @keyframes orbitRotate3 {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }

    .orbit-1 { transform-origin: 460px 180px; animation: orbitRotate1 24s linear infinite; }
    .orbit-2 { transform-origin: 460px 180px; animation: orbitRotate2 32s linear infinite; }
    .orbit-3 { transform-origin: 460px 180px; animation: orbitRotate3 40s linear infinite; }

    /* Pulse Glow */
    @keyframes nodeGlow {
      0%, 100% { filter: drop-shadow(0 0 4px #247bff); }
      50% { filter: drop-shadow(0 0 10px #38bdf8); }
    }
    .node-pulse { animation: nodeGlow 3s ease-in-out infinite; }
  </style>

  ${commonDefs}

  <!-- Main Container -->
  <rect x="6" y="6" width="908" height="448" rx="20" class="bg-main"/>
  <rect x="6" y="6" width="908" height="448" rx="20" fill="url(#dot-matrix)"/>
  <rect x="6" y="6" width="908" height="448" rx="20" fill="none" stroke="url(#cyber-border)" stroke-width="1.5"/>

  <!-- Header -->
  <g transform="translate(48, 36)">
    <text x="0" y="0" class="text-mono" font-size="11" fill="#247bff" font-weight="700" letter-spacing="0.1em">SECTION 03 // ARCHITECTURAL TOOLKIT</text>
    <text x="0" y="26" class="text-title" font-size="24">Three-Tier Orbital Tech Matrix</text>
  </g>

  <!-- Orbital Solar System (Center: 460, 180) -->
  <g id="orbital-system">
    <!-- Center Core: AI CORE / KOTLIN -->
    <circle cx="460" cy="180" r="32" fill="#0b1222" stroke="url(#cyber-border)" stroke-width="2"/>
    <circle cx="460" cy="180" r="24" fill="#13203c"/>
    <text x="460" y="176" text-anchor="middle" class="text-mono" font-size="10" fill="#38bdf8" font-weight="700">SUKANT</text>
    <text x="460" y="190" text-anchor="middle" class="text-mono" font-size="9" fill="#ff354f" font-weight="700">CORE</text>

    <!-- Orbit 1: Tilted Ellipse (Inner: Mobile Core) -->
    <ellipse cx="460" cy="180" rx="140" ry="58" fill="none" stroke="#247bff" stroke-width="1.2" stroke-dasharray="6,4" opacity="0.6" transform="rotate(-10 460 180)"/>
    <g class="orbit-1">
      <!-- Kotlin Node -->
      <g transform="translate(340, 155)">
        <circle cx="16" cy="16" r="18" fill="#131d33" stroke="#7f52ff" stroke-width="1.5" class="node-pulse"/>
        <text x="16" y="20" text-anchor="middle" class="text-mono" font-size="11" fill="#c084fc" font-weight="700">K</text>
      </g>
      <!-- Android Node -->
      <g transform="translate(560, 175)">
        <circle cx="16" cy="16" r="18" fill="#131d33" stroke="#3ddc84" stroke-width="1.5" class="node-pulse"/>
        <text x="16" y="20" text-anchor="middle" class="text-mono" font-size="10" fill="#3ddc84" font-weight="700">AND</text>
      </g>
    </g>

    <!-- Orbit 2: Tilted Ellipse (Middle: Intelligence & Backend) -->
    <ellipse cx="460" cy="180" rx="230" ry="85" fill="none" stroke="#ff354f" stroke-width="1.2" stroke-dasharray="8,6" opacity="0.5" transform="rotate(12 460 180)"/>
    <g class="orbit-2">
      <!-- Python Node -->
      <g transform="translate(250, 130)">
        <circle cx="16" cy="16" r="18" fill="#131d33" stroke="#38bdf8" stroke-width="1.5"/>
        <text x="16" y="20" text-anchor="middle" class="text-mono" font-size="10" fill="#38bdf8" font-weight="700">PY</text>
      </g>
      <!-- Gemini Node -->
      <g transform="translate(640, 150)">
        <circle cx="16" cy="16" r="18" fill="#131d33" stroke="#ff354f" stroke-width="1.5"/>
        <text x="16" y="20" text-anchor="middle" class="text-mono" font-size="9" fill="#ff6b81" font-weight="700">AI</text>
      </g>
      <!-- PyTorch Node -->
      <g transform="translate(420, 250)">
        <circle cx="16" cy="16" r="18" fill="#131d33" stroke="#ee4c2c" stroke-width="1.5"/>
        <text x="16" y="20" text-anchor="middle" class="text-mono" font-size="9" fill="#ee4c2c" font-weight="700">TORCH</text>
      </g>
    </g>

    <!-- Orbit 3: Tilted Ellipse (Outer: Ecosystem & DevTools) -->
    <ellipse cx="460" cy="180" rx="340" ry="110" fill="none" stroke="#38bdf8" stroke-width="1" stroke-dasharray="10,8" opacity="0.35" transform="rotate(-6 460 180)"/>
    <g class="orbit-3">
      <!-- Git Node -->
      <g transform="translate(140, 160)">
        <circle cx="16" cy="16" r="18" fill="#131d33" stroke="#f05032" stroke-width="1.5"/>
        <text x="16" y="20" text-anchor="middle" class="text-mono" font-size="10" fill="#f05032" font-weight="700">GIT</text>
      </g>
      <!-- Docker Node -->
      <g transform="translate(740, 180)">
        <circle cx="16" cy="16" r="18" fill="#131d33" stroke="#2496ed" stroke-width="1.5"/>
        <text x="16" y="20" text-anchor="middle" class="text-mono" font-size="9" fill="#2496ed" font-weight="700">DOC</text>
      </g>
      <!-- Compose Node -->
      <g transform="translate(360, 70)">
        <circle cx="16" cy="16" r="18" fill="#131d33" stroke="#4285f4" stroke-width="1.5"/>
        <text x="16" y="20" text-anchor="middle" class="text-mono" font-size="9" fill="#4285f4" font-weight="700">CMP</text>
      </g>
    </g>
  </g>

  <!-- Bottom Grouped Stack Chips (3 Columns) -->
  <g transform="translate(48, 320)">
    <!-- Group 1: Mobile Engineering -->
    <g transform="translate(0, 0)">
      <text x="0" y="0" class="text-mono" font-size="11" fill="#7f52ff" font-weight="700">MOBILE ECOSYSTEM</text>
      <g transform="translate(0, 12)">
        <rect x="0" y="0" width="75" height="26" class="chip" stroke="#7f52ff"/>
        <text x="12" y="17" class="chip-text" fill="#c084fc">Kotlin</text>

        <rect x="83" y="0" width="85" height="26" class="chip" stroke="#3ddc84"/>
        <text x="95" y="17" class="chip-text" fill="#3ddc84">Android</text>

        <rect x="176" y="0" width="80" height="26" class="chip"/>
        <text x="188" y="17" class="chip-text">Compose</text>

        <rect x="0" y="32" width="90" height="26" class="chip"/>
        <text x="12" y="49" class="chip-text">Coroutines</text>

        <rect x="98" y="32" width="75" height="26" class="chip"/>
        <text x="110" y="49" class="chip-text">ExoPlayer</text>

        <rect x="181" y="32" width="75" height="26" class="chip"/>
        <text x="193" y="49" class="chip-text">Retrofit</text>
      </g>
    </g>

    <!-- Group 2: Intelligence & Systems -->
    <g transform="translate(285, 0)">
      <text x="0" y="0" class="text-mono" font-size="11" fill="#ff354f" font-weight="700">AI &amp; INTELLIGENCE</text>
      <g transform="translate(0, 12)">
        <rect x="0" y="0" width="85" height="26" class="chip" stroke="#ff354f"/>
        <text x="12" y="17" class="chip-text" fill="#ff6b81">Gemini AI</text>

        <rect x="93" y="0" width="75" height="26" class="chip"/>
        <text x="105" y="17" class="chip-text">Python</text>

        <rect x="176" y="0" width="80" height="26" class="chip"/>
        <text x="188" y="17" class="chip-text">PyTorch</text>

        <rect x="0" y="32" width="85" height="26" class="chip"/>
        <text x="12" y="49" class="chip-text">Speech AI</text>

        <rect x="93" y="32" width="80" height="26" class="chip"/>
        <text x="105" y="49" class="chip-text">FastAPI</text>

        <rect x="181" y="32" width="75" height="26" class="chip"/>
        <text x="193" y="49" class="chip-text">Agents</text>
      </g>
    </g>

    <!-- Group 3: DevOps & Architecture -->
    <g transform="translate(570, 0)">
      <text x="0" y="0" class="text-mono" font-size="11" fill="#38bdf8" font-weight="700">DEVOPS &amp; TOOLING</text>
      <g transform="translate(0, 12)">
        <rect x="0" y="0" width="65" height="26" class="chip" stroke="#f05032"/>
        <text x="12" y="17" class="chip-text" fill="#fca5a5">Git</text>

        <rect x="73" y="0" width="80" height="26" class="chip"/>
        <text x="85" y="17" class="chip-text">GitHub CI</text>

        <rect x="161" y="0" width="75" height="26" class="chip"/>
        <text x="173" y="17" class="chip-text">Docker</text>

        <rect x="0" y="32" width="75" height="26" class="chip"/>
        <text x="12" y="49" class="chip-text">Linux</text>

        <rect x="83" y="32" width="80" height="26" class="chip"/>
        <text x="95" y="49" class="chip-text">Gradle</text>

        <rect x="171" y="32" width="85" height="26" class="chip"/>
        <text x="183" y="49" class="chip-text">TypeScript</text>
      </g>
    </g>
  </g>
</svg>`;

// 4. ID-DASHBOARD.SVG
const idDashboardSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 920 460" width="100%" height="100%">
  <style>
    @media (prefers-reduced-motion: reduce) {
      .lanyard-rig, .foil-layer {
        animation: none !important;
      }
    }

    .bg-main { fill: #070b16; }
    .text-title { font-family: ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; font-weight: 800; fill: #f8fafc; }
    .text-mono { font-family: ui-monospace, SFMono-Regular, "Roboto Mono", Menlo, monospace; }
    .card-panel { fill: #0b1122; stroke: #1e293b; stroke-width: 1px; }

    /* Lanyard Drop & Pendulum Motion:
       Drops into place (0s-1.2s), settles with damped swing, then maintains +/-1.7-deg swing! */
    @keyframes lanyardDropAndSwing {
      0% {
        transform: translateY(-80px) rotate(14deg);
        opacity: 0;
      }
      20% {
        transform: translateY(0px) rotate(-9deg);
        opacity: 1;
      }
      40% {
        transform: translateY(0px) rotate(5deg);
      }
      60% {
        transform: translateY(0px) rotate(-2.5deg);
      }
      80% {
        transform: translateY(0px) rotate(1.7deg);
      }
      90% {
        transform: translateY(0px) rotate(-1.7deg);
      }
      100% {
        transform: translateY(0px) rotate(1.7deg);
      }
    }

    @keyframes perpetualSwing {
      0%, 100% { transform: rotate(-1.7deg); }
      50% { transform: rotate(1.7deg); }
    }

    .lanyard-rig {
      transform-origin: 180px 10px;
      animation: lanyardDropAndSwing 2.5s cubic-bezier(0.25, 1, 0.5, 1) forwards, perpetualSwing 4s ease-in-out infinite 2.5s;
    }

    .foil-layer {
      mix-blend-mode: color-dodge;
    }
  </style>

  ${commonDefs}

  <clipPath id="lanyard-photo-clip">
    <rect x="0" y="0" width="160" height="150" rx="12"/>
  </clipPath>

  <!-- Container -->
  <rect x="6" y="6" width="908" height="448" rx="20" class="bg-main"/>
  <rect x="6" y="6" width="908" height="448" rx="20" fill="url(#dot-matrix)"/>
  <rect x="6" y="6" width="908" height="448" rx="20" fill="none" stroke="url(#cyber-border)" stroke-width="1.5"/>

  <!-- LEFT: HANGING LANYARD ID WITH METAL CLASP -->
  <g class="lanyard-rig">
    <!-- Nylon Ribbon Straps -->
    <path d="M 140 -20 L 170 60 L 180 60 L 150 -20 Z" fill="#247bff" opacity="0.8"/>
    <path d="M 220 -20 L 190 60 L 180 60 L 210 -20 Z" fill="#1d4ed8" opacity="0.8"/>
    <line x1="175" y1="-20" x2="185" y2="60" stroke="#ff354f" stroke-width="2" opacity="0.7"/>

    <!-- Metal Clasp Rig -->
    <rect x="168" y="55" width="24" height="22" rx="4" fill="#64748b" stroke="#94a3b8" stroke-width="1"/>
    <!-- Specular Highlight on Clasp -->
    <rect x="172" y="57" width="5" height="18" fill="#e2e8f0" opacity="0.8"/>
    <!-- Metal Ring Loop -->
    <circle cx="180" cy="85" r="9" fill="none" stroke="#cbd5e1" stroke-width="3"/>
    <!-- ID Card Punch Hole -->
    <rect x="170" y="94" width="20" height="6" rx="3" fill="#070b16"/>

    <!-- ID BADGE PASS -->
    <g transform="translate(75, 90)">
      <!-- Badge Shadow & Border -->
      <rect x="0" y="0" width="210" height="320" rx="16" fill="#0b1222" stroke="url(#cyber-border)" stroke-width="1.5"/>
      <rect x="4" y="4" width="202" height="312" rx="14" fill="#0d1629"/>

      <!-- Header Banner -->
      <rect x="4" y="4" width="202" height="38" rx="12" fill="#13203c"/>
      <circle cx="24" cy="23" r="5" fill="#10b981"/>
      <text x="36" y="27" class="text-mono" font-size="11" fill="#f8fafc" font-weight="700">DEV // PASS ID</text>
      <text x="165" y="27" class="text-mono" font-size="9" fill="#38bdf8">2026</text>

      <!-- Portrait Photo with Clean Cutout & Foil Sweep -->
      <g transform="translate(25, 52)">
        <rect x="0" y="0" width="160" height="150" rx="12" fill="#070b16" stroke="#247bff" stroke-width="1"/>
        <g clip-path="url(#lanyard-photo-clip)">
          <image href="${idPngBase64}" x="-10" y="-10" width="180" height="180" preserveAspectRatio="xMidYMid slice"/>
          <!-- Holographic Foil Sweep -->
          <rect x="0" y="0" width="160" height="150" fill="url(#foil-sweep)" class="foil-layer"/>
        </g>
      </g>

      <!-- Badge Details -->
      <g transform="translate(25, 218)">
        <text x="0" y="0" class="text-title" font-size="14" fill="#f8fafc">SUKANT</text>
        <text x="0" y="16" class="text-title" font-size="12" fill="#38bdf8">BHATTACHARYA</text>
        <text x="0" y="32" class="text-mono" font-size="10" fill="#94a3b8">Android &amp; AI Architect</text>
        <text x="0" y="46" class="text-mono" font-size="9" fill="#ff354f">ROLE: FULL-STACK / MOBILE</text>
      </g>

      <!-- Barcode Visualizer (Dated verified serial) -->
      <g transform="translate(25, 275)">
        <rect x="0" y="0" width="160" height="26" fill="#070b16" rx="4"/>
        <!-- Real SVG Barcode Bars -->
        <g fill="#cbd5e1" transform="translate(10, 4)">
          <rect x="0" y="0" width="2" height="18"/>
          <rect x="4" y="0" width="4" height="18"/>
          <rect x="10" y="0" width="2" height="18"/>
          <rect x="14" y="0" width="1" height="18"/>
          <rect x="17" y="0" width="3" height="18"/>
          <rect x="23" y="0" width="5" height="18"/>
          <rect x="30" y="0" width="2" height="18"/>
          <rect x="34" y="0" width="3" height="18"/>
          <rect x="40" y="0" width="1" height="18"/>
          <rect x="44" y="0" width="4" height="18"/>
          <rect x="50" y="0" width="2" height="18"/>
          <rect x="54" y="0" width="4" height="18"/>
          <rect x="62" y="0" width="1" height="18"/>
          <rect x="65" y="0" width="3" height="18"/>
          <rect x="71" y="0" width="5" height="18"/>
          <rect x="78" y="0" width="2" height="18"/>
          <rect x="83" y="0" width="4" height="18"/>
          <rect x="90" y="0" width="2" height="18"/>
          <rect x="94" y="0" width="3" height="18"/>
          <rect x="100" y="0" width="1" height="18"/>
          <rect x="104" y="0" width="4" height="18"/>
          <rect x="110" y="0" width="2" height="18"/>
          <rect x="115" y="0" width="4" height="18"/>
          <rect x="122" y="0" width="2" height="18"/>
          <rect x="126" y="0" width="3" height="18"/>
          <rect x="132" y="0" width="4" height="18"/>
          <rect x="138" y="0" width="2" height="18"/>
        </g>
      </g>
    </g>
  </g>

  <!-- RIGHT: VERIFIED REPO METRICS & TELEMETRY -->
  <g transform="translate(340, 36)">
    <text x="0" y="0" class="text-mono" font-size="11" fill="#ff354f" font-weight="700" letter-spacing="0.1em">SECTION 04 // VERIFIED PROFILE METRICS</text>
    <text x="0" y="26" class="text-title" font-size="24">Production Repositories &amp; Credentials</text>

    <!-- 2 Featured Repo Cards -->
    <g transform="translate(0, 52)">
      <!-- Card 1: The Ultimate JARVIS -->
      <g transform="translate(0, 0)">
        <rect x="0" y="0" width="530" height="96" rx="12" class="card-panel" stroke="#247bff" stroke-width="1.2"/>
        <g transform="translate(20, 20)">
          <text x="0" y="0" class="text-mono" font-size="10" fill="#38bdf8" font-weight="700">FEATURED REPO 01 // AUTONOMOUS AI</text>
          <text x="0" y="24" class="text-title" font-size="18">The Ultimate JARVIS</text>
          <text x="0" y="44" class="text-muted" font-size="12">
            Android Voice Assistant powered by Gemini API, speech recognition &amp; device execution.
          </text>
          
          <g transform="translate(0, 54)">
            <rect x="0" y="0" width="60" height="18" rx="4" fill="#13203c"/>
            <text x="8" y="13" class="text-mono" font-size="9" fill="#c084fc">Kotlin</text>
            <rect x="68" y="0" width="85" height="18" rx="4" fill="#13203c"/>
            <text x="76" y="13" class="text-mono" font-size="9" fill="#ff6b81">Gemini API</text>
            <rect x="160" y="0" width="80" height="18" rx="4" fill="#13203c"/>
            <text x="168" y="13" class="text-mono" font-size="9" fill="#34d399">Production</text>
          </g>

          <text x="470" y="24" class="text-mono" font-size="14" fill="#247bff">↗</text>
        </g>
      </g>

      <!-- Card 2: MovieBox -->
      <g transform="translate(0, 112)">
        <rect x="0" y="0" width="530" height="96" rx="12" class="card-panel" stroke="#ff354f" stroke-width="1.2"/>
        <g transform="translate(20, 20)">
          <text x="0" y="0" class="text-mono" font-size="10" fill="#ff6b81" font-weight="700">FEATURED REPO 02 // STREAMING &amp; COMPOSE</text>
          <text x="0" y="24" class="text-title" font-size="18">MovieBox Streaming Engine</text>
          <text x="0" y="44" class="text-muted" font-size="12">
            Modern media player built with Jetpack Compose, ExoPlayer, and responsive architecture.
          </text>

          <g transform="translate(0, 54)">
            <rect x="0" y="0" width="115" height="18" rx="4" fill="#13203c"/>
            <text x="8" y="13" class="text-mono" font-size="9" fill="#38bdf8">Jetpack Compose</text>
            <rect x="123" y="0" width="75" height="18" rx="4" fill="#13203c"/>
            <text x="131" y="13" class="text-mono" font-size="9" fill="#fbbf24">ExoPlayer</text>
            <rect x="206" y="0" width="60" height="18" rx="4" fill="#13203c"/>
            <text x="214" y="13" class="text-mono" font-size="9" fill="#10b981">Active</text>
          </g>

          <text x="470" y="24" class="text-mono" font-size="14" fill="#ff354f">↗</text>
        </g>
      </g>
    </g>

    <!-- Verified Stats Banner Row -->
    <g transform="translate(0, 280)">
      <rect x="0" y="0" width="530" height="68" rx="10" fill="#0d1527" stroke="#1e293b" stroke-width="1"/>
      <g transform="translate(24, 22)">
        <text x="0" y="0" class="text-mono" font-size="10" fill="#64748b">CORE ARCHITECTURE</text>
        <text x="0" y="22" class="text-head" font-size="16" fill="#38bdf8">Kotlin &amp; AI First</text>

        <text x="160" y="0" class="text-mono" font-size="10" fill="#64748b">SYSTEM STATUS</text>
        <text x="160" y="22" class="text-head" font-size="16" fill="#10b981">● ONLINE</text>

        <text x="320" y="0" class="text-mono" font-size="10" fill="#64748b">VERIFIED DATE</text>
        <text x="320" y="22" class="text-head" font-size="16" fill="#f8fafc">NOV 2026</text>
      </g>
    </g>
  </g>
</svg>`;

// 5. CONNECT.SVG
const connectSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 920 380" width="100%" height="100%">
  <style>
    @media (prefers-reduced-motion: reduce) {
      .nudge-arrow, .halo-pulse {
        animation: none !important;
      }
    }

    .bg-main { fill: #070b16; }
    .text-title { font-family: ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; font-weight: 800; fill: #f8fafc; }
    .text-mono { font-family: ui-monospace, SFMono-Regular, "Roboto Mono", Menlo, monospace; }
    .social-card { fill: #0b1122; stroke: #1e293b; stroke-width: 1.2px; rx: 12px; }
    .social-card:hover { stroke: #247bff; fill: #10192e; }

    /* Nudging arrow animation */
    @keyframes nudgeRight {
      0%, 100% { transform: translateX(0); }
      50% { transform: translateX(6px); }
    }
    .nudge-arrow { animation: nudgeRight 1.6s ease-in-out infinite; }

    /* Character Subtle Breathe / Float */
    @keyframes subtleBreathe {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-4px); }
    }
    .character-float { animation: subtleBreathe 4s ease-in-out infinite; }
  </style>

  ${commonDefs}

  <!-- Container -->
  <rect x="6" y="6" width="908" height="368" rx="20" class="bg-main"/>
  <rect x="6" y="6" width="908" height="368" rx="20" fill="url(#dot-matrix)"/>
  <rect x="6" y="6" width="908" height="368" rx="20" fill="none" stroke="url(#cyber-border)" stroke-width="1.5"/>

  <!-- LEFT: REAL RIGHT-POINTING CHARACTER WITH ALPHA (Embedded Base64) -->
  <g class="character-float" transform="translate(15, 20)">
    <!-- Behind Character Glow -->
    <ellipse cx="160" cy="220" rx="140" ry="120" fill="#247bff" opacity="0.12" filter="url(#soft-glow)"/>
    
    <!-- Character Image (pointing right toward the cards) -->
    <image href="${pointingPngBase64}" x="0" y="0" width="280" height="340" preserveAspectRatio="xMidYMid meet"/>
    
    <!-- Cyber Pointer Pulse Indicator -->
    <g transform="translate(265, 195)">
      <circle cx="0" cy="0" r="12" fill="#38bdf8" opacity="0.2"/>
      <circle cx="0" cy="0" r="6" fill="#38bdf8"/>
      <path d="M 12 0 L 26 0 M 20 -5 L 26 0 L 20 5" stroke="#38bdf8" stroke-width="2.5" fill="none" class="nudge-arrow"/>
    </g>
  </g>

  <!-- RIGHT: GENEROUSLY SPACED SOCIAL CARDS -->
  <g transform="translate(325, 32)">
    <text x="0" y="0" class="text-mono" font-size="11" fill="#38bdf8" font-weight="700" letter-spacing="0.1em">SECTION 05 // LET'S COLLABORATE</text>
    <text x="0" y="24" class="text-title" font-size="22">Connect With Sukant</text>

    <!-- Social Cards Grid -->
    <g transform="translate(0, 44)">
      <!-- Card 1: GitHub -->
      <g transform="translate(0, 0)">
        <rect x="0" y="0" width="550" height="52" class="social-card" stroke="#247bff"/>
        <!-- GitHub Mark -->
        <circle cx="28" cy="26" r="15" fill="#13203c"/>
        <path d="M 28 17 C 23.5 17 20 20.5 20 25 C 20 28.5 22.3 31.5 25.5 32.6 C 25.9 32.7 26 32.4 26 32.2 L 26 30.6 C 23.8 31 23.3 29.8 23.3 29.8 C 22.9 28.8 22.4 28.6 22.4 28.6 C 21.7 28.1 22.5 28.1 22.5 28.1 C 23.3 28.2 23.7 28.9 23.7 28.9 C 24.4 30.1 25.5 29.7 26 29.5 C 26.1 29 26.3 28.6 26.5 28.4 C 24.7 28.2 22.8 27.5 22.8 24.4 C 22.8 23.5 23.1 22.8 23.7 22.2 C 23.6 22 23.3 21.2 23.8 20.1 C 23.8 20.1 24.5 19.9 26 21 C 26.7 19.8 27.4 19.7 28.1 19.7 C 28.8 19.7 29.5 19.8 30.2 21 C 31.7 19.9 32.4 20.1 32.4 20.1 C 32.9 21.2 32.6 22 32.5 22.2 C 33.1 22.8 33.4 23.5 33.4 24.4 C 33.4 27.5 31.5 28.2 29.7 28.4 C 30 28.7 30.2 29.1 30.2 29.8 L 30.2 32.2 C 30.2 32.4 30.3 32.7 30.7 32.6 C 33.9 31.5 36.2 28.5 36.2 25 C 36.2 20.5 32.5 17 28 17 Z" fill="#f8fafc"/>
        <text x="56" y="23" class="text-title" font-size="14">GitHub</text>
        <text x="56" y="38" class="text-mono" font-size="11" fill="#94a3b8">github.com/sukantcodes</text>
        <g class="nudge-arrow" transform="translate(515, 26)">
          <path d="M 0 0 L 8 0 M 4 -4 L 8 0 L 4 4" stroke="#38bdf8" stroke-width="2" fill="none"/>
        </g>
      </g>

      <!-- Card 2: LinkedIn -->
      <g transform="translate(0, 62)">
        <rect x="0" y="0" width="550" height="52" class="social-card" stroke="#0a66c2"/>
        <!-- LinkedIn Mark -->
        <circle cx="28" cy="26" r="15" fill="#0a66c2"/>
        <text x="28" y="32" text-anchor="middle" font-family="sans-serif" font-weight="800" font-size="15" fill="#ffffff">in</text>
        <text x="56" y="23" class="text-title" font-size="14">LinkedIn</text>
        <text x="56" y="38" class="text-mono" font-size="11" fill="#94a3b8">Sukant Bhattacharya • Mobile &amp; AI Architect</text>
        <g class="nudge-arrow" transform="translate(515, 26)">
          <path d="M 0 0 L 8 0 M 4 -4 L 8 0 L 4 4" stroke="#0a66c2" stroke-width="2" fill="none"/>
        </g>
      </g>

      <!-- Card 3: Email / Direct Collaboration -->
      <g transform="translate(0, 124)">
        <rect x="0" y="0" width="550" height="52" class="social-card" stroke="#ff354f"/>
        <circle cx="28" cy="26" r="15" fill="#ff354f"/>
        <text x="28" y="31" text-anchor="middle" font-size="13">✉️</text>
        <text x="56" y="23" class="text-title" font-size="14">Direct Inquiries &amp; Projects</text>
        <text x="56" y="38" class="text-mono" font-size="11" fill="#94a3b8">sukantxplodeprime@gmail.com</text>
        <g class="nudge-arrow" transform="translate(515, 26)">
          <path d="M 0 0 L 8 0 M 4 -4 L 8 0 L 4 4" stroke="#ff354f" stroke-width="2" fill="none"/>
        </g>
      </g>

      <!-- Card 4: 1:1 Mentorship & Booking (as featured in Playbook) -->
      <g transform="translate(0, 186)">
        <rect x="0" y="0" width="550" height="52" class="social-card" stroke="#f59e0b"/>
        <circle cx="28" cy="26" r="15" fill="#f59e0b"/>
        <text x="28" y="31" text-anchor="middle" font-size="13">⚡</text>
        <text x="56" y="23" class="text-title" font-size="14">Mentorship &amp; System Architecture</text>
        <text x="56" y="38" class="text-mono" font-size="11" fill="#94a3b8">Mobile Engineering • Voice AI • Code Reviews</text>
        <g class="nudge-arrow" transform="translate(515, 26)">
          <path d="M 0 0 L 8 0 M 4 -4 L 8 0 L 4 4" stroke="#f59e0b" stroke-width="2" fill="none"/>
        </g>
      </g>
    </g>
  </g>
</svg>`;

// Write all SVGs to assets/ and public/assets/
fs.writeFileSync(path.join(assetsDir, 'hero.svg'), heroSvg);
fs.writeFileSync(path.join(publicAssetsDir, 'hero.svg'), heroSvg);

fs.writeFileSync(path.join(assetsDir, 'about-life.svg'), aboutLifeSvg);
fs.writeFileSync(path.join(publicAssetsDir, 'about-life.svg'), aboutLifeSvg);

fs.writeFileSync(path.join(assetsDir, 'stack.svg'), stackSvg);
fs.writeFileSync(path.join(publicAssetsDir, 'stack.svg'), stackSvg);

fs.writeFileSync(path.join(assetsDir, 'id-dashboard.svg'), idDashboardSvg);
fs.writeFileSync(path.join(publicAssetsDir, 'id-dashboard.svg'), idDashboardSvg);

fs.writeFileSync(path.join(assetsDir, 'connect.svg'), connectSvg);
fs.writeFileSync(path.join(publicAssetsDir, 'connect.svg'), connectSvg);

console.log('✅ All 5 SVGs written successfully to assets/ and public/assets/!');

// Create README.md exactly as specified in the PDF Playbook (Page 2 & 3)
const readmeContent = `# Hi there, I'm Sukant 👋

<div align="center">

![Intro](./assets/hero.svg?v=1)

![About](./assets/about-life.svg?v=1)

![Stack](./assets/stack.svg?v=1)

![ID](./assets/id-dashboard.svg?v=1)

![Connect](./assets/connect.svg?v=1)

</div>

---

### 🌐 Verified Connect & Socials

<div align="center">

[![GitHub](https://img.shields.io/badge/GitHub-sukantcodes-247bff?style=for-the-badge&logo=github&logoColor=white)](https://github.com/sukantcodes)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Sukant%20Bhattacharya-0a66c2?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/sukantcodes)
[![Email](https://img.shields.io/badge/Email-sukantxplodeprime%40gmail.com-ff354f?style=for-the-badge&logo=gmail&logoColor=white)](mailto:sukantxplodeprime@gmail.com)
[![Status](https://img.shields.io/badge/System-ONLINE%20%26%20BUILDING-10b981?style=for-the-badge&logo=android&logoColor=white)](https://github.com/sukantcodes)

</div>

---

### 🚀 Production Repositories & Engineering Highlights

| Project | Primary Stack | Architecture & Capabilities | Status |
| :--- | :--- | :--- | :--- |
| **[The Ultimate JARVIS](https://github.com/sukantcodes)** | Kotlin • Gemini AI • Android SDK | Autonomous AI voice assistant on Android featuring sub-second speech recognition, Gemini API tool orchestration, and device automation. | 🟢 Deployed |
| **[MovieBox](https://github.com/sukantcodes)** | Jetpack Compose • ExoPlayer • Room | Fluid video streaming application featuring modern declarative UI, chunk caching, and reactive architecture. | 🟢 Deployed |
| **[AI Systems Core](https://github.com/sukantcodes)** | Python • FastAPI • PyTorch | Neural model pipelines, voice agent integrations, and developer toolkits. | 🛠️ Active |

---

<div align="center">

*Crafted with precision for **@sukantcodes** — The Profile Playbook Edition.*  
*Self-contained CSS + SMIL vector suite • Zero network requests • Mobile optimized.*

</div>
`;

fs.writeFileSync(path.join(rootDir, 'README.md'), readmeContent);
fs.writeFileSync(path.join(rootDir, 'public', 'README.md'), readmeContent);
console.log('✅ README.md created at root and public!');

// Create upload-ready ZIP file: profile-assets.zip containing README.md and assets/
const JSZip = require('jszip');
async function bundleZip() {
  const zip = new JSZip();
  zip.file('README.md', fs.readFileSync(path.join(rootDir, 'README.md')));
  const assetFiles = fs.readdirSync(assetsDir);
  const assetsFolder = zip.folder('assets');
  for (const file of assetFiles) {
    assetsFolder.file(file, fs.readFileSync(path.join(assetsDir, file)));
  }
  const zipBuffer = await zip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE' });
  fs.writeFileSync(path.join(rootDir, 'public', 'profile-assets.zip'), zipBuffer);
  fs.writeFileSync(path.join(rootDir, 'profile-assets.zip'), zipBuffer);
  console.log(`✅ Upload-ready ZIP created (${zipBuffer.length} bytes)!`);
}
bundleZip().catch(console.error);


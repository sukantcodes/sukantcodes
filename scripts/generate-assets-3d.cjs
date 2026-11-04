const fs = require('fs');
const path = require('path');
const JSZip = require('jszip');

const assetsDir = path.join(__dirname, '..', 'assets');
const publicAssetsDir = path.join(__dirname, '..', 'public', 'assets');
const rootDir = path.join(__dirname, '..');

// Load base64 encoded images
const idPngBuffer = fs.readFileSync(path.join(assetsDir, 'id.png'));
const idPngBase64 = `data:image/png;base64,${idPngBuffer.toString('base64')}`;

const pointingPngBuffer = fs.readFileSync(path.join(assetsDir, 'right_pointing.png'));
const pointingPngBase64 = `data:image/png;base64,${pointingPngBuffer.toString('base64')}`;

// Supercharged 3D Common Defs with eye-popping neon gradients, filters, and light sweeps
const common3dDefs = `
  <defs>
    <!-- 3D Neon Radial Glows -->
    <radialGradient id="neon-cyan-glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#00f5ff" stop-opacity="0.8"/>
      <stop offset="50%" stop-color="#0080ff" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#0080ff" stop-opacity="0"/>
    </radialGradient>

    <radialGradient id="neon-crimson-glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#ff0055" stop-opacity="0.85"/>
      <stop offset="50%" stop-color="#ff3366" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#ff0055" stop-opacity="0"/>
    </radialGradient>

    <radialGradient id="sphere-3d-cyan" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="25%" stop-color="#38bdf8"/>
      <stop offset="65%" stop-color="#0284c7"/>
      <stop offset="100%" stop-color="#032042"/>
    </radialGradient>

    <radialGradient id="sphere-3d-crimson" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="25%" stop-color="#ff6b81"/>
      <stop offset="65%" stop-color="#e11d48"/>
      <stop offset="100%" stop-color="#4c0519"/>
    </radialGradient>

    <radialGradient id="sphere-3d-purple" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="25%" stop-color="#c084fc"/>
      <stop offset="65%" stop-color="#7e22ce"/>
      <stop offset="100%" stop-color="#2e0854"/>
    </radialGradient>

    <radialGradient id="sphere-3d-emerald" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="25%" stop-color="#4ade80"/>
      <stop offset="65%" stop-color="#15803d"/>
      <stop offset="100%" stop-color="#052e16"/>
    </radialGradient>

    <!-- Animated 3D Holographic Rainbow Ribbon -->
    <linearGradient id="holo-rainbow" x1="-100%" y1="0%" x2="200%" y2="100%">
      <stop offset="0%" stop-color="#ff0055" stop-opacity="0"/>
      <stop offset="20%" stop-color="#ff7700" stop-opacity="0.2"/>
      <stop offset="40%" stop-color="#ffdd00" stop-opacity="0.6"/>
      <stop offset="60%" stop-color="#00ff9d" stop-opacity="0.7"/>
      <stop offset="80%" stop-color="#00f5ff" stop-opacity="0.6"/>
      <stop offset="90%" stop-color="#b000ff" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#ff0055" stop-opacity="0"/>
      <animate attributeName="x1" from="-100%" to="150%" dur="3.5s" repeatCount="indefinite"/>
      <animate attributeName="x2" from="0%" to="250%" dur="3.5s" repeatCount="indefinite"/>
    </linearGradient>

    <!-- 3D Electric Shimmer Gradient -->
    <linearGradient id="text-shimmer" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#00f5ff"/>
      <stop offset="25%" stop-color="#ffffff"/>
      <stop offset="50%" stop-color="#ff007f"/>
      <stop offset="75%" stop-color="#a855f7"/>
      <stop offset="100%" stop-color="#00f5ff"/>
      <animate attributeName="x1" from="0%" to="100%" dur="6s" repeatCount="indefinite"/>
      <animate attributeName="x2" from="100%" to="200%" dur="6s" repeatCount="indefinite"/>
    </linearGradient>

    <!-- High-Tech Neon Border -->
    <linearGradient id="border-neon-3d" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#00f5ff"/>
      <stop offset="30%" stop-color="#3b82f6"/>
      <stop offset="70%" stop-color="#ff0055"/>
      <stop offset="100%" stop-color="#a855f7"/>
    </linearGradient>

    <!-- 3D Perspective Grid Pattern -->
    <pattern id="grid-3d" width="30" height="30" patternUnits="userSpaceOnUse">
      <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#14213d" stroke-width="1" stroke-opacity="0.7"/>
      <circle cx="0" cy="0" r="1.5" fill="#00f5ff" opacity="0.4"/>
    </pattern>

    <!-- Depth & Glow Filters -->
    <filter id="hyper-glow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="5" result="blur1"/>
      <feGaussianBlur stdDeviation="12" result="blur2"/>
      <feMerge>
        <feMergeNode in="blur2"/>
        <feMergeNode in="blur1"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>

    <filter id="soft-glow-filter" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="3.5" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>

    <!-- 3D Card Drop Shadow -->
    <filter id="shadow-3d" x="-20%" y="-20%" width="150%" height="150%">
      <feDropShadow dx="0" dy="16" stdDeviation="20" flood-color="#00f5ff" flood-opacity="0.25"/>
    </filter>

    <clipPath id="portrait-rounded-3d">
      <rect x="0" y="0" width="220" height="220" rx="22"/>
    </clipPath>
  </defs>
`;

// ==========================================
// 1. HERO.SVG (3D CYBERPUNK BREADTH & MOTION)
// ==========================================
const heroSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 920 440" width="100%" height="100%">
  <style>
    @media (prefers-reduced-motion: reduce) {
      .cycle-role, .type-cursor, .halo-spin, .float-3d, .scanline-move, .ring-tilt {
        animation: none !important;
      }
      .role-1 { opacity: 1 !important; transform: none !important; }
    }

    .hero-bg { fill: #040711; }
    .text-title-3d {
      font-family: ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", "Inter", Roboto, sans-serif;
      font-weight: 900;
      letter-spacing: -0.04em;
    }
    .text-mono { font-family: ui-monospace, SFMono-Regular, "JetBrains Mono", Menlo, monospace; }

    /* 3D Floating Bob Effect */
    @keyframes float3D {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-8px) rotate(0.4deg); }
    }
    .float-3d { animation: float3D 5s ease-in-out infinite; }

    /* 3D Rotating Rings */
    @keyframes spinRing1 {
      0% { transform: rotate3d(1, 1, 0, 0deg) rotate(0deg); }
      100% { transform: rotate3d(1, 1, 0, 360deg) rotate(360deg); }
    }
    @keyframes spinRing2 {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(-360deg); }
    }
    .ring-spin-1 {
      transform-origin: 755px 220px;
      animation: spinRing2 14s linear infinite;
    }
    .ring-spin-2 {
      transform-origin: 755px 220px;
      animation: spinRing2 20s linear infinite reverse;
    }

    /* 3D Rising Reveal */
    @keyframes riseReveal {
      0% { transform: translateY(50px) scale(0.95); opacity: 0; filter: blur(4px); }
      100% { transform: translateY(0) scale(1); opacity: 1; filter: blur(0); }
    }
    .rising-name-3d { animation: riseReveal 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards; }

    /* Scanning Laser Line */
    @keyframes scanline {
      0% { transform: translateY(0); opacity: 0; }
      15% { opacity: 0.8; }
      85% { opacity: 0.8; }
      100% { transform: translateY(440px); opacity: 0; }
    }
    .scanline-move { animation: scanline 4.5s linear infinite; }

    /* Role Cycling Animation with 3D Depth Shift (12s total: 4 roles x 3s) */
    @keyframes roleCycle1 {
      0%, 25% { opacity: 1; transform: translateY(0) scale(1); }
      28%, 97% { opacity: 0; transform: translateY(-20px) scale(0.95); }
      100% { opacity: 1; transform: translateY(0) scale(1); }
    }
    @keyframes roleCycle2 {
      0%, 23% { opacity: 0; transform: translateY(20px) scale(0.95); }
      28%, 50% { opacity: 1; transform: translateY(0) scale(1); }
      53%, 100% { opacity: 0; transform: translateY(-20px) scale(0.95); }
    }
    @keyframes roleCycle3 {
      0%, 48% { opacity: 0; transform: translateY(20px) scale(0.95); }
      53%, 75% { opacity: 1; transform: translateY(0) scale(1); }
      78%, 100% { opacity: 0; transform: translateY(-20px) scale(0.95); }
    }
    @keyframes roleCycle4 {
      0%, 73% { opacity: 0; transform: translateY(20px) scale(0.95); }
      78%, 97% { opacity: 1; transform: translateY(0) scale(1); }
      100% { opacity: 0; transform: translateY(-20px) scale(0.95); }
    }

    .role-3d-1 { animation: roleCycle1 12s ease-in-out infinite; }
    .role-3d-2 { animation: roleCycle2 12s ease-in-out infinite; }
    .role-3d-3 { animation: roleCycle3 12s ease-in-out infinite; }
    .role-3d-4 { animation: roleCycle4 12s ease-in-out infinite; }

    /* Pulsing Reactor Glow */
    @keyframes reactorPulse {
      0%, 100% { r: 130px; opacity: 0.15; }
      50% { r: 165px; opacity: 0.35; }
    }
    .reactor-core { animation: reactorPulse 3.5s ease-in-out infinite; }

    /* Blinking Terminal Cursor */
    @keyframes blinkCursor {
      0%, 100% { opacity: 1; }
      50% { opacity: 0; }
    }
    .cursor-blink { animation: blinkCursor 0.8s steps(2, start) infinite; }
  </style>

  ${common3dDefs}

  <clipPath id="hero-reveal-clip">
    <rect x="46" y="110" width="580" height="75"/>
  </clipPath>

  <!-- Base 3D Dark Canvas with Border Glow -->
  <rect x="8" y="8" width="904" height="424" rx="24" class="hero-bg"/>
  <rect x="8" y="8" width="904" height="424" rx="24" fill="url(#grid-3d)"/>
  <rect x="8" y="8" width="904" height="424" rx="24" fill="none" stroke="url(#border-neon-3d)" stroke-width="2"/>

  <!-- Scanning 3D Laser Beam -->
  <g class="scanline-move">
    <line x1="8" y1="0" x2="912" y2="0" stroke="url(#border-neon-3d)" stroke-width="2" opacity="0.7"/>
    <rect x="8" y="-12" width="904" height="12" fill="url(#neon-cyan-glow)" opacity="0.3"/>
  </g>

  <!-- Ambient 3D Neon Backlights -->
  <circle cx="200" cy="120" r="140" fill="url(#neon-cyan-glow)" opacity="0.3" filter="url(#hyper-glow)"/>
  <circle cx="755" cy="220" r="140" fill="url(#neon-crimson-glow)" opacity="0.35" class="reactor-core" filter="url(#hyper-glow)"/>

  <!-- Left Column: 3D Typography & Content -->
  <g transform="translate(48, 48)">
    <!-- 3D Terminal Header Pill -->
    <g transform="translate(0, 0)">
      <rect x="0" y="0" width="235" height="30" rx="8" fill="#0d1527" stroke="#00f5ff" stroke-width="1.2"/>
      <circle cx="14" cy="15" r="4" fill="#ff0055"/>
      <circle cx="28" cy="15" r="4" fill="#ffaa00"/>
      <circle cx="42" cy="15" r="4" fill="#00ff9d"/>
      <text x="56" y="20" class="text-mono" font-size="12" fill="#00f5ff" font-weight="700">HELLO, WORLD! 🚀</text>
      <rect x="195" y="8" width="8" height="14" fill="#00f5ff" class="cursor-blink"/>
    </g>

    <!-- 3D Rising Mask Name Reveal with 3D Shadow Layers -->
    <g clip-path="url(#hero-reveal-clip)">
      <g class="rising-name-3d">
        <!-- 3D Extrusion Shadow Layer 1 (Dark Magenta Depth) -->
        <text x="3" y="128" class="text-title-3d" font-size="46" fill="#ff0055" opacity="0.7">
          SUKANT <tspan fill="#ff007f">BHATTACHARYA</tspan>
        </text>
        <!-- 3D Extrusion Shadow Layer 2 (Electric Cyan Depth) -->
        <text x="-2" y="124" class="text-title-3d" font-size="46" fill="#0080ff" opacity="0.6">
          SUKANT <tspan fill="#00f5ff">BHATTACHARYA</tspan>
        </text>
        <!-- Top Neon Face with Holographic Gradient -->
        <text x="0" y="125" class="text-title-3d" font-size="46" fill="#ffffff" filter="url(#soft-glow-filter)">
          SUKANT <tspan fill="url(#text-shimmer)">BHATTACHARYA</tspan>
        </text>
      </g>
    </g>

    <!-- GitHub Handle 3D Glass Tag -->
    <g transform="translate(0, 146)">
      <rect x="0" y="0" width="160" height="26" rx="6" fill="#0d172e" stroke="#2563eb" stroke-width="1.2"/>
      <text x="14" y="18" class="text-mono" font-size="12" fill="#93c5fd" font-weight="600">@sukantcodes</text>
      <circle cx="142" cy="13" r="4.5" fill="#00ff9d" filter="url(#soft-glow-filter)"/>
    </g>

    <!-- Four Cycling Roles in 3D Motion (12s total: 4 roles x 3s) -->
    <g transform="translate(0, 204)">
      <text x="0" y="0" class="text-mono" font-size="12" fill="#64748b" letter-spacing="0.1em" font-weight="800">DOMAIN // </text>

      <!-- Role 1: Android Architect -->
      <g class="role-3d-1">
        <text x="95" y="0" class="text-mono" font-size="17" fill="#00f5ff" font-weight="800" filter="url(#soft-glow-filter)">
          📱 Android &amp; Mobile Architect
        </text>
      </g>

      <!-- Role 2: Autonomous Voice AI -->
      <g class="role-3d-2" opacity="0">
        <text x="95" y="0" class="text-mono" font-size="17" fill="#ff0055" font-weight="800" filter="url(#soft-glow-filter)">
          🧠 Autonomous AI &amp; Voice Systems
        </text>
      </g>

      <!-- Role 3: Kotlin & Compose -->
      <g class="role-3d-3" opacity="0">
        <text x="95" y="0" class="text-mono" font-size="17" fill="#a855f7" font-weight="800" filter="url(#soft-glow-filter)">
          ⚡ Kotlin &amp; Jetpack Compose Lead
        </text>
      </g>

      <!-- Role 4: Open Source Creator -->
      <g class="role-3d-4" opacity="0">
        <text x="95" y="0" class="text-mono" font-size="17" fill="#00ff9d" font-weight="800" filter="url(#soft-glow-filter)">
          🌐 Open Source &amp; Systems Creator
        </text>
      </g>
    </g>

    <!-- One-Line Pitch with High-Tech Highlighting -->
    <g transform="translate(0, 246)">
      <text x="0" y="0" font-family="ui-sans-serif, sans-serif" font-size="15" fill="#cbd5e1" font-weight="400">
        Architecting intelligent mobile ecosystems &amp; neural voice assistants
      </text>
      <text x="0" y="24" font-family="ui-sans-serif, sans-serif" font-size="15" fill="#94a3b8" font-weight="400">
        crafted with <tspan fill="#00f5ff" font-weight="700">Kotlin</tspan>, <tspan fill="#ff0055" font-weight="700">Jetpack Compose</tspan>, and <tspan fill="#c084fc" font-weight="700">Gemini Neural Models</tspan>.
      </text>
    </g>

    <!-- Location & Telemetry Badge Row -->
    <g transform="translate(0, 310)">
      <rect x="0" y="0" width="540" height="38" rx="10" fill="#09101f" stroke="#1e293b" stroke-width="1.2"/>
      <text x="16" y="24" class="text-mono" font-size="12" fill="#e2e8f0">
        📍 <tspan fill="#ffffff" font-weight="700">India / Global</tspan>
      </text>
      <text x="135" y="24" class="text-mono" font-size="12" fill="#334155">|</text>
      <text x="150" y="24" class="text-mono" font-size="12" fill="#00f5ff">
        ⚡ <tspan fill="#38bdf8" font-weight="700">The Ultimate JARVIS</tspan>
      </text>
      <text x="330" y="24" class="text-mono" font-size="12" fill="#334155">|</text>
      <text x="345" y="24" class="text-mono" font-size="12" fill="#00ff9d">
        ● <tspan fill="#f1f5f9" font-weight="700">Status: ONLINE &amp; ACTIVE</tspan>
      </text>
    </g>
  </g>

  <!-- Right Column: 3D Holographic Character Card with Multi-Layered Gyro Rings -->
  <g class="float-3d" transform="translate(640, 105)">
    <!-- 3D Gyro Ring 1 (Outer Cyan Dashed) -->
    <ellipse cx="115" cy="115" rx="135" ry="135" fill="none" stroke="#00f5ff" stroke-width="2.5" stroke-dasharray="20 12" class="ring-spin-1" opacity="0.8"/>
    
    <!-- 3D Gyro Ring 2 (Tilted Crimson Ring) -->
    <ellipse cx="115" cy="115" rx="145" ry="70" fill="none" stroke="#ff0055" stroke-width="2" stroke-dasharray="16 8" class="ring-spin-2" transform="rotate(35 115 115)" opacity="0.85"/>
    
    <!-- 3D Gyro Ring 3 (Inner Purple Accent) -->
    <ellipse cx="115" cy="115" rx="125" ry="55" fill="none" stroke="#a855f7" stroke-width="1.5" class="ring-spin-1" transform="rotate(-40 115 115)" opacity="0.6"/>

    <!-- 3D Holographic Card Chassis -->
    <rect x="5" y="5" width="220" height="220" rx="24" fill="#080f20" stroke="url(#border-neon-3d)" stroke-width="2" filter="url(#shadow-3d)"/>

    <!-- Real Stylized Portrait (id.png) with Alpha -->
    <g clip-path="url(#portrait-rounded-3d)" transform="translate(5, 5)">
      <image href="${idPngBase64}" x="-10" y="-10" width="240" height="240" preserveAspectRatio="xMidYMid slice"/>
      <!-- Rainbow Holographic Sheen Sweep -->
      <rect x="0" y="0" width="220" height="220" fill="url(#holo-rainbow)" style="mix-blend-mode: screen;"/>
    </g>

    <!-- Floating 3D Cyber HUD Badge -->
    <g transform="translate(25, 204)">
      <rect x="0" y="0" width="180" height="28" rx="8" fill="#040711" stroke="url(#border-neon-3d)" stroke-width="1.2"/>
      <circle cx="14" cy="14" r="4.5" fill="#00ff9d" filter="url(#soft-glow-filter)"/>
      <text x="26" y="19" class="text-mono" font-size="11" fill="#ffffff" font-weight="800">SUKANT // 3D-CORE</text>
      <text x="148" y="19" class="text-mono" font-size="9" fill="#00f5ff" font-weight="700">v2026</text>
    </g>
  </g>
</svg>`;

// ==========================================
// 2. ABOUT-LIFE.SVG (3D CAROUSEL & CAPABILITIES)
// ==========================================
const aboutLifeSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 920 440" width="100%" height="100%">
  <style>
    @media (prefers-reduced-motion: reduce) {
      .bar-progress-1, .bar-progress-2, .bar-progress-3,
      .slide-1, .slide-2, .slide-3, .cube-spin {
        animation: none !important;
      }
      .slide-1 { opacity: 1 !important; transform: none !important; }
      .bar-progress-1 { width: 110px !important; }
    }

    .card-bg { fill: #040711; }
    .inner-card-3d { fill: #090f1f; stroke: #1e293b; stroke-width: 1.2px; }
    .text-head { font-family: ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; font-weight: 800; fill: #ffffff; }
    .text-body { font-family: ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; fill: #94a3b8; }
    .text-mono { font-family: ui-monospace, SFMono-Regular, "JetBrains Mono", Menlo, monospace; }

    /* Segment progress bar animation (12s total: 4s each) */
    @keyframes prog1 {
      0% { width: 0; }
      30%, 100% { width: 112px; }
    }
    @keyframes prog2 {
      0%, 33% { width: 0; }
      63%, 100% { width: 112px; }
    }
    @keyframes prog3 {
      0%, 66% { width: 0; }
      96%, 100% { width: 112px; }
    }

    .bar-prog-1 { animation: prog1 12s linear infinite; }
    .bar-prog-2 { animation: prog2 12s linear infinite; }
    .bar-prog-3 { animation: prog3 12s linear infinite; }

    /* 3D Carousel Slide Flip & Transition (12s cycle) */
    @keyframes slide3d_1 {
      0%, 30% { opacity: 1; transform: translateX(0) scale(1); filter: blur(0); }
      33%, 97% { opacity: 0; transform: translateX(25px) scale(0.92); filter: blur(3px); }
      100% { opacity: 1; transform: translateX(0) scale(1); filter: blur(0); }
    }
    @keyframes slide3d_2 {
      0%, 30% { opacity: 0; transform: translateX(-25px) scale(0.92); filter: blur(3px); }
      33%, 63% { opacity: 1; transform: translateX(0) scale(1); filter: blur(0); }
      66%, 100% { opacity: 0; transform: translateX(25px) scale(0.92); filter: blur(3px); }
    }
    @keyframes slide3d_3 {
      0%, 63% { opacity: 0; transform: translateX(-25px) scale(0.92); filter: blur(3px); }
      66%, 96% { opacity: 1; transform: translateX(0) scale(1); filter: blur(0); }
      99%, 100% { opacity: 0; transform: translateX(25px) scale(0.92); filter: blur(3px); }
    }

    .slide-3d-1 { animation: slide3d_1 12s cubic-bezier(0.16, 1, 0.3, 1) infinite; }
    .slide-3d-2 { animation: slide3d_2 12s cubic-bezier(0.16, 1, 0.3, 1) infinite; }
    .slide-3d-3 { animation: slide3d_3 12s cubic-bezier(0.16, 1, 0.3, 1) infinite; }

    /* 3D Rotating Cube Wireframe */
    @keyframes rotateCube {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    .cube-spin {
      transform-origin: 30px 30px;
      animation: rotateCube 16s linear infinite;
    }
  </style>

  ${common3dDefs}

  <!-- Canvas Container with 3D Border -->
  <rect x="8" y="8" width="904" height="424" rx="24" class="card-bg"/>
  <rect x="8" y="8" width="904" height="424" rx="24" fill="url(#grid-3d)"/>
  <rect x="8" y="8" width="904" height="424" rx="24" fill="none" stroke="url(#border-neon-3d)" stroke-width="2"/>

  <!-- Left Side: 3D Engineering Capabilities -->
  <g transform="translate(38, 38)">
    <rect x="0" y="0" width="410" height="364" rx="18" class="inner-card-3d" stroke="#2563eb" stroke-width="1.2"/>
    
    <!-- Header -->
    <g transform="translate(24, 28)">
      <text x="0" y="0" class="text-mono" font-size="11" fill="#00f5ff" font-weight="800" letter-spacing="0.1em">SECTION 02 // CAPABILITIES</text>
      <text x="0" y="26" class="text-head" font-size="22">Core 3D Engineering Matrix</text>
    </g>

    <!-- 4 High-Tech Capability Rows with 3D Depth Badges -->
    <g transform="translate(24, 88)">
      <!-- Item 1: Mobile Architecture -->
      <g transform="translate(0, 0)">
        <rect x="0" y="0" width="362" height="54" rx="10" fill="#0e172a" stroke="#2563eb" stroke-width="1"/>
        <circle cx="28" cy="27" r="16" fill="url(#sphere-3d-cyan)" filter="url(#soft-glow-filter)"/>
        <text x="21" y="33" font-size="14">📱</text>
        <text x="56" y="23" class="text-head" font-size="13" fill="#ffffff">Mobile Architecture</text>
        <text x="56" y="40" class="text-body" font-size="11">Jetpack Compose, Kotlin Multiplatform, Clean MVVM</text>
      </g>

      <!-- Item 2: Autonomous AI -->
      <g transform="translate(0, 64)">
        <rect x="0" y="0" width="362" height="54" rx="10" fill="#0e172a" stroke="#e11d48" stroke-width="1"/>
        <circle cx="28" cy="27" r="16" fill="url(#sphere-3d-crimson)" filter="url(#soft-glow-filter)"/>
        <text x="21" y="33" font-size="14">🧠</text>
        <text x="56" y="23" class="text-head" font-size="13" fill="#ffffff">Autonomous AI &amp; Voice Systems</text>
        <text x="56" y="40" class="text-body" font-size="11">Gemini API orchestration, speech engines &amp; tool calling</text>
      </g>

      <!-- Item 3: Motion & UI Polish -->
      <g transform="translate(0, 128)">
        <rect x="0" y="0" width="362" height="54" rx="10" fill="#0e172a" stroke="#059669" stroke-width="1"/>
        <circle cx="28" cy="27" r="16" fill="url(#sphere-3d-emerald)" filter="url(#soft-glow-filter)"/>
        <text x="21" y="33" font-size="14">⚡</text>
        <text x="56" y="23" class="text-head" font-size="13" fill="#ffffff">120Hz Motion &amp; Systems Performance</text>
        <text x="56" y="40" class="text-body" font-size="11">Fluid reactive UI, memory profiling &amp; ExoPlayer cache</text>
      </g>

      <!-- Item 4: Cloud & DevOps -->
      <g transform="translate(0, 192)">
        <rect x="0" y="0" width="362" height="54" rx="10" fill="#0e172a" stroke="#7c3aed" stroke-width="1"/>
        <circle cx="28" cy="27" r="16" fill="url(#sphere-3d-purple)" filter="url(#soft-glow-filter)"/>
        <text x="21" y="33" font-size="14">🛠️</text>
        <text x="56" y="23" class="text-head" font-size="13" fill="#ffffff">DevOps &amp; Infrastructure</text>
        <text x="56" y="40" class="text-body" font-size="11">GitHub CI/CD workflows, Docker, Linux &amp; Gradle</text>
      </g>
    </g>
  </g>

  <!-- Right Side: 3D Animated Interests Carousel Changing Every 4s with Segment Bars -->
  <g transform="translate(472, 38)">
    <rect x="0" y="0" width="410" height="364" rx="18" class="inner-card-3d" stroke="#e11d48" stroke-width="1.2"/>

    <!-- Header & 3-Part Progress Bars -->
    <g transform="translate(24, 28)">
      <text x="0" y="0" class="text-mono" font-size="11" fill="#ff0055" font-weight="800" letter-spacing="0.1em">INTERESTS // 3D CAROUSEL (4s / SLIDE)</text>
      <text x="0" y="26" class="text-head" font-size="22">Passions &amp; Active Frontiers</text>

      <!-- Segment Progress Bars (3 segments) -->
      <g transform="translate(0, 42)">
        <!-- Bar 1 (0-4s) -->
        <rect x="0" y="0" width="112" height="5" rx="2.5" fill="#1e293b"/>
        <rect x="0" y="0" width="0" height="5" rx="2.5" fill="#00f5ff" class="bar-prog-1" filter="url(#soft-glow-filter)"/>

        <!-- Bar 2 (4-8s) -->
        <rect x="124" y="0" width="112" height="5" rx="2.5" fill="#1e293b"/>
        <rect x="124" y="0" width="0" height="5" rx="2.5" fill="#ff0055" class="bar-prog-2" filter="url(#soft-glow-filter)"/>

        <!-- Bar 3 (8-12s) -->
        <rect x="248" y="0" width="112" height="5" rx="2.5" fill="#1e293b"/>
        <rect x="248" y="0" width="0" height="5" rx="2.5" fill="#a855f7" class="bar-prog-3" filter="url(#soft-glow-filter)"/>
      </g>
    </g>

    <!-- Slide Container with Cycling 3D Cards -->
    <g transform="translate(24, 118)">
      <!-- Slide 1: The Ultimate JARVIS (0-4s) -->
      <g class="slide-3d-1">
        <rect x="0" y="0" width="362" height="215" rx="14" fill="#0c1429" stroke="#00f5ff" stroke-width="1.5" filter="url(#shadow-3d)"/>
        <g transform="translate(22, 26)">
          <text x="0" y="0" class="text-mono" font-size="11" fill="#00f5ff" font-weight="800">SLIDE 01 / 03 • AI SYSTEMS</text>
          <text x="0" y="28" class="text-head" font-size="20" fill="#ffffff">The Ultimate JARVIS Voice AI</text>
          <text x="0" y="60" class="text-body" font-size="13">
            Engineered an autonomous Android voice assistant
          </text>
          <text x="0" y="82" class="text-body" font-size="13">
            featuring sub-second speech recognition, Gemini API
          </text>
          <text x="0" y="104" class="text-body" font-size="13">
            tool calling, and hands-free device automation.
          </text>

          <g transform="translate(0, 134)">
            <rect x="0" y="0" width="85" height="26" rx="6" fill="#13203c" stroke="#00f5ff" stroke-width="1"/>
            <text x="14" y="17" class="text-mono" font-size="11" fill="#38bdf8" font-weight="700">Kotlin</text>

            <rect x="95" y="0" width="105" height="26" rx="6" fill="#13203c" stroke="#ff0055" stroke-width="1"/>
            <text x="107" y="17" class="text-mono" font-size="11" fill="#ff6b81" font-weight="700">Gemini AI</text>

            <rect x="210" y="0" width="100" height="26" rx="6" fill="#13203c" stroke="#00ff9d" stroke-width="1"/>
            <text x="222" y="17" class="text-mono" font-size="11" fill="#4ade80" font-weight="700">Speech Core</text>
          </g>
        </g>
      </g>

      <!-- Slide 2: MovieBox Streaming (4-8s) -->
      <g class="slide-3d-2" opacity="0">
        <rect x="0" y="0" width="362" height="215" rx="14" fill="#0c1429" stroke="#ff0055" stroke-width="1.5" filter="url(#shadow-3d)"/>
        <g transform="translate(22, 26)">
          <text x="0" y="0" class="text-mono" font-size="11" fill="#ff0055" font-weight="800">SLIDE 02 / 03 • STREAMING ARCHITECTURE</text>
          <text x="0" y="28" class="text-head" font-size="20" fill="#ffffff">MovieBox Streaming Engine</text>
          <text x="0" y="60" class="text-body" font-size="13">
            Modern Android entertainment streaming player
          </text>
          <text x="0" y="82" class="text-body" font-size="13">
            built with Jetpack Compose declarative UI, ExoPlayer,
          </text>
          <text x="0" y="104" class="text-body" font-size="13">
            chunked video preloading, and dynamic caching.
          </text>

          <g transform="translate(0, 134)">
            <rect x="0" y="0" width="140" height="26" rx="6" fill="#13203c" stroke="#38bdf8" stroke-width="1"/>
            <text x="12" y="17" class="text-mono" font-size="11" fill="#38bdf8" font-weight="700">Jetpack Compose</text>

            <rect x="150" y="0" width="95" height="26" rx="6" fill="#13203c" stroke="#fbbf24" stroke-width="1"/>
            <text x="162" y="17" class="text-mono" font-size="11" fill="#fbbf24" font-weight="700">ExoPlayer</text>

            <rect x="255" y="0" width="65" height="26" rx="6" fill="#13203c" stroke="#c084fc" stroke-width="1"/>
            <text x="267" y="17" class="text-mono" font-size="11" fill="#c084fc" font-weight="700">Cache</text>
          </g>
        </g>
      </g>

      <!-- Slide 3: Mountain Explorations & Craft (8-12s) -->
      <g class="slide-3d-3" opacity="0">
        <rect x="0" y="0" width="362" height="215" rx="14" fill="#0c1429" stroke="#a855f7" stroke-width="1.5" filter="url(#shadow-3d)"/>
        <g transform="translate(22, 26)">
          <text x="0" y="0" class="text-mono" font-size="11" fill="#a855f7" font-weight="800">SLIDE 03 / 03 • EXPLORATION &amp; LENS</text>
          <text x="0" y="28" class="text-head" font-size="20" fill="#ffffff">Mountain Trails &amp; Photography</text>
          <text x="0" y="60" class="text-body" font-size="13">
            Exploring sunrise peaks, misty mountain ranges,
          </text>
          <text x="0" y="82" class="text-body" font-size="13">
            and translating the discipline of the outdoors into
          </text>
          <text x="0" y="104" class="text-body" font-size="13">
            pristine software architecture and visual detail.
          </text>

          <g transform="translate(0, 134)">
            <rect x="0" y="0" width="115" height="26" rx="6" fill="#13203c" stroke="#38bdf8" stroke-width="1"/>
            <text x="14" y="17" class="text-mono" font-size="11" fill="#38bdf8" font-weight="700">Photography</text>

            <rect x="125" y="0" width="95" height="26" rx="6" fill="#13203c" stroke="#10b981" stroke-width="1"/>
            <text x="137" y="17" class="text-mono" font-size="11" fill="#10b981" font-weight="700">Trekking</text>

            <rect x="230" y="0" width="90" height="26" rx="6" fill="#13203c" stroke="#ff0055" stroke-width="1"/>
            <text x="242" y="17" class="text-mono" font-size="11" fill="#ff6b81" font-weight="700">Aesthetics</text>
          </g>
        </g>
      </g>
    </g>
  </g>
</svg>`;

// ==========================================
// 3. STACK.SVG (TRUE 3D PLANETARY GALAXY)
// ==========================================
const stackSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 920 480" width="100%" height="100%">
  <style>
    @media (prefers-reduced-motion: reduce) {
      .orbit-spin-3d, .core-pulse-3d, .star-twinkle {
        animation: none !important;
      }
    }

    .bg-space { fill: #040711; }
    .text-title { font-family: ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; font-weight: 900; fill: #ffffff; }
    .text-mono { font-family: ui-monospace, SFMono-Regular, "JetBrains Mono", Menlo, monospace; }
    .chip-3d { fill: #0b1428; stroke: #1e293b; stroke-width: 1.2px; rx: 8px; }
    .chip-text { font-family: ui-monospace, SFMono-Regular, monospace; font-size: 11px; fill: #ffffff; font-weight: 700; }

    /* Orbital Rotations in 3D Perspective */
    @keyframes orbit3D_1 {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    @keyframes orbit3D_2 {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(-360deg); }
    }
    @keyframes orbit3D_3 {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .orbit-layer-1 { transform-origin: 460px 185px; animation: orbit3D_1 22s linear infinite; }
    .orbit-layer-2 { transform-origin: 460px 185px; animation: orbit3D_2 30s linear infinite; }
    .orbit-layer-3 { transform-origin: 460px 185px; animation: orbit3D_3 42s linear infinite; }

    /* Core Pulsing Reactor */
    @keyframes coreGlow {
      0%, 100% { r: 34px; filter: drop-shadow(0 0 15px #00f5ff); }
      50% { r: 38px; filter: drop-shadow(0 0 35px #ff0055); }
    }
    .core-pulse-3d { animation: coreGlow 4s ease-in-out infinite; }
  </style>

  ${common3dDefs}

  <!-- Canvas Container with 3D Border -->
  <rect x="8" y="8" width="904" height="464" rx="24" class="bg-space"/>
  <rect x="8" y="8" width="904" height="464" rx="24" fill="url(#grid-3d)"/>
  <rect x="8" y="8" width="904" height="464" rx="24" fill="none" stroke="url(#border-neon-3d)" stroke-width="2"/>

  <!-- Header -->
  <g transform="translate(48, 38)">
    <text x="0" y="0" class="text-mono" font-size="11" fill="#00f5ff" font-weight="800" letter-spacing="0.1em">SECTION 03 // ARCHITECTURAL TOOLKIT</text>
    <text x="0" y="26" class="text-title" font-size="24">Three-Tier Orbital 3D Tech Matrix</text>
  </g>

  <!-- 3D ORBITAL SOLAR SYSTEM (Center: 460, 185) -->
  <g id="galaxy-core">
    <!-- Starfield Particles -->
    <circle cx="200" cy="110" r="1.5" fill="#00f5ff" opacity="0.6"/>
    <circle cx="720" cy="130" r="2" fill="#ff0055" opacity="0.5"/>
    <circle cx="310" cy="240" r="1.2" fill="#ffffff" opacity="0.8"/>
    <circle cx="620" cy="260" r="1.8" fill="#00ff9d" opacity="0.7"/>

    <!-- Central AI Star Reactor -->
    <circle cx="460" cy="185" r="45" fill="url(#neon-cyan-glow)" opacity="0.4" filter="url(#hyper-glow)"/>
    <circle cx="460" cy="185" r="34" fill="#0b1329" stroke="url(#border-neon-3d)" stroke-width="2.5" class="core-pulse-3d"/>
    <circle cx="460" cy="185" r="26" fill="url(#sphere-3d-cyan)"/>
    <text x="460" y="181" text-anchor="middle" class="text-mono" font-size="11" fill="#ffffff" font-weight="900">SUKANT</text>
    <text x="460" y="195" text-anchor="middle" class="text-mono" font-size="9" fill="#ff0055" font-weight="900">AI-CORE</text>

    <!-- Orbit 1 (Inner 3D Tilted Ellipse: Mobile Core) -->
    <ellipse cx="460" cy="185" rx="155" ry="62" fill="none" stroke="#00f5ff" stroke-width="1.8" stroke-dasharray="6,4" opacity="0.7" transform="rotate(-12 460 185)"/>
    <g class="orbit-layer-1">
      <!-- 3D Kotlin Sphere -->
      <g transform="translate(325, 155)">
        <circle cx="18" cy="18" r="20" fill="url(#sphere-3d-purple)" filter="url(#soft-glow-filter)"/>
        <text x="18" y="23" text-anchor="middle" class="text-mono" font-size="12" fill="#ffffff" font-weight="900">K</text>
      </g>
      <!-- 3D Android Sphere -->
      <g transform="translate(575, 175)">
        <circle cx="18" cy="18" r="20" fill="url(#sphere-3d-emerald)" filter="url(#soft-glow-filter)"/>
        <text x="18" y="23" text-anchor="middle" class="text-mono" font-size="10" fill="#ffffff" font-weight="900">AND</text>
      </g>
    </g>

    <!-- Orbit 2 (Middle 3D Tilted Ellipse: Intelligence & AI) -->
    <ellipse cx="460" cy="185" rx="255" ry="92" fill="none" stroke="#ff0055" stroke-width="1.8" stroke-dasharray="8,6" opacity="0.6" transform="rotate(14 460 185)"/>
    <g class="orbit-layer-2">
      <!-- 3D Python Sphere -->
      <g transform="translate(230, 130)">
        <circle cx="18" cy="18" r="20" fill="url(#sphere-3d-cyan)" filter="url(#soft-glow-filter)"/>
        <text x="18" y="23" text-anchor="middle" class="text-mono" font-size="11" fill="#ffffff" font-weight="900">PY</text>
      </g>
      <!-- 3D Gemini AI Sphere -->
      <g transform="translate(660, 150)">
        <circle cx="18" cy="18" r="20" fill="url(#sphere-3d-crimson)" filter="url(#soft-glow-filter)"/>
        <text x="18" y="23" text-anchor="middle" class="text-mono" font-size="10" fill="#ffffff" font-weight="900">AI</text>
      </g>
      <!-- 3D PyTorch Sphere -->
      <g transform="translate(430, 260)">
        <circle cx="18" cy="18" r="18" fill="url(#sphere-3d-crimson)" filter="url(#soft-glow-filter)"/>
        <text x="18" y="23" text-anchor="middle" class="text-mono" font-size="9" fill="#ffffff" font-weight="900">TORCH</text>
      </g>
    </g>

    <!-- Orbit 3 (Outer 3D Tilted Ellipse: DevOps & Systems) -->
    <ellipse cx="460" cy="185" rx="365" ry="118" fill="none" stroke="#a855f7" stroke-width="1.5" stroke-dasharray="10,8" opacity="0.45" transform="rotate(-8 460 185)"/>
    <g class="orbit-layer-3">
      <!-- 3D Git Sphere -->
      <g transform="translate(120, 160)">
        <circle cx="18" cy="18" r="18" fill="url(#sphere-3d-crimson)"/>
        <text x="18" y="23" text-anchor="middle" class="text-mono" font-size="10" fill="#ffffff" font-weight="900">GIT</text>
      </g>
      <!-- 3D Docker Sphere -->
      <g transform="translate(770, 185)">
        <circle cx="18" cy="18" r="18" fill="url(#sphere-3d-cyan)"/>
        <text x="18" y="23" text-anchor="middle" class="text-mono" font-size="9" fill="#ffffff" font-weight="900">DOC</text>
      </g>
      <!-- 3D Jetpack Compose Sphere -->
      <g transform="translate(360, 68)">
        <circle cx="18" cy="18" r="18" fill="url(#sphere-3d-cyan)"/>
        <text x="18" y="23" text-anchor="middle" class="text-mono" font-size="9" fill="#ffffff" font-weight="900">CMP</text>
      </g>
    </g>
  </g>

  <!-- Bottom Grouped Stack Chips in 3 Pillars with 3D Bevels -->
  <g transform="translate(48, 336)">
    <!-- Column 1: Mobile Core -->
    <g transform="translate(0, 0)">
      <text x="0" y="0" class="text-mono" font-size="11" fill="#c084fc" font-weight="800">MOBILE ECOSYSTEM</text>
      <g transform="translate(0, 14)">
        <rect x="0" y="0" width="80" height="28" class="chip-3d" stroke="#a855f7"/>
        <text x="14" y="19" class="chip-text" fill="#c084fc">Kotlin</text>

        <rect x="88" y="0" width="85" height="28" class="chip-3d" stroke="#00ff9d"/>
        <text x="100" y="19" class="chip-text" fill="#00ff9d">Android</text>

        <rect x="181" y="0" width="85" height="28" class="chip-3d" stroke="#00f5ff"/>
        <text x="193" y="19" class="chip-text" fill="#00f5ff">Compose</text>

        <rect x="0" y="36" width="95" height="28" class="chip-3d"/>
        <text x="12" y="55" class="chip-text">Coroutines</text>

        <rect x="103" y="36" width="80" height="28" class="chip-3d"/>
        <text x="115" y="55" class="chip-text">ExoPlayer</text>

        <rect x="191" y="36" width="75" height="28" class="chip-3d"/>
        <text x="203" y="55" class="chip-text">Retrofit</text>
      </g>
    </g>

    <!-- Column 2: AI & Neural -->
    <g transform="translate(285, 0)">
      <text x="0" y="0" class="text-mono" font-size="11" fill="#ff0055" font-weight="800">AI &amp; INTELLIGENCE</text>
      <g transform="translate(0, 14)">
        <rect x="0" y="0" width="90" height="28" class="chip-3d" stroke="#ff0055"/>
        <text x="14" y="19" class="chip-text" fill="#ff6b81">Gemini AI</text>

        <rect x="98" y="0" width="80" height="28" class="chip-3d" stroke="#00f5ff"/>
        <text x="110" y="19" class="chip-text" fill="#00f5ff">Python</text>

        <rect x="186" y="0" width="80" height="28" class="chip-3d"/>
        <text x="198" y="19" class="chip-text">PyTorch</text>

        <rect x="0" y="36" width="90" height="28" class="chip-3d"/>
        <text x="12" y="55" class="chip-text">Speech AI</text>

        <rect x="98" y="36" width="80" height="28" class="chip-3d"/>
        <text x="110" y="55" class="chip-text">FastAPI</text>

        <rect x="186" y="36" width="80" height="28" class="chip-3d"/>
        <text x="198" y="55" class="chip-text">Agents</text>
      </g>
    </g>

    <!-- Column 3: DevOps & Infra -->
    <g transform="translate(570, 0)">
      <text x="0" y="0" class="text-mono" font-size="11" fill="#00f5ff" font-weight="800">DEVOPS &amp; TOOLING</text>
      <g transform="translate(0, 14)">
        <rect x="0" y="0" width="70" height="28" class="chip-3d" stroke="#f05032"/>
        <text x="14" y="19" class="chip-text" fill="#fca5a5">Git</text>

        <rect x="78" y="0" width="88" height="28" class="chip-3d" stroke="#00f5ff"/>
        <text x="90" y="19" class="chip-text" fill="#38bdf8">GitHub CI</text>

        <rect x="174" y="0" width="80" height="28" class="chip-3d"/>
        <text x="186" y="19" class="chip-text">Docker</text>

        <rect x="0" y="36" width="80" height="28" class="chip-3d"/>
        <text x="14" y="55" class="chip-text">Linux</text>

        <rect x="88" y="36" width="80" height="28" class="chip-3d"/>
        <text x="100" y="55" class="chip-text">Gradle</text>

        <rect x="176" y="36" width="90" height="28" class="chip-3d"/>
        <text x="188" y="55" class="chip-text">TypeScript</text>
      </g>
    </g>
  </g>
</svg>`;

// ==========================================
// 4. ID-DASHBOARD.SVG (3D PENDULUM SWING & SCANNER)
// ==========================================
const idDashboardSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 920 460" width="100%" height="100%">
  <style>
    @media (prefers-reduced-motion: reduce) {
      .lanyard-rig-3d, .foil-layer, .laser-scanner {
        animation: none !important;
      }
    }

    .bg-main { fill: #040711; }
    .text-title { font-family: ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; font-weight: 900; fill: #ffffff; }
    .text-mono { font-family: ui-monospace, SFMono-Regular, "JetBrains Mono", Menlo, monospace; }
    .card-panel-3d { fill: #0a1124; stroke: #1e293b; stroke-width: 1.2px; }

    /* Lanyard Damped Drop Entrance + Perpetual 3D Pendulum Swing (+/-1.7 deg) */
    @keyframes lanyard3dEntrance {
      0% { transform: translateY(-90px) rotate(16deg); opacity: 0; }
      20% { transform: translateY(0px) rotate(-11deg); opacity: 1; }
      40% { transform: translateY(0px) rotate(6deg); }
      60% { transform: translateY(0px) rotate(-3deg); }
      80% { transform: translateY(0px) rotate(1.7deg); }
      90% { transform: translateY(0px) rotate(-1.7deg); }
      100% { transform: translateY(0px) rotate(1.7deg); }
    }

    @keyframes perpetual3dSwing {
      0%, 100% { transform: rotate(-1.7deg); }
      50% { transform: rotate(1.7deg); }
    }

    .lanyard-rig-3d {
      transform-origin: 180px 10px;
      animation: lanyard3dEntrance 2.5s cubic-bezier(0.25, 1, 0.5, 1) forwards, perpetual3dSwing 4s ease-in-out infinite 2.5s;
    }

    /* 3D Barcode Scanning Laser */
    @keyframes barcodeScan {
      0%, 100% { transform: translateY(0); opacity: 0.9; }
      50% { transform: translateY(22px); opacity: 0.9; }
    }
    .laser-scanner { animation: barcodeScan 2s ease-in-out infinite; }
  </style>

  ${common3dDefs}

  <clipPath id="lanyard-photo-3d">
    <rect x="0" y="0" width="160" height="150" rx="14"/>
  </clipPath>

  <!-- Container with 3D Border -->
  <rect x="8" y="8" width="904" height="444" rx="24" class="bg-main"/>
  <rect x="8" y="8" width="904" height="444" rx="24" fill="url(#grid-3d)"/>
  <rect x="8" y="8" width="904" height="444" rx="24" fill="none" stroke="url(#border-neon-3d)" stroke-width="2"/>

  <!-- LEFT: 3D HANGING LANYARD BADGE WITH METALLIC RIG -->
  <g class="lanyard-rig-3d">
    <!-- Nylon Ribbon Straps with Specular Line -->
    <path d="M 140 -20 L 170 60 L 180 60 L 150 -20 Z" fill="#0080ff" opacity="0.85"/>
    <path d="M 220 -20 L 190 60 L 180 60 L 210 -20 Z" fill="#1d4ed8" opacity="0.85"/>
    <line x1="175" y1="-20" x2="185" y2="60" stroke="#ff0055" stroke-width="2.5" opacity="0.8"/>

    <!-- 3D Metal Clasp Rig -->
    <rect x="168" y="55" width="24" height="22" rx="4" fill="#94a3b8" stroke="#cbd5e1" stroke-width="1.2"/>
    <rect x="172" y="57" width="6" height="18" fill="#ffffff" opacity="0.9"/>
    <circle cx="180" cy="85" r="9" fill="none" stroke="#e2e8f0" stroke-width="3.5"/>
    <rect x="170" y="94" width="20" height="6" rx="3" fill="#040711"/>

    <!-- 3D Holographic ID Card -->
    <g transform="translate(75, 90)">
      <rect x="0" y="0" width="210" height="320" rx="18" fill="#091022" stroke="url(#border-neon-3d)" stroke-width="2" filter="url(#shadow-3d)"/>
      <rect x="4" y="4" width="202" height="312" rx="15" fill="#0d162d"/>

      <!-- Header Banner -->
      <rect x="4" y="4" width="202" height="38" rx="14" fill="#142142"/>
      <circle cx="24" cy="23" r="5" fill="#00ff9d" filter="url(#soft-glow-filter)"/>
      <text x="36" y="27" class="text-mono" font-size="11" fill="#ffffff" font-weight="800">DEV // PASS ID</text>
      <text x="165" y="27" class="text-mono" font-size="9" fill="#00f5ff" font-weight="700">2026</text>

      <!-- Real Portrait with Holographic Rainbow Sweep -->
      <g transform="translate(25, 52)">
        <rect x="0" y="0" width="160" height="150" rx="14" fill="#040711" stroke="#00f5ff" stroke-width="1.2"/>
        <g clip-path="url(#lanyard-photo-3d)">
          <image href="${idPngBase64}" x="-10" y="-10" width="180" height="180" preserveAspectRatio="xMidYMid slice"/>
          <rect x="0" y="0" width="160" height="150" fill="url(#holo-rainbow)" style="mix-blend-mode: screen;"/>
        </g>
      </g>

      <!-- Developer Details -->
      <g transform="translate(25, 218)">
        <text x="0" y="0" class="text-title" font-size="14" fill="#ffffff">SUKANT</text>
        <text x="0" y="16" class="text-title" font-size="12" fill="#00f5ff">BHATTACHARYA</text>
        <text x="0" y="32" class="text-mono" font-size="10" fill="#cbd5e1">Android &amp; AI Architect</text>
        <text x="0" y="46" class="text-mono" font-size="9" fill="#ff0055" font-weight="700">ROLE: FULL-STACK / MOBILE</text>
      </g>

      <!-- 3D Barcode Visualizer with Green Laser Sweep -->
      <g transform="translate(25, 275)">
        <rect x="0" y="0" width="160" height="26" fill="#040711" rx="5" stroke="#1e293b" stroke-width="1"/>
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
        <!-- Animated 3D Laser Beam -->
        <g class="laser-scanner">
          <line x1="0" y1="2" x2="160" y2="2" stroke="#00ff9d" stroke-width="2" filter="url(#soft-glow-filter)"/>
        </g>
      </g>
    </g>
  </g>

  <!-- RIGHT: PRODUCTION REPOSITORIES & METRICS -->
  <g transform="translate(340, 38)">
    <text x="0" y="0" class="text-mono" font-size="11" fill="#ff0055" font-weight="800" letter-spacing="0.1em">SECTION 04 // VERIFIED PROFILE METRICS</text>
    <text x="0" y="26" class="text-title" font-size="24">Production Repositories &amp; Credentials</text>

    <!-- 2 Featured Repo Cards -->
    <g transform="translate(0, 52)">
      <!-- Card 1: The Ultimate JARVIS -->
      <g transform="translate(0, 0)">
        <rect x="0" y="0" width="530" height="98" rx="14" class="card-panel-3d" stroke="#00f5ff" stroke-width="1.5" filter="url(#shadow-3d)"/>
        <g transform="translate(22, 20)">
          <text x="0" y="0" class="text-mono" font-size="10" fill="#00f5ff" font-weight="800">FEATURED REPO 01 // AUTONOMOUS AI</text>
          <text x="0" y="24" class="text-title" font-size="19" fill="#ffffff">The Ultimate JARVIS</text>
          <text x="0" y="44" class="text-muted" font-size="12" fill="#94a3b8">
            Android Voice Assistant powered by Gemini API, speech recognition &amp; device execution.
          </text>

          <g transform="translate(0, 56)">
            <rect x="0" y="0" width="65" height="20" rx="5" fill="#13203c" stroke="#a855f7" stroke-width="1"/>
            <text x="10" y="14" class="text-mono" font-size="10" fill="#c084fc" font-weight="700">Kotlin</text>

            <rect x="73" y="0" width="95" height="20" rx="5" fill="#13203c" stroke="#ff0055" stroke-width="1"/>
            <text x="81" y="14" class="text-mono" font-size="10" fill="#ff6b81" font-weight="700">Gemini API</text>

            <rect x="176" y="0" width="90" height="20" rx="5" fill="#13203c" stroke="#00ff9d" stroke-width="1"/>
            <text x="184" y="14" class="text-mono" font-size="10" fill="#34d399" font-weight="700">Production</text>
          </g>

          <text x="475" y="24" class="text-mono" font-size="16" fill="#00f5ff">↗</text>
        </g>
      </g>

      <!-- Card 2: MovieBox -->
      <g transform="translate(0, 114)">
        <rect x="0" y="0" width="530" height="98" rx="14" class="card-panel-3d" stroke="#ff0055" stroke-width="1.5" filter="url(#shadow-3d)"/>
        <g transform="translate(22, 20)">
          <text x="0" y="0" class="text-mono" font-size="10" fill="#ff0055" font-weight="800">FEATURED REPO 02 // STREAMING &amp; COMPOSE</text>
          <text x="0" y="24" class="text-title" font-size="19" fill="#ffffff">MovieBox Streaming Engine</text>
          <text x="0" y="44" class="text-muted" font-size="12" fill="#94a3b8">
            Modern media player built with Jetpack Compose, ExoPlayer, and reactive architecture.
          </text>

          <g transform="translate(0, 56)">
            <rect x="0" y="0" width="125" height="20" rx="5" fill="#13203c" stroke="#38bdf8" stroke-width="1"/>
            <text x="10" y="14" class="text-mono" font-size="10" fill="#38bdf8" font-weight="700">Jetpack Compose</text>

            <rect x="133" y="0" width="85" height="20" rx="5" fill="#13203c" stroke="#fbbf24" stroke-width="1"/>
            <text x="141" y="14" class="text-mono" font-size="10" fill="#fbbf24" font-weight="700">ExoPlayer</text>

            <rect x="226" y="0" width="70" height="20" rx="5" fill="#13203c" stroke="#00ff9d" stroke-width="1"/>
            <text x="234" y="14" class="text-mono" font-size="10" fill="#10b981" font-weight="700">Active</text>
          </g>

          <text x="475" y="24" class="text-mono" font-size="16" fill="#ff0055">↗</text>
        </g>
      </g>
    </g>

    <!-- Verified Stats Banner Row -->
    <g transform="translate(0, 286)">
      <rect x="0" y="0" width="530" height="72" rx="12" fill="#0b1328" stroke="#1e293b" stroke-width="1.2"/>
      <g transform="translate(24, 24)">
        <text x="0" y="0" class="text-mono" font-size="10" fill="#64748b" font-weight="700">CORE ARCHITECTURE</text>
        <text x="0" y="24" class="text-head" font-size="16" fill="#00f5ff">Kotlin &amp; AI First</text>

        <text x="170" y="0" class="text-mono" font-size="10" fill="#64748b" font-weight="700">SYSTEM STATUS</text>
        <text x="170" y="24" class="text-head" font-size="16" fill="#00ff9d">● ONLINE</text>

        <text x="340" y="0" class="text-mono" font-size="10" fill="#64748b" font-weight="700">VERIFIED DATE</text>
        <text x="340" y="24" class="text-head" font-size="16" fill="#ffffff">NOV 2026</text>
      </g>
    </g>
  </g>
</svg>`;

// ==========================================
// 5. CONNECT.SVG (3D PORTAL & POINTING HERO)
// ==========================================
const connectSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 920 400" width="100%" height="100%">
  <style>
    @media (prefers-reduced-motion: reduce) {
      .nudge-arrow-3d, .portal-ring, .character-hover {
        animation: none !important;
      }
    }

    .bg-main { fill: #040711; }
    .text-title { font-family: ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; font-weight: 900; fill: #ffffff; }
    .text-mono { font-family: ui-monospace, SFMono-Regular, "JetBrains Mono", Menlo, monospace; }
    .social-card-3d { fill: #0a1124; stroke: #1e293b; stroke-width: 1.5px; rx: 14px; }
    .social-card-3d:hover { stroke: #00f5ff; fill: #101c38; }

    /* Nudging 3D Arrow Animation */
    @keyframes nudge3D {
      0%, 100% { transform: translateX(0); }
      50% { transform: translateX(8px); }
    }
    .nudge-arrow-3d { animation: nudge3D 1.4s ease-in-out infinite; }

    /* Subtle 3D Character Float */
    @keyframes charHover {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-6px); }
    }
    .character-hover { animation: charHover 4.5s ease-in-out infinite; }

    /* Swirling 3D Portal Rings */
    @keyframes spinPortal {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    .portal-ring {
      transform-origin: 160px 220px;
      animation: spinPortal 12s linear infinite;
    }
  </style>

  ${common3dDefs}

  <!-- Canvas Container with 3D Border -->
  <rect x="8" y="8" width="904" height="384" rx="24" class="bg-main"/>
  <rect x="8" y="8" width="904" height="384" rx="24" fill="url(#grid-3d)"/>
  <rect x="8" y="8" width="904" height="384" rx="24" fill="none" stroke="url(#border-neon-3d)" stroke-width="2"/>

  <!-- LEFT: 3D PORTAL GATEWAY & REAL POINTING CHARACTER -->
  <g class="character-hover" transform="translate(15, 25)">
    <!-- Swirling 3D Portal Gateway -->
    <ellipse cx="160" cy="210" rx="145" ry="145" fill="none" stroke="#00f5ff" stroke-width="2.5" stroke-dasharray="24 16" class="portal-ring" opacity="0.6"/>
    <ellipse cx="160" cy="210" rx="125" ry="125" fill="none" stroke="#ff0055" stroke-width="2" stroke-dasharray="18 12" class="portal-ring" opacity="0.6" style="animation-direction: reverse; animation-duration: 18s;"/>
    <ellipse cx="160" cy="210" rx="140" ry="120" fill="url(#neon-cyan-glow)" opacity="0.3" filter="url(#hyper-glow)"/>

    <!-- Real Transparent Character Image pointing to viewer's RIGHT -->
    <image href="${pointingPngBase64}" x="0" y="0" width="290" height="350" preserveAspectRatio="xMidYMid meet"/>

    <!-- 3D Target Reticle at Pointing Fingertip -->
    <g transform="translate(275, 205)">
      <circle cx="0" cy="0" r="16" fill="none" stroke="#00f5ff" stroke-width="2" stroke-dasharray="6 3" class="portal-ring"/>
      <circle cx="0" cy="0" r="7" fill="#00f5ff" filter="url(#soft-glow-filter)"/>
      <path d="M 14 0 L 32 0 M 24 -6 L 32 0 L 24 6" stroke="#00f5ff" stroke-width="3" fill="none" class="nudge-arrow-3d"/>
    </g>
  </g>

  <!-- RIGHT: GENEROUSLY SPACED 3D SOCIAL CARDS -->
  <g transform="translate(325, 36)">
    <text x="0" y="0" class="text-mono" font-size="11" fill="#00f5ff" font-weight="800" letter-spacing="0.1em">SECTION 05 // LET'S COLLABORATE</text>
    <text x="0" y="24" class="text-title" font-size="22">Connect With Sukant</text>

    <!-- Social Cards Grid -->
    <g transform="translate(0, 44)">
      <!-- Card 1: GitHub -->
      <g transform="translate(0, 0)">
        <rect x="0" y="0" width="550" height="54" class="social-card-3d" stroke="#00f5ff" filter="url(#shadow-3d)"/>
        <circle cx="28" cy="27" r="16" fill="#142142"/>
        <path d="M 28 18 C 23.5 18 20 21.5 20 26 C 20 29.5 22.3 32.5 25.5 33.6 C 25.9 33.7 26 33.4 26 33.2 L 26 31.6 C 23.8 32 23.3 30.8 23.3 30.8 C 22.9 29.8 22.4 29.6 22.4 29.6 C 21.7 29.1 22.5 29.1 22.5 29.1 C 23.3 29.2 23.7 29.9 23.7 29.9 C 24.4 31.1 25.5 30.7 26 30.5 C 26.1 30 26.3 29.6 26.5 29.4 C 24.7 29.2 22.8 28.5 22.8 25.4 C 22.8 24.5 23.1 23.8 23.7 23.2 C 23.6 23 23.3 22.2 23.8 21.1 C 23.8 21.1 24.5 20.9 26 22 C 26.7 20.8 27.4 20.7 28.1 20.7 C 28.8 20.7 29.5 20.8 30.2 22 C 31.7 20.9 32.4 21.1 32.4 21.1 C 32.9 22.2 32.6 23 32.5 23.2 C 33.1 23.8 33.4 24.5 33.4 25.4 C 33.4 28.5 31.5 29.2 29.7 29.4 C 30 29.7 30.2 30.1 30.2 30.8 L 30.2 33.2 C 30.2 33.4 30.3 33.7 30.7 33.6 C 33.9 32.5 36.2 29.5 36.2 26 C 36.2 21.5 32.5 18 28 18 Z" fill="#ffffff"/>
        <text x="56" y="24" class="text-title" font-size="14" fill="#ffffff">GitHub</text>
        <text x="56" y="40" class="text-mono" font-size="11" fill="#93c5fd">github.com/sukantcodes</text>
        <g class="nudge-arrow-3d" transform="translate(515, 27)">
          <path d="M 0 0 L 10 0 M 5 -5 L 10 0 L 5 5" stroke="#00f5ff" stroke-width="2.5" fill="none"/>
        </g>
      </g>

      <!-- Card 2: LinkedIn -->
      <g transform="translate(0, 64)">
        <rect x="0" y="0" width="550" height="54" class="social-card-3d" stroke="#0a66c2"/>
        <circle cx="28" cy="27" r="16" fill="#0a66c2"/>
        <text x="28" y="33" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="15" fill="#ffffff">in</text>
        <text x="56" y="24" class="text-title" font-size="14" fill="#ffffff">LinkedIn</text>
        <text x="56" y="40" class="text-mono" font-size="11" fill="#94a3b8">Sukant Bhattacharya • Mobile &amp; AI Architect</text>
        <g class="nudge-arrow-3d" transform="translate(515, 27)">
          <path d="M 0 0 L 10 0 M 5 -5 L 10 0 L 5 5" stroke="#0a66c2" stroke-width="2.5" fill="none"/>
        </g>
      </g>

      <!-- Card 3: Direct Email (sukantxplodeprime@gmail.com) -->
      <g transform="translate(0, 128)">
        <rect x="0" y="0" width="550" height="54" class="social-card-3d" stroke="#ff0055" filter="url(#shadow-3d)"/>
        <circle cx="28" cy="27" r="16" fill="#ff0055"/>
        <text x="28" y="32" text-anchor="middle" font-size="13">✉️</text>
        <text x="56" y="24" class="text-title" font-size="14" fill="#ffffff">Direct Inquiries &amp; Projects</text>
        <text x="56" y="40" class="text-mono" font-size="11" fill="#fca5a5" font-weight="700">sukantxplodeprime@gmail.com</text>
        <g class="nudge-arrow-3d" transform="translate(515, 27)">
          <path d="M 0 0 L 10 0 M 5 -5 L 10 0 L 5 5" stroke="#ff0055" stroke-width="2.5" fill="none"/>
        </g>
      </g>

      <!-- Card 4: 1:1 Mentorship & System Architecture -->
      <g transform="translate(0, 192)">
        <rect x="0" y="0" width="550" height="54" class="social-card-3d" stroke="#f59e0b"/>
        <circle cx="28" cy="27" r="16" fill="#f59e0b"/>
        <text x="28" y="32" text-anchor="middle" font-size="13">⚡</text>
        <text x="56" y="24" class="text-title" font-size="14" fill="#ffffff">Mentorship &amp; System Architecture</text>
        <text x="56" y="40" class="text-mono" font-size="11" fill="#fde68a">Mobile Engineering • Voice AI • Code Reviews</text>
        <g class="nudge-arrow-3d" transform="translate(515, 27)">
          <path d="M 0 0 L 10 0 M 5 -5 L 10 0 L 5 5" stroke="#f59e0b" stroke-width="2.5" fill="none"/>
        </g>
      </g>
    </g>
  </g>
</svg>`;

// Write all updated 3D animated SVGs
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

console.log('✅ All 5 supercharged 3D animated SVGs generated!');

// Update README.md
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

[![GitHub](https://img.shields.io/badge/GitHub-sukantcodes-00f5ff?style=for-the-badge&logo=github&logoColor=black)](https://github.com/sukantcodes)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Sukant%20Bhattacharya-0a66c2?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/sukantcodes)
[![Email](https://img.shields.io/badge/Email-sukantxplodeprime%40gmail.com-ff0055?style=for-the-badge&logo=gmail&logoColor=white)](mailto:sukantxplodeprime@gmail.com)
[![Status](https://img.shields.io/badge/System-3D%20ACTIVE%20%26%20ONLINE-00ff9d?style=for-the-badge&logo=android&logoColor=black)](https://github.com/sukantcodes)

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

*Crafted with high-voltage 3D vectors for **@sukantcodes** — The Profile Playbook 3D Edition.*  
*Self-contained CSS + SMIL vector suite • Zero network requests • Mobile optimized.*

</div>
`;

fs.writeFileSync(path.join(rootDir, 'README.md'), readmeContent);
fs.writeFileSync(path.join(rootDir, 'public', 'README.md'), readmeContent);
console.log('✅ README.md updated with 3D badges!');

// Create updated profile-assets.zip
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

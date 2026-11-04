import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  Download,
  Copy,
  Check,
  ExternalLink,
  Layers,
  Clock,
  User,
  Image as ImageIcon,
  Code,
  Sparkles,
  Monitor,
  Smartphone,
  Tablet,
  Eye,
  FolderArchive,
  RotateCcw,
  Shield,
  FileText,
  Terminal as TerminalIcon,
  Send,
  Zap,
  Mic,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Compass,
  Cpu,
  Boxes,
  Activity,
  ArrowRight,
  ChevronRight,
  Radio,
  Share2,
  Lock,
  Flame,
  CheckCircle2,
  Sliders,
  Globe
} from 'lucide-react';

export default function App() {
  // Navigation & UI States
  const [activeSection, setActiveSection] = useState('hero');
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [bgTheme, setBgTheme] = useState<'navy' | 'checker' | 'github'>('navy');
  const [copied, setCopied] = useState(false);
  const [timelineSec, setTimelineSec] = useState<number | 'static'>(0);
  const [refreshKey, setRefreshKey] = useState(Date.now());
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [idCardFlipped, setIdCardFlipped] = useState(false);
  const [laserActive, setLaserActive] = useState(true);

  // 3D Parallax Tilt state for Hero
  const [heroTilt, setHeroTilt] = useState({ x: 0, y: 0 });

  // Terminal State
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    "SUKANT OS // v2026.11 [3D CYBERNETIC KERNEL]",
    "System status: 🟢 ALL 5 PLAYBOOK SVGs ONLINE & VERIFIED",
    "Type 'help' to inspect available system commands."
  ]);

  // Voice Assistant JARVIS Simulation State
  const [jarvisActive, setJarvisActive] = useState(false);
  const [jarvisLog, setJarvisLog] = useState("Standing by. Say or select a command below...");
  const [jarvisQuery, setJarvisQuery] = useState('');

  // Audio Context for Cyber Synth Sound Effects
  const audioCtxRef = useRef<AudioContext | null>(null);

  const playSynthBeep = (freq = 440, type: OscillatorType = 'sine', duration = 0.12) => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') ctx.resume();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Audio not permitted yet
    }
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#00f5ff', '#ff0055', '#a855f7', '#00ff9d', '#ffaa00']
    });
    playSynthBeep(880, 'triangle', 0.25);
  };

  const copyReadme = () => {
    navigator.clipboard.writeText(rawReadme);
    setCopied(true);
    triggerConfetti();
    setTimeout(() => setCopied(false), 2400);
  };

  const rawReadme = `# Hi there, I'm Sukant 👋

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

</div>`;

  // Hero Mouse Parallax Tracker
  const handleHeroMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 24;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -24;
    setHeroTilt({ x, y });
  };

  const handleHeroMouseLeave = () => {
    setHeroTilt({ x: 0, y: 0 });
  };

  // Terminal Command Runner
  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    if (!cmd) return;
    playSynthBeep(620, 'square', 0.08);

    const newLogs = [...terminalLogs, `> ${terminalInput}`];
    switch (cmd) {
      case 'help':
        newLogs.push(
          "Available commands:",
          "  help       - Show this command reference",
          "  skills     - View orbital tech stack breakdown",
          "  projects   - Show production repositories (JARVIS, MovieBox)",
          "  playbook   - Verify all 5 SVG vector cards",
          "  contact    - Print verified email & links",
          "  matrix     - Activate cyber matrix particle stream",
          "  download   - Download profile-assets.zip (1.36 MB)",
          "  clear      - Clear terminal window"
        );
        break;
      case 'skills':
        newLogs.push(
          "CORE TOOLKIT:",
          "  [Mobile] Kotlin, Jetpack Compose, Coroutines, Room, Retrofit",
          "  [AI]     Gemini API, PyTorch, Speech Recognition, Tool Calling",
          "  [Infra]  Git, GitHub Actions, Docker, Linux, Gradle"
        );
        break;
      case 'projects':
        newLogs.push(
          "PRODUCTION REPOS:",
          "  1. The Ultimate JARVIS (Android Voice AI + Gemini Agent)",
          "  2. MovieBox (Compose Streaming Client + ExoPlayer)",
          "  3. AI Systems Core (Python FastAPI + Speech Pipelines)"
        );
        break;
      case 'contact':
        newLogs.push(
          "CONTACT CHANNELS:",
          "  Email:    sukantxplodeprime@gmail.com",
          "  GitHub:   https://github.com/sukantcodes",
          "  LinkedIn: https://linkedin.com/in/sukantcodes"
        );
        break;
      case 'download':
        newLogs.push("⚡ Triggering download: profile-assets.zip...");
        triggerConfetti();
        window.location.href = '/profile-assets.zip';
        break;
      case 'matrix':
        newLogs.push("⚡ MATRIX STREAM ENGAGED: 01001011 01001111 01010100 01001100 01001001 01001110");
        triggerConfetti();
        break;
      case 'playbook':
        newLogs.push(
          "PLAYBOOK ASSETS:",
          "  01 / hero.svg          - Rising mask, 4 cycling roles, halo portrait",
          "  02 / about-life.svg    - Capabilities + 3-slide 4s carousel",
          "  03 / stack.svg         - 3 tilted 3D elliptical orbits + chips",
          "  04 / id-dashboard.svg  - Lanyard drop, +/-1.7° pendulum, barcode laser",
          "  05 / connect.svg       - Pointing character + neon social cards"
        );
        break;
      case 'clear':
        setTerminalLogs(["Terminal reset. Ready for commands."]);
        setTerminalInput('');
        return;
      default:
        newLogs.push(`Command not recognized: '${cmd}'. Type 'help' for commands.`);
    }

    setTerminalLogs(newLogs.slice(-18));
    setTerminalInput('');
  };

  // JARVIS Command Simulator
  const runJarvisCommand = (query: string, response: string) => {
    setJarvisActive(true);
    setJarvisQuery(query);
    setJarvisLog("Processing speech stream & running neural tool call...");
    playSynthBeep(520, 'sine', 0.15);

    setTimeout(() => {
      setJarvisLog(response);
      setJarvisActive(false);
      playSynthBeep(780, 'sine', 0.2);
    }, 1100);
  };

  const navLinks = [
    { id: 'hero', label: '01 / 3D Reactor' },
    { id: 'profile-suite', label: '02 / GitHub Playbook' },
    { id: 'galaxy', label: '03 / 3D Orbit Galaxy' },
    { id: 'projects', label: '04 / Repositories' },
    { id: 'lanyard', label: '05 / 3D Pass ID' },
    { id: 'photos', label: '06 / Real Photos' },
    { id: 'roadmap', label: '07 / 3D Roadmap' },
    { id: 'terminal', label: '08 / Cyber Console' },
    { id: 'connect', label: '09 / Transmission' }
  ];

  return (
    <div className="min-h-screen bg-[#030611] text-slate-100 selection:bg-[#00f5ff] selection:text-black relative overflow-x-hidden">
      {/* Background 3D Ambient Glowing Nebulae */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Top Cyan Orb */}
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-[#00f5ff]/20 via-[#0080ff]/10 to-transparent blur-[140px] animate-pulse-glow" />
        {/* Center Magenta Orb */}
        <div className="absolute top-[35%] -right-40 w-[700px] h-[700px] rounded-full bg-gradient-to-bl from-[#ff0055]/20 via-[#a855f7]/15 to-transparent blur-[160px] animate-pulse-glow" style={{ animationDelay: '2s' }} />
        {/* Bottom Emerald Orb */}
        <div className="absolute bottom-[10%] left-[20%] w-[550px] h-[550px] rounded-full bg-gradient-to-tr from-[#00ff9d]/15 via-[#00f5ff]/10 to-transparent blur-[140px] animate-pulse-glow" style={{ animationDelay: '4s' }} />
        {/* Subtle Scanline Overlay */}
        <div className="absolute inset-0 scanlines opacity-40" />
      </div>

      {/* Top Floating Cyber HUD Bar */}
      <header className="sticky top-0 z-50 px-4 lg:px-8 py-3 bg-[#040817]/85 backdrop-blur-md border-b border-cyan-500/20 box-glow-cyan">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#00f5ff] via-[#a855f7] to-[#ff0055] p-[2px] shadow-lg shadow-cyan-500/30">
              <div className="w-full h-full bg-[#040817] rounded-[10px] flex items-center justify-center font-black text-sm text-[#00f5ff] tracking-wider">
                3D
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base tracking-tight text-white neon-glow-cyan">
                  Sukant Codes
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                  @sukantcodes
                </span>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  Active Nov 2026
                </span>
              </div>
              <p className="text-[11px] font-mono text-slate-400 hidden sm:block">
                Long-Form 3D Cybernetic Portfolio • Native SMIL + Vector Universe
              </p>
            </div>
          </div>

          <div className="flex items-center flex-wrap gap-2.5">
            {/* Audio Synth Toggle */}
            <button
              onClick={() => {
                setSoundEnabled(!soundEnabled);
                playSynthBeep(580, 'sine', 0.15);
              }}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono transition ${
                soundEnabled
                  ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                  : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-slate-200'
              }`}
              title="Toggle Cyber Sound Effects"
            >
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-cyan-400" /> : <VolumeX className="w-3.5 h-3.5" />}
              <span>{soundEnabled ? 'FX: ON' : 'FX: OFF'}</span>
            </button>

            {/* Standalone preview.html link */}
            <a
              href="/preview.html"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 transition"
            >
              <Eye className="w-3.5 h-3.5 text-cyan-400" />
              <span>preview.html</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>

            {/* Copy README */}
            <button
              onClick={copyReadme}
              className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 transition active:scale-95"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-bold">README Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Copy README.md</span>
                </>
              )}
            </button>

            {/* Download Complete ZIP Package */}
            <a
              href="/profile-assets.zip"
              download="profile-assets.zip"
              onClick={triggerConfetti}
              className="inline-flex items-center gap-2 text-xs font-bold px-4 py-1.5 rounded-lg bg-gradient-to-r from-[#00f5ff] via-[#0080ff] to-[#ff0055] hover:opacity-90 text-black shadow-lg shadow-cyan-500/30 transition active:scale-95"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download ZIP (1.36 MB)</span>
            </a>
          </div>
        </div>

        {/* Section Fast-Scroll Ribbon */}
        <div className="max-w-7xl mx-auto mt-2.5 pt-2 border-t border-slate-800/60 flex items-center gap-2 overflow-x-auto no-scrollbar">
          {navLinks.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => {
                setActiveSection(item.id);
                playSynthBeep(480, 'sine', 0.05);
              }}
              className={`text-[11px] font-mono whitespace-nowrap px-3 py-1 rounded-md transition ${
                activeSection === item.id
                  ? 'bg-cyan-500/20 text-[#00f5ff] border border-cyan-500/40 font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>
      </header>

      {/* ============================================================== */}
      {/* SECTION 1: EPIC 3D CYBER REACTOR HERO (MOUSE PARALLAX TILT) */}
      {/* ============================================================== */}
      <section
        id="hero"
        className="relative min-h-[92vh] flex items-center justify-center px-4 lg:px-8 py-16 perspective-1000 overflow-hidden"
        onMouseMove={handleHeroMouseMove}
        onMouseLeave={handleHeroMouseLeave}
      >
        {/* Animated 3D Cyber Floor */}
        <div className="absolute bottom-0 left-0 right-0 h-96 cyber-grid-floor opacity-30 pointer-events-none" />

        <div
          className="max-w-6xl w-full mx-auto relative z-10 transition-transform duration-200 ease-out preserve-3d"
          style={{
            transform: `rotateX(${heroTilt.y}deg) rotateY(${heroTilt.x}deg)`
          }}
        >
          {/* Main Hero Card Chassis */}
          <div className="bg-[#050b1d]/80 backdrop-blur-xl border-2 border-cyan-500/40 rounded-3xl p-6 sm:p-12 box-glow-multi relative overflow-hidden">
            {/* Corner Tech Brackets */}
            <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-[#00f5ff]" />
            <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-[#ff0055]" />
            <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-[#ff0055]" />
            <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-[#00f5ff]" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: 3D Typography */}
              <div className="lg:col-span-7 space-y-6">
                {/* Tech Status Pill */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/50 box-glow-cyan">
                  <span className="w-2 h-2 rounded-full bg-[#00ff9d] animate-ping" />
                  <span className="text-xs font-mono text-[#00f5ff] font-bold">
                    SYSTEM // ANDROID ARCHITECT &amp; VOICE AI
                  </span>
                </div>

                {/* Extruded 3D Title */}
                <div>
                  <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-none">
                    <span className="block text-slate-200 drop-shadow-md">SUKANT</span>
                    <span className="block bg-gradient-to-r from-[#00f5ff] via-[#ffffff] to-[#ff0055] bg-clip-text text-transparent neon-glow-cyan animate-pulse">
                      BHATTACHARYA
                    </span>
                  </h1>
                  <p className="text-sm font-mono text-slate-400 mt-2">
                    <span className="text-cyan-400">@sukantcodes</span> • India / Global • Full-Stack Android &amp; Neural Intelligence
                  </p>
                </div>

                {/* Mission Statement */}
                <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
                  Architecting <strong className="text-cyan-300 font-semibold">autonomous AI voice assistants</strong>, high-performance media engines, and reactive Android apps built with{' '}
                  <strong className="text-purple-400 font-semibold">Kotlin</strong>, <strong className="text-emerald-400 font-semibold">Jetpack Compose</strong>, and neural tool-calling models.
                </p>

                {/* 4 Interactive Feature Highlights */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  <div className="bg-[#0b1428] p-3 rounded-xl border border-cyan-500/30 text-center">
                    <div className="text-xs font-mono text-cyan-400 font-bold">100%</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">Kotlin &amp; Compose</div>
                  </div>
                  <div className="bg-[#0b1428] p-3 rounded-xl border border-rose-500/30 text-center">
                    <div className="text-xs font-mono text-rose-400 font-bold">&lt; 300ms</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">JARVIS AI Voice</div>
                  </div>
                  <div className="bg-[#0b1428] p-3 rounded-xl border border-purple-500/30 text-center">
                    <div className="text-xs font-mono text-purple-400 font-bold">5 SVGs</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">Profile Playbook</div>
                  </div>
                  <div className="bg-[#0b1428] p-3 rounded-xl border border-emerald-500/30 text-center">
                    <div className="text-xs font-mono text-emerald-400 font-bold">0 Requests</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">Self-Contained</div>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <a
                    href="#profile-suite"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#00f5ff] to-[#0080ff] text-black font-extrabold text-sm shadow-xl shadow-cyan-500/30 hover:scale-105 transition"
                  >
                    <Sparkles className="w-4 h-4 text-black" />
                    <span>Explore 3D Playbook SVGs</span>
                  </a>

                  <a
                    href="#projects"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 text-sm font-semibold transition"
                  >
                    <Cpu className="w-4 h-4 text-rose-400" />
                    <span>Inspect Repositories</span>
                  </a>
                </div>
              </div>

              {/* Right Column: 3D Holographic Character & Gyro Rings */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative w-72 h-72 sm:w-80 sm:h-80 flex items-center justify-center animate-float-smooth">
                  {/* Outer Gyro Ring Cyan */}
                  <div className="absolute inset-0 rounded-full border-2 border-dashed border-cyan-400/60 animate-spin" style={{ animationDuration: '18s' }} />
                  {/* Middle Gyro Ring Crimson */}
                  <div className="absolute inset-3 rounded-full border-2 border-dashed border-rose-500/70 animate-spin" style={{ animationDuration: '24s', animationDirection: 'reverse' }} />
                  {/* Inner Gyro Ring Violet */}
                  <div className="absolute inset-7 rounded-full border border-purple-400/50 animate-spin" style={{ animationDuration: '32s' }} />

                  {/* 3D Glass Chassis */}
                  <div className="relative w-60 h-60 rounded-3xl bg-[#081024] p-3 border-2 border-cyan-400/50 box-glow-multi overflow-hidden">
                    <img
                      src="/assets/id.png"
                      alt="Sukant Bhattacharya Stylized 3D Portrait"
                      className="w-full h-full object-cover rounded-2xl"
                    />
                    {/* Rainbow Holographic Light Sweep */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent pointer-events-none" />
                  </div>

                  {/* Orbiting Badge */}
                  <div className="absolute -bottom-3 bg-[#040817] border border-cyan-400 px-4 py-1.5 rounded-full text-xs font-mono font-bold text-white shadow-lg flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>SUKANT // 3D-VERIFIED</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 2: GITHUB PROFILE PLAYBOOK SUITE (ALL 5 3D SVGS) */}
      {/* ============================================================== */}
      <section id="profile-suite" className="py-20 px-4 lg:px-8 max-w-7xl mx-auto space-y-8 relative">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-cyan-500/20 pb-5">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00f5ff] font-bold">
              <Boxes className="w-4 h-4" />
              <span>THE PROFILE PLAYBOOK // 5-CARD 3D VECTOR SUITE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1 neon-glow-cyan">
              Animated GitHub README Components
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              All 5 self-contained animated vector files required by the uploaded Playbook. Each card is rendered with 3D perspective depth, glowing neon gradients, and zero external network requests.
            </p>
          </div>

          {/* Controls Bar */}
          <div className="flex items-center flex-wrap gap-2.5">
            {/* Viewport Width Selector */}
            <div className="flex bg-slate-900 rounded-lg p-1 border border-slate-800">
              <button
                onClick={() => setViewport('desktop')}
                className={`px-3 py-1 text-xs rounded-md font-medium transition ${
                  viewport === 'desktop' ? 'bg-[#00f5ff] text-black font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Desktop
              </button>
              <button
                onClick={() => setViewport('tablet')}
                className={`px-3 py-1 text-xs rounded-md font-medium transition ${
                  viewport === 'tablet' ? 'bg-[#00f5ff] text-black font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Tablet
              </button>
              <button
                onClick={() => setViewport('mobile')}
                className={`px-3 py-1 text-xs rounded-md font-medium transition ${
                  viewport === 'mobile' ? 'bg-[#00f5ff] text-black font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Mobile
              </button>
            </div>

            {/* Background Theme Selector */}
            <div className="flex bg-slate-900 rounded-lg p-1 border border-slate-800">
              <button
                onClick={() => setBgTheme('navy')}
                className={`px-2.5 py-1 text-xs rounded-md transition ${
                  bgTheme === 'navy' ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'text-slate-400'
                }`}
              >
                Obsidian
              </button>
              <button
                onClick={() => setBgTheme('github')}
                className={`px-2.5 py-1 text-xs rounded-md transition ${
                  bgTheme === 'github' ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'text-slate-400'
                }`}
              >
                GitHub Dark
              </button>
              <button
                onClick={() => setBgTheme('checker')}
                className={`px-2.5 py-1 text-xs rounded-md transition ${
                  bgTheme === 'checker' ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'text-slate-400'
                }`}
              >
                Alpha Grid
              </button>
            </div>

            {/* Restart SMIL Loop */}
            <button
              onClick={() => {
                setRefreshKey(Date.now());
                playSynthBeep(520, 'triangle', 0.1);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-mono text-cyan-400 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Replay Loops</span>
            </button>
          </div>
        </div>

        {/* Timeline Scrubber Bookmarks (Page 2 Playbook Requirement: 0s, 2s, 5s, 9s, 13s) */}
        <div className="bg-[#070e22] border border-cyan-500/30 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
            <Clock className="w-4 h-4 text-cyan-400" />
            <span className="font-bold">Playbook Timeline Verification:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { sec: 0, label: '0s: Initial Drop' },
              { sec: 2, label: '2s: Settle & Reveal' },
              { sec: 5, label: '5s: Role & Slide 2' },
              { sec: 9, label: '9s: Slide 3 & Orbits' },
              { sec: 13, label: '13s: Seamless Loop' },
              { sec: 'static' as const, label: 'Static (Reduced Motion)' }
            ].map((item) => (
              <button
                key={String(item.sec)}
                onClick={() => {
                  setTimelineSec(item.sec);
                  setRefreshKey(Date.now());
                  playSynthBeep(440 + (typeof item.sec === 'number' ? item.sec * 30 : 0), 'sine', 0.08);
                }}
                className={`px-3 py-1 text-xs font-mono rounded-lg border transition ${
                  timelineSec === item.sec
                    ? 'bg-[#00f5ff] text-black border-[#00f5ff] font-bold shadow-md shadow-cyan-500/20'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* 5 Full Vector Showcase Cards */}
        <div className="space-y-10">
          {[
            {
              num: '01',
              title: 'Hero Brand Banner',
              file: 'hero.svg',
              features: 'Rising-mask reveal for SUKANT BHATTACHARYA • 4 cycling roles (12s loop) • Blinking terminal cursor • Embedded stylized portrait with dual 3D gyro rings • Scanning laser beam',
              accent: 'border-cyan-500/40'
            },
            {
              num: '02',
              title: 'Capabilities & 3-Slide Carousel',
              file: 'about-life.svg',
              features: 'Core capabilities matrix • 3-slide interests carousel changing every 4 seconds • 3 segmented progress bars (0-4s, 4-8s, 8-12s) • 3D volumetric spheres with specular highlights',
              accent: 'border-rose-500/40'
            },
            {
              num: '03',
              title: 'Orbital 3D Tech Matrix',
              file: 'stack.svg',
              features: 'Three tilted 3D elliptical orbits with planetary nodes (Kotlin, Android, Compose, Python, Gemini AI, PyTorch, Docker, Git) • Central 3D solar AI star reactor • Grouped stack chips below',
              accent: 'border-purple-500/40'
            },
            {
              num: '04',
              title: 'Hanging Lanyard ID Dashboard',
              file: 'id-dashboard.svg',
              features: 'Damped pendulum drop entrance • Perpetual +/-1.7° 3D pendulum swing • Metallic specular clasp • Holographic rainbow diffraction sweep • Green laser barcode scanner line • Verified production metrics',
              accent: 'border-emerald-500/40'
            },
            {
              num: '05',
              title: 'Connect with Pointing Hero',
              file: 'connect.svg',
              features: 'Real transparent right_pointing.png on the left pointing directly right • Swirling 3D portal gateway • Animated pointer reticle • Generously spaced social cards with updated email sukantxplodeprime@gmail.com',
              accent: 'border-cyan-500/40'
            }
          ].map((item) => (
            <div
              key={item.file}
              className={`bg-[#060c1d] border-2 ${item.accent} rounded-3xl p-6 sm:p-8 space-y-4 box-glow-multi transition hover:scale-[1.008] duration-300`}
            >
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#00f5ff] to-[#ff0055] text-black font-black text-sm flex items-center justify-center font-mono">
                    {item.num}
                  </span>
                  <div>
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                      <span>{item.title}</span>
                      <span className="text-xs font-mono font-normal text-cyan-400">assets/{item.file}?v=1</span>
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">{item.features}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`/assets/${item.file}`}
                    download={item.file}
                    onClick={() => playSynthBeep(640, 'triangle', 0.1)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-xs font-mono text-cyan-400 border border-cyan-500/30 transition"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download SVG</span>
                  </a>
                </div>
              </div>

              {/* Responsive Container */}
              <div className="flex justify-center py-2">
                <div
                  className={`w-full transition-all duration-300 ${
                    viewport === 'mobile'
                      ? 'max-w-[375px]'
                      : viewport === 'tablet'
                      ? 'max-w-[768px]'
                      : 'max-w-[920px]'
                  }`}
                >
                  <div
                    className={`rounded-2xl p-4 sm:p-6 border border-slate-800/80 shadow-2xl ${
                      bgTheme === 'checker'
                        ? 'bg-[#0f172a] bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px]'
                        : bgTheme === 'github'
                        ? 'bg-[#0d1117] border-[#30363d]'
                        : 'bg-[#040711]'
                    }`}
                  >
                    <img
                      src={`/assets/${item.file}?v=1&t=${refreshKey}`}
                      alt={item.title}
                      className="w-full h-auto block rounded-xl"
                      style={
                        timelineSec === 'static'
                          ? { animationPlayState: 'paused' }
                          : undefined
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 3: 3D INTERACTIVE SKILLS GALAXY */}
      {/* ============================================================== */}
      <section id="galaxy" className="py-24 px-4 lg:px-8 max-w-7xl mx-auto space-y-10 relative">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-xs font-mono text-purple-400 font-bold">
            <Compass className="w-3.5 h-3.5" />
            <span>INTERACTIVE SKILLS GALAXY &amp; KINETIC PROFICIENCY</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white neon-glow-purple">
            Architectural Mastery &amp; Tech Stacks
          </h2>
          <p className="text-sm text-slate-400 max-w-2xl mx-auto">
            Deep-dive into the four core engineering domains that power Sukant's digital architecture.
          </p>
        </div>

        {/* 4 Deep Domain Interactive Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              domain: '01 / Native Android',
              title: 'Mobile Architecture',
              techs: ['Kotlin', 'Jetpack Compose', 'Coroutines / Flow', 'Room DB', 'Retrofit / OkHttp', 'Hilt / Koin'],
              desc: 'Specialized in building fluid, 120fps reactive Android applications using modern declarative UI, MVI/MVVM clean architecture, and offline-first caches.',
              accent: 'border-purple-500/40 text-purple-400 bg-purple-500/10'
            },
            {
              domain: '02 / Artificial Intelligence',
              title: 'Autonomous Voice & Agents',
              techs: ['Gemini 2.5/3.0 SDK', 'Sub-Second Speech Core', 'Function Calling', 'Local Neural Models', 'FastAPI Middleware'],
              desc: 'Architecting intelligent voice assistants like The Ultimate JARVIS with low-latency wake-word engines, autonomous tool invocation, and multi-modal sensory inputs.',
              accent: 'border-rose-500/40 text-rose-400 bg-rose-500/10'
            },
            {
              domain: '03 / Media & Systems',
              title: 'Streaming & Video Engines',
              techs: ['ExoPlayer / Media3', 'Dynamic Chunk Preloading', 'ExoMedia', 'Memory Profiling', 'Custom Shaders'],
              desc: 'Engineered MovieBox streaming infrastructure with adaptive bitrate streaming, low-jitter playback buffer management, and bespoke Compose player gestures.',
              accent: 'border-cyan-500/40 text-cyan-400 bg-cyan-500/10'
            },
            {
              domain: '04 / DevOps & Infra',
              title: 'CI/CD & Cloud Tooling',
              techs: ['GitHub Actions CI/CD', 'Docker', 'Linux / Bash Scripting', 'Gradle Build Optimization', 'TypeScript / Web'],
              desc: 'End-to-end continuous integration pipelines for automated APK signing, release artifact generation, unit/UI testing suites, and containerized microservices.',
              accent: 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10'
            }
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-[#060c1d] border-2 border-slate-800 hover:border-cyan-400/60 rounded-3xl p-6 space-y-4 box-glow-multi transition-all duration-300 hover:-translate-y-2"
            >
              <div className={`inline-block px-2.5 py-1 rounded-lg text-xs font-mono font-bold border ${item.accent}`}>
                {item.domain}
              </div>
              <h3 className="text-xl font-bold text-white">{item.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>

              <div className="pt-2 border-t border-slate-800/80">
                <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block mb-2">Technologies</span>
                <div className="flex flex-wrap gap-1.5">
                  {item.techs.map((t) => (
                    <span
                      key={t}
                      className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 4: PRODUCTION REPOSITORIES & INTERACTIVE SIMULATORS */}
      {/* ============================================================== */}
      <section id="projects" className="py-24 px-4 lg:px-8 max-w-7xl mx-auto space-y-12 relative">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-xs font-mono text-rose-400 font-bold">
            <Cpu className="w-3.5 h-3.5" />
            <span>PRODUCTION ARTIFACTS &amp; LIVE DEMOS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white neon-glow-crimson">
            Featured Repositories &amp; Hardware Engines
          </h2>
          <p className="text-sm text-slate-400 max-w-2xl mx-auto">
            Interact with live simulators of Sukant's key production applications.
          </p>
        </div>

        {/* Project 1: The Ultimate JARVIS Interactive Voice AI Console */}
        <div className="bg-[#060c1d] border-2 border-cyan-500/40 rounded-3xl p-6 sm:p-10 box-glow-cyan space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center border border-cyan-400/40">
                <Mic className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <span className="text-xs font-mono text-cyan-400 font-bold uppercase">FEATURED REPO 01 // AUTONOMOUS VOICE AI</span>
                <h3 className="text-2xl font-black text-white">The Ultimate JARVIS</h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                ● Live Agent Console
              </span>
              <a
                href="https://github.com/sukantcodes"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-black font-mono text-xs font-bold transition"
              >
                <span>GitHub Repo</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
            A native Android voice assistant powered by on-device voice activity detection, sub-second speech recognition, and the Gemini API for multi-turn autonomous device control and reasoning.
          </p>

          {/* Interactive Simulated Voice Agent Box */}
          <div className="bg-[#030713] border border-cyan-500/30 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-cyan-400 animate-spin" />
                <span className="text-xs font-mono text-slate-400">JARVIS NEURAL CORE // SPEECH PIPELINE</span>
              </div>
              <div className="flex items-center gap-1">
                {[40, 70, 30, 90, 60, 80, 45, 95, 65, 35].map((h, i) => (
                  <span
                    key={i}
                    className={`w-1 rounded-full bg-cyan-400 transition-all duration-300 ${
                      jarvisActive ? 'animate-pulse' : 'opacity-40'
                    }`}
                    style={{ height: jarvisActive ? `${h}%` : '10px' }}
                  />
                ))}
              </div>
            </div>

            {/* Simulated Query & Output Screen */}
            <div className="bg-[#060a18] p-4 rounded-xl border border-slate-800 font-mono text-xs space-y-2">
              {jarvisQuery && (
                <div className="text-cyan-400">
                  <span className="text-slate-500">&gt; USER VOICE QUERY:</span> "{jarvisQuery}"
                </div>
              )}
              <div className="text-emerald-400 flex items-start gap-2">
                <span className="text-slate-500">&gt; JARVIS:</span>
                <span className="text-slate-200">{jarvisLog}</span>
              </div>
            </div>

            {/* Quick Voice Command Buttons */}
            <div>
              <span className="text-[11px] font-mono text-slate-500 block mb-2">Simulate Voice Queries:</span>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() =>
                    runJarvisCommand(
                      "Jarvis, check battery status and optimize background memory",
                      "Diagnostics complete: Battery at 88%. Cleared 4 inactive memory caches. 120Hz refresh sustained."
                    )
                  }
                  className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-cyan-400 text-xs text-slate-300 transition"
                >
                  ⚡ Battery &amp; Memory Diagnostics
                </button>

                <button
                  onClick={() =>
                    runJarvisCommand(
                      "Jarvis, open MovieBox and preload current trending stream",
                      "Launching MovieBox activity. Initializing ExoPlayer chunk preloader. Buffering 1080p stream."
                    )
                  }
                  className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-rose-400 text-xs text-slate-300 transition"
                >
                  🎬 Launch MovieBox &amp; Preload
                </button>

                <button
                  onClick={() =>
                    runJarvisCommand(
                      "Jarvis, summarize Sukant's latest GitHub commit activity",
                      "Active repository: sukantcodes/sukantcodes. Commits db61825 and 53bb874 verified on main branch."
                    )
                  }
                  className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-purple-400 text-xs text-slate-300 transition"
                >
                  🌐 Query GitHub Commits
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Project 2: MovieBox Streaming Engine */}
        <div className="bg-[#060c1d] border-2 border-rose-500/40 rounded-3xl p-6 sm:p-10 box-glow-crimson space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center border border-rose-400/40">
                <Flame className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <span className="text-xs font-mono text-rose-400 font-bold uppercase">FEATURED REPO 02 // COMPOSE STREAMING</span>
                <h3 className="text-2xl font-black text-white">MovieBox Streaming Engine</h3>
              </div>
            </div>

            <a
              href="https://github.com/sukantcodes"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-mono text-xs font-bold transition"
            >
              <span>GitHub Repo</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <p className="text-sm text-slate-300 leading-relaxed">
                MovieBox is a sleek, modern media streaming client built with declarative Jetpack Compose UI, ExoPlayer integration, dynamic chunk preloading, and reactive Room offline caching.
              </p>
              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="bg-[#0b1428] p-3 rounded-xl border border-slate-800">
                  <span className="text-xs font-mono text-rose-400 font-bold block">120Hz</span>
                  <span className="text-[11px] text-slate-400">Compose UI FPS</span>
                </div>
                <div className="bg-[#0b1428] p-3 rounded-xl border border-slate-800">
                  <span className="text-xs font-mono text-cyan-400 font-bold block">Adaptive</span>
                  <span className="text-[11px] text-slate-400">ExoPlayer Buffer</span>
                </div>
                <div className="bg-[#0b1428] p-3 rounded-xl border border-slate-800">
                  <span className="text-xs font-mono text-emerald-400 font-bold block">Offline-First</span>
                  <span className="text-[11px] text-slate-400">Room DB Cache</span>
                </div>
              </div>
            </div>

            {/* Simulated Phone Mockup */}
            <div className="bg-[#040817] border-2 border-slate-800 rounded-2xl p-4 flex flex-col justify-between space-y-3">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>MOVIEBOX // MOBILE PREVIEW</span>
                <span className="text-emerald-400">● 4K BUFFER</span>
              </div>
              <div className="h-28 rounded-xl bg-gradient-to-tr from-rose-950/40 via-purple-950/40 to-slate-900 border border-rose-500/30 flex items-center justify-center relative overflow-hidden">
                <Play className="w-10 h-10 text-rose-400/80 animate-pulse" />
                <div className="absolute bottom-2 left-3 right-3 h-1.5 rounded-full bg-slate-800 overflow-hidden">
                  <div className="w-2/3 h-full bg-rose-500" />
                </div>
              </div>
              <div className="text-[11px] font-mono text-slate-400 text-center">
                Jetpack Compose + ExoMedia Player
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 5: 3D INTERACTIVE DEVELOPER LANYARD ID PASS */}
      {/* ============================================================== */}
      <section id="lanyard" className="py-24 px-4 lg:px-8 max-w-7xl mx-auto space-y-8 relative">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-400 font-bold">
            <Lock className="w-3.5 h-3.5" />
            <span>INTERACTIVE 3D HOLOGRAPHIC BADGE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white neon-glow-cyan">
            Interactive Developer Pass
          </h2>
          <p className="text-sm text-slate-400 max-w-xl mx-auto">
            Click the card to flip between front and back. Toggle the green laser barcode scanner.
          </p>
        </div>

        {/* 3D Flip Card Container */}
        <div className="flex justify-center perspective-1000">
          <div
            onClick={() => {
              setIdCardFlipped(!idCardFlipped);
              playSynthBeep(680, 'triangle', 0.12);
            }}
            className="w-full max-w-[340px] h-[500px] cursor-pointer relative preserve-3d transition-transform duration-700 ease-in-out"
            style={{
              transform: idCardFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
            }}
          >
            {/* FRONT OF BADGE */}
            <div className="absolute inset-0 backface-hidden rounded-3xl bg-[#091124] border-2 border-cyan-400 p-6 flex flex-col justify-between box-glow-multi shadow-2xl overflow-hidden">
              {/* Lanyard Top Punch */}
              <div className="w-14 h-4 bg-[#030611] rounded-full mx-auto border border-cyan-500/40" />

              {/* Header */}
              <div className="flex items-center justify-between text-xs font-mono border-b border-slate-800 pb-2">
                <span className="text-[#00ff9d] font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  DEV PASS // 2026
                </span>
                <span className="text-cyan-400">#DEV-SKNT-AI</span>
              </div>

              {/* Character Photo with Holographic Sheen */}
              <div className="relative w-40 h-40 mx-auto rounded-2xl overflow-hidden border border-cyan-400/50 bg-[#040817] shadow-xl">
                <img
                  src="/assets/id.png"
                  alt="Sukant Photo"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent pointer-events-none" />
              </div>

              {/* Developer Details */}
              <div className="text-center space-y-1">
                <h4 className="text-lg font-black text-white">SUKANT BHATTACHARYA</h4>
                <p className="text-xs font-mono text-cyan-400">Android &amp; AI Systems Architect</p>
                <p className="text-[11px] font-mono text-rose-400 font-bold">@sukantcodes</p>
              </div>

              {/* Barcode with Active Laser Beam */}
              <div className="relative bg-[#040711] p-3 rounded-xl border border-slate-800 text-center">
                <div className="h-6 flex items-center justify-center gap-1">
                  {[3, 1, 4, 2, 5, 2, 1, 4, 2, 3, 1, 5, 2, 4, 1, 3, 2, 4].map((w, i) => (
                    <span key={i} className="bg-slate-300 h-full" style={{ width: `${w * 1.5}px` }} />
                  ))}
                </div>
                {laserActive && (
                  <div className="absolute left-3 right-3 h-0.5 bg-emerald-400 animate-pulse box-glow-cyan" style={{ top: '50%' }} />
                )}
                <span className="text-[9px] font-mono text-slate-500 block mt-1">CLICK CARD TO FLIP (3D BACK)</span>
              </div>
            </div>

            {/* BACK OF BADGE */}
            <div
              className="absolute inset-0 backface-hidden rounded-3xl bg-[#091124] border-2 border-rose-500 p-6 flex flex-col justify-between box-glow-crimson shadow-2xl overflow-hidden"
              style={{ transform: 'rotateY(180deg)' }}
            >
              <div className="w-14 h-4 bg-[#030611] rounded-full mx-auto border border-rose-500/40" />

              <div className="text-center space-y-1 border-b border-slate-800 pb-3">
                <span className="text-xs font-mono text-rose-400 font-bold">CRYPTOGRAPHIC PASS VERIFICATION</span>
                <h4 className="text-base font-bold text-white">SUKANT CODES // IDENTITY</h4>
              </div>

              {/* Simulated QR Code */}
              <div className="w-36 h-36 mx-auto bg-white p-2 rounded-2xl flex items-center justify-center">
                <div className="w-full h-full bg-[#030611] rounded-xl flex items-center justify-center text-center p-2 text-white font-mono text-[10px]">
                  <span>github.com/sukantcodes</span>
                </div>
              </div>

              <div className="font-mono text-[11px] text-slate-400 space-y-1.5 bg-[#040817] p-3 rounded-xl border border-slate-800">
                <div>EMAIL: <span className="text-rose-400 font-bold">sukantxplodeprime@gmail.com</span></div>
                <div>BRANCH: <span className="text-cyan-400">main</span></div>
                <div>HASH: <span className="text-purple-400 font-mono">53bb874...db61825</span></div>
                <div>ISSUED: <span className="text-emerald-400">NOV 2026 // PLAYBOOK</span></div>
              </div>

              <div className="text-center text-[10px] font-mono text-slate-500">
                CLICK TO RETURN TO FRONT
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 6: MOUNTAIN HORIZONS & PHOTOGRAPHIC ODYSSEY */}
      {/* ============================================================== */}
      <section id="photos" className="py-24 px-4 lg:px-8 max-w-7xl mx-auto space-y-10 relative">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-400 font-bold">
            <ImageIcon className="w-3.5 h-3.5" />
            <span>REAL REFERENCE PHOTOS GALLERY &amp; CUTOUT ENGINE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white neon-glow-green">
            Mountain Horizons &amp; Real Identity
          </h2>
          <p className="text-sm text-slate-400 max-w-2xl mx-auto">
            Review the 5 uploaded source photos and how their likeness, hairstyle, streetwear, and personality were extracted into transparent vector assets.
          </p>
        </div>

        {/* 5 Real Photos Gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            {
              title: 'Studio Portrait',
              use: 'Extracted for id.png stylized vector face and rim light',
              path: '/assets/aistudio/file_000000000e608211a4920d26f54dd0dd_d521a39d.jpg'
            },
            {
              title: 'Streetwear & Silver Chain',
              use: 'Extracted for right_pointing.png outfit and posture',
              path: '/assets/aistudio/file_00000000069c8211bd36f08583048ccb_59e251c0.jpg'
            },
            {
              title: 'Mountain Sunrise',
              use: 'Inspiration for Carousel Slide 03: Field & Craft',
              path: '/assets/aistudio/file_00000000b1e88211a8071e0a8b460325_61d0ae41.jpg'
            },
            {
              title: 'Rooftop Vantage',
              use: 'Casual streetwear attitude and urban perspective',
              path: '/assets/aistudio/file_000000006c288211bb133e92f170170e_94f4f368.jpg'
            },
            {
              title: 'Park Sunlight Pose',
              use: 'Natural sunlight and relaxed arm rest posture',
              path: '/assets/aistudio/file_00000000ef0c82118a0d01ead8452eb1_4f014dbd.jpg'
            }
          ].map((photo, i) => (
            <div
              key={i}
              className="bg-[#060c1d] border-2 border-slate-800 hover:border-emerald-400/50 rounded-2xl p-3 space-y-2 box-glow-multi transition hover:scale-105 duration-300"
            >
              <div className="aspect-[3/4] rounded-xl overflow-hidden bg-slate-900 relative">
                <img src={photo.path} alt={photo.title} className="w-full h-full object-cover" />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/80 font-mono text-[10px] text-emerald-400">
                  PHOTO 0{i + 1}
                </span>
              </div>
              <h4 className="font-bold text-xs text-white">{photo.title}</h4>
              <p className="text-[11px] text-slate-400">{photo.use}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 7: 3D ENGINEERING ROADMAP */}
      {/* ============================================================== */}
      <section id="roadmap" className="py-24 px-4 lg:px-8 max-w-5xl mx-auto space-y-12 relative">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-400 font-bold">
            <Activity className="w-3.5 h-3.5" />
            <span>CHRONOLOGICAL MATRIX &amp; ENGINEERING EVOLUTION</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white neon-glow-cyan">
            Architectural Milestones
          </h2>
        </div>

        {/* Vertical Timeline */}
        <div className="relative border-l-2 border-cyan-500/40 ml-4 sm:ml-32 space-y-10">
          {[
            {
              year: '2024',
              title: 'Mobile Engineering Foundations',
              desc: 'Deep mastery of Kotlin, Android SDK lifecycle, Room persistence, and multi-threaded asynchronous Coroutines.'
            },
            {
              year: '2025 Q1',
              title: 'Jetpack Compose & Modern Declarative UI',
              desc: 'Pivoted to full Compose UI paradigms, modular design tokens, 120Hz smooth micro-interactions, and MVI architectures.'
            },
            {
              year: '2025 Q3',
              title: 'The Ultimate JARVIS Voice AI Genesis',
              desc: 'Built autonomous on-device Android voice assistant orchestrating speech recognition, Gemini API, and device automation.'
            },
            {
              year: '2026 Q2',
              title: 'MovieBox & Media Streaming Engine',
              desc: 'Engineered custom ExoPlayer video preloading, dynamic chunk buffers, and responsive entertainment player.'
            },
            {
              year: '2026 Q4',
              title: 'The Profile Playbook 3D Vector Suite',
              desc: 'Transformed static GitHub README into a 3D animated self-contained vector ecosystem for @sukantcodes.'
            }
          ].map((m, i) => (
            <div key={i} className="relative pl-6 sm:pl-8 group">
              <span className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#030611] border-2 border-cyan-400 group-hover:scale-125 transition" />
              <div className="bg-[#060c1d] border border-slate-800 group-hover:border-cyan-500/50 p-5 rounded-2xl box-glow-cyan transition">
                <span className="text-xs font-mono font-bold text-cyan-400">{m.year}</span>
                <h4 className="text-lg font-bold text-white mt-1">{m.title}</h4>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 8: INTERACTIVE CYBER TERMINAL */}
      {/* ============================================================== */}
      <section id="terminal" className="py-24 px-4 lg:px-8 max-w-4xl mx-auto space-y-8 relative">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-400 font-bold">
            <TerminalIcon className="w-3.5 h-3.5" />
            <span>INTERACTIVE CYBERNETIC SHELL</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white neon-glow-green">
            Terminal Diagnostics Console
          </h2>
          <p className="text-sm text-slate-400">
            Type <code className="text-emerald-400 font-mono">help</code>, <code className="text-emerald-400 font-mono">skills</code>, <code className="text-emerald-400 font-mono">projects</code>, <code className="text-emerald-400 font-mono">download</code>, or <code className="text-emerald-400 font-mono">matrix</code>.
          </p>
        </div>

        {/* Terminal Window */}
        <div className="bg-[#030713] border-2 border-emerald-500/40 rounded-3xl p-5 box-glow-cyan shadow-2xl font-mono text-xs">
          {/* Terminal Titlebar */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3 text-slate-500">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500" />
              <span className="w-3 h-3 rounded-full bg-amber-500" />
              <span className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="text-slate-400 ml-2">sukantcodes@cyber-host: ~</span>
            </div>
            <span>BASH 5.2</span>
          </div>

          {/* Logs */}
          <div className="space-y-1.5 h-64 overflow-y-auto no-scrollbar text-slate-300">
            {terminalLogs.map((log, i) => (
              <div
                key={i}
                className={
                  log.startsWith('>')
                    ? 'text-cyan-400 font-bold'
                    : log.includes('🟢') || log.includes('⚡')
                    ? 'text-emerald-400'
                    : 'text-slate-300'
                }
              >
                {log}
              </div>
            ))}
          </div>

          {/* Command Input Prompt */}
          <form onSubmit={handleTerminalSubmit} className="mt-3 pt-3 border-t border-slate-800 flex items-center gap-2">
            <span className="text-emerald-400 font-bold">&gt;</span>
            <input
              type="text"
              value={terminalInput}
              onChange={(e) => setTerminalInput(e.target.value)}
              placeholder="Type a command (e.g. 'skills', 'download', 'help')..."
              className="w-full bg-transparent border-none outline-none text-emerald-300 font-mono text-xs placeholder:text-slate-600"
            />
            <button
              type="submit"
              className="px-3 py-1 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/30 transition text-xs font-mono"
            >
              RUN
            </button>
          </form>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 9: 3D CONNECT & DIRECT TRANSMISSION */}
      {/* ============================================================== */}
      <section id="connect" className="py-24 px-4 lg:px-8 max-w-5xl mx-auto space-y-12 relative">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-400 font-bold">
            <Radio className="w-3.5 h-3.5" />
            <span>DIRECT TELEMETRY &amp; ENGAGEMENT</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white neon-glow-cyan">
            Connect With Sukant
          </h2>
          <p className="text-sm text-slate-400 max-w-xl mx-auto">
            Available for mobile architecture consulting, Android system contracts, and autonomous voice AI engineering.
          </p>
        </div>

        {/* 4 Neon Touchpoint Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <a
            href="https://github.com/sukantcodes"
            target="_blank"
            rel="noreferrer"
            className="bg-[#060c1d] border-2 border-cyan-500/40 hover:border-cyan-400 p-5 rounded-2xl box-glow-cyan transition flex flex-col justify-between space-y-4 hover:-translate-y-1"
          >
            <div>
              <span className="text-xs font-mono text-cyan-400 font-bold block">01 // CODE REPOSITORIES</span>
              <h4 className="text-lg font-bold text-white mt-1">GitHub</h4>
              <p className="text-xs text-slate-400 mt-1">@sukantcodes</p>
            </div>
            <span className="text-xs font-mono text-cyan-400 flex items-center gap-1">
              Visit Profile <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </a>

          <a
            href="https://linkedin.com/in/sukantcodes"
            target="_blank"
            rel="noreferrer"
            className="bg-[#060c1d] border-2 border-blue-500/40 hover:border-blue-400 p-5 rounded-2xl box-glow-cyan transition flex flex-col justify-between space-y-4 hover:-translate-y-1"
          >
            <div>
              <span className="text-xs font-mono text-blue-400 font-bold block">02 // PROFESSIONAL NETWORK</span>
              <h4 className="text-lg font-bold text-white mt-1">LinkedIn</h4>
              <p className="text-xs text-slate-400 mt-1">Sukant Bhattacharya</p>
            </div>
            <span className="text-xs font-mono text-blue-400 flex items-center gap-1">
              Connect <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </a>

          <a
            href="mailto:sukantxplodeprime@gmail.com"
            className="bg-[#060c1d] border-2 border-rose-500/40 hover:border-rose-400 p-5 rounded-2xl box-glow-crimson transition flex flex-col justify-between space-y-4 hover:-translate-y-1"
          >
            <div>
              <span className="text-xs font-mono text-rose-400 font-bold block">03 // DIRECT INQUIRIES</span>
              <h4 className="text-lg font-bold text-white mt-1">Email</h4>
              <p className="text-xs text-slate-400 mt-1 break-all">sukantxplodeprime@gmail.com</p>
            </div>
            <span className="text-xs font-mono text-rose-400 flex items-center gap-1">
              Send Email <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </a>

          <div className="bg-[#060c1d] border-2 border-amber-500/40 p-5 rounded-2xl box-glow-multi transition flex flex-col justify-between space-y-4">
            <div>
              <span className="text-xs font-mono text-amber-400 font-bold block">04 // MENTORSHIP</span>
              <h4 className="text-lg font-bold text-white mt-1">Topmate 1:1</h4>
              <p className="text-xs text-slate-400 mt-1">Architecture Reviews &amp; AI Guidance</p>
            </div>
            <span className="text-xs font-mono text-amber-400 flex items-center gap-1">
              Available <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 10: COMPLETE PLAYBOOK PACKAGE & EXPORTER */}
      {/* ============================================================== */}
      <section className="py-20 px-4 lg:px-8 max-w-5xl mx-auto border-t border-cyan-500/20 space-y-8">
        <div className="bg-gradient-to-r from-[#071329] via-[#0b1736] to-[#12071f] border-2 border-cyan-400/50 rounded-3xl p-8 box-glow-multi flex flex-wrap items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="text-2xl font-black text-white flex items-center gap-2">
              <FolderArchive className="w-6 h-6 text-cyan-400" />
              <span>Ready to Update Your GitHub Profile?</span>
            </h3>
            <p className="text-sm text-slate-300 max-w-xl">
              Download the complete bundle containing <code className="text-cyan-400">README.md</code> and all 5 animated 3D SVGs + transparent character PNGs.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href="/profile-assets.zip"
              download="profile-assets.zip"
              onClick={triggerConfetti}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#00f5ff] to-[#ff0055] text-black font-black text-sm shadow-xl shadow-cyan-500/40 hover:scale-105 transition active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>Download profile-assets.zip</span>
            </a>

            <button
              onClick={copyReadme}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-sm font-semibold transition"
            >
              <Copy className="w-4 h-4 text-cyan-400" />
              <span>Copy Raw README</span>
            </button>
          </div>
        </div>
      </section>

      {/* Cyber Footer */}
      <footer className="border-t border-slate-800/80 bg-[#02040a] py-10 px-4 text-center text-xs text-slate-500 space-y-3">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <span className="font-mono text-slate-400 font-bold">
            SUKANT CODES // THE PROFILE PLAYBOOK 3D UNIVERSE
          </span>
          <div className="flex items-center gap-4 text-slate-400 font-mono">
            <span>#00f5ff • #ff0055 • #00ff9d</span>
            <span>Self-Contained SVGs</span>
            <span>Zero Network Calls</span>
          </div>
        </div>
        <p className="text-[11px] text-slate-600">
          Crafted with extreme kinetic vector physics &amp; multi-spectral neon glows for @sukantcodes.
        </p>
      </footer>
    </div>
  );
}

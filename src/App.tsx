import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
  Lock,
  Flame,
  CheckCircle2,
  Sliders,
  Globe,
  SlidersHorizontal,
  RefreshCw,
  Sun,
  Moon
} from 'lucide-react';

export default function App() {
  // Navigation & Interactive States
  const [activeSection, setActiveSection] = useState('hero');
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [bgTheme, setBgTheme] = useState<'navy' | 'checker' | 'github'>('navy');
  const [copied, setCopied] = useState(false);
  const [timelineSec, setTimelineSec] = useState<number | 'static'>(0);
  const [refreshKey, setRefreshKey] = useState(Date.now());
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [idCardFlipped, setIdCardFlipped] = useState(false);
  const [laserActive, setLaserActive] = useState(true);

  // Dynamic Island State (Apple iOS 18 / VisionOS Morphing Pill)
  const [islandState, setIslandState] = useState<'idle' | 'expanded' | 'jarvis' | 'download'>('idle');
  const [islandMessage, setIslandMessage] = useState('Sukant OS // System 3D Online');

  // iPhone Simulator Active Screen (0: JARVIS Voice Assistant, 1: MovieBox, 2: 3D Dev Pass)
  const [phoneScreen, setPhoneScreen] = useState<0 | 1 | 2>(0);
  const [phonePlaying, setPhonePlaying] = useState(false);
  const [phoneProgress, setPhoneProgress] = useState(38);

  // 3D Parallax Tilt state for Hero
  const [heroTilt, setHeroTilt] = useState({ x: 0, y: 0 });

  // Terminal State
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    "SUKANT OS // v2026.11 [3D VISIONOS KERNEL]",
    "Acoustics: 🟢 HAPTIC AUDIO SYNTH ACTIVE",
    "Physics: 🟢 120HZ LIQUID SPRING TRANSFORMS",
    "Type 'help' to inspect available system commands."
  ]);

  // Voice Assistant JARVIS Simulation State
  const [jarvisActive, setJarvisActive] = useState(false);
  const [jarvisLog, setJarvisLog] = useState("Standing by. Say or select a command below...");
  const [jarvisQuery, setJarvisQuery] = useState('');

  // Audio Context for Apple-Grade Cyber Acoustic Feedback
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Starfield Canvas Ref
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const playHapticSound = (type: 'pop' | 'glass' | 'chime' | 'laser' = 'pop') => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') ctx.resume();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const now = ctx.currentTime;

      if (type === 'pop') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.exponentialRampToValueAtTime(140, now + 0.08);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(now + 0.08);
      } else if (type === 'glass') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(840, now);
        osc.frequency.exponentialRampToValueAtTime(1240, now + 0.12);
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(now + 0.14);
      } else if (type === 'chime') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.setValueAtTime(659.25, now + 0.06); // E5
        osc.frequency.setValueAtTime(783.99, now + 0.12); // G5
        gain.gain.setValueAtTime(0.07, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(now + 0.3);
      } else if (type === 'laser') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(1200, now);
        osc.frequency.exponentialRampToValueAtTime(200, now + 0.15);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(now + 0.15);
      }
    } catch {
      // Audio not permitted yet
    }
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#00f5ff', '#ff2d55', '#a855f7', '#34c759', '#ffcc00']
    });
    playHapticSound('chime');
    setIslandState('download');
    setIslandMessage('📦 Package profile-assets.zip Ready');
    setTimeout(() => setIslandState('idle'), 3500);
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

  // Interactive Particle Starfield Canvas (VisionOS Fluid Physics)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      alpha: number;
    }> = [];

    const colors = ['#00f5ff', '#ff2d55', '#a855f7', '#34c759'];
    for (let i = 0; i < 90; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 2 + 0.8,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.5 + 0.3
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render connected lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.strokeStyle = `rgba(0, 245, 255, ${0.12 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Render and update particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Hero Mouse Parallax Tracker
  const handleHeroMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 28;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -28;
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
    playHapticSound('pop');

    const newLogs = [...terminalLogs, `> ${terminalInput}`];
    switch (cmd) {
      case 'help':
        newLogs.push(
          "Available commands:",
          "  help       - Show command list",
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
    playHapticSound('laser');
    setIslandState('jarvis');
    setIslandMessage(`JARVIS: "${query}"`);

    setTimeout(() => {
      setJarvisLog(response);
      setJarvisActive(false);
      playHapticSound('glass');
      setTimeout(() => setIslandState('idle'), 4000);
    }, 1100);
  };

  const navLinks = [
    { id: 'hero', label: '01 / Spatial Reactor' },
    { id: 'phone-sim', label: '02 / iPhone 16 Pro' },
    { id: 'profile-suite', label: '03 / Playbook 5-Cards' },
    { id: 'galaxy', label: '04 / Skills Matrix' },
    { id: 'projects', label: '05 / Repositories' },
    { id: 'lanyard', label: '06 / 3D Dev Pass' },
    { id: 'photos', label: '07 / Real Photos' },
    { id: 'roadmap', label: '08 / Roadmap' },
    { id: 'terminal', label: '09 / Cyber Shell' },
    { id: 'connect', label: '10 / Transmission' }
  ];

  return (
    <div className="min-h-screen bg-[#030611] text-slate-100 selection:bg-[#00f5ff] selection:text-black relative overflow-x-hidden font-sans">
      {/* VisionOS Fluid Starfield Particle Canvas */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />

      {/* Ambient Glowing Nebulae */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[650px] h-[650px] rounded-full bg-gradient-to-tr from-[#00f5ff]/20 via-[#0080ff]/10 to-transparent blur-[150px] animate-pulse-glow" />
        <div className="absolute top-[35%] -right-40 w-[700px] h-[700px] rounded-full bg-gradient-to-bl from-[#ff0055]/20 via-[#a855f7]/15 to-transparent blur-[160px] animate-pulse-glow" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-[10%] left-[20%] w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-[#00ff9d]/15 via-[#00f5ff]/10 to-transparent blur-[150px] animate-pulse-glow" style={{ animationDelay: '4s' }} />
      </div>

      {/* ============================================================== */}
      {/* APPLE DYNAMIC ISLAND & SPATIAL HUD (TOP BAR) */}
      {/* ============================================================== */}
      <header className="sticky top-0 z-50 px-4 lg:px-8 py-3 bg-[#040817]/75 backdrop-blur-2xl border-b border-white/10 shadow-2xl">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          {/* Logo & Identity */}
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#00f5ff] via-[#a855f7] to-[#ff2d55] p-[2px] shadow-lg shadow-cyan-500/25 cursor-pointer"
            >
              <div className="w-full h-full bg-[#040817] rounded-[14px] flex items-center justify-center font-black text-sm text-[#00f5ff]">
                SC
              </div>
            </motion.div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base tracking-tight text-white neon-glow-cyan">
                  Sukant Codes
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                  @sukantcodes
                </span>
              </div>
              <p className="text-[11px] font-mono text-slate-400 hidden sm:block">
                iPhone-Grade Liquid Spring Physics • 3D Cyber Vision
              </p>
            </div>
          </div>

          {/* DYNAMIC ISLAND (EXPANDS WITH SPRING PHYSICS) */}
          <motion.div
            layout
            transition={{ type: 'spring', stiffness: 450, damping: 30 }}
            onClick={() => {
              setIslandState(islandState === 'idle' ? 'expanded' : 'idle');
              playHapticSound('pop');
            }}
            className="cursor-pointer bg-black/90 border border-white/20 rounded-full px-4 py-1.5 shadow-2xl flex items-center gap-3 hover:border-cyan-400/50 transition-colors"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono text-slate-200">
              {islandState === 'jarvis' ? islandMessage : islandState === 'download' ? islandMessage : 'Sukant OS // Dynamic Island'}
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-cyan-400">
              120 FPS
            </span>
          </motion.div>

          {/* Action Bar */}
          <div className="flex items-center flex-wrap gap-2">
            {/* Audio Synth Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setSoundEnabled(!soundEnabled);
                playHapticSound('glass');
              }}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-mono transition ${
                soundEnabled
                  ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                  : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-slate-200'
              }`}
              title="Toggle Cyber Sound Effects"
            >
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-cyan-400" /> : <VolumeX className="w-3.5 h-3.5" />}
              <span>{soundEnabled ? 'FX: ON' : 'FX: OFF'}</span>
            </motion.button>

            {/* Standalone preview.html */}
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/preview.html"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 transition"
            >
              <Eye className="w-3.5 h-3.5 text-cyan-400" />
              <span>preview.html</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </motion.a>

            {/* Copy README */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={copyReadme}
              className="inline-flex items-center gap-1.5 text-xs font-medium px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 transition"
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
            </motion.button>

            {/* Download Complete ZIP Package */}
            <motion.a
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              href="/profile-assets.zip"
              download="profile-assets.zip"
              onClick={triggerConfetti}
              className="inline-flex items-center gap-2 text-xs font-bold px-4 py-1.5 rounded-xl bg-gradient-to-r from-[#00f5ff] via-[#0080ff] to-[#ff2d55] text-black shadow-lg shadow-cyan-500/30 transition"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download ZIP (1.36 MB)</span>
            </motion.a>
          </div>
        </div>

        {/* Liquid Horizontal Navigation Bar */}
        <div className="max-w-7xl mx-auto mt-2.5 pt-2 border-t border-white/5 flex items-center gap-2 overflow-x-auto no-scrollbar">
          {navLinks.map((item) => (
            <motion.a
              key={item.id}
              href={`#${item.id}`}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setActiveSection(item.id);
                playHapticSound('pop');
              }}
              className={`text-[11px] font-mono whitespace-nowrap px-3.5 py-1 rounded-full transition ${
                activeSection === item.id
                  ? 'bg-cyan-500/20 text-[#00f5ff] border border-cyan-500/40 font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {item.label}
            </motion.a>
          ))}
        </div>
      </header>

      {/* ============================================================== */}
      {/* SECTION 1: SPATIAL HERO WITH 3D GLASS CHASSIS & GYRO RINGS */}
      {/* ============================================================== */}
      <section
        id="hero"
        className="relative min-h-[92vh] flex items-center justify-center px-4 lg:px-8 py-16 perspective-1000 overflow-hidden"
        onMouseMove={handleHeroMouseMove}
        onMouseLeave={handleHeroMouseLeave}
      >
        <div className="absolute bottom-0 left-0 right-0 h-96 cyber-grid-floor opacity-35 pointer-events-none" />

        <motion.div
          className="max-w-6xl w-full mx-auto relative z-10 preserve-3d"
          animate={{
            rotateX: heroTilt.y,
            rotateY: heroTilt.x
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        >
          <div className="glass-panel rounded-3xl p-6 sm:p-12 relative overflow-hidden box-glow-multi">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: 3D Typography */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/50 box-glow-cyan">
                  <span className="w-2 h-2 rounded-full bg-[#00ff9d] animate-ping" />
                  <span className="text-xs font-mono text-[#00f5ff] font-bold">
                    SYSTEM // ANDROID ARCHITECT &amp; VOICE AI
                  </span>
                </div>

                <div>
                  <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-none">
                    <span className="block text-slate-200 drop-shadow-md">SUKANT</span>
                    <span className="block bg-gradient-to-r from-[#00f5ff] via-[#ffffff] to-[#ff2d55] bg-clip-text text-transparent neon-glow-cyan">
                      BHATTACHARYA
                    </span>
                  </h1>
                  <p className="text-sm font-mono text-slate-400 mt-2">
                    <span className="text-cyan-400">@sukantcodes</span> • India / Global • Full-Stack Android &amp; Neural Intelligence
                  </p>
                </div>

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

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="#phone-sim"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-[#00f5ff] to-[#0080ff] text-black font-extrabold text-sm shadow-xl shadow-cyan-500/30 transition"
                  >
                    <Smartphone className="w-4 h-4 text-black" />
                    <span>Interact With iPhone 16 Pro</span>
                  </motion.a>

                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="#profile-suite"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 text-sm font-semibold transition"
                  >
                    <Boxes className="w-4 h-4 text-rose-400" />
                    <span>View 5-Card Playbook Suite</span>
                  </motion.a>
                </div>
              </div>

              {/* Right Column: 3D Holographic Character & Gyro Rings */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative w-72 h-72 sm:w-80 sm:h-80 flex items-center justify-center animate-float-smooth">
                  <div className="absolute inset-0 rounded-full border-2 border-dashed border-cyan-400/60 animate-spin" style={{ animationDuration: '18s' }} />
                  <div className="absolute inset-3 rounded-full border-2 border-dashed border-rose-500/70 animate-spin" style={{ animationDuration: '24s', animationDirection: 'reverse' }} />
                  <div className="absolute inset-7 rounded-full border border-purple-400/50 animate-spin" style={{ animationDuration: '32s' }} />

                  <div className="relative w-60 h-60 rounded-3xl bg-[#081024] p-3 border-2 border-cyan-400/50 box-glow-multi overflow-hidden">
                    <img
                      src="/assets/id.png"
                      alt="Sukant Bhattacharya Stylized 3D Portrait"
                      className="w-full h-full object-cover rounded-2xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent pointer-events-none" />
                  </div>

                  <div className="absolute -bottom-3 bg-[#040817] border border-cyan-400 px-4 py-1.5 rounded-full text-xs font-mono font-bold text-white shadow-lg flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>SUKANT // 3D-VERIFIED</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 2: 3D INTERACTIVE IPHONE 16 PRO SIMULATOR */}
      {/* ============================================================== */}
      <section id="phone-sim" className="py-24 px-4 lg:px-8 max-w-7xl mx-auto space-y-12 relative">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-400 font-bold">
            <Smartphone className="w-3.5 h-3.5" />
            <span>IPHONE 16 PRO // 120HZ LIQUID MOTION SIMULATOR</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white neon-glow-cyan">
            Interactive Hardware Device
          </h2>
          <p className="text-sm text-slate-400 max-w-2xl mx-auto">
            Experience Sukant's applications inside a realistic titanium iPhone frame with Apple-Intelligence edge lighting and interactive screens.
          </p>
        </div>

        {/* 3 App Selector Tabs */}
        <div className="flex justify-center gap-3">
          {[
            { id: 0, label: 'The Ultimate JARVIS (Voice AI)' },
            { id: 1, label: 'MovieBox (Compose Streaming)' },
            { id: 2, label: '3D Developer Pass (Lanyard)' }
          ].map((tab) => (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setPhoneScreen(tab.id as 0 | 1 | 2);
                playHapticSound('pop');
              }}
              className={`px-4 py-2 rounded-2xl text-xs font-mono font-bold border transition ${
                phoneScreen === tab.id
                  ? 'bg-cyan-500 text-black border-cyan-400 shadow-lg shadow-cyan-500/25'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {tab.label}
            </motion.button>
          ))}
        </div>

        {/* 3D iPhone Frame Container */}
        <div className="flex justify-center perspective-1000">
          <motion.div
            className="relative w-[340px] h-[680px] rounded-[52px] bg-[#0c1222] p-3 shadow-2xl border-4 border-slate-500/40 box-glow-multi"
            whileHover={{ scale: 1.02, rotateY: 3 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          >
            {/* Apple Intelligence Glowing Perimeter Aura (Active on JARVIS screen) */}
            {phoneScreen === 0 && (
              <div className="absolute inset-0 rounded-[52px] apple-intelligence-glow pointer-events-none" />
            )}

            {/* Inner Screen Chassis */}
            <div className="relative w-full h-full rounded-[44px] bg-[#040816] overflow-hidden flex flex-col justify-between border border-white/10">
              {/* Dynamic Island Pill at Top */}
              <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-full z-30 flex items-center justify-between px-2.5 border border-white/10 shadow-md">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-[10px] font-mono text-slate-300">
                  {phoneScreen === 0 ? 'JARVIS' : phoneScreen === 1 ? 'MOVIEBOX' : 'DEV-PASS'}
                </span>
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              </div>

              {/* Status Bar */}
              <div className="pt-3 px-6 flex justify-between items-center text-[10px] font-mono text-slate-400 z-20">
                <span>9:41</span>
                <span>5G • 100%</span>
              </div>

              {/* SCREEN CONTENT */}
              <div className="flex-1 p-5 pt-8 overflow-y-auto no-scrollbar space-y-4">
                {/* SCREEN 0: THE ULTIMATE JARVIS */}
                {phoneScreen === 0 && (
                  <div className="space-y-4">
                    <div className="text-center pt-2">
                      <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase">AUTONOMOUS ASSISTANT</span>
                      <h4 className="text-lg font-black text-white">The Ultimate JARVIS</h4>
                      <p className="text-[11px] text-slate-400">Kotlin • Gemini API • Android SDK</p>
                    </div>

                    {/* Speech Waveform Orb */}
                    <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-tr from-cyan-500/20 via-purple-500/20 to-rose-500/20 border-2 border-cyan-400/60 flex items-center justify-center relative overflow-hidden box-glow-cyan animate-pulse">
                      <Mic className="w-10 h-10 text-cyan-400" />
                      <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/20 to-transparent" />
                    </div>

                    <div className="bg-[#08122a] p-3 rounded-2xl border border-cyan-500/30 text-[11px] font-mono text-slate-300">
                      <div className="text-cyan-400 font-bold mb-1">&gt; STATUS: LISTENING (120Hz)</div>
                      <div>{jarvisLog}</div>
                    </div>

                    <div className="space-y-1.5">
                      <span className="text-[10px] font-mono text-slate-400 block">Tap Voice Commands:</span>
                      <button
                        onClick={() =>
                          runJarvisCommand(
                            "Jarvis, run full Android memory garbage collection",
                            "Memory GC complete: 41MB recovered. Latency under 12ms."
                          )
                        }
                        className="w-full text-left p-2 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-200 hover:border-cyan-400 transition"
                      >
                        ⚡ Optimize Memory &amp; Cache
                      </button>
                      <button
                        onClick={() =>
                          runJarvisCommand(
                            "Jarvis, trigger Gemini agent reasoning loop",
                            "Gemini 2.5 SDK reasoning stream initialized. Ready for query."
                          )
                        }
                        className="w-full text-left p-2 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-200 hover:border-rose-400 transition"
                      >
                        🧠 Trigger Gemini Neural Agent
                      </button>
                    </div>
                  </div>
                )}

                {/* SCREEN 1: MOVIEBOX */}
                {phoneScreen === 1 && (
                  <div className="space-y-4">
                    <div className="text-center pt-2">
                      <span className="text-[10px] font-mono text-rose-400 font-bold uppercase">MEDIA CLIENT</span>
                      <h4 className="text-lg font-black text-white">MovieBox Streaming</h4>
                      <p className="text-[11px] text-slate-400">Jetpack Compose • ExoPlayer</p>
                    </div>

                    <div className="h-40 rounded-2xl bg-gradient-to-tr from-rose-950/60 via-purple-950/40 to-slate-900 border border-rose-500/40 relative overflow-hidden flex items-center justify-center">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => {
                          setPhonePlaying(!phonePlaying);
                          playHapticSound('pop');
                        }}
                        className="w-12 h-12 rounded-full bg-rose-600/90 text-white flex items-center justify-center shadow-lg"
                      >
                        {phonePlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                      </motion.button>
                      <div className="absolute bottom-2 left-3 right-3 flex items-center gap-2">
                        <span className="text-[10px] font-mono text-slate-300">01:45</span>
                        <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-rose-500" style={{ width: `${phoneProgress}%` }} />
                        </div>
                        <span className="text-[10px] font-mono text-slate-300">04:20</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-[#0b1428] p-2.5 rounded-xl border border-slate-800">
                        <span className="text-[10px] font-mono text-rose-400 font-bold block">120Hz UI</span>
                        <span className="text-[10px] text-slate-400">Compose Gestures</span>
                      </div>
                      <div className="bg-[#0b1428] p-2.5 rounded-xl border border-slate-800">
                        <span className="text-[10px] font-mono text-cyan-400 font-bold block">Offline</span>
                        <span className="text-[10px] text-slate-400">Room Video Cache</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* SCREEN 2: 3D DEV PASS */}
                {phoneScreen === 2 && (
                  <div className="space-y-4 text-center">
                    <div className="pt-2">
                      <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase">DEVELOPER PASS</span>
                      <h4 className="text-lg font-black text-white">Sukant Bhattacharya</h4>
                      <p className="text-[11px] font-mono text-cyan-400">@sukantcodes</p>
                    </div>

                    <div className="w-32 h-32 mx-auto rounded-2xl overflow-hidden border-2 border-cyan-400/60 shadow-xl bg-[#081024]">
                      <img src="/assets/id.png" alt="Sukant" className="w-full h-full object-cover" />
                    </div>

                    <div className="bg-[#08122a] p-3 rounded-2xl border border-slate-800 text-[11px] font-mono text-slate-300 text-left space-y-1">
                      <div>ROLE: <span className="text-cyan-400 font-bold">Android &amp; Voice AI Architect</span></div>
                      <div>EMAIL: <span className="text-rose-400 font-bold">sukantxplodeprime@gmail.com</span></div>
                      <div>STATUS: <span className="text-emerald-400 font-bold">● VERIFIED</span></div>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Home Indicator Bar */}
              <div className="pb-2 flex justify-center">
                <div className="w-32 h-1 bg-white/40 rounded-full" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 3: GITHUB PROFILE PLAYBOOK SUITE (5 VECTOR CARDS) */}
      {/* ============================================================== */}
      <section id="profile-suite" className="py-24 px-4 lg:px-8 max-w-7xl mx-auto space-y-8 relative">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00f5ff] font-bold">
              <Boxes className="w-4 h-4" />
              <span>THE PROFILE PLAYBOOK // 5-CARD 3D VECTOR SUITE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1 neon-glow-cyan">
              Animated GitHub README Components
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              All 5 self-contained animated vector files required by the uploaded Playbook. Rendered with 3D perspective depth, glowing neon gradients, and zero external requests.
            </p>
          </div>

          <div className="flex items-center flex-wrap gap-2.5">
            <div className="flex bg-slate-900 rounded-xl p-1 border border-slate-800">
              <button
                onClick={() => setViewport('desktop')}
                className={`px-3 py-1 text-xs rounded-lg font-medium transition ${
                  viewport === 'desktop' ? 'bg-[#00f5ff] text-black font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Desktop
              </button>
              <button
                onClick={() => setViewport('tablet')}
                className={`px-3 py-1 text-xs rounded-lg font-medium transition ${
                  viewport === 'tablet' ? 'bg-[#00f5ff] text-black font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Tablet
              </button>
              <button
                onClick={() => setViewport('mobile')}
                className={`px-3 py-1 text-xs rounded-lg font-medium transition ${
                  viewport === 'mobile' ? 'bg-[#00f5ff] text-black font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Mobile
              </button>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setRefreshKey(Date.now());
                playHapticSound('pop');
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-mono text-cyan-400 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Replay Loops</span>
            </motion.button>
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
            <motion.div
              key={item.file}
              whileHover={{ y: -4, scale: 1.006 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className={`bg-[#060c1d] border-2 ${item.accent} rounded-3xl p-6 sm:p-8 space-y-4 box-glow-multi`}
            >
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#00f5ff] to-[#ff2d55] text-black font-black text-sm flex items-center justify-center font-mono">
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
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={`/assets/${item.file}`}
                    download={item.file}
                    onClick={() => playHapticSound('glass')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-mono text-cyan-400 border border-cyan-500/30 transition"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download SVG</span>
                  </motion.a>
                </div>
              </div>

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
            </motion.div>
          ))}
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 4: 3D INTERACTIVE SKILLS GALAXY */}
      {/* ============================================================== */}
      <section id="galaxy" className="py-24 px-4 lg:px-8 max-w-7xl mx-auto space-y-10 relative">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-xs font-mono text-purple-400 font-bold">
            <Compass className="w-3.5 h-3.5" />
            <span>INTERACTIVE SKILLS GALAXY</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white neon-glow-purple">
            Architectural Mastery &amp; Tech Stacks
          </h2>
        </div>

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
            <motion.div
              key={idx}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="bg-[#060c1d] border-2 border-slate-800 hover:border-cyan-400/60 rounded-3xl p-6 space-y-4 box-glow-multi"
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
                      className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-slate-900 text-slate-300 border border-slate-800"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 5: PRODUCTION REPOSITORIES */}
      {/* ============================================================== */}
      <section id="projects" className="py-24 px-4 lg:px-8 max-w-7xl mx-auto space-y-12 relative">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-xs font-mono text-rose-400 font-bold">
            <Cpu className="w-3.5 h-3.5" />
            <span>PRODUCTION ARTIFACTS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white neon-glow-crimson">
            Featured Repositories &amp; Architectures
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* JARVIS Card */}
          <div className="bg-[#060c1d] border-2 border-cyan-500/40 rounded-3xl p-6 sm:p-8 space-y-4 box-glow-cyan">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-mono text-cyan-400 font-bold">REPO 01 // AUTONOMOUS AI</span>
              <a
                href="https://github.com/sukantcodes"
                target="_blank"
                rel="noreferrer"
                className="text-cyan-400 hover:underline text-xs font-mono flex items-center gap-1"
              >
                GitHub <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <h3 className="text-2xl font-black text-white">The Ultimate JARVIS</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Android Voice Assistant powered by Gemini API, speech recognition &amp; device execution. Autonomous multi-turn tools.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="text-xs font-mono px-2.5 py-1 rounded bg-[#0b1428] text-purple-400 border border-purple-500/30">Kotlin</span>
              <span className="text-xs font-mono px-2.5 py-1 rounded bg-[#0b1428] text-rose-400 border border-rose-500/30">Gemini 2.5/3.0</span>
              <span className="text-xs font-mono px-2.5 py-1 rounded bg-[#0b1428] text-emerald-400 border border-emerald-500/30">Android SDK</span>
            </div>
          </div>

          {/* MovieBox Card */}
          <div className="bg-[#060c1d] border-2 border-rose-500/40 rounded-3xl p-6 sm:p-8 space-y-4 box-glow-crimson">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-mono text-rose-400 font-bold">REPO 02 // STREAMING</span>
              <a
                href="https://github.com/sukantcodes"
                target="_blank"
                rel="noreferrer"
                className="text-rose-400 hover:underline text-xs font-mono flex items-center gap-1"
              >
                GitHub <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <h3 className="text-2xl font-black text-white">MovieBox Streaming Engine</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Modern media player built with Jetpack Compose, ExoPlayer, and responsive architecture. Dynamic chunk caching.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="text-xs font-mono px-2.5 py-1 rounded bg-[#0b1428] text-cyan-400 border border-cyan-500/30">Jetpack Compose</span>
              <span className="text-xs font-mono px-2.5 py-1 rounded bg-[#0b1428] text-amber-400 border border-amber-500/30">ExoPlayer</span>
              <span className="text-xs font-mono px-2.5 py-1 rounded bg-[#0b1428] text-emerald-400 border border-emerald-500/30">Room DB</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 6: 3D FLIPPABLE DEVELOPER LANYARD ID PASS */}
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

        <div className="flex justify-center perspective-1000">
          <motion.div
            onClick={() => {
              setIdCardFlipped(!idCardFlipped);
              playHapticSound('pop');
            }}
            className="w-full max-w-[340px] h-[500px] cursor-pointer relative preserve-3d transition-transform duration-700 ease-in-out"
            style={{
              transform: idCardFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
            }}
          >
            {/* FRONT OF BADGE */}
            <div className="absolute inset-0 backface-hidden rounded-3xl bg-[#091124] border-2 border-cyan-400 p-6 flex flex-col justify-between box-glow-multi shadow-2xl overflow-hidden">
              <div className="w-14 h-4 bg-[#030611] rounded-full mx-auto border border-cyan-500/40" />

              <div className="flex items-center justify-between text-xs font-mono border-b border-slate-800 pb-2">
                <span className="text-[#00ff9d] font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  DEV PASS // 2026
                </span>
                <span className="text-cyan-400">#DEV-SKNT-AI</span>
              </div>

              <div className="relative w-40 h-40 mx-auto rounded-2xl overflow-hidden border border-cyan-400/50 bg-[#040817] shadow-xl">
                <img
                  src="/assets/id.png"
                  alt="Sukant Photo"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent pointer-events-none" />
              </div>

              <div className="text-center space-y-1">
                <h4 className="text-lg font-black text-white">SUKANT BHATTACHARYA</h4>
                <p className="text-xs font-mono text-cyan-400">Android &amp; AI Systems Architect</p>
                <p className="text-[11px] font-mono text-rose-400 font-bold">@sukantcodes</p>
              </div>

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
          </motion.div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 7: REAL PHOTOGRAPHIC GALLERY */}
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
        </div>

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
            <motion.div
              key={i}
              whileHover={{ y: -6, scale: 1.04 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="bg-[#060c1d] border-2 border-slate-800 hover:border-emerald-400/50 rounded-2xl p-3 space-y-2 box-glow-multi"
            >
              <div className="aspect-[3/4] rounded-xl overflow-hidden bg-slate-900 relative">
                <img src={photo.path} alt={photo.title} className="w-full h-full object-cover" />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/80 font-mono text-[10px] text-emerald-400">
                  PHOTO 0{i + 1}
                </span>
              </div>
              <h4 className="font-bold text-xs text-white">{photo.title}</h4>
              <p className="text-[11px] text-slate-400">{photo.use}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 8: ROADMAP */}
      {/* ============================================================== */}
      <section id="roadmap" className="py-24 px-4 lg:px-8 max-w-5xl mx-auto space-y-12 relative">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-400 font-bold">
            <Activity className="w-3.5 h-3.5" />
            <span>ENGINEERING EVOLUTION</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white neon-glow-cyan">
            Architectural Milestones
          </h2>
        </div>

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
      {/* SECTION 9: CYBER TERMINAL */}
      {/* ============================================================== */}
      <section id="terminal" className="py-24 px-4 lg:px-8 max-w-4xl mx-auto space-y-8 relative">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-400 font-bold">
            <TerminalIcon className="w-3.5 h-3.5" />
            <span>INTERACTIVE CYBER SHELL</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white neon-glow-green">
            Terminal Diagnostics Console
          </h2>
          <p className="text-sm text-slate-400">
            Type <code className="text-emerald-400 font-mono">help</code>, <code className="text-emerald-400 font-mono">skills</code>, <code className="text-emerald-400 font-mono">projects</code>, or <code className="text-emerald-400 font-mono">download</code>.
          </p>
        </div>

        <div className="bg-[#030713] border-2 border-emerald-500/40 rounded-3xl p-5 box-glow-cyan shadow-2xl font-mono text-xs">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3 text-slate-500">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500" />
              <span className="w-3 h-3 rounded-full bg-amber-500" />
              <span className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="text-slate-400 ml-2">sukantcodes@cyber-host: ~</span>
            </div>
            <span>BASH 5.2</span>
          </div>

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
      {/* SECTION 10: CONNECT & TRANSMISSION */}
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
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <motion.a
            whileHover={{ y: -4, scale: 1.02 }}
            href="https://github.com/sukantcodes"
            target="_blank"
            rel="noreferrer"
            className="bg-[#060c1d] border-2 border-cyan-500/40 hover:border-cyan-400 p-5 rounded-2xl box-glow-cyan transition flex flex-col justify-between space-y-4"
          >
            <div>
              <span className="text-xs font-mono text-cyan-400 font-bold block">01 // CODE REPOSITORIES</span>
              <h4 className="text-lg font-bold text-white mt-1">GitHub</h4>
              <p className="text-xs text-slate-400 mt-1">@sukantcodes</p>
            </div>
            <span className="text-xs font-mono text-cyan-400 flex items-center gap-1">
              Visit Profile <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </motion.a>

          <motion.a
            whileHover={{ y: -4, scale: 1.02 }}
            href="https://linkedin.com/in/sukantcodes"
            target="_blank"
            rel="noreferrer"
            className="bg-[#060c1d] border-2 border-blue-500/40 hover:border-blue-400 p-5 rounded-2xl box-glow-cyan transition flex flex-col justify-between space-y-4"
          >
            <div>
              <span className="text-xs font-mono text-blue-400 font-bold block">02 // PROFESSIONAL NETWORK</span>
              <h4 className="text-lg font-bold text-white mt-1">LinkedIn</h4>
              <p className="text-xs text-slate-400 mt-1">Sukant Bhattacharya</p>
            </div>
            <span className="text-xs font-mono text-blue-400 flex items-center gap-1">
              Connect <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </motion.a>

          <motion.a
            whileHover={{ y: -4, scale: 1.02 }}
            href="mailto:sukantxplodeprime@gmail.com"
            className="bg-[#060c1d] border-2 border-rose-500/40 hover:border-rose-400 p-5 rounded-2xl box-glow-crimson transition flex flex-col justify-between space-y-4"
          >
            <div>
              <span className="text-xs font-mono text-rose-400 font-bold block">03 // DIRECT INQUIRIES</span>
              <h4 className="text-lg font-bold text-white mt-1">Email</h4>
              <p className="text-xs text-slate-400 mt-1 break-all">sukantxplodeprime@gmail.com</p>
            </div>
            <span className="text-xs font-mono text-rose-400 flex items-center gap-1">
              Send Email <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </motion.a>

          <motion.div
            whileHover={{ y: -4, scale: 1.02 }}
            className="bg-[#060c1d] border-2 border-amber-500/40 p-5 rounded-2xl box-glow-multi transition flex flex-col justify-between space-y-4"
          >
            <div>
              <span className="text-xs font-mono text-amber-400 font-bold block">04 // MENTORSHIP</span>
              <h4 className="text-lg font-bold text-white mt-1">Topmate 1:1</h4>
              <p className="text-xs text-slate-400 mt-1">Architecture Reviews &amp; AI Guidance</p>
            </div>
            <span className="text-xs font-mono text-amber-400 flex items-center gap-1">
              Available <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </motion.div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* FINAL EXPORT BANNER WITH CONFETTI */}
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
            <motion.a
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              href="/profile-assets.zip"
              download="profile-assets.zip"
              onClick={triggerConfetti}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-[#00f5ff] to-[#ff2d55] text-black font-black text-sm shadow-xl shadow-cyan-500/40 transition"
            >
              <Download className="w-4 h-4" />
              <span>Download profile-assets.zip</span>
            </motion.a>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={copyReadme}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-sm font-semibold transition"
            >
              <Copy className="w-4 h-4 text-cyan-400" />
              <span>Copy Raw README</span>
            </motion.button>
          </div>
        </div>
      </section>

      {/* Cyber Footer */}
      <footer className="border-t border-white/10 bg-[#02040a] py-10 px-4 text-center text-xs text-slate-500 space-y-3">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <span className="font-mono text-slate-400 font-bold">
            SUKANT CODES // 120HZ IPHONE-GRADE ANIMATED VISION
          </span>
          <div className="flex items-center gap-4 text-slate-400 font-mono">
            <span>#00f5ff • #ff2d55 • #34c759</span>
            <span>Motion Springs</span>
            <span>Zero External Lag</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

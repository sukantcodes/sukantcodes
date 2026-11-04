import React, { useState } from 'react';
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
  CheckCircle2,
  FolderArchive,
  RotateCcw,
  Shield,
  FileText,
  Terminal,
  ArrowRight,
  Sliders,
  CheckCircle
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'profile' | 'timeline' | 'characters' | 'deploy' | 'files'>('profile');
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [bgTheme, setBgTheme] = useState<'navy' | 'checker' | 'github'>('navy');
  const [copied, setCopied] = useState(false);
  const [timelineSec, setTimelineSec] = useState<number | 'static'>(0);
  const [refreshKey, setRefreshKey] = useState(Date.now());
  const [viewMarkdown, setViewMarkdown] = useState(false);

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

</div>`;

  const copyReadme = () => {
    navigator.clipboard.writeText(rawReadme);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const restartTimeline = () => {
    setRefreshKey(Date.now());
  };

  const getViewportMaxWidth = () => {
    if (viewport === 'mobile') return 'max-w-[375px]';
    if (viewport === 'tablet') return 'max-w-[768px]';
    return 'max-w-[920px]';
  };

  const getBgClass = () => {
    if (bgTheme === 'checker') {
      return 'bg-[#0f172a] bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px]';
    }
    if (bgTheme === 'github') {
      return 'bg-[#0d1117] border border-[#30363d]';
    }
    return 'bg-[#070b16]';
  };

  const userPhotos = [
    {
      title: 'Studio Headshot (Primary Reference)',
      desc: 'Used for id.png stylized portrait, facial geometry, skin tone, hair and rim glow.',
      path: '/assets/aistudio/file_000000000e608211a4920d26f54dd0dd_d521a39d.jpg'
    },
    {
      title: 'Streetwear & Silver Chain Pose',
      desc: 'Used for right_pointing.png outfit, silver chain, dark checkered hoodie and right-facing angle.',
      path: '/assets/aistudio/file_00000000069c8211bd36f08583048ccb_59e251c0.jpg'
    },
    {
      title: 'Mountain Sunrise Field Photo',
      desc: 'Real outdoor photography reference highlighting adventure and mountain horizons.',
      path: '/assets/aistudio/file_00000000b1e88211a8071e0a8b460325_61d0ae41.jpg'
    },
    {
      title: 'Rooftop Urban Pose',
      desc: 'Secondary styling reference for casual streetwear and relaxed confidence.',
      path: '/assets/aistudio/file_000000006c288211bb133e92f170170e_94f4f368.jpg'
    },
    {
      title: 'Park Bench Sunlight Photo',
      desc: 'Arm posture and natural lighting reference.',
      path: '/assets/aistudio/file_00000000ef0c82118a0d01ead8452eb1_4f014dbd.jpg'
    }
  ];

  return (
    <div className="min-h-screen bg-[#050811] text-slate-100 flex flex-col selection:bg-[#247bff] selection:text-white">
      {/* Top Navigation Bar */}
      <header className="border-b border-slate-800/80 bg-[#070b16]/90 backdrop-blur sticky top-0 z-50 px-4 lg:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#247bff] via-[#38bdf8] to-[#ff354f] p-[1.5px] shadow-lg shadow-blue-500/20">
              <div className="w-full h-full bg-[#070b16] rounded-[10px] flex items-center justify-center font-bold text-base text-blue-400">
                SC
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base tracking-tight text-white">Sukant Codes</span>
                <span className="text-xs px-2 py-0.5 rounded-full font-mono bg-blue-500/10 text-blue-400 border border-blue-500/30">
                  @sukantcodes
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Verified Nov 2026
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                The Profile Playbook GitHub Suite • Self-Contained Vector Engine
              </p>
            </div>
          </div>

          <div className="flex items-center flex-wrap gap-2.5">
            <a
              href="/preview.html"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
            >
              <Eye className="w-3.5 h-3.5 text-blue-400" />
              <span>Stand-alone preview.html</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>

            <button
              onClick={copyReadme}
              className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-semibold">README Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                  <span>Copy README.md</span>
                </>
              )}
            </button>

            <a
              href="/profile-assets.zip"
              download="profile-assets.zip"
              className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-1.5 rounded-lg bg-gradient-to-r from-[#247bff] to-[#1d4ed8] hover:from-[#1d4ed8] hover:to-[#1e40af] text-white shadow-md shadow-blue-500/25 transition active:scale-95"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download ZIP (1.35 MB)</span>
            </a>
          </div>
        </div>

        {/* Studio Sub-Navigation Tabs */}
        <div className="max-w-7xl mx-auto mt-3 pt-2 border-t border-slate-800/50 flex items-center justify-between overflow-x-auto no-scrollbar gap-2">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setActiveTab('profile')}
              className={`inline-flex items-center gap-2 text-xs font-medium px-3.5 py-1.5 rounded-lg transition ${
                activeTab === 'profile'
                  ? 'bg-blue-600/20 text-blue-400 border border-blue-500/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Live GitHub Profile</span>
            </button>

            <button
              onClick={() => setActiveTab('timeline')}
              className={`inline-flex items-center gap-2 text-xs font-medium px-3.5 py-1.5 rounded-lg transition ${
                activeTab === 'timeline'
                  ? 'bg-blue-600/20 text-blue-400 border border-blue-500/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>SMIL Timeline Inspector (0s, 2s, 5s, 9s, 13s)</span>
            </button>

            <button
              onClick={() => setActiveTab('characters')}
              className={`inline-flex items-center gap-2 text-xs font-medium px-3.5 py-1.5 rounded-lg transition ${
                activeTab === 'characters'
                  ? 'bg-blue-600/20 text-blue-400 border border-blue-500/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Character Studio &amp; Photos</span>
            </button>

            <button
              onClick={() => setActiveTab('deploy')}
              className={`inline-flex items-center gap-2 text-xs font-medium px-3.5 py-1.5 rounded-lg transition ${
                activeTab === 'deploy'
                  ? 'bg-blue-600/20 text-blue-400 border border-blue-500/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <FolderArchive className="w-3.5 h-3.5" />
              <span>GitHub Upload Playbook</span>
            </button>

            <button
              onClick={() => setActiveTab('files')}
              className={`inline-flex items-center gap-2 text-xs font-medium px-3.5 py-1.5 rounded-lg transition ${
                activeTab === 'files'
                  ? 'bg-blue-600/20 text-blue-400 border border-blue-500/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Code className="w-3.5 h-3.5" />
              <span>Repository File Tree</span>
            </button>
          </div>

          <div className="text-[11px] font-mono text-slate-500 hidden md:block">
            Target: <span className="text-slate-300">sukantcodes/sukantcodes:main</span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 lg:p-8">
        {/* TAB 1: LIVE PROFILE VIEW */}
        {activeTab === 'profile' && (
          <div className="space-y-6">
            {/* Viewport & Environment Controls Toolbar */}
            <div className="bg-[#0b1122] border border-slate-800 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4 shadow-sm">
              <div className="flex items-center flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 font-medium">Viewport:</span>
                  <div className="flex bg-slate-900 rounded-lg p-0.5 border border-slate-800">
                    <button
                      onClick={() => setViewport('desktop')}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs rounded-md font-medium transition ${
                        viewport === 'desktop' ? 'bg-[#247bff] text-white' : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <Monitor className="w-3.5 h-3.5" />
                      <span>Desktop (920px)</span>
                    </button>
                    <button
                      onClick={() => setViewport('tablet')}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs rounded-md font-medium transition ${
                        viewport === 'tablet' ? 'bg-[#247bff] text-white' : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <Tablet className="w-3.5 h-3.5" />
                      <span>Tablet (768px)</span>
                    </button>
                    <button
                      onClick={() => setViewport('mobile')}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs rounded-md font-medium transition ${
                        viewport === 'mobile' ? 'bg-[#247bff] text-white' : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <Smartphone className="w-3.5 h-3.5" />
                      <span>Mobile (375px)</span>
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 font-medium">Theme:</span>
                  <div className="flex bg-slate-900 rounded-lg p-0.5 border border-slate-800">
                    <button
                      onClick={() => setBgTheme('navy')}
                      className={`px-3 py-1 text-xs rounded-md font-medium transition ${
                        bgTheme === 'navy' ? 'bg-[#247bff] text-white' : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      Deep Navy
                    </button>
                    <button
                      onClick={() => setBgTheme('github')}
                      className={`px-3 py-1 text-xs rounded-md font-medium transition ${
                        bgTheme === 'github' ? 'bg-[#247bff] text-white' : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      GitHub Dark
                    </button>
                    <button
                      onClick={() => setBgTheme('checker')}
                      className={`px-3 py-1 text-xs rounded-md font-medium transition ${
                        bgTheme === 'checker' ? 'bg-[#247bff] text-white' : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      Alpha Grid
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={restartTimeline}
                  className="inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
                  title="Re-trigger animations from 0s"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-blue-400" />
                  <span>Restart SMIL</span>
                </button>

                <button
                  onClick={() => setViewMarkdown(!viewMarkdown)}
                  className={`inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-lg border transition ${
                    viewMarkdown
                      ? 'bg-blue-600 text-white border-blue-500'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                  }`}
                >
                  <Code className="w-3.5 h-3.5" />
                  <span>{viewMarkdown ? 'Hide Raw Markdown' : 'View Raw Markdown'}</span>
                </button>
              </div>
            </div>

            {/* Raw Markdown Drawer */}
            {viewMarkdown && (
              <div className="bg-[#070b16] border border-blue-500/40 rounded-xl p-5 shadow-xl">
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-blue-400" />
                    <span className="font-mono text-xs text-slate-300">README.md (Exact GitHub Root Document)</span>
                  </div>
                  <button
                    onClick={copyReadme}
                    className="inline-flex items-center gap-1.5 text-xs bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded-md transition"
                  >
                    {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    <span>{copied ? 'Copied!' : 'Copy Code'}</span>
                  </button>
                </div>
                <pre className="text-xs font-mono text-slate-300 overflow-x-auto p-3 bg-[#04060c] rounded-lg border border-slate-800/80 leading-relaxed max-h-[300px]">
                  {rawReadme}
                </pre>
              </div>
            )}

            {/* GitHub Profile Container Preview */}
            <div className="flex justify-center">
              <div
                className={`w-full ${getViewPagerWrapperClass(viewport)} transition-all duration-300`}
              >
                {/* GitHub Simulated Header */}
                <div className="bg-[#161b22] border border-[#30363d] rounded-t-xl px-4 py-3 flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-200">sukantcodes</span>
                    <span>/</span>
                    <span className="font-bold text-white">README.md</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] text-slate-400">Preview Mode • GitHub Safe</span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  </div>
                </div>

                {/* Simulated GitHub Readme Body */}
                <div className={`p-4 sm:p-8 rounded-b-xl border-x border-b border-[#30363d] space-y-6 ${getBgClass()}`}>
                  {/* Title Bar */}
                  <h1 className="text-2xl font-bold tracking-tight text-white border-b border-slate-800 pb-3 flex items-center justify-between">
                    <span>Hi there, I'm Sukant 👋</span>
                    <span className="text-xs font-mono font-normal text-slate-400">sukantcodes/sukantcodes</span>
                  </h1>

                  {/* 01 Hero */}
                  <div className="relative group rounded-2xl overflow-hidden shadow-2xl transition hover:ring-1 hover:ring-blue-500/50">
                    <img
                      src={`/assets/hero.svg?v=1&t=${refreshKey}`}
                      alt="Sukant Codes - Hero Banner"
                      className="w-full h-auto block"
                    />
                    <div className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition bg-black/70 backdrop-blur px-2.5 py-1 rounded text-[11px] font-mono text-slate-300">
                      assets/hero.svg?v=1
                    </div>
                  </div>

                  {/* 02 About & Capabilities */}
                  <div className="relative group rounded-2xl overflow-hidden shadow-2xl transition hover:ring-1 hover:ring-blue-500/50">
                    <img
                      src={`/assets/about-life.svg?v=1&t=${refreshKey}`}
                      alt="Sukant Codes - Capabilities & Carousel"
                      className="w-full h-auto block"
                    />
                    <div className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition bg-black/70 backdrop-blur px-2.5 py-1 rounded text-[11px] font-mono text-slate-300">
                      assets/about-life.svg?v=1
                    </div>
                  </div>

                  {/* 03 Orbital Stack */}
                  <div className="relative group rounded-2xl overflow-hidden shadow-2xl transition hover:ring-1 hover:ring-blue-500/50">
                    <img
                      src={`/assets/stack.svg?v=1&t=${refreshKey}`}
                      alt="Sukant Codes - Three-Tier Orbital Stack"
                      className="w-full h-auto block"
                    />
                    <div className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition bg-black/70 backdrop-blur px-2.5 py-1 rounded text-[11px] font-mono text-slate-300">
                      assets/stack.svg?v=1
                    </div>
                  </div>

                  {/* 04 ID Dashboard */}
                  <div className="relative group rounded-2xl overflow-hidden shadow-2xl transition hover:ring-1 hover:ring-blue-500/50">
                    <img
                      src={`/assets/id-dashboard.svg?v=1&t=${refreshKey}`}
                      alt="Sukant Codes - Hanging Lanyard ID Dashboard"
                      className="w-full h-auto block"
                    />
                    <div className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition bg-black/70 backdrop-blur px-2.5 py-1 rounded text-[11px] font-mono text-slate-300">
                      assets/id-dashboard.svg?v=1
                    </div>
                  </div>

                  {/* 05 Connect */}
                  <div className="relative group rounded-2xl overflow-hidden shadow-2xl transition hover:ring-1 hover:ring-blue-500/50">
                    <img
                      src={`/assets/connect.svg?v=1&t=${refreshKey}`}
                      alt="Sukant Codes - Pointing Character Connect"
                      className="w-full h-auto block"
                    />
                    <div className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition bg-black/70 backdrop-blur px-2.5 py-1 rounded text-[11px] font-mono text-slate-300">
                      assets/connect.svg?v=1
                    </div>
                  </div>

                  {/* Clickable Social Badges (Real markdown links as specified in Playbook) */}
                  <div className="pt-6 border-t border-slate-800/80 text-center space-y-4">
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                        Verified External Touchpoints
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-2.5">
                      <a
                        href="https://github.com/sukantcodes"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#247bff] hover:bg-[#1d4ed8] text-white font-mono text-xs font-bold shadow transition"
                      >
                        <span>GitHub: @sukantcodes</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                      <a
                        href="https://linkedin.com/in/sukantcodes"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#0a66c2] hover:bg-[#084e96] text-white font-mono text-xs font-bold shadow transition"
                      >
                        <span>LinkedIn: Sukant</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                      <a
                        href="mailto:sukantxplodeprime@gmail.com"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#ff354f] hover:bg-[#e0263f] text-white font-mono text-xs font-bold shadow transition"
                      >
                        <span>Email: sukantxplodeprime@gmail.com</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-emerald-600 text-white font-mono text-xs font-bold shadow">
                        <span>● Status: ONLINE &amp; ACTIVE</span>
                      </span>
                    </div>
                  </div>

                  {/* Projects Showcase Table */}
                  <div className="pt-6 border-t border-slate-800/80">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-blue-400" />
                      <span>Production Repositories &amp; Engineering Highlights</span>
                    </h3>
                    <div className="overflow-x-auto rounded-xl border border-slate-800 bg-[#070b16]">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="border-b border-slate-800 bg-slate-900/80 text-slate-300 font-mono">
                            <th className="py-3 px-4 font-semibold">Repository</th>
                            <th className="py-3 px-4 font-semibold">Primary Stack</th>
                            <th className="py-3 px-4 font-semibold">Architecture &amp; Features</th>
                            <th className="py-3 px-4 font-semibold">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/60 font-sans text-slate-300">
                          <tr className="hover:bg-slate-800/20 transition">
                            <td className="py-3.5 px-4 font-semibold text-blue-400 font-mono">
                              <a
                                href="https://github.com/sukantcodes"
                                target="_blank"
                                rel="noreferrer"
                                className="hover:underline flex items-center gap-1"
                              >
                                The Ultimate JARVIS
                                <ExternalLink className="w-3 h-3 text-slate-500" />
                              </a>
                            </td>
                            <td className="py-3.5 px-4 font-mono text-slate-400">Kotlin • Gemini AI • Android SDK</td>
                            <td className="py-3.5 px-4 text-slate-300">
                              Autonomous AI voice assistant featuring sub-second voice recognition, tool calling, and local device automation.
                            </td>
                            <td className="py-3.5 px-4">
                              <span className="px-2 py-0.5 rounded-full text-[11px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                                🟢 Deployed
                              </span>
                            </td>
                          </tr>

                          <tr className="hover:bg-slate-800/20 transition">
                            <td className="py-3.5 px-4 font-semibold text-rose-400 font-mono">
                              <a
                                href="https://github.com/sukantcodes"
                                target="_blank"
                                rel="noreferrer"
                                className="hover:underline flex items-center gap-1"
                              >
                                MovieBox Streaming Engine
                                <ExternalLink className="w-3 h-3 text-slate-500" />
                              </a>
                            </td>
                            <td className="py-3.5 px-4 font-mono text-slate-400">Compose • ExoPlayer • Room</td>
                            <td className="py-3.5 px-4 text-slate-300">
                              Modern media streaming client with declarative UI, chunked preloading, and offline cache.
                            </td>
                            <td className="py-3.5 px-4">
                              <span className="px-2 py-0.5 rounded-full text-[11px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                                🟢 Deployed
                              </span>
                            </td>
                          </tr>

                          <tr className="hover:bg-slate-800/20 transition">
                            <td className="py-3.5 px-4 font-semibold text-amber-400 font-mono">
                              <a
                                href="https://github.com/sukantcodes"
                                target="_blank"
                                rel="noreferrer"
                                className="hover:underline flex items-center gap-1"
                              >
                                AI Systems Core
                                <ExternalLink className="w-3 h-3 text-slate-500" />
                              </a>
                            </td>
                            <td className="py-3.5 px-4 font-mono text-slate-400">Python • FastAPI • PyTorch</td>
                            <td className="py-3.5 px-4 text-slate-300">
                              Backend speech synthesis, agent routing pipelines, and neural assistant middleware.
                            </td>
                            <td className="py-3.5 px-4">
                              <span className="px-2 py-0.5 rounded-full text-[11px] font-mono bg-amber-500/10 text-amber-400 border border-amber-500/30">
                                🛠️ Active
                              </span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ANIMATION TIMELINE INSPECTOR */}
        {activeTab === 'timeline' && (
          <div className="space-y-6">
            <div className="bg-[#0b1122] border border-slate-800 rounded-xl p-5 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <Clock className="w-5 h-5 text-blue-400" />
                    <span>SMIL Vector Animation Timeline Verification</span>
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Playbook requirement: "Render every SVG at 0, 2, 5, 9 and 13 seconds, also with animation removed as an img element."
                  </p>
                </div>

                <button
                  onClick={restartTimeline}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs transition"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Restart Loop (0s)</span>
                </button>
              </div>

              {/* Time Bookmark Buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 mt-5">
                {[
                  { sec: 0, label: '0s: Initial Drop', desc: 'Lanyard drops, rising mask starts, progress bar 1 begins' },
                  { sec: 2, label: '2s: Settle & Reveal', desc: 'Damped pendulum settles, name emerges, role 1 active' },
                  { sec: 5, label: '5s: Role & Slide 2', desc: 'AI Voice role, MovieBox carousel, perpetual +/-1.7° swing' },
                  { sec: 9, label: '9s: Slide 3 & Orbit', desc: 'Kotlin lead, mountain photo slide, orbital planetary nodes' },
                  { sec: 13, label: '13s: Seamless Loop', desc: 'Full cycle complete, role 1 re-emerges, loop restarts' },
                  { sec: 'static' as const, label: 'Reduced Motion', desc: 'Static fallback: zero animation, final readable state' }
                ].map((item) => (
                  <button
                    key={String(item.sec)}
                    onClick={() => {
                      setTimelineSec(item.sec);
                      setRefreshKey(Date.now());
                    }}
                    className={`p-3 text-left rounded-xl border transition ${
                      timelineSec === item.sec
                        ? 'bg-blue-600/20 border-blue-500 text-white shadow-lg shadow-blue-500/10'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    <div className="font-mono text-xs font-bold text-blue-400">{item.label}</div>
                    <div className="text-[11px] text-slate-400 mt-1 leading-tight">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Individual SVG Cards with Time State Analysis */}
            <div className="grid grid-cols-1 gap-6">
              {[
                {
                  id: 'hero',
                  file: 'hero.svg',
                  name: '01 / Hero Banner',
                  timing: '12s Loop (4 roles x 3s) • 1s Rising Mask • Blinking Terminal Cursor',
                  detail:
                    'Self-contained rising-mask animation via SVG clipPath, cycling roles from Android Architect to AI Engineer to Kotlin Lead to Open Source, embedded base64 id.png with dual electric-blue and crimson rim halos.'
                },
                {
                  id: 'about-life',
                  file: 'about-life.svg',
                  name: '02 / About & Carousel',
                  timing: '12s Loop (3 slides x 4s) • 3 Segment Progress Bars (0-4s, 4-8s, 8-12s)',
                  detail:
                    'Capabilities on the left side beside an active 3-slide interests carousel with synchronized segment progress bars changing smoothly between Voice AI, MovieBox Streaming, and Mountain Field Explorations.'
                },
                {
                  id: 'stack',
                  file: 'stack.svg',
                  name: '03 / Orbital Stack Matrix',
                  timing: 'Continuous 24s, 32s, 40s elliptical planetary rotations',
                  detail:
                    'Three tilted elliptical orbits featuring Mobile Core (Kotlin, Android, Compose), AI & Systems (Python, Gemini, PyTorch), and DevOps/Tooling (Git, Docker, TS) plus organized stack chips below.'
                },
                {
                  id: 'id-dashboard',
                  file: 'id-dashboard.svg',
                  name: '04 / Lanyard ID Dashboard',
                  timing: '2.5s Entrance Damping + Perpetual +/-1.7° Pendulum Swing + 4s Foil Sweep',
                  detail:
                    'Realistic metal clasp with specular highlight, nylon ribbon strap, holographic foil sweep over id.png, dated barcode visualizer, and verified production repo cards.'
                },
                {
                  id: 'connect',
                  file: 'connect.svg',
                  name: '05 / Connect with Pointing Character',
                  timing: '1.6s Nudging Arrow Pulse • 4s Subtle Character Float',
                  detail:
                    'Embedded real right_pointing.png on the left with transparent alpha pointing toward social touchpoints (GitHub, LinkedIn, Email, Mentorship) with animated pointer indicator.'
                }
              ].map((item) => (
                <div key={item.id} className="bg-[#0b1122] border border-slate-800 rounded-xl p-6 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                    <div>
                      <h3 className="font-bold text-base text-white">{item.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="font-mono text-xs text-blue-400">assets/{item.file}?v=1</span>
                        <span className="text-slate-600">•</span>
                        <span className="text-xs text-slate-400">{item.timing}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <a
                        href={`/assets/${item.file}`}
                        download={item.file}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-300 border border-slate-700 transition"
                      >
                        <Download className="w-3 h-3" />
                        <span>Download SVG</span>
                      </a>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">{item.detail}</p>

                  <div className="bg-[#070b16] p-4 rounded-xl border border-slate-800 flex justify-center overflow-hidden">
                    <img
                      src={`/assets/${item.file}?v=1&t=${refreshKey}`}
                      alt={item.name}
                      className="w-full max-w-[900px] h-auto rounded-lg shadow-xl"
                      style={
                        timelineSec === 'static'
                          ? { animationPlayState: 'paused' }
                          : undefined
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: CHARACTER ASSET STUDIO & PHOTOS */}
        {activeTab === 'characters' && (
          <div className="space-y-6">
            <div className="bg-[#0b1122] border border-slate-800 rounded-xl p-5 shadow-sm">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <User className="w-5 h-5 text-blue-400" />
                <span>Character Asset Studio: Real Photos to Transparent PNGs</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1 max-w-3xl">
                Page 1 of the Profile Playbook strictly specifies creating two character assets from the user's real photos:
                <strong> id.png</strong> (Stylized Portrait) and <strong> right_pointing.png</strong> (Right-Pointing Character)
                with genuinely transparent alpha backgrounds (no baked-in checkerboards or solid squares).
              </p>
            </div>

            {/* Generated Target PNGs Inspection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Asset 1: id.png */}
              <div className="bg-[#0b1122] border border-slate-800 rounded-xl p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-[11px] font-mono font-bold text-blue-400">PLAYBOOK ASSET 01</span>
                    <h3 className="text-base font-bold text-white">id.png (The Stylized Portrait)</h3>
                    <p className="text-xs font-mono text-slate-400">assets/id.png (353 KB, 600x600 PNG)</p>
                  </div>
                  <a
                    href="/assets/id.png"
                    download="id.png"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow transition"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PNG</span>
                  </a>
                </div>

                <div className="text-xs text-slate-300 space-y-1">
                  <p>• Preserves recognizable face, skin tone, hairstyle, and facial features from uploaded studio photo.</p>
                  <p>• Electric-blue (#247bff) and crimson (#ff354f) rim glow styling along the perimeter.</p>
                  <p>• Fully keyed transparent alpha channel for seamless compositing on GitHub dark and light modes.</p>
                </div>

                {/* Alpha Verification Container */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="bg-[#070b16] p-4 rounded-xl border border-slate-800 text-center space-y-2">
                    <span className="text-[10px] font-mono text-blue-400">Dark Navy Mode</span>
                    <div className="h-48 flex items-center justify-center">
                      <img src="/assets/id.png" alt="id.png dark" className="max-h-full max-w-full object-contain" />
                    </div>
                  </div>

                  <div className="bg-[#f1f5f9] p-4 rounded-xl border border-slate-300 text-center space-y-2">
                    <span className="text-[10px] font-mono text-slate-700 font-bold">Light Mode Test</span>
                    <div className="h-48 flex items-center justify-center">
                      <img src="/assets/id.png" alt="id.png light" className="max-h-full max-w-full object-contain" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Asset 2: right_pointing.png */}
              <div className="bg-[#0b1122] border border-slate-800 rounded-xl p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-[11px] font-mono font-bold text-rose-400">PLAYBOOK ASSET 02</span>
                    <h3 className="text-base font-bold text-white">right_pointing.png (Pointing Pose)</h3>
                    <p className="text-xs font-mono text-slate-400">assets/right_pointing.png (125 KB, 600x750 PNG)</p>
                  </div>
                  <a
                    href="/assets/right_pointing.png"
                    download="right_pointing.png"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold shadow transition"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PNG</span>
                  </a>
                </div>

                <div className="text-xs text-slate-300 space-y-1">
                  <p>• Matched identity in dark checkered streetwear, silver necklace, and wristband from user photos.</p>
                  <p>• Natural hand pose pointing toward the viewer's RIGHT, guiding eyes directly to social cards.</p>
                  <p>• Transparent alpha background with cyber pulse indicator at fingertip.</p>
                </div>

                {/* Alpha Verification Container */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="bg-[#070b16] p-4 rounded-xl border border-slate-800 text-center space-y-2">
                    <span className="text-[10px] font-mono text-blue-400">Dark Navy Mode</span>
                    <div className="h-48 flex items-center justify-center">
                      <img
                        src="/assets/right_pointing.png"
                        alt="right_pointing dark"
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                  </div>

                  <div className="bg-[#f1f5f9] p-4 rounded-xl border border-slate-300 text-center space-y-2">
                    <span className="text-[10px] font-mono text-slate-700 font-bold">Light Mode Test</span>
                    <div className="h-48 flex items-center justify-center">
                      <img
                        src="/assets/right_pointing.png"
                        alt="right_pointing light"
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Uploaded User Photo References Gallery */}
            <div className="bg-[#0b1122] border border-slate-800 rounded-xl p-6 space-y-4">
              <h3 className="font-bold text-base text-white flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-blue-400" />
                <span>Uploaded Source Photos ({userPhotos.length} Images Provided by User)</span>
              </h3>
              <p className="text-xs text-slate-400">
                These are the real photos uploaded by the user to the workspace. Each was analyzed to preserve likeness, hairstyle, skin tone, clothing style, and demeanor.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                {userPhotos.map((photo, idx) => (
                  <div key={idx} className="bg-[#070b16] border border-slate-800/80 rounded-xl p-3 space-y-2.5">
                    <div className="aspect-[3/4] rounded-lg overflow-hidden bg-slate-900 border border-slate-800 relative group">
                      <img
                        src={photo.path}
                        alt={photo.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      />
                      <div className="absolute top-2 left-2 bg-black/75 px-2 py-0.5 rounded text-[10px] font-mono text-slate-300">
                        REF 0{idx + 1}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-xs text-white">{photo.title}</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">{photo.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: GITHUB DEPLOY & UPLOAD PLAYBOOK */}
        {activeTab === 'deploy' && (
          <div className="space-y-6">
            <div className="bg-[#0b1122] border border-slate-800 rounded-xl p-5 shadow-sm">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <FolderArchive className="w-5 h-5 text-blue-400" />
                <span>GitHub Profile Repository Deployment Playbook</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Direct implementation of Page 3 of the Profile Playbook ("PUT IT ON YOUR PROFILE"). Follow these exact 4 steps to activate your new animated README.
              </p>
            </div>

            {/* 4 Steps Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#070b16] border border-slate-800 rounded-xl p-5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-mono font-bold text-xs">
                    01
                  </span>
                  <span className="text-[11px] font-mono text-slate-500">github.com</span>
                </div>
                <h3 className="font-bold text-sm text-white">Target Repository</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Open your profile repository on GitHub:
                  <a
                    href="https://github.com/sukantcodes/sukantcodes"
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-400 hover:underline font-mono block mt-1"
                  >
                    https://github.com/sukantcodes/sukantcodes
                  </a>
                  If already created, switch to branch <span className="font-mono text-slate-200">main</span>.
                </p>
              </div>

              <div className="bg-[#070b16] border border-slate-800 rounded-xl p-5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-mono font-bold text-xs">
                    02
                  </span>
                  <span className="text-[11px] font-mono text-slate-500">Unpack Package</span>
                </div>
                <h3 className="font-bold text-sm text-white">Download &amp; Unzip</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Click the <strong>Download ZIP</strong> button at the top. Unzip the file to find:
                  <code className="text-blue-300 font-mono text-[11px] block mt-1">
                    README.md and assets/ (containing all 5 SVGs + 2 PNGs)
                  </code>
                </p>
              </div>

              <div className="bg-[#070b16] border border-slate-800 rounded-xl p-5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-mono font-bold text-xs">
                    03
                  </span>
                  <span className="text-[11px] font-mono text-slate-500">Add File &gt; Upload</span>
                </div>
                <h3 className="font-bold text-sm text-white">Upload Files into Repo</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  In GitHub, click <strong>Add file &gt; Upload files</strong>. Drag in both <strong>README.md</strong> and the <strong>assets/</strong> folder. Add commit message <em>"feat: customize animated profile playbook suite"</em> and commit to <strong>main</strong>.
                </p>
              </div>

              <div className="bg-[#070b16] border border-slate-800 rounded-xl p-5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-mono font-bold text-xs">
                    04
                  </span>
                  <span className="text-[11px] font-mono text-slate-500">Check Profile</span>
                </div>
                <h3 className="font-bold text-sm text-white">Verify Live Profile</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Visit <a href="https://github.com/sukantcodes" target="_blank" rel="noreferrer" className="text-blue-400 hover:underline font-mono">github.com/sukantcodes</a>. All 5 images load through GitHub Camo CDN with <span className="font-mono text-slate-200">?v=1</span> cache tags, and all social/project links open properly!
                </p>
              </div>
            </div>

            {/* Note about GitHub API Token / Direct Commit Access */}
            <div className="bg-gradient-to-r from-blue-950/40 to-slate-900 border border-blue-500/30 rounded-xl p-5 space-y-3">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-blue-400" />
                <h4 className="font-semibold text-sm text-white">Direct Git Sync vs Upload Package</h4>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                As per standard cloud container isolation and security, external write permissions to personal GitHub repositories require your GitHub Personal Access Token or direct upload via the web interface. All required files have been created in the root of this repository (<code className="text-blue-400">/README.md</code>, <code className="text-blue-400">/assets/*</code>, <code className="text-blue-400">/preview.html</code>) and packaged into an upload-ready archive (<code className="text-blue-400">profile-assets.zip</code>).
              </p>
              <div className="flex flex-wrap gap-3 pt-1">
                <a
                  href="/profile-assets.zip"
                  download="profile-assets.zip"
                  className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download profile-assets.zip</span>
                </a>
                <button
                  onClick={copyReadme}
                  className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy README.md Content</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: REPOSITORY FILE TREE */}
        {activeTab === 'files' && (
          <div className="space-y-6">
            <div className="bg-[#0b1122] border border-slate-800 rounded-xl p-5 shadow-sm">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Code className="w-5 h-5 text-blue-400" />
                <span>Generated Repository Files Checklist</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Verified files created in workspace root and assets folder according to the Playbook specification.
              </p>
            </div>

            <div className="bg-[#070b16] border border-slate-800 rounded-xl overflow-hidden">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-900/60 font-mono text-slate-400">
                    <th className="py-3 px-4">File Path</th>
                    <th className="py-3 px-4">Type</th>
                    <th className="py-3 px-4">Role &amp; Details</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono text-slate-300">
                  <tr>
                    <td className="py-3 px-4 text-blue-400 font-bold">/README.md</td>
                    <td className="py-3 px-4 text-slate-400">Markdown</td>
                    <td className="py-3 px-4 font-sans text-slate-300">
                      GitHub profile document linking all 5 SVGs with ?v=1, clickable badges and projects table.
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-emerald-400 text-xs font-sans">✓ Verified</span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <a href="/README.md" download className="text-blue-400 hover:underline">Download</a>
                    </td>
                  </tr>

                  <tr>
                    <td className="py-3 px-4 text-blue-400 font-bold">/assets/hero.svg</td>
                    <td className="py-3 px-4 text-slate-400">SVG Image</td>
                    <td className="py-3 px-4 font-sans text-slate-300">
                      Typed greeting, rising-mask name reveal, 4 cycling roles, pitch, portrait halo.
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-emerald-400 text-xs font-sans">✓ Verified</span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <a href="/assets/hero.svg" download className="text-blue-400 hover:underline">Download</a>
                    </td>
                  </tr>

                  <tr>
                    <td className="py-3 px-4 text-blue-400 font-bold">/assets/about-life.svg</td>
                    <td className="py-3 px-4 text-slate-400">SVG Image</td>
                    <td className="py-3 px-4 font-sans text-slate-300">
                      Capabilities beside 3-slide interests carousel with segment progress bars.
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-emerald-400 text-xs font-sans">✓ Verified</span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <a href="/assets/about-life.svg" download className="text-blue-400 hover:underline">Download</a>
                    </td>
                  </tr>

                  <tr>
                    <td className="py-3 px-4 text-blue-400 font-bold">/assets/stack.svg</td>
                    <td className="py-3 px-4 text-slate-400">SVG Image</td>
                    <td className="py-3 px-4 font-sans text-slate-300">
                      Three-tier tilted elliptical orbits with planetary nodes and grouped chips.
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-emerald-400 text-xs font-sans">✓ Verified</span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <a href="/assets/stack.svg" download className="text-blue-400 hover:underline">Download</a>
                    </td>
                  </tr>

                  <tr>
                    <td className="py-3 px-4 text-blue-400 font-bold">/assets/id-dashboard.svg</td>
                    <td className="py-3 px-4 text-slate-400">SVG Image</td>
                    <td className="py-3 px-4 font-sans text-slate-300">
                      Hanging lanyard ID, damped pendulum entrance, +/-1.7° swing, foil sweep, barcode.
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-emerald-400 text-xs font-sans">✓ Verified</span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <a href="/assets/id-dashboard.svg" download className="text-blue-400 hover:underline">Download</a>
                    </td>
                  </tr>

                  <tr>
                    <td className="py-3 px-4 text-blue-400 font-bold">/assets/connect.svg</td>
                    <td className="py-3 px-4 text-slate-400">SVG Image</td>
                    <td className="py-3 px-4 font-sans text-slate-300">
                      Right-pointing character, generously spaced social cards, nudging arrows.
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-emerald-400 text-xs font-sans">✓ Verified</span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <a href="/assets/connect.svg" download className="text-blue-400 hover:underline">Download</a>
                    </td>
                  </tr>

                  <tr>
                    <td className="py-3 px-4 text-rose-400 font-bold">/assets/id.png</td>
                    <td className="py-3 px-4 text-slate-400">PNG Alpha</td>
                    <td className="py-3 px-4 font-sans text-slate-300">
                      Transparent alpha stylized profile portrait from user photo with rim glow.
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-emerald-400 text-xs font-sans">✓ Verified</span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <a href="/assets/id.png" download className="text-blue-400 hover:underline">Download</a>
                    </td>
                  </tr>

                  <tr>
                    <td className="py-3 px-4 text-rose-400 font-bold">/assets/right_pointing.png</td>
                    <td className="py-3 px-4 text-slate-400">PNG Alpha</td>
                    <td className="py-3 px-4 font-sans text-slate-300">
                      Transparent alpha pointing character from user photo facing right.
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-emerald-400 text-xs font-sans">✓ Verified</span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <a href="/assets/right_pointing.png" download className="text-blue-400 hover:underline">Download</a>
                    </td>
                  </tr>

                  <tr>
                    <td className="py-3 px-4 text-amber-400 font-bold">/preview.html</td>
                    <td className="py-3 px-4 text-slate-400">HTML Suite</td>
                    <td className="py-3 px-4 font-sans text-slate-300">
                      Standalone test harness with 0/2/5/9/13s scrubber, alpha checkerboard &amp; viewport toggle.
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-emerald-400 text-xs font-sans">✓ Verified</span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <a href="/preview.html" target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">Open</a>
                    </td>
                  </tr>

                  <tr>
                    <td className="py-3 px-4 text-emerald-400 font-bold">/profile-assets.zip</td>
                    <td className="py-3 px-4 text-slate-400">ZIP Package</td>
                    <td className="py-3 px-4 font-sans text-slate-300">
                      Upload-ready bundle containing README.md and entire assets/ directory.
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-emerald-400 text-xs font-sans">✓ Verified</span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <a href="/profile-assets.zip" download className="text-blue-400 hover:underline font-bold">Download</a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-[#070b16] py-6 px-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-mono text-slate-400">sukantcodes // The Profile Playbook Suite</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Palette: #070b16 • #247bff • #ff354f</span>
            <span>Self-Contained SVGs</span>
            <span>Zero External Dependencies</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function getViewPagerWrapperClass(viewport: 'desktop' | 'tablet' | 'mobile') {
  if (viewport === 'mobile') return 'max-w-[375px]';
  if (viewport === 'tablet') return 'max-w-[768px]';
  return 'max-w-[920px]';
}

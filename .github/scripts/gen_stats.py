#!/usr/bin/env python3
"""Generates an animated 'live stats' SVG from the GitHub API (stdlib only)."""
import json, os, sys, urllib.request, html, datetime
USER = os.environ.get('GH_USER') or os.environ.get('GITHUB_REPOSITORY_OWNER') or 'sukantcodes'
TOKEN = os.environ.get('GITHUB_TOKEN', '')
OUT = sys.argv[1] if len(sys.argv) > 1 else 'dist/live-stats.svg'
def api(path):
    req = urllib.request.Request('https://api.github.com' + path, headers={'Accept': 'application/vnd.github+json', 'User-Agent': 'live-stats'})
    if TOKEN: req.add_header('Authorization', 'Bearer ' + TOKEN)
    with urllib.request.urlopen(req, timeout=30) as r: return json.load(r)
u = api(f'/users/{USER}')
repos = [r for r in api(f'/users/{USER}/repos?per_page=100&sort=pushed') if not r.get('fork')]
stars = sum(r['stargazers_count'] for r in repos)
langs = {}
for r in repos[:25]:
    try:
        for k, v in api(f"/repos/{USER}/{r['name']}/languages").items(): langs[k] = langs.get(k, 0) + v
    except Exception: pass
total = sum(langs.values()) or 1
top = sorted(langs.items(), key=lambda kv: -kv[1])[:6]
COL = ['#22d3ee', '#a78bfa', '#f472b6', '#34d399', '#fbbf24', '#60a5fa']
def ago(s):
    d = datetime.datetime.now(datetime.timezone.utc) - datetime.datetime.fromisoformat(s.replace('Z', '+00:00'))
    if d.days >= 1: return f'{d.days}d ago'
    h = d.seconds // 3600
    return f'{h}h ago' if h else 'just now'
W, H = 920, 520
o = []
a = o.append
a(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="100%">')
a('''<style>
.hd{font-family:"Segoe UI",Inter,system-ui,sans-serif;font-weight:800}.mono{font-family:ui-monospace,Menlo,Consolas,monospace}
.h3{font-family:"Arial Black","Segoe UI",sans-serif;font-weight:900}
@keyframes flow{from{transform:translateX(-300px)}to{transform:translateX(1000px)}}
@keyframes tick{from{transform:translateY(0)}to{transform:translateY(-var(--h))}}
@keyframes pulse{0%,100%{opacity:.55}50%{opacity:1}}
@keyframes drift{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
.pulse{animation:pulse 6s cubic-bezier(.45,0,.55,1) infinite}
.d1{animation:drift 8s cubic-bezier(.45,0,.55,1) infinite}.d2{animation:drift 8s cubic-bezier(.45,0,.55,1) infinite 1s}.d3{animation:drift 8s cubic-bezier(.45,0,.55,1) infinite 2s}.d4{animation:drift 8s cubic-bezier(.45,0,.55,1) infinite 3s}
@media (prefers-reduced-motion:reduce){*{animation:none!important}}
</style>''')
a('''<defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#050816"/><stop offset=".55" stop-color="#0b1030"/><stop offset="1" stop-color="#07101f"/></linearGradient>
<linearGradient id="tg" gradientUnits="userSpaceOnUse" x1="0" x2="520" spreadMethod="repeat"><stop offset="0" stop-color="#22d3ee"/><stop offset=".33" stop-color="#a78bfa"/><stop offset=".66" stop-color="#f472b6"/><stop offset="1" stop-color="#22d3ee"/><animateTransform attributeName="gradientTransform" type="translate" values="0 0;520 0" dur="10s" repeatCount="indefinite"/></linearGradient>
<linearGradient id="bd" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#22d3ee"/><stop offset=".5" stop-color="#a78bfa"/><stop offset="1" stop-color="#f472b6"/></linearGradient>
<linearGradient id="sh" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".45"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
<filter id="bl" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="55"/></filter>
<filter id="g" x="-20%" y="-30%" width="140%" height="160%"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
<clipPath id="card"><rect width="920" height="520" rx="30"/></clipPath></defs>''')
a('<g clip-path="url(#card)"><rect width="920" height="520" fill="url(#bg)"/>')
a('<g filter="url(#bl)"><circle cx="110" cy="90" r="150" fill="#22d3ee" opacity=".28"><animate attributeName="cx" values="110;260;110" dur="26s" calcMode="spline" keyTimes="0;.5;1" keySplines=".45 0 .55 1;.45 0 .55 1" repeatCount="indefinite"/></circle><circle cx="820" cy="430" r="170" fill="#a78bfa" opacity=".28"/><circle cx="470" cy="500" r="130" fill="#f472b6" opacity=".24"/></g>')
# title (layered 3D)
for i in range(10, 0, -1):
    a(f'<text x="{36+i*.5:.1f}" y="{84+i*.6:.1f}" class="h3" style="font-size:58px" fill="#1b2a6b" textLength="360" lengthAdjust="spacingAndGlyphs">LIVE STATS</text>')
a('<text x="36" y="84" class="h3" style="font-size:58px" fill="url(#tg)" stroke="#fff" stroke-opacity=".8" stroke-width="1" textLength="360" lengthAdjust="spacingAndGlyphs">LIVE STATS</text>')
now = datetime.datetime.now(datetime.timezone.utc).strftime('%d %b %Y %H:%M UTC')
a(f'<text x="40" y="112" class="mono" style="font-size:13px;letter-spacing:2px" fill="#8da2ff">@{html.escape(USER)}  ·  AUTO-UPDATED  ·  {now}</text>')
# gauges
mb = total / 1e6
toppct = 100 * top[0][1] / total if top else 0
g = [('REPOS', str(len(repos)), len(repos) / 20, '#22d3ee'), ('LANGUAGES', str(len(langs)), len(langs) / 12, '#a78bfa'), ('MB OF CODE', f'{mb:.1f}', mb / 10, '#f472b6'), ('TOP: ' + (top[0][0].upper()[:8] if top else '-'), f'{toppct:.0f}%', toppct / 100, '#fbbf24')]
for i, (lab, n, frac0, c) in enumerate(g):
    x = 30 + i * 218; y = 140; cx, cy, r = x + 56, y + 62, 38
    circ = 2 * 3.14159 * r; frac = max(.08, min(1, frac0)); off = circ * (1 - frac)
    a(f'<g class="d{i+1}"><g filter="url(#g)"><rect x="{x}" y="{y}" width="200" height="124" rx="22" fill="#0a0f2a" stroke="{c}" stroke-width="2"/></g><rect x="{x+3}" y="{y+3}" width="194" height="40" rx="19" fill="#fff" opacity=".04"/>')
    a(f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="none" stroke="#fff" stroke-opacity=".08" stroke-width="8"/>')
    a(f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="none" stroke="{c}" stroke-width="8" stroke-linecap="round" stroke-dasharray="{circ:.1f}" stroke-dashoffset="{circ:.1f}" transform="rotate(-90 {cx} {cy})" filter="url(#g)"><animate attributeName="stroke-dashoffset" values="{circ:.1f};{off:.1f};{off:.1f};{circ:.1f}" keyTimes="0;.3;.85;1" calcMode="spline" keySplines=".45 0 .55 1;0 0 1 1;.45 0 .55 1" dur="10s" begin="{i*.5}s" repeatCount="indefinite"/></circle>')
    a(f'<text x="{cx}" y="{cy+9}" text-anchor="middle" class="hd" style="font-size:26px" fill="#fff">{n}</text>')
    a(f'<text x="{x+108}" y="{y+56}" class="mono" style="font-size:11px;letter-spacing:1.5px" fill="{c}">{lab}</text><text x="{x+108}" y="{y+78}" class="mono" style="font-size:10.5px" fill="#7d8fe0">live from GitHub</text></g>')
# language flow bar
a('<text x="36" y="302" class="hd" style="font-size:15px;letter-spacing:3px" fill="#c9d3ff">LANGUAGE FLOW</text>')
a('<clipPath id="lb"><rect x="36" y="312" width="848" height="24" rx="12"/></clipPath><rect x="36" y="312" width="848" height="24" rx="12" fill="#fff" opacity=".07"/><g clip-path="url(#lb)">')
x = 36
for i, (k, v) in enumerate(top):
    w = max(8, 848 * v / sum(b for _, b in top)); c = COL[i % len(COL)]
    a(f'<rect x="{x:.1f}" y="312" width="{w:.1f}" height="24" fill="{c}"><animate attributeName="width" values="0;{w:.1f};{w:.1f};0" keyTimes="0;.25;.88;1" calcMode="spline" keySplines=".45 0 .55 1;0 0 1 1;.45 0 .55 1" dur="10s" begin="{i*.25}s" repeatCount="indefinite"/></rect>')
    x += w
a('<rect y="312" width="220" height="24" fill="url(#sh)" style="animation:flow 5s linear infinite"/></g>')
lx, ly = 40, 366
for i, (k, v) in enumerate(top):
    c = COL[i % len(COL)]; pct = 100 * v / total
    px = 40 + (i % 3) * 290; py = 366 + (i // 3) * 26
    a(f'<circle cx="{px+5}" cy="{py-4}" r="5" fill="{c}"><animate attributeName="r" values="4;6.5;4" dur="{4+i*.4:.1f}s" repeatCount="indefinite"/></circle><text x="{px+18}" y="{py}" class="hd" style="font-size:14px" fill="#e8ecff">{html.escape(k)}</text><text x="{px+170}" y="{py}" class="mono" style="font-size:13px" fill="{c}">{pct:.1f}%</text>')
# recent repos ticker
a('<text x="36" y="436" class="hd" style="font-size:15px;letter-spacing:3px" fill="#c9d3ff">LATEST ACTIVITY</text><clipPath id="tk"><rect x="36" y="444" width="848" height="60" rx="14"/></clipPath><rect x="36" y="444" width="848" height="60" rx="14" fill="#0a0f2a" stroke="#a78bfa" stroke-opacity=".5"/>')
items = repos[:6] or []
if items:
    rowh = 30; n = len(items)
    rows = ''
    for k in range(2):
        for i, r in enumerate(items):
            c = COL[i % len(COL)]; yy = 444 + 20 + (k * n + i) * rowh
            rows += f'<circle cx="56" cy="{yy-5}" r="5" fill="{c}"/><text x="72" y="{yy}" class="hd" style="font-size:14px" fill="#fff">{html.escape(r["name"])}</text><text x="360" y="{yy}" class="mono" style="font-size:12px" fill="{c}">{html.escape(r.get("language") or "code")}</text><text x="860" y="{yy}" text-anchor="end" class="mono" style="font-size:12px" fill="#8da2ff">pushed {ago(r["pushed_at"])}</text>'
    tot = n * rowh
    a(f'<style>@keyframes tk{{from{{transform:translateY(0)}}to{{transform:translateY(-{tot}px)}}}}.tk{{animation:tk {max(8,n*3)}s linear infinite}}</style><g clip-path="url(#tk)"><g class="tk">{rows}</g></g>')
a('</g>')
a('<rect x="2" y="2" width="916" height="516" rx="29" fill="none" stroke="url(#bd)" stroke-width="3" stroke-dasharray="260 2800" stroke-linecap="round"><animate attributeName="stroke-dashoffset" values="0;-3060" dur="12s" repeatCount="indefinite"/></rect></svg>')
os.makedirs(os.path.dirname(OUT) or '.', exist_ok=True)
open(OUT, 'w').write('\n'.join(o))
print('wrote', OUT, 'repos', len(repos), 'langs', top)

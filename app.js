// No framework/bundler: plain DOM + canvas is enough for a static game list.
const games = window.GAMES;
const link = g => g.url || `play.html?g=${encodeURIComponent(g.id)}`;
const $ = id => document.getElementById(id);

// Particle network background
const cv = $("bg"), ctx = cv.getContext("2d");
let pts = [], mouse = { x: -999, y: -999 };
function resize() {
  cv.width = innerWidth; cv.height = innerHeight;
  pts = Array.from({ length: Math.min(110, (innerWidth * innerHeight) / 14000) }, () => ({
    x: Math.random() * cv.width, y: Math.random() * cv.height,
    vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4, r: Math.random() * 2 + 0.5,
  }));
}
function tick() {
  ctx.clearRect(0, 0, cv.width, cv.height);
  for (const p of pts) {
    p.x = (p.x + p.vx + cv.width) % cv.width;
    p.y = (p.y + p.vy + cv.height) % cv.height;
    const dm = Math.hypot(p.x - mouse.x, p.y - mouse.y);
    if (dm < 120) { p.x += (p.x - mouse.x) / dm; p.y += (p.y - mouse.y) / dm; }
    ctx.fillStyle = "rgba(180,170,255,.8)";
    ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 7); ctx.fill();
  }
  for (let i = 0; i < pts.length; i++)
    for (let j = i + 1; j < pts.length; j++) {
      const d = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y);
      if (d < 130) {
        ctx.strokeStyle = `rgba(139,92,246,${1 - d / 130})`;
        ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y); ctx.stroke();
      }
    }
  requestAnimationFrame(tick);
}
addEventListener("resize", resize);
addEventListener("mousemove", e => { mouse.x = e.clientX; mouse.y = e.clientY; });
resize();
if (!matchMedia("(prefers-reduced-motion: reduce)").matches) tick();

// Typewriter
const words = ["No installs.", "Instant play.", "New games often.", "Feeling lucky?"];
let wi = 0, ci = 0, del = false;
(function type() {
  const w = words[wi];
  $("typed").textContent = w.slice(0, ci);
  if (!del && ci++ === w.length) { del = true; return setTimeout(type, 1400); }
  if (del && ci-- === 0) { del = false; wi = (wi + 1) % words.length; }
  setTimeout(type, del ? 40 : 90);
})();

// Count-up
let n = 0;
const up = setInterval(() => { $("count").textContent = n; if (n++ >= games.length) clearInterval(up); }, 120);

// Random
const random = e => { e.preventDefault(); location.href = link(games[Math.floor(Math.random() * games.length)]); };
$("random").onclick = random;
$("nav-random").onclick = random;

// Filters
const tags = ["all", ...new Set(games.flatMap(g => g.tags || []))];
let tag = "all";
$("chips").innerHTML = tags.map(t => `<button class="chip${t === tag ? " on" : ""}" data-t="${t}">${t}</button>`).join("");
$("chips").onclick = e => {
  if (!e.target.dataset.t) return;
  tag = e.target.dataset.t;
  document.querySelectorAll(".chip").forEach(c => c.classList.toggle("on", c.dataset.t === tag));
  render();
};
$("search").oninput = render;

function render() {
  const q = $("search").value.toLowerCase();
  const list = games.filter(g => (tag === "all" || g.tags?.includes(tag)) && (g.title + g.desc).toLowerCase().includes(q));
  $("grid").innerHTML = list.map((g, i) => {
    const [a, b] = g.colors || ["#8b5cf6", "#22d3ee"];
    const bg = g.thumb ? `url('${g.thumb}')` : `linear-gradient(135deg, ${a}, ${b})`;
    return `<a class="card" href="${link(g)}" style="--glow:${a};animation-delay:${i * 70}ms">
      <div class="thumb" style="background-image:${bg}">${g.thumb ? "" : `<span>${g.emoji || "🎮"}</span>`}</div>
      <div class="play">▶</div>
      <div class="info"><h3>${g.title}</h3><p>${g.desc || ""}</p>
        <div class="tags">${(g.tags || []).map(t => `<span>${t}</span>`).join("")}</div></div>
    </a>`;
  }).join("") || `<p class="empty">No games found 👾</p>`;
}
render();

// 3D tilt + shine follow
$("grid").addEventListener("mousemove", e => {
  const c = e.target.closest(".card"); if (!c) return;
  const r = c.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
  c.style.setProperty("--mx", x + "px"); c.style.setProperty("--my", y + "px");
  c.style.transform = `rotateY(${(x / r.width - 0.5) * 14}deg) rotateX(${(0.5 - y / r.height) * 14}deg) translateZ(10px)`;
});
$("grid").addEventListener("mouseout", e => {
  const c = e.target.closest(".card");
  if (c && !c.contains(e.relatedTarget)) c.style.transform = "";
});

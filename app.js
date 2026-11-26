// No framework: plain DOM is enough for a static game list.
const games = window.GAMES;
const link = g => g.url || `play.html?g=${encodeURIComponent(g.id)}`;
const $ = id => document.getElementById(id);

const random = e => { e.preventDefault(); location.href = link(games[Math.floor(Math.random() * games.length)]); };
$("random").onclick = random;
$("nav-random").onclick = random;

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
  $("grid").innerHTML = list.map(g => {
    // soft tint of the game's first color
    const bg = g.thumb ? `background-image:url('${g.thumb}')` : `background:color-mix(in srgb, ${(g.colors || ["#999"])[0]} 18%, var(--surface))`;
    return `<a class="card" href="${link(g)}">
      <div class="thumb" style="${bg}">${g.thumb ? "" : `<span>${g.emoji || "🎮"}</span>`}</div>
      <div class="info"><h3>${g.title}</h3><p>${g.desc || ""}</p></div>
    </a>`;
  }).join("") || `<p class="empty">No games found.</p>`;
}
render();

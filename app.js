// No framework: plain DOM is enough for a static game list. Favorites/recents live in localStorage (per browser).
// ?web = tab of games hosted on other sites (entries with url); default tab = games hosted here
const WEB = new URLSearchParams(location.search).has("web");
const games = window.GAMES.filter(g => !g.url === !WEB);
if (WEB) { document.querySelector(".hero h1").textContent = "Games from around the web."; document.querySelector(".hero p").textContent = "Free games on other sites. Opens in a new tab."; }
document.querySelector(`nav a[href="${WEB ? "?web" : "./#games"}"]`).setAttribute("aria-current", "page");
const link = g => g.url || `play.html?g=${encodeURIComponent(g.id)}`;
const $ = id => document.getElementById(id);
const store = { // localStorage can throw (private mode, blocked storage): fall back to defaults
  get(k, d) { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
  raw(k) { try { return localStorage.getItem(k); } catch { return null; } },
};
const NEW = new Set(games.slice(-8).map(g => g.id)); // list is in release order
let favs = new Set(store.get("favs", []));
const recent = store.get("recent", []).map(id => games.find(g => g.id === id)).filter(Boolean).slice(0, 6);

const random = e => { e.preventDefault(); location.href = link(games[Math.floor(Math.random() * games.length)]); };
$("random").onclick = random;
$("nav-random").onclick = random;

// chips: favorites + tags shared by 2+ games, most common first
const count = {};
games.forEach(g => g.tags?.forEach(t => count[t] = (count[t] || 0) + 1));
const tags = Object.keys(count).filter(t => count[t] > 1).sort((a, b) => count[b] - count[a]);
let tag = "all";
function chips() {
  const list = ["all", ...(favs.size ? ["favorites"] : []), "new", ...tags];
  if (!list.includes(tag)) tag = "all";
  $("chips").innerHTML = list.map(t => `<button class="chip${t === tag ? " on" : ""}" data-t="${t}">${t === "favorites" ? "★ favorites" : t}</button>`).join("");
}
$("chips").onclick = e => { if (e.target.dataset.t) { tag = e.target.dataset.t; chips(); render(); } };
$("search").oninput = render;
$("sort").onchange = render;
addEventListener("keydown", e => { if (e.key === "/" && document.activeElement !== $("search")) { e.preventDefault(); $("search").focus(); } });

function best(g) {
  if (!g.best) return "";
  const v = store.raw(g.best[0]);
  return v && +v ? `<span class="best">Best ${+(+v).toFixed(1)}${g.best[1] || ""}</span>` : "";
}
function card(g) {
  // soft tint of the game's first color
  const bg = g.thumb ? `background-image:url('${g.thumb}')` : `background:color-mix(in srgb, ${(g.colors || ["#999"])[0]} 18%, var(--surface))`;
  const fav = favs.has(g.id);
  return `<a class="card" href="${link(g)}"${g.url ? ` target="_blank" rel="noopener"` : ""}>
    <div class="thumb" style="${bg}">${g.thumb ? "" : `<span>${g.emoji || "🎮"}</span>`}
      ${NEW.has(g.id) ? `<em class="badge">New</em>` : ""}
      <button class="fav${fav ? " on" : ""}" data-fav="${g.id}" aria-label="${fav ? "Remove from" : "Add to"} favorites" aria-pressed="${fav}">${fav ? "★" : "☆"}</button>
    </div>
    <div class="info"><h3>${g.title}</h3><p>${g.desc || ""}</p>${best(g)}</div>
  </a>`;
}
function render() {
  const q = $("search").value.toLowerCase().trim();
  let list = games.filter(g =>
    (tag === "all" || (tag === "favorites" ? favs.has(g.id) : tag === "new" ? NEW.has(g.id) : g.tags?.includes(tag))) &&
    (g.title + " " + g.desc + " " + (g.tags || []).join(" ")).toLowerCase().includes(q));
  const sort = $("sort").value;
  if (sort === "new") list = list.slice().reverse();
  if (sort === "az") list = list.slice().sort((a, b) => a.title.localeCompare(b.title));
  $("grid").innerHTML = list.map(card).join("") || `<p class="empty">No games found.</p>`;
  $("count").textContent = `${list.length} game${list.length === 1 ? "" : "s"}`;
}
document.addEventListener("click", e => {
  const b = e.target.closest("[data-fav]"); if (!b) return;
  e.preventDefault(); // button sits inside the card link
  const id = b.dataset.fav;
  favs.has(id) ? favs.delete(id) : favs.add(id);
  store.set("favs", [...favs]); chips(); render(); renderRecent();
});
function renderRecent() {
  $("recent").hidden = !recent.length;
  $("recent-grid").innerHTML = recent.map(card).join("");
}
// player level from XP earned in games (same formula as games/kit.js)
function renderLevel() {
  const xp = +store.raw("kit-xp") || 0; if (!xp) return;
  const L = Math.floor((1 + Math.sqrt(1 + xp / 12.5)) / 2), lo = 50 * L * (L - 1), hi = 50 * (L + 1) * L;
  const top = games.map(g => [g, +store.raw("kit-xp:" + g.id) || 0]).filter(x => x[1]).sort((a, b) => b[1] - a[1])[0];
  $("lvl").hidden = false;
  $("lvl").innerHTML = `<b>Level ${L}</b><span class="bar"><i style="width:${(xp - lo) / (hi - lo) * 100}%"></i></span><small>${xp - lo} / ${hi - lo} XP to level ${L + 1}${top ? ` · most XP in ${top[0].title}` : ""}</small>`;
}
chips(); render(); renderRecent(); renderLevel();

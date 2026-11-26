// Regenerate card thumbnails: node scripts/thumbs.js [id ...]
// Needs Playwright (npm i -D playwright). Writes thumbs/<id>.jpg; reference it in games.js as thumb: "thumbs/<id>.jpg".
const { chromium } = require("playwright");
const path = require("path");
const root = path.resolve(__dirname, "..");
global.window = {}; require(path.join(root, "games.js"));

// Per-game setup so the screenshot shows real gameplay. Unlisted games just load and wait.
const setup = {
  "neon-snake": async p => {
    await p.evaluate(() => { // staged scene: winding snake, apple, golden star
      const path = [[3, 15]], legs = [[1, 0, 7], [0, -1, 4], [-1, 0, 5], [0, -1, 4], [1, 0, 8]];
      for (const [dx, dy, n] of legs) for (let i = 0; i < n; i++) { const [x, y] = path.at(-1); path.push([x + dx, y + dy]); }
      snake = path.reverse().map(([x, y]) => ({ x, y })); prev = snake; dir = { x: 1, y: 0 }; score = 24; combo = 3;
      food = { x: 16, y: 7, born: 0 }; bonus = { x: 15, y: 13, born: 0, ttl: 32 };
      burst(15.5, 7, "#ff5a5f", 14, .4); floatText(13, 6, "+3 combo", "#ffd166");
      state = "demo"; overlay(); hud();
    });
    await p.waitForTimeout(250);
    return "#wrap"; // crop to the board
  },
  "orb-dodge": async p => {
    await p.mouse.click(400, 500);
    for (let i = 0; i < 40; i++) { await p.mouse.move(400 + Math.sin(i / 4) * 250, 480); await p.waitForTimeout(80); }
  },
  "memory-flip": async p => {
    await p.evaluate(() => {
      const cards = [...document.querySelectorAll(".c")];
      ["🚀", "👾", "🌈"].forEach(i => cards.filter(c => c.dataset.i === i).forEach(c => c.classList.add("up", "done")));
      cards.find(c => !c.classList.contains("up")).classList.add("up");
    });
    await p.waitForTimeout(600);
  },
  "stack-tower": async p => {
    await p.keyboard.press("Space");
    for (let i = 0; i < 16; i++) { await p.evaluate(i => { const t = stack.at(-1); moving[axis] = t[axis] + (i % 4 ? .35 : 0); drop(); }, i); }
    await p.evaluate(() => moving[axis] = stack.at(-1)[axis] - 6);
    await p.waitForTimeout(300);
  },
  "gravity-golf": async p => {
    await p.evaluate(() => { load(3); trail = []; aim = { s: [300, 300], e: [180, 380] }; });
    await p.waitForTimeout(300);
  },
  "word-rain": async p => {
    await p.keyboard.press("Enter");
    await p.evaluate(() => {
      level = 3;
      for (let i = 0; i < 6; i++) { spawn(); words.at(-1).y = 60 + i * 70; }
      words[2].kind = "gold"; words[2].el.className = "w gold"; words[4].kind = "bomb"; words[4].el.className = "w bomb";
      target = words[5]; target.typed = 2; words.forEach(paint);
      score = 128; combo = 7; hud();
    });
    await p.waitForTimeout(400);
  },
  "mine-grid": async p => {
    await p.click('[data-s="medium"]');
    await p.evaluate(() => { click(136); cells.forEach((c, i) => c.mine && Math.random() < .5 && near(i).some(j => cells[j].open) && flag(i)); });
    await p.waitForTimeout(900);
  },
  chess: async p => {
    await p.evaluate(() => {
      for (const m of ["e4", "e5", "Nf3", "Nc6", "Bc4", "Bc5", "c3", "Nf6", "d4", "exd4", "cxd4", "Bb4+", "Nc3"]) lastMove = game.move(m);
      sel = "f6"; sync(); render();
    });
    await p.waitForTimeout(500);
  },
};

(async () => {
  const ids = process.argv.slice(2);
  const browser = await chromium.launch();
  for (const g of window.GAMES.filter(g => !g.url && (!ids.length || ids.includes(g.id)))) {
    const wide = g.id.endsWith("chess") ? 1000 : 800;
    const page = await browser.newPage({ viewport: { width: wide, height: wide * 3 / 4 }, deviceScaleFactor: 640 / wide });
    await page.goto(g.src || "file://" + path.join(root, "games", g.id, "index.html"));
    await page.waitForTimeout(g.src || g.id === "raumschach" ? 3500 : 800);
    const crop = setup[g.id] && await setup[g.id](page); // setup may return a selector to crop to
    await (crop ? page.locator(crop) : page).screenshot({ path: path.join(root, "thumbs", g.id + ".jpg"), type: "jpeg", quality: 82 });
    console.log("ok", g.id);
    await page.close();
  }
  await browser.close();
})();

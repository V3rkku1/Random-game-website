# Random Games Arcade

Static browser game site. No build step. Open `index.html` or host on GitHub Pages.

## Add a game

1. Create `games/<id>/index.html` (any self-contained HTML/JS game).
2. Add one line to `games.js`:

```js
{ id: "my-game", title: "My Game", desc: "Short pitch.", tags: ["puzzle"], emoji: "🧩", colors: ["#ff0", "#f0f"] },
```

Optional: `thumb: "games/my-game/thumb.png"` for an image card, `src: "https://..."` to play an externally hosted game inside the site, or `url: "https://..."` to link out to it.

The game shows up on the home page with search, tag filter, random button and a player page with fullscreen.

Optional `best: ["my-game-best", " pts"]` shows the player's record (read from that localStorage key) on the card. Keep new games at the end of the list: the last 8 get a "New" badge and "Newest" sort uses list order.

## Shared game kit

`games/kit.js` gives any game synth sound effects, XP toward a site-wide player level, M to mute and P/Esc to pause (auto-pauses when the tab or iframe loses focus). Typing games set `kit.keys = false` so M stays a letter:

```html
<script src="../kit.js"></script>
<script>
  kit.sfx("jump");                         // jump coin shoot hit boom pop bounce click knock win lose
  kit.xp(25, "level 2");                   // award XP toward the player level shown on the home page
  kit.pausable(() => state === "play");    // when pausing is allowed
  if (!kit.paused) update(dt);             // in the game loop
</script>
```

## Thumbnails

Cards show `thumbs/<id>.jpg` screenshots. Regenerate with Playwright:

```
npm i -D playwright
node scripts/thumbs.js            # all games
node scripts/thumbs.js my-game    # one game
```

Then add `thumb: "thumbs/my-game.jpg"` to the game's entry. Games without a thumb show their emoji.

# Random Games Arcade

Static browser game site. No build step. Open `index.html` or host on GitHub Pages.

## Add a game

1. Create `games/<id>/index.html` (any self-contained HTML/JS game).
2. Add one line to `games.js`:

```js
{ id: "my-game", title: "My Game", desc: "Short pitch.", tags: ["puzzle"], emoji: "🧩", colors: ["#ff0", "#f0f"] },
```

Optional: `thumb: "games/my-game/thumb.png"` for an image card, or `url: "https://..."` to link an external game.

The game shows up on the home page with search, tag filter, random button and a player page with fullscreen.

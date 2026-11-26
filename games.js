// Game registry. To add a game: drop a folder in games/<id>/ with an index.html, then add one entry below.
// Fields: id (folder name), title, desc, tags, emoji, colors [from, to]. Optional: thumb (image path), url (external link).
window.GAMES = [
  { id: "neon-snake", title: "Neon Snake", desc: "Eat glowing orbs. Don't bite yourself.", tags: ["arcade", "classic"], emoji: "🐍", colors: ["#00f5a0", "#00d9f5"] },
  { id: "orb-dodge", title: "Orb Dodge", desc: "Survive the falling meteor storm.", tags: ["arcade", "action"], emoji: "☄️", colors: ["#ff512f", "#dd2476"] },
  { id: "memory-flip", title: "Memory Flip", desc: "Match all pairs in as few moves as possible.", tags: ["puzzle"], emoji: "🃏", colors: ["#7f00ff", "#e100ff"] },
];

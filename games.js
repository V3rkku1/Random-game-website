// Game registry. To add a game: drop a folder in games/<id>/ with an index.html, then add one entry below.
// Fields: id (folder name), title, desc, tags, emoji, colors [from, to]. Optional: thumb (image path), src (external game URL, plays in the player page), url (external link, leaves the site).
window.GAMES = [
  { id: "neon-snake", title: "Snake", desc: "Eat, grow, chain combos, chase the golden star.", tags: ["arcade", "classic"], emoji: "🐍", colors: ["#00f5a0", "#00d9f5"] },
  { id: "orb-dodge", title: "Orb Dodge", desc: "Survive the falling meteor storm.", tags: ["arcade", "action"], emoji: "☄️", colors: ["#ff512f", "#dd2476"] },
  { id: "memory-flip", title: "Memory Flip", desc: "Match all pairs in as few moves as possible.", tags: ["puzzle"], emoji: "🃏", colors: ["#7f00ff", "#e100ff"] },
  { id: "guess-the-song", title: "Guess the Song", desc: "Name the song from a 0.1 second clip.", tags: ["quiz", "music"], emoji: "🎵", colors: ["#f472b6"], src: "https://v3rkku1.github.io/guess-the-song/" },
  { id: "guess-the-car", title: "Guess the Car", desc: "Millionaire-style quiz about cars, F1, rally and MotoGP.", tags: ["quiz", "cars"], emoji: "🏎️", colors: ["#f59e0b"], src: "https://v3rkku1.github.io/Guess-the-car/" },
];

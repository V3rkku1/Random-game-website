// Game registry. To add a game: drop a folder in games/<id>/ with an index.html, then add one entry below.
// Fields: id (folder name), title, desc, tags, emoji, colors [from, to]. Optional: thumb (image path), src (external game URL, plays in the player page), url (external link, leaves the site).
window.GAMES = [
  { id: "neon-snake", thumb: "thumbs/neon-snake.jpg", title: "Snake", desc: "Eat, grow, chain combos, chase the golden star.", tags: ["arcade", "classic"], emoji: "🐍", colors: ["#00f5a0", "#00d9f5"] },
  { id: "orb-dodge", thumb: "thumbs/orb-dodge.jpg", title: "Orb Dodge", desc: "Survive the falling meteor storm.", tags: ["arcade", "action"], emoji: "☄️", colors: ["#ff512f", "#dd2476"] },
  { id: "memory-flip", thumb: "thumbs/memory-flip.jpg", title: "Memory Flip", desc: "Match all pairs in as few moves as possible.", tags: ["puzzle"], emoji: "🃏", colors: ["#7f00ff", "#e100ff"] },
  { id: "guess-the-song", thumb: "thumbs/guess-the-song.jpg", title: "Guess the Song", desc: "Name the song from a 0.1 second clip.", tags: ["quiz", "music"], emoji: "🎵", colors: ["#f472b6"], src: "https://v3rkku1.github.io/guess-the-song/" },
  { id: "guess-the-car", thumb: "thumbs/guess-the-car.jpg", title: "Guess the Car", desc: "Millionaire-style quiz about cars, F1, rally and MotoGP.", tags: ["quiz", "cars"], emoji: "🏎️", colors: ["#f59e0b"], src: "https://v3rkku1.github.io/Guess-the-car/" },
  { id: "deep-dig", thumb: "thumbs/deep-dig.jpg", title: "Deep Dig", desc: "3D voxel mining. Dig for ore, upgrade your pick, reach the Heart Crystal.", tags: ["3d", "adventure", "mining"], emoji: "⛏️", colors: ["#e0a030"] },
  { id: "ping-pong", thumb: "thumbs/ping-pong.jpg", title: "Ping Pong", desc: "Table tennis vs the computer. Swing to angle and smash. First to 11.", tags: ["sports", "arcade"], emoji: "🏓", colors: ["#1d5fae"] },
  { id: "kings-last-stand", thumb: "thumbs/kings-last-stand.jpg", title: "King's Last Stand", desc: "First-person chess shooter. Dodge pieces moving by chess rules and gun them down.", tags: ["action", "shooter", "3d"], emoji: "👑", colors: ["#e11d48"] },
  { id: "shotgun-chess", thumb: "thumbs/shotgun-chess.jpg", title: "Shotgun Chess", desc: "Chess with two shotgun shells. Skip a move to blast any piece within 2 squares.", tags: ["strategy", "board"], emoji: "🔫", colors: ["#ff7a18"] },
  { id: "chess", thumb: "thumbs/chess.jpg", title: "Chess", desc: "Classic chess. Drag or tap to move, play the computer or a friend.", tags: ["strategy", "board"], emoji: "♟️", colors: ["#b58863"] },
  { id: "raumschach", thumb: "thumbs/raumschach.jpg", title: "Raumschach", desc: "3D chess on a 5×5×5 glass board. Rotate, zoom, conquer.", tags: ["strategy", "board", "3d"], emoji: "🧊", colors: ["#a48bff"] },
  { id: "stack-tower", thumb: "thumbs/stack-tower.jpg", title: "Stack Tower", desc: "Drop sliding blocks. Overhang gets sliced. Perfect drops chain combos.", tags: ["arcade", "one-button"], emoji: "🧱", colors: ["#f59e9e"] },
  { id: "gravity-golf", thumb: "thumbs/gravity-golf.jpg", title: "Gravity Golf", desc: "Minigolf in space. Slingshot around planets into the hole.", tags: ["puzzle", "physics"], emoji: "🪐", colors: ["#6366f1"] },
  { id: "word-rain", thumb: "thumbs/word-rain.jpg", title: "Word Rain", desc: "Type falling words before they hit the ground.", tags: ["typing", "arcade"], emoji: "🌧️", colors: ["#3b82f6"] },
  { id: "mine-grid", thumb: "thumbs/mine-grid.jpg", title: "Mine Grid", desc: "Reveal safe cells, flag the mines. Numbers count nearby bombs.", tags: ["puzzle", "classic"], emoji: "💣", colors: ["#5d7ef0"] },
  { id: "fort-frenzy", thumb: "thumbs/fort-frenzy.jpg", title: "Fort Frenzy", desc: "Build a 3D fort, grow gold and food, train troops and raid enemy forts.", tags: ["strategy", "3d", "builder"], emoji: "🏰", colors: ["#ffb340"] },
  { id: "build-rush", thumb: "thumbs/build-rush.jpg", title: "Build Rush", desc: "First-person building and editing. Ramp rush, edit drills, free build.", tags: ["3d", "builder", "action"], emoji: "🧱", colors: ["#ffd166"] },
];

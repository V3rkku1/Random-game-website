// Software registry. To add a project: one entry below. Fields: id, title, desc, platform, tags, repo (GitHub URL).
// Optional: icon (image path) or emoji, colors [tint], features [short lines], downloads [[label, url], ...].
window.SOFTWARE = [
  {
    id: "steam-stopper", title: "Steam Multitool", icon: "software/steam-stopper.png", colors: ["#1b6fd8"],
    desc: "Windows desktop app for your Steam client (formerly Steam Stopper). Cut or restore Steam's internet, act when downloads finish, bond two connections and more.",
    platform: "Windows 10 / 11", tags: ["steam", "network", "windows"],
    features: ["Firewall kill switch", "Download watcher", "DNS switcher", "Link bonding", "Per-app routes", "Cleaner"],
    repo: "https://github.com/V3rkku1/steam-stopper",
    downloads: [["Installer (.msi)", "https://github.com/V3rkku1/steam-stopper/releases/latest/download/SteamStopper.msi"], ["Portable (.zip)", "https://github.com/V3rkku1/steam-stopper/releases/latest/download/SteamStopper-portable.zip"]],
  },
  {
    id: "mod-manager", title: "Mod Manager", emoji: "🧩", colors: ["#5865f2"],
    desc: "Windows mod manager with a Discord-style UI and one-paste profile sharing. Browse, install, update and deploy mods, then share your whole setup with a code.",
    platform: "Windows", tags: ["mods", "minecraft", "windows"],
    features: ["Thunderstore", "Modrinth & CurseForge", "Nexus Mods", "GameBanana", "tModLoader", "Auto-updates"],
    repo: "https://github.com/V3rkku1/mod-manager",
    downloads: [["Latest release", "https://github.com/V3rkku1/mod-manager/releases/latest"]],
  },
  {
    id: "cs-plugin", title: "LAN Skin Tester (CS2)", emoji: "🔫", colors: ["#f59e0b"],
    desc: "Preview CS2 skins, knives, gloves, stickers and charms on your own local server before you buy them. A CounterStrikeSharp plugin plus a one-click Windows launcher.",
    platform: "Windows · CS2 local server", tags: ["cs2", "plugin", "windows"],
    features: ["!skin, !knife, !gloves", "Wear, seed, StatTrak", "Stickers & charms", "Bots & friends", "One-click setup"],
    note: "For your own local server only (sv_lan 1). Not for public community servers.",
    repo: "https://github.com/V3rkku1/Cs-plugin",
    downloads: [["Releases", "https://github.com/V3rkku1/Cs-plugin/releases"]],
  },
];

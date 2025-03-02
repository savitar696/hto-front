export const paths = {
  index: "/",
  home: "/home",
  news: "/news",

  leaderboard: "/leaderboard",
  profile: "/profile/:username",
  match: "/match/:id",
  settings: "/settings",

  auth: "/auth",
  logout: "/logout",
  play: "/play",

  rules: "/rules",
  catch: "*",
} as const;

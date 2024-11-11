export const paths = {
  index: "/",
  home: "/home",
  news: "/news",
  leaderboard: "/leaderboard",
  profile: "/profile/:username",

  auth: "/auth",
  logout: "/logout",

  rules: "/rules",
  catch: "*",
} as const;

type Role = {
  name: RoleName
  text: string
  permissions: string[]
  color?: string
}

export type RoleName = "ADMIN" | "USER" | "MODERATOR" | "WARDEN"

export const rolesConfig: Record<RoleName, Role> = {
  ADMIN: {
    name: "ADMIN",
    text: "Админ",
    permissions: [],
    color: "#00bebe",
  },
  USER: {
    name: "USER",
    text: "Игрок",
    permissions: [],
  },
  MODERATOR: {
    name: "MODERATOR",
    text: "Модератор",
    permissions: [],
    color: "#1b00ff",
  },
  WARDEN: {
    name: "WARDEN",
    text: "Главный модератор",
    permissions: [],
    color: "#00bebe",
  },
}

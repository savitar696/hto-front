type Role = {
  name: RoleName;
  text: string;
  permissions: string[];
  color?: string;
};

export type RoleName = 'ADMIN' | 'USER';

export const rolesConfig: Record<RoleName, Role> = {
  ADMIN: {
    name: "ADMIN",
    text: "Админ",
    permissions: [],
    color: "#CD5C5C"
  },
  USER: {
    name: "USER",
    text: "Игрок",
    permissions: [],
  },
}

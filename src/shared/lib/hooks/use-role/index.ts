import { RoleName, rolesConfig } from "@shared/lib/hooks/use-role/roles"

export const useRoleConfig = (roleName: RoleName | "GUEST") => {
  return (
    rolesConfig[roleName as RoleName] || {
      name: "GUEST",
      description: "Гость",
      permissions: [],
      color: "gray.500",
    }
  )
}
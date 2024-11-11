import { useGetInfo } from "@features/user-profile/auth/api/get-info";
import { FC, PropsWithChildren, useEffect } from "react";

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const obj = {
    refetchInterval: 5000,
    enabled: true,
  };
  const load = useGetInfo(obj);

  useEffect(() => {
    if (localStorage.getItem("DEV_TOKEN")) load;
  }, []);

  return children;
};

import { setAuth, setUserProfile } from "@entities/user/model";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const useLogout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setAuth(false), setUserProfile({}));
  }, []);
  console.log("successfull logout");
};

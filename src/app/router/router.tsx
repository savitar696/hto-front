import { useUser } from "@entities/user";
import { Forbidden } from "@pages/Forbidden";
import { motion } from "framer-motion";
import React, { FC } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { shallow } from "zustand/shallow";

import { routes } from "./index";

export const Router: FC = () => {
  const { isAuth } = useUser((state) => state, shallow);
  const location = useLocation();

  return (
    <motion.div
      key={location.key}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Routes>
        {routes.map((item) =>
          item.privacy.authRequire ? (
            isAuth ? (
              item.privacy.perms === null ? (
                <Route
                  key={item.path}
                  path={item.path}
                  element={item.element}
                />
              ) : (
                <Route
                  key={item.path}
                  path={item.path}
                  element={<Forbidden />}
                />
              )
            ) : (
              <Route key={item.path} path={item.path} element={<Forbidden />} />
            )
          ) : (
            <Route key={item.path} path={item.path} element={item.element} />
          )
        )}
      </Routes>
    </motion.div>
  );
};

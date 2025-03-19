import { CloseIcon } from "@components/icons/Icons";
import { Button } from "@components/ui/button/Button";
import { sidebarAnimation } from "@shared/lib/utils/Animations";
import { Items } from "@shared/lib/utils/Items";
import { motion } from "framer-motion";
import React, {
  FC,
  Fragment,
  useCallback,
  useEffect,
  useLayoutEffect,
} from "react";
import { Link, useLocation } from "react-router-dom";

import style from "./sidebar.module.scss";

interface SidebarSettingsInterface {
  settings?: {
    header: { show: boolean; content: React.CElement<any, any> };
    close?: boolean;
  };
}

interface SidebarInterface extends SidebarSettingsInterface {
  items: Items;
  additionalItems?: { show: boolean; items: Items };
  footerItems?: { show: boolean; items: Items };
  setState?: any;
  state?: any;
  styles?: any;
  backdropStyles?: any;
}

interface SidebarHeaderInterface extends SidebarSettingsInterface {
  state: { value: boolean; setHandler: React.Dispatch<any> };
}

interface SidebarBodyInterface {
  items: Items;
}

interface SidebarAdditionalInterface {
  items: Items;
}

const SidebarHeader: FC<SidebarHeaderInterface> = ({ state, settings }) => {
  return (
    <div className={style.header}>
      {settings?.header.show && <Fragment>{settings?.header.content}</Fragment>}
      {settings && settings.close && (
        <Button
          styles={{
            padding: "0",
            width: "40px",
            height: "40px",
            border: "none",
          }}
          onClick={() =>
            state.setHandler({
              state: false,
              sideItems: Object.entries(state).slice(-1),
            })
          }
        >
          <CloseIcon width={22} height={22} />
        </Button>
      )}
    </div>
  );
};

const SidebarBody: FC<SidebarBodyInterface> = ({ items }) => {
  return (
    <div className={style.body}>
      {items.map((item, key) => (
        <Link
          onClick={item.onClick}
          key={key}
          to={item.path}
          className={style.link}
        >
          {item.title}
        </Link>
      ))}
    </div>
  );
};

const SidebarAdditional: FC<SidebarAdditionalInterface> = ({ items }) => {
  return (
    <div style={{ marginTop: "28px" }} className={style.bodySecond}>
      {items.map((item, key) => (
        <Link
          onClick={item.onClick}
          key={key}
          to={item.path}
          className={style.link}
        >
          {item.title}
        </Link>
      ))}
    </div>
  );
};

const SidebarFooter: FC<SidebarAdditionalInterface> = ({ items }) => {
  return (
    <Fragment>
      <div className={style.separator}>
        <div className={style.line}></div>
      </div>
      <div className={style.socials}>
        {items.map((item, key) => (
          <a
            onClick={item.onClick}
            key={key}
            target={"_blank"}
            href={item.path}
            className={style.link}
            rel="noreferrer"
          >
            {item.icon?.element}
          </a>
        ))}
      </div>
    </Fragment>
  );
};

export const Sidebar: FC<SidebarInterface> = ({
  items,
  setState,
  state,
  settings,
  additionalItems,
  footerItems,
  styles,
  backdropStyles,
}) => {
  const [location, setLocation] = React.useState("");
  const locationRef = useLocation();

  useLayoutEffect(() => {
    setLocation(locationRef.pathname);
  }, [locationRef.pathname]);

  const escFunction = useCallback((event: any) => {
    if (event.key === "Escape") {
      setState(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);

    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, []);

  useEffect(() => {
    if (locationRef.pathname !== location) {
      setLocation(locationRef.pathname);
    }
  }, [location, locationRef.pathname]);

  useEffect(() => {
    if (location !== "" && locationRef.pathname !== location) {
      setState(false);
    }
  }, [location, locationRef.pathname]);

  return (
    <motion.div
      variants={sidebarAnimation}
      initial={"initial"}
      animate={"animate"}
      exit={"exit"}
      className={style.backdrop}
      style={{ ...backdropStyles }}
    >
      <div className={style.spaceArea} onClick={() => setState(false)}></div>
      <div className={style.sidebarWrapper} style={{ ...styles }}>
        <div className={style.sidebar}>
          <div className={style.sidebarContent}>
            <div className={style.headerBodyWrapper}>
              <SidebarHeader
                state={{ value: state, setHandler: setState }}
                settings={settings}
              />
              <SidebarBody items={items} />
              {additionalItems?.show && (
                <SidebarAdditional items={additionalItems.items} />
              )}
            </div>
            <div style={{ marginTop: "28px" }} className={style.footer}>
              {footerItems?.show && (
                <Fragment>
                  <SidebarFooter items={footerItems.items} />
                </Fragment>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

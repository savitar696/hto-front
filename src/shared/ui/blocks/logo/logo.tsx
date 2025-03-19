import { RoutesEnum } from "@app/router";
import { LogoComponents } from "@shared/ui/blocks/logo/logo.components";
import { LogoTypes } from "@shared/ui/blocks/logo/logo.types";
import { FC, Fragment } from "react";

import { LogoStyles } from "./logo.styles";
import { Link } from "react-router-dom";

export const Logo: FC<LogoTypes> = ({ href, type, width, height }) => {
  return (
    <Fragment>
      {href ? (
        <LogoStyles.Element>
          <Link to={RoutesEnum.HOME_PAGE}>
            {type == "mark" ? (
              <LogoComponents.Mark width={width} height={height} />
            ) : (
              <LogoComponents.Full width={width} height={height} />
            )}
          </Link>
        </LogoStyles.Element>
      ) : (
        <Fragment>
          {type == "mark" ? (
            <LogoComponents.Mark width={width} height={height} />
          ) : (
            <LogoComponents.Full width={width} height={height} />
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

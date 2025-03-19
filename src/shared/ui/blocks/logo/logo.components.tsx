import { LogoTypes } from "@shared/ui/blocks/logo/logo.types";
import { FC, HTMLAttributes } from "react";
import FullLogoBlack from "@shared/static/images/logo/full/fullLogoBlack.svg";

export namespace LogoComponents {
  export const Mark: FC<HTMLAttributes<SVGElement> & LogoTypes> = ({
    width,
    height,
    color,
    fillColor,
    ...other
  }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width ? width : "auto"}
      height={height ? height : "auto"}
      viewBox={"0 0 44 50"}
      {...(other as any)}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20 0L0 10V40L20 50V0ZM14 12L6 17V34L14 38V12Z"
        fill={
          fillColor
            ? fillColor
            : color == "white"
            ? "var(--white100)"
            : "var(--black100)"
        }
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M44 40L24 50V27L39 18L30 12V18L24 22V0L44 10V22L30 30V40L44 32.5V40Z"
        fill={
          fillColor
            ? fillColor
            : color == "white"
            ? "var(--white100)"
            : "var(--black100)"
        }
      />
    </svg>
  );

  export const Full: FC<HTMLAttributes<SVGElement> & LogoTypes> = ({
    width,
    height,
    color,
    ...other
  }) =>
    color == "white" ? (
      <img
        src={FullLogoBlack}
        width={width ? width : "auto"}
        height={height ? height : "auto"}
        alt="Full Logo"
        {...(other as any)}
      />
    ) : (
      <img
        src={FullLogoBlack}
        width={width ? width : "auto"}
        height={height ? height : "auto"}
        alt="Full Logo"
        {...(other as any)}
      />
    );
}

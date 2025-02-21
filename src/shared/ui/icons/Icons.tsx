import { FC } from "react"

import style from "./Icons.module.scss"

interface Icon {
  viewBox?: string
  fill?: string
  width?: number
  height?: number

  settings?: { useBG?: boolean }
}

export const SearchIcon: FC<Icon> = ({ viewBox, fill, height, width }) => {
  return (
    <div style={{ display: "flex", width: width, height: height }}>
      <svg
        viewBox={viewBox ? viewBox : "0 0 25 24"}
        fill={fill ? fill : "none"}
        width={width ? width : 24}
        height={height ? height : 24}
        xmlns="http://www.w3.org/2000/svg"
        className="sc-bdvvtL sc-iCfMLu gDGMpz sc-cCcXHH sc-kiIyQV dywJep fewNKo"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.74658 11.125C7.74658 8.70875 9.70534 6.75 12.1216 6.75C14.5378 6.75 16.4966 8.70875 16.4966 11.125C16.4966 13.5412 14.5378 15.5 12.1216 15.5C9.70534 15.5 7.74658 13.5412 7.74658 11.125ZM12.1216 5C8.73884 5 5.99658 7.74226 5.99658 11.125C5.99658 14.5077 8.73884 17.25 12.1216 17.25C13.5005 17.25 14.773 16.7943 15.7967 16.0253C15.8212 16.0579 15.8482 16.0891 15.8779 16.1187L18.5029 18.7437C18.8446 19.0854 19.3986 19.0854 19.7403 18.7437C20.082 18.402 20.082 17.848 19.7403 17.5063L17.1153 14.8813C17.0857 14.8516 17.0545 14.8246 17.0219 14.8001C17.7909 13.7764 18.2466 12.5039 18.2466 11.125C18.2466 7.74226 15.5043 5 12.1216 5Z"
          fill="currentColor"
        ></path>
      </svg>
    </div>
  )
}

export const CrownIcon: FC<Icon> = ({ viewBox, fill, height, width }) => {
  return (
    <div style={{ display: "flex", width: width, height: height }}>
      <svg
        viewBox={viewBox ? viewBox : "0 0 24 24"}
        fill={fill ? fill : "none"}
        width={width ? width : 24}
        height={height ? height : 24}
        xmlns="http://www.w3.org/2000/svg"
        style={{ fill: fill, transform: "msFilter" }}
      >
        <path d="m21 2-5 5-4-5-4 5-5-5v13h18zM5 21h14a2 2 0 0 0 2-2v-2H3v2a2 2 0 0 0 2 2z"></path>
      </svg>
    </div>
  )
}

export const ArrowIcon: FC<Icon> = ({ viewBox, fill, height, width }) => {
  return (
    <div style={{ display: "flex", width: width, height: height }}>
      <svg
        viewBox={viewBox ? viewBox : "0 0 25 24"}
        fill={fill ? fill : "none"}
        width={width ? width : 22}
        height={height ? height : 22}
        xmlns="http://www.w3.org/2000/svg"
        className="sc-bdvvtL sc-iCfMLu coxBnO sc-ejUSkt bYrZoE"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13.772 5.83984C14.0816 5.56465 14.5556 5.59254 14.8308 5.90213L19.8086 11.5021C20.0612 11.7863 20.0612 12.2145 19.8086 12.4987L14.8308 18.0987C14.5556 18.4083 14.0816 18.4361 13.772 18.1609C13.4624 17.8858 13.4345 17.4117 13.7097 17.1021L17.5779 12.7504H4.74805C4.33383 12.7504 3.99805 12.4146 3.99805 12.0004C3.99805 11.5862 4.33383 11.2504 4.74805 11.2504H17.5779L13.7097 6.89867C13.4345 6.58909 13.4624 6.11503 13.772 5.83984Z"
          fill="currentColor"
        ></path>
      </svg>
    </div>
  )
}

export const LightIcon: FC<Icon> = ({ viewBox, fill, height, width }) => {
  return (
    <div style={{ display: "flex", width: width, height: height }}>
      <svg
        viewBox={viewBox ? viewBox : "0 0 25 24"}
        fill={fill ? fill : "none"}
        width={width ? width : 22}
        height={height ? height : 22}
        xmlns="http://www.w3.org/2000/svg"
        className="sc-bdvvtL sc-iCfMLu iWfNDX"
      >
        <path
          d="M11 18.8989V14H7.58268C6.94996 14 6.60155 13.2648 7.00221 12.7751L13.6695 4.62613C14.1159 4.08061 15 4.39622 15 5.10106V10H18.4173C19.05 10 19.3984 10.7352 18.9978 11.2249L12.3305 19.3739C11.8841 19.9194 11 19.6038 11 18.8989Z"
          fill="currentColor"
        ></path>
      </svg>
    </div>
  )
}

export const FlyIcon: FC<Icon> = ({ viewBox, fill, height, width }) => {
  return (
    <div style={{ display: "flex", width: width, height: height }}>
      <svg
        viewBox={viewBox ? viewBox : "0 0 24 24"}
        fill={fill ? fill : "none"}
        width={width ? width : 22}
        height={height ? height : 22}
        xmlns="http://www.w3.org/2000/svg"
        className="sc-bdvvtL sc-iCfMLu iWfNDX"
      >
        <path
          d="M9.06298 11.8948L14.0908 10.2786L9.97524 13.4536C9.66687 13.6915 9.55307 14.1043 9.69606 14.4662L11.2684 18.4464C11.5361 19.1241 12.4679 19.1968 12.8378 18.5689L18.8778 8.31757C19.2212 7.73474 18.8002 7 18.123 7L5.87743 7C5.11619 7 4.71746 7.90283 5.23088 8.46396L8.14805 11.6522C8.37921 11.9049 8.73674 11.9996 9.06298 11.8948Z"
          fill="currentColor"
        ></path>
      </svg>
    </div>
  )
}
export const ShareIcon: FC<Icon> = ({ viewBox, fill, height, width }) => {
  return (
    <div style={{ display: "flex", width: width, height: height }}>
      <svg
        viewBox={viewBox ? viewBox : "0 0 24 24"}
        fill={fill ? fill : "none"}
        width={width ? width : 24}
        height={height ? height : 24}
        xmlns="http://www.w3.org/2000/svg"
        className="sc-bdvvtL sc-iCfMLu gDGMpz"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.53424 7.53032C9.24134 7.82321 8.76647 7.82321 8.47358 7.53032C8.18068 7.23743 8.18068 6.76255 8.47358 6.46966L11.4736 3.46966L12.0039 2.93933L12.5342 3.46966L15.5342 6.46966C15.8271 6.76255 15.8271 7.23743 15.5342 7.53032C15.2413 7.82321 14.7665 7.82321 14.4736 7.53032L12.7539 5.81065V15C12.7539 15.4142 12.4181 15.75 12.0039 15.75C11.5897 15.75 11.2539 15.4142 11.2539 15V5.81065L9.53424 7.53032ZM8.62891 11.75C7.59337 11.75 6.75391 12.5895 6.75391 13.625V16C6.75391 17.2426 7.76127 18.25 9.00391 18.25H15.0039C16.2465 18.25 17.2539 17.2426 17.2539 16V13.625C17.2539 12.5895 16.4144 11.75 15.3789 11.75C14.9647 11.75 14.6289 11.4142 14.6289 11C14.6289 10.5858 14.9647 10.25 15.3789 10.25C17.2429 10.25 18.7539 11.761 18.7539 13.625V16C18.7539 18.0711 17.075 19.75 15.0039 19.75H9.00391C6.93284 19.75 5.25391 18.0711 5.25391 16V13.625C5.25391 11.761 6.76495 10.25 8.62891 10.25C9.04312 10.25 9.37891 10.5858 9.37891 11C9.37891 11.4142 9.04312 11.75 8.62891 11.75Z"
          fill="currentColor"
        ></path>
      </svg>
    </div>
  )
}

export const DotsIcon: FC<Icon> = ({ viewBox, fill, height, width }) => {
  return (
    <div style={{ display: "flex", width: width, height: height }}>
      <svg
        viewBox={viewBox ? viewBox : "0 0 24 24"}
        fill={fill ? fill : "none"}
        width={width ? width : 24}
        height={height ? height : 24}
        xmlns="http://www.w3.org/2000/svg"
        className="sc-bdvvtL sc-iCfMLu gDGMpz"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.5 12C8.5 12.8284 7.82843 13.5 7 13.5C6.17157 13.5 5.5 12.8284 5.5 12C5.5 11.1716 6.17157 10.5 7 10.5C7.82843 10.5 8.5 11.1716 8.5 12ZM13.5 12C13.5 12.8284 12.8284 13.5 12 13.5C11.1716 13.5 10.5 12.8284 10.5 12C10.5 11.1716 11.1716 10.5 12 10.5C12.8284 10.5 13.5 11.1716 13.5 12ZM16.999 13.5C17.8274 13.5 18.499 12.8284 18.499 12C18.499 11.1716 17.8274 10.5 16.999 10.5C16.1706 10.5 15.499 11.1716 15.499 12C15.499 12.8284 16.1706 13.5 16.999 13.5Z"
          fill="currentColor"
        ></path>
      </svg>
    </div>
  )
}

export const CloseIcon: FC<Icon> = ({ viewBox, fill, height, width }) => {
  return (
    <div style={{ display: "flex", width: width, height: height }}>
      <svg
        viewBox={viewBox ? viewBox : "0 0 24 24"}
        fill={fill ? fill : "none"}
        width={width ? width : 24}
        height={height ? height : 24}
        xmlns="http://www.w3.org/2000/svg"
        className="sc-bdvvtL sc-iCfMLu iWfNDX"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M17.5303 7.53033C17.8232 7.23744 17.8232 6.76256 17.5303 6.46967C17.2374 6.17678 16.7626 6.17678 16.4697 6.46967L12 10.9393L7.53033 6.46967C7.23744 6.17678 6.76256 6.17678 6.46967 6.46967C6.17678 6.76256 6.17678 7.23744 6.46967 7.53033L10.9393 12L6.46967 16.4697C6.17678 16.7626 6.17678 17.2374 6.46967 17.5303C6.76256 17.8232 7.23744 17.8232 7.53033 17.5303L12 13.0607L16.4697 17.5303C16.7626 17.8232 17.2374 17.8232 17.5303 17.5303C17.8232 17.2374 17.8232 16.7626 17.5303 16.4697L13.0607 12L17.5303 7.53033Z"
          fill="currentColor"
        ></path>
      </svg>
    </div>
  )
}

export const AddIcon: FC<Icon> = ({ viewBox, fill, height, width }) => {
  return (
    <div style={{ display: "flex", width: width, height: height }}>
      <svg
        viewBox={viewBox ? viewBox : "0 0 24 24"}
        fill={fill ? fill : "none"}
        width={width ? width : 24}
        height={height ? height : 24}
        xmlns="http://www.w3.org/2000/svg"
        className="sc-bdvvtL sc-iCfMLu iWfNDX"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.8817 5.06067C12.8817 4.64645 12.5459 4.31066 12.1317 4.31067C11.7175 4.31067 11.3818 4.64641 11.3817 5.06062L11.3817 11.3817L5.06066 11.3817C4.64645 11.3817 4.31066 11.7175 4.31066 12.1317C4.31066 12.5459 4.64645 12.8817 5.06066 12.8817L11.3817 12.8817L11.3817 19.2028C11.3818 19.617 11.7175 19.9528 12.1317 19.9528C12.5459 19.9528 12.8817 19.617 12.8817 19.2028L12.8818 12.8817L19.2028 12.8817C19.617 12.8817 19.9528 12.5459 19.9528 12.1317C19.9528 11.7175 19.617 11.3818 19.2028 11.3818L12.8818 11.3817L12.8817 5.06067Z"
          fill="currentColor"
        />
      </svg>
    </div>
  )
}

export const ShieldIcon: FC<Icon> = ({ viewBox, fill, height, width }) => {
  return (
    <div style={{ display: "flex", width: width, height: height }}>
      <svg
        viewBox={viewBox ? viewBox : "0 0 17 21"}
        fill={fill ? fill : "none"}
        width={width ? width : 21}
        height={height ? height : 17}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.16547 20.9055C9.16547 20.9055 17.1655 16.9055 17.1655 10.9055V3.90552L9.16547 0.905518L1.16547 3.90552V10.9055C1.16547 16.9055 9.16547 20.9055 9.16547 20.9055Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}

export const CheckIcon: FC<Icon> = ({ viewBox, fill, height, width }) => {
  return (
    <div style={{ display: "flex", width: width, height: height }}>
      <svg
        viewBox={viewBox ? viewBox : "0 0 24 24"}
        fill={fill ? fill : "none"}
        width={width ? width : 24}
        height={height ? height : 24}
        xmlns="http://www.w3.org/2000/svg"
        className="sc-lcujXC nlPpa"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M20 7.00008C20.3905 7.3906 20.3905 8.02376 20 8.41428L9.70712 18.7072C9.3166 19.0977 8.68344 19.0977 8.29291 18.7072L4.00002 14.4143C3.60949 14.0237 3.60949 13.3906 4.00002 13.0001V13.0001C4.39055 12.6095 5.02371 12.6095 5.41423 13.0001L8.29291 15.8788C8.68344 16.2693 9.3166 16.2693 9.70713 15.8788L18.5858 7.00007C18.9763 6.60955 19.6095 6.60955 20 7.00008V7.00008Z"
          fill="currentColor"
        />
      </svg>
    </div>
  )
}

export const PremiumBackgroundBlack: FC<Icon> = ({
  viewBox,
  fill,
  height,
  width,
}) => {
  return (
    <div style={{ display: "flex", width: width, height: height }}>
      <svg
        viewBox={viewBox ? viewBox : "0 0 24 24"}
        fill={fill ? fill : "none"}
        width={width ? width : 24}
        height={height ? height : 24}
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="24" height="24" rx="24" fill="#16161a" />
        <path
          d="M11.9594 6.01079C12.0792 5.64226 12.6005 5.64226 12.7203 6.01079L13.9339 9.74595C13.9874 9.91075 14.141 10.0223 14.3143 10.0223H18.2417C18.6292 10.0223 18.7903 10.5182 18.4768 10.7459L15.2995 13.0544C15.1593 13.1563 15.1006 13.3368 15.1542 13.5016L16.3678 17.2368C16.4876 17.6053 16.0658 17.9117 15.7523 17.684L12.575 15.3755C12.4348 15.2737 12.2449 15.2737 12.1047 15.3755L8.92741 17.684C8.61393 17.9117 8.19214 17.6053 8.31188 17.2368L9.5255 13.5016C9.57905 13.3368 9.52039 13.1563 9.3802 13.0544L6.20288 10.7459C5.88939 10.5182 6.0505 10.0223 6.43799 10.0223H10.3654C10.5387 10.0223 10.6922 9.91075 10.7458 9.74595L11.9594 6.01079Z"
          fill={fill ? fill : "white"}
        />
      </svg>
    </div>
  )
}

export const PremiumBackgroundGradient: FC<Icon> = ({
  viewBox,
  fill,
  height,
  width,
}) => {
  return (
    <div
      className={style.PremiumBackgroundGradient}
      style={{ display: "flex", width: width, height: height }}
    >
      <svg
        viewBox={viewBox ? viewBox : "0 0 24 24"}
        fill={fill ? fill : "none"}
        width={width ? width : 24}
        height={height ? height : 24}
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="24" height="24" rx="8" fill="none" />
        <path
          d="M11.9594 6.01079C12.0792 5.64226 12.6005 5.64226 12.7203 6.01079L13.9339 9.74595C13.9874 9.91075 14.141 10.0223 14.3143 10.0223H18.2417C18.6292 10.0223 18.7903 10.5182 18.4768 10.7459L15.2995 13.0544C15.1593 13.1563 15.1006 13.3368 15.1542 13.5016L16.3678 17.2368C16.4876 17.6053 16.0658 17.9117 15.7523 17.684L12.575 15.3755C12.4348 15.2737 12.2449 15.2737 12.1047 15.3755L8.92741 17.684C8.61393 17.9117 8.19214 17.6053 8.31188 17.2368L9.5255 13.5016C9.57905 13.3368 9.52039 13.1563 9.3802 13.0544L6.20288 10.7459C5.88939 10.5182 6.0505 10.0223 6.43799 10.0223H10.3654C10.5387 10.0223 10.6922 9.91075 10.7458 9.74595L11.9594 6.01079Z"
          fill={fill ? fill : "black"}
        />
      </svg>
    </div>
  )
}

export const Star: FC<Icon> = ({ viewBox, fill, height, width }) => {
  return (
    <svg
      viewBox={viewBox ? viewBox : "0 0 24 24"}
      fill={fill ? fill : "none"}
      width={width ? width : 24}
      height={height ? height : 24}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="24" height="24" rx="8" fill="none" />
      <path
        d="M11.9594 6.01079C12.0792 5.64226 12.6005 5.64226 12.7203 6.01079L13.9339 9.74595C13.9874 9.91075 14.141 10.0223 14.3143 10.0223H18.2417C18.6292 10.0223 18.7903 10.5182 18.4768 10.7459L15.2995 13.0544C15.1593 13.1563 15.1006 13.3368 15.1542 13.5016L16.3678 17.2368C16.4876 17.6053 16.0658 17.9117 15.7523 17.684L12.575 15.3755C12.4348 15.2737 12.2449 15.2737 12.1047 15.3755L8.92741 17.684C8.61393 17.9117 8.19214 17.6053 8.31188 17.2368L9.5255 13.5016C9.57905 13.3368 9.52039 13.1563 9.3802 13.0544L6.20288 10.7459C5.88939 10.5182 6.0505 10.0223 6.43799 10.0223H10.3654C10.5387 10.0223 10.6922 9.91075 10.7458 9.74595L11.9594 6.01079Z"
        fill={fill ? fill : "black"}
      />
    </svg>
  )
}

export const AddImageIcon: FC<Icon> = ({ viewBox, fill, height, width }) => {
  return (
    <div style={{ display: "flex", width: width, height: height }}>
      <svg
        viewBox={viewBox ? viewBox : "0 0 18 18"}
        fill={fill ? fill : "none"}
        width={width ? width : 18}
        height={height ? height : 18}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.75 4.99985C6.75 5.96635 5.9665 6.74985 5 6.74985C4.0335 6.74985 3.25 5.96635 3.25 4.99985C3.25 4.03335 4.0335 3.24985 5 3.24985C5.9665 3.24985 6.75 4.03335 6.75 4.99985Z"
          fill={fill ? fill : "white"}
        ></path>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M4 0.249847C1.92893 0.249847 0.25 1.92878 0.25 3.99985V11.9998C0.25 14.0709 1.92893 15.7498 4 15.7498H8.47979C8.17149 15.063 8 14.3015 8 13.4998C8 10.4623 10.4624 7.99985 13.5 7.99985C14.3016 7.99985 15.0632 8.17134 15.75 8.47964V3.99985C15.75 1.92878 14.0711 0.249847 12 0.249847H4ZM1.75 3.99985C1.75 2.75721 2.75736 1.74985 4 1.74985H12C13.2426 1.74985 14.25 2.75721 14.25 3.99985V8.0311L11.9584 6.59884C11.391 6.24421 10.6573 6.30828 10.1599 6.7559L6.46256 10.0835C6.17937 10.3384 5.77595 10.4102 5.4222 10.2687L4.31158 9.82448C3.81 9.62385 3.23928 9.70842 2.81745 10.0459L1.75 10.8998V3.99985Z"
          fill={fill ? fill : "white"}
        ></path>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.5 13.4998C9.5 11.2907 11.2909 9.49985 13.5 9.49985C15.7091 9.49985 17.5 11.2907 17.5 13.4998C17.5 15.709 15.7091 17.4998 13.5 17.4998C11.2909 17.4998 9.5 15.709 9.5 13.4998ZM13.5 10.9998C13.9142 10.9998 14.25 11.3356 14.25 11.7498V12.7498H15.25C15.6642 12.7498 16 13.0856 16 13.4998C16 13.9141 15.6642 14.2498 15.25 14.2498H14.25V15.2498C14.25 15.6641 13.9142 15.9998 13.5 15.9998C13.0858 15.9998 12.75 15.6641 12.75 15.2498V14.2498H11.75C11.3358 14.2498 11 13.9141 11 13.4998C11 13.0856 11.3358 12.7498 11.75 12.7498H12.75V11.7498C12.75 11.3356 13.0858 10.9998 13.5 10.9998Z"
          fill={fill ? fill : "white"}
        ></path>
      </svg>
    </div>
  )
}

export const VkIcon: FC<Icon> = ({ viewBox, fill, height, width }) => {
  return (
    <div style={{ display: "flex", width: width, height: height }}>
      <svg
        viewBox={viewBox ? viewBox : "0 0 16 16"}
        fill={fill ? fill : "none"}
        width={width ? width : 18}
        height={height ? height : 18}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 7.68C0 4.05967 0 2.24933 1.12467 1.12467C2.24933 0 4.06 0 7.68 0H8.32C11.9403 0 13.7507 0 14.8753 1.12467C16 2.24933 16 4.06 16 7.68V8.32C16 11.9403 16 13.7507 14.8753 14.8753C13.7507 16 11.94 16 8.32 16H7.68C4.05967 16 2.24933 16 1.12467 14.8753C0 13.7507 0 11.94 0 8.32V7.68Z"
          fill={fill ? fill : "black"}
        />
        <path
          d="M8.4466 12C5.02998 12 3.0812 9.37237 3 5H4.71143C4.76765 8.20921 6.02936 9.56857 7.02873 9.84885V5H8.64023V7.76777C9.62711 7.64865 10.664 6.38739 11.0137 5H12.6252C12.3567 6.70971 11.2324 7.97097 10.4329 8.48949C11.2324 8.90991 12.5128 10.01 13 12H11.2261C10.8451 10.6687 9.89569 9.63864 8.64023 9.4985V12H8.4466Z"
          fill={fill ? fill : "white"}
        />
      </svg>
    </div>
  )
}

export const YouTubeIcon: FC<Icon> = ({ viewBox, fill, height, width }) => {
  return (
    <div style={{ display: "flex", width: width, height: height }}>
      <svg
        viewBox={viewBox ? viewBox : "0 0 16 16"}
        fill={fill ? fill : "none"}
        width={width ? width : 18}
        height={height ? height : 18}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15.6745 3.88667C15.4906 3.15188 14.951 2.57209 14.2659 2.37426C13.014 2.006 8.00555 2.00001 8.00555 2.00001C8.00555 2.00001 2.99787 1.99401 1.74516 2.346C1.07364 2.54211 0.518833 3.13475 0.333365 3.86869C0.00319895 5.20983 1.17139e-06 7.99143 1.17139e-06 7.99143C1.17139e-06 7.99143 -0.00319664 10.7867 0.324571 12.1142C0.50844 12.8481 1.04806 13.4279 1.73397 13.6257C2.99867 13.994 7.99356 14 7.99356 14C7.99356 14 13.002 14.006 14.2539 13.6549C14.9382 13.4579 15.4803 12.879 15.6665 12.145C15.9975 10.8047 15.9999 8.02398 15.9999 8.02398C15.9999 8.02398 16.0159 5.22781 15.6745 3.88667ZM6.40346 10.5684L6.40749 5.42992L10.5701 8.00342L6.40346 10.5684Z"
          fill={fill ? fill : "black"}
        />
      </svg>
    </div>
  )
}

export const DiscordIcon: FC<Icon> = ({ viewBox, fill, height, width }) => {
  return (
    <div style={{ display: "flex", width: width, height: height }}>
      <svg
        viewBox={viewBox ? viewBox : "0 0 16 16"}
        fill={fill ? fill : "none"}
        width={width ? width : 16}
        height={height ? height : 16}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13.1981 2.99473C12.2421 2.53431 11.2169 2.1951 10.1449 2.00081C10.1254 1.99707 10.1059 2.00644 10.0959 2.02518C9.96401 2.27131 9.81796 2.59241 9.71568 2.84479C8.56275 2.66363 7.41574 2.66363 6.28645 2.84479C6.18415 2.5868 6.0328 2.27131 5.90036 2.02518C5.8903 2.00706 5.8708 1.99769 5.85128 2.00081C4.77994 2.19448 3.75473 2.53369 2.79808 2.99473C2.7898 2.99848 2.7827 3.00473 2.77799 3.01285C0.83337 6.06208 0.300656 9.03635 0.561988 11.9738C0.56317 11.9881 0.570856 12.0019 0.581499 12.0106C1.86451 12.9995 3.10732 13.5999 4.32705 13.9978C4.34657 14.0041 4.36725 13.9966 4.37968 13.9797C4.6682 13.5662 4.9254 13.1301 5.14592 12.6715C5.15894 12.6447 5.14651 12.6128 5.11992 12.6022C4.71196 12.4398 4.3235 12.2417 3.94983 12.0169C3.92027 11.9987 3.91791 11.9544 3.9451 11.9331C4.02373 11.8713 4.10239 11.8069 4.17747 11.742C4.19106 11.7301 4.20999 11.7276 4.22596 11.7351C6.6808 12.9114 9.33846 12.9114 11.7643 11.7351C11.7803 11.727 11.7992 11.7295 11.8134 11.7414C11.8885 11.8063 11.9672 11.8713 12.0464 11.9331C12.0736 11.9544 12.0718 11.9987 12.0422 12.0169C11.6686 12.2461 11.2801 12.4398 10.8716 12.6016C10.845 12.6122 10.8331 12.6447 10.8462 12.6715C11.0714 13.1295 11.3286 13.5655 11.6118 13.9791C11.6236 13.9966 11.6449 14.0041 11.6644 13.9978C12.8901 13.5999 14.1329 12.9995 15.4159 12.0106C15.4271 12.0019 15.4342 11.9887 15.4354 11.9744C15.7482 8.57842 14.9116 5.62853 13.2176 3.01347C13.2135 3.00473 13.2064 2.99848 13.1981 2.99473ZM5.51251 10.1852C4.77344 10.1852 4.16446 9.47302 4.16446 8.59842C4.16446 7.72381 4.76163 7.01165 5.51251 7.01165C6.2693 7.01165 6.87238 7.73006 6.86055 8.59842C6.86055 9.47302 6.26338 10.1852 5.51251 10.1852ZM10.4967 10.1852C9.75766 10.1852 9.14868 9.47302 9.14868 8.59842C9.14868 7.72381 9.74583 7.01165 10.4967 7.01165C11.2535 7.01165 11.8566 7.73006 11.8448 8.59842C11.8448 9.47302 11.2535 10.1852 10.4967 10.1852Z"
          fill={fill ? fill : "black"}
        />
      </svg>
    </div>
  )
}
export const TelegramIcon: FC<Icon> = ({ viewBox, fill, height, width }) => {
  return (
    <div style={{ display: "flex", width: width, height: height }}>
      <svg
        viewBox={viewBox ? viewBox : "0 0 24 24"}
        fill={fill ? fill : "none"}
        width={width ? width : 16}
        height={height ? height : 16}
        xmlns="http://www.w3.org/2000/svg"
        className="sc-bdvvtL sc-iCfMLu iWfNDX"
      >
        <path
          d="M20.6601 4.22511C20.3531 3.96474 19.8708 3.92749 19.3722 4.12768H19.3713C18.8469 4.33811 4.52653 10.4806 3.94356 10.7315C3.83753 10.7684 2.91149 11.1139 3.00688 11.8835C3.09203 12.5774 3.8363 12.8648 3.92719 12.898L7.56787 14.1446C7.80941 14.9486 8.69983 17.915 8.89674 18.5488C9.01956 18.9438 9.21975 19.4629 9.5706 19.5698C9.87846 19.6885 10.1847 19.58 10.3828 19.4245L12.6087 17.3599L16.2019 20.1622L16.2874 20.2133C16.5314 20.3214 16.7652 20.3755 16.9883 20.3755C17.1606 20.3755 17.326 20.3431 17.4841 20.2784C18.0224 20.0574 18.2377 19.5444 18.2603 19.4863L20.9442 5.53557C21.108 4.79048 20.8803 4.41139 20.6601 4.22511ZM10.7787 14.6432L9.55054 17.9183L8.32237 13.8244L17.7383 6.86485L10.7787 14.6432Z"
          fill={fill ? fill : "black"}
        ></path>
      </svg>
    </div>
  )
}

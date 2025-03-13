export const sidebarAnimation = {
  initial: {
    opacity: 0,
    x: 10,
  },
  animate: {
    opacity: 1,
    x: 0,
  },
  exit: {
    opacity: 0,
    x: 60,
    transition: {
      duration: 0.2,
    },
  },
};

export const modalAnimation = {
  initial: {
    opacity: 0,
    swiftness: 100,
    y: 30,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: 60,
    transition: {
      duration: 0.2,
    },
  },
};

export const opacityAnimation = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

export const arrowAnimation = {
  initial: {
    opacity: 0,
    x: -5,
  },
  animate: {
    opacity: 1,
    x: 0,
  },
  exit: {
    opacity: 0,
    x: -10,
    transition: {
      duration: 0.1,
    },
  },
};

export const popoverAnimation = {
  initial: {
    opacity: 0,
    y: 40,
  },
  animate: {
    opacity: 0,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: 70,
  },
};

export const multipleStarModalAnimation = {
  initial: {
    opacity: 1,
    transition: {
      repeat: Infinity,
      delayChildren: 1,
      staggerChildren: 0.5,
    },
  },
};

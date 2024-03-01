const motionOptions = {
  listItemMotion: {
    initial: { opacity: 0, y: -15 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8 },
    exit: { opacity: 0, y: -15 },
  },
  fadeInOut: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
};

export default motionOptions;

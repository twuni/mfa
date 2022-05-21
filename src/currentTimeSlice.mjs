const DEFAULT_INTERVAL = 30;
const SECONDS = 1000;

export const currentTimeSlice = (options = {}) => {
  const {
    interval = DEFAULT_INTERVAL,
    now = new Date().getTime()
  } = options;

  const seconds = Math.floor(now / SECONDS);
  const slice = Math.floor(seconds / interval);

  return slice;
};

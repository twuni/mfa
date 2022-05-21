import { challenge } from './challenge.mjs';
import { currentTimeSlice } from './currentTimeSlice.mjs';

export const verify = (secret, code, options = {}) => {
  const {
    challengeOptions = {},
    timeSlice = currentTimeSlice(),
    tolerance = 1
  } = options;

  for (let i = -tolerance; i <= tolerance; i++) {
    const candidate = challenge(secret, { ...challengeOptions, timeSlice: timeSlice + i });

    if (candidate === code) {
      return;
    }
  }

  throw new Error('Verification failed');
};

export default verify;

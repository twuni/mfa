/* eslint-disable no-magic-numbers */

import { Buffer } from 'buffer';
import { createHmac } from 'crypto';
import { currentTimeSlice } from './currentTimeSlice.mjs';

const DIGITS_POWER = [1, 10, 100, 1000, 10000, 100000, 1000000, 10000000, 100000000];
const DEFAULT_DIGITS = 6;
const DEFAULT_ALGORITHM = 'sha1';

export const challenge = (secret, options = {}) => {
  const {
    algorithm = DEFAULT_ALGORITHM,
    digits = DEFAULT_DIGITS,
    timeSlice = currentTimeSlice()
  } = options;

  const timeSliceBuffer = Buffer.alloc(8);
  timeSliceBuffer.writeUInt32BE(timeSlice, 4);
  const hash = createHmac(algorithm, secret).update(timeSliceBuffer).digest();
  const offset = hash[hash.length - 1] & 0x0f;

  return String(((hash[offset] & 0x7f) << 24 | (hash[offset + 1] & 0xff) << 16 | (hash[offset + 2] & 0xff) << 8 | hash[offset + 3]) % DIGITS_POWER[digits]).padStart(digits, '0');
};

export default challenge;

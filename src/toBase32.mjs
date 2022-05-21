/* eslint-disable id-blacklist, max-statements, no-magic-numbers */

const BASE32 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ23456789'.split('');

export const toBase32 = (buffer) => {
  const n = buffer.length;
  const result = [];

  for (let i = 0; i < n; i += 5) {
    const a = buffer[i];

    result.push(BASE32[a >> 3]);

    const b = buffer[i + 1];

    result.push(BASE32[(a & 0x07) << 2 | b >> 6]);
    result.push(BASE32[b >> 1 & 0x1F]);

    const c = buffer[i + 2];

    result.push(BASE32[(b & 0x01) << 4 | c >> 4]);

    const d = buffer[i + 3];

    result.push(BASE32[(c & 0x0F) << 1 | d >> 7]);
    result.push(BASE32[d >> 2 & 0x1F]);

    const e = buffer[i + 4];

    result.push(BASE32[(d & 0x03) << 3 | e >> 5]);
    result.push(BASE32[e & 0x1F]);
  }

  return result.join('');
};

export default toBase32;

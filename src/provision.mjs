import { toBase32 } from './toBase32.mjs';

export const provision = (options = {}) => {
  const { issuer, secret, subject } = options;

  const url = new URL(`/${encodeURIComponent(subject)}`, 'otpauth://totp');

  url.searchParams.set('issuer', issuer);
  url.searchParams.set('secret', toBase32(secret));

  return url.toString();
};

export default provision;

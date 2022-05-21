import { strict as assert } from 'node:assert';
import { challenge } from './challenge.mjs';
import { currentTimeSlice } from './currentTimeSlice.mjs';

const timeSlice = currentTimeSlice({ now: new Date('2022-05-21T20:30:40.567Z').getTime() });
const secret = Buffer.from('lD784zegyFzjOvPtQZ8+BqaX1ql2FmOO3BPE6VSY1UQ=', 'base64');

assert.equal(challenge(secret, { timeSlice }), '178263', 'algorithm result matches precomputed known correct value');

/* eslint-disable no-magic-numbers */

import { strict as assert } from 'node:assert';
import { currentTimeSlice } from './currentTimeSlice.mjs';

assert.equal(currentTimeSlice({ interval: 30, now: new Date('2022-05-21T20:30:40.567Z').getTime() }), 55105501, 'algorithm result matches precomputed known correct value');
assert.equal(currentTimeSlice({ interval: 60, now: new Date('2022-05-21T20:30:40.567Z').getTime() }), 27552750, 'double interval of same timestamp should be half the slice value');

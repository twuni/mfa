import { strict as assert } from 'node:assert';
import { provision } from './provision.mjs';

const secret = Buffer.from('lD784zegyFzjOvPtQZ8+BqaX1ql2FmOO3BPE6VSY1UQ=', 'base64');

assert.equal(provision({
  issuer: 'ACME Widgets, Inc.',
  secret,
  subject: 'Alice Smith'
}), 'otpauth://totp/Alice%20Smith?issuer=ACME+Widgets%2C+Inc.&secret=SQ7PZYZXUDEFZYZ26PWUDHZ6A2TJPVVJOYLGHDW4CPCOSVEY2VCAAAAA', 'algorithm result matches precomputed known correct value');

# Twuni MFA

A tiny, no-frills library for integrating MFA into your app's authentication and provisioning flows.

## Features

 * Lightweight and minimal (zero dependencies)
 * Compatible with Google Authenticator (HMAC-SHA1 TOTP)
 * Readable implementation, so you can learn how to write your own (if you want to!)

## Usage

### Provisioning (aka: Setup)

To add MFA for one of your users, you need to generate (or derive) an MFA secret for that user.
The simplest way to do this in Node.js is via [`crypto.randomBytes()`][randomBytes], but you're free to choose your favorite PRNG.
You'll need to store this secret safely, because you'll need it every time the user needs to authenticate with MFA.

```javascript
import { randomBytes } from 'crypto';

const mfaSecret = randomBytes(32);
```

[randomBytes]: https://nodejs.org/api/crypto.html#cryptorandombytessize-callback

Once you have the user's MFA secret, you'll need to present them with a QR code to scan into their Authenticator app.
How you generate the QR code is up to you, but the *content* of that QR code is a special URL you get via this library's `provision()` function.

```javascript
import { provision } from '@twuni/mfa';

const mfaProvisioningUrl = provision({
  issuer: 'ACME Widgets, Inc.',
  secret: mfaSecret,
  subject: 'alice@example.com'
});
// "otpauth://totp/alice%40example.com?issuer=ACME+Widgets%2C+Inc.&secret=..."
```

Once the user has been presented with a QR code to scan for that URL, make sure you ask them to verify by asking them for their MFA code right away:

```javascript
import { verify } from '@twuni/mfa';

try {
  verify(mfaSecret, mfaCode);
  // MFA verification succeeded!
} catch (error) {
  // ...verification failed, code did not match!
}
```

If `verify()` does not throw an error, then MFA succeeded and you can turn on MFA for that user.

### Authentication with MFA

Typically, you want to ask the user to provide an MFA code after successfully logging in with their usual credentials.
Just integrate the same `verify()` step as above in the last step of the provisioning flow.

### MFA via email, text, or phone

You can use the `challenge()` function to generate an MFA code for a user, which you can send to them via whichever communication channel the user prefers for MFA. The `verify()` step is the same as before.

```javascript
import { challenge } from '@twuni/mfa';

const mfaCode = challenge(mfaSecret);
// "123004"
```

### Build your own Authenticator app

You can use the `challenge()` function, as above, to generate MFA codes for other apps, too, if you know their MFA secrets.
You can use this to automate MFA challenge/response protocols and/or build an MFA authenticator right into your app.

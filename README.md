# ArrayBuffer encoding and decoding tools

This package contains utilities to encode and decode ArrayBuffer objects to **base64** and **hex** with full support for Unicode and binary data. It's especially designed for usage in web browsers, but it works on Node.js too.

- Encode and decode ArrayBuffer objects (and typed arrays like Uint8Array, and strings) to base64 and hex, for the browser and Node.js
- Supports base64 "standard" and "URL-safe" encodings, with optional padding; custom base64 encodings can be defined as well
- Clean, well-documented APIs
- Reasonable performance

## Installation

Install from NPM:

```sh
npm i @italypaleale/arraybuffer
```

## Base64

This package offers support for encoding and decoding base64 in two variants:

- **"Standard" base64** (RFC 4648 §4): uses `+` and `/` for characters 62 and 63 respectively. Encoded strings have `=` padding characters added at the end by the `Encode` function, if necessary.  
  Import with:  

  ```js
  import {Encode, Decode} from '@italypaleale/arraybuffer/base64/standard'
  ```

  Can also use `@italypaleale/arraybuffer/base64` as alias.

- **URL-safe base64** (RFC 4648 §5): uses `-` and `_` for characters 62 and 63 respectively. Encoded strings are never padded by the `Encode` function.  
  Import with:  

  ```js
  import {Encode, Decode} from '@italypaleale/arraybuffer/base64/url'
  ```

> In all cases, the `Decode` function accepts strings with or without padding.

### Encoding to base64

To encode an ArrayBuffer to base64, use the `Encode(ab: ArrayBuffer): string` method:

```js
import {Encode} from '@italypaleale/arraybuffer/base64'
const ab = new ArrayBuffer(...)
const encoded = Encode(ab)
```

Typed arrays, such as Uint8Array objects, can be passed as well:

```js
import {Encode} from '@italypaleale/arraybuffer/base64'
const array = new Uint8Array(...)
const encoded = Encode(ab)
```

To encode a UTF-8 string, convert it to a typed array object first:

```js
import {Encode} from '@italypaleale/arraybuffer/base64'
const str = 'Hello world'
const textEnc = new TextEncoder()
const encoded = Encode(textEnc.encode(str))
```

### Decoding base64

To decode a base64-encoded string, use the `Decode(str: string): ArrayBuffer` method, which returns an ArrayBuffer object:

```js
import {Decode} from '@italypaleale/arraybuffer/base64'
const encoded = 'RGV2cw'
const ab = Decode(encoded)
```

The decoded ArrayBuffer can be converted to a string (for example, UTF-8 encoded) with:

```js
import {Decode} from '@italypaleale/arraybuffer/base64'
const encoded = 'RGV2cw'
const ab = Decode(encoded)
const textDecoder = new TextDecoder('utf-8')
const str = textDecoder.decode(ab)
```

### Custom base64 charset

If needed, you can define your own base64 charset by using the `Encoding` class in `@italypaleale/arraybuffer/base64/encoding`:

```js
import {Encoding} from '@italypaleale/arraybuffer/base64/encoding'
const base64 = new Encoding(charset, noPadding)
```

The constructor accepts two parameters:

- `charset: string` is a string of 64 characters containing the base64 charset to use
- `noPadding: boolean` if true, the `Encode` method never adds padding at the end of the string (note that the `Decode` method always considers padding optional)

The object contains two methods:

- `Encode(ab: ArrayBuffer): string`
- `Decode(str: string): ArrayBuffer`

## Hex

To import the hex encoding and decoding utilities, use:

```js
import {Encode, Decode} from '@italypaleale/arraybuffer/hex'
```

### Encoding to hex

To encode an ArrayBuffer to hex, use the `Encode(ab: ArrayBuffer): string` method:

```js
import {Encode} from '@italypaleale/arraybuffer/hex'
const ab = new ArrayBuffer(...)
const encoded = Encode(ab)
```

Typed arrays, such as Uint8Array objects, can be passed as well:

```js
import {Encode} from '@italypaleale/arraybuffer/hex'
const array = new Uint8Array(...)
const encoded = Encode(ab)
```

To encode a UTF-8 string, convert it to a typed array object first:

```js
import {Encode} from '@italypaleale/arraybuffer/hex'
const str = 'Hello world'
const textEnc = new TextEncoder()
const encoded = Encode(textEnc.encode(str))
```

### Decoding hex

To decode a hex-encoded string, use the `Decode(str: string): ArrayBuffer` method, which returns an ArrayBuffer object:

```js
import {Decode} from '@italypaleale/arraybuffer/hex'
const encoded = '54686520717569636b2062726f776e20f09fa68a206a756d7073206f766572203133206c617a7920f09f90b62e'
const ab = Decode(encoded)
```

The decoded ArrayBuffer can be converted to a string (for example, UTF-8 encoded) with:

```js
import {Decode} from '@italypaleale/arraybuffer/hex'
const encoded = '54686520717569636b2062726f776e20f09fa68a206a756d7073206f766572203133206c617a7920f09f90b62e'
const ab = Decode(encoded)
const textDecoder = new TextDecoder('utf-8')
const str = textDecoder.decode(ab)
```

## License

This package is released under a MIT license.

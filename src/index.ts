/**
 * This module exports the @base64 and @hex modules and it's the one used when importing the package with `import 'arraybuffer-encoding'`. You should consider using one of the submodules instead, such as `import 'arraybuffer-encoding/hex'` or `import 'arraybuffer-encoding/base64'`
 * @module
 */

/* tslint:disable:variable-name */

import {
    Decode as Base64Decode,
    Encode as Base64Encode
} from './base64/index.js'
import {
    Decode as HexDecode,
    Encode as HexEncode
} from './hex.js'

/** Base64 encoding and decoding utilities */
export const Base64 = {
    Decode: Base64Decode,
    Encode: Base64Encode
}

/** Hex encoding and decoding utilities */
export const Hex = {
    Decode: HexDecode,
    Encode: HexEncode
}

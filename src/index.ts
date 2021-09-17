/* tslint:disable:variable-name */

import {
    Decode as Base64Decode,
    Encode as Base64Encode
} from './base64'
import {
    Decode as HexDecode,
    Encode as HexEncode
} from './hex'

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

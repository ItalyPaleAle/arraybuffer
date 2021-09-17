/**
 * This module provides utilities to encode and decode base64 using the "URL-safe" encoding, where characters 63 and 64 are `-` and `_` respectively. The `Encode` function does not append padding in this case (with `Decode`, padding is always optional).
 * @module base64/url
 */

import {Encoding} from './encoding'

const obj = new Encoding('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_', true)

/**
 * Encode an ArrayBuffer to base64 in a string, using base64 "URL-safe" encoding. The result does not include any padding
 * @param ab Data to encode to base64
 * @returns Base64-encoded string
 */
export function Encode(ab: ArrayBuffer): string {
    return obj.Encode(ab)
}

/**
 * Decode a string from base64, using base64 "URL-safe" encoding. Padding is always optional.
 * @param str Base64-encoded string
 * @returns Data decoded from the base64 string
 */
export function Decode(str: string): ArrayBuffer {
    return obj.Decode(str)
}

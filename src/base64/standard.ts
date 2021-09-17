import {Encoding} from './encoding'

const obj = new Encoding('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/')

/**
 * Encode an ArrayBuffer to base64 in a string, using base64 "standard" encoding.
 * @param ab Data to encode to base64
 * @returns Base64-encoded string
 */
export function Encode(ab: ArrayBuffer): string {
    return obj.Encode(ab)
}

/**
 * Decode a string from base64, using base64 "standard" encoding. Padding is always optional.
 * @param str Base64-encoded string
 * @returns Data decoded from the base64 string
 */
export function Decode(str: string): ArrayBuffer {
    return obj.Decode(str)
}

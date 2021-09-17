/**
 * Base64 encoding and decoding with a given charset and optional padding.
 * This class can be used to create base64 encoders and decoders with custom charsets.
 * @module base64/encoding
 */
export class Encoding {
    private _charset: string
    private _noPadding: boolean
    private _valid: RegExp

    /**
     * 
     * @param charset Charset to use for base64 encoding. This must be 64-characters long.
     * @param noPadding If true, encoded strings won't include padding.
     */
    constructor(charset: string, noPadding?: boolean) {
        if (!charset || charset.length != 64) {
            throw Error('Charset must contain 64 characters')
        }
        this._charset = charset
        this._noPadding = !!noPadding
        this._valid = new RegExp('^[' + this._charset.replace('-', '\\-') + ']+={0,2}$')
    }

    /**
     * Encode an ArrayBuffer to base64 in a string.
     * @param ab Data to encode to base64
     * @returns Base64-encoded string
     */
    Encode(ab: ArrayBuffer): string {
        const len = ab.byteLength
        if (!len) {
            return ''
        }
        const view = new Uint8Array(ab)
        let res = ''

        for (let i = 0; i < len; i += 3) {
            res += this._charset[view[i] >> 2] +
                this._charset[((view[i] & 3) << 4) | (view[i + 1] >> 4)] +
                this._charset[((view[i + 1] & 15) << 2) | (view[i + 2] >> 6)] +
                this._charset[view[i + 2] & 63]
        }
        if (len % 3 == 2) {
                res = res.substring(0, res.length - 1)
                if (!this._noPadding) {
                    res += '='
                }
        }
        else if (len % 3 == 1) {
            res = res.substring(0, res.length - 2)
            if (!this._noPadding) {
                res += '=='
            }
        }

        return res
    }

    /**
     * Decode a string from base64. Padding is always optional.
     * @param str Base64-encoded string
     * @returns Data decoded from the base64 string
     */
    Decode(str: string): ArrayBuffer {
        if (!str) {
            return new ArrayBuffer(0)
        }
        if (!this._valid.test(str)) {
            throw Error('Invalid base64 input sequence')
        }

        let viewLen = Math.floor(str.length * 0.75)
        if (str[str.length - 2] == '=') {
            viewLen -= 2
        }
        else if (str[str.length - 1] == '=') {
            viewLen--
        }
        const view = new Uint8Array(viewLen)

        let enc1: number,
            enc2: number,
            enc3: number,
            enc4: number,
            i = 0,
            j = 0
        while (i < str.length * 0.75) {
            enc1 = this._charset.indexOf(str.charAt(j++))
            enc2 = this._charset.indexOf(str.charAt(j++))
            enc3 = this._charset.indexOf(str.charAt(j++))
            enc4 = this._charset.indexOf(str.charAt(j++))

            view[i++] = (enc1 << 2) | (enc2 >> 4)
            view[i++] = ((enc2 & 15) << 4) | (enc3 >> 2)
            view[i++] = ((enc3 & 3) << 6) | enc4
        }

        return view.buffer
    }
}

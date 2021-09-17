/**
 * This file is an alias for @base64/standard
 * @module base64
 */

/* tslint:disable:variable-name */

import {Encode as EncodeStandard, Decode as DecodeStandard} from './standard'
import {Encode as EncodeUrl, Decode as DecodeUrl} from './url'

export const Standard = {
    Encode: EncodeStandard,
    Decode: DecodeStandard
}
export const Url = {
    Encode: EncodeUrl,
    Decode: DecodeUrl
}
export {
    EncodeStandard as Encode,
    DecodeStandard as Decode
}

import 'mocha'
import 'should'
import assert from 'assert'
import {Encode, Decode} from '../src/hex'

// Test vectors from RFC 4648: https://datatracker.ietf.org/doc/html/rfc4648#section-10
const tests: Record<string,string> = {
    '': '',
    f: '66',
    fo: '666f',
    foo: '666f6f',
    foob: '666f6f62',
    fooba: '666f6f6261',
    foobar: '666f6f626172',
}

describe('Hex', () => {

    it('Decode', () => {
        const decoder = new TextDecoder('utf-8')
        for (const k in tests) {
            if (!Object.hasOwnProperty.call(tests, k)) {
                continue
            }
            const dec = Decode(tests[k])
            assert.strictEqual(dec.byteLength, k.length, `Length doesn't match for test ${k}`)
            assert.strictEqual(decoder.decode(dec), k, `Result doesn't match for test ${k}`)
        }

        // Error cases
        assert.throws(() => {
            Decode('0')
        }, Error('Length of string must be a multiple of 2'))
    })

    it('Encode', () => {
        const encoder = new TextEncoder()
        for (const k in tests) {
            if (!Object.hasOwnProperty.call(tests, k)) {
                continue
            }
            const enc = Encode(encoder.encode(k))
            assert.strictEqual(enc.length, tests[k].length, `Length doesn't match for test ${k}`)
            assert.strictEqual(enc, tests[k], `Result doesn't match for test ${k}`)
        }
    })

})

import * as assert from 'assert'
import * as Base64 from '../src/base64/index.js'
import * as Base64Std from '../src/base64/standard.js'
import * as Base64Url from '../src/base64/url.js'

function typedArraysEqual(a: Uint8Array, b: Uint8Array) {
    if (a.byteLength != b.byteLength) {
        return false
    }
    return a.every((v, i) => v == b[i])
}

describe('Base64', () => {

    // Test vectors from RFC 4648: https://datatracker.ietf.org/doc/html/rfc4648#section-10
    const tests = [
        {str: '', enc: ''},
        {str: 'f', enc: 'Zg=='},
        {str: 'fo', enc: 'Zm8='},
        {str: 'foo', enc: 'Zm9v'},
        {str: 'foob', enc: 'Zm9vYg=='},
        {str: 'fooba', enc: 'Zm9vYmE='},
        {str: 'foobar', enc: 'Zm9vYmFy'},
    ]

    it('Decode', () => {
        const decoder = new TextDecoder('utf-8')

        // Tests with padding
        for (let i = 0; i < tests.length; i++) {
            const test = tests[i]
            const dec = Base64.Decode(test.enc)
            assert.strictEqual(dec.byteLength, test.str.length, `Length doesn't match for test ${i}`)
            assert.strictEqual(decoder.decode(dec), test.str, `Result doesn't match for test ${i}`)
        }

        // Repeat tests without padding
        for (let i = 0; i < tests.length; i++) {
            const test = tests[i]
            let enc = test.enc
            while (enc.length && enc.charAt(enc.length - 1) == '=') {
                enc = enc.slice(0, -1)
            }
            const dec = Base64.Decode(enc)
            assert.strictEqual(dec.byteLength, test.str.length, `Length doesn't match for test ${i} (without padding)`)
            assert.strictEqual(decoder.decode(dec), test.str, `Result doesn't match for test ${i} (without padding)`)
        }

        // Error cases
        assert.throws(() => {
            Base64.Decode('.')
        }, Error('Invalid base64 input sequence'))
        assert.throws(() => {
            Base64.Decode('A83===')
        }, Error('Invalid base64 input sequence'))
    })

    it('Encode', () => {
        const encoder = new TextEncoder()
        for (let i = 0; i < tests.length; i++) {
            const test = tests[i]
            const enc = Base64.Encode(encoder.encode(test.str))
            assert.strictEqual(enc.length, test.enc.length, `Length doesn't match for test ${i}`)
            assert.strictEqual(enc, test.enc, `Result doesn't match for test ${i}`)
        }
    })

})

type testSuite = {
    dec: Uint8Array
    enc: string
}[]

function TestFactory(
    tests: testSuite,
    decode: (str: string) => ArrayBuffer,
    encode: (ab: ArrayBuffer) => string
) {
    it('Decode', () => {
        // Tests with padding (if included)
        for (let i = 0; i < tests.length; i++) {
            const test = tests[i]
            const dec = decode(test.enc)
            assert.ok(typedArraysEqual(new Uint8Array(dec), test.dec), `Result doesn't match for test ${i}`)
        }

        // Repeat tests without padding
        for (let i = 0; i < tests.length; i++) {
            const test = tests[i]
            let enc = test.enc
            while (enc.length && enc.charAt(enc.length - 1) == '=') {
                enc = enc.slice(0, -1)
            }
            const dec = decode(enc)
            assert.ok(typedArraysEqual(new Uint8Array(dec), test.dec), `Result doesn't match for test ${i} (without padding)`)
        }

        assert.throws(() => {
            decode('.')
        }, Error('Invalid base64 input sequence'))
        assert.throws(() => {
            decode('A83===')
        }, Error('Invalid base64 input sequence'))
    })

    it('Encode', () => {
        for (let i = 0; i < tests.length; i++) {
            const test = tests[i]
            const enc = encode(test.dec)
            assert.strictEqual(enc.length, test.enc.length, `Length doesn't match for test ${i}`)
            assert.strictEqual(enc, test.enc, `Result doesn't match for test ${i}`)
        }
    })
}

describe('Base64 standard encoding', () => {
    const tests: testSuite = [
        {dec: new Uint8Array([0x11, 0x11, 0x25, 0x5a, 0x8e, 0xff, 0x91]), enc: 'ERElWo7/kQ=='},
        {dec: new Uint8Array([0x69, 0xa6, 0x2b, 0xf8, 0x2e, 0xc2, 0xee, 0x0d]), enc: 'aaYr+C7C7g0='},
        {dec: new Uint8Array([0x2c, 0xf1, 0xa1, 0x15, 0xef, 0x8d, 0xfe]), enc: 'LPGhFe+N/g=='},
        {dec: new Uint8Array([0xfe, 0x3c, 0x0d, 0x8b, 0x29, 0xdb, 0x98, 0xbc, 0x38]), enc: '/jwNiynbmLw4'},
    ]

    TestFactory(tests, Base64Std.Decode, Base64Std.Encode)
})

describe('Base64 URL encoding', () => {
    const tests: testSuite = [
        {dec: new Uint8Array([0x11, 0x11, 0x25, 0x5a, 0x8e, 0xff, 0x91]), enc: 'ERElWo7_kQ'},
        {dec: new Uint8Array([0x69, 0xa6, 0x2b, 0xf8, 0x2e, 0xc2, 0xee, 0x0d]), enc: 'aaYr-C7C7g0'},
        {dec: new Uint8Array([0x2c, 0xf1, 0xa1, 0x15, 0xef, 0x8d, 0xfe]), enc: 'LPGhFe-N_g'},
        {dec: new Uint8Array([0xfe, 0x3c, 0x0d, 0x8b, 0x29, 0xdb, 0x98, 0xbc, 0x38]), enc: '_jwNiynbmLw4'},
    ]

    TestFactory(tests, Base64Url.Decode, Base64Url.Encode)
})

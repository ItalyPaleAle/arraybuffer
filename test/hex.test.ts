import 'mocha'
import assert from 'assert'
import {Encode, Decode} from '../src/hex.js'

// Test vectors from RFC 4648: https://datatracker.ietf.org/doc/html/rfc4648#section-10
const tests = [
    {str: '', enc: ''},
    {str: 'f', enc: '66'},
    {str: 'fo', enc: '666f'},
    {str: 'foo', enc: '666f6f'},
    {str: 'foob', enc: '666f6f62'},
    {str: 'fooba', enc: '666f6f6261'},
    {str: 'foobar', enc: '666f6f626172'},
]

// Additional test vectors for decoding only
const testsDecode = [
    // Add whitspaces to encoded text
    {str: 'fooba', enc: '666f6f6261 '},
    {str: 'foobar', enc: '66 6f 6f 62 61 72'},
    {str: 'foobar', enc: '66 6f 6f\t62\n61\n72'},
    {str: 'foobar', enc: '66 6f  6f\t62\n61\n72'},
    {str: 'foobar', enc: '  66 6f  6f\t62\n61\n72 '},
]


describe('Hex', () => {

    it('Decode', () => {
        const decoder = new TextDecoder('utf-8')

        const allTests = [...tests, ...testsDecode]

        for (let i = 0; i < allTests.length; i++) {
            const test = allTests[i]
            const dec = Decode(test.enc)
            assert.strictEqual(dec.byteLength, test.str.length, `Length doesn't match for test ${i}`)
            assert.strictEqual(decoder.decode(dec), test.str, `Result doesn't match for test ${i}`)
        }

        // Error cases
        assert.throws(() => {
            Decode('0')
        }, Error('Length of string must be a multiple of 2'))
        assert.throws(() => {
            Decode('0Z')
        }, Error('Invalid hex input sequence'))
    })

    it('Encode', () => {
        const encoder = new TextEncoder()
        for (let i = 0; i < tests.length; i++) {
            const test = tests[i]
            const enc = Encode(encoder.encode(test.str))
            assert.strictEqual(enc.length, test.enc.length, `Length doesn't match for test ${i}`)
            assert.strictEqual(enc, test.enc, `Result doesn't match for test ${i}`)
        }
    })

})

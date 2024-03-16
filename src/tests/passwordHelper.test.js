const { describe, it } = require('node:test')
const assert = require('node:assert')
const PasswordHelper = require('../helpers/passwordHelper')

const password = 'Root@123.123.'
const hash = '$2b$04$6/bpTmMEqMBQpO.EHCiqhO735YbQm0xBFJd5Wedg0z3Q2kx0bWhT2'

describe('Password Helper Test Suit', () => {

    it('Should Return a Hash', async () => {
        const result = await PasswordHelper.hashPassword(password)
        assert.ok(result.length > 10)
    })

    it('Should Validate Password', async () => {
        const result = await PasswordHelper.comparePassword(password, hash)
        assert.ok(result)
    }) 
})
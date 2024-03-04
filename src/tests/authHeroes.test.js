const { describe, it, before } = require('node:test')
const assert = require('node:assert')
const api = require('./../api')
const { compile } = require('joi')

let app = {}

describe('Auth Heroes API Test Suit',{ skip: false }, () => {
    before(async () => {
        app = await api
    })

    it('Should Return a Token', async () => {
        const result = await app.inject({
            method: 'POST',
            url: '/login',
            payload: {
                username: 'root',
                password: 'root'
            }
        })
        const data = JSON.parse(result.payload)
        assert.deepStrictEqual(result.statusCode, 200)
        assert.ok(data.token.length > 20)
    })
})
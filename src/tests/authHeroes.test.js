const { describe, it, before, after } = require('node:test')
const assert = require('node:assert')
const api = require('../api')
const { init, start } = require('../api')

let app

describe('Auth Heroes API Test Suit', () => {
    before(async () => {
        app = await init()
    })

    // after(async () => {
    //     app.stop()
    // })

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
const { describe, it, before, after } = require('node:test')
const api = require('./../api')
const assert = require('node:assert')

let app = {}

describe('API Heroes Test Suit',() => {
    before(async () => {
        app = await api
    })

    it('Should Return /heroes', async () => {
        const result = await app.inject({
            method: 'GET',
            url: '/heroes'
        })

        const data = JSON.parse(result.payload)

        assert.deepStrictEqual(result.statusCode, 200)
        assert.ok(Array.isArray(data))
    })
})
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

        console.log('AWUI')
        assert.deepStrictEqual(true, result)
    })
})
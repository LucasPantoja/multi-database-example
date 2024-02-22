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

    it('Should return 5 Heroes', async() => {
        const TAKE_SIZE = 5
        const result = await app.inject({
            method: 'GET',
            url: `/heroes?take=${TAKE_SIZE}`
        })
        const data = JSON.parse(result.payload)
        assert.deepStrictEqual(result.statusCode, 200)
        assert.ok(data.length === 5)
    })

    it('Should Fail as Take Argument is Not a Number', async() => {
        const TAKE_SIZE = 'string'
        const result = await app.inject({
            method: 'GET',
            url: `/heroes?take=${TAKE_SIZE}`
        })
        const errorResult = {
            "statusCode": 400,
            "error": "Bad Request",
            "message": "\"take\" must be a number",
            "validation": {
                "source": "query",
                "keys": [
                "take"
                 ]
            }

        }
        const data = JSON.parse(result.payload)
        assert.deepStrictEqual(result.statusCode, 400)
        assert.deepStrictEqual(data, errorResult)
    })

    it('Should return Only 1 Hero by Name', async() => {
        const TAKE_SIZE = 1
        const ITEM_NAME = 'Rudeus'
        const result = await app.inject({
            method: 'GET',
            url: `/heroes?take=${TAKE_SIZE}&name=${ITEM_NAME}`
        })
        const data = JSON.parse(result.payload)
        assert.deepStrictEqual(result.statusCode, 200)
        assert.deepStrictEqual(data[0].name, ITEM_NAME)
    })
})
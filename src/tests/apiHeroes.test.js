const { describe, it, before, after } = require('node:test')
const api = require('../api')
const assert = require('node:assert')

let app = {}
const MOCK_HERO = {
    name: 'Sung Jin Woo',
    power: 'Solo Leveling'
}
const MOCK_UPDATE_HERO = {
    name: 'John',
    power: 'Doe'
}
let MOCK_ID = ''

describe('API Heroes Test Suit', { skip: true }, () => {
    before(async () => {
        app = await api
        result = await app.inject({
            method: 'POST',
            url: '/heroes',
            payload: MOCK_UPDATE_HERO
        })
        const data = JSON.parse(result.payload)
        MOCK_ID = data.id

    })

    // after(async () => {
    //     app.stop()
    // })

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
        const result = await app.inject({
            method: 'GET',
            url: `/heroes?take=${TAKE_SIZE}&name=${MOCK_HERO.name}`
        })
        const data = JSON.parse(result.payload)
        assert.deepStrictEqual(result.statusCode, 200)
        assert.deepStrictEqual(data[0].name, MOCK_HERO.name)
    })

    it('Should Register a Hero', async () => {
        const result = await app.inject({
            method: 'POST',
            url: '/heroes',
            payload: MOCK_HERO
        })
        const { message, id } = JSON.parse(result.payload)

        assert.deepStrictEqual(result.statusCode, 200)
        assert.notStrictEqual(id, undefined)
        assert.deepStrictEqual(message, 'Hero Successfully Created')
    })

    it('Should Update a Hero', async () => {
         const newHero = {
            name: 'Rudeus', 
            power: 'Wizzard'
        }
        const result = await app.inject({
            method: 'PATCH',
            url: `/heroes/${MOCK_ID}`,
            payload: newHero
        })
        const { message } = JSON.parse(result.payload)

        assert.deepStrictEqual(result.statusCode, 200)
        assert.deepStrictEqual(message, 'Hero Successfully Updated')
    })

    it('Should Delete a Hero by ID', async () => {
        const result = await app.inject({
            method: 'DELETE',
            url: `/heroes/${MOCK_ID}`
        })
        const { message } = JSON.parse(result.payload)
        assert.deepStrictEqual(result.statusCode, 200)
        assert.deepStrictEqual(message, 'Hero Successfully Deleted')
    })
})
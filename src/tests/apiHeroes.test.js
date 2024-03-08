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
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJvb3QiLCJpZCI6MSwidGVzdCI6ImFzZGFkYSIsImlhdCI6MTcwOTY2OTk1NX0.1ytoVCOw36NWxcTnRwt4SCOiMldAkiOI5BFwB21RkmA'
const headers = {
    authorization: TOKEN
}

describe.skip('API Heroes Test Suit', () => {
    before(async () => {
        app = await api
        result = await app.inject({
            method: 'POST',
            url: '/heroes',
            headers,
            payload: MOCK_UPDATE_HERO
        })
        const data = JSON.parse(result.payload)
        MOCK_ID = data.id

    })
    

    // after(async () => {
    //    await  app.stop()
    // })

    it('Should Return /heroes', async () => {
        const result = await app.inject({
            method: 'GET',
            url: '/heroes',
            headers
        })

        const data = JSON.parse(result.payload)
        assert.deepStrictEqual(result.statusCode, 200)
        assert.ok(Array.isArray(data))
    })

    it('Should return 5 Heroes', async() => {
        const TAKE_SIZE = 5
        const result = await app.inject({
            method: 'GET',
            url: `/heroes?take=${TAKE_SIZE}`,
            headers
        })
        const data = JSON.parse(result.payload)
        assert.deepStrictEqual(result.statusCode, 200)
        assert.ok(data.length === 5)
    })

    it('Should Fail as Take Argument is Not a Number', async() => {
        const TAKE_SIZE = 'string'
        const result = await app.inject({
            method: 'GET',
            url: `/heroes?take=${TAKE_SIZE}`,
            headers
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
            url: `/heroes?take=${TAKE_SIZE}&name=${MOCK_HERO.name}`,
            headers
        })
        const data = JSON.parse(result.payload)
        assert.deepStrictEqual(result.statusCode, 200)
        assert.deepStrictEqual(data[0].name, MOCK_HERO.name)
    })

    it('Should Register a Hero', async () => {
        const result = await app.inject({
            method: 'POST',
            url: '/heroes',
            payload: MOCK_HERO,
            headers
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
            payload: newHero,
            headers
        })
        const { message } = JSON.parse(result.payload)

        assert.deepStrictEqual(result.statusCode, 200)
        assert.deepStrictEqual(message, 'Hero Successfully Updated')
    })

    it('Should Delete a Hero by ID', async () => {
        const result = await app.inject({
            method: 'DELETE',
            url: `/heroes/${MOCK_ID}`,
            headers
        })
        const { message } = JSON.parse(result.payload)
        assert.deepStrictEqual(result.statusCode, 200)
        assert.deepStrictEqual(message, 'Hero Successfully Deleted')
    })
})
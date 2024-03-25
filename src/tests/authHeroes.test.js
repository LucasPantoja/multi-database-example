const { describe, it, before, after } = require('node:test')
const assert = require('node:assert')
const api = require('../api')
const { init } = require('../api')
const UserService = require('../services/baseService')
const userRepository = require('../repositories/postgresRepository')

let app
let usersService = {}

const MODEL = 'users'

const USER = {
    username: 'Root',
    password: 'root'
}

const USER_DB = {
    username: USER.username.toLowerCase(),
    password: '$2b$04$sp0Fzm7bQploHGILqGYywesGpVoAwalLZyEKfscK2Mc/nn.HOwhby'
}

describe('Auth Heroes API Test Suit', () => {
    before(async () => {
        app = await init()

        usersService = new UserService(new userRepository())
        await usersService.connect(MODEL)

        const result = await usersService.update(USER_DB.username, USER_DB, true)
    })

    it('Should Return a Token', async () => {
        const result = await app.inject({
            method: 'POST',
            url: '/login',
            payload: USER
        })
        const data = JSON.parse(result.payload)
        assert.deepStrictEqual(result.statusCode, 200)
        assert.ok(data.token.length > 20)
    })

    it('Should Return a Unauthorized message', async () => {
        const result = await app.inject({
            method: 'POST',
            url: '/login',
            payload: {
                username: 'root',
                password: '123'
            }
        })
        const data = JSON.parse(result.payload)
        assert.deepStrictEqual(result.statusCode, 401)
        assert.deepStrictEqual(data.error, 'Unauthorized')
    })
})
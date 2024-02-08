const { describe, it, before, after } = require('node:test')
const assert = require('node:assert')
const ContextStrategy = require('../db/strategies/base/contextStrategy')
const MongoStrategy = require('../db/strategies/mongoStrategy')

const context = new ContextStrategy(new MongoStrategy())

const MOCK_HERO = {
    name: 'Sung Jin Woo',
    power: 'Solo Leveling'
}

describe('Mongo Test Suit Using Prisma ORM', async () => {
    before(async () => {
        await context.connect()
    })

    it('Should be Connected to Database', async () => {
        const result = await context.isConnected()
        assert.deepStrictEqual(result, true)
    })

    it('Should Create a Hero', async () => {
        const { name, power } = await context.create(MOCK_HERO)
        assert.deepStrictEqual(result, MOCK_HERO)
    }) 
})
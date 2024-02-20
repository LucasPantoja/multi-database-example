const { describe, it, before, after } = require('node:test')
const assert = require('node:assert')
const ContextStrategy = require("../db/base/contextStrategy");
const PostgresStrategy = require("../db/strategies/postgresStrategy");

const MOCK_HERO = {
    name: 'Sung Jin Woo',
    power: 'Solo Leveling'
}

const MOCK_UPDATE_HERO = {
    name: 'John',
    power: 'Doe'
}

const HEROES_MODEL = 'heroes'
let MOCK_ID = ''
let context = {}

describe('Postgres Test Suit Using Prisma ORM', () => {
    before(async () => {
        context = new ContextStrategy(new PostgresStrategy())
        await context.connect(HEROES_MODEL)
        const result = await context.create(MOCK_UPDATE_HERO)
        MOCK_ID = result.id
    })

    after(async () =>{
        // await context.delete()
    })

    it('Should be Connected to Database', async () => {
        const result = await context.isConnected()
        assert.deepStrictEqual(result, true)
    })

    it('Should Create a Hero', async () => {
        const { name, power } = await context.create(MOCK_HERO)
        assert.deepStrictEqual({name, power}, MOCK_HERO)
    })

    it('Should Return a Hero by Name', async () => {
        const [{ name, power }] = await context.read(MOCK_HERO.name)
        assert.deepStrictEqual({ name, power }, MOCK_HERO)
    })

    it('Should Update Hero', async () => {
        const newHero = {
            name: 'Rudeus',
            power: 'Wizzard'
        }
        const {name, power} = await context.update(MOCK_ID, newHero)
        assert.deepStrictEqual({name, power}, newHero)
    })

    it('Should Delete a hero', async () => {
        const [ hero ] = await context.read()
        const result = await context.delete(hero.id)
        assert.deepStrictEqual(result,hero)
    })
})
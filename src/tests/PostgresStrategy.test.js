const { describe, it, before, after } = require('node:test')
const assert = require('node:assert')
const ContextStrategy = require("../db/strategies/base/contextStrategy");
const PostgresStrategy = require("../db/strategies/postgresStrategy");

const context = new ContextStrategy(new PostgresStrategy())

const MOCK_HERO = {
    name: 'Sung Jin Woo',
    power: 'Solo Leveling'
}

const MOCK_UPDATE_HERO = {
    name: 'John',
    power: 'Doe'
}

const HEROES_MODEL = 'heroes'

describe('Postgres Test Suit Using Prisma ORM', () => {
    before(async () => {
        await context.connect()
        await context.create(MOCK_UPDATE_HERO, HEROES_MODEL)
    })

    after(async () =>{
        await context.delete()
    })

    it('Should be Connected to Database', async () => {
        const result = await context.isConnected()
        assert.deepStrictEqual(result, true)
    })

    it('Should Create a Hero', async () => {
        const { name, power } = await context.create(MOCK_HERO, HEROES_MODEL)
        assert.deepStrictEqual({name, power}, MOCK_HERO)
    })

    it('Should Return a Hero by Name', async () => {
        const [{ name, power }] = await context.read(MOCK_HERO.name, HEROES_MODEL)
        assert.deepStrictEqual({ name, power }, MOCK_HERO)
    })

    it('Should Update Hero', async () => {
        const [ hero ] = await context.read(MOCK_UPDATE_HERO.name, HEROES_MODEL)
        const newHero = {
            ...hero,
            name: 'Rudeus',
            power: 'Wizzard'
        }
        const updatedHero = await context.update(hero.id, newHero, HEROES_MODEL)
        assert.deepStrictEqual(updatedHero, newHero)
    })

    it('Should Delete a hero', async () => {
        const [ hero ] = await context.read(undefined, HEROES_MODEL)
        const result = await context.delete(hero.id, HEROES_MODEL)
        assert.deepStrictEqual(result,hero)
    })
})
const { describe, it, before, after } = require('node:test')
const assert = require('node:assert')
const ContextStrategy = require('../db/base/contextStrategy')
const MongoStrategy = require('../db/strategies/mongoStrategy')

const context = new ContextStrategy(new MongoStrategy())

const MOCK_HERO = {
    name: 'Sung Jin Woo',
    power: 'Solo Leveling'
}

const MOCK_UPDATE_HERO = {
    name: 'John',
    power: 'Doe'
}

const HEROES_MODEL = 'heroes'

describe('Mongo Test Suit Using Prisma ORM', async () => {
    before(async () => {
        await context.connect(HEROES_MODEL)
        await context.create(MOCK_UPDATE_HERO)
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
        const [ hero ] = await context.read(MOCK_UPDATE_HERO.name)
        const newHero = {
            ...hero,
            name: 'Rudeus',
            power: 'Wizzard'
        }
        const updatedHero = await context.update(hero.id, newHero)
        assert.deepStrictEqual(updatedHero, newHero)
    })

    it('Should Delete a hero', async () => {
        const [ hero ] = await context.read()
        const result = await context.delete(hero.id)
        assert.deepStrictEqual(result,hero)
    })
})
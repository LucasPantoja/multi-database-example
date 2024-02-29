const { describe, it, before, after } = require('node:test')
const assert = require('node:assert')
const HeroesService = require("../services/heroesService")
const HeroesPostgresRepository = require("../repositories/heroesPostgresRepository")

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
let heroesService = {}

describe('Postgres Test Suit Using Prisma ORM',{ skip: true }, () => {
    before(async () => {
        heroesService = new HeroesService(new HeroesPostgresRepository())
        await heroesService.connect(HEROES_MODEL)
        const result = await heroesService.create(MOCK_UPDATE_HERO)
        MOCK_ID = result.id
    })

    after(async () =>{
        // await heroesService.delete()
    })

    it('Should be Connected to Database', async () => {
        const result = await heroesService.isConnected()
        assert.deepStrictEqual(result, true)
    })

    it('Should Create a Hero', async () => {
        const { name, power } = await heroesService.create(MOCK_HERO)
        assert.deepStrictEqual({name, power}, MOCK_HERO)
    })

    it('Should Return a Hero by Name', async () => {
        const [{ name, power }] = await heroesService.read(MOCK_HERO.name)
        assert.deepStrictEqual({ name, power }, MOCK_HERO)
    })

    it('Should Update Hero', async () => {
        const newHero = {
            name: 'Rudeus',
            power: 'Wizzard'
        }
        const {name, power} = await heroesService.update(MOCK_ID, newHero)
        assert.deepStrictEqual({name, power}, newHero)
    })

    it('Should Delete a hero', async () => {
        const [ hero ] = await heroesService.read()
        const result = await heroesService.delete(hero.id)
        assert.deepStrictEqual(result,hero)
    })
})
const Hapi = require('@hapi/hapi')
const HeroesService = require('./services/heroesService')
const HeroesMongoRepository = require('./repositories/heroesMongoRepository')
const heroRoutes = require('./routes/heroRoutes')

const app = new Hapi.Server({
    port: 5000,
    host: 'localhost'
})

const heroesModel = 'heroes'

function mapRoutes(instance, methods) {
    return methods.map(method => instance[method]())
}

async function main() {
    const heroesService = new HeroesService(new HeroesMongoRepository())
    await heroesService.connect(heroesModel)

    app.route([
        ...mapRoutes(new heroRoutes(heroesService), heroRoutes.methods())
    ])

    await app.start()
    console.log('Server Runnning at Port', app.info.port)

    return app
}

module.exports =  main()
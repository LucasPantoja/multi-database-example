const Hapi = require('@hapi/hapi')
const ContextStrategy = require('./db/base/contextStrategy')
const MongoStrategy = require('./db/strategies/mongoStrategy')
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
    const context = new ContextStrategy(new MongoStrategy())
    await context.connect(heroesModel)
    
    app.route([
        ...mapRoutes(new heroRoutes(context), heroRoutes.methods())
    ])

    await app.start()
    console.log('Server Runnning at Port', app.info.port)

    return app
}

module.exports =  main()
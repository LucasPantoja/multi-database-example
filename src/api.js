const Hapi = require('@hapi/hapi')
const ContextStrategy = require('./db/strategies/base/contextStrategy')
const MongoStrategy = require('./db/strategies/mongoStrategy')

const app = new Hapi.Server({
    port: 5000,
    host: 'localhost'
})

async function main() {
    const context = new ContextStrategy(new MongoStrategy())
    await context.connect()
    const heroesModel = 'heroes'
    app.route([{
        path: '/heroes',
        method: 'GET',
        handler: (request, headers) => {
            return context.read(undefined, heroesModel)
        }
    }])

    await app.initialize()
    console.log('Server Runnning at Port', app.info.port)

    process.on('unhandledRejection', (err) => {

        console.log(err);
        process.exit(1);
    })

    return app
}

module.exports =  main()
const Hapi = require('@hapi/hapi')
const HeroesService = require('./services/heroesService')
const HeroesMongoRepository = require('./repositories/heroesMongoRepository')
const HeroRoutes = require('./routes/heroRoutes')
const AuthRoutes = require('./routes/authRoutes')
const Inert = require('@hapi/inert')
const Vision = require('@hapi/vision')
const HapiSwagger = require('hapi-swagger')
const HapiJwt = require('hapi-auth-jwt2')

const JWT_SECRET = "SENHA123"

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

    const swaggerOptions = {
        info: {
                title: 'Test API Documentation',
                version: 'v1.0',
            }
        }

    await app.register([
        HapiJwt,
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ])

    app.auth.strategy('jwt', 'jwt', {
        key: JWT_SECRET,
        validate: (data, request) => {
            return {
                isValid: true
            }
        }
    })

    app.auth.default('jwt')

    app.route([
        ...mapRoutes(new HeroRoutes(heroesService), HeroRoutes.methods()),
        ...mapRoutes(new AuthRoutes(JWT_SECRET), AuthRoutes.methods())
    ])

    await app.start()
    console.log('Server Runnning at Port', app.info.port)

    return app
}

module.exports =  main()
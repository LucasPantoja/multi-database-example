const Hapi = require('@hapi/hapi')
const HeroesService = require('./services/baseService')
const HeroesMongoRepository = require('./repositories/mongoRepository')
const UsersService = require('./services/baseService')
const UsersPostgresRepository = require('./repositories/postgresRepository')
const HeroRoutes = require('./routes/heroRoutes')
const AuthRoutes = require('./routes/authRoutes')
const Inert = require('@hapi/inert')
const Vision = require('@hapi/vision')
const HapiSwagger = require('hapi-swagger')
const HapiJwt = require('hapi-auth-jwt2')

function mapRoutes(instance, methods) {
    return methods.map(method => instance[method]())
}

async function setServerConfigs() {
    const JWT_SECRET = "SENHA123"

    const server = new Hapi.Server({
        port: 5000,
        host: 'localhost'
    })

    const heroesModel = 'heroes'
    const heroesService = new HeroesService(new HeroesMongoRepository())
    await heroesService.connect(heroesModel)

    const userModel = 'users'
    const usersService = new UsersService(new UsersPostgresRepository())
    await usersService.connect(userModel)

    const swaggerOptions = {
        info: {
                title: 'Test API Documentation',
                version: 'v1.0',
            }
        }

    await server.register([
        HapiJwt,
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ])

    server.auth.strategy('jwt', 'jwt', {
        key: JWT_SECRET,
        validate: async (data, request) => {
            const result = await usersService.read(data.username.toLowerCase())
            if(!result)
                return { isValid: false }

            return { isValid: true }
        }
    })

    server.auth.default('jwt')

    server.route([
        ...mapRoutes(new HeroRoutes(heroesService), HeroRoutes.methods()),
        ...mapRoutes(new AuthRoutes(JWT_SECRET, usersService), AuthRoutes.methods())
    ])

    return server
}

exports.init = async () => {
    const server = await setServerConfigs()
    await server.initialize();
    return server;
}

exports.start = async () => {
    const server = await setServerConfigs()
    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
    return server;
}
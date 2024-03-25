const baseRoute = require('./base/baseRoute')
const Joi = require('joi')
const Boom = require('@hapi/boom')
const Jwt = require('jsonwebtoken')
const passwordHelper = require('../helpers/passwordHelper')

const failAction = (request, headers, error) => {
    throw error
}

class AuthRoute extends baseRoute{
    constructor(secret, db) {
        super()
        this.secret = secret
        this.db = db
    }
    login(){
        return {
            path: '/login',
            method: 'POST',
            config: {
                auth: false,
                tags: ['api'],
                description: 'Return Token',
                notes: 'Login with username and password credentials',
                validate: {
                    failAction,
                    payload: Joi.object({
                        username: Joi.string().required(),
                        password: Joi.string().required()
                    })
                }
            },
            handler: async(request) => {
                const { username, password } = request.payload
                const user = await this.db.read(username.toLowerCase())

                if (!user)
                    return Boom.unauthorized('O usuario informado nao existe')

                const match = await passwordHelper.comparePassword(password, user.password)

                if (!match)
                    return Boom.unauthorized('O usuario e senha invalidos!')

                const token = Jwt.sign({
                    username,
                    id: 1,
                }, this.secret,)

                return { token }
            }
        }
    }
}

module.exports = AuthRoute
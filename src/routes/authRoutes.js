const baseRoute = require('./base/baseRoute')
const Joi = require('joi')
const Boom = require('@hapi/boom')
const Jwt = require('jsonwebtoken')

const failAction = (request, headers, error) => {
    throw error
}

const USER = {
    username: 'root',
    password: 'root'
}

class AuthRoute extends baseRoute{
    constructor(secret) {
        super()
        this.secret = secret
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

                if(username.toLowerCase() !== USER.username || password !== USER.password)
                    return Boom.unauthorized()
                
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
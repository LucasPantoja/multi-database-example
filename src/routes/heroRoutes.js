const baseRoute = require('./base/baseRoute')
const Joi = require('joi')

class HeroRoutes extends baseRoute{
    constructor(db) {
        super()
        this.db = db
    }

    list() {
        return {
            path: '/heroes',
            method: 'GET',
            config: {
                validate: {
                    failAction: (request, headers, error) => {
                        throw error
                    },
                    query: Joi.object({
                        skip: Joi.number().integer().default(0),
                        take: Joi.number().integer().default(10),
                        name: Joi.string().min(3).max(20)
                    })
                }
            },
            handler: (request, hedears) => {
                try {
                    const { skip, take, name } = request.query
                    
                    return this.db.read(name, parseInt(skip), parseInt(take))
                    
                } catch (error) {
                    console.error('BAD ERROR', error)
                    return "Internal Server Error"
                }
            }
        }
    }
}

module.exports = HeroRoutes
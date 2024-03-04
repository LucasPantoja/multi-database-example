const baseRoute = require('./base/baseRoute')
const Joi = require('joi')

const failAction = (request, headers, error) => {
    throw error
}

const headers = Joi.object({
    authorization: Joi.string().required()
}).unknown()

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
                tags: ['api'],
                description: 'Return a Heroes List',
                notes: 'Can Paginate Results and Filter by name',
                validate: {
                    failAction,
                    query: Joi.object({
                        skip: Joi.number().integer().default(0),
                        take: Joi.number().integer().default(10),
                        name: Joi.string().min(3).max(20)
                    }),
                    headers
                }
            },
            handler: (request, hedears) => {
                try {
                    const { skip, take, name } = request.query
                    return this.db.read(name, skip, take)
                } catch (error) {
                    console.error('BAD ERROR', error)
                    return "Internal Server Error"
                }
            }
        }
    }

    create() {
        return {
            path: '/heroes',
            method: 'POST',
            config: {
                tags: ['api'],
                description: 'Create a Hero',
                validate: {
                    failAction,
                    headers,
                    payload: Joi.object({
                        name: Joi.string().min(3).max(100).required(),
                        power: Joi.string().min(3).max(20).required()
                    })
                }
            },
            handler: async (request) => {
                try {
                    const { name, power } = request.payload
                    const result = await this.db.create({ name, power })
                    return { 
                        message: 'Hero Successfully Created',
                        id: result.id
                    }
                } catch (error) {
                    console.error('BAD ERROR', error)
                    return "Internal Server Error"
                }
            }
        }
    }

    update() {
        return {
            path: '/heroes/{id}',
            method: 'PATCH',
            config: {
                tags: ['api'],
                description: 'Update a Hero',
                validate: {
                    failAction,
                    headers,
                    params: Joi.object({
                        id: Joi.string().required()
                    }),
                    payload: Joi.object({
                        name: Joi.string().min(3).max(100),
                        power: Joi.string().min(3).max(20)
                    })
                }
            },
            handler: async (request) => {
                try {
                    const { payload } = request
                    const { id } = request.params
                    const dataString = JSON.stringify(payload)
                    const data = JSON.parse(dataString)
                    const result = await this.db.update(id, data)
                    return { 
                        message: 'Hero Successfully Updated'
                    }
                } catch (error) {
                    console.error('BAD ERROR', error)
                    return "Internal Server Error"
                }
            }
        }
    }

    delete() {
        return {
            path: '/heroes/{id}',
            method: 'DELETE',
            config: {
                tags: ['api'],
                description: 'Should Delete a Hero',
                validate: {
                    failAction,
                    headers,
                    params: Joi.object ({
                    id: Joi.string().required()
                    })
                }
            },
            handler: async (request) => {
                try {
                    const { id } = request.params
                    await this.db.delete(id)
                    return {
                        message: 'Hero Successfully Deleted'
                    }
                } catch (error) {
                    console.error('BAD ERROR', error)
                    return "Internal Server Error"
                }
            }
        }
    }
}

module.exports = HeroRoutes
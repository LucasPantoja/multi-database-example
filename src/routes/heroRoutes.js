const baseRoute = require('./base/baseRoute')

class HeroRoutes extends baseRoute{
    constructor(db) {
        super()
        this.db = db
    }

    list() {
        return {
            path: '/heroes',
            method: 'GET',
            handler: (request, hedears) => {
                try {
                    const { skip, take, name} = request.query
                    // console.log(request.query)
                    // let query = {}

                    // if(name)
                    //     query.name = name

                    // if(isNaN(parseInt(skip)))
                    // throw Error('Skip is not a number')
                    // if(isNaN(take))
                    // throw Error('Take is not a number')
                    console.log(parseInt(skip))
                    console.log(parseInt(take))
                    return this.db.read({ name }, parseInt(skip), parseInt(take))
                    
                } catch (error) {
                    console.error('BAD ERROR', error)
                    return "Internal Server Error"
                }
            }
        }
    }
}

module.exports = HeroRoutes
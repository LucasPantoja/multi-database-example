const { PrismaClient } = require('@prisma-mongo/client')
const ICrud = require('./interfaces/ICrud')

class MongoStrategy extends ICrud {
    constructor() {
        super()
        this.prisma = null
    }

    connect() {
        this.prisma = new PrismaClient({errorFormat: 'pretty'})
    }

    async isConnected() {
        return await this.prisma.heroes.findRaw({}) ? true: false
    }

    async create(model, item) {
        return await this.prisma[model].create({data:item})
    }

    async read(model, item = {}) {
        if(typeof item === 'object') {
            return await this.prisma[model].findMany()
        }
        return await this.prisma[model].findMany({
            where: {
                name: item
            }
        })
    }

    async update(model, id, item) {
        if(model === 'heroes') {
            const {itemId, name, power, createdAt} = item
            return await this.prisma[model].update({
                where: {
                    id
                },
                data: {
                    id: itemId,
                    name,
                    power,
                    createdAt
                }
            })
        }
        return false
    }

    async delete(model, id = {}) {
        if(typeof id === 'object') {
            return this.prisma[model].deleteMany({})
        }
        return this.prisma[model].delete({where:{id}})
        
    }
}

module.exports = MongoStrategy
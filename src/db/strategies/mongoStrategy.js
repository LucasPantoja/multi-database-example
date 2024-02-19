const { PrismaClient } = require('@prisma-mongo/client')
const ICrud = require('./interfaces/ICrud')

class MongoStrategy extends ICrud {
    constructor() {
        super()
        this.prisma = null
        this.model = null
    }

    connect(model) {
        this.prisma = new PrismaClient()
        this.model = model
    }

    async isConnected() {
        return await this.prisma.heroes.findRaw({}) ? true: false
    }

    async create(item) {
        return await this.prisma[this.model].create({data:item})
    }

    async read(item = {}) {
        if(typeof item === 'object') {
            return await this.prisma[this.model].findMany()
        }
        return await this.prisma[this.model].findMany({
            where: {
                name: item
            }
        })
    }

    async update(id, item) {
        if(this.model === 'heroes') {
            const {itemId, name, power, createdAt} = item
            return await this.prisma[this.model].update({
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

    async delete(id = {}) {
        if(typeof id === 'object') {
            return this.prisma[this.model].deleteMany({})
        }
        return this.prisma[this.model].delete({where:{id}})
        
    }
}

module.exports = MongoStrategy
const { PrismaClient } = require('@prisma-mongo/client')
const ICrud = require('./interfaces/ICrud')

class MongoStrategy extends ICrud {
    constructor() {
        super()
        this.prisma = null
    }

    connect() {
        this.prisma = new PrismaClient()
    }

    async isConnected() {
        return await this.prisma.heroes.findRaw({}) ? true: false
    }

    async create(item) {
        return await this.prisma.heroes.create({data:item})
    }

}

module.exports = MongoStrategy